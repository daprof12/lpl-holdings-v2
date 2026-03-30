// ============================================
// DATA STORAGE UTILITIES
// ============================================
// Helper functions for CRUD operations with Supabase KV store
// These functions work on both client and server sides

import type {
  User,
  KYCDocument,
  Position,
  TradeHistory,
  Deposit,
  Withdrawal,
  Notification,
  UserPreferences,
  TradingSignal,
  AutoTraderConfig,
  AdminSettings,
  ActivityLog,
  PriceAlert,
} from '../types/database';

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Generate unique ID with prefix
 */
export function generateId(prefix: string): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 9);
  return `${prefix}_${timestamp}${random}`;
}

/**
 * Get current timestamp
 */
export function getCurrentTimestamp(): number {
  return Date.now();
}

// ============================================
// USER OPERATIONS
// ============================================

export const UserStorage = {
  /**
   * Create a new user
   */
  async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const user: User = {
      ...userData,
      id: generateId('usr'),
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp(),
    };
    
    // In server context, use kv.set
    // In client context, use API call
    // This is a helper - actual implementation depends on context
    return user;
  },

  /**
   * Get user by ID
   */
  getById(userId: string): string {
    return `user:${userId}`;
  },

  /**
   * Get user by email (index key)
   */
  getByEmailIndex(email: string): string {
    return `user:index:email:${email}`;
  },

  /**
   * Get all users by status (index key)
   */
  getByStatusIndex(status: User['status']): string {
    return `user:index:status:${status}`;
  },

  /**
   * Update user
   */
  async update(userId: string, updates: Partial<User>): Promise<User> {
    // Helper to ensure updatedAt is set
    return {
      ...updates,
      updatedAt: getCurrentTimestamp(),
    } as User;
  },

  /**
   * Delete user (soft delete by setting status)
   */
  async softDelete(userId: string): Promise<void> {
    // Set status to 'closed'
    // Actual implementation depends on context
  },
};

// ============================================
// KYC OPERATIONS
// ============================================

export const KYCStorage = {
  /**
   * Create KYC document
   */
  async create(kycData: Omit<KYCDocument, 'id' | 'uploadedAt'>): Promise<KYCDocument> {
    const kyc: KYCDocument = {
      ...kycData,
      id: generateId('kyc'),
      uploadedAt: getCurrentTimestamp(),
    };
    return kyc;
  },

  /**
   * Get KYC by user ID
   */
  getByUserId(userId: string): string {
    return `kyc:${userId}`;
  },

  /**
   * Get all pending KYC reviews
   */
  getPendingIndex(): string {
    return `kyc:index:status:pending`;
  },
};

// ============================================
// POSITION OPERATIONS
// ============================================

export const PositionStorage = {
  /**
   * Create a new position
   */
  async create(positionData: Omit<Position, 'id' | 'openedAt'>): Promise<Position> {
    const position: Position = {
      ...positionData,
      id: generateId('pos'),
      openedAt: getCurrentTimestamp(),
    };
    return position;
  },

  /**
   * Get open position key
   */
  getOpenKey(userId: string, positionId: string): string {
    return `position:open:${userId}:${positionId}`;
  },

  /**
   * Get closed position key
   */
  getClosedKey(userId: string, positionId: string): string {
    return `position:closed:${userId}:${positionId}`;
  },

  /**
   * Get pending position key
   */
  getPendingKey(userId: string, positionId: string): string {
    return `position:pending:${userId}:${positionId}`;
  },

  /**
   * Get all positions for user (index key prefix)
   */
  getUserPositionsPrefix(userId: string): string {
    return `position:open:${userId}:`;
  },

  /**
   * Get all closed positions for user (index key prefix)
   */
  getUserClosedPositionsPrefix(userId: string): string {
    return `position:closed:${userId}:`;
  },

  /**
   * Close a position
   */
  async close(position: Position, exitPrice: number): Promise<Position> {
    const closedPosition: Position = {
      ...position,
      status: 'closed',
      exitPrice,
      closedAt: getCurrentTimestamp(),
      duration: getCurrentTimestamp() - position.openedAt,
      currentPrice: exitPrice,
      profit: position.type === 'buy' 
        ? (exitPrice - position.entryPrice) * position.units
        : (position.entryPrice - exitPrice) * position.units,
    };
    
    closedPosition.profitPercentage = 
      (closedPosition.profit / (position.entryPrice * position.units)) * 100;
    
    return closedPosition;
  },
};

