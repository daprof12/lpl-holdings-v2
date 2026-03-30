import { useState, useEffect } from 'react';
import { Copy, Check, Building2, AlertCircle, Clock, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { formatCurrency } from '../../utils/formatNumber';
import { useAuth } from '../../contexts/AuthContext';
import { useTransactions } from '../../contexts/TransactionProvider';
import { DepositMethod } from '../admin/DepositMethodsManagement';

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

export default function BankDeposit({ walletType = 'live' }: { walletType?: 'live' | 'portfolio' }) {
  const [selectedMethodId, setSelectedMethodId] = useState<string>('');
  const [amount, setAmount] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [bankMethods, setBankMethods] = useState<DepositMethod[]>([]);

  const { currentUser: user } = useAuth();
  const { addTransaction, getRecentDeposits } = useTransactions();

  // Load bank deposit methods from localStorage
  useEffect(() => {
    const loadDepositMethods = () => {
      const stored = localStorage.getItem('depositMethods');
      if (stored) {
        try {
          const allMethods: DepositMethod[] = JSON.parse(stored);
          const bankOnly = allMethods.filter(m => m.type === 'bank' && m.enabled);
          setBankMethods(bankOnly);
          
          // Set default selection to first available bank
          if (bankOnly.length > 0 && !selectedMethodId) {
            setSelectedMethodId(bankOnly[0].id);
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

  // Get recent bank deposits for current user
  const recentDeposits = user ? getRecentDeposits(user.id, 'bank') : [];

  // Get currently selected bank method
  const currentMethod = bankMethods.find(m => m.id === selectedMethodId);

  const handleCopy = (text: string, field: string) => {
    copyToClipboard(text)
      .then(() => {
        setCopied(field);
        toast.success('Copied to clipboard');
        setTimeout(() => setCopied(null), 2000);
      })
      .catch(() => {
        toast.error('Failed to copy to clipboard');
      });
  };

  const CopyButton = ({ text, field }: { text: string; field: string }) => (
    <button
      onClick={() => handleCopy(text, field)}
      className="ml-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
    >
      {copied === field ? (
        <Check className="w-4 h-4 text-green-600" />
      ) : (
        <Copy className="w-4 h-4 text-gray-400" />
      )}
    </button>
  );

  const handlePaymentConfirmation = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid deposit amount');
      return;
    }

    const methodData = bankMethods.find(m => m.id === selectedMethodId);
    const minAmount = selectedMethodId === 'sepa' ? 100 : selectedMethodId === 'ach' ? 100 : 1000;
    
    if (parseFloat(amount) < minAmount) {
      toast.error(`Minimum deposit is ${methodData?.minDeposit}`);
      return;
    }

    if (!user) {
      toast.error('User not authenticated');
      return;
    }

    // Create transaction
    const txId = addTransaction({
      userId: user.id,
      type: 'deposit',
      method: 'bank',
      amount: parseFloat(amount),
      currency: 'USD',
      usdEquivalent: parseFloat(amount),
      status: 'pending',
      bankName: currentMethod?.bankName,
      accountNumber: 'accountNumber' in currentMethod ? currentMethod.accountNumber : currentMethod.iban,
      walletType,
    });

    toast.success(`Bank transfer deposit submitted! Transaction ID: ${txId.slice(0, 12)}...`);
    setAmount('');
  };

  return (
    <div className="max-w-3xl">
      {/* Method Selection */}
      {bankMethods.length > 0 && (
        <div className="mb-6">
          <Label className="mb-3 block">Select Bank Account</Label>
          <div className="grid md:grid-cols-2 gap-4">
            {bankMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethodId(method.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  selectedMethodId === method.id
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="font-semibold mb-1">{method.bankName}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">{method.accountName}</div>
                {method.notes && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {method.notes}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {bankMethods.length === 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 mb-6 border border-yellow-200 dark:border-yellow-800">
          <p className="text-yellow-600 dark:text-yellow-400">
            No bank deposit methods configured. Please contact support.
          </p>
        </div>
      )}

      {currentMethod && (
        <>
          {/* Bank Details */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-500 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Bank Transfer Details</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Use these details to send your deposit</p>
              </div>
            </div>

            {/* Important Instructions */}
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-600 dark:text-blue-400">
                  <p className="font-semibold mb-2">Important Instructions:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Include your user ID ({user?.id.slice(0, 8)}) in the transfer description</li>
                    <li>Deposits from third-party accounts may be rejected</li>
                    <li>Processing time starts after we receive the funds</li>
                    <li>Keep your transfer receipt for verification purposes</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bank Account Details */}
            <div className="space-y-4">
              {currentMethod.bankName && (
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Bank Name</div>
                    <div className="font-mono font-semibold">{currentMethod.bankName}</div>
                  </div>
                  <CopyButton text={currentMethod.bankName} field="bankName" />
                </div>
              )}

              {currentMethod.accountName && (
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Account Name</div>
                    <div className="font-mono font-semibold">{currentMethod.accountName}</div>
                  </div>
                  <CopyButton text={currentMethod.accountName} field="accountName" />
                </div>
              )}

              {currentMethod.accountNumber && (
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Account Number</div>
                    <div className="font-mono font-semibold">{currentMethod.accountNumber}</div>
                  </div>
                  <CopyButton text={currentMethod.accountNumber} field="accountNumber" />
                </div>
              )}

              {currentMethod.routingNumber && (
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Routing Number</div>
                    <div className="font-mono font-semibold">{currentMethod.routingNumber}</div>
                  </div>
                  <CopyButton text={currentMethod.routingNumber} field="routingNumber" />
                </div>
              )}

              {currentMethod.swiftCode && (
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">SWIFT Code</div>
                    <div className="font-mono font-semibold">{currentMethod.swiftCode}</div>
                  </div>
                  <CopyButton text={currentMethod.swiftCode} field="swiftCode" />
                </div>
              )}

              {currentMethod.iban && (
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">IBAN</div>
                    <div className="font-mono font-semibold">{currentMethod.iban}</div>
                  </div>
                  <CopyButton text={currentMethod.iban} field="iban" />
                </div>
              )}

              {currentMethod.bankAddress && (
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Bank Address</div>
                    <div className="font-mono font-semibold">{currentMethod.bankAddress}</div>
                  </div>
                  <CopyButton text={currentMethod.bankAddress} field="bankAddress" />
                </div>
              )}
            </div>

            {/* Reference Highlight */}
            <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border-2 border-orange-300 dark:border-orange-800">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-orange-600 dark:text-orange-400 mb-1">
                    ⚠️ CRITICAL: Include Your Reference Number
                  </p>
                  <p className="text-sm text-orange-600 dark:text-orange-400">
                    Your reference number <span className="font-mono font-bold">{user?.id.slice(0, 8).toUpperCase()}</span> MUST be included
                    in the transfer description. Without it, we cannot credit your account automatically.
                  </p>
                </div>
              </div>
            </div>

            {currentMethod.notes && (
              <div className="mt-4 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">{currentMethod.notes}</p>
              </div>
            )}
          </div>

          {/* Amount Input */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm mb-6">
            <Label htmlFor="bankAmount" className="mb-3 block">Deposit Amount (USD)</Label>
            <Input
              id="bankAmount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="text-2xl h-14 mb-3"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Minimum: $100 | Processing time: 1-3 business days
            </p>
          </div>

          {/* Upload Proof */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm mb-6">
            <h3 className="text-lg font-semibold mb-4">Upload Transfer Proof (Optional)</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Upload your bank transfer receipt to speed up processing
            </p>
            
            <div className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PDF, PNG, JPG up to 10MB
              </p>
              <input type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg" />
            </div>
          </div>

          {/* Notify Button */}
          <Button 
            size="lg" 
            className="w-full mb-6" 
            onClick={handlePaymentConfirmation}
            disabled={!amount || parseFloat(amount) <= 0}
          >
            <Clock className="w-5 h-5 mr-2" />
            I've Completed the Transfer
          </Button>
        </>
      )}

      {/* Recent Transfers */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recent Bank Deposits</h3>
        
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
                    {deposit.bankName && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {deposit.bankName}
                      </div>
                    )}
                  </div>
                  <span className={`px-3 py-1 text-sm rounded-full capitalize ${statusColors[deposit.status]}`}>
                    {deposit.status}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No recent deposits</p>
            <p className="text-sm mt-2">Your bank transfers will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}