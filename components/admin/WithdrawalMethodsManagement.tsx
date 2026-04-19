import { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Building2, DollarSign, Wallet, Info } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import { api } from '../../utils/supabase/api';

// Extended withdrawal method interface
export interface CryptoAsset {
  assetType: string; // BTC, ETH, USDT, etc.
  network: string; // ERC20, TRC20, BEP20, etc.
  walletAddress: string;
  enabled: boolean;
}

export interface ExtendedWithdrawalMethod {
  id: string;
  userId: string;
  type: 'bank' | 'paypal' | 'crypto';
  isDefault: boolean;
  
  // New fields
  minWithdrawal?: number;
  maxWithdrawal?: number;
  feePercentage?: number;
  fixedFee?: number;
  processingTime?: string;
  instructionNote?: string;
  applyToAllUsers?: boolean;
  enabled: boolean;
  feeType?: 'percentage' | 'fixed';
  
  // Bank fields
  bankName?: string;
  accountHolderName?: string;
  accountNumber?: string;
  routingNumber?: string;
  iban?: string;
  swiftCode?: string;
  
  // PayPal fields
  paypalEmail?: string;
  
  // Crypto fields (legacy single crypto)
  cryptoType?: string;
  walletAddress?: string;
  network?: string;
  
  // New: Multiple crypto assets
  cryptoAssets?: CryptoAsset[];
}

// Available crypto assets with common networks
const CRYPTO_ASSETS = [
  {
    type: 'BTC',
    name: 'Bitcoin',
    networks: ['Bitcoin', 'Lightning Network']
  },
  {
    type: 'ETH',
    name: 'Ethereum',
    networks: ['ERC20']
  },
  {
    type: 'USDT',
    name: 'Tether',
    networks: ['ERC20', 'TRC20', 'BEP20', 'Polygon', 'Solana']
  },
  {
    type: 'USDC',
    name: 'USD Coin',
    networks: ['ERC20', 'TRC20', 'BEP20', 'Polygon', 'Solana']
  },
  {
    type: 'BNB',
    name: 'Binance Coin',
    networks: ['BEP20', 'BEP2']
  },
  {
    type: 'SOL',
    name: 'Solana',
    networks: ['Solana']
  },
  {
    type: 'ADA',
    name: 'Cardano',
    networks: ['Cardano']
  },
  {
    type: 'XRP',
    name: 'Ripple',
    networks: ['XRP Ledger']
  },
  {
    type: 'DOGE',
    name: 'Dogecoin',
    networks: ['Dogecoin']
  },
  {
    type: 'LTC',
    name: 'Litecoin',
    networks: ['Litecoin']
  }
];

