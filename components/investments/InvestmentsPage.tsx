import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Percent, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Zap,
  ArrowUpCircle,
  ArrowDownCircle,
  Lock,
  Mail,
  Send,
  ShoppingCart,
  Search,
  RefreshCw,
  HelpCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useInvestments, PROFITABILITY_TIER_LABELS, PROFITABILITY_TIER_COLORS, ProfitabilityTier } from '../../contexts/InvestmentContext';
import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../layouts/DashboardLayout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { formatCurrency } from '../../utils/formatNumber';

export default function InvestmentsPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { 
    investmentOffers, 
    addUserInvestment,
    getUserInvestments,
    getUserSellRequests,
    createSellRequest
  } = useInvestments();

  // Helper functions for toast notifications
  const showSuccessToast = (message: string) => toast.success(message);
  const showErrorToast = (message: string) => toast.error(message);

  // Helper functions for trading account integration
  const withdrawFromTradingAccount = (amount: number, accountType: string): boolean => {
    // This would integrate with the actual trading context
    // For now, return true as a placeholder
    console.log(`Withdrawing $${amount} from ${accountType} account`);
    return true;
  };

  const depositToTradingAccount = (amount: number, accountType: string): void => {
    // This would integrate with the actual trading context
    // For now, just log
    console.log(`Depositing $${amount} to ${accountType} account`);
  };

  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'IPO' | 'ECN'>('IPO');
  const [historyTab, setHistoryTab] = useState<'history' | 'requests'>('history');
  const [historyTypeTab, setHistoryTypeTab] = useState<'IPO' | 'ECN'>('IPO');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Check user access
  useEffect(() => {
    if (!currentUser) {
      setHasAccess(false);
      return;
    }

    const loadAccessSettings = () => {
      const investmentAccessData = localStorage.getItem('investment_access');
      if (investmentAccessData) {
        try {
          const accessMap = JSON.parse(investmentAccessData);
          const userHasAccess = accessMap[currentUser.id] === true;
          setHasAccess(userHasAccess);
          console.log('Investment Access Check:', {
            userId: currentUser.id,
            userEmail: currentUser.email,
            accessMap,
            userHasAccess
          });
        } catch (e) {
          console.error('Error parsing investment access:', e);
          setHasAccess(false);
        }
      } else {
        setHasAccess(false);
      }
    };

    loadAccessSettings();

    // Listen for custom investment access change event (same window)
    const handleAccessChange = (event: Event) => {
      console.log('Investment access changed event detected!', event);
      loadAccessSettings();
    };

    // Listen for storage changes (cross-tab)
    const handleStorageChange = () => {
      console.log('Storage change detected (cross-tab), reloading access settings...');
      loadAccessSettings();
    };

    window.addEventListener('investment_access_changed', handleAccessChange);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('investment_access_changed', handleAccessChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [currentUser]);
  
  // Investment-specific wallet balances (ECN and IPO are separate from main trading account)
  // Portfolio balance is the investment portfolio balance (separate from live trading account)
  const [portfolioBalance, setPortfolioBalance] = useState(0);
  const [ecnBalance, setEcnBalance] = useState(0);
  const [ipoBalance, setIpoBalance] = useState(0);

  // Transfer state
  const [transferAmount, setTransferAmount] = useState('');
  const [fromWallet, setFromWallet] = useState<'portfolio' | 'ecn' | 'ipo'>('portfolio');
  const [toWallet, setToWallet] = useState<'portfolio' | 'ecn' | 'ipo'>('ecn');

  // Buy modal state
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [buyUnits, setBuyUnits] = useState('');
  const [paymentWallet, setPaymentWallet] = useState<'portfolio' | 'ecn' | 'ipo'>('portfolio');
  const [isBuying, setIsBuying] = useState(false);

  // Sell modal state
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState<any>(null);
  const [sellUnits, setSellUnits] = useState('');
  const [sellWallet, setSellWallet] = useState<'portfolio' | 'ecn' | 'ipo'>('portfolio');
  const [isSelling, setIsSelling] = useState(false);

  // Load balances from localStorage (per-user key)
  useEffect(() => {
    if (!currentUser) return;
    const loadBalances = () => {
      const stored = localStorage.getItem(`investment_balances_${currentUser.id}`);
      if (stored) {
        const balances = JSON.parse(stored);
        setPortfolioBalance(balances.portfolio || 0);
        setEcnBalance(balances.ecn || 0);
        setIpoBalance(balances.ipo || 0);
      }
    };
    loadBalances();

    // Listen for cross-tab storage changes
    const handleStorage = (e: StorageEvent) => {
      if (e.key === `investment_balances_${currentUser.id}` && e.newValue) {
        try {
          const balances = JSON.parse(e.newValue);
          setPortfolioBalance(balances.portfolio || 0);
          setEcnBalance(balances.ecn || 0);
          setIpoBalance(balances.ipo || 0);
        } catch { /* ignore */ }
      }
    };
    // Listen for same-tab storage events
    const handleStorageLocal = () => {
      loadBalances();
    };
    window.addEventListener('storage', handleStorage);
    window.addEventListener('investmentBalancesUpdated', handleStorageLocal);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('investmentBalancesUpdated', handleStorageLocal);
    };
  }, [currentUser?.id]);

  const saveBalances = (portfolio: number, ecn: number, ipo: number) => {
    if (!currentUser) return;
    localStorage.setItem(`investment_balances_${currentUser.id}`, JSON.stringify({ portfolio, ecn, ipo }));
    setPortfolioBalance(portfolio);
    setEcnBalance(ecn);
    setIpoBalance(ipo);
    window.dispatchEvent(new Event('storage'));
  };

  const handleTransfer = () => {
    const amount = parseFloat(transferAmount);
    if (!amount || amount <= 0) {
      showErrorToast('Please enter a valid amount');
      return;
    }

    if (fromWallet === toWallet) {
      showErrorToast('Cannot transfer to the same wallet');
      return;
    }

    const balances = { portfolio: portfolioBalance, ecn: ecnBalance, ipo: ipoBalance };
    
    if (balances[fromWallet] < amount) {
      showErrorToast('Insufficient balance');
      return;
    }

    // All transfers are between portfolio/ecn/ipo balances
    const newBalances = { ...balances };
    newBalances[fromWallet] -= amount;
    newBalances[toWallet] += amount;
    saveBalances(newBalances.portfolio, newBalances.ecn, newBalances.ipo);

    setTransferAmount('');
    showSuccessToast(`Transferred $${amount.toFixed(2)} successfully`);
  };

  const handleBuy = () => {
    console.log('=== handleBuy Debug Info ===');
    console.log('buyModalOpen:', buyModalOpen);
    console.log('selectedOffer:', selectedOffer);
    console.log('user:', currentUser);
    console.log('buyUnits:', buyUnits);
    console.log('paymentWallet:', paymentWallet);
    console.log('========================');
    
    if (!currentUser) {
      console.error('User is not logged in');
      showErrorToast('Please log in to make a purchase');
      return;
    }
    
    if (!selectedOffer) {
      console.error('No offer selected');
      showErrorToast('Please select an investment offer');
      return;
    }
    
    setIsBuying(true);
    
    try {
      const units = parseInt(buyUnits);
      console.log('Parsed units:', units);
      
      if (!units || units <= 0 || isNaN(units)) {
        showErrorToast('Please enter valid units');
        setIsBuying(false);
        return;
      }

      if (units < selectedOffer.minPurchase || units > selectedOffer.maxPurchase) {
        showErrorToast(`Units must be between ${selectedOffer.minPurchase} and ${selectedOffer.maxPurchase}`);
        setIsBuying(false);
        return;
      }

      if (units > selectedOffer.availableUnits) {
        showErrorToast('Not enough units available');
        setIsBuying(false);
        return;
      }

      const totalCost = units * selectedOffer.price;
      const balances = { portfolio: portfolioBalance, ecn: ecnBalance, ipo: ipoBalance };

      console.log('Total cost:', totalCost);
      console.log('Current balance:', balances[paymentWallet]);

      if (balances[paymentWallet] < totalCost) {
        showErrorToast('Insufficient balance');
        setIsBuying(false);
        return;
      }

      // Deduct payment from the selected wallet
      const newBalances = { portfolio: portfolioBalance, ecn: ecnBalance, ipo: ipoBalance };
      newBalances[paymentWallet] -= totalCost;
      saveBalances(newBalances.portfolio, newBalances.ecn, newBalances.ipo);

      // Calculate dates
      const startDate = Date.now();
      const endDate = startDate + (selectedOffer.period * 24 * 60 * 60 * 1000);
      const currentValue = totalCost * (1 + selectedOffer.profitability / 100);

      // Create user investment
      const investmentId = addUserInvestment({
        userId: currentUser.id,
        offerId: selectedOffer.id,
        offerName: selectedOffer.name,
        offerLogo: selectedOffer.logo,
        offerType: selectedOffer.type,
        units,
        purchasePrice: selectedOffer.price,
        totalAmount: totalCost,
        currentValue: currentValue,
        startDate,
        endDate,
        profitability: selectedOffer.profitability,
        status: 'in-progress',
      });

      console.log('Investment created with ID:', investmentId);

      setBuyModalOpen(false);
      setBuyUnits('');
      setIsBuying(false);
      showSuccessToast('Investment purchased successfully!');
    } catch (error) {
      console.error('Error in handleBuy:', error);
      showErrorToast('Failed to process purchase. Please try again.');
      setIsBuying(false);
    }
  };

  const handleSellRequest = () => {
    if (!selectedInvestment || !currentUser) return;
    
    const units = parseInt(sellUnits);
    const availableToSell = selectedInvestment.availableUnitsToSell ?? selectedInvestment.units;
    if (!units || units <= 0 || units > availableToSell) {
      showErrorToast(`Invalid units. You can sell up to ${availableToSell} units.`);
      return;
    }

    const currentPrice = selectedInvestment.currentValue / selectedInvestment.units;
    const totalAmount = currentPrice * units;

    createSellRequest({
      userId: currentUser.id,
      investmentId: selectedInvestment.id,
      offerName: selectedInvestment.offerName,
      offerLogo: selectedInvestment.offerLogo,
      offerType: selectedInvestment.offerType,
      units,
      currentPrice,
      totalAmount,
      paymentWallet: sellWallet,
    });

    setSellModalOpen(false);
    setSellUnits('');
    showSuccessToast('Sell request submitted successfully!');
  };

  // Get user data
  const userInvestments = currentUser ? getUserInvestments(currentUser.id) : [];
  const userSellRequests = currentUser ? getUserSellRequests(currentUser.id) : [];

  // Filter offers
  const filteredOffers = investmentOffers
    .filter(offer => offer.type === activeTab && offer.enabled)
    .filter(offer => offer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    offer.category.toLowerCase().includes(searchTerm.toLowerCase()));

  // Filter user investments
  const filteredUserInvestments = userInvestments
    .filter(inv => inv.offerType === historyTypeTab)
    .filter(inv => inv.offerName.toLowerCase().includes(searchTerm.toLowerCase()));

  const filteredSellRequests = userSellRequests
    .filter(req => req.offerType === historyTypeTab)
    .filter(req => req.offerName.toLowerCase().includes(searchTerm.toLowerCase()));

  // Update investment status based on end date
  useEffect(() => {
    userInvestments.forEach(investment => {
      if (investment.status === 'in-progress' && Date.now() >= investment.endDate) {
        // Update to completed (this would be handled in context)
      }
    });
  }, [userInvestments]);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6 p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingDown className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold">Investments</h1>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => navigate('/support')}
            >
              <HelpCircle className="w-4 h-4" />
              Support
            </Button>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => navigate('/wallet')}
            >
              <ArrowDownCircle className="w-4 h-4" />
              Deposit
            </Button>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => navigate('/wallet')}
            >
              <ArrowUpCircle className="w-4 h-4" />
              Withdraw
            </Button>
          </div>
        </div>

        {/* Access Restriction Overlay - Blur effect when disabled */}
        {!hasAccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md lg:left-64 top-16">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md mx-4 shadow-2xl border border-gray-200 dark:border-slate-700">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Access Restricted
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  You don't have access to Investment Offers. Please contact your admin or portfolio manager to enable this feature.
                </p>
                <div className="flex flex-col gap-3">
                  <Button 
                    className="w-full gap-2"
                    onClick={() => {
                      const params = new URLSearchParams({
                        autoOpen: 'true',
                        subject: 'Request: Enable Investment Offers Access',
                        category: 'account',
                        priority: 'high',
                        message: 'Hello,\n\nI would like to request access to Investment Offers on my account. Currently, this feature is restricted and I need it activated to start investing in available IPO and ECN opportunities.\n\nPlease enable Investment Offers access for my account at your earliest convenience.\n\nThank you!'
                      });
                      navigate(`/support?${params.toString()}`);
                    }}
                  >
                    <Mail className="w-4 h-4" />
                    Contact Portfolio Manager
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/dashboard')}>
                    Go to Dashboard
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Portfolio Balance</div>
            <div className="text-3xl font-bold text-green-600">${formatCurrency(portfolioBalance)}</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">ECN Balance</div>
            <div className="text-3xl font-bold text-blue-600">${formatCurrency(ecnBalance)}</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">IPO Balance</div>
            <div className="text-3xl font-bold text-purple-600">${formatCurrency(ipoBalance)}</div>
          </div>
        </div>

        {/* Transfer Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold mb-4">Transfer Between Wallets</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>From Wallet</Label>
              <select
                value={fromWallet}
                onChange={(e) => setFromWallet(e.target.value as 'portfolio' | 'ecn' | 'ipo')}
                className="w-full mt-1 p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
              >
                <option value="portfolio">Portfolio Balance</option>
                <option value="ecn">ECN Balance</option>
                <option value="ipo">IPO Balance</option>
              </select>
            </div>
            <div>
              <Label>To Wallet</Label>
              <select
                value={toWallet}
                onChange={(e) => setToWallet(e.target.value as 'portfolio' | 'ecn' | 'ipo')}
                className="w-full mt-1 p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
              >
                <option value="portfolio">Portfolio Balance</option>
                <option value="ecn">ECN Balance</option>
                <option value="ipo">IPO Balance</option>
              </select>
            </div>
            <div>
              <Label>Amount (USD)</Label>
              <Input
                type="number"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                placeholder="0.00"
                className="mt-1"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleTransfer} className="w-full">
                Transfer
              </Button>
            </div>
          </div>
        </div>

        {/* Available Investments */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Available Investment Offers</h3>
            <div className="flex gap-2">
              <Button
                variant={activeTab === 'IPO' ? 'default' : 'outline'}
                onClick={() => setActiveTab('IPO')}
                size="sm"
                className={activeTab === 'IPO' ? 'bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white border-0' : ''}
              >
                IPO Offers
              </Button>
              <Button
                variant={activeTab === 'ECN' ? 'default' : 'outline'}
                onClick={() => setActiveTab('ECN')}
                size="sm"
                className={activeTab === 'ECN' ? 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white border-0' : ''}
              >
                ECN Offers
              </Button>
            </div>
          </div>

          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search investments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-slate-700/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Exchanger</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Profitability</th>
                  {activeTab === 'IPO' && (
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Period</th>
                  )}
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Offer Price</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Current Price</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Available / Total Unit</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                {filteredOffers.map((offer) => (
                  <tr key={offer.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30">
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-700 dark:text-gray-300">{offer.exchanger || '—'}</span>
                    </td>
                    <td className="px-4 py-3">
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
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <span className={`px-2 py-0.5 text-xs rounded-full inline-block w-fit ${
                          PROFITABILITY_TIER_COLORS[offer.profitabilityTier as ProfitabilityTier] || 'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400'
                        }`}>
                          {PROFITABILITY_TIER_LABELS[offer.profitabilityTier as ProfitabilityTier] || 'Average Yield'}
                        </span>
                      </div>
                    </td>
                    {activeTab === 'IPO' && (
                      <td className="px-4 py-3">{offer.period} days</td>
                    )}
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        offer.type === 'IPO' 
                          ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                          : 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      }`}>
                        {offer.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold">${formatCurrency(offer.price)}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Min: {offer.minPurchase} unit{offer.minPurchase !== 1 ? 's' : ''}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {offer.type === 'ECN' && (offer as any).marketPrice ? (
                        <div>
                          <div className="font-semibold">${formatCurrency((offer as any).marketPrice)}</div>
                          <span className={`text-xs font-semibold ${
                            offer.price > (offer as any).marketPrice ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {offer.price > (offer as any).marketPrice ? '+' : ''}
                            {((offer.price - (offer as any).marketPrice) / (offer as any).marketPrice * 100).toFixed(2)}% vs offer
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">{offer.availableUnits.toLocaleString()} / {offer.totalUnits.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <Button
                        size="sm"
                        onClick={() => {
                          console.log('Buy button clicked for offer:', offer);
                          setSelectedOffer(offer);
                          setBuyModalOpen(true);
                        }}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0"
                      >
                        Buy
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredOffers.length === 0 && (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                No {activeTab} offers available at the moment
              </div>
            )}
          </div>
        </div>

        {/* Investment History & Sell Requests */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button
                  variant={historyTab === 'history' ? 'default' : 'outline'}
                  onClick={() => setHistoryTab('history')}
                  size="sm"
                >
                  Investment History
                </Button>
                <Button
                  variant={historyTab === 'requests' ? 'default' : 'outline'}
                  onClick={() => setHistoryTab('requests')}
                  size="sm"
                >
                  Sell Requests
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant={historyTypeTab === 'IPO' ? 'default' : 'outline'}
                onClick={() => setHistoryTypeTab('IPO')}
                size="sm"
                className={historyTypeTab === 'IPO' ? 'bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white border-0' : ''}
              >
                IPO
              </Button>
              <Button
                variant={historyTypeTab === 'ECN' ? 'default' : 'outline'}
                onClick={() => setHistoryTypeTab('ECN')}
                size="sm"
                className={historyTypeTab === 'ECN' ? 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white border-0' : ''}
              >
                ECN
              </Button>
            </div>
          </div>

          {historyTab === 'history' ? (
            <div className="overflow-x-auto mt-4">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-slate-700/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Units</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Purchase Value</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Current Value</th>
                    {historyTypeTab === 'IPO' ? (
                      <>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Start Date</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase">End Date</th>
                      </>
                    ) : (
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Date</th>
                    )}
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                  {filteredUserInvestments.map((inv) => (
                    <tr key={inv.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden ${
                            inv.offerLogo ? 'bg-transparent' : 'bg-gradient-to-br from-blue-500 to-purple-600'
                          }`}>
                            {inv.offerLogo ? (
                              <img src={inv.offerLogo} alt={inv.offerName} className="w-full h-full object-contain" />
                            ) : (
                              <span className="text-white font-bold">{inv.offerName[0]}</span>
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{inv.offerName}</div>
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              inv.offerType === 'IPO' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                            }`}>
                              {inv.offerType}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">{inv.units}</td>
                      <td className="px-4 py-3 font-semibold">${formatCurrency(inv.totalAmount)}</td>
                      <td className="px-4 py-3 font-semibold text-green-600 dark:text-green-400">
                        ${formatCurrency(inv.currentValue)}
                      </td>
                      {historyTypeTab === 'IPO' ? (
                        <>
                          <td className="px-4 py-3">{new Date(inv.startDate).toLocaleDateString()}</td>
                          <td className="px-4 py-3">{new Date(inv.endDate).toLocaleDateString()}</td>
                        </>
                      ) : (
                        <td className="px-4 py-3">
                          <div>
                            <div>{new Date(inv.startDate).toLocaleDateString()}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{new Date(inv.startDate).toLocaleTimeString()}</div>
                          </div>
                        </td>
                      )}
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs capitalize ${
                          inv.status === 'completed'
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                            : 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {inv.status === 'completed' && (
                          <Button
                            size="sm"
                            onClick={() => {
                              const pendingUnits = userSellRequests
                                .filter(r => r.investmentId === inv.id && (r.status === 'pending' || r.status === 'approved'))
                                .reduce((sum, r) => sum + r.units, 0);
                              const availableUnits = inv.units - pendingUnits;
                              setSelectedInvestment({ ...inv, availableUnitsToSell: availableUnits });
                              setSellModalOpen(true);
                            }}
                            disabled={(() => {
                              const pendingUnits = userSellRequests
                                .filter(r => r.investmentId === inv.id && (r.status === 'pending' || r.status === 'approved'))
                                .reduce((sum, r) => sum + r.units, 0);
                              return inv.units - pendingUnits <= 0;
                            })()}
                            className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white border-0 disabled:opacity-50"
                          >
                            Sell
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredUserInvestments.length === 0 && (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  No {historyTypeTab} investment history yet
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto mt-4">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-slate-700/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Units</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Wallet</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                  {filteredSellRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden ${
                            req.offerLogo ? 'bg-transparent' : 'bg-gradient-to-br from-blue-500 to-purple-600'
                          }`}>
                            {req.offerLogo ? (
                              <img src={req.offerLogo} alt={req.offerName} className="w-full h-full object-contain" />
                            ) : (
                              <span className="text-white font-bold">{req.offerName[0]}</span>
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{req.offerName}</div>
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              req.offerType === 'IPO' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                            }`}>
                              {req.offerType}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">{req.units}</td>
                      <td className="px-4 py-3 font-semibold">${formatCurrency(req.totalAmount)}</td>
                      <td className="px-4 py-3 capitalize">{req.paymentWallet}</td>
                      <td className="px-4 py-3">{new Date(req.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs capitalize ${
                          req.status === 'approved'
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                            : req.status === 'rejected'
                            ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                            : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'
                        }`}>
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredSellRequests.length === 0 && (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  No {historyTypeTab} sell requests yet
                </div>
              )}
            </div>
          )}
        </div>

        {/* Buy Modal */}
        {buyModalOpen && selectedOffer && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Buy {selectedOffer.name}</h3>
              <div className="space-y-4">
                <div>
                  <Label>Units to Buy</Label>
                  <Input
                    type="number"
                    value={buyUnits}
                    onChange={(e) => setBuyUnits(e.target.value)}
                    placeholder="Enter units"
                    className="mt-1"
                  />
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Available: {selectedOffer.availableUnits} units | Min: {selectedOffer.minPurchase} | Max: {selectedOffer.maxPurchase}
                  </div>
                </div>
                <div>
                  <Label>Payment Wallet</Label>
                  <select
                    value={paymentWallet}
                    onChange={(e) => setPaymentWallet(e.target.value as 'portfolio' | 'ecn' | 'ipo')}
                    className="w-full mt-1 p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
                  >
                    <option value="portfolio">Portfolio Balance (${formatCurrency(portfolioBalance)})</option>
                    <option value="ecn">ECN Balance (${formatCurrency(ecnBalance)})</option>
                    <option value="ipo">IPO Balance (${formatCurrency(ipoBalance)})</option>
                  </select>
                </div>
                {buyUnits && parseInt(buyUnits) > 0 && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Cost</div>
                    <div className="text-2xl font-bold text-blue-600">
                      ${formatCurrency(parseInt(buyUnits) * selectedOffer.price)}
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400 mt-2">
                      Expected Return: +{selectedOffer.profitability}% ({PROFITABILITY_TIER_LABELS[selectedOffer.profitabilityTier as ProfitabilityTier] || 'Average Yield'}) in {selectedOffer.period} days
                    </div>
                  </div>
                )}
                <div className="flex gap-3">
                  <Button onClick={handleBuy} className="flex-1" disabled={isBuying}>
                    {isBuying ? 'Processing...' : 'Confirm Purchase'}
                  </Button>
                  <Button variant="outline" onClick={() => setBuyModalOpen(false)} className="flex-1" disabled={isBuying}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sell Modal */}
        {sellModalOpen && selectedInvestment && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Sell {selectedInvestment.offerName}</h3>
              <div className="space-y-4">
                <div>
                  <Label>Units to Sell</Label>
                  <Input
                    type="number"
                    value={sellUnits}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      const available = selectedInvestment.availableUnitsToSell ?? selectedInvestment.units;
                      if (val > available) {
                        setSellUnits(String(available));
                      } else {
                        setSellUnits(e.target.value);
                      }
                    }}
                    placeholder="Enter units"
                    max={selectedInvestment.availableUnitsToSell ?? selectedInvestment.units}
                    min={1}
                    className="mt-1"
                  />
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Available to sell: {selectedInvestment.availableUnitsToSell ?? selectedInvestment.units} of {selectedInvestment.units} units
                    {selectedInvestment.units - (selectedInvestment.availableUnitsToSell ?? selectedInvestment.units) > 0 && (
                      <span className="text-yellow-600 dark:text-yellow-400 ml-1">
                        ({selectedInvestment.units - (selectedInvestment.availableUnitsToSell ?? selectedInvestment.units)} in pending requests)
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <Label>Receive in Wallet</Label>
                  <select
                    value={sellWallet}
                    onChange={(e) => setSellWallet(e.target.value as 'portfolio' | 'ecn' | 'ipo')}
                    className="w-full mt-1 p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
                  >
                    <option value="portfolio">Portfolio Balance</option>
                    <option value="ecn">ECN Balance</option>
                    <option value="ipo">IPO Balance</option>
                  </select>
                </div>
                {sellUnits && parseInt(sellUnits) > 0 && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400">You will receive</div>
                    <div className="text-2xl font-bold text-green-600">
                      ${formatCurrency((selectedInvestment.currentValue / selectedInvestment.units) * parseInt(sellUnits))}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      After sell request is completed
                    </div>
                  </div>
                )}
                <div className="flex gap-3">
                  <Button onClick={handleSellRequest} className="flex-1">
                    Sell Now
                  </Button>
                  <Button variant="outline" onClick={() => setSellModalOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}