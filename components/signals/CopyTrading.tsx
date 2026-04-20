import { Copy, TrendingUp, DollarSign, Pause, Play } from 'lucide-react';
import { Button } from '../ui/button';
import { formatCurrency } from '../../utils/formatNumber';

export default function CopyTrading() {
  const copyTrades = [
    {
      id: 1,
      trader: 'AI Trend Master',
      copiedAmount: 5000,
      allocation: 25,
      isActive: true,
      profit: 1245.50,
      profitPercent: 24.91,
      trades: 127,
      winRate: 72.4
    },
    {
      id: 2,
      trader: 'Crypto Whale Alerts',
      copiedAmount: 3000,
      allocation: 15,
      isActive: true,
      profit: 678.30,
      profitPercent: 22.61,
      trades: 89,
      winRate: 68.5
    },
    {
      id: 3,
      trader: 'Forex Pro Signals',
      copiedAmount: 7000,
      allocation: 35,
      isActive: false,
      profit: 892.15,
      profitPercent: 12.75,
      trades: 234,
      winRate: 75.2
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-3 mb-4">
          <Copy className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <div>
            <h3 className="text-lg font-semibold">Auto Copy Trading</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Automatically copy trades from successful traders
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Copied</div>
            <div className="text-2xl font-bold">${formatCurrency(copyTrades.reduce((sum, t) => sum + t.copiedAmount, 0))}</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Profit</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              +${copyTrades.reduce((sum, t) => sum + (t.profit || 0), 0).toFixed(2)}
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Copies</div>
            <div className="text-2xl font-bold">{copyTrades.filter(t => t.isActive).length}</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {copyTrades.map((trade) => (
          <div key={trade.id} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-semibold">{trade.trader}</h3>
                  {trade.isActive ? (
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded text-xs font-semibold">
                      <span className="inline-block w-1.5 h-1.5 bg-green-600 rounded-full mr-1 animate-pulse" />
                      Active
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs font-semibold">
                      Paused
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Copied Amount</div>
                    <div className="font-semibold">${formatCurrency(trade.copiedAmount)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Allocation</div>
                    <div className="font-semibold">{trade.allocation}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Trades Copied</div>
                    <div className="font-semibold">{trade.trades}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Win Rate</div>
                    <div className="font-semibold text-green-600 dark:text-green-400">{trade.winRate}%</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    +${(trade.profit || 0).toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    +${(trade.profitPercent || 0).toFixed(2)}%
                  </div>
                </div>

                <div className="flex gap-2">
                  {trade.isActive ? (
                    <Button variant="outline" size="sm">
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </Button>
                  ) : (
                    <Button size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      Resume
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center shadow-sm">
        <Copy className="w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
        <h3 className="text-xl font-semibold mb-2">Start Copy Trading</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
          Browse signal providers and start copying their trades automatically
        </p>
        <Button size="lg">
          Browse Providers
        </Button>
      </div>
    </div>
  );
}