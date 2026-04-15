import { useState, useEffect } from 'react';
import { DollarSign, Wallet, Building2, Bitcoin, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useAuth } from '../../contexts/AuthContext';
import { useTransactions } from '../../contexts/TransactionProvider';
import { WithdrawalMethod } from '../settings/WithdrawalMethodsSettings';
import { DepositMethod } from '../admin/DepositMethodsManagement';
import { useMarketData } from '../../contexts/MarketDataContext';
import { showSuccessToast, showErrorToast } from '../common/ToastNotifications';
import { formatCurrency } from '../../utils/formatNumber';
import { api } from '../../utils/supabase/api';

interface WithdrawTabProps {
  availableBalance: number;
  walletType?: 'live' | 'portfolio';
  onWalletTypeChange?: (type: 'live' | 'portfolio') => void;
  portfolioBalance?: number;
  liveBalance?: number;
}

export default function WithdrawTab({ availableBalance, walletType = 'live', onWalletTypeChange, portfolioBalance = 0, liveBalance = 0 }: WithdrawTabProps) {
  const { currentUser, updateProfile, deductFromAccount } = useAuth();
  const { addTransaction, getUserTransactions, createWithdrawal } = useTransactions();
  const marketData = useMarketData();

  const [selectedMethod, setSelectedMethod] = useState<'crypto' | 'e_wallet' | 'bank' | null>(null);
  const [selectedWithdrawalMethod, setSelectedWithdrawalMethod] = useState<WithdrawalMethod | null>(null);
  const [selectedCryptoAddress, setSelectedCryptoAddress] = useState<string>('');
  const [amount, setAmount] = useState('');
  const [withdrawalMethods, setWithdrawalMethods] = useState<WithdrawalMethod[]>([]);

  // Crypto withdrawal state
  const [selectedCryptoType, setSelectedCryptoType] = useState<string>('');
  const [selectedCryptoNetwork, setSelectedCryptoNetwork] = useState<string>('');
  const [customWithdrawalAddress, setCustomWithdrawalAddress] = useState<string>('');
  const [useCustomAddress, setUseCustomAddress] = useState<boolean>(false);
  const [adminCryptoMethods, setAdminCryptoMethods] = useState<DepositMethod[]>([]);
  const [adminAllMethods, setAdminAllMethods] = useState<any[]>([]);

  // PayPal/E-wallet state
  const [paypalEmail, setPaypalEmail] = useState('');

  // Bank state
  const [bankName, setBankName] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [swiftCode, setSwiftCode] = useState('');

  // Confirmation modal state
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  // Load admin-configured crypto methods and user withdrawal methods
  useEffect(() => {
    const loadWithdrawalConfigs = async () => {
      try {
        const allMethodsRaw = await api.paymentMethods.getAll();
        const allMethods = Array.isArray(allMethodsRaw) ? allMethodsRaw.map((m: any) => ({
          id: m.id,
          type: m.type,
          enabled: m.is_active,
          cryptoType: m.currency,
          withdrawalFeeType: m.details?.withdrawalFeeType,
          withdrawalFee: m.details?.withdrawalFee,
          network: m.details?.network,
          ...(m.details || {})
        })) : [];
        const cryptoMethods = allMethods.filter((m: any) => m.type === 'crypto' && m.enabled && m.isWithdrawal);
        const withdrawalConfigs = allMethods.filter((m: any) => m.isWithdrawal);
        setAdminAllMethods(withdrawalConfigs);
        setAdminCryptoMethods(cryptoMethods);
        
        if (currentUser) {
          const userMethods = await api.withdrawalMethods.getByUserId(currentUser.id);
          setWithdrawalMethods(userMethods || []);
        }
      } catch (error) {
        console.error('Failed to load withdrawal configs:', error);
      }
    };

    loadWithdrawalConfigs();
  }, [currentUser?.id]);

  // Subscribe to crypto symbols for real-time pricing
  useEffect(() => {
    adminCryptoMethods.forEach((method: any) => {
      if (method.cryptoAssets && Array.isArray(method.cryptoAssets)) {
        method.cryptoAssets.forEach((asset: any) => {
          if (asset.enabled && asset.assetType) {
            marketData.subscribeToSymbol(`${asset.assetType}USD`);
          }
        });
      } else if (method.cryptoType) {
        marketData.subscribeToSymbol(`${method.cryptoType}USD`);
      }
    });

    return () => {
      adminCryptoMethods.forEach((method: any) => {
        if (method.cryptoAssets && Array.isArray(method.cryptoAssets)) {
          method.cryptoAssets.forEach((asset: any) => {
            if (asset.enabled && asset.assetType) {
              marketData.unsubscribeFromSymbol(`${asset.assetType}USD`);
            }
          });
        } else if (method.cryptoType) {
          marketData.unsubscribeFromSymbol(`${method.cryptoType}USD`);
        }
      });
    };
  }, [adminCryptoMethods]);

  // Get real-time crypto price
  const getCryptoPrice = (cryptoSymbol: string): number => {
    const symbol = `${cryptoSymbol}USD`;
    const priceData = marketData.getPrice(symbol);
    return priceData?.price || 0;
  };

  // Common network fees per crypto + network (in the native token)
  const getNetworkFee = (crypto: string, network: string): { fee: string; usdEstimate: string } => {
    const feeMap: Record<string, Record<string, { fee: string; usdEstimate: string }>> = {
      BTC: {
        'Bitcoin': { fee: '0.0001 BTC', usdEstimate: '~$3-10' },
        'Bitcoin (Legacy)': { fee: '0.00015 BTC', usdEstimate: '~$5-15' },
        'Lightning': { fee: '< 1 sat/vB', usdEstimate: '~$0.01' },
      },
      ETH: {
        'Ethereum': { fee: '0.0005-0.005 ETH', usdEstimate: '~$1-15' },
        'Ethereum (ERC20)': { fee: '0.001-0.005 ETH', usdEstimate: '~$3-15' },
        'Arbitrum': { fee: '0.0001 ETH', usdEstimate: '~$0.10-0.50' },
        'Optimism': { fee: '0.0001 ETH', usdEstimate: '~$0.10-0.50' },
        'Base': { fee: '0.00005 ETH', usdEstimate: '~$0.05-0.25' },
      },
      USDT: {
        'Tron (TRC20)': { fee: '1 USDT', usdEstimate: '~$1.00' },
        'Ethereum (ERC20)': { fee: '3-15 USDT', usdEstimate: '~$3-15' },
        'BNB Smart Chain (BEP20)': { fee: '0.5 USDT', usdEstimate: '~$0.50' },
        'Polygon': { fee: '0.1 USDT', usdEstimate: '~$0.10' },
        'Arbitrum': { fee: '0.1 USDT', usdEstimate: '~$0.10' },
        'Solana': { fee: '0.01 USDT', usdEstimate: '~$0.01' },
        'Avalanche': { fee: '0.5 USDT', usdEstimate: '~$0.50' },
      },
      BNB: {
        'BNB Smart Chain (BEP20)': { fee: '0.0005 BNB', usdEstimate: '~$0.30' },
        'BNB Smart Chain': { fee: '0.0005 BNB', usdEstimate: '~$0.30' },
      },
      SOL: {
        'Solana': { fee: '0.000005 SOL', usdEstimate: '~$0.001' },
      },
      XRP: {
        'Ripple': { fee: '0.01 XRP', usdEstimate: '~$0.01' },
        'XRP Ledger': { fee: '0.01 XRP', usdEstimate: '~$0.01' },
      },
      ADA: {
        'Cardano': { fee: '0.17 ADA', usdEstimate: '~$0.07' },
      },
      DOGE: {
        'Dogecoin': { fee: '1 DOGE', usdEstimate: '~$0.10' },
      },
      LTC: {
        'Litecoin': { fee: '0.001 LTC', usdEstimate: '~$0.10' },
      },
      MATIC: {
        'Polygon': { fee: '0.01 MATIC', usdEstimate: '~$0.01' },
      },
    };

    const cryptoFees = feeMap[crypto];
    if (cryptoFees) {
      if (cryptoFees[network]) return cryptoFees[network];
      for (const [key, value] of Object.entries(cryptoFees)) {
        if (network.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(network.toLowerCase())) {
          return value;
        }
      }
    }
    return { fee: `Variable`, usdEstimate: '~$0.50-5.00' };
  };

  // Build crypto options from admin-configured methods with real prices
  const cryptoOptionsMap = new Map<string, {
    symbol: string;
    networks: string[];
    price: number;
  }>();

  adminCryptoMethods.forEach((method: any) => {
    if (method.cryptoAssets && Array.isArray(method.cryptoAssets)) {
      method.cryptoAssets.forEach((asset: any) => {
        if (asset.enabled && asset.assetType && asset.network) {
          const existing = cryptoOptionsMap.get(asset.assetType);
          const realPrice = getCryptoPrice(asset.assetType);
          if (existing) {
             if (!existing.networks.includes(asset.network)) {
               existing.networks.push(asset.network);
             }
          } else {
             cryptoOptionsMap.set(asset.assetType, {
               symbol: asset.assetType,
               networks: [asset.network],
               price: realPrice,
             });
          }
        }
      });
    } else if (method.cryptoType && method.network) {
       // Legacy support
       const existing = cryptoOptionsMap.get(method.cryptoType);
       const realPrice = getCryptoPrice(method.cryptoType);
       if (existing) {
         if (!existing.networks.includes(method.network)) {
           existing.networks.push(method.network);
         }
       } else {
         cryptoOptionsMap.set(method.cryptoType, {
           symbol: method.cryptoType,
           networks: [method.network],
           price: realPrice,
         });
       }
    }
  });

  const cryptoOptions = Array.from(cryptoOptionsMap.values());

  // Get recent withdrawals
  const recentWithdrawals = currentUser ? getUserTransactions(currentUser.id).filter(t => t.type === 'withdrawal').slice(0, 5) : [];

  // Filter withdrawal types based on user's enabled methods
  const userEnabledMethods = currentUser?.enabledWithdrawalMethods || [];
  const userCryptoWallets = currentUser?.cryptoWallets || {};
  const hasAdminCryptoWallets = Object.keys(userCryptoWallets).length > 0;
  const hasUserWithdrawalMethods = withdrawalMethods.length > 0;

  // Only treat user as having specific config when they have a NON-EMPTY enabledWithdrawalMethods array
  const hasUserSpecificConfig =
    currentUser &&
    Array.isArray(currentUser.enabledWithdrawalMethods) &&
    currentUser.enabledWithdrawalMethods.length > 0;

  const withdrawMethodTypes = [
    {
      id: 'crypto' as const,
      name: 'Cryptocurrency',
      icon: Bitcoin,
      description: `${cryptoOptions.length} crypto option${cryptoOptions.length !== 1 ? 's' : ''} available`,
      fee: '0.5%',
      processingTime: '30 min - 2 hours',
      minWithdraw: 50,
      color: 'from-orange-500 to-orange-600',
      isAvailable: (hasUserSpecificConfig ? userEnabledMethods.includes('crypto') : true) &&
        adminCryptoMethods.some(m => m.enabled)
    },
    {
      id: 'e_wallet' as const,
      name: 'E-Wallet',
      icon: DollarSign,
      description: 'PayPal or E-Wallet transfer',
      fee: '2%',
      processingTime: '1-2 business days',
      minWithdraw: 25,
      color: 'from-blue-500 to-blue-600',
      isAvailable: adminAllMethods.some(m => m.type === 'paypal' && m.enabled)
    },
    {
      id: 'bank' as const,
      name: 'Bank Transfer',
      icon: Building2,
      description: 'Direct wire to your bank',
      fee: '$25',
      processingTime: '2-5 business days',
      minWithdraw: 500,
      color: 'from-green-500 to-green-600',
      isAvailable: adminAllMethods.some(m => m.type === 'bank' && m.enabled)
    },
  ];

  const calculateFee = () => {
    const amt = parseFloat(amount) || 0;

    // For crypto, use admin-configured withdrawal fee
    if (selectedMethod === 'crypto' && selectedCryptoType && selectedCryptoNetwork) {
      const methodConfig = adminCryptoMethods.find(
        m => m.cryptoType === selectedCryptoType && m.network === selectedCryptoNetwork
      );

      if (methodConfig) {
        if (methodConfig.withdrawalFeeType === 'fixed') {
          return methodConfig.withdrawalFee || 0;
        } else {
          // Percentage fee
          return (amt * (methodConfig.withdrawalFee || 0)) / 100;
        }
      }
      // Fallback to default if no config found
      return amt * 0.005;
    }

    if (selectedMethod === 'e_wallet') return amt * 0.02;
    if (selectedMethod === 'bank') return 25;
    return 0;
  };

  // Validate crypto address format based on crypto type and network
  const validateCryptoAddress = (addr: string, crypto: string, network: string): { valid: boolean; hint: string } => {
    const trimmed = addr.trim();
    if (!trimmed) return { valid: false, hint: 'Address is required' };
    const net = network.toLowerCase();
    switch (crypto) {
      case 'BTC':
        return {
          valid: /^(1|3)[a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(trimmed) || /^bc1[a-zA-HJ-NP-Z0-9]{25,62}$/.test(trimmed),
          hint: 'Must start with 1, 3, or bc1',
        };
      case 'ETH':
      case 'MATIC':
        return {
          valid: /^0x[0-9a-fA-F]{40}$/.test(trimmed),
          hint: 'Must start with 0x followed by 40 hex characters',
        };
      case 'USDT':
        if (net.includes('tron') || net.includes('trc20'))
          return { valid: /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(trimmed), hint: 'TRC20 address must start with T (34 characters)' };
        if (net.includes('solana'))
          return { valid: /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(trimmed), hint: 'Solana address must be 32-44 base58 characters' };
        return { valid: /^0x[0-9a-fA-F]{40}$/.test(trimmed), hint: 'Must start with 0x followed by 40 hex characters' };
      case 'BNB':
        return {
          valid: /^0x[0-9a-fA-F]{40}$/.test(trimmed) || /^bnb1[a-z0-9]{38}$/.test(trimmed),
          hint: 'Must start with 0x (BEP20) or bnb1 (BEP2)',
        };
      case 'SOL':
        return { valid: /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(trimmed), hint: 'Must be 32-44 base58 characters' };
      case 'XRP':
        return { valid: /^r[1-9A-HJ-NP-Za-km-z]{24,34}$/.test(trimmed), hint: 'Must start with r (25-35 characters)' };
      case 'ADA':
        return {
          valid: /^addr1[a-z0-9]{50,}$/.test(trimmed) || /^DdzFF[a-zA-Z0-9]{50,}$/.test(trimmed),
          hint: 'Must start with addr1 (Shelley) or DdzFF (Byron)',
        };
      case 'DOGE':
        return { valid: /^D[5-9A-HJ-NP-U]{1}[1-9A-HJ-NP-Za-km-z]{32}$/.test(trimmed), hint: 'Must start with D (34 characters)' };
      case 'LTC':
        return {
          valid: /^[LM][a-km-zA-HJ-NP-Z1-9]{26,33}$/.test(trimmed) || /^ltc1[a-zA-HJ-NP-Z0-9]{25,62}$/.test(trimmed),
          hint: 'Must start with L, M, or ltc1',
        };
      case 'AVAX':
        return {
          valid: /^0x[0-9a-fA-F]{40}$/.test(trimmed) || /^X-avax[a-zA-Z0-9]{30,}$/.test(trimmed),
          hint: 'Must start with 0x (C-Chain) or X-avax (X-Chain)',
        };
      case 'LINK':
      case 'UNI':
      case 'AAVE':
        return { valid: /^0x[0-9a-fA-F]{40}$/.test(trimmed), hint: 'Must start with 0x followed by 40 hex characters' };
      default:
        return { valid: trimmed.length >= 20, hint: 'Must be at least 20 characters' };
    }
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      showErrorToast('User not authenticated');
      return;
    }

    // Handle crypto address validation
    if (selectedMethod === 'crypto') {
      if (!selectedCryptoType || !selectedCryptoNetwork) {
        showErrorToast('Please select cryptocurrency and network');
        return;
      }

      if (!customWithdrawalAddress || customWithdrawalAddress.trim().length < 10) {
        showErrorToast('Please enter a valid withdrawal address');
        return;
      }

      // Validate address format
      const { valid, hint } = validateCryptoAddress(customWithdrawalAddress, selectedCryptoType, selectedCryptoNetwork);
      if (!valid) {
        showErrorToast(`Invalid ${selectedCryptoType} address format. ${hint}`);
        return;
      }
    } else if (selectedMethod === 'e_wallet') {
      if (!paypalEmail || !paypalEmail.includes('@')) {
        showErrorToast('Please enter a valid PayPal email');
        return;
      }
    } else if (selectedMethod === 'bank') {
      if (!bankName || !accountName || !accountNumber) {
        showErrorToast('Please fill in all required bank details');
        return;
      }
    }

    const withdrawAmount = parseFloat(amount);
    if (!withdrawAmount || withdrawAmount <= 0) {
      showErrorToast('Please enter a valid amount');
      return;
    }

    const methodInfo = withdrawMethodTypes.find(m => m.id === selectedMethod);
    if (withdrawAmount < (methodInfo?.minWithdraw || 0)) {
      showErrorToast(`Minimum withdrawal is $${methodInfo?.minWithdraw}`);
      return;
    }

    const fee = calculateFee();
    const totalAmount = withdrawAmount + fee;

    if (totalAmount > availableBalance) {
      showErrorToast('Insufficient balance for withdrawal including fees');
      return;
    }

    // Open confirmation modal instead of immediately processing
    setShowConfirmModal(true);
  };

  const processWithdrawal = async () => {
    if (!currentUser) return;

    const withdrawAmount = parseFloat(amount);
    const fee = calculateFee();
    const totalDeduction = withdrawAmount + fee;

    try {
      // 1. Create withdrawal transaction in relational DB
      const result = await createWithdrawal({
        amount: withdrawAmount,
        method: selectedMethod,
        currency: selectedCryptoType || 'USD',
        walletType,
        destination_address: customWithdrawalAddress || paypalEmail || accountNumber,
        bankName,
        accountName,
        routingNumber,
        swiftCode,
        network: selectedCryptoNetwork,
        metadata: {
          fee,
          totalDeduction,
          walletType
        }
      });

      if (!result.success) {
        throw new Error(result.error || 'Failed to submit withdrawal');
      }

      // 2. Deduct from user's balance safely using central handler
      const success = await deductFromAccount(
        currentUser.id, 
        totalDeduction, 
        walletType === 'portfolio' ? 'portfolio' : 'live'
      );

      if (!success) {
        throw new Error("Could not deduct funds. Please verify your balance.");
      }

      showSuccessToast(`Withdrawal request submitted!`);

      // 3. Reset form
      setShowConfirmModal(false);
      setAmount('');
      setSelectedMethod(null);
      setSelectedWithdrawalMethod(null);
      setUseCustomAddress(false);
      setSelectedCryptoType('');
      setSelectedCryptoNetwork('');
      setCustomWithdrawalAddress('');
      
    } catch (error) {
      console.error('Withdrawal failed:', error);
      showErrorToast((error as Error).message || 'Withdrawal failed. Please try again.');
    }
  };

  // Filter methods by type
  const availableMethods = withdrawalMethods.filter(m => {
    if (selectedMethod === 'e_wallet') return (m.type as string) === 'e_wallet' || (m.type as string) === 'paypal';
    return (m.type as string) === selectedMethod;
  });

  if (!selectedMethod) {
    return (
      <div>
        {/* Wallet Type Selector */}
        {onWalletTypeChange && (
          <div className="mb-6 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
            <label className="block text-sm font-semibold mb-3">Withdraw From</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onWalletTypeChange('live')}
                className={`p-4 rounded-xl border-2 text-left transition-all ${walletType === 'live'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
                  }`}
              >
                <div className="font-semibold mb-1">Live Balance</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  ${formatCurrency(liveBalance)} available
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Trading account funds
                </div>
              </button>
              <button
                onClick={() => onWalletTypeChange('portfolio')}
                className={`p-4 rounded-xl border-2 text-left transition-all ${walletType === 'portfolio'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20'
                    : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
                  }`}
              >
                <div className="font-semibold mb-1">Portfolio Balance</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  ${formatCurrency(portfolioBalance)} available
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Investment portfolio funds
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Available Balance */}
        <div className="mb-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Available for Withdrawal ({walletType === 'portfolio' ? 'Portfolio Balance' : 'Live Balance'})
          </div>
          <div className="text-4xl mb-2">
            ${formatCurrency(availableBalance)}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Funds not locked in open positions
          </div>
        </div>

        {/* Important Notice */}
        <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-orange-600 dark:text-orange-400">
              <p className="font-semibold mb-2">Important Withdrawal Information:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>You must add a withdrawal method in Settings before withdrawing</li>
                <li>Withdrawals are processed within stated timeframes after approval</li>
                <li>Minimum withdrawal amounts and fees apply</li>
                <li>You cannot withdraw funds locked in open positions</li>
                <li>Withdrawals are subject to verification and may be delayed for security</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Check if user has any enabled methods */}
        {withdrawMethodTypes.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
              <Wallet className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Withdrawal Methods Available</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              {userEnabledMethods.length === 0 ? (
                <>
                  Your account doesn't have any withdrawal methods configured yet.
                  Please contact support to enable withdrawal methods for your account.
                </>
              ) : (hasAdminCryptoWallets && !hasUserWithdrawalMethods) ? (
                <>
                  Your account has crypto wallets configured by the administrator.
                  You can withdraw to these addresses directly.
                </>
              ) : !hasUserWithdrawalMethods ? (
                <>
                  No withdrawal methods are currently available.
                  Please contact support for assistance with withdrawals.
                </>
              ) : (
                <>
                  No withdrawal methods are currently available.
                  Please contact support for assistance.
                </>
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => window.location.href = '/support'}
                variant="default"
              >
                Contact Support
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Method Selection */}
            <div className="mb-6">
              <Label className="mb-4 block text-lg">Select Withdrawal Method</Label>
              <div className="grid md:grid-cols-3 gap-4">
                {withdrawMethodTypes.map((method) => {
                  const isCrypto = method.id === 'crypto';
                  const isEWallet = method.id === 'e_wallet';
                  const isBank = method.id === 'bank';
                  // Just show whether it is enabled globally for these types without showing user saved methods count, 
                  // since users don't need saved methods anymore.
                  const userMethodsCount = method.isAvailable ? 1 : 0;

                  return (
                    <button
                      key={method.id}
                      onClick={() => method.isAvailable && setSelectedMethod(method.id)}
                      className={`p-6 rounded-xl border-2 text-left transition-all relative ${method.isAvailable
                          ? 'border-gray-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 cursor-pointer'
                          : 'opacity-60 cursor-not-allowed border-gray-100 dark:border-slate-800'
                        }`}
                    >
                      {!method.isAvailable && (
                        <div className="absolute inset-0 z-10 bg-white/40 dark:bg-slate-800/40 rounded-xl flex items-center justify-center p-6 text-center">
                          <div className="bg-white dark:bg-slate-900 px-4 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 text-xs font-bold text-red-600 dark:text-red-400">
                            Withdrawal method currently not available
                          </div>
                        </div>
                      )}

                      <div className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-lg flex items-center justify-center mb-4 ${!method.isAvailable ? 'grayscale' : ''}`}>
                        <method.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold mb-2">{method.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{method.description}</p>
                      <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex justify-between">
                          <span>Fee:</span>
                          <span className="font-semibold">{method.fee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Min:</span>
                          <span className="font-semibold">${method.minWithdraw}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Processing:</span>
                          <span className="font-semibold">{method.processingTime}</span>
                        </div>
                        <div className="pt-2 border-t border-gray-200 dark:border-slate-600">
                          <span className={`${method.isAvailable ? 'text-green-600 dark:text-green-400' : 'text-gray-400'} font-semibold`}>
                            {userMethodsCount} method{userMethodsCount > 1 ? 's' : ''} available
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recent Withdrawals */}
            {recentWithdrawals.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Recent Withdrawals</h3>

                <div className="space-y-3">
                  {recentWithdrawals.map((withdrawal) => {
                    const withdrawalDate = new Date(withdrawal.timestamp);
                    const statusColors = {
                      pending: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
                      completed: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
                      rejected: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400',
                      cancelled: 'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400',
                    };

                    return (
                      <div key={withdrawal.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                        <div>
                          <div className="font-semibold">${formatCurrency(withdrawal.amount)}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {withdrawalDate.toLocaleDateString()} {withdrawalDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 capitalize">
                            {withdrawal.method}
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className={`px-3 py-1 text-sm rounded-full capitalize ${statusColors[withdrawal.status]}`}>
                            {withdrawal.status}
                          </span>
                          {withdrawal.adminNotes && (
                            <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded text-xs text-blue-700 dark:text-blue-300 max-w-[450px] text-right">
                              <span className="font-semibold block mb-0.5">Reason:</span>
                              {withdrawal.adminNotes}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  const methodInfo = withdrawMethodTypes.find(m => m.id === selectedMethod);
  if (!methodInfo) return null;

  return (
    <div>
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => {
          setSelectedMethod(null);
          setSelectedWithdrawalMethod(null);
          setAmount('');
        }}
        className="mb-4"
      >
        ← Back to Methods
      </Button>

      {/* Available Balance */}
      <div className="mb-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Available for Withdrawal ({walletType === 'portfolio' ? 'Portfolio Balance' : 'Live Balance'})
        </div>
        <div className="text-4xl mb-2">
          ${formatCurrency(availableBalance)}
        </div>
      </div>

      <form onSubmit={handleWithdraw} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-10 h-10 bg-gradient-to-br ${methodInfo.color} rounded-lg flex items-center justify-center`}>
            <methodInfo.icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{methodInfo.name} Withdrawal</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{methodInfo.description}</p>
          </div>
        </div>

        {selectedMethod === 'crypto' && cryptoOptions.length > 0 ? (
          <>
            {/* Custom Crypto Address Entry */}
            {/* Crypto Selection */}
            <div className="mb-6">
              <Label className="mb-3 block">Select Cryptocurrency</Label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {cryptoOptions.map((crypto) => (
                  <button
                    key={crypto.symbol}
                    type="button"
                    onClick={() => {
                      setSelectedCryptoType(crypto.symbol);
                      setSelectedCryptoNetwork(crypto.networks[0]);
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${selectedCryptoType === crypto.symbol
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
                      }`}
                  >
                    <div className="font-semibold mb-1">{crypto.symbol}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">${formatCurrency(crypto.price)}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Network Selection */}
            {selectedCryptoType && (
              <div className="mb-6">
                <Label className="mb-3 block">Select Network</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {cryptoOptions.find(c => c.symbol === selectedCryptoType)?.networks.map((network) => (
                    <button
                      key={network}
                      type="button"
                      onClick={() => setSelectedCryptoNetwork(network)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${selectedCryptoNetwork === network
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
                        }`}
                    >
                      <div className="font-semibold">{network}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Network fee: {getNetworkFee(selectedCryptoType, network).fee} ({getNetworkFee(selectedCryptoType, network).usdEstimate})
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Withdrawal Address Input */}
            {selectedCryptoType && selectedCryptoNetwork && (
              <div className="mb-6">
                <Label htmlFor="withdrawalAddress" className="mb-3 block">
                  Withdrawal Address ({selectedCryptoType} - {selectedCryptoNetwork})
                </Label>
                <Input
                  id="withdrawalAddress"
                  type="text"
                  placeholder={`Enter your ${selectedCryptoType} wallet address`}
                  value={customWithdrawalAddress}
                  onChange={(e) => setCustomWithdrawalAddress(e.target.value)}
                  required
                  className={`font-mono text-sm ${customWithdrawalAddress.trim().length > 0
                      ? validateCryptoAddress(customWithdrawalAddress, selectedCryptoType, selectedCryptoNetwork).valid
                        ? 'border-green-500 dark:border-green-500 focus-visible:ring-green-500'
                        : 'border-red-500 dark:border-red-500 focus-visible:ring-red-500'
                      : ''
                    }`}
                />
                {customWithdrawalAddress.trim().length > 0 && (() => {
                  const { valid, hint } = validateCryptoAddress(customWithdrawalAddress, selectedCryptoType, selectedCryptoNetwork);
                  return valid ? (
                    <p className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                      ✅ Valid {selectedCryptoType} address format
                    </p>
                  ) : (
                    <p className="text-xs text-red-600 dark:text-red-400 mt-2 flex items-center gap-1">
                      ❌ Invalid {selectedCryptoType} address. {hint}
                    </p>
                  );
                })()}
                <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">
                  ⚠️ Double-check your address! Sending to wrong address will result in permanent loss.
                </p>
              </div>
            )}
          </>
        ) : selectedMethod === 'e_wallet' ? (
          /* PayPal / E-wallet fields */
          <div className="space-y-4 mb-6">
            <div>
              <Label htmlFor="paypalEmail">Your PayPal Email</Label>
              <Input
                id="paypalEmail"
                type="email"
                placeholder="email@example.com"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500 mt-1">Funds will be sent to this PayPal account</p>
            </div>
            {availableMethods.length > 0 && (
              <div className="pt-2">
                <p className="text-sm font-medium mb-2">Or select from saved accounts:</p>
                <div className="grid grid-cols-1 gap-2">
                  {availableMethods.map(m => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setPaypalEmail((m as any).paypalEmail || '');
                        setSelectedWithdrawalMethod(m);
                      }}
                      className={`text-xs p-2 rounded border text-left ${paypalEmail === (m as any).paypalEmail ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10' : 'border-gray-200 dark:border-slate-700'}`}
                    >
                      {(m as any).paypalEmail}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : selectedMethod === 'bank' ? (
          /* Bank Transfer fields */
          <div className="space-y-4 mb-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  placeholder="e.g. JPMorgan Chase"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="accountName">Account Holder Name</Label>
                <Input
                  id="accountName"
                  placeholder="John Doe"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="accountNumber">Account Number / IBAN</Label>
                <Input
                  id="accountNumber"
                  placeholder="Enter your account number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="routingNumber">Routing / SWIFT (Optional)</Label>
                <Input
                  id="routingNumber"
                  placeholder="e.g. 021000021"
                  value={routingNumber}
                  onChange={(e) => setRoutingNumber(e.target.value)}
                />
              </div>
            </div>
            {availableMethods.length > 0 && (
              <div className="pt-2">
                <p className="text-sm font-medium mb-2">Or select from saved accounts:</p>
                <div className="grid grid-cols-1 gap-2">
                  {availableMethods.map(m => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setBankName((m as any).bankName || '');
                        setAccountName((m as any).accountHolderName || '');
                        setAccountNumber((m as any).accountNumber || (m as any).iban || '');
                        setRoutingNumber((m as any).routingNumber || (m as any).swiftCode || '');
                        setSelectedWithdrawalMethod(m);
                      }}
                      className={`text-xs p-2 rounded border text-left ${bankName === (m as any).bankName && accountNumber === ((m as any).accountNumber || (m as any).iban) ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10' : 'border-gray-200 dark:border-slate-700'}`}
                    >
                      {(m as any).bankName} - ••••{((m as any).accountNumber || (m as any).iban || '').slice(-4)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}

        {/* Amount */}
        <div className="mb-6">
          <Label htmlFor="amount" className="mb-3 block">Withdrawal Amount (USD)</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Minimum: ${methodInfo.minWithdraw} | Available: ${formatCurrency(availableBalance)}
          </p>
        </div>

        {/* Fee Breakdown */}
        {amount && parseFloat(amount) > 0 && (
          <div className="mb-6 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Withdrawal Amount:</span>
                <span className="font-semibold">${parseFloat(amount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Processing Fee
                  {selectedMethod === 'crypto' && selectedCryptoType && selectedCryptoNetwork && (() => {
                    const methodConfig = adminCryptoMethods.find(
                      m => m.cryptoType === selectedCryptoType && m.network === selectedCryptoNetwork
                    );
                    if (methodConfig) {
                      if (methodConfig.withdrawalFeeType === 'fixed') {
                        return ' (Fixed)';
                      } else if (methodConfig.withdrawalFee) {
                        return ` (${methodConfig.withdrawalFee}%)`;
                      }
                    }
                    return '';
                  })()}:
                </span>
                <span className="font-semibold text-orange-600 dark:text-orange-400">${calculateFee().toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-gray-200 dark:border-slate-600 flex justify-between">
                <span className="font-semibold">Total Deducted:</span>
                <span className="font-semibold text-lg">${(parseFloat(amount) + calculateFee()).toFixed(2)}</span>
              </div>

              {/* Show crypto equivalent for crypto withdrawals */}
              {selectedMethod === 'crypto' && selectedCryptoType && (() => {
                const cryptoPrice = getCryptoPrice(selectedCryptoType);
                const netAmount = parseFloat(amount) - calculateFee();
                const cryptoAmount = cryptoPrice > 0 ? netAmount / cryptoPrice : 0;
                return (
                  <div className="pt-2 border-t border-gray-200 dark:border-slate-600">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-600 dark:text-gray-400">You Will Receive:</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        {cryptoPrice > 0 ? (
                          `${cryptoAmount.toFixed(8)} ${selectedCryptoType}`
                        ) : (
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Fetching real-time price...
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Current Rate:</span>
                      <span>1 {selectedCryptoType} = ${formatCurrency(cryptoPrice)}</span>
                    </div>
                  </div>
                );
              })()}

              <div className="flex justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">Remaining Balance:</span>
                <span>${(availableBalance - parseFloat(amount) - calculateFee()).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={
            selectedMethod === 'crypto'
              ? (!selectedCryptoType || !selectedCryptoNetwork || !customWithdrawalAddress || !amount || parseFloat(amount) <= 0 || !validateCryptoAddress(customWithdrawalAddress, selectedCryptoType, selectedCryptoNetwork).valid)
              : selectedMethod === 'e_wallet'
                ? (!paypalEmail || !amount || parseFloat(amount) <= 0)
                : selectedMethod === 'bank'
                  ? (!bankName || !accountName || !accountNumber || !amount || parseFloat(amount) <= 0)
                  : true
          }
        >
          Request Withdrawal
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>

        {/* Info */}
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-xs text-blue-600 dark:text-blue-400">
            <strong>Processing Time:</strong> {methodInfo.processingTime} after approval
          </p>
        </div>
      </form>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowConfirmModal(false)}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-200 dark:border-slate-700" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 bg-gradient-to-br ${methodInfo.color} rounded-xl flex items-center justify-center`}>
                <methodInfo.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Confirm Withdrawal</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Please review your withdrawal details</p>
              </div>
            </div>

            <div className="mb-6 space-y-4">
              {/* Method Details */}
              <div className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Withdrawal Method</div>
                <div className="font-semibold">{methodInfo.name}</div>
                {selectedMethod === 'crypto' && (
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {selectedCryptoType} • {selectedCryptoNetwork}
                  </div>
                )}
              </div>

              {/* Destination */}
              {selectedMethod === 'crypto' ? (
                <div className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Destination Address</div>
                  <div className="font-mono text-xs break-all">{customWithdrawalAddress}</div>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Destination</div>
                  {selectedMethod === 'bank' && (
                    <div>
                      <div className="font-semibold">{bankName}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{accountName}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">••••{accountNumber.slice(-4)}</div>
                    </div>
                  )}
                  {selectedMethod === 'e_wallet' && (
                    <div>
                      <div className="font-semibold">PayPal</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{paypalEmail}</div>
                    </div>
                  )}
                </div>
              )}

              {/* Amount Breakdown */}
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Withdrawal Amount:</span>
                    <span className="font-semibold">${parseFloat(amount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Processing Fee:</span>
                    <span className="font-semibold text-orange-600 dark:text-orange-400">${calculateFee().toFixed(2)}</span>
                  </div>
                  <div className="pt-2 border-t border-blue-200 dark:border-blue-700 flex justify-between">
                    <span className="font-bold">Total Deducted:</span>
                    <span className="font-bold text-lg">${(parseFloat(amount) + calculateFee()).toFixed(2)}</span>
                  </div>

                  {selectedMethod === 'crypto' && selectedCryptoType && (() => {
                    const cryptoPrice = getCryptoPrice(selectedCryptoType);
                    const netAmount = parseFloat(amount) - calculateFee();
                    const cryptoAmount = cryptoPrice > 0 ? netAmount / cryptoPrice : 0;
                    return (
                      <div className="pt-2 border-t border-blue-200 dark:border-blue-700">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">You Will Receive:</span>
                          <span className="font-bold text-green-600 dark:text-green-400">
                            {cryptoPrice > 0 ? (
                              `${cryptoAmount.toFixed(8)} ${selectedCryptoType}`
                            ) : (
                              <span className="flex items-center gap-1 text-sm text-gray-400">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Fetching...
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Warning */}
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-orange-600 dark:text-orange-400">
                    This withdrawal will be deducted from your balance immediately and is subject to approval.
                    {selectedMethod === 'crypto' && ' Ensure the address is correct as crypto transactions cannot be reversed.'}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="flex-1"
                onClick={processWithdrawal}
              >
                Confirm Withdrawal
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}