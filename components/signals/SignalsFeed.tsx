import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, Signal, Clock, CheckCircle, XCircle, AlertCircle, Star, Target, Copy, ExternalLink, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { formatCurrency } from '../../utils/formatNumber';

export default function SignalsFeed() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'active' | 'closed'>('all');
  const [selectedSignal, setSelectedSignal] = useState<any>(null);

  const signals = [
    {
      id: 1,
      provider: 'AI Trend Master',
      providerRating: 4.8,
      asset: 'BTC/USD',
      type: 'Long',
      status: 'active',
      entryPrice: 45650,
      currentPrice: 45892,
      takeProfit: [46500, 47200, 48000],
      stopLoss: 45200,
      timePosted: '2 hours ago',
      pnl: 242,
      pnlPercent: 0.53,
      accuracy: 87,
      timeframe: '4H',
      confidence: 'High'
    },
    {
      id: 2,
      provider: 'Crypto Whale Alerts',
      providerRating: 4.6,
      asset: 'ETH/USD',
      type: 'Long',
      status: 'active',
      entryPrice: 2450,
      currentPrice: 2512,
      takeProfit: [2550, 2620, 2700],
      stopLoss: 2390,
      timePosted: '5 hours ago',
      pnl: 62,
      pnlPercent: 2.53,
      accuracy: 82,
      timeframe: '1D',
      confidence: 'High'
    },
    {
      id: 3,
      provider: 'Forex Pro Signals',
      providerRating: 4.9,
      asset: 'EUR/USD',
      type: 'Short',
      status: 'active',
      entryPrice: 1.0890,
      currentPrice: 1.0875,
      takeProfit: [1.0850, 1.0820, 1.0780],
      stopLoss: 1.0920,
      timePosted: '1 hour ago',
      pnl: 15,
      pnlPercent: 0.14,
      accuracy: 91,
      timeframe: '1H',
      confidence: 'Medium'
    },
    {
      id: 4,
      provider: 'Pattern Scanner AI',
      providerRating: 4.7,
      asset: 'AAPL',
      type: 'Long',
      status: 'closed',
      entryPrice: 178.50,
      currentPrice: 185.20,
      takeProfit: [182, 186, 190],
      stopLoss: 175,
      timePosted: '2 days ago',
      pnl: 670,
      pnlPercent: 3.75,
      accuracy: 85,
      timeframe: '1D',
      confidence: 'High'
    },
    {
      id: 5,
      provider: 'Scalping Master',
      providerRating: 4.5,
      asset: 'XRP/USD',
      type: 'Short',
      status: 'closed',
      entryPrice: 0.62,
      currentPrice: 0.68,
      takeProfit: [0.59, 0.57, 0.55],
      stopLoss: 0.64,
      timePosted: '3 days ago',
      pnl: -60,
      pnlPercent: -9.68,
      accuracy: 78,
      timeframe: '15m',
      confidence: 'Low'
    }
  ];

  const filteredSignals = signals.filter(signal => {
    if (filter === 'all') return true;
    return signal.status === filter;
  });

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'High': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20';
      case 'Medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20';
      case 'Low': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20';
      default: return '';
    }
  };

  const handleCopySignal = (signal: any) => {
    // Copy signal details to clipboard
    const signalText = `
🔔 Trading Signal Alert
📊 Asset: ${signal.asset}
📈 Direction: ${signal.type}
💰 Entry: $${formatCurrency(signal.entryPrice)}
🛑 Stop Loss: $${formatCurrency(signal.stopLoss)}
🎯 Take Profits: ${signal.takeProfit.map((tp: number, i: number) => `TP${i+1}: $${formatCurrency(tp)}`).join(', ')}
⏰ Timeframe: ${signal.timeframe}
🎓 Provider: ${signal.provider} (${signal.providerRating}★)
✅ Confidence: ${signal.confidence}
    `.trim();
    
    // Use fallback method for clipboard that works in all environments
    const textArea = document.createElement('textarea');
    textArea.value = signalText;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      toast.success('Signal copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy signal');
    }
    
    document.body.removeChild(textArea);
  };

  const handleTradeNow = (signal: any) => {
    // Navigate to trading page with the signal's asset
    navigate('/trading', { state: { symbol: signal.asset, signal } });
    toast.info(`Opening ${signal.asset} in trading terminal...`);
  };

  const handleViewDetails = (signal: any) => {
    setSelectedSignal(signal);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-3">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700'
          }`}
        >
          All Signals
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'active'
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('closed')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'closed'
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700'
          }`}
        >
          Closed
        </button>
      </div>

      {/* Signals List */}
      <div className="space-y-4">
        {filteredSignals.map((signal) => (
          <div key={signal.id} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border-l-4 border-l-blue-600">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold">{signal.asset}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    signal.type === 'Long'
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                      : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                  }`}>
                    {signal.type === 'Long' && <TrendingUp className="w-4 h-4 inline mr-1" />}
                    {signal.type === 'Short' && <TrendingDown className="w-4 h-4 inline mr-1" />}
                    {signal.type}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    signal.status === 'active'
                      ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {signal.status}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getConfidenceColor(signal.confidence)}`}>
                    {signal.confidence} Confidence
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <span>By</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{signal.provider}</span>
                    <span className="text-yellow-600 dark:text-yellow-400">★ {signal.providerRating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {signal.timePosted}
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    {signal.accuracy}% accuracy
                  </div>
                  <div className="px-2 py-0.5 bg-gray-100 dark:bg-slate-700 rounded text-xs">
                    {signal.timeframe}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className={`text-2xl font-bold ${
                  signal.pnl > 0
                    ? 'text-green-600 dark:text-green-400'
                    : signal.pnl < 0
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {signal.pnl > 0 ? '+' : ''}${signal.pnl.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {signal.pnlPercent > 0 ? '+' : ''}{signal.pnlPercent.toFixed(2)}%
                </div>
              </div>
            </div>

            {/* Signal Details */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Entry Price</div>
                <div className="font-semibold">${formatCurrency(signal.entryPrice)}</div>
              </div>

              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Current Price</div>
                <div className="font-semibold">${formatCurrency(signal.currentPrice)}</div>
              </div>

              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Stop Loss</div>
                <div className="font-semibold text-red-600 dark:text-red-400">
                  ${formatCurrency(signal.stopLoss)}
                </div>
              </div>

              <div className="col-span-2">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Take Profit Targets</div>
                <div className="flex gap-2">
                  {signal.takeProfit.map((tp, index) => (
                    <div key={index} className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded text-sm font-semibold">
                      TP{index + 1}: ${formatCurrency(tp)}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-slate-700">
              <Button className="flex-1" onClick={() => handleCopySignal(signal)}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Signal
              </Button>
              <Button variant="outline" onClick={() => handleTradeNow(signal)}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Trade Now
              </Button>
              <Button variant="outline" onClick={() => handleViewDetails(signal)}>
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredSignals.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400">No signals found</p>
        </div>
      )}

      {/* Signal Details Modal */}
      {selectedSignal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedSignal(null)}>
          <div className="bg-white dark:bg-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold">{selectedSignal.asset}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  selectedSignal.type === 'Long'
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                    : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                }`}>
                  {selectedSignal.type === 'Long' && <TrendingUp className="w-4 h-4 inline mr-1" />}
                  {selectedSignal.type === 'Short' && <TrendingDown className="w-4 h-4 inline mr-1" />}
                  {selectedSignal.type}
                </span>
              </div>
              <button onClick={() => setSelectedSignal(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Provider Info */}
              <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Signal Provider</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{selectedSignal.provider}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-1">
                      <span className="text-yellow-600 dark:text-yellow-400">★ {selectedSignal.providerRating}</span>
                      <span>•</span>
                      <span>{selectedSignal.accuracy}% accuracy</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${getConfidenceColor(selectedSignal.confidence)}`}>
                    {selectedSignal.confidence} Confidence
                  </span>
                </div>
              </div>

              {/* Price Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Entry Price</div>
                  <div className="text-xl font-bold">${formatCurrency(selectedSignal.entryPrice)}</div>
                </div>
                <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Price</div>
                  <div className="text-xl font-bold">${formatCurrency(selectedSignal.currentPrice)}</div>
                </div>
              </div>

              {/* Stop Loss */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                <div className="text-sm text-red-600 dark:text-red-400 mb-1">Stop Loss</div>
                <div className="text-xl font-bold text-red-600 dark:text-red-400">${formatCurrency(selectedSignal.stopLoss)}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Risk: {Math.abs(((selectedSignal.stopLoss - selectedSignal.entryPrice) / selectedSignal.entryPrice) * 100).toFixed(2)}%
                </div>
              </div>

              {/* Take Profit Targets */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <div className="text-sm text-green-600 dark:text-green-400 mb-3">Take Profit Targets</div>
                <div className="space-y-2">
                  {selectedSignal.takeProfit.map((tp: number, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-semibold text-green-600 dark:text-green-400">TP {index + 1}</span>
                      <div className="text-right">
                        <div className="font-bold">${formatCurrency(tp)}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          +{Math.abs(((tp - selectedSignal.entryPrice) / selectedSignal.entryPrice) * 100).toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current P&L */}
              <div className={`rounded-lg p-4 border ${
                selectedSignal.pnl > 0 
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                  : selectedSignal.pnl < 0
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                  : 'bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700'
              }`}>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current P&L</div>
                <div className={`text-2xl font-bold ${
                  selectedSignal.pnl > 0
                    ? 'text-green-600 dark:text-green-400'
                    : selectedSignal.pnl < 0
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {selectedSignal.pnl > 0 ? '+' : ''}${selectedSignal.pnl.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {selectedSignal.pnlPercent > 0 ? '+' : ''}{selectedSignal.pnlPercent.toFixed(2)}%
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{selectedSignal.timePosted}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Target className="w-4 h-4" />
                  <span>Timeframe: {selectedSignal.timeframe}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-slate-700">
                <Button className="flex-1" onClick={() => {
                  handleCopySignal(selectedSignal);
                  setSelectedSignal(null);
                }}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Signal
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => {
                  handleTradeNow(selectedSignal);
                  setSelectedSignal(null);
                }}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Trade Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}