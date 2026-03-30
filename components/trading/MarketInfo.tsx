import { TrendingUp, TrendingDown, DollarSign, Activity, BarChart3, Clock } from 'lucide-react';
import { formatCurrency, formatNumber, formatPercentage, formatLargeNumber } from '../../utils/formatNumber';

interface MarketInfoProps {
  asset: {
    symbol: string;
    name: string;
    category: string;
    currentPrice: number;
    change24h: number;
    high24h: number;
    low24h: number;
    volume24h: number;
    marketCap?: number;
    bid: number;
    ask: number;
    spread: number;
  };
}

export default function MarketInfo({ asset }: MarketInfoProps) {
  const isPositive = asset.change24h >= 0;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Current Price</div>
          </div>
          <div className="text-2xl mb-1">${formatCurrency(asset.currentPrice)}</div>
          <div className={`flex items-center gap-1 text-sm ${
            isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {isPositive ? '+' : ''}{formatNumber(asset.change24h)}%
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">24h Volume</div>
          </div>
          <div className="text-2xl">{formatLargeNumber(asset.volume24h)}</div>
        </div>

        {asset.marketCap && (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Market Cap</div>
            </div>
            <div className="text-2xl">{formatLargeNumber(asset.marketCap)}</div>
          </div>
        )}

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Spread</div>
          </div>
          <div className="text-2xl">${formatNumber(asset.spread)}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {formatNumber((asset.spread / asset.currentPrice) * 100)}%
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Price Statistics */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg mb-6">Price Statistics</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-slate-700">
              <span className="text-gray-600 dark:text-gray-400">24h High</span>
              <span className="font-semibold">${formatCurrency(asset.high24h)}</span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-slate-700">
              <span className="text-gray-600 dark:text-gray-400">24h Low</span>
              <span className="font-semibold">${formatCurrency(asset.low24h)}</span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-slate-700">
              <span className="text-gray-600 dark:text-gray-400">Bid Price</span>
              <span className="font-semibold text-red-600 dark:text-red-400">${formatCurrency(asset.bid)}</span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-slate-700">
              <span className="text-gray-600 dark:text-gray-400">Ask Price</span>
              <span className="font-semibold text-green-600 dark:text-green-400">${formatCurrency(asset.ask)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">24h Change</span>
              <span className={`font-semibold ${
                isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {isPositive ? '+' : ''}{formatNumber(asset.change24h)}%
              </span>
            </div>
          </div>
        </div>

        {/* Trading Information */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg mb-6">Trading Information</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-slate-700">
              <span className="text-gray-600 dark:text-gray-400">Symbol</span>
              <span className="font-semibold">{asset.symbol}</span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-slate-700">
              <span className="text-gray-600 dark:text-gray-400">Category</span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded">
                {asset.category}
              </span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-slate-700">
              <span className="text-gray-600 dark:text-gray-400">Min Trade Size</span>
              <span className="font-semibold">0.01</span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-slate-700">
              <span className="text-gray-600 dark:text-gray-400">Max Leverage</span>
              <span className="font-semibold">100x</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Trading Hours</span>
              <span className="font-semibold">24/7</span>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg mb-4">About {asset.name}</h3>
        <div className="space-y-4 text-gray-600 dark:text-gray-400">
          <p>
            {asset.name} ({asset.symbol}) is a {asset.category.toLowerCase()} trading instrument available on the Gross platform.
            Trade with leverage up to 100x and access real-time market data, advanced charting tools, and professional-grade execution.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 pt-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">Liquidity</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">High</div>
            </div>
            
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-sm text-green-600 dark:text-green-400 mb-1">Volatility</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">Medium</div>
            </div>
            
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-sm text-purple-600 dark:text-purple-400 mb-1">Commission</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">0.1%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}