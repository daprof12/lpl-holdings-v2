import { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, Calendar, Download, Filter } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Button } from '../ui/button';
import { useTrading } from '../../contexts/TradingContext';
import { formatPct, formatCurrency } from '../../utils/formatNumber';

interface ProfitLossReportProps {
  timeframe: string;
}

export default function ProfitLossReport({ timeframe }: ProfitLossReportProps) {
  const { history, portfolioHistory } = useTrading();
  const [filterType, setFilterType] = useState<'all' | 'crypto' | 'forex' | 'stocks' | 'commodities'>('all');

  // Generate monthly P/L data from history
  const monthlyPnLData = useMemo(() => {
    const closedTrades = history.filter(h => h.status === 'closed' && h.pnl !== undefined);
    
    // Group by month
    const monthlyGroups: { [key: string]: { profit: number; loss: number } } = {};
    
    closedTrades.forEach(trade => {
      const date = new Date(trade.timestamp);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short' });
      
      if (!monthlyGroups[monthKey]) {
        monthlyGroups[monthKey] = { profit: 0, loss: 0 };
      }
      
      const pnl = trade.pnl || 0;
      if (pnl > 0) {
        monthlyGroups[monthKey].profit += pnl;
      } else {
        monthlyGroups[monthKey].loss += pnl;
      }
    });
    
    // Convert to array
    return Object.entries(monthlyGroups).map(([month, data]) => ({
      month,
      profit: data.profit,
      loss: data.loss,
      net: data.profit + data.loss
    }));
  }, [history]);

  // Generate daily P/L from portfolio history
  const dailyPnLData = useMemo(() => {
    if (portfolioHistory && portfolioHistory.length > 0) {
      return portfolioHistory.slice(-30).map((snapshot, index) => {
        const prevSnapshot = index > 0 ? portfolioHistory[index - 1] : null;
        const dayPnL = prevSnapshot ? snapshot.equity - prevSnapshot.equity : 0;
        
        return {
          day: index + 1,
          pnl: dayPnL
        };
      });
    }
    
    // Fallback to empty array if no history
    return Array.from({ length: 7 }, (_, i) => ({ day: i + 1, pnl: 0 }));
  }, [portfolioHistory]);

  // Get closed positions from history
  const closedPositions = useMemo(() => {
    return history
      .filter(h => h.status === 'closed' && h.pnl !== undefined)
      .map(h => {
        const entry = h.entryPrice || h.price || 0;
        const exit = h.price || 0;
        const isShort = h.side === 'sell';
        
        // P/L ratio calculation
        const diff = isShort ? (entry - exit) : (exit - entry);
        const pnlPercent = entry > 0 ? (diff / entry) * 100 : 0;
        
        // Duration calculation
        let durationStr = '0m';
        if (h.entryTimestamp && h.timestamp) {
          const durationMs = h.timestamp.getTime() - h.entryTimestamp.getTime();
          const days = Math.floor(durationMs / (1000 * 60 * 60 * 24));
          const hours = Math.floor((durationMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const mins = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
          
          if (days > 0) durationStr = `${days}d ${hours}h`;
          else if (hours > 0) durationStr = `${hours}h ${mins}m`;
          else durationStr = `${mins}m`;
        }

        return {
          id: h.id,
          asset: h.symbol,
          type: h.side === 'buy' ? 'Long' : 'Short',
          entry: entry,
          exit: exit,
          size: h.units,
          pnl: h.pnl || 0,
          pnlPercent: pnlPercent,
          duration: durationStr,
          closeDate: new Date(h.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        };
      });
  }, [history]);

  const totalProfit = closedPositions.filter(p => p.pnl > 0).reduce((sum, p) => sum + p.pnl, 0);
  const totalLoss = closedPositions.filter(p => p.pnl < 0).reduce((sum, p) => sum + Math.abs(p.pnl), 0);
  const netPnL = totalProfit - totalLoss;
  const winningTrades = closedPositions.filter(p => p.pnl > 0).length;
  const losingTrades = closedPositions.filter(p => p.pnl < 0).length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Net P/L</div>
          <div className={`text-2xl font-semibold ${
            netPnL >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {netPnL >= 0 ? '+' : '-'}${formatCurrency(Math.abs(netPnL))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Profit</div>
          <div className="text-2xl font-semibold text-green-600 dark:text-green-400">
            +${formatCurrency(totalProfit)}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            {winningTrades} winning trades
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Loss</div>
          <div className="text-2xl font-semibold text-red-600 dark:text-red-400">
            -${formatCurrency(totalLoss)}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            {losingTrades} losing trades
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Avg P/L per Trade</div>
          <div className="text-2xl font-semibold">
            ${closedPositions.length > 0 ? formatCurrency(netPnL / closedPositions.length) : '0.00'}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly P/L */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Monthly Profit & Loss</h3>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%" minHeight={320}>
              <BarChart data={monthlyPnLData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="profit" fill="#10B981" radius={[8, 8, 0, 0]} name="Profit" />
                <Bar dataKey="loss" fill="#EF4444" radius={[8, 8, 0, 0]} name="Loss" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily P/L */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Daily P/L (Last 30 Days)</h3>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%" minHeight={320}>
              <BarChart data={dailyPnLData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip />
                <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
                  {dailyPnLData.map((entry, index) => (
                    <cell key={`cell-${index}`} fill={entry.pnl > 0 ? '#10B981' : '#EF4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Filters and Export */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h3 className="text-lg font-semibold">Closed Positions</h3>
          
          <div className="flex gap-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            >
              <option value="all">All Assets</option>
              <option value="crypto">Crypto</option>
              <option value="forex">Forex</option>
              <option value="stocks">Stocks</option>
              <option value="commodities">Commodities</option>
            </select>

            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-700/50">
              <tr>
                <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Asset</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Type</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Entry</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Exit</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Size</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600 dark:text-gray-400">P/L</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600 dark:text-gray-400">P/L %</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Duration</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Close Date</th>
              </tr>
            </thead>
            <tbody>
              {closedPositions.map((position) => (
                <tr key={position.id} className="border-b border-gray-200 dark:border-slate-700">
                  <td className="py-4 px-4 font-semibold">{position.asset}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      position.type === 'Long'
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                    }`}>
                      {position.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">${formatCurrency(position.entry)}</td>
                  <td className="py-4 px-4 text-right">${formatCurrency(position.exit)}</td>
                  <td className="py-4 px-4 text-right">{position.size}</td>
                  <td className="py-4 px-4 text-right">
                    <span className={`font-semibold ${
                      position.pnl > 0
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {position.pnl > 0 ? '+' : ''}${position.pnl.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className={`flex items-center justify-end gap-1 ${
                      position.pnlPercent > 0
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {position.pnlPercent > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span>{position.pnlPercent > 0 ? '+' : ''}{formatPct(position.pnlPercent)}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">{position.duration}</td>
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">{position.closeDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {closedPositions.map((position) => (
            <div key={position.id} className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-semibold">{position.asset}</div>
                  <span className={`inline-block mt-1 px-2 py-1 rounded text-xs ${
                    position.type === 'Long'
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                      : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                  }`}>
                    {position.type}
                  </span>
                </div>
                <div className="text-right">
                  <div className={`text-xl font-semibold ${
                    position.pnl > 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {position.pnl > 0 ? '+' : ''}${position.pnl.toFixed(2)}
                  </div>
                  <div className="text-sm">{position.pnlPercent > 0 ? '+' : ''}{formatPct(position.pnlPercent)}%</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-gray-600 dark:text-gray-400 text-xs">Entry</div>
                  <div className="font-semibold">${formatCurrency(position.entry)}</div>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400 text-xs">Exit</div>
                  <div className="font-semibold">${formatCurrency(position.exit)}</div>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400 text-xs">Duration</div>
                  <div className="font-semibold">{position.duration}</div>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400 text-xs">Close Date</div>
                  <div className="font-semibold">{position.closeDate}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Largest Win</div>
          <div className="text-2xl font-semibold text-green-600 dark:text-green-400">
            {closedPositions.length > 0 ? `+${formatCurrency(Math.max(...closedPositions.map(p => p.pnl), 0))}` : '$0.00'}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Largest Loss</div>
          <div className="text-2xl font-semibold text-red-600 dark:text-red-400">
            {closedPositions.length > 0 ? `-${formatCurrency(Math.abs(Math.min(...closedPositions.map(p => p.pnl), 0)))}` : '$0.00'}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Profit Factor</div>
          <div className="text-2xl font-semibold">
            {totalLoss > 0 ? (totalProfit / totalLoss).toFixed(2) : (totalProfit > 0 ? '∞' : '1.00')}
          </div>
        </div>
      </div>
    </div>
  );
}