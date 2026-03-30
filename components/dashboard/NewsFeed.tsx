import { useEffect, useRef } from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { useTheme } from '../../contexts/ThemeContext';

export default function NewsFeed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (containerRef.current) {
      // Clear any existing content
      containerRef.current.innerHTML = '';

      // Create TradingView Timeline Widget
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
      script.async = true;
      script.innerHTML = JSON.stringify({
        feedMode: 'all_symbols',
        colorTheme: theme === 'dark' ? 'dark' : 'light',
        isTransparent: false,
        displayMode: 'regular',
        width: '100%',
        height: '400',
        locale: 'en'
      });

      containerRef.current.appendChild(script);
    }
  }, [theme]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Newspaper className="w-5 h-5" />
          <h3 className="text-lg">Market News</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => window.open('https://www.tradingview.com/news/', '_blank')}
        >
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>

      {/* TradingView News Widget */}
      <div 
        ref={containerRef}
        className="tradingview-widget-container"
        style={{ minHeight: '400px' }}
      >
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
}