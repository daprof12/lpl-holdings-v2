import { TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { formatPercentage, formatPct, formatCurrency } from '../../utils/formatNumber';

export default function PerformanceMetrics() {
  // Performance data by strategy
  const strategyPerformance = [
    { name: 'Scalping Master Pro', profit: 24567, trades: 3421, winRate: 72.5, color: '#3B82F6' },
    { name: 'Trend Following AI', profit: 18234, trades: 1856, winRate: 68.3, color: '#10B981' },
    { name: 'Mean Reversion Bot', profit: 15890, trades: 2743, winRate: 65.8, color: '#8B5CF6' },
    { name: 'Breakout Hunter', profit: 21456, trades: 1234, winRate: 70.2, color: '#F59E0B' },
    { name: 'Grid Trading System', profit: 12345, trades: 5678, winRate: 63.4, color: '#EF4444' }
  ];

  // Daily performance
  const dailyPerformance = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    profit: (Math.random() - 0.2) * 500
  }));

  // Hourly performance
  const hourlyPerformance = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    trades: Math.floor(Math.random() * 50),
    profit: (Math.random() - 0.3) * 200
  }));

  const totalProfit = strategyPerformance.reduce((sum, s) => sum + s.profit, 0);
  const totalTrades = strategyPerformance.reduce((sum, s) => sum + s.trades, 0);
  const avgWinRate = strategyPerformance.reduce((sum, s) => sum + s.winRate, 0) / strategyPerformance.length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Total Profit</span>
          </div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {formatCurrency(totalProfit)}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Total Trades</span>
          </div>
          <div className="text-2xl font-bold">{totalTrades.toLocaleString()}</div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Percent className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Avg Win Rate</span>
          </div>
          <div className="text-2xl font-bold">{formatPercentage(avgWinRate)}</div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Avg Per Trade</span>
          </div>
          <div className="text-2xl font-bold">${(totalProfit / totalTrades).toFixed(2)}</div>
        </div>
      </div>

      {/* Strategy Performance Comparison */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Strategy Performance Comparison</h3>

        <div className="h-80 mb-6" style={{ minHeight: '320px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%" minHeight={320}>
            <BarChart data={strategyPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} angle={-15} textAnchor="end" height={80} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip />
              <Legend />
              <Bar dataKey="profit" fill="#10B981" radius={[8, 8, 0, 0]} name="Profit ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Strategy Details Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-700/50">
              <tr>
                <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Strategy</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Total Profit</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Total Trades</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Win Rate</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Avg Per Trade</th>
              </tr>
            </thead>
            <tbody>
              {strategyPerformance.map((strategy) => (
                <tr key={strategy.name} className="border-b border-gray-200 dark:border-slate-700">
                  <td className="py-3 px-4 font-semibold">{strategy.name}</td>
                  <td className="py-3 px-4 text-right text-green-600 dark:text-green-400 font-semibold">
                    {formatCurrency(strategy.profit)}
                  </td>
                  <td className="py-3 px-4 text-right">{strategy.trades.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">{formatPercentage(strategy.winRate)}</td>
                  <td className="py-3 px-4 text-right">${(strategy.profit / strategy.trades).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Daily Performance */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Daily Performance (Last 30 Days)</h3>

          <div className="h-64" style={{ minHeight: '256px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%" minHeight={256}>
              <BarChart data={dailyPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip />
                <Bar dataKey="profit" radius={[4, 4, 0, 0]}>
                  {dailyPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.profit > 0 ? '#10B981' : '#EF4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Profit Distribution */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Profit Distribution by Strategy</h3>

          <div className="h-64" style={{ minHeight: '256px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%" minHeight={256}>
              <PieChart>
                <Pie
                  data={strategyPerformance}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name.split(' ')[0]}: ${formatPercentage(percent * 100)}`}
                  outerRadius={80}
                  dataKey="profit"
                >
                  {strategyPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Hourly Performance */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Hourly Trading Activity</h3>

        <div className="h-64" style={{ minHeight: '256px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%" minHeight={256}>
            <BarChart data={hourlyPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
              <XAxis dataKey="hour" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip />
              <Legend />
              <Bar dataKey="trades" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Number of Trades" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-600 dark:text-blue-400">
            <strong>Peak Trading Hours:</strong> Most profitable trades occur between 08:00-12:00 and 14:00-17:00 UTC
          </p>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Performance Insights</h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Top Performing</h4>
            <div className="space-y-3">
              {strategyPerformance
                .sort((a, b) => b.profit - a.profit)
                .slice(0, 3)
                .map((strategy, index) => (
                  <div key={strategy.name} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <span className="font-medium">{strategy.name}</span>
                    </div>
                    <span className="text-green-600 dark:text-green-400 font-semibold">
                      +{formatCurrency(strategy.profit)}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Needs Improvement</h4>
            <div className="space-y-3">
              {strategyPerformance
                .sort((a, b) => a.profit - b.profit)
                .slice(0, 2)
                .map((strategy) => (
                  <div key={strategy.name} className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <span className="font-medium">{strategy.name}</span>
                    <div className="text-right">
                      <div className="text-sm">Win Rate: {formatPct(strategy.winRate)}%</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Consider optimization</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}