// ============================================
// TRADE HISTORY OPERATIONS
// ============================================

export const TradeHistoryStorage = {
  /**
   * Create trade history entry
   */
  async create(historyData: Omit<TradeHistory, 'id' | 'timestamp'>): Promise<TradeHistory> {
    const history: TradeHistory = {
      ...historyData,
      id: generateId('trade'),
      timestamp: getCurrentTimestamp(),
    };
    return history;
  },

  /**
   * Get history key
   */
  getKey(userId: string, tradeId: string): string {
    return `history:${userId}:${tradeId}`;
  },

  /**
   * Get all history for user (prefix)
   */
  getUserHistoryPrefix(userId: string): string {
    return `history:${userId}:`;
  },
};

// ============================================
// DEPOSIT OPERATIONS
// ============================================

export const DepositStorage = {
  /**
   * Create deposit
   */
  async create(depositData: Omit<Deposit, 'id' | 'createdAt'>): Promise<Deposit> {
    const deposit: Deposit = {
      ...depositData,
      id: generateId('dep'),
      createdAt: getCurrentTimestamp(),
      netAmount: depositData.amount - depositData.fee,
    };
    return deposit;
  },

  /**
   * Get deposit key
   */
  getKey(userId: string, depositId: string): string {
    return `deposit:${userId}:${depositId}`;
  },

  /**
   * Get all deposits for user (prefix)
   */
  getUserDepositsPrefix(userId: string): string {
    return `deposit:${userId}:`;
  },

  /**
   * Get deposits by status (index)
   */
  getByStatusIndex(status: Deposit['status']): string {
    return `deposit:index:status:${status}`;
  },

  /**
   * Approve deposit
   */
  async approve(deposit: Deposit, reviewedBy: string): Promise<Deposit> {
    return {
      ...deposit,
      status: 'completed',
      processedAt: getCurrentTimestamp(),
      completedAt: getCurrentTimestamp(),
      reviewedBy,
    };
  },

  /**
   * Reject deposit
   */
  async reject(deposit: Deposit, reviewedBy: string, reason: string): Promise<Deposit> {
    return {
      ...deposit,
      status: 'failed',
      processedAt: getCurrentTimestamp(),
      reviewedBy,
      rejectionReason: reason,
    };
  },
};

// ============================================
// WITHDRAWAL OPERATIONS
// ============================================

export const WithdrawalStorage = {
  /**
   * Create withdrawal
   */
  async create(withdrawalData: Omit<Withdrawal, 'id' | 'createdAt'>): Promise<Withdrawal> {
    const withdrawal: Withdrawal = {
      ...withdrawalData,
      id: generateId('wd'),
      createdAt: getCurrentTimestamp(),
      netAmount: withdrawalData.amount - withdrawalData.fee,
    };
    return withdrawal;
  },

  /**
   * Get withdrawal key
   */
  getKey(userId: string, withdrawalId: string): string {
    return `withdrawal:${userId}:${withdrawalId}`;
  },

  /**
   * Get all withdrawals for user (prefix)
   */
  getUserWithdrawalsPrefix(userId: string): string {
    return `withdrawal:${userId}:`;
  },

  /**
   * Get withdrawals by status (index)
   */
  getByStatusIndex(status: Withdrawal['status']): string {
    return `withdrawal:index:status:${status}`;
  },

  /**
   * Approve withdrawal
   */
  async approve(withdrawal: Withdrawal, reviewedBy: string): Promise<Withdrawal> {
    return {
      ...withdrawal,
      status: 'processing',
      processedAt: getCurrentTimestamp(),
      reviewedBy,
    };
  },

  /**
   * Complete withdrawal
   */
  async complete(withdrawal: Withdrawal, txHash?: string): Promise<Withdrawal> {
    return {
      ...withdrawal,
      status: 'completed',
      completedAt: getCurrentTimestamp(),
      cryptoTxHash: txHash || withdrawal.cryptoTxHash,
    };
  },

  /**
   * Reject withdrawal
   */
  async reject(withdrawal: Withdrawal, reviewedBy: string, reason: string): Promise<Withdrawal> {
    return {
      ...withdrawal,
      status: 'rejected',
      processedAt: getCurrentTimestamp(),
      reviewedBy,
      rejectionReason: reason,
    };
  },
};

