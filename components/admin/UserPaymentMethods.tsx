import { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Wallet, 
  Building, 
  Bitcoin,
  X,
  Plus,
  Save,
  Check
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '../ui/dialog';
import { useAuth, UserProfile } from '../../contexts/AuthContext';
import { toast } from 'sonner';

interface UserPaymentMethodsProps {
  userId: string;
  onClose: () => void;
}

const DEPOSIT_METHODS = [
  { id: 'crypto', name: 'Cryptocurrency', icon: Bitcoin, color: 'text-orange-500' },
  { id: 'bank_transfer', name: 'Bank Transfer', icon: Building, color: 'text-blue-500' },
  { id: 'credit_card', name: 'Credit/Debit Card', icon: CreditCard, color: 'text-purple-500' },
  { id: 'e_wallet', name: 'E-Wallet', icon: Wallet, color: 'text-green-500' },
];

const WITHDRAWAL_METHODS = [
  { id: 'crypto', name: 'Cryptocurrency', icon: Bitcoin, color: 'text-orange-500' },
  { id: 'bank_transfer', name: 'Bank Transfer', icon: Building, color: 'text-blue-500' },
  { id: 'e_wallet', name: 'E-Wallet', icon: Wallet, color: 'text-green-500' },
];

const CRYPTO_CURRENCIES = ['BTC', 'ETH', 'USDT', 'BNB', 'XRP', 'ADA', 'SOL', 'DOT', 'MATIC'];

export default function UserPaymentMethods({ userId, onClose }: UserPaymentMethodsProps) {
  const { users, updateProfile } = useAuth();
  const user = users.find(u => u.id === userId);

  const [enabledDepositMethods, setEnabledDepositMethods] = useState<string[]>([]);
  const [enabledWithdrawalMethods, setEnabledWithdrawalMethods] = useState<string[]>([]);
  const [cryptoWallets, setCryptoWallets] = useState<{ [key: string]: string }>({});
  const [showAddWallet, setShowAddWallet] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    if (user) {
      // Ensure crypto is ALWAYS enabled by default for both deposit and withdrawal
      const depositMethods = user.enabledDepositMethods || [];
      const withdrawalMethods = user.enabledWithdrawalMethods || [];
      
      // Add crypto if not already present
      if (!depositMethods.includes('crypto')) {
        depositMethods.push('crypto');
      }
      if (!withdrawalMethods.includes('crypto')) {
        withdrawalMethods.push('crypto');
      }
      
      setEnabledDepositMethods(depositMethods);
      setEnabledWithdrawalMethods(withdrawalMethods);
      setCryptoWallets(user.cryptoWallets || {});
    }
  }, [user]);

  const toggleDepositMethod = (methodId: string) => {
    setEnabledDepositMethods(prev => {
      if (prev.includes(methodId)) {
        return prev.filter(m => m !== methodId);
      } else {
        return [...prev, methodId];
      }
    });
  };

  const toggleWithdrawalMethod = (methodId: string) => {
    setEnabledWithdrawalMethods(prev => {
      if (prev.includes(methodId)) {
        return prev.filter(m => m !== methodId);
      } else {
        return [...prev, methodId];
      }
    });
  };

  const addCryptoWallet = () => {
    if (!selectedCurrency || !walletAddress.trim()) {
      toast.error('Please select a currency and enter wallet address');
      return;
    }

    setCryptoWallets(prev => ({
      ...prev,
      [selectedCurrency]: walletAddress.trim(),
    }));

    // Auto-enable crypto if wallet is added
    if (!enabledDepositMethods.includes('crypto')) {
      setEnabledDepositMethods(prev => [...prev, 'crypto']);
    }
    if (!enabledWithdrawalMethods.includes('crypto')) {
      setEnabledWithdrawalMethods(prev => [...prev, 'crypto']);
    }

    setSelectedCurrency('');
    setWalletAddress('');
    setShowAddWallet(false);
    toast.success(`${selectedCurrency} wallet added`);
  };

  const removeCryptoWallet = (currency: string) => {
    setCryptoWallets(prev => {
      const updated = { ...prev };
      delete updated[currency];
      return updated;
    });
    toast.success(`${currency} wallet removed`);
  };

  const handleSave = () => {
    updateProfile(userId, {
      enabledDepositMethods,
      enabledWithdrawalMethods,
      cryptoWallets,
    });

    toast.success('Payment methods updated successfully');
    onClose();
  };

  if (!user) {
    return null;
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Payment Methods Configuration
            <div className="text-sm font-normal text-gray-600 dark:text-gray-400 mt-1">
              {user.firstName} {user.lastName} ({user.email})
            </div>
          </DialogTitle>
          <DialogDescription className="sr-only">
            Manage payment methods for {user.firstName} {user.lastName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Crypto Wallets Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">Crypto Wallets</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Configure user's cryptocurrency wallet addresses
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => setShowAddWallet(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Wallet
              </Button>
            </div>

            {Object.keys(cryptoWallets).length === 0 ? (
              <div className="text-center py-8 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700">
                <Bitcoin className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400">No crypto wallets configured</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddWallet(true)}
                  className="mt-3"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Wallet
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(cryptoWallets).map(([currency, address]) => (
                  <div
                    key={currency}
                    className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg border border-orange-200 dark:border-orange-800"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Bitcoin className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-orange-900 dark:text-orange-100">
                            {currency}
                          </div>
                          <div className="text-xs text-orange-700 dark:text-orange-300 truncate">
                            {address}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeCryptoWallet(currency)}
                        className="ml-2 p-1 hover:bg-orange-200 dark:hover:bg-orange-800 rounded transition-colors"
                      >
                        <X className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Deposit Methods */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Enabled Deposit Methods</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DEPOSIT_METHODS.map((method) => {
                const Icon = method.icon;
                const isEnabled = enabledDepositMethods.includes(method.id);
                const isCryptoWithoutWallet = method.id === 'crypto' && Object.keys(cryptoWallets).length === 0;

                return (
                  <button
                    key={method.id}
                    onClick={() => {
                      if (method.id === 'crypto' && Object.keys(cryptoWallets).length === 0) {
                        toast.error('Please add at least one crypto wallet first');
                        return;
                      }
                      toggleDepositMethod(method.id);
                    }}
                    disabled={isCryptoWithoutWallet}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      isEnabled
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
                    } ${isCryptoWithoutWallet ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className={`w-6 h-6 ${method.color}`} />
                        <div>
                          <div className="font-medium">{method.name}</div>
                          {method.id === 'crypto' && Object.keys(cryptoWallets).length > 0 && (
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {Object.keys(cryptoWallets).length} wallet(s)
                            </div>
                          )}
                        </div>
                      </div>
                      {isEnabled && (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Withdrawal Methods */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Enabled Withdrawal Methods</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {WITHDRAWAL_METHODS.map((method) => {
                const Icon = method.icon;
                const isEnabled = enabledWithdrawalMethods.includes(method.id);
                const isCryptoWithoutWallet = method.id === 'crypto' && Object.keys(cryptoWallets).length === 0;

                return (
                  <button
                    key={method.id}
                    onClick={() => {
                      if (method.id === 'crypto' && Object.keys(cryptoWallets).length === 0) {
                        toast.error('Please add at least one crypto wallet first');
                        return;
                      }
                      toggleWithdrawalMethod(method.id);
                    }}
                    disabled={isCryptoWithoutWallet}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      isEnabled
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
                    } ${isCryptoWithoutWallet ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className={`w-6 h-6 ${method.color}`} />
                        <div>
                          <div className="font-medium">{method.name}</div>
                          {method.id === 'crypto' && Object.keys(cryptoWallets).length > 0 && (
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {Object.keys(cryptoWallets).length} wallet(s)
                            </div>
                          )}
                        </div>
                      </div>
                      {isEnabled && (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Configuration
          </Button>
        </DialogFooter>

        {/* Add Wallet Dialog */}
        <Dialog open={showAddWallet} onOpenChange={setShowAddWallet}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Crypto Wallet</DialogTitle>
              <DialogDescription className="sr-only">
                Add a new cryptocurrency wallet address
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="currency">Cryptocurrency</Label>
                <select
                  id="currency"
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                >
                  <option value="">Select currency</option>
                  {CRYPTO_CURRENCIES.filter(c => !cryptoWallets[c]).map(currency => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="wallet-address">Wallet Address</Label>
                <Input
                  id="wallet-address"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="Enter wallet address"
                  className="mt-1"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setShowAddWallet(false);
                setSelectedCurrency('');
                setWalletAddress('');
              }}>
                Cancel
              </Button>
              <Button onClick={addCryptoWallet}>
                <Plus className="w-4 h-4 mr-2" />
                Add Wallet
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}