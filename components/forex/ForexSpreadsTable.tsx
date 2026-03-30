import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { forexSpreads, type ForexCategory } from '../../data/forexData';

const TABS: { key: ForexCategory; label: string }[] = [
  { key: 'major',  label: 'Major'  },
  { key: 'minor',  label: 'Minor'  },
  { key: 'exotic', label: 'Exotic' },
];

export default function ForexSpreadsTable() {
  const [tab,   setTab]   = useState<ForexCategory>('major');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return forexSpreads.filter(
      (s) =>
        s.category === tab &&
        (q === '' || s.symbol.toLowerCase().includes(q) || s.description.toLowerCase().includes(q))
    );
  }, [tab, query]);

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-4xl font-bold text-gray-900">Spreads</h2>
          <div className="bg-[#34e834] rounded-md px-5 py-2.5">
            <span className="font-medium text-gray-900 text-base">Forex</span>
          </div>
        </div>

        {/* Controls row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">

          {/* Category tabs */}
          <div className="flex gap-4">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => { setTab(t.key); setQuery(''); }}
                className="text-sm font-semibold transition-colors"
                style={{ color: tab === t.key ? '#34e834' : 'rgba(0,0,0,0.5)' }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Legend */}
            <p className="text-sm text-gray-400 hidden sm:block">
              * <span className="font-bold">MIN</span> - Minimum,{' '}
              <span className="font-bold">AVG</span> - Average
            </p>
            {/* Search */}
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by Symbol"
                className="pl-8 pr-4 py-2 text-sm bg-[#f3f3f3] border border-[#eaeaea] rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#34e834]/40 w-52"
              />
            </div>
            {/* Skin toggles */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Table Skin</span>
              <span className="w-5 h-5 rounded bg-[#e2e3e3] inline-block" />
              <span className="w-5 h-5 rounded bg-black inline-block" />
            </div>
          </div>
        </div>

        {/* Mobile legend */}
        <p className="text-xs text-gray-400 mb-3 sm:hidden">
          * <span className="font-bold">MIN</span> - Minimum, <span className="font-bold">AVG</span> - Average
        </p>

        {/* Table */}
        <div className="bg-white rounded-2xl overflow-hidden border border-[#e4e3e3]">

          {/* Dark header: Product / Raw Spread Account / Standard Account */}
          <div className="bg-[rgba(119,119,119,0.8)] rounded-t-2xl">
            <div className="flex items-center justify-between px-4 py-4">
              <span className="font-bold text-white text-sm flex-1">Product</span>
              <div className="hidden md:flex items-center gap-8">
                <span className="font-bold text-white text-sm">Raw Spread Account</span>
                <span className="font-bold text-white text-sm">Standard Account</span>
              </div>
            </div>
          </div>

          {/* Column sub-header */}
          <div className="bg-[rgba(218,218,218,0.7)] flex items-center px-4 py-3 gap-2">
            <span className="font-bold text-gray-900 text-sm w-24 shrink-0">SYMBOL</span>
            <span className="font-medium text-gray-900 text-sm flex-1 min-w-0">DESCRIPTION</span>
            <div className="hidden md:flex items-center gap-6">
              <span className="font-medium text-gray-900 text-sm w-10 text-right">MIN</span>
              <span className="font-medium text-gray-900 text-sm w-10 text-right">AVG</span>
              <span className="font-medium text-gray-900 text-sm w-10 text-right">MIN</span>
              <span className="font-medium text-gray-900 text-sm w-10 text-right">AVG</span>
            </div>
            <div className="flex md:hidden items-center gap-4">
              <span className="text-xs font-medium text-gray-600">RAW</span>
              <span className="text-xs font-medium text-gray-600">STD</span>
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-[#e4e3e3] max-h-[540px] overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-400 text-sm">
                No results for "{query}"
              </div>
            ) : (
              filtered.map((row, i) => (
                <div
                  key={i}
                  className="flex items-center px-4 py-4 hover:bg-gray-50 transition-colors gap-2"
                >
                  <span className="font-medium text-gray-900 text-sm w-24 shrink-0">
                    {row.symbol}
                  </span>
                  <span className="text-gray-700 text-sm flex-1 min-w-0 truncate">
                    {row.description}
                  </span>
                  <div className="hidden md:flex items-center gap-6">
                    <span className="font-medium text-gray-900 text-sm w-10 text-right">{row.rawMin}</span>
                    <span className="text-gray-600 text-sm w-10 text-right">{row.rawAvg}</span>
                    <span className="font-medium text-gray-900 text-sm w-10 text-right">{row.stdMin}</span>
                    <span className="text-gray-600 text-sm w-10 text-right">{row.stdAvg}</span>
                  </div>
                  {/* Mobile: compact */}
                  <div className="flex md:hidden items-center gap-3 text-xs text-gray-600 shrink-0">
                    <span>{row.rawMin}/{row.rawAvg}</span>
                    <span className="text-gray-300">|</span>
                    <span>{row.stdMin}/{row.stdAvg}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer note */}
          <div className="px-4 py-3 border-t border-[#e4e3e3] bg-gray-50">
            <p className="text-xs text-gray-400">
              The spread data displayed should be based on{' '}
              <span className="font-bold">current or very recent market conditions.</span>
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-2">
          Showing {filtered.length} {tab} pairs
        </p>
      </div>
    </section>
  );
}