// ============================================
// NOTIFICATION OPERATIONS
// ============================================

export const NotificationStorage = {
  /**
   * Create notification
   */
  async create(notificationData: Omit<Notification, 'id' | 'createdAt' | 'isRead'>): Promise<Notification> {
    const notification: Notification = {
      ...notificationData,
      id: generateId('notif'),
      createdAt: getCurrentTimestamp(),
      isRead: false,
    };
    return notification;
  },

  /**
   * Get notification key
   */
  getKey(userId: string, notificationId: string): string {
    return `notification:${userId}:${notificationId}`;
  },

  /**
   * Get all notifications for user (prefix)
   */
  getUserNotificationsPrefix(userId: string): string {
    return `notification:${userId}:`;
  },

  /**
   * Mark as read
   */
  async markAsRead(notification: Notification): Promise<Notification> {
    return {
      ...notification,
      isRead: true,
      readAt: getCurrentTimestamp(),
    };
  },

  /**
   * Bulk create notifications for multiple users
   */
  async createBulk(userIds: string[], notificationData: Omit<Notification, 'id' | 'userId' | 'createdAt' | 'isRead'>): Promise<Notification[]> {
    return userIds.map(userId => ({
      ...notificationData,
      userId,
      id: generateId('notif'),
      createdAt: getCurrentTimestamp(),
      isRead: false,
    }));
  },
};

// ============================================
// USER PREFERENCES OPERATIONS
// ============================================

export const PreferencesStorage = {
  /**
   * Create default preferences
   */
  getDefault(userId: string): UserPreferences {
    return {
      userId,
      favoriteSymbols: [],
      notifications: {
        email: {
          trades: true,
          deposits: true,
          withdrawals: true,
          kyc: true,
          marketing: false,
          signals: true,
        },
        push: {
          trades: true,
          deposits: true,
          withdrawals: true,
          priceAlerts: true,
          signals: true,
        },
      },
      trading: {
        defaultLeverage: 1,
        defaultStopLoss: 2,
        defaultTakeProfit: 5,
        confirmBeforeTrade: true,
        soundEnabled: true,
        autoCloseOnProfit: false,
      },
      chartType: 'candlestick',
      chartTimeframe: '1h',
      showBalance: true,
      updatedAt: getCurrentTimestamp(),
    };
  },

  /**
   * Get preferences key
   */
  getKey(userId: string): string {
    return `preferences:${userId}`;
  },

  /**
   * Update preferences
   */
  async update(preferences: UserPreferences, updates: Partial<UserPreferences>): Promise<UserPreferences> {
    return {
      ...preferences,
      ...updates,
      updatedAt: getCurrentTimestamp(),
    };
  },
};

// ============================================
// TRADING SIGNAL OPERATIONS
// ============================================

export const SignalStorage = {
  /**
   * Create signal
   */
  async create(signalData: Omit<TradingSignal, 'id' | 'createdAt'>): Promise<TradingSignal> {
    const signal: TradingSignal = {
      ...signalData,
      id: generateId('sig'),
      createdAt: getCurrentTimestamp(),
    };
    return signal;
  },

  /**
   * Get signal key
   */
  getKey(signalId: string): string {
    return `signal:${signalId}`;
  },

  /**
   * Get active signals index
   */
  getActiveIndex(): string {
    return `signal:index:active`;
  },

  /**
   * Trigger signal
   */
  async trigger(signal: TradingSignal): Promise<TradingSignal> {
    return {
      ...signal,
      status: 'triggered',
      triggeredAt: getCurrentTimestamp(),
    };
  },

  /**
   * Complete signal
   */
  async complete(signal: TradingSignal, performance: TradingSignal['performance']): Promise<TradingSignal> {
    return {
      ...signal,
      status: 'completed',
      performance,
    };
  },
};

// ============================================
// AUTO TRADER OPERATIONS
// ============================================

