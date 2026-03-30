import { useState } from 'react';
import { Search, Filter, Download, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useTrading } from '../../contexts/TradingContext';
import { formatPct, formatTxnId, formatCurrency } from '../../utils/formatNumber';

export default function TradeHistory() {
  const { history, positions, tradingMode } = useTrading();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'closed'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'long' | 'short'>('all');

  // Convert context data to trade format
  const trades = [
    // Closed trades from history
    ...history
      .filter(h => h.status === 'closed')
      .map(h => {
        const pnl = h.pnl || 0;
        const pnlPercent = h.entryPrice ? ((pnl / (h.entryPrice * h.units)) * 100) : 0;
        
        return {
          id: h.id,
          asset: h.symbol,
          type: h.side === 'buy' ? 'Long' : 'Short',
          status: 'closed' as const,
          entryPrice: h.entryPrice || h.price,
          exitPrice: h.price,
          size: h.units,
          leverage: 1,
          pnl: pnl,
          pnlPercent: pnlPercent,
          entryDate: new Date(h.timestamp).toLocaleString(),
          exitDate: new Date(h.timestamp).toLocaleString(),
          duration: '0h', // Could be calculated if we store entry time
          fees: Math.abs(pnl * 0.001)
        };
      }),
    // Open positions
    ...positions.map(p => {
      const pnl = p.pnl || 0;
      const pnlPercent = p.entryPrice ? ((pnl / (p.entryPrice * p.units)) * 100) : 0;
      
      return {
        id: p.id,
        asset: p.symbol,
        type: p.side === 'buy' ? 'Long' : 'Short',
        status: 'open' as const,
        entryPrice: p.entryPrice,
        exitPrice: p.currentPrice,
        size: p.units,
        leverage: p.leverage,
        pnl: pnl,
        pnlPercent: pnlPercent,
        entryDate: new Date(p.timestamp).toLocaleString(),
        exitDate: null,
        duration: calculateDuration(p.timestamp),
        fees: Math.abs(pnl * 0.001)
      };
    })
  ];

  // Helper function to calculate duration
  function calculateDuration(timestamp: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      const remainingHours = hours % 24;
      return `${days}d ${remainingHours}h`;
    }
    return `${hours}h`;
  }

  const filteredTrades = trades.filter(trade => {
    const matchesSearch = trade.asset.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trade.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || trade.status === statusFilter;
    const matchesType = typeFilter === 'all' || trade.type.toLowerCase() === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const openTrades = trades.filter(t => t.status === 'open');
  const closedTrades = trades.filter(t => t.status === 'closed');
  const totalTrades = trades.length;
  const winningTrades = closedTrades.filter(t => t.pnl > 0).length;
  const winRate = (winningTrades / closedTrades.length * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Trades</div>
          <div className="text-2xl font-semibold">{totalTrades}</div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Open Positions</div>
          <div className="text-2xl font-semibold text-blue-600 dark:text-blue-400">{openTrades.length}</div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Closed Trades</div>
          <div className="text-2xl font-semibold">{closedTrades.length}</div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Win Rate</div>
          <div className="text-2xl font-semibold text-green-600 dark:text-green-400">{winRate}%</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by asset or trade ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
          >
            <option value="all">All Types</option>
            <option value="long">Long</option>
            <option value="short">Short</option>
          </select>

          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-700/50">
              <tr>
                <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Trade ID</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Asset</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Type</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Entry</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Exit/Current</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Size</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Leverage</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600 dark:text-gray-400">P/L</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Duration</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrades.map((trade) => (
                <tr key={trade.id} className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                  <td className="py-4 px-4 font-mono text-sm">{formatTxnId(trade.id)}</td>
                  <td className="py-4 px-4 font-semibold">{trade.asset}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      trade.type === 'Long'
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                    }`}>
                      {trade.type}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      trade.status === 'open'
                        ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {trade.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">${formatCurrency(trade.entryPrice)}</td>
                  <td className="py-4 px-4 text-right">
                    {trade.exitPrice ? `$${formatCurrency(trade.exitPrice)}` : '-'}
                  </td>
                  <td className="py-4 px-4 text-right">{trade.size}</td>
                  <td className="py-4 px-4 text-right">{trade.leverage}x</td>
                  <td className="py-4 px-4 text-right">
                    <div>
                      <div className={`font-semibold ${
                        trade.pnl > 0
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {trade.pnl > 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {trade.pnlPercent > 0 ? '+' : ''}{formatPct(trade.pnlPercent)}%
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm">
                    <div>{trade.duration}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      {trade.status === 'open' ? 'Open' : `Closed ${trade.exitDate?.split(' ')[0]}`}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTrades.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400">No trades found</p>
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {filteredTrades.map((trade) => (
          <div key={trade.id} className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-semibold text-lg">{trade.asset}</div>
                <div className="text-xs text-gray-500 dark:text-gray-500 font-mono">{formatTxnId(trade.id)}</div>
              </div>
              <div className="flex gap-2">
                <span className={`px-2 py-1 rounded text-xs ${
                  trade.type === 'Long'
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                    : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                }`}>
                  {trade.type}
                </span>
                <span className={`px-2 py-1 rounded text-xs ${
                  trade.status === 'open'
                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {trade.status}
                </span>
              </div>
            </div>

            <div className="mb-3">
              <div className={`text-2xl font-semibold ${
                trade.pnl > 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {trade.pnl > 0 ? '+' : ''}${trade.pnl.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {trade.pnlPercent > 0 ? '+' : ''}{formatPct(trade.pnlPercent)}% • {trade.duration}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm border-t border-gray-200 dark:border-slate-700 pt-3">
              <div>
                <div className="text-gray-600 dark:text-gray-400 text-xs">Entry</div>
                <div className="font-semibold">${formatCurrency(trade.entryPrice)}</div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400 text-xs">Exit/Current</div>
                <div className="font-semibold">
                  {trade.exitPrice ? `$${formatCurrency(trade.exitPrice)}` : '-'}
                </div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400 text-xs">Size</div>
                <div className="font-semibold">{trade.size}</div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400 text-xs">Leverage</div>
                <div className="font-semibold">{trade.leverage}x</div>
              </div>
            </div>
          </div>
        ))}

        {filteredTrades.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl">
            <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400">No trades found</p>
          </div>
        )}
      </div>
    </div>
  );
}