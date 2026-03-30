import { useState } from 'react';
import { Plus, Trash2, Save, Play } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function StrategyBuilder() {
  const [strategyName, setStrategyName] = useState('');
  const [conditions, setConditions] = useState<any[]>([]);

  const indicators = [
    { value: 'sma', label: 'Simple Moving Average (SMA)' },
    { value: 'ema', label: 'Exponential Moving Average (EMA)' },
    { value: 'rsi', label: 'Relative Strength Index (RSI)' },
    { value: 'macd', label: 'MACD' },
    { value: 'bollinger', label: 'Bollinger Bands' },
    { value: 'stochastic', label: 'Stochastic Oscillator' },
    { value: 'atr', label: 'Average True Range (ATR)' },
    { value: 'volume', label: 'Volume' }
  ];

  const operators = [
    { value: 'greater', label: '>' },
    { value: 'less', label: '<' },
    { value: 'equal', label: '=' },
    { value: 'crosses_above', label: 'Crosses Above' },
    { value: 'crosses_below', label: 'Crosses Below' }
  ];

  const addCondition = () => {
    setConditions([...conditions, {
      id: Date.now(),
      indicator: '',
      operator: '',
      value: '',
      timeframe: '1h'
    }]);
  };

  const removeCondition = (id: number) => {
    setConditions(conditions.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Strategy Info */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Strategy Configuration</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Strategy Name</Label>
            <Input
              id="name"
              placeholder="e.g., My Scalping Strategy"
              value={strategyName}
              onChange={(e) => setStrategyName(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="assets">Assets</Label>
            <select
              id="assets"
              className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            >
              <option>BTC/USD</option>
              <option>ETH/USD</option>
              <option>All Crypto</option>
              <option>All Forex</option>
              <option>All Assets</option>
            </select>
          </div>

          <div>
            <Label htmlFor="timeframe">Timeframe</Label>
            <select
              id="timeframe"
              className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            >
              <option>1 minute</option>
              <option>5 minutes</option>
              <option>15 minutes</option>
              <option>1 hour</option>
              <option>4 hours</option>
              <option>1 day</option>
            </select>
          </div>

          <div>
            <Label htmlFor="type">Strategy Type</Label>
            <select
              id="type"
              className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            >
              <option>Scalping</option>
              <option>Day Trading</option>
              <option>Swing Trading</option>
              <option>Trend Following</option>
              <option>Mean Reversion</option>
            </select>
          </div>
        </div>
      </div>

      {/* Entry Conditions */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Entry Conditions</h3>
          <Button onClick={addCondition} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Condition
          </Button>
        </div>

        {conditions.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400 mb-4">No entry conditions defined</p>
            <Button onClick={addCondition}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Condition
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {conditions.map((condition, index) => (
              <div key={condition.id} className="flex items-end gap-4 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-xs">Indicator</Label>
                    <select className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm">
                      <option value="">Select...</option>
                      {indicators.map(ind => (
                        <option key={ind.value} value={ind.value}>{ind.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label className="text-xs">Operator</Label>
                    <select className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm">
                      <option value="">Select...</option>
                      {operators.map(op => (
                        <option key={op.value} value={op.value}>{op.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label className="text-xs">Value / Indicator</Label>
                    <Input type="text" placeholder="e.g., 50 or SMA(20)" className="text-sm" />
                  </div>

                  <div>
                    <Label className="text-xs">Timeframe</Label>
                    <select className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm">
                      <option>1m</option>
                      <option>5m</option>
                      <option>15m</option>
                      <option>1h</option>
                      <option>4h</option>
                      <option>1d</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => removeCondition(condition.id)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            <div className="flex items-center justify-center py-2">
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-semibold">
                AND
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Risk Management */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Risk Management</h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="position-size">Position Size (%)</Label>
            <Input
              id="position-size"
              type="number"
              placeholder="5"
              className="mt-2"
            />
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">% of total balance per trade</p>
          </div>

          <div>
            <Label htmlFor="stop-loss">Stop Loss (%)</Label>
            <Input
              id="stop-loss"
              type="number"
              placeholder="2"
              className="mt-2"
            />
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Maximum loss per trade</p>
          </div>

          <div>
            <Label htmlFor="take-profit">Take Profit (%)</Label>
            <Input
              id="take-profit"
              type="number"
              placeholder="6"
              className="mt-2"
            />
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Target profit per trade</p>
          </div>

          <div>
            <Label htmlFor="max-trades">Max Concurrent Trades</Label>
            <Input
              id="max-trades"
              type="number"
              placeholder="3"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="daily-loss">Daily Loss Limit (%)</Label>
            <Input
              id="daily-loss"
              type="number"
              placeholder="10"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="leverage">Max Leverage</Label>
            <select
              id="leverage"
              className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            >
              <option>1x (No leverage)</option>
              <option>2x</option>
              <option>5x</option>
              <option>10x</option>
              <option>20x</option>
              <option>50x</option>
            </select>
          </div>
        </div>
      </div>

      {/* Exit Strategy */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Exit Strategy</h3>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <input type="checkbox" id="trailing-stop" className="w-4 h-4 rounded" />
            <Label htmlFor="trailing-stop" className="cursor-pointer">Enable Trailing Stop</Label>
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="partial-exit" className="w-4 h-4 rounded" />
            <Label htmlFor="partial-exit" className="cursor-pointer">Partial Profit Taking (50% at 3%, 50% at 6%)</Label>
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="time-exit" className="w-4 h-4 rounded" />
            <Label htmlFor="time-exit" className="cursor-pointer">Time-based Exit (Close after 24 hours)</Label>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button variant="outline" className="flex-1">
          <Save className="w-4 h-4 mr-2" />
          Save as Draft
        </Button>
        <Button className="flex-1">
          <Play className="w-4 h-4 mr-2" />
          Save & Backtest
        </Button>
      </div>
    </div>
  );
}
