import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import imgHeroBg from 'figma:asset/90ccbf9bfde00433ded2c7449f3d4bade12cbb55.png';

const subNavItems = [
  { label: 'Range of Products',   path: '/range-of-products' },
  { label: 'Forex CFDs',          path: '/forex-cfd' },
  { label: 'Commodities CFDs',    path: '/commodities-cfd' },
  { label: 'Indices CFDs',        path: '/indices-cfd' },
  { label: 'Bonds CFDs',          path: '/bonds-cfd',    active: true },
  { label: 'Cryptocurrency CFDs', path: '/crypto-cfd' },
  { label: 'Stocks CFDs',         path: '/stocks-cfd' },
  { label: 'Futures CFDs',        path: '/futures-cfd' },
];

export default function BondsHero() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex items-center justify-center" style={{ minHeight: 478 }}>
        <div className="absolute inset-0 bg-black">
          <img
            src={imgHeroBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-top"
            style={{ opacity: 0.55 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80" />
        </div>

        <div className="relative z-10 text-center px-4 pt-28 pb-20 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Bonds CFDs
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Trade the world's most popular and liquid fixed income securities from the United
            States, the UK, Europe and Japan on MetaTrader 4 and 5.
          </p>
          <Link
            to="/login"
            className="inline-block px-10 py-4 rounded-md font-bold text-black text-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#34e834' }}
          >
            Start Trading
          </Link>
        </div>
      </section>

      {/* ── Sub-nav ── */}
      <nav className="bg-[#08080a] border-b border-white/10 sticky top-20 z-40">
        <div className="max-w-6xl mx-auto px-6">
          <ul className="flex items-center gap-0 overflow-x-auto scrollbar-none">
            {subNavItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => navigate(item.path)}
                  className="block px-4 py-4 text-sm font-bold whitespace-nowrap transition-colors cursor-pointer"
                  style={{ color: item.active ? '#34e834' : theme === 'dark' ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.45)' }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}