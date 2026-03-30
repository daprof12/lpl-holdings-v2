// ============================================
// DATABASE SCHEMA TYPES FOR METATRADE PRO
// ============================================
// This file defines all data structures used across client and admin sides
// Data is stored in Supabase KV store with prefixed keys for organization

// ============================================
// USER MANAGEMENT
// ============================================

export interface User {
  id: string; // Unique user ID
  email: string;
  name: string;
  phone?: string;
  country?: string;
  createdAt: number; // timestamp
  updatedAt: number; // timestamp
  
  // Account Status
  status: 'active' | 'suspended' | 'pending' | 'closed';
  emailVerified: boolean;
  kycStatus: 'not_started' | 'pending' | 'approved' | 'rejected';
  
  // Account Type
  accountType: 'demo' | 'live';
  
  // Trading Preferences
  language: 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ar';
  theme: 'light' | 'dark' | 'auto';
  timezone: string;
  
  // Financial
  balance: number; // Current account balance
  equity: number; // Balance + unrealized P/L
  margin: number; // Used margin
  freeMargin: number; // Available margin
  marginLevel: number; // Percentage
  currency: string; // Account currency (USD, EUR, etc.)
  
  // Subscription
  subscriptionPlan: 'free' | 'basic' | 'pro' | 'premium' | 'vip';
  subscriptionStatus: 'active' | 'expired' | 'cancelled';
  subscriptionExpiresAt?: number; // timestamp
  
  // Metadata
  lastLoginAt?: number;
  lastActivityAt?: number;
  ipAddress?: string;
  deviceInfo?: string;
}

// KV Store Key: user:{userId}
// Example: user:usr_abc123

// ============================================
// KYC VERIFICATION
// ============================================

export interface KYCDocument {
  id: string;
  userId: string;
  type: 'passport' | 'drivers_license' | 'national_id' | 'proof_of_address';
  status: 'pending' | 'approved' | 'rejected';
  
  // Document Details
  documentNumber?: string;
  issuingCountry?: string;
  expiryDate?: number;
  
  // Files
  frontImageUrl?: string;
  backImageUrl?: string;
  
  // Review
  uploadedAt: number;
  reviewedAt?: number;
  reviewedBy?: string; // Admin user ID
  rejectionReason?: string;
  
  // Metadata
  metadata?: Record<string, any>;
}

// KV Store Key: kyc:{userId}
// Example: kyc:usr_abc123

// ============================================
// TRADING POSITIONS
// ============================================

export interface Position {
  id: string;
  userId: string;
  
  // Asset Details
  symbol: string; // e.g., "BTCUSD", "EURUSD", "AAPL"
  assetName: string;
  assetCategory: 'Crypto' | 'Forex' | 'Stocks' | 'Indices' | 'Commodities' | 'Funds' | 'Futures' | 'Bonds' | 'Economy' | 'Options';
  
  // Position Details
  type: 'buy' | 'sell';
  status: 'open' | 'closed' | 'pending';
  
  // Pricing
  entryPrice: number;
  currentPrice: number;
  exitPrice?: number; // Set when position is closed
  
  // Volume
  volume: number; // Lot size
  units: number; // Actual units
  
  // Risk Management
  stopLoss?: number;
  takeProfit?: number;
  
  // P&L Calculations
  profit: number; // Current profit/loss
  profitPercentage: number;
  
  // Timestamps
  openedAt: number; // Entry timestamp
  closedAt?: number; // Exit timestamp
  duration?: number; // Time held in milliseconds
  
  // Fees
  commission: number;
  swap: number; // Overnight fees
  
  // Source
  source: 'manual' | 'auto_trader' | 'copy_trade' | 'signal';
  signalId?: string;
  autoTraderId?: string;
  
  // Metadata
  notes?: string;
  tags?: string[];
}

// KV Store Keys:
// - position:open:{userId}:{positionId} - For open positions
// - position:closed:{userId}:{positionId} - For closed positions
// - position:pending:{userId}:{positionId} - For pending orders

// ============================================
// TRADING HISTORY
// ============================================

export interface TradeHistory {
  id: string;
  userId: string;
  positionId: string;
  
  // Trade Details
  symbol: string;
  type: 'buy' | 'sell';
  action: 'open' | 'close' | 'modify' | 'cancel';
  
  // Prices
  price: number;
  volume: number;
  
  // P&L (for close actions)
  profit?: number;
  profitPercentage?: number;
  
  // Timestamps
  timestamp: number;
  
  // Metadata
  reason?: string; // e.g., "Stop loss triggered", "Manual close"
}

// KV Store Key: history:{userId}:{tradeId}
// Example: history:usr_abc123:trade_xyz789

// ============================================
// DEPOSITS
// ============================================

export interface Deposit {
  id: string;
  userId: string;
  
