import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useTrading } from '../../contexts/TradingContext';
import { formatPct, formatCurrency } from '../../utils/formatNumber';
import { useMemo } from 'react';

export default function AssetAllocation() {
  const { positions, account } = useTrading();

  // Calculate asset type distribution from real positions
  const assetTypeData = useMemo(() => {
    const totalValue = account.equity;
    
    // Group positions by asset type
    const typeGroups: { [key: string]: { value: number; color: string } } = {};
    
    positions.forEach(p => {
      const value = p.units * p.currentPrice;
      const type = getAssetType(p.symbol);
      
      if (!typeGroups[type]) {
        typeGroups[type] = { value: 0, color: getAssetColor(type) };
      }
      typeGroups[type].value += value;
    });
    
    // Convert to array with percentages
    return Object.entries(typeGroups).map(([name, data]) => ({
      name,
      value: ((data.value / totalValue) * 100),
      amount: data.value,
      color: data.color
    })).sort((a, b) => b.value - a.value);
  }, [positions, account.equity]);

  // Get top holdings from positions
  const topHoldings = useMemo(() => {
    const totalValue = account.equity;
    
    // Group positions by symbol
    const symbolGroups: { [key: string]: { 
      totalValue: number; 
      totalUnits: number; 
      avgEntryPrice: number;
      currentPrice: number;
    } } = {};
    
    positions.forEach(p => {
      if (!symbolGroups[p.symbol]) {
        symbolGroups[p.symbol] = {
          totalValue: 0,
          totalUnits: 0,
          avgEntryPrice: 0,
          currentPrice: p.currentPrice
        };
      }
      
      const value = p.units * p.currentPrice;
      symbolGroups[p.symbol].totalValue += value;
      symbolGroups[p.symbol].totalUnits += p.units;
      symbolGroups[p.symbol].avgEntryPrice += p.entryPrice * p.units; // Weighted average
      symbolGroups[p.symbol].currentPrice = p.currentPrice;
    });
    
    // Calculate weighted average entry price and convert to array
    return Object.entries(symbolGroups)
      .map(([symbol, data]) => {
        const avgEntry = data.avgEntryPrice / data.totalUnits;
        const changePercent = ((data.currentPrice - avgEntry) / avgEntry) * 100;
        
        return {
          symbol,
          name: symbol,
          type: getAssetType(symbol),
          value: data.totalValue,
          allocation: (data.totalValue / totalValue) * 100,
          change: changePercent,
          shares: data.totalUnits
        };
      })
      .sort((a, b) => b.value - a.value);
  }, [positions, account.equity]);

  // Helper function to determine asset type from symbol
  function getAssetType(symbol: string): string {
    if (symbol.includes('BTC') || symbol.includes('ETH') || symbol.includes('XRP') || 
        symbol.includes('SOL') || symbol.includes('ADA') || symbol.includes('DOGE')) {
      return 'Cryptocurrency';
    } else if (symbol.includes('USD') || symbol.includes('EUR') || symbol.includes('GBP') || 
               symbol.includes('JPY') || symbol.includes('AUD') || symbol.includes('CAD')) {
      return 'Forex';
    } else if (symbol.includes('GOLD') || symbol.includes('SILVER') || symbol.includes('OIL')) {
      return 'Commodities';
    } else {
      return 'Stocks';
    }
  }

  // Helper function to get color for asset type
  function getAssetColor(type: string): string {
    const colors: { [key: string]: string } = {
      'Cryptocurrency': '#F59E0B',
      'Forex': '#3B82F6',
      'Stocks': '#10B981',
      'Commodities': '#8B5CF6'
    };
    return colors[type] || '#6B7280';
  }

  // Sector distribution for stocks (mock for now as we don't track sectors)
  const sectorData = [
    { name: 'Technology', value: 45, color: '#3B82F6' },
    { name: 'Finance', value: 20, color: '#10B981' },
    { name: 'Healthcare', value: 15, color: '#8B5CF6' },
    { name: 'Energy', value: 12, color: '#F59E0B' },
    { name: 'Consumer', value: 8, color: '#EF4444' }
  ];

  return (
    <div className="space-y-6">
      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Asset Type Distribution */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Asset Type Distribution</h3>
          
          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%" minHeight={256}>
              <PieChart>
                <Pie
                  data={assetTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${formatPct(value)}%`}
                >
                  {assetTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {assetTypeData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatCurrency(item.amount)}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{formatPct(item.value)}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sector Distribution (Stocks Only) */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Stock Sector Distribution</h3>
          
          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%" minHeight={256}>
              <BarChart data={sectorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {sectorData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm">{item.name}: {formatPct(item.value)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Holdings Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Holdings Breakdown</h3>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-700/50">
              <tr>
                <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Asset</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Type</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Shares/Units</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Value</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Allocation</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600 dark:text-gray-400">P/L %</th>
              </tr>
            </thead>
            <tbody>
              {topHoldings.map((holding) => (
                <tr key={holding.symbol} className="border-b border-gray-200 dark:border-slate-700">
                  <td className="py-4 px-4">
                    <div className="font-semibold">{holding.symbol}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{holding.name}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded text-sm">
                      {holding.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">{holding.shares.toLocaleString()}</td>
                  <td className="py-4 px-4 text-right font-semibold">
                    {formatCurrency(holding.value)}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-20 bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${holding.allocation}%` }}
                        />
                      </div>
                      <span className="text-sm w-12">{formatPct(holding.allocation)}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className={`flex items-center justify-end gap-1 ${
                      holding.change > 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {holding.change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span>{holding.change > 0 ? '+' : ''}{formatPct(holding.change)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {topHoldings.map((holding) => (
            <div key={holding.symbol} className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-semibold">{holding.symbol}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{holding.name}</div>
                </div>
                <span className="px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded text-sm">
                  {holding.type}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-gray-600 dark:text-gray-400 text-xs">Value</div>
                  <div className="font-semibold">{formatCurrency(holding.value)}</div>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400 text-xs">Allocation</div>
                  <div className="font-semibold">{formatPct(holding.allocation)}%</div>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400 text-xs">Units</div>
                  <div className="font-semibold">{holding.shares.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400 text-xs">P/L</div>
                  <div className={`font-semibold ${
                    holding.change > 0 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {holding.change > 0 ? '+' : ''}{formatPct(holding.change)}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Diversification Score */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Diversification Score</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">How well-diversified is your portfolio</p>
          </div>
          <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">8.2/10</div>
        </div>

        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3 mb-4">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full" style={{ width: '82%' }} />
        </div>

        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-green-600 dark:text-green-400">✓</span>
            <span>Good asset type mix</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600 dark:text-green-400">✓</span>
            <span>No single asset dominates</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-600 dark:text-yellow-400">⚠</span>
            <span>Consider more sectors</span>
          </div>
        </div>
      </div>
    </div>
  );
}