import { TrendingUp, TrendingDown } from 'lucide-react';

export default function MySignals() {
  const mySignals = [
    { id: 1, asset: 'BTC/USD', type: 'Long', entry: 45650, tp: 46500, sl: 45200, status: 'active', pnl: 242, time: '2h ago' },
    { id: 2, asset: 'ETH/USD', type: 'Long', entry: 2450, tp: 2550, sl: 2390, status: 'active', pnl: 62, time: '5h ago' },
    { id: 3, asset: 'AAPL', type: 'Long', entry: 178.50, tp: 186, sl: 175, status: 'closed', pnl: 670, time: '2d ago' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Active Signals</div>
          <div className="text-2xl font-bold">{mySignals.filter(s => s.status === 'active').length}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total P/L</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            +${mySignals.reduce((sum, s) => sum + s.pnl, 0).toFixed(2)}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Win Rate</div>
          <div className="text-2xl font-bold">66.7%</div>
        </div>
      </div>

      <div className="space-y-4">
        {mySignals.map((signal) => (
          <div key={signal.id} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-lg font-bold">{signal.asset}</div>
                <span className={`px-2 py-1 rounded ${
                  signal.type === 'Long'
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                    : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                }`}>
                  {signal.type}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{signal.time}</span>
              </div>
              <div className={`text-xl font-bold ${
                signal.pnl > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {signal.pnl > 0 ? '+' : ''}${signal.pnl}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
