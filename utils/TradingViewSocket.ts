// TradingView Live Tunnel API
// Connects to TradingView's free internal websocket to stream real-time price data
// Includes robust reconnection with exponential backoff for production deployments

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
  'WTIUSD': 'TVC:USOIL',
  'USOIL': 'TVC:USOIL',
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
  'TVC:USOIL': 'WTIUSD',
  'TVC:UKOIL': 'BCOUSD',
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

// ============================================================
// RECONNECTION CONFIGURATION
// ============================================================

const RECONNECT_BASE_MS      = 2_000;    // Start at 2 seconds
const RECONNECT_MAX_MS        = 120_000;  // Cap at 2 minutes
const RECONNECT_MAX_ATTEMPTS  = 50;       // After this many failures, signal fallback mode
const HEARTBEAT_TIMEOUT_MS    = 45_000;   // If no heartbeat for 45s, assume dead connection

export class TradingViewSocket {
  private ws: WebSocket | null = null;
  private readonly sessionId: string;
  private onDataCallback: SymbolDataCallback | null = null;
  private subscribedSymbols: Set<string> = new Set();
  private tvToOurSymbolMap: Map<string, string> = new Map();
  public isConnected: boolean = false;

  // Reconnection state
  private reconnectTimer: any = null;
  private reconnectAttempts: number = 0;
  private intentionallyClosed: boolean = false;

  // Heartbeat monitoring
  private lastHeartbeat: number = 0;
  private heartbeatCheckTimer: any = null;

  // Visibility tracking
  private visibilityHandler: (() => void) | null = null;

  // Fallback mode — signals to consumers that WS is persistently failing
  public isFallbackMode: boolean = false;
  private onFallbackCallback: (() => void) | null = null;

  constructor() {
    this.sessionId = 'qs_' + Math.random().toString(36).substring(2, 15);
    this.setupVisibilityTracking();
  }

  /**
   * When the tab becomes visible again and we're disconnected, try reconnecting
   */
  private setupVisibilityTracking() {
    if (typeof document === 'undefined') return;

    this.visibilityHandler = () => {
      if (document.visibilityState === 'visible' && !this.isConnected && !this.intentionallyClosed) {
        console.log('[TV Live Tunnel] Tab became visible — attempting reconnection');
        // Reset backoff when user returns to tab
        this.reconnectAttempts = Math.max(0, this.reconnectAttempts - 3);
        this.scheduleReconnect();
      }
    };
    document.addEventListener('visibilitychange', this.visibilityHandler);
  }

  public connect() {
    if (this.ws && (this.ws.readyState === WebSocket.CONNECTING || this.ws.readyState === WebSocket.OPEN)) return;
    if (this.intentionallyClosed) return;

    console.log(`[TV Live Tunnel] Connecting... (attempt ${this.reconnectAttempts + 1})`);
    
    try {
      this.ws = new WebSocket('wss://data.tradingview.com/socket.io/websocket?from=chart');
    } catch (err) {
      console.error('[TV Live Tunnel] Failed to create WebSocket:', err);
      this.handleConnectionFailure();
      return;
    }
    
    this.ws.onopen = () => {
      console.log('[TV Live Tunnel] Connected ✓');
      this.isConnected = true;
      this.isFallbackMode = false;
      this.reconnectAttempts = 0; // Reset on successful connection
      this.lastHeartbeat = Date.now();
      
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
          this.sendMessage('quote_add_symbols', [this.sessionId, ...batch]);
        }
      }

