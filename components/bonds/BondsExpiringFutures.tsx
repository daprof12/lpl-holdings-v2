import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { bondFutures, type BondFuture } from '../../data/bondsData';

export default function BondsExpiringFutures() {
  const [query, setQuery] = useState('');

  const filtered = useMemo<BondFuture[]>(
    () =>
      bondFutures.filter(
        (r) =>
          query.trim() === '' ||
          r.name.toLowerCase().includes(query.toLowerCase()) ||
          r.contractMonth.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-3">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-1">Upcoming Expiring Futures</h2>
          </div>
          <div className="bg-[#34e834] rounded-md px-5 py-2.5 shrink-0">
            <span className="font-medium text-gray-900 text-sm whitespace-nowrap">
              Futures expiry/roll process
            </span>
          </div>
        </div>

        {/* Explainer */}
        <p className="text-gray-600 text-sm leading-7 mb-6 max-w-4xl">
          XAI Technology Futures CFDs are set to expire two working days before the contract
          expires on the underlying market. When a Futures CFD contract expires, all open
          positions will be closed at the futures settlement price, as reported by the futures
          exchange. This process would usually take place on the day following the expiry. Open
          positions are not rolled to the next front month so any clients wishing to hold long
          term positions must reopen the trade on the next available contract.
        </p>

        {/* Search */}
        <div className="mb-4 flex justify-end">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by Name"
              className="pl-8 pr-4 py-2 text-sm bg-[#f3f3f3] border border-[#eaeaea] rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#34e834]/40 w-52"
            />
          </div>
        </div>

        {/* Table — desktop */}
        <div className="hidden md:block overflow-hidden rounded-xl border border-[rgba(119,119,119,0.4)]">
          {/* Header row */}
          <div className="grid grid-cols-5 bg-[#dadada]">
            {['Name', 'Start Date', 'Close Only Date', 'Expiry Date', 'Contract Month'].map(
              (h, i) => (
                <div
                  key={h}
                  className={`px-4 py-5 text-sm font-semibold text-gray-900 ${
                    i === 3 ? 'bg-[#34e834]' : ''
                  } ${i > 0 ? 'text-center' : ''}`}
                >
                  {h}
                </div>
              )
            )}
          </div>

          {/* Rows */}
          {filtered.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-400 text-sm bg-white">
              No results for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map((row, i) => (
              <div
                key={row.name}
                className={`grid grid-cols-5 border-t border-[rgba(119,119,119,0.4)] ${
                  i % 2 === 1 ? 'bg-[#f6f6f6]' : 'bg-white'
                }`}
              >
                <div className="px-4 py-3 text-sm font-medium text-gray-900">{row.name}</div>
                <div className="px-4 py-3 text-sm text-gray-700 text-center">{row.startDate}</div>
                <div className="px-4 py-3 text-sm text-gray-700 text-center">{row.closeOnlyDate}</div>
                <div className="px-4 py-3 text-sm text-gray-700 text-center">{row.expiryDate}</div>
                <div className="px-4 py-3 text-sm text-gray-700 text-center">{row.contractMonth}</div>
              </div>
            ))
          )}
        </div>

        {/* Table — mobile */}
        <div className="md:hidden space-y-3">
          {filtered.map((row) => (
            <div key={row.name} className="bg-white rounded-xl border border-gray-200 p-4 text-sm">
              <p className="font-bold text-gray-900 mb-2">{row.name}</p>
              <div className="grid grid-cols-2 gap-y-1 text-xs text-gray-600">
                <span className="font-medium">Start Date</span>
                <span>{row.startDate}</span>
                <span className="font-medium">Close Only</span>
                <span>{row.closeOnlyDate}</span>
                <span className="font-medium text-[#1a8a1a]">Expiry Date</span>
                <span className="font-medium text-[#1a8a1a]">{row.expiryDate}</span>
                <span className="font-medium">Contract Month</span>
                <span>{row.contractMonth}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-3">
          Showing {filtered.length} contract{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>
    </section>
  );
}
