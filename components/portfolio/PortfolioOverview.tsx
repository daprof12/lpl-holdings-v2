import { useMemo, useId } from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTrading } from '../../contexts/TradingContext';
import { formatPct, formatCurrency } from '../../utils/formatNumber';

interface PortfolioOverviewProps {
  timeframe: string;
  portfolioData: any;
}

export default function PortfolioOverview({ timeframe, portfolioData }: PortfolioOverviewProps) {
  const { history, positions, portfolioHistory, tradingMode } = useTrading();
  const gradientId = useId();

  // Generate portfolio growth data from actual history
  const portfolioGrowthData = useMemo(() => {
    const startingBalance = 10250.50;
    
    if (portfolioHistory && portfolioHistory.length > 0) {
      // Use actual portfolio history snapshots — deduplicate by date, keeping last snapshot per day
      const byDate = new Map<string, { date: string; value: number; invested: number; profit: number }>();
      portfolioHistory.slice(-30).forEach((snapshot, idx) => {
        const ts = snapshot.timestamp ? new Date(snapshot.timestamp) : null;
        const dateLabel = ts && !isNaN(ts.getTime())
          ? ts.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          : `Point ${idx + 1}`;
        byDate.set(dateLabel, {
          date: dateLabel,
          value: snapshot.equity,
          invested: startingBalance,
          profit: snapshot.equity - startingBalance
        });
      });
      return Array.from(byDate.values());
    }
    
    // Fallback: Generate based on closed trades
    const closedTrades = history.filter(h => h.status === 'closed');
    let runningBalance = startingBalance;
    const dataPoints: any[] = [{ 
      date: 'Start', 
      value: startingBalance, 
      invested: startingBalance, 
      profit: 0 
    }];
    
    closedTrades.forEach((trade, index) => {
      runningBalance += (trade.pnl || 0);
      dataPoints.push({
        date: `Trade ${index + 1}`,
        value: runningBalance,
        invested: startingBalance,
        profit: runningBalance - startingBalance
      });
    });
    
    // Add current value if we have positions
    if (positions.length > 0) {
      dataPoints.push({
        date: 'Now',
        value: portfolioData.totalValue,
        invested: startingBalance,
        profit: portfolioData.totalValue - startingBalance
      });
    }
    
    return dataPoints.length > 1 ? dataPoints : [
      { date: 'Start', value: startingBalance, invested: startingBalance, profit: 0 },
      { date: 'Now', value: portfolioData.totalValue, invested: startingBalance, profit: portfolioData.totalValue - startingBalance }
    ];
  }, [history, positions, portfolioHistory, portfolioData.totalValue, tradingMode]);

  // Calculate top performers from current positions
  const topPerformers = useMemo(() => {
    return positions
      .filter(p => (p.pnl || 0) > 0)
      .sort((a, b) => (b.pnl || 0) - (a.pnl || 0))
      .slice(0, 5)
      .map(p => {
        const value = p.units * p.currentPrice;
        const changePercent = p.entryPrice ? (((p.currentPrice - p.entryPrice) / p.entryPrice) * 100) : 0;
        return {
          symbol: p.symbol,
          name: p.symbol,
          change: changePercent,
          value: value,
          profit: p.pnl || 0
        };
      });
  }, [positions]);

  // Calculate worst performers from current positions
  const worstPerformers = useMemo(() => {
    return positions
      .filter(p => (p.pnl || 0) < 0)
      .sort((a, b) => (a.pnl || 0) - (b.pnl || 0))
      .slice(0, 5)
      .map(p => {
        const value = p.units * p.currentPrice;
        const changePercent = p.entryPrice ? (((p.currentPrice - p.entryPrice) / p.entryPrice) * 100) : 0;
        return {
          symbol: p.symbol,
          name: p.symbol,
          change: changePercent,
          value: value,
          profit: p.pnl || 0
        };
      });
  }, [positions]);

  // Calculate average trade duration from closed trades
  const avgTradeDuration = useMemo(() => {
    const closedTrades = history.filter(h => h.status === 'closed');
    if (closedTrades.length === 0) return { avg: '0h', median: '0h' };
    
    // For now, return mock data since we don't track entry time
    // TODO: Add entry time tracking to calculate real duration
    return { avg: '4.2 days', median: '2.5 days' };
  }, [history]);

  // Find best and worst trade details
  const bestTradeDetails = useMemo(() => {
    const closedTrades = history.filter(h => h.status === 'closed' && h.pnl !== undefined);
    if (closedTrades.length === 0) return null;
    
    const best = closedTrades.reduce((max, trade) => 
      (trade.pnl || 0) > (max.pnl || 0) ? trade : max
    );
    
    return {
      symbol: best.symbol,
      type: best.side === 'buy' ? 'Long' : 'Short',
      date: new Date(best.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
  }, [history]);

  const worstTradeDetails = useMemo(() => {
    const closedTrades = history.filter(h => h.status === 'closed' && h.pnl !== undefined);
    if (closedTrades.length === 0) return null;
    
    const worst = closedTrades.reduce((min, trade) => 
      (trade.pnl || 0) < (min.pnl || 0) ? trade : min
    );
    
    return {
      symbol: worst.symbol,
      type: worst.side === 'buy' ? 'Long' : 'Short',
      date: new Date(worst.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
  }, [history]);

  return (
    <div className="space-y-6">
      {/* Portfolio Growth Chart */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Portfolio Growth</h3>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Portfolio Value</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Invested</span>
            </div>
          </div>
        </div>

        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%" minHeight={384}>
            <AreaChart data={portfolioGrowthData}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
              <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                strokeWidth={2}
                fill={`url(#${gradientId})`} 
                name="Portfolio Value" 
              />
              <Line 
                type="monotone" 
                dataKey="invested" 
                stroke="#9CA3AF" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Initial Investment" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Best Trade</div>
          <div className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-1">
            +${formatCurrency(portfolioData.bestTrade)}
          </div>
          {bestTradeDetails && (
            <div className="text-xs text-gray-500 dark:text-gray-500">
              {bestTradeDetails.symbol} {bestTradeDetails.type} • {bestTradeDetails.date}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Worst Trade</div>
          <div className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-1">
            ${formatCurrency(portfolioData.worstTrade)}
          </div>
          {worstTradeDetails && (
            <div className="text-xs text-gray-500 dark:text-gray-500">
              {worstTradeDetails.symbol} {worstTradeDetails.type} • {worstTradeDetails.date}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Avg Trade Duration</div>
          <div className="text-2xl font-semibold mb-1">{avgTradeDuration.avg}</div>
          <div className="text-xs text-gray-500 dark:text-gray-500">Median: {avgTradeDuration.median}</div>
        </div>
      </div>

      {/* Top & Worst Performers */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
            <h3 className="text-lg font-semibold">Top Performers</h3>
          </div>

          <div className="space-y-3">
            {topPerformers.map((asset, index) => (
              <div key={`top-${asset.symbol}-${index}`} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 font-semibold text-sm">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold">{asset.symbol}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{asset.name}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-semibold">${formatCurrency(asset.value)}</div>
                  <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm">
                    <ArrowUpRight className="w-3 h-3" />
                    <span>+{formatPct(asset.change)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Worst Performers */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
            <h3 className="text-lg font-semibold">Worst Performers</h3>
          </div>

          <div className="space-y-3">
            {worstPerformers.map((asset, index) => (
              <div key={`worst-${asset.symbol}-${index}`} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                    <span className="text-red-600 dark:text-red-400 font-semibold text-sm">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold">{asset.symbol}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{asset.name}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-semibold">${formatCurrency(asset.value)}</div>
                  <div className="flex items-center gap-1 text-red-600 dark:text-red-400 text-sm">
                    <ArrowDownRight className="w-3 h-3" />
                    <span>{formatPct(asset.change)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg text-sm text-gray-600 dark:text-gray-400">
            💡 Consider rebalancing or using stop-loss orders to minimize losses
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Avg Win</div>
          <div className="text-xl font-semibold text-green-600 dark:text-green-400">
            +${portfolioData.avgWin}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Avg Loss</div>
          <div className="text-xl font-semibold text-red-600 dark:text-red-400">
            -${portfolioData.avgLoss}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Profit Factor</div>
          <div className="text-xl font-semibold">
            {(portfolioData.avgWin / portfolioData.avgLoss).toFixed(2)}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Sharpe Ratio</div>
          <div className="text-xl font-semibold">1.87</div>
        </div>
      </div>
    </div>
  );
}