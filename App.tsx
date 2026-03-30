import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import ErrorBoundary from './components/common/ErrorBoundary';
import ProtectedRoute from './components/common/ProtectedRoute';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { TransactionProvider } from './contexts/TransactionProvider';
import { InvestmentProvider } from './contexts/InvestmentContext';
import { MarketDataProvider } from './contexts/MarketDataContext';
import { TradingProvider } from './contexts/TradingContext';
import { AutoTraderProvider } from './contexts/AutoTraderContext';
import { TicketProvider } from './contexts/TicketContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { initializeErrorSuppression } from './utils/errorSuppression';

// Authentication & Onboarding Components
import EmailVerification from './components/onboarding/EmailVerification';
import PhoneVerification from './components/onboarding/PhoneVerification';
import ProfileSetup from './components/onboarding/ProfileSetup';
import KYCVerification from './components/onboarding/KYCVerification';
import TwoFactorSetup from './components/onboarding/TwoFactorSetup';
import Welcome from './components/onboarding/Welcome';
import Login from './components/auth/Login';
import AdminLogin from './components/auth/AdminLogin';

// User Dashboard & Trading Components
import Dashboard from './components/dashboard/Dashboard';
import MarketsPage from './components/markets/MarketsPage';
import TradingPage from './components/trading/TradingPage';
import WalletPage from './components/wallet/WalletPage';
import PortfolioPage from './components/portfolio/PortfolioPage';
import AutoTraderPage from './components/autotrader/AutoTraderPage';
import SignalsPage from './components/signals/SignalsPage';
import SettingsPage from './components/settings/SettingsPage';
import HistoryPage from './components/history/HistoryPage';
import InvestmentsPage from './components/investments/InvestmentsPage';
import UserSubscription from './components/subscription/UserSubscription';
import TicketsPage from './components/support/TicketsPage';
import PlaceholderPage from './components/PlaceholderPage';

// Admin Panel Components
import AdminDashboard from './components/admin/AdminDashboard';
import UserManagement from './components/admin/UserManagement';
import SessionManagement from './components/admin/SessionManagement';
import NotificationManagement from './components/admin/NotificationManagement';
import TradeManagement from './components/admin/TradeManagement';
import SignalManagement from './components/admin/SignalManagement';
import SubscriptionManagement from './components/admin/SubscriptionManagement';
import AssetManagement from './components/admin/AssetManagement';
import TicketManagement from './components/admin/TicketManagement';
import TransactionManagement from './components/admin/TransactionManagement';
import WithdrawalManagement from './components/admin/WithdrawalManagement';
import DepositMethodsManagement from './components/admin/DepositMethodsManagement';
import PlatformWithdrawalSettings from './components/admin/PlatformWithdrawalSettings';
import AdminInvestmentsPage from './components/admin/AdminInvestmentsPage';
import AutoTraderManagement from './components/admin/AutoTraderManagement';
import TradingSettings from './components/admin/TradingSettings';
import CRMMessaging from './components/admin/CRMMessaging';
import APIIntegrations from './components/admin/APIIntegrations';
import AdminLayout from './components/admin/AdminLayout';
import DatabaseManager from './components/admin/DatabaseManager';
import ContactSubmissions from './components/admin/ContactSubmissions';
import PasswordResetManagement from './components/admin/PasswordResetManagement';
import ScrollToTop from './components/common/ScrollToTop';

// Redirect component for the root route → static public landing page
function DefaultRedirect() {
  useEffect(() => {
    window.location.replace('/index/');
  }, []);
  return null;
}

