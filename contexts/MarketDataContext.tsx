import { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import { supabase } from '../utils/supabase/client';
import { TradingViewSocket, MarketPrice } from '../utils/TradingViewSocket';
import { CATALOGUE } from '../utils/assetCatalogue';
import { initialAssets, deriveFullLeverage } from '../data/assets';

// ============================================================
// TYPES
// ============================================================

interface MarketPrice {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  open: number;
  volume: string;
  bid: number;
  ask: number;
  lastUpdate: number;
}

interface MarketAsset {
  id: string;
  symbol: string;
  name: string;
  category: string;
  base_currency: string;
  quote_currency: string;
  min_trade_amount: number;
  max_leverage: number;
  is_active: boolean;
  icon_url?: string;
  description?: string;
  leverage?: {
    basic: number;
    standard: number;
    premium?: number;
    silver?: number;
    gold?: number;
    platinum?: number;
  };
}

interface MarketDataContextType {
  prices: Record<string, MarketPrice>;
  assets: MarketAsset[];
  getPrice: (symbol: string) => MarketPrice | null;
  getAsset: (symbol: string) => MarketAsset | null;
  getAssetsByCategory: (category: string) => MarketAsset[];
  subscribeToSymbol: (symbol: string) => void;
  unsubscribeFromSymbol: (symbol: string) => void;
  isLoading: boolean;
  assetsLoading: boolean;
  refreshAssets: () => Promise<void>;
  /** Returns true if the given symbol has received at least one real WebSocket price update */
  isPriceLive: (symbol: string) => boolean;
  /** True once any real WebSocket price data has been received (WS is working) */
  pricesReady: boolean;
}

const MarketDataContext = createContext<MarketDataContextType | undefined>(undefined);

export function useMarketData() {
  const context = useContext(MarketDataContext);
  if (!context) throw new Error('useMarketData must be used within MarketDataProvider');
  return context;
}

// ============================================================
// SYMBOL CLASSIFICATION
// ============================================================

/**
 * Crypto symbols → their Binance USDT pair.
 * Binance public API has no CORS restrictions and no API key required.
 * GET https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT
 */
const BINANCE_PAIR: Record<string, string> = {
  BTCUSD:   'BTCUSDT',
  ETHUSD:   'ETHUSDT',
  // USDTUSD omitted — USDTUSDT is not a valid Binance pair; fetched via CoinGecko instead
  BNBUSD:   'BNBUSDT',
  ADAUSD:   'ADAUSDT',
  SOLUSD:   'SOLUSDT',
  XRPUSD:   'XRPUSDT',
  DOTUSD:   'DOTUSDT',
  MATICUSD: 'MATICUSDT',
  LINKUSD:  'LINKUSDT',
  AVAXUSD:  'AVAXUSDT',
  DOGEUSD:  'DOGEUSDT',
  LTCUSD:   'LTCUSDT',
  BCHUSD:   'BCHUSDT',
  UNIUSD:   'UNIUSDT',
  AAVEUSD:  'AAVEUSDT',
  ATOMUSD:  'ATOMUSDT',
  FILUSD:   'FILUSDT',
  NEARUSD:  'NEARUSDT',
  APTUSD:   'APTUSDT',
  ARBUSD:   'ARBUSDT',
  OPUSD:    'OPUSDT',
  SUIUSD:   'SUIUSDT',
  XMRUSD:   'XMRUSDT',
  ALGOUSD:  'ALGOUSDT',
  VETUSD:   'VETUSDT',
  ICPUSD:   'ICPUSDT',
};

/**
 * CoinGecko coin IDs for each crypto symbol.
 * Used as fallback when Binance API is unreachable.
 * Batched via /coins/markets endpoint (1 request for ALL coins).
 */
const COINGECKO_ID: Record<string, string> = {
  BTCUSD:   'bitcoin',
  ETHUSD:   'ethereum',
  USDTUSD:  'tether',
  BNBUSD:   'binancecoin',
  ADAUSD:   'cardano',
  SOLUSD:   'solana',
  XRPUSD:   'ripple',
  DOTUSD:   'polkadot',
  MATICUSD: 'matic-network',
  LINKUSD:  'chainlink',
  AVAXUSD:  'avalanche-2',
  DOGEUSD:  'dogecoin',
  LTCUSD:   'litecoin',
  BCHUSD:   'bitcoin-cash',
  UNIUSD:   'uniswap',
  AAVEUSD:  'aave',
  ATOMUSD:  'cosmos',
  FILUSD:   'filecoin',
  NEARUSD:  'near',
  APTUSD:   'aptos',
  ARBUSD:   'arbitrum',
  OPUSD:    'optimism',
  SUIUSD:   'sui',
  XMRUSD:   'monero',
  ALGOUSD:  'algorand',
  VETUSD:   'vechain',
  ICPUSD:   'internet-computer',
};

/** Reverse lookup: CoinGecko id → our symbol (e.g. 'bitcoin' → 'BTCUSD') */
const COINGECKO_ID_TO_SYMBOL: Record<string, string> = Object.fromEntries(
  Object.entries(COINGECKO_ID).map(([sym, id]) => [id, sym])
);

/** All CoinGecko IDs as a comma-separated string for batch requests */
const ALL_COINGECKO_IDS = Object.values(COINGECKO_ID).join(',');

/** CoinGecko batch cache TTL: 30 seconds (stays within free-tier rate limits) */
const COINGECKO_CACHE_TTL_MS = 30_000;

export function MarketDataProvider({ children }: { children: ReactNode }) {
  const [prices, setPrices]           = useState<Record<string, MarketPrice>>({});
  const [assets, setAssets]           = useState<MarketAsset[]>([]);
  const [assetsLoading, setAssetsLoading] = useState(false);
  const [isLoading, setIsLoading]     = useState(false);
  const [pricesReady, setPricesReady] = useState(false);

  // ── Refs (avoid stale-closure issues in intervals/callbacks) ────────────
  const pricesRef       = useRef<Record<string, MarketPrice>>({});  // mirrors state
  const tvSocketRef     = useRef<TradingViewSocket | null>(null);
  const flushIntervalRef= useRef<ReturnType<typeof setInterval> | null>(null);
  const subscribedRef   = useRef<Set<string>>(new Set());
  /** Tracks which symbols have received at least one real WS price update */
  const liveSymbolsRef  = useRef<Set<string>>(new Set());

  // Pending updates from WebSocket to prevent excessive React re-renders
  const pendingUpdatesRef = useRef<Record<string, MarketPrice>>({});

  // ── Setup TradingView WebSocket ───────────────────────────────────────
  useEffect(() => {
    // Initialize TV WebSocket singleton
    const tvSocket = new TradingViewSocket();
    tvSocketRef.current = tvSocket;
    
    tvSocket.setOnDataCallback((symbol, update) => {
      // Merge partial update into existing price or pending update
      const existing = pendingUpdatesRef.current[symbol] || pricesRef.current[symbol] || { symbol, price: 0, change: 0, changePercent: 0, high: 0, low: 0, open: 0, volume: '0', bid: 0, ask: 0, lastUpdate: 0 };
      const newPrice = { ...existing, ...update };
      
      // Calculate change and changePercent if missing from update but we got a new price
      if (update.price !== undefined && existing.open) {
        newPrice.change = newPrice.price - newPrice.open;
        if (newPrice.open > 0) {
          newPrice.changePercent = (newPrice.change / newPrice.open) * 100;
        }
      }
      
      pendingUpdatesRef.current[symbol] = newPrice;

      // Track that this symbol has received real live data
      if (!liveSymbolsRef.current.has(symbol)) {
        liveSymbolsRef.current.add(symbol);
        // Signal that at least one live price is available
        if (!pricesReady) setPricesReady(true);
      }
    });

    tvSocket.connect();

    // Setup an interval to flush pending WebSocket updates to React state
    // We do this to decouple high-frequency WS messages from React re-renders, 
    // keeping UI smooth (e.g., 500ms flush).
    flushIntervalRef.current = setInterval(() => {
      if (Object.keys(pendingUpdatesRef.current).length > 0) {
        setPrices(prev => {
          const next = { ...prev, ...pendingUpdatesRef.current };
          pricesRef.current = next;
          return next;
        });
        pendingUpdatesRef.current = {};
      }
    }, 500);

    return () => {
      tvSocket.cleanup();
      if (flushIntervalRef.current) clearInterval(flushIntervalRef.current);
    };
  }, []);

  // ── Subscription management ──────────────────────────────────────────────
  
  const subscribeToSymbol = useCallback((symbol: string) => {
    if (!symbol) return;
    
    // No fallback injection — components will show skeleton loaders
    // until the WebSocket delivers real live data for this symbol.

    const isNew = !subscribedRef.current.has(symbol);
    if (isNew) {
      subscribedRef.current.add(symbol);
      tvSocketRef.current?.subscribe(symbol);
    }
  }, []);

  const unsubscribeFromSymbol = useCallback((symbol: string) => {
    subscribedRef.current.delete(symbol);
    tvSocketRef.current?.unsubscribe(symbol);
  }, []);

  // ── Market asset list (optional DB fetch) ────────────────────────────────
  const refreshAssets = useCallback(async () => {
    setAssetsLoading(true);
    try {
      const { data, error } = await supabase.from('market_assets').select('*').eq('enabled', true);
      if (error) {
        console.error('Error fetching market assets:', error);
        // Fallback to catalogue if DB error
        return;
      }
      
      let finalAssets: MarketAsset[] = [];
      
      if (data && data.length > 0) {
        finalAssets = data.map(dbAsset => {
          let leverageObj = typeof dbAsset.leverage === 'string' ? JSON.parse(dbAsset.leverage) : (dbAsset.leverage || {});
          return {
            id: dbAsset.id || dbAsset.symbol,
            symbol: dbAsset.symbol,
            name: dbAsset.name,
            category: dbAsset.category || 'Forex',
            base_currency: dbAsset.symbol.slice(0, 3) || 'USD',
            quote_currency: dbAsset.symbol.slice(3) || 'USD',
            min_trade_amount: dbAsset.min_trade_size || 0.01,
            max_leverage: leverageObj.platinum || leverageObj.premium || leverageObj.gold || leverageObj.standard || leverageObj.basic || 10,
            is_active: dbAsset.enabled !== false,
            leverage: leverageObj
          };
        });
      } else {
        // Fallback to CATALOGUE if DB is empty
        finalAssets = CATALOGUE.map(c => ({
          id: `cat_${c.symbol}`,
          symbol: c.symbol,
          name: c.name,
          category: c.category,
          base_currency: c.symbol.slice(0, 3),
          quote_currency: c.symbol.slice(3) || 'USD',
          min_trade_amount: 0.01,
          max_leverage: 50,
          is_active: true,
          leverage: { basic: 10, standard: 20, silver: 35, gold: 50, platinum: 75 }
        }));
      }

      setAssets(finalAssets);
      // Also subscribe to these symbols
      finalAssets.forEach(a => subscribeToSymbol(a.symbol));
    } catch (err) {
      console.error('Failed to parse or fetch market assets', err);
    } finally {
      setAssetsLoading(false);
    }
  }, [subscribeToSymbol]);

  // ── Seed popular symbols on mount ────────────────────────────────────────
  useEffect(() => {
    // Fetch assets from the database and implicitly subscribe to them
    refreshAssets();

    const defaults = [
      'BTCUSD', 'ETHUSD', 'EURUSD', 'GBPUSD', 'AAPL', 'TSLA',
      'XAUUSD', 'SPX', 'USDJPY', 'MSFT', 'GOOGL', 'AMZN',
      'BNBUSD', 'SOLUSD', 'XRPUSD', 'NVDA', 'META',
      'SHIBUSDT', 'PEPEUSD', 'DOGEUSD'
    ];
    defaults.forEach(s => subscribeToSymbol(s));

    // BACKGROUND SYNC: Periodically push live prices to database
    // This allows the database to stay fresh without manual seeding.
    const syncInterval = setInterval(async () => {
      const currentPrices = pricesRef.current;
      const symbolsToSync = Object.keys(currentPrices);
      
      if (symbolsToSync.length === 0) return;

      const now = Date.now();
      const updates = symbolsToSync.map(symbol => {
        const p = currentPrices[symbol];
        if (!p || p.price <= 0) return null;

        // Find the asset to get its metadata from CATALOGUE if not in DB
        const catItem = CATALOGUE.find(c => c.symbol === symbol);
        if (!catItem) return null;

        return {
          symbol,
          name: catItem.name,
          category: catItem.category,
          exchange: catItem.exchange,
          price: p.price,
          volume: p.volume || '0',
          change_24h: p.changePercent || 0,
          enabled: true,
          updated_at: now,
          leverage: { basic: 10, standard: 20, silver: 35, gold: 50, platinum: 75 }
        };
      }).filter(Boolean);

      if (updates.length > 0) {
        try {
          // Perform a batch upsert to the database
          // Note: we use symbol as conflict target to update prices
          const { error } = await supabase.from('market_assets').upsert(updates, { 
            onConflict: 'symbol',
            ignoreDuplicates: false 
          });
          if (error) console.warn('[MarketData] Background sync error:', error.message);
        } catch (e) {
          // Silently fail to avoid console noise
        }
      }
    }, 60000); // Every 60 seconds

    return () => {
      subscribedRef.current.clear();
      clearInterval(syncInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  // ── Helpers exposed through context ────────────────────────────────────
  const getPrice = useCallback((symbol: string): MarketPrice | null => {
    return pricesRef.current[symbol] ?? null;
  }, []);

  const getAsset = useCallback((symbol: string): MarketAsset | null => {
    return assets.find(a => a.symbol === symbol) ?? null;
  }, [assets]);

  const getAssetsByCategory = useCallback((category: string): MarketAsset[] => {
    return assets.filter(a => a.category === category);
  }, [assets]);

  /** Returns true if the symbol has received at least one real WS price update */
  const isPriceLive = useCallback((symbol: string): boolean => {
    return liveSymbolsRef.current.has(symbol);
  }, []);

  const value: MarketDataContextType = {
    prices,
    assets,
    getPrice,
    getAsset,
    getAssetsByCategory,
    subscribeToSymbol,
    unsubscribeFromSymbol,
    isLoading,
    assetsLoading,
    refreshAssets,
    isPriceLive,
    pricesReady,
  };

  return (
    <MarketDataContext.Provider value={value}>
      {children}
    </MarketDataContext.Provider>
  );
}