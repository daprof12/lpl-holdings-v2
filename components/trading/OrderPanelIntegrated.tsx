import { useState, useEffect } from 'react';
import { ChevronDown, X, AlertTriangle, Crown } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { toast } from 'sonner';
import { useTrading, Position, Order, HistoryItem } from '../../contexts/TradingContext';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { initialAssets, getMaxLeverageForPlan } from '../../data/assets';
import { formatCurrency } from '../../utils/formatNumber';

interface OrderPanelProps {
  symbol: string;
  currentPrice: number;
  bid: number;
  ask: number;
  calculatorData?: {
    orderType: 'buy' | 'sell';
    entryPrice: string;
    volume: string;
    stopLoss: string;
    takeProfit: string;
    leverage: string;
  };
}

export default function OrderPanel({ symbol, currentPrice, bid, ask, calculatorData }: OrderPanelProps) {
  // Use Trading Context
  const {
    positions,
    orders,
    account,
    tradingMode,
    setTradingMode,
    addPosition,
    removePosition,
    updatePosition,
    addOrder,
    removeOrder,
    addHistory,
    updateAccount
  } = useTrading();

  // Use Subscription Context
  const { plan } = useSubscription();

  // Get leverage limit for current asset based on subscription plan
  const asset = initialAssets.find(a => a.symbol === symbol);
  const maxLeverage = getMaxLeverageForPlan(asset, plan);

  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [orderSide, setOrderSide] = useState<'buy' | 'sell'>('buy');
  const [volume, setVolume] = useState('1');
  const [units, setUnits] = useState('1');
  const [limitPrice, setLimitPrice] = useState(currentPrice.toString());
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [leverage, setLeverage] = useState('1');
  const [activeOrderTab, setActiveOrderTab] = useState<'order' | 'positions' | 'orders'>('order');
  const [positionToClose, setPositionToClose] = useState<Position | null>(null);

  // Apply calculator data when received
  useEffect(() => {
    if (calculatorData) {
      setOrderSide(calculatorData.orderType);
      setLimitPrice(calculatorData.entryPrice);
      setUnits(calculatorData.volume);
      setVolume(calculatorData.volume);
      setStopLoss(calculatorData.stopLoss);
      setTakeProfit(calculatorData.takeProfit);
      setLeverage(calculatorData.leverage);
      setOrderType('limit');
      setActiveOrderTab('order');
      
      setTimeout(() => {
        const orderPanel = document.querySelector('[data-order-panel]');
        if (orderPanel) {
          orderPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [calculatorData]);

  // Update position P&L based on current price
  useEffect(() => {
    if (positions.length > 0) {
      let totalUnrealizedPnL = 0;
      
      positions.forEach(position => {
        if (position.symbol === symbol || true) { // Update all positions
          const priceDiff = position.side === 'buy' 
            ? currentPrice - position.entryPrice 
            : position.entryPrice - currentPrice;
          const pnl = priceDiff * position.units * position.leverage;
          
          totalUnrealizedPnL += pnl;
          
          updatePosition(position.id, {
            currentPrice,
            pnl
          });
        }
      });
      
      updateAccount({
        unrealizedPnL: totalUnrealizedPnL,
        equity: account.balance + totalUnrealizedPnL
      });
    }
  }, [currentPrice]);

  const calculateMargin = () => {
    const vol = parseFloat(volume) || 0;
    const lev = parseFloat(leverage) || 1;
    return ((currentPrice * vol) / lev).toFixed(2);
  };

  const handlePlaceOrder = () => {
    const unitsNum = parseFloat(units);
    const leverageNum = parseFloat(leverage);
    const execPrice = orderType === 'market' ? (orderSide === 'buy' ? ask : bid) : parseFloat(limitPrice);
    
    if (!unitsNum || unitsNum <= 0) {
      toast.error('Please enter a valid number of units');
      return;
    }
    
    if (orderType !== 'market' && (!execPrice || execPrice <= 0)) {
      toast.error('Please enter a valid price');
      return;
    }
    
    const requiredMargin = (execPrice * unitsNum) / leverageNum;
    
    if (requiredMargin > account.availableFunds) {
      toast.error('Insufficient funds for this order');
      return;
    }
    
    const id = `${tradingMode}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Handle Market Orders
    if (orderType === 'market') {
      const newPosition: Position = {
        id,
        symbol,
        side: orderSide,
        units: unitsNum,
        entryPrice: execPrice,
        currentPrice: execPrice,
        stopLoss: stopLoss ? parseFloat(stopLoss) : undefined,
        takeProfit: takeProfit ? parseFloat(takeProfit) : undefined,
        leverage: leverageNum,
        pnl: 0,
        margin: requiredMargin,
        timestamp: new Date(),
        mode: tradingMode
      };
      
      addPosition(newPosition);
      
      const historyItem: HistoryItem = {
        id,
        symbol,
        side: orderSide,
        type: orderType,
        units: unitsNum,
        price: execPrice,
        timestamp: new Date(),
        status: 'filled',
        mode: tradingMode
      };
      addHistory(historyItem);
      
      updateAccount({
        margin: account.margin + requiredMargin,
        availableFunds: account.availableFunds - requiredMargin
      });
      
      toast.success(`Market order filled: ${orderSide.toUpperCase()} ${unitsNum} ${symbol} @ $${execPrice.toFixed(2)}`);
      setActiveOrderTab('positions');
    } 
    // Handle Limit/Stop Orders
    else {
      const newOrder: Order = {
        id,
        symbol,
        side: orderSide,
        type: orderType,
        units: unitsNum,
        price: execPrice,
        stopLoss: stopLoss ? parseFloat(stopLoss) : undefined,
        takeProfit: takeProfit ? parseFloat(takeProfit) : undefined,
        leverage: leverageNum,
        status: 'pending',
        timestamp: new Date(),
        mode: tradingMode
      };
      
      addOrder(newOrder);
      
      toast.success(`${orderType.charAt(0).toUpperCase() + orderType.slice(1)} order placed: ${orderSide.toUpperCase()} ${unitsNum} ${symbol} @ $${execPrice.toFixed(2)}`);
      setActiveOrderTab('orders');
    }
  };

  const handleClosePosition = (position: Position) => {
    setPositionToClose(position);
  };

  const confirmClosePosition = () => {
    if (!positionToClose) return;
    const position = positionToClose;
    const priceDiff = position.side === 'buy'
      ? currentPrice - position.entryPrice
      : position.entryPrice - currentPrice;
    const pnl = priceDiff * position.units * position.leverage;

    removePosition(position.id);

    const historyItem: HistoryItem = {
      id: position.id,
      userId: position.userId,
      symbol: position.symbol,
      side: position.side,
      type: 'market',
      units: position.units,
      price: currentPrice,
      entryPrice: position.entryPrice,
      entryTimestamp: position.timestamp,
      pnl,
      timestamp: new Date(),
      status: 'closed',
      mode: tradingMode
    };
    addHistory(historyItem);

    // Compute remaining unrealized P&L and margin from other open positions
    const remainingPositions = positions.filter(p => p.id !== position.id);
    const remainingUnrealizedPnL = remainingPositions.reduce((sum, p) => sum + (p.pnl || 0), 0);
    const remainingMargin = remainingPositions.reduce((sum, p) => sum + (p.margin || 0), 0);
    const newBalance = account.balance + pnl;
    const newEquity = newBalance + remainingUnrealizedPnL;

    updateAccount({
      balance: newBalance,
      equity: newEquity,
      realizedPnL: account.realizedPnL + pnl,
      unrealizedPnL: remainingUnrealizedPnL,
      margin: remainingMargin,
      availableFunds: newEquity - remainingMargin,
    });

    toast.success(`Position closed: ${pnl >= 0 ? 'Profit' : 'Loss'} of $${Math.abs(pnl).toFixed(2)}`);
    setPositionToClose(null);
  };

  const handleCancelOrder = (order: Order) => {
    removeOrder(order.id);
    
    const historyItem: HistoryItem = {
      id: order.id,
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
    <div className="flex flex-col h-full bg-white dark:bg-slate-800 overflow-hidden">
      {/* ── Close Position Confirmation Modal ── */}
      {positionToClose && (() => {
        const priceDiff = positionToClose.side === 'buy'
          ? currentPrice - positionToClose.entryPrice
          : positionToClose.entryPrice - currentPrice;
        const pnl = priceDiff * positionToClose.units * positionToClose.leverage;
        const pnlPositive = pnl >= 0;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setPositionToClose(null)}
            />
            <div className="relative w-full max-w-sm bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden">
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
              <div className="px-5 py-4 space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Are you sure you want to close this position at the current market price?
                </p>
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

      {/* Trading Mode Selector */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-700">
        <Select value={tradingMode} onValueChange={setTradingMode}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="live">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Live Trading
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Order Tabs */}
      <div className="border-b border-gray-200 dark:border-slate-700">
        <div className="flex">
          <button
            onClick={() => setActiveOrderTab('order')}
            className={`flex-1 px-4 py-3 text-sm transition-colors ${
              activeOrderTab === 'order'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'
            }`}
          >
            Order
          </button>
          <button
            onClick={() => setActiveOrderTab('positions')}
            className={`flex-1 px-4 py-3 text-sm transition-colors ${
              activeOrderTab === 'positions'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'
            }`}
          >
            Positions
          </button>
          <button
            onClick={() => setActiveOrderTab('orders')}
            className={`flex-1 px-4 py-3 text-sm transition-colors ${
              activeOrderTab === 'orders'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'
            }`}
          >
            Orders
          </button>
        </div>
      </div>

      {/* Order Form */}
      {activeOrderTab === 'order' && (
        <div className="p-4">
          {/* Buy/Sell Toggle */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              onClick={() => setOrderSide('buy')}
              className={`py-3 rounded-lg transition-colors ${
                orderSide === 'buy'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setOrderSide('sell')}
              className={`py-3 rounded-lg transition-colors ${
                orderSide === 'sell'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
              }`}
            >
              Sell
            </button>
          </div>

          {/* Order Type Tabs */}
          <Tabs value={orderType} onValueChange={(v) => setOrderType(v as any)} className="mb-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="market">Market</TabsTrigger>
              <TabsTrigger value="limit">Limit</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Price Display */}
          <div className="mb-4 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">Price</span>
              <span className="text-lg">
                ${orderType === 'market' 
                  ? (orderSide === 'buy' ? ask : bid).toFixed(2)
                  : parseFloat(limitPrice || '0').toFixed(2)
                }
              </span>
            </div>
          </div>

          {/* Limit/Stop Price */}
          {orderType !== 'market' && (
            <div className="mb-4">
              <Label htmlFor="limitPrice" className="text-xs">
                {orderType === 'limit' ? 'Limit Price' : 'Stop Price'}
              </Label>
              <Input
                id="limitPrice"
                type="number"
                step="0.01"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                placeholder="0.00"
                className="mt-1"
              />
            </div>
          )}

          {/* Units */}
          <div className="mb-4">
            <Label htmlFor="units" className="text-xs">Units</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="units"
                type="number"
                step="1"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                placeholder="1"
                className="flex-1"
              />
              <Select value="units" onValueChange={() => {}}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Units" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="units">Units</SelectItem>
                  <SelectItem value="lots">Lots</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
              <span>Margin USD ~</span>
              <span>{calculateMargin()}</span>
            </div>
          </div>

          {/* Leverage Slider */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="leverage" className="text-xs">Leverage</Label>
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{leverage}x</span>
            </div>
            <input
              id="leverage"
              type="range"
              min="1"
              max={maxLeverage}
              step="1"
              value={leverage}
              onChange={(e) => setLeverage(e.target.value)}
              className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>1x</span>
              <div className="flex items-center gap-1.5">
                <span className="text-blue-600 dark:text-blue-400">Max: {maxLeverage}x</span>
                <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                  plan === 'Platinum' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300' :
                  plan === 'Gold' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                  plan === 'Silver' ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300' :
                  plan === 'Standard' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300' :
                  'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                }`}>
                  <Crown className="w-2.5 h-2.5" />
                  {plan}
                </span>
              </div>
            </div>
          </div>

          {/* Exits Section */}
          <div className="mb-4">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer text-sm py-2 text-gray-700 dark:text-gray-300">
                <span>Exits</span>
                <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="mt-2 space-y-3">
                {/* Take Profit */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <input
                      type="checkbox"
                      id="takeProfitToggle"
                      checked={!!takeProfit}
                      onChange={(e) => setTakeProfit(e.target.checked ? currentPrice.toString() : '')}
                      className="rounded"
                    />
                    <Label htmlFor="takeProfitToggle" className="text-xs cursor-pointer">
                      Take profit
                    </Label>
                  </div>
                  {takeProfit && (
                    <Input
                      type="number"
                      step="0.01"
                      value={takeProfit}
                      onChange={(e) => setTakeProfit(e.target.value)}
                      placeholder="Price"
                      className="text-sm"
                    />
                  )}
                </div>

                {/* Stop Loss */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <input
                      type="checkbox"
                      id="stopLossToggle"
                      checked={!!stopLoss}
                      onChange={(e) => setStopLoss(e.target.checked ? currentPrice.toString() : '')}
                      className="rounded"
                    />
                    <Label htmlFor="stopLossToggle" className="text-xs cursor-pointer">
                      Stop loss
                    </Label>
                  </div>
                  {stopLoss && (
                    <Input
                      type="number"
                      step="0.01"
                      value={stopLoss}
                      onChange={(e) => setStopLoss(e.target.value)}
                      placeholder="Price"
                      className="text-sm"
                    />
                  )}
                </div>
              </div>
            </details>
          </div>

          {/* Place Order Button */}
          <Button
            size="lg"
            className={`w-full ${
              orderSide === 'buy'
                ? 'bg-gradient-to-br from-green-600 to-green-500 hover:from-green-700 hover:to-green-600'
                : 'bg-gradient-to-br from-red-600 to-red-500 hover:from-red-700 hover:to-red-600'
            }`}
            onClick={handlePlaceOrder}
          >
            {orderSide === 'buy' ? 'Buy' : 'Sell'} {units} {symbol} @ ${orderType === 'market' 
              ? (orderSide === 'buy' ? ask : bid).toFixed(2)
              : parseFloat(limitPrice || '0').toFixed(2)
            }
          </Button>

          {/* Account Summary */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="text-gray-500 dark:text-gray-400 mb-1">Account Balance</div>
                <div className="font-semibold">${formatCurrency(account.balance)}</div>
              </div>
              <div>
                <div className="text-gray-500 dark:text-gray-400 mb-1">Equity</div>
                <div className="font-semibold">${formatCurrency(account.equity)}</div>
              </div>
              <div>
                <div className="text-gray-500 dark:text-gray-400 mb-1">Realized P&L</div>
                <div className={`font-semibold ${account.realizedPnL >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  ${account.realizedPnL.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-gray-500 dark:text-gray-400 mb-1">Unrealized P&L</div>
                <div className={`font-semibold ${account.unrealizedPnL >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  ${account.unrealizedPnL.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-gray-500 dark:text-gray-400 mb-1">Account margin</div>
                <div className="font-semibold">${account.margin.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-gray-500 dark:text-gray-400 mb-1">Available funds</div>
                <div className="font-semibold">${formatCurrency(account.availableFunds)}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Positions Tab */}
      {activeOrderTab === 'positions' && (
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
                      <span className="text-sm">{position.symbol}</span>
                    </div>
                    <button
                      onClick={() => handleClosePosition(position)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-slate-600 rounded"
                    >
                      <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">Units</div>
                      <div>{position.units}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">Entry</div>
                      <div>${position.entryPrice.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">Current</div>
                      <div>${position.currentPrice.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">P&L</div>
                      <div className={position.pnl >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                        {position.pnl >= 0 ? '+' : ''}${position.pnl.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  
                  {(position.stopLoss || position.takeProfit) && (
                    <div className="pt-2 border-t border-gray-200 dark:border-slate-600 flex gap-3 text-xs">
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
      {activeOrderTab === 'orders' && (
        <div className="p-4">
          {orders.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p className="text-sm">No pending orders</p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-600"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
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
                      <span className="text-sm">{order.symbol}</span>
                    </div>
                    <button
                      onClick={() => handleCancelOrder(order)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-slate-600 rounded"
                    >
                      <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">Units</div>
                      <div>{order.units}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">Price</div>
                      <div>${order.price.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">Status</div>
                      <div className="text-yellow-600 dark:text-yellow-400">{order.status}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">Leverage</div>
                      <div>{order.leverage}x</div>
                    </div>
                  </div>
                  
                  {(order.stopLoss || order.takeProfit) && (
                    <div className="pt-2 border-t border-gray-200 dark:border-slate-600 flex gap-3 text-xs">
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
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}