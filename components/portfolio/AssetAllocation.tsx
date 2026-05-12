import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useTrading } from '../../contexts/TradingContext';
import { formatCurrency } from '../../utils/formatNumber';
import { useMemo } from 'react';

// ── Colour palette for instruments ───────────────────────────────────────────
const INSTRUMENT_PALETTE = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
  '#06B6D4', '#F97316', '#84CC16', '#EC4899', '#14B8A6',
  '#6366F1', '#A855F7', '#D946EF', '#0EA5E9', '#22C55E',
];

// ── Category colours for the donut legend & badge ────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  Cryptocurrency: '#F59E0B',
  Forex:          '#3B82F6',
  Stocks:         '#10B981',
  Commodities:    '#8B5CF6',
  Indices:        '#EC4899',
  ETFs:           '#06B6D4',
  Bonds:          '#F97316',
  Other:          '#6B7280',
};

// ── Map a trading symbol → category ──────────────────────────────────────────
function getCategory(symbol: string): string {
  const s = symbol.toUpperCase();
  // Crypto — must be first (e.g. BTCUSD would otherwise match USD → Forex)
  if (/BTC|ETH|XRP|SOL|ADA|DOGE|BNB|LTC|DOT|LINK/.test(s)) return 'Cryptocurrency';
  // Commodities — before Forex so XAUUSD, XAGUSD hit here, not the USD catch-all
  if (/GOLD|SILVER|XAUUSD|XAGUSD|XAU|XAG|OIL|BRENT|WTI|NGAS|COPPER|WHEAT|CORN|SOYBEAN/.test(s)) return 'Commodities';
  // Indices
  if (/SPX|NDX|DJI|FTSE|DAX|CAC|NIKKEI|HANGSENG|ASX|VIX/.test(s)) return 'Indices';
  // ETFs
  if (/ETF|SPY|QQQ|IWM|GLD|SLV|USO|TLT|HYG/.test(s)) return 'ETFs';
  // Bonds
  if (/BOND|TBILL|TNOTE/.test(s)) return 'Bonds';
  // Forex — any pair containing major currency codes
  if (/USD|EUR|GBP|JPY|AUD|CAD|CHF|NZD|HKD|SGD/.test(s)) return 'Forex';
  // Default → Stocks
  return 'Stocks';
}

function getCategoryColor(cat: string): string {
  return CATEGORY_COLORS[cat] ?? '#6B7280';
}

// ── Custom tooltip for the stacked bar chart ─────────────────────────────────
const TradeTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((s: number, p: any) => s + (p.value || 0), 0);
  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-xl p-3 min-w-[180px]">
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-4 text-xs py-0.5">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: p.fill }} />
            {p.dataKey}
          </span>
          <span className="font-medium text-gray-800 dark:text-gray-100">{p.value} unit{p.value !== 1 ? 's' : ''}</span>
        </div>
      ))}
      <div className="border-t border-gray-100 dark:border-slate-700 mt-2 pt-1 flex justify-between text-xs font-semibold">
        <span>Total</span><span>{total} units</span>
      </div>
    </div>
  );
};

