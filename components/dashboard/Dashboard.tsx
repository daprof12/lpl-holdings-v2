import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../layouts/DashboardLayout';
import AccountSummary from './AccountSummary';
import PortfolioChart from './PortfolioChart';
import OpenPositions from './OpenPositions';
import RecentTrades from './RecentTrades';
import MarketWatchlist from './MarketWatchlist';
import NewsFeed from './NewsFeed';
import EconomicCalendar from './EconomicCalendar';
import QuickActions from './QuickActions';
import StrategyExecutionEngine from '../autotrader/StrategyExecutionEngine';

export default function Dashboard() {
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  
  // Use real user data from authentication context
  const user = {
    firstName: currentUser?.firstName || 'Trader',
    lastName: currentUser?.lastName || 'Johnson',
    email: currentUser?.email || 'trader@gross.com'
  };

  return (
    <DashboardLayout>
      {/* Background Strategy Execution Engine */}
      <StrategyExecutionEngine />
      
      <div className="p-4 lg:p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Welcome Back, {user.firstName}! 👋</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's what's happening with your trading account today
          </p>
        </div>

        {/* Account Summary Cards */}
        <AccountSummary />

        {/* Quick Actions */}
        <QuickActions />

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Portfolio Chart - Takes 2 columns */}
          <div className="lg:col-span-2">
            <PortfolioChart />
          </div>

          {/* Market Watchlist */}
          <div>
            <MarketWatchlist />
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-6">
          <OpenPositions />
        </div>

        {/* Bottom Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Trades */}
          <RecentTrades />

          {/* News & Calendar */}
          <div className="space-y-6">
            <NewsFeed />
            <EconomicCalendar />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}