import { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import { supabase } from '../utils/supabase/client';
import { TradingViewSocket } from '../utils/TradingViewSocket';

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

/** Forex symbols handled via open.er-api.com (free, no key). */
const FOREX_SYMBOLS = new Set([
  'EURUSD', 'GBPUSD', 'AUDUSD', 'NZDUSD', 'USDJPY', 'USDCHF', 'USDCAD',
  'EURGBP', 'EURJPY', 'GBPJPY', 'EURCHF', 'EURAUD', 'EURCAD', 'EURNZD',
  'GBPAUD', 'GBPCAD', 'GBPCHF', 'GBPNZD', 'AUDCAD', 'AUDCHF', 'AUDNZD',
  'CADJPY', 'CADCHF', 'CHFJPY', 'NZDCAD', 'NZDCHF', 'NZDJPY', 'USDSGD'
]);

/**
 * Accurate base prices for stocks, indices, commodities, ETFs, futures (Feb 2026).
 * These seed the random-walk simulation so displayed values start realistically.
 */
const STATIC_BASE: Record<string, number> = {
  // ── Stocks ──────────────────────────────────────────────────────────────
  AAPL: 228,    MSFT: 415,    GOOGL: 173,   GOOG:  173,   AMZN: 225,
  TSLA: 330,    META: 645,    NVDA: 140,    JPM:   258,   V:    340,
  WMT:   97,    JNJ:  155,    XOM:  108,    BAC:    47,   'BRK.B': 455,
  UNH:  520,    MA:   535,    HD:   415,    PG:    168,   KO:    62,
  ABBV: 195,    PFE:   26,    MRK:   87,    CVX:   152,   AVGO: 215,
  LLY:  870,    COST: 1020,   ORCL: 180,    ACN:   350,   AMD:  115,
  INTC:  20,    CRM:  330,    ADBE: 435,    NFLX: 1050,   DIS:  108,
  PYPL:  83,    UBER:  82,    SHOP: 120,    SQ:     85,   SPOT: 650,
  COIN: 280,    HOOD:  48,    PLTR: 120,    SNOW:  180,   DDOG: 130,
  ZM:    78,    TWLO:  90,    NET:  135,    RBLX:   52,   GME:   25,
  AMC:    4,
  // ── ETFs ────��───────────────────────────────────────────────────────────
  SPY:  595,    QQQ:  510,    VOO:  550,    VTI:   290,   IWM:  225,
  // ── Futures ─────────────────────────────────────────────────────────────
  ES:  5950,    NQ: 21000,    YM: 44000,    GC:   2900,   CL:    71,
  // ── Commodities ─────────────────────────────────────────────────────────
  XAUUSD: 2900, XAGUSD: 32,   USOIL: 71,    UKOIL: 75,
  // ── Indices ─────────────────────────────────────────────────────────────
  SPX:  5950,   DJI: 44000,   IXIC: 19800,  NDX: 21000,   RUT: 2250,
  VIX:   17,    RUT2000: 2250,
  // ── Economy ─────────────────────────────────────────────────────────────
  DXY:  107,    TNX:  4.25,   'BTC.D': 58,
  // ── Bonds ───────────────────────────────────────────────────────────────
  TLT:   89,    IEF:   95,    SHY:   82,    AGG:    97,   LQD:  106,
  // ── Crypto fallback (used when both Binance & CoinGecko are unreachable)
  BTCUSD: 92385, ETHUSD: 3793, USDTUSD: 1.00, BNBUSD: 612, ADAUSD: 0.64, SOLUSD: 102,
  XRPUSD: 0.62,  DOTUSD: 7.82, MATICUSD: 0.95, LINKUSD: 15.67, AVAXUSD: 38.92,
  DOGEUSD: 0.12, LTCUSD: 74.56, BCHUSD: 245, UNIUSD: 6.23, AAVEUSD: 98,
  ATOMUSD: 10.45, FILUSD: 5.89, NEARUSD: 5.80, APTUSD: 8.34, ARBUSD: 1.23,
  OPUSD: 2.15, SUIUSD: 1.45, XMRUSD: 165.34, ALGOUSD: 0.32, VETUSD: 0.04, ICPUSD: 12.78,
  // ── Options ─────────────────────────────────────────────────────────────
  'SPY-C-460': 12.45, 'SPY-P-450': 8.90, 'QQQ-C-380': 15.67,
  'AAPL-C-200': 6.78, 'TSLA-C-250': 18.90, 'NVDA-C-500': 24.56,
  'MSFT-P-370': 7.34, 'AMZN-C-155': 9.12, 'META-C-350': 13.45,
  'IWM-P-195': 5.67,
  // ── Options (chain-level symbols used in UI) ────────────────────────────
  'IWM-OPT': 5.25,   'EEM-OPT': 2.90,   'TLT-OPT': 3.65,
  // ── Altcoins ────────────────────────────────────────────────────────────
  SHIBUSDT: 0.000006, PEPEUSD: 0.000001, DOGEUSD: 0.12, XRPUSD: 0.62,
  SOLUSD: 102, ADAUSD: 0.64, DOTUSD: 7.82, TRXUSD: 0.11, TONUSD: 2.15,
};

// ============================================================
// HELPERS
// ============================================================

function formatVolume(n: number): string {
  if (n >= 1e12) return `${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9)  return `${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6)  return `${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3)  return `${(n / 1e3).toFixed(2)}K`;
  return n.toFixed(0);
}

/** Compute a bid/ask spread appropriate for the asset class. */
function makeSpread(price: number, isForex: boolean, isCrypto: boolean) {
  const frac = isForex ? 0.00015 : isCrypto ? 0.0003 : 0.001;
  const half = price * frac / 2;
  return { bid: price - half, ask: price + half };
}

/**
 * Compute a forex pair price from a USD-base rate object.
 * rates['EUR'] = how many EUR per 1 USD (i.e. 1/EURUSD)
 */
function computeForexPrice(symbol: string, rates: Record<string, number>): number | null {
  const r = rates;
  const inv = (k: string) => (r[k] ? 1 / r[k] : null);
  const dir = (k: string) => r[k] ?? null;
  const cross = (num: string, den: string) =>
    r[num] && r[den] ? r[num] / r[den] : null;

  switch (symbol) {
    case 'EURUSD': return inv('EUR');
    case 'GBPUSD': return inv('GBP');
    case 'AUDUSD': return inv('AUD');
    case 'NZDUSD': return inv('NZD');
    case 'USDJPY': return dir('JPY');
    case 'USDCHF': return dir('CHF');
    case 'USDCAD': return dir('CAD');
    case 'EURGBP': return cross('GBP', 'EUR');
    case 'EURJPY': return cross('JPY', 'EUR');
    case 'GBPJPY': return cross('JPY', 'GBP');
    case 'EURCHF': return cross('CHF', 'EUR');
    case 'EURAUD': return cross('AUD', 'EUR');
    case 'EURCAD': return cross('CAD', 'EUR');
    case 'EURNZD': return cross('NZD', 'EUR');
    case 'GBPAUD': return cross('AUD', 'GBP');
    case 'GBPCAD': return cross('CAD', 'GBP');
    case 'GBPCHF': return cross('CHF', 'GBP');
    case 'GBPNZD': return cross('NZD', 'GBP');
    case 'AUDCAD': return cross('CAD', 'AUD');
    case 'AUDCHF': return cross('CHF', 'AUD');
    case 'AUDNZD': return cross('NZD', 'AUD');
    case 'CADJPY': return cross('JPY', 'CAD');
    case 'CHFJPY': return cross('JPY', 'CHF');
    case 'NZDCAD': return cross('CAD', 'NZD');
    case 'NZDCHF': return cross('CHF', 'NZD');
    case 'NZDJPY': return cross('JPY', 'NZD');
    default: return null;
  }
}

// ============================================================
// PROVIDER
// ============================================================

// Create a deterministic fallback price until the websocket pushes real data
function buildFallbackPrice(symbol: string): MarketPrice {
  let base = 100;
  if (STATIC_BASE[symbol]) {
    base = STATIC_BASE[symbol];
  } else {
    const hash = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    if (symbol.includes('AAPL')) base = 180;
    else if (symbol.includes('TSLA')) base = 240;
    else if (symbol.includes('MSFT')) base = 400;
    else if (symbol.includes('GOOG')) base = 150;
    else if (symbol.includes('AMZN')) base = 175;
    else if (symbol.includes('NVDA')) base = 800;
    else if (symbol.includes('SPX'))  base = 5100;
    else if (symbol.includes('XAU'))  base = 2150;
    else if (symbol.includes('XAG'))  base = 24;
    else if (symbol.includes('OIL'))  base = 78;
    else {
      base = 10 + (hash % 1000); 
    }
  }

  const isCrypto = symbol.includes('BTC') || symbol.includes('ETH') || symbol.includes('USD') && !FOREX_SYMBOLS.has(symbol) || symbol.includes('SHIB') || symbol.includes('PEPE');
  const { bid, ask } = makeSpread(base, false, !!isCrypto);

  return {
    symbol,
    price: base,
    change: 0,
    changePercent: 0,
    high: base * 1.015,
    low: base * 0.985,
    open: base,
    volume: formatVolume(500000),
    bid,
    ask,
    lastUpdate: Date.now(),
  };
}

export function MarketDataProvider({ children }: { children: ReactNode }) {
  const [prices, setPrices]           = useState<Record<string, MarketPrice>>({});
  const [assets, setAssets]           = useState<MarketAsset[]>([]);
  const [assetsLoading, setAssetsLoading] = useState(false);
  const [isLoading, setIsLoading]     = useState(false);

  // ── Refs (avoid stale-closure issues in intervals/callbacks) ────────────
  const pricesRef       = useRef<Record<string, MarketPrice>>({});  // mirrors state
  const tvSocketRef     = useRef<TradingViewSocket | null>(null);
  const flushIntervalRef= useRef<ReturnType<typeof setInterval> | null>(null);
  const subscribedRef   = useRef<Set<string>>(new Set());

  // Pending updates from WebSocket to prevent excessive React re-renders
  const pendingUpdatesRef = useRef<Record<string, MarketPrice>>({});

  // ── Setup TradingView WebSocket ───────────────────────────────────────
  useEffect(() => {
    // Initialize TV WebSocket singleton
    const tvSocket = new TradingViewSocket();
    tvSocketRef.current = tvSocket;
    
    tvSocket.setOnDataCallback((symbol, update) => {
      // Merge partial update into existing price or pending update
      const existing = pendingUpdatesRef.current[symbol] || pricesRef.current[symbol] || buildFallbackPrice(symbol);
      const newPrice = { ...existing, ...update };
      
      // Calculate change and changePercent if missing from update but we got a new price
      if (update.price !== undefined && existing.open) {
        newPrice.change = newPrice.price - newPrice.open;
        if (newPrice.open > 0) {
          newPrice.changePercent = (newPrice.change / newPrice.open) * 100;
        }
      }
      
      pendingUpdatesRef.current[symbol] = newPrice;
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
    
    // Create immediate fallback to prevent showing $0.00 while weighting for WS connecting
    if (!pricesRef.current[symbol] && !pendingUpdatesRef.current[symbol]) {
      if (symbol === 'USDTUSD' || symbol === 'USDCUSD') {
        const fallback: MarketPrice = {
            symbol,
            price: 1.00,
            change: 0.00,
            changePercent: 0.00,
            volume: '5B',
            high: 1.001,
            low: 0.999,
            lastUpdate: Date.now(),
            open: 1.00,
            bid: 0.999,
            ask: 1.001
        };
        pricesRef.current[symbol] = fallback;
        pendingUpdatesRef.current[symbol] = fallback;
      } else {
        const fallback = buildFallbackPrice(symbol);
        pricesRef.current[symbol] = fallback;
        pendingUpdatesRef.current[symbol] = fallback;
      }
      
      // Force an immediate update
      setPrices(prev => ({ ...prev, [symbol]: pricesRef.current[symbol] }));
    }

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
        return;
      }
      
      if (data && data.length > 0) {
        const mappedAssets: MarketAsset[] = data.map(dbAsset => {
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
        setAssets(mappedAssets);
        
        // Also subscribe to these symbols
        mappedAssets.forEach(a => subscribeToSymbol(a.symbol));
      }
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
    ];
    defaults.forEach(s => subscribeToSymbol(s));

    return () => {
      subscribedRef.current.clear();
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
  };

  return (
    <MarketDataContext.Provider value={value}>
      {children}
    </MarketDataContext.Provider>
  );
}