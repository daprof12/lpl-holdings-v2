import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { migrateBulkDataToSupabase } from '../utils/migrateToSupabase';
import { supabase, getKV, setKV } from '../utils/supabase/client';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  country?: string;
  createdAt: Date;
  role: 'user' | 'admin';
  isVerified: boolean;
  phoneVerified?: boolean;
  kycStatus: 'pending' | 'verified' | 'rejected';
  accountType: 'standard' | 'premium' | 'vip';
  balance: number; // Deprecated - kept for backward compatibility
  liveBalance: number; // Real money trading account
  paperBalance: number; // Demo/practice trading account
  subscriptionPlan?: string;
  lastActive?: Date;
  isOnline?: boolean;
  // Payment method configurations
  enabledDepositMethods?: string[]; // e.g., ['crypto', 'bank_transfer', 'credit_card']
  enabledWithdrawalMethods?: string[]; // e.g., ['crypto', 'bank_transfer']
  cryptoWallets?: {
    [currency: string]: string; // e.g., { BTC: 'wallet_address', ETH: 'wallet_address' }
  };
}

export interface UserActivity {
  id: string;
  userId: string;
  type: 'login' | 'logout' | 'trade' | 'deposit' | 'withdraw' | 'order' | 'subscription' | 'settings' | 'ticket';
  action: string;
  details?: any;
  timestamp: Date;
}

export interface WalletTransaction {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  type: 'deposit' | 'withdraw';
  method: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  accountType: 'live' | 'paper'; // Which account the transaction affects
  transactionHash?: string;
  details?: any;
  timestamp: Date;
  processedAt?: Date;
  notes?: string;
  isVisibleToUser?: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  timestamp: Date;
  link?: string;
  isVisibleToUser?: boolean;
  relatedId?: string; // e.g. transactionId
  channels?: string[];
}

