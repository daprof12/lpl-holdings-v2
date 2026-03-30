export interface IndexSpread {
  symbol: string;
  description: string;
  min: string;
  avg: string;
  category: 'spot' | 'futures';
}

export const indexSpreads: IndexSpread[] = [
  // ── Spot (Cash) Equity Indices ────────────────────────────────────────────
  { symbol: 'AUS200',  description: 'Australia S&P ASX 200 Index',        min: '0.000', avg: '1.220',  category: 'spot' },
  { symbol: 'DE40',    description: 'Germany 40 Index',                    min: '0.500', avg: '1.338',  category: 'spot' },
  { symbol: 'F40',     description: 'France 40 Index',                     min: '0.000', avg: '0.749',  category: 'spot' },
  { symbol: 'JP225',   description: 'Japan 225 Index',                     min: '6.000', avg: '8.858',  category: 'spot' },
  { symbol: 'STOXX50', description: 'EU Stocks 50 Index',                  min: '0.200', avg: '1.760',  category: 'spot' },
  { symbol: 'UK100',   description: 'UK 100 Index',                        min: '1.000', avg: '2.133',  category: 'spot' },
  { symbol: 'US30',    description: 'US Wall Street 30 Index',             min: '1.000', avg: '1.411',  category: 'spot' },
  { symbol: 'US500',   description: 'US SPX 500 Index',                    min: '0.200', avg: '0.492',  category: 'spot' },
  { symbol: 'USTEC',   description: 'US Tech 100 Index',                   min: '1.000', avg: '1.807',  category: 'spot' },
  { symbol: 'CA60',    description: 'Canada 60 Index',                     min: '0.600', avg: '0.600',  category: 'spot' },
  { symbol: 'CHINA50', description: 'FTSE China A50 Index',                min: '3.290', avg: '6.953',  category: 'spot' },
  { symbol: 'CHINAH',  description: 'Hong Kong China H-shares Index',      min: '0.000', avg: '2.083',  category: 'spot' },
  { symbol: 'HK50',    description: 'Hang Seng 50 Index',                  min: '2.000', avg: '4.500',  category: 'spot' },
  { symbol: 'IT40',    description: 'Italy 40 Index',                      min: '2.000', avg: '3.800',  category: 'spot' },
  { symbol: 'ES35',    description: 'Spain 35 Index',                      min: '2.500', avg: '4.200',  category: 'spot' },
  { symbol: 'NL25',    description: 'Netherlands 25 Index',                min: '0.200', avg: '0.500',  category: 'spot' },
  { symbol: 'SG30',    description: 'Singapore Blue Chip 30 Index',        min: '1.000', avg: '2.000',  category: 'spot' },
  { symbol: 'NDAQ',    description: 'US Nasdaq Composite Index',           min: '1.000', avg: '2.100',  category: 'spot' },
  { symbol: 'RUT2000', description: 'US Russell 2000 Index',               min: '0.500', avg: '1.200',  category: 'spot' },
  { symbol: 'INDIA50', description: 'India 50 Nifty Index',                min: '1.000', avg: '2.500',  category: 'spot' },

  // ── Futures Indices ───────────────────────────────────────────────────────
  { symbol: 'DXY',     description: 'ICE US Dollar Index Futures',         min: '0.020', avg: '0.030',  category: 'futures' },
  { symbol: 'VIX',     description: 'CBOE Volatility Index Futures',       min: '0.020', avg: '0.035',  category: 'futures' },
  { symbol: 'ES',      description: 'E-mini S&P 500 Futures',              min: '0.250', avg: '0.400',  category: 'futures' },
  { symbol: 'NQ',      description: 'E-mini Nasdaq 100 Futures',           min: '0.250', avg: '0.500',  category: 'futures' },
  { symbol: 'YM',      description: 'E-mini Dow Jones Futures',            min: '1.000', avg: '1.800',  category: 'futures' },
];
