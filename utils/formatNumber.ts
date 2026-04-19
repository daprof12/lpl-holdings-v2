/**
 * Utility functions for formatting numbers consistently across the app.
 *
 * Rules:
 *  - Currency (USD / fiat)  → exactly 2 decimal places
 *  - Percentages            → min 2, max 4 decimal places (trailing zeros trimmed after 2nd dp)
 */

/**
 * Format a number to exactly 2 decimal places (no thousand separator).
 * For very small numbers, shows up to 8 decimal places.
 */
export const formatNumber = (num: number): string => {
  const absNum = Math.abs(num);
  if (absNum === 0) return '0.00';
  if (absNum < 0.0001) return num.toFixed(8);
  if (absNum < 0.01) return num.toFixed(6);
  if (absNum < 1) return num.toFixed(4);
  return num.toFixed(2);
};

/**
 * Format a USD/fiat currency value with dynamic dp and thousand separators.
 * e.g. 1234.5  → "1,234.50"
 *      0.00001 → "0.00001000"
 */
export const formatCurrency = (num: number): string => {
  const absNum = Math.abs(num);
  let decimals = 2;
  
  if (absNum > 0 && absNum < 0.0001) decimals = 8;
  else if (absNum > 0 && absNum < 0.01)    decimals = 6;
  else if (absNum > 0 && absNum < 1)       decimals = 4;

  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: decimals,
  });
};

/**
 * Format a USD value with leading $ sign.
 * e.g. 1234.5 → "$1,234.50"
 */
export const formatPrice = (num: number): string => {
  const absNum = Math.abs(num);
  if (absNum > 0 && absNum < 0.01) {
    // For small prices, use formatCurrency but ensure we show the small decimals
    return `$${formatCurrency(num)}`;
  }
  return `$${formatCurrency(num)}`;
};

/**
 * Format a percentage with min 2 and max 4 decimal places.
 * Trailing zeros beyond the 2nd dp are removed automatically.
 * e.g. 12.34    → "12.34%"
 *      12.1234  → "12.1234%"
 *      12.12345 → "12.1235%"  (rounded)
 *      50       → "50.00%"
 *      0.0001   → "0.0001%"
 */
export const formatPercentage = (num: number): string => {
  const val = parseFloat(num.toFixed(4)); // cap at 4 dp
  return (
    val.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
      useGrouping: false,
    }) + '%'
  );
};

/**
 * Format a percentage value without the % sign (useful when the sign is added by the caller).
 */
export const formatPct = (num: number): string => {
  const val = parseFloat(num.toFixed(4));
  return val.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
    useGrouping: false,
  });
};

/**
 * Format large USD numbers with suffix.
 * e.g. 1_200_000 → "$1.20M"
 */
export const formatLargeNumber = (num: number): string => {
  const n = typeof num === 'number' && !isNaN(num) ? num : 0;
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000)     return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000)         return `$${(n / 1_000).toFixed(2)}K`;
  return `$${n.toFixed(2)}`;
};

/**
 * Format a P&L value with leading sign and 2 dp.
 * e.g.  1234.5  → "+1,234.50"
 *      -1234.5  → "-1,234.50"
 */
export const formatPnL = (num: number): string => {
  const sign = num >= 0 ? '+' : '';
  return `${sign}${formatCurrency(num)}`;
};

/**
 * Format a transaction / trade ID for display.
 * IDs longer than 12 characters are shortened to: txn_ + last 7 chars.
 * e.g. "abc123def456ghi" → "txn_456ghi"
 */
export const formatTxnId = (id: string): string => {
  return id.length > 12 ? `txn_${id.slice(-7)}` : id;
};