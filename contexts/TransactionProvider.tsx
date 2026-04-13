import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../utils/supabase/api';
import { useAuth } from './AuthContext';
import { serverUrl, publicAnonKey } from '../utils/supabase/client';
import { toast } from 'sonner';

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

  // Refresh transactions
  const refreshTransactions = async () => {
    if (!currentUser?.id) return;
    setLoading(true);
    try {
      const [dbTxns, dbDeps, dbWds] = await Promise.all([
        currentUser.role === 'admin' ? api.transactions.getAll() : api.transactions.getByUserId(currentUser.id),
        currentUser.role === 'admin' ? api.deposits.getAll() : api.deposits.getByUserId(currentUser.id),
        currentUser.role === 'admin' ? api.withdrawals.getAll() : api.withdrawals.getByUserId(currentUser.id),
      ]);

      if (Array.isArray(dbTxns)) {
        setTransactions(dbTxns.map((t: any) => ({
          id: t.id,
          userId: t.user_id,
          type: t.type,
          method: t.payment_method || 'crypto',
          amount: parseFloat(t.amount),
          currency: t.currency || 'USD',
          usdEquivalent: parseFloat(t.amount),
          status: t.status,
          timestamp: new Date(t.created_at).getTime(),
          completedAt: t.updated_at ? new Date(t.updated_at).getTime() : undefined,
          walletType: t.wallet_type || 'live',
          txHash: t.transaction_hash
        })));
      }
      if (Array.isArray(dbDeps)) setDeposits(dbDeps);
      if (Array.isArray(dbWds)) setWithdrawals(dbWds);
    } catch (err) {
      console.error('Failed to refresh transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshPaymentMethods = async () => {
    setLoading(true);
    try {
      const methods = await api.paymentMethods.getAll();
      if (Array.isArray(methods)) setPaymentMethods(methods);
    } catch (err) {
      console.error('Failed to refresh payment methods:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = (txnData: Omit<Transaction, 'id' | 'timestamp'>) => {
    const id = Math.random().toString(36).substring(2, 11);
    const newTxn = { ...txnData, id, timestamp: Date.now() } as Transaction;
    setTransactions(prev => [newTxn, ...prev]);
    return id;
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const getTransactionById = (id: string) => transactions.find(t => t.id === id);
  const getUserTransactions = (userId: string) => transactions.filter(t => t.userId === userId);
  const getPendingTransactions = () => transactions.filter(t => t.status === 'pending');

  const createDeposit = async (data: any) => {
    try {
      if (!currentUser?.id) throw new Error('User not authenticated');
      const deposit = await api.deposits.create({
        user_id: currentUser.id,
        amount: data.amount,
        method: data.method || data.payment_method,
        currency: data.currency || 'USD',
        status: 'pending'
      });
      
      await api.transactions.create({
        user_id: currentUser.id,
        type: 'deposit',
        amount: data.amount,
        currency: data.currency || 'USD',
        description: `Deposit via ${data.method || data.payment_method}`,
        reference_id: deposit.id,
        status: 'pending'
      });
      
      refreshTransactions();
      return { success: true, deposit };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  };

  const createWithdrawal = async (data: any) => {
    try {
      if (!currentUser?.id) throw new Error('User not authenticated');
      const withdrawal = await api.withdrawals.create({
        user_id: currentUser.id,
        amount: data.amount,
        method: data.method || data.payment_method,
        currency: data.currency || 'USD',
        destination_address: data.destination_address || data.walletAddress || data.bankAccountNumber || data.paypalEmail,
        status: 'pending'
      });
      
      await api.transactions.create({
        user_id: currentUser.id,
        type: 'withdrawal',
        amount: data.amount,
        currency: data.currency || 'USD',
        description: `Withdrawal via ${data.method || data.payment_method}`,
        reference_id: withdrawal.id,
        status: 'pending'
      });
      
      refreshTransactions();
      return { success: true, withdrawal };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  };

  useEffect(() => {
    refreshPaymentMethods();
    if (currentUser?.id) refreshTransactions();
  }, [currentUser?.id]);

  const approveTransaction = async (id: string, adminId: string, notes?: string) => {
    try {
      const transaction = transactions.find(t => t.id === id);
      if (!transaction) return;

      if (transaction.type === 'deposit') {
        await api.deposits.update(id, { status: 'completed', processed_by: adminId, admin_notes: notes });
        
        if (transaction.walletType === 'portfolio') {
          await api.investmentWallets.update(transaction.userId, { portfolio: transaction.amount });
        } else {
          const account = await api.tradingAccounts.getByUserId(transaction.userId);
          if (account) {
            await api.tradingAccounts.update(transaction.userId, { balance: (account.balance || 0) + transaction.amount });
          }
          await api.users.updateBalance(transaction.userId, transaction.amount);
        }
      } else {
        await api.withdrawals.update(id, { status: 'completed', processed_by: adminId, admin_notes: notes });
      }

      refreshTransactions();
      toast.success('Transaction approved');
    } catch (err) {
      console.error('Failed to approve transaction:', err);
      toast.error('Failed to approve transaction');
    }
  };

  const rejectTransaction = async (id: string, adminId: string, notes?: string) => {
    try {
      const transaction = transactions.find(t => t.id === id);
      if (!transaction) return;

      if (transaction.type === 'deposit') {
        await api.deposits.update(id, { status: 'rejected', processed_by: adminId, admin_notes: notes });
      } else {
        await api.withdrawals.update(id, { status: 'rejected', processed_by: adminId, admin_notes: notes });
        
        if (transaction.walletType === 'portfolio') {
           await api.investmentWallets.update(transaction.userId, { portfolio: transaction.amount });
        } else {
           await api.users.updateBalance(transaction.userId, transaction.amount);
           const account = await api.tradingAccounts.getByUserId(transaction.userId);
           if (account) {
              await api.tradingAccounts.update(transaction.userId, { balance: (account.balance || 0) + transaction.amount });
           }
        }
      }

      refreshTransactions();
      toast.success('Transaction rejected');
    } catch (err) {
      console.error('Failed to reject transaction:', err);
      toast.error('Failed to reject transaction');
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      await api.transactions.delete(id);
      setTransactions(prev => prev.filter(txn => txn.id !== id));
      toast.success('Transaction deleted');
    } catch (err) {
      console.error('Failed to delete transaction:', err);
      toast.error('Failed to delete transaction');
    }
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