// ============================================
// DATABASE SCHEMA TYPES FOR METATRADE PRO
// ============================================
// This file defines all data structures used across client and admin sides
// Data is stored in Supabase relational tables for optimal performance and integrity.

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
  
  // Access Flags
  hasInvestmentAccess?: boolean;
  hasAutoTradeAccess?: boolean;
  hasSignalAccess?: boolean;

  // Metadata
  lastLoginAt?: number;
  lastActivityAt?: number;
  ipAddress?: string;
  deviceInfo?: string;

  // Migration Additions v2.0
  enabledDepositMethods?: string[]; // Array of allowed method types: 'crypto', 'credit_card', 'bank_transfer'
  enabledWithdrawalMethods?: string[]; // Array of allowed method types
  cryptoWallets?: Record<string, { address: string; network: string }>; // Per-user custom wallets
  passwordHash?: string;
  isAdmin?: boolean;
}

// Relational Table: users

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

// Relational Table: kyc_documents

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

// Relational Tables: positions, trade_history, pending_orders

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

// Relational Table: trade_history

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

// Relational Table: deposits

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

// Relational Table: withdrawals

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

// Relational Table: notifications

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

// Relational Table: user_preferences

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

// Relational Table: signals

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

// Relational Table: auto_trader_configs

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

// Relational Table: global_settings

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

// Relational Table: activity_logs

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

// Relational Table: price_alerts

// ============================================
// PENDING ORDERS
// ============================================

export interface PendingOrder {
  id: string;
  userId: string;
  symbol: string;
  side: 'buy' | 'sell';
  type: 'limit' | 'stop' | 'stop_limit';
  price: number;
  units: number;
  leverage?: number;
  margin?: number;
  stopLoss?: number;
  takeProfit?: number;
  status: 'pending' | 'filled' | 'cancelled' | 'expired';
  mode: 'live' | 'demo';
  expiresAt?: number;
  createdAt: number;
  updatedAt: number;
}

// ============================================
// TRADING ACCOUNTS (Per-user live balance)
// ============================================

export interface TradingAccount {
  userId: string;
  balance: number;
  equity: number;
  credit: number;
  bonus: number;
  realizedPnl: number;
  unrealizedPnl: number;
  margin: number;
  availableFunds: number;
  currency: string;
  createdAt: number;
  updatedAt: number;
}

// ============================================
// INVESTMENT WALLETS
// ============================================

export interface InvestmentWallet {
  userId: string;
  portfolio: number;
  ecn: number;
  ipo: number;
  updatedAt: number;
}

// ============================================
// USER SESSIONS
// ============================================

export interface UserSession {
  id: string;
  userId: string;
  device?: string;
  browser?: string;
  os?: string;
  ipAddress?: string;
  location?: string;
  isActive: boolean;
  lastActiveAt: number;
  createdAt: number;
  expiresAt?: number;
}

// ============================================
// LOGIN HISTORY
// ============================================

export interface LoginHistory {
  id: string;
  userId: string;
  action: 'login' | 'logout' | 'failed_login' | 'password_change' | 'session_revoked';
  ipAddress?: string;
  device?: string;
  browser?: string;
  os?: string;
  location?: string;
  success: boolean;
  failureReason?: string;
  createdAt: number;
}

// ============================================
// PASSWORD RESETS
// ============================================

export interface PasswordReset {
  id: string;
  userId: string;
  email: string;
  token: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired' | 'used';
  newPasswordHash?: string;
  requestedAt: number;
  expiresAt: number;
  resolvedAt?: number;
  resolvedBy?: string;
  rejectionReason?: string;
}

// ============================================
// CRM MESSAGING
// ============================================

export interface CRMMessage {
  id: string;
  type: 'general' | 'personal' | 'promo' | 'announcement' | 'offer';
  recipientType: 'individual' | 'segment' | 'broadcast' | 'all' | 'specific';
  recipientIds: string[];
  channels: string[];
  title?: string;
  message: string;
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  metadata?: Record<string, any>;
  scheduledFor?: number;
  sentAt?: number;
  createdAt: number;
}

// ============================================
// EMAIL TEMPLATES
// ============================================

export interface EmailTemplateBlock {
  id: string;
  type: 'text' | 'button' | 'image' | 'feature_list' | 'spacer' | 'footer';
  content: string;
  style?: Record<string, any>;
}

export interface EmailTemplate {
  id: string;
  name: string;
  category: 'deposit' | 'withdrawal' | 'deals' | 'subscription' | 'promotion' | 'general';
  subject: string;
  logoUrl?: string;
  heroImage?: string;
  heroTitle?: string;
  accentColor?: string;
  footerText?: string;
  blocks: EmailTemplateBlock[];
  createdBy?: string;
  lastModified: number;
  createdAt: number;
}

// ============================================
// SMTP CONFIGURATION
// ============================================

export interface SMTPConfig {
  id: string;
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  fromEmail: string;
  fromName: string;
  isVerified: boolean;
  lastTestedAt?: number;
  updatedAt: number;
}

// ============================================
// CONTACT SUBMISSIONS
// ============================================

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  repliedBy?: string;
  repliedAt?: number;
  replyMessage?: string;
  createdAt: number;
  updatedAt: number;
}

// ============================================
// USER WITHDRAWAL METHODS
// ============================================

export interface UserWithdrawalMethod {
  id: string;
  userId: string;
  type: 'bank' | 'paypal' | 'crypto';
  isDefault: boolean;
  // Bank fields
  bankName?: string;
  accountHolderName?: string;
  accountNumber?: string;
  routingNumber?: string;
  swiftCode?: string;
  iban?: string;
  // PayPal fields
  paypalEmail?: string;
  // Crypto fields
  cryptoType?: string;
  walletAddress?: string;
  network?: string;
  createdAt: number;
  updatedAt: number;
}

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
// CRM messages: crm:message:{messageId}
// Email templates: crm:template:{templateId}
// SMTP config: crm:smtp
// User withdrawal methods: withdrawal:method:{userId}:{methodId}
//
// Index keys (for querying):
// user:index:email:{email} -> userId
// user:index:status:{status} -> userId[]
// position:index:user:{userId} -> positionId[]
// deposit:index:status:{status} -> depositId[]
// withdrawal:index:status:{status} -> withdrawalId[]
// signal:index:active -> signalId[]
