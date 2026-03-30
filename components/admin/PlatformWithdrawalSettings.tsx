import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Building2, DollarSign, Wallet, Clock, AlertCircle } from 'lucide-react';
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
import { formatCurrency } from '../../utils/formatNumber';

export interface PlatformWithdrawalInfo {
  id: string;
  type: 'bank' | 'paypal' | 'crypto';
  enabled: boolean;
  
  // General info
  minWithdrawal: number;
  maxWithdrawal: number;
  processingTime: string; // e.g., "1-3 business days"
  fee: number; // percentage
  fixedFee?: number; // fixed fee in USD
  
  // Bank specific
  supportedBankTypes?: string[]; // e.g., ["Wire Transfer", "ACH", "SEPA"]
  
  // Crypto specific
  supportedCryptos?: string[]; // e.g., ["BTC", "ETH", "USDT"]
  supportedNetworks?: string[]; // e.g., ["Ethereum", "Tron (TRC20)", "BSC"]
  
  // Instructions and notes
  instructions: string;
  notes?: string;
}

export default function PlatformWithdrawalSettings() {
  const [withdrawalInfos, setWithdrawalInfos] = useState<PlatformWithdrawalInfo[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState<PlatformWithdrawalInfo | null>(null);
  const [methodType, setMethodType] = useState<'bank' | 'paypal' | 'crypto'>('bank');
  const [formData, setFormData] = useState<Partial<PlatformWithdrawalInfo>>({});

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('platformWithdrawalInfo');
    if (stored) {
      try {
        setWithdrawalInfos(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load platform withdrawal info:', error);
      }
    } else {
      // Initialize with defaults
      const defaults: PlatformWithdrawalInfo[] = [
        {
          id: 'pwi_bank_1',
          type: 'bank',
          enabled: true,
          minWithdrawal: 50,
          maxWithdrawal: 50000,
          processingTime: '2-5 business days',
          fee: 0,
          fixedFee: 0,
          supportedBankTypes: ['Wire Transfer', 'ACH', 'SEPA'],
          instructions: 'Add your bank account details in the form below. Ensure all information is accurate to avoid delays.',
          notes: 'Bank withdrawals are processed Monday-Friday. Requests submitted after 5 PM EST will be processed the next business day.',
        },
        {
          id: 'pwi_paypal_1',
          type: 'paypal',
          enabled: true,
          minWithdrawal: 20,
          maxWithdrawal: 10000,
          processingTime: '1-2 business days',
          fee: 2.0,
          fixedFee: 0.30,
          instructions: 'Enter your PayPal email address. Make sure it matches your verified PayPal account.',
          notes: 'PayPal withdrawals incur a 2% + $0.30 processing fee.',
        },
        {
          id: 'pwi_crypto_1',
          type: 'crypto',
          enabled: true,
          minWithdrawal: 10,
          maxWithdrawal: 100000,
          processingTime: '30 minutes - 2 hours',
          fee: 0,
          fixedFee: 0,
          supportedCryptos: ['BTC', 'ETH', 'USDT', 'USDC', 'BNB'],
          supportedNetworks: ['Bitcoin', 'Ethereum', 'Tron (TRC20)', 'BSC (BEP20)', 'Polygon'],
          instructions: 'Enter your cryptocurrency wallet address and select the correct network. Double-check the address as transactions cannot be reversed.',
          notes: 'Network fees apply based on blockchain congestion. Always verify the network matches your wallet.',
        },
      ];
      localStorage.setItem('platformWithdrawalInfo', JSON.stringify(defaults));
      setWithdrawalInfos(defaults);
    }
  }, []);

  const saveWithdrawalInfos = (infos: PlatformWithdrawalInfo[]) => {
    localStorage.setItem('platformWithdrawalInfo', JSON.stringify(infos));
    setWithdrawalInfos(infos);
    window.dispatchEvent(new Event('storage'));
    toast.success('Withdrawal settings updated');
  };

  const handleAddInfo = () => {
    const newInfo: PlatformWithdrawalInfo = {
      id: `pwi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: methodType,
      enabled: true,
      minWithdrawal: 0,
      maxWithdrawal: 100000,
      processingTime: '1-3 business days',
      fee: 0,
      instructions: '',
      ...formData,
    };

    saveWithdrawalInfos([...withdrawalInfos, newInfo]);
    setShowAddDialog(false);
    resetForm();
  };

  const handleEditInfo = () => {
    if (!selectedInfo) return;

    const updated = withdrawalInfos.map(info =>
      info.id === selectedInfo.id ? { ...info, ...formData } : info
    );

    saveWithdrawalInfos(updated);
    setShowEditDialog(false);
    setSelectedInfo(null);
    resetForm();
  };

  const handleDeleteInfo = (id: string) => {
    if (!confirm('Are you sure you want to delete this withdrawal method configuration?')) return;
    
    const updated = withdrawalInfos.filter(info => info.id !== id);
    saveWithdrawalInfos(updated);
  };

  const handleToggleEnabled = (id: string) => {
    const updated = withdrawalInfos.map(info =>
      info.id === id ? { ...info, enabled: !info.enabled } : info
    );
    saveWithdrawalInfos(updated);
  };

  const resetForm = () => {
    setFormData({});
    setMethodType('bank');
  };

  const openAddDialog = () => {
    resetForm();
    setShowAddDialog(true);
  };

  const openEditDialog = (info: PlatformWithdrawalInfo) => {
    setSelectedInfo(info);
    setMethodType(info.type);
    setFormData(info);
    setShowEditDialog(true);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <Button onClick={openAddDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Add Method
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="text-sm opacity-90 mb-1">Total Methods</div>
          <div className="text-3xl font-semibold">{withdrawalInfos.length}</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="text-sm opacity-90 mb-1">Enabled</div>
          <div className="text-3xl font-semibold">{withdrawalInfos.filter(w => w.enabled).length}</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="text-sm opacity-90 mb-1">Bank Methods</div>
          <div className="text-3xl font-semibold">{withdrawalInfos.filter(w => w.type === 'bank').length}</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="text-sm opacity-90 mb-1">Crypto Methods</div>
          <div className="text-3xl font-semibold">{withdrawalInfos.filter(w => w.type === 'crypto').length}</div>
        </div>
      </div>

      {/* Withdrawal Methods List */}
      <div className="space-y-4">
        {withdrawalInfos.map((info) => (
          <div
            key={info.id}
            className={`bg-white dark:bg-slate-800 rounded-xl p-6 border-2 ${
              info.enabled ? 'border-green-200 dark:border-green-900/30' : 'border-gray-200 dark:border-slate-700'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  info.type === 'bank' ? 'bg-green-100 dark:bg-green-900/20' :
                  info.type === 'paypal' ? 'bg-blue-100 dark:bg-blue-900/20' :
                  'bg-purple-100 dark:bg-purple-900/20'
                }`}>
                  {info.type === 'bank' && <Building2 className="w-6 h-6 text-green-600 dark:text-green-400" />}
                  {info.type === 'paypal' && <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
                  {info.type === 'crypto' && <Wallet className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold capitalize">{info.type} Withdrawal</h3>
                    {info.enabled ? (
                      <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs rounded-full">
                        Enabled
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                        Disabled
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <div className="text-gray-600 dark:text-gray-400">Min Withdrawal</div>
                      <div className="font-semibold">${info.minWithdrawal}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 dark:text-gray-400">Max Withdrawal</div>
                      <div className="font-semibold">${formatCurrency(info.maxWithdrawal)}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 dark:text-gray-400">Processing Time</div>
                      <div className="font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {info.processingTime}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600 dark:text-gray-400">Fee</div>
                      <div className="font-semibold">
                        {info.fee > 0 ? `${info.fee}%` : 'Free'}
                        {info.fixedFee && info.fixedFee > 0 ? ` + $${info.fixedFee}` : ''}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <strong>Instructions:</strong> {info.instructions}
                  </div>
                  
                  {info.notes && (
                    <div className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{info.notes}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleEnabled(info.id)}
                >
                  {info.enabled ? 'Disable' : 'Enable'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openEditDialog(info)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteInfo(info.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {withdrawalInfos.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl">
            <Wallet className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2">No Withdrawal Methods Configured</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Add withdrawal methods to allow users to withdraw funds
            </p>
            <Button onClick={openAddDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Add First Method
            </Button>
          </div>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={showAddDialog || showEditDialog} onOpenChange={(open) => {
        if (!open) {
          setShowAddDialog(false);
          setShowEditDialog(false);
          resetForm();
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{showEditDialog ? 'Edit' : 'Add'} Withdrawal Method</DialogTitle>
            <DialogDescription>
              Configure withdrawal method details, fees, and instructions for users
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label>Method Type</Label>
              <select
                value={methodType}
                onChange={(e) => setMethodType(e.target.value as 'bank' | 'paypal' | 'crypto')}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                disabled={showEditDialog}
              >
                <option value="bank">Bank Transfer</option>
                <option value="paypal">PayPal</option>
                <option value="crypto">Cryptocurrency</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Minimum Withdrawal (USD)</Label>
                <Input
                  type="number"
                  min="0"
                  step="1"
                  value={formData.minWithdrawal || 0}
                  onChange={(e) => setFormData({ ...formData, minWithdrawal: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label>Maximum Withdrawal (USD)</Label>
                <Input
                  type="number"
                  min="0"
                  step="1000"
                  value={formData.maxWithdrawal || 100000}
                  onChange={(e) => setFormData({ ...formData, maxWithdrawal: parseFloat(e.target.value) || 100000 })}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Fee (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.fee || 0}
                  onChange={(e) => setFormData({ ...formData, fee: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label>Fixed Fee (USD)</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.fixedFee || 0}
                  onChange={(e) => setFormData({ ...formData, fixedFee: parseFloat(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div>
              <Label>Processing Time</Label>
              <Input
                placeholder="e.g., 1-3 business days"
                value={formData.processingTime || ''}
                onChange={(e) => setFormData({ ...formData, processingTime: e.target.value })}
              />
            </div>

            <div>
              <Label>Instructions</Label>
              <textarea
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 min-h-[100px]"
                placeholder="Step-by-step instructions for users..."
                value={formData.instructions || ''}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              />
            </div>

            <div>
              <Label>Additional Notes (Optional)</Label>
              <textarea
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 min-h-[80px]"
                placeholder="Important notices, warnings, or additional information..."
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowAddDialog(false);
              setShowEditDialog(false);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button onClick={showEditDialog ? handleEditInfo : handleAddInfo}>
              {showEditDialog ? 'Save Changes' : 'Add Method'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}