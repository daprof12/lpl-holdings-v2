import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Building2, CreditCard, Wallet, Search } from 'lucide-react';
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
import { toast } from 'sonner';
import { api } from '../../utils/supabase/api';

export interface DepositMethod {
  id: string;
  type: 'crypto' | 'bank' | 'card';
  enabled: boolean;
  
  // Crypto fields
  cryptoType?: string; // BTC, ETH, USDT, etc.
  walletAddress?: string;
  network?: string;
  qrCode?: string;
  minDeposit?: number;
  depositFeeType?: 'percentage' | 'fixed'; // Fee type for deposits
  depositFee?: number; // Fee amount (% or fixed USD)
  withdrawalFeeType?: 'percentage' | 'fixed'; // Fee type for withdrawals
  withdrawalFee?: number; // Fee amount (% or fixed USD)
  
  // Bank fields
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
  routingNumber?: string;
  swiftCode?: string;
  iban?: string;
  bankAddress?: string;
  
  // Card/Payment Processor fields
  processorName?: string; // Stripe, PayPal, etc.
  processorType?: string; // credit_card, debit_card
  publicKey?: string;
  merchantId?: string;
  processingFee?: number; // percentage
  notes?: string;
}

export default function DepositMethodsManagement() {
  const [depositMethods, setDepositMethods] = useState<DepositMethod[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'crypto' | 'bank' | 'card'>('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<DepositMethod | null>(null);
  const [methodType, setMethodType] = useState<'crypto' | 'bank' | 'card'>('crypto');
  const [formData, setFormData] = useState<Partial<DepositMethod>>({});

  // Load deposit methods from API
  const fetchMethods = async () => {
    try {
      const data = await api.paymentMethods.getAll();
      if (Array.isArray(data)) {
        const mapped = data.map((m: any) => ({
          id: m.id,
          type: m.type,
          enabled: m.is_active,
          cryptoType: m.currency,
          minDeposit: m.min_amount,
          processingFee: m.fee_percentage,
          notes: m.processing_time, // Using processing_time for notes as a fallback or if fits
          ...(m.details || {})
        }));
        setDepositMethods(mapped);
      }
    } catch (error) {
      console.error('Failed to load deposit methods:', error);
      toast.error('Failed to load deposit methods');
    }
  };

  useEffect(() => {
    fetchMethods();
  }, []);

  const saveDepositMethods = async (method: Partial<DepositMethod>, isUpdate = false) => {
    try {
      const payload = {
        type: method.type,
        name: method.type === 'crypto' ? method.cryptoType : (method.type === 'bank' ? method.bankName : method.processorName),
        currency: method.cryptoType || 'USD',
        is_active: method.enabled,
        min_amount: method.minDeposit || 0,
        fee_percentage: method.processingFee || 0,
        processing_time: method.notes || '',
        details: {
           walletAddress: method.walletAddress,
           network: method.network,
           qrCode: method.qrCode,
           depositFeeType: method.depositFeeType,
           depositFee: method.depositFee,
           withdrawalFeeType: method.withdrawalFeeType,
           withdrawalFee: method.withdrawalFee,
           bankName: method.bankName,
           accountName: method.accountName,
           accountNumber: method.accountNumber,
           routingNumber: method.routingNumber,
           swiftCode: method.swiftCode,
           iban: method.iban,
           bankAddress: method.bankAddress,
           processorName: method.processorName,
           processorType: method.processorType,
           publicKey: method.publicKey,
           merchantId: method.merchantId,
        }
      };

      if (isUpdate && method.id) {
        await api.paymentMethods.update(method.id, payload);
      } else {
        await api.paymentMethods.create(payload);
      }
      fetchMethods();
    } catch (error) {
      console.error('Failed to save deposit method:', error);
      toast.error('Failed to save deposit method');
    }
  };

  // Filter methods
  const filteredMethods = depositMethods.filter(method => {
    const matchesSearch = 
      method.cryptoType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      method.bankName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      method.processorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      method.walletAddress?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || method.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  const handleAddMethod = async () => {
    const newMethod: Partial<DepositMethod> = {
      type: methodType,
      enabled: true,
      ...formData,
    };

    await saveDepositMethods(newMethod);
    toast.success('Deposit method added successfully');
    setShowAddDialog(false);
    resetForm();
  };

  const handleEditMethod = async () => {
    if (!selectedMethod) return;

    await saveDepositMethods({ ...selectedMethod, ...formData }, true);
    toast.success('Deposit method updated successfully');
    setShowEditDialog(false);
    setSelectedMethod(null);
    resetForm();
  };

  const handleDeleteMethod = async (id: string) => {
    if (!confirm('Are you sure you want to delete this deposit method? Users will no longer be able to use it for deposits.')) return;
    
    try {
      await api.paymentMethods.delete(id);
      toast.success('Deposit method deleted successfully');
      fetchMethods();
    } catch (error) {
      console.error('Failed to delete deposit method:', error);
      toast.error('Failed to delete deposit method');
    }
  };

  const handleToggleStatus = async (id: string) => {
    const method = depositMethods.find(m => m.id === id);
    if (!method) return;

    try {
      await api.paymentMethods.update(id, { is_active: !method.enabled });
      toast.success('Deposit method status updated');
      fetchMethods();
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update status');
    }
  };

  const resetForm = () => {
    setFormData({});
  };

  const openAddDialog = (type: 'crypto' | 'bank' | 'card') => {
    resetForm();
    setMethodType(type);
    setShowAddDialog(true);
  };

  const openEditDialog = (method: DepositMethod) => {
    setSelectedMethod(method);
    setMethodType(method.type);
    setFormData(method);
    setShowEditDialog(true);
  };

  const stats = {
    total: depositMethods.length,
    crypto: depositMethods.filter(m => m.type === 'crypto').length,
    bank: depositMethods.filter(m => m.type === 'bank').length,
    card: depositMethods.filter(m => m.type === 'card').length,
    enabled: depositMethods.filter(m => m.enabled).length,
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Deposit Methods Management</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Configure platform deposit methods that users will use to fund their accounts
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Methods</p>
          <p className="text-2xl mt-1">{stats.total}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-4 h-4 text-purple-600" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Crypto Wallets</p>
          </div>
          <p className="text-2xl">{stats.crypto}</p>
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
            <CreditCard className="w-4 h-4 text-blue-600" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Card Processors</p>
          </div>
          <p className="text-2xl">{stats.card}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl">
          <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
          <p className="text-2xl mt-1 text-green-600">{stats.enabled}</p>
        </div>
      </div>

      {/* Add Method Buttons */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => openAddDialog('crypto')}
          className="p-6 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
        >
          <Wallet className="w-8 h-8 mx-auto mb-3 text-gray-400" />
          <div className="font-semibold mb-1">Add Crypto Wallet</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">BTC, ETH, USDT, etc.</div>
        </button>

        <button
          onClick={() => openAddDialog('bank')}
          className="p-6 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
        >
          <Building2 className="w-8 h-8 mx-auto mb-3 text-gray-400" />
          <div className="font-semibold mb-1">Add Bank Account</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Wire transfers, ACH, SEPA</div>
        </button>

        <button
          onClick={() => openAddDialog('card')}
          className="p-6 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
        >
          <CreditCard className="w-8 h-8 mx-auto mb-3 text-gray-400" />
          <div className="font-semibold mb-1">Add Card Processor</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Stripe, PayPal, etc.</div>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by crypto type, bank name, processor..."
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
            <option value="crypto">Crypto Wallets</option>
            <option value="bank">Bank Accounts</option>
            <option value="card">Card Processors</option>
          </select>
        </div>
      </div>

      {/* Methods List */}
      <div className="space-y-4">
        {filteredMethods.map((method) => (
          <div
            key={method.id}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-gray-200 dark:border-slate-700"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  method.type === 'crypto' ? 'bg-purple-100 dark:bg-purple-900/20' :
                  method.type === 'bank' ? 'bg-green-100 dark:bg-green-900/20' :
                  'bg-blue-100 dark:bg-blue-900/20'
                }`}>
                  {method.type === 'crypto' && <Wallet className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
                  {method.type === 'bank' && <Building2 className="w-6 h-6 text-green-600 dark:text-green-400" />}
                  {method.type === 'card' && <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-lg">
                      {method.type === 'crypto' && method.cryptoType}
                      {method.type === 'bank' && method.bankName}
                      {method.type === 'card' && method.processorName}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      method.enabled 
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                    }`}>
                      {method.enabled ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  {method.type === 'crypto' && (
                    <div className="text-sm space-y-1">
                      <div className="text-gray-600 dark:text-gray-400">
                        <strong>Network:</strong> {method.network}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 font-mono break-all">
                        <strong>Address:</strong> {method.walletAddress}
                      </div>
                      {method.minDeposit && (
                        <div className="text-gray-600 dark:text-gray-400">
                          <strong>Min Deposit:</strong> {method.minDeposit} {method.cryptoType}
                        </div>
                      )}
                      {method.notes && (
                        <div className="text-gray-500 dark:text-gray-400 text-xs mt-2">
                          {method.notes}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {method.type === 'bank' && (
                    <div className="text-sm space-y-1">
                      <div className="text-gray-600 dark:text-gray-400">
                        <strong>Account Name:</strong> {method.accountName}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        <strong>Account Number:</strong> {method.accountNumber}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {method.routingNumber && (
                          <div className="text-gray-600 dark:text-gray-400">
                            <strong>Routing:</strong> {method.routingNumber}
                          </div>
                        )}
                        {method.swiftCode && (
                          <div className="text-gray-600 dark:text-gray-400">
                            <strong>SWIFT:</strong> {method.swiftCode}
                          </div>
                        )}
                      </div>
                      {method.notes && (
                        <div className="text-gray-500 dark:text-gray-400 text-xs mt-2">
                          {method.notes}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {method.type === 'card' && (
                    <div className="text-sm space-y-1">
                      <div className="text-gray-600 dark:text-gray-400 capitalize">
                        <strong>Type:</strong> {method.processorType?.replace('_', ' ')}
                      </div>
                      {method.processingFee && (
                        <div className="text-gray-600 dark:text-gray-400">
                          <strong>Processing Fee:</strong> {method.processingFee}%
                        </div>
                      )}
                      {method.publicKey && (
                        <div className="text-gray-600 dark:text-gray-400 font-mono text-xs">
                          <strong>Public Key:</strong> {method.publicKey}
                        </div>
                      )}
                      {method.notes && (
                        <div className="text-gray-500 dark:text-gray-400 text-xs mt-2">
                          {method.notes}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleStatus(method.id)}
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
                  onClick={() => handleDeleteMethod(method.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {filteredMethods.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl">
            <Wallet className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No deposit methods found</p>
          </div>
        )}
      </div>

      {/* Add Method Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Add {methodType === 'crypto' ? 'Crypto Wallet' : methodType === 'bank' ? 'Bank Account' : 'Card Processor'}
            </DialogTitle>
            <DialogDescription>
              Configure a new deposit method for users
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {methodType === 'crypto' && (
              <>
                <div>
                  <Label>Cryptocurrency</Label>
                  <select
                    value={formData.cryptoType || 'BTC'}
                    onChange={(e) => setFormData({ ...formData, cryptoType: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                  >
                    <option value="BTC">Bitcoin (BTC)</option>
                    <option value="ETH">Ethereum (ETH)</option>
                    <option value="USDT">Tether (USDT)</option>
                    <option value="USDC">USD Coin (USDC)</option>
                    <option value="BNB">Binance Coin (BNB)</option>
                    <option value="XRP">Ripple (XRP)</option>
                    <option value="ADA">Cardano (ADA)</option>
                    <option value="SOL">Solana (SOL)</option>
                  </select>
                </div>
                <div>
                  <Label>Wallet Address</Label>
                  <Input
                    placeholder="Enter wallet address"
                    value={formData.walletAddress || ''}
                    onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
                  />
                </div>
                <div className="space-y-3">
                  <Label>Supported Networks For This Address</Label>
                  <div className="p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 min-h-[100px]">
                    {(() => {
                      const type = formData.cryptoType || 'BTC';
                      const options: string[] = [];
                      if (type === 'BTC') options.push('Bitcoin', 'Lightning');
                      if (type === 'ETH') options.push('Ethereum (ERC20)', 'Arbitrum', 'Polygon', 'Base', 'Optimism');
                      if (type === 'USDT' || type === 'USDC') options.push('Tron (TRC20)', 'Ethereum (ERC20)', 'BSC (BEP20)', 'Polygon', 'Arbitrum', 'Solana');
                      if (type === 'BNB') options.push('BSC (BEP20)', 'Binance Chain');
                      if (type === 'XRP') options.push('Ripple', 'BSC (BEP20)');
                      if (type === 'ADA') options.push('Cardano', 'BSC (BEP20)');
                      if (type === 'SOL') options.push('Solana');

                      const currentNetworks = formData.network ? formData.network.split(',').map(n => n.trim()) : [];

                      const handleCheckbox = (net: string, checked: boolean) => {
                        let newNets = [...currentNetworks];
                        if (checked && !newNets.includes(net)) newNets.push(net);
                        if (!checked) newNets = newNets.filter(n => n !== net);
                        setFormData({ ...formData, network: newNets.join(', ') });
                      };

                      return options.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                          {options.map(net => (
                            <label key={net} className="flex items-center gap-2 cursor-pointer p-1">
                              <input 
                                type="checkbox" 
                                checked={currentNetworks.includes(net)}
                                onChange={(e) => handleCheckbox(net, e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300"
                              />
                              <span className="text-sm">{net}</span>
                            </label>
                          ))}
                        </div>
                      ) : (
                         <Input
                           placeholder="Enter network manually..."
                           value={formData.network || ''}
                           onChange={(e) => setFormData({ ...formData, network: e.target.value })}
                         />
                      );
                    })()}
                  </div>
                  <p className="text-xs text-gray-500">Select all networks that your wallet address above supports.</p>
                </div>
                <div>
                  <Label>Minimum Deposit (Optional)</Label>
                  <Input
                    type="number"
                    step="0.00000001"
                    placeholder="e.g., 0.0001"
                    value={formData.minDeposit || ''}
                    onChange={(e) => setFormData({ ...formData, minDeposit: parseFloat(e.target.value) })}
                  />
                </div>
                
                {/* Deposit Fee Configuration */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Deposit Fee Type</Label>
                    <select
                      value={formData.depositFeeType || 'percentage'}
                      onChange={(e) => setFormData({ ...formData, depositFeeType: e.target.value as 'percentage' | 'fixed' })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (USD)</option>
                    </select>
                  </div>
                  <div>
                    <Label>
                      Deposit Fee {formData.depositFeeType === 'fixed' ? '(USD)' : '(%)'}
                    </Label>
                    <Input
                      type="number"
                      step={formData.depositFeeType === 'fixed' ? '0.01' : '0.1'}
                      placeholder={formData.depositFeeType === 'fixed' ? 'e.g., 5.00' : 'e.g., 0.5'}
                      value={formData.depositFee || ''}
                      onChange={(e) => setFormData({ ...formData, depositFee: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                {/* Withdrawal Fee Configuration */}
                <div className="grid md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label>Withdrawal Fee Type</Label>
                    <select
                      value={formData.withdrawalFeeType || 'percentage'}
                      onChange={(e) => setFormData({ ...formData, withdrawalFeeType: e.target.value as 'percentage' | 'fixed' })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (USD)</option>
                    </select>
                  </div>
                  <div>
                    <Label>
                      Withdrawal Fee {formData.withdrawalFeeType === 'fixed' ? '(USD)' : '(%)'}
                    </Label>
                    <Input
                      type="number"
                      step={formData.withdrawalFeeType === 'fixed' ? '0.01' : '0.1'}
                      placeholder={formData.withdrawalFeeType === 'fixed' ? 'e.g., 5.00' : 'e.g., 0.5'}
                      value={formData.withdrawalFee || ''}
                      onChange={(e) => setFormData({ ...formData, withdrawalFee: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Notes (Optional)</Label>
                  <textarea
                    placeholder="Confirmation time, network fees, etc."
                    value={formData.notes || ''}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 min-h-[80px]"
                  />
                </div>
              </>
            )}
            
            {methodType === 'bank' && (
              <>
                <div>
                  <Label>Bank Name</Label>
                  <Input
                    placeholder="JPMorgan Chase Bank"
                    value={formData.bankName || ''}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Account Name</Label>
                  <Input
                    placeholder="Company Name"
                    value={formData.accountName || ''}
                    onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Account Number</Label>
                  <Input
                    placeholder="****1234"
                    value={formData.accountNumber || ''}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Routing Number (Optional)</Label>
                    <Input
                      placeholder="021000021"
                      value={formData.routingNumber || ''}
                      onChange={(e) => setFormData({ ...formData, routingNumber: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>SWIFT Code (Optional)</Label>
                    <Input
                      placeholder="CHASUS33"
                      value={formData.swiftCode || ''}
                      onChange={(e) => setFormData({ ...formData, swiftCode: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label>IBAN (Optional)</Label>
                  <Input
                    placeholder="DE89370400440532013000"
                    value={formData.iban || ''}
                    onChange={(e) => setFormData({ ...formData, iban: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Bank Address (Optional)</Label>
                  <Input
                    placeholder="270 Park Avenue, New York, NY"
                    value={formData.bankAddress || ''}
                    onChange={(e) => setFormData({ ...formData, bankAddress: e.target.value })}
                  />
                </div>

                {/* Deposit Fee Configuration */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Deposit Fee Type</Label>
                    <select
                      value={formData.depositFeeType || 'percentage'}
                      onChange={(e) => setFormData({ ...formData, depositFeeType: e.target.value as 'percentage' | 'fixed' })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (USD)</option>
                    </select>
                  </div>
                  <div>
                    <Label>
                      Deposit Fee {formData.depositFeeType === 'fixed' ? '(USD)' : '(%)'}
                    </Label>
                    <Input
                      type="number"
                      step={formData.depositFeeType === 'fixed' ? '0.01' : '0.1'}
                      placeholder={formData.depositFeeType === 'fixed' ? 'e.g., 25.00' : 'e.g., 1.5'}
                      value={formData.depositFee || ''}
                      onChange={(e) => setFormData({ ...formData, depositFee: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                {/* Withdrawal Fee Configuration */}
                <div className="grid md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label>Withdrawal Fee Type</Label>
                    <select
                      value={formData.withdrawalFeeType || 'percentage'}
                      onChange={(e) => setFormData({ ...formData, withdrawalFeeType: e.target.value as 'percentage' | 'fixed' })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (USD)</option>
                    </select>
                  </div>
                  <div>
                    <Label>
                      Withdrawal Fee {formData.withdrawalFeeType === 'fixed' ? '(USD)' : '(%)'}
                    </Label>
                    <Input
                      type="number"
                      step={formData.withdrawalFeeType === 'fixed' ? '0.01' : '0.1'}
                      placeholder={formData.withdrawalFeeType === 'fixed' ? 'e.g., 25.00' : 'e.g., 1.5'}
                      value={formData.withdrawalFee || ''}
                      onChange={(e) => setFormData({ ...formData, withdrawalFee: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                <div>
                  <Label>Notes (Optional)</Label>
                  <textarea
                    placeholder="Processing time, instructions, etc."
                    value={formData.notes || ''}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 min-h-[80px]"
                  />
                </div>
              </>
            )}
            
            {methodType === 'card' && (
              <>
                <div>
                  <Label>Processor Name</Label>
                  <select
                    value={formData.processorName || 'Stripe'}
                    onChange={(e) => setFormData({ ...formData, processorName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                  >
                    <option value="Stripe">Stripe</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Square">Square</option>
                    <option value="Authorize.net">Authorize.net</option>
                    <option value="Braintree">Braintree</option>
                  </select>
                </div>
                <div>
                  <Label>Processor Type</Label>
                  <select
                    value={formData.processorType || 'credit_card'}
                    onChange={(e) => setFormData({ ...formData, processorType: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                  >
                    <option value="credit_card">Credit Card</option>
                    <option value="debit_card">Debit Card</option>
                    <option value="both">Both Credit & Debit</option>
                  </select>
                </div>
                <div>
                  <Label>Public Key / API Key</Label>
                  <Input
                    placeholder="pk_live_XXXXXXXXXXXXXXXXXXXXXXXX"
                    value={formData.publicKey || ''}
                    onChange={(e) => setFormData({ ...formData, publicKey: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Merchant ID (Optional)</Label>
                  <Input
                    placeholder="merchant_XXXXXXXXXX"
                    value={formData.merchantId || ''}
                    onChange={(e) => setFormData({ ...formData, merchantId: e.target.value })}
                  />
                </div>
                {/* Deposit Fee Configuration */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Deposit Fee Type</Label>
                    <select
                      value={formData.depositFeeType || 'percentage'}
                      onChange={(e) => setFormData({ ...formData, depositFeeType: e.target.value as 'percentage' | 'fixed' })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (USD)</option>
                    </select>
                  </div>
                  <div>
                    <Label>
                      Deposit Fee {formData.depositFeeType === 'fixed' ? '(USD)' : '(%)'}
                    </Label>
                    <Input
                      type="number"
                      step={formData.depositFeeType === 'fixed' ? '0.01' : '0.1'}
                      placeholder={formData.depositFeeType === 'fixed' ? 'e.g., 5.00' : 'e.g., 2.9'}
                      value={formData.depositFee || ''}
                      onChange={(e) => setFormData({ ...formData, depositFee: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                {/* Withdrawal Fee Configuration */}
                <div className="grid md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label>Withdrawal Fee Type</Label>
                    <select
                      value={formData.withdrawalFeeType || 'percentage'}
                      onChange={(e) => setFormData({ ...formData, withdrawalFeeType: e.target.value as 'percentage' | 'fixed' })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (USD)</option>
                    </select>
                  </div>
                  <div>
                    <Label>
                      Withdrawal Fee {formData.withdrawalFeeType === 'fixed' ? '(USD)' : '(%)'}
                    </Label>
                    <Input
                      type="number"
                      step={formData.withdrawalFeeType === 'fixed' ? '0.01' : '0.1'}
                      placeholder={formData.withdrawalFeeType === 'fixed' ? 'e.g., 5.00' : 'e.g., 2.9'}
                      value={formData.withdrawalFee || ''}
                      onChange={(e) => setFormData({ ...formData, withdrawalFee: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                <div>
                  <Label>Notes (Optional)</Label>
                  <textarea
                    placeholder="Additional information"
                    value={formData.notes || ''}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 min-h-[80px]"
                  />
                </div>
              </>
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Deposit Method</DialogTitle>
            <DialogDescription>
              Update deposit method details
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {methodType === 'crypto' && (
              <>
                <div>
                  <Label>Wallet Address</Label>
                  <Input
                    value={formData.walletAddress || ''}
                    onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
                  />
                </div>
                <div className="space-y-3">
                  <Label>Supported Networks For This Address</Label>
                  <div className="p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 min-h-[100px]">
                    {(() => {
                      const type = formData.cryptoType || 'BTC';
                      const options: string[] = [];
                      if (type === 'BTC') options.push('Bitcoin', 'Lightning');
                      if (type === 'ETH') options.push('Ethereum (ERC20)', 'Arbitrum', 'Polygon', 'Base', 'Optimism');
                      if (type === 'USDT' || type === 'USDC') options.push('Tron (TRC20)', 'Ethereum (ERC20)', 'BSC (BEP20)', 'Polygon', 'Arbitrum', 'Solana');
                      if (type === 'BNB') options.push('BSC (BEP20)', 'Binance Chain');
                      if (type === 'XRP') options.push('Ripple', 'BSC (BEP20)');
                      if (type === 'ADA') options.push('Cardano', 'BSC (BEP20)');
                      if (type === 'SOL') options.push('Solana');

                      const currentNetworks = formData.network ? formData.network.split(',').map(n => n.trim()) : [];

                      const handleCheckbox = (net: string, checked: boolean) => {
                        let newNets = [...currentNetworks];
                        if (checked && !newNets.includes(net)) newNets.push(net);
                        if (!checked) newNets = newNets.filter(n => n !== net);
                        setFormData({ ...formData, network: newNets.join(', ') });
                      };

                      return options.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                          {options.map(net => (
                            <label key={net} className="flex items-center gap-2 cursor-pointer p-1">
                              <input 
                                type="checkbox" 
                                checked={currentNetworks.includes(net)}
                                onChange={(e) => handleCheckbox(net, e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300"
                              />
                              <span className="text-sm">{net}</span>
                            </label>
                          ))}
                        </div>
                      ) : (
                         <Input
                           placeholder="Enter network manually..."
                           value={formData.network || ''}
                           onChange={(e) => setFormData({ ...formData, network: e.target.value })}
                         />
                      );
                    })()}
                  </div>
                  <p className="text-xs text-gray-500">Select all networks that your wallet address above supports.</p>
                </div>
                <div>
                  <Label>Minimum Deposit</Label>
                  <Input
                    type="number"
                    step="0.00000001"
                    value={formData.minDeposit || ''}
                    onChange={(e) => setFormData({ ...formData, minDeposit: parseFloat(e.target.value) })}
                  />
                </div>
                
                {/* Deposit Fee Configuration */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Deposit Fee Type</Label>
                    <select
                      value={formData.depositFeeType || 'percentage'}
                      onChange={(e) => setFormData({ ...formData, depositFeeType: e.target.value as 'percentage' | 'fixed' })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (USD)</option>
                    </select>
                  </div>
                  <div>
                    <Label>
                      Deposit Fee {formData.depositFeeType === 'fixed' ? '(USD)' : '(%)'}
                    </Label>
                    <Input
                      type="number"
                      step={formData.depositFeeType === 'fixed' ? '0.01' : '0.1'}
                      placeholder={formData.depositFeeType === 'fixed' ? 'e.g., 5.00' : 'e.g., 0.5'}
                      value={formData.depositFee || ''}
                      onChange={(e) => setFormData({ ...formData, depositFee: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                {/* Withdrawal Fee Configuration */}
                <div className="grid md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label>Withdrawal Fee Type</Label>
                    <select
                      value={formData.withdrawalFeeType || 'percentage'}
                      onChange={(e) => setFormData({ ...formData, withdrawalFeeType: e.target.value as 'percentage' | 'fixed' })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (USD)</option>
                    </select>
                  </div>
                  <div>
                    <Label>
                      Withdrawal Fee {formData.withdrawalFeeType === 'fixed' ? '(USD)' : '(%)'}
                    </Label>
                    <Input
                      type="number"
                      step={formData.withdrawalFeeType === 'fixed' ? '0.01' : '0.1'}
                      placeholder={formData.withdrawalFeeType === 'fixed' ? 'e.g., 5.00' : 'e.g., 0.5'}
                      value={formData.withdrawalFee || ''}
                      onChange={(e) => setFormData({ ...formData, withdrawalFee: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Notes</Label>
                  <textarea
                    value={formData.notes || ''}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 min-h-[80px]"
                  />
                </div>
              </>
            )}
            
            {methodType === 'bank' && (
              <>
                <div>
                  <Label>Bank Name</Label>
                  <Input
                    placeholder="JPMorgan Chase Bank"
                    value={formData.bankName || ''}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Account Name</Label>
                  <Input
                    placeholder="Company Name"
                    value={formData.accountName || ''}
                    onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Account Number</Label>
                  <Input
                    placeholder="****1234"
                    value={formData.accountNumber || ''}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Routing Number (Optional)</Label>
                    <Input
                      placeholder="021000021"
                      value={formData.routingNumber || ''}
                      onChange={(e) => setFormData({ ...formData, routingNumber: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>SWIFT Code (Optional)</Label>
                    <Input
                      placeholder="CHASUS33"
                      value={formData.swiftCode || ''}
                      onChange={(e) => setFormData({ ...formData, swiftCode: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label>IBAN (Optional)</Label>
                  <Input
                    placeholder="DE89370400440532013000"
                    value={formData.iban || ''}
                    onChange={(e) => setFormData({ ...formData, iban: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Bank Address (Optional)</Label>
                  <Input
                    placeholder="270 Park Avenue, New York, NY"
                    value={formData.bankAddress || ''}
                    onChange={(e) => setFormData({ ...formData, bankAddress: e.target.value })}
                  />
                </div>

                {/* Deposit Fee Configuration */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Deposit Fee Type</Label>
                    <select
                      value={formData.depositFeeType || 'percentage'}
                      onChange={(e) => setFormData({ ...formData, depositFeeType: e.target.value as 'percentage' | 'fixed' })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (USD)</option>
                    </select>
                  </div>
                  <div>
                    <Label>
                      Deposit Fee {formData.depositFeeType === 'fixed' ? '(USD)' : '(%)'}
                    </Label>
                    <Input
                      type="number"
                      step={formData.depositFeeType === 'fixed' ? '0.01' : '0.1'}
                      placeholder={formData.depositFeeType === 'fixed' ? 'e.g., 25.00' : 'e.g., 1.5'}
                      value={formData.depositFee || ''}
                      onChange={(e) => setFormData({ ...formData, depositFee: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                {/* Withdrawal Fee Configuration */}
                <div className="grid md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label>Withdrawal Fee Type</Label>
                    <select
                      value={formData.withdrawalFeeType || 'percentage'}
                      onChange={(e) => setFormData({ ...formData, withdrawalFeeType: e.target.value as 'percentage' | 'fixed' })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (USD)</option>
                    </select>
                  </div>
                  <div>
                    <Label>
                      Withdrawal Fee {formData.withdrawalFeeType === 'fixed' ? '(USD)' : '(%)'}
                    </Label>
                    <Input
                      type="number"
                      step={formData.withdrawalFeeType === 'fixed' ? '0.01' : '0.1'}
                      placeholder={formData.withdrawalFeeType === 'fixed' ? 'e.g., 25.00' : 'e.g., 1.5'}
                      value={formData.withdrawalFee || ''}
                      onChange={(e) => setFormData({ ...formData, withdrawalFee: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                <div>
                  <Label>Notes (Optional)</Label>
                  <textarea
                    placeholder="Processing time, instructions, etc."
                    value={formData.notes || ''}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 min-h-[80px]"
                  />
                </div>
              </>
            )}
            
            {methodType === 'card' && (
              <>
                <div>
                  <Label>Processor Name</Label>
                  <select
                    value={formData.processorName || 'Stripe'}
                    onChange={(e) => setFormData({ ...formData, processorName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                  >
                    <option value="Stripe">Stripe</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Square">Square</option>
                    <option value="Authorize.net">Authorize.net</option>
                    <option value="Braintree">Braintree</option>
                  </select>
                </div>
                <div>
                  <Label>Processor Type</Label>
                  <select
                    value={formData.processorType || 'credit_card'}
                    onChange={(e) => setFormData({ ...formData, processorType: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                  >
                    <option value="credit_card">Credit Card</option>
                    <option value="debit_card">Debit Card</option>
                    <option value="both">Both Credit & Debit</option>
                  </select>
                </div>
                <div>
                  <Label>Public Key / API Key</Label>
                  <Input
                    placeholder="pk_live_XXXXXXXXXXXXXXXXXXXXXXXX"
                    value={formData.publicKey || ''}
                    onChange={(e) => setFormData({ ...formData, publicKey: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Merchant ID (Optional)</Label>
                  <Input
                    placeholder="merchant_XXXXXXXXXX"
                    value={formData.merchantId || ''}
                    onChange={(e) => setFormData({ ...formData, merchantId: e.target.value })}
                  />
                </div>
                {/* Deposit Fee Configuration */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Deposit Fee Type</Label>
                    <select
                      value={formData.depositFeeType || 'percentage'}
                      onChange={(e) => setFormData({ ...formData, depositFeeType: e.target.value as 'percentage' | 'fixed' })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (USD)</option>
                    </select>
                  </div>
                  <div>
                    <Label>
                      Deposit Fee {formData.depositFeeType === 'fixed' ? '(USD)' : '(%)'}
                    </Label>
                    <Input
                      type="number"
                      step={formData.depositFeeType === 'fixed' ? '0.01' : '0.1'}
                      placeholder={formData.depositFeeType === 'fixed' ? 'e.g., 5.00' : 'e.g., 2.9'}
                      value={formData.depositFee || ''}
                      onChange={(e) => setFormData({ ...formData, depositFee: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                {/* Withdrawal Fee Configuration */}
                <div className="grid md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label>Withdrawal Fee Type</Label>
                    <select
                      value={formData.withdrawalFeeType || 'percentage'}
                      onChange={(e) => setFormData({ ...formData, withdrawalFeeType: e.target.value as 'percentage' | 'fixed' })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (USD)</option>
                    </select>
                  </div>
                  <div>
                    <Label>
                      Withdrawal Fee {formData.withdrawalFeeType === 'fixed' ? '(USD)' : '(%)'}
                    </Label>
                    <Input
                      type="number"
                      step={formData.withdrawalFeeType === 'fixed' ? '0.01' : '0.1'}
                      placeholder={formData.withdrawalFeeType === 'fixed' ? 'e.g., 5.00' : 'e.g., 2.9'}
                      value={formData.withdrawalFee || ''}
                      onChange={(e) => setFormData({ ...formData, withdrawalFee: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                <div>
                  <Label>Notes (Optional)</Label>
                  <textarea
                    placeholder="Additional information"
                    value={formData.notes || ''}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 min-h-[80px]"
                  />
                </div>
              </>
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