interface AuthContextType {
  currentUser: UserProfile | null;
  users: UserProfile[];
  userActivities: UserActivity[];
  walletTransactions: WalletTransaction[];
  notifications: Notification[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (data: SignupData) => Promise<boolean>;
  updateProfile: (userId: string, updates: Partial<UserProfile>) => void;
  updateUser: (userId: string, updates: Partial<UserProfile>) => void;
  updatePassword: (userId: string, currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  deleteUser: (userId: string) => void;
  logActivity: (activity: Omit<UserActivity, 'id' | 'userId' | 'timestamp'>) => void;
  addWalletTransaction: (transaction: Omit<WalletTransaction, 'id' | 'timestamp' | 'userName' | 'userEmail'>) => string;
  updateTransactionStatus: (transactionId: string, status: WalletTransaction['status'], notes?: string) => void;
  getUserTransactions: (userId: string) => WalletTransaction[];
  addFundsToUser: (userId: string, amount: number, type: 'credit' | 'bonus') => void;
  addFundsToAccount: (userId: string, amount: number, accountType: 'live' | 'paper', type: 'credit' | 'bonus') => void;
  deductFromAccount: (userId: string, amount: number, accountType: 'live' | 'paper') => boolean;
  addNotification: (userId: string, notification: Omit<Notification, 'id' | 'userId' | 'timestamp' | 'read'>) => void;
  markNotificationAsRead: (notificationId: string) => void;
  getUserNotifications: (userId: string) => Notification[];
  isAdmin: boolean;
  isHydrated: boolean;
}

interface SignupData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  country?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    const storedUsers = localStorage.getItem('gross_users');
    const storedCurrentUser = localStorage.getItem('gross_current_user');
    const storedActivities = localStorage.getItem('gross_user_activities');
    const storedPasswords = localStorage.getItem('gross_passwords');

    // Load from database as primary OR localStorage as cache
    const loadInitialData = async () => {
      try {
        // Load users (from DB first, then fallback to local)
        const dbUsers = await getKV('gross_users');
        if (dbUsers) {
          const migratedUsers = dbUsers.map((user: UserProfile) => ({
            ...user,
            liveBalance: user.liveBalance ?? 0,
            paperBalance: user.paperBalance ?? (user.balance || 0),
          }));
          setUsers(migratedUsers);
          localStorage.setItem('gross_users', JSON.stringify(migratedUsers));
        } else if (storedUsers) {
          const parsedUsers = JSON.parse(storedUsers);
          const migratedUsers = parsedUsers.map((user: UserProfile) => ({
            ...user,
            liveBalance: user.liveBalance ?? 0,
            paperBalance: user.paperBalance ?? (user.balance || 0),
          }));
          setUsers(migratedUsers);
        } else {
          // Default admin
          const defaultAdmin: UserProfile = {
            id: 'admin-001',
            email: 'admin@gross.com',
            firstName: 'Admin',
            lastName: 'User',
            createdAt: new Date(),
            role: 'admin',
            isVerified: true,
            kycStatus: 'verified',
            accountType: 'vip',
            balance: 0,
            liveBalance: 0,
            paperBalance: 0,
            enabledDepositMethods: [],
            enabledWithdrawalMethods: [],
            cryptoWallets: {},
          };
          setUsers([defaultAdmin]);
          setKV('gross_users', [defaultAdmin]);
          setKV('gross_passwords', { 'admin@gross.com': 'admin123' });
        }
      } catch (error) {
        console.error('Failed to load users from database:', error);
      }
    };

    loadInitialData();

    // 2. Load current user
    try {
      const userSource = sessionStorage.getItem('gross_current_user') || storedCurrentUser;
      if (userSource) {
        const parsedCurrentUser = JSON.parse(userSource);
        if (parsedCurrentUser) {
          const migratedCurrentUser = {
            ...parsedCurrentUser,
            liveBalance: parsedCurrentUser.liveBalance ?? 0,
            paperBalance: parsedCurrentUser.paperBalance ?? (parsedCurrentUser.balance || 0),
          };
          setCurrentUser(migratedCurrentUser);
          sessionStorage.setItem('gross_current_user', JSON.stringify(migratedCurrentUser));
        }
      }
    } catch (error) {
      console.error('Failed to parse current user:', error);
    }
    
    // 3. Load activities, transactions, notifications from DB/Local
    const loadSupplementalData = async () => {
      try {
        const dbActivities = await getKV('gross_user_activities');
        if (dbActivities) setUserActivities(dbActivities);
        else if (storedActivities) setUserActivities(JSON.parse(storedActivities));

        const dbTransactions = await getKV('gross_wallet_transactions');
        if (dbTransactions) setWalletTransactions(dbTransactions);
        else {
          const storedTransactions = localStorage.getItem('gross_wallet_transactions');
          if (storedTransactions) setWalletTransactions(JSON.parse(storedTransactions));
        }

        const dbNotifications = await getKV('gross_notifications');
        if (dbNotifications) setNotifications(dbNotifications);
        else {
          const storedNotifications = localStorage.getItem('gross_notifications');
          if (storedNotifications) setNotifications(JSON.parse(storedNotifications));
        }
      } catch (error) {
        console.error('Failed to parse supplemental data:', error);
      }
      setIsHydrated(true);
    };

    loadSupplementalData();

    // CRITICAL: Always mark as hydrated even if part of loading fails
    setIsHydrated(true);

    // ── Login As User support ──────────────────────────────────────────
    // If the admin initiated a "Login As User" session, override the currentUser
    const adminLoginAsUser = localStorage.getItem('adminLoginAsUser');
    if (adminLoginAsUser) {
      try {
        const { userId } = JSON.parse(adminLoginAsUser);
        const storedUsers = localStorage.getItem('gross_users');
        if (storedUsers) {
          const allUsers = JSON.parse(storedUsers);
          const targetUser = allUsers.find((u: any) => u.id === userId);
          if (targetUser) {
            console.log('🔑 Initializing isolated session as user:', targetUser.email);
            // Mark this tab as isolated BEFORE setting currentUser
            sessionStorage.setItem('gross_current_user_isolated', 'true');
            sessionStorage.setItem('gross_current_user', JSON.stringify(targetUser));
            setCurrentUser(targetUser);
            
            // Clear the bridge key
            localStorage.removeItem('adminLoginAsUser');
          }
        }
      } catch (error) {
        console.error('Failed to process Login As User:', error);
      }
    }
  }, []);

  // Listen for external updates to users/notifications (e.g., from TransactionProvider)
  useEffect(() => {
    const handleUsersUpdated = () => {
      const storedUsers = localStorage.getItem('gross_users');
      if (storedUsers) {
        try {
          const parsedUsers = JSON.parse(storedUsers);
          setUsers(parsedUsers);
          // Also update currentUser if logged in
          if (currentUser) {
            const updatedCurrentUser = parsedUsers.find((u: UserProfile) => u.id === currentUser.id);
            if (updatedCurrentUser) {
              setCurrentUser(updatedCurrentUser);
            }
          }
        } catch (error) {
          console.error('Failed to sync users after update:', error);
        }
      }
      // Also sync notifications
      const storedNotifications = localStorage.getItem('gross_notifications');
      if (storedNotifications) {
        try {
          setNotifications(JSON.parse(storedNotifications));
        } catch (error) {
          console.error('Failed to sync notifications after update:', error);
        }
      }
    };

    window.addEventListener('usersUpdated', handleUsersUpdated);
    return () => {
      window.removeEventListener('usersUpdated', handleUsersUpdated);
    };
  }, [currentUser?.id]);

  // Cross-tab sync via storage event (fires when another tab modifies localStorage)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      // If this tab is isolated (e.g., an admin "Logged in as User"), 
      // we must ignore identity changes from other tabs to avoid being 
      // forcefully logged back in as the main account (admin).
      const isIsolated = sessionStorage.getItem('gross_current_user_isolated') === 'true';

      if (e.key === 'gross_users' && e.newValue) {
        try {
          const parsedUsers = JSON.parse(e.newValue);
          setUsers(parsedUsers);
          
          // Refresh the currentUser object from the updated users list, but keep the current ID
          const activeUser = currentUser || (isIsolated ? JSON.parse(sessionStorage.getItem('gross_current_user') || 'null') : null);
          
          if (activeUser) {
            const updatedUser = parsedUsers.find((u: UserProfile) => u.id === activeUser.id);
            if (updatedUser) {
              setCurrentUser(updatedUser);
            }
          }
        } catch (error) {
          console.error('Cross-tab users sync failed:', error);
        }
      }

      // DE-SYNCHRONIZED IDENTITY: We no longer sync 'gross_current_user' across tabs 
      // via the storage event listener. This allows an Admin and a User to be logged
      // in simultaneously in different tabs of the same browser for testing.
      // Shared data (users, notifications, etc.) still syncs via the 'gross_users' key above.
      if (e.key === 'gross_notifications' && e.newValue) {
        try {
          setNotifications(JSON.parse(e.newValue));
        } catch (error) {
          console.error('Cross-tab notifications sync failed:', error);
        }
      }
      if (e.key === 'gross_wallet_transactions' && e.newValue) {
        try {
          setWalletTransactions(JSON.parse(e.newValue));
        } catch (error) {
          console.error('Cross-tab wallet transactions sync failed:', error);
        }
      }
      if (e.key === 'gross_user_activities' && e.newValue) {
        try {
          setUserActivities(JSON.parse(e.newValue));
        } catch (error) {
          console.error('Cross-tab activities sync failed:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // ── DATABASE REALTIME SYNC ───────────────────────────────────────────
    const channel = supabase
      .channel('public:kv_store_5d4be467')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'kv_store_5d4be467' 
      }, (payload: any) => {
        const { key, value } = payload.new;
        console.log('🔔 Database update received for key:', key);
        
        switch (key) {
          case 'gross_users':
            setUsers(value);
            break;
          case 'gross_notifications':
            setNotifications(value);
            break;
          case 'gross_wallet_transactions':
            setWalletTransactions(value);
            break;
          case 'gross_user_activities':
            setUserActivities(value);
            break;
        }
      })
      .subscribe();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      supabase.removeChannel(channel);
    };
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('gross_users', JSON.stringify(users));
    }
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      const userJson = JSON.stringify(currentUser);
      sessionStorage.setItem('gross_current_user', userJson);
      
      // Only persist to localStorage if it's NOT an isolated session
      const isIsolated = sessionStorage.getItem('gross_current_user_isolated') === 'true';
      if (!isIsolated) {
        localStorage.setItem('gross_current_user', userJson);
      }
    } else {
      sessionStorage.removeItem('gross_current_user');
      sessionStorage.removeItem('gross_current_user_isolated');
      localStorage.removeItem('gross_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    if (userActivities.length > 0) {
      localStorage.setItem('gross_user_activities', JSON.stringify(userActivities));
    }
  }, [userActivities]);

  useEffect(() => {
    if (walletTransactions.length > 0) {
      localStorage.setItem('gross_wallet_transactions', JSON.stringify(walletTransactions));
    }
  }, [walletTransactions]);

  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem('gross_notifications', JSON.stringify(notifications));
    }
  }, [notifications]);

  // ── Sync to Supabase Logic ──────────────────────────────────────────
  const syncTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Clear any pending sync
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);

    // Skip initial sync to avoid redundant writes on load
    if (!isHydrated) return;

    // Debounce sync briefly to capture rapid changes
    syncTimeoutRef.current = setTimeout(async () => {
      console.log('🔄 Triggering auto-sync to Supabase...');
      try {
        // Use setKV directly for specialized keys for better reliability
        await setKV('gross_users', users);
        await setKV('gross_notifications', notifications);
        await setKV('gross_wallet_transactions', walletTransactions);
        await setKV('gross_user_activities', userActivities);
        console.log('✅ Supabase sync complete');
      } catch (error) {
        console.error('❌ Supabase sync failed:', error);
      }
    }, 2000); // 2s snappy debounce

    return () => {
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    };
  }, [users, userActivities, walletTransactions, notifications, isHydrated]);

  // Activity tracking - Update user's lastActive timestamp
  const updateUserActivity = () => {
    if (currentUser) {
      const now = new Date();
      setUsers(prev =>
        prev.map(user =>
          user.id === currentUser.id
            ? { ...user, lastActive: now, isOnline: true }
            : user
        )
      );
      setCurrentUser(prev => prev ? { ...prev, lastActive: now, isOnline: true } : null);
    }
  };

  // Track user activity on interactions
  useEffect(() => {
    if (!currentUser) return;

    // Update activity on page load
    updateUserActivity();

    // Heartbeat to keep updating while user is active
    const heartbeat = setInterval(() => {
      updateUserActivity();
    }, 60000); // Relaxed to 60 seconds to prevent rapid global syncs

    return () => {
      clearInterval(heartbeat);
    };
  }, [currentUser?.id]);

  // Check for inactive users and mark them offline
  useEffect(() => {
    const checkOnlineStatus = () => {
      const now = new Date();
      const ONLINE_THRESHOLD = 2 * 60 * 1000; // 2 minutes

      setUsers(prev =>
        prev.map(user => {
          if (!user.lastActive) return user;
          
          const timeSinceActive = now.getTime() - new Date(user.lastActive).getTime();
          const shouldBeOnline = timeSinceActive < ONLINE_THRESHOLD;
          
          return { ...user, isOnline: shouldBeOnline };
        })
      );
    };

    // Check every 30 seconds
    const interval = setInterval(checkOnlineStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const storedPasswords = JSON.parse(localStorage.getItem('gross_passwords') || '{}');
    const storedUsers = JSON.parse(localStorage.getItem('gross_users') || '[]');
    
    // Validate credentials
    if (storedPasswords[email] && storedPasswords[email] === password) {
      const user = storedUsers.find((u: UserProfile) => u.email === email);
      if (user) {
        // Clear any isolated marker on explicit login
        sessionStorage.removeItem('gross_current_user_isolated');
        setCurrentUser(user);

        // Capture real device/browser info
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
        const deviceLabel = `${browser} on ${os}`;

        // Generate a unique session ID for this login
        const sessionId = `session-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        sessionStorage.setItem('gross_current_session_id', sessionId);

        // Persist session to localStorage
        const sessionsKey = `gross_sessions_${user.id}`;
        const existingSessions = JSON.parse(localStorage.getItem(sessionsKey) || '[]');
        const newSession = {
          id: sessionId,
          device: deviceLabel,
          browser,
          os,
          deviceType,
          startedAt: new Date().toISOString(),
          lastActive: new Date().toISOString(),
          isCurrent: true,
        };
        // Mark all prior sessions as not current
        const updatedSessions = existingSessions.map((s: any) => ({ ...s, isCurrent: false }));
        updatedSessions.push(newSession);
        // Keep only the last 5 sessions
        const trimmed = updatedSessions.slice(-5);
        localStorage.setItem(sessionsKey, JSON.stringify(trimmed));
        
        // Log activity with device details
        const activity: UserActivity = {
          id: `activity-${Date.now()}`,
          userId: user.id,
          type: 'login',
          action: 'User logged in',
          timestamp: new Date(),
          details: { device: deviceLabel, browser, os, deviceType },
        };
        setUserActivities(prev => [...prev, activity]);
        
        // Trigger data migration to Supabase (async, non-blocking)
        setTimeout(async () => {
          try {
            const { runUserMigration } = await import('../utils/migrateToSupabase');
            await runUserMigration(user.id);
          } catch (error) {
            console.error('Migration error (non-critical):', error);
          }
        }, 1000); // Delay by 1 second to not block login
        
        return true;
      }
    }
    
    return false;
  };

  const logout = () => {
    // 1. IMMEDIATE state update to ensure UI responsiveness
    const lastUserId = currentUser?.id;
    setCurrentUser(null);
    localStorage.removeItem('gross_current_user');
    sessionStorage.removeItem('gross_current_user');
    sessionStorage.removeItem('gross_current_user_isolated');

    // 2. Background updates (non-blocking)
    if (lastUserId) {
      const now = new Date();
      setUsers(prev =>
        prev.map(user =>
          user.id === lastUserId
            ? { ...user, isOnline: false, lastActive: now }
            : user
        )
      );

      const activity: UserActivity = {
        id: `activity-${Date.now()}`,
        userId: lastUserId,
        type: 'logout',
        action: 'User logged out',
        timestamp: now,
      };
      
      setUserActivities(prev => {
        const updated = [...prev, activity];
        localStorage.setItem('gross_user_activities', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const signup = async (data: SignupData): Promise<boolean> => {
    // Read from localStorage to ensure we have the latest data
    const storedUsers = JSON.parse(localStorage.getItem('gross_users') || '[]');
    
    // Check if user already exists
    const existingUser = storedUsers.find((u: UserProfile) => u.email === data.email);
    if (existingUser) {
      return false;
    }

    // Create new user
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      email: data.email,
      firstName: data.firstName || 'New',
      lastName: data.lastName || 'User',
      phone: data.phone,
      country: data.country,
      createdAt: new Date(),
      role: 'user',
      isVerified: false,
      phoneVerified: false,
      kycStatus: 'pending',
      accountType: 'standard',
      balance: 10000, // Deprecated - kept for backward compatibility
      liveBalance: 0, // New users start with 0 live balance
      paperBalance: 10000, // Starting demo balance for practice
      // Empty array = user can see all admin-enabled deposit methods
      enabledDepositMethods: [],
      enabledWithdrawalMethods: [],
      cryptoWallets: {},
    };

    // Store password
    const storedPasswords = JSON.parse(localStorage.getItem('gross_passwords') || '{}');
    storedPasswords[data.email] = data.password;
    localStorage.setItem('gross_passwords', JSON.stringify(storedPasswords));

    // Add user to users list and update both state and localStorage
    const updatedUsers = [...storedUsers, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('gross_users', JSON.stringify(updatedUsers));
    
    // Explicitly forcefully sync to DB so a quick page refresh doesn't wipe them via getKV restore
    setKV('gross_users', updatedUsers).catch(console.error);
    setKV('gross_passwords', storedPasswords).catch(console.error);

    // Log activity
    const activity: UserActivity = {
      id: `activity-${Date.now()}`,
      userId: newUser.id,
      type: 'login',
      action: 'New user registered',
      details: { email: data.email },
      timestamp: new Date(),
    };
    setUserActivities(prev => [...prev, activity]);

    // Don't auto login - let user login manually after registration
    // This allows us to redirect to login page with pre-filled email

    return true;
  };

  const updateProfile = (userId: string, updates: Partial<UserProfile>) => {
    setUsers(prev => {
      const updated = prev.map(user => 
        user.id === userId ? { ...user, ...updates } : user
      );
      // Explicit forceful sync
      setKV('gross_users', updated).catch(console.error);
      return updated;
    });

    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, ...updates } : null);
    }

    // ── Sync with TradingContext's localStorage entries ──────────────────
    // If liveBalance or paperBalance is being updated, sync those specifically
    if (Object.prototype.hasOwnProperty.call(updates, 'liveBalance')) {
      const storageKey = `gross_live_account_${userId}`;
      const fallbackKey = 'gross_live_account';
      const amount = updates.liveBalance as number;

      try {
        const stored = localStorage.getItem(storageKey) || localStorage.getItem(fallbackKey);
        const tradingAccount = stored
          ? JSON.parse(stored)
          : { balance: 0, equity: 0, realizedPnL: 0, unrealizedPnL: 0, margin: 0, availableFunds: 0, bonus: 0 };

        tradingAccount.balance = amount;
        // Adjust equity by the same difference to preserve unrealized PnL logic if possible, 
        // but simple balance update usually resets or recalibrates equity in these systems.
        tradingAccount.equity = tradingAccount.equity + (amount - (tradingAccount.balance_old || tradingAccount.balance));
        tradingAccount.availableFunds = tradingAccount.equity - (tradingAccount.margin || 0);
        tradingAccount.balance = amount;

        localStorage.setItem(storageKey, JSON.stringify(tradingAccount));
        localStorage.setItem(fallbackKey, JSON.stringify(tradingAccount));
        window.dispatchEvent(new Event('storage'));
      } catch (e) {
        console.error('Failed to sync live balance update:', e);
      }
    }

    if (Object.prototype.hasOwnProperty.call(updates, 'paperBalance')) {
      const storageKey = `gross_paper_account_${userId}`;
      const fallbackKey = 'gross_paper_account';
      const amount = updates.paperBalance as number;

      try {
        const stored = localStorage.getItem(storageKey) || localStorage.getItem(fallbackKey);
        const tradingAccount = stored
          ? JSON.parse(stored)
          : { balance: 0, equity: 0, realizedPnL: 0, unrealizedPnL: 0, margin: 0, availableFunds: 0, bonus: 0 };

        tradingAccount.balance = amount;
        tradingAccount.equity = tradingAccount.equity + (amount - (tradingAccount.balance_old || tradingAccount.balance));
        tradingAccount.availableFunds = tradingAccount.equity - (tradingAccount.margin || 0);
        tradingAccount.balance = amount;

        localStorage.setItem(storageKey, JSON.stringify(tradingAccount));
        localStorage.setItem(fallbackKey, JSON.stringify(tradingAccount));
        window.dispatchEvent(new Event('storage'));
      } catch (e) {
        console.error('Failed to sync paper balance update:', e);
      }
    }

    // Log activity
    const activity: UserActivity = {
      id: `activity-${Date.now()}`,
      userId: userId,
      type: 'settings',
      action: 'Profile updated',
      details: updates,
      timestamp: new Date(),
    };
    setUserActivities(prev => [...prev, activity]);
  };

  const updatePassword = async (userId: string, currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    const storedPasswords = JSON.parse(localStorage.getItem('gross_passwords') || '{}');
    const storedUsers = JSON.parse(localStorage.getItem('gross_users') || '[]');
    
    // Validate credentials
    const user = storedUsers.find((u: UserProfile) => u.id === userId);
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    if (storedPasswords[user.email] && storedPasswords[user.email] === currentPassword) {
      // Update password
      storedPasswords[user.email] = newPassword;
      localStorage.setItem('gross_passwords', JSON.stringify(storedPasswords));

      // Log activity
      const activity: UserActivity = {
        id: `activity-${Date.now()}`,
        userId: userId,
        type: 'settings',
        action: 'Password updated',
        timestamp: new Date(),
      };
      setUserActivities(prev => [...prev, activity]);

      return { success: true };
    } else {
      return { success: false, error: 'Incorrect current password' };
    }
  };

  const deleteUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      
      // Remove password
      const storedPasswords = JSON.parse(localStorage.getItem('gross_passwords') || '{}');
      delete storedPasswords[user.email];
      localStorage.setItem('gross_passwords', JSON.stringify(storedPasswords));

      // Log activity
      const activity: UserActivity = {
        id: `activity-${Date.now()}`,
        userId: currentUser?.id || 'admin',
        type: 'settings',
        action: 'User deleted',
        details: { deletedUserId: userId, email: user.email },
        timestamp: new Date(),
      };
      setUserActivities(prev => [...prev, activity]);
    }
  };

  const logActivity = (activity: Omit<UserActivity, 'id' | 'userId' | 'timestamp'>) => {
    if (!currentUser) return;

    const newActivity: UserActivity = {
      ...activity,
      id: `activity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: currentUser.id,
      timestamp: new Date(),
    };

    setUserActivities(prev => [...prev, newActivity]);
  };

  const addWalletTransaction = (transaction: Omit<WalletTransaction, 'id' | 'timestamp' | 'userName' | 'userEmail'>): string => {
    const user = users.find(u => u.id === transaction.userId);
    if (!user) return '';

    const newTransaction: WalletTransaction = {
      ...transaction,
      id: `transaction-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userName: user.firstName + ' ' + user.lastName,
      userEmail: user.email,
      timestamp: new Date(),
      isVisibleToUser: transaction.isVisibleToUser ?? false,
    };

    setWalletTransactions(prev => [...prev, newTransaction]);

    return newTransaction.id;
  };

  const updateTransactionStatus = (transactionId: string, status: WalletTransaction['status'], notes?: string) => {
    setWalletTransactions(prev => 
      prev.map(transaction => 
        transaction.id === transactionId ? { ...transaction, status, notes, processedAt: new Date() } : transaction
      )
    );
  };

  const getUserTransactions = (userId: string) => {
    return walletTransactions.filter(transaction => transaction.userId === userId);
  };

  const addFundsToUser = (userId: string, amount: number, type: 'credit' | 'bonus' | 'balance') => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, balance: user.balance + amount } : user
      )
    );

    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, balance: prev.balance + amount } : null);
    }

    // Log activity
    const activity: UserActivity = {
      id: `activity-${Date.now()}`,
      userId: userId,
      type: 'deposit',
      action: type === 'credit' ? 'Credit added' : type === 'bonus' ? 'Bonus added' : 'Balance added',
      details: { amount, type },
      timestamp: new Date(),
    };
    setUserActivities(prev => [...prev, activity]);
  };

  const addFundsToAccount = (userId: string, amount: number, accountType: 'live' | 'paper', type: 'credit' | 'bonus' | 'balance') => {
    setUsers(prev => 
      prev.map(user => {
        if (user.id !== userId) return user;
        
        if (accountType === 'live') {
          return { ...user, liveBalance: (user.liveBalance || 0) + amount };
        } else {
          return { ...user, paperBalance: (user.paperBalance || 0) + amount };
        }
      })
    );

    if (currentUser?.id === userId) {
      setCurrentUser(prev => {
        if (!prev) return null;
        
        if (accountType === 'live') {
          return { ...prev, liveBalance: (prev.liveBalance || 0) + amount };
        } else {
          return { ...prev, paperBalance: (prev.paperBalance || 0) + amount };
        }
      });
    }

    // ── Sync with TradingContext's localStorage entries ──────────────────
    // TradingContext reads from gross_live_account_{userId} / gross_paper_account_{userId}
    // so we must update those in parallel for the user's WalletPage to reflect the change.
    const storageKey = accountType === 'live'
      ? `gross_live_account_${userId}`
      : `gross_paper_account_${userId}`;
    const fallbackKey = accountType === 'live' ? 'gross_live_account' : 'gross_paper_account';

    try {
      const stored = localStorage.getItem(storageKey) || localStorage.getItem(fallbackKey);
      const tradingAccount = stored
        ? JSON.parse(stored)
        : { balance: 0, equity: 0, realizedPnL: 0, unrealizedPnL: 0, margin: 0, availableFunds: 0, bonus: 0 };

      tradingAccount.balance = (tradingAccount.balance || 0) + amount;
      tradingAccount.equity = (tradingAccount.equity || 0) + amount;
      tradingAccount.availableFunds = (tradingAccount.availableFunds || 0) + amount;
      if (type === 'bonus') {
        tradingAccount.bonus = (tradingAccount.bonus || 0) + amount;
      }

      localStorage.setItem(storageKey, JSON.stringify(tradingAccount));
      localStorage.setItem(fallbackKey, JSON.stringify(tradingAccount));

      // Dispatch storage event so TradingContext picks up the change in real-time
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Failed to sync trading account:', error);
    }

    // Log activity
    const activity: UserActivity = {
      id: `activity-${Date.now()}`,
      userId: userId,
      type: 'deposit',
      action: `${type === 'credit' ? 'Credit' : 'Bonus'} added to ${accountType} account`,
      details: { amount, type, accountType },
      timestamp: new Date(),
    };
    setUserActivities(prev => [...prev, activity]);
  };

  const deductFromAccount = (userId: string, amount: number, accountType: 'live' | 'paper'): boolean => {
    const user = users.find(u => u.id === userId);
    if (!user) return false;

    const currentBalance = accountType === 'live' ? (user.liveBalance || 0) : (user.paperBalance || 0);
    
    if (currentBalance < amount) {
      return false; // Insufficient funds
    }

    setUsers(prev => 
      prev.map(u => {
        if (u.id !== userId) return u;
        
        if (accountType === 'live') {
          return { ...u, liveBalance: (u.liveBalance || 0) - amount };
        } else {
          return { ...u, paperBalance: (u.paperBalance || 0) - amount };
        }
      })
    );

    if (currentUser?.id === userId) {
      setCurrentUser(prev => {
        if (!prev) return null;
        
        if (accountType === 'live') {
          return { ...prev, liveBalance: (prev.liveBalance || 0) - amount };
        } else {
          return { ...prev, paperBalance: (prev.paperBalance || 0) - amount };
        }
      });
    }

    // ── Sync with TradingContext's localStorage entries ──────────────────
    const storageKey = accountType === 'live'
      ? `gross_live_account_${userId}`
      : `gross_paper_account_${userId}`;
    const fallbackKey = accountType === 'live' ? 'gross_live_account' : 'gross_paper_account';

    try {
      const stored = localStorage.getItem(storageKey) || localStorage.getItem(fallbackKey);
      if (stored) {
        const tradingAccount = JSON.parse(stored);
        tradingAccount.balance = Math.max(0, (tradingAccount.balance || 0) - amount);
        tradingAccount.equity = Math.max(0, (tradingAccount.equity || 0) - amount);
        tradingAccount.availableFunds = Math.max(0, (tradingAccount.availableFunds || 0) - amount);

        localStorage.setItem(storageKey, JSON.stringify(tradingAccount));
        localStorage.setItem(fallbackKey, JSON.stringify(tradingAccount));

        // Dispatch storage event so TradingContext picks up the change in real-time
        window.dispatchEvent(new Event('storage'));
      }
    } catch (error) {
      console.error('Failed to sync trading account deduction:', error);
    }

    // Log activity
    const activity: UserActivity = {
      id: `activity-${Date.now()}`,
      userId: userId,
      type: 'withdraw',
      action: `Deducted from ${accountType} account`,
      details: { amount, accountType },
      timestamp: new Date(),
    };
    setUserActivities(prev => [...prev, activity]);

    return true;
  };

  const addNotification = (userId: string, notification: Omit<Notification, 'id' | 'userId' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: userId,
      timestamp: new Date(),
      read: false,
      isVisibleToUser: notification.isVisibleToUser ?? false, // Default to hidden
    };

    setNotifications(prev => [...prev, newNotification]);
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId ? { ...notification, read: true } : notification
      )
    );
  };

  const getUserNotifications = (userId: string) => {
    return notifications.filter(notification => notification.userId === userId);
  };

  const value: AuthContextType = {
    currentUser,
    users,
    userActivities,
    walletTransactions,
    notifications,
    login,
    logout,
    signup,
    updateProfile,
    updateUser: updateProfile,
    updatePassword,
    deleteUser,
    logActivity,
    addWalletTransaction,
    updateTransactionStatus,
    getUserTransactions,
    addFundsToUser,
    addFundsToAccount,
    deductFromAccount,
    addNotification,
    markNotificationAsRead,
    getUserNotifications,
    isAdmin: currentUser?.role === 'admin',
    isHydrated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};