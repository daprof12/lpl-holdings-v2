// ── Global Futures Index table ──────────────────────────────────────────────

export interface FuturesIndex {
  index: string;
  symbol: string;
}

export const futuresIndexes: FuturesIndex[] = [
  { index: 'ICE Dollar Index Futures',  symbol: 'DXY'   },
  { index: 'CBOE VIX Index Futures',    symbol: 'VIX'   },
  { index: 'Brent Crude Oil Futures',   symbol: 'BRENT' },
  { index: 'WTI Crude Oil Futures',     symbol: 'WTI'   },
  { index: 'Gold Futures',              symbol: 'GC'    },
];

// ── Upcoming Expiring Futures (spot oil / tradable markets) ─────────────────

export interface FutureExpiry {
  index: string;
  startDate: string;
  closeOnlyDate: string;
  expiryDate: string;
  contractMonth: string;
}

export const upcomingFutures: FutureExpiry[] = [
  { index: 'DXY_H6', startDate: '11/12/2025', closeOnlyDate: '12/03/2026', expiryDate: '13/03/2026', contractMonth: 'March' },
  { index: 'VIX_H6', startDate: '16/02/2026', closeOnlyDate: '16/03/2026', expiryDate: '17/03/2026', contractMonth: 'March' },
];

// ── CFDs on Commodities Expiry ──────────────────────────────────────────────

export interface CommodityExpiry {
  commodity: string;
  startDate: string;
  closeOnlyDate: string;
  expiryDate: string;
  contractMonth: string;
}

export const commodityExpiries: CommodityExpiry[] = [
  { commodity: 'Sugar_H6',   startDate: '19/09/2025', closeOnlyDate: '18/02/2026', expiryDate: '19/02/2026', contractMonth: 'March' },
  { commodity: 'Corn_H6',    startDate: '19/11/2025', closeOnlyDate: '18/02/2026', expiryDate: '19/02/2026', contractMonth: 'March' },
  { commodity: 'OJ_H6',      startDate: '21/12/2025', closeOnlyDate: '26/01/2026', expiryDate: '27/02/2026', contractMonth: 'March' },
  { commodity: 'Sbean_H6',   startDate: '21/12/2025', closeOnlyDate: '18/02/2026', expiryDate: '19/02/2026', contractMonth: 'March' },
  { commodity: 'BRENT_J6',   startDate: '26/01/2026', closeOnlyDate: '23/02/2026', expiryDate: '24/02/2026', contractMonth: 'April'  },
  { commodity: 'GCJ26',      startDate: '26/01/2026', closeOnlyDate: '25/03/2026', expiryDate: '27/03/2026', contractMonth: 'April'  },
  { commodity: 'Cocoa_K6',   startDate: '05/02/2026', closeOnlyDate: '08/04/2026', expiryDate: '09/04/2026', contractMonth: 'May'    },
  { commodity: 'Coffee_K6',  startDate: '05/02/2026', closeOnlyDate: '17/04/2026', expiryDate: '21/04/2026', contractMonth: 'May'    },
  { commodity: 'Corn_K6',    startDate: '19/02/2026', closeOnlyDate: '25/04/2026', expiryDate: '27/04/2026', contractMonth: 'May'    },
  { commodity: 'Sbean_K6',   startDate: '19/02/2026', closeOnlyDate: '22/04/2026', expiryDate: '23/04/2026', contractMonth: 'May'    },
  { commodity: 'Sugar_K6',   startDate: '19/02/2026', closeOnlyDate: '15/04/2026', expiryDate: '16/04/2026', contractMonth: 'May'    },
  { commodity: 'Wheat_K6',   startDate: '23/02/2026', closeOnlyDate: '29/04/2026', expiryDate: '30/04/2026', contractMonth: 'May'    },
  { commodity: 'Cotton_K6',  startDate: '05/03/2026', closeOnlyDate: '06/05/2026', expiryDate: '07/05/2026', contractMonth: 'May'    },
  { commodity: 'WTI_K6',     startDate: '11/03/2026', closeOnlyDate: '15/04/2026', expiryDate: '17/04/2026', contractMonth: 'May'    },
  { commodity: 'Gann_K6',    startDate: '19/03/2026', closeOnlyDate: '20/04/2026', expiryDate: '21/04/2026', contractMonth: 'May'    },
  { commodity: 'Silver_K6',  startDate: '09/03/2026', closeOnlyDate: '23/04/2026', expiryDate: '27/04/2026', contractMonth: 'May'    },
  { commodity: 'VIX_K6',     startDate: '16/03/2026', closeOnlyDate: '13/05/2026', expiryDate: '20/05/2026', contractMonth: 'April'  },
  { commodity: 'Wheat_K6',   startDate: '15/03/2026', closeOnlyDate: '15/05/2026', expiryDate: '18/05/2026', contractMonth: 'May'    },
];
