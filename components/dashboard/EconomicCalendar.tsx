import { useEffect, useRef } from 'react';
import { Calendar, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { useTheme } from '../../contexts/ThemeContext';

export default function EconomicCalendar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (containerRef.current) {
      // Clear any existing content
      containerRef.current.innerHTML = '';

      // Create TradingView Economic Calendar Widget
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
      script.async = true;
      script.innerHTML = JSON.stringify({
        colorTheme: theme === 'dark' ? 'dark' : 'light',
        isTransparent: false,
        width: '100%',
        height: '400',
        locale: 'en',
        importanceFilter: '-1,0,1',
        countryFilter: 'ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu'
      });

      containerRef.current.appendChild(script);
    }
  }, [theme]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          <h3 className="text-lg">Economic Calendar</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => window.open('https://www.tradingview.com/economic-calendar/', '_blank')}
        >
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>

      {/* TradingView Economic Calendar Widget */}
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