export default function AssetAllocation() {
  const { positions, account } = useTrading();

  // ── 1. Asset Type Distribution ─────────────────────────────────────────────
  const { assetTypeData, totalPositionValue } = useMemo(() => {
    const typeGroups: Record<string, { value: number; color: string }> = {};
    let totalPositionValue = 0;

    positions.forEach(p => {
      const posValue = Math.abs(p.units * p.currentPrice);
      const cat = getCategory(p.symbol);
      totalPositionValue += posValue;
      if (!typeGroups[cat]) typeGroups[cat] = { value: 0, color: getCategoryColor(cat) };
      typeGroups[cat].value += posValue;
    });

    // Use total position value as base; fall back to account.equity if no positions
    const base = totalPositionValue > 0 ? totalPositionValue : Math.max(account.equity, 1);

    const data = Object.entries(typeGroups).map(([name, d]) => ({
      name,
      value: (d.value / base) * 100,  // correct percentage
      amount: d.value,
      color: d.color,
    })).sort((a, b) => b.value - a.value);

    return { assetTypeData: data, totalPositionValue };
  }, [positions, account.equity]);

  // ── 2. Trade Distribution (stacked bar by category → instruments) ──────────
  const { tradeChartData, instrumentKeys, instrumentColorMap } = useMemo(() => {
    // Build: category → { symbol → total units traded }
    const catMap: Record<string, Record<string, number>> = {};
    const allSymbols = new Set<string>();

    positions.forEach(p => {
      const cat = getCategory(p.symbol);
      if (!catMap[cat]) catMap[cat] = {};
      catMap[cat][p.symbol] = (catMap[cat][p.symbol] || 0) + p.units;
      allSymbols.add(p.symbol);
    });

    // Assign a consistent colour to each symbol
    const symbolList = Array.from(allSymbols).sort();
    const instrumentColorMap: Record<string, string> = {};
    symbolList.forEach((sym, i) => {
      instrumentColorMap[sym] = INSTRUMENT_PALETTE[i % INSTRUMENT_PALETTE.length];
    });

    // Convert to recharts data shape: [{ category, SYMBOL_A: units, SYMBOL_B: units, ... }]
    const tradeChartData = Object.entries(catMap).map(([category, symbols]) => ({
      category,
      ...symbols,
    }));

    return { tradeChartData, instrumentKeys: symbolList, instrumentColorMap };
  }, [positions]);

  // ── 3. Holdings Breakdown ──────────────────────────────────────────────────
  const topHoldings = useMemo(() => {
    const base = totalPositionValue > 0 ? totalPositionValue : Math.max(account.equity, 1);
    const symbolGroups: Record<string, {
      totalValue: number; totalUnits: number;
      weightedEntry: number; currentPrice: number;
    }> = {};

    positions.forEach(p => {
      const posValue = Math.abs(p.units * p.currentPrice);
      if (!symbolGroups[p.symbol]) {
        symbolGroups[p.symbol] = { totalValue: 0, totalUnits: 0, weightedEntry: 0, currentPrice: p.currentPrice };
      }
      symbolGroups[p.symbol].totalValue += posValue;
      symbolGroups[p.symbol].totalUnits += p.units;
      symbolGroups[p.symbol].weightedEntry += p.entryPrice * p.units;
      symbolGroups[p.symbol].currentPrice = p.currentPrice;
    });

    return Object.entries(symbolGroups).map(([symbol, d]) => {
      const avgEntry = d.weightedEntry / d.totalUnits;
      const changePercent = avgEntry > 0 ? ((d.currentPrice - avgEntry) / avgEntry) * 100 : 0;
      return {
        symbol,
        type: getCategory(symbol),
        value: d.totalValue,
        allocation: (d.totalValue / base) * 100,
        change: changePercent,
        shares: d.totalUnits,
      };
    }).sort((a, b) => b.value - a.value);
  }, [positions, account.equity, totalPositionValue]);

  // ── empty state helper ─────────────────────────────────────────────────────
  const isEmpty = positions.length === 0;

  return (
    <div className="space-y-6">
      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* ── Asset Type Distribution ── */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Asset Type Distribution</h3>

          {isEmpty ? (
            <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">
              No open positions yet
            </div>
          ) : (
            <>
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
                      label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                      labelLine={true}
                    >
                      {assetTypeData.map((entry, i) => (
                        <Cell key={`cell-${i}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: number, name) => [`${val.toFixed(2)}%`, name]}
                      contentStyle={{ borderRadius: 10, fontSize: 12 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3">
                {assetTypeData.map(item => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="font-medium text-sm">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm">${formatCurrency(item.amount)}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{item.value.toFixed(2)}%</div>
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t border-gray-100 dark:border-slate-700 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Total Exposure</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-200">
                    ${formatCurrency(totalPositionValue)}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ── Trade Distribution ── */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Trade Distribution</h3>
            <span className="text-xs text-gray-400 dark:text-gray-500">Units per category</span>
          </div>

          {isEmpty ? (
            <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">
              No open positions yet
            </div>
          ) : (
            <>
              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={tradeChartData}
                    margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.4} vertical={false} />
                    <XAxis
                      dataKey="category"
                      tick={{ fontSize: 11 }}
                      stroke="#9ca3af"
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11 }}
                      stroke="#9ca3af"
                      tickLine={false}
                      axisLine={false}
                      label={{ value: 'Units', angle: -90, position: 'insideLeft', offset: 10, style: { fontSize: 10, fill: '#9ca3af' } }}
                    />
                    <Tooltip content={<TradeTooltip />} />
                    {instrumentKeys.map(sym => (
                      <Bar
                        key={sym}
                        dataKey={sym}
                        stackId="a"
                        fill={instrumentColorMap[sym]}
                        radius={instrumentKeys[instrumentKeys.length - 1] === sym ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* ── Instrument legend ── */}
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {instrumentKeys.map(sym => (
                  <div key={sym} className="flex items-center gap-1.5">
                    <span
                      className="w-3 h-3 rounded-sm flex-shrink-0"
                      style={{ backgroundColor: instrumentColorMap[sym] }}
                    />
                    <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">{sym}</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      ({getCategory(sym)})
                    </span>
                  </div>
                ))}
              </div>

              {/* ── Category summary rows ── */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                {tradeChartData.map(row => {
                  const instruments = Object.entries(row).filter(([k]) => k !== 'category') as [string, number][];
                  const totalUnits = instruments.reduce((s, [, v]) => s + v, 0);
                  return (
                    <div
                      key={row.category}
                      className="flex items-center justify-between bg-gray-50 dark:bg-slate-700/50 rounded-lg px-3 py-2 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: getCategoryColor(row.category) }}
                        />
                        <span className="font-medium">{row.category}</span>
                      </div>
                      <span className="font-semibold tabular-nums">
                        {totalUnits} unit{totalUnits !== 1 ? 's' : ''}
                        <span className="text-gray-400 dark:text-gray-500 font-normal ml-1">
                          ({instruments.length} asset{instruments.length !== 1 ? 's' : ''})
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Holdings Breakdown ── */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Holdings Breakdown</h3>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-700/50">
              <tr>
                <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Asset</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Category</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Shares/Units</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Value</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Allocation</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600 dark:text-gray-400">P/L %</th>
              </tr>
            </thead>
            <tbody>
              {isEmpty ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400 dark:text-gray-500 text-sm">
                    No open positions to display
                  </td>
                </tr>
              ) : topHoldings.map(h => (
                <tr key={h.symbol} className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50/50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-semibold">{h.symbol}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{h.symbol}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className="px-2 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: getCategoryColor(h.type) }}
                    >
                      {h.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right tabular-nums">{h.shares.toLocaleString()}</td>
                  <td className="py-4 px-4 text-right font-semibold tabular-nums">
                    ${formatCurrency(h.value)}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-20 bg-gray-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-1.5 rounded-full"
                          style={{
                            width: `${Math.min(100, h.allocation)}%`,
                            backgroundColor: getCategoryColor(h.type),
                          }}
                        />
                      </div>
                      <span className="text-sm w-12 font-medium tabular-nums">{h.allocation.toFixed(2)}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className={`flex items-center justify-end gap-1 text-sm font-medium ${
                      h.change >= 0
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {h.change >= 0
                        ? <TrendingUp className="w-3.5 h-3.5" />
                        : <TrendingDown className="w-3.5 h-3.5" />}
                      {h.change >= 0 ? '+' : ''}{h.change.toFixed(4)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-3">
          {isEmpty ? (
            <p className="py-8 text-center text-sm text-gray-400 dark:text-gray-500">No open positions yet</p>
          ) : topHoldings.map(h => (
            <div key={h.symbol} className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-semibold">{h.symbol}</div>
                </div>
                <span
                  className="px-2 py-1 rounded-full text-xs font-medium text-white"
                  style={{ backgroundColor: getCategoryColor(h.type) }}
                >
                  {h.type}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Value</div>
                  <div className="font-semibold">${formatCurrency(h.value)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Allocation</div>
                  <div className="font-semibold">{h.allocation.toFixed(2)}%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Units</div>
                  <div className="font-semibold">{h.shares.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">P/L %</div>
                  <div className={`font-semibold ${h.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {h.change >= 0 ? '+' : ''}{h.change.toFixed(4)}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Diversification Score ── */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Diversification Score</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">How well-diversified is your portfolio</p>
          </div>
          <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
            {isEmpty ? '0.0' : (
              Math.min(10, (assetTypeData.length * 2) + (instrumentKeys.length * 0.5)).toFixed(1)
            )}/10
          </div>
        </div>

        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3 mb-4">
          <div
            className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-1000"
            style={{
              width: `${isEmpty ? 0 : Math.min(100, (assetTypeData.length * 20) + (instrumentKeys.length * 5))}%`
            }}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className={assetTypeData.length > 1 ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}>
              {assetTypeData.length > 1 ? '✓' : '⚠'}
            </span>
            <span>{assetTypeData.length > 1 ? 'Good asset type mix' : 'Broaden asset types'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={(topHoldings[0]?.allocation || 100) < 50 ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}>
              {(topHoldings[0]?.allocation || 100) < 50 ? '✓' : '⚠'}
            </span>
            <span>
              {(topHoldings[0]?.allocation || 100) < 50 ? 'No single asset dominates' : 'One asset dominates'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={instrumentKeys.length >= 3 ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}>
              {instrumentKeys.length >= 3 ? '✓' : '⚠'}
            </span>
            <span>
              {instrumentKeys.length >= 3 ? 'Healthy instrument count' : 'Consider more instruments'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}