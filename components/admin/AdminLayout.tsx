import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, TrendingUp, Bot, Signal, CreditCard, 
  Briefcase, Headphones, MessageSquare, Settings, DollarSign, 
  ArrowDownCircle, Wallet, TrendingDown, Sliders, LogOut, 
  ChevronLeft, Menu, Bell, Sun, Moon, ChevronDown, User, Shield, Clock, Mail, Key
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useTickets } from '../../contexts/TicketContext';
import { Button } from '../ui/button';
import NotificationCenter from '../notifications/NotificationCenter';
import { LogoutModal } from '../ui/LogoutModal';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logoImage from 'figma:asset/3af257502fb25704e3d2cda04e668377af3daafa.png';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const { tickets } = useTickets();

  // Count tickets needing admin attention: open/pending tickets, or tickets where the last message is from a user
  const ticketBadgeCount = tickets.filter(t => {
    if (t.status === 'closed' || t.status === 'resolved') return false;
    if (t.status === 'open') return true;
    // For pending tickets, check if the last message is from a user (awaiting admin reply)
    if (t.messages && t.messages.length > 0) {
      const lastMsg = t.messages[t.messages.length - 1];
      return lastMsg.senderRole === 'user';
    }
    return true;
  }).length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'User Management', href: '/admin/users', icon: Users },
    { name: 'Password Reset Requests', href: '/admin/password-reset-management', icon: Key },
    { name: 'Session & Login History', href: '/admin/sessions', icon: Shield },
    { name: 'Notification Management', href: '/admin/notifications', icon: Bell },
    { name: 'Trade Management', href: '/admin/trades', icon: TrendingUp },
    { name: 'Auto Trader Control', href: '/admin/autotrader', icon: Bot },
    { name: 'Signal Management', href: '/admin/signals', icon: Signal },
    { name: 'Subscriptions', href: '/admin/subscriptions', icon: CreditCard },
    { name: 'Asset Management', href: '/admin/assets', icon: Briefcase },
    { name: 'Support Tickets', href: '/admin/tickets', icon: Headphones, badge: ticketBadgeCount },
    { name: 'Contact Submissions', href: '/admin/contact-submissions', icon: MessageSquare },
    { name: 'CRM Messaging', href: '/admin/crm-messaging', icon: Mail },
    { name: 'API Integrations', href: '/admin/api-integrations', icon: Settings },
    { name: 'Transactions', href: '/admin/transactions', icon: DollarSign },
    { name: 'Deposit Methods', href: '/admin/deposit-methods', icon: ArrowDownCircle },
    { name: 'Withdrawal Management', href: '/admin/withdrawal-methods', icon: Wallet },
    { name: 'Investments', href: '/admin/investments', icon: TrendingDown },
    { name: 'Trading Settings', href: '/admin/trading-settings', icon: Sliders },
  ];

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-slate-700">
            <Link to="/admin" className="flex items-center gap-2">
              <img src={logoImage} alt="LPL-Holdings" className="h-10 w-auto" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">LPL-Holdings</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium flex-1">{item.name}</span>
                    {item.name === 'Support Tickets' && ticketBadgeCount > 0 && (
                      <span className={`ml-auto inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[11px] font-semibold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-red-500 text-white'
                      }`}>
                        {ticketBadgeCount > 99 ? '99+' : ticketBadgeCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Admin User Info */}
          <div className="p-4 border-t border-gray-200 dark:border-slate-700">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50 dark:bg-slate-700/50">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-semibold">A</span>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm">Admin User</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">admin@gross.com</div>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full mt-2 gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all`}>
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? (
                  <ChevronLeft className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
              <div>
                <h2 className="text-xl font-bold">Admin Dashboard</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Manage your trading platform
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>

              {/* Admin Avatar Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">A</span>
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-semibold">Admin User</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">admin@gross.com</div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 py-1 z-50">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-700">
                      <div className="font-semibold text-sm">Admin User</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">admin@gross.com</div>
                    </div>
                    
                    <Link
                      to="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      User Dashboard
                    </Link>
                    
                    <Link
                      to="/admin/settings"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    
                    <div className="border-t border-gray-200 dark:border-slate-700 mt-1 pt-1">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          handleLogout();
                        }}
                        className="flex items-center gap-3 px-4 py-2 text-sm w-full text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
      />

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}