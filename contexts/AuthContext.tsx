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
  passwordHash?: string;
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
  updateUser: (userId: string, updates: Partial<UserProfile>) => Promise<void>;
  updatePassword: (userId: string, currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  deleteUser: (userId: string) => Promise<boolean>;
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
    theme: 'light',
    notifications: { email: true, push: true, sms: false },
    watchlist: []
  });

  // Utility: safely parse a float from any value
  const safeFloat = (val: any) => {
    if (val === null || val === undefined || val === '') return 0;
    const parsed = parseFloat(val);
    return isNaN(parsed) ? 0 : parsed;
  };

  // Load from database as primary
  const loadInitialData = async () => {
    try {
      console.log('🔄 Loading initial auth data from relational database...');

      // 1. Fetch all datasets from relational tables
      const [dbUsers, dbAccounts, dbWallets, dbSubscribers] = await Promise.all([
        api.users.getAll(),
        api.tradingAccounts.getAll(),
        api.investmentWallets.getAll(),
        api.subscribers.getAll()
      ]);

      if (dbUsers && Array.isArray(dbUsers)) {
        console.log('Processed DB Users:', dbUsers.length);
        // safeFloat is defined at component scope above

        const processedUsers: UserProfile[] = dbUsers.map((u: any) => {
          // Manually join with account and wallet data
          const ta = dbAccounts?.find((acc: any) => acc.user_id === u.id) || {};
          const iw = dbWallets?.find((w: any) => w.user_id === u.id) || {};
          const sub = dbSubscribers?.find((s: any) => s.user_id === u.id && s.status === 'active') || {};

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
            subscriptionPlan: sub.plan || u.subscription_plan || '',
            // Use Math.max across all possible balance sources to handle historical data splits
            balance: Math.max(safeFloat(ta.balance), safeFloat(u.balance)),
            liveBalance: Math.max(safeFloat(ta.balance), safeFloat(u.balance)),
            credit: Math.max(safeFloat(ta.credit), safeFloat(u.credit)),
            bonus: Math.max(safeFloat(ta.bonus), safeFloat(u.bonus)),
            isVerified: u.email_verified || false,
            phoneVerified: u.phone_verified || false,
            createdAt: new Date(u.created_at || Date.now()),
            enabledDepositMethods: u.enabled_deposit_methods || [],
            enabledWithdrawalMethods: u.enabled_withdrawal_methods || [],
            cryptoWallets: u.crypto_wallets || {},
            hasInvestmentAccess: u.has_investment_access ?? false,
            hasAutoTradeAccess: u.has_auto_trade_access ?? false,
            hasSignalAccess: u.has_signal_access ?? false,
            investmentBalances: {
              ipo: Math.max(safeFloat(iw.ipo), safeFloat(u.ipo_balance), safeFloat(u.investment_balances?.ipo)),
              ecn: Math.max(safeFloat(iw.ecn), safeFloat(u.ecn_balance), safeFloat(u.investment_balances?.ecn)),
              portfolio: Math.max(safeFloat(iw.portfolio), safeFloat(u.portfolio_balance), safeFloat(u.investment_balances?.portfolio)),
            },
            passwordHash: u.password_hash
          };
        });

        // Debug: log any users where ta.balance and u.balance disagree
        processedUsers.forEach(pu => {
          const ta = dbAccounts?.find((acc: any) => acc.user_id === pu.id);
          const u = dbUsers.find((usr: any) => usr.id === pu.id);
          if (ta && u && safeFloat(ta.balance) !== safeFloat(u.balance)) {
            console.warn(`⚠️ Balance discrepancy for ${pu.email}: trading_accounts.balance=${safeFloat(ta.balance)}, users.balance=${safeFloat(u.balance)}, resolved=${pu.liveBalance}`);
          }
        });

        setUsers(processedUsers);
        localStorage.setItem('gross_users', JSON.stringify(processedUsers));

        setCurrentUser(prevUser => {
          if (!prevUser) return null;
          const freshUser = processedUsers.find(u => u.id === prevUser.id);
          if (freshUser) {
            if (sessionStorage.getItem('gross_current_user')) {
              sessionStorage.setItem('gross_current_user', JSON.stringify(freshUser));
            } else {
              localStorage.setItem('gross_current_user', JSON.stringify(freshUser));
            }
            return freshUser;
          }
          return prevUser;
        });
      }

      // 2. Fetch User Activities (Audit Logs)
      const { data: logs, error: logsError } = await supabase
        .from('activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(500);

      if (logsError) {
        console.error('Failed fetching activity_logs:', logsError.message);
        toast.error(`Database Error: ${logsError.message}`);
      } else if (logs) {
        const processedActivities: UserActivity[] = logs.map(log => ({
          id: log.id,
          userId: log.actor_id || log.admin_id,
          type: log.action as any,
          action: log.description || log.action,
          details: log.metadata || {},
          timestamp: new Date(log.created_at || Date.now())
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
                // Use Math.max across all possible balance sources to handle historical data splits
                balance: Math.max(parseFloat((ta as any)?.balance || 0), parseFloat(u.balance || 0)),
                liveBalance: Math.max(parseFloat((ta as any)?.balance || 0), parseFloat(u.balance || 0)),
                credit: Math.max(parseFloat((ta as any)?.credit || 0), parseFloat(u.credit || 0)),
                bonus: Math.max(parseFloat((ta as any)?.bonus || 0), parseFloat(u.bonus || 0)),
                isVerified: u.email_verified || false,
                phoneVerified: u.phone_verified || false,
                createdAt: new Date(u.created_at || Date.now()),
                enabledDepositMethods: u.enabled_deposit_methods || [],
                enabledWithdrawalMethods: u.enabled_withdrawal_methods || [],
                cryptoWallets: u.crypto_wallets || {},
                hasInvestmentAccess: u.has_investment_access ?? false,
                hasAutoTradeAccess: u.has_auto_trade_access ?? false,
                hasSignalAccess: u.has_signal_access ?? false,
                investmentBalances: {
                  ipo: Math.max(safeFloat((iw as any)?.ipo), safeFloat(u.ipo_balance), safeFloat(u.investment_balances?.ipo)),
                  ecn: Math.max(safeFloat((iw as any)?.ecn), safeFloat(u.ecn_balance), safeFloat(u.investment_balances?.ecn)),
                  portfolio: Math.max(safeFloat((iw as any)?.portfolio), safeFloat(u.portfolio_balance), safeFloat(u.investment_balances?.portfolio)),
                },
                passwordHash: u.password_hash
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
      // Refresh user data from DB instead of localStorage to avoid stale state
      loadInitialData();

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
              phone: updated.phone || prev.phone,
              liveBalance: parseFloat(updated.balance || 0),
              isVerified: updated.email_verified || false,
              phoneVerified: updated.phone_verified || false,
              kycStatus: updated.kyc_status === 'approved' ? 'verified' : updated.kyc_status === 'rejected' ? 'rejected' : updated.kyc_status === 'pending' ? 'pending' : 'not_started',
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

    // 5. Admin-only: Subscribe to ALL user changes to keep the management dashboard in sync
    let adminUsersChannel: any = null;
    if (currentUser?.role === 'admin') {
      console.log('👑 Admin detected: subscribing to global user updates');
      adminUsersChannel = supabase
        .channel('admin-global-user-updates')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'users'
          },
          (payload) => {
            console.log('⚡ Realtime Admin: User row changed', payload.eventType);
            // Instead of full reload, we can merge the update
            if (payload.new && (payload.new as any).id) {
              const u = payload.new as any;
              setUsers(prev => prev.map(old => old.id === u.id ? {
                ...old,
                hasInvestmentAccess: u.has_investment_access,
                hasAutoTradeAccess: u.has_auto_trade_access,
                hasSignalAccess: u.has_signal_access,
                isVerified: u.email_verified,
                phoneVerified: u.phone_verified,
                kycStatus: u.kyc_status === 'approved' ? 'verified' : u.kyc_status === 'rejected' ? 'rejected' : 'pending',
                liveBalance: parseFloat(u.balance || 0),
                investmentBalances: u.investment_balances || old.investmentBalances
              } : old));
            } else if (payload.eventType === 'DELETE') {
              setUsers(prev => prev.filter(old => old.id !== payload.old.id));
            } else {
              loadInitialData();
            }
          }
        )
        .subscribe();
    }

    return () => {
      supabase.removeChannel(userChannel);
      supabase.removeChannel(txChannel);
      supabase.removeChannel(walletChannel);
      supabase.removeChannel(activityChannel);
      if (adminUsersChannel) supabase.removeChannel(adminUsersChannel);
    };
  }, [currentUser?.id]);

  // Global Settings Realtime
  useEffect(() => {
    const globalChannel = supabase
      .channel('global-settings-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'global_settings',
          filter: 'id=eq.global_settings'
        },
        () => {
          console.log('⚡ Realtime: Global settings updated');
          window.dispatchEvent(new Event('globalSettingsUpdated'));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(globalChannel);
    };
  }, []);

  // Track online status via heartbeat - persists to DB
  useEffect(() => {
    if (!currentUser) return;

    const updateOnlineStatus = async (online: boolean) => {
      try {
        await api.users.update(currentUser.id, { is_online: online, last_active: Date.now() });
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

      // 2. Validate password
      if (user.password_hash === password) {
        // 3. Fetch related user data to populate the profile fully
        const [ta, iw, subs] = await Promise.all([
          api.tradingAccounts.getByUserId(user.id),
          api.investmentWallets.getByUserId(user.id),
          api.subscribers.getByUserId(user.id)
        ]);

        const activeSub = subs?.find((s: any) => s.status === 'active');
        // safeFloat is defined at component scope above

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
          subscriptionPlan: activeSub?.plan || user.subscription_plan || '',
          // Use Math.max across all possible balance sources to handle historical data splits
          balance: Math.max(safeFloat((ta as any)?.balance), safeFloat(user.balance)),
          liveBalance: Math.max(safeFloat((ta as any)?.balance), safeFloat(user.balance)),
          credit: Math.max(safeFloat((ta as any)?.credit), safeFloat(user.credit)),
          bonus: Math.max(safeFloat((ta as any)?.bonus), safeFloat(user.bonus)),
          isVerified: user.email_verified || false,
          phoneVerified: user.phone_verified || false,
          createdAt: new Date(user.created_at || Date.now()),
          enabledDepositMethods: user.enabled_deposit_methods || [],
          enabledWithdrawalMethods: user.enabled_withdrawal_methods || [],
          cryptoWallets: user.crypto_wallets || {},
          hasInvestmentAccess: user.has_investment_access ?? false,
          hasAutoTradeAccess: user.has_auto_trade_access ?? false,
          hasSignalAccess: user.has_signal_access ?? false,
          investmentBalances: {
            ipo: Math.max(safeFloat((iw as any)?.ipo), safeFloat(user.ipo_balance), safeFloat(user.investment_balances?.ipo)),
            ecn: Math.max(safeFloat((iw as any)?.ecn), safeFloat(user.ecn_balance), safeFloat(user.investment_balances?.ecn)),
            portfolio: Math.max(safeFloat((iw as any)?.portfolio), safeFloat(user.portfolio_balance), safeFloat(user.investment_balances?.portfolio)),
          },
          passwordHash: user.password_hash,
        };

        setCurrentUser(processedUser);
        sessionStorage.setItem('gross_current_user', JSON.stringify(processedUser));

        // Fetch IP and Location data (fail silently on error)
        let ipInfo = { ip: 'Unknown', location: 'Unknown' };
        try {
          const res = await fetch('https://ipapi.co/json/');
          if (res.ok) {
            const data = await res.json();
            ipInfo = {
              ip: data.ip || 'Unknown',
              location: data.city && data.country_name ? `${data.city}, ${data.country_name}` : 'Unknown'
            };
          }
        } catch (e) {
          console.warn('Could not fetch IP info');
        }

        // Parse a friendly browser/device name from User Agent
        const ua = navigator.userAgent;
        const browserMatch = ua.match(/(firefox|msie|chrome|safari|trident|edge|opera)/i);
        const browser = browserMatch ? browserMatch[1] : 'Unknown Browser';
        const deviceMatch = ua.match(/(iphone|ipod|ipad|android|windows phone|macintosh|windows|linux)/i);
        const deviceType = deviceMatch ? deviceMatch[1] : 'Unknown Device';

        await api.sessions.create({
          userId: user.id,
          device: deviceType,
          isActive: true
        });

        const logRes = await api.loginHistory.log({
          userId: user.id,
          action: 'login',
          success: true,
          device: deviceType,
          browser: browser,
          ip: ipInfo.ip,
          location: ipInfo.location,
          userAgent: ua
        });

        if (!logRes.success) {
          toast.error("Warning: DB Session log failed (Check console)");
        }

        // Refresh all app data in background to ensure lists (activities, etc) are fresh
        loadInitialData().catch(console.error);

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
      // Async wrapper to fetch IP before logging
      (async () => {
        const ua = navigator.userAgent;
        let ipInfo = { ip: 'Unknown', location: 'Unknown' };
        try {
          const res = await fetch('https://ipapi.co/json/');
          if (res.ok) {
            const data = await res.json();
            ipInfo = {
              ip: data.ip || 'Unknown',
              location: data.city && data.country_name ? `${data.city}, ${data.country_name}` : 'Unknown'
            };
          }
        } catch (e) { }

        const browserMatch = ua.match(/(firefox|msie|chrome|safari|trident|edge|opera)/i);
        const deviceMatch = ua.match(/(iphone|ipod|ipad|android|windows phone|macintosh|windows|linux)/i);

        api.loginHistory.log({
          userId: lastUser.id,
          action: 'logout',
          success: true,
          device: deviceMatch ? deviceMatch[1] : 'Unknown Device',
          browser: browserMatch ? browserMatch[1] : 'Unknown Browser',
          ip: ipInfo.ip,
          location: ipInfo.location,
          userAgent: ua
        }).catch(console.error);
      })();
    }
  };

  const signup = async (data: SignupData): Promise<boolean> => {
    try {
      // 1. Check if user exists
      const existing = await api.users.getByEmail(data.email);
      if (existing && existing.id) return false;

      // 2. Create user in database
      // Generate a valid UUID v4 for the new user
      const userId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
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
      const [taRes, iwRes] = await Promise.all([
        supabase.from('trading_accounts').insert({
          user_id: userId,
          balance: 0,
          equity: 0,
          margin: 0,
          available_funds: 0,
          currency: 'USD'
        }),
        supabase.from('investment_wallets').insert({
          user_id: userId,
          ipo: 0,
          ecn: 0,
          portfolio: 0
        })
      ]);

      if (taRes.error) {
        console.error('Trading account initialization error:', taRes.error);
        // We don't necessarily want to throw and block signup if the user record exists,
        // but we should log it. Actually, for consistency, let's throw.
        throw new Error(`Failed to initialize trading account: ${taRes.error.message}`);
      }
      if (iwRes.error) {
        console.error('Investment wallet initialization error:', iwRes.error);
        throw new Error(`Failed to initialize investment wallet: ${iwRes.error.message}`);
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

      if (updates.email !== undefined) dbUpdates.email = updates.email;
      if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
      if (updates.country !== undefined) dbUpdates.country = updates.country;
      if (updates.role !== undefined) dbUpdates.role = updates.role;
      if (updates.accountType !== undefined) dbUpdates.account_type = updates.accountType;
      if (updates.kycStatus !== undefined) {
        dbUpdates.kyc_status = updates.kycStatus === 'verified' ? 'approved' :
          updates.kycStatus === 'rejected' ? 'rejected' : 'pending';
      }
      if (updates.isVerified !== undefined) dbUpdates.email_verified = updates.isVerified;
      if (updates.phoneVerified !== undefined) dbUpdates.phone_verified = updates.phoneVerified;
      // We removed subscription_plan to avoid adblocker rules; relies entirely on member_packages now.
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
      const updatedUsers = users.map(u => u.id === userId ? { ...u, ...updates } : u);
      setUsers(updatedUsers);
      localStorage.setItem('gross_users', JSON.stringify(updatedUsers));

      if (currentUser?.id === userId) {
        const updatedCurrentUser = { ...currentUser, ...updates };
        setCurrentUser(updatedCurrentUser);
        localStorage.setItem('gross_current_user', JSON.stringify(updatedCurrentUser));
        sessionStorage.setItem('gross_current_user', JSON.stringify(updatedCurrentUser));
      }

      // NOTE: Do NOT dispatch 'usersUpdated' here — that triggers loadInitialData()
      // which re-fetches from DB and can race-overwrite the local state we just set.
      // Each caller handles its own toast & any needed side-effects.
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

  const deleteUser = async (userId: string): Promise<boolean> => {
    try {
      await api.users.delete(userId);
      setUsers(prev => prev.filter(u => u.id !== userId));
      // No toast here to prevent double toasts with UserManagement
      return true;
    } catch (err: any) {
      console.error('Delete failed:', err);
      toast.error(`Failed to delete user from database: ${err.message || 'Unknown error'}`);
      return false;
    }
  };

  const logActivity = async (activity: Omit<UserActivity, 'id' | 'userId' | 'timestamp'>) => {
    if (!currentUser) return;

    try {
      await supabase.from('activity_logs').insert({
        actor_id: currentUser.id,
        actor_type: 'user',
        action: activity.type,
        description: activity.action,
        metadata: activity.details || {},
        resource: activity.type,
        resource_type: activity.type,
        created_at: Date.now()
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
      await supabase.from('activity_logs').insert({
        actor_id: userId,
        actor_type: 'user',
        action: 'deposit',
        description: type === 'credit' ? 'Credit added' : type === 'bonus' ? 'Bonus added' : 'Balance added',
        metadata: { amount, type },
        resource: 'wallet',
        resource_type: 'wallet',
        created_at: Date.now()
      });

      loadInitialData(); // Refresh local state
    } catch (err) {
      console.error('Failed to add funds:', err);
    }
  };

  const addFundsToAccount = async (userId: string, amount: number, accountType: string) => {
    try {
      const isTradingAccount = ['live', 'credit', 'bonus'].includes(accountType);

      if (isTradingAccount) {
        const targetField = accountType === 'live' ? 'balance' : accountType;

        // Fetch current value from BOTH sources and use the highest (most up-to-date)
        const [account, userRow] = await Promise.all([
          api.tradingAccounts.getByUserId(userId),
          api.users.getById(userId),
        ]);

        const fromTradingAcc = parseFloat(account?.[targetField] ?? 0);
        const fromUserRow = parseFloat(userRow?.[targetField] ?? 0);
        // Use whichever is more up-to-date (they should match, pick the higher to be safe)
        const currentVal = Math.max(fromTradingAcc, fromUserRow);
        const newVal = currentVal + amount;

        // Update both tables to keep them in sync
        await Promise.all([
          account
            ? api.tradingAccounts.update(userId, { [targetField]: newVal })
            : api.tradingAccounts.insert({ user_id: userId, [targetField]: newVal }),
          api.users.update(userId, { [targetField]: newVal }),
        ]);
      } else {
        // Investment wallets: portfolio / ipo / ecn
        const [wallet, userRow] = await Promise.all([
          api.investmentWallets.getByUserId(userId),
          api.users.getById(userId),
        ]);

        // Users table may use _balance suffix columns
        const userColMap: Record<string, string> = { ipo: 'ipo_balance', ecn: 'ecn_balance', portfolio: 'portfolio_balance' };
        const userCol = userColMap[accountType] || accountType;

        const fromWallet = parseFloat(wallet?.[accountType] ?? 0);
        const fromUserRow = parseFloat(userRow?.[userCol] ?? 0);
        const currentVal = Math.max(fromWallet, fromUserRow);
        const newVal = currentVal + amount;

        await Promise.all([
          wallet
            ? api.investmentWallets.update(userId, { [accountType]: newVal })
            : api.investmentWallets.insert({ user_id: userId, [accountType]: newVal }),
          api.users.update(userId, { [userCol]: newVal }),
        ]);
      }

      await loadInitialData();
    } catch (err) {
      console.error('Failed to add funds:', err);
      throw err; // Re-throw so caller can display the error
    }
  };

  const deductFromAccount = async (userId: string, amount: number, accountType: 'live' | 'paper' | 'ipo' | 'ecn' | 'portfolio' | 'credit' | 'bonus'): Promise<boolean> => {
    try {
      if (accountType === 'live' || accountType === 'credit' || accountType === 'bonus') {
        const fundField = accountType === 'live' ? 'balance' : accountType;

        // Read from BOTH sources to get the true current value
        const [account, userRow] = await Promise.all([
          api.tradingAccounts.getByUserId(userId),
          api.users.getById(userId),
        ]);

        const fromTradingAcc = parseFloat(account?.[fundField] ?? 0);
        const fromUserRow = parseFloat(userRow?.[fundField] ?? 0);
        const currentVal = Math.max(fromTradingAcc, fromUserRow);

        if (currentVal < amount) return false;
        const newVal = currentVal - amount;

        await Promise.all([
          account
            ? api.tradingAccounts.update(userId, { [fundField]: newVal })
            : api.tradingAccounts.insert({ user_id: userId, [fundField]: newVal }),
          api.users.update(userId, { [fundField]: newVal }),
        ]);
      } else {
        // Investment wallets: ipo / ecn / portfolio
        const userColMap: Record<string, string> = { ipo: 'ipo_balance', ecn: 'ecn_balance', portfolio: 'portfolio_balance' };
        const userCol = userColMap[accountType] || accountType;

        const [wallet, userRow] = await Promise.all([
          api.investmentWallets.getByUserId(userId),
          api.users.getById(userId),
        ]);

        const fromWallet = parseFloat(wallet?.[accountType] ?? 0);
        const fromUserRow = parseFloat(userRow?.[userCol] ?? 0);
        const currentVal = Math.max(fromWallet, fromUserRow);

        if (currentVal < amount) return false;
        const newVal = currentVal - amount;

        await Promise.all([
          wallet
            ? api.investmentWallets.update(userId, { [accountType]: newVal })
            : api.investmentWallets.insert({ user_id: userId, [accountType]: newVal }),
          api.users.update(userId, { [userCol]: newVal }),
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
        message: notification.message,
        is_visible: notification.isVisibleToUser ?? false,
        channels: notification.channels || ['in-app'],
        related_id: notification.relatedId,
        metadata: (notification as any).metadata || {}
      });

      // Refresh local notifications if needed
      window.dispatchEvent(new Event('usersUpdated'));
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