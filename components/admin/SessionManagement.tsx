import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../utils/supabase/client';
import { api } from '../../utils/supabase/api';
import { Search, Trash2, Eye, Monitor, Smartphone, Globe, Clock, LogIn, LogOut, X, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';

interface SessionRecord {
  id: string;
  userId: string;
  type: 'login' | 'logout';
  timestamp: Date;
  details: {
    device?: string;
    browser?: string;
    ip?: string;
    location?: string;
    userAgent?: string;
  };
}

function mapLogToSession(log: any): SessionRecord {
  const meta = log.metadata || {};
  return {
    id: log.id,
    userId: log.actor_id || '',
    type: (log.action === 'logout' ? 'logout' : 'login') as 'login' | 'logout',
    timestamp: new Date(Number(log.created_at) || Date.now()),
    details: {
      device: meta.device,
      browser: meta.browser,
      ip: meta.ip,
      location: meta.location,
      userAgent: meta.userAgent,
    },
  };
}

export default function SessionManagement() {
  const { users } = useAuth();
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'login' | 'logout'>('all');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedSession, setSelectedSession] = useState<SessionRecord | null>(null);
  const [dateRange, setDateRange] = useState<'all' | 'today' | 'week' | 'month'>('all');

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const logs = await api.loginHistory.getAll(1000);
      setSessions((logs || []).map(mapLogToSession));
    } catch (err) {
      console.error('[SessionManagement] Failed to fetch sessions:', err);
      toast.error('Failed to load session history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();

    // Real-time: reflect new login / logout rows immediately
    const channel = supabase
      .channel('admin-session-logs')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'activity_logs' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const log = payload.new as any;
            if (log.action === 'login' || log.action === 'logout') {
              setSessions(prev => [mapLogToSession(log), ...prev]);
            }
          } else if (payload.eventType === 'DELETE') {
            setSessions(prev => prev.filter(s => s.id !== (payload.old as any).id));
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  // Filtered view
  const sessionActivities = useMemo(() => {
    let list = [...sessions];

    if (filterType !== 'all') list = list.filter(s => s.type === filterType);
    if (selectedUserId) list = list.filter(s => s.userId === selectedUserId);

    if (dateRange !== 'all') {
      const rangeMs = { today: 86400000, week: 604800000, month: 2592000000 }[dateRange];
      const cutoff = Date.now() - (rangeMs || 0);
      list = list.filter(s => s.timestamp.getTime() >= cutoff);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(s => {
        const user = users.find(u => u.id === s.userId);
        const name = user ? `${user.firstName} ${user.lastName}`.toLowerCase() : '';
        return (
          name.includes(q) ||
          (user?.email || '').toLowerCase().includes(q) ||
          (s.details.device || '').toLowerCase().includes(q) ||
          (s.details.ip || '').toLowerCase().includes(q) ||
          (s.details.location || '').toLowerCase().includes(q)
        );
      });
    }

    return list.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }, [sessions, filterType, selectedUserId, dateRange, searchQuery, users]);

  const handleDeleteSession = async (sessionId: string) => {
    if (!confirm('Delete this session record? This cannot be undone.')) return;
    try {
      const res = await api.loginHistory.deleteById(sessionId);
      if (res.success) {
        setSessions(prev => prev.filter(s => s.id !== sessionId));
        toast.success('Session record deleted');
        setShowDetailsDialog(false);
      } else {
        throw res.error;
      }
    } catch (err) {
      console.error('Failed to delete session:', err);
      toast.error('Failed to delete session record');
    }
  };

  const handleDeleteAllSessions = async () => {
    if (!confirm('Delete ALL session records? This will permanently remove all login/logout history.')) return;
    try {
      const res = await api.loginHistory.deleteAll();
      if (res.success) {
        setSessions([]);
        toast.success('All session records deleted');
      } else {
        throw res.error;
      }
    } catch (err) {
      console.error('Failed to delete all sessions:', err);
      toast.error('Failed to delete session records');
    }
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
    return d.includes('mobile') || d.includes('iphone') || d.includes('android')
      ? <Smartphone className="w-4 h-4" />
      : <Monitor className="w-4 h-4" />;
  };

  const totalLogins = sessions.filter(s => s.type === 'login').length;
  const totalLogouts = sessions.filter(s => s.type === 'logout').length;
  const activeUsers = users.filter(u => u.isOnline).length;
  const todaySessions = sessions.filter(s => Date.now() - s.timestamp.getTime() < 86400000).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Session & Login History</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage all user login and logout sessions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={fetchSessions}
            className="flex items-center gap-2"
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            onClick={handleDeleteAllSessions}
            variant="outline"
            className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Trash2 className="w-4 h-4" />
            Delete All Sessions
          </Button>
        </div>
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
              <p className="text-2xl font-bold">{totalLogins}</p>
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
              <p className="text-2xl font-bold">{totalLogouts}</p>
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
              <p className="text-2xl font-bold">{activeUsers}</p>
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
              <p className="text-2xl font-bold">{todaySessions}</p>
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
        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-500">
            <RefreshCw className="w-5 h-5 animate-spin mr-2" />
            Loading session history...
          </div>
        ) : (
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
                          {getDeviceIcon(session.details.device)}
                          <span className="text-sm">{session.details.device || 'Unknown'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <code className="text-sm bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">
                          {session.details.ip || 'N/A'}
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-sm">
                          <Globe className="w-3.5 h-3.5 text-gray-400" />
                          {session.details.location || 'Unknown'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div>{session.timestamp.toLocaleDateString()}</div>
                          <div className="text-xs text-gray-500">{session.timestamp.toLocaleTimeString()}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => { setSelectedSession(session); setShowDetailsDialog(true); }}
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
        )}
      </div>

      {/* Session Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Session Details</DialogTitle>
            <DialogDescription>Detailed information about this session</DialogDescription>
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
                    {getDeviceIcon(selectedSession.details.device)}
                    <span>{selectedSession.details.device || 'Unknown Device'}</span>
                  </div>
                </div>
                <div>
                  <Label>Browser</Label>
                  <p className="mt-1">{selectedSession.details.browser || 'N/A'}</p>
                </div>
                <div>
                  <Label>IP Address</Label>
                  <code className="block mt-1 text-sm bg-gray-100 dark:bg-slate-700 px-3 py-1.5 rounded">
                    {selectedSession.details.ip || 'N/A'}
                  </code>
                </div>
                <div>
                  <Label>Location</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span>{selectedSession.details.location || 'Unknown'}</span>
                  </div>
                </div>
                <div>
                  <Label>Date</Label>
                  <p className="mt-1">{selectedSession.timestamp.toLocaleDateString()}</p>
                </div>
                <div>
                  <Label>Time</Label>
                  <p className="mt-1">{selectedSession.timestamp.toLocaleTimeString()}</p>
                </div>
              </div>
              {selectedSession.details.userAgent && (
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
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)} className="flex-1">
              Close
            </Button>
            <Button
              variant="outline"
              onClick={() => selectedSession && handleDeleteSession(selectedSession.id)}
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
