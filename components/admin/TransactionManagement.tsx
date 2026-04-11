import { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  Search, 
  Download, 
  Eye,
  Trash2 
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useAuth } from '../../contexts/AuthContext';
import { useTransactions } from '../../contexts/TransactionProvider';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { formatCurrency, formatNumber, formatTxnId } from '../../utils/formatNumber';
import { toast } from 'sonner';

export default function TransactionManagement() {
  const { users } = useAuth();
  const { transactions, approveTransaction, rejectTransaction, deleteTransaction } = useTransactions();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<'today' | 'week' | 'month' | 'all'>('all');
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [statusNotes, setStatusNotes] = useState('');
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve');

  // Get user details for each transaction
  const transactionsWithUserDetails = transactions.map(tx => {
    const user = users.find(u => u.id === tx.userId);
    return {
      ...tx,
      userName: user ? `${user.firstName} ${user.lastName}` : 'Unknown User',
      userEmail: user?.email || 'N/A',
    };
  });

  const filteredTransactions = transactionsWithUserDetails.filter(transaction => {
    const matchesSearch = 
      transaction.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.method.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const now = new Date();
      const txDate = new Date(transaction.timestamp);
      
      if (dateFilter === 'today') {
        matchesDate = txDate.toDateString() === now.toDateString();
      } else if (dateFilter === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        matchesDate = txDate >= weekAgo;
      } else if (dateFilter === 'month') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        matchesDate = txDate >= monthAgo;
      }
    }
    
    return matchesSearch && matchesType && matchesStatus && matchesDate;
  });

  const stats = {
    total: filteredTransactions.length,
    deposits: filteredTransactions.filter(t => t.type === 'deposit').length,
    withdrawals: filteredTransactions.filter(t => t.type === 'withdrawal').length,
    pending: filteredTransactions.filter(t => t.status === 'pending').length,
    completed: filteredTransactions.filter(t => t.status === 'completed').length,
    totalVolume: filteredTransactions.reduce((sum, t) => sum + t.usdEquivalent, 0),
    depositVolume: filteredTransactions.filter(t => t.type === 'deposit').reduce((sum, t) => sum + t.usdEquivalent, 0),
    withdrawalVolume: filteredTransactions.filter(t => t.type === 'withdrawal').reduce((sum, t) => sum + t.usdEquivalent, 0),
  };

  const handleAction = () => {
    if (!selectedTransaction) return;
    
    if (actionType === 'approve') {
      approveTransaction(selectedTransaction.id, 'admin', statusNotes);
      toast.success(`Transaction approved and ${selectedTransaction.type === 'deposit' ? 'credited to' : 'debited from'} user wallet`);
    } else {
      rejectTransaction(selectedTransaction.id, 'admin', statusNotes);
      toast.success('Transaction rejected');
    }
    
    setShowStatusDialog(false);
    setStatusNotes('');
  };

  const handleDelete = () => {
    if (!selectedTransaction) return;
    
    deleteTransaction(selectedTransaction.id);
    toast.success('Transaction deleted');
    
    setShowDeleteDialog(false);
    setSelectedTransaction(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'failed': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      case 'cancelled': return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const exportTransactions = () => {
    const csv = [
      ['ID', 'Date', 'User', 'Email', 'Type', 'Method', 'Amount', 'Currency', 'Status', 'Transaction Hash'].join(','),
      ...filteredTransactions.map(t => [
        t.id,
        new Date(t.timestamp).toLocaleString(),
        t.userName,
        t.userEmail,
        t.type,
        t.method,
        t.amount,
        t.currency,
        t.status,
        t.txHash || 'N/A'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl mb-2">Transaction Management</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage deposit and withdrawal transactions
          </p>
        </div>
        <Button onClick={exportTransactions}>
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Transactions</p>
          <p className="text-2xl mt-1">{stats.total}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <ArrowDownCircle className="w-4 h-4 text-green-600" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Deposits</p>
          </div>
          <p className="text-2xl">{stats.deposits}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">${formatCurrency(stats.depositVolume)}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <ArrowUpCircle className="w-4 h-4 text-red-600" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Withdrawals</p>
          </div>
          <p className="text-2xl">{stats.withdrawals}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">${formatCurrency(stats.withdrawalVolume)}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-yellow-600" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
          </div>
          <p className="text-2xl">{stats.pending}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
          </div>
          <p className="text-2xl">{stats.completed}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 mb-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search transactions..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
          >
            <option value="all">All Types</option>
            <option value="deposit">Deposits</option>
            <option value="withdrawal">Withdrawals</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as any)}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {formatTxnId(transaction.id)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(transaction.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div>{transaction.userName}</div>
                      <div className="text-sm text-gray-500">{transaction.userEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {transaction.type === 'deposit' ? (
                        <ArrowDownCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <ArrowUpCircle className="w-5 h-5 text-red-600" />
                      )}
                      <span className={`px-2 py-1 rounded text-xs capitalize ${
                        transaction.type === 'deposit' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      }`}>
                        {transaction.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold capitalize text-gray-900 dark:text-white">{transaction.method}</div>
                    {transaction.method === 'crypto' && (
                      <div className="text-[10px] text-blue-600 dark:text-blue-400 font-mono font-bold mt-0.5">
                        {transaction.currency} • {transaction.network}
                      </div>
                    )}
                    <span className={`mt-1.5 inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${
                      transaction.walletType === 'portfolio'
                        ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                        : 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    }`}>
                      {transaction.walletType === 'portfolio' ? 'Portfolio Balance' : 'Live Account'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono">
                      ${formatCurrency(transaction.usdEquivalent)}
                    </span>
                    {transaction.method === 'crypto' && transaction.currency && transaction.currency !== 'USD' && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        ≈ {transaction.amount} {transaction.currency}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(transaction.status)}
                      <span className={`px-2 py-1 rounded text-xs capitalize ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedTransaction(transaction);
                          setShowDetailsDialog(true);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {transaction.status === 'pending' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedTransaction(transaction);
                            setActionType('approve');
                            setShowStatusDialog(true);
                          }}
                        >
                          Approve
                        </Button>
                      )}
                      {transaction.status === 'pending' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedTransaction(transaction);
                            setActionType('reject');
                            setShowStatusDialog(true);
                          }}
                        >
                          Reject
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedTransaction(transaction);
                          setShowDeleteDialog(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No transactions found</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination Info */}
      {filteredTransactions.length > 0 && (
        <div className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center">
          Showing {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}
        </div>
      )}

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
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
                  <Label className="text-gray-600 dark:text-gray-400">User Name</Label>
                  <p>{selectedTransaction.userName}</p>
                </div>
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">Email</Label>
                  <p>{selectedTransaction.userEmail}</p>
                </div>
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">Type</Label>
                  <p className="capitalize">{selectedTransaction.type}</p>
                </div>
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">Method</Label>
                  <p>{selectedTransaction.method}</p>
                </div>
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">Wallet Type</Label>
                  <p className="capitalize">{selectedTransaction.walletType === 'portfolio' ? 'Portfolio Balance' : 'Live Balance'}</p>
                </div>
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">Amount (USD)</Label>
                  <p className="font-semibold text-lg">${formatCurrency(selectedTransaction.usdEquivalent)}</p>
                </div>
                {selectedTransaction.method === 'crypto' && selectedTransaction.currency && selectedTransaction.currency !== 'USD' && (
                  <div>
                    <Label className="text-gray-600 dark:text-gray-400">Crypto Equivalent</Label>
                    <p className="font-semibold">
                      {selectedTransaction.amount} {selectedTransaction.currency}
                    </p>
                    {selectedTransaction.usdEquivalent && selectedTransaction.amount && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Rate: 1 {selectedTransaction.currency} ≈ ${formatCurrency(selectedTransaction.usdEquivalent / selectedTransaction.amount)}
                      </p>
                    )}
                  </div>
                )}
                {/* Withdrawal Specific Information */}
                {selectedTransaction.type === 'withdrawal' && (
                  <div className="col-span-2 mt-4 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-700">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <ArrowUpCircle className="w-4 h-4 text-red-600" />
                      Withdrawal Information
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedTransaction.method === 'bank' && (
                        <>
                          <div>
                            <Label className="text-gray-600 dark:text-gray-400">Bank Name</Label>
                            <p className="font-semibold">{selectedTransaction.bankName || 'N/A'}</p>
                          </div>
                          <div>
                            <Label className="text-gray-600 dark:text-gray-400">Account Name</Label>
                            <p className="font-semibold">{selectedTransaction.accountName || 'N/A'}</p>
                          </div>
                          <div>
                            <Label className="text-gray-600 dark:text-gray-400">Account Number</Label>
                            <p className="font-mono font-semibold">{selectedTransaction.accountNumber || 'N/A'}</p>
                          </div>
                          <div>
                            <Label className="text-gray-600 dark:text-gray-400">Routing Number</Label>
                            <p className="font-mono font-semibold">{selectedTransaction.routingNumber || 'N/A'}</p>
                          </div>
                          {selectedTransaction.swiftCode && (
                            <div>
                              <Label className="text-gray-600 dark:text-gray-400">SWIFT Code</Label>
                              <p className="font-mono font-semibold">{selectedTransaction.swiftCode}</p>
                            </div>
                          )}
                        </>
                      )}
                      
                      {(selectedTransaction.method === 'paypal' || selectedTransaction.method === 'skrill' || selectedTransaction.paypalEmail) && (
                        <div className="col-span-2">
                          <Label className="text-gray-600 dark:text-gray-400">
                            {selectedTransaction.method === 'skrill' ? 'Skrill Email' : 'PayPal Email'}
                          </Label>
                          <p className="font-semibold p-2 bg-white dark:bg-slate-800 rounded border border-gray-200 dark:border-slate-600">
                            {selectedTransaction.paypalEmail || selectedTransaction.email || 'N/A'}
                          </p>
                        </div>
                      )}

                      {selectedTransaction.method === 'crypto' && (
                        <>
                          <div>
                            <Label className="text-gray-600 dark:text-gray-400">Asset Type</Label>
                            <p className="font-semibold">{selectedTransaction.currency || 'N/A'}</p>
                          </div>
                          <div>
                            <Label className="text-gray-600 dark:text-gray-400">Network</Label>
                            <p className="font-semibold">{selectedTransaction.network || 'N/A'}</p>
                          </div>
                          <div className="col-span-2">
                            <Label className="text-gray-600 dark:text-gray-400">User's Wallet Address</Label>
                            <p className="font-mono text-sm break-all font-semibold p-2 bg-white dark:bg-slate-800 rounded border border-gray-200 dark:border-slate-600">
                              {selectedTransaction.walletAddress || 'N/A'}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Status and Actions */}
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">Status</Label>
                  <div className={`inline-flex items-center gap-2 px-2 py-1 rounded text-sm capitalize ${getStatusColor(selectedTransaction.status)}`}>
                    {getStatusIcon(selectedTransaction.status)}
                    {selectedTransaction.status}
                  </div>
                </div>
                {(selectedTransaction.txHash || selectedTransaction.transactionHash) && (
                  <div className="col-span-2">
                    <Label className="text-gray-600 dark:text-gray-400">Transaction Hash</Label>
                    <p className="font-mono text-sm break-all">{selectedTransaction.txHash || selectedTransaction.transactionHash}</p>
                  </div>
                )}
                {selectedTransaction.processedAt && (
                  <div className="col-span-2">
                    <Label className="text-gray-600 dark:text-gray-400">Processed At</Label>
                    <p>{new Date(selectedTransaction.processedAt).toLocaleString()}</p>
                  </div>
                )}
                {selectedTransaction.notes && (
                  <div className="col-span-2">
                    <Label className="text-gray-600 dark:text-gray-400">Admin Notes</Label>
                    <p className="text-sm">{selectedTransaction.notes}</p>
                  </div>
                )}
                {selectedTransaction.details && (
                  <div className="col-span-2">
                    <Label className="text-gray-600 dark:text-gray-400">JSON Payload (System)</Label>
                    <pre className="text-xs mt-2 p-2 bg-gray-100 dark:bg-slate-700 rounded overflow-x-auto">
                      {JSON.stringify(selectedTransaction.details, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{actionType === 'approve' ? 'Approve' : 'Reject'} Transaction</DialogTitle>
            <DialogDescription>
              {actionType === 'approve' 
                ? 'Approve this transaction and credit the user wallet' 
                : 'Reject this transaction'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedTransaction && (
              <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-600 dark:text-gray-400">User:</div>
                  <div>{selectedTransaction.userName}</div>
                  <div className="text-gray-600 dark:text-gray-400">Amount:</div>
                  <div className="font-semibold">${formatCurrency(selectedTransaction.usdEquivalent)}</div>
                  <div className="text-gray-600 dark:text-gray-400">Method:</div>
                  <div className="capitalize">{selectedTransaction.method}</div>
                </div>
              </div>
            )}
            <div>
              <Label className="mb-2 block">Notes (Optional)</Label>
              <Textarea
                placeholder="Add any notes about this action..."
                value={statusNotes}
                onChange={(e) => setStatusNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStatusDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAction}
              variant={actionType === 'approve' ? 'default' : 'destructive'}
            >
              {actionType === 'approve' ? 'Approve & Credit Wallet' : 'Reject Transaction'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Transaction Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Transaction</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this transaction? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedTransaction && (
              <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-600 dark:text-gray-400">User:</div>
                  <div>{selectedTransaction.userName}</div>
                  <div className="text-gray-600 dark:text-gray-400">Amount:</div>
                  <div className="font-semibold">${formatCurrency(selectedTransaction.usdEquivalent)}</div>
                  <div className="text-gray-600 dark:text-gray-400">Method:</div>
                  <div className="capitalize">{selectedTransaction.method}</div>
                </div>
              </div>
            )}
            <div>
              <Label className="mb-2 block">Notes (Optional)</Label>
              <Textarea
                placeholder="Add any notes about this action..."
                value={statusNotes}
                onChange={(e) => setStatusNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleDelete}
              variant="destructive"
            >
              Delete Transaction
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}