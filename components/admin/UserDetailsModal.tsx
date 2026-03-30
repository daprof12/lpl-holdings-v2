import { X, Mail, Phone, MapPin, Calendar, Activity, DollarSign, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { formatCurrency } from '../../utils/formatNumber';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'suspended' | 'pending';
  verified: boolean;
  balance: number;
  joinDate: string;
  lastActive: string;
  trades: number;
  country: string;
  phone: string;
}

interface UserDetailsModalProps {
  user: User;
  onClose: () => void;
}

export default function UserDetailsModal({ user, onClose }: UserDetailsModalProps) {
  // Mock additional data
  const recentTrades = [
    { id: 'T001', asset: 'BTC/USD', type: 'buy', amount: 0.5, price: 45780, date: '2025-01-10' },
    { id: 'T002', asset: 'ETH/USD', type: 'sell', amount: 2.0, price: 2485, date: '2025-01-09' },
    { id: 'T003', asset: 'EUR/USD', type: 'buy', amount: 1000, price: 1.0898, date: '2025-01-08' },
  ];

  const recentTransactions = [
    { id: 'TXN001', type: 'deposit', method: 'Bitcoin', amount: 5000, date: '2025-01-05' },
    { id: 'TXN002', type: 'withdrawal', method: 'Bank Transfer', amount: 2500, date: '2025-01-03' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Email</div>
                  <div className="font-semibold">{user.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Phone</div>
                  <div className="font-semibold">{user.phone}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Country</div>
                  <div className="font-semibold">{user.country}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Joined</div>
                  <div className="font-semibold">{user.joinDate}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Statistics */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Account Statistics</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Balance</span>
                </div>
                <div className="text-2xl font-semibold text-green-600 dark:text-green-400">
                  ${formatCurrency(user.balance)}
                </div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Trades</span>
                </div>
                <div className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                  {user.trades}
                </div>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Last Active</span>
                </div>
                <div className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                  {user.lastActive}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Trades */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Recent Trades</h3>
            <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-slate-700">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Asset</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Type</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Amount</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Price</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTrades.map((trade) => (
                    <tr key={trade.id} className="border-t border-gray-200 dark:border-slate-600">
                      <td className="py-3 px-4 font-semibold">{trade.asset}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs capitalize ${
                          trade.type === 'buy' 
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                            : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                        }`}>
                          {trade.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">{trade.amount}</td>
                      <td className="py-3 px-4 text-right">${formatCurrency(trade.price)}</td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{trade.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Transactions */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {recentTransactions.map((txn) => (
                <div key={txn.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                  <div>
                    <div className="font-semibold capitalize">{txn.type}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{txn.method}</div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold ${
                      txn.type === 'deposit' 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {txn.type === 'deposit' ? '+' : '-'}${formatCurrency(txn.amount)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{txn.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-slate-700">
            <Button variant="outline" className="flex-1">
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </Button>
            <Button variant="outline" className="flex-1">
              View Full History
            </Button>
            <Button onClick={onClose} className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}