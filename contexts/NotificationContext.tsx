import { createContext, useContext, useState, useEffect, useCallback, ReactNode, useRef } from 'react';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';
import { supabase, serverUrl, publicAnonKey } from '../utils/supabase/client';
import { api } from '../utils/supabase/api';

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
    emailTemplateId?: string; // ID of the template used
  };
}

export interface EmailTemplate {
  id: string;
  name: string;
  category: 'deposit' | 'withdrawal' | 'deals' | 'subscription' | 'promotion' | 'general';
  subject: string;
  logoUrl?: string;
  heroImage?: string;
  heroTitle?: string;
  blocks: {
    id: string;
    type: 'text' | 'button' | 'image' | 'feature_list' | 'spacer' | 'footer';
    content: any;
    style?: any;
  }[];
  footerText?: string;
  accentColor?: string;
  lastModified: Date;
}

export interface SMTPConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  fromEmail: string;
  fromName: string;
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
  // Templates & SMTP
  emailTemplates: EmailTemplate[];
  saveEmailTemplate: (template: Omit<EmailTemplate, 'lastModified'>) => void;
  deleteEmailTemplate: (id: string) => void;
  smtpConfig: SMTPConfig | null;
  saveSMTPConfig: (config: SMTPConfig) => void;
  // Compat
  refreshNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// ─── Storage helpers ────────────────────────────────────────────────────────

const NOTIF_KEY     = 'gross_notifications';
const CRM_KEY       = 'gross_crm_messages';
const TEMPLATES_KEY = 'gross_email_templates';
const SMTP_KEY      = 'gross_smtp_config';

