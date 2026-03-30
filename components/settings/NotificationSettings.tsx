import { useState } from 'react';
import { Bell, Mail, MessageSquare } from 'lucide-react';
import { Label } from '../ui/label';

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    // Email Notifications
    emailDeposits: true,
    emailWithdrawals: true,
    emailSignals: true,
    emailNews: false,
    emailPromotions: false,

    // Push Notifications
    pushPriceAlerts: true,
    pushSignals: true,
    pushNews: false,

    // In-App Notifications
    appTrades: true,
    appSignals: true,
    appNews: true,
    appPromotions: false
  });

  const toggleNotification = (key: string) => {
    setNotifications({ ...notifications, [key]: !notifications[key as keyof typeof notifications] });
  };

  const Toggle = ({ enabled }: { enabled: boolean }) => (
    <div className={`w-12 h-6 rounded-full transition-colors ${
      enabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-slate-600'
    }`}>
      <div className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform ${
        enabled ? 'ml-6' : 'ml-0.5'
      }`} />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold">Email Notifications</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold cursor-pointer">Deposits</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Notifications for successful deposits
              </p>
            </div>
            <button onClick={() => toggleNotification('emailDeposits')}>
              <Toggle enabled={notifications.emailDeposits} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold cursor-pointer">Withdrawals</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Notifications for withdrawal requests and completions
              </p>
            </div>
            <button onClick={() => toggleNotification('emailWithdrawals')}>
              <Toggle enabled={notifications.emailWithdrawals} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold cursor-pointer">Trading Signals</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                New trading signals from providers you follow
              </p>
            </div>
            <button onClick={() => toggleNotification('emailSignals')}>
              <Toggle enabled={notifications.emailSignals} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold cursor-pointer">Market News</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Important market news and updates
              </p>
            </div>
            <button onClick={() => toggleNotification('emailNews')}>
              <Toggle enabled={notifications.emailNews} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold cursor-pointer">Promotions</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Special offers and promotions
              </p>
            </div>
            <button onClick={() => toggleNotification('emailPromotions')}>
              <Toggle enabled={notifications.emailPromotions} />
            </button>
          </div>
        </div>
      </div>

      {/* Push Notifications */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <h3 className="text-lg font-semibold">Push Notifications</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold cursor-pointer">Price Alerts</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                When assets reach your target prices
              </p>
            </div>
            <button onClick={() => toggleNotification('pushPriceAlerts')}>
              <Toggle enabled={notifications.pushPriceAlerts} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold cursor-pointer">New Signals</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Real-time trading signals
              </p>
            </div>
            <button onClick={() => toggleNotification('pushSignals')}>
              <Toggle enabled={notifications.pushSignals} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold cursor-pointer">Market News</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Breaking news and updates
              </p>
            </div>
            <button onClick={() => toggleNotification('pushNews')}>
              <Toggle enabled={notifications.pushNews} />
            </button>
          </div>
        </div>
      </div>

      {/* In-App Notifications */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          <h3 className="text-lg font-semibold">In-App Notifications</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold cursor-pointer">Trade Activity</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Show notifications for trade executions
              </p>
            </div>
            <button onClick={() => toggleNotification('appTrades')}>
              <Toggle enabled={notifications.appTrades} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold cursor-pointer">New Signals</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Display new trading signals
              </p>
            </div>
            <button onClick={() => toggleNotification('appSignals')}>
              <Toggle enabled={notifications.appSignals} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold cursor-pointer">News Updates</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Show market news in the app
              </p>
            </div>
            <button onClick={() => toggleNotification('appNews')}>
              <Toggle enabled={notifications.appNews} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold cursor-pointer">Promotions</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Show promotional banners
              </p>
            </div>
            <button onClick={() => toggleNotification('appPromotions')}>
              <Toggle enabled={notifications.appPromotions} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}