import { useTrading, Position, Order, HistoryItem } from '../../contexts/TradingContext';
import { useAuth } from '../../contexts/AuthContext';
import { useMarketData } from '../../contexts/MarketDataContext';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { getMaxLeverageForPlan } from '../../data/assets';
import PositionCalculator from './PositionCalculator';
import { getMarketStatus, getTimeUntilOpen } from '../../utils/tradingHours';
import { useState, useEffect } from 'react';
import { Clock, Lock, ChevronDown, X, Calculator, HelpCircle, Crown } from 'lucide-react';
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
import { formatPercentage, formatCurrency, formatPrice, formatNumber } from '../../utils/formatNumber';
import { Skeleton } from '../ui/skeleton';

interface OrderPanelProps {
  symbol: string;
  currentPrice: number;
  bid: number;
  ask: number;
  calculatorData?: {
    orderType: 'buy' | 'sell';
    entryPrice: string;
    units: string;
    stopLoss: string;
    takeProfit: string;
    leverage: string;
  };
  editingOrder?: Order | null;
  editingPosition?: Position | null;
  onCancelEdit?: () => void;
  onOpenCalculator?: () => void;
}

export default function OrderPanel({ symbol, currentPrice, bid, ask, calculatorData, editingOrder, editingPosition, onCancelEdit, onOpenCalculator }: OrderPanelProps) {
  const {
    account,
    tradingMode,
    setTradingMode,
    addPosition,
    addOrder,
    addHistory,
    updateAccount,
    updateOrder,
    updatePosition
  } = useTrading();
  
  const { currentUser } = useAuth();
  const marketData = useMarketData();
  const { plan } = useSubscription();

  // Determine the active symbol - use editing position/order symbol if editing, otherwise use prop
  const activeSymbol = editingPosition?.symbol || editingOrder?.symbol || symbol;

  // Get leverage limit for current asset based on subscription plan
  const asset = marketData.assets.find(a => a.symbol === activeSymbol);
  const maxLeverage = getMaxLeverageForPlan(asset, plan);

  // Get real-time price data for the active symbol
  const activePriceData = marketData.getPrice(activeSymbol);
  const activeBid = activePriceData?.bid ?? bid;
  const activeAsk = activePriceData?.ask ?? ask;
  const activePrice = activePriceData?.price ?? currentPrice;

  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [orderSide, setOrderSide] = useState<'buy' | 'sell'>('buy');
  const [volume, setVolume] = useState('1');
  const [units, setUnits] = useState('1');
  const [limitPrice, setLimitPrice] = useState(activePrice.toString());
  const [stopLoss, setStopLoss] = useState<string>('');
  const [takeProfit, setTakeProfit] = useState<string>('');
  const [leverage, setLeverage] = useState('1');
  const [unitType, setUnitType] = useState<'units' | 'lots'>('units');
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const isEditMode = !!(editingOrder || editingPosition);

  // Market status tracking - use active symbol
  const [marketStatus, setMarketStatus] = useState(() => getMarketStatus(activeSymbol));
  const [countdown, setCountdown] = useState('');

  // Subscribe to the active symbol's price updates
  useEffect(() => {
    if (activeSymbol !== symbol) {
      // We're editing a position/order with a different symbol
      marketData.subscribeToSymbol(activeSymbol);
      return () => {
        marketData.unsubscribeFromSymbol(activeSymbol);
      };
    }
  }, [activeSymbol, symbol, marketData]);

  const [isManualPrice, setIsManualPrice] = useState(false);

  // Update limit price when active price changes or symbol changes
  useEffect(() => {
    if (!isEditMode && !isManualPrice) {
      setLimitPrice(activePrice.toString());
    }
  }, [activeSymbol, isEditMode, isManualPrice]);

  // Reset SL/TP when symbol changes
  useEffect(() => {
    if (!isEditMode) {
      setStopLoss('');
      setTakeProfit('');
    }
  }, [activeSymbol, isEditMode]);

  // ── Full panel reset when the top-level symbol prop changes (new instrument) ──
  // Resets units, leverage, unitType so stale values from a previous asset don't carry over.
  useEffect(() => {
    if (!isEditMode) {
      setUnits('1');
      setVolume('1');
      setLeverage('1');
      setUnitType('units');
      setOrderSide('buy');
      setIsManualPrice(false);
    }
  }, [symbol]);

  // Update market status every second for countdown
  useEffect(() => {
    const interval = setInterval(() => {
      const status = getMarketStatus(activeSymbol);
      setMarketStatus(status);
      
      if (!status.isOpen && status.nextOpenTime) {
        setCountdown(getTimeUntilOpen(status.nextOpenTime));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeSymbol]);

  const handleApplyCalculatorData = (data: {
    orderType: 'buy' | 'sell';
    entryPrice: string;
    units: string;
    stopLoss: string;
    takeProfit: string;
    leverage: string;
  }) => {
    setOrderSide(data.orderType);
    setLimitPrice(data.entryPrice);
    setUnits(data.units);
    setVolume(data.units);
    setStopLoss(data.stopLoss);
    setTakeProfit(data.takeProfit);
    setLeverage(data.leverage);
    setOrderType('limit');
    setIsCalculatorOpen(false);
  };

  // Apply calculator data when received
  useEffect(() => {
    if (calculatorData) {
      handleApplyCalculatorData(calculatorData);
      
      setTimeout(() => {
        const orderPanel = document.querySelector('[data-order-panel]');
        if (orderPanel) {
          orderPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [calculatorData]);

  // Populate form when editing an order or position
  useEffect(() => {
    if (editingOrder) {
      setOrderType(editingOrder.type);
      setOrderSide(editingOrder.side);
      setUnits(editingOrder.units.toString());
      setVolume(editingOrder.units.toString());
      setLimitPrice(editingOrder.price.toString());
      setStopLoss(editingOrder.stopLoss?.toString() || '');
      setTakeProfit(editingOrder.takeProfit?.toString() || '');
      setLeverage(editingOrder.leverage.toString());
    } else if (editingPosition) {
      setOrderType('market');
      setOrderSide(editingPosition.side);
      setUnits(editingPosition.units.toString());
      setVolume(editingPosition.units.toString());
      setStopLoss(editingPosition.stopLoss?.toString() || '');
      setTakeProfit(editingPosition.takeProfit?.toString() || '');
      setLeverage(editingPosition.leverage.toString());
    }
  }, [editingOrder, editingPosition]);

  // 1 standard lot = 100,000 units
  const LOT_SIZE = 100000;

  // Returns the real unit count regardless of whether the user is typing in lots or units
  const getActualUnits = () => {
    const val = parseFloat(units) || 0;
    return unitType === 'lots' ? val * LOT_SIZE : val;
  };

  // Converts the displayed value when the user switches between Units ↔ Lots
  const handleUnitTypeChange = (newType: 'units' | 'lots') => {
    const current = parseFloat(units) || 0;
    if (newType === 'lots' && unitType === 'units') {
      const lots = current > 0 ? current / LOT_SIZE : 0.01;
      const lotsStr = lots.toFixed(2);
      setUnits(lotsStr);
      setVolume(lotsStr);
    } else if (newType === 'units' && unitType === 'lots') {
      const raw = Math.round(current * LOT_SIZE);
      const rawStr = (raw > 0 ? raw : 1).toString();
      setUnits(rawStr);
      setVolume(rawStr);
    }
    setUnitType(newType);
  };

  const calculateMargin = () => {
    const vol = getActualUnits();
    const lev = parseFloat(leverage) || 1;
    return formatNumber((activePrice * vol) / lev);
  };

  const calculateOrderInfo = () => {
    const unitsNum = getActualUnits();
    const leverageNum = parseFloat(leverage) || 1;
    const execPrice = orderType === 'market' ? (orderSide === 'buy' ? activeAsk : activeBid) : parseFloat(limitPrice);
    const requiredMargin = (execPrice * unitsNum) / leverageNum;
    const tradeValue = execPrice * unitsNum;
    
    // Calculate pip value (for forex, 1 pip = 0.0001 for most pairs)
    const pipValue = unitsNum * 0.0001;
    
    // Calculate potential reward/risk if TP/SL are set
    let reward = 0;
    let rewardPercent = 0;
    let risk = 0;
    let riskPercent = 0;
    
    if (takeProfit) {
      const tpPrice = parseFloat(takeProfit);
      const priceDiff = orderSide === 'buy' ? (tpPrice - execPrice) : (execPrice - tpPrice);
      reward = priceDiff * unitsNum;
      rewardPercent = (reward / requiredMargin) * 100;
    }
    
    if (stopLoss) {
      const slPrice = parseFloat(stopLoss);
      const priceDiff = orderSide === 'buy' ? (execPrice - slPrice) : (slPrice - execPrice);
      risk = priceDiff * unitsNum;
      riskPercent = (risk / requiredMargin) * 100;
    }
    
    return {
      margin: requiredMargin,
      leverage: leverageNum,
      pipValue,
      tradeValue,
      reward,
      rewardPercent,
      risk,
      riskPercent,
    };
  };

  const orderInfo = calculateOrderInfo();
  const marginUsagePercent = account.balance > 0 ? (orderInfo.margin / account.balance) * 100 : 0;

  const handlePlaceOrder = () => {
    // Check if market is closed and user is not admin
    if (!marketStatus.isOpen && currentUser?.role !== 'admin') {
      toast.error('Market Closed', {
        description: 'This market is currently closed. Only admins can trade on behalf of users.',
      });
      return;
    }

    const unitsNum = getActualUnits();
    const leverageNum = parseFloat(leverage);
    const execPrice = orderType === 'market' ? (orderSide === 'buy' ? activeAsk : activeBid) : parseFloat(limitPrice);
    
    if (!unitsNum || unitsNum <= 0) {
      toast.error('Invalid Units', {
        description: 'Please enter a valid number of units',
      });
      return;
    }
    
    if (orderType !== 'market' && (!execPrice || execPrice <= 0)) {
      toast.error('Invalid Price', {
        description: 'Please enter a valid price',
      });
      return;
    }
    
    const requiredMargin = (execPrice * unitsNum) / leverageNum;
    
    if (requiredMargin > account.availableFunds) {
      toast.error('Insufficient Balance', {
        description: `Required: ${formatPrice(requiredMargin)} | Available: ${formatPrice(account.availableFunds)}`,
      });
      return;
    }
    
    const id = `${tradingMode}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Handle Market Orders
    if (orderType === 'market') {
      const newPosition: Position = {
        id,
        userId: currentUser?.id || 'unknown',
        symbol: activeSymbol,
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
        userId: currentUser?.id || 'unknown',
        symbol: activeSymbol,
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
      
      toast.success('Order Executed', {
        description: `${orderSide.toUpperCase()} ${unitsNum} ${activeSymbol} @ ${formatPrice(execPrice)} | Margin: ${formatPrice(requiredMargin)}`,
      });
    } 
    // Handle Limit/Stop Orders
    else {
      const newOrder: Order = {
        id,
        userId: currentUser?.id || 'unknown',
        symbol: activeSymbol,
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
      
      toast.success('Order Placed', {
        description: `${orderType.toUpperCase()} ${orderSide.toUpperCase()} ${unitsNum} ${activeSymbol} @ ${formatPrice(execPrice)}`,
      });
    }
  };

  const handleConfirmEdit = () => {
    const unitsNum = getActualUnits();
    const leverageNum = parseFloat(leverage);
    const execPrice = orderType === 'market' ? (orderSide === 'buy' ? activeAsk : activeBid) : parseFloat(limitPrice);
    
    if (!unitsNum || unitsNum <= 0) {
      toast.error('Please enter a valid number of units');
      return;
    }
    
    if (orderType !== 'market' && (!execPrice || execPrice <= 0)) {
      toast.error('Please enter a valid price');
      return;
    }
    
    if (editingOrder) {
      // Update pending order
      updateOrder(editingOrder.id, {
        side: orderSide,
        type: orderType === 'market' ? 'limit' : orderType,
        units: unitsNum,
        price: execPrice,
        stopLoss: stopLoss ? parseFloat(stopLoss) : undefined,
        takeProfit: takeProfit ? parseFloat(takeProfit) : undefined,
        leverage: leverageNum,
      });
      toast.success(`Order updated successfully`);
      onCancelEdit?.();
    } else if (editingPosition) {
      // Update position (only SL/TP can be updated)
      updatePosition(editingPosition.id, {
        stopLoss: stopLoss ? parseFloat(stopLoss) : undefined,
        takeProfit: takeProfit ? parseFloat(takeProfit) : undefined,
      });
      toast.success(`Position updated successfully`);
      onCancelEdit?.();
    }
  };

  const handleDiscardEdit = () => {
    onCancelEdit?.();
    toast.info('Edit cancelled');
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col h-full" data-order-panel>
      {/* Trading Mode Selector */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-700 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Select value={tradingMode} onValueChange={setTradingMode}>
            <SelectTrigger className="flex-1">
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
          <button
            onClick={() => onOpenCalculator?.()}
            className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            title="Position Calculator"
          >
            <Calculator className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Fixed Header: Buy/Sell + Order Type */}
      <div className="px-4 pt-4 pb-2 border-b border-gray-200 dark:border-slate-700 flex-shrink-0">
        {/* Edit Mode Indicator */}
        {isEditMode && activeSymbol !== symbol && (
          <div className="mb-3 p-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-xs text-blue-900 dark:text-blue-200">
              Editing {editingPosition ? 'position' : 'order'} for <span className="font-semibold">{activeSymbol}</span>
            </p>
          </div>
        )}
        
        {/* Buy/Sell Toggle */}
        <div className="grid grid-cols-2 gap-2 mb-3">
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
        <Tabs value={orderType} onValueChange={(v) => setOrderType(v as any)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="market">Market</TabsTrigger>
            <TabsTrigger value="limit">Limit</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Scrollable Middle Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* Market Status Banner */}
          {!marketStatus.isOpen && (
            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
              <div className="flex items-start gap-2">
                <Lock className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-orange-900 dark:text-orange-200">Market Closed</span>
                    <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  <p className="text-xs text-orange-800 dark:text-orange-300">
                    {marketStatus.message}
                  </p>
                  {marketStatus.nextOpenTime && (
                    <div className="mt-2 p-2 bg-orange-100 dark:bg-orange-900/40 rounded">
                      <div className="text-xs text-orange-900 dark:text-orange-200">
                        <span>Opens in: </span>
                        <span className="font-mono font-semibold">{countdown}</span>
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-orange-700 dark:text-orange-300 mt-2">
                    Trading is restricted when the market is closed. Only admins can place trades at the current close price on behalf of users.
                  </p>
                  {/* Link to full trading hours schedule */}
                  <a
                    href="/trading-hours"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 flex items-center gap-1.5 text-xs text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-200 underline underline-offset-2 decoration-orange-400/50 hover:decoration-orange-600 transition-colors w-fit"
                  >
                    <Clock className="w-3 h-3 flex-shrink-0" />
                    View full market trading hours schedule
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Price Display */}
          <div className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">Price</span>
              {!marketData.isPriceLive(activeSymbol) ? (
                <Skeleton className="h-6 w-24" />
              ) : (
                <span className="text-lg">
                  {orderType === 'market' 
                    ? formatPrice(orderSide === 'buy' ? activeAsk : activeBid)
                    : formatPrice(parseFloat(limitPrice || '0'))
                  }
                </span>
              )}
            </div>
          </div>

          {/* Limit/Stop Price */}
          {orderType !== 'market' && (
            <div>
              <Label htmlFor="limitPrice" className="text-xs">
                Limit Price
              </Label>
              <Input
                id="limitPrice"
                type="number"
                step="0.01"
                value={limitPrice}
                onChange={(e) => {
                  setLimitPrice(e.target.value);
                  setIsManualPrice(true);
                }}
                placeholder="0.00"
                className="mt-1"
              />
            </div>
          )}

          {/* Units */}
          <div>
            <Label htmlFor="units" className="text-xs">
              {unitType === 'lots' ? 'Lots' : 'Units'}
            </Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="units"
                type="number"
                step={unitType === 'lots' ? '0.01' : '1'}
                min={unitType === 'lots' ? '0.01' : '1'}
                value={units}
                onChange={(e) => { setUnits(e.target.value); setVolume(e.target.value); }}
                placeholder={unitType === 'lots' ? '0.01' : '1'}
                className="flex-1"
              />
              <Select value={unitType} onValueChange={handleUnitTypeChange}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Units" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="units">Units</SelectItem>
                  <SelectItem value="lots">Lots</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {unitType === 'lots' && (
              <p className="mt-1 text-xs text-blue-500 dark:text-blue-400">
                = {(parseFloat(units) || 0) * LOT_SIZE >= 1000
                    ? `${((parseFloat(units) || 0) * LOT_SIZE / 1000).toFixed(1)}K`
                    : ((parseFloat(units) || 0) * LOT_SIZE).toLocaleString()} units
              </p>
            )}
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
              <span>Margin USD ~</span>
              <span>{calculateMargin()}</span>
            </div>
          </div>

          {/* Leverage Slider */}
          <div>
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
            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
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
          <div className="pt-2 border-t border-gray-100 dark:border-slate-700/50">
            <details className="group" open>
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
                      onChange={(e) => setTakeProfit(e.target.checked ? activePrice.toString() : '')}
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
                      onChange={(e) => setStopLoss(e.target.checked ? activePrice.toString() : '')}
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

          {/* Order Summary Section */}
          <div className="border-t border-gray-200 dark:border-slate-700 pt-4">
            <h3 className="text-sm mb-3">Order info</h3>
            
            {/* Margin with Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Margin</span>
                  <HelpCircle className="w-3 h-3 text-gray-400" />
                </div>
                <span className="text-xs">
                  {formatNumber(orderInfo.margin)} / {formatNumber(account.balance)}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${Math.min(marginUsagePercent, 100)}%` }}
                />
              </div>
            </div>

            {/* Order Info Details */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Leverage</span>
                <span>{orderInfo.leverage}:1</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Pip value</span>
                <span>{orderInfo.pipValue.toFixed(4)} USD</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Trade value</span>
                <span>{formatCurrency(orderInfo.tradeValue)} USD</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Reward</span>
                <span className={orderInfo.reward > 0 ? 'text-green-600 dark:text-green-400' : ''}>
                  {formatPercentage(orderInfo.rewardPercent)} / {formatCurrency(orderInfo.reward)} USD
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Risk</span>
                <span className={orderInfo.risk > 0 ? 'text-red-600 dark:text-red-400' : ''}>
                  {formatPercentage(orderInfo.riskPercent)} / {formatCurrency(orderInfo.risk)} USD
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Footer: Action Buttons */}
      <div className="p-4 border-t border-gray-200 dark:border-slate-700 flex-shrink-0 bg-white dark:bg-slate-800">
        {isEditMode ? (
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="lg"
              variant="outline"
              className="w-full"
              onClick={handleDiscardEdit}
            >
              Discard
            </Button>
            <Button
              size="lg"
              className="w-full bg-gradient-to-br from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
              onClick={handleConfirmEdit}
            >
              Confirm Update
            </Button>
          </div>
        ) : (
          <Button
            size="lg"
            disabled={!marketData.isPriceLive(activeSymbol)}
            className={`w-full text-white ${
              orderSide === 'buy'
                ? 'bg-gradient-to-br from-green-600 to-green-500 hover:from-green-700 hover:to-green-600'
                : 'bg-gradient-to-br from-red-600 to-red-500 hover:from-red-700 hover:to-red-600'
            }`}
            onClick={handlePlaceOrder}
          >
            {orderSide === 'buy' ? 'Buy' : 'Sell'} {units} {activeSymbol} @ {orderType === 'market' 
              ? formatPrice(orderSide === 'buy' ? activeAsk : activeBid)
              : formatPrice(parseFloat(limitPrice || '0'))
            }
          </Button>
        )}
      </div>

      {/* Calculator Modal */}
      {isCalculatorOpen && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4"
          onClick={() => setIsCalculatorOpen(false)}
        >
          <div 
            className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-3xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-4 py-3 flex items-center justify-between z-10">
              <h2 className="text-lg font-semibold">Position Calculator</h2>
              <button
                onClick={() => setIsCalculatorOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <PositionCalculator
                key={activeSymbol}
                currentPrice={activePrice}
                onApplyToOrder={handleApplyCalculatorData}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}