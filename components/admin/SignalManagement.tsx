import { useState } from 'react';
import { Plus, Edit, Trash2, TrendingUp, TrendingDown, Signal } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { formatCurrency } from '../../utils/formatNumber';

interface TradingSignal {
  id: string;
  asset: string;
  type: 'buy' | 'sell';
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  confidence: number;
  status: 'active' | 'expired' | 'hit';
  createdAt: string;
  subscribers: number;
}

export default function SignalManagement() {
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [selectedSignal, setSelectedSignal] = useState<TradingSignal | null>(null);

  const [signals, setSignals] = useState<TradingSignal[]>([
    {
      id: '1',
      asset: 'BTCUSD',
      type: 'buy',
      entryPrice: 92000,
      stopLoss: 90500,
      takeProfit: 95000,
      confidence: 85,
      status: 'active',
      createdAt: '2024-12-06 08:00:00',
      subscribers: 1247,
    },
    {
      id: '2',
      asset: 'EURUSD',
      type: 'sell',
      entryPrice: 1.0560,
      stopLoss: 1.0590,
      takeProfit: 1.0500,
      confidence: 72,
      status: 'active',
      createdAt: '2024-12-06 09:30:00',
      subscribers: 892,
    },
    {
      id: '3',
      asset: 'AAPL',
      type: 'buy',
      entryPrice: 195.50,
      stopLoss: 193.00,
      takeProfit: 200.00,
      confidence: 90,
      status: 'hit',
      createdAt: '2024-12-05 14:00:00',
      subscribers: 2134,
    },
  ]);

  const [formData, setFormData] = useState({
    asset: '',
    type: 'buy',
    entryPrice: '',
    stopLoss: '',
    takeProfit: '',
    confidence: '75',
  });

  const handleCreate = () => {
    setDialogMode('create');
    setFormData({
      asset: '',
      type: 'buy',
      entryPrice: '',
      stopLoss: '',
      takeProfit: '',
      confidence: '75',
    });
    setShowDialog(true);
  };

  const handleEdit = (signal: TradingSignal) => {
    setDialogMode('edit');
    setSelectedSignal(signal);
    setFormData({
      asset: signal.asset,
      type: signal.type,
      entryPrice: signal.entryPrice.toString(),
      stopLoss: signal.stopLoss.toString(),
      takeProfit: signal.takeProfit.toString(),
      confidence: signal.confidence.toString(),
    });
    setShowDialog(true);
  };

  const handleDelete = (signalId: string) => {
    if (confirm('Are you sure you want to delete this signal?')) {
      setSignals(signals.filter(s => s.id !== signalId));
    }
  };

  const handleSubmit = () => {
    if (dialogMode === 'create') {
      const newSignal: TradingSignal = {
        id: Date.now().toString(),
        asset: formData.asset,
        type: formData.type as 'buy' | 'sell',
        entryPrice: parseFloat(formData.entryPrice),
        stopLoss: parseFloat(formData.stopLoss),
        takeProfit: parseFloat(formData.takeProfit),
        confidence: parseInt(formData.confidence),
        status: 'active',
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
        subscribers: 0,
      };
      setSignals([newSignal, ...signals]);
    } else if (dialogMode === 'edit' && selectedSignal) {
      setSignals(signals.map(s =>
        s.id === selectedSignal.id
          ? {
              ...s,
              asset: formData.asset,
              type: formData.type as 'buy' | 'sell',
              entryPrice: parseFloat(formData.entryPrice),
              stopLoss: parseFloat(formData.stopLoss),
              takeProfit: parseFloat(formData.takeProfit),
              confidence: parseInt(formData.confidence),
            }
          : s
      ));
    }
    setShowDialog(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Signal Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Create and manage trading signals for your subscribers
          </p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="w-4 h-4" />
          Create Signal
        </Button>
      </div>

      {/* Signals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {signals.map((signal) => (
          <div
            key={signal.id}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border-2 border-gray-200 dark:border-slate-700"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  signal.type === 'buy'
                    ? 'bg-green-100 dark:bg-green-900/20'
                    : 'bg-red-100 dark:bg-red-900/20'
                }`}>
                  {signal.type === 'buy' ? (
                    <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                  ) : (
                    <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{signal.asset}</h3>
                  <span className={`text-sm font-semibold uppercase ${
                    signal.type === 'buy' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {signal.type}
                  </span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                signal.status === 'active'
                  ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : signal.status === 'hit'
                  ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                  : 'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400'
              }`}>
                {signal.status}
              </span>
            </div>

            {/* Signal Details */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-slate-700">
                <span className="text-sm text-gray-600 dark:text-gray-400">Entry Price</span>
                <span className="font-mono font-semibold">${formatCurrency(signal.entryPrice)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-slate-700">
                <span className="text-sm text-gray-600 dark:text-gray-400">Stop Loss</span>
                <span className="font-mono text-red-600 dark:text-red-400">${formatCurrency(signal.stopLoss)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-slate-700">
                <span className="text-sm text-gray-600 dark:text-gray-400">Take Profit</span>
                <span className="font-mono text-green-600 dark:text-green-400">${formatCurrency(signal.takeProfit)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Confidence</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-green-500"
                      style={{ width: `${signal.confidence}%` }}
                    />
                  </div>
                  <span className="font-semibold">{signal.confidence}%</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-700">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Signal className="w-4 h-4" />
                <span>{signal.subscribers.toLocaleString()} subscribers</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(signal)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(signal.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>
            </div>

            {/* Timestamp */}
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
              Created: {signal.createdAt}
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogMode === 'create' ? 'Create Trading Signal' : 'Edit Trading Signal'}
            </DialogTitle>
            <DialogDescription>
              {dialogMode === 'create' ? 'Enter the details for the new trading signal.' : 'Update the details for the selected trading signal.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Asset Symbol</label>
              <Input
                value={formData.asset}
                onChange={(e) => setFormData({ ...formData, asset: e.target.value.toUpperCase() })}
                placeholder="e.g., BTCUSD, EURUSD"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Signal Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                <option value="buy">BUY</option>
                <option value="sell">SELL</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Entry Price</label>
              <Input
                type="number"
                step="0.01"
                value={formData.entryPrice}
                onChange={(e) => setFormData({ ...formData, entryPrice: e.target.value })}
                placeholder="Enter entry price"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Stop Loss</label>
              <Input
                type="number"
                step="0.01"
                value={formData.stopLoss}
                onChange={(e) => setFormData({ ...formData, stopLoss: e.target.value })}
                placeholder="Enter stop loss price"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Take Profit</label>
              <Input
                type="number"
                step="0.01"
                value={formData.takeProfit}
                onChange={(e) => setFormData({ ...formData, takeProfit: e.target.value })}
                placeholder="Enter take profit price"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Confidence Level (%)</label>
              <Input
                type="number"
                min="0"
                max="100"
                value={formData.confidence}
                onChange={(e) => setFormData({ ...formData, confidence: e.target.value })}
                placeholder="Enter confidence percentage"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {dialogMode === 'create' ? 'Create Signal' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}