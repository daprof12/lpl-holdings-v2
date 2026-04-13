import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, serverUrl, publicAnonKey } from '../utils/supabase/client';
import { api } from '../utils/supabase/api';
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
  bonus?: number;
  credit?: number;
  // Access Flags
  hasInvestmentAccess?: boolean;
  hasAutoTradeAccess?: boolean;
  hasSignalAccess?: boolean;
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
  signup: (data: SignupData) => Promise<any>;
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
  userPreferences: any;
  updatePreferences: (updates: any) => Promise<void>;
  isAdmin: boolean;
  isHydrated: boolean;
  refreshData: () => Promise<void>;
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
  const [userPreferences, setUserPreferences] = useState<any>({
    theme: 'dark',
    notifications: { email: true, push: true, sms: false },
    watchlist: []
  });

  // Load from database as primary
  const loadInitialData = async () => {
    try {
      console.log('🔄 Loading initial auth data from relational database...');
      
      // 1. Fetch all datasets from relational tables
      const [dbUsers, dbAccounts, dbWallets] = await Promise.all([
        api.users.getAll(),
        api.tradingAccounts.getAll(),
        api.investmentWallets.getAll()
      ]);
      
      if (dbUsers && Array.isArray(dbUsers)) {
        console.log('Processed DB Users:', dbUsers.length);
        const processedUsers: UserProfile[] = dbUsers.map((u: any) => {
          // Manually join with account and wallet data
          const ta = dbAccounts?.find((acc: any) => acc.user_id === u.id) || {};
          const iw = dbWallets?.find((w: any) => w.user_id === u.id) || {};
          
          return {
            id: u.id,
            email: u.email || '',
            firstName: u.name?.split(' ')[0] || 'User',
            lastName: u.name?.split(' ').slice(1).join(' ') || '',
            role: u.role || 'user',
            country: u.country || '',
            phone: u.phone || '',
            kycStatus: u.kyc_status === 'approved' ? 'verified' : u.kyc_status === 'rejected' ? 'rejected' : 'not_started',
            accountType: u.account_type || 'standard',
            balance: parseFloat(ta.balance || u.balance || 0),
            liveBalance: parseFloat(ta.balance || u.balance || 0),
            credit: parseFloat(ta.credit ?? u.credit ?? 0),
            bonus: parseFloat(ta.bonus ?? u.bonus ?? 0),
            isVerified: u.email_verified || false,
            createdAt: new Date(u.created_at || Date.now()),
            enabledDepositMethods: u.enabled_deposit_methods || [],
            enabledWithdrawalMethods: u.enabled_withdrawal_methods || [],
            cryptoWallets: u.crypto_wallets || {},
            hasInvestmentAccess: u.has_investment_access ?? false,
            hasAutoTradeAccess: u.has_auto_trade_access ?? false,
            hasSignalAccess: u.has_signal_access ?? false,
            investmentBalances: {
              ipo: parseFloat(iw.ipo || u.investment_balances?.ipo || 0),
              ecn: parseFloat(iw.ecn || u.investment_balances?.ecn || 0),
              portfolio: parseFloat(iw.portfolio || u.investment_balances?.portfolio || 0),
            }
          };
        });
        
        setUsers(processedUsers);
        localStorage.setItem('gross_users', JSON.stringify(processedUsers));
      }

      // 2. Fetch User Activities (Audit Logs)
      const { data: logs, error: logsError } = await supabase
        .from('activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(500);

      if (!logsError && logs) {
        const processedActivities: UserActivity[] = logs.map(log => ({
          id: log.id,
          userId: log.actor_id,
          type: log.action as any,
          action: log.description || log.action,
          details: log.metadata || {},
          timestamp: new Date(log.created_at)
        }));
        setUserActivities(processedActivities);
      }

      // 3. Fetch current user's preferences if logged in
      const storedUser = sessionStorage.getItem('gross_current_user') || localStorage.getItem('gross_current_user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        const prefs = await api.preferences.get(parsed.id);
        if (prefs) setUserPreferences(prefs);
      }
    } catch (error) {
      console.error('Failed to load initial data from database:', error);
    }
  };

  // Initialize from relational database and set up Realtime
  useEffect(() => {
    loadInitialData();

    // Check if this tab was opened via admin "Login as User"
    // Must be handled HERE (synchronously) so currentUser is set before
    // ProtectedRoute re-renders and redirects to /login.
    const adminLoginRaw = localStorage.getItem('adminLoginAsUser');
    if (adminLoginRaw) {
      try {
        const adminData = JSON.parse(adminLoginRaw);
        // The admin stored the full user object under adminLoginAsUser.userData
        if (adminData && adminData.userData) {
          const targetUser = adminData.userData;
          const migratedUser = {
            ...targetUser,
            liveBalance: targetUser.liveBalance ?? 0,
            investmentBalances: targetUser.investmentBalances || { ipo: 0, ecn: 0, portfolio: 0 }
          };
          sessionStorage.setItem('gross_current_user_isolated', 'true');
          sessionStorage.setItem('gross_current_user', JSON.stringify(migratedUser));
          setCurrentUser(migratedUser);
          localStorage.removeItem('adminLoginAsUser');
          setIsHydrated(true);
          return; // Skip normal hydration
        }
      } catch (e) {
        console.error('Failed to process adminLoginAsUser during hydration:', e);
      }
    }

    // Normal hydration: load current user from session/local storage
    try {
      const userSource = sessionStorage.getItem('gross_current_user') || localStorage.getItem('gross_current_user');
      if (userSource) {
        const parsedCurrentUser = JSON.parse(userSource);
        if (parsedCurrentUser) {
          // Immediately set what we have from storage
          const migratedCurrentUser = {
            ...parsedCurrentUser,
            liveBalance: parsedCurrentUser.liveBalance ?? 0,
            investmentBalances: parsedCurrentUser.investmentBalances || { ipo: 0, ecn: 0, portfolio: 0 }
          };
          setCurrentUser(migratedCurrentUser);

          // THEN: Fetch absolute latest from DB to ensure up-to-date info (like admin fund additions)
          Promise.all([
            api.users.getById(parsedCurrentUser.id),
            api.tradingAccounts.getByUserId(parsedCurrentUser.id),
            api.investmentWallets.getByUserId(parsedCurrentUser.id)
          ]).then(([u, ta, iw]) => {
            if (u) {
              const latestUser = {
                id: u.id,
                email: u.email || '',
                firstName: u.name?.split(' ')[0] || 'User',
                lastName: u.name?.split(' ').slice(1).join(' ') || '',
                role: u.role || 'user',
                country: u.country || '',
                phone: u.phone || '',
                kycStatus: u.kyc_status === 'approved' ? 'verified' : u.kyc_status === 'rejected' ? 'rejected' : 'not_started',
                accountType: u.account_type || 'standard',
                balance: parseFloat((ta as any)?.balance || u.balance || 0),
                liveBalance: parseFloat((ta as any)?.balance || u.balance || 0),
                credit: parseFloat((ta as any)?.credit || 0),
                bonus: parseFloat((ta as any)?.bonus || 0),
                isVerified: u.email_verified || false,
                createdAt: new Date(u.created_at || Date.now()),
                enabledDepositMethods: u.enabled_deposit_methods || [],
                enabledWithdrawalMethods: u.enabled_withdrawal_methods || [],
                cryptoWallets: u.crypto_wallets || {},
                hasInvestmentAccess: u.has_investment_access ?? false,
                hasAutoTradeAccess: u.has_auto_trade_access ?? false,
                hasSignalAccess: u.has_signal_access ?? false,
                investmentBalances: {
                  ipo: parseFloat((iw as any)?.ipo || u.investment_balances?.ipo || 0),
                  ecn: parseFloat((iw as any)?.ecn || u.investment_balances?.ecn || 0),
                  portfolio: parseFloat((iw as any)?.portfolio || u.investment_balances?.portfolio || 0),
                }
              };
              setCurrentUser(latestUser);
              sessionStorage.setItem('gross_current_user', JSON.stringify(latestUser));
              localStorage.setItem('gross_current_user', JSON.stringify(latestUser));
            } else {
              console.log('⚠️ Stale session detected (user not in DB). Clearing cache...');
              logout();
            }
          }).catch(err => {
            console.error('Failed to refresh currentUser from DB:', err);
            // On hard network error or missing user, safe to treat as logged out
            if (err.message?.includes('not found') || err.code === 'PGRST116') {
              logout();
            }
          });
        }
      }
    } catch (error) {
      console.error('Failed to parse current user:', error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // (adminLoginAsUser is now handled during initial hydration above)

  const updatePreferences = async (updates: any) => {
    if (!currentUser) return;
    try {
      const newPrefs = { ...userPreferences, ...updates };
      setUserPreferences(newPrefs);
      await api.preferences.update(currentUser.id, newPrefs);
    } catch (e) {
      console.error('Failed to update preferences:', e);
    }
  };

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

  // ── SUPABASE REALTIME SUBSCRIPTION ─────────────────────────────────────────
  useEffect(() => {
    if (!currentUser) return;

    console.log('🔗 Establishing Realtime subscriptions for user:', currentUser.id);

    // 1. Subscribe to changes in the users table for the current user
    const userChannel = supabase
      .channel(`user-updates-${currentUser.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'users',
          filter: `id=eq.${currentUser.id}`
        },
        (payload) => {
          console.log('⚡ Realtime: User profile updated', payload);
          const updated = payload.new as any;
          if (updated) {
            setCurrentUser(prev => prev ? {
              ...prev,
              liveBalance: parseFloat(updated.balance || 0),
              kycStatus: updated.kyc_status === 'approved' ? 'verified' : updated.kyc_status === 'rejected' ? 'rejected' : 'pending',
              hasInvestmentAccess: updated.has_investment_access,
              hasAutoTradeAccess: updated.has_auto_trade_access,
              hasSignalAccess: updated.has_signal_access,
              investmentBalances: updated.investment_balances || prev.investmentBalances
            } : null);
          }
        }
      )
      .subscribe();

    // 2. Subscribe to transaction updates
    const txChannel = supabase
      .channel(`tx-updates-${currentUser.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'transactions',
          filter: `user_id=eq.${currentUser.id}`
        },
        (payload) => {
          console.log('⚡ Realtime: Transaction event', payload.eventType);
          // Refresh transaction list
          api.transactions.getByUserId(currentUser.id).then(setWalletTransactions);
        }
      )
      .subscribe();

    // 3. Subscribe to investment wallet updates
    const walletChannel = supabase
      .channel(`wallet-updates-${currentUser.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'investment_wallets',
          filter: `user_id=eq.${currentUser.id}`
        },
        (payload) => {
          console.log('⚡ Realtime: Investment wallet updated', payload);
          const updated = payload.new as any;
          if (updated) {
            setCurrentUser(prev => prev ? {
              ...prev,
              investmentBalances: {
                ipo: parseFloat(updated.ipo || 0),
                ecn: parseFloat(updated.ecn || 0),
                portfolio: parseFloat(updated.portfolio || 0)
              }
            } : null);
          }
        }
      )
      .subscribe();

    // 4. Subscribe to activity logs
    const activityChannel = supabase
      .channel('activity-logs-all')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'activity_logs'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newLog = payload.new;
            const newActivity: UserActivity = {
              id: newLog.id,
              userId: newLog.actor_id,
              type: newLog.action as any,
              action: newLog.description || newLog.action,
              details: newLog.metadata || {},
              timestamp: new Date(newLog.created_at)
            };
            setUserActivities(prev => [newActivity, ...prev].slice(0, 500));
          } else if (payload.eventType === 'DELETE') {
            setUserActivities(prev => prev.filter(a => a.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(userChannel);
      supabase.removeChannel(txChannel);
      supabase.removeChannel(walletChannel);
      supabase.removeChannel(activityChannel);
    };
  }, [currentUser?.id]);

  // Track online status via heartbeat - persists to DB
  useEffect(() => {
    if (!currentUser) return;

    const updateOnlineStatus = async (online: boolean) => {
      try {
        await api.users.update(currentUser.id, { is_online: online, last_active: new Date().toISOString() });
      } catch (e) { /* silent */ }
    };

    updateOnlineStatus(true);
    const interval = setInterval(() => updateOnlineStatus(true), 30000);

    return () => {
      clearInterval(interval);
      updateOnlineStatus(false);
    };
  }, [currentUser?.id]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // 1. Fetch user by email from relational DB
      const user = await api.users.getByEmail(email);
      
      if (!user) return false;

      // 2. Validate password (in a real app, this would be a hash check on the server)
      // For now, we'll keep the logic of checking against the returned password_hash
      if (user.password_hash === password) {
        const processedUser: UserProfile = {
          id: user.id,
          email: user.email,
          firstName: user.name?.split(' ')[0] || 'User',
          lastName: user.name?.split(' ').slice(1).join(' ') || '',
          role: user.role || 'user',
          country: user.country,
          phone: user.phone,
          kycStatus: user.kyc_status === 'approved' ? 'verified' : user.kyc_status === 'rejected' ? 'rejected' : 'not_started',
          accountType: user.account_type || 'standard',
          balance: parseFloat(user.balance || 0),
          liveBalance: parseFloat(user.balance || 0),
          isVerified: user.email_verified || false,
          createdAt: new Date(user.created_at || Date.now()),
          enabledDepositMethods: user.enabled_deposit_methods || [],
          enabledWithdrawalMethods: user.enabled_withdrawal_methods || [],
          cryptoWallets: user.crypto_wallets || {},
        };

        setCurrentUser(processedUser);
        sessionStorage.setItem('gross_current_user', JSON.stringify(processedUser));

        // 3. Create session & Log activity
        const ua = navigator.userAgent;
        const sessionId = `sess-${Date.now()}`;
        
        await api.sessions.create({
          userId: user.id,
          device: ua,
          isActive: true
        });

        await api.loginHistory.log({
          userId: user.id,
          action: 'login',
          success: true,
          device: ua
        });

        return true;
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
    return false;
  };

  const logout = () => {
    const lastUser = currentUser;
    setCurrentUser(null);
    
    // Wipe every possible session key
    sessionStorage.removeItem('gross_current_user');
    sessionStorage.removeItem('gross_current_user_isolated');
    localStorage.removeItem('gross_current_user');
    localStorage.removeItem('adminLoginAsUser');
    localStorage.removeItem('gross_users');
    localStorage.removeItem('gross_notifications');
    
    if (lastUser) {
      api.loginHistory.log({
        userId: lastUser.id,
        action: 'logout',
        success: true
      }).catch(console.error);
    }
  };

  const signup = async (data: SignupData): Promise<boolean> => {
    try {
      // 1. Check if user exists
      const existing = await api.users.getByEmail(data.email);
      if (existing && existing.id) return false;

      // 2. Create user in database
      // Generate a valid UUID v4 for the new user
      const userId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
      
      const now = Date.now();
      const signupData = {
        id: userId,
        email: data.email,
        name: `${data.firstName || ''} ${data.lastName || ''}`.trim(),
        phone: data.phone,
        country: data.country,
        role: data.role || 'user',
        password_hash: data.password,
        status: 'active',
        account_type: data.role === 'admin' ? 'demo' : 'live',
        created_at: now,
        updated_at: now
      };

      const { data: newUser, error } = await supabase
        .from('users')
        .insert(signupData)
        .select()
        .single();

      if (error) {
        console.error('Signup error:', error);
        throw new Error(error.message);
      }

      // 3. Initialize Trading Account and Investment Wallet
      await Promise.all([
        supabase.from('trading_accounts').insert({ 
          user_id: userId, 
          balance: 0, 
          equity: 0, 
          margin: 0, 
          free_margin: 0,
          currency: 'USD'
        }),
        supabase.from('investment_wallets').insert({ 
          user_id: userId, 
          ipo: 0, 
          ecn: 0, 
          portfolio: 0 
        })
      ]);

      if (error) {
        console.error('Signup error:', error);
        throw new Error(error.message);
      }

      console.log('Signup result:', newUser);

      if (newUser && newUser.id) {
        // Force refresh users list
        await loadInitialData();
        return { user: newUser };
      }
    } catch (err) {
      console.error('Signup failed:', err);
      throw err;
    }
  };

  const updateProfile = async (userId: string, updates: Partial<UserProfile>) => {
    try {
      // 1. Map frontend profile fields to database schema
      const dbUpdates: any = {
        updated_at: Date.now()
      };
      
      if (updates.firstName || updates.lastName) {
        const currentUserData = users.find(u => u.id === userId);
        const firstName = updates.firstName !== undefined ? updates.firstName : (currentUserData?.firstName || '');
        const lastName = updates.lastName !== undefined ? updates.lastName : (currentUserData?.lastName || '');
        dbUpdates.name = `${firstName} ${lastName}`.trim();
      }
      
      if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
      if (updates.country !== undefined) dbUpdates.country = updates.country;
      if (updates.role !== undefined) dbUpdates.role = updates.role;
      if (updates.accountType !== undefined) dbUpdates.account_type = updates.accountType;
      if (updates.kycStatus !== undefined) {
        dbUpdates.kyc_status = updates.kycStatus === 'verified' ? 'approved' : 
                               updates.kycStatus === 'rejected' ? 'rejected' : 'pending';
      }
      if (updates.isVerified !== undefined) dbUpdates.email_verified = updates.isVerified;
      if (updates.subscriptionPlan !== undefined) dbUpdates.subscription_plan = updates.subscriptionPlan;
      if (updates.hasInvestmentAccess !== undefined) dbUpdates.has_investment_access = updates.hasInvestmentAccess;
      if (updates.hasAutoTradeAccess !== undefined) dbUpdates.has_auto_trade_access = updates.hasAutoTradeAccess;
      if (updates.hasSignalAccess !== undefined) dbUpdates.has_signal_access = updates.hasSignalAccess;
      
      // Map financial balances to database columns
      if (updates.liveBalance !== undefined) dbUpdates.balance = updates.liveBalance;
      if (updates.bonus !== undefined) dbUpdates.bonus = updates.bonus;
      if (updates.credit !== undefined) dbUpdates.credit = updates.credit;
      
      if (updates.investmentBalances !== undefined) {
        dbUpdates.portfolio_balance = updates.investmentBalances.portfolio;
        dbUpdates.ipo_balance = updates.investmentBalances.ipo;
        dbUpdates.ecn_balance = updates.investmentBalances.ecn;
      }

      // 2. Update in Relational DB
      await api.users.update(userId, dbUpdates);
      
      // 3. Update local state
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updates } : u));
      if (currentUser?.id === userId) {
        setCurrentUser(prev => prev ? { ...prev, ...updates } : null);
      }

      toast.success('Profile updated successfully');
      
      // Dispatch global event for other components to refresh
      window.dispatchEvent(new Event('usersUpdated'));
      await loadInitialData();
    } catch (err) {
      console.error('Failed to update profile:', err);
      toast.error('Failed to sync profile update.');
    }
  };

  const updatePassword = async (userId: string, currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // 1. Fetch user to verify current password (hash)
      const user = await api.users.getById(userId);
      if (!user) return { success: false, error: 'User not found' };

      if (user.password_hash === currentPassword) {
        // 2. Update password hash in DB
        await api.users.update(userId, { password_hash: newPassword });
        return { success: true };
      } else {
        return { success: false, error: 'Incorrect current password' };
      }
    } catch (err) {
      console.error('Password update failed:', err);
      return { success: false, error: 'Sync failed' };
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await fetch(`${serverUrl}/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
      setUsers(prev => prev.filter(u => u.id !== userId));
      toast.success('User deleted');
    } catch (err) {
      console.error('Delete failed:', err);
      toast.error('Failed to delete user from database');
    }
  };

  const logActivity = async (activity: Omit<UserActivity, 'id' | 'userId' | 'timestamp'>) => {
    if (!currentUser) return;

    try {
      await api.userActivities.create({
        user_id: currentUser.id,
        type: activity.type,
        action: activity.action,
        details: activity.details
      });
    } catch (err) {
      console.error('Failed to log activity:', err);
    }
  };

  const addWalletTransaction = async (transaction: Omit<WalletTransaction, 'id' | 'timestamp' | 'userName' | 'userEmail'>): Promise<string> => {
    const user = users.find(u => u.id === transaction.userId);
    if (!user) return '';

    try {
      const res = await api.transactions.create({
        user_id: transaction.userId,
        type: transaction.type,
        amount: transaction.amount,
        status: transaction.status,
        method: transaction.method,
        details: transaction.details,
        is_visible_to_user: transaction.isVisibleToUser ?? false
      });
      return res.id || '';
    } catch (err) {
      console.error('Failed to add transaction:', err);
      return '';
    }
  };

  const updateTransactionStatus = async (transactionId: string, status: WalletTransaction['status'], notes?: string) => {
    try {
      await api.transactions.update(transactionId, { status, notes });
    } catch (err) {
      console.error('Failed to update transaction status:', err);
    }
  };

  const getUserTransactions = (userId: string) => {
    return walletTransactions.filter(transaction => transaction.userId === userId);
  };

  const addFundsToUser = async (userId: string, amount: number, type: 'credit' | 'bonus' | 'balance') => {
    try {
      if (type === 'balance') {
        await api.users.updateBalance(userId, amount);
      }
      
      // Log activity
      await api.userActivities.create({
        user_id: userId,
        type: 'deposit',
        action: type === 'credit' ? 'Credit added' : type === 'bonus' ? 'Bonus added' : 'Balance added',
        details: { amount, type }
      });

      loadInitialData(); // Refresh local state
    } catch (err) {
      console.error('Failed to add funds:', err);
    }
  };

  const addFundsToAccount = async (userId: string, amount: number, accountType: string) => {
    try {
      // 1. Determine which DB table and column to target
      const isTradingAccount = ['live', 'credit', 'bonus'].includes(accountType);
      
      if (isTradingAccount) {
        // Fetch current trading account state
        const account = await api.tradingAccounts.getByUserId(userId);
        const targetField = accountType === 'live' ? 'balance' : accountType;
        
        // Calculate new total (Current + Amount)
        const currentVal = parseFloat(account?.[targetField] || 0);
        const newVal = currentVal + amount;
        
        const tradingUpdates = { [targetField]: newVal };
        const userUpdates = { [targetField]: newVal }; // Column names match in our new users schema
        
        await Promise.all([
          api.tradingAccounts.update(userId, tradingUpdates),
          api.users.update(userId, userUpdates)
        ]);
      } else {
        // Handle Investment Wallets
        const wallet = await api.investmentWallets.getByUserId(userId);
        const currentVal = parseFloat(wallet?.[accountType] || 0);
        const newVal = currentVal + amount;
        
        const walletUpdates = { [accountType]: newVal };
        const userUpdates: any = {};
        // Map to the summary columns in the users table
        if (accountType === 'ipo') userUpdates.ipo_balance = newVal;
        else if (accountType === 'ecn') userUpdates.ecn_balance = newVal;
        else if (accountType === 'portfolio') userUpdates.portfolio_balance = newVal;

        await Promise.all([
          api.investmentWallets.update(userId, walletUpdates),
          api.users.update(userId, userUpdates)
        ]);
      }
      
      await loadInitialData();
      toast.success('Funds updated successfully');
    } catch (err) {
      console.error('Failed to add funds:', err);
      toast.error('Sync failed');
    }
  };

  const deductFromAccount = async (userId: string, amount: number, accountType: 'live' | 'paper' | 'ipo' | 'ecn' | 'portfolio' | 'credit' | 'bonus'): Promise<boolean> => {
    try {
      if (accountType === 'live' || accountType === 'credit' || accountType === 'bonus') {
        const account = await api.tradingAccounts.getByUserId(userId);
        if (!account) return false;

        const fundField = accountType === 'live' ? 'balance' : accountType;
        const currentVal = parseFloat(account[fundField] || 0);
        if (currentVal < amount) return false;

        const updates: any = {};
        const userUpdates: any = {};
        const newVal = currentVal - amount;

        if (accountType === 'live') {
          updates.balance = newVal;
          userUpdates.balance = newVal;
        } else if (accountType === 'credit') {
          updates.credit = newVal;
          userUpdates.credit = newVal;
        } else if (accountType === 'bonus') {
          updates.bonus = newVal;
          userUpdates.bonus = newVal;
        }

        await Promise.all([
          api.tradingAccounts.update(userId, updates),
          api.users.update(userId, userUpdates)
        ]);
      } else {
        const wallet = await api.investmentWallets.getByUserId(userId);
        const currentVal = parseFloat(wallet?.[accountType] || 0);
        if (currentVal < amount) return false;

        const newVal = currentVal - amount;
        const walletUpdates = { [accountType]: newVal };
        const userUpdates: any = {};
        if (accountType === 'ipo') userUpdates.ipo_balance = newVal;
        else if (accountType === 'ecn') userUpdates.ecn_balance = newVal;
        else if (accountType === 'portfolio') userUpdates.portfolio_balance = newVal;

        await Promise.all([
          api.investmentWallets.update(userId, walletUpdates),
          api.users.update(userId, userUpdates)
        ]);
      }

      await loadInitialData();
      return true;
    } catch (err) {
      console.error('Deduction failed:', err);
      return false;
    }
  };

  const addNotification = async (userId: string, notification: Omit<Notification, 'id' | 'userId' | 'timestamp' | 'read'>) => {
    try {
      await api.notifications.create({
        user_id: userId,
        type: notification.type,
        title: notification.title,
        message: notification.message
      });
      
      // Notifications are typically loaded fresh or via subscription in UI
      // but we can trigger a refresh if needed
    } catch (err) {
      console.error('Failed to add notification:', err);
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      await api.notifications.markAsRead(notificationId);
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  const clearNotifications = async (userId: string) => {
    try {
      // Implement if API supports it, otherwise loop or skip
    } catch (err) {
      console.error('Failed to clear notifications:', err);
    }
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
    userPreferences,
    updatePreferences,
    isAdmin: currentUser?.role === 'admin',
    isHydrated,
    refreshData: loadInitialData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};