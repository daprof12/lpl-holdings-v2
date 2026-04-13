import { Eye, EyeOff, Globe, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/AuthContext';

const imgDefaultLogo = "/logo.png";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !firstName || !lastName) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    try {
      const success = await signup({
        email,
        password,
        firstName,
        lastName,
        role
      });

      if (success) {
        toast.success('Registration successful! please wait while we promote your account.');
        // Navigate to login with pre-filled email
        navigate(`/login?email=${encodeURIComponent(email)}`);
      } else {
        setError('An account with this email already exists');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(`Registration failed: ${(err as any).message || 'Please try again.'}`);
    } finally {
      setIsLoading(false);
    }
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

      {/* Signup Card */}
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

        {/* Back to Login */}
        <Link 
          to="/login"
          className="flex items-center gap-2 text-sm mb-6 hover:text-white transition-colors"
          style={{ color: '#9ca3af' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>

        {/* Heading */}
        <h1
          className="text-center text-[28px] font-semibold mb-8"
          style={{ color: '#4A9EFF' }}
        >
          Create Account
        </h1>

        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Names Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-normal mb-2" style={{ color: '#9ca3af' }}>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full h-11 rounded border px-4 text-sm focus:outline-none focus:ring-2 transition-all bg-white border-[#3d4a5c] text-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-normal mb-2" style={{ color: '#9ca3af' }}>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full h-11 rounded border px-4 text-sm focus:outline-none focus:ring-2 transition-all bg-white border-[#3d4a5c] text-slate-900"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-normal mb-2" style={{ color: '#9ca3af' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 rounded border px-4 text-sm focus:outline-none focus:ring-2 transition-all bg-[#1a2332] border-[#3d4a5c] text-white"
            />
          </div>

          {/* Role Field */}
          <div>
            <label className="block text-sm font-normal mb-2" style={{ color: '#9ca3af' }}>Account Type</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'user' | 'admin')}
              className="w-full h-11 rounded border px-4 text-sm focus:outline-none focus:ring-2 transition-all bg-white border-[#3d4a5c] text-slate-900"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-normal mb-2" style={{ color: '#9ca3af' }}>Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 rounded border px-4 pr-12 text-sm focus:outline-none focus:ring-2 transition-all bg-[#1a2332] border-[#3d4a5c] text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
                style={{ color: '#9ca3af' }}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded text-sm font-medium bg-red-500/10 text-red-500 border border-red-500/30">
              {error}
            </div>
          )}

          {/* Signup Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full h-12 rounded font-semibold text-base transition-all uppercase tracking-wide bg-[#4A9EFF] text-white ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
          >
            {isLoading ? 'Creating Account...' : 'SIGN UP'}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