export const AutoTraderStorage = {
  /**
   * Create auto trader config
   */
  async create(configData: Omit<AutoTraderConfig, 'id' | 'createdAt' | 'updatedAt' | 'statistics'>): Promise<AutoTraderConfig> {
    const config: AutoTraderConfig = {
      ...configData,
      id: generateId('at'),
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp(),
      statistics: {
        totalTrades: 0,
        winningTrades: 0,
        losingTrades: 0,
        winRate: 0,
        totalProfit: 0,
        totalLoss: 0,
        netProfit: 0,
        averageWin: 0,
        averageLoss: 0,
        largestWin: 0,
        largestLoss: 0,
        profitFactor: 0,
        maxDrawdown: 0,
      },
    };
    return config;
  },

  /**
   * Get config key
   */
  getKey(userId: string, configId: string): string {
    return `autotrader:${userId}:${configId}`;
  },

  /**
   * Get all configs for user (prefix)
   */
  getUserConfigsPrefix(userId: string): string {
    return `autotrader:${userId}:`;
  },

  /**
   * Update statistics
   */
  async updateStatistics(config: AutoTraderConfig, trade: { profit: number }): Promise<AutoTraderConfig> {
    const stats = { ...config.statistics };
    
    stats.totalTrades++;
    
    if (trade.profit > 0) {
      stats.winningTrades++;
      stats.totalProfit += trade.profit;
      stats.largestWin = Math.max(stats.largestWin, trade.profit);
    } else {
      stats.losingTrades++;
      stats.totalLoss += Math.abs(trade.profit);
      stats.largestLoss = Math.max(stats.largestLoss, Math.abs(trade.profit));
    }
    
    stats.winRate = (stats.winningTrades / stats.totalTrades) * 100;
    stats.netProfit = stats.totalProfit - stats.totalLoss;
    stats.averageWin = stats.winningTrades > 0 ? stats.totalProfit / stats.winningTrades : 0;
    stats.averageLoss = stats.losingTrades > 0 ? stats.totalLoss / stats.losingTrades : 0;
    stats.profitFactor = stats.totalLoss > 0 ? stats.totalProfit / stats.totalLoss : 0;
    
    return {
      ...config,
      statistics: stats,
      updatedAt: getCurrentTimestamp(),
      lastExecutedAt: getCurrentTimestamp(),
    };
  },
};

// ============================================
// ADMIN SETTINGS OPERATIONS
// ============================================

export const SettingsStorage = {
  /**
   * Get settings key (singleton)
   */
  getKey(): string {
    return 'settings:global';
  },

  /**
   * Get default settings
   */
  getDefault(): AdminSettings {
    return {
      id: 'global_settings',
      trading: {
        enableLiveTrading: true,
        enableDemoTrading: true,
        maintenanceMode: false,
        maxLeverage: 100,
        minTradeSize: 0.01,
        maxTradeSize: 1000,
        defaultSpread: 0.0001,
        spreadMultiplier: 1,
        useRealMarketData: true,
        marketDataProvider: 'tradingview',
      },
      fees: {
        depositFeePercentage: 0,
        withdrawalFeePercentage: 1,
        tradingFeePercentage: 0.1,
        inactivityFee: 10,
        inactivityDays: 90,
        minDepositFee: 0,
        minWithdrawalFee: 5,
      },
      limits: {
        minDeposit: 10,
        maxDeposit: 100000,
        minWithdrawal: 20,
        maxWithdrawal: 50000,
        dailyWithdrawalLimit: 10000,
        monthlyWithdrawalLimit: 100000,
        kycRequiredForWithdrawalAbove: 1000,
      },
      subscriptionPlans: {
        free: {
          price: 0,
          features: ['Demo Trading', 'Basic Charts', 'Email Support'],
          maxPositions: 3,
          leverage: 10,
          signals: false,
          autoTrader: false,
        },
        basic: {
          price: 29,
          features: ['Live Trading', 'Advanced Charts', 'Priority Support', '5 Signals/day'],
          maxPositions: 10,
          leverage: 50,
          signals: true,
          autoTrader: false,
        },
        pro: {
          price: 99,
          features: ['Everything in Basic', 'Auto Trader', 'Unlimited Signals', 'API Access'],
          maxPositions: 50,
          leverage: 100,
          signals: true,
          autoTrader: true,
        },
        premium: {
          price: 299,
          features: ['Everything in Pro', 'Dedicated Account Manager', 'Custom Strategies'],
          maxPositions: 200,
          leverage: 200,
          signals: true,
          autoTrader: true,
        },
        vip: {
          price: 999,
          features: ['Everything in Premium', 'White Label Access', 'Custom Development'],
          maxPositions: 999,
          leverage: 500,
          signals: true,
          autoTrader: true,
        },
      },
      paymentProviders: {
        crypto: {
          enabled: true,
          providers: ['Coinbase', 'Binance Pay', 'Crypto.com'],
          minAmount: 10,
          maxAmount: 100000,
        },
        bankTransfer: {
          enabled: true,
          providers: ['Wire Transfer', 'ACH', 'SEPA'],
          minAmount: 100,
          maxAmount: 100000,
        },
        creditCard: {
          enabled: true,
          providers: ['Stripe', 'PayPal'],
          minAmount: 10,
          maxAmount: 5000,
        },
      },
      notifications: {
        emailNotifications: true,
        pushNotifications: true,
        notifyOnLargeDeposit: 10000,
        notifyOnLargeWithdrawal: 5000,
        notifyOnSuspiciousActivity: true,
      },
      updatedAt: getCurrentTimestamp(),
    };
  },

  /**
   * Update settings
   */
  async update(settings: AdminSettings, updates: Partial<AdminSettings>): Promise<AdminSettings> {
    return {
      ...settings,
      ...updates,
      updatedAt: getCurrentTimestamp(),
    };
  },
};

