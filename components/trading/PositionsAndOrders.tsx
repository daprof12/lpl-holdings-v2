import { useState } from 'react';
import { useTrading, Position, Order, HistoryItem } from '../../contexts/TradingContext';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import { Edit, AlertTriangle, X } from 'lucide-react';
import { formatPercentage, formatTxnId } from '../../utils/formatNumber';

// Derive market category from symbol
const getCategory = (symbol: string): string => {
  if (symbol.includes('BTC') || symbol.includes('ETH') || symbol.includes('XRP') ||
      symbol.includes('LTC') || symbol.includes('ADA') || symbol.includes('DOT') ||
      symbol.includes('DOGE') || symbol.includes('SOL')) return 'Crypto';
  if (['EURUSD','GBPUSD','USDJPY','AUDUSD','USDCAD','NZDUSD','USDCHF'].includes(symbol)) return 'Forex';
  if (['AAPL','MSFT','GOOGL','AMZN','TSLA','META','NVDA','JPM','V','NFLX','DIS'].includes(symbol)) return 'Stocks';
  if (symbol.includes('XAU') || symbol.includes('XAG') || symbol.includes('OIL') || symbol.includes('GC') || symbol.includes('CL')) return 'Commodities';
  if (symbol.includes('SPX') || symbol.includes('NDX') || symbol.includes('DJI') || ['SPY','QQQ','VOO'].includes(symbol)) return 'Indices';
  if (['ES','NQ','YM'].includes(symbol)) return 'Futures';
  return 'Other';
};

const categoryColors: Record<string, string> = {
  Crypto: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  Forex: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  Stocks: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  Commodities: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
  Indices: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  Futures: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400',
  Other: 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400',
};

interface PositionsAndOrdersProps {
  currentPrice: number;
  symbol: string;
  onEditPosition?: (position: Position) => void;
  onEditOrder?: (order: Order) => void;
}

