import { Star, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';

export default function SignalProviders() {
  const providers = [
    {
      id: 1,
      name: 'AI Trend Master',
      rating: 4.8,
      followers: 12450,
      accuracy: 87,
      totalSignals: 1247,
      profitableSignals: 1085,
      avgProfit: 2.4,
      subscription: 'Premium',
      price: 49.99,
      isFollowing: true
    },
    {
      id: 2,
      name: 'Crypto Whale Alerts',
      rating: 4.6,
      followers: 9823,
      accuracy: 82,
      totalSignals: 856,
      profitableSignals: 702,
      avgProfit: 3.1,
      subscription: 'Premium',
      price: 39.99,
      isFollowing: true
    },
    {
      id: 3,
      name: 'Forex Pro Signals',
      rating: 4.9,
      followers: 15673,
      accuracy: 91,
      totalSignals: 2134,
      profitableSignals: 1942,
      avgProfit: 1.8,
      subscription: 'Premium',
      price: 59.99,
      isFollowing: false
    },
    {
      id: 4,
      name: 'Pattern Scanner AI',
      rating: 4.7,
      followers: 8234,
      accuracy: 85,
      totalSignals: 1567,
      profitableSignals: 1332,
      avgProfit: 2.2,
      subscription: 'Free',
      price: 0,
      isFollowing: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {providers.map((provider) => (
          <div key={provider.id} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {provider.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{provider.name}</h3>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-400 fill-current" />
                      <span className="font-semibold">{provider.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{provider.followers.toLocaleString()} followers</span>
                    </div>
                  </div>
                </div>
              </div>
              {provider.isFollowing && (
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Accuracy</div>
                <div className="text-xl font-bold text-green-600 dark:text-green-400">
                  {provider.accuracy}%
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Avg Profit</div>
                <div className="text-xl font-bold">+{provider.avgProfit}%</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Signals</div>
                <div className="text-lg font-semibold">{provider.totalSignals.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Profitable</div>
                <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                  {provider.profitableSignals.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-700">
              <div>
                {provider.subscription === 'Premium' ? (
                  <div>
                    <div className="text-2xl font-bold">${provider.price}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">per month</div>
                  </div>
                ) : (
                  <div className="text-xl font-bold text-green-600 dark:text-green-400">Free</div>
                )}
              </div>

              {provider.isFollowing ? (
                <Button variant="outline">Unfollow</Button>
              ) : (
                <Button>Follow</Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
