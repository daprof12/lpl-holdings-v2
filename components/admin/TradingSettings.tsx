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
import { supabase } from '../../utils/supabase/client';

interface TradingSettings {
  defaultLiveBalance: number;
}

export default function TradingSettings() {
  const { users, updateUser } = useAuth();
  const { addNotification } = useNotifications();
  const [settings, setSettings] = useState<TradingSettings>({
    defaultLiveBalance: 0,
  });
  const [selectedLiveUserId, setSelectedLiveUserId] = useState<string>('');
  const [customLiveBalance, setCustomLiveBalance] = useState<string>('10000');
  const [autoTradeEnabled, setAutoTradeEnabled] = useState<boolean>(false);
  const [signalEnabled, setSignalEnabled] = useState<boolean>(false);

  // Modal states for balance management
  const [modifyBalanceModal, setModifyBalanceModal] = useState(false);
  const [transferFundsModal, setTransferFundsModal] = useState(false);
  const [selectedUserForBalance, setSelectedUserForBalance] = useState<string>('');
  const [balanceType, setBalanceType] = useState<'wallet' | 'ecn' | 'ipo' | 'portfolio'>('wallet');
  const [balanceAmount, setBalanceAmount] = useState<string>('');
  const [transferFrom, setTransferFrom] = useState<'wallet' | 'ecn' | 'ipo' | 'portfolio'>('wallet');
  const [transferTo, setTransferTo] = useState<'wallet' | 'ecn' | 'ipo' | 'portfolio'>('ecn');
  const [transferAmount, setTransferAmount] = useState<string>('');

  // Load settings from database
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('global_settings')
          .select('*')
          .eq('id', 'global_settings')
          .maybeSingle();

        if (error) throw error;
        if (data) {
          if (data.trading_config) {
            setSettings(data.trading_config as TradingSettings);
          }
          setAutoTradeEnabled(!!data.trading_config?.autoTradeEnabled);
          setSignalEnabled(!!data.trading_config?.signalEnabled);
        }
      } catch (error) {
        console.error('Failed to load settings from DB:', error);
      }
    };

    loadSettings();
  }, []);

  const handleSaveSettings = async () => {
    try {
      const { error } = await supabase
        .from('global_settings')
        .upsert({ 
          id: 'global_settings',
          trading_config: { 
            ...settings, 
            autoTradeEnabled,
            signalEnabled 
          }
        });

      if (error) throw error;
      toast.success('Global trading settings saved to database');
    } catch (err) {
      console.error('Save failed:', err);
      toast.error('Failed to save settings');
    }
  };


  const handleResetUserLiveBalance = async () => {
    if (!selectedLiveUserId) {
      toast.error('Please select a user');
      return;
    }

    const balance = parseFloat(customLiveBalance);
    if (isNaN(balance) || balance < 0) {
      toast.error('Please enter a valid balance');
      return;
    }

    try {
      // 1. Update main user balance in relational DB
      await api.users.updateBalance(selectedLiveUserId, balance);
      
      // 2. Update Trading Account record
      await api.tradingAccounts.update(selectedLiveUserId, {
        balance: balance,
        available_funds: balance,
        equity: balance
      });

      // 3. Clear positions/orders in DB (Assumes positions API exists for bulk clear if needed)
      // For now, we update local context
      updateUser(selectedLiveUserId, { balance: balance, liveBalance: balance });
      
      const user = users.find(u => u.id === selectedLiveUserId);
      toast.success(`Live balance reset to $${balance.toFixed(2)} for ${user?.email || 'user'}`);
      
      // Send notification to user
      addNotification(selectedLiveUserId, {
        type: 'warning',
        title: 'Balance Reset',
        message: `Your live balance has been reset to $${formatCurrency(balance)}.`,
        channels: ['in-app'],
      });
    } catch (err) {
      console.error('Failed to reset balance:', err);
      toast.error('Failed to reset balance in database');
    }
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

  const toggleInvestmentAccess = async (userId: string, enabled: boolean) => {
    try {
      await updateUser(userId, { hasInvestmentAccess: enabled });
      
      const user = users.find(u => u.id === userId);
      toast.success(
        `Investment access ${enabled ? 'enabled' : 'disabled'} for ${user?.email || 'user'}`
      );
    } catch (err) {
      console.error('Failed to toggle investment access:', err);
      toast.error('Failed to update access in database');
    }
  };

  const enableAllInvestmentAccess = async () => {
    if (!confirm('Are you sure you want to enable investment access for ALL users?')) {
      return;
    }

    try {
      const targetUsers = users.filter(u => u.role === 'user');
      await Promise.all(targetUsers.map(u => updateUser(u.id, { hasInvestmentAccess: true })));
      toast.success('Investment access enabled for all users');
    } catch (err) {
      console.error('Bulk update failed:', err);
      toast.error('Failed to update all users');
    }
  };

  const disableAllInvestmentAccess = async () => {
    if (!confirm('Are you sure you want to disable investment access for ALL users?')) {
      return;
    }

    try {
      const targetUsers = users.filter(u => u.role === 'user');
      await Promise.all(targetUsers.map(u => updateUser(u.id, { hasInvestmentAccess: false })));
      toast.success('Investment access disabled for all users');
    } catch (err) {
      console.error('Bulk update failed:', err);
      toast.error('Failed to update all users');
    }
  };

  // Helper function to get user balances from source of truth
  const getUserBalances = (userId: string) => {
    const user = users.find(u => u.id === userId);
    
    const walletBalance = user?.liveBalance ?? user?.balance ?? 0;
    const ecn = user?.investmentBalances?.ecn ?? 0;
    const ipo = user?.investmentBalances?.ipo ?? 0;
    const portfolio = user?.investmentBalances?.portfolio ?? 0;

    return { wallet: walletBalance, ecn, ipo, portfolio };
  };

  // Modify balance function
  const handleModifyBalance = async () => {
    if (!selectedUserForBalance || !balanceAmount) {
      toast.error('Please select a user and enter an amount');
      return;
    }

    const amount = parseFloat(balanceAmount);
    if (isNaN(amount) || amount < 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    try {
      if (balanceType === 'wallet') {
        // 1. Update per-user wallet account in DB
        await api.users.updateBalance(selectedUserForBalance, amount);
        await api.tradingAccounts.update(selectedUserForBalance, { 
          balance: amount, 
          available_funds: amount,
          equity: amount 
        });
        
        // 2. Sync to local context
        updateUser(selectedUserForBalance, { balance: amount, liveBalance: amount });
        
        toast.success(`Wallet balance updated to $${amount.toFixed(2)}`);
      } else {
        // Update ECN, IPO, or Portfolio balance in DB
        const updates = { [balanceType]: amount };
        await api.investmentWallets.update(selectedUserForBalance, updates);
        
        // Sync to local context
        const user = users.find(u => u.id === selectedUserForBalance);
        if (user) {
          const newInvestments = { ...(user.investmentBalances || { ipo: 0, ecn: 0, portfolio: 0 }), ...updates };
          updateUser(selectedUserForBalance, { investmentBalances: newInvestments });
        }
        
        toast.success(`${balanceType.toUpperCase()} balance updated to $${amount.toFixed(2)}`);
      }

      // Send notification
      addNotification(selectedUserForBalance, {
        type: 'info',
        title: 'Balance Updated',
        message: `Your ${balanceType === 'wallet' ? 'wallet' : balanceType.toUpperCase()} balance has been updated to $${formatCurrency(amount)}.`,
        channels: ['in-app'],
      });

      setModifyBalanceModal(false);
      setBalanceAmount('');
      setSelectedUserForBalance('');
    } catch (err) {
      console.error('Modify balance failed:', err);
      toast.error('Failed to update balance in database');
    }
  };

  // Transfer funds function
  const handleTransferFunds = async () => {
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

    try {
      const user = users.find(u => u.id === selectedUserForBalance);
      const balances = getUserBalances(selectedUserForBalance);

      if (balances[transferFrom] < amount) {
        toast.error(`Insufficient balance in ${transferFrom} wallet`);
        return;
      }

      // 1. Deduct from source
      if (transferFrom === 'wallet') {
        const newVal = balances.wallet - amount;
        await api.users.updateBalance(selectedUserForBalance, newVal);
        await api.tradingAccounts.update(selectedUserForBalance, { balance: newVal, available_funds: newVal, equity: newVal });
      } else {
        await api.investmentWallets.update(selectedUserForBalance, { [transferFrom]: balances[transferFrom] - amount });
      }

      // 2. Add to destination
      if (transferTo === 'wallet') {
        const newVal = balances.wallet + amount;
        await api.users.updateBalance(selectedUserForBalance, newVal);
        await api.tradingAccounts.update(selectedUserForBalance, { balance: newVal, available_funds: newVal, equity: newVal });
      } else {
        await api.investmentWallets.update(selectedUserForBalance, { [transferTo]: balances[transferTo] + amount });
      }

      // 3. Update local context
      const newBalances = { ...balances };
      newBalances[transferFrom] -= amount;
      newBalances[transferTo] += amount;
      
      updateUser(selectedUserForBalance, { 
        balance: newBalances.wallet, 
        liveBalance: newBalances.wallet,
        investmentBalances: { ipo: newBalances.ipo, ecn: newBalances.ecn, portfolio: newBalances.portfolio }
      });

      toast.success(`Transferred $${amount.toFixed(2)} from ${transferFrom} to ${transferTo}`);
      
      setTransferFundsModal(false);
      setTransferAmount('');
      setSelectedUserForBalance('');
    } catch (err) {
      console.error('Transfer failed:', err);
      toast.error('Failed to process transfer in database');
    }
  };

  // Toggle Auto Trade Feature
  const toggleAutoTrade = async (enabled: boolean) => {
    setAutoTradeEnabled(enabled);
    try {
      await supabase.from('global_settings').upsert({
        id: 'global_settings',
        trading_config: { ...settings, autoTradeEnabled: enabled, signalEnabled }
      });
      toast.success(`Auto Trade feature ${enabled ? 'enabled' : 'disabled'} globally`);
    } catch (e) {
      toast.error('Failed to update auto trade setting');
    }
  };

  // Toggle Signal Feature
  const toggleSignal = async (enabled: boolean) => {
    setSignalEnabled(enabled);
    try {
      await supabase.from('global_settings').upsert({
        id: 'global_settings',
        trading_config: { ...settings, autoTradeEnabled, signalEnabled: enabled }
      });
      toast.success(`Signal feature ${enabled ? 'enabled' : 'disabled'} globally`);
    } catch (e) {
      toast.error('Failed to update signal setting');
    }
  };

  // Toggle Auto Trade Access for individual user
  const toggleAutoTradeAccess = async (userId: string, enabled: boolean) => {
    try {
      await updateUser(userId, { hasAutoTradeAccess: enabled });
      
      const user = users.find(u => u.id === userId);
      toast.success(
        `Auto Trade access ${enabled ? 'enabled' : 'disabled'} for ${user?.email || 'user'}`
      );
    } catch (err) {
      console.error('Toggle failed:', err);
      toast.error('Update failed');
    }
  };

  // Toggle Signal Access for individual user
  const toggleSignalAccess = async (userId: string, enabled: boolean) => {
    try {
      await updateUser(userId, { hasSignalAccess: enabled });
      
      const user = users.find(u => u.id === userId);
      toast.success(
        `Signal access ${enabled ? 'enabled' : 'disabled'} for ${user?.email || 'user'}`
      );
    } catch (err) {
      console.error('Toggle failed:', err);
      toast.error('Update failed');
    }
  };

  // Bulk updates mapping to relational flags
  const enableAllAutoTradeAccess = async () => {
    if (!confirm('Are you sure?')) return;
    try {
      const targets = users.filter(u => u.role === 'user');
      await Promise.all(targets.map(u => updateUser(u.id, { hasAutoTradeAccess: true })));
      toast.success('Enabled for all');
    } catch (e) { toast.error('Bulk update failed'); }
  };

  const disableAllAutoTradeAccess = async () => {
    if (!confirm('Are you sure?')) return;
    try {
      const targets = users.filter(u => u.role === 'user');
      await Promise.all(targets.map(u => updateUser(u.id, { hasAutoTradeAccess: false })));
      toast.success('Disabled for all');
    } catch (e) { toast.error('Bulk update failed'); }
  };

  const enableAllSignalAccess = async () => {
    if (!confirm('Are you sure?')) return;
    try {
      const targets = users.filter(u => u.role === 'user');
      await Promise.all(targets.map(u => updateUser(u.id, { hasSignalAccess: true })));
      toast.success('Enabled for all');
    } catch (e) { toast.error('Bulk update failed'); }
  };

  const disableAllSignalAccess = async () => {
    if (!confirm('Are you sure?')) return;
    try {
      const targets = users.filter(u => u.role === 'user');
      await Promise.all(targets.map(u => updateUser(u.id, { hasSignalAccess: false })));
      toast.success('Disabled for all');
    } catch (e) { toast.error('Bulk update failed'); }
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
                    <th className="text-right py-3 px-4 text-sm font-semibold">IPO</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold">ECN</th>
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
                          <span className="font-semibold text-purple-600 dark:text-purple-400">
                            ${formatCurrency(balances.ipo)}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="font-semibold text-green-600 dark:text-green-400">
                            ${formatCurrency(balances.ecn)}
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
                  <Label htmlFor="investmentAccess" className="mb-2 block">
                    Investment Access
                  </Label>
                  <div className="flex items-center">
                    <Button 
                      onClick={() => toggleInvestmentAccess(selectedLiveUserId, true)} 
                      className="w-full"
                      variant="outline"
                      disabled={!selectedLiveUserId}
                    >
                      <Unlock className="w-4 h-4 mr-2" />
                      Enable Investment Access
                    </Button>
                    <Button 
                      onClick={() => toggleInvestmentAccess(selectedLiveUserId, false)} 
                      className="w-full"
                      variant="outline"
                      disabled={!selectedLiveUserId}
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
                            {user.hasInvestmentAccess ? 'Enabled' : 'Disabled'}
                          </span>
                          <Switch
                            checked={user.hasInvestmentAccess || false}
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
                  <Label htmlFor="autoTradeUserAccess" className="mb-2 block">
                    Auto Trade Access
                  </Label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      onClick={() => toggleAutoTradeAccess(selectedLiveUserId, true)} 
                      className="w-full"
                      variant="outline"
                      disabled={!selectedLiveUserId}
                    >
                      <Unlock className="w-4 h-4 mr-2" />
                      Enable Access
                    </Button>
                    <Button 
                      onClick={() => toggleAutoTradeAccess(selectedLiveUserId, false)} 
                      className="w-full"
                      variant="outline"
                      disabled={!selectedLiveUserId}
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
                            {user.hasAutoTradeAccess ? 'Enabled' : 'Disabled'}
                          </span>
                          <Switch
                            checked={user.hasAutoTradeAccess || false}
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
                  <Label htmlFor="signalUserAccess" className="mb-2 block">
                    Signal Access
                  </Label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      onClick={() => toggleSignalAccess(selectedLiveUserId, true)} 
                      className="w-full"
                      variant="outline"
                      disabled={!selectedLiveUserId}
                    >
                      <Unlock className="w-4 h-4 mr-2" />
                      Enable Access
                    </Button>
                    <Button 
                      onClick={() => toggleSignalAccess(selectedLiveUserId, false)} 
                      className="w-full"
                      variant="outline"
                      disabled={!selectedLiveUserId}
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
                            {user.hasSignalAccess ? 'Enabled' : 'Disabled'}
                          </span>
                          <Switch
                            checked={user.hasSignalAccess || false}
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
                  <option value="ipo">IPO Balance</option>
                  <option value="ecn">ECN Balance</option>
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
                  <option value="ipo">IPO Balance</option>
                  <option value="ecn">ECN Balance</option>
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
                  <option value="ipo">IPO Balance</option>
                  <option value="ecn">ECN Balance</option>
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