export default function App() {
  useEffect(() => {
    initializeErrorSuppression();
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <TransactionProvider>
              <InvestmentProvider>
                <MarketDataProvider>
                  <TradingProvider>
                    <AutoTraderProvider>
                      <TicketProvider>
                        <SubscriptionProvider>
                          <NotificationProvider>
                            <Router>
                              <ScrollToTop />
                              <Routes>

                                {/* ── Default Route: Public Landing Page ───── */}
                                <Route path="/" element={<DefaultRedirect />} />

                                {/* ── Auth ─────────────────────────────────── */}
                                <Route path="/signup" element={<Navigate to="/login?signup=true" replace />} />
                                <Route path="/register" element={<Navigate to="/login?signup=true" replace />} />
                                <Route path="/login" element={<ProtectedRoute requireAuth={false}><Login /></ProtectedRoute>} />

                                {/* ── Onboarding ───────────────────────────── */}
                                <Route path="/verify-email" element={<ProtectedRoute requireUser={true}><EmailVerification /></ProtectedRoute>} />
                                <Route path="/verify-phone" element={<ProtectedRoute requireUser={true}><PhoneVerification /></ProtectedRoute>} />
                                <Route path="/profile-setup" element={<ProtectedRoute requireUser={true}><ProfileSetup /></ProtectedRoute>} />
                                <Route path="/kyc-verification" element={<ProtectedRoute requireUser={true}><KYCVerification /></ProtectedRoute>} />
                                <Route path="/2fa-setup" element={<ProtectedRoute requireUser={true}><TwoFactorSetup /></ProtectedRoute>} />
                                <Route path="/welcome" element={<ProtectedRoute requireUser={true}><Welcome /></ProtectedRoute>} />

                                {/* ── User Dashboard ───────────────────────── */}
                                <Route path="/dashboard" element={<ProtectedRoute requireUser={true}><Dashboard /></ProtectedRoute>} />
                                <Route path="/markets" element={<ProtectedRoute requireUser={true}><MarketsPage /></ProtectedRoute>} />
                                <Route path="/trading/:symbol" element={<ProtectedRoute requireUser={true}><TradingPage /></ProtectedRoute>} />
                                <Route path="/trading" element={<Navigate to="/trading/BTCUSD" replace />} />
                                <Route path="/wallet" element={<ProtectedRoute requireUser={true}><WalletPage /></ProtectedRoute>} />
                                <Route path="/portfolio" element={<ProtectedRoute requireUser={true}><PortfolioPage /></ProtectedRoute>} />
                                <Route path="/auto-trader" element={<ProtectedRoute requireUser={true}><AutoTraderPage /></ProtectedRoute>} />
                                <Route path="/signals" element={<ProtectedRoute requireUser={true}><SignalsPage /></ProtectedRoute>} />
                                <Route path="/subscription" element={<ProtectedRoute requireUser={true}><UserSubscription /></ProtectedRoute>} />
                                <Route path="/history" element={<ProtectedRoute requireUser={true}><HistoryPage /></ProtectedRoute>} />
                                <Route path="/investments" element={<ProtectedRoute requireUser={true}><InvestmentsPage /></ProtectedRoute>} />
                                <Route path="/settings" element={<ProtectedRoute requireUser={true}><SettingsPage /></ProtectedRoute>} />
                                <Route path="/support" element={<ProtectedRoute requireUser={true}><TicketsPage /></ProtectedRoute>} />
                                <Route path="/tickets" element={<ProtectedRoute requireUser={true}><TicketsPage /></ProtectedRoute>} />
                                <Route path="/news" element={<ProtectedRoute requireUser={true}><PlaceholderPage title="News & Calendar" description="Market news and economic calendar" /></ProtectedRoute>} />

                                {/* ── Admin Panel ──────────────────────────── */}
                                <Route path="/admin/login" element={<ProtectedRoute requireAuth={false}><AdminLogin /></ProtectedRoute>} />
                                <Route path="/admin" element={<ProtectedRoute requireAdmin={true}><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
                                <Route path="/admin/users" element={<ProtectedRoute requireAdmin={true}><AdminLayout><UserManagement /></AdminLayout></ProtectedRoute>} />
                                <Route path="/admin/password-reset-management" element={<ProtectedRoute requireAdmin={true}><AdminLayout><PasswordResetManagement /></AdminLayout></ProtectedRoute>} />
                                <Route path="/admin/sessions" element={<ProtectedRoute requireAdmin={true}><AdminLayout><SessionManagement /></AdminLayout></ProtectedRoute>} />
                                <Route path="/admin/notifications" element={<ProtectedRoute requireAdmin={true}><AdminLayout><NotificationManagement /></AdminLayout></ProtectedRoute>} />
                                <Route path="/admin/trades" element={<ProtectedRoute requireAdmin={true}><AdminLayout><TradeManagement /></AdminLayout></ProtectedRoute>} />
                                <Route path="/admin/signals" element={<ProtectedRoute requireAdmin={true}><AdminLayout><SignalManagement /></AdminLayout></ProtectedRoute>} />
                                <Route path="/admin/subscriptions" element={<ProtectedRoute requireAdmin={true}><AdminLayout><SubscriptionManagement /></AdminLayout></ProtectedRoute>} />
                                <Route path="/admin/assets" element={<ProtectedRoute requireAdmin={true}><AdminLayout><AssetManagement /></AdminLayout></ProtectedRoute>} />
                                <Route path="/admin/tickets" element={<ProtectedRoute requireAdmin={true}><AdminLayout><TicketManagement /></AdminLayout></ProtectedRoute>} />
                                <Route path="/admin/transactions" element={<ProtectedRoute requireAdmin={true}><AdminLayout><TransactionManagement /></AdminLayout></ProtectedRoute>} />
                                <Route path="/admin/withdrawal-methods" element={<ProtectedRoute requireAdmin={true}><AdminLayout><WithdrawalManagement /></AdminLayout></ProtectedRoute>} />
                                <Route path="/admin/platform-withdrawal-settings" element={<ProtectedRoute requireAdmin={true}><AdminLayout><PlatformWithdrawalSettings /></AdminLayout></ProtectedRoute>} />
                                <Route path="/admin/deposit-methods" element={<ProtectedRoute requireAdmin={true}><AdminLayout><DepositMethodsManagement /></AdminLayout></ProtectedRoute>} />
                                <Route path="/admin/investments" element={<ProtectedRoute requireAdmin={true}><AdminLayout><AdminInvestmentsPage /></AdminLayout></ProtectedRoute>} />
                                <Route path="/admin/autotrader" element={<ProtectedRoute requireAdmin={true}><AdminLayout><AutoTraderManagement /></AdminLayout></ProtectedRoute>} />
                                <Route path="/admin/trading-settings" element={<ProtectedRoute requireAdmin={true}><AdminLayout><TradingSettings /></AdminLayout></ProtectedRoute>} />
                                <Route path="/admin/analytics" element={<ProtectedRoute requireAdmin={true}><AdminLayout><PlaceholderPage title="Analytics" description="Advanced analytics and reports" /></AdminLayout></ProtectedRoute>} />
                                <Route path="/admin/content" element={<ProtectedRoute requireAdmin={true}><AdminLayout><PlaceholderPage title="Content Management" description="Manage platform content" /></AdminLayout></ProtectedRoute>} />
                                <Route path="/admin/settings" element={<ProtectedRoute requireAdmin={true}><AdminLayout><PlaceholderPage title="Platform Settings" description="Configure platform settings" /></AdminLayout></ProtectedRoute>} />
                                <Route path="/admin/crm-messaging" element={<ProtectedRoute requireAdmin={true}><AdminLayout><CRMMessaging /></AdminLayout></ProtectedRoute>} />
                                <Route path="/admin/api-integrations" element={<ProtectedRoute requireAdmin={true}><AdminLayout><APIIntegrations /></AdminLayout></ProtectedRoute>} />
                                <Route path="/admin/database" element={<ProtectedRoute requireAdmin={true}><AdminLayout><DatabaseManager /></AdminLayout></ProtectedRoute>} />
                                <Route path="/admin/contact-submissions" element={<ProtectedRoute requireAdmin={true}><AdminLayout><ContactSubmissions /></AdminLayout></ProtectedRoute>} />

                              </Routes>
                            </Router>
                            <Toaster position="top-right" richColors closeButton />
                          </NotificationProvider>
                        </SubscriptionProvider>
                      </TicketProvider>
                    </AutoTraderProvider>
                  </TradingProvider>
                </MarketDataProvider>
              </InvestmentProvider>
            </TransactionProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}