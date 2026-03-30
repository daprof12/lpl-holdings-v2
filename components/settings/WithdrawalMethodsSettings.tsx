import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Building2, Wallet, DollarSign, Clock, AlertCircle, Info } from 'lucide-react';
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
import { formatCurrency } from '../../utils/formatNumber';
import { PlatformWithdrawalInfo } from '../admin/PlatformWithdrawalSettings';

export interface WithdrawalMethod {
  id: string;
  userId: string;
  type: 'bank' | 'paypal' | 'crypto';
  isDefault: boolean;
  
  // Bank fields
  bankName?: string;
  accountHolderName?: string;
  accountNumber?: string;
  routingNumber?: string;
  swiftCode?: string;
  iban?: string;
  
  // PayPal fields
  paypalEmail?: string;
  
  // Crypto fields
  cryptoType?: string; // BTC, ETH, USDT, etc.
  walletAddress?: string;
  network?: string;
}

export default function WithdrawalMethodsSettings() {
  const { user } = useAuth();
  const [withdrawalMethods, setWithdrawalMethods] = useState<WithdrawalMethod[]>([]);
  const [platformWithdrawalInfo, setPlatformWithdrawalInfo] = useState<PlatformWithdrawalInfo[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<WithdrawalMethod | null>(null);
  const [methodType, setMethodType] = useState<'bank' | 'paypal' | 'crypto'>('bank');
  
  // Form state
  const [formData, setFormData] = useState<Partial<WithdrawalMethod>>({});

  // Load withdrawal methods from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('withdrawalMethods');
    if (stored) {
      try {
        const allMethods = JSON.parse(stored);
        const userMethods = allMethods.filter((m: WithdrawalMethod) => m.userId === user?.id);
        setWithdrawalMethods(userMethods);
      } catch (error) {
        console.error('Failed to load withdrawal methods:', error);
      }
    }
  }, [user]);

  // Load platform withdrawal info
  useEffect(() => {
    const loadPlatformInfo = () => {
      const stored = localStorage.getItem('platformWithdrawalInfo');
      if (stored) {
        try {
          const info = JSON.parse(stored);
          // Only show enabled methods
          setPlatformWithdrawalInfo(info.filter((i: PlatformWithdrawalInfo) => i.enabled));
        } catch (error) {
          console.error('Failed to load platform withdrawal info:', error);
        }
      }
    };

    loadPlatformInfo();

    // Listen for storage events to update in real-time
    window.addEventListener('storage', loadPlatformInfo);
    return () => window.removeEventListener('storage', loadPlatformInfo);
  }, []);

  const saveWithdrawalMethods = (methods: WithdrawalMethod[]) => {
    // Get all methods from localStorage
    const stored = localStorage.getItem('withdrawalMethods');
    const allMethods = stored ? JSON.parse(stored) : [];
    
    // Remove current user's methods and add updated ones
    const otherUserMethods = allMethods.filter((m: WithdrawalMethod) => m.userId !== user?.id);
    const updatedMethods = [...otherUserMethods, ...methods];
    
    localStorage.setItem('withdrawalMethods', JSON.stringify(updatedMethods));
    setWithdrawalMethods(methods);
  };

  const handleAddMethod = () => {
    if (!user) return;

    const newMethod: WithdrawalMethod = {
      id: `wm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: user.id,
      type: methodType,
      isDefault: withdrawalMethods.length === 0,
      ...formData,
    };

    const updatedMethods = [...withdrawalMethods, newMethod];
    saveWithdrawalMethods(updatedMethods);
    
    toast.success('Withdrawal method added successfully');
    setShowAddDialog(false);
    resetForm();
  };

  const handleEditMethod = () => {
    if (!selectedMethod) return;

    const updatedMethods = withdrawalMethods.map(m =>
      m.id === selectedMethod.id ? { ...m, ...formData } : m
    );
    
    saveWithdrawalMethods(updatedMethods);
    toast.success('Withdrawal method updated successfully');
    setShowEditDialog(false);
    setSelectedMethod(null);
    resetForm();
  };

  const handleDeleteMethod = (id: string) => {
    const updatedMethods = withdrawalMethods.filter(m => m.id !== id);
    saveWithdrawalMethods(updatedMethods);
    toast.success('Withdrawal method deleted successfully');
  };

  const handleSetDefault = (id: string) => {
    const updatedMethods = withdrawalMethods.map(m => ({
      ...m,
      isDefault: m.id === id,
    }));
    saveWithdrawalMethods(updatedMethods);
    toast.success('Default withdrawal method updated');
  };

  const resetForm = () => {
    setFormData({});
    setMethodType('bank');
  };

  const openAddDialog = (type: 'bank' | 'paypal' | 'crypto') => {
    setMethodType(type);
    resetForm();
    setShowAddDialog(true);
  };

  const openEditDialog = (method: WithdrawalMethod) => {
    setSelectedMethod(method);
    setMethodType(method.type);
    setFormData(method);
    setShowEditDialog(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Withdrawal Methods</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your withdrawal methods for receiving funds
        </p>
      </div>

      {/* Platform Withdrawal Information */}
      {platformWithdrawalInfo.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold">Available Withdrawal Methods</h3>
          </div>
          
          <div className="grid md:grid-cols-1 gap-4">
            {platformWithdrawalInfo.map((info) => (
              <div
                key={info.id}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 border border-blue-200 dark:border-slate-600"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    info.type === 'bank' ? 'bg-green-100 dark:bg-green-900/20' :
                    info.type === 'paypal' ? 'bg-blue-100 dark:bg-blue-900/20' :
                    'bg-purple-100 dark:bg-purple-900/20'
                  }`}>
                    {info.type === 'bank' && <Building2 className="w-6 h-6 text-green-600 dark:text-green-400" />}
                    {info.type === 'paypal' && <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
                    {info.type === 'crypto' && <Wallet className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold capitalize mb-3">{info.type} Withdrawal</h4>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
                      <div className="bg-white/60 dark:bg-slate-900/30 rounded-lg p-3">
                        <div className="text-gray-600 dark:text-gray-400 text-xs mb-1">Min Amount</div>
                        <div className="font-semibold">${info.minWithdrawal}</div>
                      </div>
                      <div className="bg-white/60 dark:bg-slate-900/30 rounded-lg p-3">
                        <div className="text-gray-600 dark:text-gray-400 text-xs mb-1">Max Amount</div>
                        <div className="font-semibold">${formatCurrency(info.maxWithdrawal)}</div>
                      </div>
                      <div className="bg-white/60 dark:bg-slate-900/30 rounded-lg p-3">
                        <div className="text-gray-600 dark:text-gray-400 text-xs mb-1">Processing Time</div>
                        <div className="font-semibold flex items-center gap-1 text-xs">
                          <Clock className="w-3 h-3" />
                          {info.processingTime}
                        </div>
                      </div>
                      <div className="bg-white/60 dark:bg-slate-900/30 rounded-lg p-3">
                        <div className="text-gray-600 dark:text-gray-400 text-xs mb-1">Fee</div>
                        <div className="font-semibold">
                          {info.fee > 0 ? `${info.fee}%` : 'Free'}
                          {info.fixedFee && info.fixedFee > 0 ? ` + $${info.fixedFee}` : ''}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm mb-2">
                      <strong className="text-gray-700 dark:text-gray-300">Instructions:</strong>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">{info.instructions}</p>
                    </div>
                    
                    {info.notes && (
                      <div className="flex items-start gap-2 text-sm bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 mt-2">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
                        <span className="text-amber-800 dark:text-amber-200">{info.notes}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="h-px bg-gray-300 dark:bg-slate-600 my-6"></div>
        </div>
      )}

      {/* Add Method Buttons */}
      <div className="grid md:grid-cols-3 gap-4">
        <button
          onClick={() => openAddDialog('bank')}
          className="p-6 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
        >
          <Building2 className="w-8 h-8 mx-auto mb-3 text-gray-400" />
          <div className="font-semibold mb-1">Add Bank Account</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Wire, ACH, SEPA transfers</div>
        </button>

        <button
          onClick={() => openAddDialog('paypal')}
          className="p-6 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
        >
          <DollarSign className="w-8 h-8 mx-auto mb-3 text-gray-400" />
          <div className="font-semibold mb-1">Add PayPal</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Fast PayPal transfers</div>
        </button>

        <button
          onClick={() => openAddDialog('crypto')}
          className="p-6 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
        >
          <Wallet className="w-8 h-8 mx-auto mb-3 text-gray-400" />
          <div className="font-semibold mb-1">Add Crypto Wallet</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">BTC, ETH, USDT, etc.</div>
        </button>
      </div>

      {/* Existing Methods */}
      {withdrawalMethods.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Your Withdrawal Methods</h3>
          
          {withdrawalMethods.map((method) => (
            <div
              key={method.id}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-gray-200 dark:border-slate-700"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    method.type === 'bank' ? 'bg-green-100 dark:bg-green-900/20' :
                    method.type === 'paypal' ? 'bg-blue-100 dark:bg-blue-900/20' :
                    'bg-purple-100 dark:bg-purple-900/20'
                  }`}>
                    {method.type === 'bank' && <Building2 className="w-6 h-6 text-green-600 dark:text-green-400" />}
                    {method.type === 'paypal' && <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
                    {method.type === 'crypto' && <Wallet className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold capitalize">{method.type}</h4>
                      {method.isDefault && (
                        <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    
                    {method.type === 'bank' && (
                      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <div>{method.bankName}</div>
                        <div>{method.accountHolderName}</div>
                        <div>••••{method.accountNumber?.slice(-4) || method.iban?.slice(-4)}</div>
                      </div>
                    )}
                    
                    {method.type === 'paypal' && (
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {method.paypalEmail}
                      </div>
                    )}
                    
                    {method.type === 'crypto' && (
                      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <div>{method.cryptoType}</div>
                        <div className="font-mono text-xs">{method.walletAddress?.slice(0, 20)}...{method.walletAddress?.slice(-10)}</div>
                        <div className="text-xs">Network: {method.network}</div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {!method.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetDefault(method.id)}
                    >
                      Set Default
                    </Button>
                  )}
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
        </div>
      )}

      {/* Add Method Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add {methodType === 'bank' ? 'Bank Account' : methodType === 'paypal' ? 'PayPal Account' : 'Crypto Wallet'}</DialogTitle>
            <DialogDescription>
              Add a new withdrawal method to receive your funds
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
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
                  <Label>Account Holder Name</Label>
                  <Input
                    placeholder="John Doe"
                    value={formData.accountHolderName || ''}
                    onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Account Number</Label>
                    <Input
                      placeholder="1234567890"
                      value={formData.accountNumber || ''}
                      onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Routing Number</Label>
                    <Input
                      placeholder="021000021"
                      value={formData.routingNumber || ''}
                      onChange={(e) => setFormData({ ...formData, routingNumber: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>SWIFT Code (Optional)</Label>
                    <Input
                      placeholder="CHASUS33"
                      value={formData.swiftCode || ''}
                      onChange={(e) => setFormData({ ...formData, swiftCode: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>IBAN (Optional)</Label>
                    <Input
                      placeholder="DE89370400440532013000"
                      value={formData.iban || ''}
                      onChange={(e) => setFormData({ ...formData, iban: e.target.value })}
                    />
                  </div>
                </div>
              </>
            )}
            
            {methodType === 'paypal' && (
              <div>
                <Label>PayPal Email</Label>
                <Input
                  type="email"
                  placeholder="your-email@example.com"
                  value={formData.paypalEmail || ''}
                  onChange={(e) => setFormData({ ...formData, paypalEmail: e.target.value })}
                />
              </div>
            )}
            
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
                  </select>
                </div>
                <div>
                  <Label>Wallet Address</Label>
                  <Input
                    placeholder="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
                    value={formData.walletAddress || ''}
                    onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Network</Label>
                  <select
                    value={formData.network || ''}
                    onChange={(e) => setFormData({ ...formData, network: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                  >
                    <option value="">Select Network</option>
                    {formData.cryptoType === 'BTC' && (
                      <>
                        <option value="Bitcoin">Bitcoin</option>
                        <option value="Lightning">Lightning Network</option>
                      </>
                    )}
                    {formData.cryptoType === 'ETH' && (
                      <>
                        <option value="Ethereum">Ethereum</option>
                        <option value="Arbitrum">Arbitrum</option>
                        <option value="Polygon">Polygon</option>
                      </>
                    )}
                    {(formData.cryptoType === 'USDT' || formData.cryptoType === 'USDC') && (
                      <>
                        <option value="Ethereum (ERC20)">Ethereum (ERC20)</option>
                        <option value="Tron (TRC20)">Tron (TRC20)</option>
                        <option value="BSC (BEP20)">BSC (BEP20)</option>
                        <option value="Polygon">Polygon</option>
                      </>
                    )}
                    {formData.cryptoType === 'BNB' && (
                      <>
                        <option value="BSC (BEP20)">BSC (BEP20)</option>
                        <option value="Binance Chain">Binance Chain</option>
                      </>
                    )}
                  </select>
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit {methodType === 'bank' ? 'Bank Account' : methodType === 'paypal' ? 'PayPal Account' : 'Crypto Wallet'}</DialogTitle>
            <DialogDescription>
              Update your withdrawal method details
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {methodType === 'bank' && (
              <>
                <div>
                  <Label>Bank Name</Label>
                  <Input
                    value={formData.bankName || ''}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Account Holder Name</Label>
                  <Input
                    value={formData.accountHolderName || ''}
                    onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Account Number</Label>
                    <Input
                      value={formData.accountNumber || ''}
                      onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Routing Number</Label>
                    <Input
                      value={formData.routingNumber || ''}
                      onChange={(e) => setFormData({ ...formData, routingNumber: e.target.value })}
                    />
                  </div>
                </div>
              </>
            )}
            
            {methodType === 'paypal' && (
              <div>
                <Label>PayPal Email</Label>
                <Input
                  type="email"
                  value={formData.paypalEmail || ''}
                  onChange={(e) => setFormData({ ...formData, paypalEmail: e.target.value })}
                />
              </div>
            )}
            
            {methodType === 'crypto' && (
              <>
                <div>
                  <Label>Wallet Address</Label>
                  <Input
                    value={formData.walletAddress || ''}
                    onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Network</Label>
                  <Input
                    value={formData.network || ''}
                    onChange={(e) => setFormData({ ...formData, network: e.target.value })}
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