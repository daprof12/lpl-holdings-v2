import { useState, useRef } from 'react';
import { X, Upload, ImageIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { formatPct, formatCurrency } from '../../utils/formatNumber';
import { InvestmentOffer, ProfitabilityTier, PROFITABILITY_TIER_LABELS } from '../../contexts/InvestmentContext';
import { showSuccessToast, showErrorToast } from '../common/ToastNotifications';
import { useMarketData } from '../../contexts/MarketDataContext';

// Default investment categories for IPO offers
const DEFAULT_CATEGORIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Real Estate',
  'Energy',
  'Consumer Goods',
  'Manufacturing',
  'Telecommunications',
  'Transportation',
  'Agriculture',
];

// Function to load custom categories from localStorage
const loadCustomCategories = (): string[] => {
  const stored = localStorage.getItem('gross_custom_categories');
  return stored ? JSON.parse(stored) : [];
};

// Function to save custom categories to localStorage
const saveCustomCategories = (categories: string[]) => {
  localStorage.setItem('gross_custom_categories', JSON.stringify(categories));
};

interface EnhancedOfferModalProps {
  offer: InvestmentOffer | null;
  onClose: () => void;
  onSave: (data: Omit<InvestmentOffer, 'id' | 'createdAt'>) => void;
}

export default function EnhancedOfferModal({ offer, onClose, onSave }: EnhancedOfferModalProps) {
  const [formData, setFormData] = useState({
    name: offer?.name || '',
    logo: offer?.logo || '',
    type: offer?.type || 'IPO' as 'IPO' | 'ECN',
    exchanger: offer?.exchanger || '',
    profitability: offer?.profitability || 0,
    profitabilityTier: offer?.profitabilityTier || 'average_yield' as ProfitabilityTier,
    period: offer?.period || 30,
    category: offer?.category || '',
    price: offer?.price || 0,
    totalUnits: offer?.totalUnits || 0,
    availableUnits: offer?.availableUnits || 0,
    minPurchase: offer?.minPurchase || 1,
    maxPurchase: offer?.maxPurchase || 1000,
    description: offer?.description || '',
    enabled: offer?.enabled ?? true,
    assetSymbol: (offer as any)?.assetSymbol || '',
    marketPrice: (offer as any)?.marketPrice || 0,
  });

  const [customCategories, setCustomCategories] = useState<string[]>(loadCustomCategories());
  const [newCategory, setNewCategory] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<any | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string>(offer?.logo || '');
  const [showAssetSelector, setShowAssetSelector] = useState(false);
  const [assetSearchTerm, setAssetSearchTerm] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const marketData = useMarketData();

  // Get unique asset categories for ECN
  const assetCategories = Array.from(new Set(marketData.assets.map(a => a.category)));
  const [selectedAssetCategory, setSelectedAssetCategory] = useState<string>('');

  // Filter assets by category and search term
  const filteredAssets = marketData.assets.filter(asset => {
    const matchesCategory = !selectedAssetCategory || asset.category === selectedAssetCategory;
    const matchesSearch = !assetSearchTerm || 
      asset.name.toLowerCase().includes(assetSearchTerm.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(assetSearchTerm.toLowerCase());
    return matchesCategory && matchesSearch && asset.is_active;
  });

  // Combine default and custom categories
  const allCategories = [...DEFAULT_CATEGORIES, ...customCategories];

  const handleAddCategory = () => {
    if (newCategory.trim() && !allCategories.includes(newCategory.trim())) {
      const updatedCustomCategories = [...customCategories, newCategory.trim()];
      setCustomCategories(updatedCustomCategories);
      saveCustomCategories(updatedCustomCategories);
      setFormData({ ...formData, category: newCategory.trim() });
      setNewCategory('');
      showSuccessToast('Category added successfully');
    } else if (allCategories.includes(newCategory.trim())) {
      showErrorToast('Category already exists');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setUploadedImage(result);
        setFormData({ ...formData, logo: result });
        showSuccessToast('Image uploaded successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAssetSelect = (asset: any) => {
    setSelectedAsset(asset);
    setFormData({
      ...formData,
      name: asset.name,
      assetSymbol: asset.symbol,
      marketPrice: marketData.getPrice(asset.symbol)?.price || 0,
      category: asset.category,
    });
    setShowAssetSelector(false);
    showSuccessToast(`Asset ${asset.symbol} selected`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const priceDifference = formData.marketPrice > 0 ? 
    formatPct((formData.price - formData.marketPrice) / formData.marketPrice * 100) : '0.00%';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">{offer ? 'Edit' : 'Create'} Investment Offer</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Asset Image Upload */}
          <div>
            <Label>Asset Image</Label>
            <div className="mt-2 flex items-center gap-4">
              {uploadedImage ? (
                <div className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-slate-600">
                  <img src={uploadedImage} alt="Asset" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setUploadedImage('');
                      setFormData({ ...formData, logo: '' });
                    }}
                    className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 dark:border-slate-600 flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <div className="flex-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Upload asset image (JPG, PNG, max 5MB)
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Type</Label>
              <select
                value={formData.type}
                onChange={(e) => {
                  const newType = e.target.value as 'IPO' | 'ECN';
                  setFormData({ ...formData, type: newType });
                  if (newType === 'ECN') {
                    setShowAssetSelector(true);
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
                required
              >
                <option value="IPO">IPO</option>
                <option value="ECN">ECN</option>
              </select>
            </div>

            {formData.type === 'ECN' && (
              <div>
                <Label>Select Trading Asset</Label>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAssetSelector(true)}
                  className="w-full"
                >
                  {selectedAsset ? `${selectedAsset.symbol} - $${selectedAsset.price}` : 'Choose Asset'}
                </Button>
              </div>
            )}
          </div>

          {/* ECN Asset Selector Modal */}
          {showAssetSelector && formData.type === 'ECN' && (
            <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold">Select Trading Asset</h4>
                  <button
                    type="button"
                    onClick={() => setShowAssetSelector(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Asset Search and Category Filter */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <Input
                    placeholder="Search by symbol or name..."
                    value={assetSearchTerm}
                    onChange={(e) => setAssetSearchTerm(e.target.value)}
                  />
                  <select
                    value={selectedAssetCategory}
                    onChange={(e) => setSelectedAssetCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
                  >
                    <option value="">All Categories</option>
                    {assetCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Asset List */}
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredAssets.map(asset => (
                    <button
                      key={asset.id}
                      type="button"
                      onClick={() => handleAssetSelect(asset)}
                      className="w-full p-4 border border-gray-200 dark:border-slate-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{asset.symbol}</span>
                            <span className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-slate-700">
                              {asset.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{asset.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{asset.base_currency}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">${formatCurrency(marketData.getPrice(asset.symbol)?.price || 0)}</div>
                          <div className={`text-sm flex items-center justify-end gap-1 ${
                            (marketData.getPrice(asset.symbol)?.change || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {(marketData.getPrice(asset.symbol)?.change || 0) >= 0 ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            {(marketData.getPrice(asset.symbol)?.change || 0) >= 0 ? '+' : ''}{formatPct(marketData.getPrice(asset.symbol)?.changePercent || 0)}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                  {filteredAssets.length === 0 && (
                    <p className="text-center py-8 text-gray-500">No assets found</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Selected Asset Display (ECN only) */}
          {formData.type === 'ECN' && selectedAsset && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Selected Asset</p>
                  <p className="font-bold text-lg">{selectedAsset.symbol} - {selectedAsset.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Category: {selectedAsset.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Current Market Price</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ${formatCurrency(marketData.getPrice(selectedAsset.symbol)?.price || 0)}
                  </p>
                  <p className={`text-sm ${(marketData.getPrice(selectedAsset.symbol)?.change || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {(marketData.getPrice(selectedAsset.symbol)?.change || 0) >= 0 ? '+' : ''}{(marketData.getPrice(selectedAsset.symbol)?.changePercent || 0).toFixed(2)}% (24h)
                  </p>
                </div>
              </div>
            </div>
          )}

          <div>
            <Label>Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="Investment offer name"
            />
          </div>

          {/* Exchanger */}
          <div>
            <Label>Exchanger</Label>
            <Input
              value={formData.exchanger}
              onChange={(e) => setFormData({ ...formData, exchanger: e.target.value })}
              required
              placeholder="e.g., NYSE, NASDAQ, Binance, Coinbase"
            />
          </div>

          {/* Profitability Tier + Custom Percentage */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <Label>Profitability Tier</Label>
              <select
                value={formData.profitabilityTier}
                onChange={(e) => setFormData({ ...formData, profitabilityTier: e.target.value as ProfitabilityTier })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
                required
              >
                {(Object.keys(PROFITABILITY_TIER_LABELS) as ProfitabilityTier[]).map(tier => (
                  <option key={tier} value={tier}>{PROFITABILITY_TIER_LABELS[tier]}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Select the yield classification for this offer
              </p>
            </div>
            <div>
              <Label>Return (%)</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.profitability}
                onChange={(e) => setFormData({ ...formData, profitability: parseFloat(e.target.value) || 0 })}
                required
                placeholder="e.g., 15.5"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Custom % for this tier
              </p>
            </div>
          </div>

          {/* Period field - only show for IPO offers */}
          {formData.type === 'IPO' && (
            <div>
              <Label>Period (days)</Label>
              <Input
                type="number"
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: parseInt(e.target.value) })}
                required
              />
            </div>
          )}

          {formData.type === 'IPO' && (
            <div>
              <Label>Category</Label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
                required
              >
                <option value="">Select a category</option>
                {allCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
                <option value="add_new">Add New Category</option>
              </select>
              {formData.category === 'add_new' && (
                <div className="mt-2 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-600">
                  <Input
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter new category"
                    className="mb-2"
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleAddCategory}
                  >
                    Add Category
                  </Button>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Price per Unit ($)</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                required
              />
              {/* Price Comparison for ECN */}
              {formData.type === 'ECN' && formData.marketPrice > 0 && (
                <div className="mt-2 text-xs">
                  <p className="text-gray-600 dark:text-gray-400">
                    Market: ${formatCurrency(formData.marketPrice)}
                  </p>
                  <p className={`font-semibold ${parseFloat(priceDifference as string) >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {parseFloat(priceDifference as string) >= 0 ? '+' : ''}{priceDifference} vs market
                  </p>
                </div>
              )}
            </div>
            <div>
              <Label>Total Units</Label>
              <Input
                type="number"
                value={formData.totalUnits}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  totalUnits: parseInt(e.target.value), 
                  availableUnits: offer ? formData.availableUnits : parseInt(e.target.value) 
                })}
                required
              />
            </div>
            <div>
              <Label>Available Units</Label>
              <Input
                type="number"
                value={formData.availableUnits}
                onChange={(e) => setFormData({ ...formData, availableUnits: parseInt(e.target.value) })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Min Purchase</Label>
              <Input
                type="number"
                value={formData.minPurchase}
                onChange={(e) => setFormData({ ...formData, minPurchase: parseInt(e.target.value) })}
                required
              />
            </div>
            <div>
              <Label>Max Purchase</Label>
              <Input
                type="number"
                value={formData.maxPurchase}
                onChange={(e) => setFormData({ ...formData, maxPurchase: parseInt(e.target.value) })}
                required
              />
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 min-h-[100px]"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="enabled"
              checked={formData.enabled}
              onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
              className="w-4 h-4"
            />
            <Label htmlFor="enabled">Enable this offer</Label>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-slate-700">
            <Button type="submit" className="flex-1">
              {offer ? 'Update' : 'Create'} Offer
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}