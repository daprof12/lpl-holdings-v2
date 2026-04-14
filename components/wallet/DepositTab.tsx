import { useState, useEffect } from 'react';
import { CreditCard, Wallet, Building2, Bitcoin, AlertCircle, Copy, Check, Upload, FileText, Camera, User, ArrowRight } from 'lucide-react';
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
import { api } from '../../utils/supabase/api';

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
  const [availableMethods, setAvailableMethods] = useState<DepositMethod[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Load available deposit methods from Supabase
  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const data = await api.paymentMethods.getAll();
        const mappedMethods = Array.isArray(data) ? data.map((m: any) => ({
          id: m.id,
          type: m.type,
          enabled: m.is_active,
          cryptoType: m.currency,
          minDeposit: m.min_amount,
          processingFee: m.fee_percentage,
          notes: m.processing_time,
          ...(m.details || {})
        })) : [];
        setAvailableMethods(mappedMethods.filter((m: any) => m.enabled));
      } catch (error) {
        console.error('Failed to fetch deposit methods:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMethods();
  }, []);

  // Build deposit methods array dynamically based on what's available
  const depositMethodOptions = [
    {
      id: 'crypto' as const,
      name: 'Cryptocurrency',
      icon: Bitcoin,
      description: 'Instant crypto deposits via BTC, ETH, USDT',
      color: 'from-orange-500 to-orange-600',
      isAvailable: availableMethods.some(m => m.type === 'crypto')
    },
    {
      id: 'card' as const,
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Instant deposit with credit/debit card',
      color: 'from-blue-500 to-blue-600',
      isAvailable: availableMethods.some(m => m.type === 'card')
    },
    {
      id: 'bank' as const,
      name: 'Bank Transfer',
      icon: Building2,
      description: 'Secure bank wire transfer (1-3 days)',
      color: 'from-green-500 to-green-600',
      isAvailable: availableMethods.some(m => m.type === 'bank')
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
    const kycSubmission = {
      user_id: currentUser.id,
      ...kycFormData,
      status: 'pending'
    };

    // Save to Relational DB and handle UI updates
    const submitKYC = async () => {
      try {
        await api.kyc.create(kycSubmission);
        
        // Update local profile and add notification
        await updateProfile(currentUser.id, { kycStatus: 'pending' });
        await addNotification(currentUser.id, {
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
      } catch (err) {
        console.error('KYC Submission Error:', err);
        toast.error('Failed to submit KYC verification');
      }
    };

    submitKYC();
  };

  if (selectedMethod) {
    return (
      <div>
        <button
          onClick={() => setSelectedMethod(null)}
          className="mb-6 text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to deposit methods
        </button>

        {selectedMethod === 'crypto' && (
          <CryptoDeposit 
            walletType={walletType} 
            methods={availableMethods.filter(m => m.type === 'crypto')}
          />
        )}
        {selectedMethod === 'card' && (
          <CardDeposit 
            walletType={walletType} 
            methods={availableMethods.filter(m => m.type === 'card')}
          />
        )}
        {selectedMethod === 'bank' && (
          <BankDeposit 
            walletType={walletType} 
            methods={availableMethods.filter(m => m.type === 'bank')}
          />
        )}
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
        {depositMethodOptions.map((method) => (
          <button
            key={method.id}
            onClick={() => method.isAvailable && setSelectedMethod(method.id)}
            className={`p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border-2 transition-all text-left relative overflow-hidden group ${
              method.isAvailable 
                ? 'border-transparent hover:border-blue-500 cursor-pointer' 
                : 'border-transparent opacity-60 cursor-not-allowed'
            }`}
          >
            {!method.isAvailable && (
              <div className="absolute inset-0 bg-gray-100/50 dark:bg-slate-900/50 z-10 flex items-center justify-center">
                <div className="bg-white dark:bg-slate-800 px-3 py-1 rounded-full text-xs font-bold text-gray-400 border border-gray-200 dark:border-slate-700">
                  Coming Soon
                </div>
              </div>
            )}
            
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
              <method.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{method.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{method.description}</p>
            
            <div className="mt-4 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
              {method.isAvailable ? 'Deposit Now' : 'Not Available'}
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </button>
        ))}
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