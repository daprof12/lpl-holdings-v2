import { useState, useEffect } from 'react';
import { ChevronDown, Crown } from 'lucide-react';
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
}

export default function OrderPanel({ symbol, currentPrice, bid, ask, calculatorData }: OrderPanelProps) {
  const {
    account,
    tradingMode,
    setTradingMode,
    addPosition,
    addOrder,
    addHistory,
    updateAccount
  } = useTrading();

  const { plan } = useSubscription();

  // Get leverage limit for current asset based on subscription plan
  const asset = initialAssets.find(a => a.symbol === symbol);
  const maxLeverage = getMaxLeverageForPlan(asset, plan);

  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [orderSide, setOrderSide] = useState<'buy' | 'sell'>('buy');
  const [volume, setVolume] = useState('1');
  const [units, setUnits] = useState('1');
  const [limitPrice, setLimitPrice] = useState(currentPrice.toString());
  const [stopLoss, setStopLoss] = useState<string>('');
  const [takeProfit, setTakeProfit] = useState<string>('');
  const [leverage, setLeverage] = useState('1');

  // Apply calculator data when received
  useEffect(() => {
    if (calculatorData) {
      setOrderSide(calculatorData.orderType);
      setLimitPrice(calculatorData.entryPrice);
      setUnits(calculatorData.units);
      setVolume(calculatorData.units);
      setStopLoss(calculatorData.stopLoss);
      setTakeProfit(calculatorData.takeProfit);
      setLeverage(calculatorData.leverage);
      setOrderType('limit');
      
      setTimeout(() => {
        const orderPanel = document.querySelector('[data-order-panel]');
        if (orderPanel) {
          orderPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [calculatorData]);

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
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden" data-order-panel>
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

      {/* Order Form */}
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
      </div>
    </div>
  );
}