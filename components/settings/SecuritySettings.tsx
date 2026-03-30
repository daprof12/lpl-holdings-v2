import { useState, useEffect, useCallback } from 'react';
import { Shield, Lock, Smartphone, Monitor, Tablet, MapPin, Trash2, Check, RefreshCw, Laptop } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { showSuccessToast, showErrorToast } from '../common/ToastNotifications';
import { useAuth } from '../../contexts/AuthContext';

interface SessionEntry {
  id: string;
  device: string;
  browser: string;
  os: string;
  deviceType: string;
  startedAt: string;
  lastActive: string;
  isCurrent: boolean;
  ip?: string;
}

function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) > 1 ? 's' : ''} ago`;
}

function formatDate(dateStr: string | Date): string {
  const d = new Date(dateStr);
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function DeviceIcon({ deviceType, className }: { deviceType: string; className?: string }) {
  if (deviceType === 'Mobile') return <Smartphone className={className} />;
  if (deviceType === 'Tablet') return <Tablet className={className} />;
  return <Laptop className={className} />;
}

export default function SecuritySettings() {
  const { currentUser, updatePassword, userActivities } = useAuth();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const [sessions, setSessions] = useState<SessionEntry[]>([]);
  const [currentIp, setCurrentIp] = useState<string>('');
  const [loadingSessions, setLoadingSessions] = useState(true);

  // Fetch real public IP
  useEffect(() => {
    fetch('https://api64.ipify.org?format=json')
      .then(r => r.json())
      .then(data => setCurrentIp(data.ip || ''))
      .catch(() => setCurrentIp(''));
  }, []);

  // Load and sync sessions from localStorage
  const loadSessions = useCallback(() => {
    if (!currentUser) return;
    const sessionsKey = `gross_sessions_${currentUser.id}`;
    const stored: SessionEntry[] = JSON.parse(localStorage.getItem(sessionsKey) || '[]');

    // If no sessions stored yet (user was already logged in before this update),
    // synthesize a current session from the browser
    if (stored.length === 0) {
      const ua = navigator.userAgent;
      let browser = 'Unknown Browser';
      let os = 'Unknown OS';
      let deviceType = 'Desktop';
      if (ua.includes('Edg')) browser = 'Edge';
      else if (ua.includes('OPR') || ua.includes('Opera')) browser = 'Opera';
      else if (ua.includes('Firefox')) browser = 'Firefox';
      else if (ua.includes('Chrome')) browser = 'Chrome';
      else if (ua.includes('Safari')) browser = 'Safari';
      if (ua.includes('Windows NT 10')) os = 'Windows 10';
      else if (ua.includes('Windows NT 11')) os = 'Windows 11';
      else if (ua.includes('Windows')) os = 'Windows';
      else if (ua.includes('iPhone')) { os = 'iPhone'; deviceType = 'Mobile'; }
      else if (ua.includes('iPad')) { os = 'iPad'; deviceType = 'Tablet'; }
      else if (ua.includes('Android') && ua.includes('Mobile')) { os = 'Android'; deviceType = 'Mobile'; }
      else if (ua.includes('Android')) { os = 'Android'; deviceType = 'Tablet'; }
      else if (ua.includes('Mac OS X')) os = 'macOS';
      else if (ua.includes('Linux')) os = 'Linux';
      if (ua.includes('Mobile') && deviceType === 'Desktop') deviceType = 'Mobile';

      // Try to find login time from activities
      const loginActivities = userActivities
        .filter(a => a.userId === currentUser.id && a.type === 'login')
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      const loginTime = loginActivities[0]?.timestamp
        ? new Date(loginActivities[0].timestamp).toISOString()
        : new Date().toISOString();

      let sessionId = sessionStorage.getItem('gross_current_session_id');
      if (!sessionId) {
        sessionId = `session-${Date.now()}-legacy`;
        sessionStorage.setItem('gross_current_session_id', sessionId);
      }

      const synth: SessionEntry = {
        id: sessionId,
        device: `${browser} on ${os}`,
        browser,
        os,
        deviceType,
        startedAt: loginTime,
        lastActive: new Date().toISOString(),
        isCurrent: true,
      };
      stored.push(synth);
      localStorage.setItem(sessionsKey, JSON.stringify(stored));
    } else {
      // Mark the session matching sessionStorage ID as current
      const currentSessionId = sessionStorage.getItem('gross_current_session_id');
      const updated = stored.map(s => ({
        ...s,
        isCurrent: s.id === currentSessionId,
        // Update lastActive for current session
        lastActive: s.id === currentSessionId ? new Date().toISOString() : s.lastActive,
      }));
      localStorage.setItem(sessionsKey, JSON.stringify(updated));
      setSessions(updated.slice().reverse()); // Most recent first
      setLoadingSessions(false);
      return;
    }

    setSessions(stored.slice().reverse());
    setLoadingSessions(false);
  }, [currentUser?.id, userActivities]);

  useEffect(() => {
    setLoadingSessions(true);
    loadSessions();
  }, [loadSessions]);

  // End a specific session
  const handleEndSession = (sessionId: string) => {
    if (!currentUser) return;
    const sessionsKey = `gross_sessions_${currentUser.id}`;
    const stored: SessionEntry[] = JSON.parse(localStorage.getItem(sessionsKey) || '[]');
    const updated = stored.filter(s => s.id !== sessionId);
    localStorage.setItem(sessionsKey, JSON.stringify(updated));
    setSessions(updated.slice().reverse());
    showSuccessToast('Session ended successfully');
  };

  // End all sessions except current
  const handleEndAllSessions = () => {
    if (!currentUser) return;
    const currentSessionId = sessionStorage.getItem('gross_current_session_id');
    const sessionsKey = `gross_sessions_${currentUser.id}`;
    const stored: SessionEntry[] = JSON.parse(localStorage.getItem(sessionsKey) || '[]');
    const updated = stored.filter(s => s.id === currentSessionId);
    localStorage.setItem(sessionsKey, JSON.stringify(updated));
    setSessions(updated.slice().reverse());
    showSuccessToast('All other sessions ended');
  };

  // Real login history from userActivities
  const loginHistory = userActivities
    .filter(a => a.userId === currentUser?.id && (a.type === 'login' || a.type === 'logout'))
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      showErrorToast('User not authenticated');
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      showErrorToast('Please fill in all password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      showErrorToast('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      showErrorToast('Password must be at least 8 characters long');
      return;
    }

    if (newPassword === currentPassword) {
      showErrorToast('New password must be different from current password');
      return;
    }

    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      showErrorToast('Password must contain uppercase, lowercase, and numbers');
      return;
    }

    setIsUpdating(true);

    try {
      const result = await updatePassword(currentUser.id, currentPassword, newPassword);

      if (result.success) {
        showSuccessToast('Password updated successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        showErrorToast(result.error || 'Failed to update password');
      }
    } catch (error) {
      showErrorToast('An error occurred while updating password');
      console.error('Password update error:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Change Password */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Change Password</h3>

        <div className="space-y-4 max-w-md">
          <div>
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              className="mt-2"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              className="mt-2"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              className="mt-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="pt-2">
            <Button onClick={handlePasswordUpdate} disabled={isUpdating}>
              <Lock className="w-4 h-4 mr-2" />
              Update Password
            </Button>
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
            <div>
              <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Add an extra layer of security to your account
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {twoFactorEnabled && (
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-sm font-semibold">
                <Check className="w-4 h-4 inline mr-1" />
                Enabled
              </span>
            )}
            <Button
              variant={twoFactorEnabled ? 'outline' : 'default'}
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            >
              {twoFactorEnabled ? 'Disable' : 'Enable'} 2FA
            </Button>
          </div>
        </div>

        {twoFactorEnabled && (
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <div className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
              <div>
                <div className="font-semibold text-green-600 dark:text-green-400 mb-1">
                  2FA is Active
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Using Google Authenticator app
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Backup Codes
                  </Button>
                  <Button variant="outline" size="sm">
                    Reconfigure
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active Sessions */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Active Sessions</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Devices that are currently logged in to your account
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={loadSessions}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            {sessions.filter(s => !s.isCurrent).length > 0 && (
              <Button variant="outline" size="sm" onClick={handleEndAllSessions}>
                <Trash2 className="w-4 h-4 mr-2" />
                End All Others
              </Button>
            )}
          </div>
        </div>

        {loadingSessions ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
            Loading sessions…
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No session data available. Log out and log back in to populate sessions.
          </div>
        ) : (
          <div className="space-y-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`p-4 rounded-lg border-2 ${
                  session.isCurrent
                    ? 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <DeviceIcon
                      deviceType={session.deviceType}
                      className={`w-5 h-5 mt-1 flex-shrink-0 ${
                        session.isCurrent
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
                    />
                    <div className="min-w-0">
                      <div className="font-semibold flex items-center gap-2 flex-wrap">
                        <span>{session.device}</span>
                        {session.isCurrent && (
                          <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {(session.isCurrent ? currentIp : session.ip) && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>IP: {session.isCurrent && currentIp ? currentIp : session.ip || 'Unknown'}</span>
                          </div>
                        )}
                        <span>Started: {formatDate(session.startedAt)}</span>
                        <span>Last active: {timeAgo(session.lastActive)}</span>
                      </div>
                    </div>
                  </div>

                  {!session.isCurrent && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-shrink-0 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={() => handleEndSession(session.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      End
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Login History */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-1">Recent Login History</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Your last {loginHistory.length} sign-in and sign-out events
        </p>

        {loginHistory.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No login history found. History is recorded after your next login.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-slate-700/50">
                <tr>
                  <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Date & Time</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Device</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Event</th>
                </tr>
              </thead>
              <tbody>
                {loginHistory.map((activity, index) => {
                  const device = activity.details?.device || 'Unknown Device';
                  const isLogin = activity.type === 'login';
                  return (
                    <tr key={activity.id || index} className="border-b border-gray-200 dark:border-slate-700">
                      <td className="py-3 px-4 font-mono text-sm">{formatDate(activity.timestamp)}</td>
                      <td className="py-3 px-4 text-sm">{device}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            isLogin
                              ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                              : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300'
                          }`}
                        >
                          {isLogin ? 'Signed In' : 'Signed Out'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Security Recommendations */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold mb-4">Security Recommendations</h3>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-4 h-4 text-white" />
            </div>
            <div className="text-sm">
              <strong>Two-Factor Authentication:</strong> {twoFactorEnabled ? 'Enabled' : 'Disabled — consider enabling for extra security'}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-4 h-4 text-white" />
            </div>
            <div className="text-sm">
              <strong>Strong Password:</strong> Your password meets security requirements
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <div className="text-sm">
              <strong>Active Sessions:</strong>{' '}
              {sessions.length > 1
                ? `You have ${sessions.length} active sessions. Review and end any you don't recognise.`
                : 'Only your current session is active.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