  // Amount
  amount: number;
  currency: string;
  
  // Payment Details
  paymentMethod: 'crypto' | 'bank_transfer' | 'credit_card' | 'debit_card' | 'paypal' | 'skrill' | 'neteller' | 'other';
  paymentProvider?: string; // e.g., "Coinbase", "Stripe"
  
  // Crypto specific
  cryptoCurrency?: string; // e.g., "BTC", "ETH", "USDT"
  cryptoAddress?: string;
  cryptoTxHash?: string;
  cryptoNetwork?: string; // e.g., "BTC", "ERC20", "TRC20"
  
  // Bank specific
  bankName?: string;
  bankAccountNumber?: string;
  bankRoutingNumber?: string;
  bankSwiftCode?: string;
  
  // Status
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  
  // Timestamps
  createdAt: number;
  processedAt?: number;
  completedAt?: number;
  
  // Review
  reviewedBy?: string; // Admin user ID
  rejectionReason?: string;
  
  // Fees
  fee: number;
  netAmount: number; // Amount after fees
  
  // Receipt
  receiptUrl?: string;
  transactionReference?: string;
  
  // Metadata
  notes?: string;
  metadata?: Record<string, any>;
}

// KV Store Key: deposit:{userId}:{depositId}
// Example: deposit:usr_abc123:dep_xyz789

// ============================================
// WITHDRAWALS
// ============================================

export interface Withdrawal {
  id: string;
  userId: string;
  
  // Amount
  amount: number;
  currency: string;
  
  // Payment Details
  paymentMethod: 'crypto' | 'bank_transfer' | 'paypal' | 'skrill' | 'neteller' | 'other';
  paymentProvider?: string;
  
  // Crypto specific
  cryptoCurrency?: string;
  cryptoAddress: string;
  cryptoTxHash?: string;
  cryptoNetwork?: string;
  cryptoMemo?: string; // For coins like XRP, XLM
  
  // Bank specific
  bankName?: string;
  bankAccountNumber: string;
  bankAccountName?: string;
  bankRoutingNumber?: string;
  bankSwiftCode?: string;
  bankIban?: string;
  
  // Status
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'rejected';
  
  // Timestamps
  createdAt: number;
  processedAt?: number;
  completedAt?: number;
  
  // Review
  reviewedBy?: string; // Admin user ID
  rejectionReason?: string;
  
  // Fees
  fee: number;
  netAmount: number; // Amount after fees
  
  // Security
  requiresKyc: boolean;
  kycVerified: boolean;
  twoFactorVerified: boolean;
  
  // Receipt
  receiptUrl?: string;
  transactionReference?: string;
  
  // Metadata
  notes?: string;
  metadata?: Record<string, any>;
}

// KV Store Key: withdrawal:{userId}:{withdrawalId}
// Example: withdrawal:usr_abc123:wd_xyz789

// ============================================
// NOTIFICATIONS
// ============================================

export interface Notification {
  id: string;
  userId: string;
  
  // Notification Details
  type: 'trade' | 'deposit' | 'withdrawal' | 'kyc' | 'account' | 'system' | 'marketing' | 'signal' | 'alert';
  category: 'info' | 'success' | 'warning' | 'error' | 'critical';
  
  // Content
  title: string;
  message: string;
  actionUrl?: string;
  actionLabel?: string;
  
  // Status
  isRead: boolean;
  readAt?: number;
  
  // Timestamps
  createdAt: number;
  expiresAt?: number;
  
  // Metadata
  metadata?: Record<string, any>;
  icon?: string;
}

// KV Store Key: notification:{userId}:{notificationId}
// Example: notification:usr_abc123:notif_xyz789

// ============================================
// USER PREFERENCES
// ============================================

export interface UserPreferences {
  userId: string;
  
  // Market Favorites/Watchlist
  favoriteSymbols: string[]; // Array of symbols
  
  // Notification Preferences
  notifications: {
    email: {
      trades: boolean;
      deposits: boolean;
      withdrawals: boolean;
      kyc: boolean;
      marketing: boolean;
      signals: boolean;
    };
    push: {
      trades: boolean;
      deposits: boolean;
      withdrawals: boolean;
      priceAlerts: boolean;
      signals: boolean;
    };
    sms: {
      trades: boolean;
      withdrawals: boolean;
      security: boolean;
    };
  };
  
  // Trading Preferences
  trading: {
    defaultLeverage: number;
    defaultStopLoss: number; // Percentage
    defaultTakeProfit: number; // Percentage
    confirmBeforeTrade: boolean;
    soundEnabled: boolean;
    autoCloseOnProfit: boolean;
  };
  
  // Display Preferences
  chartType: 'candlestick' | 'line' | 'area';
  chartTimeframe: '1m' | '5m' | '15m' | '1h' | '4h' | '1d' | '1w';
  showBalance: boolean;
  
