import { useState, useEffect } from 'react';
import { CreditCard, Lock, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useAuth } from '../../contexts/AuthContext';
import { useTransactions } from '../../contexts/TransactionProvider';
import { showSuccessToast, showErrorToast } from '../common/ToastNotifications';
import { DepositMethod } from '../admin/DepositMethodsManagement';
import { formatCurrency } from '../../utils/formatNumber';

export default function CardDeposit({ walletType = 'live' }: { walletType?: 'live' | 'portfolio' }) {
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [cardMethods, setCardMethods] = useState<DepositMethod[]>([]);
  const [selectedProcessor, setSelectedProcessor] = useState<string>('');

  const { currentUser: user } = useAuth();
  const { addTransaction, getRecentDeposits } = useTransactions();

  // Load card/processor deposit methods from localStorage
  useEffect(() => {
    const loadDepositMethods = () => {
      const stored = localStorage.getItem('depositMethods');
      if (stored) {
        try {
          const allMethods: DepositMethod[] = JSON.parse(stored);
          const cardOnly = allMethods.filter(m => m.type === 'card' && m.enabled);
          setCardMethods(cardOnly);
          
          // Set default selection to first available processor
          if (cardOnly.length > 0 && !selectedProcessor) {
            setSelectedProcessor(cardOnly[0].id);
          }
        } catch (error) {
          console.error('Failed to load deposit methods:', error);
        }
      }
    };

    loadDepositMethods();
    
    // Listen for changes to deposit methods
    const handleStorageChange = () => loadDepositMethods();
    window.addEventListener('storage', handleStorageChange);
    
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Get recent card deposits for current user
  const recentDeposits = user ? getRecentDeposits(user.id, 'card') : [];

  // Get current processor
  const currentProcessor = cardMethods.find(m => m.id === selectedProcessor);
  const processingFeePercent = currentProcessor?.processingFee || 2.5;
  const fee = parseFloat(amount) * (processingFeePercent / 100);
  const total = parseFloat(amount) + fee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) < 10) {
      showErrorToast('Minimum deposit is $10');
      return;
    }

    if (!user) {
      showErrorToast('User not authenticated');
      return;
    }

    if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
      showErrorToast('Please fill in all card details');
      return;
    }

    // Create transaction
    const txId = addTransaction({
      userId: user.id,
      type: 'deposit',
      method: 'card',
      amount: parseFloat(amount),
      currency: 'USD',
      usdEquivalent: parseFloat(amount),
      status: 'pending',
      cardLast4: cardNumber.slice(-4),
      walletType,
    });

    showSuccessToast(`Card deposit submitted! Transaction ID: ${txId.slice(0, 12)}...`);
    
    // Reset form
    setAmount('');
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setCardholderName('');
    setSaveCard(false);
  };

  const quickAmounts = [50, 100, 250, 500, 1000, 2500];

  return (
    <div className="max-w-2xl">
      <form onSubmit={handleSubmit}>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Card Deposit</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Instant deposit with credit/debit card</p>
            </div>
          </div>

          {/* Amount */}
          <div className="mb-6">
            <Label htmlFor="amount" className="mb-3 block">Deposit Amount (USD)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="text-2xl h-14"
              required
            />
            
            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-3">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmount(amt.toString())}
                  className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-sm transition-colors"
                >
                  ${amt}
                </button>
              ))}
            </div>

            <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Min: $50 | Max: $10,000
            </div>
          </div>

          {/* Card Number */}
          <div className="mb-4">
            <Label htmlFor="cardNumber">Card Number</Label>
            <div className="relative mt-2">
              <Input
                id="cardNumber"
                type="text"
                value={cardNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
                  setCardNumber(value);
                }}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="pl-10"
                required
              />
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Expiry & CVV */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                type="text"
                value={expiryDate}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '');
                  if (value.length >= 2) {
                    value = value.slice(0, 2) + '/' + value.slice(2, 4);
                  }
                  setExpiryDate(value);
                }}
                placeholder="MM/YY"
                maxLength={5}
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                placeholder="123"
                maxLength={4}
                className="mt-2"
                required
              />
            </div>
          </div>

          {/* Cardholder Name */}
          <div className="mb-6">
            <Label htmlFor="cardholderName">Cardholder Name</Label>
            <Input
              id="cardholderName"
              type="text"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value.toUpperCase())}
              placeholder="JOHN DOE"
              className="mt-2"
              required
            />
          </div>

          {/* Save Card Checkbox */}
          <div className="mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={saveCard}
                onChange={(e) => setSaveCard(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">Save card for future deposits</span>
            </label>
          </div>

          {/* Fee Breakdown */}
          {amount && parseFloat(amount) >= 50 && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Deposit Amount:</span>
                <span className="font-semibold">${parseFloat(amount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Processing Fee ({processingFeePercent}%):</span>
                <span className="font-semibold">${fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-slate-600">
                <span className="font-semibold">Total to Pay:</span>
                <span className="font-semibold text-lg">${total.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-green-600 dark:text-green-400">
                <p className="font-semibold mb-1">Secure Payment</p>
                <p className="text-xs">Your card information is encrypted and processed securely through our PCI-DSS compliant payment gateway.</p>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-orange-600 dark:text-orange-400">
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Deposits are usually instant but may take up to 5 minutes</li>
                  <li>Some banks may charge additional foreign transaction fees</li>
                  <li>Ensure your card supports international transactions</li>
                  <li>Daily limit: $10,000 per card</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={!amount || parseFloat(amount) < 50}
          >
            <Lock className="w-4 h-4 mr-2" />
            Deposit ${amount ? parseFloat(amount).toFixed(2) : '0.00'}
          </Button>
        </div>
      </form>

      {/* Saved Cards */}
      <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Saved Cards</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border-2 border-gray-200 dark:border-slate-700 rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold">•••• 4242</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Expires 12/26</div>
              </div>
            </div>
            <Button variant="outline" size="sm">Use Card</Button>
          </div>

          <button className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg hover:border-blue-500 transition-colors text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
            + Add New Card
          </button>
        </div>
      </div>

      {/* Recent Deposits */}
      <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recent Card Deposits</h3>
        
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
                    <div className="font-semibold">${formatCurrency(deposit.amount)}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {depositDate.toLocaleDateString()} {depositDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    {deposit.cardLast4 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Card •••• {deposit.cardLast4}
                      </div>
                    )}
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
            <p className="text-sm mt-2">Your card deposits will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}