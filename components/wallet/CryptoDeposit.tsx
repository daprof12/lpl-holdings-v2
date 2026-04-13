import { useState, useEffect } from 'react';
import { AlertCircle, Check, Copy, Clock, Download, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { showSuccessToast, showErrorToast } from '../common/ToastNotifications';
import { useAuth } from '../../contexts/AuthContext';
import { useTransactions } from '../../contexts/TransactionProvider';
import { DepositMethod } from '../admin/DepositMethodsManagement';
import { toast } from 'sonner';
import { formatCurrency } from '../../utils/formatNumber';
import { useMarketData } from '../../contexts/MarketDataContext';
import QRCode from 'react-qr-code';

// Helper function to copy to clipboard
const copyToClipboard = async (text: string) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      textArea.remove();
    } catch (error) {
      console.error('Fallback: Could not copy text', error);
      textArea.remove();
      throw error;
    }
  }
};

export default function CryptoDeposit({ walletType = 'live', methods }: { walletType?: 'live' | 'portfolio', methods: DepositMethod[] }) {
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  const { currentUser: user } = useAuth();
  const { createDeposit, getRecentDeposits } = useTransactions();
  const marketData = useMarketData();

  // Subscribe to crypto symbols for real-time pricing
  useEffect(() => {
    methods.forEach(method => {
      if (method.cryptoType) {
        const symbol = `${method.cryptoType}USD`;
        marketData.subscribeToSymbol(symbol);
      }
    });

    return () => {
      methods.forEach(method => {
        if (method.cryptoType) {
          const symbol = `${method.cryptoType}USD`;
          marketData.unsubscribeFromSymbol(symbol);
        }
      });
    };
  }, [methods]);

  // Get real-time crypto price from MarketDataContext
  const getCryptoPrice = (cryptoSymbol: string): number => {
    const symbol = `${cryptoSymbol}USD`;
    const priceData = marketData.getPrice(symbol);
    return priceData?.price || 0;
  };

  // Common network fees per crypto + network (in the native token)
  const getNetworkFee = (crypto: string, network: string): { fee: string; usdEstimate: string } => {
    const feeMap: Record<string, Record<string, { fee: string; usdEstimate: string }>> = {
      BTC: {
        'Bitcoin':          { fee: '0.0001 BTC',   usdEstimate: '~$3-10' },
        'Bitcoin (Legacy)': { fee: '0.00015 BTC',  usdEstimate: '~$5-15' },
        'Lightning':        { fee: '< 1 sat/vB',   usdEstimate: '~$0.01' },
      },
      ETH: {
        'Ethereum':         { fee: '0.0005-0.005 ETH', usdEstimate: '~$1-15' },
        'Ethereum (ERC20)': { fee: '0.001-0.005 ETH',  usdEstimate: '~$3-15' },
        'Arbitrum':         { fee: '0.0001 ETH',       usdEstimate: '~$0.10-0.50' },
        'Optimism':         { fee: '0.0001 ETH',       usdEstimate: '~$0.10-0.50' },
        'Base':             { fee: '0.00005 ETH',      usdEstimate: '~$0.05-0.25' },
      },
      USDT: {
        'Tron (TRC20)':     { fee: '1 USDT',       usdEstimate: '~$1.00' },
        'Ethereum (ERC20)': { fee: '3-15 USDT',    usdEstimate: '~$3-15' },
        'BNB Smart Chain (BEP20)': { fee: '0.5 USDT', usdEstimate: '~$0.50' },
        'Polygon':          { fee: '0.1 USDT',     usdEstimate: '~$0.10' },
        'Arbitrum':         { fee: '0.1 USDT',     usdEstimate: '~$0.10' },
        'Solana':           { fee: '0.01 USDT',    usdEstimate: '~$0.01' },
        'Avalanche':        { fee: '0.5 USDT',     usdEstimate: '~$0.50' },
      },
      BNB: {
        'BNB Smart Chain (BEP20)': { fee: '0.0005 BNB', usdEstimate: '~$0.30' },
        'BNB Smart Chain':  { fee: '0.0005 BNB',  usdEstimate: '~$0.30' },
      },
      SOL: {
        'Solana':           { fee: '0.000005 SOL', usdEstimate: '~$0.001' },
      },
      XRP: {
        'Ripple':           { fee: '0.01 XRP',     usdEstimate: '~$0.01' },
        'XRP Ledger':       { fee: '0.01 XRP',     usdEstimate: '~$0.01' },
      },
      ADA: {
        'Cardano':          { fee: '0.17 ADA',     usdEstimate: '~$0.07' },
      },
      DOGE: {
        'Dogecoin':         { fee: '1 DOGE',       usdEstimate: '~$0.10' },
      },
      LTC: {
        'Litecoin':         { fee: '0.001 LTC',    usdEstimate: '~$0.10' },
      },
      MATIC: {
        'Polygon':          { fee: '0.01 MATIC',   usdEstimate: '~$0.01' },
      },
    };

    const cryptoFees = feeMap[crypto];
    if (cryptoFees) {
      // Try exact match first, then partial match
      if (cryptoFees[network]) return cryptoFees[network];
      for (const [key, value] of Object.entries(cryptoFees)) {
        if (network.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(network.toLowerCase())) {
          return value;
        }
      }
    }
    return { fee: `Variable`, usdEstimate: '~$0.50-5.00' };
  };

  // Build crypto options from admin-configured deposit methods
  // Group by cryptoType to handle multiple networks for same crypto
  const cryptoOptionsMap = new Map<string, {
    symbol: string;
    name: string;
    networks: string[];
    addresses: { [network: string]: string };
    minDeposit: number;
    price: number;
  }>();

  methods.forEach(method => {
    if (method.cryptoType && method.network && method.walletAddress) {
      const existing = cryptoOptionsMap.get(method.cryptoType);
      if (existing) {
        // Add network and address to existing crypto
        if (!existing.networks.includes(method.network)) {
          existing.networks.push(method.network);
          existing.addresses[method.network] = method.walletAddress;
        }
      } else {
        // Create new crypto option
        cryptoOptionsMap.set(method.cryptoType, {
          symbol: method.cryptoType,
          name: method.cryptoType,
          networks: [method.network],
          addresses: { [method.network]: method.walletAddress },
          minDeposit: method.minDeposit || 0.001,
          price: getCryptoPrice(method.cryptoType),
        });
      }
    }
  });

  const cryptoOptions = Array.from(cryptoOptionsMap.values());

  // Set default selection to first available crypto
  useEffect(() => {
    if (cryptoOptions.length > 0 && !selectedCrypto) {
      const firstCrypto = cryptoOptions[0];
      setSelectedCrypto(firstCrypto.symbol);
      setSelectedNetwork(firstCrypto.networks[0]);
    }
  }, [cryptoOptions.length]);

  // Get recent crypto deposits for current user
  const recentDeposits = user ? getRecentDeposits(user.id, 'crypto') : [];

  // Get current deposit address from admin configuration based on selected crypto and network
  const selectedCryptoData = cryptoOptions.find(c => c.symbol === selectedCrypto);
  const depositAddress = selectedCryptoData && selectedNetwork 
    ? (selectedCryptoData.addresses[selectedNetwork] || 'No address configured')
    : 'No address configured';
  
  const currentPrice = getCryptoPrice(selectedCrypto);
  const minDepositUSD = selectedCryptoData?.minDeposit ? selectedCryptoData.minDeposit * currentPrice : 10;
  
  // Get fee configuration from the admin-configured method
  const selectedMethodConfig = methods.find(
    m => m.cryptoType === selectedCrypto && m.network === selectedNetwork
  );
  
  // Calculate deposit fee based on admin configuration
  const calculateDepositFee = (usdAmount: number): number => {
    if (!selectedMethodConfig || !usdAmount) return 0;
    
    if (selectedMethodConfig.depositFeeType === 'fixed') {
      return selectedMethodConfig.depositFee || 0;
    } else {
      // Percentage fee
      return (usdAmount * (selectedMethodConfig.depositFee || 0)) / 100;
    }
  };
  
  const depositFee = amount && parseFloat(amount) > 0 ? calculateDepositFee(parseFloat(amount)) : 0;
  const totalAmount = amount && parseFloat(amount) > 0 ? parseFloat(amount) + depositFee : 0;
  
  // Calculate crypto equivalent from USD amount (after fee)
  const cryptoAmount = amount && parseFloat(amount) > 0 && currentPrice > 0 ? parseFloat(amount) / currentPrice : 0;

  const handleCopy = () => {
    copyToClipboard(depositAddress)
      .then(() => {
        setCopied(true);
        showSuccessToast('Address copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        showErrorToast('Failed to copy address to clipboard.');
      });
  };

  const handlePaymentConfirmation = () => {
    if (!amount || parseFloat(amount) <= 0) {
      showErrorToast('Please enter a valid deposit amount');
      return;
    }

    if (parseFloat(amount) < minDepositUSD) {
      showErrorToast(`Minimum deposit is ${minDepositUSD} USD`);
      return;
    }

    if (!user) {
      showErrorToast('User not authenticated');
      return;
    }

    // Open confirmation modal instead of immediately processing
    setShowConfirmModal(true);
  };

  const processPayment = async () => {
    if (!user) return;

    setIsSubmitting(true);

    try {
      // Create transaction in relational DB
      const result = await createDeposit({
        amount: parseFloat(amount),
        payment_method: 'crypto',
        currency: selectedCrypto,
        walletAddress: depositAddress,
        network: selectedNetwork,
        walletType,
        metadata: {
          cryptoAmount,
          currentPrice
        }
      });

      if (!result.success) {
        throw new Error(result.error || 'Failed to submit deposit');
      }

      showSuccessToast(`Deposit request submitted successfully!`);
      
      // Close modal and reset form
      setShowConfirmModal(false);
      setAmount('');
    } catch (error) {
      console.error('Deposit processing error:', error);
      showErrorToast((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl">
      {cryptoOptions.length === 0 ? (
        /* No Crypto Methods Configured */
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No Cryptocurrency Deposit Methods Available</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            The platform administrator has not configured any cryptocurrency deposit methods yet. 
            Please contact support or check back later.
          </p>
          <Button
            onClick={() => window.location.href = '/support'}
            variant="outline"
          >
            Contact Support
          </Button>
        </div>
      ) : (
        <>
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Cryptocurrency Deposit</h3>

        {/* Amount Input */}
        <div className="mb-6">
          <Label htmlFor="amount" className="mb-3 block">Deposit Amount</Label>
          <div className="relative">
            <Input
              id="amount"
              type="number"
              step="0.00000001"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pr-16"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 font-semibold text-gray-600 dark:text-gray-400">
              USD
            </div>
          </div>
          {amount && parseFloat(amount) > 0 && (
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
              {currentPrice > 0 ? (
                <>≈ {cryptoAmount.toLocaleString(undefined, { minimumFractionDigits: 8, maximumFractionDigits: 8 })} {selectedCrypto}</>
              ) : (
                <span className="flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Fetching real-time price...
                </span>
              )}
            </div>
          )}
        </div>

        {/* Crypto Selection */}
        <div className="mb-6">
          <Label className="mb-3 block">Select Cryptocurrency</Label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {cryptoOptions.map((crypto) => (
              <button
                key={crypto.symbol}
                onClick={() => {
                  setSelectedCrypto(crypto.symbol);
                  setSelectedNetwork(crypto.networks[0]);
                }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedCrypto === crypto.symbol
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
        <div className="mb-6">
          <Label className="mb-3 block">Select Network</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedCryptoData?.networks.map((network) => (
              <button
                key={network}
                onClick={() => setSelectedNetwork(network)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  selectedNetwork === network
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="font-semibold">{network}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Network fee: {getNetworkFee(selectedCrypto, network).fee} ({getNetworkFee(selectedCrypto, network).usdEstimate})
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Warning */}
        <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-orange-600 dark:text-orange-400">
              <p className="font-semibold mb-2">Important: Please Read Carefully</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Send only {selectedCrypto} to this address on the {selectedNetwork} network</li>
                <li>Sending any other cryptocurrency or using wrong network will result in permanent loss</li>
                <li>Minimum deposit: 0.001 {selectedCrypto}</li>
                <li>Deposits require {selectedCrypto === 'BTC' ? '3' : selectedCrypto === 'ETH' ? '12' : '15'} confirmations before being credited</li>
                <li>Contract deposits are not supported</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Deposit Address */}
        <div className="mb-6">
          <Label className="mb-3 block">Deposit Address</Label>
          
          <div className="flex gap-3">
            <div className="flex-1 p-4 bg-gray-100 dark:bg-slate-700 rounded-lg font-mono text-sm break-all">
              {depositAddress}
            </div>
            
            <Button
              variant="outline"
              size="lg"
              onClick={handleCopy}
              className="flex-shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>

        {/* QR Code */}
        <div className="mb-6">
          <Label className="mb-3 block">QR Code</Label>
          <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-slate-600">
            <div className="bg-white p-4 rounded-lg">
              <QRCode
                value={depositAddress}
                size={192}
                bgColor="#ffffff"
                fgColor="#000000"
                level="M"
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-4">
              Scan this QR code with your {selectedCrypto} wallet
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg mb-6">
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Expected Arrival</div>
            <div className="font-semibold">10-30 min</div>
          </div>
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Min Deposit</div>
            <div className="font-semibold">0.001 {selectedCrypto}</div>
          </div>
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Network Fee</div>
            <div className="font-semibold">Paid by sender</div>
          </div>
        </div>

        {/* Fee Breakdown - Show when amount is entered */}
        {amount && parseFloat(amount) > 0 && selectedMethodConfig && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold mb-3 text-sm">Transaction Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Deposit Amount:</span>
                <span className="font-semibold">${parseFloat(amount).toFixed(2)}</span>
              </div>
              {(selectedMethodConfig.depositFee && selectedMethodConfig.depositFee > 0) ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Platform Fee {selectedMethodConfig.depositFeeType === 'percentage' && `(${selectedMethodConfig.depositFee}%)`}:
                    </span>
                    <span className="font-semibold text-orange-600 dark:text-orange-400">
                      ${depositFee.toFixed(2)}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-blue-200 dark:border-blue-700 flex justify-between">
                    <span className="font-semibold">Total to Send:</span>
                    <span className="font-semibold text-lg">${totalAmount.toFixed(2)}</span>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <Check className="w-4 h-4" />
                  <span className="font-semibold">No platform fee for this transaction</span>
                </div>
              )}
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Send exactly {cryptoAmount.toLocaleString(undefined, { minimumFractionDigits: 8, maximumFractionDigits: 8 })} {selectedCrypto} to receive ${parseFloat(amount).toFixed(2)} in your account
              </div>
            </div>
          </div>
        )}

        {/* Payment Confirmation Button */}
        <div className="mt-6">
          <Button
            onClick={handlePaymentConfirmation}
            className="w-full"
            size="lg"
            disabled={!amount || parseFloat(amount) <= 0 || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Clock className="w-5 h-5 mr-2" />
                I have made payment{amount && parseFloat(amount) > 0 ? ` of ${amount} USD` : ''}
              </>
            )}
          </Button>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
            Click this button after you've sent {selectedCrypto} to the above address
          </p>
        </div>

        {/* Help Link */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
          <a href="#" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-sm">
            <Download className="w-4 h-4" />
            How to deposit cryptocurrency? (Tutorial)
          </a>
        </div>
      </div>

      {/* Recent Deposits */}
      <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recent Crypto Deposits</h3>
        
        {recentDeposits.length > 0 ? (
          <div className="space-y-3">
            {recentDeposits.map((deposit) => {
              const depositDate = new Date(deposit.timestamp);
              const statusColors = {
                pending: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
                completed: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
                rejected: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400',
                cancelled: 'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400',
              };

              return (
                <div key={deposit.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                  <div>
                    <div className="font-semibold">{deposit.amount} {deposit.currency}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {depositDate.toLocaleDateString()} {depositDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      ≈ ${deposit.usdEquivalent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`px-3 py-1 text-sm rounded-full capitalize ${statusColors[deposit.status]}`}>
                      {deposit.status}
                    </span>
                    {deposit.adminNotes && (
                      <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded text-xs text-blue-700 dark:text-blue-300 max-w-[450px] text-right">
                        <span className="font-semibold block mb-0.5">Reason:</span>
                        {deposit.adminNotes}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No recent deposits</p>
            <p className="text-sm mt-2">Your crypto deposits will appear here</p>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowConfirmModal(false)}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-200 dark:border-slate-700" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Confirm Deposit Payment</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Please verify your payment details</p>
              </div>
            </div>

            <div className="mb-6 space-y-4">
              {/* Cryptocurrency Details */}
              <div className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Cryptocurrency</div>
                <div className="font-semibold">{selectedCrypto}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Network: {selectedNetwork}
                </div>
              </div>

              {/* Deposit Address */}
              <div className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Deposit Address</div>
                <div className="font-mono text-xs break-all">{depositAddress}</div>
              </div>

              {/* Amount Details */}
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Deposit Amount (USD):</span>
                    <span className="font-semibold">${parseFloat(amount).toFixed(2)}</span>
                  </div>
                  {selectedMethodConfig && selectedMethodConfig.depositFee && selectedMethodConfig.depositFee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Platform Fee:</span>
                      <span className="font-semibold text-orange-600 dark:text-orange-400">${depositFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-blue-200 dark:border-blue-700 flex justify-between">
                    <span className="font-bold">Crypto to Send:</span>
                    <span className="font-bold text-lg">
                      {currentPrice > 0 ? (
                        `${cryptoAmount.toLocaleString(undefined, { minimumFractionDigits: 8, maximumFractionDigits: 8 })} ${selectedCrypto}`
                      ) : (
                        <span className="flex items-center gap-1 text-sm text-gray-400">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Fetching...
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 pt-2">
                    Current Rate: 1 {selectedCrypto} = ${formatCurrency(currentPrice)}
                  </div>
                </div>
              </div>

              {/* Warning */}
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-orange-600 dark:text-orange-400">
                    By confirming, you declare that you have sent the exact amount of {selectedCrypto} to the address above. 
                    Your deposit will be credited after network confirmations (typically 10-30 minutes).
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
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="flex-1"
                onClick={processPayment}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Confirm Payment'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
}