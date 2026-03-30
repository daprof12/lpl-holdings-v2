import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Copy, CheckCircle2, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { copyToClipboard } from '../../utils/helpers';
import { showSuccessToast, showErrorToast } from '../common/ToastNotifications';

export default function TwoFactorSetup() {
  const navigate = useNavigate();
  const [method, setMethod] = useState<'app' | 'sms' | 'email' | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [step, setStep] = useState<'select' | 'setup' | 'verify' | 'backup'>('select');
  const [copied, setCopied] = useState(false);

  // Simulated QR code data
  const qrCodeSecret = 'JBSWY3DPEHPK3PXP';
  const qrCodeUrl = `otpauth://totp/Gross:user@example.com?secret=${qrCodeSecret}&issuer=Gross`;

  const handleMethodSelect = (selectedMethod: 'app' | 'sms' | 'email') => {
    setMethod(selectedMethod);
    setStep('setup');
    
    // Generate backup codes
    const codes = Array.from({ length: 8 }, () => 
      Math.random().toString(36).substring(2, 10).toUpperCase()
    );
    setBackupCodes(codes);
  };

  const handleVerify = () => {
    if (verificationCode.length !== 6) {
      alert('Please enter a 6-digit code');
      return;
    }

    // For demo, accept any 6-digit code
    if (verificationCode === '123456' || verificationCode.length === 6) {
      setStep('backup');
    } else {
      alert('Invalid code. Please try again.');
    }
  };

  const handleCopyBackupCodes = () => {
    const codesText = backupCodes.join('\n');
    copyToClipboard(codesText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleComplete = () => {
    localStorage.setItem('2faEnabled', 'true');
    navigate('/welcome');
  };

  const handleSkip = () => {
    localStorage.setItem('2faEnabled', 'false');
    navigate('/welcome');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Gross
            </span>
          </Link>
          
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          
          <h1 className="text-3xl md:text-4xl mb-2">Secure Your Account</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Enable two-factor authentication for added security
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          {step === 'select' && (
            <div className="space-y-4">
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                Choose your preferred 2FA method
              </p>
              
              {/* Authenticator App */}
              <button
                onClick={() => handleMethodSelect('app')}
                className="w-full p-6 border-2 border-gray-300 dark:border-slate-600 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Smartphone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg mb-1">Authenticator App</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Use Google Authenticator, Authy, or similar apps
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      ✓ Recommended - Most secure
                    </p>
                  </div>
                </div>
              </button>

              {/* SMS 2FA */}
              <button
                onClick={() => handleMethodSelect('sms')}
                className="w-full p-6 border-2 border-gray-300 dark:border-slate-600 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Smartphone className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg mb-1">SMS Verification</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receive codes via text message
                    </p>
                  </div>
                </div>
              </button>

              {/* Email 2FA */}
              <button
                onClick={() => handleMethodSelect('email')}
                className="w-full p-6 border-2 border-gray-300 dark:border-slate-600 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg mb-1">Email Verification</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receive codes via email
                    </p>
                  </div>
                </div>
              </button>

              <Button variant="outline" className="w-full mt-6" onClick={handleSkip}>
                Skip for Now
              </Button>
            </div>
          )}

          {step === 'setup' && method === 'app' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl mb-4">Scan QR Code</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Scan this QR code with your authenticator app
                </p>
                
                {/* QR Code Placeholder */}
                <div className="w-48 h-48 mx-auto bg-white p-4 rounded-lg border-2 border-gray-300">
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center text-white text-xs">
                    QR Code
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-100 dark:bg-slate-700 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Or enter manually:</p>
                  <p className="font-mono text-sm">{qrCodeSecret}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2"
                    onClick={async () => {
                      const success = await copyToClipboard(qrCodeSecret);
                      if (success) {
                        showSuccessToast('Secret copied to clipboard');
                      } else {
                        showErrorToast('Failed to copy');
                      }
                    }}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Secret
                  </Button>
                </div>
              </div>

              <Button onClick={() => setStep('verify')} className="w-full">
                Continue to Verification
              </Button>
            </div>
          )}

          {step === 'setup' && (method === 'sms' || method === 'email') && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl mb-4">
                  {method === 'sms' ? 'SMS' : 'Email'} Verification Enabled
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  We'll send a verification code to your {method === 'sms' ? 'phone' : 'email'} when you log in
                </p>
              </div>

              <Button onClick={() => setStep('verify')} className="w-full">
                Test with Verification Code
              </Button>
            </div>
          )}

          {step === 'verify' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl mb-2 text-center">Enter Verification Code</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
                  Enter the 6-digit code from your {method === 'app' ? 'authenticator app' : method === 'sms' ? 'phone' : 'email'}
                </p>

                <Input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="000000"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                  className="text-center text-2xl tracking-widest"
                />

                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-xs text-blue-600 dark:text-blue-400 text-center">
                    💡 Demo Mode: Use code <strong>123456</strong>
                  </p>
                </div>
              </div>

              <Button onClick={handleVerify} className="w-full" disabled={verificationCode.length !== 6}>
                Verify Code
              </Button>
            </div>
          )}

          {step === 'backup' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl mb-2 text-center">Save Your Backup Codes</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
                  Store these codes in a safe place. You can use them to access your account if you lose your device.
                </p>

                <div className="p-4 bg-gray-100 dark:bg-slate-700 rounded-lg">
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {backupCodes.map((code, idx) => (
                      <div key={idx} className="font-mono text-sm p-2 bg-white dark:bg-slate-800 rounded text-center">
                        {code}
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleCopyBackupCodes}
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy All Codes
                      </>
                    )}
                  </Button>
                </div>

                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <p className="text-xs text-yellow-600 dark:text-yellow-400">
                    ⚠️ These codes will only be shown once. Make sure to save them securely.
                  </p>
                </div>
              </div>

              <Button onClick={handleComplete} className="w-full">
                I've Saved My Backup Codes
              </Button>
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="w-8 h-1 bg-blue-600 rounded-full" />
          <div className="w-8 h-1 bg-blue-600 rounded-full" />
          <div className="w-8 h-1 bg-blue-600 rounded-full" />
          <div className="w-8 h-1 bg-blue-600 rounded-full" />
          <div className="w-8 h-1 bg-blue-600 rounded-full" />
          <div className="w-8 h-1 bg-blue-600 rounded-full" />
        </div>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
          Step 6 of 7
        </p>
      </motion.div>
    </div>
  );
}