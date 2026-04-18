import { useState } from 'react';
import { Search, Download, CheckCircle, Clock, XCircle, ArrowDownCircle, ArrowUpCircle, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useAuth } from '../../contexts/AuthContext';
import { useTransactions, Transaction } from '../../contexts/TransactionProvider';
import { formatTxnId, formatCurrency } from '../../utils/formatNumber';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Label } from '../ui/label';

export default function TransactionHistory() {
  const { currentUser } = useAuth();
  const { getUserTransactions } = useTransactions();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'deposit' | 'withdrawal'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending' | 'failed' | 'rejected' | 'cancelled'>('all');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  // Get all transactions for current user
  const transactions = currentUser ? getUserTransactions(currentUser.id) : [];

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tx.method.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tx.currency.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || tx.type === filterType;
    const matchesStatus = filterStatus === 'all' || tx.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />;
    }
  };

  const getStatusBadge = (status: Transaction['status']) => {
    const classes: Record<string, string> = {
      completed: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
      pending: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
      rejected: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400',
      cancelled: 'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400',
      failed: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm capitalize ${classes[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div>
      {/* Header with Search and Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm mb-6">
        <div className="flex flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by ID, method, or reference..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
          >
            <option value="all">All Types</option>
            <option value="deposit">Deposits</option>
            <option value="withdrawal">Withdrawals</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="rejected">Rejected</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Export Button */}
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Transactions Table - Desktop */}
      <div className="hidden lg:block bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-slate-700/50">
            <tr>
              <th className="text-left py-4 px-6 text-sm text-gray-600 dark:text-gray-400">Date & Time</th>
              <th className="text-left py-4 px-6 text-sm text-gray-600 dark:text-gray-400">Type</th>
              <th className="text-left py-4 px-6 text-sm text-gray-600 dark:text-gray-400">Wallet</th>
              <th className="text-left py-4 px-6 text-sm text-gray-600 dark:text-gray-400">Method</th>
              <th className="text-right py-4 px-6 text-sm text-gray-600 dark:text-gray-400">Amount</th>
              <th className="text-right py-4 px-6 text-sm text-gray-600 dark:text-gray-400">Fee</th>
              <th className="text-left py-4 px-6 text-sm text-gray-600 dark:text-gray-400">Status</th>
              <th className="text-left py-4 px-6 text-sm text-gray-600 dark:text-gray-400">Reference</th>
              <th className="text-right py-4 px-6 text-sm text-gray-600 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx) => {
              const txDate = new Date(tx.timestamp);
              const formattedDate = txDate.toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <tr key={tx.id} className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                  <td className="py-4 px-6">
                    <div className="text-sm">{formattedDate}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">{formatTxnId(tx.id)}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {tx.type === 'deposit' ? (
                        <>
                          <ArrowDownCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                          <span className="text-green-600 dark:text-green-400">Deposit</span>
                        </>
                      ) : (
                        <>
                          <ArrowUpCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                          <span className="text-red-600 dark:text-red-400">Withdrawal</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                      tx.walletType === 'portfolio'
                        ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                        : 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    }`}>
                      {tx.walletType === 'portfolio' ? 'Portfolio' : 'Live'}
                    </span>
                  </td>
                  <td className="py-4 px-6 capitalize">
                    <div>{tx.method}</div>
                    {tx.currency !== 'USD' && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">{tx.amount} {tx.currency}</div>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right font-semibold">
                    ${tx.usdEquivalent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-4 px-6 text-right text-sm text-gray-600 dark:text-gray-400">
                    $0.00
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(tx.status)}
                        {getStatusBadge(tx.status)}
                      </div>
                      {tx.adminNotes && (
                        <div className="mt-1 p-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded text-xs text-blue-700 dark:text-blue-300 max-w-[450px]">
                          <span className="font-semibold block mb-0.5 whitespace-nowrap">Reason:</span>
                          {tx.adminNotes}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 font-mono text-sm text-gray-600 dark:text-gray-400">
                    {formatTxnId(tx.id)}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setSelectedTransaction(tx);
                        setShowDetailsDialog(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400">No transactions found</p>
          </div>
        )}
      </div>

      {/* Transactions List - Mobile */}
      <div className="lg:hidden space-y-4">
        {filteredTransactions.map((tx) => {
          const txDate = new Date(tx.timestamp);
          const formattedDate = txDate.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          });

          return (
            <div key={tx.id} className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {tx.type === 'deposit' ? (
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                      <ArrowDownCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                      <ArrowUpCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                  )}
                  <div>
                    <div className="font-semibold capitalize">{tx.type}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{tx.method}</div>
                    <span className={`mt-1 inline-block px-2 py-0.5 rounded-full text-[10px] capitalize ${
                      tx.walletType === 'portfolio'
                        ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                        : 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    }`}>
                      {tx.walletType === 'portfolio' ? 'Portfolio' : 'Live'}
                    </span>
                  </div>
                </div>
                {getStatusBadge(tx.status)}
              </div>

              {tx.adminNotes && (
                <div className="mb-3 p-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded text-xs text-blue-700 dark:text-blue-300">
                  <span className="font-semibold block mb-0.5">Reason:</span>
                  {tx.adminNotes}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                <div>
                  <div className="text-gray-600 dark:text-gray-400 text-xs">Amount</div>
                  <div className="font-semibold">${tx.usdEquivalent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  {tx.currency !== 'USD' && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">{tx.amount} {tx.currency}</div>
                  )}
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400 text-xs">Fee</div>
                  <div className="font-semibold">$0.00</div>
                </div>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-slate-700 pt-2">
                <div className="flex justify-between mb-1">
                  <span>Date:</span>
                  <span>{formattedDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Reference:</span>
                  <span className="font-mono">{formatTxnId(tx.id)}</span>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-700/50">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs h-8"
                    onClick={() => {
                      setSelectedTransaction(tx);
                      setShowDetailsDialog(true);
                    }}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    View Full Details
                  </Button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl">
            <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400">No transactions found</p>
          </div>
        )}
      </div>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              Complete information about this transaction
            </DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">Transaction ID</Label>
                  <p className="font-mono">{formatTxnId(selectedTransaction.id)}</p>
                </div>
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">Date & Time</Label>
                  <p>{new Date(selectedTransaction.timestamp).toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">Type</Label>
                  <p className="capitalize">{selectedTransaction.type}</p>
                </div>
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">Method</Label>
                  <p className="capitalize">{selectedTransaction.method}</p>
                </div>
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">Wallet Type</Label>
                  <p className="capitalize text-sm">
                    <span className={`px-2 py-0.5 rounded-full ${
                      selectedTransaction.walletType === 'portfolio'
                        ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                        : 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    }`}>
                      {selectedTransaction.walletType === 'portfolio' ? 'Portfolio' : 'Live'}
                    </span>
                  </p>
                </div>
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">Status</Label>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusIcon(selectedTransaction.status)}
                    <span className="capitalize">{selectedTransaction.status}</span>
                  </div>
                </div>
                <div className="col-span-2 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-700">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-gray-600 dark:text-gray-400">Amount Sent</Label>
                      <p className="text-xl font-bold">
                        {selectedTransaction.amount} {selectedTransaction.currency}
                      </p>
                    </div>
                    <div className="text-right">
                      <Label className="text-gray-600 dark:text-gray-400">USD Equivalent</Label>
                      <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        ${formatCurrency(selectedTransaction.usdEquivalent)}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedTransaction.adminNotes && (
                  <div className="col-span-2 border-t border-gray-100 dark:border-slate-700 pt-4">
                    <Label className="text-blue-600 dark:text-blue-400 font-semibold mb-2 block">
                      Admin Update/Note:
                    </Label>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded text-sm text-blue-700 dark:text-blue-300">
                      {selectedTransaction.adminNotes}
                    </div>
                  </div>
                )}
                
                {selectedTransaction.details?.txHash && (
                  <div className="col-span-2">
                    <Label className="text-gray-600 dark:text-gray-400">Transaction Hash</Label>
                    <p className="font-mono text-xs break-all p-2 bg-gray-100 dark:bg-slate-900 rounded mt-1">
                      {selectedTransaction.details.txHash}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}