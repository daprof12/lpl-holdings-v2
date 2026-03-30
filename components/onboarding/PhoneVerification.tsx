import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Phone, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function PhoneVerification() {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(600);
  const [canResend, setCanResend] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(30);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendCooldown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }

    if (newCode.every(digit => digit !== '') && !isVerifying) {
      handleVerify(newCode.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async (verificationCode?: string) => {
    const codeToVerify = verificationCode || code.join('');
    
    if (codeToVerify.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsVerifying(true);
    
    setTimeout(() => {
      setIsVerifying(false);
      if (codeToVerify === '123456') {
        navigate('/profile-setup');
      } else {
        setError('Invalid verification code. Please try again.');
        setCode(['', '', '', '', '', '']);
        document.getElementById('code-0')?.focus();
      }
    }, 1500);
  };

  const handleResend = () => {
    if (!canResend) return;
    
    setCanResend(false);
    setResendCooldown(30);
    setTimeLeft(600);
    setCode(['', '', '', '', '', '']);
    setError('');
    
    alert('Verification code sent to your phone!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
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
            <Phone className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          
          <h1 className="text-3xl mb-2">Verify Your Phone</h1>
          <p className="text-gray-600 dark:text-gray-400">
            We sent a 6-digit code to your phone
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            Code expires in {formatTime(timeLeft)}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <div className="flex gap-2 justify-center mb-6">
            {code.map((digit, index) => (
              <Input
                key={index}
                id={`code-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-2xl"
                autoFocus={index === 0}
              />
            ))}
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
            >
              <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
            </motion.div>
          )}

          <Button
            onClick={() => handleVerify()}
            className="w-full mb-4"
            size="lg"
            disabled={code.some(digit => !digit) || isVerifying}
          >
            {isVerifying ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Verifying...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Verify Phone
              </>
            )}
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Didn't receive the code?
            </p>
            <Button
              variant="ghost"
              onClick={handleResend}
              disabled={!canResend}
              className="text-blue-600 hover:text-blue-700"
            >
              {canResend ? 'Resend Code' : `Resend in ${resendCooldown}s`}
            </Button>
          </div>

          <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-xs text-blue-600 dark:text-blue-400 text-center">
              💡 Demo Mode: Use code <strong>123456</strong> to verify
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="w-8 h-1 bg-blue-600 rounded-full" />
          <div className="w-8 h-1 bg-blue-600 rounded-full" />
          <div className="w-8 h-1 bg-blue-600 rounded-full" />
          <div className="w-8 h-1 bg-gray-300 dark:bg-slate-600 rounded-full" />
          <div className="w-8 h-1 bg-gray-300 dark:bg-slate-600 rounded-full" />
        </div>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
          Step 3 of 7
        </p>
      </motion.div>
    </div>
  );
}