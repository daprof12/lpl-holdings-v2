import { Eye, EyeOff, RotateCcw, Globe, X, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/AuthContext';
const imgDefaultLogo = "/logo.png";

interface PasswordResetRequest {
  id: string;
  email: string;
  timestamp: number;
  status: 'pending' | 'code_sent' | 'completed' | 'rejected';
  recoveryCode?: string;
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, currentUser, logout, isAdmin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Forgot password modal states
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState<'email' | 'code' | 'newPassword'>('email');
  const [resetEmail, setResetEmail] = useState('');
  const [recoveryCode, setRecoveryCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalError, setModalError] = useState('');
  const [modalLoading, setModalLoading] = useState(false);

  // Check for email parameter from URL (from registration redirect)
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const emailParam = searchParams.get('email');

    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
      toast.success('Account created! Please log in with your credentials.');
      navigate('/login', { replace: true });
    }
  }, [location.search, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email');
      return;
    }

    if (!password) {
      setError('Please enter your password');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Attempt login
    const success = await login(email, password);

    setIsLoading(false);

    if (success) {
      const storedUser = JSON.parse(localStorage.getItem('gross_current_user') || '{}');

      if (storedUser.role === 'admin') {
        toast.success('Welcome back, Admin!');
        navigate('/admin');
      } else {
        toast.success('Login successful!');
        navigate('/dashboard');
      }
    } else {
      setError('Incorrect email or password. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPasswordModal(true);
    setForgotPasswordStep('email');
    setResetEmail('');
    setRecoveryCode('');
    setNewPassword('');
    setConfirmPassword('');
    setModalError('');
  };

  const handleRequestPasswordReset = async () => {
    setModalError('');

    if (!resetEmail) {
      setModalError('Please enter your email');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetEmail)) {
      setModalError('Please enter a valid email address');
      return;
    }

    // Check if user exists
    const users = JSON.parse(localStorage.getItem('gross_users') || '[]');
    const userExists = users.find((u: any) => u.email === resetEmail);

    if (!userExists) {
      setModalError('No account found with this email address');
      return;
    }

    setModalLoading(true);

    // Create password reset request
    const resetRequests = JSON.parse(localStorage.getItem('gross_password_reset_requests') || '[]');
    const newRequest: PasswordResetRequest = {
      id: `reset_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: resetEmail,
      timestamp: Date.now(),
      status: 'pending'
    };

    resetRequests.push(newRequest);
    localStorage.setItem('gross_password_reset_requests', JSON.stringify(resetRequests));

    // Dispatch storage event for cross-tab sync
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'gross_password_reset_requests',
      newValue: JSON.stringify(resetRequests)
    }));

    setTimeout(() => {
      setModalLoading(false);
      toast.success('Password reset request submitted. Please wait for admin approval.');
      setForgotPasswordStep('code');
    }, 1000);
  };

  const handleVerifyCode = async () => {
    if (modalLoading) return;
    setModalError('');

    if (!recoveryCode) {
      setModalError('Please enter the recovery code');
      return;
    }

    setModalLoading(true);

    // Check if recovery code is valid
    const resetRequests = JSON.parse(localStorage.getItem('gross_password_reset_requests') || '[]');
    const request = resetRequests.find(
      (r: PasswordResetRequest) =>
        r.email === resetEmail &&
        r.recoveryCode === recoveryCode &&
        r.status === 'code_sent'
    );

    setTimeout(() => {
      setModalLoading(false);

      if (request) {
        setForgotPasswordStep('newPassword');
        setModalError('');
      } else {
        setModalError('Invalid or expired recovery code. Please request a new one.');
      }
    }, 1000);
  };

  const handleSetNewPassword = async () => {
    if (modalLoading) return;
    setModalError('');

    if (!newPassword) {
      setModalError('Please enter a new password');
      return;
    }

    if (!confirmPassword) {
      setModalError('Please confirm your password');
      return;
    }

    if (newPassword !== confirmPassword) {
      setModalError('Passwords do not match');
      return;
    }

    // Password validation
    if (newPassword.length < 8) {
      setModalError('Password must be at least 8 characters');
      return;
    }

    if (!/\d/.test(newPassword)) {
      setModalError('Password must contain at least one number');
      return;
    }

    if (!/[a-zA-Z]/.test(newPassword)) {
      setModalError('Password must contain at least one letter');
      return;
    }

    setModalLoading(true);

    // Update user password
    const users = JSON.parse(localStorage.getItem('gross_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.email === resetEmail);

    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      localStorage.setItem('gross_users', JSON.stringify(users));

      // Mark reset request as completed
      const resetRequests = JSON.parse(localStorage.getItem('gross_password_reset_requests') || '[]');
      const requestIndex = resetRequests.findIndex(
        (r: PasswordResetRequest) => r.email === resetEmail && r.status === 'code_sent'
      );

      if (requestIndex !== -1) {
        resetRequests[requestIndex].status = 'completed';
        localStorage.setItem('gross_password_reset_requests', JSON.stringify(resetRequests));
      }

      // Dispatch storage event for cross-tab sync
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'gross_users',
        newValue: JSON.stringify(users)
      }));

      setTimeout(() => {
        setModalLoading(false);
        setShowForgotPasswordModal(false);
        toast.success('Password reset successfully! You can now log in with your new password.');
        setResetEmail('');
        setRecoveryCode('');
        setNewPassword('');
        setConfirmPassword('');
      }, 1000);
    } else {
      setModalLoading(false);
      setModalError('User not found. Please try again.');
    }
  };

  const closeModal = () => {
    setShowForgotPasswordModal(false);
    setForgotPasswordStep('email');
    setResetEmail('');
    setRecoveryCode('');
    setNewPassword('');
    setConfirmPassword('');
    setModalError('');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{ background: '#2d3a4a' }}
    >
      {/* Language Selector */}
      <div className="absolute top-6 right-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer">
        <Globe className="w-5 h-5" />
        <span className="text-base font-medium">EN</span>
      </div>

      {/* Login Card */}
      <div
        className="w-full max-w-[420px] mx-4 rounded-lg p-10"
        style={{ background: '#1a2332' }}
      >
        {/* Logo */}
        <div
          className="flex justify-center mb-8 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => window.location.href = '/landing/'}
        >
          <img
            src={imgDefaultLogo}
            alt="LPL-Premium"
            className="h-10 w-auto brightness-0 invert"
          />
        </div>

        {/* Sign in heading */}
        <h1
          className="text-center text-[28px] font-semibold mb-8"
          style={{ color: '#4A9EFF' }}
        >
          Sign in
        </h1>

        {/* Already Signed In / Login Form Container */}
        <AnimatePresence mode="popLayout">
          {currentUser ? (
            <motion.div
              key="already-logged-in"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mb-8 p-6 rounded-lg bg-blue-500/10 border border-blue-500/30 text-center"
            >
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-blue-400" />
              </div>
              <p className="text-white font-medium mb-1">Already signed in as</p>
              <p className="text-blue-400 text-sm mb-6 truncate">{currentUser.email}</p>

              <div className="space-y-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(isAdmin ? '/admin' : '/dashboard');
                  }}
                  className="w-full h-11 bg-blue-500 hover:bg-blue-600 text-white rounded font-semibold text-sm transition-all shadow-lg shadow-blue-500/20"
                >
                  CONTINUE TO DASHBOARD
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('🔄 User switching account, logging out...');
                    logout();
                  }}
                  className="w-full h-11 bg-transparent border border-gray-400 hover:bg-white text-gray-200 hover:text-black rounded font-semibold text-[13px] tracking-wider transition-colors relative z-10"
                >
                  SIGN IN WITH ANOTHER ACCOUNT
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="login-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-normal mb-2"
                  style={{ color: '#9ca3af' }}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 rounded border px-4 text-base focus:outline-none focus:ring-2 transition-all"
                  style={{
                    background: '#1a2332',
                    borderColor: '#3d4a5c',
                    color: '#ffffff'
                  }}
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-normal mb-2"
                  style={{ color: '#9ca3af' }}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 rounded border px-4 pr-12 text-base focus:outline-none focus:ring-2 transition-all"
                    style={{
                      background: '#1a2332',
                      borderColor: '#3d4a5c',
                      color: '#ffffff'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: '#9ca3af' }}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="flex items-center gap-1.5 text-sm font-normal hover:underline transition-colors"
                  style={{ color: '#4A9EFF' }}
                >
                  <RotateCcw className="w-4 h-4" />
                  Forgot your password?
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div
                  className="p-3 rounded text-sm font-medium"
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    color: '#ef4444',
                    border: '1px solid rgba(239, 68, 68, 0.3)'
                  }}
                >
                  {error}
                </div>
              )}

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading || !email || !password}
                className={`w-full h-12 rounded font-semibold text-base transition-all uppercase tracking-wide ${isLoading || !email || !password
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:opacity-90'
                  }`}
                style={{
                  background: '#4A9EFF',
                  color: '#ffffff'
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Loading...
                  </div>
                ) : (
                  'SIGN IN'
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotPasswordModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="rounded-lg p-8 max-w-[450px] w-full"
              style={{ background: '#1a2332' }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold" style={{ color: '#4A9EFF' }}>
                  {forgotPasswordStep === 'email' && 'Reset Password'}
                  {forgotPasswordStep === 'code' && 'Enter Recovery Code'}
                  {forgotPasswordStep === 'newPassword' && 'Set New Password'}
                </h2>
                <button
                  type="button"
                  onClick={closeModal}
                  className="transition-colors"
                  style={{ color: '#9ca3af' }}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Step 1: Email */}
              {forgotPasswordStep === 'email' && (
                <div className="space-y-5">
                  <p className="text-sm" style={{ color: '#9ca3af' }}>
                    Enter your email address to request a password reset. An admin will review your request and send you a recovery code.
                  </p>
                  <div>
                    <label
                      htmlFor="resetEmail"
                      className="block text-sm font-normal mb-2"
                      style={{ color: '#9ca3af' }}
                    >
                      Email Address
                    </label>
                    <input
                      id="resetEmail"
                      type="email"
                      placeholder="you@example.com"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="w-full h-12 rounded border px-4 text-base focus:outline-none focus:ring-2 transition-all"
                      style={{
                        background: '#1a2332',
                        borderColor: '#3d4a5c',
                        color: '#ffffff'
                      }}
                    />
                  </div>

                  {modalError && (
                    <div
                      className="p-3 rounded text-sm font-medium"
                      style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: '#ef4444',
                        border: '1px solid rgba(239, 68, 68, 0.3)'
                      }}
                    >
                      {modalError}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleRequestPasswordReset}
                    disabled={modalLoading || !resetEmail}
                    className={`w-full h-12 rounded font-semibold text-base transition-all uppercase tracking-wide ${modalLoading || !resetEmail
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:opacity-90'
                      }`}
                    style={{
                      background: '#4A9EFF',
                      color: '#ffffff'
                    }}
                  >
                    {modalLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </div>
                    ) : (
                      'REQUEST RESET'
                    )}
                  </button>
                </div>
              )}

              {/* Step 2: Recovery Code */}
              {forgotPasswordStep === 'code' && (
                <div className="space-y-5">
                  <p className="text-sm" style={{ color: '#9ca3af' }}>
                    Your request has been submitted. Please wait for admin approval. Once approved, enter the recovery code sent by the admin.
                  </p>
                  <div>
                    <label
                      htmlFor="recoveryCode"
                      className="block text-sm font-normal mb-2"
                      style={{ color: '#9ca3af' }}
                    >
                      Recovery Code
                    </label>
                    <input
                      id="recoveryCode"
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={recoveryCode}
                      onChange={(e) => setRecoveryCode(e.target.value)}
                      className="w-full h-12 rounded border px-4 text-base focus:outline-none focus:ring-2 transition-all uppercase tracking-widest text-center"
                      style={{
                        background: '#1a2332',
                        borderColor: '#3d4a5c',
                        color: '#ffffff'
                      }}
                      maxLength={6}
                    />
                  </div>

                  {modalError && (
                    <div
                      className="p-3 rounded text-sm font-medium"
                      style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: '#ef4444',
                        border: '1px solid rgba(239, 68, 68, 0.3)'
                      }}
                    >
                      {modalError}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleVerifyCode}
                    disabled={modalLoading || !recoveryCode}
                    className={`w-full h-12 rounded font-semibold text-base transition-all uppercase tracking-wide ${modalLoading || !recoveryCode
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:opacity-90'
                      }`}
                    style={{
                      background: '#4A9EFF',
                      color: '#ffffff'
                    }}
                  >
                    {modalLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Verifying...
                      </div>
                    ) : (
                      'VERIFY CODE'
                    )}
                  </button>
                </div>
              )}

              {/* Step 3: New Password */}
              {forgotPasswordStep === 'newPassword' && (
                <div className="space-y-5">
                  <p className="text-sm" style={{ color: '#9ca3af' }}>
                    Enter your new password. Make sure it's strong and secure.
                  </p>
                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-normal mb-2"
                      style={{ color: '#9ca3af' }}
                    >
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        id="newPassword"
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full h-12 rounded border px-4 pr-12 text-base focus:outline-none focus:ring-2 transition-all"
                        style={{
                          background: '#1a2332',
                          borderColor: '#3d4a5c',
                          color: '#ffffff'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                        style={{ color: '#9ca3af' }}
                      >
                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-normal mb-2"
                      style={{ color: '#9ca3af' }}
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full h-12 rounded border px-4 pr-12 text-base focus:outline-none focus:ring-2 transition-all"
                        style={{
                          background: '#1a2332',
                          borderColor: '#3d4a5c',
                          color: '#ffffff'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                        style={{ color: '#9ca3af' }}
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {modalError && (
                    <div
                      className="p-3 rounded text-sm font-medium"
                      style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: '#ef4444',
                        border: '1px solid rgba(239, 68, 68, 0.3)'
                      }}
                    >
                      {modalError}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleSetNewPassword}
                    disabled={modalLoading || !newPassword || !confirmPassword}
                    className={`w-full h-12 rounded font-semibold text-base transition-all uppercase tracking-wide ${modalLoading || !newPassword || !confirmPassword
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:opacity-90'
                      }`}
                    style={{
                      background: '#4A9EFF',
                      color: '#ffffff'
                    }}
                  >
                    {modalLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Updating...
                      </div>
                    ) : (
                      'RESET PASSWORD'
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
