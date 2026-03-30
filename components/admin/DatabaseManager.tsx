import { useState } from 'react';
import { Database, RefreshCw, Trash2, Users, DollarSign, TrendingUp, Bell } from 'lucide-react';
import { Button } from '../ui/button';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

export default function DatabaseManager() {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [message, setMessage] = useState('');

  const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-5d4be467`;

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${serverUrl}/admin/database-stats`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
        setMessage('');
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      setMessage('Error fetching statistics');
    } finally {
      setLoading(false);
    }
  };

  const initializeData = async () => {
    if (!confirm('This will create demo users, deposits, withdrawals, and positions. Continue?')) {
      return;
    }

    try {
      setLoading(true);
      setMessage('Initializing demo data...');
      
      const response = await fetch(`${serverUrl}/admin/initialize-data`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage('✅ Demo data initialized successfully!');
        await fetchStats();
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error initializing data:', error);
      setMessage('❌ Error initializing data');
    } finally {
      setLoading(false);
    }
  };

  const clearData = async () => {
    if (!confirm('⚠️ WARNING: This will delete ALL data from the database. This cannot be undone. Continue?')) {
      return;
    }

    try {
      setLoading(true);
      setMessage('Clearing all data...');
      
      const response = await fetch(`${serverUrl}/admin/clear-data`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage('✅ All data cleared');
        setStats(null);
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error clearing data:', error);
      setMessage('❌ Error clearing data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Database className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl">Database Manager</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Initialize demo data and view database statistics
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Button
            onClick={initializeData}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <Database className="w-4 h-4" />
            Initialize Demo Data
          </Button>

          <Button
            onClick={fetchStats}
            disabled={loading}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Stats
          </Button>

          <Button
            onClick={clearData}
            disabled={loading}
            variant="destructive"
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear All Data
          </Button>
        </div>

        {/* Message */}
        {message && (
          <div className={`p-4 rounded-lg mb-6 ${
            message.includes('✅') 
              ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
              : message.includes('❌')
              ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
              : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
          }`}>
            {message}
          </div>
        )}

        {/* Statistics */}
        {stats && (
          <div>
            <h2 className="text-lg mb-4">Database Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Users</span>
                </div>
                <div className="text-2xl">{stats.users}</div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Deposits</span>
                </div>
                <div className="text-2xl">{stats.deposits}</div>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Withdrawals</span>
                </div>
                <div className="text-2xl">{stats.withdrawals}</div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Positions</span>
                </div>
                <div className="text-2xl">{stats.openPositions}</div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Signals</span>
                </div>
                <div className="text-2xl">{stats.activeSignals}</div>
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Bell className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Notifications</span>
                </div>
                <div className="text-2xl">{stats.notifications}</div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
          <h3 className="font-semibold mb-2">How to View Data in Supabase</h3>
          <ol className="text-sm space-y-2 text-gray-600 dark:text-gray-300">
            <li>1. Click "Initialize Demo Data" to populate the database</li>
            <li>2. Go to your Supabase Dashboard → Table Editor</li>
            <li>3. Look for the table named <code className="px-2 py-1 bg-gray-200 dark:bg-slate-600 rounded">kv_store_5d4be467</code></li>
            <li>4. All data is stored as key-value pairs in this single table</li>
            <li>5. Keys follow the pattern: <code className="px-2 py-1 bg-gray-200 dark:bg-slate-600 rounded">user:usr_abc123</code>, <code className="px-2 py-1 bg-gray-200 dark:bg-slate-600 rounded">deposit:usr_abc123:dep_xyz</code>, etc.</li>
          </ol>
        </div>

        {/* Key Patterns Reference */}
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">Key Patterns</h3>
          <div className="text-sm space-y-1 text-blue-800 dark:text-blue-200 font-mono">
            <div>user:{'{userId}'} - User accounts</div>
            <div>deposit:{'{userId}'}:{'{depositId}'} - Deposits</div>
            <div>withdrawal:{'{userId}'}:{'{withdrawalId}'} - Withdrawals</div>
            <div>position:open:{'{userId}'}:{'{positionId}'} - Open positions</div>
            <div>notification:{'{userId}'}:{'{notificationId}'} - Notifications</div>
            <div>signal:{'{signalId}'} - Trading signals</div>
          </div>
        </div>
      </div>
    </div>
  );
}
