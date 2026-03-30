import { useState } from 'react';
import { Search, Star, TrendingUp, Zap, Lock, Play, Settings, Copy } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function StrategyLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'trending' | 'favorites' | 'premium'>('all');

  const strategies = [
    {
      id: 1,
      name: 'Scalping Master Pro',
      description: 'High-frequency trading strategy optimized for BTC/USD with 1-5 minute timeframes',
      category: 'Scalping',
      winRate: 72.5,
      avgProfit: 145.20,
      totalTrades: 3421,
      isPremium: true,
      isActive: true,
      performance: '+$24,567',
      timeframe: '1-5m',
      assets: ['BTC/USD', 'ETH/USD'],
      risk: 'High'
    },
    {
      id: 2,
      name: 'Trend Following AI',
      description: 'Machine learning algorithm that identifies and follows major market trends',
      category: 'Trend',
      winRate: 68.3,
      avgProfit: 320.50,
      totalTrades: 1856,
      isPremium: false,
      isActive: true,
      performance: '+$18,234',
      timeframe: '4h-1d',
      assets: ['All Assets'],
      risk: 'Medium'
    },
    {
      id: 3,
      name: 'Mean Reversion Bot',
      description: 'Statistical arbitrage strategy that profits from price corrections',
      category: 'Mean Reversion',
      winRate: 65.8,
      avgProfit: 189.30,
      totalTrades: 2743,
      isPremium: false,
      isActive: false,
      performance: '+$15,890',
      timeframe: '15m-1h',
      assets: ['Forex'],
      risk: 'Low'
    },
    {
      id: 4,
      name: 'Breakout Hunter',
      description: 'Identifies and trades major breakouts with momentum confirmation',
      category: 'Breakout',
      winRate: 70.2,
      avgProfit: 278.90,
      totalTrades: 1234,
      isPremium: true,
      isActive: false,
      performance: '+$21,456',
      timeframe: '1h-4h',
      assets: ['Stocks', 'Crypto'],
      risk: 'Medium'
    },
    {
      id: 5,
      name: 'Grid Trading System',
      description: 'Places buy and sell orders at regular intervals to profit from volatility',
      category: 'Grid',
      winRate: 63.4,
      avgProfit: 95.60,
      totalTrades: 5678,
      isPremium: false,
      isActive: true,
      performance: '+$12,345',
      timeframe: 'Any',
      assets: ['All Assets'],
      risk: 'Low'
    },
    {
      id: 6,
      name: 'News Sentiment Trader',
      description: 'AI-powered strategy that trades based on real-time news sentiment analysis',
      category: 'News',
      winRate: 75.6,
      avgProfit: 412.30,
      totalTrades: 892,
      isPremium: true,
      isActive: false,
      performance: '+$28,901',
      timeframe: 'Event',
      assets: ['Forex', 'Stocks'],
      risk: 'High'
    }
  ];

  const filteredStrategies = strategies.filter(strategy => {
    const matchesSearch = strategy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         strategy.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20';
      case 'Medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20';
      case 'High': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search strategies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                categoryFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setCategoryFilter('trending')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                categoryFilter === 'trending'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600'
              }`}
            >
              <TrendingUp className="w-4 h-4 inline mr-1" />
              Trending
            </button>
            <button
              onClick={() => setCategoryFilter('favorites')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                categoryFilter === 'favorites'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600'
              }`}
            >
              <Star className="w-4 h-4 inline mr-1" />
              Favorites
            </button>
            <button
              onClick={() => setCategoryFilter('premium')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                categoryFilter === 'premium'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600'
              }`}
            >
              <Zap className="w-4 h-4 inline mr-1" />
              Premium
            </button>
          </div>
        </div>
      </div>

      {/* Strategy Cards */}
      <div className="grid lg:grid-cols-2 gap-6">
        {filteredStrategies.map((strategy) => (
          <div 
            key={strategy.id} 
            className={`bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border-2 transition-all ${
              strategy.isActive 
                ? 'border-green-500 dark:border-green-600' 
                : 'border-transparent hover:border-gray-300 dark:hover:border-slate-600'
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold">{strategy.name}</h3>
                  {strategy.isPremium && (
                    <span className="px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs rounded-full flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      PRO
                    </span>
                  )}
                  {strategy.isActive && (
                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs rounded-full flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse" />
                      Active
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{strategy.description}</p>
              </div>

              <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg">
                <Star className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Win Rate</div>
                <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                  {strategy.winRate}%
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Avg Profit</div>
                <div className="text-lg font-semibold">${strategy.avgProfit}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total P/L</div>
                <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                  {strategy.performance}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 dark:text-gray-400">Timeframe:</span>
                <span className="font-medium">{strategy.timeframe}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 dark:text-gray-400">Trades:</span>
                <span className="font-medium">{strategy.totalTrades.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 dark:text-gray-400">Risk:</span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${getRiskColor(strategy.risk)}`}>
                  {strategy.risk}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 dark:text-gray-400">Assets:</span>
                <span className="font-medium text-xs">{strategy.assets.join(', ')}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-slate-700">
              {strategy.isActive ? (
                <Button variant="outline" className="flex-1">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
              ) : (
                <Button className="flex-1">
                  <Play className="w-4 h-4 mr-2" />
                  Activate
                </Button>
              )}
              <Button variant="outline">
                <Copy className="w-4 h-4 mr-2" />
                Clone
              </Button>
              <Button variant="outline">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Create New Strategy */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Create Your Own Strategy</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
          Use our strategy builder to create custom trading algorithms with no coding required
        </p>
        <Button size="lg">
          Open Strategy Builder
        </Button>
      </div>
    </div>
  );
}
