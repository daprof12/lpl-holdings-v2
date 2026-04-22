import { useState } from 'react';
import { formatCurrency } from '../../utils/formatNumber';
import { api } from '../../utils/supabase/api';

// ── Subscription plans – single source of truth ───────────────────────────────
const SUBSCRIPTION_PLANS = [
  { value: 'Basic', label: 'Basic', minDeposit: 250, badge: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300' },
  { value: 'Standard', label: 'Standard', minDeposit: 5_000, badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' },
  { value: 'Silver', label: 'Silver', minDeposit: 25_000, badge: 'bg-slate-200 dark:bg-slate-600/50 text-slate-700 dark:text-slate-300' },
  { value: 'Gold', label: 'Gold', minDeposit: 50_000, badge: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' },
  { value: 'Platinum', label: 'Platinum', minDeposit: 100_000, badge: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' },
  { value: 'VIP', label: 'VIP', minDeposit: 250_000, badge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50' },
];

function planBadge(plan?: string) {
  return SUBSCRIPTION_PLANS.find(p => p.value === plan)?.badge
    ?? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400';
}
import { Search, Plus, Edit, Trash2, Eye, EyeOff, DollarSign, TrendingUp, Lock, Unlock, CheckCircle, XCircle, MoreVertical, Gift, LogIn, CreditCard, UserPlus, FileText, Shield, Phone, Mail, Clock, X, MinusSquare } from 'lucide-react';
import { supabase } from '../../utils/supabase/client';

// ── KYC doc helpers ──────────────────────────────────────────────────────────
interface KycDoc { name: string; type: string; size: number; uploadedAt: string; dataUrl: string; }
interface KycDocs { identity?: KycDoc; proofOfAddress?: KycDoc; }
async function getKycDocs(userId: string): Promise<KycDocs> {
  try {
    // In relational model, we'd fetch this from kyc_submissions table
    const kyc = await api.kyc.getByUserId(userId);
    return kyc || {};
  }
  catch { return {}; }
}
function KycStatusBadge({ status }: { status: string }) {
  if (status === 'verified') return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs"><CheckCircle className="w-3 h-3" />Verified</span>;
  if (status === 'rejected') return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs"><XCircle className="w-3 h-3" />Rejected</span>;
  if (status === 'pending') return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs"><Clock className="w-3 h-3" />Pending</span>;
  return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs"><XCircle className="w-3 h-3" />Not Verified</span>;
}
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import UserPaymentMethods from './UserPaymentMethods';

export default function UserManagement() {
  const { users, updateProfile, deleteUser, userActivities, addFundsToUser, addFundsToAccount, addWalletTransaction, addNotification, signup, deductFromAccount, logActivity, refreshData } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'edit' | 'view'>('view');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [showAddFundDialog, setShowAddFundDialog] = useState(false);
  const [showDeductFundDialog, setShowDeductFundDialog] = useState(false);
  const [deductFundData, setDeductFundData] = useState({
    amount: '',
    balanceType: 'live' as 'live' | 'credit' | 'bonus' | 'ipo' | 'ecn' | 'portfolio',
  });
  const [showPaymentMethodsDialog, setShowPaymentMethodsDialog] = useState(false);
  const [showPasswordResetDialog, setShowPasswordResetDialog] = useState(false);
  const [viewDocModal, setViewDocModal] = useState<{ doc: KycDoc; label: string } | null>(null);
  const [paymentMethodsUserId, setPaymentMethodsUserId] = useState<string | null>(null);
  const [passwordResetUserId, setPasswordResetUserId] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // ── Add User dialog state ──
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [showAddUserPassword, setShowAddUserPassword] = useState(false);
  const [addUserLoading, setAddUserLoading] = useState(false);
  const [addUserForm, setAddUserForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    country: '',
    accountType: 'standard' as 'standard' | 'premium' | 'vip',
    kycStatus: 'pending' as 'pending' | 'verified' | 'rejected',
    isVerified: false,
    subscription: 'free',
    initialBalance: '',
    initialPortfolioBalance: '',
  });

  const resetAddUserForm = () => {
    setAddUserForm({
      firstName: '', lastName: '', email: '', password: '',
      phone: '', country: '', accountType: 'standard',
      kycStatus: 'pending', isVerified: false, subscription: 'free', initialBalance: '',
      initialPortfolioBalance: '',
    });
    setShowAddUserPassword(false);
  };

  const handleAddUser = async () => {
    if (!addUserForm.firstName.trim()) { toast.error('First name is required'); return; }
    if (!addUserForm.lastName.trim()) { toast.error('Last name is required'); return; }
    if (!addUserForm.email.trim()) { toast.error('Email is required'); return; }
    if (!addUserForm.password || addUserForm.password.length < 8) {
      toast.error('Password must be at least 8 characters'); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addUserForm.email)) {
      toast.error('Enter a valid email address'); return;
    }

    setAddUserLoading(true);
    try {
      const res = await signup({
        email: addUserForm.email.trim().toLowerCase(),
        password: addUserForm.password,
        firstName: addUserForm.firstName.trim(),
        lastName: addUserForm.lastName.trim(),
        phone: addUserForm.phone.trim() || undefined,
        country: addUserForm.country.trim() || undefined,
      });

      // signup now returns { user: newUser } or false
      if (res && res.user) {
        const newUser = res.user;
        // Apply extra admin-set fields to the newly created user
        const updates: any = {
          account_type: addUserForm.accountType,
          kyc_status: addUserForm.kycStatus === 'verified' ? 'approved' :
            addUserForm.kycStatus === 'rejected' ? 'rejected' : 'pending',
          email_verified: addUserForm.isVerified,
          subscription_plan: addUserForm.subscription || undefined,
        };

        await api.users.update(newUser.id, updates);

        // 1. Live Balance
        if (addUserForm.initialBalance && parseFloat(addUserForm.initialBalance) > 0) {
          const initBal = parseFloat(addUserForm.initialBalance);
          await api.users.updateBalance(newUser.id, initBal);
          await api.tradingAccounts.update(newUser.id, { balance: initBal, available_funds: initBal });
        }

        // 2. Bonus & Credit
        const bonusVal = parseFloat((addUserForm as any).bonus || 0);
        const creditVal = parseFloat((addUserForm as any).credit || 0);
        if (bonusVal > 0 || creditVal > 0) {
          await api.tradingAccounts.update(newUser.id, {
            bonus: bonusVal,
            credit: creditVal
          });
        }

        // 3. Investment Wallets (Portfolio, IPO, ECN)
        const iwUpdates: any = {};
        if (addUserForm.initialPortfolioBalance) iwUpdates.portfolio = parseFloat(addUserForm.initialPortfolioBalance);
        if ((addUserForm as any).ipoBalance) iwUpdates.ipo = parseFloat((addUserForm as any).ipoBalance);
        if ((addUserForm as any).ecnBalance) iwUpdates.ecn = parseFloat((addUserForm as any).ecnBalance);

        if (Object.keys(iwUpdates).length > 0) {
          await api.investmentWallets.update(newUser.id, iwUpdates);
        }

        // 4. Force one final refresh to show all updated balances
        await refreshData();

        toast.success(`User ${addUserForm.firstName} ${addUserForm.lastName} created successfully`);
        setShowAddUserDialog(false);
        resetAddUserForm();
      } else {
        toast.error('Could not create user. Email may already exist.');
      }
    } catch (err: any) {
      console.error('Add User Error:', err);
      toast.error(err.message || 'Failed to create user');
    } finally {
      setAddUserLoading(false);
    }
  };

  const [addFundData, setAddFundData] = useState({
    amount: '',
    balanceType: 'live' as 'live' | 'ipo' | 'ecn' | 'portfolio' | 'credit' | 'bonus',
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    country: '',
    balance: '',
    portfolioBalance: '',
    ipoBalance: '',
    ecnBalance: '',
    accountType: 'standard' as 'standard' | 'premium' | 'vip',
    kycStatus: 'pending' as 'pending' | 'verified' | 'rejected',
    isVerified: false,
    subscriptionPlan: '' as string,
    bonus: '0',
    credit: '0'
  });

  const selectedUser = users.find(u => u.id === selectedUserId);

  // Filter out admin users and apply search query
  const filteredUsers = users
    .filter(user => user.role !== 'admin') // Exclude admin users
    .filter(user =>
      user.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleEdit = async (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setSelectedUserId(userId);
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.passwordHash || '', 
        phone: user.phone || '',
        country: user.country || '',
        balance: (user.liveBalance ?? user.balance ?? 0).toString(),
        portfolioBalance: (user.investmentBalances?.portfolio || 0).toString(),
        ipoBalance: (user.investmentBalances?.ipo || 0).toString(),
        ecnBalance: (user.investmentBalances?.ecn || 0).toString(),
        accountType: user.accountType,
        kycStatus: user.kycStatus,
        isVerified: user.isVerified,
        subscriptionPlan: user.subscriptionPlan || '',
        bonus: (user.bonus || 0).toString(),
        credit: (user.credit || 0).toString(),
      });
      setDialogMode('edit');
      setShowDialog(true);
    }
  };

  const handleView = (userId: string) => {
    setSelectedUserId(userId);
    setDialogMode('view');
    setShowDialog(true);
  };

  const handleSave = async () => {
    if (!selectedUserId) return;

    const user = users.find(u => u.id === selectedUserId);
    if (!user) {
      toast.error('User not found');
      return;
    }

    const prevPlan = user.subscriptionPlan || '';

    // Update user profile – write subscriptionPlan so SubscriptionManagement stays in sync
    // Update user profile – including investment balances
    const newInvestmentBalances = {
      portfolio: parseFloat(formData.portfolioBalance) || 0,
      ipo: parseFloat(formData.ipoBalance) || 0,
      ecn: parseFloat(formData.ecnBalance) || 0,
    };

    try {
      await updateProfile(selectedUserId, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        country: formData.country,
        liveBalance: parseFloat(formData.balance) || 0,
        balance: parseFloat(formData.balance) || 0,
        accountType: formData.accountType,
        kycStatus: formData.kycStatus,
        isVerified: formData.isVerified,
        subscriptionPlan: formData.subscriptionPlan || undefined,
        investmentBalances: newInvestmentBalances,
        bonus: parseFloat(formData.bonus) || 0,
        credit: parseFloat(formData.credit) || 0
      });

      // Update investment balances in DB
      await api.investmentWallets.update(selectedUserId, newInvestmentBalances);

      // Update Trading Account in DB
      await api.tradingAccounts.update(selectedUserId, {
        balance: parseFloat(formData.balance) || 0,
        bonus: parseFloat(formData.bonus) || 0,
        credit: parseFloat(formData.credit) || 0
      });

      // Update password if changed in edit mode
      if (formData.password && formData.password !== user.passwordHash) {
        await api.users.update(selectedUserId, { password_hash: formData.password });
      }

      // Notify user when subscription plan changes and update subscribers table
      if (formData.subscriptionPlan && formData.subscriptionPlan !== prevPlan) {
        try {
          const existingSubs = await api.subscribers.getByUserId(selectedUserId);
          const planObj = SUBSCRIPTION_PLANS.find(p => p.label.toLowerCase() === formData.subscriptionPlan?.toLowerCase());
          const amount = planObj?.minDeposit || 0;

          if (existingSubs && existingSubs.length > 0) {
            await api.subscribers.update(existingSubs[0].id, {
              plan: formData.subscriptionPlan,
              amount: amount,
              updated_at: new Date().toISOString()
            });
          } else {
            await api.subscribers.create({
              user_id: selectedUserId,
              plan: formData.subscriptionPlan,
              amount: amount,
              status: 'active',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });
          }
        } catch (e) {
          console.error("Failed to update subscribers table:", e);
        }

        try {
          await addNotification(selectedUserId, {
            type: 'success',
            title: 'Subscription Updated',
            message: `Your subscription plan has been updated to ${formData.subscriptionPlan}.`,
          });
        } catch (e) {
          console.error("Notification failed", e);
        }
      }

      toast.success('User updated successfully');
      setShowDialog(false);
      await refreshData();
    } catch (err) {
      console.error('Failed to save user:', err);
      toast.error('Failed to save user updates');
    }
  };

  const handleDelete = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId);
      toast.success('User deleted successfully');
    }
  };

  const getUserActivities = (userId: string) => {
    return userActivities.filter(activity => activity.userId === userId).slice(0, 10);
  };

  const handleAddFund = async () => {
    if (!selectedUserId || !selectedUser) return;

    const amount = parseFloat(addFundData.amount) || 0;
    if (amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    try {
      const targetType = addFundData.balanceType;
      await addFundsToAccount(selectedUserId, amount, targetType);

      const balanceLabel = targetType === 'live' ? 'Live Balance'
        : targetType === 'credit' ? 'Credit Balance'
          : targetType === 'bonus' ? 'Bonus Balance'
            : (targetType.toUpperCase() + ' Balance');

      await addNotification(selectedUserId, {
        type: 'success',
        title: 'Funds Added',
        message: `$${formatCurrency(amount)} has been added to your ${balanceLabel}.`,
      });

      toast.success(`$${formatCurrency(amount)} added to ${balanceLabel} successfully`);
      setShowAddFundDialog(false);
      setAddFundData({ amount: '', balanceType: 'live' });
      await refreshData();
    } catch (err) {
      console.error('Failed to add funds:', err);
      toast.error('Failed to add funds: ' + ((err as any)?.message || 'Unknown error'));
    }
  };

  // Helper to get current balance for display in Deduct modal
  const getCurrentDeductBalance = () => {
    if (!selectedUserId || !selectedUser) return 0;

    if (deductFundData.balanceType === 'ipo' || deductFundData.balanceType === 'ecn' || deductFundData.balanceType === 'portfolio') {
      const type = deductFundData.balanceType as 'ipo' | 'ecn' | 'portfolio';
      return selectedUser.investmentBalances?.[type] || 0;
    }

    if (deductFundData.balanceType === 'live') return selectedUser.liveBalance || selectedUser.balance || 0;
    if (deductFundData.balanceType === 'bonus') return selectedUser.bonus || 0;
    if (deductFundData.balanceType === 'credit') return selectedUser.credit || 0;

    return 0;
  };

  const handleDeductFund = async () => {
    if (!selectedUserId || !selectedUser) return;

    const amount = parseFloat(deductFundData.amount) || 0;
    if (amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    try {
      const targetType = deductFundData.balanceType;
      // Map 'live' to current type (balance/credit/bonus) for deduction
      const fundType = targetType === 'live' ? (deductFundData.type as any || 'live') : targetType;

      const success = await deductFromAccount(selectedUserId, amount, fundType);

      if (!success) {
        toast.error('Insufficient funds for deduction');
        return;
      }

      logActivity({
        type: 'withdraw',
        action: `Funds deducted from ${deductFundData.balanceType}`,
        details: { amount, balanceType: deductFundData.balanceType }
      });

      toast.success(`Successfully deducted $${formatCurrency(amount)} from ${deductFundData.balanceType}`);
      setShowDeductFundDialog(false);
      setDeductFundData({ amount: '', balanceType: 'live' });
      await refreshData(); // Force state sync
    } catch (err) {
      console.error('Failed to deduct funds:', err);
      toast.error('Failed to deduct funds');
    }
  };

  const handleLoginAsUser = (userId: string, userName: string) => {
    // Find the full user profile object
    const targetUser = users.find(u => u.id === userId);
    if (!targetUser) {
      toast.error('User not found');
      return;
    }

    // Store the FULL user object so the new tab can hydrate instantly
    // without waiting for an async DB fetch (which would lose the race
    // against ProtectedRoute's redirect to /login).
    const loginData = {
      userId: userId,
      userName: userName,
      loginAsUser: true,
      timestamp: Date.now(),
      userData: targetUser   // <-- full profile for immediate hydration
    };

    localStorage.setItem('adminLoginAsUser', JSON.stringify(loginData));

    // Open user dashboard in new window
    const userDashboardUrl = window.location.origin + '/dashboard';
    window.open(userDashboardUrl, '_blank');

    toast.success(`Opened dashboard as ${userName}`);
    setOpenDropdownId(null);
  };

  const handleShowPaymentMethods = (userId: string) => {
    setPaymentMethodsUserId(userId);
    setShowPaymentMethodsDialog(true);
  };

  const handleResetPassword = (userId: string) => {
    setPasswordResetUserId(userId);
    setShowPasswordResetDialog(true);
  };

  const handlePasswordReset = async () => {
    if (!passwordResetUserId) return;

    const user = users.find(u => u.id === passwordResetUserId);
    if (!user) {
      toast.error('User not found');
      return;
    }

    // Validate password
    if (!newPassword || newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    try {
      // Update password directly in the users table (since app uses custom password_hash column)
      await api.users.update(passwordResetUserId, {
        password_hash: newPassword
      });

      // Send notification to user
      await addNotification(passwordResetUserId, {
        type: 'warning',
        title: 'Password Reset',
        message: 'Your password has been reset. Please use your new password to login.',
        channels: ['in-app'],
      });

      toast.success('Password reset successfully');
      setShowPasswordResetDialog(false);
      setPasswordResetUserId(null);
      setNewPassword('');
    } catch (err) {
      console.error('Password reset failed:', err);
      toast.error('Failed to reset password');
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl mb-2">User Management</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage user accounts and permissions
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:flex md:flex-row md:overflow-x-auto gap-4 mb-6 pb-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-slate-700">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 md:min-w-[200px] flex-shrink-0">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
          <p className="text-2xl mt-1 font-bold">{users.filter(u => u.role !== 'admin').length}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 md:min-w-[200px] flex-shrink-0">
          <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
          <p className="text-2xl mt-1 font-bold">{users.filter(u => u.role === 'user').length}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 md:min-w-[200px] flex-shrink-0">
          <p className="text-sm text-gray-600 dark:text-gray-400">Verified KYC</p>
          <p className="text-2xl mt-1 font-bold">{users.filter(u => u.kycStatus === 'verified' && u.role !== 'admin').length}</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border-2 border-green-500 shadow-sm md:min-w-[220px] flex-shrink-0">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Live Balance</p>
          <p className="text-2xl mt-1 text-green-600 font-bold">
            ${formatCurrency(users.filter(u => u.role !== 'admin').reduce((sum, u) => sum + (u.liveBalance || 0), 0))}
          </p>
          <p className="text-xs text-gray-500 mt-1">Real Money</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border-2 border-blue-500 shadow-sm md:min-w-[220px] flex-shrink-0">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Credit Balance</p>
          <p className="text-2xl mt-1 text-blue-600 font-bold">
            ${formatCurrency(users.filter(u => u.role !== 'admin').reduce((sum, u) => sum + (u.credit || 0), 0))}
          </p>
          <p className="text-xs text-gray-500 mt-1">Funds to be Repaid</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border-2 border-emerald-500 shadow-sm md:min-w-[220px] flex-shrink-0">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Bonus Balance</p>
          <p className="text-2xl mt-1 text-emerald-600 font-bold">
            ${formatCurrency(users.filter(u => u.role !== 'admin').reduce((sum, u) => sum + (u.bonus || 0), 0))}
          </p>
          <p className="text-xs text-gray-500 mt-1">Promotional Funds</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border-2 border-teal-500 shadow-sm md:min-w-[220px] flex-shrink-0">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Portfolio Balance</p>
          <p className="text-2xl mt-1 text-teal-600 font-bold">
            ${formatCurrency(users.filter(u => u.role !== 'admin').reduce((sum, u) => sum + (u.investmentBalances?.portfolio || 0), 0))}
          </p>
          <p className="text-xs text-gray-500 mt-1">Portfolio Funds</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border-2 border-purple-500 shadow-sm md:min-w-[220px] flex-shrink-0">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total IPO Balance</p>
          <p className="text-2xl mt-1 text-purple-600 font-bold">
            ${formatCurrency(users.filter(u => u.role !== 'admin').reduce((sum, u) => sum + (u.investmentBalances?.ipo || 0), 0))}
          </p>
          <p className="text-xs text-gray-500 mt-1">IPO Funds</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border-2 border-orange-500 shadow-sm md:min-w-[220px] flex-shrink-0">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total ECN Balance</p>
          <p className="text-2xl mt-1 text-orange-600 font-bold">
            ${formatCurrency(users.filter(u => u.role !== 'admin').reduce((sum, u) => sum + (u.investmentBalances?.ecn || 0), 0))}
          </p>
          <p className="text-xs text-gray-500 mt-1">ECN Funds</p>
        </div>
      </div>

      {/* Search + Add User */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search users by name or email..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            onClick={() => { resetAddUserForm(); setShowAddUserDialog(true); }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            Add User
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden">
        <div className={`overflow-x-auto max-h-[700px] overflow-y-auto transition-all duration-200 ${openDropdownId ? 'pb-56' : ''}`}>
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-700 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  Live Balance
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  Credit
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  Bonus
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  IPO Balance
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  ECN Balance
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  Portfolio Balance
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  Account Type
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  KYC Status
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  Verified
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {filteredUsers.map((user) => {
                const ipo = user.investmentBalances?.ipo || 0;
                const ecn = user.investmentBalances?.ecn || 0;
                const portfolio = user.investmentBalances?.portfolio || 0;

                return (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span>{user.firstName} {user.lastName}</span>
                          {user.isOnline && (
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                          )}
                          {user.role === 'admin' && (
                            <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs rounded">
                              Admin
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <span className="text-green-600 font-medium">${formatCurrency(user.liveBalance || 0)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <span className="text-blue-600">${formatCurrency(user.credit || 0)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <span className="text-emerald-600">${formatCurrency(user.bonus || 0)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <span>${formatCurrency(ipo)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <span>${formatCurrency(ecn)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <span>${formatCurrency(portfolio)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${user.accountType === 'vip' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' :
                        user.accountType === 'premium' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                          'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400'
                        }`}>
                        {user.accountType}
                      </span>
                    </td>
                    {/* Plan */}
                    <td className="px-6 py-4">
                      {user.subscriptionPlan ? (
                        <span className={`px-2 py-1 rounded text-xs font-medium ${planBadge(user.subscriptionPlan)}`}>
                          {user.subscriptionPlan}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400 dark:text-gray-500">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${user.kycStatus === 'verified' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                        user.kycStatus === 'rejected' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                          'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                        }`}>
                        {user.kycStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {user.isVerified ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-400" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setOpenDropdownId(openDropdownId === user.id ? null : user.id)}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                        {openDropdownId === user.id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setOpenDropdownId(null)}
                            />
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 z-50">
                              <div className="py-1">
                                <button
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2"
                                  onClick={() => {
                                    setOpenDropdownId(null);
                                    handleView(user.id);
                                  }}
                                >
                                  <Eye className="w-4 h-4" />
                                  View User
                                </button>
                                <button
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2"
                                  onClick={() => {
                                    setOpenDropdownId(null);
                                    setSelectedUserId(user.id);
                                    setShowAddFundDialog(true);
                                  }}
                                >
                                  <DollarSign className="w-4 h-4" />
                                  Add Fund
                                </button>
                                <button
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2"
                                  onClick={() => {
                                    setOpenDropdownId(null);
                                    setSelectedUserId(user.id);
                                    setShowDeductFundDialog(true);
                                  }}
                                >
                                  <MinusSquare className="w-4 h-4" />
                                  Deduct Fund
                                </button>
                                <button
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2"
                                  onClick={() => {
                                    setOpenDropdownId(null);
                                    handleLoginAsUser(user.id, `${user.firstName} ${user.lastName}`);
                                  }}
                                >
                                  <LogIn className="w-4 h-4" />
                                  Login as User
                                </button>
                                {user.role !== 'admin' && (
                                  <button
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2 text-red-600 dark:text-red-400"
                                    onClick={() => {
                                      setOpenDropdownId(null);
                                      handleDelete(user.id);
                                    }}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                  </button>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Add User Dialog ── */}
      <Dialog open={showAddUserDialog} onOpenChange={(open) => { setShowAddUserDialog(open); if (!open) resetAddUserForm(); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Manually create a new user account. The user can log in immediately with the provided credentials.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 pt-2">
            {/* Basic Info */}
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">Basic Information</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="au-firstName">First Name <span className="text-red-500">*</span></Label>
                  <Input id="au-firstName" value={addUserForm.firstName}
                    onChange={(e) => setAddUserForm({ ...addUserForm, firstName: e.target.value })}
                    placeholder="John" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="au-lastName">Last Name <span className="text-red-500">*</span></Label>
                  <Input id="au-lastName" value={addUserForm.lastName}
                    onChange={(e) => setAddUserForm({ ...addUserForm, lastName: e.target.value })}
                    placeholder="Doe" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="au-email">Email Address <span className="text-red-500">*</span></Label>
                  <Input id="au-email" type="email" value={addUserForm.email}
                    onChange={(e) => setAddUserForm({ ...addUserForm, email: e.target.value })}
                    placeholder="john.doe@example.com" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="au-password">Password <span className="text-red-500">*</span></Label>
                  <div className="relative mt-2">
                    <Input id="au-password" type={showAddUserPassword ? 'text' : 'password'}
                      value={addUserForm.password}
                      onChange={(e) => setAddUserForm({ ...addUserForm, password: e.target.value })}
                      placeholder="Min. 8 characters" className="pr-10" />
                    <button type="button" onClick={() => setShowAddUserPassword(!showAddUserPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      {showAddUserPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Minimum 8 characters required</p>
                </div>
                <div>
                  <Label htmlFor="au-phone">Phone Number</Label>
                  <Input id="au-phone" value={addUserForm.phone}
                    onChange={(e) => setAddUserForm({ ...addUserForm, phone: e.target.value })}
                    placeholder="+1 555 000 0000" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="au-country">Country</Label>
                  <select id="au-country" value={addUserForm.country}
                    onChange={(e) => setAddUserForm({ ...addUserForm, country: e.target.value })}
                    className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm">
                    <option value="">Select a country</option>
                    {['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
                      'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
                      'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
                      'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo (Congo-Brazzaville)', 'Costa Rica',
                      'Croatia', 'Cuba', 'Cyprus', 'Czechia', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt',
                      'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon',
                      'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
                      'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel',
                      'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos',
                      'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi',
                      'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova',
                      'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands',
                      'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau',
                      'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania',
                      'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal',
                      'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea',
                      'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan',
                      'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
                      'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela',
                      'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
                    ].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">Account Settings</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="au-accountType">Account Type</Label>
                  <select id="au-accountType" value={addUserForm.accountType}
                    onChange={(e) => setAddUserForm({ ...addUserForm, accountType: e.target.value as any })}
                    className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm">
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                    <option value="vip">VIP</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="au-subscription">Subscription Plan</Label>
                  <select id="au-subscription" value={addUserForm.subscription}
                    onChange={(e) => setAddUserForm({ ...addUserForm, subscription: e.target.value })}
                    className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm">
                    <option value="">— No Plan —</option>
                    {SUBSCRIPTION_PLANS.map(p => (
                      <option key={p.value} value={p.value}>
                        {p.label} — ${formatCurrency(p.minDeposit)} min deposit
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="au-kycStatus">KYC Status</Label>
                  <select id="au-kycStatus" value={addUserForm.kycStatus}
                    onChange={(e) => setAddUserForm({ ...addUserForm, kycStatus: e.target.value as any })}
                    className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm">
                    <option value="pending">Pending</option>
                    <option value="verified">Verified</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="au-initialBalance">Initial Live Balance (USD)</Label>
                  <Input id="au-initialBalance" type="number" min="0"
                    value={addUserForm.initialBalance}
                    onChange={(e) => setAddUserForm({ ...addUserForm, initialBalance: e.target.value })}
                    placeholder="0.00" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="au-initialPortfolioBalance">Initial Portfolio Balance (USD)</Label>
                  <Input id="au-initialPortfolioBalance" type="number" min="0"
                    value={addUserForm.initialPortfolioBalance}
                    onChange={(e) => setAddUserForm({ ...addUserForm, initialPortfolioBalance: e.target.value })}
                    placeholder="0.00" className="mt-2" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-700/50">
                <input type="checkbox" id="au-isVerified" checked={addUserForm.isVerified}
                  onChange={(e) => setAddUserForm({ ...addUserForm, isVerified: e.target.checked })}
                  className="w-4 h-4 rounded accent-blue-600" />
                <div>
                  <Label htmlFor="au-isVerified" className="cursor-pointer">Mark Email as Verified</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">User won't need to verify their email to log in</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2 border-t border-gray-200 dark:border-slate-700">
              <Button onClick={handleAddUser} disabled={addUserLoading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2">
                {addUserLoading
                  ? <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  : <UserPlus className="w-4 h-4" />}
                {addUserLoading ? 'Creating...' : 'Create User'}
              </Button>
              <Button variant="outline" onClick={() => { setShowAddUserDialog(false); resetAddUserForm(); }} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle>
                  {dialogMode === 'view' ? 'User Details' : 'Edit User'}
                </DialogTitle>
                <DialogDescription>
                  {dialogMode === 'view' ? 'View user details and recent activities' : 'Edit user information'}
                </DialogDescription>
              </div>
              {dialogMode === 'view' && selectedUserId && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(selectedUserId)}
                  className="flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>
              )}
            </div>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6">
              {dialogMode === 'view' ? (
                <>
                  {/* ── Basic Info ── */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Name</Label>
                      <p className="mt-1">{selectedUser.firstName} {selectedUser.lastName}</p>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <p className="mt-1">{selectedUser.email}</p>
                    </div>
                    <div>
                      <Label>Password</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="font-mono text-sm flex-1">
                          {showPassword ? selectedUser.passwordHash || 'N/A' : '••••••••'}
                        </p>
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <p className="mt-1">{selectedUser.phone || 'N/A'}</p>
                    </div>
                    <div>
                      <Label>Country</Label>
                      <p className="mt-1">{selectedUser.country || 'N/A'}</p>
                    </div>
                    <div>
                      <Label>Live Balance</Label>
                      <p className="mt-1 text-green-600">${formatCurrency(selectedUser.liveBalance ?? selectedUser.balance ?? 0)}</p>
                    </div>
                    <div>
                      <Label>Portfolio Balance</Label>
                      <p className="mt-1 text-emerald-600">${formatCurrency(selectedUser.investmentBalances?.portfolio || 0)}</p>
                    </div>
                    <div>
                      <Label>Credit Balance</Label>
                      <p className="mt-1 text-blue-600">${formatCurrency(selectedUser.credit || 0)}</p>
                    </div>
                    <div>
                      <Label>Bonus Balance</Label>
                      <p className="mt-1 text-emerald-600">${formatCurrency(selectedUser.bonus || 0)}</p>
                    </div>
                    <div>
                      <Label>Account Type</Label>
                      <p className="mt-1 capitalize">{selectedUser.accountType}</p>
                    </div>
                    <div>
                      <Label>Joined</Label>
                      <p className="mt-1">{new Date(selectedUser.createdAt).toLocaleString()}</p>
                    </div>
                    <div>
                      <Label>Subscription Plan</Label>
                      {selectedUser.subscriptionPlan ? (
                        <span className={`inline-block mt-1 px-3 py-1 rounded text-sm font-medium ${planBadge(selectedUser.subscriptionPlan)}`}>
                          {selectedUser.subscriptionPlan}{' '}— ${formatCurrency(SUBSCRIPTION_PLANS.find(p => p.value === selectedUser.subscriptionPlan)?.minDeposit ?? 0)} min
                        </span>
                      ) : (
                        <p className="mt-1 text-gray-500 dark:text-gray-400">No plan assigned</p>
                      )}
                    </div>
                  </div>

                  {/* ── Verification Panel ── */}
                  <div className="border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-slate-700/50 border-b border-gray-200 dark:border-slate-700">
                      <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-semibold">Verification Controls</span>
                      <span className="text-xs text-gray-400 ml-1">(Admin Only)</span>
                    </div>

                    <div className="divide-y divide-gray-100 dark:divide-slate-700">
                      {/* Email verification */}
                      <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedUser.isVerified ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-slate-700'}`}>
                            <Mail className={`w-4 h-4 ${selectedUser.isVerified ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold">Email Verification</p>
                            <p className="text-xs text-gray-400">{selectedUser.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <KycStatusBadge status={selectedUser.isVerified ? 'verified' : 'unverified'} />
                          {selectedUser.isVerified ? (
                            <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                              onClick={() => {
                                updateProfile(selectedUser.id, { isVerified: false });
                                addNotification(selectedUser.id, { type: 'warning', title: 'Email Verification Revoked', message: 'Your email verification has been revoked.' });
                                toast.success('Email verification revoked');
                              }}>
                              Revoke
                            </Button>
                          ) : (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => {
                                updateProfile(selectedUser.id, { isVerified: true });
                                addNotification(selectedUser.id, { type: 'success', title: 'Email Verified', message: 'Your email has been verified.' });
                                toast.success('Email verified');
                              }}>
                              Verify
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Phone verification */}
                      <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${(selectedUser as any).phoneVerified ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-slate-700'}`}>
                            <Phone className={`w-4 h-4 ${(selectedUser as any).phoneVerified ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold">Phone Verification</p>
                            <p className="text-xs text-gray-400">{selectedUser.phone || 'No phone on file'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <KycStatusBadge status={(selectedUser as any).phoneVerified ? 'verified' : 'unverified'} />
                          {(selectedUser as any).phoneVerified ? (
                            <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                              onClick={async () => {
                                await updateProfile(selectedUser.id, { phoneVerified: false } as any);
                                await addNotification(selectedUser.id, { type: 'warning', title: 'Phone Verification Revoked', message: 'Your phone verification has been revoked.' });
                                toast.success('Phone verification revoked');
                              }}>
                              Revoke
                            </Button>
                          ) : (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={async () => {
                                await updateProfile(selectedUser.id, { phoneVerified: true } as any);
                                await addNotification(selectedUser.id, { type: 'success', title: 'Phone Verified', message: 'Your phone number has been verified.' });
                                toast.success('Phone verified');
                              }}>
                              Verify
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* KYC verification */}
                      <div className="px-4 py-3 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedUser.kycStatus === 'verified' ? 'bg-green-100 dark:bg-green-900/30' :
                              selectedUser.kycStatus === 'rejected' ? 'bg-red-100 dark:bg-red-900/30' :
                                'bg-gray-100 dark:bg-slate-700'
                              }`}>
                              <FileText className={`w-4 h-4 ${selectedUser.kycStatus === 'verified' ? 'text-green-600 dark:text-green-400' :
                                selectedUser.kycStatus === 'rejected' ? 'text-red-600 dark:text-red-400' :
                                  'text-gray-400'
                                }`} />
                            </div>
                            <div>
                              <p className="text-sm font-semibold">KYC Verification</p>
                              <p className="text-xs text-gray-400">Identity & proof of address</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <KycStatusBadge status={selectedUser.kycStatus} />
                            {selectedUser.kycStatus !== 'verified' && (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={async () => {
                                  await updateProfile(selectedUser.id, { kycStatus: 'verified' });
                                  await addNotification(selectedUser.id, { type: 'success', title: 'KYC Approved', message: 'Your KYC verification has been approved. You now have full account access.' });
                                  toast.success('KYC approved');
                                }}>
                                Approve
                              </Button>
                            )}
                            {selectedUser.kycStatus !== 'rejected' && (
                              <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                                onClick={async () => {
                                  await updateProfile(selectedUser.id, { kycStatus: 'rejected' });
                                  await addNotification(selectedUser.id, { type: 'error', title: 'KYC Rejected', message: 'Your KYC documents have been rejected. Please resubmit with clearer documents.' });
                                  toast.success('KYC rejected');
                                }}>
                                Reject
                              </Button>
                            )}
                            {selectedUser.kycStatus !== 'pending' && (
                              <Button size="sm" variant="outline"
                                onClick={() => {
                                  updateProfile(selectedUser.id, { kycStatus: 'pending' });
                                  toast.success('KYC set to pending');
                                }}>
                                Set Pending
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Submitted documents */}
                        {(() => {
                          const docs = getKycDocs(selectedUser.id);
                          const hasDocs = docs.identity || docs.proofOfAddress;
                          return hasDocs ? (
                            <div className="bg-gray-50 dark:bg-slate-700/40 rounded-lg p-3 space-y-2">
                              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Submitted Documents</p>
                              {docs.identity && (
                                <div className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-slate-600">
                                  <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-blue-500" />
                                    <div>
                                      <p className="text-xs font-semibold">Identity Document</p>
                                      <p className="text-xs text-gray-400">{docs.identity.name} · {(docs.identity.size / 1024).toFixed(1)} KB</p>
                                      <p className="text-xs text-gray-400">Uploaded {new Date(docs.identity.uploadedAt).toLocaleDateString()}</p>
                                    </div>
                                  </div>
                                  <Button size="sm" variant="outline" onClick={() => setViewDocModal({ doc: docs.identity!, label: 'Identity Document' })}>
                                    <Eye className="w-3.5 h-3.5 mr-1" />View
                                  </Button>
                                </div>
                              )}
                              {docs.proofOfAddress && (
                                <div className="flex items-center justify-between py-1.5">
                                  <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-purple-500" />
                                    <div>
                                      <p className="text-xs font-semibold">Proof of Address</p>
                                      <p className="text-xs text-gray-400">{docs.proofOfAddress.name} · {(docs.proofOfAddress.size / 1024).toFixed(1)} KB</p>
                                      <p className="text-xs text-gray-400">Uploaded {new Date(docs.proofOfAddress.uploadedAt).toLocaleDateString()}</p>
                                    </div>
                                  </div>
                                  <Button size="sm" variant="outline" onClick={() => setViewDocModal({ doc: docs.proofOfAddress!, label: 'Proof of Address' })}>
                                    <Eye className="w-3.5 h-3.5 mr-1" />View
                                  </Button>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                              <FileText className="w-4 h-4 text-yellow-600 dark:text-yellow-400 shrink-0" />
                              <p className="text-xs text-yellow-700 dark:text-yellow-300">No KYC documents submitted yet by this user.</p>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* Recent Activities */}
                  <div>
                    <Label className="mb-3 block">Recent Activities</Label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {getUserActivities(selectedUser.id).map((activity) => (
                        <div key={activity.id} className="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{activity.action}</span>
                            <span className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleString()}</span>
                          </div>
                          <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">{activity.type}</span>
                        </div>
                      ))}
                      {getUserActivities(selectedUser.id).length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-4">No recent activities</p>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Edit Mode */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>First Name</Label>
                      <Input
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <Input
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        value={formData.email}
                        disabled
                        className="mt-2 bg-gray-100 dark:bg-slate-700"
                      />
                    </div>
                    <div>
                      <Label>Password</Label>
                      <div className="relative mt-2">
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-2"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <Label>Country</Label>
                      <select
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm"
                      >
                        <option value="">Select a country</option>
                        {['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
                          'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
                          'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
                          'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo (Congo-Brazzaville)', 'Costa Rica',
                          'Croatia', 'Cuba', 'Cyprus', 'Czechia', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt',
                          'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon',
                          'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
                          'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel',
                          'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos',
                          'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi',
                          'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova',
                          'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands',
                          'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau',
                          'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania',
                          'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal',
                          'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea',
                          'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan',
                          'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
                          'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela',
                          'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
                        ].map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <Label>Live Balance (USD)</Label>
                      <Input
                        type="number"
                        min="0"
                        value={formData.balance}
                        onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                        className="mt-2"
                        placeholder="0.00"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Sets the user's live trading balance directly</p>
                    </div>
                    <div>
                      <Label>Portfolio Balance (USD)</Label>
                      <Input
                        type="number"
                        min="0"
                        value={formData.portfolioBalance}
                        onChange={(e) => setFormData({ ...formData, portfolioBalance: e.target.value })}
                        className="mt-2"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label>IPO Balance (USD)</Label>
                      <Input
                        type="number"
                        min="0"
                        value={formData.ipoBalance}
                        onChange={(e) => setFormData({ ...formData, ipoBalance: e.target.value })}
                        className="mt-2"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label>ECN Balance (USD)</Label>
                      <Input
                        type="number"
                        min="0"
                        value={formData.ecnBalance}
                        onChange={(e) => setFormData({ ...formData, ecnBalance: e.target.value })}
                        className="mt-2"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label>Bonus Balance (USD)</Label>
                      <Input
                        type="number"
                        min="0"
                        value={formData.bonus}
                        onChange={(e) => setFormData({ ...formData, bonus: e.target.value })}
                        className="mt-2"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label>Credit Balance (USD)</Label>
                      <Input
                        type="number"
                        min="0"
                        value={formData.credit}
                        onChange={(e) => setFormData({ ...formData, credit: e.target.value })}
                        className="mt-2"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label>Account Type</Label>
                      <select
                        value={formData.accountType}
                        onChange={(e) => setFormData({ ...formData, accountType: e.target.value as any })}
                        className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                      >
                        <option value="standard">Standard</option>
                        <option value="premium">Premium</option>
                        <option value="vip">VIP</option>
                      </select>
                    </div>
                    <div>
                      <Label>KYC Status</Label>
                      <select
                        value={formData.kycStatus}
                        onChange={(e) => setFormData({ ...formData, kycStatus: e.target.value as any })}
                        className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                      >
                        <option value="pending">Pending</option>
                        <option value="verified">Verified</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                    <div>
                      <Label>Subscription Plan</Label>
                      <select
                        value={formData.subscriptionPlan}
                        onChange={(e) => setFormData({ ...formData, subscriptionPlan: e.target.value })}
                        className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                      >
                        <option value="">— No Plan —</option>
                        {SUBSCRIPTION_PLANS.map(p => (
                          <option key={p.value} value={p.value}>
                            {p.label} — ${formatCurrency(p.minDeposit)} min deposit
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center gap-2 mt-8">
                      <input
                        type="checkbox"
                        id="isVerified"
                        checked={formData.isVerified}
                        onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="isVerified" className="cursor-pointer">Email Verified</Label>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={handleSave} className="flex-1">
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setShowDialog(false)} className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Fund Dialog */}
      <Dialog open={showAddFundDialog} onOpenChange={setShowAddFundDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Add Funds to User
            </DialogTitle>
            <DialogDescription>
              Add funds to the user's account
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <p className="mt-1">{selectedUser.firstName} {selectedUser.lastName}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="mt-1">{selectedUser.email}</p>
                </div>
                <div>
                  <Label>Live Balance</Label>
                  <p className="mt-1 text-green-600">${formatCurrency(selectedUser.liveBalance ?? 0)}</p>
                </div>
                <div>
                  <Label>Portfolio Balance</Label>
                  <p className="mt-1 text-emerald-600">${formatCurrency(selectedUser.investmentBalances?.portfolio || 0)}</p>
                </div>
                <div>
                  <Label>IPO Balance</Label>
                  <p className="mt-1 text-purple-600">${formatCurrency(selectedUser.investmentBalances?.ipo || 0)}</p>
                </div>
                <div>
                  <Label>ECN Balance</Label>
                  <p className="mt-1 text-blue-600">${formatCurrency(selectedUser.investmentBalances?.ecn || 0)}</p>
                </div>
                <div>
                  <Label>Credit Balance</Label>
                  <p className="mt-1 text-blue-600">${formatCurrency(selectedUser.credit || 0)}</p>
                </div>
                <div>
                  <Label>Bonus Balance</Label>
                  <p className="mt-1 text-emerald-600">${formatCurrency(selectedUser.bonus || 0)}</p>
                </div>
                <div>
                  <Label>Account Type</Label>
                  <p className="mt-1 capitalize">{selectedUser.accountType}</p>
                </div>
                <div>
                  <Label>KYC Status</Label>
                  <p className="mt-1 capitalize">{selectedUser.kycStatus}</p>
                </div>
                <div>
                  <Label>Email Verified</Label>
                  <p className="mt-1">{selectedUser.isVerified ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <Label>Joined</Label>
                  <p className="mt-1">{new Date(selectedUser.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    value={addFundData.amount}
                    onChange={(e) => setAddFundData({ ...addFundData, amount: e.target.value })}
                    className="mt-2"
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <Label>Balance Type</Label>
                  <select
                    value={addFundData.balanceType}
                    onChange={(e) => setAddFundData({ ...addFundData, balanceType: e.target.value as any })}
                    className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                  >
                    <option value="live">💰 Live Balance (Trading Account)</option>
                    <option value="bonus">🎁 Bonus Balance (Free Trading Funds)</option>
                    <option value="credit">💳 Credit Balance (Repayable Funds)</option>
                    <option value="portfolio">💼 Portfolio Balance (Investment Portfolio)</option>
                    <option value="ipo">🏢 IPO Balance (Investment Funds)</option>
                    <option value="ecn">📊 ECN Balance (Trading Funds)</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs text-gray-500 bg-gray-50 dark:bg-slate-700/50 p-2 rounded border border-gray-100 dark:border-slate-600">
                    {addFundData.balanceType === 'live' && 'Adds directly to the main live trading balance.'}
                    {addFundData.balanceType === 'bonus' && 'Bonus funds are free and appear in the user wallet for trading.'}
                    {addFundData.balanceType === 'credit' && 'Credit funds must be repaid by the user eventually.'}
                    {addFundData.balanceType === 'portfolio' && 'Portfolio balance is used specifically for investments.'}
                    {addFundData.balanceType === 'ipo' && 'IPO balance is used for new investment opportunities.'}
                    {addFundData.balanceType === 'ecn' && 'ECN balance is used for specialized ECN trading.'}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleAddFund} className="flex-1">
                  Add Funds
                </Button>
                <Button variant="outline" onClick={() => setShowAddFundDialog(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Deduct Fund Dialog */}
      <Dialog open={showDeductFundDialog} onOpenChange={setShowDeductFundDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Deduct Funds</DialogTitle>
            <DialogDescription>
              Deduct funds directly from user account balances. No notification will be sent.
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6 pt-4">
              <div className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">User:</span>
                  <span className="font-semibold">{selectedUser.firstName} {selectedUser.lastName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 capitalize">{deductFundData.balanceType === 'live' ? 'Main' : deductFundData.balanceType} Balance:</span>
                  <span className={`font-semibold ${getCurrentDeductBalance() > 0 ? 'text-blue-600' : 'text-gray-400'}`}>
                    ${formatCurrency(getCurrentDeductBalance())}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Source Balance</Label>
                  <select
                    value={deductFundData.balanceType}
                    onChange={(e) => setDeductFundData({ ...deductFundData, balanceType: e.target.value as any })}
                    className="w-full mt-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                  >
                    <option value="live">💰 Live Balance</option>
                    <option value="credit">💳 Credit Balance (Deducted from Live)</option>
                    <option value="bonus">🎁 Bonus Balance (Deducted from Bonus Pool)</option>
                    <option value="portfolio">💼 Portfolio Balance</option>
                    <option value="ipo">🏢 IPO Balance</option>
                    <option value="ecn">📊 ECN Balance</option>
                  </select>
                </div>

                <div>
                  <Label>Amount to Deduct</Label>
                  <Input
                    type="number"
                    value={deductFundData.amount}
                    onChange={(e) => setDeductFundData({ ...deductFundData, amount: e.target.value })}
                    className="mt-2"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button onClick={handleDeductFund} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                  Deduct Funds
                </Button>
                <Button variant="outline" onClick={() => setShowDeductFundDialog(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment Methods Dialog */}
      {showPaymentMethodsDialog && paymentMethodsUserId && (
        <UserPaymentMethods
          userId={paymentMethodsUserId}
          onClose={() => {
            setShowPaymentMethodsDialog(false);
            setPaymentMethodsUserId(null);
          }}
        />
      )}

      {/* Password Reset Dialog */}
      <Dialog open={showPasswordResetDialog} onOpenChange={setShowPasswordResetDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Reset Password
            </DialogTitle>
            <DialogDescription>
              Reset the user's password
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <p className="mt-1">{selectedUser.firstName} {selectedUser.lastName}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="mt-1">{selectedUser.email}</p>
                </div>
                <div>
                  <Label>Account Type</Label>
                  <p className="mt-1 capitalize">{selectedUser.accountType}</p>
                </div>
                <div>
                  <Label>KYC Status</Label>
                  <p className="mt-1 capitalize">{selectedUser.kycStatus}</p>
                </div>
                <div>
                  <Label>Email Verified</Label>
                  <p className="mt-1">{selectedUser.isVerified ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <Label>Joined</Label>
                  <p className="mt-1">{new Date(selectedUser.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>New Password</Label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-2"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handlePasswordReset} className="flex-1">
                  Reset Password
                </Button>
                <Button variant="outline" onClick={() => setShowPasswordResetDialog(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── KYC Document Viewer Modal ───────────────────────────────────────── */}
      {viewDocModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
              <div>
                <p className="font-semibold">{viewDocModal.label}</p>
                <p className="text-xs text-gray-500">{viewDocModal.doc.name} · {(viewDocModal.doc.size / 1024).toFixed(1)} KB · Uploaded {new Date(viewDocModal.doc.uploadedAt).toLocaleDateString()}</p>
              </div>
              <button onClick={() => setViewDocModal(null)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-gray-50 dark:bg-slate-900">
              {viewDocModal.doc.type.startsWith('image/') ? (
                <img src={viewDocModal.doc.dataUrl} alt={viewDocModal.doc.name} className="max-w-full max-h-full rounded-lg object-contain" />
              ) : (
                <div className="text-center">
                  <FileText className="w-16 h-16 mx-auto mb-3 text-gray-400" />
                  <p className="text-sm text-gray-500 mb-3">PDF document: {viewDocModal.doc.name}</p>
                  <a href={viewDocModal.doc.dataUrl} download={viewDocModal.doc.name} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                    Download to view
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}