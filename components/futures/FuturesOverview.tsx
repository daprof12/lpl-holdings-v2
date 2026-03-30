import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import imgFuturesIcon from 'figma:asset/f16315421ae217e214668fdaaea9611dbb4d91dc.png';
import svgPaths from '../../imports/svg-avgijm5l4n';
import { futuresIndexes } from '../../data/futuresData';

function CheckIcon() {
  return (
    <svg fill="none" viewBox="0 0 14.5455 15" width="15" height="15" className="shrink-0 mt-0.5">
      <g clipPath="url(#chk-fut)">
        <path d={svgPaths.paf62000} fill="#34E834" />
        <path d={svgPaths.p38b8d680} fill="black" />
      </g>
      <defs>
        <clipPath id="chk-fut">
          <rect fill="white" height="15" width="14.5455" />
        </clipPath>
      </defs>
    </svg>
  );
}

const facts = [
  '5 Global Futures available to trade',
  'No commissions',
  'Up to 1:200 leverage',
  'Deep Liquidity',
  'MetaTrader 4 and 5',
  'Trade 24/5',
];

export default function FuturesOverview() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () =>
      futuresIndexes.filter(
        (r) =>
          query.trim() === '' ||
          r.index.toLowerCase().includes(query.toLowerCase()) ||
          r.symbol.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <div className="bg-[#f6f6f6] rounded-2xl p-7">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Left: icon + text + table ── */}
          <div className="flex-1 min-w-0 relative">
            {/* Futures icon */}
            <div className="w-[84px] h-[84px] mb-5">
              <img src={imgFuturesIcon} alt="Futures" className="h-full w-auto object-contain" />
            </div>

            {/* Description */}
            <h2 className="text-lg font-bold text-gray-900 leading-7 mb-3 max-w-2xl">
              Futures CFD are priced directly from the underlying futures markets, with
              commissions, financing charges and dividend adjustments all built into the
              spread itself. xAI Technology offers competitive spreads across all of our
              Future CFDs.
            </h2>
            <p className="text-gray-500 text-sm leading-7 mb-6">
              The following table shows our selection of global Futures CFDs
            </p>

            {/* Search */}
            <div className="mb-3 flex justify-end">
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search index or symbol"
                  className="pl-8 pr-4 py-2 text-sm bg-white border border-[#eaeaea] rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#34e834]/40 w-52"
                />
              </div>
            </div>

            {/* Index / Symbol table */}
            <div className="bg-white rounded-xl overflow-hidden border border-[#dadada]">
              {/* Header */}
              <div className="flex" style={{ backgroundColor: '#34e834' }}>
                <div className="flex-[2] px-5 py-3 text-sm font-medium text-gray-900 border-b border-[#dadada]">Index</div>
                <div className="flex-1 px-5 py-3 text-sm font-medium text-gray-900 border-b border-[#dadada]">Symbol</div>
              </div>
              {/* Rows */}
              {filtered.length === 0 ? (
                <div className="px-5 py-4 text-center text-gray-400 text-sm">
                  No results for &ldquo;{query}&rdquo;
                </div>
              ) : (
                filtered.map((row, i) => (
                  <div
                    key={row.symbol}
                    className={`flex ${i % 2 === 1 ? 'bg-[#f6f6f6]' : 'bg-white'} border-b border-[#dadada] last:border-b-0`}
                  >
                    <div className="flex-[2] px-5 py-3 text-sm font-medium text-gray-900">{row.index}</div>
                    <div className="flex-1 px-5 py-3 text-sm font-medium text-gray-900">{row.symbol}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ── Right: Facts card ── */}
          <div className="flex items-start justify-center lg:justify-end shrink-0">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 w-full max-w-[303px]">
              <div className="border-b border-black/10 pb-3 mb-1">
                <p className="text-xs text-gray-500 mb-0.5">Futures</p>
                <p className="text-3xl font-medium text-gray-900">Facts</p>
              </div>
              <ul className="mb-5">
                {facts.map((f, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-3 py-3 text-sm font-bold text-gray-900 ${
                      i < facts.length - 1 ? 'border-b border-black/10' : ''
                    }`}
                  >
                    <CheckIcon />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/login"
                className="block text-center py-2 rounded-lg border border-[#34e834] text-gray-900 text-sm font-bold tracking-wide hover:bg-[#34e834]/10 transition-colors"
              >
                Open Account
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}