import { useState, useEffect } from 'react';
import { Settings, DollarSign, Users, RefreshCw, TrendingUp, Lock, Unlock, ArrowRightLeft, Plus, Edit, Bot, Activity } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { formatCurrency } from '../../utils/formatNumber';

interface TradingSettings {
  defaultPaperBalance: number;
  defaultLiveBalance: number;
}

export default function TradingSettings() {
  const { users, updateUser } = useAuth();
  const { addNotification } = useNotifications();
  const [settings, setSettings] = useState<TradingSettings>({
    defaultPaperBalance: 10000,
    defaultLiveBalance: 0,
  });
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [customBalance, setCustomBalance] = useState<string>('10000');
  const [selectedLiveUserId, setSelectedLiveUserId] = useState<string>('');
  const [customLiveBalance, setCustomLiveBalance] = useState<string>('10000');
  const [investmentAccess, setInvestmentAccess] = useState<Record<string, boolean>>({});
  const [autoTradeEnabled, setAutoTradeEnabled] = useState<boolean>(false);
  const [signalEnabled, setSignalEnabled] = useState<boolean>(false);
  const [autoTradeAccess, setAutoTradeAccess] = useState<Record<string, boolean>>({});
  const [signalAccess, setSignalAccess] = useState<Record<string, boolean>>({});

  // Modal states for balance management
  const [modifyBalanceModal, setModifyBalanceModal] = useState(false);
  const [transferFundsModal, setTransferFundsModal] = useState(false);
  const [selectedUserForBalance, setSelectedUserForBalance] = useState<string>('');
  const [balanceType, setBalanceType] = useState<'wallet' | 'ecn' | 'ipo' | 'portfolio'>('wallet');
  const [balanceAmount, setBalanceAmount] = useState<string>('');
  const [transferFrom, setTransferFrom] = useState<'wallet' | 'ecn' | 'ipo' | 'portfolio'>('wallet');
  const [transferTo, setTransferTo] = useState<'wallet' | 'ecn' | 'ipo' | 'portfolio'>('ecn');
  const [transferAmount, setTransferAmount] = useState<string>('');

  // Load settings from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('admin_trading_settings');
    if (stored) {
      try {
        setSettings(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load trading settings:', error);
      }
    }

    // Load investment access settings
    const storedAccess = localStorage.getItem('investment_access');
    if (storedAccess) {
      try {
        setInvestmentAccess(JSON.parse(storedAccess));
      } catch (error) {
        console.error('Failed to load investment access:', error);
      }
    }

    // Load auto trade and signal feature settings
    const storedAutoTrade = localStorage.getItem('auto_trade_enabled');
    const storedSignal = localStorage.getItem('signal_enabled');
    if (storedAutoTrade !== null) {
      setAutoTradeEnabled(storedAutoTrade === 'true');
    }
    if (storedSignal !== null) {
      setSignalEnabled(storedSignal === 'true');
    }

    // Load auto trade and signal user access settings
    const storedAutoTradeAccess = localStorage.getItem('auto_trade_access');
    const storedSignalAccess = localStorage.getItem('signal_access');
    if (storedAutoTradeAccess) {
      try {
        setAutoTradeAccess(JSON.parse(storedAutoTradeAccess));
      } catch (error) {
        console.error('Failed to load auto trade access:', error);
      }
    }
    if (storedSignalAccess) {
      try {
        setSignalAccess(JSON.parse(storedSignalAccess));
      } catch (error) {
        console.error('Failed to load signal access:', error);
      }
    }
  }, []);

  const handleSaveSettings = () => {
    localStorage.setItem('admin_trading_settings', JSON.stringify(settings));
    toast.success('Default balances updated successfully (Paper & Live)');
    
    // Trigger a storage event so TradingContext picks up the change
    window.dispatchEvent(new Event('storage'));
  };

  const handleResetUserPaperBalance = () => {
    if (!selectedUserId) {
      toast.error('Please select a user');
      return;
    }

    const balance = parseFloat(customBalance);
    if (isNaN(balance) || balance < 0) {
      toast.error('Please enter a valid balance');
      return;
    }

    // Update the paper account for this user
    const paperAccount = {
      balance: balance,
      equity: balance,
      realizedPnL: 0,
      unrealizedPnL: 0,
      margin: 0,
      availableFunds: balance,
      bonus: 0,
    };

    localStorage.setItem('gross_paper_account', JSON.stringify(paperAccount));
    
    // Trigger storage event
    window.dispatchEvent(new Event('storage'));
    
    const user = users.find(u => u.id === selectedUserId);
    toast.success(`Paper balance reset to $${balance.toFixed(2)} for ${user?.email || 'user'}`);
  };

  const handleResetAllUsersPaperBalance = () => {
    if (!confirm(`Are you sure you want to reset ALL users' paper balance to $${settings.defaultPaperBalance.toFixed(2)}? This action cannot be undone.`)) {
      return;
    }

    const paperAccount = {
      balance: settings.defaultPaperBalance,
      equity: settings.defaultPaperBalance,
      realizedPnL: 0,
      unrealizedPnL: 0,
      margin: 0,
      availableFunds: settings.defaultPaperBalance,
      bonus: 0,
    };

    localStorage.setItem('gross_paper_account', JSON.stringify(paperAccount));
    
    // Clear all positions and orders
    localStorage.setItem('gross_paper_positions', JSON.stringify([]));
    localStorage.setItem('gross_paper_orders', JSON.stringify([]));
    
    // Trigger storage event
    window.dispatchEvent(new Event('storage'));
    
    toast.success(`All users' paper balances reset to $${settings.defaultPaperBalance.toFixed(2)}`);
  };

  const handleResetUserLiveBalance = () => {
    if (!selectedLiveUserId) {
      toast.error('Please select a user');
      return;
    }

    const balance = parseFloat(customLiveBalance);
    if (isNaN(balance) || balance < 0) {
      toast.error('Please enter a valid balance');
      return;
    }

    // Update the live account for this user specifically
    const liveAccount = {
      balance: balance,
      equity: balance,
      realizedPnL: 0,
      unrealizedPnL: 0,
      margin: 0,
      availableFunds: balance,
      bonus: 0,
    };

    localStorage.setItem(`gross_live_account_${selectedLiveUserId}`, JSON.stringify(liveAccount));
    // Also update global key for legacy support, but ideally per-user key is used
    localStorage.setItem('gross_live_account', JSON.stringify(liveAccount));
    
    // Update AuthContext user object so it's reflected in users list
    updateUser(selectedLiveUserId, { balance: balance, liveBalance: balance });
    
    // Trigger storage event
    window.dispatchEvent(new Event('storage'));
    
    const user = users.find(u => u.id === selectedLiveUserId);
    toast.success(`Live balance reset to $${balance.toFixed(2)} for ${user?.email || 'user'}`);
    
    // Send notification to user
    addNotification(selectedLiveUserId, {
      type: 'warning',
      title: 'Balance Reset',
      message: `Your live balance has been reset to $${formatCurrency(balance)} by admin.`,
      channels: ['in-app'],
    });
  };

  const handleResetAllUsersLiveBalance = () => {
    if (!confirm(`Are you sure you want to reset ALL users' live balance to $${settings.defaultLiveBalance.toFixed(2)}? This action cannot be undone.`)) {
      return;
    }

    const liveAccount = {
      balance: settings.defaultLiveBalance,
      equity: settings.defaultLiveBalance,
      realizedPnL: 0,
      unrealizedPnL: 0,
      margin: 0,
      availableFunds: settings.defaultLiveBalance,
      bonus: 0,
    };

    localStorage.setItem('gross_live_account', JSON.stringify(liveAccount));
    
    // Clear all positions and orders
    localStorage.setItem('gross_live_positions', JSON.stringify([]));
    localStorage.setItem('gross_live_orders', JSON.stringify([]));
    
    // Trigger storage event
    window.dispatchEvent(new Event('storage'));
    
    toast.success(`All users' live balances reset to $${settings.defaultLiveBalance.toFixed(2)}`);
  };

  const toggleInvestmentAccess = (userId: string, enabled: boolean) => {
    const updated = { ...investmentAccess, [userId]: enabled };
    setInvestmentAccess(updated);
    localStorage.setItem('investment_access', JSON.stringify(updated));
    
    // Trigger custom event for same-window updates
    window.dispatchEvent(new CustomEvent('investment_access_changed', { 
      detail: { userId, enabled, accessMap: updated } 
    }));
    
    const user = users.find(u => u.id === userId);
    toast.success(
      `Investment access ${enabled ? 'enabled' : 'disabled'} for ${user?.email || 'user'}`
    );
  };

  const enableAllInvestmentAccess = () => {
    if (!confirm('Are you sure you want to enable investment access for ALL users?')) {
      return;
    }

    const updated: Record<string, boolean> = {};
    users.filter(u => u.role === 'user').forEach(user => {
      updated[user.id] = true;
    });

    setInvestmentAccess(updated);
    localStorage.setItem('investment_access', JSON.stringify(updated));
    
    // Trigger custom event for same-window updates
    window.dispatchEvent(new CustomEvent('investment_access_changed', { 
      detail: { accessMap: updated } 
    }));
    
    toast.success('Investment access enabled for all users');
  };

  const disableAllInvestmentAccess = () => {
    if (!confirm('Are you sure you want to disable investment access for ALL users?')) {
      return;
    }

    setInvestmentAccess({});
    localStorage.setItem('investment_access', JSON.stringify({}));
    
    // Trigger custom event for same-window updates
    window.dispatchEvent(new CustomEvent('investment_access_changed', { 
      detail: { accessMap: {} } 
    }));
    
    toast.success('Investment access disabled for all users');
  };

  // Helper function to get user balances
  const getUserBalances = (userId: string) => {
    // Try per-user key first, fallback to AuthContext's users array
    const storedLive = localStorage.getItem(`gross_live_account_${userId}`);
    let walletBalance = 0;
    
    if (storedLive) {
      walletBalance = JSON.parse(storedLive).balance;
    } else {
      const user = users.find(u => u.id === userId);
      walletBalance = user?.balance ?? (user?.liveBalance ?? 0);
    }

    // Get ECN and IPO balances
    const investmentBalances = localStorage.getItem(`investment_balances_${userId}`);
    const { ecn = 5000, ipo = 3000, portfolio = 0 } = investmentBalances ? JSON.parse(investmentBalances) : {};

    return { wallet: walletBalance, ecn, ipo, portfolio };
  };

  // Modify balance function
  const handleModifyBalance = () => {
    if (!selectedUserForBalance || !balanceAmount) {
      toast.error('Please select a user and enter an amount');
      return;
    }

    const amount = parseFloat(balanceAmount);
    if (isNaN(amount) || amount < 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    const user = users.find(u => u.id === selectedUserForBalance);
    
    if (balanceType === 'wallet') {
      // Update per-user wallet account
      const liveAccount = {
        balance: amount,
        equity: amount,
        realizedPnL: 0,
        unrealizedPnL: 0,
        margin: 0,
        availableFunds: amount,
        bonus: 0,
      };
      
      localStorage.setItem(`gross_live_account_${selectedUserForBalance}`, JSON.stringify(liveAccount));
      // For backwards compat and real-time triggers
      localStorage.setItem('gross_live_account', JSON.stringify(liveAccount));
      
      // Sync to main user record
      updateUser(selectedUserForBalance, { balance: amount, liveBalance: amount });
      
      window.dispatchEvent(new Event('storage'));
      toast.success(`Wallet balance updated to $${amount.toFixed(2)} for ${user?.email || 'user'}`);
      
      // Send notification to user
      addNotification(selectedUserForBalance, {
        type: 'info',
        title: 'Balance Updated',
        message: `Your wallet balance has been updated to $${formatCurrency(amount)} by admin.`,
        channels: ['in-app'],
      });
    } else {
      // Update ECN or IPO balance
      const balances = getUserBalances(selectedUserForBalance);
      balances[balanceType] = amount;
      localStorage.setItem(`investment_balances_${selectedUserForBalance}`, JSON.stringify({ 
        ecn: balances.ecn, 
        ipo: balances.ipo, 
        portfolio: balances.portfolio 
      }));
      
      // Also update portfolio/balance record in User if needed (usually it's separate)
      
      window.dispatchEvent(new Event('storage'));
      toast.success(`${balanceType.toUpperCase()} balance updated to $${amount.toFixed(2)} for ${user?.email || 'user'}`);
      
      // Send notification to user
      addNotification(selectedUserForBalance, {
        type: 'info',
        title: 'Balance Updated',
        message: `Your ${balanceType.toUpperCase()} balance has been updated to $${formatCurrency(amount)} by admin.`,
        channels: ['in-app'],
      });
    }

    setModifyBalanceModal(false);
    setBalanceAmount('');
    setSelectedUserForBalance('');
  };

  // Transfer funds function
  const handleTransferFunds = () => {
    if (!selectedUserForBalance || !transferAmount) {
      toast.error('Please select a user and enter an amount');
      return;
    }

    const amount = parseFloat(transferAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (transferFrom === transferTo) {
      toast.error('Cannot transfer to the same wallet');
      return;
    }

    const user = users.find(u => u.id === selectedUserForBalance);
    const balances = getUserBalances(selectedUserForBalance);

    if (balances[transferFrom] < amount) {
      toast.error(`Insufficient balance in ${transferFrom} wallet`);
      return;
    }

    // Deduct from source
    balances[transferFrom] -= amount;
    // Add to destination
    balances[transferTo] += amount;

    // Update localStorage with per-user key
    if (transferFrom === 'wallet' || transferTo === 'wallet') {
      const liveAccount = {
        balance: balances.wallet,
        equity: balances.wallet,
        realizedPnL: 0,
        unrealizedPnL: 0,
        margin: 0,
        availableFunds: balances.wallet,
        bonus: 0,
      };
      localStorage.setItem(`gross_live_account_${selectedUserForBalance}`, JSON.stringify(liveAccount));
      // Fallback/Legacy
      localStorage.setItem('gross_live_account', JSON.stringify(liveAccount));
      
      // Update global user record
      updateUser(selectedUserForBalance, { balance: balances.wallet, liveBalance: balances.wallet });
    }

    localStorage.setItem(`investment_balances_${selectedUserForBalance}`, JSON.stringify({ ecn: balances.ecn, ipo: balances.ipo, portfolio: balances.portfolio }));
    window.dispatchEvent(new Event('storage'));

    toast.success(`Transferred $${amount.toFixed(2)} from ${transferFrom} to ${transferTo} for ${user?.email || 'user'}`);
    
    setTransferFundsModal(false);
    setTransferAmount('');
    setSelectedUserForBalance('');
  };

  // Toggle Auto Trade Feature
  const toggleAutoTrade = (enabled: boolean) => {
    setAutoTradeEnabled(enabled);
    localStorage.setItem('auto_trade_enabled', String(enabled));
    window.dispatchEvent(new Event('storage'));
    toast.success(`Auto Trade feature ${enabled ? 'enabled' : 'disabled'} globally`);
  };

  // Toggle Signal Feature
  const toggleSignal = (enabled: boolean) => {
    setSignalEnabled(enabled);
    localStorage.setItem('signal_enabled', String(enabled));
    window.dispatchEvent(new Event('storage'));
    toast.success(`Signal feature ${enabled ? 'enabled' : 'disabled'} globally`);
  };

  // Toggle Auto Trade Access for individual user
  const toggleAutoTradeAccess = (userId: string, enabled: boolean) => {
    const updated = { ...autoTradeAccess, [userId]: enabled };
    setAutoTradeAccess(updated);
    localStorage.setItem('auto_trade_access', JSON.stringify(updated));
    
    // Trigger custom event for same-window updates
    window.dispatchEvent(new CustomEvent('auto_trade_access_changed', { 
      detail: { userId, enabled, accessMap: updated } 
    }));
    
    const user = users.find(u => u.id === userId);
    toast.success(
      `Auto Trade access ${enabled ? 'enabled' : 'disabled'} for ${user?.email || 'user'}`
    );
  };

  // Toggle Signal Access for individual user
  const toggleSignalAccess = (userId: string, enabled: boolean) => {
    const updated = { ...signalAccess, [userId]: enabled };
    setSignalAccess(updated);
    localStorage.setItem('signal_access', JSON.stringify(updated));
    
    // Trigger custom event for same-window updates
    window.dispatchEvent(new CustomEvent('signal_access_changed', { 
      detail: { userId, enabled, accessMap: updated } 
    }));
    
    const user = users.find(u => u.id === userId);
    toast.success(
      `Signal access ${enabled ? 'enabled' : 'disabled'} for ${user?.email || 'user'}`
    );
  };

  // Enable All Auto Trade Access
  const enableAllAutoTradeAccess = () => {
    if (!confirm('Are you sure you want to enable Auto Trade access for ALL users?')) {
      return;
    }

    const updated: Record<string, boolean> = {};
    users.filter(u => u.role === 'user').forEach(user => {
      updated[user.id] = true;
    });

    setAutoTradeAccess(updated);
    localStorage.setItem('auto_trade_access', JSON.stringify(updated));
    
    // Trigger custom event for same-window updates
    window.dispatchEvent(new CustomEvent('auto_trade_access_changed', { 
      detail: { accessMap: updated } 
    }));
    
    toast.success('Auto Trade access enabled for all users');
  };

  // Disable All Auto Trade Access
  const disableAllAutoTradeAccess = () => {
    if (!confirm('Are you sure you want to disable Auto Trade access for ALL users?')) {
      return;
    }

    setAutoTradeAccess({});
    localStorage.setItem('auto_trade_access', JSON.stringify({}));
    
    // Trigger custom event for same-window updates
    window.dispatchEvent(new CustomEvent('auto_trade_access_changed', { 
      detail: { accessMap: {} } 
    }));
    
    toast.success('Auto Trade access disabled for all users');
  };

  // Enable All Signal Access
  const enableAllSignalAccess = () => {
    if (!confirm('Are you sure you want to enable Signal access for ALL users?')) {
      return;
    }

    const updated: Record<string, boolean> = {};
    users.filter(u => u.role === 'user').forEach(user => {
      updated[user.id] = true;
    });

    setSignalAccess(updated);
    localStorage.setItem('signal_access', JSON.stringify(updated));
    
    // Trigger custom event for same-window updates
    window.dispatchEvent(new CustomEvent('signal_access_changed', { 
      detail: { accessMap: updated } 
    }));
    
    toast.success('Signal access enabled for all users');
  };

  // Disable All Signal Access
  const disableAllSignalAccess = () => {
    if (!confirm('Are you sure you want to disable Signal access for ALL users?')) {
      return;
    }

    setSignalAccess({});
    localStorage.setItem('signal_access', JSON.stringify({}));
    
    // Trigger custom event for same-window updates
    window.dispatchEvent(new CustomEvent('signal_access_changed', { 
      detail: { accessMap: {} } 
    }));
    
    toast.success('Signal access disabled for all users');
  };

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Trading Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Configure default trading parameters and manage user balances
        </p>
      </div>

      <Tabs defaultValue="live">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="live">Live Account</TabsTrigger>
          <TabsTrigger value="investment">Investment</TabsTrigger>
          <TabsTrigger value="auto-trade">Auto Trade</TabsTrigger>
          <TabsTrigger value="signal">Signal</TabsTrigger>
        </TabsList>

        {/* Paper Account Tab Removed */}
        <TabsContent value="paper" style={{display: 'none'}}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Default Paper Balance Settings */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Default Paper Balance</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Starting balance for new paper trading accounts
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="defaultPaperBalance" className="mb-2 block">
                    Default Balance (USD)
                  </Label>
                  <Input
                    id="defaultPaperBalance"
                    type="number"
                    min="0"
                    step="1000"
                    value={settings.defaultPaperBalance}
                    onChange={(e) => setSettings({ ...settings, defaultPaperBalance: parseFloat(e.target.value) || 0 })}
                    className="text-lg"
                  />
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    New users will receive this amount when they start paper trading
                  </p>
                </div>

                <Button onClick={handleSaveSettings} className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Save Default Balance
                </Button>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Current Default:</strong> ${formatCurrency(settings.defaultPaperBalance)}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                  This only affects new accounts. Use the tools below to reset existing users.
                </p>
              </div>
            </div>

            {/* Reset Individual User Balance */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Reset User Balance</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Grant or reset paper balance for specific users
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="selectUser" className="mb-2 block">
                    Select User
                  </Label>
                  <select
                    id="selectUser"
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600"
                  >
                    <option value="">-- Select a user --</option>
                    {users.filter(u => u.role === 'user').map(user => (
                      <option key={user.id} value={user.id}>
                        {user.email} ({user.firstName} {user.lastName})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="customBalance" className="mb-2 block">
                    New Paper Balance (USD)
                  </Label>
                  <Input
                    id="customBalance"
                    type="number"
                    min="0"
                    step="1000"
                    value={customBalance}
                    onChange={(e) => setCustomBalance(e.target.value)}
                  />
                </div>

                <Button 
                  onClick={handleResetUserPaperBalance} 
                  className="w-full"
                  variant="outline"
                  disabled={!selectedUserId}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset User Paper Balance
                </Button>
              </div>

              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Note:</strong> This resets the paper trading account balance and clears positions
                </p>
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Bulk Actions</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Reset balances for all users (use with caution)
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleResetAllUsersPaperBalance}
                variant="destructive"
                className="flex-1"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset All Users to Default (${formatCurrency(settings.defaultPaperBalance)})
              </Button>
            </div>

            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="text-sm text-red-800 dark:text-red-200">
                <strong>Warning:</strong> This will reset ALL users' paper trading balances and clear their positions. This action cannot be undone.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="live">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Default Live Balance Settings */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border-2 border-green-200 dark:border-green-900">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Default Live Balance</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Starting balance for new live trading accounts
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="defaultLiveBalance" className="mb-2 block">
                    Default Balance (USD)
                  </Label>
                  <Input
                    id="defaultLiveBalance"
                    type="number"
                    min="0"
                    step="1000"
                    value={settings.defaultLiveBalance}
                    onChange={(e) => setSettings({ ...settings, defaultLiveBalance: parseFloat(e.target.value) || 0 })}
                    className="text-lg"
                  />
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    New users will receive this amount when they start live trading
                  </p>
                </div>

                <Button onClick={handleSaveSettings} className="w-full bg-green-600 hover:bg-green-700">
                  <Settings className="w-4 h-4 mr-2" />
                  Save Default Live Balance
                </Button>
              </div>

              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200">
                  <strong>Current Default:</strong> ${formatCurrency(settings.defaultLiveBalance)}
                </p>
                <p className="text-xs text-green-600 dark:text-green-300 mt-1">
                  This only affects new accounts. Use the tools below to reset existing users.
                </p>
              </div>
            </div>

            {/* Reset Individual User Live Balance */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border-2 border-green-200 dark:border-green-900">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Reset User Live Balance</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Grant or reset live balance for specific users
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="selectLiveUser" className="mb-2 block">
                    Select User
                  </Label>
                  <select
                    id="selectLiveUser"
                    value={selectedLiveUserId}
                    onChange={(e) => setSelectedLiveUserId(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600"
                  >
                    <option value="">-- Select a user --</option>
                    {users.filter(u => u.role === 'user').map(user => (
                      <option key={user.id} value={user.id}>
                        {user.email} ({user.firstName} {user.lastName})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="customLiveBalance" className="mb-2 block">
                    New Live Balance (USD)
                  </Label>
                  <Input
                    id="customLiveBalance"
                    type="number"
                    min="0"
                    step="1000"
                    value={customLiveBalance}
                    onChange={(e) => setCustomLiveBalance(e.target.value)}
                  />
                </div>

                <Button 
                  onClick={handleResetUserLiveBalance} 
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={!selectedLiveUserId}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset User Live Balance
                </Button>
              </div>

              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Note:</strong> This resets the live trading account balance and clears positions
                </p>
              </div>
            </div>
          </div>

          {/* Live Account Bulk Actions */}
          <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border-2 border-green-200 dark:border-green-900">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Live Account Bulk Actions</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Reset live balances for all users (use with caution)
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleResetAllUsersLiveBalance}
                variant="destructive"
                className="flex-1"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset All Users Live Balance to Default (${formatCurrency(settings.defaultLiveBalance)})
              </Button>
            </div>

            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="text-sm text-red-800 dark:text-red-200">
                <strong>Warning:</strong> This will reset ALL users' live trading balances and clear their positions. This action cannot be undone.
              </p>
            </div>
          </div>

          {/* User Balances Table */}
          <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border-2 border-green-200 dark:border-green-900">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">User Balances Management</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  View and manage wallet, ECN, and IPO balances for each user
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold">User</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Email</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold">Wallet</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold">ECN</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold">IPO</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold">Total</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.filter(u => u.role === 'user').map(user => {
                    const balances = getUserBalances(user.id);
                    const total = balances.wallet + balances.ecn + balances.ipo;
                    return (
                      <tr key={user.id} className="border-b border-gray-100 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/30">
                        <td className="py-4 px-4">
                          <div className="font-medium">{user.firstName} {user.lastName}</div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {user.email}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="font-semibold text-blue-600 dark:text-blue-400">
                            ${formatCurrency(balances.wallet)}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="font-semibold text-green-600 dark:text-green-400">
                            ${formatCurrency(balances.ecn)}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="font-semibold text-purple-600 dark:text-purple-400">
                            ${formatCurrency(balances.ipo)}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="font-bold text-gray-900 dark:text-gray-100">
                            ${formatCurrency(total)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedUserForBalance(user.id);
                                setModifyBalanceModal(true);
                              }}
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              Modify
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedUserForBalance(user.id);
                                setTransferFundsModal(true);
                              }}
                            >
                              <ArrowRightLeft className="w-3 h-3 mr-1" />
                              Transfer
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {users.filter(u => u.role === 'user').length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No users found
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="investment">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Investment Access Settings */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Investment Access</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Manage investment access for users
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="selectUser" className="mb-2 block">
                    Select User
                  </Label>
                  <select
                    id="selectUser"
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600"
                  >
                    <option value="">-- Select a user --</option>
                    {users.filter(u => u.role === 'user').map(user => (
                      <option key={user.id} value={user.id}>
                        {user.email} ({user.firstName} {user.lastName})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="investmentAccess" className="mb-2 block">
                    Investment Access
                  </Label>
                  <div className="flex items-center">
                    <Button 
                      onClick={() => toggleInvestmentAccess(selectedUserId, true)} 
                      className="w-full"
                      variant="outline"
                      disabled={!selectedUserId}
                    >
                      <Unlock className="w-4 h-4 mr-2" />
                      Enable Investment Access
                    </Button>
                    <Button 
                      onClick={() => toggleInvestmentAccess(selectedUserId, false)} 
                      className="w-full"
                      variant="outline"
                      disabled={!selectedUserId}
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Disable Investment Access
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Note:</strong> This controls whether a user can access investment features
                </p>
              </div>
            </div>

            {/* Bulk Investment Access Actions */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Bulk Investment Access Actions</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Manage investment access for all users (use with caution)
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={enableAllInvestmentAccess}
                  variant="destructive"
                  className="flex-1"
                >
                  <Unlock className="w-4 h-4 mr-2" />
                  Enable Investment Access for All Users
                </Button>
                <Button 
                  onClick={disableAllInvestmentAccess}
                  variant="destructive"
                  className="flex-1"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Disable Investment Access for All Users
                </Button>
              </div>

              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-sm text-red-800 dark:text-red-200">
                  <strong>Warning:</strong> This will enable or disable investment access for ALL users. This action cannot be undone.
                </p>
              </div>
            </div>
          </div>

          {/* User Investment Access List */}
          <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">User Investment Access</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Toggle investment access for each user
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold">User</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Email</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold">Investment Access</th>
                  </tr>
                </thead>
                <tbody>
                  {users.filter(u => u.role === 'user').map(user => (
                    <tr key={user.id} className="border-b border-gray-100 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/30">
                      <td className="py-4 px-4">
                        <div className="font-medium">{user.firstName} {user.lastName}</div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {user.email}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-3">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {investmentAccess[user.id] ? 'Enabled' : 'Disabled'}
                          </span>
                          <Switch
                            checked={investmentAccess[user.id] || false}
                            onCheckedChange={(checked) => toggleInvestmentAccess(user.id, checked)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {users.filter(u => u.role === 'user').length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No users found
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="auto-trade">
          {/* User Auto Trade Access Management */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Individual User Access Control */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Individual User Access</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Manage auto trade access per user
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="selectAutoTradeUser" className="mb-2 block">
                    Select User
                  </Label>
                  <select
                    id="selectAutoTradeUser"
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600"
                  >
                    <option value="">-- Select a user --</option>
                    {users.filter(u => u.role === 'user').map(user => (
                      <option key={user.id} value={user.id}>
                        {user.email} ({user.firstName} {user.lastName})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="autoTradeUserAccess" className="mb-2 block">
                    Auto Trade Access
                  </Label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      onClick={() => toggleAutoTradeAccess(selectedUserId, true)} 
                      className="w-full"
                      variant="outline"
                      disabled={!selectedUserId}
                    >
                      <Unlock className="w-4 h-4 mr-2" />
                      Enable Access
                    </Button>
                    <Button 
                      onClick={() => toggleAutoTradeAccess(selectedUserId, false)} 
                      className="w-full"
                      variant="outline"
                      disabled={!selectedUserId}
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Disable Access
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Note:</strong> Individual user settings override global settings
                </p>
              </div>
            </div>

            {/* Bulk User Access Actions */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Bulk User Access Actions</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Manage auto trade access for all users
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Button 
                  onClick={enableAllAutoTradeAccess}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Unlock className="w-4 h-4 mr-2" />
                  Enable Auto Trade for All Users
                </Button>
                <Button 
                  onClick={disableAllAutoTradeAccess}
                  variant="destructive"
                  className="w-full"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Disable Auto Trade for All Users
                </Button>
              </div>

              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>⚠️ Warning:</strong> This will enable or disable auto trade access for ALL users.
                </p>
              </div>
            </div>
          </div>

          {/* User Auto Trade Access List */}
          <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">User Auto Trade Access</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Toggle auto trade access for each user
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold">User</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Email</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold">Auto Trade Access</th>
                  </tr>
                </thead>
                <tbody>
                  {users.filter(u => u.role === 'user').map(user => (
                    <tr key={user.id} className="border-b border-gray-100 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/30">
                      <td className="py-4 px-4">
                        <div className="font-medium">{user.firstName} {user.lastName}</div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {user.email}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-3">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {autoTradeAccess[user.id] ? 'Enabled' : 'Disabled'}
                          </span>
                          <Switch
                            checked={autoTradeAccess[user.id] || false}
                            onCheckedChange={(checked) => toggleAutoTradeAccess(user.id, checked)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {users.filter(u => u.role === 'user').length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No users found
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="signal">
          {/* User Signal Access Management */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Individual User Access Control */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-cyan-100 dark:bg-cyan-900/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Individual User Access</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Manage signal access per user
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="selectSignalUser" className="mb-2 block">
                    Select User
                  </Label>
                  <select
                    id="selectSignalUser"
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600"
                  >
                    <option value="">-- Select a user --</option>
                    {users.filter(u => u.role === 'user').map(user => (
                      <option key={user.id} value={user.id}>
                        {user.email} ({user.firstName} {user.lastName})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="signalUserAccess" className="mb-2 block">
                    Signal Access
                  </Label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      onClick={() => toggleSignalAccess(selectedUserId, true)} 
                      className="w-full"
                      variant="outline"
                      disabled={!selectedUserId}
                    >
                      <Unlock className="w-4 h-4 mr-2" />
                      Enable Access
                    </Button>
                    <Button 
                      onClick={() => toggleSignalAccess(selectedUserId, false)} 
                      className="w-full"
                      variant="outline"
                      disabled={!selectedUserId}
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Disable Access
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Note:</strong> Individual user settings override global settings
                </p>
              </div>
            </div>

            {/* Bulk User Access Actions */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Bulk User Access Actions</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Manage signal access for all users
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Button 
                  onClick={enableAllSignalAccess}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Unlock className="w-4 h-4 mr-2" />
                  Enable Signal for All Users
                </Button>
                <Button 
                  onClick={disableAllSignalAccess}
                  variant="destructive"
                  className="w-full"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Disable Signal for All Users
                </Button>
              </div>

              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>⚠️ Warning:</strong> This will enable or disable signal access for ALL users.
                </p>
              </div>
            </div>
          </div>

          {/* User Signal Access List */}
          <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-cyan-100 dark:bg-cyan-900/20 flex items-center justify-center">
                <Activity className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">User Signal Access</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Toggle signal access for each user
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold">User</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Email</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold">Signal Access</th>
                  </tr>
                </thead>
                <tbody>
                  {users.filter(u => u.role === 'user').map(user => (
                    <tr key={user.id} className="border-b border-gray-100 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/30">
                      <td className="py-4 px-4">
                        <div className="font-medium">{user.firstName} {user.lastName}</div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {user.email}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-3">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {signalAccess[user.id] ? 'Enabled' : 'Disabled'}
                          </span>
                          <Switch
                            checked={signalAccess[user.id] || false}
                            onCheckedChange={(checked) => toggleSignalAccess(user.id, checked)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {users.filter(u => u.role === 'user').length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No users found
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modify Balance Modal */}
      {modifyBalanceModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Modify User Balance</h3>
            <div className="space-y-4">
              <div>
                <Label>Select Balance Type</Label>
                <select
                  value={balanceType}
                  onChange={(e) => setBalanceType(e.target.value as 'wallet' | 'ecn' | 'ipo' | 'portfolio')}
                  className="w-full mt-1 p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
                >
                  <option value="wallet">Wallet Balance</option>
                  <option value="portfolio">Portfolio Balance</option>
                  <option value="ecn">ECN Balance</option>
                  <option value="ipo">IPO Balance</option>
                </select>
              </div>
              <div>
                <Label>New Balance Amount (USD)</Label>
                <Input
                  type="number"
                  value={balanceAmount}
                  onChange={(e) => setBalanceAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="mt-1"
                  min="0"
                  step="100"
                />
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  User: <span className="font-semibold">{users.find(u => u.id === selectedUserForBalance)?.email || 'Unknown'}</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Current {balanceType} balance: <span className="font-semibold">${formatCurrency(getUserBalances(selectedUserForBalance)[balanceType])}</span>
                </p>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleModifyBalance} className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Update Balance
                </Button>
                <Button variant="outline" onClick={() => {
                  setModifyBalanceModal(false);
                  setBalanceAmount('');
                  setSelectedUserForBalance('');
                }} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transfer Funds Modal */}
      {transferFundsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Transfer Funds Between Wallets</h3>
            <div className="space-y-4">
              <div>
                <Label>From Wallet</Label>
                <select
                  value={transferFrom}
                  onChange={(e) => setTransferFrom(e.target.value as 'wallet' | 'ecn' | 'ipo' | 'portfolio')}
                  className="w-full mt-1 p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
                >
                  <option value="wallet">Wallet Balance</option>
                  <option value="portfolio">Portfolio Balance</option>
                  <option value="ecn">ECN Balance</option>
                  <option value="ipo">IPO Balance</option>
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Available: ${formatCurrency(getUserBalances(selectedUserForBalance)[transferFrom])}
                </p>
              </div>
              <div>
                <Label>To Wallet</Label>
                <select
                  value={transferTo}
                  onChange={(e) => setTransferTo(e.target.value as 'wallet' | 'ecn' | 'ipo' | 'portfolio')}
                  className="w-full mt-1 p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
                >
                  <option value="wallet">Wallet Balance</option>
                  <option value="portfolio">Portfolio Balance</option>
                  <option value="ecn">ECN Balance</option>
                  <option value="ipo">IPO Balance</option>
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Current: ${formatCurrency(getUserBalances(selectedUserForBalance)[transferTo])}
                </p>
              </div>
              <div>
                <Label>Transfer Amount (USD)</Label>
                <Input
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="mt-1"
                  min="0"
                  step="100"
                />
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  User: <span className="font-semibold">{users.find(u => u.id === selectedUserForBalance)?.email || 'Unknown'}</span>
                </p>
                {transferAmount && parseFloat(transferAmount) > 0 && (
                  <div className="mt-2 text-sm">
                    <p className="text-gray-600 dark:text-gray-400">
                      Transfer: <span className="font-semibold text-blue-600">${formatCurrency(parseFloat(transferAmount))}</span>
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      From: {transferFrom} → To: {transferTo}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <Button onClick={handleTransferFunds} className="flex-1">
                  <ArrowRightLeft className="w-4 h-4 mr-2" />
                  Transfer Funds
                </Button>
                <Button variant="outline" onClick={() => {
                  setTransferFundsModal(false);
                  setTransferAmount('');
                  setSelectedUserForBalance('');
                }} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}