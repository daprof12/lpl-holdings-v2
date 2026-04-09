import { useState, useEffect } from 'react';
import { Bell, X, Check, Trash2, Tag, Gift, Megaphone, Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { useNotifications } from '../../contexts/NotificationContext';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import { formatTxnId } from '../../utils/formatNumber';

export default function NotificationCenter() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, clearAll, addNotification } = useNotifications();
  const { currentUser } = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  // Listen for ticket events
  useEffect(() => {
    const handleTicketCreated = (event: any) => {
      if (currentUser?.role === 'admin') {
        addNotification({
          type: 'info',
          title: 'New Support Ticket',
          message: `${event.detail.userName} created a ticket: "${event.detail.subject}"`,
          channels: ['in-app'],
          metadata: {
            ticketId: event.detail.ticketId,
          },
        });
      }
    };

    const handleTicketMessage = (event: any) => {
      const shortTicketId = formatTxnId(event.detail.ticketId);
      
      // Notify the opposite party
      if (currentUser?.role === 'admin' && event.detail.senderRole === 'user') {
        addNotification({
          type: 'info',
          title: 'New Ticket Message',
          message: `${event.detail.senderName} replied to ticket ${shortTicketId}`,
          channels: ['in-app'],
          metadata: {
            ticketId: event.detail.ticketId,
          },
        });
        toast.info(`New message from ${event.detail.senderName} on ticket ${shortTicketId}`);
      } else if (currentUser?.role === 'user' && event.detail.senderRole === 'admin' && event.detail.userId === currentUser.id) {
        addNotification({
          type: 'info',
          title: 'Support Team Reply',
          message: `You have a new message for ticket ${shortTicketId}`,
          channels: ['in-app'],
          metadata: {
            ticketId: event.detail.ticketId,
          },
        });
        toast.info(`You have a new message for ticket ${shortTicketId}`, {
          description: 'Check your support tickets for the reply.',
          duration: 6000,
        });
      }
    };

    const handleTicketStatusChanged = (event: any) => {
      if (currentUser?.role === 'user' && event.detail.userId === currentUser.id) {
        const statusMessages = {
          pending: 'Your ticket is being reviewed',
          resolved: 'Your ticket has been resolved',
          closed: 'Your ticket has been closed',
        };
        
        const message = statusMessages[event.detail.status as keyof typeof statusMessages] || `Ticket status changed to ${event.detail.status}`;
        
        addNotification({
          type: event.detail.status === 'resolved' ? 'success' : 'info',
          title: 'Ticket Status Updated',
          message: `${message}: "${event.detail.subject}"`,
          channels: ['in-app'],
          metadata: {
            ticketId: event.detail.ticketId,
          },
        });
      }
    };

    window.addEventListener('ticket-created' as any, handleTicketCreated);
    window.addEventListener('ticket-message' as any, handleTicketMessage);
    window.addEventListener('ticket-status-changed' as any, handleTicketStatusChanged);

    return () => {
      window.removeEventListener('ticket-created' as any, handleTicketCreated);
      window.removeEventListener('ticket-message' as any, handleTicketMessage);
      window.removeEventListener('ticket-status-changed' as any, handleTicketStatusChanged);
    };
  }, [currentUser, addNotification]);

  const filteredNotifications = notifications.filter(notif => {
    // Filter by user (if user-specific notification)
    if (notif.userId && notif.userId !== currentUser?.id) return false;
    
    // Visibility check - skip if explicitly hidden by admin
    if (notif.isVisibleToUser === false) return false;

    // Filter by read status
    if (filter === 'unread' && notif.read) return false;
    
    return true;
  });

  // Count of all notifications visible to current user (for the "All" tab label)
  const userVisibleCount = notifications.filter(notif => {
    if (notif.userId && notif.userId !== currentUser?.id) return false;
    if (notif.isVisibleToUser === false) return false;
    return true;
  }).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'promo': return <Tag className="w-5 h-5 text-purple-500" />;
      case 'announcement': return <Megaphone className="w-5 h-5 text-blue-500" />;
      case 'offer': return <Gift className="w-5 h-5 text-green-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'error': return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'warning': return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'promo': return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800';
      case 'announcement': return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'offer': return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      default: return 'bg-gray-50 dark:bg-slate-900/20 border-gray-200 dark:border-slate-700';
    }
  };

  return (
    <>
      {/* Notification Bell Button */}
      <button
        onClick={() => setShowDialog(true)}
        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Notifications</DialogTitle>
              <div className="flex items-center gap-2">
                {filteredNotifications.length > 0 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Mark all read
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAll}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Clear all
                    </Button>
                  </>
                )}
              </div>
            </div>
          </DialogHeader>

          {/* Filter Tabs */}
          <div className="flex gap-2 border-b border-gray-200 dark:border-slate-700 pb-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600'
              }`}
            >
              All ({userVisibleCount})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'unread'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600'
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
                <Bell className="w-16 h-16 mb-4 opacity-30" />
                <p className="text-lg">No notifications</p>
                <p className="text-sm">You're all caught up!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 rounded-lg border transition-all ${getNotificationStyle(notif.type)} ${
                      !notif.read ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notif.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h4 className="font-semibold">{notif.title}</h4>
                            <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">
                              {notif.message.replace(/\s*by admin\.?/gi, '.')}
                            </p>
                            
                            {/* Metadata */}
                            {notif.metadata?.promoCode && (
                              <div className="mt-2 inline-block px-3 py-1 bg-yellow-200 dark:bg-yellow-900/30 rounded font-mono text-sm">
                                Code: {notif.metadata.promoCode}
                              </div>
                            )}
                            
                            {notif.metadata?.expiryDate && (
                              <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                                Expires: {new Date(notif.metadata.expiryDate).toLocaleDateString()}
                              </div>
                            )}
                            
                            {notif.metadata?.actionUrl && (
                              <a
                                href={notif.metadata.actionUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 inline-block text-sm text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                Learn more →
                              </a>
                            )}
                            
                            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                              {new Date(notif.timestamp).toLocaleString()}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1 flex-shrink-0">
                            {!notif.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notif.id)}
                                title="Mark as read"
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notif.id)}
                              title="Delete"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Channels */}
                        <div className="mt-2 flex gap-1 flex-wrap">
                          {notif.channels?.map(channel => (
                            <span
                              key={channel}
                              className="px-2 py-0.5 bg-white/50 dark:bg-slate-800/50 rounded text-xs capitalize"
                            >
                              {channel}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}