import { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, MoreVertical, TrendingDown, Clock, X, Upload, ImageIcon, ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { useInvestments, InvestmentOffer, PROFITABILITY_TIER_LABELS, PROFITABILITY_TIER_COLORS, ProfitabilityTier } from '../../contexts/InvestmentContext';
import { useAuth } from '../../contexts/AuthContext';
import { showSuccessToast, showErrorToast } from '../common/ToastNotifications';
// AssetData removed
import EnhancedOfferModal from './EnhancedOfferModal';
import { formatPercentage, formatCurrency } from '../../utils/formatNumber';

// Default investment categories
const DEFAULT_CATEGORIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Real Estate',
  'Energy',
  'Consumer Goods',
  'Manufacturing',
  'Telecommunications',
  'Transportation',
  'Agriculture',
];

// Function to load custom categories from localStorage
const loadCustomCategories = (): string[] => {
  const stored = localStorage.getItem('gross_custom_categories');
  return stored ? JSON.parse(stored) : [];
};

// Function to save custom categories to localStorage
const saveCustomCategories = (categories: string[]) => {
  localStorage.setItem('gross_custom_categories', JSON.stringify(categories));
};

export default function AdminInvestmentsPage() {
  const [activeTab, setActiveTab] = useState<'offers' | 'history' | 'requests'>('offers');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'IPO' | 'ECN'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingOffer, setEditingOffer] = useState<InvestmentOffer | null>(null);
  const [editingInvestment, setEditingInvestment] = useState<any | null>(null);
  const [showEditInvestmentModal, setShowEditInvestmentModal] = useState(false);
  
  // Separate search states for each tab
  const [historySearchTerm, setHistorySearchTerm] = useState('');
  const [historyFilterType, setHistoryFilterType] = useState<'all' | 'IPO' | 'ECN'>('all');
  const [historySortBy, setHistorySortBy] = useState<string>('startDate');
  const [historySortOrder, setHistorySortOrder] = useState<'asc' | 'desc'>('desc');
  const [requestsSearchTerm, setRequestsSearchTerm] = useState('');
  const [requestsFilterType, setRequestsFilterType] = useState<'all' | 'IPO' | 'ECN'>('all');
  const [requestsFilterStatus, setRequestsFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [requestsSortBy, setRequestsSortBy] = useState<string>('createdAt');
  const [requestsSortOrder, setRequestsSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // New modal states for sell requests
  const [showApproveSellModal, setShowApproveSellModal] = useState(false);
  const [showRejectSellModal, setShowRejectSellModal] = useState(false);
  const [requestForAction, setRequestForAction] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isProcessingAction, setIsProcessingAction] = useState(false);

  const { 
    investmentOffers, 
    addInvestmentOffer, 
    updateInvestmentOffer, 
    deleteInvestmentOffer,
    userInvestments,
    updateUserInvestment,
    deleteUserInvestment,
    sellRequests,
    updateSellRequest,
    getAllSellRequests
  } = useInvestments();

  const { users, addFundsToAccount } = useAuth();

  // Helper function to get user details
  const getUserDetails = (userId: string) => {
    const userProfile = users.find(u => u.id === userId);
    if (userProfile) {
      return {
        name: `${userProfile.firstName} ${userProfile.lastName}`,
        email: userProfile.email
      };
    }
    return { name: 'Unknown User', email: userId };
  };

  // Helper to get effective current value (dynamic for ECN unless custom)
  const getEffectiveValue = (inv: any) => {
    if (inv.offerType === 'ECN' && !inv.isCustomValue) {
      const offer = investmentOffers.find(o => o.id === inv.offerId);
      if (offer && offer.marketPrice) {
        return inv.units * offer.marketPrice;
      }
    }
    return inv.currentValue;
  };

  // Filter offers
  const filteredOffers = investmentOffers.filter(offer => {
    const matchesSearch = offer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || offer.type === filterType;
    return matchesSearch && matchesType;
  });

  // Get all sell requests
  const allSellRequests = getAllSellRequests();

  // Filter & Sort History
  const filteredHistory = userInvestments
    .filter(inv => {
      const userDetails = getUserDetails(inv.userId);
      const matchesSearch = inv.offerName.toLowerCase().includes(historySearchTerm.toLowerCase()) ||
                           userDetails.name.toLowerCase().includes(historySearchTerm.toLowerCase()) ||
                           userDetails.email.toLowerCase().includes(historySearchTerm.toLowerCase());
      const matchesType = historyFilterType === 'all' || inv.offerType === historyFilterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      let comparison = 0;
      const field = historySortBy as keyof typeof a;
      
      if (field === 'startDate' || field === 'endDate' || field === 'createdAt') {
        comparison = (a[field] as number) - (b[field] as number);
      } else if (field === 'totalAmount' || field === 'units' || field === 'currentValue') {
        comparison = (a[field] as number) - (b[field] as number);
      } else if (field === 'userId') {
        comparison = getUserDetails(a.userId).name.localeCompare(getUserDetails(b.userId).name);
      } else if (typeof a[field] === 'string') {
        comparison = (a[field] as string).localeCompare(b[field] as string);
      }
      
      return historySortOrder === 'desc' ? -comparison : comparison;
    });

  const handleHistorySort = (field: string) => {
    if (historySortBy === field) {
      setHistorySortOrder(historySortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setHistorySortBy(field);
      setHistorySortOrder('desc');
    }
  };

  const SortIndicator = ({ field }: { field: string }) => {
    if (historySortBy !== field) return <ArrowUpDown className="w-3 h-3 ml-1 opacity-20" />;
    return historySortOrder === 'desc' ? <ChevronDown className="w-3 h-3 ml-1" /> : <ChevronUp className="w-3 h-3 ml-1" />;
  };

  // Filter & Sort Requests
  const filteredRequests = allSellRequests
    .filter(req => {
      const userDetails = getUserDetails(req.userId);
      const matchesSearch = req.offerName.toLowerCase().includes(requestsSearchTerm.toLowerCase()) ||
                           userDetails.name.toLowerCase().includes(requestsSearchTerm.toLowerCase()) ||
                           userDetails.email.toLowerCase().includes(requestsSearchTerm.toLowerCase());
      const matchesType = requestsFilterType === 'all' || req.offerType === requestsFilterType;
      const matchesStatus = requestsFilterStatus === 'all' || req.status === requestsFilterStatus;
      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      const field = requestsSortBy as keyof typeof a;
      
      if (field === 'createdAt' || field === 'processedAt') {
        comparison = (a[field] as number || 0) - (b[field] as number || 0);
      } else if (field === 'totalAmount' || field === 'units') {
        comparison = (a[field] as number) - (b[field] as number);
      } else if (field === 'userId') {
        comparison = getUserDetails(a.userId).name.localeCompare(getUserDetails(b.userId).name);
      } else if (typeof a[field] === 'string') {
        comparison = (a[field] as string).localeCompare(b[field] as string);
      }
      
      return requestsSortOrder === 'desc' ? -comparison : comparison;
    });

  const handleRequestsSort = (field: string) => {
    if (requestsSortBy === field) {
      setRequestsSortOrder(requestsSortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setRequestsSortBy(field);
      setRequestsSortOrder('desc');
    }
  };

  const RequestSortIndicator = ({ field }: { field: string }) => {
    if (requestsSortBy !== field) return <ArrowUpDown className="w-3 h-3 ml-1 opacity-20" />;
    return requestsSortOrder === 'desc' ? <ChevronDown className="w-3 h-3 ml-1" /> : <ChevronUp className="w-3 h-3 ml-1" />;
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this investment offer?')) {
      deleteInvestmentOffer(id);
      showSuccessToast('Investment offer deleted successfully');
    }
  };

  const handleApproveSellRequest = (request: any) => {
    setRequestForAction(request);
    setShowApproveSellModal(true);
  };

  const confirmApproveSellRequest = async () => {
    if (!requestForAction || isProcessingAction) return;
    
    setIsProcessingAction(true);
    try {
      await updateSellRequest(requestForAction.id, {
        status: 'approved',
        processedAt: Date.now(),
        processedBy: 'Admin',
      } as any);
      
      // Credit user wallet using centralized method
      const userId = requestForAction.userId;
      // Map paymentWallet to the accountType used by addFundsToAccount
      // 'wallet' → 'live' (trading account), others pass through as investment wallets
      const accountType = requestForAction.paymentWallet === 'wallet' ? 'live' : requestForAction.paymentWallet;
      
      await addFundsToAccount(userId, requestForAction.totalAmount, accountType);
      
      // Reduce user's investment units
      const userInv = userInvestments.find(i => i.id === requestForAction.investmentId);
      if (userInv) {
        const remainingUnits = userInv.units - requestForAction.units;
        if (remainingUnits <= 0) {
          // If all units sold, mark as completed or delete
          await updateUserInvestment(userInv.id, { 
            units: 0, 
            status: 'completed',
            currentValue: 0 
          });
        } else {
          // Update with remaining units and proportionately reduce currentValue
          const ratio = remainingUnits / userInv.units;
          await updateUserInvestment(userInv.id, { 
            units: remainingUnits,
            totalAmount: userInv.totalAmount * ratio,
            currentValue: userInv.currentValue * ratio
          });
        }
      }
      
      showSuccessToast('Sell request approved. User wallet credited with $' + formatCurrency(requestForAction.totalAmount));
      setShowApproveSellModal(false);
      setRequestForAction(null);
    } catch (error) {
      console.error('Error approving sell request:', error);
      showErrorToast('Failed to approve sell request');
    } finally {
      setIsProcessingAction(false);
    }
  };

  const handleRejectSellRequest = (request: any) => {
    setRequestForAction(request);
    setRejectionReason('');
    setShowRejectSellModal(true);
  };

  const confirmRejectSellRequest = async () => {
    if (!requestForAction || !rejectionReason.trim() || isProcessingAction) {
      if (!rejectionReason.trim()) showErrorToast('Please enter a rejection reason');
      return;
    }

    setIsProcessingAction(true);
    try {
      await updateSellRequest(requestForAction.id, {
        status: 'rejected',
        processedAt: Date.now(),
        processedBy: 'Admin',
        rejectionReason: rejectionReason,
      } as any);
      showSuccessToast('Sell request rejected');
      setShowRejectSellModal(false);
      setRequestForAction(null);
      setRejectionReason('');
    } catch (error) {
      console.error('Error rejecting sell request:', error);
      showErrorToast('Failed to reject sell request');
    } finally {
      setIsProcessingAction(false);
    }
  };

  // Investment CRUD handlers
  const handleEditInvestment = (investment: any) => {
    setEditingInvestment(investment);
    setShowEditInvestmentModal(true);
  };

  const handleDeleteInvestment = (id: string, investmentName: string) => {
    if (confirm(`Are you sure you want to delete the investment "${investmentName}"? This action cannot be undone.`)) {
      const success = deleteUserInvestment(id);
      if (success) {
        showSuccessToast('Investment deleted successfully');
      } else {
        showErrorToast('Failed to delete investment');
      }
    }
  };

  const handleUpdateInvestment = (updates: any) => {
    if (!editingInvestment) return;
    
    const success = updateUserInvestment(editingInvestment.id, updates);
    if (success) {
      showSuccessToast('Investment updated successfully');
      setShowEditInvestmentModal(false);
      setEditingInvestment(null);
    } else {
      showErrorToast('Failed to update investment');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Investment Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage IPO and ECN investment offerings
          </p>
        </div>
        <div className="flex items-center gap-3">
          <TrendingDown className="w-8 h-8 text-blue-600" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab('offers')}
          className={`px-6 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'offers'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Investment Offers
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-6 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'history'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Investment History
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-6 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'requests'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Sell Requests
          {allSellRequests.filter(r => r.status === 'pending').length > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-red-600 text-white rounded-full">
              {allSellRequests.filter(r => r.status === 'pending').length}
            </span>
          )}
        </button>
      </div>

      {/* Investment Offers Tab */}
      {activeTab === 'offers' && (
        <div className="space-y-4">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-1 gap-3 w-full sm:w-auto">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search offers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
              >
                <option value="all">All Types</option>
                <option value="IPO">IPO</option>
                <option value="ECN">ECN</option>
              </select>
            </div>
            <Button onClick={() => { setEditingOffer(null); setShowCreateModal(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              Create Offer
            </Button>
          </div>

          {/* Offers Table */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-slate-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Exchanger
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Profitability
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Period
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Offer Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Current Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Available / Total Unit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                  {filteredOffers.map((offer) => (
                    <tr key={offer.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-700 dark:text-gray-300">{offer.exchanger || '—'}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden ${
                            offer.logo ? 'bg-transparent' : 'bg-gradient-to-br from-blue-500 to-purple-600'
                          }`}>
                            {offer.logo ? (
                              <img src={offer.logo} alt={offer.name} className="w-full h-full object-contain" />
                            ) : (
                              <span className="text-white font-bold">{offer.name[0]}</span>
                            )}
                          </div>
                          <span className="font-medium">{offer.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-sm rounded-full ${
                          offer.type === 'IPO' 
                            ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                            : 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        }`}>
                          {offer.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-green-600 dark:text-green-400 font-semibold">
                        <div className="flex flex-col gap-1">
                          <span className="text-green-600 dark:text-green-400 font-semibold">+{offer.profitability}%</span>
                          <span className={`px-2 py-0.5 text-xs rounded-full inline-block w-fit ${
                            PROFITABILITY_TIER_COLORS[offer.profitabilityTier as ProfitabilityTier] || 'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400'
                          }`}>
                            {PROFITABILITY_TIER_LABELS[offer.profitabilityTier as ProfitabilityTier] || 'Average Yield'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {offer.period} days
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {offer.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">${formatCurrency(offer.price)}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Min: {offer.minPurchase} unit{offer.minPurchase !== 1 ? 's' : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {offer.type === 'ECN' && (offer as any).marketPrice ? (
                          <div>
                            <div className="font-medium">${formatCurrency((offer as any).marketPrice)}</div>
                            <span className={`text-xs font-semibold ${
                              offer.price > (offer as any).marketPrice ? 'text-red-600' : 'text-green-600'
                            }`}>
                              {offer.price > (offer as any).marketPrice ? '+' : ''}
                              {formatPercentage(((offer.price - (offer as any).marketPrice) / (offer as any).marketPrice) * 100)} vs offer
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400 dark:text-gray-500">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {offer.availableUnits.toLocaleString()} / {offer.totalUnits.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-semibold">
                        ${formatCurrency(offer.price * offer.totalUnits)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-sm rounded-full ${
                          offer.enabled
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                            : 'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400'
                        }`}>
                          {offer.enabled ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => { setEditingOffer(offer); setShowCreateModal(true); }}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(offer.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredOffers.length === 0 && (
                    <tr>
                      <td colSpan={12} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                        No investment offers found. Create one to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Investment History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-1 gap-3 w-full sm:w-auto">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search history by project or user..."
                  value={historySearchTerm}
                  onChange={(e) => setHistorySearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={historyFilterType}
                onChange={(e) => setHistoryFilterType(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
              >
                <option value="all">All Types</option>
                <option value="IPO">IPO</option>
                <option value="ECN">ECN</option>
              </select>
            </div>
            <div className="text-sm text-gray-500">
              Showing {filteredHistory.length} investment{filteredHistory.length !== 1 ? 's' : ''}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-slate-700/50">
                  <tr>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                      onClick={() => handleHistorySort('userId')}
                    >
                      <div className="flex items-center">User <SortIndicator field="userId" /></div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                      onClick={() => handleHistorySort('offerName')}
                    >
                      <div className="flex items-center">Investment <SortIndicator field="offerName" /></div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                      onClick={() => handleHistorySort('units')}
                    >
                      <div className="flex items-center">Units <SortIndicator field="units" /></div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                      onClick={() => handleHistorySort('totalAmount')}
                    >
                      <div className="flex items-center">Amount <SortIndicator field="totalAmount" /></div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                      onClick={() => handleHistorySort('currentValue')}
                    >
                      <div className="flex items-center">Current Value <SortIndicator field="currentValue" /></div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                      onClick={() => handleHistorySort('startDate')}
                    >
                      <div className="flex items-center">Start Date <SortIndicator field="startDate" /></div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                      onClick={() => handleHistorySort('endDate')}
                    >
                      <div className="flex items-center">End Date <SortIndicator field="endDate" /></div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                      onClick={() => handleHistorySort('status')}
                    >
                      <div className="flex items-center">Status <SortIndicator field="status" /></div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                  {filteredHistory.map((investment) => (
                  <tr key={investment.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{getUserDetails(investment.userId).name}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">({getUserDetails(investment.userId).email})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs rounded ${
                          investment.offerType === 'IPO' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {investment.offerType}
                        </span>
                        {investment.offerName}
                      </div>
                    </td>
                    <td className="px-6 py-4">{investment.units}</td>
                    <td className="px-6 py-4">${formatCurrency(investment.totalAmount)}</td>
                    <td className="px-6 py-4 font-semibold text-green-600">
                      <div className="flex flex-col">
                        <span>
                          {investment.offerType === 'IPO' && !investment.showValueAndDate 
                            ? '—' 
                            : `$${formatCurrency(getEffectiveValue(investment))}`}
                        </span>
                        {investment.isCustomValue && (
                          <span className="text-[10px] bg-amber-100 text-amber-600 px-1 rounded w-fit mt-1 uppercase">Custom</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(investment.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {investment.offerType === 'IPO' && !investment.showValueAndDate 
                        ? '—' 
                        : new Date(investment.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-sm rounded-full capitalize ${
                        investment.status === 'completed'
                          ? 'bg-green-100 text-green-600'
                          : investment.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {investment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditInvestment(investment)}
                          className="gap-1"
                        >
                          <Edit2 className="w-3 h-3" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteInvestment(investment.id, investment.offerName)}
                          className="gap-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredHistory.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                      No matching investments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      )}

      {/* Sell Requests Tab */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-1 gap-3 w-full sm:w-auto">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search requests by project or user..."
                  value={requestsSearchTerm}
                  onChange={(e) => setRequestsSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={requestsFilterType}
                onChange={(e) => setRequestsFilterType(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
              >
                <option value="all">All Types</option>
                <option value="IPO">IPO</option>
                <option value="ECN">ECN</option>
              </select>
              <select
                value={requestsFilterStatus}
                onChange={(e) => setRequestsFilterStatus(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="text-sm text-gray-500">
              Showing {filteredRequests.length} request{filteredRequests.length !== 1 ? 's' : ''}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-slate-700/50">
                  <tr>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                      onClick={() => handleRequestsSort('userId')}
                    >
                      <div className="flex items-center">User <RequestSortIndicator field="userId" /></div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                      onClick={() => handleRequestsSort('offerName')}
                    >
                      <div className="flex items-center">Investment <RequestSortIndicator field="offerName" /></div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                      onClick={() => handleRequestsSort('units')}
                    >
                      <div className="flex items-center">Units <RequestSortIndicator field="units" /></div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                      onClick={() => handleRequestsSort('totalAmount')}
                    >
                      <div className="flex items-center">Amount <RequestSortIndicator field="totalAmount" /></div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                      onClick={() => handleRequestsSort('paymentWallet')}
                    >
                      <div className="flex items-center">Wallet <RequestSortIndicator field="paymentWallet" /></div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                      onClick={() => handleRequestsSort('createdAt')}
                    >
                      <div className="flex items-center">Date <RequestSortIndicator field="createdAt" /></div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                      onClick={() => handleRequestsSort('status')}
                    >
                      <div className="flex items-center">Status <RequestSortIndicator field="status" /></div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                  {filteredRequests.map((request) => (
                    <tr key={request.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{getUserDetails(request.userId).name}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">({getUserDetails(request.userId).email})</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs rounded ${
                            request.offerType === 'IPO' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                          }`}>
                            {request.offerType}
                          </span>
                          {request.offerName}
                        </div>
                      </td>
                      <td className="px-6 py-4">{request.units}</td>
                      <td className="px-6 py-4 font-semibold">${formatCurrency(request.totalAmount)}</td>
                      <td className="px-6 py-4 uppercase">{request.paymentWallet}</td>
                      <td className="px-6 py-4">{new Date(request.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-sm rounded-full capitalize ${
                          request.status === 'approved'
                            ? 'bg-green-100 text-green-600'
                            : request.status === 'rejected'
                            ? 'bg-red-100 text-red-600'
                            : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {request.status === 'pending' && (
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleApproveSellRequest(request)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRejectSellRequest(request)}
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredRequests.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                        No sell requests found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <EnhancedOfferModal
          offer={editingOffer}
          onClose={() => { setShowCreateModal(false); setEditingOffer(null); }}
          onSave={(data) => {
            if (editingOffer) {
              updateInvestmentOffer(editingOffer.id, data);
              showSuccessToast('Investment offer updated successfully');
            } else {
              addInvestmentOffer(data);
              showSuccessToast('Investment offer created successfully');
            }
            setShowCreateModal(false);
            setEditingOffer(null);
          }}
        />
      )}

      {/* Edit Investment Modal */}
      {showEditInvestmentModal && editingInvestment && (
        <EditInvestmentModal
          investment={{
            ...editingInvestment,
            currentValue: getEffectiveValue(editingInvestment)
          }}
          onClose={() => { setShowEditInvestmentModal(false); setEditingInvestment(null); }}
          onSave={handleUpdateInvestment}
        />
      )}
      {/* Approve Sell Request Modal */}
      {showApproveSellModal && requestForAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Clock className="w-6 h-6" /> Confirm Approval
              </h3>
              <p className="text-green-50/80 text-sm mt-1">
                This will credit funds to the user's account and reduce their investment.
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-gray-50 dark:bg-slate-700/50 p-4 rounded-xl space-y-2 border border-gray-100 dark:border-slate-700">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Offer</span>
                  <span className="font-semibold">{requestForAction.offerName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Units</span>
                  <span className="font-semibold">{requestForAction.units}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Payout</span>
                  <span className="font-bold text-green-600 dark:text-green-400">
                    ${formatCurrency(requestForAction.totalAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Destination</span>
                  <span className="capitalize font-semibold">{requestForAction.paymentWallet} Balance</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  onClick={confirmApproveSellRequest} 
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                  disabled={isProcessingAction}
                >
                  {isProcessingAction ? 'Processing...' : 'Confirm Approval'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowApproveSellModal(false);
                    setRequestForAction(null);
                  }} 
                  className="flex-1"
                  disabled={isProcessingAction}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Sell Request Modal */}
      {showRejectSellModal && requestForAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-gradient-to-r from-red-500 to-rose-600 p-6 text-white">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <X className="w-6 h-6" /> Reject Request
              </h3>
              <p className="text-rose-50/80 text-sm mt-1">
                Please provide a reason for rejecting this sell request.
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Rejection Reason</Label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Enter reason for rejection (e.g. Account needs verification, Insufficient units...)"
                  className="w-full min-h-[100px] px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  onClick={confirmRejectSellRequest} 
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                  disabled={isProcessingAction}
                >
                  {isProcessingAction ? 'Rejecting...' : 'Confirm Rejection'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowRejectSellModal(false);
                    setRequestForAction(null);
                  }} 
                  className="flex-1"
                  disabled={isProcessingAction}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Edit Investment Modal Component
function EditInvestmentModal({ 
  investment, 
  onClose, 
  onSave 
}: { 
  investment: any; 
  onClose: () => void; 
  onSave: (updates: any) => void;
}) {
  const [formData, setFormData] = useState({
    units: investment.units,
    currentValue: investment.currentValue,
    status: investment.status,
    endDate: new Date(investment.endDate).toISOString().split('T')[0],
    profitability: investment.profitability,
    showValueAndDate: investment.showValueAndDate ?? (investment.offerType === 'IPO' ? false : true),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert date back to timestamp
    const updates = {
      ...formData,
      isCustomValue: investment.isCustomValue || formData.currentValue !== investment.currentValue,
      endDate: new Date(formData.endDate).getTime(),
    };
    
    onSave(updates);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Edit Investment</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 text-xs rounded ${
                investment.offerType === 'IPO' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
              }`}>
                {investment.offerType}
              </span>
              <span className="font-semibold">{investment.offerName}</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              User: {investment.userId}<br />
              Purchase Price: ${formatCurrency(investment.purchasePrice)} per unit<br />
              Total Amount: ${formatCurrency(investment.totalAmount)}
            </div>
          </div>

          <div>
            <Label>Units</Label>
            <Input
              type="number"
              step="0.01"
              value={formData.units}
              onChange={(e) => setFormData({ ...formData, units: parseFloat(e.target.value) })}
              required
            />
            <div className="text-xs text-gray-500 mt-1">
              Original units purchased
            </div>
          </div>

          <div>
            <Label>Current Value ($)</Label>
            <Input
              type="number"
              step="0.01"
              value={formData.currentValue}
              onChange={(e) => setFormData({ ...formData, currentValue: parseFloat(e.target.value) })}
              required
            />
            <div className="text-xs text-gray-500 mt-1">
              Current total value of the investment
            </div>
          </div>

          <div>
            <Label>Profitability (%)</Label>
            <Input
              type="number"
              step="0.01"
              value={formData.profitability}
              onChange={(e) => setFormData({ ...formData, profitability: parseFloat(e.target.value) })}
              required
            />
            <div className="text-xs text-gray-500 mt-1">
              Expected return percentage
            </div>
          </div>

          <div>
            <Label>End Date</Label>
            <Input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              required
            />
            <div className="text-xs text-gray-500 mt-1">
              Maturity date of the investment
            </div>
          </div>

          <div>
            <Label>Status</Label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'in-progress' | 'completed' | 'cancelled' })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
              required
            >
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div className="text-xs text-gray-500 mt-1">
              Current status of the investment
            </div>
          </div>

          {investment.offerType === 'IPO' && (
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-700">
              <div>
                <Label className="text-base">Show Current Value & End Date</Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  If disabled, user will see "—" for current value and end date
                </p>
              </div>
              <Switch
                checked={formData.showValueAndDate}
                onCheckedChange={(checked) => setFormData({ ...formData, showValueAndDate: checked })}
              />
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-slate-700">
            <Button type="submit" className="flex-1">
              Update Investment
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}