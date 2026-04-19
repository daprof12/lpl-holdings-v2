const WebSocket = require('ws');
function createMessage(func, args) {
    let m = JSON.stringify({ m: func, p: args });
    return "~m~" + m.length + "~m~" + m;
}

const ws = new WebSocket("wss://data.tradingview.com/socket.io/websocket", {
    headers: {
        Origin: "https://www.tradingview.com"
    }
});

ws.on('open', () => {
    console.log("Connected");
    ws.send(createMessage("set_auth_token", ["unauthorized_user_token"]));
    ws.send(createMessage("quote_create_session", ["qs_12345"]));
    ws.send(createMessage("quote_set_fields", ["qs_12345", "lp", "ch", "chp", "volume", "bid", "ask"]));
    ws.send(createMessage("quote_add_symbols", ["qs_12345", "BINANCE:BTCUSDT", "BINANCE:ETHUSDT", "NASDAQ:AAPL"]));
});

ws.on('message', (data) => {
    console.log("Message:", data.toString());
});

ws.on('error', (err) => {
    console.error("Error:", err);
});
setTimeout(() => { ws.close(); console.log("Done"); }, 5000);
