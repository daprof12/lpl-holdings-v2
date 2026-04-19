// TradingView Live Tunnel API
// Connects to TradingView's free internal websocket to stream real-time price data

import { MarketPrice } from '../contexts/MarketDataContext';

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
  'NATGAS': 'TVC:NATGAS'
};

const REVERSE_COMMODITIES_MAP: Record<string, string> = {
  'TVC:GOLD': 'XAUUSD',
  'TVC:SILVER': 'XAGUSD',
  'TVC:PLATINUM': 'XPTUSD',
  'TVC:PALLADIUM': 'XPDUSD',
  'TVC:USOIL': 'WTIUSD',
  'TVC:UKOIL': 'BCOUSD',
  'TVC:NATGAS': 'NATGAS'
};

/**
 * Normalizes our symbols (BTCUSD, AAPL, SPX) to TradingView symbols format
 */
function getTVSymbol(ourSymbol: string): string {
  if (COMMODITIES_MAP[ourSymbol]) {
    return COMMODITIES_MAP[ourSymbol];
  }

  const forex = ['EURUSD', 'GBPUSD', 'AUDUSD', 'NZDUSD', 'USDJPY', 'USDCHF', 'USDCAD', 'EURGBP', 'EURJPY', 'GBPJPY'];
  const crypto = ['BTC', 'ETH', 'BNB', 'SOL', 'XRP', 'ADA', 'DOGE', 'AVAX', 'DOT', 'MATIC', 'LINK'];
  
  if (ourSymbol.includes('USD') && (!forex.includes(ourSymbol))) {
    const base = ourSymbol.replace('USD', '');
    if (crypto.includes(base) || ourSymbol.length >= 6) {
      if (ourSymbol === 'USDTUSD') return 'CRYPTOCAP:USDT'; // Best effort for tether
      return `BINANCE:${base}USDT`; 
    }
  }
  
  if (forex.includes(ourSymbol)) return `OANDA:${ourSymbol}`;
  if (ourSymbol === 'SPX') return 'SP:SPX';
  if (ourSymbol === 'NDX') return 'NASDAQ:NDX';
  if (ourSymbol === 'DJI') return 'DJ:DJI';
  
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

  const parts = tvSymbol.split(':');
  const symbol = parts[parts.length - 1]; // e.g., "BTCUSDT" or "AAPL"
  
  if (tvSymbol.startsWith('BINANCE:') && symbol.endsWith('USDT')) {
    return symbol.replace('USDT', 'USD');
  }
  return symbol;
}

export class TradingViewSocket {
  private ws: WebSocket | null = null;
  private readonly sessionId: string;
  private onDataCallback: SymbolDataCallback | null = null;
  private subscribedSymbols: Set<string> = new Set();
  public isConnected: boolean = false;
  private reconnectTimer: any = null;

  constructor() {
    this.sessionId = 'qs_' + Math.random().toString(36).substring(2, 15);
  }

  public connect() {
    if (this.ws && (this.ws.readyState === WebSocket.CONNECTING || this.ws.readyState === WebSocket.OPEN)) return;

    console.log('[TV Live Tunnel] Connecting...');
    // Connect to global socket.io, ignoring origin restrictions via some proxies if needed, 
    // but typically web browsers let websockets bypass CORS if the server doesn't strictly check Origin,
    // though TV might block browser origin. Let's try native browser WS.
    this.ws = new WebSocket('wss://data.tradingview.com/socket.io/websocket?from=chart');
    
    this.ws.onopen = () => {
      console.log('[TV Live Tunnel] Connected');
      this.isConnected = true;
      if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
      
      this.sendMessage('set_auth_token', ['unauthorized_user_token']);
      this.sendMessage('quote_create_session', [this.sessionId]);
      this.sendMessage('quote_set_fields', [
        this.sessionId,
        'lp', 'ch', 'chp', 'volume', 'bid', 'ask', 'open_price', 'high_price', 'low_price'
      ]);

      // Resubscribe if there are existing symbols
      if (this.subscribedSymbols.size > 0) {
        const tvSymbols = Array.from(this.subscribedSymbols).map(getTVSymbol);
        this.sendMessage('quote_add_symbols', [this.sessionId, ...tvSymbols]);
      }
    };

    this.ws.onmessage = (event) => {
      this.handleMessage(event.data.toString());
    };

    this.ws.onclose = () => {
      console.log('[TV Live Tunnel] Disconnected');
      this.isConnected = false;
      this.ws = null;
      this.reconnect();
    };

    this.ws.onerror = (err) => {
      console.error('[TV Live Tunnel] WebSocket Error:', err);
    };
  }

  private reconnect() {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, 5000);
  }

  public setOnDataCallback(callback: SymbolDataCallback) {
    this.onDataCallback = callback;
  }

  public subscribe(symbol: string) {
    if (!this.subscribedSymbols.has(symbol)) {
      this.subscribedSymbols.add(symbol);
      if (this.isConnected && this.ws) {
        this.sendMessage('quote_add_symbols', [this.sessionId, getTVSymbol(symbol)]);
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
          const tvName = parsed.p[1].n;
          const status = parsed.p[1].s; // "ok" or "error"
          const data = parsed.p[1].v;
          
          if (status === 'ok' && data && this.onDataCallback) {
            const ourSymbol = getOurSymbol(tvName);
            
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
            
            if (Object.keys(update).length > 1) { // >1 because lastUpdate is always set
              this.onDataCallback(ourSymbol, update);
            }
          }
        }
      } catch (err) {
        // console.warn("Failed to parse TV message:", payload);
      }
    }
  }
  
  public cleanup() {
    if (this.ws) {
      this.ws.close();
    }
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
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