      // Start heartbeat monitoring
      this.startHeartbeatMonitor();
    };

    this.ws.onmessage = (event) => {
      this.handleMessage(event.data.toString());
    };

    this.ws.onclose = (event) => {
      const reason = event.reason || 'unknown';
      const code = event.code;
      console.log(`[TV Live Tunnel] Disconnected (code: ${code}, reason: ${reason})`);
      this.isConnected = false;
      this.ws = null;
      this.stopHeartbeatMonitor();
      
      if (!this.intentionallyClosed) {
        this.handleConnectionFailure();
      }
    };

    this.ws.onerror = (err) => {
      console.error('[TV Live Tunnel] WebSocket Error:', err);
      // onerror is always followed by onclose, so don't reconnect here
    };
  }

  /**
   * Handle a connection failure — exponential backoff with jitter
   */
  private handleConnectionFailure() {
    this.reconnectAttempts++;

    if (this.reconnectAttempts >= RECONNECT_MAX_ATTEMPTS && !this.isFallbackMode) {
      console.warn(`[TV Live Tunnel] Max reconnect attempts (${RECONNECT_MAX_ATTEMPTS}) reached. Switching to REST API fallback mode.`);
      this.isFallbackMode = true;
      this.onFallbackCallback?.();
      // Keep trying occasionally (every 2 minutes) in case TV comes back
    }

    this.scheduleReconnect();
  }

  /**
   * Schedule a reconnection with exponential backoff + jitter
   */
  private scheduleReconnect() {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    if (this.intentionallyClosed) return;

    // Don't try to reconnect if tab is hidden (save resources)
    if (typeof document !== 'undefined' && document.visibilityState === 'hidden') {
      console.log('[TV Live Tunnel] Tab hidden — deferring reconnect until visible');
      return;
    }

    // Exponential backoff: 2s, 4s, 8s, 16s, 32s, 64s, 120s (capped)
    const baseDelay = Math.min(
      RECONNECT_BASE_MS * Math.pow(2, this.reconnectAttempts - 1),
      RECONNECT_MAX_MS
    );
    // Add jitter (±25%) to prevent thundering herd
    const jitter = baseDelay * (0.75 + Math.random() * 0.5);
    const delay = Math.round(jitter);

    console.log(`[TV Live Tunnel] Reconnecting in ${(delay / 1000).toFixed(1)}s (attempt ${this.reconnectAttempts})`);
    
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.connect();
    }, delay);
  }

  /**
   * Monitor heartbeats — TV sends ~h~ pings every ~30s.
   * If we don't receive one in 45s, force-close and reconnect.
   */
  private startHeartbeatMonitor() {
    this.stopHeartbeatMonitor();
    this.lastHeartbeat = Date.now();

    this.heartbeatCheckTimer = setInterval(() => {
      const elapsed = Date.now() - this.lastHeartbeat;
      if (elapsed > HEARTBEAT_TIMEOUT_MS && this.isConnected) {
        console.warn(`[TV Live Tunnel] No heartbeat for ${(elapsed / 1000).toFixed(0)}s — forcing reconnect`);
        this.ws?.close();
      }
    }, 15_000); // Check every 15 seconds
  }

  private stopHeartbeatMonitor() {
    if (this.heartbeatCheckTimer) {
      clearInterval(this.heartbeatCheckTimer);
      this.heartbeatCheckTimer = null;
    }
  }

  /**
   * Register a callback that fires when WS is persistently failing
   * and the consumer should switch to REST API polling.
   */
  public onFallback(callback: () => void) {
    this.onFallbackCallback = callback;
    // If already in fallback mode, fire immediately
    if (this.isFallbackMode) callback();
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
        // Heartbeat — respond and update last-seen timestamp
        this.lastHeartbeat = Date.now();
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
            console.error(`[TV Live Tunnel] Error for symbol ${tvName}:`, entry.errmsg || 'Unknown error');
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
        // Ignore JSON errors
      }
    }
  }
  
  public cleanup() {
    this.intentionallyClosed = true;
    
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.stopHeartbeatMonitor();

    // Remove visibility listener
    if (this.visibilityHandler && typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', this.visibilityHandler);
      this.visibilityHandler = null;
    }
  }
}

// Duplicate formatter from context to be used here
function formatVolume(n: number): string {
  if (n >= 1e12) return `${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9)  return `${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6)  return `${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3)  return `${(n / 1e3).toFixed(2)}K`;
  return n.toFixed(0);
}

// Re-export MarketPrice type for consumers
export type { MarketPrice };
