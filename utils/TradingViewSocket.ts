// TradingView Live Tunnel API
// Connects to TradingView's free internal websocket to stream real-time price data

import { MarketPrice } from '../contexts/MarketDataContext';
import { CATALOGUE } from './assetCatalogue';

type SymbolDataCallback = (symbol: string, data: Partial<MarketPrice>) => void;

function createMessage(func: string, args: any[]) {
  const m = JSON.stringify({ m: func, p: args });
  return `~m~${m.length}~m~${m}`;
}

const COMMODITIES_MAP: Record<string, string> = {
  'XAUUSD': 'TVC:GOLD',
  'XAGUSD': 'TVC:SILVER',
  'XPTUSD': 'TVC:PLATINUM',
  'XPDUSD': 'TVC:PALLADIUM',
  'WTIUSD': 'BLACKBULL:WTI',
  'USOIL': 'BLACKBULL:WTI',
  'BCOUSD': 'TVC:UKOIL',
  'UKOIL': 'TVC:UKOIL',
  'NATGAS': 'TVC:NATGAS',
  'USDTUSD': 'KRAKEN:USDTUSD'
};

const REVERSE_COMMODITIES_MAP: Record<string, string> = {
  'TVC:GOLD': 'XAUUSD',
  'TVC:SILVER': 'XAGUSD',
  'TVC:PLATINUM': 'XPTUSD',
  'TVC:PALLADIUM': 'XPDUSD',
  'BLACKBULL:WTI': 'USOIL',
  'TVC:UKOIL': 'UKOIL',
  'TVC:NATGAS': 'NATGAS',
  'KRAKEN:USDTUSD': 'USDTUSD'
};

const INDICES_MAP: Record<string, string> = {
  'SPX': 'SP:SPX',
  'NDX': 'NASDAQ:NDX',
  'DJI': 'DJ:DJI',
  'US30': 'CAPITALCOM:US30',
  'UK100': 'CAPITALCOM:UK100',
  'GER30': 'CAPITALCOM:DE40',
  'GER40': 'CAPITALCOM:DE40',
  'FRA40': 'CAPITALCOM:FR40',
  'JPN225': 'CAPITALCOM:JP225',
  'AUS200': 'CAPITALCOM:AU200',
  'IXIC': 'NASDAQ:IXIC',
  'RUT': 'RUSSELL:RUT',
  'RUT2000': 'RUSSELL:RUT',
  'VIX': 'CBOE:VIX',
  'DXY': 'TVC:DXY',
  'TNX': 'TVC:US10Y',
  'TYX': 'TVC:US30Y',
  'IRX': 'TVC:US03Y',
  'HSI': 'HSI:HSI',
  'N225': 'TSE:NI225',
  'FTSE': 'FTSE:UK100',
};

const REVERSE_INDICES_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(INDICES_MAP).map(([sym, tvSym]) => [tvSym, sym])
);

