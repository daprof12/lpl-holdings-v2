import { X } from 'lucide-react';
import PositionCalculator from './PositionCalculator';

interface PositionCalculatorPanelProps {
  currentPrice: number;
  onClose: () => void;
  onApplyToOrder?: (data: {
    orderType: 'buy' | 'sell';
    entryPrice: string;
    units: string;
    stopLoss: string;
    takeProfit: string;
    leverage: string;
  }) => void;
}

export default function PositionCalculatorPanel({ currentPrice, onClose, onApplyToOrder }: PositionCalculatorPanelProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-2xl overflow-hidden flex flex-col h-full" style={{ maxHeight: 'calc(100vh - 6rem)' }}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 flex-shrink-0">
        <h3 className="font-semibold">Position Calculator</h3>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-white/50 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
          title="Close Calculator"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="overflow-y-auto flex-1 p-4">
        <PositionCalculator 
          currentPrice={currentPrice} 
          onApplyToOrder={onApplyToOrder}
        />
      </div>
    </div>
  );
}