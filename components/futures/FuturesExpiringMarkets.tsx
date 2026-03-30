import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { upcomingFutures, commodityExpiries, type FutureExpiry, type CommodityExpiry } from '../../data/futuresData';

// ── Reusable expiry table ───────────────────────────────────────────────────

interface ExpiryTableProps<T extends { startDate: string; closeOnlyDate: string; expiryDate: string; contractMonth: string }> {
  data: T[];
  nameKey: keyof T;
  nameLabel: string;
  query: string;
}

function ExpiryTable<T extends { startDate: string; closeOnlyDate: string; expiryDate: string; contractMonth: string }>({
  data, nameKey, nameLabel, query,
}: ExpiryTableProps<T>) {
  const cols = [nameLabel, 'Start Date', 'Close Only Date', 'Expiry Date', 'Contract Month'];

  const filtered = useMemo(
    () =>
      data.filter(
        (r) =>
          query.trim() === '' ||
          String(r[nameKey]).toLowerCase().includes(query.toLowerCase()) ||
          r.contractMonth.toLowerCase().includes(query.toLowerCase())
      ),
    [data, nameKey, query]
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-[#dadada]">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
          {cols.map((h) => (
            <div key={h} className="px-4 py-3 text-sm font-medium text-gray-900 bg-[#34e834] border-b border-[#dadada]">
              {h}
            </div>
          ))}
        </div>
        {filtered.length === 0 ? (
          <div className="px-6 py-6 text-center text-gray-400 text-sm bg-white">
            No results for &ldquo;{query}&rdquo;
          </div>
        ) : (
          filtered.map((row, i) => (
            <div
              key={i}
              className={`grid border-t border-[#dadada] ${i % 2 === 1 ? 'bg-[#f6f6f6]' : 'bg-white'}`}
              style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}
            >
              <div className="px-4 py-3 text-sm font-medium text-gray-900">{String(row[nameKey])}</div>
              <div className="px-4 py-3 text-sm text-gray-700">{row.startDate}</div>
              <div className="px-4 py-3 text-sm text-gray-700">{row.closeOnlyDate}</div>
              <div className="px-4 py-3 text-sm text-gray-700">{row.expiryDate}</div>
              <div className="px-4 py-3 text-sm text-gray-700">{row.contractMonth}</div>
            </div>
          ))
        )}
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((row, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 text-sm">
            <p className="font-bold text-gray-900 mb-2">{String(row[nameKey])}</p>
            <div className="grid grid-cols-2 gap-y-1 text-xs text-gray-600">
              <span className="font-medium">Start Date</span>
              <span>{row.startDate}</span>
              <span className="font-medium">Close Only</span>
              <span>{row.closeOnlyDate}</span>
              <span className="font-medium">Expiry Date</span>
              <span>{row.expiryDate}</span>
              <span className="font-medium">Contract Month</span>
              <span>{row.contractMonth}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-2">
        Showing {filtered.length} record{filtered.length !== 1 ? 's' : ''}
      </p>
    </>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

export default function FuturesExpiringMarkets() {
  const [futuresQuery, setFuturesQuery] = useState('');
  const [commodityQuery, setCommodityQuery] = useState('');

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-16">

        {/* ── Section 1: Upcoming Expiring, Spot Oil and Tradable Markets ── */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Upcoming Expiring, Spot Oil and Tradable Markets
          </h2>
          <p className="text-lg font-bold text-gray-700 mb-3">Futures expiry/roll process</p>
          <p className="text-sm text-gray-600 leading-7 mb-6 max-w-5xl">
            XAI Technology Futures CFDs are set to expire two working days before the contract
            expires on the underlying market. When a Futures CFD contract expires, all open
            positions will be closed at the futures settlement price, as reported by the futures
            exchange. This process would usually take place on the day following the expiry.
            Open positions are not rolled to the next front month so any clients wishing to
            hold long term positions must reopen the trade on the next available contract.
          </p>

          {/* Search */}
          <div className="mb-3 flex justify-end">
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={futuresQuery}
                onChange={(e) => setFuturesQuery(e.target.value)}
                placeholder="Search futures"
                className="pl-8 pr-4 py-2 text-sm bg-[#f3f3f3] border border-[#eaeaea] rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#34e834]/40 w-52"
              />
            </div>
          </div>

          <ExpiryTable<FutureExpiry>
            data={upcomingFutures}
            nameKey="index"
            nameLabel="Index"
            query={futuresQuery}
          />
        </div>

        {/* ── Section 2: CFDs on Commodities Expiry Information ── */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            CFDs on Commodities Expiry Information:
          </h2>

          {/* Search */}
          <div className="mb-3 flex justify-end">
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={commodityQuery}
                onChange={(e) => setCommodityQuery(e.target.value)}
                placeholder="Search commodity"
                className="pl-8 pr-4 py-2 text-sm bg-[#f3f3f3] border border-[#eaeaea] rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#34e834]/40 w-52"
              />
            </div>
          </div>

          <ExpiryTable<CommodityExpiry>
            data={commodityExpiries}
            nameKey="commodity"
            nameLabel="Commodity"
            query={commodityQuery}
          />
        </div>

      </div>
    </section>
  );
}
