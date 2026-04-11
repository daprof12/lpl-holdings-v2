import { useState, useEffect, useMemo } from 'react';
import { useTrading } from '../../contexts/TradingContext';
import { useAuth } from '../../contexts/AuthContext';
import { useSearchParams } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatNumber';
import { useTransactions } from '../../contexts/TransactionProvider';
import DashboardLayout from '../layouts/DashboardLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Wallet, CheckCircle, ArrowDownCircle, ArrowUpCircle, Clock, Briefcase } from 'lucide-react';
import DepositTab from './DepositTab';
import WithdrawTab from './WithdrawTab';
import TransactionHistory from './TransactionHistory';

export default function WalletPage() {
  const { account, positions, orders } = useTrading();
  const { currentUser } = useAuth();
  const { getUserTransactions } = useTransactions();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(() => {
    const tab = searchParams.get('tab');
    return tab === 'withdraw' || tab === 'history' ? tab : 'deposit';
  });
  const [selectedWalletType, setSelectedWalletType] = useState<'live' | 'portfolio'>('live');

  // Portfolio balance from investment balances
  const [portfolioBalance, setPortfolioBalance] = useState(0);

  useEffect(() => {
    if (!currentUser) return;
    const loadPortfolio = () => {
      const stored = localStorage.getItem(`investment_balances_${currentUser.id}`);
      if (stored) {
        try {
          const balances = JSON.parse(stored);
          setPortfolioBalance(balances.portfolio || 0);
        } catch { /* ignore */ }
      }
    };
    loadPortfolio();

    const handleStorage = () => loadPortfolio();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [currentUser?.id]);

  // Calculate wallet balances - ALWAYS from live account for deposits/withdrawals
  const walletBalance = useMemo(() => {
    // Use live account for wallet operations (deposits/withdrawals are real money)
    const accountData = account;
    
    // Total balance is the account equity (balance + unrealized P&L)
    const totalBalance = accountData.equity;
    
    // Available balance is free margin (can be used for new trades)
    const availableBalance = accountData.balance;
    
    // In orders is the margin used by open positions
    const inOrders = accountData.margin;
    
    // Pending deposits/withdrawals from transaction context
    const userTransactions = currentUser ? getUserTransactions(currentUser.id) : [];
    const pendingDeposits = userTransactions
      .filter(txn => txn.type === 'deposit' && txn.status === 'pending')
      .reduce((sum, txn) => sum + txn.usdEquivalent, 0);
    const pendingWithdrawals = userTransactions
      .filter(txn => txn.type === 'withdrawal' && txn.status === 'pending')
      .reduce((sum, txn) => sum + txn.usdEquivalent, 0);
    
    return {
      totalBalance,
      availableBalance,
      inOrders,
      pendingDeposits,
      pendingWithdrawals
    };
  }, [account, currentUser, getUserTransactions]);

  // The effective available balance depends on selected wallet type
  const effectiveAvailableBalance = selectedWalletType === 'live' 
    ? walletBalance.availableBalance 
    : portfolioBalance;

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Wallet</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your deposits, withdrawals, and view transaction history
          </p>
        </div>

        {/* Live Account Badge */}
        <div className="mb-6 flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-green-700 dark:text-green-300">Live Account Balance</span>
          </div>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <Wallet className="w-5 h-5" />
              <span className="text-sm opacity-90">Total Balance</span>
            </div>
            <div className="text-3xl mb-1">${formatCurrency(walletBalance.totalBalance)}</div>
            <div className="text-xs opacity-75">All funds in your account</div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Available</span>
            </div>
            <div className="text-2xl mb-1">${formatCurrency(walletBalance.availableBalance)}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Ready to trade</div>
          </div>

          <div className="bg-gradient-to-br from-emerald-600 to-teal-500 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="w-5 h-5" />
              <span className="text-sm opacity-90">Portfolio Balance</span>
            </div>
            <div className="text-2xl mb-1">${formatCurrency(portfolioBalance)}</div>
            <div className="text-xs opacity-75">Investment portfolio</div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <ArrowDownCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">In Orders</span>
            </div>
            <div className="text-2xl mb-1">${formatCurrency(walletBalance.inOrders)}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Locked in positions</div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Pending In</span>
            </div>
            <div className="text-2xl mb-1">${formatCurrency(walletBalance.pendingDeposits)}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Processing deposits</div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-red-600 dark:text-red-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Pending Out</span>
            </div>
            <div className="text-2xl mb-1">${formatCurrency(walletBalance.pendingWithdrawals)}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Processing withdrawals</div>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="deposit" className="flex items-center gap-2">
              <ArrowDownCircle className="w-4 h-4" />
              Deposit
            </TabsTrigger>
            <TabsTrigger value="withdraw" className="flex items-center gap-2">
              <ArrowUpCircle className="w-4 h-4" />
              Withdraw
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="deposit">
            <DepositTab 
              availableBalance={effectiveAvailableBalance}
              walletType={selectedWalletType}
              onWalletTypeChange={setSelectedWalletType}
              portfolioBalance={portfolioBalance}
              liveBalance={walletBalance.availableBalance}
            />
          </TabsContent>

          <TabsContent value="withdraw">
            <WithdrawTab 
              availableBalance={effectiveAvailableBalance}
              walletType={selectedWalletType}
              onWalletTypeChange={setSelectedWalletType}
              portfolioBalance={portfolioBalance}
              liveBalance={walletBalance.availableBalance}
            />
          </TabsContent>

          <TabsContent value="history">
            <TransactionHistory />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}