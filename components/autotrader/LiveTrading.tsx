import { Play, Pause, AlertTriangle, Activity } from 'lucide-react';
import { Button } from '../ui/button';
import { formatPercentage, formatCurrency } from '../../utils/formatNumber';

interface LiveTradingProps {
  isTrading: boolean;
  setIsTrading: (value: boolean) => void;
}

export default function LiveTrading({ isTrading, setIsTrading }: LiveTradingProps) {
  const activeStrategies = [
    {
      id: 1,
      name: 'Scalping Master Pro',
      status: isTrading ? 'running' : 'paused',
      asset: 'BTC/USD',
      position: 'Long',
      entryPrice: 45678.50,
      currentPrice: 45892.30,
      pnl: 213.80,
      pnlPercent: 0.47,
      size: 0.5,
      trades: 24,
      winRate: 75.0
    },
    {
      id: 2,
      name: 'Trend Following AI',
      status: isTrading ? 'running' : 'paused',
      asset: 'ETH/USD',
      position: 'Long',
      entryPrice: 2456.80,
      currentPrice: 2512.40,
      pnl: 55.60,
      pnlPercent: 2.26,
      size: 2.0,
      trades: 8,
      winRate: 62.5
    },
    {
      id: 3,
      name: 'Grid Trading System',
      status: isTrading ? 'running' : 'paused',
      asset: 'EUR/USD',
      position: null,
      entryPrice: null,
      currentPrice: 1.0898,
      pnl: 0,
      pnlPercent: 0,
      size: 0,
      trades: 45,
      winRate: 68.9
    }
  ];

  const recentTrades = [
    {
      id: 1,
      strategy: 'Scalping Master Pro',
      asset: 'BTC/USD',
      type: 'Long',
      entry: 45456.20,
      exit: 45678.50,
      pnl: 111.15,
      time: '14:32:15'
    },
    {
      id: 2,
      strategy: 'Trend Following AI',
      asset: 'ETH/USD',
      type: 'Long',
      entry: 2420.30,
      exit: 2456.80,
      pnl: 72.50,
      time: '14:15:42'
    },
    {
      id: 3,
      strategy: 'Grid Trading System',
      asset: 'EUR/USD',
      type: 'Long',
      entry: 1.0875,
      exit: 1.0890,
      pnl: 15.00,
      time: '14:08:23'
    },
    {
      id: 4,
      strategy: 'Scalping Master Pro',
      asset: 'BTC/USD',
      type: 'Short',
      entry: 45789.00,
      exit: 45834.20,
      pnl: -45.20,
      time: '13:54:11'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isTrading 
                ? 'bg-green-600 animate-pulse' 
                : 'bg-gray-400'
            }`}>
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Live Trading Status</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isTrading 
                  ? '3 strategies actively monitoring markets' 
                  : 'All strategies paused'}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsTrading(!isTrading)}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                isTrading
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isTrading ? (
                <>
                  <Pause className="w-4 h-4 inline mr-2" />
                  Pause All
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 inline mr-2" />
                  Start All
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Warning Banner */}
      {isTrading && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Live Trading Active:</strong> Your strategies are executing real trades. Monitor positions closely and ensure sufficient margin.
            </div>
          </div>
        </div>
      )}

      {/* Active Strategies */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Active Strategies</h3>

        <div className="space-y-4">
          {activeStrategies.map((strategy) => (
            <div key={strategy.id} className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Strategy Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold">{strategy.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      strategy.status === 'running'
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {strategy.status === 'running' && <span className="inline-block w-1.5 h-1.5 bg-green-600 rounded-full mr-1 animate-pulse" />}
                      {strategy.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <div className="text-gray-600 dark:text-gray-400 text-xs">Asset</div>
                      <div className="font-semibold">{strategy.asset}</div>
                    </div>
                    {strategy.position ? (
                      <>
                        <div>
                          <div className="text-gray-600 dark:text-gray-400 text-xs">Position</div>
                          <div className={`font-semibold ${
                            strategy.position === 'Long' 
                              ? 'text-green-600 dark:text-green-400' 
                              : 'text-red-600 dark:text-red-400'
                          }`}>
                            {strategy.position} {strategy.size}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600 dark:text-gray-400 text-xs">Entry / Current</div>
                          <div className="font-semibold">
                            {strategy.entryPrice ? formatCurrency(strategy.entryPrice) : 'N/A'} / {formatCurrency(strategy.currentPrice)}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600 dark:text-gray-400 text-xs">P/L</div>
                          <div className={`font-semibold ${
                            strategy.pnl > 0 
                              ? 'text-green-600 dark:text-green-400' 
                              : 'text-red-600 dark:text-red-400'
                          }`}>
                            {strategy.pnl > 0 ? '+' : ''}${strategy.pnl.toFixed(2)} ({strategy.pnlPercent > 0 ? '+' : ''}{formatPercentage(strategy.pnlPercent)})
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="col-span-3">
                        <div className="text-gray-600 dark:text-gray-400 text-xs">Status</div>
                        <div className="font-semibold text-blue-600 dark:text-blue-400">
                          Monitoring for entry signals...
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-6 lg:border-l lg:border-gray-200 dark:border-slate-700 lg:pl-6">
                  <div className="text-center">
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Trades Today</div>
                    <div className="text-xl font-bold">{strategy.trades}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Win Rate</div>
                    <div className="text-xl font-bold text-green-600 dark:text-green-400">
                      {strategy.winRate}%
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Settings
                  </Button>
                  {strategy.position && (
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      Close Position
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Trades */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Recent Trades</h3>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-700/50">
              <tr>
                <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Time</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Strategy</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Asset</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Type</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Entry</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Exit</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600 dark:text-gray-400">P/L</th>
              </tr>
            </thead>
            <tbody>
              {recentTrades.map((trade) => (
                <tr key={trade.id} className="border-b border-gray-200 dark:border-slate-700">
                  <td className="py-3 px-4 text-sm font-mono">{trade.time}</td>
                  <td className="py-3 px-4 text-sm">{trade.strategy}</td>
                  <td className="py-3 px-4 font-semibold">{trade.asset}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      trade.type === 'Long'
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                    }`}>
                      {trade.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">{formatCurrency(trade.entry)}</td>
                  <td className="py-3 px-4 text-right">{formatCurrency(trade.exit)}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-semibold ${
                      trade.pnl > 0
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {trade.pnl > 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {recentTrades.map((trade) => (
            <div key={trade.id} className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">{trade.asset}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">{trade.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded text-xs ${
                  trade.type === 'Long'
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                    : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                }`}>
                  {trade.type}
                </span>
                <span className={`font-semibold ${
                  trade.pnl > 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {trade.pnl > 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Management */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Risk Management</h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Daily Loss Limit</div>
            <div className="mb-2">
              <div className="flex items-center justify-between text-sm mb-1">
                <span>$124.50 / $500.00</span>
                <span className="text-green-600 dark:text-green-400">24.9%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '24.9%' }} />
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Max Drawdown</div>
            <div className="mb-2">
              <div className="flex items-center justify-between text-sm mb-1">
                <span>3.2% / 10.0%</span>
                <span className="text-green-600 dark:text-green-400">Safe</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '32%' }} />
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Position Exposure</div>
            <div className="mb-2">
              <div className="flex items-center justify-between text-sm mb-1">
                <span>$4,567 / $10,000</span>
                <span className="text-yellow-600 dark:text-yellow-400">45.7%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '45.7%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}