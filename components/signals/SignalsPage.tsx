import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Signal, TrendingUp, Bell, Star, Lock, CheckCircle2, Copy } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import SignalsFeed from './SignalsFeed';
import SignalProviders from './SignalProviders';
import CopyTrading from './CopyTrading';
import MySignals from './MySignals';
import { useAuth } from '../../contexts/AuthContext';

export default function SignalsPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [activeSignals, setActiveSignals] = useState(24);
  const [followedProviders, setFollowedProviders] = useState(8);
  const [hasAccess, setHasAccess] = useState<boolean>(false);

  // Check user access
  useEffect(() => {
    if (!currentUser) {
      navigate('/dashboard');
      return;
    }

    const loadAccessSettings = () => {
      const signalAccessData = localStorage.getItem('signal_access');
      if (signalAccessData) {
        try {
          const accessMap = JSON.parse(signalAccessData);
          const userHasAccess = accessMap[currentUser.id] === true;
          setHasAccess(userHasAccess);
          
          if (!userHasAccess) {
            navigate('/dashboard');
          }
        } catch (e) {
          navigate('/dashboard');
        }
      } else {
        navigate('/dashboard');
      }
    };

    loadAccessSettings();

    // Listen for custom signal access change event (same window)
    const handleAccessChange = (event: Event) => {
      console.log('Signal access changed event detected!', event);
      loadAccessSettings();
    };

    window.addEventListener('signal_access_changed', handleAccessChange);
    
    return () => {
      window.removeEventListener('signal_access_changed', handleAccessChange);
    };
  }, [currentUser, navigate]);

  // If no access, show restricted message
  if (!hasAccess) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Lock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Restricted</h2>
            <p className="text-gray-600 dark:text-gray-400">You don't have access to the Signals feature.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const stats = {
    activeSignals: 24,
    signalsToday: 12,
    avgAccuracy: 74.5,
    profitableSignals: 18
  };

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
              <Signal className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl">Trading Signals</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Get real-time trading signals from expert traders and AI algorithms
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Active Signals</span>
            </div>
            <div className="text-2xl font-bold">{stats.activeSignals}</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Currently open</div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Signals Today</span>
            </div>
            <div className="text-2xl font-bold">{stats.signalsToday}</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Last 24 hours</div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Avg Accuracy</span>
            </div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats.avgAccuracy}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">All providers</div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Profitable</span>
            </div>
            <div className="text-2xl font-bold">{stats.profitableSignals}</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {((stats.profitableSignals / stats.activeSignals) * 100).toFixed(0)}% win rate
            </div>
          </div>
        </div>

        {/* Premium Banner */}
        <div className="mb-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Signal className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Upgrade to Premium Signals</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get access to exclusive signals from top-rated traders with 85%+ accuracy
                </p>
              </div>
            </div>
            <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow whitespace-nowrap" onClick={() => navigate('/subscription')}>
              Upgrade Now
            </button>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="feed" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="feed">
              <Bell className="w-4 h-4 mr-2" />
              Live Feed
            </TabsTrigger>
            <TabsTrigger value="providers">
              <Star className="w-4 h-4 mr-2" />
              Providers
            </TabsTrigger>
            <TabsTrigger value="copy">
              <Copy className="w-4 h-4 mr-2" />
              Copy Trading
            </TabsTrigger>
            <TabsTrigger value="my-signals">
              <TrendingUp className="w-4 h-4 mr-2" />
              My Signals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feed">
            <SignalsFeed />
          </TabsContent>

          <TabsContent value="providers">
            <SignalProviders />
          </TabsContent>

          <TabsContent value="copy">
            <CopyTrading />
          </TabsContent>

          <TabsContent value="my-signals">
            <MySignals />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}