export default function WithdrawalMethodsManagement() {
  const { users } = useAuth();
  const [withdrawalMethods, setWithdrawalMethods] = useState<ExtendedWithdrawalMethod[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'bank' | 'paypal' | 'crypto'>('all');
  const [selectedUser, setSelectedUser] = useState<string>('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<ExtendedWithdrawalMethod | null>(null);
  const [formData, setFormData] = useState<Partial<ExtendedWithdrawalMethod>>({});
  
  // Crypto assets state for add/edit dialog
  const [selectedCryptoAssets, setSelectedCryptoAssets] = useState<CryptoAsset[]>([]);

  // Filter out admin users
  const regularUsers = users.filter(user => user.role !== 'admin');

  // Load withdrawal methods from API
  const fetchMethods = async () => {
    try {
      const [userMethods, platMethods] = await Promise.all([
        api.withdrawalMethods.getAll(),
        api.paymentMethods.getAll()
      ]);

      let merged: ExtendedWithdrawalMethod[] = [];

      if (Array.isArray(userMethods)) {
        merged = [...merged, ...userMethods.map((m: any) => ({
          id: m.id,
          userId: m.user_id,
          type: m.type,
          isDefault: m.is_default,
          enabled: true, // User methods are generally active if they exist
          bankName: m.bank_name,
          accountHolderName: m.account_holder_name,
          accountNumber: m.account_number,
          routingNumber: m.routing_number,
          iban: m.iban,
          swiftCode: m.swift_code,
          paypalEmail: m.paypal_email,
          walletAddress: m.crypto_address,
          network: m.crypto_network,
          ...(m.details || {})
        }))];
      }

      if (Array.isArray(platMethods)) {
        // Filter those that are withdrawal methods
        const withdrawalPlat = platMethods.filter((m: any) => m.details?.isWithdrawal === true);
        merged = [...merged, ...withdrawalPlat.map((m: any) => ({
          id: m.id,
          userId: 'all-users',
          type: m.type,
          isDefault: false,
          enabled: m.is_active,
          minWithdrawal: m.min_amount,
          maxWithdrawal: m.max_amount,
          feePercentage: m.fee_percentage,
          feeType: m.details?.feeType || (m.details?.fixedFee > 0 ? 'fixed' : 'percentage'),
          fixedFee: m.details?.fixedFee || 0,
          processingTime: m.processing_time,
          applyToAllUsers: true,
          ...(m.details || {})
        }))];
      }

      setWithdrawalMethods(merged);
    } catch (error) {
      console.error('Failed to load withdrawal methods:', error);
      toast.error('Failed to load withdrawal methods');
    }
  };

  useEffect(() => {
    fetchMethods();
  }, []);

  const saveWithdrawalMethods = async (method: Partial<ExtendedWithdrawalMethod>, isUpdate = false) => {
    try {
      if (method.applyToAllUsers || method.userId === 'all-users') {
        const payload = {
          type: method.type,
          name: method.type === 'bank' ? (method.bankName || 'Bank Transfer') : (method.type === 'crypto' ? 'Crypto Tracker' : 'PayPal Vault'),
          is_active: method.enabled,
          min_amount: method.minWithdrawal,
          max_amount: method.maxWithdrawal,
          fee_percentage: method.feeType === 'percentage' ? (method.feePercentage || 0) : 0,
          processing_time: method.processingTime,
          details: {
            isWithdrawal: true,
            feeType: method.feeType || 'percentage',
            fixedFee: method.feeType === 'fixed' ? (method.fixedFee || 0) : 0,
            instructionNote: method.instructionNote,
            cryptoAssets: method.cryptoAssets,
            bankName: method.bankName,
          }
        };

        if (isUpdate && method.id) {
          await api.paymentMethods.update(method.id, payload);
        } else {
          await api.paymentMethods.create(payload);
        }
      } else {
        const payload = {
          user_id: method.userId,
          type: method.type,
          is_default: method.isDefault,
          bank_name: method.bankName,
          account_holder_name: method.accountHolderName,
          account_number: method.accountNumber,
          details: {
              feeType: method.feeType || 'percentage',
              minWithdrawal: method.minWithdrawal,
              maxWithdrawal: method.maxWithdrawal,
              feePercentage: method.feeType === 'percentage' ? (method.feePercentage || 0) : 0,
              fixedFee: method.feeType === 'fixed' ? (method.fixedFee || 0) : 0,
              processingTime: method.processingTime,
              instructionNote: method.instructionNote,
              cryptoAssets: method.cryptoAssets
           }
        };

        if (isUpdate && method.id) {
          await api.withdrawalMethods.update(method.id, payload);
        } else {
          await api.withdrawalMethods.create(payload);
        }
      }
      fetchMethods();
    } catch (error) {
      console.error('Failed to save withdrawal method:', error);
      toast.error('Failed to save withdrawal method');
    }
  };

  // Get user name by ID
  const getUserName = (userId: string) => {
    if (userId === 'all-users') return 'All Users';
    const user = users.find(u => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown User';
  };

  const getUserEmail = (userId: string) => {
    if (userId === 'all-users') return 'Platform-wide';
    const user = users.find(u => u.id === userId);
    return user?.email || 'N/A';
  };

  // Check if user is admin
  const isAdminUser = (userId: string) => {
    if (userId === 'all-users') return false;
    const user = users.find(u => u.id === userId);
    return user?.role === 'admin';
  };

  // Filter methods - exclude admin users
  const filteredMethods = withdrawalMethods.filter(method => {
    // Exclude methods belonging to admin users (but allow 'all-users')
    if (method.userId !== 'all-users' && isAdminUser(method.userId)) return false;
    
    const userName = getUserName(method.userId);
    const userEmail = getUserEmail(method.userId);
    
    const matchesSearch = 
      userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      method.bankName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      method.paypalEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      method.walletAddress?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || method.type === typeFilter;
    const matchesUser = selectedUser === 'all' || method.userId === selectedUser;
    
    return matchesSearch && matchesType && matchesUser;
  });

  // Initialize crypto assets when crypto type is selected
  const initializeCryptoAssets = () => {
    const assets: CryptoAsset[] = CRYPTO_ASSETS.map(asset => ({
      assetType: asset.type,
      network: asset.networks[0],
      walletAddress: '',
      enabled: false
    }));
    setSelectedCryptoAssets(assets);
  };

  const handleAddMethod = async () => {
    if (!formData.userId && !formData.applyToAllUsers) {
      toast.error('Please select a user and method type');
      return;
    }

    const method: Partial<ExtendedWithdrawalMethod> = {
      ...formData,
      enabled: true,
    };

    if (formData.type === 'crypto') {
      method.cryptoAssets = selectedCryptoAssets.filter(asset => asset.enabled);
    }

    await saveWithdrawalMethods(method);
    toast.success('Withdrawal method added successfully');
    setShowAddDialog(false);
    setFormData({});
    setSelectedCryptoAssets([]);
  };

  const handleEditMethod = async () => {
    if (!selectedMethod) return;

    const method: Partial<ExtendedWithdrawalMethod> = {
      ...selectedMethod,
      ...formData,
    };

    if (formData.type === 'crypto') {
      method.cryptoAssets = selectedCryptoAssets.filter(asset => asset.enabled);
    }

    await saveWithdrawalMethods(method, true);
    toast.success('Withdrawal method updated successfully');
    setShowEditDialog(false);
    setSelectedMethod(null);
    setFormData({});
    setSelectedCryptoAssets([]);
  };

  const handleDeleteMethod = async (id: string, isPlatform: boolean) => {
    if (!confirm('Are you sure you want to delete this withdrawal method?')) return;
    
    try {
      if (isPlatform) {
        await api.paymentMethods.delete(id);
      } else {
        await api.withdrawalMethods.delete(id);
      }
      toast.success('Withdrawal method deleted successfully');
      fetchMethods();
    } catch (error) {
      console.error('Failed to delete withdrawal method:', error);
      toast.error('Failed to delete withdrawal method');
    }
  };
  
  const handleToggleStatus = async (id: string, isPlatform: boolean, currentStatus: boolean) => {
    try {
      if (isPlatform) {
        await api.paymentMethods.update(id, { is_active: !currentStatus });
      } else {
        await api.withdrawalMethods.update(id, { enabled: !currentStatus });
      }
      toast.success('Withdrawal method status updated');
      fetchMethods();
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update status');
    }
  };

  const openAddDialog = () => {
    setFormData({});
    setSelectedCryptoAssets([]);
    setShowAddDialog(true);
  };

  const openEditDialog = (method: ExtendedWithdrawalMethod) => {
    setSelectedMethod(method);
    setFormData(method);
    
    // Load crypto assets if type is crypto
    if (method.type === 'crypto' && method.cryptoAssets) {
      setSelectedCryptoAssets(method.cryptoAssets);
    } else if (method.type === 'crypto') {
      initializeCryptoAssets();
    }
    
    setShowEditDialog(true);
  };

  // Handle crypto asset changes
  const handleCryptoAssetChange = (index: number, field: keyof CryptoAsset, value: any) => {
    const updated = [...selectedCryptoAssets];
    updated[index] = { ...updated[index], [field]: value };
    setSelectedCryptoAssets(updated);
  };

  // Get withdrawal methods for non-admin users only
  const nonAdminMethods = withdrawalMethods.filter(m => m.userId === 'all-users' || !isAdminUser(m.userId));

  const stats = {
    total: nonAdminMethods.length,
    bank: nonAdminMethods.filter(m => m.type === 'bank').length,
    paypal: nonAdminMethods.filter(m => m.type === 'paypal').length,
    crypto: nonAdminMethods.filter(m => m.type === 'crypto').length,
  };

  // Handle type change in form
  const handleTypeChange = (type: 'bank' | 'paypal' | 'crypto') => {
    setFormData({ ...formData, type });
    if (type === 'crypto') {
      initializeCryptoAssets();
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button onClick={openAddDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Add Method
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Methods</p>
          <p className="text-2xl mt-1">{stats.total}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-4 h-4 text-green-600" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Bank Accounts</p>
          </div>
          <p className="text-2xl">{stats.bank}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-blue-600" />
            <p className="text-sm text-gray-600 dark:text-gray-400">PayPal Accounts</p>
          </div>
          <p className="text-2xl">{stats.paypal}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-4 h-4 text-purple-600" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Crypto Wallets</p>
          </div>
          <p className="text-2xl">{stats.crypto}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by user, email, or details..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
          >
            <option value="all">All Types</option>
            <option value="bank">Bank Accounts</option>
            <option value="paypal">PayPal</option>
            <option value="crypto">Crypto Wallets</option>
          </select>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
          >
            <option value="all">All Users</option>
            <option value="all-users">Platform-wide Methods</option>
            {regularUsers.map(user => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Methods Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Details</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Limits & Fees</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {filteredMethods.map((method) => (
                <tr key={method.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold">{getUserName(method.userId)}</div>
                      <div className="text-sm text-gray-500">{getUserEmail(method.userId)}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {method.type === 'bank' && <Building2 className="w-4 h-4 text-green-600" />}
                      {method.type === 'paypal' && <DollarSign className="w-4 h-4 text-blue-600" />}
                      {method.type === 'crypto' && <Wallet className="w-4 h-4 text-purple-600" />}
                      <span className="capitalize">{method.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {method.type === 'bank' && (
                      <div className="text-sm text-gray-500">
                        Method Template
                      </div>
                    )}
                    {method.type === 'paypal' && (
                      <div className="text-sm text-gray-500">
                        Method Template
                      </div>
                    )}
                    {method.type === 'crypto' && (
                      <div className="text-sm">
                        {method.cryptoAssets && method.cryptoAssets.length > 0 ? (
                          <div>
                            <div className="font-semibold">{method.cryptoAssets.length} asset(s) enabled</div>
                            <div className="text-xs text-gray-500">
                              {method.cryptoAssets.map(a => a.assetType).join(', ')}
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">
                            Method Template
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs space-y-1">
                      <div className="text-gray-600 dark:text-gray-400">
                        Min: ${method.minWithdrawal || 0} / Max: ${method.maxWithdrawal || 0}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        Fee: {method.feeType === 'fixed' || method.fixedFee ? `$${method.fixedFee || 0}` : `${method.feePercentage || 0}%`}
                      </div>
                      {method.processingTime && (
                        <div className="text-gray-600 dark:text-gray-400">
                          {method.processingTime}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      {method.applyToAllUsers ? (
                        <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-xs rounded-full inline-block text-center">
                          Platform
                        </span>
                      ) : method.isDefault ? (
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-full inline-block text-center">
                          Default
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400 text-xs rounded-full inline-block text-center">
                          Active
                        </span>
                      )}
                      {/* Global availability indicator */}
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold text-center ${
                        method.enabled 
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' 
                          : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                      }`}>
                        {method.enabled ? 'ENABLED' : 'DISABLED'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleStatus(method.id, method.applyToAllUsers || method.userId === 'all-users', method.enabled)}
                      >
                        {method.enabled ? 'Disable' : 'Enable'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(method)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteMethod(method.id, method.applyToAllUsers || method.userId === 'all-users')}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredMethods.length === 0 && (
            <div className="text-center py-12">
              <Wallet className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No withdrawal methods found</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Method Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Withdrawal Method</DialogTitle>
            <DialogDescription>
              Add a new withdrawal method category or template. Platform-wide methods appear as options for all users to provide their own specific details.
            </DialogDescription>
          </DialogHeader>

          <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 mb-4">
            <div className="flex gap-2 text-xs text-amber-700 dark:text-amber-300">
              <Info className="w-4 h-4 flex-shrink-0" />
              <p>
                <strong>Tip:</strong> Users are usually responsible for providing their own specific withdrawal details (like PayPal email or bank info) during the withdrawal process. Use this tool mainly to define the <strong>types</strong> of withdrawals allowed, their fees, and limits.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Apply to all users checkbox */}
            <div className="flex items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <input
                type="checkbox"
                id="applyToAllUsers"
                checked={formData.applyToAllUsers || false}
                onChange={(e) => setFormData({ ...formData, applyToAllUsers: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="applyToAllUsers" className="cursor-pointer">
                Apply this withdrawal method to all users (Platform-wide)
              </Label>
            </div>

            {!formData.applyToAllUsers && (
              <div>
                <Label>Select User</Label>
                <select
                  value={formData.userId || ''}
                  onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                >
                  <option value="">Select a user...</option>
                  {regularUsers.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.firstName} {user.lastName} ({user.email})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <Label>Method Type</Label>
              <select
                value={formData.type || 'bank'}
                onChange={(e) => handleTypeChange(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
              >
                <option value="bank">Bank Account</option>
                <option value="paypal">PayPal</option>
                <option value="crypto">Crypto Wallet</option>
              </select>
            </div>

            {/* Common fields for all types */}
            <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
              <div>
                <Label>Minimum Withdrawal (USD)</Label>
                <Input
                  type="number"
                  value={formData.minWithdrawal || ''}
                  onChange={(e) => setFormData({ ...formData, minWithdrawal: parseFloat(e.target.value) || 0 })}
                  placeholder="10"
                />
              </div>
              <div>
                <Label>Maximum Withdrawal (USD)</Label>
                <Input
                  type="number"
                  value={formData.maxWithdrawal || ''}
                  onChange={(e) => setFormData({ ...formData, maxWithdrawal: parseFloat(e.target.value) || 0 })}
                  placeholder="10000"
                />
              </div>
              <div>
                <Label>Fee Type</Label>
                <select
                  value={formData.feeType || 'percentage'}
                  onChange={(e) => setFormData({ ...formData, feeType: e.target.value as 'percentage' | 'fixed' })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>
              {formData.feeType === 'fixed' ? (
                <div>
                  <Label>Fixed Fee (USD)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.fixedFee || ''}
                    onChange={(e) => setFormData({ ...formData, fixedFee: parseFloat(e.target.value) || 0 })}
                    placeholder="5.00"
                  />
                </div>
              ) : (
                <div>
                  <Label>Fee Percentage (%)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.feePercentage || ''}
                    onChange={(e) => setFormData({ ...formData, feePercentage: parseFloat(e.target.value) || 0 })}
                    placeholder="2.5"
                  />
                </div>
              )}
              <div className="md:col-span-2">
                <Label>Processing Time</Label>
                <Input
                  value={formData.processingTime || ''}
                  onChange={(e) => setFormData({ ...formData, processingTime: e.target.value })}
                  placeholder="e.g., 1-3 business days, Instant, 24 hours"
                />
              </div>
              <div className="md:col-span-2">
                <Label>Instruction Note</Label>
                <textarea
                  value={formData.instructionNote || ''}
                  onChange={(e) => setFormData({ ...formData, instructionNote: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 min-h-[80px]"
                  placeholder="Special instructions for users regarding this withdrawal method..."
                />
              </div>
            </div>

            {/* Bank and PayPal fields removed as admin just sets limits/fees */}
            
            {/* Crypto-specific fields */}
            {formData.type === 'crypto' && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-600 dark:text-blue-400">
                      <p className="font-semibold mb-1">Configure Crypto Assets</p>
                      <p>Enable the crypto assets you want to support and select their networks. Users will provide their own wallet addresses when withdrawing.</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-300 dark:border-slate-600 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 dark:bg-slate-700 px-4 py-3 border-b border-gray-300 dark:border-slate-600">
                    <h4 className="font-semibold">Available Crypto Assets</h4>
                  </div>
                  
                  <div className="max-h-[400px] overflow-y-auto">
                    {selectedCryptoAssets.map((asset, index) => {
                      const assetInfo = CRYPTO_ASSETS.find(a => a.type === asset.assetType);
                      return (
                        <div key={asset.assetType} className="p-4 border-b border-gray-200 dark:border-slate-600 last:border-b-0">
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={asset.enabled}
                              onChange={(e) => handleCryptoAssetChange(index, 'enabled', e.target.checked)}
                              className="w-5 h-5 mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="font-semibold">{assetInfo?.name} ({asset.assetType})</span>
                              </div>
                              
                              {asset.enabled && (
                                <div className="space-y-3 pl-2 border-l-2 border-blue-500">
                                  <div className="ml-3">
                                    <Label className="text-xs mb-2 block">Supported Networks</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                      {assetInfo?.networks.map(network => {
                                        const isChecked = asset.network?.includes(network);
                                        return (
                                          <label key={network} className="flex items-center gap-2 cursor-pointer text-sm">
                                            <input
                                              type="checkbox"
                                              checked={isChecked || false}
                                              onChange={(e) => {
                                                const currentNets = asset.network ? asset.network.split(',').map(n => n.trim()).filter(n => n) : [];
                                                let newNets = [...currentNets];
                                                if (e.target.checked && !newNets.includes(network)) newNets.push(network);
                                                if (!e.target.checked) newNets = newNets.filter(n => n !== network);
                                                handleCryptoAssetChange(index, 'network', newNets.join(', '));
                                              }}
                                              className="w-4 h-4 rounded border-gray-300"
                                            />
                                            {network}
                                          </label>
                                        );
                                      })}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Select all networks available for withdrawal. Users will specify their network when submitting requests.</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMethod}>
              Add Method
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Method Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Withdrawal Method</DialogTitle>
            <DialogDescription>
              Update withdrawal method configuration
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Common fields for all types */}
            <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
              <div>
                <Label>Minimum Withdrawal (USD)</Label>
                <Input
                  type="number"
                  value={formData.minWithdrawal || ''}
                  onChange={(e) => setFormData({ ...formData, minWithdrawal: parseFloat(e.target.value) || 0 })}
                  placeholder="10"
                />
              </div>
              <div>
                <Label>Maximum Withdrawal (USD)</Label>
                <Input
                  type="number"
                  value={formData.maxWithdrawal || ''}
                  onChange={(e) => setFormData({ ...formData, maxWithdrawal: parseFloat(e.target.value) || 0 })}
                  placeholder="10000"
                />
              </div>
              <div>
                <Label>Fee Type</Label>
                <select
                  value={formData.feeType || 'percentage'}
                  onChange={(e) => setFormData({ ...formData, feeType: e.target.value as 'percentage' | 'fixed' })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>
              {formData.feeType === 'fixed' ? (
                <div>
                  <Label>Fixed Fee (USD)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.fixedFee || ''}
                    onChange={(e) => setFormData({ ...formData, fixedFee: parseFloat(e.target.value) || 0 })}
                    placeholder="5.00"
                  />
                </div>
              ) : (
                <div>
                  <Label>Fee Percentage (%)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.feePercentage || ''}
                    onChange={(e) => setFormData({ ...formData, feePercentage: parseFloat(e.target.value) || 0 })}
                    placeholder="2.5"
                  />
                </div>
              )}
              <div className="md:col-span-2">
                <Label>Processing Time</Label>
                <Input
                  value={formData.processingTime || ''}
                  onChange={(e) => setFormData({ ...formData, processingTime: e.target.value })}
                  placeholder="e.g., 1-3 business days, Instant, 24 hours"
                />
              </div>
              <div className="md:col-span-2">
                <Label>Instruction Note</Label>
                <textarea
                  value={formData.instructionNote || ''}
                  onChange={(e) => setFormData({ ...formData, instructionNote: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 min-h-[80px]"
                  placeholder="Special instructions for users regarding this withdrawal method..."
                />
              </div>
            </div>

            {/* Edit modal Bank and Paypal forms removed - Admin sets Limits/Fees */}
            
            {/* Crypto-specific fields */}
            {formData.type === 'crypto' && selectedCryptoAssets.length > 0 && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-600 dark:text-blue-400">
                      <p className="font-semibold mb-1">Configure Crypto Assets</p>
                      <p>Enable the crypto assets you want to support and select their networks. Users will provide their own wallet addresses.</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-300 dark:border-slate-600 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 dark:bg-slate-700 px-4 py-3 border-b border-gray-300 dark:border-slate-600">
                    <h4 className="font-semibold">Available Crypto Assets</h4>
                  </div>
                  
                  <div className="max-h-[400px] overflow-y-auto">
                    {selectedCryptoAssets.map((asset, index) => {
                      const assetInfo = CRYPTO_ASSETS.find(a => a.type === asset.assetType);
                      return (
                        <div key={asset.assetType} className="p-4 border-b border-gray-200 dark:border-slate-600 last:border-b-0">
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={asset.enabled}
                              onChange={(e) => handleCryptoAssetChange(index, 'enabled', e.target.checked)}
                              className="w-5 h-5 mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="font-semibold">{assetInfo?.name} ({asset.assetType})</span>
                              </div>
                              
                              {asset.enabled && (
                                <div className="space-y-3 pl-2 border-l-2 border-blue-500">
                                  <div className="ml-3">
                                    <Label className="text-xs mb-2 block">Supported Networks</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                      {assetInfo?.networks.map(network => {
                                        const isChecked = asset.network?.includes(network);
                                        return (
                                          <label key={network} className="flex items-center gap-2 cursor-pointer text-sm">
                                            <input
                                              type="checkbox"
                                              checked={isChecked || false}
                                              onChange={(e) => {
                                                const currentNets = asset.network ? asset.network.split(',').map(n => n.trim()).filter(n => n) : [];
                                                let newNets = [...currentNets];
                                                if (e.target.checked && !newNets.includes(network)) newNets.push(network);
                                                if (!e.target.checked) newNets = newNets.filter(n => n !== network);
                                                handleCryptoAssetChange(index, 'network', newNets.join(', '));
                                              }}
                                              className="w-4 h-4 rounded border-gray-300"
                                            />
                                            {network}
                                          </label>
                                        );
                                      })}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Select all networks available for withdrawal. Users will specify their network when submitting requests.</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditMethod}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
