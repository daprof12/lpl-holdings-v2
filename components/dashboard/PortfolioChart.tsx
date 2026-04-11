import { useState, useMemo, useEffect, useId } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '../ui/button';
import { useTrading } from '../../contexts/TradingContext';
import { formatPercentage } from '../../utils/formatNumber';

export default function PortfolioChart() {
  const { account, history, portfolioHistory } = useTrading();
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL'>('1W');
  const [chartType, setChartType] = useState<'area' | 'line'>('area');
  const gradientId = useId();

  // Calculate portfolio data based on user's real trading history
  const portfolioData = useMemo(() => {
    // ... generateHistoricalData function ... (rest of logic remains same but uses only live data)
    // generateHistoricalData definition stays as it was, but it's nested inside useMemo or moved out.
    // Let's keep the structure but remove tradingMode from deps.
    
    const generateHistoricalData = (timeframe: '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL') => {
      const now = new Date();
      let points: { time: string; value: number }[] = [];
      const startingBalance = account.balance;
      const totalPnL = account.realizedPnL + account.unrealizedPnL;
      
      // If we have real portfolio history, use it
      if (portfolioHistory && portfolioHistory.length > 0) {
        const getTimeframeStart = () => {
          const now = new Date();
          switch (timeframe) {
            case '1D': return new Date(now.getTime() - 24 * 60 * 60 * 1000);
            case '1W': return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            case '1M': return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            case '3M': return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
            case '1Y': return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
            case 'ALL': return new Date(0);
          }
        };
        
        const startTime = getTimeframeStart();
        const filteredSnapshots = portfolioHistory.filter(s => 
          new Date(s.timestamp) >= startTime
        );
        
        if (filteredSnapshots.length > 0) {
          const labelCount = new Map<string, number>();
          return filteredSnapshots.map((snapshot) => {
            const date = new Date(snapshot.timestamp);
            let timeLabel = '';
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            
            switch (timeframe) {
              case '1D': timeLabel = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`; break;
              case '1W': timeLabel = `${days[date.getDay()]} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`; break;
              case '1M': timeLabel = `${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`; break;
              case '3M': timeLabel = `${months[date.getMonth()]} ${date.getDate()}`; break;
              case '1Y': timeLabel = `${months[date.getMonth()]} ${date.getDate()}`; break;
              case 'ALL': timeLabel = `${months[date.getMonth()]} ${date.getFullYear().toString().slice(2)}`; break;
            }

            const count = labelCount.get(timeLabel) || 0;
            labelCount.set(timeLabel, count + 1);
            const uniqueTime = count > 0 ? `${timeLabel} (${count})` : timeLabel;
            
            return { time: uniqueTime, value: snapshot.equity };
          });
        }
      }
      
      // Fallback: Generate estimated historical data
      switch (timeframe) {
        case '1D':
          for (let i = 23; i >= 0; i--) {
            const hour = new Date(now.getTime() - i * 60 * 60 * 1000).getHours();
            const progress = (23 - i) / 23;
            points.push({ time: `${hour}:00`, value: Math.max(0, startingBalance + (totalPnL * progress)) });
          }
          break;
        case '1W':
          const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          for (let i = 6; i >= 0; i--) {
            const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            const progress = (6 - i) / 6;
            points.push({ time: days[date.getDay()], value: Math.max(0, startingBalance + (totalPnL * progress)) });
          }
          break;
        case '1M':
          for (let i = 29; i >= 0; i--) {
            const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const progress = (29 - i) / 29;
            points.push({ time: `${months[date.getMonth()]} ${date.getDate()}`, value: Math.max(0, startingBalance + (totalPnL * progress)) });
          }
          break;
        case '3M':
          for (let i = 11; i >= 0; i--) {
            const progress = (11 - i) / 11;
            points.push({ time: `W${12 - i}`, value: Math.max(0, startingBalance + (totalPnL * progress)) });
          }
          break;
        case '1Y':
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          for (let i = 11; i >= 0; i--) {
            const monthIndex = (now.getMonth() - i + 12) % 12;
            const progress = (11 - i) / 11;
            points.push({ time: months[monthIndex], value: Math.max(0, startingBalance + (totalPnL * progress)) });
          }
          break;
        case 'ALL':
          for (let i = 23; i >= 0; i--) {
            const progress = (23 - i) / 23;
            points.push({ time: `M${24 - i}`, value: Math.max(0, startingBalance + (totalPnL * progress)) });
          }
          break;
      }
      return points;
    };

    return {
      '1D': generateHistoricalData('1D'),
      '1W': generateHistoricalData('1W'),
      '1M': generateHistoricalData('1M'),
      '3M': generateHistoricalData('3M'),
      '1Y': generateHistoricalData('1Y'),
      'ALL': generateHistoricalData('ALL'),
    };
  }, [account, history, portfolioHistory, timeframe]);

  const currentData = portfolioData[timeframe];
  const firstValue = currentData[0].value;
  const lastValue = currentData[currentData.length - 1].value;
  const change = lastValue - firstValue;
  const changePercent = formatPercentage((change / firstValue) * 100);
  const isPositive = change >= 0;

  const timeframes: Array<'1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL'> = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg mb-2">Portfolio Performance</h3>
          <div className="flex items-center gap-3">
            <p className="text-3xl">${lastValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            <div className={`flex items-center gap-1 px-2 py-1 rounded text-sm ${
              isPositive 
                ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' 
                : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
            }`}>
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{isPositive ? '+' : ''}{changePercent}</span>
            </div>
          </div>
        </div>

        {/* Chart Type Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setChartType('area')}
            className={`px-3 py-1 rounded text-sm ${
              chartType === 'area' 
                ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700'
            }`}
          >
            Area
          </button>
          <button
            onClick={() => setChartType('line')}
            className={`px-3 py-1 rounded text-sm ${
              chartType === 'line' 
                ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700'
            }`}
          >
            Line
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 mb-4" style={{ minHeight: '256px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%" minHeight={256}>
          {chartType === 'area' ? (
            <AreaChart data={currentData}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
              <XAxis 
                dataKey="time" 
                stroke="#9ca3af" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#9ca3af" 
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Value']}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                strokeWidth={2}
                fill={`url(#${gradientId})`} 
              />
            </AreaChart>
          ) : (
            <LineChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
              <XAxis 
                dataKey="time" 
                stroke="#9ca3af" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#9ca3af" 
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Value']}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Timeframe Selector */}
      <div className="flex gap-2 justify-center">
        {timeframes.map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              timeframe === tf
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>
    </div>
  );
}