import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { bondSpreads, type BondSpread } from '../../data/bondsData';

export default function BondsSpreadsTable() {
  const [query, setQuery] = useState('');

  const filtered = useMemo<BondSpread[]>(
    () =>
      bondSpreads.filter(
        (s) =>
          query.trim() === '' ||
          s.symbol.toLowerCase().includes(query.toLowerCase()) ||
          s.description.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-4xl font-bold text-gray-900">Spreads</h2>
          <div className="bg-[#34e834] rounded-md px-5 py-2.5 shrink-0">
            <span className="font-medium text-gray-900 text-base">Bonds</span>
          </div>
        </div>

        {/* Controls row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <p className="text-sm text-gray-400">
            * <span className="font-bold">MIN</span> – minimum,{' '}
            <span className="font-bold">AVG</span> – average
          </p>

          <div className="flex items-center gap-4 flex-wrap">
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

        {/* Table */}
        <div className="bg-white rounded-2xl overflow-hidden border border-[#e4e3e3]">

          {/* Dark header: Product / All Accounts */}
          <div className="bg-[rgba(119,119,119,0.8)] rounded-t-2xl">
            <div className="flex items-center justify-between px-4 py-4">
              <span className="font-bold text-white text-sm flex-1">Product</span>
              <span className="font-bold text-white text-sm">All Accounts</span>
            </div>
          </div>

          {/* Column sub-header */}
          <div className="bg-[rgba(218,218,218,0.7)] flex items-center px-4 py-3 gap-2">
            <span className="font-bold text-gray-900 text-sm w-24 shrink-0">SYMBOL</span>
            <span className="font-medium text-gray-900 text-sm flex-1 min-w-0">DESCRIPTION</span>
            <div className="flex items-center gap-8 shrink-0">
              <span className="font-medium text-gray-900 text-sm w-12 text-right">MIN</span>
              <span className="font-medium text-gray-900 text-sm w-12 text-right">AVG</span>
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-[#e4e3e3] max-h-[540px] overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-400 text-sm">
                No results for &ldquo;{query}&rdquo;
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
                  <div className="flex items-center gap-8 shrink-0">
                    <span className="font-medium text-gray-900 text-sm w-12 text-right">
                      {row.min}
                    </span>
                    <span className="text-gray-600 text-sm w-12 text-right">
                      {row.avg}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-[#e4e3e3] bg-gray-50">
            <p className="text-xs text-gray-400">
              Spreads displayed are based on current or very recent market conditions.
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-2">
          Showing {filtered.length} bond instrument{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>
    </section>
  );
}
