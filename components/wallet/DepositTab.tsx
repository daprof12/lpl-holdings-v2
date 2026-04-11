import { useState, useEffect } from 'react';
import { CreditCard, Wallet, Building2, Bitcoin, AlertCircle, Copy, Check, Upload, FileText, Camera, User } from 'lucide-react';
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
import CryptoDeposit from './CryptoDeposit';
import CardDeposit from './CardDeposit';
import BankDeposit from './BankDeposit';
import { DepositMethod } from '../admin/DepositMethodsManagement';
import { useAuth } from '../../contexts/AuthContext';
import { useTransactions } from '../../contexts/TransactionProvider';
import { toast } from 'sonner';
import { formatCurrency } from '../../utils/formatNumber';

interface DepositTabProps {
  availableBalance: number;
  walletType?: 'live' | 'portfolio';
  onWalletTypeChange?: (type: 'live' | 'portfolio') => void;
  portfolioBalance?: number;
  liveBalance?: number;
}

interface KYCData {
  userId: string;
  fullName: string;
  dateOfBirth: string;
  nationality: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  idType: 'passport' | 'drivers_license' | 'national_id';
  idNumber: string;
  idDocument?: string; // Base64 or file path
  selfieDocument?: string; // Base64 or file path
  status: 'pending' | 'verified' | 'rejected';
  submittedAt: Date;
  reviewedAt?: Date;
  reviewNotes?: string;
}

