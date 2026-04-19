import { useState, useEffect } from 'react';
import { 
  Plus, Edit, Trash2, Search, TrendingUp, TrendingDown, 
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  ArrowLeftRight, Check, X, Shield, Settings, Edit2 
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { supabase } from '../../utils/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { useMarketData } from '../../contexts/MarketDataContext';
import { initialAssets, deriveFullLeverage } from '../../data/assets';
import { CATALOGUE } from '../../utils/assetCatalogue';
import type { AssetData } from '../../data/assets';
import { formatCurrency } from '../../utils/formatNumber';
import { toast } from 'sonner';

export type { AssetData };

// Internal type with full 5-tier leverage + enabled flag for admin state
interface AdminAsset extends Omit<AssetData, 'leverage' | 'status'> {
  leverage: {
    basic: number;
    standard: number;
    silver: number;
    gold: number;
    platinum: number;
  };
  enabled: boolean;
  volume: string;
  change24h: number;
}

/** Convert a source AssetData (3-tier base + optional overrides) to full 5-tier AdminAsset */
function toAdminAsset(asset: any): AdminAsset {
  const full = typeof asset.leverage === 'string' ? JSON.parse(asset.leverage) : deriveFullLeverage(asset.leverage);
  return {
    id: asset.id || asset.symbol,
    symbol: asset.symbol,
    name: asset.name,
    category: asset.category,
    exchange: asset.exchange || '',
    price: parseFloat(asset.price || 0),
    change24h: parseFloat(asset.change_24h || asset.change24h || 0),
    volume: asset.volume || '0',
    leverage: full,
    enabled: asset.status === 'active' || asset.enabled === true,
  };
}

const PAGE_SIZE_KEY = 'gross_admin_assets_page_size';



export default function AssetManagement() {
  const { prices, subscribeToSymbol } = useMarketData();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [selectedAsset, setSelectedAsset] = useState<AdminAsset | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(() => {
    try {
      const stored = localStorage.getItem(PAGE_SIZE_KEY);
      return stored ? parseInt(stored, 10) || 15 : 15;
    } catch { return 15; }
  });

  const [assets, setAssets] = useState<AdminAsset[]>([]);

  // 1. Fetch assets from Supabase
  const fetchAssets = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('market_assets')
        .select('*')
        .order('symbol', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        const adminAssets = data.map(toAdminAsset);
        setAssets(adminAssets);
        // Subscribe to these assets to get real-time prices
        adminAssets.forEach(a => subscribeToSymbol(a.symbol));
      } else {
        // Seed if empty
        await handleResetSeed();
      }
    } catch (err) {
      console.error('Failed to fetch assets:', err);
      toast.error('Failed to load assets from database. Ensure the table exists.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSeed = async () => {
    setIsLoading(true);
    try {
      const now = Date.now();
      
      // Merge initialAssets (rich data) with CATALOGUE (symbol list)
      const allSymbols = new Set(initialAssets.map(a => a.symbol));
      const catalogueToAdd = CATALOGUE.filter(c => !allSymbols.has(c.symbol));
      
      const assetsToInsert = [
        ...initialAssets.map(a => ({
          id: `asset_${a.symbol}_${now}`,
          symbol: a.symbol,
          name: a.name,
          category: a.category,
          exchange: a.exchange || '',
          price: a.price,
          enabled: true,
          leverage: deriveFullLeverage(a.leverage),
          created_at: now,
          updated_at: now
        })),
        ...catalogueToAdd.map(c => ({
          id: `asset_${c.symbol}_${now}`,
          symbol: c.symbol,
          name: c.name,
          category: c.category,
          exchange: c.exchange || '',
          price: 0,
          enabled: true,
          leverage: { basic: 10, standard: 20, silver: 35, gold: 50, platinum: 75 },
          created_at: now,
          updated_at: now
        }))
      ];

      // Handle in batches for Supabase
      const batchSize = 50;
      for (let i = 0; i < assetsToInsert.length; i += batchSize) {
        const batch = assetsToInsert.slice(i, i + batchSize);
        const { error } = await supabase.from('market_assets').upsert(batch, { onConflict: 'symbol' });
        if (error) throw error;
      }
      
      toast.success(`Synchronized ${assetsToInsert.length} assets to database`);
      await fetchAssets();
    } catch (err) {
      console.error('Failed to seed assets:', err);
      toast.error('Failed to seed assets. Ensure the table "market_assets" has been created in Supabase.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSyncPricesToDB = async () => {
    setIsLoading(true);
    try {
      const updates = assets.map(asset => {
        const liveData = prices[asset.symbol];
        if (liveData && liveData.price > 0) {
          return {
            id: asset.id, // specify the ID for upsert
            symbol: asset.symbol,
            price: liveData.price,
            updated_at: Date.now()
          };
        }
        return null;
      }).filter(Boolean);

      if (updates.length > 0) {
        // Upsert standardizes on matching the primary key/unique constraint and updating columns
        const { error } = await supabase.from('market_assets').upsert(updates, { onConflict: 'symbol' });
        if (error) throw error;
        toast.success(`Successfully synced ${updates.length} live prices to the database.`);
      } else {
        toast.info('No live prices available to sync yet. Please wait for the websocket stream.');
      }
    } catch (err) {
      console.error('Sync error:', err);
      toast.error('Failed to sync live prices to database.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();

    // Subscribe to changes
    const channel = supabase
      .channel('market-assets-admin')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'market_assets' }, () => {
        fetchAssets();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const [formData, setFormData] = useState({
    symbol: '',
    name: '',
    category: 'Crypto',
    exchange: '',
    price: '',
    leverage: {
      basic: 10,
      standard: 20,
      silver: 35,
      gold: 50,
      platinum: 75,
    },
  });

  const categories = ['all', 'Crypto', 'Forex', 'Stocks', 'Commodities', 'Indices', 'Funds', 'Futures', 'Bonds', 'Economy', 'Options'];

  const filteredAssets = (assets || []).filter(asset => {
    const matchesSearch = asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || asset.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredAssets.length / rowsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * rowsPerPage;
  const paginatedAssets = filteredAssets.slice(startIndex, startIndex + rowsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter]);

  // Persist rows per page preference
  const handleRowsPerPageChange = (value: number) => {
    setRowsPerPage(value);
    setCurrentPage(1);
    try { localStorage.setItem(PAGE_SIZE_KEY, value.toString()); } catch { /* */ }
  };

  const handleCreate = () => {
    setDialogMode('create');
    setFormData({
      symbol: '',
      name: '',
      category: 'Crypto',
      exchange: '',
      price: '',
      leverage: { basic: 10, standard: 20, silver: 35, gold: 50, platinum: 75 },
    });
    setShowDialog(true);
  };

  const handleEdit = (asset: AdminAsset) => {
    setDialogMode('edit');
    setSelectedAsset(asset);
    setFormData({
      symbol: asset.symbol,
      name: asset.name,
      category: asset.category,
      exchange: asset.exchange,
      price: asset.price.toString(),
      leverage: { ...asset.leverage },
    });
    setShowDialog(true);
  };

  const handleDelete = async (symbol: string) => {
    if (confirm(`Are you sure you want to delete ${symbol}?`)) {
      try {
        const { error } = await supabase
          .from('market_assets')
          .delete()
          .eq('symbol', symbol);
        if (error) throw error;
        toast.success(`${symbol} deleted successfully`);
      } catch (err) {
        toast.error('Failed to delete asset');
      }
    }
  };

  const handleToggleStatus = async (asset: AdminAsset) => {
    try {
      const { error } = await supabase
        .from('market_assets')
        .update({ enabled: !asset.enabled, updated_at: Date.now() })
        .eq('symbol', asset.symbol);
      if (error) throw error;
    } catch (err) {
      toast.error('Failed to toggle asset status');
    }
  };

  const handleSubmit = async () => {
    try {
      const now = Date.now();
      const basePayload = {
        symbol: formData.symbol.toUpperCase(),
        name: formData.name,
        category: formData.category,
        exchange: formData.exchange,
        price: parseFloat(formData.price),
        leverage: formData.leverage, // leveraging jsonb serialization
        enabled: true,
        updated_at: now
      };

      if (dialogMode === 'create') {
        const payload = {
          ...basePayload,
          id: `asset_${formData.symbol.toUpperCase()}_${now}`,
          created_at: now
        };
        const { error } = await supabase.from('market_assets').insert([payload]);
        if (error) throw error;
        toast.success('Asset created successfully');
      } else if (dialogMode === 'edit' && selectedAsset) {
        const { error } = await supabase
          .from('market_assets')
          .update(basePayload)
          .eq('symbol', selectedAsset.symbol);
        if (error) throw error;
        toast.success('Asset updated successfully');
      }
      setShowDialog(false);
    } catch (err) {
      console.error('Submit error:', err);
      toast.error('Failed to save asset');
    }
  };

  // Counts per category
  const categoryCounts = assets.reduce<Record<string, number>>((acc, a) => {
    acc[a.category] = (acc[a.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Asset Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage {assets.length} trading assets across {Object.keys(categoryCounts).length} categories
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleSyncPricesToDB} 
            disabled={isLoading || Object.keys(prices).length === 0}
            className="gap-2 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400"
          >
            <TrendingUp className="w-4 h-4" />
            Sync Live Prices to DB
          </Button>
          <Button 
            variant="outline" 
            onClick={handleResetSeed} 
            disabled={isLoading}
            className="gap-2 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400"
          >
            <ArrowLeftRight className="w-4 h-4" />
            Sync Catalogue
          </Button>
          <Button onClick={handleCreate} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Asset
          </Button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? `All Categories (${assets.length})` : `${cat} (${categoryCounts[cat] || 0})`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Assets Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-900/50 border-b border-gray-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Exchange
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  24h Change
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Volume
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Leverage Tiers
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {paginatedAssets.map((asset) => {
                const liveData = prices[asset.symbol];
                const displayPrice = liveData?.price ?? asset.price;
                const displayChange = liveData?.changePercent ?? asset.change24h;
                const displayVolume = liveData?.volume ?? asset.volume;
                
                return (
                <tr key={asset.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold">{asset.symbol}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{asset.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      asset.category === 'Crypto'
                        ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                        : asset.category === 'Forex'
                        ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : asset.category === 'Stocks'
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                        : asset.category === 'Indices'
                        ? 'bg-cyan-100 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400'
                        : asset.category === 'Funds'
                        ? 'bg-teal-100 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'
                        : asset.category === 'Futures'
                        ? 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                        : asset.category === 'Bonds'
                        ? 'bg-rose-100 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400'
                        : asset.category === 'Economy'
                        ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
                        : asset.category === 'Options'
                        ? 'bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400'
                        : 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                    }`}>
                      {asset.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">{asset.exchange}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-mono font-semibold">${formatCurrency(displayPrice)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-1 font-semibold ${
                      displayChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {displayChange >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {displayChange >= 0 ? '+' : ''}{displayChange.toFixed(2)}%
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">{displayVolume}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300" title="Basic ($250)">
                        B:{asset.leverage.basic}x
                      </span>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300" title="Standard ($5,000)">
                        S:{asset.leverage.standard}x
                      </span>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300" title="Silver ($25,000)">
                        Sv:{asset.leverage.silver}x
                      </span>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300" title="Gold ($50,000)">
                        G:{asset.leverage.gold}x
                      </span>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300" title="Platinum ($100,000)">
                        P:{asset.leverage.platinum}x
                      </span>
                    </div>
                  </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(asset)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          asset.enabled
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                            : 'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {asset.enabled ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(asset)}
                          title="Edit Asset"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(asset.symbol)}
                          title="Delete Asset"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
        {/* Results count */}
        <div className="px-6 py-3 border-t border-gray-200 dark:border-slate-700 text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredAssets.length === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + rowsPerPage, filteredAssets.length)} of {filteredAssets.length} results
          {filteredAssets.length !== assets.length && <span className="ml-1">({assets.length} total)</span>}
        </div>
        {/* Pagination controls */}
        <div className="px-6 py-3 border-t border-gray-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Page navigation */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(1)}
              disabled={safePage === 1}
              title="First page"
            >
              <ChevronsLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(safePage - 1)}
              disabled={safePage === 1}
              title="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {/* Page number buttons */}
            {(() => {
              const pages: number[] = [];
              const maxVisible = 5;
              let start = Math.max(1, safePage - Math.floor(maxVisible / 2));
              const end = Math.min(totalPages, start + maxVisible - 1);
              if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);
              for (let i = start; i <= end; i++) pages.push(i);
              return pages.map(p => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-8 h-8 rounded-lg text-sm font-semibold transition-colors ${
                    p === safePage
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {p}
                </button>
              ));
            })()}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(safePage + 1)}
              disabled={safePage === totalPages}
              title="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(totalPages)}
              disabled={safePage === totalPages}
              title="Last page"
            >
              <ChevronsRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Rows per page */}
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => handleRowsPerPageChange(parseInt(e.target.value, 10))}
              className="px-2 py-1 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="125">All</option>
            </select>
          </div>
        </div>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogMode === 'create' ? 'Add New Asset' : 'Edit Asset'}
            </DialogTitle>
            <DialogDescription>
              {dialogMode === 'create'
                ? 'Enter the details of the new asset.'
                : 'Update the details of the asset.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Symbol</label>
              <Input
                value={formData.symbol}
                onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                placeholder="e.g., BTCUSD, AAPL"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Full Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Bitcoin / U.S. Dollar"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                <option value="Crypto">Crypto</option>
                <option value="Forex">Forex</option>
                <option value="Stocks">Stocks</option>
                <option value="Commodities">Commodities</option>
                <option value="Indices">Indices</option>
                <option value="Funds">Funds</option>
                <option value="Futures">Futures</option>
                <option value="Bonds">Bonds</option>
                <option value="Economy">Economy</option>
                <option value="Options">Options</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Exchange</label>
              <Input
                value={formData.exchange}
                onChange={(e) => setFormData({ ...formData, exchange: e.target.value })}
                placeholder="e.g., Bitstamp, NASDAQ"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Initial Price</label>
              <Input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="Enter current price"
              />
            </div>

            <div className="border-t border-gray-200 dark:border-slate-700 pt-4">
              <label className="block text-sm font-semibold mb-3">Leverage Limits by Subscription Plan</label>
              <div className="grid grid-cols-5 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-gray-400 mr-1 align-middle"></span>
                    Basic
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="500"
                    value={formData.leverage.basic}
                    onChange={(e) => setFormData({ ...formData, leverage: { ...formData.leverage, basic: parseInt(e.target.value) || 1 } })}
                    placeholder="10"
                  />
                  <span className="text-[10px] text-gray-400 mt-0.5 block">$250</span>
                </div>
                <div>
                  <label className="block text-xs text-blue-600 dark:text-blue-400 mb-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1 align-middle"></span>
                    Standard
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="500"
                    value={formData.leverage.standard}
                    onChange={(e) => setFormData({ ...formData, leverage: { ...formData.leverage, standard: parseInt(e.target.value) || 1 } })}
                    placeholder="20"
                  />
                  <span className="text-[10px] text-gray-400 mt-0.5 block">$5,000</span>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-300 mb-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-slate-400 mr-1 align-middle"></span>
                    Silver
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="500"
                    value={formData.leverage.silver}
                    onChange={(e) => setFormData({ ...formData, leverage: { ...formData.leverage, silver: parseInt(e.target.value) || 1 } })}
                    placeholder="35"
                  />
                  <span className="text-[10px] text-gray-400 mt-0.5 block">$25,000</span>
                </div>
                <div>
                  <label className="block text-xs text-yellow-600 dark:text-yellow-300 mb-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mr-1 align-middle"></span>
                    Gold
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="500"
                    value={formData.leverage.gold}
                    onChange={(e) => setFormData({ ...formData, leverage: { ...formData.leverage, gold: parseInt(e.target.value) || 1 } })}
                    placeholder="50"
                  />
                  <span className="text-[10px] text-gray-400 mt-0.5 block">$50,000</span>
                </div>
                <div>
                  <label className="block text-xs text-purple-600 dark:text-purple-300 mb-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mr-1 align-middle"></span>
                    Platinum
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="500"
                    value={formData.leverage.platinum}
                    onChange={(e) => setFormData({ ...formData, leverage: { ...formData.leverage, platinum: parseInt(e.target.value) || 1 } })}
                    placeholder="75"
                  />
                  <span className="text-[10px] text-gray-400 mt-0.5 block">$100,000</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Set the maximum leverage allowed for each subscription tier. Higher tiers should allow greater leverage.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {dialogMode === 'create' ? 'Add Asset' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}