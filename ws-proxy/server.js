// TradingView WebSocket Proxy Server
// Deploys to Render.com (free tier) to relay WebSocket connections
// with a localhost Origin header so TradingView accepts them.

const WebSocket = require('ws');
const http = require('http');

const TV_URL = 'wss://data.tradingview.com/socket.io/websocket?from=chart/';
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '*').split(',');

const server = http.createServer((req, res) => {
  // Health check endpoint for Render
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'ok', 
      connections: wss.clients.size,
      uptime: process.uptime() 
    }));
    return;
  }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('TradingView WebSocket Proxy — connect via WebSocket');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (clientWs, req) => {
  const clientOrigin = req.headers.origin || 'unknown';
  console.log(`[Proxy] Client connected from: ${clientOrigin}`);

  // Optional: origin allowlist
  if (ALLOWED_ORIGINS[0] !== '*' && !ALLOWED_ORIGINS.includes(clientOrigin)) {
    console.log(`[Proxy] Blocked origin: ${clientOrigin}`);
    clientWs.close(4003, 'Origin not allowed');
    return;
  }

  // Connect to TradingView with spoofed origin
  const tvWs = new WebSocket(TV_URL, {
    headers: {
      'Origin': 'https://www.tradingview.com',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });

  let tvConnected = false;
  let clientQueue = []; // Buffer messages until TV connection is open

  tvWs.on('open', () => {
    tvConnected = true;
    console.log('[Proxy] Connected to TradingView');
    // Flush buffered messages
    clientQueue.forEach(msg => tvWs.send(msg));
    clientQueue = [];
  });

  // Relay: TradingView → Client
  tvWs.on('message', (data) => {
    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(data.toString());
    }
  });

  // Relay: Client → TradingView
  clientWs.on('message', (data) => {
    const msg = data.toString();
    if (tvConnected && tvWs.readyState === WebSocket.OPEN) {
      tvWs.send(msg);
    } else {
      clientQueue.push(msg); // Buffer until TV is connected
    }
  });

  // Cleanup on either side closing
  tvWs.on('close', (code, reason) => {
    console.log(`[Proxy] TradingView disconnected (code: ${code})`);
    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.close(1000, 'Upstream closed');
    }
  });

  clientWs.on('close', () => {
    console.log('[Proxy] Client disconnected');
    if (tvWs.readyState === WebSocket.OPEN || tvWs.readyState === WebSocket.CONNECTING) {
      tvWs.close();
    }
  });

  tvWs.on('error', (err) => {
    console.error('[Proxy] TradingView error:', err.message);
  });

  clientWs.on('error', (err) => {
    console.error('[Proxy] Client error:', err.message);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`[Proxy] WebSocket proxy listening on port ${PORT}`);
});