// ============================================
// ACTIVITY LOG OPERATIONS
// ============================================

export const ActivityLogStorage = {
  /**
   * Create activity log
   */
  async create(logData: Omit<ActivityLog, 'id' | 'timestamp'>): Promise<ActivityLog> {
    const timestamp = getCurrentTimestamp();
    const log: ActivityLog = {
      ...logData,
      id: generateId('log'),
      timestamp,
    };
    return log;
  },

  /**
   * Get log key
   */
  getKey(timestamp: number, logId: string): string {
    return `log:${timestamp}:${logId}`;
  },

  /**
   * Get logs by date range (prefix)
   */
  getByDatePrefix(startTimestamp: number): string {
    return `log:${startTimestamp}:`;
  },
};

// ============================================
// PRICE ALERT OPERATIONS
// ============================================

export const PriceAlertStorage = {
  /**
   * Create price alert
   */
  async create(alertData: Omit<PriceAlert, 'id' | 'createdAt' | 'triggered'>): Promise<PriceAlert> {
    const alert: PriceAlert = {
      ...alertData,
      id: generateId('alert'),
      createdAt: getCurrentTimestamp(),
      triggered: false,
    };
    return alert;
  },

  /**
   * Get alert key
   */
  getKey(userId: string, alertId: string): string {
    return `alert:${userId}:${alertId}`;
  },

  /**
   * Get all alerts for user (prefix)
   */
  getUserAlertsPrefix(userId: string): string {
    return `alert:${userId}:`;
  },

  /**
   * Trigger alert
   */
  async trigger(alert: PriceAlert): Promise<PriceAlert> {
    return {
      ...alert,
      triggered: true,
      triggeredAt: getCurrentTimestamp(),
      isActive: alert.repeatable, // If repeatable, keep active
    };
  },
};

// ============================================
// BATCH OPERATIONS
// ============================================

/**
 * Query helper to get all items with a prefix
 * Usage: await queryByPrefix('deposit:usr_123:')
 */
export function queryByPrefix(prefix: string): { prefix: string } {
  return { prefix };
}

/**
 * Pagination helper
 */
export interface PaginationParams {
  limit: number;
  offset: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  hasMore: boolean;
  nextOffset?: number;
}

export function paginate<T>(items: T[], params: PaginationParams): PaginatedResult<T> {
  const { limit, offset } = params;
  const paginatedItems = items.slice(offset, offset + limit);
  
  return {
    items: paginatedItems,
    total: items.length,
    hasMore: offset + limit < items.length,
    nextOffset: offset + limit < items.length ? offset + limit : undefined,
  };
}