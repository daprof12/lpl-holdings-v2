import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';

// ============================================
// TYPES
// ============================================

export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'promo' | 'announcement' | 'offer';
export type NotificationChannel = 'in-app' | 'email';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  userId?: string; // If undefined, broadcast to all users
  channels: NotificationChannel[];
  metadata?: {
    ticketId?: string;
    promoCode?: string;
    expiryDate?: string;
    actionUrl?: string;
    imageUrl?: string;
  };
}

export interface CRMMessage {
  id: string;
  type: 'general' | 'personal' | 'promo' | 'announcement' | 'offer';
  title: string;
  message: string;
  recipientType: 'all' | 'specific';
  recipientIds: string[];
  channels: NotificationChannel[];
  scheduledFor?: Date;
  status: 'draft' | 'scheduled' | 'sent';
  createdAt: Date;
  sentAt?: Date;
  metadata?: {
    promoCode?: string;
    expiryDate?: string;
    actionUrl?: string;
    imageUrl?: string;
  };
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => string;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (notificationId: string) => void;
  clearAll: () => void;
  // CRM
  crmMessages: CRMMessage[];
  createCRMMessage: (message: Omit<CRMMessage, 'id' | 'createdAt' | 'status'>) => string;
  updateCRMMessage: (id: string, updates: Partial<CRMMessage>) => void;
  sendCRMMessage: (id: string) => void;
  deleteCRMMessage: (id: string) => void;
  // Compat
  refreshNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// ─── Storage helpers ────────────────────────────────────────────────────────

const NOTIF_KEY = 'gross_notifications';
const CRM_KEY   = 'gross_crm_messages';

function deduplicateById<T extends { id: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter(item => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

function loadNotifications(): Notification[] {
  try {
    const raw = localStorage.getItem(NOTIF_KEY);
    if (!raw) return [];
    const parsed = (JSON.parse(raw) as any[]).map(n => ({
      ...n,
      timestamp: new Date(n.timestamp),
    }));
    return deduplicateById(parsed);
  } catch {
    return [];
  }
}

function loadCRMMessages(): CRMMessage[] {
  try {
    const raw = localStorage.getItem(CRM_KEY);
    if (!raw) return [];
    return (JSON.parse(raw) as any[]).map(m => ({
      ...m,
      createdAt:    new Date(m.createdAt),
      sentAt:       m.sentAt       ? new Date(m.sentAt)       : undefined,
      scheduledFor: m.scheduledFor ? new Date(m.scheduledFor) : undefined,
    }));
  } catch {
    return [];
  }
}

// ─── Provider ───────────────────────────────────────────────────────────────

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(loadNotifications);
  const [crmMessages,   setCrmMessages]   = useState<CRMMessage[]>(loadCRMMessages);
  const [loading, setLoading] = useState(false);

  // ✅ Correctly destructure currentUser (not `user`) from AuthContext
  const { currentUser } = useAuth();

  // Persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(NOTIF_KEY, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(CRM_KEY, JSON.stringify(crmMessages));
  }, [crmMessages]);

