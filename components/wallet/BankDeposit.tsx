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

export default function BankDeposit({ walletType = 'live', methods }: { walletType?: 'live' | 'portfolio', methods: DepositMethod[] }) {
  const [selectedMethodId, setSelectedMethodId] = useState<string>('');
  const [amount, setAmount] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [proofData, setProofData] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const { currentUser: user } = useAuth();
  const { createDeposit, getRecentDeposits } = useTransactions();

  // Set default selection to first available bank
  useEffect(() => {
    if (methods.length > 0 && !selectedMethodId) {
      setSelectedMethodId(methods[0].id);
    }
  }, [methods]);

  // Get recent bank deposits for current user
  const recentDeposits = user ? getRecentDeposits(user.id, 'bank') : [];

  // Get currently selected bank method
  const currentMethod = methods.find(m => m.id === selectedMethodId);

  const calculateDepositFee = (amt: number): number => {
    if (!currentMethod || !amt) return 0;
    if (currentMethod.depositFeeType === 'fixed') {
      return currentMethod.depositFee || 0;
    }
    // Percentage fee — use depositFee if set, fallback to processingFee for backward compat
    const feePercent = currentMethod.depositFee || currentMethod.processingFee || 0;
    return amt * (feePercent / 100);
  };

  const feeType = currentMethod?.depositFeeType || 'percentage';
  const feeValue = currentMethod?.depositFee || currentMethod?.processingFee || 0;
  const fee = parseFloat(amount) > 0 ? calculateDepositFee(parseFloat(amount)) : 0;
  const total = parseFloat(amount) + fee;

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB to avoid exploding database column capacity)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be under 5MB');
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setProofData(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePaymentConfirmation = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid deposit amount');
      return;
    }

    const methodData = methods.find(m => m.id === selectedMethodId);
    if (!methodData) return;

    if (parseFloat(amount) < (methodData.minDeposit || 100)) {
      toast.error(`Minimum deposit is ${methodData.minDeposit}`);
      return;
    }

    if (!user) {
      toast.error('User not authenticated');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create transaction in relational DB
      const result = await createDeposit({
        amount: parseFloat(amount),
        payment_method: 'bank',
        currency: 'USD',
        bankName: methodData.bankName,
        accountNumber: 'accountNumber' in methodData ? (methodData as any).accountNumber : (methodData as any).iban,
        walletType,
        metadata: {
          methodId: selectedMethodId,
          proof_data: proofData
        }
      });

      if (!result.success) {
        throw new Error(result.error || 'Failed to submit deposit');
      }

      toast.success(`Bank transfer deposit submitted successfully!`);
      setAmount('');
      setProofData(null);
      setFileName(null);
    } catch (error) {
      console.error('Bank deposit error:', error);
      toast.error((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl">
      {/* Method Selection */}
      {methods.length > 0 && (
        <div className="mb-6">
          <Label className="mb-3 block">Select Bank Account</Label>
          <div className="grid md:grid-cols-2 gap-4">
            {methods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethodId(method.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${selectedMethodId === method.id
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

      {methods.length === 0 && (
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
              Minimum: ${currentMethod?.minDeposit || 100} | Processing time: {currentMethod?.notes || '30 min - 2 hours after approval'}
            </p>

            {/* Fee Breakdown */}
            {amount && parseFloat(amount) >= (currentMethod?.minDeposit || 100) && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Deposit Amount:</span>
                  <span className="font-semibold">${parseFloat(amount).toFixed(2)}</span>
                </div>
                {fee > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Platform Fee {feeType === 'percentage' ? `(${feeValue}%)` : '(Fixed)'}:</span>
                    <span className="font-semibold">${fee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-slate-600 mt-2">
                  <span className="font-semibold">Total to Send:</span>
                  <span className="font-semibold text-lg text-blue-600 dark:text-blue-400">${total.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Upload Proof */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm mb-6">
            <h3 className="text-lg font-semibold mb-4">Upload Transfer Proof (Optional)</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Upload your bank transfer receipt to speed up processing
            </p>

            <label className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer block relative">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              {fileName ? (
                <>
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    {fileName}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400">Ready to submit ✓ (Click to change)</p>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PDF, PNG, JPG up to 5MB
                  </p>
                </>
              )}
              <input
                type="file"
                className="hidden absolute inset-0 w-full h-full cursor-pointer"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileUpload}
              />
            </label>
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
            <p className="text-sm mt-2">Your bank transfers will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}