import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Maximize2, Search, Settings, TrendingUp, BarChart3, Activity, Bell, RotateCcw, Undo, Redo, Camera, Plus, X, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
import { useMarketData } from '../../contexts/MarketDataContext';
import { useTrading } from '../../contexts/TradingContext';
import { formatCurrency, formatNumber } from '../../utils/formatNumber';
import SymbolSearchModal from './SymbolSearchModal';

interface TradingChartProps {
  symbol: string;
}

export default function TradingChart({ symbol }: TradingChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSymbolSearch, setShowSymbolSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState(symbol);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [chartType, setChartType] = useState('Candlestick');
  const [showIndicators, setShowIndicators] = useState(false);
  const [activeIndicators, setActiveIndicators] = useState<string[]>([]);
  const [indicatorSearch, setIndicatorSearch] = useState('');
  // Inline animated search state
  const [searchOpen, setSearchOpen] = useState(false);
  const [inlineSearch, setInlineSearch] = useState('');
  const marketDataContext = useMarketData();
  const { account } = useTrading();

  // Auto-focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // ── KEY FIX: sync internal selectedSymbol whenever the parent passes a new symbol prop
  // (e.g. Markets → Trade button, or chart search triggers navigate → TradingPage re-renders)
  useEffect(() => {
    if (symbol && symbol !== selectedSymbol) {
      setSelectedSymbol(symbol);
    }
  }, [symbol]);

  // Get real market data for the selected symbol
  const priceData = marketDataContext.getPrice(selectedSymbol);
  
  const marketData = {
    price: priceData?.price ?? 0,
    change: priceData?.change ?? 0,
    changePercent: priceData?.changePercent ?? 0,
    high: priceData?.high ?? 0,
    low: priceData?.low ?? 0,
    open: priceData?.open ?? 0,
    volume: priceData?.volume ?? '0',
    bid: priceData?.bid ?? 0,
    ask: priceData?.ask ?? 0,
  };

  // Subscribe to the selected symbol
  useEffect(() => {
    marketDataContext.subscribeToSymbol(selectedSymbol);
    return () => {
      marketDataContext.unsubscribeFromSymbol(selectedSymbol);
    };
  }, [selectedSymbol]);

  // Timeframe options
  const timeframes = [
    { label: '1D', value: '1D', interval: 'D' },
    { label: '5D', value: '5D', interval: '5' },
    { label: '1M', value: '1M', interval: '30' },
    { label: '3M', value: '3M', interval: '60' },
    { label: '6M', value: '6M', interval: '120' },
    { label: 'YTD', value: 'YTD', interval: 'D' },
    { label: '1Y', value: '1Y', interval: 'W' },
    { label: 'All', value: 'All', interval: 'M' },
  ];

  // Chart types
  const chartTypes = [
    { label: 'Candlestick', value: '1', icon: '📊' },
    { label: 'Bar', value: '0', icon: '📈' },
    { label: 'Line', value: '2', icon: '📉' },
    { label: 'Area', value: '3', icon: '🌊' },
    { label: 'Heikin Ashi', value: '8', icon: '🕯️' },
    { label: 'Hollow Candles', value: '9', icon: '🕯️' },
  ];

  // Popular indicators with TradingView study IDs
  const indicatorStudyMap: Record<string, string> = {
    'Moving Average': 'MASimple@tv-basicstudies',
    'RSI': 'RSI@tv-basicstudies',
    'MACD': 'MACD@tv-basicstudies',
    'Bollinger Bands': 'BB@tv-basicstudies',
    'Stochastic': 'Stochastic@tv-basicstudies',
    'Volume': 'Volume@tv-basicstudies',
    'ATR': 'ATR@tv-basicstudies',
    'Ichimoku Cloud': 'IchimokuCloud@tv-basicstudies',
    'Parabolic SAR': 'ParabolicSAR@tv-basicstudies',
    'ADX': 'ADX@tv-basicstudies',
    'CCI': 'CCI@tv-basicstudies',
    'Williams %R': 'WilliamsR@tv-basicstudies',
    'EMA': 'MAExp@tv-basicstudies',
    'VWAP': 'VWAP@tv-basicstudies',
    'Pivot Points': 'PivotPointsStandard@tv-basicstudies',
    'Fibonacci Retracement': '',  // This is a drawing tool, not a study
  };

  const indicators = [
    { name: 'Moving Average', category: 'Trend' },
    { name: 'EMA', category: 'Trend' },
    { name: 'RSI', category: 'Momentum' },
    { name: 'MACD', category: 'Momentum' },
    { name: 'Bollinger Bands', category: 'Volatility' },
    { name: 'Stochastic', category: 'Momentum' },
    { name: 'Volume', category: 'Volume' },
    { name: 'ATR', category: 'Volatility' },
    { name: 'Ichimoku Cloud', category: 'Trend' },
    { name: 'Fibonacci Retracement', category: 'Support/Resistance' },
    { name: 'Pivot Points', category: 'Support/Resistance' },
    { name: 'VWAP', category: 'Volume' },
    { name: 'Williams %R', category: 'Momentum' },
    { name: 'CCI', category: 'Momentum' },
    { name: 'ADX', category: 'Trend' },
    { name: 'Parabolic SAR', category: 'Trend' },
  ];

  // Popular trading symbols organized by category - TradingView style with multiple exchanges
  const symbolCategories = {
    All: [
      // Crypto - Multiple exchanges
      { symbol: 'BTCUSD', name: 'Bitcoin / U.S. Dollar', type: 'Crypto', exchange: 'BITSTAMP' },
      { symbol: 'BTCUSD', name: 'Bitcoin / U.S. Dollar', type: 'Crypto', exchange: 'COINBASE' },
      { symbol: 'BTCUSD', name: 'Bitcoin Index', type: 'INDEX', exchange: 'CRYPTO' },
      { symbol: 'ETHUSD', name: 'Ethereum / US Dollar', type: 'Crypto', exchange: 'COINBASE' },
      { symbol: 'ETHUSD', name: 'Ethereum / US Dollar', type: 'Crypto', exchange: 'KRAKEN' },
      // Forex
      { symbol: 'EURUSD', name: 'Euro / US Dollar', type: 'Forex', exchange: 'FX_IDC' },
      { symbol: 'GBPUSD', name: 'British Pound / US Dollar', type: 'Forex', exchange: 'FX_IDC' },
      { symbol: 'USDJPY', name: 'US Dollar / Japanese Yen', type: 'Forex', exchange: 'FX_IDC' },
      // Stocks
      { symbol: 'AAPL', name: 'Apple Inc.', type: 'Stock', exchange: 'NASDAQ' },
      { symbol: 'MSFT', name: 'Microsoft Corporation', type: 'Stock', exchange: 'NASDAQ' },
      { symbol: 'TSLA', name: 'Tesla Inc.', type: 'Stock', exchange: 'NASDAQ' },
      // Commodities
      { symbol: 'XAUUSD', name: 'Gold Spot / US Dollar', type: 'Commodity', exchange: 'OANDA' },
      { symbol: 'USOIL', name: 'WTI Crude Oil', type: 'Commodity', exchange: 'OANDA' },
    ],
    Stocks: [
      { symbol: 'AAPL', name: 'Apple Inc.', type: 'Stock', exchange: 'NASDAQ' },
      { symbol: 'AAPL', name: 'Apple Inc.', type: 'Stock', exchange: 'NYSE' },
      { symbol: 'MSFT', name: 'Microsoft Corporation', type: 'Stock', exchange: 'NASDAQ' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', type: 'Stock', exchange: 'NASDAQ' },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', type: 'Stock', exchange: 'NASDAQ' },
      { symbol: 'TSLA', name: 'Tesla Inc.', type: 'Stock', exchange: 'NASDAQ' },
      { symbol: 'META', name: 'Meta Platforms Inc.', type: 'Stock', exchange: 'NASDAQ' },
      { symbol: 'NVDA', name: 'NVIDIA Corporation', type: 'Stock', exchange: 'NASDAQ' },
      { symbol: 'JPM', name: 'JPMorgan Chase & Co.', type: 'Stock', exchange: 'NYSE' },
      { symbol: 'V', name: 'Visa Inc.', type: 'Stock', exchange: 'NYSE' },
    ],
    Funds: [
      { symbol: 'SPY', name: 'SPDR S&P 500 ETF Trust', type: 'ETF', exchange: 'NYSE' },
      { symbol: 'QQQ', name: 'Invesco QQQ Trust', type: 'ETF', exchange: 'NASDAQ' },
      { symbol: 'VOO', name: 'Vanguard S&P 500 ETF', type: 'ETF', exchange: 'NYSE' },
      { symbol: 'VTI', name: 'Vanguard Total Stock Market ETF', type: 'ETF', exchange: 'NYSE' },
      { symbol: 'IWM', name: 'iShares Russell 2000 ETF', type: 'ETF', exchange: 'NYSE' },
    ],
    Futures: [
      { symbol: 'ES', name: 'E-mini S&P 500 Futures', type: 'Futures', exchange: 'CME' },
      { symbol: 'NQ', name: 'E-mini NASDAQ 100 Futures', type: 'Futures', exchange: 'CME' },
      { symbol: 'YM', name: 'E-mini Dow Futures', type: 'Futures', exchange: 'CBOT' },
      { symbol: 'GC', name: 'Gold Futures', type: 'Futures', exchange: 'COMEX' },
      { symbol: 'CL', name: 'Crude Oil Futures', type: 'Futures', exchange: 'NYMEX' },
    ],
    Forex: [
      { symbol: 'EURUSD', name: 'Euro / US Dollar', type: 'Forex', exchange: 'FX_IDC' },
      { symbol: 'EURUSD', name: 'Euro / US Dollar', type: 'Forex', exchange: 'OANDA' },
      { symbol: 'GBPUSD', name: 'British Pound / US Dollar', type: 'Forex', exchange: 'FX_IDC' },
      { symbol: 'GBPUSD', name: 'British Pound / US Dollar', type: 'Forex', exchange: 'OANDA' },
      { symbol: 'USDJPY', name: 'US Dollar / Japanese Yen', type: 'Forex', exchange: 'FX_IDC' },
      { symbol: 'AUDUSD', name: 'Australian Dollar / US Dollar', type: 'Forex', exchange: 'FX_IDC' },
      { symbol: 'USDCAD', name: 'US Dollar / Canadian Dollar', type: 'Forex', exchange: 'FX_IDC' },
      { symbol: 'NZDUSD', name: 'New Zealand Dollar / US Dollar', type: 'Forex', exchange: 'FX_IDC' },
      { symbol: 'USDCHF', name: 'US Dollar / Swiss Franc', type: 'Forex', exchange: 'FX_IDC' },
    ],
    CFD: [
      { symbol: 'US500', name: 'US 500 CFD', type: 'CFD', exchange: 'OANDA' },
      { symbol: 'US30', name: 'US 30 CFD', type: 'CFD', exchange: 'OANDA' },
      { symbol: 'NAS100', name: 'NASDAQ 100 CFD', type: 'CFD', exchange: 'OANDA' },
      { symbol: 'UK100', name: 'UK 100 CFD', type: 'CFD', exchange: 'OANDA' },
    ],
    Crypto: [
      { symbol: 'BTCUSD', name: 'Bitcoin / U.S. Dollar', type: 'Crypto', exchange: 'BITSTAMP' },
      { symbol: 'BTCUSD', name: 'Bitcoin / U.S. Dollar', type: 'Crypto', exchange: 'COINBASE' },
      { symbol: 'BTCUSD', name: 'Bitcoin / U.S. Dollar', type: 'Crypto', exchange: 'KRAKEN' },
      { symbol: 'BTCUSD', name: 'Bitcoin Index', type: 'INDEX', exchange: 'CRYPTO' },
      { symbol: 'ETHUSD', name: 'Ethereum / US Dollar', type: 'Crypto', exchange: 'COINBASE' },
      { symbol: 'ETHUSD', name: 'Ethereum / US Dollar', type: 'Crypto', exchange: 'KRAKEN' },
      { symbol: 'ETHUSD', name: 'Ethereum / US Dollar', type: 'Crypto', exchange: 'BITSTAMP' },
      { symbol: 'BNBUSD', name: 'Binance Coin / US Dollar', type: 'Crypto', exchange: 'BINANCE' },
      { symbol: 'ADAUSD', name: 'Cardano / US Dollar', type: 'Crypto', exchange: 'KRAKEN' },
      { symbol: 'SOLUSD', name: 'Solana / US Dollar', type: 'Crypto', exchange: 'COINBASE' },
      { symbol: 'XRPUSD', name: 'Ripple / US Dollar', type: 'Crypto', exchange: 'KRAKEN' },
      { symbol: 'XRPUSD', name: 'Ripple / US Dollar', type: 'Crypto', exchange: 'BITSTAMP' },
    ],
    Indices: [
      { symbol: 'SPX', name: 'S&P 500 Index', type: 'Index', exchange: 'SP' },
      { symbol: 'DJI', name: 'Dow Jones Industrial Average', type: 'Index', exchange: 'DJ' },
      { symbol: 'IXIC', name: 'NASDAQ Composite', type: 'Index', exchange: 'NASDAQ' },
      { symbol: 'NDX', name: 'NASDAQ 100', type: 'Index', exchange: 'NASDAQ' },
      { symbol: 'RUT', name: 'Russell 2000', type: 'Index', exchange: 'RUSSELL' },
      { symbol: 'VIX', name: 'CBOE Volatility Index', type: 'Index', exchange: 'CBOE' },
    ],
    Bonds: [
      { symbol: 'TLT', name: '20+ Year Treasury Bond ETF', type: 'Bond ETF', exchange: 'NASDAQ' },
      { symbol: 'IEF', name: '7-10 Year Treasury ETF', type: 'Bond ETF', exchange: 'NASDAQ' },
      { symbol: 'SHY', name: '1-3 Year Treasury ETF', type: 'Bond ETF', exchange: 'NASDAQ' },
      { symbol: 'AGG', name: 'Core US Aggregate Bond ETF', type: 'Bond ETF', exchange: 'NYSE' },
      { symbol: 'LQD', name: 'Investment Grade Corp Bond ETF', type: 'Bond ETF', exchange: 'NYSE' },
    ],
    Economy: [
      { symbol: 'DXY', name: 'US Dollar Index', type: 'Index', exchange: 'TVC' },
      { symbol: 'VIX', name: 'CBOE Volatility Index', type: 'Index', exchange: 'CBOE' },
      { symbol: 'TNX', name: '10-Year Treasury Yield', type: 'Bond Yield', exchange: 'CBOE' },
      { symbol: 'BTC.D', name: 'Bitcoin Dominance', type: 'Index', exchange: 'CRYPTO' },
    ],
    Options: [
      { symbol: 'SPY', name: 'SPY Options', type: 'Options', exchange: 'OPRA' },
      { symbol: 'QQQ', name: 'QQQ Options', type: 'Options', exchange: 'OPRA' },
      { symbol: 'AAPL', name: 'AAPL Options', type: 'Options', exchange: 'OPRA' },
      { symbol: 'TSLA', name: 'TSLA Options', type: 'Options', exchange: 'OPRA' },
      { symbol: 'NVDA', name: 'NVDA Options', type: 'Options', exchange: 'OPRA' },
    ],
    Commodities: [
      { symbol: 'XAUUSD', name: 'Gold Spot / US Dollar', type: 'Commodity', exchange: 'OANDA' },
      { symbol: 'XAUUSD', name: 'Gold Spot / US Dollar', type: 'Commodity', exchange: 'TVC' },
      { symbol: 'XAGUSD', name: 'Silver Spot / US Dollar', type: 'Commodity', exchange: 'OANDA' },
      { symbol: 'USOIL', name: 'WTI Crude Oil', type: 'Commodity', exchange: 'OANDA' },
      { symbol: 'UKOIL', name: 'Brent Crude Oil', type: 'Commodity', exchange: 'OANDA' },
    ],
  };

  // Inline search results (all categories, capped at 8)
  const inlineResults = searchOpen && inlineSearch.trim()
    ? symbolCategories.All.filter(
        s =>
          s.symbol.toLowerCase().includes(inlineSearch.toLowerCase()) ||
          s.name.toLowerCase().includes(inlineSearch.toLowerCase())
      ).slice(0, 8)
    : [];

  // Filter symbols based on search
  const getFilteredSymbols = () => {
    const symbols = symbolCategories[activeCategory as keyof typeof symbolCategories] || symbolCategories.All;
    if (!searchQuery) return symbols;
    
    return symbols.filter(
      s => 
        s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredSymbols = getFilteredSymbols();

  // Get category counts
  const getCategoryCount = (category: string) => {
    return symbolCategories[category as keyof typeof symbolCategories]?.length || 0;
  };

  // Initialize TradingView widget
  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous widget
    if (widgetRef.current && typeof widgetRef.current.remove === 'function') {
      try {
        widgetRef.current.remove();
      } catch (e) {
        // Silently handle widget removal errors
      }
      widgetRef.current = null;
    }
    
    containerRef.current.innerHTML = '';

    // Check if TradingView script is already loaded
    const initWidget = () => {
      if (typeof (window as any).TradingView === 'undefined' || !containerRef.current) return;
      
      const currentTimeframe = timeframes.find(tf => tf.value === selectedTimeframe);
      const currentChartType = chartTypes.find(ct => ct.label === chartType);
      
      // Build studies array from active indicators
      const studies = activeIndicators
        .filter(ind => indicatorStudyMap[ind]) // Only include indicators with valid study IDs
        .map(ind => indicatorStudyMap[ind]);
      
      try {
        widgetRef.current = new (window as any).TradingView.widget({
          autosize: true,
          symbol: selectedSymbol.replace('/', ''),
          interval: currentTimeframe?.interval || 'D',
          timezone: 'Etc/UTC',
          theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
          style: currentChartType?.value || '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: 'tradingview_chart',
          hide_side_toolbar: false,
          studies: studies,
          disabled_features: [
            'use_localstorage_for_settings',
          ],
          enabled_features: [
            'study_templates',
          ],
          loading_screen: {
            backgroundColor: '#ffffff',
            foregroundColor: '#2962FF',
          },
          overrides: {
            'mainSeriesProperties.candleStyle.upColor': '#10b981',
            'mainSeriesProperties.candleStyle.downColor': '#ef4444',
            'mainSeriesProperties.candleStyle.borderUpColor': '#10b981',
            'mainSeriesProperties.candleStyle.borderDownColor': '#ef4444',
            'mainSeriesProperties.candleStyle.wickUpColor': '#10b981',
            'mainSeriesProperties.candleStyle.wickDownColor': '#ef4444',
          },
        });

        // Listen for symbol changes inside the TradingView chart
        if (widgetRef.current && widgetRef.current.onChartReady) {
          widgetRef.current.onChartReady(() => {
            const tvWidget = widgetRef.current;
            if (tvWidget && tvWidget.activeChart) {
              tvWidget.activeChart().onSymbolChanged().subscribe(null, (symbolData: any) => {
                // Extract clean symbol from TradingView format
                let newSymbol = symbolData.name || '';
                
                // Remove exchange prefix if present (e.g., "NASDAQ:AAPL" → "AAPL")
                if (newSymbol.includes(':')) {
                  newSymbol = newSymbol.split(':')[1];
                }
                
                // Clean up the symbol
                newSymbol = newSymbol.replace(/[^A-Z0-9]/g, '');
                
                console.log('📊 TradingView symbol changed:', newSymbol);
                
                // Only navigate if symbol actually changed
                if (newSymbol && newSymbol !== selectedSymbol) {
                  // Navigate to new symbol's trading page
                  navigate(`/trading/${newSymbol}`);
                }
              });
            }
          });
        }
      } catch (e) {
        // Silently handle widget initialization errors
      }
    };

    // Check if script already exists
    const existingScript = document.querySelector('script[src="https://s3.tradingview.com/tv.js"]');
    
    if (existingScript) {
      // Script already loaded, initialize widget
      if (typeof (window as any).TradingView !== 'undefined') {
        initWidget();
      } else {
        // Wait for script to load
        existingScript.addEventListener('load', initWidget);
      }
    } else {
      // Create and load script
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = initWidget;
      script.onerror = () => {
        // Silently handle script loading errors
      };
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup widget on unmount
      if (widgetRef.current && typeof widgetRef.current.remove === 'function') {
        try {
          widgetRef.current.remove();
        } catch (e) {
          // Silently handle cleanup errors
        }
        widgetRef.current = null;
      }
    };
  }, [selectedSymbol, selectedTimeframe, chartType, activeIndicators]);

  // Update theme when dark mode changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      // Reload widget when theme changes
      if (containerRef.current) {
        const isDark = document.documentElement.classList.contains('dark');
        // Force widget recreation by changing key
        containerRef.current.innerHTML = '';
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const handleSymbolSelect = (sym: string) => {
    setSelectedSymbol(sym);
    setShowSymbolSearch(false);
    setSearchOpen(false);
    setInlineSearch('');
    // Navigate to the selected symbol's trading page
    navigate(`/trading/${sym}`);
  };

  const handleIndicatorClick = (indicatorName: string) => {
    if (activeIndicators.includes(indicatorName)) {
      // Remove indicator
      setActiveIndicators(prev => prev.filter(ind => ind !== indicatorName));
    } else {
      // Add indicator
      setActiveIndicators(prev => [...prev, indicatorName]);
    }
    // Note: TradingView widget doesn't support dynamic add/remove after initialization
    // We need to recreate the widget with new indicators
  };

  const handleRemoveIndicator = (indicatorName: string) => {
    setActiveIndicators(prev => prev.filter(ind => ind !== indicatorName));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.parentElement?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
        {/* Chart Toolbar - TradingView Style */}
        <div className="flex flex-col border-b border-gray-200 dark:border-slate-700">
          {/* Top Toolbar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              {/* Animated Inline Asset Search */}
              <div className="relative flex items-center">
                {/* Icon-only trigger */}
                {!searchOpen && (
                  <button
                    onClick={() => { setSearchOpen(false); setShowSymbolSearch(true); }}
                    title="Switch instrument"
                    className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500 transition-all group"
                  >
                    {/* Asset logo badge — colour-coded by asset class */}
                    <div className={[
                      'w-6 h-6 rounded-full flex items-center justify-center text-white flex-shrink-0 text-[9px] leading-none',
                      ['BTC','ETH','BNB','ADA','SOL','XRP','DOT','MATIC','LINK','AVAX','DOGE','LTC','BCH','UNI','AAVE','ATOM'].some(c => selectedSymbol.startsWith(c))
                        ? 'bg-orange-500'
                        : selectedSymbol === 'XAUUSD' ? 'bg-yellow-500'
                        : selectedSymbol === 'XAGUSD' ? 'bg-slate-400'
                        : (selectedSymbol === 'USOIL' || selectedSymbol === 'UKOIL') ? 'bg-slate-600'
                        : (['EUR','GBP','AUD','NZD','CHF','CAD'].some(c => selectedSymbol.startsWith(c)) && selectedSymbol.length === 6) ? 'bg-emerald-500'
                        : (selectedSymbol.startsWith('USD') && selectedSymbol.length === 6) ? 'bg-blue-500'
                        : ['SPX','DJI','IXIC','NDX','RUT','VIX','DXY','TNX'].includes(selectedSymbol) ? 'bg-purple-500'
                        : ['ES','NQ','YM','GC','CL'].includes(selectedSymbol) ? 'bg-red-500'
                        : 'bg-indigo-500',
                    ].join(' ')}>
                      {selectedSymbol.slice(0, 3)}
                    </div>
                    {/* Symbol text */}
                    <span className="text-sm text-gray-900 dark:text-gray-100 leading-none max-w-[90px] truncate">
                      {selectedSymbol}
                    </span>
                    {/* Chevron */}
                    <ChevronDown className="w-3 h-3 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors flex-shrink-0" />
                  </button>
                )}

                {/* Expanding animated input */}
                <div
                  style={{
                    width: searchOpen ? '220px' : '0px',
                    opacity: searchOpen ? 1 : 0,
                    transition: 'width 0.25s ease, opacity 0.2s ease',
                    overflow: 'hidden',
                  }}
                >
                  <div className="relative w-full">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={inlineSearch}
                      onChange={e => setInlineSearch(e.target.value)}
                      onBlur={() => setTimeout(() => { setSearchOpen(false); setInlineSearch(''); }, 200)}
                      onKeyDown={e => {
                        if (e.key === 'Escape') { setSearchOpen(false); setInlineSearch(''); }
                      }}
                      placeholder="Search assets…"
                      className="w-full pl-7 pr-6 py-1 text-xs rounded-md border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 outline-none focus:border-blue-400 dark:focus:border-blue-500"
                    />
                    <button
                      onClick={() => { setSearchOpen(false); setInlineSearch(''); }}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Inline dropdown results */}
                {inlineResults.length > 0 && (
                  <div className="absolute top-full left-0 mt-1.5 w-72 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto">
                    {inlineResults.map((item, i) => (
                      <button
                        key={`${item.symbol}-${item.exchange}-${i}`}
                        onMouseDown={() => handleSymbolSelect(item.symbol)}
                        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-slate-700 text-left border-b border-gray-100 dark:border-slate-700 last:border-b-0 transition-colors"
                      >
                        <div>
                          <div className="font-semibold text-sm text-gray-900 dark:text-gray-100">{item.symbol}</div>
                          <div className="text-xs text-gray-400 truncate max-w-[160px]">{item.name}</div>
                        </div>
                        <span className="text-xs text-gray-400 ml-2 shrink-0">{item.exchange}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Chart Type Selector */}
              <Popover>
                <PopoverTrigger className="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md transition-colors" title="Chart Type">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-xs hidden md:inline">{chartType}</span>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2">
                  <div className="space-y-1">
                    {chartTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setChartType(type.label)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                          chartType === type.label
                            ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'hover:bg-gray-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        <span>{type.icon}</span>
                        <span>{type.label}</span>
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              <div className="w-px h-6 bg-gray-200 dark:bg-slate-700" />

              {/* Drawing Tools */}
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-gray-100 dark:hover:bg-slate-700"
                title="Drawing Tools"
              >
                <Activity className="w-4 h-4" />
              </Button>

              {/* Indicators */}
              <Popover open={showIndicators} onOpenChange={setShowIndicators}>
                <PopoverTrigger className="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md transition-colors">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm hidden md:inline">Indicators</span>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="start">
                  <div className="p-4 border-b border-gray-200 dark:border-slate-700">
                    <h3 className="font-semibold mb-2">Indicators, metrics, and strategies</h3>
                    <Input
                      type="text"
                      placeholder="Search indicators..."
                      value={indicatorSearch}
                      onChange={(e) => setIndicatorSearch(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="max-h-96 overflow-y-auto p-2">
                    <div className="space-y-1">
                      {indicators
                        .filter(indicator => indicator.name.toLowerCase().includes(indicatorSearch.toLowerCase()))
                        .map((indicator, index) => {
                          const isActive = activeIndicators.includes(indicator.name);
                          return (
                            <button
                              key={index}
                              onClick={() => handleIndicatorClick(indicator.name)}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-sm ${
                                isActive
                                  ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                  : 'hover:bg-gray-100 dark:hover:bg-slate-700'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {isActive && <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />}
                                <span>{indicator.name}</span>
                              </div>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {indicator.category}
                              </span>
                            </button>
                          );
                        })}
                    </div>
                  </div>
                  <div className="p-3 border-t border-gray-200 dark:border-slate-700">
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      <Plus className="w-4 h-4" />
                      Add Custom Indicator
                    </button>
                  </div>
                </PopoverContent>
              </Popover>

              <div className="w-px h-6 bg-gray-200 dark:bg-slate-700 hidden md:block" />

              {/* Additional Tools */}
              <div className="hidden md:flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-gray-100 dark:hover:bg-slate-700"
                  title="Alert"
                >
                  <Bell className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-gray-100 dark:hover:bg-slate-700"
                  title="Replay"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-gray-100 dark:hover:bg-slate-700"
                  title="Undo"
                >
                  <Undo className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-gray-100 dark:hover:bg-slate-700"
                  title="Redo"
                >
                  <Redo className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-gray-100 dark:hover:bg-slate-700"
                title="Screenshot"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Timeframe Selector */}
          <div className="flex items-center gap-1 px-4 py-1.5 overflow-x-auto">
            {timeframes.map((tf) => (
              <button
                key={tf.value}
                onClick={() => setSelectedTimeframe(tf.value)}
                className={`px-3 py-1.5 rounded text-sm whitespace-nowrap transition-colors ${
                  selectedTimeframe === tf.value
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700'
                }`}
              >
                {tf.label}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-gray-100 dark:hover:bg-slate-700"
                title="Chart Settings"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* TradingView Chart Container */}
        <div className="relative" style={{ height: '600px' }}>
          {/* Symbol Header Bar - Shows above chart */}
          <div className="absolute top-0 left-0 right-0 z-10 px-4 py-2 flex items-center gap-4 text-xs bg-gradient-to-b from-white/95 to-transparent dark:from-slate-800/95 pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{selectedSymbol}</span>
              <span className="text-gray-500 dark:text-gray-400">·</span>
              <span className="text-gray-600 dark:text-gray-400">{selectedTimeframe}</span>
              <span className="text-gray-500 dark:text-gray-400">·</span>
              <span className="text-gray-600 dark:text-gray-400">
                {symbolCategories.All.find(s => s.symbol === selectedSymbol)?.exchange || 'Exchange'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="text-gray-500 dark:text-gray-400">O</span>
                <span>{formatCurrency(marketData.open)}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-500 dark:text-gray-400">H</span>
                <span className="text-green-600 dark:text-green-400">{formatCurrency(marketData.high)}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-500 dark:text-gray-400">L</span>
                <span className="text-red-600 dark:text-red-400">{formatCurrency(marketData.low)}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-500 dark:text-gray-400">C</span>
                <span className={marketData.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                  {formatCurrency(marketData.price)}
                </span>
              </div>
              <div className={`flex items-center gap-1 px-2 py-0.5 rounded ${marketData.change >= 0 ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'}`}>
                <span>{marketData.change >= 0 ? '+' : ''}{formatNumber(marketData.change)}</span>
                <span>({marketData.change >= 0 ? '+' : ''}{formatNumber(marketData.changePercent)}%)</span>
              </div>
            </div>
            <div className="flex items-center gap-3 ml-auto">
              <div className="flex items-center gap-1">
                <span className="text-gray-500 dark:text-gray-400">Vol</span>
                <span>{marketData.volume}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-2 py-0.5 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded">
                  <span className="text-xs">{formatCurrency(marketData.bid)} SELL</span>
                </div>
                <div className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded">
                  <span className="text-xs">{formatCurrency(marketData.ask)} BUY</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div
            id="tradingview_chart"
            ref={containerRef}
            className="w-full h-full z-index-50"
          />
        </div>

        {/* Chart Info Footer */}
        <div className="px-4 py-3 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Powered by TradingView - Professional charting with 100+ technical indicators and drawing tools
          </p>
        </div>
      </div>

      {/* Symbol Search Modal — full catalogue with live prices */}
      <SymbolSearchModal
        open={showSymbolSearch}
        onClose={() => setShowSymbolSearch(false)}
        onSelect={handleSymbolSelect}
        currentSymbol={selectedSymbol}
      />
    </>
  );
}