  // Cross-tab sync via storage event
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === NOTIF_KEY && e.newValue) {
        try {
          const parsed = (JSON.parse(e.newValue) as any[]).map(n => ({
            ...n,
            timestamp: new Date(n.timestamp),
          }));
          setNotifications(deduplicateById(parsed));
        } catch (error) {
          console.error('Cross-tab notifications sync failed:', error);
        }
      }
      if (e.key === CRM_KEY && e.newValue) {
        try {
          setCrmMessages(JSON.parse(e.newValue));
        } catch (error) {
          console.error('Cross-tab CRM messages sync failed:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Same-tab sync: AuthContext also writes to gross_notifications,
  // so poll for changes that happen within the same tab
  useEffect(() => {
    const interval = setInterval(() => {
      const fresh = loadNotifications();
      setNotifications(prev => {
        // Only update if localStorage has notifications we don't have
        if (fresh.length !== prev.length) {
          // Merge: keep our state but add any new ones from localStorage
          const prevIds = new Set(prev.map(n => n.id));
          const newOnes = fresh.filter(n => !prevIds.has(n.id));
          if (newOnes.length > 0) {
            return deduplicateById([...newOnes, ...prev]);
          }
          // If localStorage has fewer (deletions from other context), use localStorage
          if (fresh.length < prev.length) {
            return fresh;
          }
        }
        return prev;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // When the logged-in user changes, re-read persisted notifications
  // (no network call – localStorage is the source of truth)
  const refreshNotifications = useCallback(async () => {
    setLoading(true);
    try {
      setNotifications(loadNotifications());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentUser?.id) {
      refreshNotifications();
    }
  }, [currentUser?.id, refreshNotifications]);

  // ─── Notification CRUD ──────────────────────────────────────────────────

  const addNotification = useCallback(
    (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): string => {
      const id = `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newNotification: Notification = {
        ...notification,
        id,
        timestamp: new Date(),
        read: false,
      };

      setNotifications(prev => {
        const next = [newNotification, ...prev];
        // Persist synchronously so the same-tab poller never sees stale data
        localStorage.setItem(NOTIF_KEY, JSON.stringify(next));
        return next;
      });

      // Show a toast for in-app channel
      if (notification.channels.includes('in-app')) {
        const type = notification.type;
        if (type === 'error') {
          toast.error(notification.title, { description: notification.message });
        } else if (type === 'success') {
          toast.success(notification.title, { description: notification.message });
        } else if (type === 'warning') {
          toast.warning(notification.title, { description: notification.message });
        } else {
          toast.info(notification.title, { description: notification.message });
        }
      }

      return id;
    },
    []
  );

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => {
      // Only mark as read if it's a broadcast notification or targeted at the current user
      if (!n.userId || n.userId === currentUser?.id) {
        return { ...n, read: true };
      }
      return n;
    }));
  }, [currentUser?.id]);

  const deleteNotification = useCallback((notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // ─── CRM ────────────────────────────────────────────────────────────────

  const createCRMMessage = useCallback(
    (message: Omit<CRMMessage, 'id' | 'createdAt' | 'status'>): string => {
      const id = `crm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newMessage: CRMMessage = {
        ...message,
        id,
        createdAt: new Date(),
        status: 'draft',
      };
      setCrmMessages(prev => [newMessage, ...prev]);
      toast.success('Message created successfully');
      return id;
    },
    []
  );

  const updateCRMMessage = useCallback((id: string, updates: Partial<CRMMessage>) => {
    setCrmMessages(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
    toast.success('Message updated');
  }, []);

  const sendCRMMessage = useCallback(
    (id: string) => {
      const message = crmMessages.find(m => m.id === id);
      if (!message) {
        toast.error('Message not found');
        return;
      }

      // Mark as sent
      setCrmMessages(prev =>
        prev.map(m => m.id === id ? { ...m, status: 'sent', sentAt: new Date() } : m)
      );

      // Derive notification type
      const notifType: NotificationType =
        message.type === 'promo'        ? 'promo'
        : message.type === 'announcement' ? 'announcement'
        : message.type === 'offer'        ? 'offer'
        : 'info';

      if (message.recipientType === 'all') {
        addNotification({
          type: notifType,
          title: message.title,
          message: message.message,
          channels: message.channels,
          metadata: message.metadata,
        });
      } else {
        message.recipientIds.forEach(userId => {
          addNotification({
            type: notifType,
            title: message.title,
            message: message.message,
            userId,
            channels: message.channels,
            metadata: message.metadata,
          });
        });
      }

      const externalChannels = message.channels
        .filter(c => c !== 'in-app')
        .map(c => c.toUpperCase())
        .join(', ');

      if (externalChannels) {
        toast.success(
          `Message sent via ${externalChannels} to ${
            message.recipientType === 'all' ? 'all users' : `${message.recipientIds.length} user(s)`
          }`
        );
      } else {
        toast.success(
          `In-app notification sent to ${
            message.recipientType === 'all' ? 'all users' : `${message.recipientIds.length} user(s)`
          }`
        );
      }
    },
    [crmMessages, addNotification]
  );

  const deleteCRMMessage = useCallback((id: string) => {
    setCrmMessages(prev => prev.filter(m => m.id !== id));
    toast.success('Message deleted');
  }, []);

  const unreadCount = notifications.filter(n => {
    if (!n.read) {
      // Only count notifications meant for this user (or broadcast ones with no userId)
      if (n.userId && n.userId !== currentUser?.id) return false;
      return true;
    }
    return false;
  }).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
        crmMessages,
        createCRMMessage,
        updateCRMMessage,
        sendCRMMessage,
        deleteCRMMessage,
        refreshNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
}