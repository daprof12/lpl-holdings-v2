import { useState, useEffect } from 'react';
import { formatCurrency, formatNumber } from '../../utils/formatNumber';

interface OrderBookProps {
  symbol: string;
}

export default function OrderBook({ symbol }: OrderBookProps) {
  const [orderBook, setOrderBook] = useState({
    bids: [] as Array<{ price: number; volume: number; total: number }>,
    asks: [] as Array<{ price: number; volume: number; total: number }>
  });

  useEffect(() => {
    // Generate mock order book data
    const basePrice = 45780;
    const generateOrders = (isAsk: boolean) => {
      const orders = [];
      let total = 0;
      
      for (let i = 0; i < 15; i++) {
        const priceOffset = (i * 5) * (isAsk ? 1 : -1);
        const price = basePrice + priceOffset;
        const volume = Math.random() * 2 + 0.1;
        total += volume;
        
        orders.push({
          price: parseFloat(price.toFixed(2)),
          volume: parseFloat(volume.toFixed(2)),
          total: parseFloat(total.toFixed(2))
        });
      }
      
      return isAsk ? orders : orders.reverse();
    };

    setOrderBook({
      bids: generateOrders(false),
      asks: generateOrders(true)
    });

    // Simulate real-time updates
    const interval = setInterval(() => {
      setOrderBook({
        bids: generateOrders(false),
        asks: generateOrders(true)
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [symbol]);

  const maxTotal = Math.max(
    ...orderBook.bids.map(b => b.total),
    ...orderBook.asks.map(a => a.total)
  );

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg mb-4">Order Book</h3>

      <div className="space-y-4">
        {/* Header */}
        <div className="grid grid-cols-3 text-xs text-gray-500 dark:text-gray-400 pb-2 border-b border-gray-200 dark:border-slate-700">
          <div className="text-left">Price</div>
          <div className="text-right">Volume</div>
          <div className="text-right">Total</div>
        </div>

        {/* Asks (Sell Orders) */}
        <div className="space-y-1">
          {orderBook.asks.slice().reverse().map((ask, index) => (
            <div
              key={`ask-${index}`}
              className="grid grid-cols-3 text-sm relative py-1 hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer"
            >
              {/* Background bar */}
              <div
                className="absolute right-0 top-0 bottom-0 bg-red-100 dark:bg-red-900/20"
                style={{ width: `${(ask.total / maxTotal) * 100}%` }}
              />
              
              <div className="text-red-600 dark:text-red-400 relative z-10">
                ${formatCurrency(ask.price)}
              </div>
              <div className="text-right relative z-10">{formatNumber(ask.volume)}</div>
              <div className="text-right relative z-10">{formatNumber(ask.total)}</div>
            </div>
          ))}
        </div>

        {/* Spread */}
        <div className="py-3 text-center">
          <div className="inline-block px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Spread</div>
            <div className="font-semibold">
              ${formatNumber(orderBook.asks[0]?.price - orderBook.bids[0]?.price)}
            </div>
          </div>
        </div>

        {/* Bids (Buy Orders) */}
        <div className="space-y-1">
          {orderBook.bids.slice(0, 15).map((bid, index) => (
            <div
              key={`bid-${index}`}
              className="grid grid-cols-3 text-sm relative py-1 hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer"
            >
              {/* Background bar */}
              <div
                className="absolute right-0 top-0 bottom-0 bg-green-100 dark:bg-green-900/20"
                style={{ width: `${(bid.total / maxTotal) * 100}%` }}
              />
              
              <div className="text-green-600 dark:text-green-400 relative z-10">
                ${formatCurrency(bid.price)}
              </div>
              <div className="text-right relative z-10">{formatNumber(bid.volume)}</div>
              <div className="text-right relative z-10">{formatNumber(bid.total)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}