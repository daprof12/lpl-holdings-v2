import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
const logoImage = "/logo.png";
import tradingViewLogo from 'figma:asset/a400f218ef6d3589669ef1349f01498d3fd3b2ea.png';

// ── Live Trading Time widget ──────────────────────────────────────────────────

function TradingTime() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Forex markets open Mon 00:00 UTC → Fri 22:00 UTC (approx)
  const day = now.getUTCDay(); // 0=Sun … 6=Sat
  const hour = now.getUTCHours();
  const isOpen =
    (day === 1 && hour >= 0) ||
    (day > 1 && day < 5) ||
    (day === 5 && hour < 22);

  const pad = (n: number) => String(n).padStart(2, '0');
  const timeStr = `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())} UTC`;

  return (
    <li>
      <Link to="/trading-hours" className="flex flex-col gap-1 group">
        <span className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-0.5 group-hover:text-white transition-colors">
          Trading Time
        </span>
        <span className="text-white text-sm font-mono tracking-wide group-hover:text-[#34e834] transition-colors">{timeStr}</span>
        <span className="flex items-center gap-1.5 text-xs">
          <span
            className="inline-block w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: isOpen ? '#34e834' : '#ef4444' }}
          />
          <span style={{ color: isOpen ? '#34e834' : '#ef4444' }}>
            {isOpen ? 'Markets Open' : 'Markets Closed'}
          </span>
        </span>
      </Link>
    </li>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#08080a] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src={logoImage} alt="LPL-Premium" className="h-12 w-auto" />
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              Automate your trading with AI-powered trading bots. Smart, simple, and profitable.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.tradingview.com/chart/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:opacity-80 transition-opacity"
                aria-label="TradingView Chart"
              >
                <img src={tradingViewLogo} alt="TradingView" className="h-10 w-auto" />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-white font-bold mb-4">Solutions</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/demo" className="text-gray-400 hover:text-white transition-colors">
                  Range of Products
                </Link>
              </li>
              <li>
                <Link to="/trading-view" className="text-gray-400 hover:text-white transition-colors">
                  Trading View
                </Link>
              </li>
              <li>
                <Link to="/auto-trader" className="text-gray-400 hover:text-white transition-colors">
                  Trading Bot
                </Link>
              </li>
              <li>
                <Link to="/automated-forex-software" className="text-gray-400 hover:text-white transition-colors">
                  Hybrid Trading
                </Link>
              </li>
              <li>
                <Link to="/cybersecurity" className="text-gray-400 hover:text-white transition-colors">
                  Cybersecurity
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/affiliate" className="text-gray-400 hover:text-white transition-colors">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/why-choose-us" className="text-gray-400 hover:text-white transition-colors">
                  Why Choose Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/support" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-gray-400 hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <TradingTime />
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} LPL Premium. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-slate-900 rounded-lg border border-slate-800">
            <p className="text-gray-400 text-xs leading-relaxed">
              <strong className="text-gray-300">Risk Warning:</strong> Trading foreign exchange and contracts for differences on margin carries a high level of risk, and may not be suitable for all investors. 
              The high degree of leverage can work against you as well as for you. Before deciding to trade foreign exchange you should carefully consider your investment objectives, 
              level of experience, and risk appetite. The possibility exists that you could sustain a loss of some or all of your initial investment and therefore you should not invest 
              money that you cannot afford to lose. You should be aware of all the risks associated with foreign exchange trading, and seek advice from an independent financial advisor 
              if you have any doubts.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}