import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase/client';
import { RefreshCw, Send, X, Check, Eye, Key } from 'lucide-react';
import { toast } from 'sonner';

interface PasswordResetRequest {
  id: string;
  user_id: string;
  email: string;
  timestamp: string;
  status: 'pending' | 'code_sent' | 'completed' | 'rejected' | 'expired';
  recoveryCode?: string;
}

export default function PasswordResetManagement() {
  const [requests, setRequests] = useState<PasswordResetRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<PasswordResetRequest | null>(null);
  const [recoveryCode, setRecoveryCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'code' | 'password'>('code');
  const [isLoading, setIsLoading] = useState(false);

  const loadRequests = () => {
    setIsLoading(true);
    try {
      const stored = JSON.parse(localStorage.getItem('gross_password_reset_requests') || '[]');
      // Map it to ensure interface compliance
      const mapped = stored.map((r: any) => ({
        id: r.id,
        user_id: 'unknown',
        email: r.email,
        timestamp: r.timestamp,
        status: r.status,
        recoveryCode: r.recoveryCode
      }));
      // Sort newest first
      mapped.sort((a: any, b: any) => b.timestamp - a.timestamp);
      setRequests(mapped);
    } catch (error) {
      console.error('Failed to load reset requests:', error);
      toast.error('Failed to load reset requests');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
    
    // Listen for cross-tab storage changes
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'gross_password_reset_requests') {
        loadRequests();
      }
    };
    
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const generateRecoveryCode = () => {
    // Generate 6-digit code
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendRecoveryCode = (request: PasswordResetRequest) => {
    setSelectedRequest(request);
    setRecoveryCode(generateRecoveryCode());
    setModalMode('code');
    setShowModal(true);
  };

  const handleResetPassword = (request: PasswordResetRequest) => {
    setSelectedRequest(request);
    setNewPassword('');
    setModalMode('password');
    setShowModal(true);
  };

  const confirmSendRecoveryCode = async () => {
    if (!selectedRequest) return;

    try {
      const stored = JSON.parse(localStorage.getItem('gross_password_reset_requests') || '[]');
      const index = stored.findIndex((r: any) => r.id === selectedRequest.id);
      
      if (index !== -1) {
        stored[index].recoveryCode = recoveryCode;
        stored[index].status = 'code_sent';
        localStorage.setItem('gross_password_reset_requests', JSON.stringify(stored));
        window.dispatchEvent(new StorageEvent('storage', { key: 'gross_password_reset_requests', newValue: JSON.stringify(stored) }));
        
        toast.success(`Recovery code sent to ${selectedRequest.email}`);
        setShowModal(false);
        setSelectedRequest(null);
        setRecoveryCode('');
        loadRequests();
      }
    } catch (err) {
      toast.error('Failed to update recovery code');
    }
  };

  const confirmResetPassword = async () => {
    if (!selectedRequest || !newPassword) {
      toast.error('Please enter a new password');
      return;
    }

    if (newPassword.length < 8 || !/\d/.test(newPassword) || !/[a-zA-Z]/.test(newPassword)) {
      toast.error('Password must be 8+ chars with a letter and number');
      return;
    }

    try {
      // Direct reset (for mock/local users logic)
      const storedUsers = JSON.parse(localStorage.getItem('gross_users') || '[]');
      const userIndex = storedUsers.findIndex((u: any) => u.email === selectedRequest.email);
      
      if (userIndex !== -1) {
        storedUsers[userIndex].password = newPassword;
        localStorage.setItem('gross_users', JSON.stringify(storedUsers));
        window.dispatchEvent(new StorageEvent('storage', { key: 'gross_users', newValue: JSON.stringify(storedUsers) }));
      }
      
      // Update the request status
      const stored = JSON.parse(localStorage.getItem('gross_password_reset_requests') || '[]');
      const reqIndex = stored.findIndex((r: any) => r.id === selectedRequest.id);
      if (reqIndex !== -1) {
        stored[reqIndex].status = 'completed';
        localStorage.setItem('gross_password_reset_requests', JSON.stringify(stored));
        window.dispatchEvent(new StorageEvent('storage', { key: 'gross_password_reset_requests', newValue: JSON.stringify(stored) }));
      }

      toast.success(`Password reset for ${selectedRequest.email} completed`);
      setShowModal(false);
      setSelectedRequest(null);
      setNewPassword('');
      loadRequests();
    } catch (err) {
      console.error('Reset error:', err);
      toast.error('Failed to reset password');
    }
  };

  const handleRejectRequest = async (request: PasswordResetRequest) => {
    try {
      const stored = JSON.parse(localStorage.getItem('gross_password_reset_requests') || '[]');
      const reqIndex = stored.findIndex((r: any) => r.id === request.id);
      if (reqIndex !== -1) {
        stored[reqIndex].status = 'rejected';
        localStorage.setItem('gross_password_reset_requests', JSON.stringify(stored));
        window.dispatchEvent(new StorageEvent('storage', { key: 'gross_password_reset_requests', newValue: JSON.stringify(stored) }));
      }
      
      toast.success(`Request from ${request.email} rejected`);
      loadRequests();
    } catch (err) {
      toast.error('Failed to reject request');
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      code_sent: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    };

    const labels = {
      pending: 'Pending',
      code_sent: 'Code Sent',
      completed: 'Completed',
      rejected: 'Rejected'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badges[status as keyof typeof badges]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Password Reset Requests
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage user password reset requests
          </p>
        </div>
        <button
          onClick={loadRequests}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {requests.filter(r => r.status === 'pending').length}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">Code Sent</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {requests.filter(r => r.status === 'code_sent').length}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {requests.filter(r => r.status === 'completed').length}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Requests</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {requests.length}
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Recovery Code
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    No password reset requests
                  </td>
                </tr>
              ) : (
                requests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {request.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(request.timestamp).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(request.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {request.recoveryCode ? (
                        <code className="px-2 py-1 bg-gray-100 dark:bg-gray-900 rounded text-sm font-mono text-gray-900 dark:text-white">
                          {request.recoveryCode}
                        </code>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        {request.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleSendRecoveryCode(request)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                              title="Send Recovery Code"
                            >
                              <Send className="w-4 h-4" />
                              Send Code
                            </button>
                            <button
                              onClick={() => handleResetPassword(request)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                              title="Reset Password Directly"
                            >
                              <Key className="w-4 h-4" />
                              Reset
                            </button>
                            <button
                              onClick={() => handleRejectRequest(request)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                              title="Reject Request"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {request.status === 'code_sent' && (
                          <button
                            onClick={() => handleResetPassword(request)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                            title="Reset Password Directly"
                          >
                            <Key className="w-4 h-4" />
                            Reset
                          </button>
                        )}
                        {(request.status === 'completed' || request.status === 'rejected') && (
                          <span className="text-gray-400">No actions available</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {modalMode === 'code' ? 'Send Recovery Code' : 'Reset Password'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                User: <span className="font-medium text-gray-900 dark:text-white">{selectedRequest.email}</span>
              </p>
            </div>

            {modalMode === 'code' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Recovery Code
                  </label>
                  <input
                    type="text"
                    value={recoveryCode}
                    onChange={(e) => setRecoveryCode(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-center text-lg font-mono tracking-widest"
                    maxLength={6}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    This code will be used by the user to reset their password
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmSendRecoveryCode}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Code
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    New Password
                  </label>
                  <input
                    type="text"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="Enter new password"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Must be at least 8 characters with a number and letter
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmResetPassword}
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Reset Password
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
