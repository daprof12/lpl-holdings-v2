import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, TrendingUp, TrendingDown, Info, ShoppingCart, X } from 'lucide-react';
import { Button } from '../ui/button';
import DashboardLayout from '../layouts/DashboardLayout';
import TradingChart from './TradingChart';
import OrderPanel from './OrderPanel';
import MarketInfo from './MarketInfo';
import AccountSummaryFooter from './AccountSummaryFooter';
import PositionsAndOrders from './PositionsAndOrders';
import PositionCalculatorPanel from './PositionCalculatorPanel';
import { useMarketData } from '../../contexts/MarketDataContext';
// Using dynamic assets from MarketDataContext
import { Position, Order } from '../../contexts/TradingContext';
import { formatPercentage, formatPrice, formatCurrency } from '../../utils/formatNumber';

export default function TradingPage() {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const marketData = useMarketData();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<'chart' | 'info'>('chart');
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [editingPosition, setEditingPosition] = useState<Position | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isMobileOrderOpen, setIsMobileOrderOpen] = useState(false);
  const [calculatorData, setCalculatorData] = useState<any>(null);

  const symbolKey = symbol || 'BTCUSD';

  // Subscribe to the symbol – runs immediately when symbolKey changes
  useEffect(() => {
    marketData.subscribeToSymbol(symbolKey);
    return () => {
      marketData.unsubscribeFromSymbol(symbolKey);
    };
  }, [symbolKey]);

  // Reset edit state when symbol changes
  useEffect(() => {
    setEditingOrder(null);
    setEditingPosition(null);
    setIsCalculatorOpen(false);
    setIsMobileOrderOpen(false);
    setCalculatorData(null);
  }, [symbolKey]);

  const handleApplyCalculator = (data: any) => {
    setCalculatorData(data);
    setIsCalculatorOpen(false);
    // If mobile, keep order panel open but calculator closed
  };

  // Get real market data
  const priceData = marketData.getPrice(symbolKey);

  const safePrice = priceData?.price ?? 0;
  const safeBid   = priceData?.bid   ?? safePrice * 0.9999;
  const safeAsk   = priceData?.ask   ?? safePrice * 1.0001;

  // ── Rich metadata: prefer marketData.assets lookup, fall back gracefully ──────
  const assetRecord = marketData.assets.find(a => a.symbol === symbolKey);
  const metadata = assetRecord
    ? { name: assetRecord.name, category: assetRecord.category }
    : { name: symbolKey, category: 'Asset' };

  const assetData = {
    symbol:    symbolKey,
    name:      metadata.name,
    category:  metadata.category,
    currentPrice: safePrice,
    change24h:  priceData?.changePercent ?? 0,
    high24h:    priceData?.high   ?? safePrice * 1.01,
    low24h:     priceData?.low    ?? safePrice * 0.99,
    volume24h:  typeof priceData?.volume === 'number'
                  ? priceData.volume
                  : parseFloat(priceData?.volume || '0') || 0,
    bid:    safeBid,
    ask:    safeAsk,
    spread: safeAsk - safeBid,
  };

  const isPositive = assetData.change24h >= 0;

  return (
    <DashboardLayout>
      <div className="bg-gray-50 dark:bg-slate-900">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-20">
          <div className="max-w-[2000px] mx-auto px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/markets')}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`${isFavorite ? 'text-yellow-500' : 'text-gray-300'} hover:text-yellow-500`}
                  >
                    <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl">{assetData.symbol}</h1>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded text-sm">
                        {assetData.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{assetData.name}</p>
                  </div>
                </div>

                {/* Live price badge in header */}
                {safePrice > 0 && (
                  <div className="hidden md:flex items-center gap-3 ml-4 pl-4 border-l border-gray-200 dark:border-slate-700">
                    <span className="text-xl font-semibold">
                      {formatPrice(safePrice)}
                    </span>
                    <span className={`flex items-center gap-1 text-sm px-2 py-0.5 rounded ${
                      isPositive
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                    }`}>
                      {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {isPositive ? '+' : ''}{formatPercentage(assetData.change24h)}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Bid&nbsp;<span className="text-red-500">{formatCurrency(safeBid)}</span>
                      &nbsp;·&nbsp;
                      Ask&nbsp;<span className="text-blue-500">{formatCurrency(safeAsk)}</span>
                    </span>
                  </div>
                )}
              </div>

              {/* View Tabs */}
              <div className="hidden md:flex gap-2">
                <button
                  onClick={() => setActiveTab('chart')}
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === 'chart'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600'
                  }`}
                >
                  Chart View
                </button>
                <button
                  onClick={() => setActiveTab('info')}
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === 'info'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600'
                  }`}
                >
                  Market Info
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content — key forces full re-mount when symbolKey changes */}
        <div key={symbolKey} className="max-w-[2000px] mx-auto px-4 lg:px-8 py-6 pb-20">
          {activeTab === 'chart' ? (
            <>
              <div className="grid lg:grid-cols-12 gap-6">
                {/* Left Column - Chart */}
                <div className="lg:col-span-9">
                  <TradingChart symbol={symbolKey} />
                </div>

                {/* Right Column - Order Panel */}
                <div className="lg:col-span-3 relative">
                  {/* Desktop: inline sticky panel */}
                  <div className="hidden lg:block sticky top-24">
                    <OrderPanel
                      symbol={symbolKey}
                      currentPrice={assetData.currentPrice}
                      bid={assetData.bid}
                      ask={assetData.ask}
                      editingOrder={editingOrder}
                      editingPosition={editingPosition}
                      calculatorData={calculatorData}
                      onOpenCalculator={() => setIsCalculatorOpen(true)}
                      onCancelEdit={() => {
                        setEditingOrder(null);
                        setEditingPosition(null);
                      }}
                    />

                    {/* Calculator Overlay */}
                    {isCalculatorOpen && (
                      <div className="absolute inset-0 z-50">
                        <PositionCalculatorPanel
                          currentPrice={assetData.currentPrice}
                          onClose={() => setIsCalculatorOpen(false)}
                          onApplyToOrder={handleApplyCalculator}
                        />
                      </div>
                    )}
                  </div>

                  {/* Mobile: floating button + slide-up modal */}
                  <div className="lg:hidden">
                    {/* Floating Place Order button */}
                    <button
                      onClick={() => setIsMobileOrderOpen(true)}
                      className="fixed bottom-24 right-4 z-40 flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg shadow-blue-600/30 transition-all active:scale-95"
                    >
                      <span className="text-sm">Place Order</span>
                    </button>

                    {/* Modal overlay */}
                    {isMobileOrderOpen && (
                      <div className="fixed inset-0 z-50 flex flex-col justify-end">
                        {/* Backdrop */}
                        <div
                          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                          onClick={() => setIsMobileOrderOpen(false)}
                        />
                        {/* Panel */}
                        <div className="relative bg-white dark:bg-slate-800 rounded-t-2xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
                          <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 rounded-t-2xl">
                            <h3 className="text-sm text-gray-700 dark:text-gray-200">Place Order — {symbolKey}</h3>
                            <button
                              onClick={() => setIsMobileOrderOpen(false)}
                              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                          <div className="p-4 relative">
                            <OrderPanel
                              symbol={symbolKey}
                              currentPrice={assetData.currentPrice}
                              bid={assetData.bid}
                              ask={assetData.ask}
                              editingOrder={editingOrder}
                              editingPosition={editingPosition}
                              calculatorData={calculatorData}
                              onOpenCalculator={() => setIsCalculatorOpen(true)}
                              onCancelEdit={() => {
                                setEditingOrder(null);
                                setEditingPosition(null);
                              }}
                            />

                            {/* Calculator Overlay */}
                            {isCalculatorOpen && (
                              <div className="absolute inset-0 z-50">
                                <PositionCalculatorPanel
                                  currentPrice={assetData.currentPrice}
                                  onClose={() => setIsCalculatorOpen(false)}
                                  onApplyToOrder={handleApplyCalculator}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Full Width - Positions, Orders & History */}
              <div className="mt-6">
                <PositionsAndOrders
                  currentPrice={assetData.currentPrice}
                  symbol={assetData.symbol}
                  onEditPosition={(position) => {
                    setEditingPosition(position);
                    setEditingOrder(null);
                    setTimeout(() => {
                      const orderPanel = document.querySelector('[data-order-panel]');
                      if (orderPanel) orderPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                  }}
                  onEditOrder={(order) => {
                    setEditingOrder(order);
                    setEditingPosition(null);
                    setTimeout(() => {
                      const orderPanel = document.querySelector('[data-order-panel]');
                      if (orderPanel) orderPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                  }}
                />
              </div>
            </>
          ) : (
            <MarketInfo asset={assetData} />
          )}
        </div>

        {/* Account Summary Footer */}
        <AccountSummaryFooter />
      </div>
    </DashboardLayout>
  );
}