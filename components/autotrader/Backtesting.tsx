import { useState } from 'react';
import { Play, Download, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { formatPct } from '../../utils/formatNumber';

export default function Backtesting() {
  const [isRunning, setIsRunning] = useState(false);
  const [hasResults, setHasResults] = useState(true);

  // Mock backtest results
  const equityCurve = Array.from({ length: 100 }, (_, i) => ({
    trade: i + 1,
    equity: 10000 + (Math.random() - 0.3) * 500 * i,
    drawdown: -Math.random() * 15
  }));

  const monthlyReturns = [
    { month: 'Jan', return: 5.2 },
    { month: 'Feb', return: -2.1 },
    { month: 'Mar', return: 8.5 },
    { month: 'Apr', return: 3.7 },
    { month: 'May', return: -1.5 },
    { month: 'Jun', return: 12.3 },
    { month: 'Jul', return: 6.8 },
    { month: 'Aug', return: -3.2 },
    { month: 'Sep', return: 9.1 },
    { month: 'Oct', return: 4.5 },
    { month: 'Nov', return: 7.2 },
    { month: 'Dec', return: 5.9 }
  ];

  const results = {
    totalReturn: 45.8,
    annualizedReturn: 38.2,
    totalTrades: 247,
    winningTrades: 168,
    losingTrades: 79,
    winRate: 68.0,
    avgWin: 245.50,
    avgLoss: 112.30,
    profitFactor: 2.19,
    sharpeRatio: 1.84,
    maxDrawdown: -12.5,
    avgDrawdown: -4.2,
    recovery: 8.5,
    bestTrade: 1250.00,
    worstTrade: -450.00
  };

  const runBacktest = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setHasResults(true);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Configuration */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Backtest Configuration</h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="strategy">Select Strategy</Label>
            <select
              id="strategy"
              className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            >
              <option>Scalping Master Pro</option>
              <option>Trend Following AI</option>
              <option>Mean Reversion Bot</option>
              <option>Breakout Hunter</option>
            </select>
          </div>

          <div>
            <Label htmlFor="start-date">Start Date</Label>
            <input
              type="date"
              id="start-date"
              defaultValue="2024-01-01"
              className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            />
          </div>

          <div>
            <Label htmlFor="end-date">End Date</Label>
            <input
              type="date"
              id="end-date"
              defaultValue="2024-12-31"
              className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            />
          </div>

          <div>
            <Label htmlFor="initial-capital">Initial Capital ($)</Label>
            <input
              type="number"
              id="initial-capital"
              defaultValue="10000"
              className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            />
          </div>

          <div>
            <Label htmlFor="commission">Commission (%)</Label>
            <input
              type="number"
              id="commission"
              step="0.01"
              defaultValue="0.1"
              className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            />
          </div>

          <div>
            <Label htmlFor="slippage">Slippage (%)</Label>
            <input
              type="number"
              id="slippage"
              step="0.01"
              defaultValue="0.05"
              className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            />
          </div>
        </div>

        <div className="mt-6">
          <Button onClick={runBacktest} disabled={isRunning} className="w-full md:w-auto">
            {isRunning ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Running Backtest...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Run Backtest
              </>
            )}
          </Button>
        </div>
      </div>

      {hasResults && (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Return</div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                +{results.totalReturn}%
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Win Rate</div>
              <div className="text-2xl font-bold">{formatPct(results.winRate)}%</div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Profit Factor</div>
              <div className="text-2xl font-bold">{results.profitFactor}</div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Sharpe Ratio</div>
              <div className="text-2xl font-bold">{results.sharpeRatio}</div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Max Drawdown</div>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {results.maxDrawdown}%
              </div>
            </div>
          </div>

          {/* Equity Curve */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Equity Curve</h3>
            
            <div className="h-80" style={{ minHeight: '320px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%" minHeight={320}>
                <AreaChart data={equityCurve}>
                  <defs>
                    <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                  <XAxis dataKey="trade" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="equity" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    fill="url(#colorEquity)" 
                    name="Portfolio Value" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Monthly Returns */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-6">Monthly Returns</h3>
              
              <div className="h-64" style={{ minHeight: '256px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%" minHeight={256}>
                  <BarChart data={monthlyReturns}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                    <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="return" radius={[8, 8, 0, 0]}>
                      {monthlyReturns.map((entry, index) => (
                        <cell key={`cell-${index}`} fill={entry.return > 0 ? '#10B981' : '#EF4444'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Drawdown Chart */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-6">Drawdown</h3>
              
              <div className="h-64" style={{ minHeight: '256px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%" minHeight={256}>
                  <AreaChart data={equityCurve}>
                    <defs>
                      <linearGradient id="colorDrawdown" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                    <XAxis dataKey="trade" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="drawdown" 
                      stroke="#EF4444" 
                      fill="url(#colorDrawdown)" 
                      name="Drawdown %" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Detailed Statistics</h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Trading Performance</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Trades:</span>
                    <span className="font-semibold">{results.totalTrades}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Winning Trades:</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">{results.winningTrades}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Losing Trades:</span>
                    <span className="font-semibold text-red-600 dark:text-red-400">{results.losingTrades}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Win Rate:</span>
                    <span className="font-semibold">{formatPct(results.winRate)}%</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Profit & Loss</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Avg Win:</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      ${results.avgWin}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avg Loss:</span>
                    <span className="font-semibold text-red-600 dark:text-red-400">
                      ${results.avgLoss}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Best Trade:</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      ${results.bestTrade}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Worst Trade:</span>
                    <span className="font-semibold text-red-600 dark:text-red-400">
                      ${results.worstTrade}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Risk Metrics</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Max Drawdown:</span>
                    <span className="font-semibold text-red-600 dark:text-red-400">
                      {results.maxDrawdown}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avg Drawdown:</span>
                    <span className="font-semibold">{formatPct(results.avgDrawdown)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Recovery Factor:</span>
                    <span className="font-semibold">{results.recovery}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Profit Factor:</span>
                    <span className="font-semibold">{results.profitFactor}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Returns</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Return:</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      +{results.totalReturn}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Annualized:</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      +{results.annualizedReturn}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Sharpe Ratio:</span>
                    <span className="font-semibold">{results.sharpeRatio}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Export */}
          <div className="flex justify-end">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </>
      )}
    </div>
  );
}