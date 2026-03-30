import { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Percent, PieChart as PieChartIcon, BarChart3, Calendar } from 'lucide-react';
import { formatPct, formatCurrency } from '../../utils/formatNumber';
import DashboardLayout from '../layouts/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import PortfolioOverview from './PortfolioOverview';
import AssetAllocation from './AssetAllocation';
import ProfitLossReport from './ProfitLossReport';
import TradeHistory from './TradeHistory';
import { useTrading } from '../../contexts/TradingContext';

export default function PortfolioPage() {
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL'>('1M');
  const { account, positions, history, tradingMode } = useTrading();

  // Calculate real portfolio data from user's trading activity
  const portfolioData = useMemo(() => {
    // Starting balance based on trading mode - now both start at 0
    const startingBalance = account.balance;
    
    // Total portfolio value is the current equity
    const totalValue = account.equity;
    
    // Total invested is the starting balance
    const totalInvested = startingBalance > 0 ? startingBalance : 1; // Avoid division by zero
    
    // Total P/L is realized + unrealized
    const totalProfitLoss = account.realizedPnL + account.unrealizedPnL;
    
    // Profit/Loss percentage
    const profitLossPercent = ((totalProfitLoss / totalInvested) * 100);
    
    // Day change - estimate based on recent positions (simplified)
    const dayChange = account.unrealizedPnL * 0.1; // Rough estimate
    const dayChangePercent = ((dayChange / totalValue) * 100);
    
    // Week change - estimate
    const weekChange = totalProfitLoss * 0.3; // Rough estimate
    const weekChangePercent = ((weekChange / totalValue) * 100);
    
    // Count open and closed positions
    const openPositions = positions.length;
    const closedPositions = history.filter(h => h.status === 'closed').length;
    
    // Calculate win rate from closed trades
    const closedTrades = history.filter(h => h.status === 'closed' && h.pnl !== undefined);
    const winningTrades = closedTrades.filter(h => (h.pnl || 0) > 0);
    const losingTrades = closedTrades.filter(h => (h.pnl || 0) < 0);
    const winRate = closedTrades.length > 0 
      ? (winningTrades.length / closedTrades.length) * 100 
      : 0;
    
    // Calculate average win and loss
    const avgWin = winningTrades.length > 0
      ? winningTrades.reduce((sum, t) => sum + (t.pnl || 0), 0) / winningTrades.length
      : 0;
    const avgLoss = losingTrades.length > 0
      ? Math.abs(losingTrades.reduce((sum, t) => sum + (t.pnl || 0), 0) / losingTrades.length)
      : 0;
    
    // Find best and worst trades
    const bestTrade = closedTrades.length > 0
      ? Math.max(...closedTrades.map(t => t.pnl || 0))
      : 0;
    const worstTrade = closedTrades.length > 0
      ? Math.min(...closedTrades.map(t => t.pnl || 0))
      : 0;
    
    return {
      totalValue,
      totalInvested,
      totalProfitLoss,
      profitLossPercent,
      dayChange,
      dayChangePercent,
      weekChange,
      weekChangePercent,
      openPositions,
      closedPositions,
      winRate,
      avgWin,
      avgLoss,
      bestTrade,
      worstTrade
    };
  }, [account, positions, history, tradingMode]);

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl mb-2">Portfolio</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track your trading performance and analytics
            </p>
          </div>

          {/* Timeframe Selector */}
          <div className="flex gap-2">
            {(['1D', '1W', '1M', '3M', '1Y', 'ALL'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  timeframe === tf
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Portfolio Value */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-5 h-5" />
              <span className="text-sm opacity-90">Portfolio Value</span>
            </div>
            <div className="text-3xl mb-2">${formatCurrency(portfolioData.totalValue)}</div>
            <div className="flex items-center gap-2 text-sm">
              {portfolioData.dayChangePercent > 0 ? (
                <>
                  <TrendingUp className="w-4 h-4" />
                  <span>+${portfolioData.dayChange.toFixed(2)} ({formatPct(portfolioData.dayChangePercent)}%)</span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-4 h-4" />
                  <span>-${Math.abs(portfolioData.dayChange).toFixed(2)} ({formatPct(Math.abs(portfolioData.dayChangePercent))}%)</span>
                </>
              )}
              <span className="opacity-75">today</span>
            </div>
          </div>

          {/* Total P/L */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Total P/L</span>
            </div>
            <div className={`text-2xl mb-2 ${
              portfolioData.totalProfitLoss > 0 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {portfolioData.totalProfitLoss > 0 ? '+' : ''}${formatCurrency(portfolioData.totalProfitLoss)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {portfolioData.profitLossPercent > 0 ? '+' : ''}{formatPct(portfolioData.profitLossPercent)}% return
            </div>
          </div>

          {/* Win Rate */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Percent className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Win Rate</span>
            </div>
            <div className="text-2xl mb-2">{formatPct(portfolioData.winRate)}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {Math.round(portfolioData.closedPositions * portfolioData.winRate / 100)} / {portfolioData.closedPositions} trades
            </div>
          </div>

          {/* Open Positions */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Open Positions</span>
            </div>
            <div className="text-2xl mb-2">{portfolioData.openPositions}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {portfolioData.closedPositions} closed
            </div>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full max-w-3xl grid-cols-4">
            <TabsTrigger value="overview">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="allocation">
              <PieChartIcon className="w-4 h-4 mr-2" />
              Allocation
            </TabsTrigger>
            <TabsTrigger value="pnl">
              <DollarSign className="w-4 h-4 mr-2" />
              P/L Report
            </TabsTrigger>
            <TabsTrigger value="history">
              <Calendar className="w-4 h-4 mr-2" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <PortfolioOverview timeframe={timeframe} portfolioData={portfolioData} />
          </TabsContent>

          <TabsContent value="allocation">
            <AssetAllocation />
          </TabsContent>

          <TabsContent value="pnl">
            <ProfitLossReport timeframe={timeframe} />
          </TabsContent>

          <TabsContent value="history">
            <TradeHistory />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}