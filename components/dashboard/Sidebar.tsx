import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  LineChart,
  TrendingUp,
  Briefcase,
  Wallet,
  History,
  Bot,
  Radio,
  TrendingDown,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useNotifications } from '../../contexts/NotificationContext';
const logoImage = "/logo.png";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();
  const { theme } = useTheme();
  const { notifications } = useNotifications();

  // Count unread admin ticket replies for the current user
  const ticketReplyCount = notifications.filter(n =>
    !n.read &&
    n.metadata?.ticketId &&
    (!n.userId || n.userId === currentUser?.id)
  ).length;

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', visible: true },
    { icon: LineChart, label: 'Markets', path: '/markets', visible: true },
    { icon: TrendingUp, label: 'Trading', path: '/trading', visible: true },
    { icon: Briefcase, label: 'Portfolio', path: '/portfolio', visible: true },
    { icon: Wallet, label: 'Deposit/Withdraw', path: '/wallet', visible: true },
    { icon: History, label: 'History', path: '/history', visible: true },
    { icon: Bot, label: 'AI Auto Trader', path: '/auto-trader', visible: currentUser?.hasAutoTradeAccess },
    { icon: Radio, label: 'Signals', path: '/signals', visible: currentUser?.hasSignalAccess },
    { icon: TrendingDown, label: 'Investment Offers', path: '/investments', visible: currentUser?.hasInvestmentAccess },
  ];

  const bottomItems = [
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Support', path: '/support' },
    { icon: LogOut, label: 'Logout', path: '/login' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700
        transition-all duration-300 flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isOpen ? 'w-64' : 'w-64 lg:w-20'}
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-slate-700">
          <Link to="/dashboard" className={`flex items-center gap-2 ${!isOpen && 'lg:justify-center lg:w-full'}`}>
            <img
              src={isOpen ? logoImage : "/assets/favicon.png"}
              alt="LPL Premium"
              className={`${isOpen ? 'h-7' : 'h-8'} ${theme === 'dark' ? 'brightness-0 invert' : ''}`}
            />
          </Link>

          {/* Toggle Button - Desktop Only */}
          <button
            onClick={onToggle}
            className="hidden lg:flex w-6 h-6 items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-slate-700"
          >
            {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {menuItems.filter(item => item.visible).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(`${item.path}/`));

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center gap-3 px-3 py-3 rounded-lg transition-colors
                      ${isActive
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                      }
                      ${!isOpen && 'lg:justify-center'}
                    `}
                    title={!isOpen ? item.label : undefined}
                    onClick={() => {
                      // Close mobile menu on navigation
                      if (window.innerWidth < 1024) {
                        onToggle();
                      }
                    }}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className={!isOpen ? 'hidden lg:hidden' : ''}>{item.label === 'Deposit/Withdraw' ? 'My Wallet' : item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Items */}
        <div className="border-t border-gray-200 dark:border-slate-700 py-4">
          <ul className="space-y-1 px-2">
            {bottomItems.map((item) => {
              const Icon = item.icon;
              const showBadge = item.path === '/support' && ticketReplyCount > 0;
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(`${item.path}/`));

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center gap-3 px-3 py-3 rounded-lg transition-colors
                      ${isActive
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                      }
                      ${!isOpen && 'lg:justify-center'}
                    `}
                    title={!isOpen ? item.label : undefined}
                    onClick={(e) => {
                      // Handle logout with confirmation
                      if (item.path === '/login') {
                        e.preventDefault();
                        if (confirm('Are you sure you want to logout?')) {
                          logout();
                          navigate('/login');
                        }
                        return;
                      }

                      // Close mobile menu on navigation
                      if (window.innerWidth < 1024) {
                        onToggle();
                      }
                    }}
                  >
                    <div className="relative flex-shrink-0">
                      <Icon className="w-5 h-5" />
                      {showBadge && !isOpen && (
                        <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                          {ticketReplyCount > 9 ? '9+' : ticketReplyCount}
                        </span>
                      )}
                    </div>
                    <span className={!isOpen ? 'hidden lg:hidden' : 'flex-1'}>{item.label}</span>
                    {showBadge && isOpen && (
                      <span className="bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5">
                        {ticketReplyCount > 9 ? '9+' : ticketReplyCount}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}