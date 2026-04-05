import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { toast } from 'sonner';
import logoImage from 'figma:asset/3af257502fb25704e3d2cda04e668377af3daafa.png';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, currentUser, logout, isAdmin } = useAuth();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    // Attempt login
    const success = await login(formData.email, formData.password);

    setIsLoading(false);

    if (success) {
      // Check if user is admin
      const storedUser = JSON.parse(localStorage.getItem('gross_current_user') || '{}');

      if (storedUser.role === 'admin') {
        toast.success('Admin login successful!');
        navigate('/admin');
      } else {
        setError('Access denied. Admin credentials required.');
        // Logout non-admin user
        localStorage.removeItem('gross_current_user');
      }
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <a href="/index/" className="inline-flex items-center gap-3 mb-6">
            <img src={logoImage} alt="LPL-Holdings" className="h-12 w-auto" />
            <span className="text-2xl font-bold text-white">LPL-Holdings</span>
          </a>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl text-white">Admin Portal</h1>
          </div>
          <p className="text-gray-400">Sign in to access the admin dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl p-8 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {currentUser ? (
              <motion.div
                key="admin-already-logged-in"
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="p-6 rounded-lg bg-blue-500/10 border border-blue-500/30 text-center"
              >
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-400" />
                </div>
                <p className="text-white font-medium mb-1">Already signed in as</p>
                <p className="text-blue-400 text-sm mb-6 truncate">{currentUser.email}</p>
                
                <div className="space-y-3">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(isAdmin ? '/admin' : '/dashboard');
                    }}
                    className="w-full h-11 bg-blue-500 hover:bg-blue-600 text-white rounded font-semibold text-sm transition-all"
                  >
                    CONTINUE TO DASHBOARD
                  </Button>
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('🔄 Admin switching account...');
                      logout();
                    }}
                    className="w-full h-11 bg-transparent border border-slate-400 hover:bg-white text-slate-200 hover:text-black rounded font-semibold text-[13px] tracking-wider transition-colors relative z-10"
                  >
                    SIGN IN WITH ANOTHER ACCOUNT
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="admin-login-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <>
                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-gray-200">Admin Email</Label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="admin@gross.com"
                        className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-gray-500"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <Label htmlFor="password" className="text-gray-200">Password</Label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="pl-10 pr-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-gray-500"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="remember"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, rememberMe: checked as boolean })
                        }
                      />
                      <label htmlFor="remember" className="text-sm cursor-pointer text-gray-300">
                        Remember me
                      </label>
                    </div>
                    <Link to="/admin/forgot-password" className="text-sm text-blue-400 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                </>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg"
                  >
                    <p className="text-sm text-red-400">{error}</p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5 mr-2" />
                      Sign In to Admin Panel
                    </>
                  )}
                </Button>

                {/* Back to User Login */}
                <p className="text-center text-sm text-gray-400">
                  Not an admin?{' '}
                  <Link to="/login" className="text-blue-400 hover:underline">
                    User Login
                  </Link>
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}