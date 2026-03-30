import { useState, useEffect } from 'react';
import { formatCurrency } from '../../utils/formatNumber';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface RecentTradesWidgetProps {
  symbol: string;
}

interface Trade {
  price: number;
  volume: number;
  time: string;
  isBuy: boolean;
}

export default function RecentTradesWidget({ symbol }: RecentTradesWidgetProps) {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    // Generate mock recent trades
    const generateTrades = () => {
      const newTrades: Trade[] = [];
      const basePrice = 45780;
      
      for (let i = 0; i < 20; i++) {
        const isBuy = Math.random() > 0.5;
        const price = basePrice + (Math.random() - 0.5) * 100;
        const volume = Math.random() * 0.5 + 0.01;
        const date = new Date(Date.now() - i * 15000);
        
        newTrades.push({
          price: parseFloat(price.toFixed(2)),
          volume: parseFloat(volume.toFixed(4)),
          time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          isBuy
        });
      }
      
      return newTrades;
    };

    setTrades(generateTrades());

    // Simulate real-time updates
    const interval = setInterval(() => {
      setTrades(prev => {
        const isBuy = Math.random() > 0.5;
        const basePrice = prev[0]?.price || 45780;
        const price = basePrice + (Math.random() - 0.5) * 50;
        const volume = Math.random() * 0.5 + 0.01;
        
        const newTrade: Trade = {
          price: parseFloat(price.toFixed(2)),
          volume: parseFloat(volume.toFixed(4)),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          isBuy
        };
        
        return [newTrade, ...prev.slice(0, 19)];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [symbol]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg mb-4">Recent Trades</h3>

      <div className="space-y-2">
        {/* Header */}
        <div className="grid grid-cols-3 text-xs text-gray-500 dark:text-gray-400 pb-2 border-b border-gray-200 dark:border-slate-700">
          <div className="text-left">Price</div>
          <div className="text-right">Volume</div>
          <div className="text-right">Time</div>
        </div>

        {/* Trades List */}
        <div className="space-y-1 max-h-[500px] overflow-y-auto">
          {trades.map((trade, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 text-sm py-1.5 px-2 rounded hover:bg-gray-50 dark:hover:bg-slate-700/50 ${
                trade.isBuy 
                  ? 'bg-green-50/50 dark:bg-green-900/10' 
                  : 'bg-red-50/50 dark:bg-red-900/10'
              }`}
            >
              <div className={`flex items-center gap-1 ${
                trade.isBuy 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {trade.isBuy ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                ${formatCurrency(trade.price)}
              </div>
              <div className="text-right">{trade.volume}</div>
              <div className="text-right text-xs text-gray-500 dark:text-gray-400">{trade.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700 grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Buy Volume</div>
          <div className="text-green-600 dark:text-green-400 font-semibold">
            {trades.filter(t => t.isBuy).reduce((sum, t) => sum + t.volume, 0).toFixed(4)}
          </div>
        </div>
        <div>
          <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Sell Volume</div>
          <div className="text-red-600 dark:text-red-400 font-semibold">
            {trades.filter(t => !t.isBuy).reduce((sum, t) => sum + t.volume, 0).toFixed(4)}
          </div>
        </div>
      </div>
    </div>
  );
}