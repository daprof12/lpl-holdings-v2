import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, Filter, Download, Calendar, Search, CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useTrading } from '../../contexts/TradingContext';
import { useAuth } from '../../contexts/AuthContext';
import { useTransactions } from '../../contexts/TransactionProvider';
import { formatCurrency, formatNumber, formatPercentage, formatTxnId } from '../../utils/formatNumber';

type HistoryTab = 'trades' | 'transactions' | 'orders';
type TradeStatus = 'all' | 'profit' | 'loss';
type TransactionType = 'all' | 'deposit' | 'withdrawal';
type OrderStatus = 'all' | 'pending' | 'executed' | 'cancelled';

interface Trade {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  amount: number;
  entryPrice: number;
  exitPrice: number;
  profit: number;
  profitPercent: number;
  openTime: string;
  closeTime: string;
  leverage: number;
  commission: number;
}

interface Transaction {
  id: string;
  type: 'Deposit' | 'Withdrawal';
  method: string;
  amount: number;
  currency: string;
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
  transactionHash?: string;
}

interface Order {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  orderType: 'Market' | 'Limit' | 'Stop';
  amount: number;
  price: number;
  status: 'Pending' | 'Executed' | 'Cancelled';
  date: string;
  filledAmount?: number;
}

export default function TradingHistory() {
  const navigate = useNavigate();
  const { history, orders: contextOrders, tradingMode } = useTrading();
  const { currentUser } = useAuth();
  const { getUserTransactions } = useTransactions();
  const [activeTab, setActiveTab] = useState<HistoryTab>('trades');
  const [searchQuery, setSearchQuery] = useState('');
  const [tradeFilter, setTradeFilter] = useState<TradeStatus>('all');
  const [transactionFilter, setTransactionFilter] = useState<TransactionType>('all');
  const [orderFilter, setOrderFilter] = useState<OrderStatus>('all');
  const [dateRange, setDateRange] = useState('7days');

  // Convert context history to Trade format
  const trades: Trade[] = history
    .filter(h => h.status === 'closed' && h.entryPrice !== undefined)
    .map(h => {
      const profit = h.pnl || 0;
      const profitPercent = h.entryPrice ? ((profit / (h.entryPrice * h.units)) * 100) : 0;
      
      return {
        id: h.id,
        symbol: h.symbol,
        type: h.side.toUpperCase() as 'BUY' | 'SELL',
        amount: h.units,
        entryPrice: h.entryPrice || h.price,
        exitPrice: h.price,
        profit: profit,
        profitPercent: profitPercent,
        openTime: new Date(h.timestamp).toLocaleString(),
        closeTime: new Date(h.timestamp).toLocaleString(),
        leverage: 1, // Default leverage
        commission: Math.abs(profit * 0.001), // Estimate commission as 0.1% of profit
      };
    });

  // Get real transactions from TransactionProvider (same store admin manages)
  const userTransactions = currentUser ? getUserTransactions(currentUser.id) : [];
  const transactions: Transaction[] = userTransactions.map(t => ({
    id: t.id,
    type: t.type === 'deposit' ? 'Deposit' : 'Withdrawal',
    method: t.method.replace(/^Admin\s*/i, ''),
    amount: t.amount,
    currency: t.currency,
    status: t.status === 'completed' ? 'Completed' : t.status === 'pending' ? 'Pending' : 'Failed',
    date: new Date(t.timestamp).toLocaleString(),
    transactionHash: t.txHash,
  }));

  // Convert context orders to Order format
  const ordersData: Order[] = contextOrders.map(o => ({
    id: o.id,
    symbol: o.symbol,
    type: o.side.toUpperCase() as 'BUY' | 'SELL',
    orderType: o.type === 'limit' ? 'Limit' : 'Stop',
    amount: o.units,
    price: o.price,
    status: o.status === 'pending' ? 'Pending' : o.status === 'filled' ? 'Executed' : 'Cancelled',
    date: new Date(o.timestamp).toLocaleString(),
    filledAmount: o.status === 'filled' ? o.units : undefined,
  }));

  // Filter functions
  const getFilteredTrades = () => {
    let filtered = trades;
    
    if (tradeFilter === 'profit') {
      filtered = filtered.filter(t => t.profit > 0);
    } else if (tradeFilter === 'loss') {
      filtered = filtered.filter(t => t.profit < 0);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(t => 
        t.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getFilteredTransactions = () => {
    let filtered = transactions;
    
    if (transactionFilter !== 'all') {
      filtered = filtered.filter(t => 
        t.type.toLowerCase() === transactionFilter.toLowerCase()
      );
    }
    
    if (searchQuery) {
      filtered = filtered.filter(t => 
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.method.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getFilteredOrders = () => {
    let filtered = ordersData;
    
    if (orderFilter !== 'all') {
      filtered = filtered.filter(o => 
        o.status.toLowerCase() === orderFilter.toLowerCase()
      );
    }
    
    if (searchQuery) {
      filtered = filtered.filter(o => 
        o.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  // Calculate totals
  const totalProfit = trades.reduce((sum, t) => sum + t.profit, 0);
  const totalTrades = trades.length;
  const winningTrades = trades.filter(t => t.profit > 0).length;
  const losingTrades = trades.filter(t => t.profit < 0).length;
  const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;

  const handleExport = () => {
    // Navigate to markets page
    navigate('/markets');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Trading History
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            View and manage your trading history, transactions, and orders
          </p>
        </div>
        <Button onClick={handleExport} className="gap-2">
          <Download className="w-4 h-4" />
          Enter Trade
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total P&L</p>
            <TrendingUp className={`w-4 h-4 ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`} />
          </div>
          <p className={`text-2xl mt-2 ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {totalProfit >= 0 ? '+' : ''}${totalProfit.toFixed(2)}
          </p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Trades</p>
            <Filter className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl mt-2 text-gray-900 dark:text-white">{totalTrades}</p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">Win Rate</p>
            <CheckCircle2 className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-2xl mt-2 text-gray-900 dark:text-white">{formatPercentage(winRate)}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {winningTrades}W / {losingTrades}L
          </p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">Avg Trade</p>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl mt-2 text-gray-900 dark:text-white">
            ${totalTrades > 0 ? (totalProfit / totalTrades).toFixed(2) : '0.00'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-slate-700">
          <div className="flex gap-6 px-6">
            <button
              onClick={() => setActiveTab('trades')}
              className={`py-4 border-b-2 transition-colors ${
                activeTab === 'trades'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Trade History
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`py-4 border-b-2 transition-colors ${
                activeTab === 'transactions'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Transactions
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-4 border-b-2 transition-colors ${
                activeTab === 'orders'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Orders
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200 dark:border-slate-700">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              {activeTab === 'trades' && (
                <Select value={tradeFilter} onValueChange={(value) => setTradeFilter(value as TradeStatus)}>
                  <SelectTrigger className="w-[150px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Trades</SelectItem>
                    <SelectItem value="profit">Profitable</SelectItem>
                    <SelectItem value="loss">Loss</SelectItem>
                  </SelectContent>
                </Select>
              )}
              
              {activeTab === 'transactions' && (
                <Select value={transactionFilter} onValueChange={(value) => setTransactionFilter(value as TransactionType)}>
                  <SelectTrigger className="w-[150px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="deposit">Deposits</SelectItem>
                    <SelectItem value="withdrawal">Withdrawals</SelectItem>
                  </SelectContent>
                </Select>
              )}
              
              {activeTab === 'orders' && (
                <Select value={orderFilter} onValueChange={(value) => setOrderFilter(value as OrderStatus)}>
                  <SelectTrigger className="w-[150px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="executed">Executed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              )}
              
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[150px]">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="1year">Last year</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          {activeTab === 'trades' && (
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-slate-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs uppercase text-gray-600 dark:text-gray-400">ID</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-gray-600 dark:text-gray-400">Symbol</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-gray-600 dark:text-gray-400">Type</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-gray-600 dark:text-gray-400">Amount</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-gray-600 dark:text-gray-400">Entry</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-gray-600 dark:text-gray-400">Exit</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-gray-600 dark:text-gray-400">P&L</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-gray-600 dark:text-gray-400">Open Time</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-gray-600 dark:text-gray-400">Close Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                {getFilteredTrades().map((trade) => (
                  <tr key={trade.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{formatTxnId(trade.id)}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="font-semibold text-gray-900 dark:text-white">{trade.symbol}</span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs ${
                        trade.type === 'BUY' 
                          ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                          : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                      }`}>
                        {trade.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{trade.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">${formatCurrency(trade.entryPrice)}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">${formatCurrency(trade.exitPrice)}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className={trade.profit >= 0 ? 'text-green-600' : 'text-red-600'}>
                        <div className="flex items-center gap-1">
                          {trade.profit >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          <span>{trade.profit >= 0 ? '+' : ''}${trade.profit.toFixed(2)}</span>
                        </div>
                        <span className="text-xs">({trade.profit >= 0 ? '+' : ''}{formatPercentage(trade.profitPercent)})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{trade.openTime}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{trade.closeTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'transactions' && (
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-slate-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs uppercase text-gray-600 dark:text-gray-400">ID</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-gray-600 dark:text-gray-400">Type</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-gray-600 dark:text-gray-400">Method</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-gray-600 dark:text-gray-400">Amount</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-gray-600 dark:text-gray-400">Status</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-gray-600 dark:text-gray-400">Date</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-gray-600 dark:text-gray-400">Transaction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                {getFilteredTransactions().map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{formatTxnId(transaction.id)}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs ${
                        transaction.type === 'Deposit' 
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' 
                          : 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{transaction.method.replace(/^Admin\s*/i, '')}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={transaction.type === 'Deposit' ? 'text-green-600' : 'text-orange-600'}>
                        {transaction.type === 'Deposit' ? '+' : '-'}${formatCurrency(transaction.amount)} {transaction.currency}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        {transaction.status === 'Completed' && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                        {transaction.status === 'Pending' && <Clock className="w-4 h-4 text-yellow-600" />}
                        {transaction.status === 'Failed' && <XCircle className="w-4 h-4 text-red-600" />}
                        <span className={`${
                          transaction.status === 'Completed' ? 'text-green-600' : 
                          transaction.status === 'Pending' ? 'text-yellow-600' : 
                          'text-red-600'
                        }`}>
                          {transaction.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{transaction.date}</td>
                    <td className="px-6 py-4 text-sm">
                      {transaction.transactionHash ? (
                        <span className="text-blue-600 dark:text-blue-400 text-xs font-mono">
                          {transaction.transactionHash}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'orders' && (
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-slate-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs uppercase text-gray-600 dark:text-gray-400">ID</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-gray-600 dark:text-gray-400">Symbol</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-gray-600 dark:text-gray-400">Type</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-gray-600 dark:text-gray-400">Order Type</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-gray-600 dark:text-gray-400">Amount</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-gray-600 dark:text-gray-400">Price</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-gray-600 dark:text-gray-400">Status</th>
                  <th className="px-6 py-3 text-left text-xs uppercase text-gray-600 dark:text-gray-400">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                {getFilteredOrders().map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{formatTxnId(order.id)}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="font-semibold text-gray-900 dark:text-white">{order.symbol}</span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs ${
                        order.type === 'BUY' 
                          ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                          : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                      }`}>
                        {order.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-2 py-1 rounded bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 text-xs">
                        {order.orderType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {order.amount}
                      {order.filledAmount && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                          (Filled: {order.filledAmount})
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">${formatCurrency(order.price)}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        {order.status === 'Pending' && <Clock className="w-4 h-4 text-yellow-600" />}
                        {order.status === 'Executed' && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                        {order.status === 'Cancelled' && <XCircle className="w-4 h-4 text-red-600" />}
                        <span className={`${
                          order.status === 'Pending' ? 'text-yellow-600' : 
                          order.status === 'Executed' ? 'text-green-600' : 
                          'text-red-600'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Empty State */}
        {((activeTab === 'trades' && getFilteredTrades().length === 0) ||
          (activeTab === 'transactions' && getFilteredTransactions().length === 0) ||
          (activeTab === 'orders' && getFilteredOrders().length === 0)) && (
          <div className="p-12 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg text-gray-900 dark:text-white mb-2">No data found</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {searchQuery 
                ? 'Try adjusting your search or filters' 
                : `No ${activeTab} available for the selected period`}
            </p>
          </div>
        )}

        {/* Pagination */}
        {((activeTab === 'trades' && getFilteredTrades().length > 0) ||
          (activeTab === 'transactions' && getFilteredTransactions().length > 0) ||
          (activeTab === 'orders' && getFilteredOrders().length > 0)) && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-slate-700 flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing {activeTab === 'trades' ? getFilteredTrades().length : 
                      activeTab === 'transactions' ? getFilteredTransactions().length : 
                      getFilteredOrders().length} results
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}