// @refresh reset
import { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from 'react';

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
  category: 'crypto' | 'forex' | 'stocks' | 'commodities';
  base_currency: string;
  quote_currency: string;
  min_trade_amount: number;
  max_leverage: number;
  is_active: boolean;
  icon_url?: string;
  description?: string;
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
  'EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF', 'AUDUSD',
  'USDCAD', 'NZDUSD', 'EURGBP', 'EURJPY', 'GBPJPY',
  'EURCHF', 'AUDCAD', 'AUDCHF', 'AUDNZD', 'CADJPY',
  'CHFJPY', 'EURAUD', 'EURCAD', 'EURNZD', 'GBPAUD',
  'GBPCAD', 'GBPCHF', 'GBPNZD', 'NZDCAD', 'NZDCHF', 'NZDJPY',
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
  'SPY-OPT': 14.25,  'QQQ-OPT': 16.80,  'AAPL-OPT': 7.45,
  'TSLA-OPT': 22.30, 'NVDA-OPT': 19.60, 'AMD-OPT': 8.15,
  'META-OPT': 15.90, 'AMZN-OPT': 11.35, 'GOOGL-OPT': 9.75,
  'MSFT-OPT': 12.50, 'VIX-OPT': 3.40,   'GLD-OPT': 6.80,
  'IWM-OPT': 5.25,   'EEM-OPT': 2.90,   'TLT-OPT': 3.65,
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

export function MarketDataProvider({ children }: { children: ReactNode }) {
  const [prices, setPrices]           = useState<Record<string, MarketPrice>>({});
  const [assets, setAssets]           = useState<MarketAsset[]>([]);
  const [assetsLoading, setAssetsLoading] = useState(false);
  const [isLoading, setIsLoading]     = useState(false);

  // ── Refs (avoid stale-closure issues in intervals/callbacks) ────────────
  const pricesRef       = useRef<Record<string, MarketPrice>>({});  // mirrors state
  const forexRatesRef   = useRef<Record<string, number>>({});       // USD-base FX rates
  const forexFetchedAt  = useRef<number>(0);
  const staticWalkRef   = useRef<Record<string, number>>({});       // random-walk prices
  const tickIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const subscribedRef   = useRef<Set<string>>(new Set());
  const fetchPriceRef   = useRef<(symbol: string) => Promise<void>>();

  // CoinGecko batch cache: one API call for ALL crypto symbols
  const coinGeckoCacheRef    = useRef<Record<string, MarketPrice>>({});
  const coinGeckoFetchedAt   = useRef<number>(0);
  const coinGeckoFetchingRef = useRef<Promise<void> | null>(null);

  // Keep pricesRef in sync with state
  const setAndCachePrices = useCallback((updater: (prev: Record<string, MarketPrice>) => Record<string, MarketPrice>) => {
    setPrices(prev => {
      const next = updater(prev);
      pricesRef.current = next;
      return next;
    });
  }, []);

  // ── Forex: fetch rates from open.er-api.com ──────────────────────────────
  const fetchForexRates = useCallback(async () => {
    const now = Date.now();
    // Refresh at most every 5 minutes
    if (now - forexFetchedAt.current < 5 * 60 * 1000 && Object.keys(forexRatesRef.current).length > 0) return;
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD', { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      if (data.result === 'success' && data.rates) {
        forexRatesRef.current = data.rates as Record<string, number>;
        forexFetchedAt.current = now;
      }
    } catch {
      // silently ignore - will retry on next interval
    }
  }, []);

  // ── Crypto: fetch from Binance REST (free, no CORS) ──────────────────────
  const fetchBinancePrice = useCallback(async (symbol: string): Promise<MarketPrice | null> => {
    const pair = BINANCE_PAIR[symbol];
    if (!pair) return null;
    try {
      const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${pair}`, { cache: 'no-store' });
      if (!res.ok) return null;
      const d = await res.json();

      const price         = parseFloat(d.lastPrice);
      const open          = parseFloat(d.openPrice);
      const high          = parseFloat(d.highPrice);
      const low           = parseFloat(d.lowPrice);
      const changePercent = parseFloat(d.priceChangePercent);
      const change        = price - open;
      const quoteVolume   = parseFloat(d.quoteVolume);

      // Prefer Binance's real bid/ask; fall back to tight spread
      const rawBid = parseFloat(d.bidPrice);
      const rawAsk = parseFloat(d.askPrice);
      const { bid, ask } = makeSpread(price, false, true);

      return {
        symbol,
        price,
        change,
        changePercent,
        high,
        low,
        open,
        volume: formatVolume(quoteVolume),
        bid: rawBid > 0 ? rawBid : bid,
        ask: rawAsk > 0 ? rawAsk : ask,
        lastUpdate: Date.now(),
      };
    } catch {
      return null;
    }
  }, []);

  // ── Crypto: CoinGecko batch cache (1 request for ALL 26 coins) ─────────
  // Uses /coins/markets which returns price, high_24h, low_24h, change%, volume
  // in a single request. Cache is shared across all per-symbol lookups.
  const refreshCoinGeckoCache = useCallback(async (): Promise<void> => {
    const now = Date.now();
    // Still fresh? Skip.
    if (now - coinGeckoFetchedAt.current < COINGECKO_CACHE_TTL_MS
        && Object.keys(coinGeckoCacheRef.current).length > 0) return;

    // If already fetching, await the existing promise (dedup concurrent calls)
    if (coinGeckoFetchingRef.current) {
      await coinGeckoFetchingRef.current;
      return;
    }

    const fetchPromise = (async () => {
      try {
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ALL_COINGECKO_IDS}&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h`;
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) return;
        const coins: Array<{
          id: string;
          current_price: number;
          high_24h: number | null;
          low_24h: number | null;
          price_change_percentage_24h: number | null;
          total_volume: number | null;
        }> = await res.json();

        const cache: Record<string, MarketPrice> = {};
        for (const coin of coins) {
          const symbol = COINGECKO_ID_TO_SYMBOL[coin.id];
          if (!symbol) continue;

          const price         = coin.current_price ?? 0;
          const high          = coin.high_24h ?? price * 1.005;
          const low           = coin.low_24h ?? price * 0.995;
          const changePercent = coin.price_change_percentage_24h ?? 0;
          const open          = price / (1 + changePercent / 100);
          const change        = price - open;
          const volume        = coin.total_volume ?? 0;
          const { bid, ask }  = makeSpread(price, false, true);

          cache[symbol] = {
            symbol,
            price,
            change,
            changePercent,
            high,
            low,
            open,
            volume: formatVolume(volume),
            bid,
            ask,
            lastUpdate: Date.now(),
          };
        }

        coinGeckoCacheRef.current = cache;
        coinGeckoFetchedAt.current = Date.now();
      } catch {
        // silently ignore - will retry next cycle
      }
    })();

    coinGeckoFetchingRef.current = fetchPromise;
    await fetchPromise;
    coinGeckoFetchingRef.current = null;
  }, []);

  /** Read a single symbol from the CoinGecko batch cache (refreshes if stale). */
  const getCoinGeckoPrice = useCallback(async (symbol: string): Promise<MarketPrice | null> => {
    if (!COINGECKO_ID[symbol]) return null;
    await refreshCoinGeckoCache();
    return coinGeckoCacheRef.current[symbol] ?? null;
  }, [refreshCoinGeckoCache]);

  // ── Forex: build a MarketPrice from cached FX rates ──────────────────────
  const buildForexPrice = useCallback((symbol: string): MarketPrice | null => {
    const base = computeForexPrice(symbol, forexRatesRef.current);
    if (!base) return null;

    // Micro random-walk (+-0.02%) to simulate live tick movement
    const prev = staticWalkRef.current[symbol] ?? base;
    const drift = (Math.random() - 0.5) * 0.0004;
    const price = prev * (1 + drift);
    staticWalkRef.current[symbol] = price;

    const open   = base; // treat fresh API rate as "day open"
    const change = price - open;
    const changePercent = (change / open) * 100;
    const { bid, ask } = makeSpread(price, true, false);

    // Typical forex daily range ~ +-0.3%
    return {
      symbol,
      price,
      change,
      changePercent,
      high: Math.max(price, base) * 1.003,
      low:  Math.min(price, base) * 0.997,
      open,
      volume: 'N/A',
      bid,
      ask,
      lastUpdate: Date.now(),
    };
  }, []);

  // ── Static assets: seed + random-walk tick ─────────────────────────────
  const buildStaticPrice = useCallback((symbol: string): MarketPrice | null => {
    const base = STATIC_BASE[symbol];
    if (base === undefined) return null;

    if (!staticWalkRef.current[symbol]) {
      staticWalkRef.current[symbol] = base;
    }

    // Small drift: +-0.05% per tick (stocks/commodities/indices are less volatile per second)
    const drift = (Math.random() - 0.5) * 0.001;
    const price = staticWalkRef.current[symbol] * (1 + drift);
    staticWalkRef.current[symbol] = price;

    const change        = price - base;
    const changePercent = (change / base) * 100;
    const { bid, ask }  = makeSpread(price, false, false);

    return {
      symbol,
      price,
      change,
      changePercent,
      high: price * 1.005,
      low:  price * 0.995,
      open: base,
      volume: formatVolume(Math.random() * 5e7),
      bid,
      ask,
      lastUpdate: Date.now(),
    };
  }, []);

  // ── Master fetch: dispatch to right source ────────────────────────────
  const fetchPrice = useCallback(async (symbol: string) => {
    let data: MarketPrice | null = null;

    if (BINANCE_PAIR[symbol]) {
      // Primary: Binance -> Fallback: CoinGecko batch cache -> Last resort: Static simulation
      data = await fetchBinancePrice(symbol);
      if (!data) {
        data = await getCoinGeckoPrice(symbol);
      }
      if (!data) {
        data = buildStaticPrice(symbol);
      }
    } else if (COINGECKO_ID[symbol]) {
      // Crypto without a Binance pair (e.g. USDTUSD) — CoinGecko primary, static fallback
      data = await getCoinGeckoPrice(symbol);
      if (!data) {
        data = buildStaticPrice(symbol);
      }
    } else if (FOREX_SYMBOLS.has(symbol)) {
      // Ensure forex rates are loaded
      await fetchForexRates();
      data = buildForexPrice(symbol);
    } else {
      data = buildStaticPrice(symbol);
    }

    if (data) {
      setAndCachePrices(prev => ({ ...prev, [symbol]: data! }));
    }
  }, [fetchBinancePrice, getCoinGeckoPrice, fetchForexRates, buildForexPrice, buildStaticPrice, setAndCachePrices]);

  // Keep fetchPriceRef in sync so the interval always calls the latest version
  fetchPriceRef.current = fetchPrice;

  // ── Subscription management ──────────────────────────────────────────────
  // Standard 5-second interval for ALL asset types (batched single tick)
  const TICK_INTERVAL_MS = 5000;

  const startTickInterval = useCallback(() => {
    if (tickIntervalRef.current) return; // already running
    tickIntervalRef.current = setInterval(() => {
      const symbols = Array.from(subscribedRef.current);
      if (symbols.length === 0) return;
      // Fetch all subscribed symbols in one batched tick
      symbols.forEach(symbol => fetchPriceRef.current?.(symbol));
    }, TICK_INTERVAL_MS);
  }, []);

  const stopTickInterval = useCallback(() => {
    if (tickIntervalRef.current) {
      clearInterval(tickIntervalRef.current);
      tickIntervalRef.current = null;
    }
  }, []);

  const subscribeToSymbol = useCallback((symbol: string) => {
    if (subscribedRef.current.has(symbol)) return;
    subscribedRef.current.add(symbol);

    // Immediate fetch for new subscription only
    fetchPriceRef.current?.(symbol);

    // Ensure the single batched interval is running
    startTickInterval();
  }, [startTickInterval]);

  const unsubscribeFromSymbol = useCallback((symbol: string) => {
    subscribedRef.current.delete(symbol);
    // Stop the interval if no more subscriptions
    if (subscribedRef.current.size === 0) {
      stopTickInterval();
    }
  }, [stopTickInterval]);

  // ── Seed popular symbols on mount ────────────────────────────────────────
  useEffect(() => {
    // Fetch forex rates once at startup
    fetchForexRates();

    const defaults = [
      'BTCUSD', 'ETHUSD', 'EURUSD', 'GBPUSD', 'AAPL', 'TSLA',
      'XAUUSD', 'SPX', 'USDJPY', 'MSFT', 'GOOGL', 'AMZN',
      'BNBUSD', 'SOLUSD', 'XRPUSD', 'NVDA', 'META',
    ];
    defaults.forEach(s => subscribeToSymbol(s));

    return () => {
      // Cleanup the single batched interval on unmount
      stopTickInterval();
      subscribedRef.current.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Market asset list (optional DB fetch) ────────────────────────────────
  const refreshAssets = useCallback(async () => {
    setAssetsLoading(true);
    try {
      // Future: replace with your Supabase endpoint
      // const res = await fetch(`${serverUrl}/market-assets`, { headers: apiHeaders });
      // setAssets(await res.json());
    } catch {
      // silently ignore
    } finally {
      setAssetsLoading(false);
    }
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