  // Updated timestamp
  updatedAt: number;
}

// KV Store Key: preferences:{userId}
// Example: preferences:usr_abc123

// ============================================
// TRADING SIGNALS
// ============================================

export interface TradingSignal {
  id: string;
  
  // Signal Details
  symbol: string;
  assetName: string;
  assetCategory: string;
  
  // Signal Type
  type: 'buy' | 'sell';
  strength: 'weak' | 'moderate' | 'strong' | 'very_strong';
  
  // Pricing
  entryPrice: number;
  currentPrice: number;
  stopLoss?: number;
  takeProfit?: number;
  
  // Targets
  targets: {
    target1?: number;
    target2?: number;
    target3?: number;
  };
  
  // Status
  status: 'active' | 'triggered' | 'completed' | 'cancelled' | 'expired';
  
  // Analysis
  analysis: string; // Text explanation
  indicators: string[]; // e.g., ["RSI Oversold", "MACD Bullish Crossover"]
  
  // Timestamps
  createdAt: number;
  expiresAt?: number;
  triggeredAt?: number;
  
  // Source
  source: 'ai' | 'analyst' | 'algorithm';
  confidence: number; // 0-100
  
  // Performance (after completion)
  performance?: {
    profitPercentage: number;
    duration: number;
    targetHit?: number; // Which target was hit (1, 2, or 3)
  };
  
  // Subscription tier required
  requiredTier: 'free' | 'basic' | 'pro' | 'premium' | 'vip';
}

// KV Store Key: signal:{signalId}
// Example: signal:sig_abc123

// ============================================
// AUTO TRADER CONFIGURATION
// ============================================

export interface AutoTraderConfig {
  id: string;
  userId: string;
  
  // Basic Settings
  name: string;
  isActive: boolean;
  
  // Asset Selection
  symbols: string[]; // Which assets to trade
  categories: string[]; // Which categories to trade
  
  // Trading Parameters
  strategy: 'scalping' | 'day_trading' | 'swing_trading' | 'trend_following' | 'mean_reversion' | 'breakout';
  riskLevel: 'conservative' | 'moderate' | 'aggressive';
  
  // Position Sizing
  maxPositionSize: number; // Maximum per trade
  maxTotalExposure: number; // Maximum total open positions
  positionSizeType: 'fixed' | 'percentage' | 'risk_based';
  
  // Risk Management
  stopLossPercentage: number;
  takeProfitPercentage: number;
  maxDailyLoss: number;
  maxDrawdown: number;
  
  // Trading Hours
  tradingHours: {
    enabled: boolean;
    timezone: string;
    schedule: {
      monday: { enabled: boolean; start: string; end: string; };
      tuesday: { enabled: boolean; start: string; end: string; };
      wednesday: { enabled: boolean; start: string; end: string; };
      thursday: { enabled: boolean; start: string; end: string; };
      friday: { enabled: boolean; start: string; end: string; };
      saturday: { enabled: boolean; start: string; end: string; };
      sunday: { enabled: boolean; start: string; end: string; };
    };
  };
  
  // AI Settings
  useAI: boolean;
  aiModel?: string;
  aiConfidenceThreshold: number; // Minimum confidence to execute
  
  // Performance Tracking
  statistics: {
    totalTrades: number;
    winningTrades: number;
    losingTrades: number;
    winRate: number;
    totalProfit: number;
    totalLoss: number;
    netProfit: number;
    averageWin: number;
    averageLoss: number;
    largestWin: number;
    largestLoss: number;
    profitFactor: number;
    sharpeRatio?: number;
    maxDrawdown: number;
  };
  
  // Timestamps
  createdAt: number;
  updatedAt: number;
  lastExecutedAt?: number;
}

// KV Store Key: autotrader:{userId}:{configId}
// Example: autotrader:usr_abc123:at_xyz789

// ============================================
// ADMIN SETTINGS
// ============================================

export interface AdminSettings {
  id: 'global_settings'; // Singleton
  
  // Trading Settings
  trading: {
    enableLiveTrading: boolean;
    enableDemoTrading: boolean;
    maintenanceMode: boolean;
    
    // Leverage Limits
    maxLeverage: number;
    minTradeSize: number;
    maxTradeSize: number;
    
    // Spreads
    defaultSpread: number;
    spreadMultiplier: number;
    
    // Market Data
    useRealMarketData: boolean;
    marketDataProvider: 'tradingview' | 'simulated';
  };
  
  // Fees Structure
  fees: {
    depositFeePercentage: number;
    withdrawalFeePercentage: number;
    tradingFeePercentage: number;
    inactivityFee: number;
    inactivityDays: number;
    
    // Minimum fees
    minDepositFee: number;
    minWithdrawalFee: number;
  };
  
