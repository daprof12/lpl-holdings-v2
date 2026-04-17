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

        setTransactions(dbTxns.map((t: any) => {
          const details = t.details || {};
          return {
            id: t.id,
            userId: t.user_id,
            type: t.type,
            method: t.payment_method || 'crypto',
            amount: parseFloat(t.amount),
            currency: t.currency || details.currency || 'USD',
            usdEquivalent: parseFloat(t.amount),
            status: t.status,
            timestamp: new Date(t.created_at).getTime(),
            completedAt: t.updated_at ? new Date(t.updated_at).getTime() : undefined,
            walletType: t.wallet_type || details.walletType || 'live',
            txHash: t.transaction_hash || details.txHash,
            referenceId: t.reference_id,
            // Withdrawal-specific fields from details
            bankName: details.bankName,
            accountName: details.accountName,
            accountNumber: details.accountNumber,
            routingNumber: details.routingNumber,
            swiftCode: details.swiftCode,
            paypalEmail: details.paypalEmail,
            walletAddress: details.destination_address || details.walletAddress,
            network: details.network || t.network,
            adminNotes: t.admin_notes || details.adminNotes,
            details: details,
          };
        }));
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
        status: 'pending',
        proof_data: data.metadata?.proof_data
      });
      
      await api.transactions.create({
        user_id: currentUser.id,
        type: 'deposit',
        amount: data.amount,
        currency: data.currency || 'USD',
        description: `Deposit via ${data.method || data.payment_method}`,
        reference_id: deposit.id,
        status: 'pending',
        payment_method: data.method || data.payment_method
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
        status: 'pending',
        payment_method: data.method || data.payment_method,
        wallet_type: data.walletType || 'live',
        details: {
          bankName: data.bankName,
          accountName: data.accountName,
          accountNumber: data.destination_address,
          routingNumber: data.routingNumber,
          swiftCode: data.swiftCode,
          paypalEmail: data.method === 'e_wallet' ? data.destination_address : undefined,
          destination_address: data.destination_address,
          network: data.network,
          currency: data.currency,
          walletType: data.walletType || 'live',
          fee: data.metadata?.fee,
          totalDeduction: data.metadata?.totalDeduction,
        }
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
    const now = Date.now();
    try {
      const transaction = transactions.find(t => t.id === id);
      if (!transaction) return;

      // The transactions table uses `id`, but deposits/withdrawals have their own
      // separate PKs stored in `reference_id` on the transactions record.
      const refId = transaction.referenceId || id;

      if (transaction.type === 'deposit') {
        // Update the deposits record
        await api.deposits.update(refId, {
          status: 'completed',
          reviewed_by: adminId,
          processed_at: now,
          completed_at: now,
          updated_at: now,
        });
        // Mirror status on the transactions ledger (may not exist — ignore errors)
        await api.transactions.update(id, { status: 'completed' }).catch(() => null);

        // Credit the correct wallet
        if (transaction.walletType === 'portfolio') {
          const wallet = await api.investmentWallets.getByUserId(transaction.userId);
          const current = parseFloat(wallet?.portfolio ?? 0);
          await api.investmentWallets.update(transaction.userId, { portfolio: current + transaction.amount });
        } else {
          // Live balance — read from BOTH tables to prevent zero-overwrite
          const [account, userRow] = await Promise.all([
            api.tradingAccounts.getByUserId(transaction.userId),
            api.users.getById(transaction.userId),
          ]);
          const currentBalance = Math.max(
            parseFloat(account?.balance ?? 0),
            parseFloat(userRow?.balance ?? 0),
          );
          const newBalance = currentBalance + transaction.amount;
          await Promise.all([
            account
              ? api.tradingAccounts.update(transaction.userId, { balance: newBalance })
              : api.tradingAccounts.insert({ user_id: transaction.userId, balance: newBalance }),
            api.users.update(transaction.userId, { balance: newBalance }),
          ]);
        }
      } else {
        // Withdrawal approved: balance was already deducted at request time — just mark complete
        await api.withdrawals.update(refId, {
          status: 'completed',
          reviewed_by: adminId,
          processed_at: now,
          completed_at: now,
          updated_at: now,
        });
        await api.transactions.update(id, { status: 'completed' }).catch(() => null);
      }

      refreshTransactions();
      toast.success('Transaction approved');
    } catch (err) {
      console.error('Failed to approve transaction:', err);
      toast.error('Failed to approve transaction');
    }
  };

  const rejectTransaction = async (id: string, adminId: string, notes?: string) => {
    const now = Date.now();
    try {
      const transaction = transactions.find(t => t.id === id);
      if (!transaction) return;

      const refId = transaction.referenceId || id;

      if (transaction.type === 'deposit') {
        // Deposit rejected: no balance change needed — was never credited
        await api.deposits.update(refId, {
          status: 'rejected',
          reviewed_by: adminId,
          rejection_reason: notes || null,
          processed_at: now,
          updated_at: now,
        });
        await api.transactions.update(id, { status: 'rejected' }).catch(() => null);
      } else {
        // Withdrawal rejected: REFUND — amount was deducted at request time
        await api.withdrawals.update(refId, {
          status: 'rejected',
          reviewed_by: adminId,
          rejection_reason: notes || null,
          processed_at: now,
          updated_at: now,
        });
        await api.transactions.update(id, { status: 'rejected' }).catch(() => null);

        // Refund to the wallet the withdrawal came from
        if (transaction.walletType === 'portfolio') {
          const wallet = await api.investmentWallets.getByUserId(transaction.userId);
          const current = parseFloat(wallet?.portfolio ?? 0);
          await api.investmentWallets.update(transaction.userId, { portfolio: current + transaction.amount });
        } else {
          // Refund to live balance — read from BOTH tables to prevent zero-overwrite
          const [account, userRow] = await Promise.all([
            api.tradingAccounts.getByUserId(transaction.userId),
            api.users.getById(transaction.userId),
          ]);
          const currentBalance = Math.max(
            parseFloat(account?.balance ?? 0),
            parseFloat(userRow?.balance ?? 0),
          );
          const refundedBalance = currentBalance + transaction.amount;
          await Promise.all([
            account
              ? api.tradingAccounts.update(transaction.userId, { balance: refundedBalance })
              : api.tradingAccounts.insert({ user_id: transaction.userId, balance: refundedBalance }),
            api.users.update(transaction.userId, { balance: refundedBalance }),
          ]);
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