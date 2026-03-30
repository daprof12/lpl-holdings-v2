import { useState, useEffect } from 'react';
import { Search, Filter, Edit, Trash2, X, Check, TrendingUp, TrendingDown, Calendar, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { formatTxnId, formatCurrency } from '../../utils/formatNumber';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import { useTrading } from '../../contexts/TradingContext';
import { useAuth } from '../../contexts/AuthContext';
import { useMarketData } from '../../contexts/MarketDataContext';
import { toast } from 'sonner';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { initialAssets } from '../../data/assets';
import { getMarketStatus } from '../../utils/tradingHours';

interface Trade {
  id: string;
  user: string;
  asset: string;
  category: string;
  type: 'long' | 'short';
  entryPrice: number;
  currentPrice: number;
  quantity: number;
  leverage: number;
  margin: number;
  pnl: number;
  status: 'open' | 'closed' | 'order';
  openedAt: string;
  closedAt?: string;
  stopLoss?: number;
  takeProfit?: number;
  mode: 'paper' | 'live';
}

// Helper function to determine asset category
const getAssetCategory = (symbol: string): string => {
  // Crypto
  if (symbol.includes('BTC') || symbol.includes('ETH') || symbol.includes('XRP') || 
      symbol.includes('LTC') || symbol.includes('ADA') || symbol.includes('DOT') ||
      symbol.includes('DOGE') || symbol.includes('SOL')) {
    return 'Crypto';
  }
  // Forex
  if (['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'USDCAD', 'NZDUSD', 'USDCHF'].includes(symbol)) {
    return 'Forex';
  }
  // Stocks
  if (['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'JPM', 'V', 'NFLX', 'DIS'].includes(symbol)) {
    return 'Stocks';
  }
  // Commodities
  if (symbol.includes('XAU') || symbol.includes('XAG') || symbol.includes('OIL') || symbol.includes('GC') || symbol.includes('CL')) {
    return 'Commodities';
  }
  // Indices
  if (symbol.includes('SPX') || symbol.includes('NDX') || symbol.includes('DJI') || ['SPY', 'QQQ', 'VOO'].includes(symbol)) {
    return 'Indices';
  }
  // ETFs/Funds
  if (['SPY', 'QQQ', 'VOO', 'VTI', 'IWM'].includes(symbol)) {
    return 'Funds';
  }
  // Futures
  if (['ES', 'NQ', 'YM', 'GC', 'CL'].includes(symbol)) {
    return 'Futures';
  }
  
  return 'Other';
};

export default function TradeManagement() {
  const { 
    positions: allPositions, 
    history, 
    removePosition, 
    addHistory, 
    updateAccount, 
    account, 
    updatePosition, 
    livePositions, 
    paperPositions, 
    liveHistory, 
    paperHistory,
    setPaperHistory,
    setLiveHistory
  } = useTrading();
  const { users } = useAuth();
  const { getPrice, subscribeToSymbol, unsubscribeFromSymbol } = useMarketData();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'closed' | 'order'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [modeFilter, setModeFilter] = useState<'all' | 'paper' | 'live'>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);

  // Helper function to get user email from userId
  const getUserEmail = (userId: string): string => {
    const user = users.find(u => u.id === userId);
    return user ? user.email : 'Unknown User';
  };

  // Get ALL positions from both paper and live modes for admin view
  const allPaperPositions = JSON.parse(localStorage.getItem('gross_paper_positions') || '[]');
  const allLivePositions = JSON.parse(localStorage.getItem('gross_live_positions') || '[]');
  const combinedPositions = [...allPaperPositions, ...allLivePositions];

  // Get ALL history from both paper and live modes for admin view
  const allPaperHistory = JSON.parse(localStorage.getItem('gross_paper_history') || '[]');
  const allLiveHistory = JSON.parse(localStorage.getItem('gross_live_history') || '[]');
  const combinedHistory = [...allPaperHistory, ...allLiveHistory];

  // Combine positions and history to show all trades
  // Map positions to Trade format
  const openTrades: Trade[] = combinedPositions.map((pos: any) => ({
    id: pos.id,
    user: getUserEmail(pos.userId),
    asset: pos.symbol,
    category: getAssetCategory(pos.symbol),
    type: pos.side === 'buy' ? 'long' : 'short',
    entryPrice: pos.entryPrice,
    currentPrice: pos.currentPrice,
    quantity: pos.units,
    leverage: pos.leverage,
    margin: pos.margin,
    pnl: pos.pnl,
    status: 'open' as const,
    openedAt: new Date(pos.timestamp).toISOString().replace('T', ' ').substring(0, 19),
    stopLoss: pos.stopLoss,
    takeProfit: pos.takeProfit,
    mode: pos.mode,
  }));

  // Map history to Trade format (closed trades only)
  const closedTrades: Trade[] = combinedHistory
    .filter((h: any) => h.status === 'closed')
    .map((h: any) => ({
      id: h.id,
      user: getUserEmail(h.userId),
      asset: h.symbol,
      category: getAssetCategory(h.symbol),
      type: h.side === 'buy' ? 'long' : 'short',
      entryPrice: h.entryPrice || h.price,
      currentPrice: h.price,
      quantity: h.units,
      leverage: 1, // History doesn't store leverage
      margin: 0, // History doesn't store margin
      pnl: h.pnl || 0,
      status: 'closed' as const,
      openedAt: new Date(h.timestamp).toISOString().replace('T', ' ').substring(0, 19),
      closedAt: new Date(h.timestamp).toISOString().replace('T', ' ').substring(0, 19),
      mode: h.mode,
    }));

  const trades = [...openTrades, ...closedTrades];

  const [formData, setFormData] = useState({
    asset: '',
    entryPrice: '',
    currentPrice: '',
    quantity: '',
    leverage: '',
    margin: '',
    status: 'open',
    stopLoss: '',
    takeProfit: '',
    category: '',
    openedAt: '',
    closedAt: '',
  });

  const filteredTrades = trades.filter(trade => {
    const matchesSearch = trade.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trade.asset.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || trade.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || trade.category === categoryFilter;
    const matchesMode = modeFilter === 'all' || trade.mode === modeFilter;
    const matchesDate = (!dateFrom || new Date(trade.openedAt) >= new Date(dateFrom)) &&
                        (!dateTo || new Date(trade.openedAt) <= new Date(dateTo));
    return matchesSearch && matchesStatus && matchesCategory && matchesMode && matchesDate;
  });

  // Auto-refresh current price from live market data when dialog is open
  useEffect(() => {
    if (showDialog && selectedTrade && formData.asset) {
      const symbol = formData.asset;
      
      // Subscribe to symbol to start receiving price updates
      subscribeToSymbol(symbol);
      
      // Fetch current price immediately
      const updatePrice = () => {
        const priceData = getPrice(symbol);
        if (priceData && priceData.price) {
          setFormData(prev => ({
            ...prev,
            currentPrice: priceData.price.toString()
          }));
        }
      };
      
      // Update immediately
      updatePrice();
      
      // Set up interval to update every 3 seconds
      const interval = setInterval(updatePrice, 3000);
      
      // Cleanup: stop interval and unsubscribe when dialog closes
      return () => {
        clearInterval(interval);
        unsubscribeFromSymbol(symbol);
      };
    }
  }, [showDialog, selectedTrade, formData.asset, getPrice, subscribeToSymbol, unsubscribeFromSymbol]);

  const handleEdit = (trade: Trade) => {
    setSelectedTrade(trade);
    setFormData({
      asset: trade.asset,
      entryPrice: trade.entryPrice?.toString() || '',
      currentPrice: trade.currentPrice?.toString() || '',
      quantity: trade.quantity.toString(),
      leverage: trade.leverage.toString(),
      margin: trade.margin.toString(),
      status: trade.status,
      stopLoss: trade.stopLoss?.toString() || '',
      takeProfit: trade.takeProfit?.toString() || '',
      category: trade.category,
      openedAt: trade.openedAt.substring(0, 16), // Format for datetime-local input
      closedAt: trade.closedAt ? trade.closedAt.substring(0, 16) : '',
    });
    setShowDialog(true);
  };

  const handleForcClose = (tradeId: string) => {
    if (window.confirm('Are you sure you want to force close this trade?')) {
      // Find the position
      const position = allPositions.find(p => p.id === tradeId);
      if (position) {
        // Calculate P&L
        const priceDiff = position.side === 'buy' 
          ? position.currentPrice - position.entryPrice 
          : position.entryPrice - position.currentPrice;
        const pnl = priceDiff * position.units * position.leverage;

        // Remove from positions
        removePosition(position.id);

        // Add to history
        addHistory({
          id: position.id,
          symbol: position.symbol,
          side: position.side,
          type: 'market',
          units: position.units,
          price: position.currentPrice,
          entryPrice: position.entryPrice,
          pnl,
          timestamp: new Date(),
          status: 'closed',
          mode: position.mode
        });

        // Compute remaining unrealized P&L and margin from other open positions
        const remainingPositions = allPositions.filter(p => p.id !== position.id);
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

        toast.success('Trade force closed successfully');
      } else {
        toast.error('Position not found');
      }
    }
  };

  const handleDelete = (tradeId: string) => {
    if (window.confirm('Are you sure you want to permanently delete this trade record? This action cannot be undone.')) {
      // Check if it's an open position
      const position = allPositions.find(p => p.id === tradeId);
      const historyItem = combinedHistory.find(h => h.id === tradeId);
      
      if (position) {
        // ===== DELETE OPEN POSITION =====
        // Determine if it's paper or live
        const isPaperTrade = position.mode === 'paper';
        
        // Remove from positions array
        const positionsKey = isPaperTrade ? 'gross_paper_positions' : 'gross_live_positions';
        const currentPositions = JSON.parse(localStorage.getItem(positionsKey) || '[]');
        const updatedPositions = currentPositions.filter((p: any) => p.id !== tradeId);
        localStorage.setItem(positionsKey, JSON.stringify(updatedPositions));
        
        // Trigger storage event for cross-tab sync
        window.dispatchEvent(new Event('storage'));
        
        toast.success('Open position deleted successfully');
      } else if (historyItem) {
        // ===== DELETE CLOSED TRADE FROM HISTORY =====
        // Determine if it's paper or live
        const isPaperTrade = historyItem.mode === 'paper';
        
        // Remove from history array
        const historyKey = isPaperTrade ? 'gross_paper_history' : 'gross_live_history';
        const currentHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
        const updatedHistory = currentHistory.filter((h: any) => h.id !== tradeId);
        localStorage.setItem(historyKey, JSON.stringify(updatedHistory));
        
        // Update the context state
        if (isPaperTrade) {
          setPaperHistory(updatedHistory);
        } else {
          setLiveHistory(updatedHistory);
        }
        
        // Trigger storage event for cross-tab sync
        window.dispatchEvent(new Event('storage'));
        
        toast.success('Closed trade deleted from history successfully');
      } else {
        toast.error('Trade not found');
      }
    }
  };

  const handleSubmit = () => {
    if (!selectedTrade) return;

    const newEntryPrice = parseFloat(formData.entryPrice);
    const newCurrentPrice = parseFloat(formData.currentPrice);
    const newQuantity = parseFloat(formData.quantity);
    const newLeverage = parseFloat(formData.leverage);
    const newStopLoss = formData.stopLoss ? parseFloat(formData.stopLoss) : undefined;
    const newTakeProfit = formData.takeProfit ? parseFloat(formData.takeProfit) : undefined;

    // Validate inputs
    if (!newEntryPrice || !newCurrentPrice || !newQuantity || !newLeverage) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Find if it's an open position or closed trade
    const position = allPositions.find(p => p.id === selectedTrade.id);
    const historyItem = combinedHistory.find(h => h.id === selectedTrade.id);
    
    // Determine trade type
    const tradeType = selectedTrade.type === 'long' ? 'long' : 'short';
    const tradeSide = tradeType === 'long' ? 'buy' : 'sell';

    // Calculate new P&L based on edited values
    const priceDiff = tradeType === 'long'
      ? newCurrentPrice - newEntryPrice
      : newEntryPrice - newCurrentPrice;
    const newPnL = priceDiff * newQuantity * newLeverage;
    const newMargin = (newQuantity * newEntryPrice) / newLeverage;
    
    if (position && selectedTrade.status === 'open') {
      // ===== EDITING AN OPEN POSITION =====
      const oldMargin = position.margin;
      const oldPnL = position.pnl;

      // If status changed to closed, close the position
      if (formData.status === 'closed') {
        // Remove from positions
        removePosition(position.id);

        // Add to history with updated values
        addHistory({
          id: position.id,
          symbol: formData.asset,
          side: tradeSide,
          type: 'market',
          units: newQuantity,
          price: newCurrentPrice,
          entryPrice: newEntryPrice,
          pnl: newPnL,
          timestamp: formData.closedAt ? new Date(formData.closedAt) : new Date(),
          status: 'closed',
          mode: position.mode
        });

        // Update account balance
        updateAccount({
          balance: account.balance + newPnL,
          equity: account.equity - oldPnL + newPnL - newMargin,
          realizedPnL: account.realizedPnL + newPnL,
          margin: account.margin - oldMargin,
          availableFunds: account.availableFunds + oldMargin + newPnL,
          unrealizedPnL: account.unrealizedPnL - oldPnL
        });
      } else {
        // Update the position with new values (still open)
        const updatedPosition = {
          symbol: formData.asset,
          entryPrice: newEntryPrice,
          currentPrice: newCurrentPrice,
          units: newQuantity,
          leverage: newLeverage,
          stopLoss: newStopLoss,
          takeProfit: newTakeProfit,
          pnl: newPnL,
          margin: newMargin,
          timestamp: formData.openedAt ? new Date(formData.openedAt) : position.timestamp,
        };

        updatePosition(position.id, updatedPosition);

        // Update account with adjusted margin and unrealized P&L
        const marginDiff = newMargin - oldMargin;
        const pnlDiff = newPnL - oldPnL;

        updateAccount({
          equity: account.equity + pnlDiff,
          unrealizedPnL: account.unrealizedPnL + pnlDiff,
          margin: account.margin + marginDiff,
          availableFunds: account.availableFunds - marginDiff
        });
      }

      toast.success('Trade updated successfully!');
    } else if (historyItem && selectedTrade.status === 'closed') {
      // ===== EDITING A CLOSED TRADE IN HISTORY =====
      // Determine which history array to update (paper or live)
      const isPaperTrade = historyItem.mode === 'paper';
      const targetHistory = isPaperTrade ? allPaperHistory : allLiveHistory;
      
      // Update the history item
      const updatedHistory = targetHistory.map((h: any) => {
        if (h.id === selectedTrade.id) {
          return {
            ...h,
            symbol: formData.asset,
            side: tradeSide,
            units: newQuantity,
            price: newCurrentPrice,
            entryPrice: newEntryPrice,
            pnl: newPnL,
            timestamp: formData.closedAt ? new Date(formData.closedAt) : h.timestamp,
            status: formData.status,
          };
        }
        return h;
      });

      // Save back to localStorage
      const historyKey = isPaperTrade ? 'gross_paper_history' : 'gross_live_history';
      localStorage.setItem(historyKey, JSON.stringify(updatedHistory));
      
      // Update the context state
      if (isPaperTrade) {
        setPaperHistory(updatedHistory);
      } else {
        setLiveHistory(updatedHistory);
      }

      // Trigger storage event for cross-tab sync
      window.dispatchEvent(new Event('storage'));

      // If status changed to open, reopen the trade as a position
      if (formData.status === 'open') {
        // Remove from history
        const filteredHistory = targetHistory.filter((h: any) => h.id !== selectedTrade.id);
        localStorage.setItem(historyKey, JSON.stringify(filteredHistory));
        
        if (isPaperTrade) {
          setPaperHistory(filteredHistory);
        } else {
          setLiveHistory(filteredHistory);
        }

        // Add as new position
        const newPosition = {
          id: selectedTrade.id,
          userId: historyItem.userId,
          symbol: formData.asset,
          side: tradeSide,
          units: newQuantity,
          entryPrice: newEntryPrice,
          currentPrice: newCurrentPrice,
          leverage: newLeverage,
          stopLoss: newStopLoss,
          takeProfit: newTakeProfit,
          pnl: newPnL,
          margin: newMargin,
          timestamp: formData.openedAt ? new Date(formData.openedAt) : historyItem.timestamp,
          mode: historyItem.mode,
        };

        // Add to positions
        const positionsKey = isPaperTrade ? 'gross_paper_positions' : 'gross_live_positions';
        const currentPositions = JSON.parse(localStorage.getItem(positionsKey) || '[]');
        currentPositions.push(newPosition);
        localStorage.setItem(positionsKey, JSON.stringify(currentPositions));
        window.dispatchEvent(new Event('storage'));
      }

      toast.success('Closed trade updated successfully in history!');
    } else {
      toast.error('Trade not found');
    }

    setShowDialog(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Trade Management</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Monitor and manage all platform trades in real-time
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          <div className="relative col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 text-sm"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 h-10 text-sm rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
          >
            <option value="all">All Trades</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="order">Orders</option>
          </select>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 h-10 text-sm rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
          >
            <option value="all">All Categories</option>
            <option value="Crypto">Crypto</option>
            <option value="Forex">Forex</option>
            <option value="Stocks">Stocks</option>
            <option value="Commodities">Commodities</option>
            <option value="Indices">Indices</option>
            <option value="Funds">Funds</option>
            <option value="Futures">Futures</option>
            <option value="Other">Other</option>
          </select>
          
          <select
            value={modeFilter}
            onChange={(e) => setModeFilter(e.target.value as any)}
            className="px-3 py-2 h-10 text-sm rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
          >
            <option value="all">All Modes</option>
            <option value="live">Live</option>
          </select>
          
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              placeholder="Filter by date"
              className="pl-9 h-10 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Trades Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-900/50 border-b border-gray-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Trade ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Entry Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Current Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Leverage
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Margin
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Date Opened
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  P&L
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {filteredTrades.map((trade) => (
                <tr key={trade.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-mono">{formatTxnId(trade.id)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">{trade.user}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold">{trade.asset}</div>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-semibold ${
                        trade.category === 'Crypto' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' :
                        trade.category === 'Forex' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                        trade.category === 'Stocks' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' :
                        trade.category === 'Commodities' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                        trade.category === 'Indices' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                        trade.category === 'Funds' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' :
                        trade.category === 'Futures' ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400' :
                        'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400'
                      }`}>
                        {trade.category}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {trade.type === 'long' ? (
                        <>
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-green-600 dark:text-green-400 font-semibold">LONG</span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="w-4 h-4 text-red-600" />
                          <span className="text-red-600 dark:text-red-400 font-semibold">SHORT</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-mono">${trade.entryPrice ? formatCurrency(trade.entryPrice) : 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-mono">${trade.currentPrice ? formatCurrency(trade.currentPrice) : 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div>{trade.quantity}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div>{trade.leverage}x</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-mono">${trade.margin ? formatCurrency(trade.margin) : 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-mono">{trade.openedAt}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`font-semibold ${trade.pnl >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      trade.status === 'open'
                        ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : trade.status === 'order'
                        ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                        : 'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400'
                    }`}>
                      {trade.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(trade)}
                        title="Edit Trade"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      {trade.status === 'open' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleForcClose(trade.id)}
                          title="Force Close"
                        >
                          <X className="w-4 h-4 text-orange-600" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(trade.id)}
                        title="Delete Trade"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Trade</DialogTitle>
            <DialogDescription>
              Make changes to the trade details. All changes will update the user&apos;s dashboard and recalculate P&L and balance.
            </DialogDescription>
          </DialogHeader>

          {selectedTrade && (
            <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="bg-gray-50 dark:bg-slate-900/50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">User:</span>
                  <span className="font-semibold">{selectedTrade.user}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Trade ID:</span>
                  <span className="font-mono text-xs">{formatTxnId(selectedTrade.id)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Type:</span>
                  <span className={`font-semibold ${selectedTrade.type === 'long' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {selectedTrade.type.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Asset Symbol</label>
                  <Input
                    type="text"
                    value={formData.asset}
                    onChange={(e) => setFormData({ ...formData, asset: e.target.value.toUpperCase() })}
                    placeholder="e.g., BTCUSD"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Market Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    <option value="Crypto">Crypto</option>
                    <option value="Forex">Forex</option>
                    <option value="Stocks">Stocks</option>
                    <option value="Commodities">Commodities</option>
                    <option value="Indices">Indices</option>
                    <option value="Funds">Funds</option>
                    <option value="Futures">Futures</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Entry Price</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.entryPrice}
                    onChange={(e) => setFormData({ ...formData, entryPrice: e.target.value })}
                    placeholder="Entry price"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Current/Exit Price</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.currentPrice}
                    onChange={(e) => setFormData({ ...formData, currentPrice: e.target.value })}
                    placeholder="Current price"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Quantity</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="Quantity"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Leverage</label>
                  <Input
                    type="number"
                    step="1"
                    value={formData.leverage}
                    onChange={(e) => setFormData({ ...formData, leverage: e.target.value })}
                    placeholder="Leverage"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Stop Loss (Optional)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.stopLoss}
                    onChange={(e) => setFormData({ ...formData, stopLoss: e.target.value })}
                    placeholder="Stop loss price"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Take Profit (Optional)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.takeProfit}
                    onChange={(e) => setFormData({ ...formData, takeProfit: e.target.value })}
                    placeholder="Take profit price"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Entry Date & Time</label>
                  <Input
                    type="datetime-local"
                    value={formData.openedAt}
                    onChange={(e) => setFormData({ ...formData, openedAt: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Closed Date & Time</label>
                  <Input
                    type="datetime-local"
                    value={formData.closedAt}
                    onChange={(e) => setFormData({ ...formData, closedAt: e.target.value })}
                    disabled={formData.status === 'open'}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Margin (USD)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.margin}
                    onChange={(e) => setFormData({ ...formData, margin: e.target.value })}
                    placeholder="Margin used"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Auto-calc: (Qty × Entry Price) ÷ Leverage
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    <option value="open">Open</option>
                    <option value="order">Order</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              {/* Calculated P&L Preview */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Calculated P&L Preview:</div>
                <div className="text-xl font-semibold">
                  {(() => {
                    const entry = parseFloat(formData.entryPrice) || 0;
                    const current = parseFloat(formData.currentPrice) || 0;
                    const qty = parseFloat(formData.quantity) || 0;
                    const lev = parseFloat(formData.leverage) || 1;
                    const priceDiff = selectedTrade.type === 'long' ? current - entry : entry - current;
                    const pnl = priceDiff * qty * lev;
                    return (
                      <span className={pnl >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                        {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}
                      </span>
                    );
                  })()}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-slate-700">
                <Button variant="outline" onClick={() => setShowDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}