import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
const logoImage = "/logo.png";

export default function Header() {
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const solutionsMenu = [
    { label: 'Range of Products',   link: '/demo'                    },
    { label: 'Forex CFDs',          link: '/forex-cfd'               },
    { label: 'Indices CFDs',        link: '/indices-cfd'             },
    { label: 'Commodities CFDs',    link: '/commodities-cfd'         },
    { label: 'Bonds CFDs',          link: '/bonds-cfd'               },
    { label: 'Cryptocurrency CFDs', link: '/crypto-cfd'              },
    { label: 'Stocks CFDs',         link: '/stocks-cfd'              },
    { label: 'Futures CFDs',        link: '/futures-cfd'             },
    { label: 'Trading Bot',         link: '/trading-bot'             },
    { label: 'Hybrid Trading Software', link: '/automated-forex-software' },
  ];

  const companyMenu = [
    { label: 'About Us',               link: '/about'          },
    { label: 'Why Choose Us',          link: '/why-choose-us'  },
    { label: 'Insurance & Regulation', link: '/partners'       },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 transition-colors duration-300"
      style={{ backgroundColor: theme === 'dark' ? '#08080a' : '#ffffff', borderColor: theme === 'dark' ? '#1e293b' : '#e5e7eb' }}
    >
      <div className="max-w-[2560px] mx-auto px-6 lg:px-14">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logoImage} alt="LPL-Premium" className={`h-12 w-auto ${theme === 'dark' ? 'brightness-0 invert' : ''}`} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">

            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button className="flex items-center gap-1 px-4 py-2.5 rounded-lg transition-colors text-white hover:bg-white/10">
                <span className="font-medium">Solutions</span>
                <ChevronDown className={`w-4 h-4 transform transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} />
              </button>

              {solutionsOpen && (
                <div className="absolute top-full left-0 pt-2 w-96">
                  <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden">
                    <div className="p-2">
                      {solutionsMenu.map((item, index) => (
                        <Link
                          key={index}
                          to={item.link}
                          className="flex items-center p-4 rounded-xl hover:bg-slate-800 transition-colors group"
                        >
                          <div className="text-white font-medium group-hover:text-[#25AABE] transition-colors">
                            {item.label}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Company Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCompanyOpen(true)}
              onMouseLeave={() => setCompanyOpen(false)}
            >
              <button className="flex items-center gap-1 px-4 py-2.5 rounded-lg transition-colors text-white hover:bg-white/10">
                <span className="font-medium">Company</span>
                <ChevronDown className={`w-4 h-4 transform transition-transform ${companyOpen ? 'rotate-180' : ''}`} />
              </button>

              {companyOpen && (
                <div className="absolute top-full left-0 pt-2 w-56">
                  <div className="bg-slate-900 rounded-xl shadow-2xl border border-slate-800 overflow-hidden">
                    <div className="p-2">
                      {companyMenu.map((item, index) => (
                        <Link
                          key={index}
                          to={item.link}
                          className="block px-4 py-3 rounded-lg text-white hover:bg-slate-800 transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pricing */}
            <Link
              to="/pricing"
              className="px-4 py-2.5 rounded-lg font-medium transition-colors text-white hover:bg-white/10"
            >
              Pricing
            </Link>

            {/* Help Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setHelpOpen(true)}
              onMouseLeave={() => setHelpOpen(false)}
            >
              <button className="flex items-center gap-1 px-4 py-2.5 rounded-lg transition-colors text-white hover:bg-white/10">
                <span className="font-medium">Help</span>
                <ChevronDown className={`w-4 h-4 transform transition-transform ${helpOpen ? 'rotate-180' : ''}`} />
              </button>

              {helpOpen && (
                <div className="absolute top-full left-0 pt-2 w-56">
                  <div className="bg-slate-900 rounded-xl shadow-2xl border border-slate-800 overflow-hidden">
                    <div className="p-2">
                      <Link to="/support" className="block px-4 py-3 rounded-lg text-white hover:bg-slate-800 transition-colors">
                        Support Center
                      </Link>
                      <Link to="/docs" className="block px-4 py-3 rounded-lg text-white hover:bg-slate-800 transition-colors">
                        Documentation
                      </Link>
                      <Link to="/contact" className="block px-4 py-3 rounded-lg text-white hover:bg-slate-800 transition-colors">
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Affiliate Program */}
            <Link
              to="/affiliate"
              className="px-4 py-2.5 rounded-lg font-medium transition-colors text-white hover:bg-white/10"
            >
              Affiliate Program
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-5 py-2.5 rounded-lg font-medium transition-colors border border-slate-700 text-white hover:bg-white/10"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 rounded-lg font-medium bg-gradient-to-r from-[#1fa5ca] to-[#25AABE] text-white hover:opacity-90 transition-opacity"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2.5 rounded-lg font-medium transition-colors border border-slate-700 text-white hover:bg-white/10"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2.5 rounded-lg font-medium bg-gradient-to-r from-[#1fa5ca] to-[#25AABE] text-white hover:opacity-90 transition-opacity border border-[#23a8c1]"
                >
                  Sign up
                </Link>
              </>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg transition-all duration-300 hover:bg-white/10"
              style={{ color: theme === 'dark' ? '#ffffff' : '#1f2937' }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-800">
            <nav className="space-y-2">
              {/* Solutions */}
              <div>
                <button
                  onClick={() => setSolutionsOpen(!solutionsOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-white hover:bg-white/10"
                >
                  <span className="font-medium">Solutions</span>
                  <ChevronDown className={`w-4 h-4 transform transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} />
                </button>
                {solutionsOpen && (
                  <div className="mt-2 space-y-1 pl-4">
                    {solutionsMenu.map((item, index) => (
                      <Link
                        key={index}
                        to={item.link}
                        className="flex items-center px-4 py-2 rounded-lg text-gray-300 hover:bg-white/10"
                      >
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Company */}
              <div>
                <button
                  onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-white hover:bg-white/10"
                >
                  <span className="font-medium">Company</span>
                  <ChevronDown className={`w-4 h-4 transform transition-transform ${mobileCompanyOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileCompanyOpen && (
                  <div className="mt-2 space-y-1 pl-4">
                    {companyMenu.map((item, index) => (
                      <Link
                        key={index}
                        to={item.link}
                        className="block px-4 py-2 rounded-lg text-gray-300 hover:bg-white/10"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Pricing */}
              <Link
                to="/pricing"
                className="block px-4 py-3 rounded-lg font-medium text-white hover:bg-white/10"
              >
                Pricing
              </Link>

              {/* Help */}
              <Link
                to="/support"
                className="block px-4 py-3 rounded-lg font-medium text-white hover:bg-white/10"
              >
                Help
              </Link>

              {/* Affiliate Program */}
              <Link
                to="/affiliate"
                className="block px-4 py-3 rounded-lg font-medium text-white hover:bg-white/10"
              >
                Affiliate Program
              </Link>

              <div className="border-t border-slate-800 my-4"></div>

              {/* Auth Actions */}
              {currentUser ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-3 rounded-lg font-medium text-white hover:bg-white/10"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 rounded-lg font-medium bg-gradient-to-r from-[#1fa5ca] to-[#25AABE] text-white"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-3 rounded-lg font-medium border border-slate-700 text-white hover:bg-white/10"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-3 rounded-lg font-medium bg-gradient-to-r from-[#1fa5ca] to-[#25AABE] text-white text-center"
                  >
                    Sign up
                  </Link>
                </>
              )}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-full px-4 py-3 rounded-lg font-medium text-left hover:bg-white/10 flex items-center gap-2"
                style={{ color: theme === 'dark' ? '#ffffff' : '#1f2937' }}
              >
                {theme === 'dark' ? <><Moon className="w-4 h-4" /> Dark Mode</> : <><Sun className="w-4 h-4" /> Light Mode</>}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}