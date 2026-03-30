import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import type { StockExchange } from '../../data/stocksData';

interface StockTableProps {
  exchange: StockExchange;
  defaultOpen?: boolean;
}

export default function StockTable({ exchange, defaultOpen = false }: StockTableProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return exchange.stocks;
    return exchange.stocks.filter(
      (s) => s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
    );
  }, [query, exchange.stocks]);

  return (
    <div className="border border-[#e4e3e3] rounded-xl overflow-hidden bg-white">
      {/* ── Accordion header ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-2xl font-bold text-gray-900">{exchange.title}</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 font-medium">
            {exchange.stocks.length} stocks
          </span>
          {open ? (
            <ChevronUp className="text-gray-500" size={20} />
          ) : (
            <ChevronDown className="text-gray-500" size={20} />
          )}
        </div>
      </button>

      {/* ── Expandable body ── */}
      {open && (
        <div className="border-t border-[#e4e3e3]">
          {/* Search + controls row */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#e4e3e3] bg-gray-50/50">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={13} />
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by Symbol"
                className="pl-8 pr-4 py-2 text-sm bg-[#f3f3f3] border border-[#eaeaea] rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#34e834]/40 w-56"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Table Skin</span>
              <span className="w-5 h-5 rounded bg-[#e2e3e3] inline-block" />
              <span className="w-5 h-5 rounded bg-black inline-block" />
            </div>
          </div>

          {/* Table header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[rgba(218,218,218,0.7)] rounded-none">
            <span className="font-bold text-gray-900 text-sm w-32">{exchange.headerSymbol}</span>
            <span className="font-medium text-gray-900 text-sm flex-1 ml-4">{exchange.headerName}</span>
          </div>

          {/* Rows — scrollable */}
          <div className="max-h-[560px] overflow-y-auto divide-y divide-[#e4e3e3]">
            {filtered.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-400 text-sm">
                No stocks match "{query}"
              </div>
            ) : (
              filtered.map((stock, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-4 py-[18px] hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900 text-sm w-32 shrink-0">
                    {stock.symbol}
                  </span>
                  <span className="text-gray-700 text-sm flex-1 ml-4">{stock.name}</span>
                </div>
              ))
            )}
          </div>

          {/* Footer count */}
          <div className="px-6 py-3 border-t border-[#e4e3e3] bg-gray-50 text-xs text-gray-400">
            Showing {filtered.length} of {exchange.stocks.length} instruments
          </div>
        </div>
      )}
    </div>
  );
}
