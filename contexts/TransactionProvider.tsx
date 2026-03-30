import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { projectId, publicAnonKey } from '../utils/supabase/info';

// ============================================
// API CONFIGURATION
// ============================================

const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-5d4be467`;

// ============================================
// TYPES
// ============================================

export type TransactionType = 'deposit' | 'withdrawal';
export type TransactionMethod = 'crypto' | 'bank' | 'card' | 'paypal' | 'skrill';
export type TransactionStatus = 'pending' | 'completed' | 'rejected' | 'cancelled';

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  method: TransactionMethod;
  amount: number;
  currency: string; // BTC, ETH, USD, etc.
  usdEquivalent: number;
  status: TransactionStatus;
  timestamp: number;
  completedAt?: number;
  
  // Wallet type: which balance this deposit/withdrawal targets
  walletType?: 'live' | 'portfolio';
  
  // Crypto specific
  walletAddress?: string;
  network?: string;
  txHash?: string;
  
  // Bank specific
  bankName?: string;
  accountNumber?: string;
  
  // Card specific
  cardLast4?: string;
  
  // Admin notes
  adminNotes?: string;
  processedBy?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'crypto' | 'bank' | 'card';
  name: string;
  currency: string;
  is_active: boolean;
  icon_url?: string;
  min_amount?: number;
  max_amount?: number;
  fee_percentage?: number;
  processing_time?: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  deposits: any[];
  withdrawals: any[];
  paymentMethods: PaymentMethod[];
  loading: boolean;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => string;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  getTransactionById: (id: string) => Transaction | undefined;
  getUserTransactions: (userId: string) => Transaction[];
  getPendingTransactions: () => Transaction[];
  approveTransaction: (id: string, adminId: string, notes?: string) => void;
  rejectTransaction: (id: string, adminId: string, notes?: string) => void;
  deleteTransaction: (id: string) => void;
  getRecentDeposits: (userId: string, method?: TransactionMethod) => Transaction[];
  // New database functions
  createDeposit: (data: any) => Promise<any>;
  createWithdrawal: (data: any) => Promise<any>;
  refreshTransactions: () => Promise<void>;
  refreshPaymentMethods: () => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [deposits, setDeposits] = useState<any[]>([]);
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  // ============================================
  // API FUNCTIONS - Database Integration
  // ============================================

  /**
   * Fetch payment methods from database
   */
  const fetchPaymentMethods = async () => {
    try {
      const response = await fetch(`${serverUrl}/payment-methods`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (!response.ok) {
        console.error('Failed to fetch payment methods:', response.statusText);
        return [];
      }

      const data = await response.json();
      console.log('✅ Payment methods loaded from database:', data.length);
      return data;
    } catch (error) {
      // Silently fail - server might not be deployed yet
      return [];
    }
  };

  /**
   * Fetch deposits from database for current user
   */
  const fetchDeposits = async (userId: string) => {
    try {
      const response = await fetch(`${serverUrl}/deposits/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (!response.ok) return [];

      const data = await response.json();
      return data;
    } catch {
      // Silently fail - server might not be deployed yet; localStorage fallback handles data
      return [];
    }
  };

  /**
   * Fetch withdrawals from database for current user
   */
  const fetchWithdrawals = async (userId: string) => {
    try {
      const response = await fetch(`${serverUrl}/withdrawals/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (!response.ok) return [];

      const data = await response.json();
      return data;
    } catch {
      // Silently fail - server might not be deployed yet; localStorage fallback handles data
      return [];
    }
  };

  /**
   * Fetch transaction history from database
   */
  const fetchTransactions = async (userId: string) => {
    try {
      const response = await fetch(`${serverUrl}/transactions/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (!response.ok) return [];

      const dbTransactions = await response.json();

      // Transform database transactions to match our Transaction interface
      return dbTransactions.map((dbTxn: any) => ({
        id: dbTxn.id,
        userId: dbTxn.user_id,
        type: dbTxn.type as TransactionType,
        method: 'crypto' as TransactionMethod,
        amount: parseFloat(dbTxn.amount),
        currency: dbTxn.currency,
        usdEquivalent: parseFloat(dbTxn.amount),
        status: dbTxn.status || 'completed',
        timestamp: new Date(dbTxn.created_at).getTime(),
        completedAt: dbTxn.created_at ? new Date(dbTxn.created_at).getTime() : undefined,
      }));
    } catch {
      // Silently fail - server might not be deployed yet; localStorage fallback handles data
      return [];
    }
  };

  /**
   * Create deposit in database
   */
  const createDeposit = async (data: {
    amount: number;
    payment_method: string;
    currency: string;
  }) => {
    try {
      if (!currentUser?.id) throw new Error('User not authenticated');

      const response = await fetch(`${serverUrl}/deposits`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: currentUser.id,
          amount: data.amount,
          payment_method: data.payment_method,
          currency: data.currency,
          status: 'pending'
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create deposit');
      }

      const deposit = await response.json();
      console.log('✅ Deposit created in database:', deposit.id);

      // Create transaction record
      await fetch(`${serverUrl}/transactions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: currentUser.id,
          type: 'deposit',
          amount: data.amount,
          currency: data.currency,
          description: `Deposit via ${data.payment_method}`,
          reference_id: deposit.id
        })
      });

      // Refresh data
      await refreshTransactions();

      return { success: true, deposit };
    } catch (error) {
      console.error('Error creating deposit:', error);
      return { success: false, error: (error as Error).message };
    }
  };

  /**
   * Create withdrawal in database
   */
  const createWithdrawal = async (data: {
    amount: number;
    payment_method: string;
    currency: string;
    wallet_address?: string;
  }) => {
    try {
      if (!currentUser?.id) throw new Error('User not authenticated');

      const response = await fetch(`${serverUrl}/withdrawals`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: currentUser.id,
          amount: data.amount,
          payment_method: data.payment_method,
          currency: data.currency,
          wallet_address: data.wallet_address,
          status: 'pending'
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create withdrawal');
      }

      const withdrawal = await response.json();
      console.log('✅ Withdrawal created in database:', withdrawal.id);

      // Create transaction record
      await fetch(`${serverUrl}/transactions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: currentUser.id,
          type: 'withdrawal',
          amount: data.amount,
          currency: data.currency,
          description: `Withdrawal via ${data.payment_method}`,
          reference_id: withdrawal.id
        })
      });

      // Refresh data
      await refreshTransactions();

      return { success: true, withdrawal };
    } catch (error) {
      console.error('Error creating withdrawal:', error);
      return { success: false, error: (error as Error).message };
    }
  };

  /**
   * Refresh all transaction data
   * Merges database results with localStorage data instead of replacing
   */
  const refreshTransactions = async () => {
    if (!currentUser?.id) return;
    
    setLoading(true);
    try {
      const [dbDeposits, dbWithdrawals, dbTransactions] = await Promise.all([
        fetchDeposits(currentUser.id),
        fetchWithdrawals(currentUser.id),
        fetchTransactions(currentUser.id)
      ]);

      // Only update DB-sourced deposits/withdrawals if we got data
      if (dbDeposits.length > 0) {
        setDeposits(dbDeposits);
      }
      if (dbWithdrawals.length > 0) {
        setWithdrawals(dbWithdrawals);
      }

      // Merge DB transactions with existing localStorage transactions
      // instead of replacing them (DB may not be deployed)
      if (dbTransactions.length > 0) {
        setTransactions(prev => {
          const existingIds = new Set(prev.map(t => t.id));
          const newFromDb = dbTransactions.filter((t: Transaction) => !existingIds.has(t.id));
          if (newFromDb.length > 0) {
            return [...prev, ...newFromDb];
          }
          return prev;
        });
      }
      // If DB returns empty, keep existing localStorage-based transactions
    } catch (error) {
      console.error('Error refreshing transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Refresh payment methods
   */
  const refreshPaymentMethods = async () => {
    setLoading(true);
    try {
      const methods = await fetchPaymentMethods();
      setPaymentMethods(methods);
    } catch (error) {
      console.error('Error refreshing payment methods:', error);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // LOAD DATA FROM DATABASE ON MOUNT
  // ============================================

  /**
   * Load transaction data when user is authenticated
   */
  useEffect(() => {
    const loadUserData = async () => {
      if (currentUser && currentUser.id) {
        console.log('🔄 Loading transaction data for user:', currentUser.id);
        await refreshTransactions();
      }
    };

    loadUserData();
  }, [currentUser?.id]);

  /**
   * Load payment methods on mount
   */
  useEffect(() => {
    refreshPaymentMethods();
  }, []);

  // Load transactions from localStorage on mount (fallback)
  useEffect(() => {
    const stored = localStorage.getItem('transactions');
    if (stored) {
      try {
        setTransactions(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load transactions:', error);
      }
    }

    // Listen for cross-tab/cross-session localStorage changes
    // so admin panel picks up user transactions in real-time
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'transactions' && e.newValue) {
        try {
          const updatedTransactions = JSON.parse(e.newValue);
          setTransactions(updatedTransactions);
        } catch (error) {
          console.error('Failed to parse updated transactions:', error);
        }
      }
    };

    // Also listen for same-tab storage events (dispatched manually)
    const handleLocalStorageSync = () => {
      const stored = localStorage.getItem('transactions');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setTransactions(prev => {
            // Only update if there are new transactions, status updates, or deletions
            const currentIds = new Set(prev.map(t => t.id));
            const parsedIds = new Set(parsed.map((t: Transaction) => t.id));
            const hasNew = parsed.some((t: Transaction) => !currentIds.has(t.id));
            const hasDeleted = prev.some(t => !parsedIds.has(t.id));
            const hasUpdates = parsed.some((t: Transaction) => {
              const existing = prev.find(p => p.id === t.id);
              return existing && existing.status !== t.status;
            });
            if (hasNew || hasUpdates || hasDeleted) {
              return parsed;
            }
            return prev;
          });
        } catch (error) {
          console.error('Failed to sync transactions:', error);
        }
      } else {
        // If localStorage is empty (all deleted), clear state too
        setTransactions([]);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('transactionsUpdated', handleLocalStorageSync);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('transactionsUpdated', handleLocalStorageSync);
    };
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'timestamp'>) => {
    const id = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newTransaction: Transaction = {
      ...transaction,
      id,
      timestamp: Date.now(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
    return id;
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions(prev =>
      prev.map(txn =>
        txn.id === id ? { ...txn, ...updates } : txn
      )
    );
  };

  const getTransactionById = (id: string) => {
    return transactions.find(txn => txn.id === id);
  };

  const getUserTransactions = (userId: string) => {
    return transactions.filter(txn => txn.userId === userId);
  };

  const getPendingTransactions = () => {
    return transactions.filter(txn => txn.status === 'pending');
  };

  const syncWithTradingAccount = (userId: string, amount: number, type: 'deposit' | 'withdrawal') => {
    // Get the trading mode from localStorage for this user
    const tradingMode = localStorage.getItem(`gross_trading_mode_${userId}`) || 'live';
    
    // Update the appropriate account
    if (type === 'deposit') {
      // Add funds to trading account
      if (tradingMode === 'paper') {
        const paperKey = `gross_paper_account_${userId}`;
        const paperAccount = JSON.parse(
          localStorage.getItem(paperKey) ||
          localStorage.getItem('gross_paper_account') ||
          '{"balance":0,"equity":0,"realizedPnL":0,"unrealizedPnL":0,"margin":0,"availableFunds":0,"bonus":0}'
        );
        paperAccount.balance += amount;
        paperAccount.equity += amount;
        paperAccount.availableFunds += amount;
        localStorage.setItem(paperKey, JSON.stringify(paperAccount));
        localStorage.setItem('gross_paper_account', JSON.stringify(paperAccount));
      } else {
        const liveKey = `gross_live_account_${userId}`;
        const liveAccount = JSON.parse(
          localStorage.getItem(liveKey) ||
          localStorage.getItem('gross_live_account') ||
          '{"balance":0,"equity":0,"realizedPnL":0,"unrealizedPnL":0,"margin":0,"availableFunds":0,"bonus":0}'
        );
        liveAccount.balance += amount;
        liveAccount.equity += amount;
        liveAccount.availableFunds += amount;
        localStorage.setItem(liveKey, JSON.stringify(liveAccount));
        localStorage.setItem('gross_live_account', JSON.stringify(liveAccount));
      }
    } else {
      // Withdraw funds from trading account
      if (tradingMode === 'paper') {
        const paperKey = `gross_paper_account_${userId}`;
        const paperAccount = JSON.parse(
          localStorage.getItem(paperKey) ||
          localStorage.getItem('gross_paper_account') ||
          '{"balance":0,"equity":0,"realizedPnL":0,"unrealizedPnL":0,"margin":0,"availableFunds":0,"bonus":0}'
        );
        paperAccount.balance = Math.max(0, paperAccount.balance - amount);
        paperAccount.equity = Math.max(0, paperAccount.equity - amount);
        paperAccount.availableFunds = Math.max(0, paperAccount.availableFunds - amount);
        localStorage.setItem(paperKey, JSON.stringify(paperAccount));
        localStorage.setItem('gross_paper_account', JSON.stringify(paperAccount));
      } else {
        const liveKey = `gross_live_account_${userId}`;
        const liveAccount = JSON.parse(
          localStorage.getItem(liveKey) ||
          localStorage.getItem('gross_live_account') ||
          '{"balance":0,"equity":0,"realizedPnL":0,"unrealizedPnL":0,"margin":0,"availableFunds":0,"bonus":0}'
        );
        liveAccount.balance = Math.max(0, liveAccount.balance - amount);
        liveAccount.equity = Math.max(0, liveAccount.equity - amount);
        liveAccount.availableFunds = Math.max(0, liveAccount.availableFunds - amount);
        localStorage.setItem(liveKey, JSON.stringify(liveAccount));
        localStorage.setItem('gross_live_account', JSON.stringify(liveAccount));
      }
    }
    
    // Trigger storage event for real-time updates
    window.dispatchEvent(new Event('storage'));
  };

  const approveTransaction = (id: string, adminId: string, notes?: string) => {
    const transaction = getTransactionById(id);
    if (!transaction) return;

    // Update transaction status
    updateTransaction(id, {
      status: 'completed',
      completedAt: Date.now(),
      processedBy: adminId,
      adminNotes: notes,
    });

    // Determine if this targets portfolio balance or live balance
    const isPortfolio = transaction.walletType === 'portfolio';

    // Get users from localStorage (AuthContext uses 'gross_users' key)
    const users = JSON.parse(localStorage.getItem('gross_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === transaction.userId);
    
    if (userIndex !== -1) {
      if (transaction.type === 'deposit') {
        if (isPortfolio) {
          // Credit portfolio balance
          const balances = localStorage.getItem(`investment_balances_${transaction.userId}`);
          const currentBalances = balances ? JSON.parse(balances) : { ecn: 0, ipo: 0, portfolio: 0 };
          currentBalances.portfolio = (currentBalances.portfolio || 0) + transaction.usdEquivalent;
          localStorage.setItem(`investment_balances_${transaction.userId}`, JSON.stringify(currentBalances));
        } else {
          // Credit user live wallet for deposits — add USD equivalent
          users[userIndex].balance = (users[userIndex].balance || 0) + transaction.usdEquivalent;
          users[userIndex].liveBalance = (users[userIndex].liveBalance || 0) + transaction.usdEquivalent;
          
          // Sync with trading account
          syncWithTradingAccount(transaction.userId, transaction.usdEquivalent, 'deposit');
        }
      }
      // For withdrawals: balance was already deducted when user submitted the request
      // Approval just finalizes the withdrawal — no further deduction needed
      
      localStorage.setItem('gross_users', JSON.stringify(users));
      
      // Trigger storage event for real-time updates across contexts
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('usersUpdated'));
      
      // Create notification for user (AuthContext uses 'gross_notifications' key)
      const walletLabel = isPortfolio ? 'portfolio balance' : 'account';
      const notifications = JSON.parse(localStorage.getItem('gross_notifications') || '[]');
      notifications.unshift({
        id: `notif_${Date.now()}`,
        userId: transaction.userId,
        type: 'success',
        title: transaction.type === 'deposit' ? 'Deposit Approved' : 'Withdrawal Approved',
        message: transaction.type === 'deposit' 
          ? `Your deposit of $${transaction.usdEquivalent.toFixed(2)} has been credited to your ${walletLabel}.`
          : `Your withdrawal of $${transaction.usdEquivalent.toFixed(2)} from your ${walletLabel} has been processed successfully.`,
        read: false,
        timestamp: new Date(),
      });
      localStorage.setItem('gross_notifications', JSON.stringify(notifications));
    }
  };

  const rejectTransaction = (id: string, adminId: string, notes?: string) => {
    const transaction = getTransactionById(id);
    if (!transaction) return;

    updateTransaction(id, {
      status: 'rejected',
      completedAt: Date.now(),
      processedBy: adminId,
      adminNotes: notes,
    });

    // Determine if this targets portfolio balance or live balance
    const isPortfolio = transaction.walletType === 'portfolio';

    // For rejected withdrawals: refund the amount back to user's balance
    // (balance was deducted when the withdrawal request was submitted)
    if (transaction.type === 'withdrawal') {
      if (isPortfolio) {
        // Refund to portfolio balance
        const balances = localStorage.getItem(`investment_balances_${transaction.userId}`);
        const currentBalances = balances ? JSON.parse(balances) : { ecn: 0, ipo: 0, portfolio: 0 };
        currentBalances.portfolio = (currentBalances.portfolio || 0) + transaction.usdEquivalent;
        localStorage.setItem(`investment_balances_${transaction.userId}`, JSON.stringify(currentBalances));
        window.dispatchEvent(new Event('storage'));
      } else {
        const users = JSON.parse(localStorage.getItem('gross_users') || '[]');
        const userIndex = users.findIndex((u: any) => u.id === transaction.userId);
        
        if (userIndex !== -1) {
          // Refund the withdrawal amount back to user balance
          users[userIndex].balance = (users[userIndex].balance || 0) + transaction.usdEquivalent;
          users[userIndex].liveBalance = (users[userIndex].liveBalance || 0) + transaction.usdEquivalent;
          localStorage.setItem('gross_users', JSON.stringify(users));

          // Sync with trading account — re-add funds
          syncWithTradingAccount(transaction.userId, transaction.usdEquivalent, 'deposit');

          // Trigger storage event for real-time updates across contexts
          window.dispatchEvent(new Event('storage'));
          window.dispatchEvent(new CustomEvent('usersUpdated'));
        }
      }
    }

    // Create notification for user (AuthContext uses 'gross_notifications' key)
    const walletLabel = isPortfolio ? 'portfolio balance' : 'account';
    const notifications = JSON.parse(localStorage.getItem('gross_notifications') || '[]');
    notifications.unshift({
      id: `notif_${Date.now()}`,
      userId: transaction.userId,
      type: 'error',
      title: transaction.type === 'deposit' ? 'Deposit Rejected' : 'Withdrawal Rejected',
      message: transaction.type === 'withdrawal'
        ? `Your withdrawal of $${transaction.usdEquivalent.toFixed(2)} from your ${walletLabel} has been rejected. The funds have been returned.${notes ? ' Reason: ' + notes : ''}`
        : (notes || `Your ${transaction.type} request has been rejected.`),
      read: false,
      timestamp: new Date(),
    });
    localStorage.setItem('gross_notifications', JSON.stringify(notifications));
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(txn => txn.id !== id));
  };

  const getRecentDeposits = (userId: string, method?: TransactionMethod) => {
    return transactions
      .filter(txn => 
        txn.userId === userId && 
        txn.type === 'deposit' && 
        (!method || txn.method === method)
      )
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 5);
  };

  const value: TransactionContextType = {
    transactions,
    deposits,
    withdrawals,
    paymentMethods,
    loading,
    addTransaction,
    updateTransaction,
    getTransactionById,
    getUserTransactions,
    getPendingTransactions,
    approveTransaction,
    rejectTransaction,
    deleteTransaction,
    getRecentDeposits,
    // New database functions
    createDeposit,
    createWithdrawal,
    refreshTransactions,
    refreshPaymentMethods,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within TransactionProvider');
  }
  return context;
}