const STOCKS_NASDAQ = ['AAPL', 'MSFT', 'GOOGL', 'GOOG', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX', 'PYPL', 'INTC', 'CMCSA', 'PEP', 'CSCO', 'ADBE', 'TXN', 'AVGO', 'QCOM', 'HON', 'AMGN', 'SBUX', 'GILD', 'MDLZ', 'FISV', 'BKNG', 'CHTR', 'VRTX', 'REGN', 'ISRG', 'AMD', 'MU', 'LRCX', 'ATVI', 'ILMN', 'ADSK', 'MELI', 'CRWD', 'PLTR', 'SNOW', 'DDOG', 'ZM', 'TWLO', 'NET', 'RBLX', 'COIN', 'HOOD', 'QQQ', 'TLT', 'IEF', 'SHY'];
const STOCKS_NYSE = ['JPM', 'V', 'JNJ', 'WMT', 'PG', 'MA', 'UNH', 'HD', 'BAC', 'DIS', 'CVX', 'KO', 'MRK', 'PFE', 'VZ', 'T', 'XOM', 'ABBV', 'CRM', 'NKE', 'MCD', 'DHR', 'PFE', 'LLY', 'NIO', 'BABA', 'GME', 'AMC', 'SQ', 'SPOT', 'SHOP', 'SPY', 'VOO', 'VTI', 'IWM', 'AGG', 'LQD'];

/**
 * Normalizes our symbols (BTCUSD, AAPL, SPX) to TradingView symbols format
 */
function getTVSymbol(ourSymbol: string): string {
  if (COMMODITIES_MAP[ourSymbol]) {
    return COMMODITIES_MAP[ourSymbol];
  }
  if (INDICES_MAP[ourSymbol]) {
    return INDICES_MAP[ourSymbol];
  }

  const forex = ['EURUSD', 'GBPUSD', 'AUDUSD', 'NZDUSD', 'USDJPY', 'USDCHF', 'USDCAD', 'EURGBP', 'EURJPY', 'GBPJPY', 'EURCHF', 'AUDCAD', 'AUDCHF', 'AUDNZD', 'CADJPY', 'CHFJPY', 'EURAUD', 'EURCAD', 'EURNZD', 'GBPAUD', 'GBPCAD', 'GBPCHF', 'GBPNZD', 'NZDCAD', 'NZDCHF', 'NZDJPY'];
  const crypto = ['BTC', 'ETH', 'BNB', 'SOL', 'XRP', 'ADA', 'DOGE', 'AVAX', 'DOT', 'MATIC', 'LINK', 'LTC', 'BCH', 'UNI', 'AAVE', 'ATOM', 'FIL', 'NEAR', 'APT', 'ARB', 'OP', 'SUI', 'XMR', 'ALGO', 'VET', 'ICP', 'SHIB', 'PEPE', 'FLOKI', 'BONK', 'TRX', 'TON', 'STX', 'LDO', 'ETC', 'XLM', 'CRO', 'HBAR', 'NEAR', 'GRT', 'MKR', 'BSV', 'THETA', 'RNDR'];

  // Try to find in catalogue for explicit exchange
  const catalogItem = CATALOGUE.find(i => i.symbol === ourSymbol);
  if (catalogItem && catalogItem.exchange && catalogItem.exchange !== 'FX') {
    const exchange = catalogItem.exchange.toUpperCase();
    if (exchange === 'BINANCE' && !ourSymbol.endsWith('USDT')) {
      const base = ourSymbol.endsWith('USD') ? ourSymbol.slice(0, -3) : ourSymbol;
      return `BINANCE:${base}USDT`;
    }

    // Futures usually need 1! for continuous front-month data
    if (catalogItem.category === 'Futures' && !ourSymbol.includes('1!')) {
      return `${exchange}:${ourSymbol}1!`;
    }

    return `${exchange}:${ourSymbol}`;
  }

  if ((ourSymbol.endsWith('USD') || ourSymbol.endsWith('USDT')) && !forex.includes(ourSymbol)) {
    let base = ourSymbol;
    if (ourSymbol.endsWith('USDT')) {
      base = ourSymbol.slice(0, -4);
    } else if (ourSymbol.endsWith('USD')) {
      base = ourSymbol.slice(0, -3);
    }

    if (crypto.includes(base) || ourSymbol.length > 5) {
      if (ourSymbol === 'USDTUSD' || ourSymbol === 'USDCUSD') return 'CRYPTOCAP:USDT'; // Best effort for stablecoins
      return `BINANCE:${base}USDT`;
    }
  }

  if (forex.includes(ourSymbol)) return `OANDA:${ourSymbol}`;

  if (STOCKS_NASDAQ.includes(ourSymbol)) return `NASDAQ:${ourSymbol}`;
  if (STOCKS_NYSE.includes(ourSymbol)) return `NYSE:${ourSymbol}`;

  // Try treating as a stock or generic asset if not explicitly mapped
  return ourSymbol;
}

/**
 * Reverse mapping from TV symbol to our symbol
 */
function getOurSymbol(tvSymbol: string): string {
  if (REVERSE_COMMODITIES_MAP[tvSymbol]) {
    return REVERSE_COMMODITIES_MAP[tvSymbol];
  }
  if (REVERSE_INDICES_MAP[tvSymbol]) {
    return REVERSE_INDICES_MAP[tvSymbol];
  }

  const parts = tvSymbol.split(':');
  let symbol = parts[parts.length - 1];

  // Strip Futures continuous suffix
  if (symbol.endsWith('1!')) {
    symbol = symbol.slice(0, -2);
  }

  return symbol;
}

// ── WebSocket Proxy Configuration ──────────────────────────────────────
// On localhost, TradingView accepts the connection directly.
// On production (Vercel), TradingView blocks the Origin, so we route
// through a small WebSocket proxy that spoofs the Origin header.
//
// Deploy the proxy from ws-proxy/ to Render.com and set this URL:
const WS_PROXY_URL = import.meta.env.VITE_WS_PROXY_URL || '';

const isLocalhost = typeof window !== 'undefined' && (
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1'
);

// Direct TradingView endpoints (work on localhost only)
const TV_DIRECT_ENDPOINTS = [
  'wss://data.tradingview.com/socket.io/websocket?from=chart/',
  'wss://data.tradingview.com/socket.io/websocket?from=chart',
  'wss://widgetdata.tradingview.com/socket.io/websocket?from=widgetpage',
  'wss://prodata.tradingview.com/socket.io/websocket?from=chart',
];

function getEndpoints(): string[] {
  if (isLocalhost) {
    // On localhost: connect directly (TradingView allows localhost Origin)
    return TV_DIRECT_ENDPOINTS;
  }

  // On production: use proxy first, then try direct as fallback
  if (WS_PROXY_URL) {
    const proxyWs = WS_PROXY_URL.replace(/^http/, 'ws'); // https://x → wss://x
    return [proxyWs, ...TV_DIRECT_ENDPOINTS];
  }

  // No proxy configured — try direct endpoints (may get blocked)
  console.warn('[TV Live Tunnel] No WS_PROXY_URL configured — direct connection may fail on production');
  return TV_DIRECT_ENDPOINTS;
}

const WS_ENDPOINTS = getEndpoints();

export class TradingViewSocket {
  private ws: WebSocket | null = null;
  private readonly sessionId: string;
  private onDataCallback: SymbolDataCallback | null = null;
  private subscribedSymbols: Set<string> = new Set();
  private tvToOurSymbolMap: Map<string, string> = new Map();
  public isConnected: boolean = false;
  private reconnectTimer: any = null;
  private keepAliveTimer: any = null;
  private reconnectAttempts: number = 0;
  private maxReconnectDelay: number = 60000; // Max 60s between retries
  private baseReconnectDelay: number = 2000;  // Start at 2s
  private currentEndpointIndex: number = 0;
  private isDestroyed: boolean = false;
  private lastMessageTime: number = 0;
  private visibilityHandler: (() => void) | null = null;

  constructor() {
    this.sessionId = 'qs_' + Math.random().toString(36).substring(2, 15);
    this.setupVisibilityHandler();
  }

  /**
   * Pause/resume the socket when the browser tab is hidden/visible.
   * This prevents Vercel/CDN idle-timeout disconnects when the user
   * switches tabs and also avoids reconnect storms.
   */
  private setupVisibilityHandler() {
    this.visibilityHandler = () => {
      if (document.hidden) {
        // Tab hidden — stop keepalive (let it disconnect naturally)
        this.stopKeepAlive();
      } else {
        // Tab visible again — reconnect if needed
        if (!this.isConnected && !this.isDestroyed) {
          console.log('[TV Live Tunnel] Tab visible — reconnecting...');
          this.reconnectAttempts = 0; // Reset backoff on manual visibility trigger
          this.reconnect();
        } else {
          this.startKeepAlive();
        }
      }
    };
    document.addEventListener('visibilitychange', this.visibilityHandler);
  }

  public connect() {
    if (this.isDestroyed) return;
    if (this.ws && (this.ws.readyState === WebSocket.CONNECTING || this.ws.readyState === WebSocket.OPEN)) return;

    const endpoint = WS_ENDPOINTS[this.currentEndpointIndex % WS_ENDPOINTS.length];
    console.log(`[TV Live Tunnel] Connecting to endpoint ${this.currentEndpointIndex % WS_ENDPOINTS.length + 1}/${WS_ENDPOINTS.length}...`);

    try {
      this.ws = new WebSocket(endpoint);
    } catch (err) {
      console.error('[TV Live Tunnel] Failed to create WebSocket:', err);
      this.scheduleReconnect();
      return;
    }

    this.ws.onopen = () => {
      console.log('[TV Live Tunnel] Connected ✓');
      this.isConnected = true;
      this.reconnectAttempts = 0; // Reset backoff on successful connection
      this.lastMessageTime = Date.now();
      if (this.reconnectTimer) {
        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = null;
      }

      this.sendMessage('set_auth_token', ['unauthorized_user_token']);
      this.sendMessage('quote_create_session', [this.sessionId]);
      this.sendMessage('quote_set_fields', [
        this.sessionId,
        'lp', 'ch', 'chp', 'volume', 'bid', 'ask', 'open_price', 'high_price', 'low_price'
      ]);

      // Resubscribe if there are existing symbols
      if (this.subscribedSymbols.size > 0) {
        const tvSymbols = Array.from(this.subscribedSymbols).map(getTVSymbol);
        // Batch resubscriptions to avoid payload size limits/server rejection
        const batchSize = 30;
        for (let i = 0; i < tvSymbols.length; i += batchSize) {
          const batch = tvSymbols.slice(i, i + batchSize);
          // Stagger batch sends to avoid server rate limits
          setTimeout(() => {
            this.sendMessage('quote_add_symbols', [this.sessionId, ...batch]);
          }, i / batchSize * 200);
        }
      }

      // Start keepalive pings
      this.startKeepAlive();
    };

    this.ws.onmessage = (event) => {
      this.lastMessageTime = Date.now();
      this.handleMessage(event.data.toString());
    };

    this.ws.onclose = (event) => {
      const reason = event.reason || 'unknown';
      const code = event.code;
      console.log(`[TV Live Tunnel] Disconnected (code: ${code}, reason: ${reason})`);
      this.isConnected = false;
      this.ws = null;
      this.stopKeepAlive();

      if (!this.isDestroyed) {
        // If the close code indicates a server rejection (403, 1008, etc.),
        // try the next endpoint
        if (code === 1006 || code === 1008 || code === 4003) {
          this.currentEndpointIndex++;
          console.log(`[TV Live Tunnel] Trying next endpoint...`);
        }
        this.scheduleReconnect();
      }
    };

    this.ws.onerror = (_err) => {
      // Don't log the raw Event object — it contains no useful info in browsers
      console.warn('[TV Live Tunnel] Connection error — will retry');
    };
  }

  /**
   * Send periodic "no-op" pings to keep the connection alive
   * and detect stale connections early.
   */
  private startKeepAlive() {
    this.stopKeepAlive();
    this.keepAliveTimer = setInterval(() => {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

      // If no message received in 30s, the connection is probably dead
      const elapsed = Date.now() - this.lastMessageTime;
      if (elapsed > 30000) {
        console.warn('[TV Live Tunnel] No data for 30s — forcing reconnect');
        this.ws.close();
        return;
      }

      // Send a lightweight heartbeat to keep the connection open through proxies/CDNs
      this.sendHeartbeat('~h~1');
    }, 15000); // Every 15 seconds
  }

  private stopKeepAlive() {
    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
  }

  /**
   * Exponential backoff with jitter: 2s, 4s, 8s, 16s, … up to 60s
   */
  private scheduleReconnect() {
    if (this.isDestroyed) return;
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);

    // Don't reconnect while tab is hidden
    if (document.hidden) {
      console.log('[TV Live Tunnel] Tab hidden — deferring reconnect until visible');
      return;
    }

    const delay = Math.min(
      this.baseReconnectDelay * Math.pow(2, this.reconnectAttempts),
      this.maxReconnectDelay
    );
    // Add random jitter (±25%) to prevent thundering herd
    const jitter = delay * 0.25 * (Math.random() * 2 - 1);
    const actualDelay = Math.round(delay + jitter);

    this.reconnectAttempts++;
    console.log(`[TV Live Tunnel] Reconnecting in ${(actualDelay / 1000).toFixed(1)}s (attempt ${this.reconnectAttempts})`);

    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.connect();
    }, actualDelay);
  }

  private reconnect() {
    this.scheduleReconnect();
  }

  public setOnDataCallback(callback: SymbolDataCallback) {
    this.onDataCallback = callback;
  }

  public subscribe(symbol: string) {
    if (!this.subscribedSymbols.has(symbol)) {
      this.subscribedSymbols.add(symbol);
      const tvSymbol = getTVSymbol(symbol);
      this.tvToOurSymbolMap.set(tvSymbol, symbol);
      if (this.isConnected && this.ws) {
        this.sendMessage('quote_add_symbols', [this.sessionId, tvSymbol]);
      }
    }
  }

  public unsubscribe(symbol: string) {
    if (this.subscribedSymbols.has(symbol)) {
      this.subscribedSymbols.delete(symbol);
      if (this.isConnected && this.ws) {
        this.sendMessage('quote_remove_symbols', [this.sessionId, getTVSymbol(symbol)]);
      }
    }
  }

  private sendMessage(func: string, args: any[]) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(createMessage(func, args));
    }
  }

  private sendHeartbeat(pingStr: string) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(`~m~${pingStr.length}~m~${pingStr}`);
    }
  }

  private handleMessage(dataStr: string) {
    // A single websocket frame can contain multiple ~m~ separated messages
    const parts = dataStr.split('~m~');
    for (let i = 0; i < parts.length; i++) {
      const payload = parts[i];
      if (!payload || payload.length === 0 || !isNaN(Number(payload))) continue; // Skip length indicators

      if (payload.startsWith('~h~')) {
        // Heartbeat
        this.sendHeartbeat(payload);
        continue;
      }

      try {
        const parsed = JSON.parse(payload);
        if (parsed.m === 'qsd' && parsed.p && parsed.p[1]) {
          const entry = parsed.p[1];
          const tvName = entry.n;
          const status = entry.s;
          const data = entry.v;

          if (status === 'error') {
            // Only log once per symbol, not on every tick
            continue;
          }

          if (data && this.onDataCallback) {
            const ourSymbol = this.tvToOurSymbolMap.get(tvName) || getOurSymbol(tvName);

            const update: Partial<MarketPrice> = {};
            if (data.lp !== undefined) update.price = data.lp;
            if (data.ch !== undefined) update.change = data.ch;
            if (data.chp !== undefined) update.changePercent = data.chp;
            if (data.open_price !== undefined) update.open = data.open_price;
            if (data.high_price !== undefined) update.high = data.high_price;
            if (data.low_price !== undefined) update.low = data.low_price;
            if (data.volume !== undefined) update.volume = formatVolume(data.volume);
            if (data.bid !== undefined) update.bid = data.bid;
            if (data.ask !== undefined) update.ask = data.ask;

            update.lastUpdate = Date.now();

            if (Object.keys(update).length > 1) {
              this.onDataCallback(ourSymbol, update);
            }
          }
        }
      } catch (err) {
        // Ignore JSON parse errors for non-JSON frames
      }
    }
  }

  public cleanup() {
    this.isDestroyed = true;
    this.stopKeepAlive();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.visibilityHandler) {
      document.removeEventListener('visibilitychange', this.visibilityHandler);
      this.visibilityHandler = null;
    }
  }
}

// Duplicate formatter from context to be used here
function formatVolume(n: number): string {
  if (n >= 1e12) return `${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(2)}K`;
  return n.toFixed(0);
}
