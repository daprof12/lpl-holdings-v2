export interface CommoditySpread {
  symbol: string;
  description: string;
  min: string;
  avg: string;
  category: 'energy' | 'metals' | 'softs';
}

export const commoditySpreads: CommoditySpread[] = [
  // ── Energies ──────────────────────────────────────────────────────────────
  { symbol: 'BRENT',    description: 'Brent Crude Oil Futures',                      min: '0.020',  avg: '0.028', category: 'energy' },
  { symbol: 'WTI',      description: 'West Texas Intermediate - Crude Oil Futures',  min: '0.020',  avg: '0.027', category: 'energy' },
  { symbol: 'NGAS',     description: 'Natural Gas Futures',                          min: '0.004',  avg: '0.005', category: 'energy' },
  { symbol: 'GASOLINE', description: 'Gasoline Futures',                             min: '0.001',  avg: '0.001', category: 'energy' },
  { symbol: 'HEATOIL',  description: 'Heating Oil Futures',                          min: '0.001',  avg: '0.001', category: 'energy' },

  // ── Metals ────────────────────────────────────────────────────────────────
  { symbol: 'GC25',     description: 'Gold Futures',                                 min: '0.20',   avg: '0.23',  category: 'metals' },
  { symbol: 'SI25',     description: 'Silver Futures',                               min: '0.015',  avg: '0.018', category: 'metals' },
  { symbol: 'HG25',     description: 'Copper Futures',                               min: '0.002',  avg: '0.003', category: 'metals' },
  { symbol: 'PA25',     description: 'Palladium Futures',                            min: '1.50',   avg: '2.00',  category: 'metals' },
  { symbol: 'PL25',     description: 'Platinum Futures',                             min: '0.60',   avg: '0.80',  category: 'metals' },

  // ── Softs ─────────────────────────────────────────────────────────────────
  { symbol: 'Cocoa',    description: 'Cocoa Futures',                                min: '3.000',  avg: '4.608', category: 'softs' },
  { symbol: 'Coffee',   description: 'Coffee Futures',                               min: '0.300',  avg: '0.300', category: 'softs' },
  { symbol: 'Corn',     description: 'Corn Futures',                                 min: '0.680',  avg: '0.680', category: 'softs' },
  { symbol: 'Cotton',   description: 'Cotton Futures',                               min: '0.150',  avg: '0.150', category: 'softs' },
  { symbol: 'OJ',       description: 'Orange Juice Futures',                         min: '1.120',  avg: '1.120', category: 'softs' },
  { symbol: 'Soybean',  description: 'Soybean Futures',                              min: '1.350',  avg: '1.350', category: 'softs' },
  { symbol: 'Sugar',    description: 'Sugar Futures',                                min: '0.030',  avg: '0.033', category: 'softs' },
  { symbol: 'Wheat',    description: 'Wheat Futures',                                min: '0.750',  avg: '0.750', category: 'softs' },
  { symbol: 'Lumber',   description: 'Lumber Futures',                               min: '1.000',  avg: '1.200', category: 'softs' },
  { symbol: 'Rice',     description: 'Rough Rice Futures',                           min: '0.500',  avg: '0.600', category: 'softs' },
  { symbol: 'LiveCat',  description: 'Live Cattle Futures',                          min: '0.200',  avg: '0.250', category: 'softs' },
  { symbol: 'LeanHog',  description: 'Lean Hogs Futures',                            min: '0.150',  avg: '0.200', category: 'softs' },
];
