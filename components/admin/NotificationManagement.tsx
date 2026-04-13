import { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Search, Trash2, Eye, Edit, Bell, BellOff, Plus, X, Filter, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { supabase } from '../../utils/supabase/client';
import { api } from '../../utils/supabase/api';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';

interface Notification {
  id: string;
  userId: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  channels?: string[];
  isVisibleToUser?: boolean;
  relatedId?: string;
}

export default function NotificationManagement() {
  const { users, addNotification } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'success' | 'error' | 'warning' | 'info'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'read' | 'unread'>('all');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [dbNotifications, setDbNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Create notification form
  const [createForm, setCreateForm] = useState({
    userId: '',
    type: 'info' as 'success' | 'error' | 'warning' | 'info',
    title: '',
    message: '',
    channels: ['in-app'],
  });

  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedMessage, setEditedMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Fetch all notifications from database
  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const data = await api.notifications.getAll();
      if (Array.isArray(data)) {
        setDbNotifications(data.map((n: any) => ({
          id: n.id,
          userId: n.user_id,
          type: n.type,
          title: n.title,
          message: n.message,
          timestamp: new Date(n.created_at).getTime(),
          read: n.read_status === 'read',
          isVisibleToUser: n.is_visible,
          channels: n.channels,
          relatedId: n.related_id
        })));
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Set up real-time subscription
    const channel = supabase
      .channel('notifications-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications'
        },
        (payload) => {
          console.log('Realtime notification change:', payload);
          fetchNotifications(); // Simple approach: refetch on any change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Apply filters
  const filteredNotifications = useMemo(() => {
    let notifications = [...dbNotifications];

    // Apply type filter
    if (filterType !== 'all') {
      notifications = notifications.filter(n => n.type === filterType);
    }

    // Apply status filter
    if (filterStatus === 'read') {
      notifications = notifications.filter(n => n.read);
    } else if (filterStatus === 'unread') {
      notifications = notifications.filter(n => !n.read);
    }

    // Apply user filter
    if (selectedUserId) {
      notifications = notifications.filter(n => n.userId === selectedUserId);
    }

    // Apply search query
    if (searchQuery) {
      notifications = notifications.filter(n => {
        const user = users.find(u => u.id === n.userId);
        const userName = user ? `${user.firstName} ${user.lastName}`.toLowerCase() : '';
        const email = user?.email.toLowerCase() || '';
        const query = searchQuery.toLowerCase();
        
        return (
          userName.includes(query) ||
          email.includes(query) ||
          n.title.toLowerCase().includes(query) ||
          n.message.toLowerCase().includes(query)
        );
      });
    }

    return notifications.sort((a, b) => b.timestamp - a.timestamp);
  }, [dbNotifications, filterType, filterStatus, selectedUserId, searchQuery, users]);

  const handleCreateNotification = async () => {
    if (!createForm.userId) {
      toast.error('Please select a user');
      return;
    }
    if (!createForm.title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!createForm.message.trim()) {
      toast.error('Message is required');
      return;
    }

    try {
      await api.notifications.create({
        user_id: createForm.userId,
        type: createForm.type,
        title: createForm.title,
        message: createForm.message,
        channels: createForm.channels,
        is_visible: true
      });
      
      toast.success('Notification created successfully');
      setShowCreateDialog(false);
      setCreateForm({
        userId: '',
        type: 'info',
        title: '',
        message: '',
        channels: ['in-app'],
      });
      fetchNotifications();
    } catch (error) {
      toast.error('Failed to create notification');
    }
  };

  const handleDeleteNotification = async (notificationId: string) => {
    if (confirm('Are you sure you want to delete this notification? This cannot be undone.')) {
      try {
        await api.notifications.delete(notificationId);
        toast.success('Notification deleted successfully');
        fetchNotifications();
      } catch (error) {
        toast.error('Failed to delete notification');
      }
    }
  };

  const handleDeleteAllNotifications = async () => {
    if (confirm('Are you sure you want to delete ALL notifications? This will permanently remove all notifications for all users.')) {
      try {
        await api.notifications.deleteAll();
        toast.success('All notifications deleted successfully');
        fetchNotifications();
      } catch (error) {
        toast.error('Failed to delete notifications');
      }
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await api.notifications.update(notificationId, { read_status: 'read' });
      toast.success('Marked as read');
      fetchNotifications();
    } catch (error) {
      toast.error('Failed to update notification');
    }
  };

  const handleMarkAsUnread = async (notificationId: string) => {
    try {
      await api.notifications.update(notificationId, { read_status: 'unread' });
      toast.success('Marked as unread');
      fetchNotifications();
    } catch (error) {
      toast.error('Failed to update notification');
    }
  };

  const handleViewDetails = (notification: Notification) => {
    setSelectedNotification(notification);
    setEditedMessage(notification.message);
    setEditedTitle(notification.title);
    setIsEditing(false);
    setShowDetailsDialog(true);
  };

  const handleUpdateNotification = async () => {
    if (!selectedNotification) return;
    if (!editedTitle.trim() || !editedMessage.trim()) {
      toast.error('Title and message cannot be empty');
      return;
    }

    try {
      await api.notifications.update(selectedNotification.id, {
        title: editedTitle,
        message: editedMessage
      });
      
      toast.success('Notification updated successfully');
      setSelectedNotification({ ...selectedNotification, title: editedTitle, message: editedMessage });
      setIsEditing(false);
      fetchNotifications();
    } catch (error) {
      toast.error('Failed to update notification');
    }
  };

  const handleToggleVisibility = async (notificationId: string) => {
    try {
      const notification = dbNotifications.find(n => n.id === notificationId);
      if (!notification) return;

      const newVisibility = !notification.isVisibleToUser;
      await api.notifications.update(notificationId, { is_visible: newVisibility });

      // Support for related transactions - if needed, should be handled server-side or via separate API calls
      // For now, just refresh notifications
      fetchNotifications();
      toast.success(newVisibility ? 'Notification is now visible to user' : 'Notification is now hidden from user');
    } catch (error) {
      toast.error('Failed to update visibility');
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4" />;
      case 'error':
        return <AlertCircle className="w-4 h-4" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      case 'info':
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'error':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      case 'warning':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'info':
      default:
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl mb-2">Notification Management</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage all user notifications across the platform
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setShowCreateDialog(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4" />
            Create Notification
          </Button>
          <Button
            onClick={handleDeleteAllNotifications}
            variant="outline"
            className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Trash2 className="w-4 h-4" />
            Delete All
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
              <p className="text-2xl font-bold">{dbNotifications.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <BellOff className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Unread</p>
              <p className="text-2xl font-bold">
                {dbNotifications.filter(n => !n.read).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Read</p>
              <p className="text-2xl font-bold">
                {dbNotifications.filter(n => n.read).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Bell className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Today</p>
              <p className="text-2xl font-bold">
                {dbNotifications.filter(n =>
                  Date.now() - n.timestamp < 24 * 60 * 60 * 1000
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
                placeholder="Search by user, title, message..."
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <Label>Type</Label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
            >
              <option value="all">All Types</option>
              <option value="success">Success</option>
              <option value="error">Error</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
            </select>
          </div>
          <div>
            <Label>Status</Label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
            >
              <option value="all">All Status</option>
              <option value="read">Read</option>
              <option value="unread">Unread</option>
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
        </div>
        {(searchQuery || filterType !== 'all' || filterStatus !== 'all' || selectedUserId) && (
          <div className="flex items-center gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setFilterType('all');
                setFilterStatus('all');
                setSelectedUserId(null);
              }}
              className="flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </Button>
            <span className="text-sm text-gray-500">
              Showing {filteredNotifications.length} notification(s)
            </span>
          </div>
        )}
      </div>

      {/* Notifications Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-700 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {filteredNotifications.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    No notifications found
                  </td>
                </tr>
              ) : (
                filteredNotifications.map((notification) => (
                  <tr key={notification.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4">
                      {notification.read ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-3 h-3" />
                          Read
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400">
                          <Bell className="w-3 h-3" />
                          Unread
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">{getUserName(notification.userId)}</div>
                        <div className="text-sm text-gray-500">{getUserEmail(notification.userId)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getTypeBadgeClass(notification.type)}`}>
                        {getTypeIcon(notification.type)}
                        {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs truncate font-medium">{notification.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-md truncate text-sm text-gray-600 dark:text-gray-400">
                        {notification.message}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div>{new Date(notification.timestamp).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(notification.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {/* Toggle switch */}
                        <label
                          className="flex items-center gap-1.5 cursor-pointer select-none group"
                          title={notification.isVisibleToUser ? 'Visible to User – click to hide' : 'Hidden from User – click to show'}
                        >
                          <button
                            type="button"
                            role="switch"
                            aria-checked={!!notification.isVisibleToUser}
                            onClick={() => handleToggleVisibility(notification.id)}
                            className={`relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border-2 border-transparent
                              transition-all duration-200 ease-in-out
                              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                              hover:scale-110 active:scale-95
                              ${notification.isVisibleToUser
                                ? 'bg-green-500 hover:bg-green-600'
                                : 'bg-gray-300 dark:bg-slate-600 hover:bg-gray-400 dark:hover:bg-slate-500'
                              }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0
                                transition-transform duration-200 ease-in-out
                                ${notification.isVisibleToUser ? 'translate-x-4' : 'translate-x-0'}`}
                            />
                          </button>
                          <span className={`text-xs font-medium transition-colors ${notification.isVisibleToUser ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`}>
                            {notification.isVisibleToUser ? 'On' : 'Off'}
                          </span>
                        </label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(notification)}
                          className="flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View
                        </Button>
                        {!notification.read ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="flex items-center gap-1.5"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            Read
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleMarkAsUnread(notification.id)}
                            className="flex items-center gap-1.5"
                          >
                            <Bell className="w-3.5 h-3.5" />
                            Unread
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteNotification(notification.id)}
                          className="flex items-center gap-1.5 text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

      {/* Create Notification Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Notification</DialogTitle>
            <DialogDescription>
              Send a notification to a specific user
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="create-user">User <span className="text-red-500">*</span></Label>
              <select
                id="create-user"
                value={createForm.userId}
                onChange={(e) => setCreateForm({ ...createForm, userId: e.target.value })}
                className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
              >
                <option value="">Select a user...</option>
                {users.filter(u => u.role !== 'admin').map(user => (
                  <option key={user.id} value={user.id}>
                    {user.firstName} {user.lastName} ({user.email})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="create-type">Type</Label>
              <select
                id="create-type"
                value={createForm.type}
                onChange={(e) => setCreateForm({ ...createForm, type: e.target.value as any })}
                className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
              >
                <option value="info">Info</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>
            <div>
              <Label htmlFor="create-title">Title <span className="text-red-500">*</span></Label>
              <Input
                id="create-title"
                value={createForm.title}
                onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
                placeholder="Enter notification title"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="create-message">Message <span className="text-red-500">*</span></Label>
              <textarea
                id="create-message"
                value={createForm.message}
                onChange={(e) => setCreateForm({ ...createForm, message: e.target.value })}
                placeholder="Enter notification message"
                className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm min-h-[100px]"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-slate-700">
            <Button
              onClick={handleCreateNotification}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Notification
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowCreateDialog(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Notification Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Notification Details</DialogTitle>
            <DialogDescription>
              Detailed information about this notification
            </DialogDescription>
          </DialogHeader>
          {selectedNotification && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-500 text-xs">User</Label>
                  <p className="mt-1 font-medium">{getUserName(selectedNotification.userId)}</p>
                  <p className="text-sm text-gray-500">{getUserEmail(selectedNotification.userId)}</p>
                </div>
                <div>
                  <Label className="text-gray-500 text-xs">Status</Label>
                  <div className="mt-1">
                    {selectedNotification.read ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                        <CheckCircle className="w-4 h-4" />
                        Read
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400">
                        <Bell className="w-4 h-4" />
                        Unread
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <Label className="text-gray-500 text-xs">Type</Label>
                  <div className="mt-1">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${getTypeBadgeClass(selectedNotification.type)}`}>
                      {getTypeIcon(selectedNotification.type)}
                      {selectedNotification.type.charAt(0).toUpperCase() + selectedNotification.type.slice(1)}
                    </span>
                  </div>
                </div>
                <div>
                  <Label className="text-gray-500 text-xs">Channels</Label>
                  <div className="mt-1 flex gap-2 flex-wrap">
                    {(selectedNotification.channels || ['in-app']).map(channel => (
                      <span key={channel} className="px-2 py-1 rounded text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-gray-500 text-xs">Title</Label>
                  {isEditing ? (
                    <Input
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 font-medium">{selectedNotification.title}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-500 text-xs">Message</Label>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        title="Edit Message"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  {isEditing ? (
                    <textarea
                      value={editedMessage}
                      onChange={(e) => setEditedMessage(e.target.value)}
                      className="w-full mt-1 p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter notification message..."
                    />
                  ) : (
                    <p className="mt-1 text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-slate-900/50 p-3 rounded-lg border border-gray-100 dark:border-slate-800">
                      {selectedNotification.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-gray-500 text-xs text-xs">Date</Label>
                  <p className="mt-1">{new Date(selectedNotification.timestamp).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-gray-500 text-xs text-xs">Time</Label>
                  <p className="mt-1">{new Date(selectedNotification.timestamp).toLocaleTimeString()}</p>
                </div>
              </div>
              <div>
                <Label className="text-gray-500 text-xs">Notification ID</Label>
                <code className="block mt-1 text-xs bg-gray-100 dark:bg-slate-700 px-3 py-2 rounded">
                  {selectedNotification.id}
                </code>
              </div>
            </div>
          )}
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-slate-700">
            {isEditing ? (
              <>
                <Button
                  onClick={handleUpdateNotification}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => setShowDetailsDialog(false)}
                  className="flex-1"
                >
                  Close
                </Button>
                {selectedNotification && !selectedNotification.read && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleMarkAsRead(selectedNotification.id);
                      setShowDetailsDialog(false);
                    }}
                    className="flex-1"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Read
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => {
                    if (selectedNotification) {
                      handleDeleteNotification(selectedNotification.id);
                      setShowDetailsDialog(false);
                    }
                  }}
                  className="flex-1 text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
