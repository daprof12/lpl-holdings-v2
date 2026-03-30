import { useState, useEffect } from 'react';
import { 
  Key, 
  Mail, 
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Send
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';

interface APIConfig {
  sendgrid: {
    apiKey: string;
    fromEmail: string;
    fromName: string;
    enabled: boolean;
  };
  mailgun: {
    apiKey: string;
    domain: string;
    fromEmail: string;
    enabled: boolean;
  };
}

export default function APIIntegrations() {
  const [config, setConfig] = useState<APIConfig>({
    sendgrid: {
      apiKey: '',
      fromEmail: '',
      fromName: '',
      enabled: false,
    },
    mailgun: {
      apiKey: '',
      domain: '',
      fromEmail: '',
      enabled: false,
    },
  });

  const [showSendgridKey, setShowSendgridKey] = useState(false);
  const [showMailgunKey, setShowMailgunKey] = useState(false);
  const [testing, setTesting] = useState<string | null>(null);

  // Load config from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('gross_api_config');
    if (stored) {
      try {
        setConfig(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load API config:', error);
      }
    }
  }, []);

  // Save config to localStorage
  const saveConfig = () => {
    localStorage.setItem('gross_api_config', JSON.stringify(config));
    toast.success('API configuration saved successfully');
  };

  const testSendgrid = async () => {
    setTesting('sendgrid');
    
    setTimeout(() => {
      if (config.sendgrid.apiKey && config.sendgrid.fromEmail) {
        toast.success('SendGrid test successful! (Simulated)');
      } else {
        toast.error('Please fill in all SendGrid credentials');
      }
      setTesting(null);
    }, 2000);
  };

  const testMailgun = async () => {
    setTesting('mailgun');
    
    setTimeout(() => {
      if (config.mailgun.apiKey && config.mailgun.domain && config.mailgun.fromEmail) {
        toast.success('Mailgun test successful! (Simulated)');
      } else {
        toast.error('Please fill in all Mailgun credentials');
      }
      setTesting(null);
    }, 2000);
  };

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">API Integrations</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Configure third-party APIs for Email messaging
        </p>
      </div>

      {/* Info Banner */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">API Keys Security</h3>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              API keys are stored locally in your browser. For production use, implement proper backend storage with encryption. 
              Never expose API keys in client-side code.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* SendGrid Configuration */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">SendGrid</h2>
                  <p className="text-sm text-white/80">Email delivery service</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.sendgrid.enabled}
                  onChange={(e) => setConfig({
                    ...config,
                    sendgrid: { ...config.sendgrid, enabled: e.target.checked }
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white/50"></div>
              </label>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <Label htmlFor="sendgrid-key">API Key *</Label>
              <div className="relative mt-1">
                <Input
                  id="sendgrid-key"
                  type={showSendgridKey ? 'text' : 'password'}
                  value={config.sendgrid.apiKey}
                  onChange={(e) => setConfig({
                    ...config,
                    sendgrid: { ...config.sendgrid, apiKey: e.target.value }
                  })}
                  placeholder="SG.••••••••••••••••••••••••••••••••"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowSendgridKey(!showSendgridKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  {showSendgridKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sendgrid-email">From Email *</Label>
                <Input
                  id="sendgrid-email"
                  type="email"
                  value={config.sendgrid.fromEmail}
                  onChange={(e) => setConfig({
                    ...config,
                    sendgrid: { ...config.sendgrid, fromEmail: e.target.value }
                  })}
                  placeholder="noreply@yourdomain.com"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="sendgrid-name">From Name</Label>
                <Input
                  id="sendgrid-name"
                  value={config.sendgrid.fromName}
                  onChange={(e) => setConfig({
                    ...config,
                    sendgrid: { ...config.sendgrid, fromName: e.target.value }
                  })}
                  placeholder="Gross Trading Platform"
                  className="mt-1"
                />
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={testSendgrid}
              disabled={testing === 'sendgrid'}
              className="w-full"
            >
              {testing === 'sendgrid' ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Test Email
                </>
              )}
            </Button>

            <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
              <a
                href="https://app.sendgrid.com/settings/api_keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Get your SendGrid API key →
              </a>
            </div>
          </div>
        </div>

        {/* Mailgun Configuration */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Mailgun</h2>
                  <p className="text-sm text-white/80">Alternative email service</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.mailgun.enabled}
                  onChange={(e) => setConfig({
                    ...config,
                    mailgun: { ...config.mailgun, enabled: e.target.checked }
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white/50"></div>
              </label>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <Label htmlFor="mailgun-key">API Key *</Label>
              <div className="relative mt-1">
                <Input
                  id="mailgun-key"
                  type={showMailgunKey ? 'text' : 'password'}
                  value={config.mailgun.apiKey}
                  onChange={(e) => setConfig({
                    ...config,
                    mailgun: { ...config.mailgun, apiKey: e.target.value }
                  })}
                  placeholder="key-••••••••••••••••••••••••••••••••"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowMailgunKey(!showMailgunKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  {showMailgunKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mailgun-domain">Domain *</Label>
                <Input
                  id="mailgun-domain"
                  value={config.mailgun.domain}
                  onChange={(e) => setConfig({
                    ...config,
                    mailgun: { ...config.mailgun, domain: e.target.value }
                  })}
                  placeholder="mg.yourdomain.com"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="mailgun-email">From Email *</Label>
                <Input
                  id="mailgun-email"
                  type="email"
                  value={config.mailgun.fromEmail}
                  onChange={(e) => setConfig({
                    ...config,
                    mailgun: { ...config.mailgun, fromEmail: e.target.value }
                  })}
                  placeholder="noreply@yourdomain.com"
                  className="mt-1"
                />
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={testMailgun}
              disabled={testing === 'mailgun'}
              className="w-full"
            >
              {testing === 'mailgun' ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Test Email
                </>
              )}
            </Button>

            <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
              <a
                href="https://app.mailgun.com/app/account/security/api_keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Get your Mailgun API key →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <Button onClick={saveConfig} size="lg">
          <Save className="w-5 h-5 mr-2" />
          Save All Configurations
        </Button>
      </div>

      {/* Usage Guide */}
      <div className="mt-8 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          Integration Guide
        </h3>
        <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">SendGrid Setup:</h4>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Sign up at <a href="https://sendgrid.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">sendgrid.com</a></li>
              <li>Create an API key with full access</li>
              <li>Verify your sender email address or domain</li>
            </ol>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Mailgun Setup:</h4>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Sign up at <a href="https://www.mailgun.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">mailgun.com</a></li>
              <li>Add and verify your domain</li>
              <li>Create an API key for your domain</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}