import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useMarketData } from '../../contexts/MarketDataContext';
import { useAuth } from '../../contexts/AuthContext';
import { formatPercentage, formatCurrency } from '../../utils/formatNumber';
import { Plus, Sparkles, Star, TrendingUp, TrendingDown } from 'lucide-react';

export default function MarketWatchlist() {
  const navigate = useNavigate();
  const { currentUser, userPreferences, updatePreferences } = useAuth();
  const marketData = useMarketData();
  
  // Complete asset definitions
  const allAssetDefinitions = [
    // Crypto
    { symbol: 'BTCUSD', name: 'Bitcoin', category: 'Crypto' },
    { symbol: 'ETHUSD', name: 'Ethereum', category: 'Crypto' },
    { symbol: 'BNBUSD', name: 'Binance Coin', category: 'Crypto' },
    { symbol: 'XRPUSD', name: 'Ripple', category: 'Crypto' },
    { symbol: 'ADAUSD', name: 'Cardano', category: 'Crypto' },
    { symbol: 'SOLUSD', name: 'Solana', category: 'Crypto' },
    // Forex
    { symbol: 'EURUSD', name: 'Euro / US Dollar', category: 'Forex' },
    { symbol: 'GBPUSD', name: 'British Pound / US Dollar', category: 'Forex' },
    { symbol: 'USDJPY', name: 'US Dollar / Japanese Yen', category: 'Forex' },
    { symbol: 'AUDUSD', name: 'Australian Dollar / US Dollar', category: 'Forex' },
    { symbol: 'USDCAD', name: 'US Dollar / Canadian Dollar', category: 'Forex' },
    { symbol: 'NZDUSD', name: 'New Zealand Dollar / US Dollar', category: 'Forex' },
    { symbol: 'USDCHF', name: 'US Dollar / Swiss Franc', category: 'Forex' },
    // Stocks
    { symbol: 'AAPL', name: 'Apple Inc.', category: 'Stocks' },
    { symbol: 'MSFT', name: 'Microsoft Corporation', category: 'Stocks' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', category: 'Stocks' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', category: 'Stocks' },
    { symbol: 'TSLA', name: 'Tesla Inc.', category: 'Stocks' },
    { symbol: 'META', name: 'Meta Platforms Inc.', category: 'Stocks' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', category: 'Stocks' },
    { symbol: 'JPM', name: 'JPMorgan Chase & Co.', category: 'Stocks' },
    { symbol: 'V', name: 'Visa Inc.', category: 'Stocks' },
    { symbol: 'WMT', name: 'Walmart Inc.', category: 'Stocks' },
    // Indices
    { symbol: 'SPX', name: 'S&P 500', category: 'Indices' },
    { symbol: 'DJI', name: 'Dow Jones Industrial Average', category: 'Indices' },
    { symbol: 'IXIC', name: 'NASDAQ Composite', category: 'Indices' },
    { symbol: 'NDX', name: 'NASDAQ 100', category: 'Indices' },
    // Commodities
    { symbol: 'XAUUSD', name: 'Gold Spot / US Dollar', category: 'Commodities' },
    { symbol: 'XAGUSD', name: 'Silver Spot / US Dollar', category: 'Commodities' },
    { symbol: 'USOIL', name: 'Crude Oil WTI', category: 'Commodities' },
    { symbol: 'UKOIL', name: 'Brent Crude Oil', category: 'Commodities' },
    // Funds
    { symbol: 'SPY', name: 'SPDR S&P 500 ETF Trust', category: 'Funds' },
    { symbol: 'QQQ', name: 'Invesco QQQ Trust', category: 'Funds' },
    { symbol: 'VOO', name: 'Vanguard S&P 500 ETF', category: 'Funds' },
    { symbol: 'VTI', name: 'Vanguard Total Stock Market ETF', category: 'Funds' },
    { symbol: 'IWM', name: 'iShares Russell 2000 ETF', category: 'Funds' },
    // Futures
    { symbol: 'ES', name: 'E-mini S&P 500 Futures', category: 'Futures' },
    { symbol: 'NQ', name: 'E-mini NASDAQ 100 Futures', category: 'Futures' },
    { symbol: 'YM', name: 'E-mini Dow Futures', category: 'Futures' },
    { symbol: 'GC', name: 'Gold Futures', category: 'Futures' },
    { symbol: 'CL', name: 'Crude Oil Futures', category: 'Futures' },
    // Bonds
    { symbol: 'TLT', name: '20+ Year Treasury Bond ETF', category: 'Bonds' },
    { symbol: 'IEF', name: '7-10 Year Treasury ETF', category: 'Bonds' },
    { symbol: 'SHY', name: '1-3 Year Treasury ETF', category: 'Bonds' },
    { symbol: 'AGG', name: 'Core US Aggregate Bond ETF', category: 'Bonds' },
    { symbol: 'LQD', name: 'Investment Grade Corp Bond ETF', category: 'Bonds' },
    // Economy
    { symbol: 'DXY', name: 'US Dollar Index', category: 'Economy' },
    { symbol: 'VIX', name: 'CBOE Volatility Index', category: 'Economy' },
    { symbol: 'TNX', name: '10-Year Treasury Yield', category: 'Economy' },
    { symbol: 'BTC.D', name: 'Bitcoin Dominance', category: 'Economy' },
    // Options
    { symbol: 'SPY-OPT', name: 'SPY Options', category: 'Options' },
    { symbol: 'QQQ-OPT', name: 'QQQ Options', category: 'Options' },
    { symbol: 'AAPL-OPT', name: 'AAPL Options', category: 'Options' },
    { symbol: 'TSLA-OPT', name: 'TSLA Options', category: 'Options' },
    { symbol: 'NVDA-OPT', name: 'NVDA Options', category: 'Options' },
  ];

  // Use favorites from userPreferences
  const favorites = userPreferences?.watchlist || [];
  
  // Filter to only show favorited assets
  const favoriteAssets = allAssetDefinitions.filter(asset => 
    favorites.includes(asset.symbol)
  );

  // Subscribe to favorite symbols
  useEffect(() => {
    favoriteAssets.forEach(({ symbol }) => {
      marketData.subscribeToSymbol(symbol);
    });
    
    return () => {
      favoriteAssets.forEach(({ symbol }) => {
        marketData.unsubscribeFromSymbol(symbol);
      });
    };
  }, [favorites.length]);

  // Get watchlist with real market data
  const watchlist = favoriteAssets.map(({ symbol, name, category }) => {
    const priceData = marketData.getPrice(symbol);
    return {
      symbol,
      name,
      category,
      price: priceData?.price || 0,
      change: priceData?.changePercent || 0,
    };
  });

  // Find top gainer and loser
  const topGainer = watchlist.length > 0 
    ? watchlist.reduce((max, item) => item.change > max.change ? item : max, watchlist[0])
    : null;
  const topLoser = watchlist.length > 0
    ? watchlist.reduce((min, item) => item.change < min.change ? item : min, watchlist[0])
    : null;

  // Toggle favorite and sync with relational backend
  const toggleFavorite = async (symbol: string) => {
    const updatedFavorites = favorites.includes(symbol)
      ? favorites.filter((s: string) => s !== symbol)
      : [...favorites, symbol];
    
    if (currentUser) {
      await updatePreferences({ watchlist: updatedFavorites });
    } else {
      localStorage.setItem('marketFavorites', JSON.stringify(updatedFavorites));
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg">Market Watchlist</h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate('/markets')}
          title="Add favorites from Markets page"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Watchlist Items */}
      <div className="space-y-3 max-h-[240px] overflow-y-auto">
        {watchlist.length === 0 ? (
          // Empty state when no favorites
          <div className="text-center py-8">
            <Sparkles className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
            <p className="text-gray-500 dark:text-gray-400 mb-2">No favorites yet</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Add favorites from the Markets page
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4"
              onClick={() => navigate('/markets')}
            >
              Browse Markets
            </Button>
          </div>
        ) : (
          watchlist.map((item) => {
            const isPositive = item.change >= 0;
            
            return (
              <div
                key={item.symbol}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors"
                onClick={() => {
                  // Remove slashes from symbol for URL compatibility
                  const urlSymbol = item.symbol.replace(/\//g, '');
                  navigate(`/trading/${urlSymbol}`);
                }}
              >
                <div className="flex items-center gap-3 flex-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.symbol);
                    }}
                    className="text-yellow-500 hover:text-yellow-600"
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{item.symbol}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.name}</div>
                  </div>
                </div>

                <div className="text-right ml-4">
                  <div className="font-semibold">${formatCurrency(item.price)}</div>
                  <div className={`flex items-center justify-end gap-1 text-xs ${
                    isPositive 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {isPositive ? '+' : ''}{formatPercentage(item.change)}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* View All Button */}
      <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/markets')}>
        View All Markets
      </Button>

      {/* Mini Chart Placeholder */}
      {watchlist.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick Stats</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {topGainer && (
              <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                <div className="text-green-600 dark:text-green-400 text-xs">Top Gainer</div>
                <div className="font-semibold">{topGainer.symbol} +{formatPercentage(topGainer.change)}</div>
              </div>
            )}
            {topLoser && (
              <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded">
                <div className="text-red-600 dark:text-red-400 text-xs">Top Loser</div>
                <div className="font-semibold">{topLoser.symbol} {formatPercentage(topLoser.change)}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}