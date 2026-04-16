import { useState, useEffect, useMemo } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useNavigate } from 'react-router-dom';
import { useMarketData } from '../../contexts/MarketDataContext';
import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../layouts/DashboardLayout';
import { formatPercentage } from '../../utils/formatNumber';
import { Star, Search, TrendingUp, TrendingDown, BarChart2, List } from 'lucide-react';
import { motion } from 'framer-motion';
import { CATEGORIES, CATEGORY_COLOURS } from '../../utils/assetCatalogue';

interface Asset {
  symbol: string;
  name: string;
  category: string;
  price: number;
  change24h: number;
  volume24h: string;
  high24h: number;
  low24h: number;
  isFavorite: boolean;
  exchange?: string;
}

// Local definitions removed in favor of MarketDataContext and utils/assetCatalogue

export default function MarketsPage() {
  const navigate  = useNavigate();
  const { currentUser, userPreferences, updatePreferences } = useAuth();
  const marketData = useMarketData();

  const [searchQuery,    setSearchQuery]    = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy,         setSortBy]         = useState<'name' | 'price' | 'change'>('change');
  const [viewMode,       setViewMode]       = useState<'list' | 'grid'>('list');

  // Favorites synchronized with relational backend
  const favorites = useMemo(() => new Set<string>(userPreferences?.watchlist || []), [userPreferences?.watchlist]);

  const toggleFavorite = async (symbol: string) => {
    const current = Array.from(favorites);
    const updated = favorites.has(symbol)
      ? current.filter(s => s !== symbol)
      : [...current, symbol];
    
    if (currentUser) {
      await updatePreferences({ watchlist: updated });
    } else {
      localStorage.setItem('marketFavorites', JSON.stringify(updated));
    }
  };

  // Subscriptions handled centrally by MarketDataContext
  useEffect(() => {
    // No-op here as Context now manages subs for all database-active assets
  }, []);

  // Build live assets list — re-derives whenever prices object reference updates
  const allAssets: Asset[] = useMemo(() =>
    marketData.assets.map(def => {
      const p = marketData.getPrice(def.symbol);
      return {
        ...def,
        isFavorite: favorites.has(def.symbol),
        price:     p?.price         ?? 0,
        change24h: p?.changePercent ?? 0,
        volume24h: p?.volume        ?? '—',
        high24h:   p?.high          ?? 0,
        low24h:    p?.low           ?? 0,
      };
    }),
  [favorites, marketData.prices, marketData.assets]);  // include prices so table re-renders on every tick

  const filteredAssets = useMemo(() =>
    allAssets
      .filter(a => {
        const q = searchQuery.toLowerCase();
        const matchSearch = a.symbol.toLowerCase().includes(q) || a.name.toLowerCase().includes(q);
        const matchCat    = activeCategory === 'All' || a.category === activeCategory;
        return matchSearch && matchCat;
      })
      .sort((a, b) => {
        if (sortBy === 'name')   return a.name.localeCompare(b.name);
        if (sortBy === 'price')  return b.price - a.price;
        if (sortBy === 'change') return Math.abs(b.change24h) - Math.abs(a.change24h);
        return 0;
      }),
  [allAssets, searchQuery, activeCategory, sortBy]);

  const getCategoryCount = (cat: string) =>
    cat === 'All' ? marketData.assets.length : marketData.assets.filter(a => a.category === cat).length;

  const fmtPrice = (n: number) =>
    n === 0 ? '—' : n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 });

  return (
    <DashboardLayout>
      <div className="bg-gray-50 dark:bg-slate-900 min-h-screen">

        {/* ── Header ───────────────────────────────────────────────────── */}
        <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl mb-1">Markets</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {marketData.assets.length}+ instruments across {CATEGORIES.length - 1} asset classes — powered by TradingView
                </p>
              </div>
              <div className="flex items-center gap-2">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="text-sm border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2 bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 outline-none"
                >
                  <option value="change">Sort: 24h Change</option>
                  <option value="price">Sort: Price</option>
                  <option value="name">Sort: Name</option>
                </select>
                {/* View toggle */}
                <button
                  onClick={() => setViewMode(v => v === 'list' ? 'grid' : 'list')}
                  className="p-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
                  title={viewMode === 'list' ? 'Grid view' : 'List view'}
                >
                  {viewMode === 'list' ? <BarChart2 className="w-4 h-4" /> : <List className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="mt-4 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <Input
                type="text"
                placeholder="Search by name or symbol…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 h-10"
              />
            </div>

            {/* Category tabs */}
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
                    activeCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {cat} <span className="opacity-70">({getCategoryCount(cat)})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Asset table / grid ────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">

          {filteredAssets.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <p className="text-gray-500 dark:text-gray-400">No instruments match &quot;{searchQuery}&quot;</p>
            </div>
          ) : viewMode === 'list' ? (

            /* ── List / Table ── */
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead className="bg-gray-50 dark:bg-slate-700/50 border-b border-gray-200 dark:border-slate-700">
                    <tr>
                      <th className="text-left py-3 px-4 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide w-8"></th>
                      <th className="text-left py-3 px-4 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Instrument</th>
                      <th className="text-left py-3 px-4 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide hidden md:table-cell">Category</th>
                      <th className="text-right py-3 px-4 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Price</th>
                      <th className="text-right py-3 px-4 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">24h %</th>
                      <th className="text-right py-3 px-4 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide hidden lg:table-cell">High</th>
                      <th className="text-right py-3 px-4 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide hidden lg:table-cell">Low</th>
                      <th className="text-right py-3 px-4 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide hidden xl:table-cell">Volume</th>
                      <th className="text-right py-3 px-4 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-slate-700/50">
                    {filteredAssets.map((asset, i) => {
                      const pos = asset.change24h >= 0;
                      return (
                        <motion.tr
                          key={`${asset.symbol}-${asset.exchange}-${i}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: Math.min(i * 0.01, 0.3) }}
                          className="hover:bg-gray-50 dark:hover:bg-slate-700/40 cursor-pointer transition-colors"
                          onClick={() => navigate(`/trading/${asset.symbol.replace(/\//g, '').replace(/-OPT$/, '')}`)}
                        >
                          {/* Star */}
                          <td className="py-3 px-4">
                            <button
                              onClick={e => { e.stopPropagation(); toggleFavorite(asset.symbol); }}
                              className={`transition-colors ${asset.isFavorite ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}
                            >
                              <Star className={`w-4 h-4 ${asset.isFavorite ? 'fill-current' : ''}`} />
                            </button>
                          </td>

                          {/* Instrument */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs shrink-0 ${CATEGORY_COLOURS[asset.category] ?? 'bg-gray-100 text-gray-600'}`}>
                                {asset.symbol.slice(0, 2)}
                              </div>
                              <div>
                                <div className="text-sm">{asset.symbol.replace(/-OPT$/, '')}</div>
                                <div className="text-xs text-gray-400 truncate max-w-[180px]">{asset.name}</div>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="py-3 px-4 hidden md:table-cell">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${CATEGORY_COLOURS[asset.category] ?? 'bg-gray-100 text-gray-600'}`}>
                              {asset.category}
                            </span>
                          </td>

                          {/* Price */}
                          <td className="py-3 px-4 text-right text-sm tabular-nums">
                            ${fmtPrice(asset.price)}
                          </td>

                          {/* 24h % */}
                          <td className={`py-3 px-4 text-right text-sm tabular-nums ${pos ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            <div className="flex items-center justify-end gap-1">
                              {pos ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                              {pos ? '+' : ''}{formatPercentage(asset.change24h)}
                            </div>
                          </td>

                          {/* High */}
                          <td className="py-3 px-4 text-right text-sm hidden lg:table-cell text-gray-500 dark:text-gray-400 tabular-nums">
                            ${fmtPrice(asset.high24h)}
                          </td>

                          {/* Low */}
                          <td className="py-3 px-4 text-right text-sm hidden lg:table-cell text-gray-500 dark:text-gray-400 tabular-nums">
                            ${fmtPrice(asset.low24h)}
                          </td>

                          {/* Volume */}
                          <td className="py-3 px-4 text-right text-sm hidden xl:table-cell text-gray-500 dark:text-gray-400">
                            {asset.volume24h}
                          </td>

                          {/* Trade */}
                          <td className="py-3 px-4 text-right">
                            <Button
                              size="sm"
                              onClick={e => {
                                e.stopPropagation();
                                navigate(`/trading/${asset.symbol.replace(/\//g, '').replace(/-OPT$/, '')}`);
                              }}
                            >
                              Trade
                            </Button>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          ) : (

            /* ── Grid ── */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredAssets.map((asset, i) => {
                const pos = asset.change24h >= 0;
                return (
                  <motion.div
                    key={`${asset.symbol}-${asset.exchange}-${i}`}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: Math.min(i * 0.01, 0.3) }}
                    className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow border border-transparent hover:border-blue-200 dark:hover:border-blue-900"
                    onClick={() => navigate(`/trading/${asset.symbol.replace(/\//g, '').replace(/-OPT$/, '')}`)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs ${CATEGORY_COLOURS[asset.category] ?? 'bg-gray-100 text-gray-600'}`}>
                          {asset.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <div className="text-sm">{asset.symbol.replace(/-OPT$/, '')}</div>
                          <div className="text-xs text-gray-400">{asset.exchange}</div>
                        </div>
                      </div>
                      <button
                        onClick={e => { e.stopPropagation(); toggleFavorite(asset.symbol); }}
                        className={`transition-colors ${asset.isFavorite ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}
                      >
                        <Star className={`w-4 h-4 ${asset.isFavorite ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 truncate">{asset.name}</div>

                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-lg tabular-nums">${fmtPrice(asset.price)}</div>
                        <div className={`flex items-center gap-1 text-xs ${pos ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {pos ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {pos ? '+' : ''}{formatPercentage(asset.change24h)}
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${CATEGORY_COLOURS[asset.category] ?? 'bg-gray-100 text-gray-600'}`}>
                        {asset.category}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Count footer */}
          <p className="text-xs text-center text-gray-400 dark:text-gray-600 mt-6">
            Showing {filteredAssets.length} of {marketData.assets.length} instruments
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}