export default function PositionsAndOrders({ currentPrice, symbol, onEditPosition, onEditOrder }: PositionsAndOrdersProps) {
  const {
    positions,
    orders,
    history,
    account,
    tradingMode,
    removePosition,
    updatePosition,
    removeOrder,
    addHistory,
    updateAccount
  } = useTrading();
  
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState<'positions' | 'orders' | 'history'>('positions');
  const [positionToClose, setPositionToClose] = useState<Position | null>(null);
  
  // Price updates are now handled centrally by TradingContext on a 5s interval.
  // No per-component price update effect needed — eliminates duplicate updates.

  const handleClosePosition = (position: Position) => {
    setPositionToClose(position);
  };

  const confirmClosePosition = async () => {
    if (!positionToClose) return;
    const position = positionToClose;
    
    try {
      // 1. Close the position in DB
      await removePosition(position.id);
      
      // The DB trigger now handles moving it to trade_history automatically.
      // The TradingContext handles balance/equity recalculation on the next poll/realtime event.
      
      // Close the modal
      setPositionToClose(null);
    } catch (err) {
      console.error('Failed to close position:', err);
      toast.error('Failed to close position. Please try again.');
    }
  };

  const handleCancelOrder = (order: Order) => {
    removeOrder(order.id);
    
    const historyItem: HistoryItem = {
      id: `history-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      symbol: order.symbol,
      side: order.side,
      type: order.type,
      units: order.units,
      price: order.price,
      timestamp: new Date(),
      status: 'cancelled',
      mode: tradingMode
    };
    addHistory(historyItem);
    
    toast.info(`Order cancelled: ${order.side.toUpperCase()} ${order.units} ${order.symbol} @ $${order.price.toFixed(2)}`);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
      {/* ── Close Position Confirmation Modal ── */}
      {positionToClose && (() => {
        const priceDiff = positionToClose.side === 'buy'
          ? currentPrice - positionToClose.entryPrice
          : positionToClose.entryPrice - currentPrice;
        const pnl = priceDiff * positionToClose.units;
        const pnlPositive = pnl >= 0;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setPositionToClose(null)}
            />
            {/* Modal */}
            <div className="relative w-full max-w-sm bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-slate-700">
                <div className="flex items-center gap-2 text-orange-500">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-semibold">Close Position</span>
                </div>
                <button
                  onClick={() => setPositionToClose(null)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="px-5 py-4 space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Are you sure you want to close this position at the current market price?
                </p>

                {/* Position summary */}
                <div className="rounded-xl bg-gray-50 dark:bg-slate-700/60 p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Symbol</span>
                    <span className="font-semibold">{positionToClose.symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Direction</span>
                    <span className={`font-semibold px-2 py-0.5 rounded text-xs ${
                      positionToClose.side === 'buy'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}>
                      {positionToClose.side.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Units</span>
                    <span className="font-semibold">{positionToClose.units}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Entry Price</span>
                    <span className="font-semibold">${positionToClose.entryPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Close Price</span>
                    <span className="font-semibold">${currentPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 dark:border-slate-600 pt-2 mt-1">
                    <span className="text-gray-500 dark:text-gray-400">Estimated P&L</span>
                    <span className={`font-bold ${pnlPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {pnlPositive ? '+' : ''}${pnl.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 pb-5 grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPositionToClose(null)}
                  className="py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmClosePosition}
                  className="py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm transition-colors"
                >
                  Close Position
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-slate-700">
        <div className="flex">
          <button
            onClick={() => setActiveTab('positions')}
            className={`flex-1 px-4 py-3 text-sm transition-colors ${
              activeTab === 'positions'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'
            }`}
          >
            Positions ({positions.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 px-4 py-3 text-sm transition-colors ${
              activeTab === 'orders'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'
            }`}
          >
            Pending Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 px-4 py-3 text-sm transition-colors ${
              activeTab === 'history'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'
            }`}
          >
            History ({history.length})
          </button>
        </div>
      </div>

      {/* Positions Tab */}
      {activeTab === 'positions' && (
        <div className="p-4">
          {positions.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p className="text-sm">There are no open positions in your trading account yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {positions.map((position) => (
                <div
                  key={position.id}
                  className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-600"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        position.side === 'buy'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      }`}>
                        {position.side.toUpperCase()}
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                        {position.type.toUpperCase()}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs ${categoryColors[position.assetCategory || getCategory(position.symbol)] ?? categoryColors.Other}`}>
                        {position.assetCategory || getCategory(position.symbol)}
                      </span>
                      <span className="text-sm">{position.assetName || position.symbol}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleClosePosition(position)}
                        className="px-2 py-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
                      >
                        <span className="text-xs text-red-600 dark:text-red-400">Close</span>
                      </button>
                      {onEditPosition && (
                        <button
                          onClick={() => onEditPosition(position)}
                          className="px-2 py-1 hover:bg-gray-200 dark:hover:bg-slate-600 rounded"
                        >
                          <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Trade ID */}
                  <div className="mb-2 text-xs">
                    <span className="text-gray-500 dark:text-gray-400">ID: </span>
                    <span className="font-mono text-gray-700 dark:text-gray-300 break-all">{formatTxnId(position.id)}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">Units</div>
                      <div>{position.units}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">Entry</div>
                      <div>${(position.entryPrice || 0).toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">Current</div>
                      <div>${(position.currentPrice || 0).toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">P&L</div>
                      <div className={(position.pnl || 0) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                        {(position.pnl || 0) >= 0 ? '+' : ''}${(position.pnl || 0).toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">Margin</div>
                      <div className="font-mono">${(position.margin || 0).toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">&nbsp;</div>
                      <div className="font-semibold text-blue-600 dark:text-blue-400">{position.leverage || 1}x</div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">Date Opened</div>
                      <div>{new Date(position.timestamp).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}</div>
                    </div>
                  </div>
                  
                  {(position.stopLoss || position.takeProfit) && (
                    <div className="pt-2 border-t border-gray-200 dark:border-slate-600 flex gap-3 text-sm">
                      {position.stopLoss && (
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">SL: </span>
                          <span className="text-red-600 dark:text-red-400">${position.stopLoss.toFixed(2)}</span>
                        </div>
                      )}
                      {position.takeProfit && (
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">TP: </span>
                          <span className="text-green-600 dark:text-green-400">${position.takeProfit.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="p-4">
          {orders.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p className="text-sm">No pending orders</p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => {
                const isFilled = order.status === 'filled';
                return (
                  <div
                    key={order.id}
                    className={`p-3 rounded-lg border transition-colors ${
                      isFilled
                        ? 'bg-green-50 dark:bg-green-900/10 border-green-300 dark:border-green-700'
                        : 'bg-gray-50 dark:bg-slate-700/50 border-gray-200 dark:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          order.side === 'buy'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                        }`}>
                          {order.side.toUpperCase()}
                        </span>
                        <span className="px-2 py-0.5 rounded text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                          {order.type.toUpperCase()}
                        </span>
                        {/* Filled / Pending badge */}
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          isFilled
                            ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                        }`}>
                          {isFilled ? '✓ Filled' : 'Pending'}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs ${categoryColors[order.assetCategory || getCategory(order.symbol)] ?? categoryColors.Other}`}>
                          {order.assetCategory || getCategory(order.symbol)}
                        </span>
                        <span className="text-sm font-medium">{order.assetName || order.symbol}</span>
                      </div>
                      <div className="flex gap-2">
                        {!isFilled && (
                          <button
                            onClick={() => handleCancelOrder(order)}
                            className="px-2 py-1 hover:bg-gray-200 dark:hover:bg-slate-600 rounded"
                          >
                            <span className="text-xs text-gray-600 dark:text-gray-400">Cancel</span>
                          </button>
                        )}
                        {onEditOrder && !isFilled && (
                          <button
                            onClick={() => onEditOrder(order)}
                            className="px-2 py-1 hover:bg-gray-200 dark:hover:bg-slate-600 rounded"
                          >
                            <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                      <div>
                        <div className="text-gray-500 dark:text-gray-400">Units</div>
                        <div>{order.units}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 dark:text-gray-400">Entry Price</div>
                        <div className="font-medium">${order.price.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 dark:text-gray-400">Current Price</div>
                        <div className={`font-medium ${
                          (order.currentPrice || order.price) > order.price
                            ? 'text-green-600 dark:text-green-400'
                            : (order.currentPrice || order.price) < order.price
                              ? 'text-red-600 dark:text-red-400'
                              : ''
                        }`}>
                          ${(order.currentPrice || order.price).toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 dark:text-gray-400">&nbsp;</div>
                        <div>{order.leverage}x</div>
                      </div>
                    </div>

                    {(order.stopLoss || order.takeProfit) && (
                      <div className="pt-2 border-t border-gray-200 dark:border-slate-600 flex gap-3 text-sm">
                        {order.stopLoss && (
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">SL: </span>
                            <span className="text-red-600 dark:text-red-400">${order.stopLoss.toFixed(2)}</span>
                          </div>
                        )}
                        {order.takeProfit && (
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">TP: </span>
                            <span className="text-green-600 dark:text-green-400">${order.takeProfit.toFixed(2)}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}       </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="p-4">
          {history.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p className="text-sm">No trading history</p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.slice().reverse().map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-600"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        item.side === 'buy'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      }`}>
                        {item.side.toUpperCase()}
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                        {item.type.toUpperCase()}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs ${categoryColors[item.assetCategory || getCategory(item.symbol)] ?? categoryColors.Other}`}>
                        {item.assetCategory || getCategory(item.symbol)}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        item.status === 'closed' 
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                          : 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400'
                      }`}>
                        {item.status.toUpperCase()}
                      </span>
                      <span className="text-sm">{item.assetName || item.symbol}</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(item.timestamp).toLocaleString()}
                    </div>
                  </div>
                  
                  {/* Trade ID */}
                  <div className="mb-2 text-xs">
                    <span className="text-gray-500 dark:text-gray-400">ID: </span>
                    <span className="font-mono text-gray-700 dark:text-gray-300 break-all">{formatTxnId(item.id)}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">Units</div>
                      <div>{item.units}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">Price</div>
                      <div>${item.price?.toFixed(2) ?? '0.00'}</div>
                    </div>
                    {item.entryPrice && (
                      <div>
                        <div className="text-gray-500 dark:text-gray-400">Entry</div>
                        <div>${item.entryPrice.toFixed(2)}</div>
                      </div>
                    )}
                    {item.pnl !== undefined && (
                      <div>
                        <div className="text-gray-500 dark:text-gray-400">P&L</div>
                        <div className={item.pnl >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                          {item.pnl >= 0 ? '+' : ''}${item.pnl.toFixed(2)}
                        </div>
                      </div>
                    )}
                    {item.entryTimestamp && (
                      <div>
                        <div className="text-gray-500 dark:text-gray-400">Date Opened</div>
                        <div>{new Date(item.entryTimestamp).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}</div>
                      </div>
                    )}
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">Date Closed</div>
                      <div>{new Date(item.timestamp).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}