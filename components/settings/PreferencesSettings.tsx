import { useState } from 'react';
import { Globe, Moon, Sun, Clock, DollarSign } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { showSuccessToast } from '../common/ToastNotifications';

export default function PreferencesSettings() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [currency, setCurrency] = useState('USD');
  const [timezone, setTimezone] = useState('America/New_York');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [numberFormat, setNumberFormat] = useState('1,234.56');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Save preferences logic here (would typically save to backend/localStorage)
    showSuccessToast('Preferences saved successfully!');
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Appearance */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'
          }`}>
            {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="text-lg font-semibold">Appearance</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Customize how Gross looks on your device
            </p>
          </div>
        </div>

        <div>
          <Label className="mb-3 block">Theme</Label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => theme === 'dark' && toggleTheme()}
              className={`p-4 rounded-lg border-2 transition-all ${
                theme === 'light'
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-slate-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white border border-gray-300 rounded-lg flex items-center justify-center">
                  <Sun className="w-5 h-5 text-gray-900" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Light</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Clean and bright
                  </div>
                </div>
              </div>
            </button>

            <button
              onClick={() => theme === 'light' && toggleTheme()}
              className={`p-4 rounded-lg border-2 transition-all ${
                theme === 'dark'
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-slate-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                  <Moon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Dark</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Easy on the eyes
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Language & Region */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold">Language & Region</h3>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="language">Display Language</Label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="zh">中文</option>
              <option value="ja">日本語</option>
              <option value="ko">한국어</option>
              <option value="ar">العربية</option>
            </select>
          </div>

          <div>
            <Label htmlFor="timezone">Timezone</Label>
            <div className="relative mt-2">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                id="timezone"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="Europe/London">London (GMT)</option>
                <option value="Europe/Paris">Paris (CET)</option>
                <option value="Asia/Tokyo">Tokyo (JST)</option>
                <option value="Asia/Shanghai">Shanghai (CST)</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="currency">Default Currency</Label>
            <div className="relative mt-2">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="JPY">JPY - Japanese Yen</option>
                <option value="AUD">AUD - Australian Dollar</option>
                <option value="CAD">CAD - Canadian Dollar</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Format Settings */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Format Settings</h3>

        <div className="space-y-6">
          <div>
            <Label htmlFor="dateFormat">Date Format</Label>
            <select
              id="dateFormat"
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY (12/31/2024)</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY (31/12/2024)</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD (2024-12-31)</option>
              <option value="DD MMM YYYY">DD MMM YYYY (31 Dec 2024)</option>
            </select>
          </div>

          <div>
            <Label htmlFor="numberFormat">Number Format</Label>
            <select
              id="numberFormat"
              value={numberFormat}
              onChange={(e) => setNumberFormat(e.target.value)}
              className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            >
              <option value="1,234.56">1,234.56 (Comma separator)</option>
              <option value="1.234,56">1.234,56 (Period separator)</option>
              <option value="1 234.56">1 234.56 (Space separator)</option>
            </select>
          </div>

          <div>
            <Label htmlFor="timeFormat">Time Format</Label>
            <select
              id="timeFormat"
              className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            >
              <option value="12h">12-hour (2:30 PM)</option>
              <option value="24h">24-hour (14:30)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Display Settings */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Display Preferences</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold">Show Balance in Header</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Display your account balance in the navigation
              </p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold">Compact Mode</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Show more information in less space
              </p>
            </div>
            <input type="checkbox" className="w-4 h-4 rounded" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold">Animations</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enable interface animations
              </p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-semibold">Sound Effects</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Play sounds for trades and notifications
              </p>
            </div>
            <input type="checkbox" className="w-4 h-4 rounded" />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button>Save Preferences</Button>
      </div>
    </form>
  );
}