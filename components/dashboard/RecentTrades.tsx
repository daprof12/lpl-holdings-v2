import { useState, useEffect, useMemo } from 'react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useTrading } from '../../contexts/TradingContext';
import { formatPercentage, formatCurrency } from '../../utils/formatNumber';
import { ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react';
import { SkeletonMobileCard } from '../ui/skeleton';

export default function RecentTrades() {
  const { history, isHydrated } = useTrading();
  const navigate = useNavigate();

  // Filter to show only closed trades (not cancelled or pending)
  const closedTrades = history.filter(trade => trade.status === 'closed');
  
  // Show only the 5 most recent trades
  const recentTrades = closedTrades.slice(0, 5);

  // Calculate REAL duration between position open and close
  const calculateDuration = (entryTimestamp?: Date, closeTimestamp?: Date) => {
    if (!entryTimestamp || !closeTimestamp) {
      return 'N/A';
    }
    
    const openTime = new Date(entryTimestamp).getTime();
    const closeTime = new Date(closeTimestamp).getTime();
    const diff = closeTime - openTime;
    
    // Calculate duration components
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Format duration based on length
    if (days > 0) {
      return `${days}d ${hours}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  // Memoize durations to prevent recalculation on every render
  const tradeDurations = useMemo(() => {
    const durations: Record<string, string> = {};
    recentTrades.forEach(trade => {
      durations[trade.id] = calculateDuration(trade.entryTimestamp, trade.timestamp);
    });
    return durations;
  }, [recentTrades.map(t => t.id).join(',')]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg">Recent Trades</h3>
        <Button variant="ghost" size="sm" onClick={() => navigate('/history')}>
          <span className="mr-2">View All</span>
          <ArrowUpRight className="w-4 h-4" />
        </Button>
      </div>

      {!isHydrated ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonMobileCard key={i} />
          ))}
        </div>
      ) : recentTrades.length === 0 ? (
        <div className="text-center py-12">
          <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400 mb-2">No trades yet</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">Your closed trades will appear here</p>
        </div>
      ) : (
        <>
          {/* Trades List */}
          <div className="space-y-3">
            {recentTrades.map((trade) => {
              const isProfit = (trade.pnl || 0) >= 0;
              
              return (
                <div
                  key={trade.id}
                  className="border border-gray-200 dark:border-slate-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                        trade.side === 'buy'
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                          : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                      }`}>
                        {trade.side === 'buy' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {trade.side.toUpperCase()}
                      </span>
                      <div>
                        <div className="font-semibold">{trade.symbol}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Vol: {trade.units}</div>
                      </div>
                    </div>
                    
                    <div className={`text-right font-semibold ${
                      isProfit ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {isProfit ? '+' : ''}${(trade.pnl || 0).toFixed(2)}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs">Entry</div>
                      <div>${formatCurrency(trade.entryPrice || trade.price || 0)}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs">Exit</div>
                      <div>${formatCurrency(trade.price || 0)}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs">Duration</div>
                      <div>{tradeDurations[trade.id]}</div>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Closed: {new Date(trade.timestamp).toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary Stats */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-semibold text-green-600 dark:text-green-400">
                {closedTrades.filter(t => (t.pnl || 0) > 0).length}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Winning</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-red-600 dark:text-red-400">
                {closedTrades.filter(t => (t.pnl || 0) < 0).length}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Losing</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">
                {closedTrades.length > 0 
                  ? formatPercentage((closedTrades.filter(t => (t.pnl || 0) > 0).length / closedTrades.length) * 100)
                  : '0.00%'
                }
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Win Rate</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}