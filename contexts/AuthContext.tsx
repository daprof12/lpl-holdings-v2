import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
      // Migrate existing users to have liveBalance and paperBalance
      const migratedUsers = parsedUsers.map((user: UserProfile) => ({
        ...user,
        liveBalance: user.liveBalance ?? 0,
        paperBalance: user.paperBalance ?? (user.balance || 0), // Migrate old balance to paperBalance
      }));
      setUsers(migratedUsers);
      // Save migrated data
      localStorage.setItem('gross_users', JSON.stringify(migratedUsers));
    } else {
      // Create default admin account
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
        // Empty array = user can see all admin-enabled deposit methods
        enabledDepositMethods: [],
        enabledWithdrawalMethods: [],
        cryptoWallets: {},
      };
      setUsers([defaultAdmin]);
      localStorage.setItem('gross_users', JSON.stringify([defaultAdmin]));
      
      // Store default admin password
      const passwords = { 'admin@gross.com': 'admin123' };
      localStorage.setItem('gross_passwords', JSON.stringify(passwords));
    }

    if (storedCurrentUser) {
      const parsedCurrentUser = JSON.parse(storedCurrentUser);
      // Migrate current user if needed
      const migratedCurrentUser = {
        ...parsedCurrentUser,
        liveBalance: parsedCurrentUser.liveBalance ?? 0,
        paperBalance: parsedCurrentUser.paperBalance ?? (parsedCurrentUser.balance || 0),
      };
      setCurrentUser(migratedCurrentUser);
      localStorage.setItem('gross_current_user', JSON.stringify(migratedCurrentUser));
    }

    if (storedActivities) {
      setUserActivities(JSON.parse(storedActivities));
    }

    const storedTransactions = localStorage.getItem('gross_wallet_transactions');
    if (storedTransactions) {
      setWalletTransactions(JSON.parse(storedTransactions));
    }

    const storedNotifications = localStorage.getItem('gross_notifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }

    setIsHydrated(true);
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
      if (e.key === 'gross_users' && e.newValue) {
        try {
          const parsedUsers = JSON.parse(e.newValue);
          setUsers(parsedUsers);
          // Update currentUser if logged in
          const storedCurrentUser = localStorage.getItem('gross_current_user');
          if (storedCurrentUser) {
            const currentId = JSON.parse(storedCurrentUser).id;
            const updatedUser = parsedUsers.find((u: UserProfile) => u.id === currentId);
            if (updatedUser) {
              setCurrentUser(updatedUser);
            }
          }
        } catch (error) {
          console.error('Cross-tab users sync failed:', error);
        }
      }
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
    return () => {
      window.removeEventListener('storage', handleStorageChange);
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
      localStorage.setItem('gross_current_user', JSON.stringify(currentUser));
    } else {
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

    // Update activity on user interactions
    const handleActivity = () => updateUserActivity();
    
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    events.forEach(event => window.addEventListener(event, handleActivity));

    // Heartbeat to keep updating while user is active
    const heartbeat = setInterval(() => {
      updateUserActivity();
    }, 30000); // Update every 30 seconds

    return () => {
      events.forEach(event => window.removeEventListener(event, handleActivity));
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
    if (currentUser) {
      // Mark user as offline before logging out
      setUsers(prev =>
        prev.map(user =>
          user.id === currentUser.id
            ? { ...user, isOnline: false, lastActive: new Date() }
            : user
        )
      );

      // Log activity
      const activity: UserActivity = {
        id: `activity-${Date.now()}`,
        userId: currentUser.id,
        type: 'logout',
        action: 'User logged out',
        timestamp: new Date(),
      };
      setUserActivities(prev => [...prev, activity]);
      
      // Save the updated activities immediately
      localStorage.setItem('gross_user_activities', JSON.stringify([...userActivities, activity]));
    }
    
    // Clear current user from both state and localStorage
    setCurrentUser(null);
    localStorage.removeItem('gross_current_user');
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
    setUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, ...updates } : user
      )
    );

    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, ...updates } : null);
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

  const addFundsToUser = (userId: string, amount: number, type: 'credit' | 'bonus') => {
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
      action: type === 'credit' ? 'Credit added' : 'Bonus added',
      details: { amount, type },
      timestamp: new Date(),
    };
    setUserActivities(prev => [...prev, activity]);
  };

  const addFundsToAccount = (userId: string, amount: number, accountType: 'live' | 'paper', type: 'credit' | 'bonus') => {
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