export default function DepositTab({ availableBalance, walletType = 'live', onWalletTypeChange, portfolioBalance = 0, liveBalance = 0 }: DepositTabProps) {
  const { currentUser, updateProfile, addNotification } = useAuth();
  const { addTransaction } = useTransactions();
  const [selectedMethod, setSelectedMethod] = useState<'crypto' | 'card' | 'bank' | null>(null);
  const [availableMethods, setAvailableMethods] = useState<{
    crypto: DepositMethod[];
    card: DepositMethod[];
    bank: DepositMethod[];
  }>({
    crypto: [],
    card: [],
    bank: [],
  });

  // KYC Dialog state
  const [showKYCDialog, setShowKYCDialog] = useState(false);
  const [kycFormData, setKYCFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    nationality: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    idType: 'passport' as 'passport' | 'drivers_license' | 'national_id',
    idNumber: '',
    idDocument: '',
    selfieDocument: '',
  });

  // Load available deposit methods from localStorage
  useEffect(() => {
    const loadDepositMethods = () => {
      const stored = localStorage.getItem('depositMethods');

      // Default seed — same as DepositMethodsManagement defaults
      const defaultMethods: DepositMethod[] = [
        { id: 'dm_btc_1', type: 'crypto', enabled: true, cryptoType: 'BTC', walletAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', network: 'Bitcoin', minDeposit: 0.0001 },
        { id: 'dm_eth_1', type: 'crypto', enabled: true, cryptoType: 'ETH', walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', network: 'Ethereum', minDeposit: 0.01 },
        { id: 'dm_usdt_1', type: 'crypto', enabled: true, cryptoType: 'USDT', walletAddress: 'TYASr5UV6HEcXatwdFQfmLVUqQQQMUxHLS', network: 'Tron (TRC20)', minDeposit: 10 },
        { id: 'dm_bank_1', type: 'bank', enabled: true, bankName: 'JPMorgan Chase Bank', accountName: 'Gross Trading Platform LLC', accountNumber: '****5678', routingNumber: '021000021', swiftCode: 'CHASUS33' },
        { id: 'dm_card_1', type: 'card', enabled: true, processorName: 'Stripe', processorType: 'credit_card', publicKey: 'pk_live_XXXXXXXXXXXXXXXXXXXXXXXX', processingFee: 2.9 },
      ];

      let allMethods: DepositMethod[] = defaultMethods;

      if (!stored) {
        // Seed localStorage so admin panel is consistent
        localStorage.setItem('depositMethods', JSON.stringify(defaultMethods));
      } else {
        try {
          allMethods = JSON.parse(stored);
        } catch (error) {
          console.error('Failed to parse deposit methods:', error);
        }
      }

      // Only treat user as having specific config when they have a NON-EMPTY enabledDepositMethods array
      const userEnabledMethods = currentUser?.enabledDepositMethods || [];
      const hasUserSpecificConfig =
        currentUser &&
        Array.isArray(currentUser.enabledDepositMethods) &&
        currentUser.enabledDepositMethods.length > 0;

      let filteredCrypto: DepositMethod[] = [];
      let filteredCard: DepositMethod[] = [];
      let filteredBank: DepositMethod[] = [];

      if (hasUserSpecificConfig) {
        // User has explicit per-user restrictions — honour them
        // Note: m.enabled is the GLOBAL status set by admin
        filteredCrypto = allMethods.filter(m => m.type === 'crypto' && userEnabledMethods.includes('crypto'));
        filteredCard   = allMethods.filter(m => m.type === 'card'   && userEnabledMethods.includes('credit_card'));
        filteredBank   = allMethods.filter(m => m.type === 'bank'   && userEnabledMethods.includes('bank_transfer'));
      } else {
        // Show all methods, we will handle the "enabled" status in the UI
        filteredCrypto = allMethods.filter(m => m.type === 'crypto');
        filteredCard   = allMethods.filter(m => m.type === 'card');
        filteredBank   = allMethods.filter(m => m.type === 'bank');
      }

      setAvailableMethods({
        crypto: filteredCrypto,
        card:   filteredCard,
        bank:   filteredBank,
      });
    };

    loadDepositMethods();
  }, [currentUser?.enabledDepositMethods, currentUser?.cryptoWallets]);

  // Build deposit methods array dynamically based on what's available
  const depositMethods = [
    {
      id: 'crypto' as const,
      name: 'Cryptocurrency',
      icon: Bitcoin,
      description: currentUser?.cryptoWallets 
        ? `${Object.keys(currentUser.cryptoWallets).length} crypto wallet${Object.keys(currentUser.cryptoWallets).length > 1 ? 's' : ''} available`
        : `${availableMethods.crypto.length} crypto option${availableMethods.crypto.length > 1 ? 's' : ''} available`,
      fee: '0%',
      processingTime: 'Instant - 30 min',
      minDeposit: availableMethods.crypto.length > 0 ? `$${Math.min(...availableMethods.crypto.map(m => (m.minDeposit || 0.001) * 45000))}` : '$10',
      color: 'from-orange-500 to-orange-600',
      isAvailable: availableMethods.crypto.some(m => m.enabled)
    },
    {
      id: 'card' as const,
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: `${availableMethods.card.length} processor${availableMethods.card.length > 1 ? 's' : ''} available`,
      fee: availableMethods.card.length > 0 ? `${availableMethods.card[0].processingFee || 2.5}%` : '2.5%',
      processingTime: 'Instant',
      minDeposit: '$50',
      color: 'from-blue-500 to-blue-600',
      isAvailable: availableMethods.card.some(m => m.enabled)
    },
    {
      id: 'bank' as const,
      name: 'Bank Transfer',
      icon: Building2,
      description: `${availableMethods.bank.length} bank option${availableMethods.bank.length > 1 ? 's' : ''} available`,
      fee: '0%',
      processingTime: '1-3 business days',
      minDeposit: '$100',
      color: 'from-green-500 to-green-600',
      isAvailable: availableMethods.bank.some(m => m.enabled)
    },
  ];

  const handleFileUpload = (field: 'idDocument' | 'selfieDocument', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Convert to base64 for storage
      const reader = new FileReader();
      reader.onloadend = () => {
        setKYCFormData({
          ...kycFormData,
          [field]: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKYCSubmit = () => {
    // Validation
    if (!kycFormData.fullName || !kycFormData.dateOfBirth || !kycFormData.address || 
        !kycFormData.city || !kycFormData.country || !kycFormData.idNumber) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!kycFormData.idDocument || !kycFormData.selfieDocument) {
      toast.error('Please upload both ID document and selfie');
      return;
    }

    if (!currentUser) {
      toast.error('User not found');
      return;
    }

    // Create KYC submission
    const kycSubmission: KYCData = {
      userId: currentUser.id,
      ...kycFormData,
      status: 'pending',
      submittedAt: new Date(),
    };

    // Save to localStorage for admin review
    const existingKYC = localStorage.getItem('kycSubmissions');
    const kycSubmissions = existingKYC ? JSON.parse(existingKYC) : [];
    
    // Remove any existing submission from this user
    const filteredSubmissions = kycSubmissions.filter((s: KYCData) => s.userId !== currentUser.id);
    filteredSubmissions.push(kycSubmission);
    
    localStorage.setItem('kycSubmissions', JSON.stringify(filteredSubmissions));

    // Update user KYC status to pending
    updateProfile(currentUser.id, { kycStatus: 'pending' });

    // Add notification
    addNotification(currentUser.id, {
      type: 'info',
      title: 'KYC Verification Submitted',
      message: 'Your KYC verification has been submitted and is pending review. This usually takes 1-2 business days.',
    });

    toast.success('KYC verification submitted successfully! Awaiting approval.');
    setShowKYCDialog(false);
    
    // Reset form
    setKYCFormData({
      fullName: '',
      dateOfBirth: '',
      nationality: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      idType: 'passport',
      idNumber: '',
      idDocument: '',
      selfieDocument: '',
    });
  };

  if (selectedMethod) {
    return (
      <div>
        <button
          onClick={() => setSelectedMethod(null)}
          className="mb-6 text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to deposit methods
        </button>

        {selectedMethod === 'crypto' && <CryptoDeposit walletType={walletType} />}
        {selectedMethod === 'card' && <CardDeposit walletType={walletType} />}
        {selectedMethod === 'bank' && <BankDeposit walletType={walletType} />}
      </div>
    );
  }

  return (
    <div>
      {/* Wallet Type Selector */}
      {onWalletTypeChange && (
        <div className="mb-6 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
          <label className="block text-sm font-semibold mb-3">Deposit To</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onWalletTypeChange('live')}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                walletType === 'live'
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
              }`}
            >
              <div className="font-semibold mb-1">Live Balance</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                ${formatCurrency(liveBalance)} available
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                For trading & positions
              </div>
            </button>
            <button
              onClick={() => onWalletTypeChange('portfolio')}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                walletType === 'portfolio'
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20'
                  : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
              }`}
            >
              <div className="font-semibold mb-1">Portfolio Balance</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                ${formatCurrency(portfolioBalance)} available
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                For investments (IPO/ECN)
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Important Notice */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-600 dark:text-blue-400">
            <p className="font-semibold mb-1">Important Information</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Deposits are usually credited within the specified processing time</li>
              <li>Ensure your account is verified before making large deposits</li>
              <li>Some payment methods may require additional verification</li>
              <li>Minimum and maximum deposit limits apply based on your account level</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Deposit Methods */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {depositMethods.length > 0 ? (
          depositMethods.map((method) => {
            const Icon = method.icon;
            
            return (
              <div
                key={method.id}
                onClick={() => method.isAvailable && setSelectedMethod(method.id as any)}
                className={`bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm transition-all border-2 relative ${
                  method.isAvailable 
                    ? 'hover:shadow-md cursor-pointer border-transparent hover:border-blue-500' 
                    : 'opacity-60 cursor-not-allowed border-gray-100 dark:border-slate-700'
                }`}
              >
                {!method.isAvailable && (
                  <div className="absolute inset-0 z-10 bg-white/40 dark:bg-slate-800/40 rounded-xl flex items-center justify-center p-6 text-center">
                    <div className="bg-white dark:bg-slate-900 px-4 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 text-xs font-bold text-red-600 dark:text-red-400">
                      Deposit method currently not available
                    </div>
                  </div>
                )}
                
                <div className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-lg flex items-center justify-center mb-4 ${!method.isAvailable ? 'grayscale' : ''}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-lg font-semibold mb-2">{method.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{method.description}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Fee:</span>
                    <span className="font-semibold">{method.fee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Processing:</span>
                    <span className="font-semibold">{method.processingTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Min Deposit:</span>
                    <span className="font-semibold">{method.minDeposit}</span>
                  </div>
                </div>

                <Button className="w-full mt-4" disabled={!method.isAvailable}>
                  {method.isAvailable ? 'Select Method' : 'Unavailable'}
                </Button>
              </div>
            );
          })
        ) : (
          <div className="col-span-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-8 border border-yellow-200 dark:border-yellow-800">
            <div className="text-center">
              <Wallet className="w-12 h-12 mx-auto mb-4 text-yellow-600 dark:text-yellow-400" />
              <h3 className="text-lg font-semibold mb-2 text-yellow-600 dark:text-yellow-400">No Deposit Methods Available</h3>
              <p className="text-sm text-yellow-600 dark:text-yellow-400">
                The platform administrator has not configured any deposit methods yet. Please contact support for assistance.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* KYC Verification Dialog */}
      <Dialog open={showKYCDialog} onOpenChange={setShowKYCDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Complete KYC Verification</DialogTitle>
            <DialogDescription>
              Please provide the following information to verify your identity and increase your account limits
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Personal Information */}
            <div className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <User className="w-4 h-4" />
                Personal Information
              </h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name (as on ID) *</Label>
                  <Input
                    value={kycFormData.fullName}
                    onChange={(e) => setKYCFormData({ ...kycFormData, fullName: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label>Date of Birth *</Label>
                  <Input
                    type="date"
                    value={kycFormData.dateOfBirth}
                    onChange={(e) => setKYCFormData({ ...kycFormData, dateOfBirth: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Nationality</Label>
                  <Input
                    value={kycFormData.nationality}
                    onChange={(e) => setKYCFormData({ ...kycFormData, nationality: e.target.value })}
                    placeholder="e.g., American"
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Address Information
              </h4>
              
              <div className="space-y-4">
                <div>
                  <Label>Street Address *</Label>
                  <Input
                    value={kycFormData.address}
                    onChange={(e) => setKYCFormData({ ...kycFormData, address: e.target.value })}
                    placeholder="123 Main Street"
                  />
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label>City *</Label>
                    <Input
                      value={kycFormData.city}
                      onChange={(e) => setKYCFormData({ ...kycFormData, city: e.target.value })}
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <Label>State/Province</Label>
                    <Input
                      value={kycFormData.state}
                      onChange={(e) => setKYCFormData({ ...kycFormData, state: e.target.value })}
                      placeholder="NY"
                    />
                  </div>
                  <div>
                    <Label>Zip/Postal Code</Label>
                    <Input
                      value={kycFormData.zipCode}
                      onChange={(e) => setKYCFormData({ ...kycFormData, zipCode: e.target.value })}
                      placeholder="10001"
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Country *</Label>
                  <Input
                    value={kycFormData.country}
                    onChange={(e) => setKYCFormData({ ...kycFormData, country: e.target.value })}
                    placeholder="United States"
                  />
                </div>
              </div>
            </div>

            {/* ID Document Information */}
            <div className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Identity Document
              </h4>
              
              <div className="space-y-4">
                <div>
                  <Label>ID Type *</Label>
                  <select
                    value={kycFormData.idType}
                    onChange={(e) => setKYCFormData({ ...kycFormData, idType: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                  >
                    <option value="passport">Passport</option>
                    <option value="drivers_license">Driver's License</option>
                    <option value="national_id">National ID Card</option>
                  </select>
                </div>
                
                <div>
                  <Label>ID Number *</Label>
                  <Input
                    value={kycFormData.idNumber}
                    onChange={(e) => setKYCFormData({ ...kycFormData, idNumber: e.target.value })}
                    placeholder="Enter your ID number"
                  />
                </div>

                <div>
                  <Label>Upload ID Document (Front) *</Label>
                  <div className="mt-2">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700/50">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {kycFormData.idDocument ? 'Document uploaded ✓' : 'Click to upload ID document'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or PDF (MAX. 5MB)</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileUpload('idDocument', e)}
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <Label>Upload Selfie with ID *</Label>
                  <div className="mt-2">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700/50">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Camera className="w-8 h-8 mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {kycFormData.selfieDocument ? 'Selfie uploaded ✓' : 'Click to upload selfie'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Hold your ID next to your face</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileUpload('selfieDocument', e)}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-600 dark:text-blue-400">
                  <p className="font-semibold mb-1">Important Information</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>All information must match your official ID document</li>
                    <li>Documents should be clear, unedited, and all details must be visible</li>
                    <li>KYC verification typically takes 1-2 business days</li>
                    <li>Your personal information is encrypted and securely stored</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowKYCDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleKYCSubmit}>
              Submit for Verification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}