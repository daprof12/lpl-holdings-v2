import { useState, useMemo } from 'react';
import { Search, Filter, Bot, Pause, Play, AlertTriangle, TrendingUp, TrendingDown, Settings, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useAutoTrader } from '../../contexts/AutoTraderContext';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import { formatPercentage } from '../../utils/formatNumber';

export default function AutoTraderManagement() {
  const { getAllStrategies, toggleStrategy, updateStrategy, pauseAllStrategies } = useAutoTrader();
  const { users } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedStrategy, setSelectedStrategy] = useState<any>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const strategies = getAllStrategies();

  // Helper to get user email
  const getUserEmail = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? user.email : 'Unknown User';
  };

  // Filter strategies
  const filteredStrategies = useMemo(() => {
    return strategies.filter(strategy => {
      const matchesSearch = 
        strategy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        strategy.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getUserEmail(strategy.userId).toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = 
        statusFilter === 'all' || 
        (statusFilter === 'active' && strategy.isActive) ||
        (statusFilter === 'paused' && !strategy.isActive);
      
      const matchesType = 
        typeFilter === 'all' || 
        strategy.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [strategies, searchQuery, statusFilter, typeFilter, users]);

  // Calculate statistics
  const stats = useMemo(() => {
    const activeCount = strategies.filter(s => s.isActive).length;
    const totalTrades = strategies.reduce((sum, s) => sum + s.totalTrades, 0);
    const totalProfit = strategies.reduce((sum, s) => sum + s.totalProfit, 0);
    const avgWinRate = strategies.length > 0
      ? strategies.reduce((sum, s) => sum + (s.totalTrades > 0 ? (s.winningTrades / s.totalTrades) * 100 : 0), 0) / strategies.length
      : 0;

    return {
      total: strategies.length,
      active: activeCount,
      paused: strategies.length - activeCount,
      totalTrades,
      totalProfit,
      avgWinRate,
    };
  }, [strategies]);

  const handleToggleStrategy = (strategyId: string, isActive: boolean) => {
    const strategy = strategies.find(s => s.id === strategyId);
    if (!strategy) return;

    toggleStrategy(strategyId, isActive);
    toast.success(`Strategy ${isActive ? 'activated' : 'paused'} by admin`);
  };

  const handleEmergencyStop = () => {
    if (confirm('Are you sure you want to pause ALL active strategies across all users? This action cannot be undone.')) {
      pauseAllStrategies();
    }
  };

  const handleViewDetails = (strategy: any) => {
    setSelectedStrategy(strategy);
    setShowDetailsDialog(true);
  };

  const getStrategyColor = (type: string) => {
    switch (type) {
      case 'scalping': return 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400';
      case 'trend-following': return 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400';
      case 'grid-trading': return 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400';
      case 'mean-reversion': return 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400';
      case 'breakout': return 'bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl mb-2">Auto Trader Management</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor and control all user trading strategies
          </p>
        </div>

        {/* Emergency Stop Button */}
        <Button
          onClick={handleEmergencyStop}
          variant="destructive"
          className="bg-red-600 hover:bg-red-700"
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          Emergency Stop All
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Strategies</div>
          <div className="text-2xl font-semibold">{stats.total}</div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 shadow-sm">
          <div className="text-sm text-green-600 dark:text-green-400 mb-1">Active</div>
          <div className="text-2xl font-semibold text-green-600 dark:text-green-400">{stats.active}</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Paused</div>
          <div className="text-2xl font-semibold">{stats.paused}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Trades</div>
          <div className="text-2xl font-semibold">{stats.totalTrades.toLocaleString()}</div>
        </div>
        <div className={`rounded-xl p-4 shadow-sm ${stats.totalProfit >= 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
          <div className={`text-sm mb-1 ${stats.totalProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            Total Profit
          </div>
          <div className={`text-2xl font-semibold ${stats.totalProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            ${stats.totalProfit.toFixed(2)}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Win Rate</div>
          <div className="text-2xl font-semibold text-purple-600 dark:text-purple-400">{formatPercentage(stats.avgWinRate)}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by name, symbol, or user..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 border rounded-lg bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600"
          >
            <option value="all">All Types</option>
            <option value="scalping">Scalping</option>
            <option value="trend-following">Trend Following</option>
            <option value="grid-trading">Grid Trading</option>
            <option value="mean-reversion">Mean Reversion</option>
            <option value="breakout">Breakout</option>
          </select>
        </div>
      </div>

      {/* Strategies Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-900/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Strategy
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Symbol
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Mode
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Trades
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Profit
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Win Rate
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {filteredStrategies.map((strategy) => {
                const winRate = strategy.totalTrades > 0 ? (strategy.winningTrades / strategy.totalTrades) * 100 : 0;
                return (
                  <tr key={strategy.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span className="font-medium">{strategy.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {getUserEmail(strategy.userId)}
                    </td>
                    <td className="px-6 py-4 font-mono text-sm">{strategy.symbol}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStrategyColor(strategy.type)}`}>
                        {strategy.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        strategy.mode === 'paper' 
                          ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                          : 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      }`}>
                        {strategy.mode}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{strategy.totalTrades}</td>
                    <td className="px-6 py-4">
                      <span className={`font-medium ${strategy.totalProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        ${strategy.totalProfit.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{formatPercentage(winRate)}</td>
                    <td className="px-6 py-4">
                      {strategy.isActive ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                          <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                          Paused
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewDetails(strategy)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-600 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Settings className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleStrategy(strategy.id, !strategy.isActive)}
                          className={`p-2 hover:bg-gray-100 dark:hover:bg-slate-600 rounded-lg transition-colors ${
                            strategy.isActive ? 'text-red-600' : 'text-green-600'
                          }`}
                          title={strategy.isActive ? 'Pause' : 'Activate'}
                        >
                          {strategy.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredStrategies.length === 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              No strategies found
            </div>
          )}
        </div>
      </div>

      {/* Strategy Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Strategy Details</DialogTitle>
            <DialogDescription>
              View and manage strategy configuration and performance
            </DialogDescription>
          </DialogHeader>

          {selectedStrategy && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Strategy Name</div>
                  <div className="font-semibold">{selectedStrategy.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">User</div>
                  <div className="font-semibold">{getUserEmail(selectedStrategy.userId)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Symbol</div>
                  <div className="font-mono">{selectedStrategy.symbol}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Investment</div>
                  <div className="font-semibold">${selectedStrategy.investmentAmount.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Leverage</div>
                  <div className="font-semibold">{selectedStrategy.leverage}x</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Max Drawdown</div>
                  <div className="font-semibold">{selectedStrategy.maxDrawdown}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Stop Loss</div>
                  <div className="font-semibold">{selectedStrategy.stopLossPercent}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Take Profit</div>
                  <div className="font-semibold">{selectedStrategy.takeProfitPercent}%</div>
                </div>
              </div>

              <div className="border-t dark:border-slate-700 pt-4">
                <h4 className="font-semibold mb-3">Performance</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Trades</div>
                    <div className="text-xl font-semibold">{selectedStrategy.totalTrades}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Win Rate</div>
                    <div className="text-xl font-semibold text-purple-600 dark:text-purple-400">
                      {selectedStrategy.totalTrades > 0 ? formatPercentage((selectedStrategy.winningTrades / selectedStrategy.totalTrades) * 100) : '0.00%'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Profit</div>
                    <div className={`text-xl font-semibold ${selectedStrategy.totalProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      ${selectedStrategy.totalProfit.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setShowDetailsDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}