  // Limits
  limits: {
    minDeposit: number;
    maxDeposit: number;
    minWithdrawal: number;
    maxWithdrawal: number;
    dailyWithdrawalLimit: number;
    monthlyWithdrawalLimit: number;
    
    // KYC Requirements
    kycRequiredForWithdrawalAbove: number;
  };
  
  // Subscription Plans
  subscriptionPlans: {
    free: {
      price: number;
      features: string[];
      maxPositions: number;
      leverage: number;
      signals: boolean;
      autoTrader: boolean;
    };
    basic: {
      price: number;
      features: string[];
      maxPositions: number;
      leverage: number;
      signals: boolean;
      autoTrader: boolean;
    };
    pro: {
      price: number;
      features: string[];
      maxPositions: number;
      leverage: number;
      signals: boolean;
      autoTrader: boolean;
    };
    premium: {
      price: number;
      features: string[];
      maxPositions: number;
      leverage: number;
      signals: boolean;
      autoTrader: boolean;
    };
    vip: {
      price: number;
      features: string[];
      maxPositions: number;
      leverage: number;
      signals: boolean;
      autoTrader: boolean;
    };
  };
  
  // Payment Providers
  paymentProviders: {
    crypto: {
      enabled: boolean;
      providers: string[];
      minAmount: number;
      maxAmount: number;
    };
    bankTransfer: {
      enabled: boolean;
      providers: string[];
      minAmount: number;
      maxAmount: number;
    };
    creditCard: {
      enabled: boolean;
      providers: string[];
      minAmount: number;
      maxAmount: number;
    };
  };
  
  // Notifications
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    
    // Admin alerts
    notifyOnLargeDeposit: number;
    notifyOnLargeWithdrawal: number;
    notifyOnSuspiciousActivity: boolean;
  };
  
  // Updated timestamp
  updatedAt: number;
}

// KV Store Key: settings:global
// Example: settings:global

// ============================================
// ACTIVITY LOGS (for admin audit trail)
// ============================================

export interface ActivityLog {
  id: string;
  
  // Actor
  actorId: string; // User or admin ID
  actorType: 'user' | 'admin' | 'system';
  actorEmail?: string;
  
  // Action
  action: string; // e.g., "deposit_approved", "user_suspended", "trade_executed"
  resource: string; // e.g., "deposit", "user", "position"
  resourceId?: string;
  
  // Details
  description: string;
  changes?: {
    before?: Record<string, any>;
    after?: Record<string, any>;
  };
  
  // Context
  ipAddress?: string;
  userAgent?: string;
  
  // Timestamp
  timestamp: number;
  
  // Metadata
  metadata?: Record<string, any>;
}

// KV Store Key: log:{timestamp}:{logId}
// Example: log:1703001234567:log_abc123

// ============================================
// PRICE ALERTS
// ============================================

export interface PriceAlert {
  id: string;
  userId: string;
  
  // Alert Details
  symbol: string;
  assetName: string;
  
  // Condition
  condition: 'above' | 'below' | 'crosses_up' | 'crosses_down';
  targetPrice: number;
  
  // Notification
  notifyVia: ('email' | 'push' | 'sms')[];
  message: string;
  
  // Status
  isActive: boolean;
  triggered: boolean;
  triggeredAt?: number;
  
  // Repeat
  repeatable: boolean; // If true, alert resets after triggering
  
  // Timestamps
  createdAt: number;
  expiresAt?: number;
}

// KV Store Key: alert:{userId}:{alertId}
// Example: alert:usr_abc123:alert_xyz789

// ============================================
// KEY NAMING CONVENTIONS
// ============================================
// 
// All keys follow the pattern: {resource}:{identifier}[:{subidentifier}]
//
// User data: user:{userId}
// KYC data: kyc:{userId}
// Open positions: position:open:{userId}:{positionId}
// Closed positions: position:closed:{userId}:{positionId}
// Pending orders: position:pending:{userId}:{positionId}
// Trade history: history:{userId}:{tradeId}
// Deposits: deposit:{userId}:{depositId}
// Withdrawals: withdrawal:{userId}:{withdrawalId}
// Notifications: notification:{userId}:{notificationId}
// User preferences: preferences:{userId}
// Trading signals: signal:{signalId}
// Auto trader configs: autotrader:{userId}:{configId}
// Price alerts: alert:{userId}:{alertId}
// Activity logs: log:{timestamp}:{logId}
// Admin settings: settings:global
//
// Index keys (for querying):
// user:index:email:{email} -> userId
// user:index:status:{status} -> userId[]
// position:index:user:{userId} -> positionId[]
// deposit:index:status:{status} -> depositId[]
// withdrawal:index:status:{status} -> withdrawalId[]
// signal:index:active -> signalId[]
