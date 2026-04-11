import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { migrateBulkDataToSupabase } from '../utils/migrateToSupabase';
import { supabase, getKV, setKV, serverUrl, publicAnonKey } from '../utils/supabase/client';
import { toast } from 'sonner';

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
  subscriptionPlan?: string;
  lastActive?: Date;
  isOnline?: boolean;
  // Payment method configurations
  enabledDepositMethods?: string[]; // e.g., ['crypto', 'bank_transfer', 'credit_card']
  enabledWithdrawalMethods?: string[]; // e.g., ['crypto', 'bank_transfer']
  cryptoWallets?: {
    [currency: string]: string; // e.g., { BTC: 'wallet_address', ETH: 'wallet_address' }
  };
  investmentBalances?: {
    ipo: number;
    ecn: number;
    portfolio: number;
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
  accountType: 'live'; // Which account the transaction affects
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
  addFundsToAccount: (userId: string, amount: number, accountType: 'live' | 'ipo' | 'ecn' | 'portfolio', type: 'credit' | 'bonus' | 'balance') => void;
  deductFromAccount: (userId: string, amount: number, accountType: 'live' | 'ipo' | 'ecn' | 'portfolio' | 'credit' | 'bonus') => boolean;
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
  role?: 'user' | 'admin';
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
        console.log('🔄 Loading initial auth data...');
        // Load users (from DB first, then fallback to local)
        const dbUsers = await getKV('gross_users');
        if (dbUsers) {
          const migratedUsers = dbUsers.map((user: UserProfile) => {
            // Migration: Pull investment balances from legacy localStorage if missing in DB
            let investmentBalances = user.investmentBalances;
            if (!investmentBalances) {
              const legacy = localStorage.getItem(`investment_balances_${user.id}`);
              if (legacy) {
                try {
                  investmentBalances = JSON.parse(legacy);
                } catch (e) {
                  console.error('Failed to migrate legacy investment balances:', e);
                }
              }
            }

            return {
              ...user,
              liveBalance: user.liveBalance ?? 0,
              investmentBalances: investmentBalances || { ipo: 0, ecn: 0, portfolio: 0 }
            };
          });
          setUsers(migratedUsers);
          localStorage.setItem('gross_users', JSON.stringify(migratedUsers));

          // Also load passwords from DB
          const dbPasswords = await getKV('gross_passwords');
          if (dbPasswords) {
            localStorage.setItem('gross_passwords', JSON.stringify(dbPasswords));
          }
        } else if (storedUsers) {
          const parsedUsers = JSON.parse(storedUsers);
          const migratedUsers = parsedUsers.map((user: UserProfile) => {
            let investmentBalances = user.investmentBalances;
            if (!investmentBalances) {
              const legacy = localStorage.getItem(`investment_balances_${user.id}`);
              if (legacy) {
                try {
                  investmentBalances = JSON.parse(legacy);
                } catch (e) {
                  console.error('Failed to migrate legacy investment balances from localStorage cache:', e);
                }
              }
            }

            return {
              ...user,
              liveBalance: user.liveBalance ?? 0,
              investmentBalances: investmentBalances || { ipo: 0, ecn: 0, portfolio: 0 }
            };
          });
          setUsers(migratedUsers);
        } else if (!dbUsers && !storedUsers) {
          // No local OR database users found in KV - this might be a fresh device or KV failure.
          // RECOVERY MODE: Try fetching from the relational 'users' table as a last resort.
          try {
            console.log('🔍 Attempting recovery from relational users table...');
            const response = await fetch(`${serverUrl}/users`, {
              headers: { 'Authorization': `Bearer ${publicAnonKey}` }
            });
            
            if (response.ok) {
              const relationalUsers = await response.json();
              if (relationalUsers && relationalUsers.length > 0) {
                console.log('✅ Recovered users from relational table:', relationalUsers.length);
                const recoveredUsers: UserProfile[] = relationalUsers.map((u: any) => ({
                  id: u.id,
                  email: u.email,
                  firstName: u.name?.split(' ')[0] || 'User',
                  lastName: u.name?.split(' ').slice(1).join(' ') || '',
                  role: u.role || 'user',
                  country: u.country,
                  phone: u.phone,
                  kycStatus: u.kyc_status === 'approved' ? 'verified' : u.kyc_status === 'rejected' ? 'rejected' : 'not_started',
                  accountType: u.account_type || 'standard',
                  liveBalance: parseFloat(u.live_balance || 0),
                  isVerified: u.email_verified || false,
                  createdAt: new Date(u.created_at || Date.now()),
                  enabledDepositMethods: [],
                  enabledWithdrawalMethods: [],
                  cryptoWallets: {},
                }));
                setUsers(recoveredUsers);
                localStorage.setItem('gross_users', JSON.stringify(recoveredUsers));
                // Do NOT automatically setKV here to avoid race conditions; let the next sync handle it if needed
                return;
              }
            }
          } catch (recoveryError) {
            console.error('Failed to recover users from relational table:', recoveryError);
          }

          // If recovery also fails, fallback to local admin
          console.log('⚠️ No users found in DB or relational table. Initializing default admin locally.');
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
            enabledDepositMethods: [],
            enabledWithdrawalMethods: [],
            cryptoWallets: {},
          };
          setUsers([defaultAdmin]);
          localStorage.setItem('gross_users', JSON.stringify([defaultAdmin]));
        }
      } catch (error) {
        console.error('Failed to load users from database:', error);
      } finally {
        // We only mark as hydrated AFTER we've tried loading everything 
        // to prevent premature syncs of empty local state
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
            investmentBalances: parsedCurrentUser.investmentBalances || { ipo: 0, ecn: 0, portfolio: 0 }
          };

          // Final check: if user balances are 0 in memory but exist in legacy storage, try one last recovery
          if (migratedCurrentUser.investmentBalances.ipo === 0 && migratedCurrentUser.investmentBalances.ecn === 0 && migratedCurrentUser.investmentBalances.portfolio === 0) {
            const legacy = localStorage.getItem(`investment_balances_${migratedCurrentUser.id}`);
            if (legacy) {
              try {
                migratedCurrentUser.investmentBalances = JSON.parse(legacy);
              } catch (e) { /* ignore */ }
            }
          }
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
      console.log('✅ Auth context fully hydrated');
    };

    const init = async () => {
      await loadInitialData();
      await loadSupplementalData();
    };

    init();
  }, []);

  useEffect(() => {
    const adminLoginAsUser = localStorage.getItem('adminLoginAsUser');
    if (adminLoginAsUser) {
      try {
        const adminData = JSON.parse(adminLoginAsUser);
        const targetId = adminData.userId;
        const storedUsers = localStorage.getItem('gross_users');
        if (targetId && storedUsers) {
          const allUsers = JSON.parse(storedUsers);
          const targetUser = allUsers.find((u: any) => u.id === targetId);
          if (targetUser) {
            console.log('Initializing isolated session as user:', targetUser.email);
            sessionStorage.setItem('gross_current_user_isolated', 'true');
            sessionStorage.setItem('gross_current_user', JSON.stringify(targetUser));
            setCurrentUser(targetUser);
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

    // -- DATABASE REALTIME SYNC ------------------------------------------─
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

  // -- Sync to Supabase Logic ------------------------------------------
  const syncTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Clear any pending sync
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);

    // Skip initial sync to avoid redundant writes on load
    if (!isHydrated) return;

    // Debounce sync briefly to capture rapid changes
    syncTimeoutRef.current = setTimeout(async () => {
      // Safety check: Don't sync if the list only contains the default admin 
      // AND we haven't successfully heard from the DB yet.
      // This prevents a "re-seeding" client from wiping a populated database.
      if (isHydrated && users.length <= 1) {
         // Optionally check KV one last time before deciding to sync a "fresh" list
         const check = await getKV('gross_users');
         if (check && check.length > users.length) {
             console.warn('🛑 Prevented accidental database wipe. Local state has fewer users than DB.');
             setUsers(check);
             return;
         }
      }

      if (!isHydrated || users.length === 0) return;

      console.log('🔄 Triggering auto-sync to Supabase...');
      try {
        await setKV('gross_users', users);
        await setKV('gross_notifications', notifications);
        await setKV('gross_wallet_transactions', walletTransactions);
        await setKV('gross_user_activities', userActivities);
        console.log('✅ Supabase sync complete');
      } catch (error) {
        console.error('❌ Supabase sync failed:', error);
      }
    }, 3000); // Increased debounce to 3s for safety

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
    let storedPasswords = JSON.parse(localStorage.getItem('gross_passwords') || '{}');
    let storedUsers: UserProfile[] = JSON.parse(localStorage.getItem('gross_users') || '[]');
    
    // If credentials not found locally, try fetching from database
    if (!storedPasswords[email] || !storedUsers.find((u: UserProfile) => u.email === email)) {
      try {
        const [dbUsers, dbPasswords] = await Promise.all([
          getKV('gross_users'),
          getKV('gross_passwords')
        ]);
        
        if (dbUsers && Array.isArray(dbUsers)) {
          storedUsers = dbUsers.map((user: UserProfile) => ({
            ...user,
            liveBalance: user.liveBalance ?? 0,
          }));
          setUsers(storedUsers);
          localStorage.setItem('gross_users', JSON.stringify(storedUsers));
        }
        
        if (dbPasswords && typeof dbPasswords === 'object') {
          storedPasswords = dbPasswords;
          localStorage.setItem('gross_passwords', JSON.stringify(storedPasswords));
        }
      } catch (err) {
        console.error('Failed to fetch credentials from database:', err);
      }
    }
    
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
        
        // Sync sessions to KV
        setKV(`gross_sessions_${user.id}`, trimmed).catch(console.error);
        
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
      role: data.role || 'user',
      isVerified: false,
      phoneVerified: false,
      kycStatus: 'pending',
      accountType: 'standard',
      balance: 0, // Deprecated - kept for backward compatibility
      liveBalance: 0, // New users start with 0 live balance
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
    try {
      // 1. Write to KV store (for total user list and passwords)
      const kvSync = Promise.all([
        setKV('gross_users', updatedUsers),
        setKV('gross_passwords', storedPasswords)
      ]);

      // 2. Write to the proper 'users' table (for backend services)
      const tableSync = fetch(`${serverUrl}/users`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: newUser.id,
          email: newUser.email,
          name: `${newUser.firstName} ${newUser.lastName}`,
          phone: newUser.phone,
          country: newUser.country,
          role: newUser.role,
          account_type: newUser.accountType,
          kyc_status: newUser.kycStatus === 'verified' ? 'approved' : 
                      newUser.kycStatus === 'rejected' ? 'rejected' : 'not_started',
          balance: 0,
          equity: 0,
          free_margin: 0,
          created_at: newUser.createdAt.getTime(),
          updated_at: newUser.createdAt.getTime()
        })
      });

      await Promise.all([kvSync, tableSync]);
      console.log('✅ New user successfully synced to both KV store and users table');
    } catch (dbError) {
      console.error('CRITICAL: Failed to sync new user to database:', dbError);
      toast.warning('Account created locally, but cloud sync failed. Please check your internet connection.');
    }

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
      // 1. Sync User List KV store (Cross-device sync)
      setKV('gross_users', updated).catch(console.error);

      // 2. Sync Individual User Table (Backend services sync)
      const userToSync = updated.find(u => u.id === userId);
      if (userToSync) {
        const dbUpdates: any = {
          updated_at: Date.now()
        };
        
        if (updates.firstName || updates.lastName) {
          dbUpdates.name = `${userToSync.firstName} ${userToSync.lastName}`;
        }
        if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
        if (updates.country !== undefined) dbUpdates.country = updates.country;
        if (updates.role !== undefined) dbUpdates.role = updates.role;
        if (updates.accountType !== undefined) dbUpdates.account_type = updates.accountType;
        if (updates.kycStatus !== undefined) {
          dbUpdates.kyc_status = updates.kycStatus === 'verified' ? 'approved' : 
                                 updates.kycStatus === 'rejected' ? 'rejected' : 'pending';
        }
        if (updates.liveBalance !== undefined) {
          dbUpdates.live_balance = updates.liveBalance;
        }
        if (updates.isVerified !== undefined) dbUpdates.email_verified = updates.isVerified;

        fetch(`${serverUrl}/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dbUpdates)
        }).catch(err => console.error('Failed to sync profile update to users table:', err));
      }

      return updated;
    });

    if (currentUser?.id === userId) {
      setCurrentUser(prev => {
        const updated = prev ? { ...prev, ...updates } : null;
        if (updated) {
          sessionStorage.setItem('gross_current_user', JSON.stringify(updated));
        }
        return updated;
      });
    }

    // -- Sync with TradingContext's localStorage entries ------------------
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
      
      // Sync password change to database
      setKV('gross_passwords', storedPasswords).catch(err => 
        console.error('Failed to sync password change to database:', err)
      );

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

      // Sync deletes to Supabase
      const updatedUsers = users.filter(u => u.id !== userId);
      setKV('gross_users', updatedUsers).catch(console.error);
      setKV('gross_passwords', storedPasswords).catch(console.error);
      
      fetch(`${serverUrl}/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      }).catch(err => console.error('Failed to sync user deletion to users table:', err));
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

  const addFundsToAccount = (userId: string, amount: number, accountType: 'live' | 'paper' | 'ipo' | 'ecn' | 'portfolio', type: 'credit' | 'bonus' | 'balance') => {
    setUsers(prev => 
      prev.map(user => {
        if (user.id !== userId) return user;
        
        if (accountType === 'live') {
          if (type === 'balance') {
            return { ...user, liveBalance: (user.liveBalance || 0) + amount };
          }
          // If credit or bonus, we don't necessarily update liveBalance 
          // if we want to keep liveBalance as "Real Cash".
          // However, many systems treat liveBalance as "Real + Credit + Bonus".
          // The user requested: "should show as either credit or bonus below balance while the live balance is the main balance"
          // So we should probably NOT update user.liveBalance if it's credit/bonus.
          return user;
        } else if (accountType === 'ipo') {
          const balances = user.investmentBalances || { ipo: 0, ecn: 0, portfolio: 0 };
          return { ...user, investmentBalances: { ...balances, ipo: balances.ipo + amount } };
        } else if (accountType === 'ecn') {
          const balances = user.investmentBalances || { ipo: 0, ecn: 0, portfolio: 0 };
          return { ...user, investmentBalances: { ...balances, ecn: balances.ecn + amount } };
        } else if (accountType === 'portfolio') {
          const balances = user.investmentBalances || { ipo: 0, ecn: 0, portfolio: 0 };
          return { ...user, investmentBalances: { ...balances, portfolio: balances.portfolio + amount } };
        } else {
          return user;
        }
      })
    );

    if (currentUser?.id === userId) {
      setCurrentUser(prev => {
        if (!prev) return null;
        
        if (accountType === 'live') {
          if (type === 'balance') {
            return { ...prev, liveBalance: (prev.liveBalance || 0) + amount };
          }
          return prev;
        } else if (accountType === 'ipo') {
           const balances = prev.investmentBalances || { ipo: 0, ecn: 0, portfolio: 0 };
           return { ...prev, investmentBalances: { ...balances, ipo: balances.ipo + amount } };
        } else if (accountType === 'ecn') {
           const balances = prev.investmentBalances || { ipo: 0, ecn: 0, portfolio: 0 };
           return { ...prev, investmentBalances: { ...balances, ecn: balances.ecn + amount } };
        } else if (accountType === 'portfolio') {
           const balances = prev.investmentBalances || { ipo: 0, ecn: 0, portfolio: 0 };
           return { ...prev, investmentBalances: { ...balances, portfolio: balances.portfolio + amount } };
        } else {
          return prev;
        }
      });
    }

    // -- Sync with TradingContext's localStorage entries ------------------
    const storageKey = `gross_live_account_${userId}`;
    const fallbackKey = 'gross_live_account';

    try {
      const stored = localStorage.getItem(storageKey) || localStorage.getItem(fallbackKey);
      const tradingAccount = stored
        ? JSON.parse(stored)
        : { balance: 0, equity: 0, realizedPnL: 0, unrealizedPnL: 0, margin: 0, availableFunds: 0, bonus: 0 };

      if (type === 'balance') {
        tradingAccount.balance = (tradingAccount.balance || 0) + amount;
      } else if (type === 'bonus') {
        tradingAccount.bonus = (tradingAccount.bonus || 0) + amount;
      } else if (type === 'credit') {
        tradingAccount.credit = (tradingAccount.credit || 0) + amount;
      }

      // Equity is the SUM of all 3 pools (+ PnL which TradingContext adds)
      tradingAccount.equity = (tradingAccount.balance || 0) + (tradingAccount.bonus || 0) + (tradingAccount.credit || 0) + (tradingAccount.unrealizedPnL || 0);
      tradingAccount.availableFunds = tradingAccount.equity - (tradingAccount.margin || 0);

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

  const deductFromAccount = (userId: string, amount: number, accountType: 'live' | 'paper' | 'ipo' | 'ecn' | 'portfolio' | 'credit' | 'bonus'): boolean => {
    const user = users.find(u => u.id === userId);
    if (!user) return false;

    let currentBalance = 0;
    const isTradingAccount = accountType === 'live' || accountType === 'credit' || accountType === 'bonus';
    
    if (accountType === 'live' || accountType === 'credit' || accountType === 'bonus') currentBalance = user.liveBalance || 0;
    else {
      const balances = user.investmentBalances || { ipo: 0, ecn: 0, portfolio: 0 };
      currentBalance = balances[accountType as 'ipo'|'ecn'|'portfolio'] || 0;
    }
    
    if (currentBalance < amount) {
      return false; // Insufficient funds
    }

    setUsers(prev => 
      prev.map(u => {
        if (u.id !== userId) return u;
        
        if (accountType === 'live' || accountType === 'credit' || accountType === 'bonus') {
          return { ...u, liveBalance: (u.liveBalance || 0) - amount };
        } else {
          const balances = u.investmentBalances || { ipo: 0, ecn: 0, portfolio: 0 };
          const type = accountType as 'ipo'|'ecn'|'portfolio';
          return { ...u, investmentBalances: { ...balances, [type]: (balances[type] || 0) - amount } };
        }
      })
    );

    if (currentUser?.id === userId) {
      setCurrentUser(prev => {
        if (!prev) return null;
        
        if (accountType === 'live' || accountType === 'credit' || accountType === 'bonus') {
          return { ...prev, liveBalance: (prev.liveBalance || 0) - amount };
        } else {
          const balances = prev.investmentBalances || { ipo: 0, ecn: 0, portfolio: 0 };
          const type = accountType as 'ipo'|'ecn'|'portfolio';
          return { ...prev, investmentBalances: { ...balances, [type]: (balances[type] || 0) - amount } };
        }
      });
    }

    // -- Sync with TradingContext's localStorage entries if it's a trading account --
    if (isTradingAccount) {
      const storageKey = `gross_live_account_${userId}`;
      const fallbackKey = `gross_live_account`;

      try {
        const stored = localStorage.getItem(storageKey) || localStorage.getItem(fallbackKey);
        if (stored) {
          const tradingAccount = JSON.parse(stored);
          if (accountType === 'bonus') {
            tradingAccount.bonus = Math.max(0, (tradingAccount.bonus || 0) - amount);
          } else if (accountType === 'credit') {
            tradingAccount.credit = Math.max(0, (tradingAccount.credit || 0) - amount);
          } else {
            // Default to deducting from real balance
            tradingAccount.balance = Math.max(0, (tradingAccount.balance || 0) - amount);
          }
          
          // Re-calculate derived fields
          tradingAccount.equity = (tradingAccount.balance || 0) + (tradingAccount.bonus || 0) + (tradingAccount.credit || 0) + (tradingAccount.unrealizedPnL || 0);
          tradingAccount.availableFunds = tradingAccount.equity - (tradingAccount.margin || 0);
          
          localStorage.setItem(storageKey, JSON.stringify(tradingAccount));
          localStorage.setItem(fallbackKey, JSON.stringify(tradingAccount));
          window.dispatchEvent(new Event('storage'));
        }
      } catch (err) {
        console.error('Failed to sync deduction to trading account:', err);
      }
    }

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