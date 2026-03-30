export interface BondFuture {
  name: string;
  startDate: string;
  closeOnlyDate: string;
  expiryDate: string;
  contractMonth: string;
}

export interface BondSpread {
  symbol: string;
  description: string;
  min: string;
  avg: string;
}

export const bondFutures: BondFuture[] = [
  { name: 'EURBBL_H6',  startDate: '03/12/2025', closeOnlyDate: '03/03/2026', expiryDate: '04/03/2026', contractMonth: 'March' },
  { name: 'EURBND_H6',  startDate: '03/12/2025', closeOnlyDate: '03/03/2026', expiryDate: '04/03/2026', contractMonth: 'March' },
  { name: 'EURSCA_H6',  startDate: '03/12/2025', closeOnlyDate: '03/03/2026', expiryDate: '04/03/2026', contractMonth: 'March' },
  { name: 'UST05Y_H6',  startDate: '25/11/2025', closeOnlyDate: '24/02/2026', expiryDate: '25/02/2026', contractMonth: 'March' },
  { name: 'UST10Y_H6',  startDate: '25/11/2025', closeOnlyDate: '24/02/2026', expiryDate: '25/02/2026', contractMonth: 'March' },
  { name: 'UST30Y_H6',  startDate: '26/11/2025', closeOnlyDate: '24/02/2026', expiryDate: '25/02/2026', contractMonth: 'March' },
  { name: 'UKGB_H6',   startDate: '24/11/2025', closeOnlyDate: '23/02/2026', expiryDate: '24/02/2026', contractMonth: 'March' },
  { name: 'JGB10Y_H6', startDate: '09/12/2025', closeOnlyDate: '09/03/2026', expiryDate: '10/03/2026', contractMonth: 'March' },
  { name: 'ITB10Y_H6', startDate: '03/12/2025', closeOnlyDate: '03/03/2026', expiryDate: '04/03/2026', contractMonth: 'March' },
];

export const bondSpreads: BondSpread[] = [
  { symbol: 'EURBBL',   description: 'Euro Bund Bond',              min: '0.020', avg: '0.030' },
  { symbol: 'EURBND',   description: 'Euro Bond (Bobl)',            min: '0.450', avg: '0.520' },
  { symbol: 'EURCNA',   description: 'Euro Schatz Bond',            min: '0.050', avg: '0.060' },
  { symbol: 'UKGB10Y',  description: 'UK 10-Year Gilt Bond',        min: '0.020', avg: '0.025' },
  { symbol: 'JGBB',     description: 'Japan 10-Year JGB Bond',      min: '0.020', avg: '0.040' },
  { symbol: 'USGB05',   description: 'US 5-Year T-Note Bond',       min: '0.020', avg: '0.030' },
  { symbol: 'USGB10',   description: 'US 10-Year T-Note Bond',      min: '0.020', avg: '0.025' },
  { symbol: 'USGB30',   description: 'US 30-Year T-Bond',           min: '0.020', avg: '0.030' },
  { symbol: 'ITGB10Y',  description: 'Italy 10-Year BTP Bond',      min: '0.030', avg: '0.050' },
  { symbol: 'FRAGB10Y', description: 'France 10-Year OAT Bond',     min: '0.020', avg: '0.030' },
  { symbol: 'AUSGB10Y', description: 'Australia 10-Year Bond',      min: '0.030', avg: '0.045' },
  { symbol: 'CANGB10Y', description: 'Canada 10-Year Bond',         min: '0.020', avg: '0.035' },
];
