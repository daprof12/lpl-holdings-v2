export type ForexCategory = 'major' | 'minor' | 'exotic';

export interface ForexSpread {
  symbol: string;
  description: string;
  rawMin: string;
  rawAvg: string;
  stdMin: string;
  stdAvg: string;
  category: ForexCategory;
}

export const forexSpreads: ForexSpread[] = [
  // ── Major ────────────────────────────────────────────────────────────────
  { symbol: 'AUDUSD', description: 'Australian Dollar vs United States Dollar',    rawMin: '0',    rawAvg: '0.02', stdMin: '0.08', stdAvg: '0.1',  category: 'major' },
  { symbol: 'EURUSD', description: 'Euro vs United States Dollar',                  rawMin: '0',    rawAvg: '0.01', stdMin: '0.08', stdAvg: '0.1',  category: 'major' },
  { symbol: 'GBPUSD', description: 'British Pound vs United States Dollar',         rawMin: '0',    rawAvg: '0.04', stdMin: '0.08', stdAvg: '0.12', category: 'major' },
  { symbol: 'USDCAD', description: 'United States Dollar vs Canadian Dollar',       rawMin: '0',    rawAvg: '0.04', stdMin: '0.08', stdAvg: '0.12', category: 'major' },
  { symbol: 'USDCHF', description: 'United States Dollar vs Swiss Franc',           rawMin: '0',    rawAvg: '0.09', stdMin: '0.08', stdAvg: '0.17', category: 'major' },
  { symbol: 'USDJPY', description: 'United States Dollar vs Japanese Yen',          rawMin: '0',    rawAvg: '0.03', stdMin: '0.08', stdAvg: '0.11', category: 'major' },
  { symbol: 'NZDUSD', description: 'New Zealand Dollar vs United States Dollar',    rawMin: '0',    rawAvg: '0.05', stdMin: '0.08', stdAvg: '0.13', category: 'major' },
  { symbol: 'EURJPY', description: 'Euro vs Japanese Yen',                          rawMin: '0',    rawAvg: '0.07', stdMin: '0.10', stdAvg: '0.18', category: 'major' },
  { symbol: 'GBPJPY', description: 'British Pound vs Japanese Yen',                 rawMin: '0',    rawAvg: '0.10', stdMin: '0.12', stdAvg: '0.22', category: 'major' },
  { symbol: 'EURGBP', description: 'Euro vs British Pound',                         rawMin: '0',    rawAvg: '0.06', stdMin: '0.09', stdAvg: '0.15', category: 'major' },

  // ── Minor ─────────────────────────────────────────────────────────────────
  { symbol: 'AUDCAD', description: 'Australian Dollar vs Canadian Dollar',          rawMin: '0',    rawAvg: '0.10', stdMin: '0.12', stdAvg: '0.22', category: 'minor' },
  { symbol: 'AUDCHF', description: 'Australian Dollar vs Swiss Franc',              rawMin: '0',    rawAvg: '0.12', stdMin: '0.14', stdAvg: '0.26', category: 'minor' },
  { symbol: 'AUDJPY', description: 'Australian Dollar vs Japanese Yen',             rawMin: '0',    rawAvg: '0.10', stdMin: '0.12', stdAvg: '0.22', category: 'minor' },
  { symbol: 'AUDNZD', description: 'Australian Dollar vs New Zealand Dollar',       rawMin: '0',    rawAvg: '0.14', stdMin: '0.16', stdAvg: '0.30', category: 'minor' },
  { symbol: 'CADCHF', description: 'Canadian Dollar vs Swiss Franc',                rawMin: '0',    rawAvg: '0.14', stdMin: '0.16', stdAvg: '0.30', category: 'minor' },
  { symbol: 'CADJPY', description: 'Canadian Dollar vs Japanese Yen',               rawMin: '0',    rawAvg: '0.12', stdMin: '0.14', stdAvg: '0.26', category: 'minor' },
  { symbol: 'CHFJPY', description: 'Swiss Franc vs Japanese Yen',                   rawMin: '0',    rawAvg: '0.15', stdMin: '0.17', stdAvg: '0.32', category: 'minor' },
  { symbol: 'EURAUD', description: 'Euro vs Australian Dollar',                     rawMin: '0',    rawAvg: '0.11', stdMin: '0.13', stdAvg: '0.24', category: 'minor' },
  { symbol: 'EURCAD', description: 'Euro vs Canadian Dollar',                       rawMin: '0',    rawAvg: '0.13', stdMin: '0.15', stdAvg: '0.28', category: 'minor' },
  { symbol: 'EURCHF', description: 'Euro vs Swiss Franc',                           rawMin: '0',    rawAvg: '0.10', stdMin: '0.12', stdAvg: '0.22', category: 'minor' },
  { symbol: 'EURNZD', description: 'Euro vs New Zealand Dollar',                    rawMin: '0',    rawAvg: '0.18', stdMin: '0.20', stdAvg: '0.38', category: 'minor' },
  { symbol: 'GBPAUD', description: 'British Pound vs Australian Dollar',            rawMin: '0',    rawAvg: '0.17', stdMin: '0.19', stdAvg: '0.36', category: 'minor' },
  { symbol: 'GBPCAD', description: 'British Pound vs Canadian Dollar',              rawMin: '0',    rawAvg: '0.19', stdMin: '0.21', stdAvg: '0.40', category: 'minor' },
  { symbol: 'GBPCHF', description: 'British Pound vs Swiss Franc',                  rawMin: '0',    rawAvg: '0.16', stdMin: '0.18', stdAvg: '0.34', category: 'minor' },
  { symbol: 'GBPNZD', description: 'British Pound vs New Zealand Dollar',           rawMin: '0',    rawAvg: '0.22', stdMin: '0.24', stdAvg: '0.46', category: 'minor' },
  { symbol: 'NZDCAD', description: 'New Zealand Dollar vs Canadian Dollar',         rawMin: '0',    rawAvg: '0.17', stdMin: '0.19', stdAvg: '0.36', category: 'minor' },
  { symbol: 'NZDCHF', description: 'New Zealand Dollar vs Swiss Franc',             rawMin: '0',    rawAvg: '0.18', stdMin: '0.20', stdAvg: '0.38', category: 'minor' },
  { symbol: 'NZDJPY', description: 'New Zealand Dollar vs Japanese Yen',            rawMin: '0',    rawAvg: '0.14', stdMin: '0.16', stdAvg: '0.30', category: 'minor' },

  // ── Exotic ───────────────────────────────────────────────────────────────
  { symbol: 'EURTRY', description: 'Euro vs Turkish Lira',                          rawMin: '18',   rawAvg: '28',   stdMin: '20',   stdAvg: '35',   category: 'exotic' },
  { symbol: 'EURHUF', description: 'Euro vs Hungarian Forint',                      rawMin: '5',    rawAvg: '8',    stdMin: '7',    stdAvg: '12',   category: 'exotic' },
  { symbol: 'EURPLN', description: 'Euro vs Polish Zloty',                          rawMin: '8',    rawAvg: '14',   stdMin: '10',   stdAvg: '18',   category: 'exotic' },
  { symbol: 'USDZAR', description: 'United States Dollar vs South African Rand',    rawMin: '40',   rawAvg: '60',   stdMin: '45',   stdAvg: '70',   category: 'exotic' },
  { symbol: 'USDMXN', description: 'United States Dollar vs Mexican Peso',          rawMin: '35',   rawAvg: '55',   stdMin: '40',   stdAvg: '65',   category: 'exotic' },
  { symbol: 'USDTRY', description: 'United States Dollar vs Turkish Lira',          rawMin: '20',   rawAvg: '30',   stdMin: '25',   stdAvg: '40',   category: 'exotic' },
  { symbol: 'USDHKD', description: 'United States Dollar vs Hong Kong Dollar',      rawMin: '2',    rawAvg: '5',    stdMin: '4',    stdAvg: '8',    category: 'exotic' },
  { symbol: 'USDSGD', description: 'United States Dollar vs Singapore Dollar',      rawMin: '2',    rawAvg: '5',    stdMin: '4',    stdAvg: '8',    category: 'exotic' },
  { symbol: 'USDDKK', description: 'United States Dollar vs Danish Krone',          rawMin: '3',    rawAvg: '6',    stdMin: '5',    stdAvg: '10',   category: 'exotic' },
  { symbol: 'USDNOK', description: 'United States Dollar vs Norwegian Krone',       rawMin: '12',   rawAvg: '20',   stdMin: '15',   stdAvg: '28',   category: 'exotic' },
  { symbol: 'USDSEK', description: 'United States Dollar vs Swedish Krona',         rawMin: '15',   rawAvg: '25',   stdMin: '18',   stdAvg: '32',   category: 'exotic' },
  { symbol: 'USDCNH', description: 'United States Dollar vs Chinese Yuan Offshore', rawMin: '10',   rawAvg: '18',   stdMin: '14',   stdAvg: '25',   category: 'exotic' },
];
