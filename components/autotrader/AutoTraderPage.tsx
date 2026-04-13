import { useState, useEffect, useMemo } from 'react';
import { Bot, Play, Pause, Settings, TrendingUp, Activity, Zap, Brain, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import StrategyBuilder from './StrategyBuilder';
import Backtesting from './Backtesting';
import LiveTrading from './LiveTrading';
import StrategyLibrary from './StrategyLibrary';
import PerformanceMetrics from './PerformanceMetrics';
import { useTrading } from '../../contexts/TradingContext';
import { useAuth } from '../../contexts/AuthContext';
import { formatPercentage } from '../../utils/formatNumber';

export default function AutoTraderPage() {
  const [isTrading, setIsTrading] = useState(false);
  const [activeStrategies, setActiveStrategies] = useState(3);
  const { history, positions } = useTrading();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState<boolean>(false);

  // Calculate real stats from actual trading data
  const stats = useMemo(() => {
    // Get all closed trades
    const closedTrades = history.filter(h => h.status === 'closed' && h.pnl !== undefined);
    
    // Calculate total profit from closed trades
    const totalProfit = closedTrades.reduce((sum, trade) => sum + (trade.pnl || 0), 0);
    
    // Calculate profit today (trades closed in last 24 hours)
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const todayTrades = closedTrades.filter(trade => {
      const tradeDate = new Date(trade.timestamp);
      return tradeDate >= oneDayAgo;
    });
    const profitToday = todayTrades.reduce((sum, trade) => sum + (trade.pnl || 0), 0);
    
    // Total trades executed (closed positions)
    const tradesExecuted = closedTrades.length;
    
    // Calculate win rate
    const winningTrades = closedTrades.filter(trade => (trade.pnl || 0) > 0);
    const winRate = tradesExecuted > 0 
      ? (winningTrades.length / tradesExecuted) * 100 
      : 0;
    
    // Calculate average profit per trade
    const avgProfit = tradesExecuted > 0 
      ? totalProfit / tradesExecuted 
      : 0;
    
    return {
      totalProfit: totalProfit,
      profitToday: profitToday,
      activeStrategies: activeStrategies,
      tradesExecuted: tradesExecuted,
      winRate: winRate,
      avgProfit: avgProfit
    };
  }, [history, activeStrategies]);

  // Check user access
  useEffect(() => {
    if (!currentUser) return;
    
    const userHasAccess = currentUser.hasAutoTradeAccess === true;
    setHasAccess(userHasAccess);
    
    if (!userHasAccess && currentUser.id) {
      // Small delay to prevent redirect loops during initial load
      const timer = setTimeout(() => navigate('/dashboard'), 100);
      return () => clearTimeout(timer);
    }
  }, [currentUser, navigate]);

  // If no access, show nothing (will redirect)
  if (!hasAccess) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Lock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Restricted</h2>
            <p className="text-gray-600 dark:text-gray-400">You don't have access to the Auto Trader feature.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl">AI Auto Trader</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Automated trading powered by artificial intelligence
            </p>
          </div>

          {/* Trading Control */}
          <div className="flex items-center gap-4">
            <div className={`px-4 py-2 rounded-lg ${
              isTrading 
                ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' 
                : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400'
            }`}>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isTrading ? 'bg-green-600 animate-pulse' : 'bg-gray-400'}`} />
                <span className="text-sm font-semibold">{isTrading ? 'Trading Active' : 'Paused'}</span>
              </div>
            </div>

            <button
              onClick={() => setIsTrading(!isTrading)}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-colors ${
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
                  Start Trading
                </>
              )}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {/* Total Profit */}
          <div className={`rounded-xl p-6 text-white shadow-lg ${
            stats.totalProfit >= 0 
              ? 'bg-gradient-to-br from-green-600 to-emerald-600'
              : 'bg-gradient-to-br from-red-600 to-red-500'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm opacity-90">Total Profit</span>
            </div>
            <div className="text-2xl font-bold mb-1">
              {stats.totalProfit >= 0 ? '+' : ''}${stats.totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-sm opacity-75">All time</div>
          </div>

          {/* Profit Today */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Profit Today</div>
            <div className={`text-2xl font-semibold mb-1 ${
              stats.profitToday >= 0 
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}>
              {stats.profitToday >= 0 ? '+' : ''}${stats.profitToday.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">Last 24 hours</div>
          </div>

          {/* Active Strategies */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Active Strategies</div>
            <div className="text-2xl font-semibold mb-1">{stats.activeStrategies}</div>
            <div className="text-xs text-gray-500 dark:text-gray-500">Running now</div>
          </div>

          {/* Trades Executed */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Trades Executed</div>
            <div className="text-2xl font-semibold mb-1">{stats.tradesExecuted.toLocaleString()}</div>
            <div className="text-xs text-gray-500 dark:text-gray-500">Total trades</div>
          </div>

          {/* Win Rate */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Win Rate</div>
            <div className="text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-1">
              {formatPercentage(stats.winRate)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              {stats.tradesExecuted > 0 ? 'From closed trades' : 'No trades yet'}
            </div>
          </div>

          {/* Avg Profit */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Avg Profit</div>
            <div className={`text-2xl font-semibold mb-1 ${
              stats.avgProfit >= 0 
                ? 'text-gray-900 dark:text-gray-100'
                : 'text-red-600 dark:text-red-400'
            }`}>
              {stats.avgProfit >= 0 ? '+' : ''}${stats.avgProfit.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">Per trade</div>
          </div>
        </div>

        {/* AI Features Banner */}
        <div className="mb-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">AI-Powered Intelligence</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Our neural networks analyze 100,000+ data points per second to identify profitable opportunities
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg">
                <div className="text-xs text-gray-600 dark:text-gray-400">ML Accuracy</div>
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">94.3%</div>
              </div>
              <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg">
                <div className="text-xs text-gray-600 dark:text-gray-400">Response Time</div>
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">0.02s</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="library" className="space-y-6">
          <TabsList className="grid w-full max-w-3xl grid-cols-5">
            <TabsTrigger value="library">
              <Zap className="w-4 h-4 mr-2" />
              Library
            </TabsTrigger>
            <TabsTrigger value="builder">
              <Settings className="w-4 h-4 mr-2" />
              Builder
            </TabsTrigger>
            <TabsTrigger value="backtest">
              <Activity className="w-4 h-4 mr-2" />
              Backtest
            </TabsTrigger>
            <TabsTrigger value="live">
              <Play className="w-4 h-4 mr-2" />
              Live
            </TabsTrigger>
            <TabsTrigger value="performance">
              <TrendingUp className="w-4 h-4 mr-2" />
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="library">
            <StrategyLibrary />
          </TabsContent>

          <TabsContent value="builder">
            <StrategyBuilder />
          </TabsContent>

          <TabsContent value="backtest">
            <Backtesting />
          </TabsContent>

          <TabsContent value="live">
            <LiveTrading isTrading={isTrading} setIsTrading={setIsTrading} />
          </TabsContent>

          <TabsContent value="performance">
            <PerformanceMetrics />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}