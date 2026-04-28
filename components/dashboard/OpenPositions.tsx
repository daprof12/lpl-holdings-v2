import { useState } from 'react';
import { TrendingUp, TrendingDown, X, Edit } from 'lucide-react';
import { Button } from '../ui/button';
import { useTrading, Position } from '../../contexts/TradingContext';
import { useMarketData } from '../../contexts/MarketDataContext';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import React from 'react';
import { formatPercentage, formatCurrency } from '../../utils/formatNumber';
import { SkeletonRow, SkeletonMobileCard, Skeleton } from '../ui/Skeleton';

export default function OpenPositions() {
  const { positions, removePosition, updatePosition, addHistory, account, updateAccount, isHydrated } = useTrading();
  const { isPriceLive } = useMarketData();
  const [modifyingPosition, setModifyingPosition] = useState<string | null>(null);
  const [modifyStopLoss, setModifyStopLoss] = useState('');
  const [modifyTakeProfit, setModifyTakeProfit] = useState('');

  const handleModify = (position: Position) => {
    setModifyingPosition(position.id);
    setModifyStopLoss(position.stopLoss?.toString() || '');
    setModifyTakeProfit(position.takeProfit?.toString() || '');
  };

  const handleSaveModify = (position: Position) => {
    const updates: Partial<Position> = {};
    
    if (modifyStopLoss) {
      updates.stopLoss = parseFloat(modifyStopLoss);
    }
    
    if (modifyTakeProfit) {
      updates.takeProfit = parseFloat(modifyTakeProfit);
    }
    
    updatePosition(position.id, updates);
    setModifyingPosition(null);
    toast.success('Position modified successfully');
  };

  const handleClose = (position: Position) => {
    // Get current market price
    const currentPrice = position.currentPrice;

    // Calculate P&L
    const priceDiff = position.side === 'buy' 
      ? currentPrice - position.entryPrice 
      : position.entryPrice - currentPrice;
    const pnl = priceDiff * position.units;

    // Remove from positions
    removePosition(position.id);

    // Add to history
    addHistory({
      id: position.id,
      userId: position.userId,
      symbol: position.symbol,
      side: position.side,
      type: 'market',
      units: position.units,
      price: currentPrice,
      entryPrice: position.entryPrice,
      entryTimestamp: position.timestamp, // Store when position was opened
      pnl,
      timestamp: new Date(),
      status: 'closed',
      mode: 'live' as any // Use live mode exclusively
    });

    // Compute remaining unrealized P&L and margin from other open positions
    const remainingPositions = positions.filter(p => p.id !== position.id);
    const remainingUnrealizedPnL = remainingPositions.reduce((sum, p) => sum + (p.pnl || 0), 0);
    const remainingMargin = remainingPositions.reduce((sum, p) => sum + (p.margin || 0), 0);
    const newBalance = account.balance + pnl;
    const newEquity = newBalance + remainingUnrealizedPnL;

    // Update account
    updateAccount({
      balance: newBalance,
      equity: newEquity,
      realizedPnL: account.realizedPnL + pnl,
      unrealizedPnL: remainingUnrealizedPnL,
      margin: remainingMargin,
      availableFunds: newEquity - remainingMargin,
    });

    toast.success(`Position closed: ${pnl >= 0 ? 'Profit' : 'Loss'} of $${Math.abs(pnl).toFixed(2)}`);
  };

  const calculatePL = (position: Position) => {
    const currentPrice = position.currentPrice || 0;
    const entryPrice = position.entryPrice || 0;
    const priceDiff = position.side === 'buy' 
      ? currentPrice - entryPrice 
      : entryPrice - currentPrice;
    // P&L = priceDiff * units. (Leverage is used to calculate margin, not P&L if units is already the exposure)
    return priceDiff * (position.units || 0);
  };

  const calculatePLPercent = (position: Position) => {
    const entryPrice = position.entryPrice || 0;
    if (entryPrice === 0 || !position.units) return 0;
    
    const priceDiff = position.side === 'buy' 
      ? (position.currentPrice || 0) - entryPrice 
      : entryPrice - (position.currentPrice || 0);
    
    // ROE % = (PriceDiff / EntryPrice) * Leverage * 100
    const leverage = position.leverage || 1;
    return (priceDiff / entryPrice) * leverage * 100;
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg">Open Positions</h3>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {positions.length} {positions.length === 1 ? 'position' : 'positions'} open
        </div>
      </div>

      {!isHydrated ? (
        /* Skeleton loading state */
        <div>
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700">
                  <th className="text-left py-3 px-2 text-sm text-gray-600 dark:text-gray-400">Symbol</th>
                  <th className="text-left py-3 px-2 text-sm text-gray-600 dark:text-gray-400">Type</th>
                  <th className="text-right py-3 px-2 text-sm text-gray-600 dark:text-gray-400">Volume</th>
                  <th className="text-right py-3 px-2 text-sm text-gray-600 dark:text-gray-400">Entry</th>
                  <th className="text-right py-3 px-2 text-sm text-gray-600 dark:text-gray-400">Current</th>
                  <th className="text-right py-3 px-2 text-sm text-gray-600 dark:text-gray-400">SL</th>
                  <th className="text-right py-3 px-2 text-sm text-gray-600 dark:text-gray-400">TP</th>
                  <th className="text-right py-3 px-2 text-sm text-gray-600 dark:text-gray-400">P/L</th>
                  <th className="text-right py-3 px-2 text-sm text-gray-600 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 3 }).map((_, i) => (
                  <SkeletonRow key={i} columns={9} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="lg:hidden space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <SkeletonMobileCard key={i} />
            ))}
          </div>
        </div>
      ) : positions.length === 0 ? (
        <div className="text-center py-12">
          <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400 mb-4">No open positions</p>
          <Button>Start Trading</Button>
        </div>
      ) : (
        <div>
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700">
                  <th className="text-left py-3 px-2 text-sm text-gray-600 dark:text-gray-400">Symbol</th>
                  <th className="text-left py-3 px-2 text-sm text-gray-600 dark:text-gray-400">Type</th>
                  <th className="text-right py-3 px-2 text-sm text-gray-600 dark:text-gray-400">Volume</th>
                  <th className="text-right py-3 px-2 text-sm text-gray-600 dark:text-gray-400">Entry</th>
                  <th className="text-right py-3 px-2 text-sm text-gray-600 dark:text-gray-400">Current</th>
                  <th className="text-right py-3 px-2 text-sm text-gray-600 dark:text-gray-400">SL</th>
                  <th className="text-right py-3 px-2 text-sm text-gray-600 dark:text-gray-400">TP</th>
                  <th className="text-right py-3 px-2 text-sm text-gray-600 dark:text-gray-400">P/L</th>
                  <th className="text-right py-3 px-2 text-sm text-gray-600 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((position) => {
                  const pl = calculatePL(position);
                  const plPercent = calculatePLPercent(position);
                  const isPositive = pl >= 0;

                  const rows = [
                    <tr key={position.id} className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                      <td className="py-4 px-2">
                        <div className="font-semibold">{position.symbol}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{new Date(position.timestamp).toLocaleString()}</div>
                      </td>
                      <td className="py-4 px-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                          position.side === 'buy'
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                            : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                        }`}>
                          {position.side === 'buy' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {position.side.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-right">{position.units}</td>
                      <td className="py-4 px-2 text-right">${formatCurrency(position.entryPrice || 0)}</td>
                      <td className="py-4 px-2 text-right font-semibold">${formatCurrency(position.currentPrice || 0)}</td>
                      <td className="py-4 px-2 text-right text-sm">{position.stopLoss ? `$${formatCurrency(position.stopLoss)}` : '-'}</td>
                      <td className="py-4 px-2 text-right text-sm">{position.takeProfit ? `$${formatCurrency(position.takeProfit)}` : '-'}</td>
                      <td className="py-4 px-2 text-right">
                        <div className={`font-semibold ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {isPositive ? '+' : ''}${formatCurrency(pl)}
                        </div>
                        <div className={`text-xs ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {isPositive ? '+' : ''}{formatPercentage(plPercent)}
                        </div>
                      </td>
                      <td className="py-4 px-2 text-right">
                        <div className="flex gap-2 justify-end">
                          <button className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-slate-600" title="Modify" onClick={() => handleModify(position)}>
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 rounded hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600" title="Close" onClick={() => handleClose(position)}>
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ];

                  if (modifyingPosition === position.id) {
                    rows.push(
                      <tr key={`${position.id}-edit`} className="bg-blue-50 dark:bg-blue-900/10">
                        <td colSpan={9} className="py-4 px-2">
                          <div className="flex items-end gap-4">
                            <div className="flex-1">
                              <Label htmlFor={`sl-${position.id}`} className="text-xs mb-1 block">Stop Loss</Label>
                              <Input
                                id={`sl-${position.id}`}
                                type="number"
                                step="0.01"
                                placeholder="Stop Loss Price"
                                value={modifyStopLoss}
                                onChange={(e) => setModifyStopLoss(e.target.value)}
                                className="h-9"
                              />
                            </div>
                            <div className="flex-1">
                              <Label htmlFor={`tp-${position.id}`} className="text-xs mb-1 block">Take Profit</Label>
                              <Input
                                id={`tp-${position.id}`}
                                type="number"
                                step="0.01"
                                placeholder="Take Profit Price"
                                value={modifyTakeProfit}
                                onChange={(e) => setModifyTakeProfit(e.target.value)}
                                className="h-9"
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleSaveModify(position)}>
                                Save
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => setModifyingPosition(null)}>
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  }

                  return rows;
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {positions.map((position) => {
              const pl = calculatePL(position);
              const plPercent = calculatePLPercent(position);
              const isPositive = pl >= 0;

              return (
                <div key={position.id} className="border border-gray-200 dark:border-slate-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-semibold text-lg">{position.symbol}</div>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs mt-1 ${
                        position.side === 'buy'
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                          : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                      }`}>
                        {position.side === 'buy' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {position.side.toUpperCase()}
                      </span>
                    </div>
                    <div className={`text-right font-semibold ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      <div>{isPositive ? '+' : ''}${formatCurrency(pl)}</div>
                      <div className="text-xs">{isPositive ? '+' : ''}{formatPercentage(plPercent)}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">Units</div>
                      <div>{position.units}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">Entry</div>
                      <div>${formatCurrency(position.entryPrice || 0)}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">Current</div>
                      <div className="font-semibold">${formatCurrency(position.currentPrice || 0)}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">SL / TP</div>
                      <div className="text-xs">
                        {position.stopLoss ? `$${formatCurrency(position.stopLoss)}` : '-'} / {position.takeProfit ? `$${formatCurrency(position.takeProfit)}` : '-'}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleModify(position)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Modify
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:bg-red-50" onClick={() => handleClose(position)}>
                      <X className="w-4 h-4 mr-2" />
                      Close
                    </Button>
                  </div>

                  {/* Inline Edit Form for Mobile */}
                  {modifyingPosition === position.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700 space-y-3">
                      <div>
                        <Label htmlFor={`sl-mobile-${position.id}`} className="text-xs mb-1 block">Stop Loss</Label>
                        <Input
                          id={`sl-mobile-${position.id}`}
                          type="number"
                          step="0.01"
                          placeholder="Stop Loss Price"
                          value={modifyStopLoss}
                          onChange={(e) => setModifyStopLoss(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`tp-mobile-${position.id}`} className="text-xs mb-1 block">Take Profit</Label>
                        <Input
                          id={`tp-mobile-${position.id}`}
                          type="number"
                          step="0.01"
                          placeholder="Take Profit Price"
                          value={modifyTakeProfit}
                          onChange={(e) => setModifyTakeProfit(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1" onClick={() => handleSaveModify(position)}>
                          Save Changes
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1" onClick={() => setModifyingPosition(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Total Unrealized P/L:</span>
              <span className={`font-semibold ${
                positions.reduce((sum, p) => sum + calculatePL(p), 0) >= 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {positions.reduce((sum, p) => sum + calculatePL(p), 0) >= 0 ? '+' : ''}
                ${positions.reduce((sum, p) => sum + calculatePL(p), 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}