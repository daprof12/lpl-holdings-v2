import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';
import { supabase, getKV, setKV } from '../utils/supabase/client';

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
  isVisibleToUser?: boolean; // Admin-controlled visibility flag (default: false for user-targeted)
  relatedId?: string;         // Linked transaction ID
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

  // Load from DB on mount
  useEffect(() => {
    const loadFromDB = async () => {
      try {
        setLoading(true);
        console.log('🔄 Loading notifications from database...');
        
        const dbNotifs = await getKV(NOTIF_KEY);
        if (dbNotifs) {
          const parsed = (dbNotifs as any[]).map(n => ({
            ...n,
            timestamp: new Date(n.timestamp),
          }));
          setNotifications(deduplicateById(parsed));
        }

        const dbCrm = await getKV(CRM_KEY);
        if (dbCrm) {
          const parsed = (dbCrm as any[]).map(m => ({
            ...m,
            createdAt:    new Date(m.createdAt),
            sentAt:       m.sentAt       ? new Date(m.sentAt)       : undefined,
            scheduledFor: m.scheduledFor ? new Date(m.scheduledFor) : undefined,
          }));
          setCrmMessages(parsed);
        }
        
        console.log('✅ Notifications loaded from DB');
      } catch (error) {
        console.error('Failed to load notifications from database:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFromDB();
  }, []);

  // Real-time synchronization
  useEffect(() => {
    const channel = supabase
      .channel('public:kv_store_notifications')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'kv_store_5d4be467' 
      }, (payload: any) => {
        const { key, value } = payload.new;
        
        if (key === NOTIF_KEY) {
          try {
            const parsed = (value as any[]).map(n => ({
              ...n,
              timestamp: new Date(n.timestamp),
            }));
            setNotifications(deduplicateById(parsed));
          } catch (err) {
            console.error('Real-time notifs sync error:', err);
          }
        }
        
        if (key === CRM_KEY) {
          try {
            const parsed = (value as any[]).map(m => ({
              ...m,
              createdAt:    new Date(m.createdAt),
              sentAt:       m.sentAt       ? new Date(m.sentAt)       : undefined,
              scheduledFor: m.scheduledFor ? new Date(m.scheduledFor) : undefined,
            }));
            setCrmMessages(parsed);
          } catch (err) {
            console.error('Real-time CRM sync error:', err);
          }
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Sync to DB helper (Internal use)
  useEffect(() => {
    if (!loading && (notifications.length > 0 || crmMessages.length > 0)) {
       // We can debounce this if needed, but for now we'll rely on the existing CRUD functions
    }
  }, [notifications, crmMessages, loading]);

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
        // User-targeted notifications are hidden by default until admin enables them
        isVisibleToUser: notification.isVisibleToUser ?? (notification.userId ? false : true),
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

  // Only show notifications for THIS user (or broadcast ones)
  // Admin sees all
  const isAdmin = currentUser?.role === 'admin';
  const filteredNotifications = notifications.filter(n => {
    if (isAdmin) return true;
    if (!n.userId) return true; // Broadcast (always show)
    if (n.userId !== currentUser?.id) return false;
    // Hide user-targeted notifications unless admin has toggled them visible
    if (n.isVisibleToUser === false) return false;
    return true;
  });

  const unreadCount = filteredNotifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications: filteredNotifications,
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