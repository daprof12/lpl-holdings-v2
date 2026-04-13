import { useState, useEffect } from 'react';
import { Calculator, Info } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

interface PositionCalculatorProps {
  currentPrice: number;
  onApplyToOrder?: (data: {
    orderType: 'buy' | 'sell';
    entryPrice: string;
    units: string;
    stopLoss: string;
    takeProfit: string;
    leverage: string;
  }) => void;
}

export default function PositionCalculator({ currentPrice, onApplyToOrder }: PositionCalculatorProps) {
  const [entryPrice, setEntryPrice] = useState(currentPrice.toString());
  const [units, setUnits] = useState('1');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [leverage, setLeverage] = useState('1');
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');

  const [isManualEntry, setIsManualEntry] = useState(false);

  // Update entry price when currentPrice changes, but only if not manually edited
  useEffect(() => {
    if (!isManualEntry) {
      setEntryPrice(currentPrice.toString());
    }
  }, [currentPrice, isManualEntry]);

  const calculate = () => {
    const entry = parseFloat(entryPrice) || 0;
    const vol = parseFloat(units) || 0;
    const sl = parseFloat(stopLoss) || 0;
    const tp = parseFloat(takeProfit) || 0;
    const lev = parseFloat(leverage) || 1;

    const positionSize = entry * vol;
    const margin = positionSize / lev;

    let potentialProfit = 0;
    let potentialLoss = 0;
    let riskRewardRatio = 0;

    if (orderType === 'buy') {
      potentialProfit = tp > 0 ? (tp - entry) * vol : 0;
      potentialLoss = sl > 0 ? (entry - sl) * vol : 0;
    } else {
      potentialProfit = tp > 0 ? (entry - tp) * vol : 0;
      potentialLoss = sl > 0 ? (sl - entry) * vol : 0;
    }

    if (potentialLoss > 0 && potentialProfit > 0) {
      riskRewardRatio = potentialProfit / potentialLoss;
    }

    return {
      positionSize,
      margin,
      potentialProfit,
      potentialLoss,
      riskRewardRatio
    };
  };

  const results = calculate();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3>Position Calculator</h3>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Input Section */}
        <div className="space-y-3">
          {/* Order Type */}
          <div>
            <Label className="text-xs">Order Type</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <button
                onClick={() => setOrderType('buy')}
                className={`py-2 rounded-lg transition-colors text-sm ${
                  orderType === 'buy'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setOrderType('sell')}
                className={`py-2 rounded-lg transition-colors text-sm ${
                  orderType === 'sell'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
              >
                Sell
              </button>
            </div>
          </div>

          {/* Entry Price */}
          <div>
            <Label htmlFor="calc-entry" className="text-xs">Entry Price</Label>
            <Input
              id="calc-entry"
              type="number"
              step="0.01"
              value={entryPrice}
              onChange={(e) => {
                setEntryPrice(e.target.value);
                setIsManualEntry(true);
              }}
              className="mt-1"
            />
          </div>

          {/* Volume */}
          <div>
            <Label htmlFor="calc-units" className="text-xs">Units</Label>
            <Input
              id="calc-units"
              type="number"
              step="0.01"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Leverage */}
          <div>
            <Label htmlFor="calc-leverage" className="text-xs">Leverage: {leverage}x</Label>
            <input
              id="calc-leverage"
              type="range"
              min="1"
              max="100"
              step="1"
              value={leverage}
              onChange={(e) => setLeverage(e.target.value)}
              className="w-full mt-1"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
              <span>1x</span>
              <span>50x</span>
              <span>100x</span>
            </div>
          </div>

          {/* Stop Loss */}
          <div>
            <Label htmlFor="calc-sl" className="text-xs">Stop Loss</Label>
            <Input
              id="calc-sl"
              type="number"
              step="0.01"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              placeholder="Optional"
              className="mt-1"
            />
          </div>

          {/* Take Profit */}
          <div>
            <Label htmlFor="calc-tp" className="text-xs">Take Profit</Label>
            <Input
              id="calc-tp"
              type="number"
              step="0.01"
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
              placeholder="Optional"
              className="mt-1"
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-3">
          <div className="p-3 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold mb-3 text-sm">Calculation Results</h4>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-blue-200 dark:border-blue-800">
                <span className="text-xs text-gray-600 dark:text-gray-400">Position Size</span>
                <span className="font-semibold">${results.positionSize.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-blue-200 dark:border-blue-800">
                <span className="text-xs text-gray-600 dark:text-gray-400">Required Margin</span>
                <span className="font-semibold">${results.margin.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>

              {results.potentialProfit > 0 && (
                <div className="flex justify-between items-center pb-2 border-b border-blue-200 dark:border-blue-800">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Potential Profit</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    +${results.potentialProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              )}

              {results.potentialLoss > 0 && (
                <div className="flex justify-between items-center pb-2 border-b border-blue-200 dark:border-blue-800">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Potential Loss</span>
                  <span className="font-semibold text-red-600 dark:text-red-400">
                    -${results.potentialLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              )}

              {results.riskRewardRatio > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Risk/Reward Ratio</span>
                  <span className={`font-semibold ${
                    results.riskRewardRatio >= 2 
                      ? 'text-green-600 dark:text-green-400' 
                      : results.riskRewardRatio >= 1 
                      ? 'text-yellow-600 dark:text-yellow-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    1:{results.riskRewardRatio.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Risk Assessment */}
          {results.riskRewardRatio > 0 && (
            <div className={`p-3 rounded-lg ${
              results.riskRewardRatio >= 2 
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                : results.riskRewardRatio >= 1 
                ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800' 
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
            }`}>
              <div className="flex items-start gap-2">
                <Info className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                  results.riskRewardRatio >= 2 
                    ? 'text-green-600 dark:text-green-400' 
                    : results.riskRewardRatio >= 1 
                    ? 'text-yellow-600 dark:text-yellow-400' 
                    : 'text-red-600 dark:text-red-400'
                }`} />
                <div className={`text-xs ${
                  results.riskRewardRatio >= 2 
                    ? 'text-green-600 dark:text-green-400' 
                    : results.riskRewardRatio >= 1 
                    ? 'text-yellow-600 dark:text-yellow-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {results.riskRewardRatio >= 2 && 'Excellent risk/reward ratio! This trade setup looks favorable.'}
                  {results.riskRewardRatio >= 1 && results.riskRewardRatio < 2 && 'Acceptable risk/reward ratio. Consider improving your targets.'}
                  {results.riskRewardRatio < 1 && 'Poor risk/reward ratio. Consider adjusting your stop loss or take profit levels.'}
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="pt-2">
            <Button
              className="w-full"
              onClick={() => onApplyToOrder && onApplyToOrder({
                orderType,
                entryPrice,
                units,
                stopLoss,
                takeProfit,
                leverage
              })}
            >
              Apply to Order Panel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}