// Legacy load helpers removed - using API directly

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
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [crmMessages,   setCrmMessages]   = useState<CRMMessage[]>(loadCRMMessages);
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);
  const [smtpConfig, setSmtpConfig] = useState<SMTPConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

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
        console.log('🔄 Loading notification data from relational API...');
        
        const [dbNotifs, dbCrm, dbTemplates, dbSmtp] = await Promise.all([
          api.notifications.getAll(),
          api.crm.getAll(),
          api.emailTemplates.getAll(),
          api.smtpConfig.get()
        ]);

        if (Array.isArray(dbNotifs)) {
          setNotifications(dbNotifs.map((n: any) => ({
            id: n.id,
            type: n.type,
            title: n.title,
            message: n.message,
            timestamp: new Date(n.timestamp || n.created_at),
            read: n.read_status || false,
            userId: n.user_id,
            channels: n.channels || ['in-app'],
            isVisibleToUser: n.is_visible_to_user ?? true,
            relatedId: n.related_id,
            metadata: n.metadata
          })));
        }

        if (Array.isArray(dbCrm)) {
          setCrmMessages(dbCrm.map((m: any) => ({
            id: m.id,
            type: m.type,
            title: m.title,
            message: m.message,
            recipientType: m.recipient_type,
            recipientIds: m.recipient_ids || [],
            channels: m.channels || ['in-app'],
            scheduledFor: m.scheduled_for ? new Date(m.scheduled_for) : undefined,
            status: m.status,
            createdAt: new Date(m.created_at),
            sentAt: m.sent_at ? new Date(m.sent_at) : undefined,
            metadata: m.metadata
          })));
        }

        if (Array.isArray(dbTemplates)) {
          setEmailTemplates(dbTemplates.map((t: any) => ({
            id: t.id,
            name: t.name,
            category: t.category,
            subject: t.subject,
            logoUrl: t.logo_url,
            heroImage: t.hero_image,
            heroTitle: t.hero_title,
            blocks: t.blocks || [],
            footerText: t.footer_text,
            accentColor: t.accent_color,
            lastModified: new Date(t.updated_at || t.created_at)
          })));
        }

        if (dbSmtp) {
          setSmtpConfig({
            host: dbSmtp.host,
            port: parseInt(dbSmtp.port),
            secure: dbSmtp.secure,
            auth: {
              user: dbSmtp.auth_user,
              pass: dbSmtp.auth_pass
            },
            fromEmail: dbSmtp.from_email,
            fromName: dbSmtp.from_name
          });
        }
        
        console.log('✅ Notification data loaded');
      } catch (error) {
        console.error('Failed to load notifications from database:', error);
      } finally {
        setLoading(false);
        setIsHydrated(true);
      }
    };

    loadFromDB();
  }, []);

  // Refresh notifications v2.0
  const refreshNotifications = useCallback(async () => {
    if (currentUser?.id) {
       setLoading(true);
       try {
         const dbNotifs = await api.notifications.getAll();
         if (Array.isArray(dbNotifs)) {
            setNotifications(dbNotifs.map((n: any) => ({
              id: n.id,
              type: n.type,
              title: n.title,
              message: n.message,
              timestamp: new Date(n.timestamp || n.created_at),
              read: n.read_status || false,
              userId: n.user_id,
              channels: n.channels || ['in-app'],
              isVisibleToUser: n.is_visible_to_user ?? true,
              relatedId: n.related_id,
              metadata: n.metadata
            })));
         }
       } finally {
         setLoading(false);
       }
    }
  }, [currentUser?.id]);

  useEffect(() => {
    if (currentUser?.id) {
      refreshNotifications();
    }
  }, [currentUser?.id, refreshNotifications]);

  // ─── Notification CRUD ──────────────────────────────────────────────────

  const addNotification = useCallback(
    async (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): Promise<string> => {
      try {
        const res = await api.notifications.create({
          type: notification.type,
          title: notification.title,
          message: notification.message,
          user_id: notification.userId,
          channels: notification.channels,
          is_visible_to_user: notification.isVisibleToUser ?? true,
          related_id: notification.relatedId,
          metadata: notification.metadata
        });

        if (res && res.id) {
          refreshNotifications();

          if (notification.channels.includes('in-app')) {
            toast.info(notification.title, { description: notification.message });
          }
          return res.id;
        }
      } catch (err) {
        console.error('Failed to create notification:', err);
      }
      return '';
    },
    [refreshNotifications]
  );

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      await api.notifications.update(notificationId, { read_status: true });
      setNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      // In a real app we'd have a bulk update endpoint
      // For now we'll just update local state and let the server catch up or do individual calls
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (err) {}
  }, []);

  const deleteNotification = useCallback(async (notificationId: string) => {
    try {
      await api.notifications.delete(notificationId);
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
    } catch (err) {
      console.error('Failed to delete notification:', err);
    }
  }, []);

  const clearAll = useCallback(async () => {
    try {
      // Logic for bulk delete
      setNotifications([]);
    } catch (err) {}
  }, []);

  // ─── CRM ────────────────────────────────────────────────────────────────

  const createCRMMessage = useCallback(
    async (message: Omit<CRMMessage, 'id' | 'createdAt' | 'status'>): Promise<string> => {
      try {
        const res = await api.crm.create({
          type: message.type,
          title: message.title,
          message: message.message,
          recipient_type: message.recipientType,
          recipient_ids: message.recipientIds,
          channels: message.channels,
          scheduled_for: message.scheduledFor,
          status: 'draft',
          metadata: message.metadata
        });
        if (res && res.id) {
          toast.success('Message created');
          // Reload
          const allCrm = await api.crm.getAll();
          if (Array.isArray(allCrm)) setCrmMessages(allCrm.map((m: any) => ({
            id: m.id,
            type: m.type,
            title: m.title,
            message: m.message,
            recipientType: m.recipient_type,
            recipientIds: m.recipient_ids || [],
            channels: m.channels || ['in-app'],
            scheduledFor: m.scheduled_for ? new Date(m.scheduled_for) : undefined,
            status: m.status,
            createdAt: new Date(m.created_at),
            sentAt: m.sent_at ? new Date(m.sent_at) : undefined,
            metadata: m.metadata
          })));
          return res.id;
        }
      } catch (err) {
        console.error('Failed to create CRM message:', err);
      }
      return '';
    },
    []
  );

  const updateCRMMessage = useCallback(async (id: string, updates: Partial<CRMMessage>) => {
    try {
      const dbUpdates: any = {};
      if (updates.title) dbUpdates.title = updates.title;
      if (updates.message) dbUpdates.message = updates.message;
      if (updates.status) dbUpdates.status = updates.status;
      if (updates.sentAt) dbUpdates.sent_at = updates.sentAt;

      await api.crm.update(id, dbUpdates);
      setCrmMessages(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
      toast.success('Message updated');
    } catch (err) {
      console.error('Failed to update CRM message:', err);
    }
  }, []);

  const sendCRMMessage = useCallback(
    async (id: string) => {
      try {
        const message = crmMessages.find(m => m.id === id);
        if (!message) return;

        // In a real app the server would handle the sending logic
        // For now we'll simulate it by updating status and creating notifications
        await api.crm.update(id, { status: 'sent', sent_at: new Date() });
        
        const notifType: NotificationType =
          message.type === 'promo'        ? 'promo'
          : message.type === 'announcement' ? 'announcement'
          : message.type === 'offer'        ? 'offer'
          : 'info';

        if (message.recipientType === 'all') {
          await addNotification({
            type: notifType,
            title: message.title,
            message: message.message,
            channels: message.channels,
            metadata: message.metadata,
          });
        } else {
          for (const userId of message.recipientIds) {
            await addNotification({
              type: notifType,
              title: message.title,
              message: message.message,
              userId,
              channels: message.channels,
              metadata: message.metadata,
            });
          }
        }
        
        setCrmMessages(prev =>
          prev.map(m => m.id === id ? { ...m, status: 'sent', sentAt: new Date() } : m)
        );
        toast.success('Message sent');
      } catch (err) {
        console.error('Failed to send CRM message:', err);
      }
    },
    [crmMessages, addNotification]
  );

  const deleteCRMMessage = useCallback(async (id: string) => {
    try {
      await api.crm.delete(id);
      setCrmMessages(prev => prev.filter(m => m.id !== id));
      toast.success('Message deleted');
    } catch (err) {
      console.error('Failed to delete CRM message:', err);
    }
  }, []);

  // Templates
  const saveEmailTemplate = useCallback(async (template: any) => {
    try {
      if (template.id && emailTemplates.find(t => t.id === template.id)) {
        await api.emailTemplates.update(template.id, template);
      } else {
        await api.emailTemplates.create(template);
      }
      // Reload
      const all = await api.emailTemplates.getAll();
      if (Array.isArray(all)) setEmailTemplates(all.map((t: any) => ({
        id: t.id,
        name: t.name,
        category: t.category,
        subject: t.subject,
        logoUrl: t.logo_url,
        blocks: t.blocks || [],
        accentColor: t.accent_color,
        lastModified: new Date(t.updated_at || t.created_at)
      })));
      toast.success('Template saved');
    } catch (err) {
      console.error('Failed to save template:', err);
    }
  }, [emailTemplates]);

  const deleteEmailTemplate = useCallback(async (id: string) => {
    try {
      await api.emailTemplates.delete(id);
      setEmailTemplates(prev => prev.filter(t => t.id !== id));
      toast.success('Template deleted');
    } catch (err) {
      console.error('Failed to delete template:', err);
    }
  }, []);

  const saveSMTPConfig = useCallback(async (config: SMTPConfig) => {
    try {
      await api.smtpConfig.update({
        host: config.host,
        port: config.port.toString(),
        secure: config.secure,
        auth_user: config.auth.user,
        auth_pass: config.auth.pass,
        from_email: config.fromEmail,
        from_name: config.fromName
      });
      setSmtpConfig(config);
      toast.success('SMTP Config updated');
    } catch (err) {
      console.error('Failed to save SMTP config:', err);
    }
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
        emailTemplates,
        saveEmailTemplate,
        deleteEmailTemplate,
        smtpConfig,
        saveSMTPConfig,
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