import { User, Menu, Sun, Moon, Search, ChevronDown, Wallet, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTrading } from '../../contexts/TradingContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useMarketData } from '../../contexts/MarketDataContext';
import { LogoutModal } from '../ui/LogoutModal';
import NotificationCenter from '../notifications/NotificationCenter';
import { formatPercentage, formatCurrency } from '../../utils/formatNumber';
import { SkeletonStat, Skeleton } from '../ui/Skeleton';

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const { currentUser, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);
  const { account, balanceLoaded } = useTrading();
  const { pricesReady } = useMarketData();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [showAccountBalance, setShowAccountBalance] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  // Auto-focus the search input whenever it opens
  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery('');
  };

  // Margin level color helper
  const marginLevelColor = () => {
    if (account.margin <= 0) return 'text-gray-500 dark:text-gray-400';
    const lvl = (account.equity / account.margin) * 100;
    if (lvl >= 100) return 'text-green-600 dark:text-green-400';
    if (lvl >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const marginLevelValue = account.margin > 0
    ? formatPercentage((account.equity / account.margin) * 100)
    : 'N/A';

  const accountStats = [
    { label: 'Balance', value: `$${formatCurrency(account.balance)}`, color: '' },
    ...(account.credit > 0 ? [{ label: 'Credit', value: `$${formatCurrency(account.credit)}`, color: 'text-blue-600 dark:text-blue-400 font-semibold' }] : []),
    ...(account.bonus > 0 ? [{ label: 'Bonus', value: `$${formatCurrency(account.bonus)}`, color: 'text-emerald-600 dark:text-emerald-400 font-semibold' }] : []),
    { label: 'Equity', value: `$${formatCurrency(account.equity)}`, color: '' },
    { label: 'Realized P&L', value: `$${formatCurrency(account.realizedPnL)}`, color: account.realizedPnL >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400' },
    { label: 'Unrealized P&L', value: `${account.unrealizedPnL >= 0 ? '+' : ''}$${formatCurrency(account.unrealizedPnL)}`, color: account.unrealizedPnL >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400' },
    { label: 'Margin', value: `$${formatCurrency(account.margin)}`, color: '' },
    { label: 'Margin Lvl', value: marginLevelValue, color: marginLevelColor() },
    { label: 'Free Margin', value: `$${formatCurrency(account.availableFunds)}`, color: 'text-blue-600 dark:text-blue-400 font-semibold' },
  ];

  // Get subscription plan and styling
  const getSubscriptionBadge = () => {
    const plan = currentUser?.subscriptionPlan || 'Free';

    const styles: Record<string, { bg: string; text: string }> = {
      'Free': { bg: 'bg-gray-100 dark:bg-gray-900', text: 'text-gray-600 dark:text-gray-400' },
      'Basic': { bg: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-600 dark:text-blue-400' },
      'Starter': { bg: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-600 dark:text-blue-400' },
      'Pro': { bg: 'bg-purple-100 dark:bg-purple-900', text: 'text-purple-600 dark:text-purple-400' },
      'Professional': { bg: 'bg-purple-100 dark:bg-purple-900', text: 'text-purple-600 dark:text-purple-400' },
      'Premium': { bg: 'bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900', text: 'text-orange-600 dark:text-orange-400' },
      'Enterprise': { bg: 'bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900', text: 'text-orange-600 dark:text-orange-400' },
    };

    const style = styles[plan] || styles['Free'];

    return (
      <div className={`mt-2 inline-block px-2 py-1 ${style.bg} ${style.text} text-xs rounded`}>
        {plan} Plan
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
      <div className="px-4 py-3 flex items-center justify-between gap-4">
        {/* Left Side */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Animated Search — icon only, expands on click */}
          <div className="relative flex items-center shrink-0">
            {/* Icon-only trigger (hidden when open) */}
            {!searchOpen && (
              <button
                onClick={() => setSearchOpen(true)}
                title="Search markets, assets..."
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            {/* Expanding animated input */}
            <div
              style={{
                width: searchOpen ? '260px' : '0px',
                opacity: searchOpen ? 1 : 0,
                transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease',
                overflow: 'hidden',
              }}
            >
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onBlur={() => setTimeout(closeSearch, 150)}
                  onKeyDown={e => { if (e.key === 'Escape') closeSearch(); }}
                  placeholder="Search markets, assets..."
                  className="w-full pl-9 pr-8 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-colors"
                />
                <button
                  onMouseDown={e => { e.preventDefault(); closeSearch(); }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Account Summary Stats — shown after search on xl+ screens */}
          <div className="flex items-center text-xs border-l border-gray-200 dark:border-slate-700 pl-1 min-w-0 overflow-x-auto scrollbar-hide">
            <div className="flex items-center divide-x divide-gray-200 dark:divide-slate-700">
              {!balanceLoaded ? (
                // Show skeleton stats while loading
                Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonStat key={i} />
                ))
              ) : (
                accountStats.map(({ label, value, color }) => (
                  <div key={label} className="flex flex-col px-2 md:px-3 leading-tight">
                    <span className="text-gray-400 dark:text-gray-500 whitespace-nowrap text-[10px] md:text-xs">{label}</span>
                    <span className={`font-semibold whitespace-nowrap text-[11px] md:text-xs ${color}`}>{value}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Notification Center */}
          <NotificationCenter />

          {/* Account Balance */}
          <div className="relative">
            <button
              onClick={() => {
                setShowAccountBalance(!showAccountBalance);
                setShowProfile(false);
              }}
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              <Wallet className="w-4 h-4" />
              <div className="flex flex-col items-start">
                {balanceLoaded ? (
                  <span className="font-semibold">${formatCurrency(account.balance)}</span>
                ) : (
                  <Skeleton className="h-5 w-16" />
                )}
              </div>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Account Balance Dropdown */}
            {showAccountBalance && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowAccountBalance(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-200 dark:border-slate-700 z-50">
                  <div className="p-4 border-b border-gray-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Account Details</h3>
                      <div className="text-xs px-2 py-1 rounded bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                        Live Account
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-1">
                    {/* Balance */}
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Balance</span>
                      <span className="font-semibold">${formatCurrency(account.balance)}</span>
                    </div>

                    {/* Credit */}
                    {account.credit > 0 && (
                      <div className="flex items-center justify-between py-2 border-t border-gray-200 dark:border-slate-700">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Credit</span>
                        <span className="font-semibold text-blue-600 dark:text-blue-400">${formatCurrency(account.credit)}</span>
                      </div>
                    )}

                    {/* Bonus */}
                    {account.bonus > 0 && (
                      <div className="flex items-center justify-between py-2 border-t border-gray-200 dark:border-slate-700">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Bonus</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">${formatCurrency(account.bonus)}</span>
                      </div>
                    )}

                    {/* Equity */}
                    <div className="flex items-center justify-between py-2 border-t border-gray-200 dark:border-slate-700">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Equity</span>
                      <span className="font-semibold">${formatCurrency(account.equity)}</span>
                    </div>

                    {/* P&L */}
                    <div className="flex items-center justify-between py-2 border-t border-gray-200 dark:border-slate-700">
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">P&L</span>
                        <div className="flex gap-2 text-xs mt-1">
                          <span className="text-gray-500">Realized: ${formatCurrency(account.realizedPnL)}</span>
                        </div>
                      </div>
                      <span className={`font-semibold ${account.unrealizedPnL >= 0
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                        }`}>
                        {account.unrealizedPnL >= 0 ? '+' : ''}${formatCurrency(account.unrealizedPnL)}
                      </span>
                    </div>

                    {/* Margin */}
                    <div className="flex items-center justify-between py-2 border-t border-gray-200 dark:border-slate-700">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Margin Used</span>
                      <div className="text-right">
                        <span className="font-semibold">${formatCurrency(account.margin)}</span>
                        <div className="text-xs text-gray-500">
                          {account.equity > 0 ? formatPercentage((account.margin / account.equity) * 100) : '0.00%'} of equity
                        </div>
                      </div>
                    </div>

                    {/* Free Margin */}
                    <div className="flex items-center justify-between py-2 border-t border-gray-200 dark:border-slate-700">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Free Margin</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        ${formatCurrency(account.availableFunds)}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 border-t border-gray-200 dark:border-slate-700 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setShowAccountBalance(false);
                        navigate('/wallet');
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Deposit
                    </button>
                    <button
                      onClick={() => {
                        setShowAccountBalance(false);
                        navigate('/wallet');
                      }}
                      className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-sm"
                    >
                      Withdraw
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfile(!showProfile);
                setShowAccountBalance(false);
              }}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <ChevronDown className="w-4 h-4 hidden sm:block" />
            </button>

            {/* Profile Dropdown */}
            {showProfile && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowProfile(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-200 dark:border-slate-700 z-50">
                  <div className="p-4 border-b border-gray-200 dark:border-slate-700">
                    <p className="font-semibold">{currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Guest User'}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{currentUser?.email || 'No email'}</p>
                    {getSubscriptionBadge()}
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setShowProfile(false);
                        navigate('/settings');
                      }}
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-slate-700 text-sm"
                    >
                      Account Settings
                    </button>
                    <button
                      onClick={() => {
                        setShowProfile(false);
                        navigate('/subscription');
                      }}
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-slate-700 text-sm"
                    >
                      Subscription
                    </button>
                    <button
                      onClick={() => {
                        setShowProfile(false);
                        navigate('/settings');
                      }}
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-slate-700 text-sm"
                    >
                      Security
                    </button>
                    <button
                      onClick={() => {
                        setShowProfile(false);
                        navigate('/wallet?tab=withdraw');
                      }}
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-slate-700 text-sm text-orange-600 dark:text-orange-400"
                    >
                      Withdraw
                    </button>
                  </div>
                  <div className="p-2 border-t border-gray-200 dark:border-slate-700">
                    <button
                      onClick={() => {
                        setShowProfile(false);
                        setShowLogoutModal(true);
                      }}
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-slate-700 text-sm text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}

            <LogoutModal
              isOpen={showLogoutModal}
              isLoading={isLoadingLogout}
              onClose={() => setShowLogoutModal(false)}
              onConfirm={() => {
                console.log('🚪 Confirming logout...');
                logout();
                setShowLogoutModal(false);
                navigate('/login');
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}