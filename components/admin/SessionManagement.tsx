import { useState, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Search, Trash2, Eye, Monitor, Smartphone, Globe, Clock, LogIn, LogOut, X, Filter, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { setKV } from '../../utils/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';

interface SessionActivity {
  id: string;
  userId: string;
  type: 'login' | 'logout';
  action: string;
  timestamp: number;
  details?: {
    device?: string;
    browser?: string;
    ip?: string;
    location?: string;
    userAgent?: string;
  };
}

export default function SessionManagement() {
  const { users, userActivities } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'login' | 'logout'>('all');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedSession, setSelectedSession] = useState<SessionActivity | null>(null);
  const [dateRange, setDateRange] = useState<'all' | 'today' | 'week' | 'month'>('all');

  // Get all login/logout activities
  const sessionActivities = useMemo(() => {
    let activities = userActivities.filter(
      (a): a is SessionActivity => a.type === 'login' || a.type === 'logout'
    );

    // Apply type filter
    if (filterType !== 'all') {
      activities = activities.filter(a => a.type === filterType);
    }

    // Apply user filter
    if (selectedUserId) {
      activities = activities.filter(a => a.userId === selectedUserId);
    }

    // Apply date range filter
    if (dateRange !== 'all') {
      const now = Date.now();
      const ranges = {
        today: 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        month: 30 * 24 * 60 * 60 * 1000,
      };
      const range = ranges[dateRange];
      activities = activities.filter(a => now - a.timestamp < range);
    }

    // Apply search query
    if (searchQuery) {
      activities = activities.filter(a => {
        const user = users.find(u => u.id === a.userId);
        const userName = user ? `${user.firstName} ${user.lastName}`.toLowerCase() : '';
        const email = user?.email.toLowerCase() || '';
        const query = searchQuery.toLowerCase();
        
        return (
          userName.includes(query) ||
          email.includes(query) ||
          a.details?.device?.toLowerCase().includes(query) ||
          a.details?.ip?.toLowerCase().includes(query) ||
          a.details?.location?.toLowerCase().includes(query)
        );
      });
    }

    return activities.sort((a, b) => b.timestamp - a.timestamp);
  }, [userActivities, filterType, selectedUserId, dateRange, searchQuery, users]);

  const handleDeleteSession = (sessionId: string) => {
    if (confirm('Are you sure you want to delete this session record? This cannot be undone.')) {
      try {
        const allActivities = JSON.parse(localStorage.getItem('gross_user_activities') || '[]');
        const updated = allActivities.filter((a: any) => a.id !== sessionId);
        localStorage.setItem('gross_user_activities', JSON.stringify(updated));
        setKV('gross_user_activities', updated).catch(console.error);
        window.dispatchEvent(new Event('storage'));
        toast.success('Session record deleted successfully');
      } catch (error) {
        toast.error('Failed to delete session record');
      }
    }
  };

  const handleDeleteAllSessions = () => {
    if (confirm('Are you sure you want to delete ALL session records? This will permanently remove all login/logout history.')) {
      try {
        const allActivities = JSON.parse(localStorage.getItem('gross_user_activities') || '[]');
        const updated = allActivities.filter((a: any) => a.type !== 'login' && a.type !== 'logout');
        localStorage.setItem('gross_user_activities', JSON.stringify(updated));
        setKV('gross_user_activities', updated).catch(console.error);
        window.dispatchEvent(new Event('storage'));
        toast.success('All session records deleted successfully');
      } catch (error) {
        toast.error('Failed to delete session records');
      }
    }
  };

  const handleViewDetails = (session: SessionActivity) => {
    setSelectedSession(session);
    setShowDetailsDialog(true);
  };

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown User';
  };

  const getUserEmail = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user?.email || 'N/A';
  };

  const getDeviceIcon = (device?: string) => {
    if (!device) return <Monitor className="w-4 h-4" />;
    const d = device.toLowerCase();
    if (d.includes('mobile') || d.includes('iphone') || d.includes('android')) {
      return <Smartphone className="w-4 h-4" />;
    }
    return <Monitor className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Session & Login History</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage all user login and logout sessions
          </p>
        </div>
        <Button
          onClick={handleDeleteAllSessions}
          variant="outline"
          className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <Trash2 className="w-4 h-4" />
          Delete All Sessions
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <LogIn className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Logins</p>
              <p className="text-2xl font-bold">
                {userActivities.filter(a => a.type === 'login').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <LogOut className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Logouts</p>
              <p className="text-2xl font-bold">
                {userActivities.filter(a => a.type === 'logout').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Monitor className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
              <p className="text-2xl font-bold">
                {users.filter(u => u.isOnline).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Today's Sessions</p>
              <p className="text-2xl font-bold">
                {userActivities.filter(a => 
                  (a.type === 'login' || a.type === 'logout') && 
                  Date.now() - a.timestamp < 24 * 60 * 60 * 1000
                ).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label>Search</Label>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, IP..."
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <Label>Session Type</Label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
            >
              <option value="all">All Sessions</option>
              <option value="login">Logins Only</option>
              <option value="logout">Logouts Only</option>
            </select>
          </div>
          <div>
            <Label>User</Label>
            <select
              value={selectedUserId || ''}
              onChange={(e) => setSelectedUserId(e.target.value || null)}
              className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
            >
              <option value="">All Users</option>
              {users.filter(u => u.role !== 'admin').map(user => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Date Range</Label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as any)}
              className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>
        </div>
        {(searchQuery || filterType !== 'all' || selectedUserId || dateRange !== 'all') && (
          <div className="flex items-center gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setFilterType('all');
                setSelectedUserId(null);
                setDateRange('all');
              }}
              className="flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </Button>
            <span className="text-sm text-gray-500">
              Showing {sessionActivities.length} session(s)
            </span>
          </div>
        )}
      </div>

      {/* Sessions Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-700 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Device</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">IP Address</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {sessionActivities.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    No session records found
                  </td>
                </tr>
              ) : (
                sessionActivities.map((session) => (
                  <tr key={session.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">{getUserName(session.userId)}</div>
                        <div className="text-sm text-gray-500">{getUserEmail(session.userId)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        session.type === 'login'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      }`}>
                        {session.type === 'login' ? <LogIn className="w-3 h-3" /> : <LogOut className="w-3 h-3" />}
                        {session.type === 'login' ? 'Login' : 'Logout'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getDeviceIcon(session.details?.device)}
                        <span className="text-sm">{session.details?.device || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-sm bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">
                        {session.details?.ip || 'N/A'}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm">
                        <Globe className="w-3.5 h-3.5 text-gray-400" />
                        {session.details?.location || 'Unknown'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div>{new Date(session.timestamp).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(session.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(session)}
                          className="flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteSession(session.id)}
                          className="flex items-center gap-1.5 text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Session Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Session Details</DialogTitle>
            <DialogDescription>
              Detailed information about this session
            </DialogDescription>
          </DialogHeader>
          {selectedSession && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>User</Label>
                  <p className="mt-1 font-medium">{getUserName(selectedSession.userId)}</p>
                  <p className="text-sm text-gray-500">{getUserEmail(selectedSession.userId)}</p>
                </div>
                <div>
                  <Label>Session Type</Label>
                  <div className="mt-1">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                      selectedSession.type === 'login'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}>
                      {selectedSession.type === 'login' ? <LogIn className="w-4 h-4" /> : <LogOut className="w-4 h-4" />}
                      {selectedSession.type === 'login' ? 'Login' : 'Logout'}
                    </span>
                  </div>
                </div>
                <div>
                  <Label>Device</Label>
                  <div className="flex items-center gap-2 mt-1">
                    {getDeviceIcon(selectedSession.details?.device)}
                    <span>{selectedSession.details?.device || 'Unknown Device'}</span>
                  </div>
                </div>
                <div>
                  <Label>Browser</Label>
                  <p className="mt-1">{selectedSession.details?.browser || 'N/A'}</p>
                </div>
                <div>
                  <Label>IP Address</Label>
                  <code className="block mt-1 text-sm bg-gray-100 dark:bg-slate-700 px-3 py-1.5 rounded">
                    {selectedSession.details?.ip || 'N/A'}
                  </code>
                </div>
                <div>
                  <Label>Location</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span>{selectedSession.details?.location || 'Unknown'}</span>
                  </div>
                </div>
                <div>
                  <Label>Date</Label>
                  <p className="mt-1">{new Date(selectedSession.timestamp).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label>Time</Label>
                  <p className="mt-1">{new Date(selectedSession.timestamp).toLocaleTimeString()}</p>
                </div>
              </div>
              {selectedSession.details?.userAgent && (
                <div>
                  <Label>User Agent</Label>
                  <code className="block mt-1 text-xs bg-gray-100 dark:bg-slate-700 px-3 py-2 rounded break-all">
                    {selectedSession.details.userAgent}
                  </code>
                </div>
              )}
              <div>
                <Label>Session ID</Label>
                <code className="block mt-1 text-xs bg-gray-100 dark:bg-slate-700 px-3 py-2 rounded">
                  {selectedSession.id}
                </code>
              </div>
            </div>
          )}
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-slate-700">
            <Button
              variant="outline"
              onClick={() => setShowDetailsDialog(false)}
              className="flex-1"
            >
              Close
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                if (selectedSession) {
                  handleDeleteSession(selectedSession.id);
                  setShowDetailsDialog(false);
                }
              }}
              className="flex-1 text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Session
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
