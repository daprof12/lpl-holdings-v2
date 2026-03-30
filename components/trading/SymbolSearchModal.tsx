import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, TrendingUp, TrendingDown, X, Star } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { useMarketData } from '../../contexts/MarketDataContext';
import { CATALOGUE, CATEGORIES, CATEGORY_COLOURS, BADGE_COLOUR } from '../../utils/assetCatalogue';
import { formatPercentage } from '../../utils/formatNumber';

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (symbol: string) => void;
  currentSymbol: string;
}

/** Format price with appropriate decimal precision */
function fmtPrice(price: number): string {
  if (!price) return '—';
  if (price >= 1000) return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (price >= 10)   return price.toFixed(2);
  if (price >= 1)    return price.toFixed(4);
  return price.toFixed(6);
}

/** Format 24-h % change */
function formatChangePct(pct: number): string {
  const sign = pct >= 0 ? '+' : '';
  return `${sign}${formatPercentage(pct)}`;
}

export default function SymbolSearchModal({ open, onClose, onSelect, currentSymbol }: Props) {
  const { prices, subscribeToSymbol, unsubscribeFromSymbol } = useMarketData();

  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('All');
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('marketFavorites');
      return saved ? new Set(JSON.parse(saved)) : new Set(['BTCUSD', 'ETHUSD', 'EURUSD', 'AAPL', 'TSLA', 'XAUUSD']);
    } catch {
      return new Set(['BTCUSD', 'ETHUSD', 'EURUSD', 'AAPL', 'TSLA', 'XAUUSD']);
    }
  });

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus search when modal opens; reset state
  useEffect(() => {
    if (open) {
      setSearch('');
      setCategory('All');
      setTimeout(() => searchInputRef.current?.focus(), 80);
    }
  }, [open]);

  // ── Filtered list ──────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = category === 'All' ? CATALOGUE : CATALOGUE.filter(a => a.category === category);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(a =>
        a.symbol.toLowerCase().includes(q) ||
        a.name.toLowerCase().includes(q) ||
        a.exchange.toLowerCase().includes(q),
      );
    }
    return list;
  }, [search, category]);

  // ── Subscribe to visible symbols for live prices ───────────────────────────
  useEffect(() => {
    if (!open) return;
    const syms = filtered.slice(0, 80).map(a => a.symbol); // cap at 80 to avoid too many subs
    syms.forEach(s => subscribeToSymbol(s));
    return () => syms.forEach(s => unsubscribeFromSymbol(s));
  }, [open, filtered]);

  // ── Category counts ────────────────────────────────────────────────────────
  const countFor = (cat: string) =>
    cat === 'All' ? CATALOGUE.length : CATALOGUE.filter(a => a.category === cat).length;

  // ── Toggle favourite ───────────────────────────────────────────────────────
  const toggleFav = (sym: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(sym) ? next.delete(sym) : next.add(sym);
      localStorage.setItem('marketFavorites', JSON.stringify([...next]));
      return next;
    });
  };

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-4xl h-[82vh] flex flex-col p-0 gap-0 overflow-hidden">
        {/* ── Header ── */}
        <DialogHeader className="px-5 pt-5 pb-0 shrink-0">
          <DialogTitle className="text-base">Select Instrument</DialogTitle>
          <DialogDescription className="sr-only">
            Browse and select a trading instrument
          </DialogDescription>
        </DialogHeader>

        {/* ── Search bar ── */}
        <div className="px-5 pt-4 pb-3 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === 'Escape' && onClose()}
              placeholder="Search symbol, name or exchange…"
              className="w-full pl-9 pr-9 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/60 text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none focus:border-blue-400 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-400/20 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* ── Category tabs ── */}
        <div className="px-5 pb-2 shrink-0 overflow-x-auto scrollbar-none">
          <div className="flex gap-1.5 min-w-max">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
                  category === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
              >
                {cat}
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] leading-none ${
                  category === cat
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 dark:bg-slate-600 text-gray-500 dark:text-gray-400'
                }`}>
                  {countFor(cat)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="border-t border-gray-200 dark:border-slate-700 shrink-0" />

        {/* ── Table header ── */}
        <div className="px-5 py-2 grid grid-cols-[1fr_auto_auto_auto] gap-2 shrink-0 bg-gray-50 dark:bg-slate-800/60 border-b border-gray-200 dark:border-slate-700">
          <span className="text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500">Instrument</span>
          <span className="text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 text-right w-24">Price</span>
          <span className="text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 text-right w-20">24h %</span>
          <span className="w-6" /> {/* fav star column */}
        </div>

        {/* ── Rows ── */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400 dark:text-gray-500">
              <Search className="w-10 h-10 opacity-25" />
              <p className="text-sm">No instruments found for &quot;{search}&quot;</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-slate-700/50">
              {filtered.map((item, idx) => {
                const pData    = prices[item.symbol];
                const price    = pData?.price ?? null;
                const changePct= pData?.changePercent ?? null;
                const isPos    = changePct !== null && changePct >= 0;
                const isActive = item.symbol === currentSymbol;
                const isFav    = favorites.has(item.symbol);

                return (
                  <button
                    key={`${item.symbol}-${item.exchange}-${idx}`}
                    onClick={() => { onSelect(item.symbol); onClose(); }}
                    className={`w-full grid grid-cols-[1fr_auto_auto_auto] gap-2 items-center px-5 py-3 text-left transition-colors group ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/20'
                        : 'hover:bg-gray-50 dark:hover:bg-slate-700/40'
                    }`}
                  >
                    {/* Left: badge + symbol + name */}
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Coloured logo badge */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] leading-none flex-shrink-0 ${BADGE_COLOUR(item.symbol)}`}>
                        {item.symbol.replace('-OPT', '').slice(0, 3)}
                      </div>
                      {/* Symbol + name + tags */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'}`}>
                            {item.symbol}
                          </span>
                          {isActive && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-blue-600 text-white rounded-full leading-none">
                              Active
                            </span>
                          )}
                          <span className={`text-[10px] px-1.5 py-0.5 rounded leading-none hidden sm:inline ${CATEGORY_COLOURS[item.category] ?? 'bg-gray-100 text-gray-600'}`}>
                            {item.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-xs text-gray-400 dark:text-gray-500 truncate max-w-[220px]">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-gray-300 dark:text-gray-600 shrink-0">
                            {item.exchange}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right w-24 shrink-0">
                      {price !== null ? (
                        <span className="text-sm tabular-nums text-gray-900 dark:text-gray-100">
                          {fmtPrice(price)}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-300 dark:text-gray-600">—</span>
                      )}
                    </div>

                    {/* 24h change */}
                    <div className="w-20 shrink-0 flex items-center justify-end gap-1">
                      {changePct !== null ? (
                        <>
                          {isPos
                            ? <TrendingUp className="w-3 h-3 text-emerald-500 shrink-0" />
                            : <TrendingDown className="w-3 h-3 text-red-500 shrink-0" />
                          }
                          <span className={`text-xs tabular-nums ${isPos ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                            {formatChangePct(changePct)}
                          </span>
                        </>
                      ) : (
                        <span className="text-xs text-gray-300 dark:text-gray-600">—</span>
                      )}
                    </div>

                    {/* Favourite star */}
                    <div className="w-6 flex items-center justify-center shrink-0">
                      <button
                        onClick={e => toggleFav(item.symbol, e)}
                        className={`p-0.5 rounded transition-colors ${
                          isFav
                            ? 'text-yellow-400'
                            : 'text-gray-200 dark:text-gray-600 group-hover:text-gray-400 dark:group-hover:text-gray-500'
                        }`}
                      >
                        <Star className="w-3.5 h-3.5" fill={isFav ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="px-5 py-2.5 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/60 shrink-0 flex items-center justify-between">
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {filtered.length.toLocaleString()} instrument{filtered.length !== 1 ? 's' : ''}
            {search && ` matching "${search}"`}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            Prices update live
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}