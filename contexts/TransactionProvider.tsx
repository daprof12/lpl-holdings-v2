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
  approveTransaction: (id: string, adminId: string, notes?: string) => Promise<void>;
  rejectTransaction: (id: string, adminId: string, notes?: string) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  getRecentDeposits: (userId: string, method?: TransactionMethod) => Transaction[];
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

  const fetchPaymentMethods = async () => {
    try {
      const response = await fetch(`${serverUrl}/payment-methods`, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
      return response.ok ? await response.json() : [];
    } catch { return []; }
  };

  const fetchDeposits = async (userId: string) => {
    try {
      const endpoint = userId === 'all' || userId === 'admin' ? `${serverUrl}/deposits` : `${serverUrl}/deposits/user/${userId}`;
      const response = await fetch(endpoint, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
      return response.ok ? await response.json() : [];
    } catch { return []; }
  };

  const fetchWithdrawals = async (userId: string) => {
    try {
      const endpoint = userId === 'all' || userId === 'admin' ? `${serverUrl}/withdrawals` : `${serverUrl}/withdrawals/user/${userId}`;
      const response = await fetch(endpoint, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
      return response.ok ? await response.json() : [];
    } catch { return []; }
  };

  const fetchTransactions = async (userId: string) => {
    try {
      const endpoint = userId === 'all' || userId === 'admin' 
        ? `${serverUrl}/transactions` 
        : `${serverUrl}/transactions/user/${userId}`;
        
      const response = await fetch(endpoint, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });

      if (!response.ok) return [];

      const dbTransactions = await response.json();

      return dbTransactions.map((dbTxn: any) => ({
        id: dbTxn.id,
        userId: dbTxn.user_id,
        type: dbTxn.type as TransactionType,
        method: dbTxn.payment_method || 'crypto',
        amount: parseFloat(dbTxn.amount),
        currency: dbTxn.currency || 'USD',
        usdEquivalent: parseFloat(dbTxn.amount),
        status: dbTxn.status || 'completed',
        timestamp: new Date(dbTxn.created_at || Date.now()).getTime(),
        completedAt: dbTxn.updated_at ? new Date(dbTxn.updated_at).getTime() : undefined,
        walletType: dbTxn.wallet_type || 'live',
        txHash: dbTxn.transaction_hash,
      }));
    } catch { return []; }
  };

  const createDeposit = async (data: any) => {
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
          wallet_type: data.wallet_type || 'live',
          status: 'pending'
        })
      });
      if (!response.ok) throw new Error('Failed to create deposit');
      const deposit = await response.json();
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
          reference_id: deposit.id,
          status: 'pending'
        })
      });
      await refreshTransactions();
      return { success: true, deposit };
    } catch (error) {
      console.error('Error creating deposit:', error);
      return { success: false, error: (error as Error).message };
    }
  };

  const createWithdrawal = async (data: any) => {
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
          wallet_type: data.wallet_type || 'live',
          status: 'pending'
        })
      });
      if (!response.ok) throw new Error('Failed to create withdrawal');
      const withdrawal = await response.json();
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
          reference_id: withdrawal.id,
          status: 'pending'
        })
      });
      await refreshTransactions();
      return { success: true, withdrawal };
    } catch (error) {
      console.error('Error creating withdrawal:', error);
      return { success: false, error: (error as Error).message };
    }
  };

  const refreshTransactions = async () => {
    if (!currentUser?.id) return;
    setLoading(true);
    try {
      const fetchId = currentUser.role === 'admin' ? 'all' : currentUser.id;
      const [dbDeposits, dbWithdrawals, dbTransactions] = await Promise.all([
        fetchDeposits(fetchId),
        fetchWithdrawals(fetchId),
        fetchTransactions(fetchId)
      ]);
      if (dbDeposits.length > 0) setDeposits(dbDeposits);
      if (dbWithdrawals.length > 0) setWithdrawals(dbWithdrawals);
      if (dbTransactions.length > 0) {
        setTransactions(prev => {
          const existingIds = new Set(prev.map(t => t.id));
          const newFromDb = dbTransactions.filter((t: Transaction) => !existingIds.has(t.id));
          const updated = prev.map(p => {
            const fromDb = dbTransactions.find((t: any) => t.id === p.id);
            return fromDb ? { ...p, status: fromDb.status, completedAt: fromDb.completedAt } : p;
          });
          return [...updated, ...newFromDb];
        });
      }
    } catch (error) {
      console.error('Error refreshing transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshPaymentMethods = async () => {
    setLoading(true);
    try {
      const methods = await fetchPaymentMethods();
      if (methods && methods.length > 0) setPaymentMethods(methods);
    } finally { setLoading(false); }
  };

  useEffect(() => {
    if (currentUser?.id) refreshTransactions();
  }, [currentUser?.id, currentUser?.role]);

  useEffect(() => {
    refreshPaymentMethods();
    const stored = localStorage.getItem('transactions');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setTransactions(parsed);
      } catch {}
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'transactions' && e.newValue) {
        try { setTransactions(JSON.parse(e.newValue)); } catch {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
      localStorage.setItem('gross_transactions', JSON.stringify(transactions));
    }
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'timestamp'>) => {
    const id = transaction.type === 'deposit' ? `dep_${Date.now()}` : `wd_${Date.now()}`;
    const newTransaction: Transaction = { ...transaction, id, timestamp: Date.now() };
    setTransactions(prev => [newTransaction, ...prev]);
    window.dispatchEvent(new CustomEvent('transactionsUpdated'));
    return id;
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions(prev => prev.map(txn => txn.id === id ? { ...txn, ...updates } : txn));
  };

  const getTransactionById = (id: string) => transactions.find(txn => txn.id === id);
  const getUserTransactions = (userId: string) => transactions.filter(txn => txn.userId === userId);
  const getPendingTransactions = () => transactions.filter(txn => txn.status === 'pending');

  const syncWithTradingAccount = (userId: string, amount: number, type: 'deposit' | 'withdrawal') => {
    const tradingMode = localStorage.getItem(`gross_trading_mode_${userId}`) || 'live';
    const key = tradingMode === 'paper' ? `gross_paper_account_${userId}` : `gross_live_account_${userId}`;
    const account = JSON.parse(localStorage.getItem(key) || '{"balance":0,"equity":0,"realizedPnL":0,"unrealizedPnL":0,"margin":0,"availableFunds":0,"bonus":0}');
    
    if (type === 'deposit') {
      account.balance += amount;
      account.equity += amount;
      account.availableFunds += amount;
    } else {
      account.balance = Math.max(0, account.balance - amount);
      account.equity = Math.max(0, account.equity - amount);
      account.availableFunds = Math.max(0, account.availableFunds - amount);
    }
    localStorage.setItem(key, JSON.stringify(account));
    window.dispatchEvent(new Event('storage'));
  };

  const approveTransaction = async (id: string, adminId: string, notes?: string) => {
    const transaction = getTransactionById(id);
    if (!transaction) return;

    updateTransaction(id, { status: 'completed', completedAt: Date.now(), processedBy: adminId, adminNotes: notes });

    try {
      const typePath = transaction.type === 'deposit' ? 'deposits' : 'withdrawals';
      await fetch(`${serverUrl}/${typePath}/${id}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${publicAnonKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'completed', processed_by: adminId, admin_notes: notes })
      });
      await fetch(`${serverUrl}/transactions/ref/${id}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${publicAnonKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'completed' })
      });
    } catch (e) { console.warn('DB update failed'); }

    const isPortfolio = transaction.walletType === 'portfolio';
    const users = JSON.parse(localStorage.getItem('gross_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === transaction.userId);
    
    if (userIndex !== -1) {
      if (transaction.type === 'deposit') {
        if (isPortfolio) {
          const b = JSON.parse(localStorage.getItem(`investment_balances_${transaction.userId}`) || '{"portfolio":0}');
          b.portfolio += transaction.usdEquivalent;
          localStorage.setItem(`investment_balances_${transaction.userId}`, JSON.stringify(b));
        } else {
          users[userIndex].balance = (users[userIndex].balance || 0) + transaction.usdEquivalent;
          users[userIndex].liveBalance = (users[userIndex].liveBalance || 0) + transaction.usdEquivalent;
          syncWithTradingAccount(transaction.userId, transaction.usdEquivalent, 'deposit');
        }
      }
      localStorage.setItem('gross_users', JSON.stringify(users));
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('usersUpdated'));
      
      const notifications = JSON.parse(localStorage.getItem('gross_notifications') || '[]');
      notifications.unshift({
        id: `notif_${Date.now()}`,
        userId: transaction.userId,
        type: 'success',
        title: `${transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'} Approved`,
        message: `Your ${transaction.type} of $${transaction.usdEquivalent.toFixed(2)} has been processed.`,
        read: false,
        timestamp: new Date(),
      });
      localStorage.setItem('gross_notifications', JSON.stringify(notifications));
    }
  };

  const rejectTransaction = async (id: string, adminId: string, notes?: string) => {
    const transaction = getTransactionById(id);
    if (!transaction) return;

    updateTransaction(id, { status: 'rejected', completedAt: Date.now(), processedBy: adminId, adminNotes: notes });

    try {
      const typePath = transaction.type === 'deposit' ? 'deposits' : 'withdrawals';
      await fetch(`${serverUrl}/${typePath}/${id}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${publicAnonKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected', processed_by: adminId, admin_notes: notes })
      });
    } catch {}

    if (transaction.type === 'withdrawal') {
      const isPortfolio = transaction.walletType === 'portfolio';
      if (isPortfolio) {
        const b = JSON.parse(localStorage.getItem(`investment_balances_${transaction.userId}`) || '{"portfolio":0}');
        b.portfolio += transaction.usdEquivalent;
        localStorage.setItem(`investment_balances_${transaction.userId}`, JSON.stringify(b));
      } else {
        const users = JSON.parse(localStorage.getItem('gross_users') || '[]');
        const userIndex = users.findIndex((u: any) => u.id === transaction.userId);
        if (userIndex !== -1) {
          users[userIndex].balance = (users[userIndex].balance || 0) + transaction.usdEquivalent;
          users[userIndex].liveBalance = (users[userIndex].liveBalance || 0) + transaction.usdEquivalent;
          localStorage.setItem('gross_users', JSON.stringify(users));
          syncWithTradingAccount(transaction.userId, transaction.usdEquivalent, 'deposit');
        }
      }
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('usersUpdated'));
    }

    const notifications = JSON.parse(localStorage.getItem('gross_notifications') || '[]');
    notifications.unshift({
      id: `notif_${Date.now()}`,
      userId: transaction.userId,
      type: 'error',
      title: `${transaction.type.toUpperCase()} Rejected`,
      message: `Your ${transaction.type} of $${transaction.usdEquivalent.toFixed(2)} was rejected. ${notes || ''}`,
      read: false,
      timestamp: new Date(),
    });
    localStorage.setItem('gross_notifications', JSON.stringify(notifications));
  };

  const deleteTransaction = async (id: string) => {
    setTransactions(prev => prev.filter(txn => txn.id !== id));
    try {
      await fetch(`${serverUrl}/transactions/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
    } catch {}
  };

  const getRecentDeposits = (userId: string, method?: TransactionMethod) => {
    return transactions
      .filter(txn => txn.userId === userId && txn.type === 'deposit' && (!method || txn.method === method))
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 5);
  };

  const value: TransactionContextType = {
    transactions, deposits, withdrawals, paymentMethods, loading,
    addTransaction, updateTransaction, getTransactionById, getUserTransactions,
    getPendingTransactions, approveTransaction, rejectTransaction, deleteTransaction,
    getRecentDeposits, createDeposit, createWithdrawal, refreshTransactions, refreshPaymentMethods,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (!context) throw new Error('useTransactions must be used within TransactionProvider');
  return context;
}