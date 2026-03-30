// ============================================
// DATA SERVICE - Server-side CRUD Operations
// ============================================
// This file handles all database operations using Supabase KV store
// Import this in your Hono routes to perform CRUD operations

import * as kv from './kv_store.tsx';
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
} from '../../../types/database';

import { generateId, getCurrentTimestamp } from './storageUtils.tsx';

// Import storage key helpers from utils (these are pure functions)
const UserStorage = {
  getById(userId: string): string {
    return `user:${userId}`;
  },
  getByEmailIndex(email: string): string {
    return `user:index:email:${email}`;
  },
  getByStatusIndex(status: string): string {
    return `user:index:status:${status}`;
  },
};

const KYCStorage = {
  getByUserId(userId: string): string {
    return `kyc:${userId}`;
  },
};

const PositionStorage = {
  getOpenKey(userId: string, positionId: string): string {
    return `position:open:${userId}:${positionId}`;
  },
  getClosedKey(userId: string, positionId: string): string {
    return `position:closed:${userId}:${positionId}`;
  },
  getPendingKey(userId: string, positionId: string): string {
    return `position:pending:${userId}:${positionId}`;
  },
  getUserPositionsPrefix(userId: string): string {
    return `position:open:${userId}:`;
  },
  getUserClosedPositionsPrefix(userId: string): string {
    return `position:closed:${userId}:`;
  },
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

const TradeHistoryStorage = {
  getKey(userId: string, tradeId: string): string {
    return `history:${userId}:${tradeId}`;
  },
  getUserHistoryPrefix(userId: string): string {
    return `history:${userId}:`;
  },
};

const DepositStorage = {
  getKey(userId: string, depositId: string): string {
    return `deposit:${userId}:${depositId}`;
  },
  getUserDepositsPrefix(userId: string): string {
    return `deposit:${userId}:`;
  },
  async approve(deposit: Deposit, reviewedBy: string): Promise<Deposit> {
    return {
      ...deposit,
      status: 'completed',
      processedAt: getCurrentTimestamp(),
      completedAt: getCurrentTimestamp(),
      reviewedBy,
    };
  },
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

const WithdrawalStorage = {
  getKey(userId: string, withdrawalId: string): string {
    return `withdrawal:${userId}:${withdrawalId}`;
  },
  getUserWithdrawalsPrefix(userId: string): string {
    return `withdrawal:${userId}:`;
  },
  async approve(withdrawal: Withdrawal, reviewedBy: string): Promise<Withdrawal> {
    return {
      ...withdrawal,
      status: 'processing',
      processedAt: getCurrentTimestamp(),
      reviewedBy,
    };
  },
  async complete(withdrawal: Withdrawal, txHash?: string): Promise<Withdrawal> {
    return {
      ...withdrawal,
      status: 'completed',
      completedAt: getCurrentTimestamp(),
      cryptoTxHash: txHash || withdrawal.cryptoTxHash,
    };
  },
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

const NotificationStorage = {
  getKey(userId: string, notificationId: string): string {
    return `notification:${userId}:${notificationId}`;
  },
  getUserNotificationsPrefix(userId: string): string {
    return `notification:${userId}:`;
  },
  async markAsRead(notification: Notification): Promise<Notification> {
    return {
      ...notification,
      isRead: true,
      readAt: getCurrentTimestamp(),
    };
  },
};

const PreferencesStorage = {
  getKey(userId: string): string {
    return `preferences:${userId}`;
  },
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
        sms: {
          trades: false,
          withdrawals: true,
          security: true,
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
  async update(preferences: UserPreferences, updates: Partial<UserPreferences>): Promise<UserPreferences> {
    return {
      ...preferences,
      ...updates,
      updatedAt: getCurrentTimestamp(),
    };
  },
};

const SignalStorage = {
  getKey(signalId: string): string {
    return `signal:${signalId}`;
  },
  async create(signalData: Omit<TradingSignal, 'id' | 'createdAt'>): Promise<TradingSignal> {
    const signal: TradingSignal = {
      ...signalData,
      id: generateId('sig'),
      createdAt: getCurrentTimestamp(),
    };
    return signal;
  },
  async trigger(signal: TradingSignal): Promise<TradingSignal> {
    return {
      ...signal,
      status: 'triggered',
      triggeredAt: getCurrentTimestamp(),
    };
  },
};

const AutoTraderStorage = {
  getKey(userId: string, configId: string): string {
    return `autotrader:${userId}:${configId}`;
  },
  getUserConfigsPrefix(userId: string): string {
    return `autotrader:${userId}:`;
  },
};

const SettingsStorage = {
  getKey(): string {
    return 'settings:global';
  },
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
        smsNotifications: true,
        pushNotifications: true,
        notifyOnLargeDeposit: 10000,
        notifyOnLargeWithdrawal: 5000,
        notifyOnSuspiciousActivity: true,
      },
      updatedAt: getCurrentTimestamp(),
    };
  },
  async update(settings: AdminSettings, updates: Partial<AdminSettings>): Promise<AdminSettings> {
    return {
      ...settings,
      ...updates,
      updatedAt: getCurrentTimestamp(),
    };
  },
};

const ActivityLogStorage = {
  getKey(timestamp: number, logId: string): string {
    return `log:${timestamp}:${logId}`;
  },
  async create(logData: Omit<ActivityLog, 'id' | 'timestamp'>): Promise<ActivityLog> {
    const timestamp = getCurrentTimestamp();
    const log: ActivityLog = {
      ...logData,
      id: generateId('log'),
      timestamp,
    };
    return log;
  },
};

const PriceAlertStorage = {
  getKey(userId: string, alertId: string): string {
    return `alert:${userId}:${alertId}`;
  },
  getUserAlertsPrefix(userId: string): string {
    return `alert:${userId}:`;
  },
  async create(alertData: Omit<PriceAlert, 'id' | 'createdAt' | 'triggered'>): Promise<PriceAlert> {
    const alert: PriceAlert = {
      ...alertData,
      id: generateId('alert'),
      createdAt: getCurrentTimestamp(),
      triggered: false,
    };
    return alert;
  },
  async trigger(alert: PriceAlert): Promise<PriceAlert> {
    return {
      ...alert,
      triggered: true,
      triggeredAt: getCurrentTimestamp(),
      isActive: alert.repeatable,
    };
  },
};

// ============================================
// USER SERVICE
// ============================================

export const UserService = {
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
    
    // Save to KV store
    await kv.set(UserStorage.getById(user.id), user);
    
    // Create email index
    await kv.set(UserStorage.getByEmailIndex(user.email), user.id);
    
    // Create default preferences
    const preferences = PreferencesStorage.getDefault(user.id);
    await kv.set(PreferencesStorage.getKey(user.id), preferences);
    
    return user;
  },

  /**
   * Get user by ID
   */
  async getById(userId: string): Promise<User | null> {
    return await kv.get<User>(UserStorage.getById(userId));
  },

  /**
   * Get user by email
   */
  async getByEmail(email: string): Promise<User | null> {
    const userId = await kv.get<string>(UserStorage.getByEmailIndex(email));
    if (!userId) return null;
    return await this.getById(userId);
  },

  /**
   * Update user
   */
  async update(userId: string, updates: Partial<User>): Promise<User | null> {
    const user = await this.getById(userId);
    if (!user) return null;
    
    const updatedUser: User = {
      ...user,
      ...updates,
      updatedAt: getCurrentTimestamp(),
    };
    
    await kv.set(UserStorage.getById(userId), updatedUser);
    return updatedUser;
  },

  /**
   * Delete user (soft delete)
   */
  async delete(userId: string): Promise<boolean> {
    const user = await this.getById(userId);
    if (!user) return false;
    
    await this.update(userId, { status: 'closed' });
    return true;
  },

  /**
   * Get all users (admin only)
   */
  async getAll(): Promise<User[]> {
    const allData = await kv.getByPrefix<User>('user:usr_');
    return allData || [];
  },

  /**
   * Get users by status
   */
  async getByStatus(status: User['status']): Promise<User[]> {
    const allUsers = await this.getAll();
    return allUsers.filter(user => user.status === status);
  },
};

// ============================================
// KYC SERVICE
// ============================================

export const KYCService = {
  /**
   * Create KYC document
   */
  async create(kycData: Omit<KYCDocument, 'id' | 'uploadedAt'>): Promise<KYCDocument> {
    const kyc: KYCDocument = {
      ...kycData,
      id: generateId('kyc'),
      uploadedAt: getCurrentTimestamp(),
    };
    
    await kv.set(KYCStorage.getByUserId(kycData.userId), kyc);
    
    // Update user KYC status
    await UserService.update(kycData.userId, { kycStatus: 'pending' });
    
    return kyc;
  },

  /**
   * Get KYC by user ID
   */
  async getByUserId(userId: string): Promise<KYCDocument | null> {
    return await kv.get<KYCDocument>(KYCStorage.getByUserId(userId));
  },

  /**
   * Update KYC status
   */
  async updateStatus(
    userId: string,
    status: KYCDocument['status'],
    reviewedBy: string,
    rejectionReason?: string
  ): Promise<KYCDocument | null> {
    const kyc = await this.getByUserId(userId);
    if (!kyc) return null;
    
    const updatedKyc: KYCDocument = {
      ...kyc,
      status,
      reviewedAt: getCurrentTimestamp(),
      reviewedBy,
      rejectionReason,
    };
    
    await kv.set(KYCStorage.getByUserId(userId), updatedKyc);
    
    // Update user KYC status
    await UserService.update(userId, { kycStatus: status });
    
    return updatedKyc;
  },

  /**
   * Get all pending KYC reviews
   */
  async getPending(): Promise<KYCDocument[]> {
    const allData = await kv.getByPrefix<KYCDocument>('kyc:');
    if (!allData) return [];
    return allData.filter(kyc => kyc.status === 'pending');
  },
};

// ============================================
// POSITION SERVICE
// ============================================

export const PositionService = {
  /**
   * Create a new position
   */
  async create(positionData: Omit<Position, 'id' | 'openedAt'>): Promise<Position> {
    const position: Position = {
      ...positionData,
      id: generateId('pos'),
      openedAt: getCurrentTimestamp(),
    };
    
    const key = positionData.status === 'pending'
      ? PositionStorage.getPendingKey(positionData.userId, position.id)
      : PositionStorage.getOpenKey(positionData.userId, position.id);
    
    await kv.set(key, position);
    
    return position;
  },

  /**
   * Get position by ID
   */
  async getById(userId: string, positionId: string, status: 'open' | 'closed' | 'pending' = 'open'): Promise<Position | null> {
    let key: string;
    if (status === 'open') {
      key = PositionStorage.getOpenKey(userId, positionId);
    } else if (status === 'closed') {
      key = PositionStorage.getClosedKey(userId, positionId);
    } else {
      key = PositionStorage.getPendingKey(userId, positionId);
    }
    
    return await kv.get<Position>(key);
  },

  /**
   * Get all open positions for user
   */
  async getOpenPositions(userId: string): Promise<Position[]> {
    const positions = await kv.getByPrefix<Position>(PositionStorage.getUserPositionsPrefix(userId));
    return positions || [];
  },

  /**
   * Get all closed positions for user
   */
  async getClosedPositions(userId: string): Promise<Position[]> {
    const positions = await kv.getByPrefix<Position>(PositionStorage.getUserClosedPositionsPrefix(userId));
    return positions || [];
  },

  /**
   * Update position
   */
  async update(userId: string, positionId: string, updates: Partial<Position>): Promise<Position | null> {
    const position = await this.getById(userId, positionId, 'open');
    if (!position) return null;
    
    const updatedPosition: Position = {
      ...position,
      ...updates,
    };
    
    await kv.set(PositionStorage.getOpenKey(userId, positionId), updatedPosition);
    return updatedPosition;
  },

  /**
   * Close position
   */
  async close(userId: string, positionId: string, exitPrice: number, reason?: string): Promise<Position | null> {
    const position = await this.getById(userId, positionId, 'open');
    if (!position) return null;
    
    const closedPosition = await PositionStorage.close(position, exitPrice);
    
    // Move from open to closed
    await kv.del(PositionStorage.getOpenKey(userId, positionId));
    await kv.set(PositionStorage.getClosedKey(userId, positionId), closedPosition);
    
    // Create trade history entry
    await TradeHistoryService.create({
      userId,
      positionId,
      symbol: position.symbol,
      type: position.type,
      action: 'close',
      price: exitPrice,
      volume: position.volume,
      profit: closedPosition.profit,
      profitPercentage: closedPosition.profitPercentage,
      reason,
    });
    
    // Update user balance
    const user = await UserService.getById(userId);
    if (user) {
      await UserService.update(userId, {
        balance: user.balance + closedPosition.profit - closedPosition.commission - closedPosition.swap,
      });
    }
    
    return closedPosition;
  },

  /**
   * Delete position
   */
  async delete(userId: string, positionId: string): Promise<boolean> {
    await kv.del(PositionStorage.getOpenKey(userId, positionId));
    return true;
  },
};

// ============================================
// TRADE HISTORY SERVICE
// ============================================

export const TradeHistoryService = {
  /**
   * Create trade history entry
   */
  async create(historyData: Omit<TradeHistory, 'id' | 'timestamp'>): Promise<TradeHistory> {
    const history: TradeHistory = {
      ...historyData,
      id: generateId('trade'),
      timestamp: getCurrentTimestamp(),
    };
    
    await kv.set(TradeHistoryStorage.getKey(historyData.userId, history.id), history);
    return history;
  },

  /**
   * Get all history for user
   */
  async getByUserId(userId: string): Promise<TradeHistory[]> {
    const history = await kv.getByPrefix<TradeHistory>(TradeHistoryStorage.getUserHistoryPrefix(userId));
    return history || [];
  },
};

// ============================================
// DEPOSIT SERVICE
// ============================================

export const DepositService = {
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
    
    await kv.set(DepositStorage.getKey(depositData.userId, deposit.id), deposit);
    
    // Create notification
    await NotificationService.create({
      userId: depositData.userId,
      type: 'deposit',
      category: 'info',
      title: 'Deposit Pending',
      message: `Your deposit of ${depositData.currency} ${depositData.amount} is being processed.`,
    });
    
    return deposit;
  },

  /**
   * Get deposit by ID
   */
  async getById(userId: string, depositId: string): Promise<Deposit | null> {
    return await kv.get<Deposit>(DepositStorage.getKey(userId, depositId));
  },

  /**
   * Get all deposits for user
   */
  async getByUserId(userId: string): Promise<Deposit[]> {
    const deposits = await kv.getByPrefix<Deposit>(DepositStorage.getUserDepositsPrefix(userId));
    return deposits || [];
  },

  /**
   * Get all deposits by status
   */
  async getByStatus(status: Deposit['status']): Promise<Deposit[]> {
    const allDeposits = await kv.getByPrefix<Deposit>('deposit:');
    if (!allDeposits) return [];
    return allDeposits.filter(dep => dep.status === status);
  },

  /**
   * Approve deposit
   */
  async approve(userId: string, depositId: string, reviewedBy: string): Promise<Deposit | null> {
    const deposit = await this.getById(userId, depositId);
    if (!deposit) return null;
    
    const approvedDeposit = await DepositStorage.approve(deposit, reviewedBy);
    await kv.set(DepositStorage.getKey(userId, depositId), approvedDeposit);
    
    // Update user balance
    const user = await UserService.getById(userId);
    if (user) {
      await UserService.update(userId, {
        balance: user.balance + approvedDeposit.netAmount,
      });
    }
    
    // Create notification
    await NotificationService.create({
      userId,
      type: 'deposit',
      category: 'success',
      title: 'Deposit Approved',
      message: `Your deposit of ${deposit.currency} ${deposit.netAmount} has been credited to your account.`,
    });
    
    // Log activity
    await ActivityLogService.create({
      actorId: reviewedBy,
      actorType: 'admin',
      action: 'deposit_approved',
      resource: 'deposit',
      resourceId: depositId,
      description: `Approved deposit ${depositId} for user ${userId}`,
    });
    
    return approvedDeposit;
  },

  /**
   * Reject deposit
   */
  async reject(userId: string, depositId: string, reviewedBy: string, reason: string): Promise<Deposit | null> {
    const deposit = await this.getById(userId, depositId);
    if (!deposit) return null;
    
    const rejectedDeposit = await DepositStorage.reject(deposit, reviewedBy, reason);
    await kv.set(DepositStorage.getKey(userId, depositId), rejectedDeposit);
    
    // Create notification
    await NotificationService.create({
      userId,
      type: 'deposit',
      category: 'error',
      title: 'Deposit Rejected',
      message: `Your deposit was rejected. Reason: ${reason}`,
    });
    
    // Log activity
    await ActivityLogService.create({
      actorId: reviewedBy,
      actorType: 'admin',
      action: 'deposit_rejected',
      resource: 'deposit',
      resourceId: depositId,
      description: `Rejected deposit ${depositId} for user ${userId}. Reason: ${reason}`,
    });
    
    return rejectedDeposit;
  },
};

// ============================================
// WITHDRAWAL SERVICE
// ============================================

export const WithdrawalService = {
  /**
   * Create withdrawal
   */
  async create(withdrawalData: Omit<Withdrawal, 'id' | 'createdAt'>): Promise<Withdrawal | { error: string }> {
    // Check user balance
    const user = await UserService.getById(withdrawalData.userId);
    if (!user) return { error: 'User not found' };
    
    if (user.balance < withdrawalData.amount) {
      return { error: 'Insufficient balance' };
    }
    
    // Check KYC requirement
    const settings = await SettingsService.get();
    if (withdrawalData.amount > settings.limits.kycRequiredForWithdrawalAbove) {
      const kyc = await KYCService.getByUserId(withdrawalData.userId);
      if (!kyc || kyc.status !== 'approved') {
        return { error: 'KYC verification required for this withdrawal amount' };
      }
    }
    
    const withdrawal: Withdrawal = {
      ...withdrawalData,
      id: generateId('wd'),
      createdAt: getCurrentTimestamp(),
      netAmount: withdrawalData.amount - withdrawalData.fee,
    };
    
    await kv.set(WithdrawalStorage.getKey(withdrawalData.userId, withdrawal.id), withdrawal);
    
    // Deduct from user balance immediately (held in escrow)
    await UserService.update(withdrawalData.userId, {
      balance: user.balance - withdrawalData.amount,
    });
    
    // Create notification
    await NotificationService.create({
      userId: withdrawalData.userId,
      type: 'withdrawal',
      category: 'info',
      title: 'Withdrawal Pending',
      message: `Your withdrawal of ${withdrawalData.currency} ${withdrawalData.amount} is being processed.`,
    });
    
    return withdrawal;
  },

  /**
   * Get withdrawal by ID
   */
  async getById(userId: string, withdrawalId: string): Promise<Withdrawal | null> {
    return await kv.get<Withdrawal>(WithdrawalStorage.getKey(userId, withdrawalId));
  },

  /**
   * Get all withdrawals for user
   */
  async getByUserId(userId: string): Promise<Withdrawal[]> {
    const withdrawals = await kv.getByPrefix<Withdrawal>(WithdrawalStorage.getUserWithdrawalsPrefix(userId));
    return withdrawals || [];
  },

  /**
   * Get all withdrawals by status
   */
  async getByStatus(status: Withdrawal['status']): Promise<Withdrawal[]> {
    const allWithdrawals = await kv.getByPrefix<Withdrawal>('withdrawal:');
    if (!allWithdrawals) return [];
    return allWithdrawals.filter(wd => wd.status === status);
  },

  /**
   * Approve withdrawal
   */
  async approve(userId: string, withdrawalId: string, reviewedBy: string): Promise<Withdrawal | null> {
    const withdrawal = await this.getById(userId, withdrawalId);
    if (!withdrawal) return null;
    
    const approvedWithdrawal = await WithdrawalStorage.approve(withdrawal, reviewedBy);
    await kv.set(WithdrawalStorage.getKey(userId, withdrawalId), approvedWithdrawal);
    
    // Create notification
    await NotificationService.create({
      userId,
      type: 'withdrawal',
      category: 'success',
      title: 'Withdrawal Approved',
      message: `Your withdrawal of ${withdrawal.currency} ${withdrawal.netAmount} has been approved and is being processed.`,
    });
    
    // Log activity
    await ActivityLogService.create({
      actorId: reviewedBy,
      actorType: 'admin',
      action: 'withdrawal_approved',
      resource: 'withdrawal',
      resourceId: withdrawalId,
      description: `Approved withdrawal ${withdrawalId} for user ${userId}`,
    });
    
    return approvedWithdrawal;
  },

  /**
   * Complete withdrawal
   */
  async complete(userId: string, withdrawalId: string, txHash?: string): Promise<Withdrawal | null> {
    const withdrawal = await this.getById(userId, withdrawalId);
    if (!withdrawal) return null;
    
    const completedWithdrawal = await WithdrawalStorage.complete(withdrawal, txHash);
    await kv.set(WithdrawalStorage.getKey(userId, withdrawalId), completedWithdrawal);
    
    // Create notification
    await NotificationService.create({
      userId,
      type: 'withdrawal',
      category: 'success',
      title: 'Withdrawal Completed',
      message: `Your withdrawal of ${withdrawal.currency} ${withdrawal.netAmount} has been completed.`,
    });
    
    return completedWithdrawal;
  },

  /**
   * Reject withdrawal
   */
  async reject(userId: string, withdrawalId: string, reviewedBy: string, reason: string): Promise<Withdrawal | null> {
    const withdrawal = await this.getById(userId, withdrawalId);
    if (!withdrawal) return null;
    
    const rejectedWithdrawal = await WithdrawalStorage.reject(withdrawal, reviewedBy, reason);
    await kv.set(WithdrawalStorage.getKey(userId, withdrawalId), rejectedWithdrawal);
    
    // Refund user balance
    const user = await UserService.getById(userId);
    if (user) {
      await UserService.update(userId, {
        balance: user.balance + withdrawal.amount,
      });
    }
    
    // Create notification
    await NotificationService.create({
      userId,
      type: 'withdrawal',
      category: 'error',
      title: 'Withdrawal Rejected',
      message: `Your withdrawal was rejected and funds have been returned. Reason: ${reason}`,
    });
    
    // Log activity
    await ActivityLogService.create({
      actorId: reviewedBy,
      actorType: 'admin',
      action: 'withdrawal_rejected',
      resource: 'withdrawal',
      resourceId: withdrawalId,
      description: `Rejected withdrawal ${withdrawalId} for user ${userId}. Reason: ${reason}`,
    });
    
    return rejectedWithdrawal;
  },
};

// ============================================
// NOTIFICATION SERVICE
// ============================================

export const NotificationService = {
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
    
    await kv.set(NotificationStorage.getKey(notificationData.userId, notification.id), notification);
    return notification;
  },

  /**
   * Get all notifications for user
   */
  async getByUserId(userId: string): Promise<Notification[]> {
    const notifications = await kv.getByPrefix<Notification>(NotificationStorage.getUserNotificationsPrefix(userId));
    return notifications || [];
  },

  /**
   * Mark as read
   */
  async markAsRead(userId: string, notificationId: string): Promise<Notification | null> {
    const notification = await kv.get<Notification>(NotificationStorage.getKey(userId, notificationId));
    if (!notification) return null;
    
    const readNotification = await NotificationStorage.markAsRead(notification);
    await kv.set(NotificationStorage.getKey(userId, notificationId), readNotification);
    return readNotification;
  },

  /**
   * Delete notification
   */
  async delete(userId: string, notificationId: string): Promise<boolean> {
    await kv.del(NotificationStorage.getKey(userId, notificationId));
    return true;
  },
};

// ============================================
// PREFERENCES SERVICE
// ============================================

export const PreferencesService = {
  /**
   * Get preferences
   */
  async get(userId: string): Promise<UserPreferences> {
    const preferences = await kv.get<UserPreferences>(PreferencesStorage.getKey(userId));
    return preferences || PreferencesStorage.getDefault(userId);
  },

  /**
   * Update preferences
   */
  async update(userId: string, updates: Partial<UserPreferences>): Promise<UserPreferences> {
    const current = await this.get(userId);
    const updated = await PreferencesStorage.update(current, updates);
    await kv.set(PreferencesStorage.getKey(userId), updated);
    return updated;
  },
};

// ============================================
// SIGNAL SERVICE
// ============================================

export const SignalService = {
  /**
   * Create signal
   */
  async create(signalData: Omit<TradingSignal, 'id' | 'createdAt'>): Promise<TradingSignal> {
    const signal = await SignalStorage.create(signalData);
    await kv.set(SignalStorage.getKey(signal.id), signal);
    return signal;
  },

  /**
   * Get signal by ID
   */
  async getById(signalId: string): Promise<TradingSignal | null> {
    return await kv.get<TradingSignal>(SignalStorage.getKey(signalId));
  },

  /**
   * Get all active signals
   */
  async getActive(): Promise<TradingSignal[]> {
    const allSignals = await kv.getByPrefix<TradingSignal>('signal:');
    if (!allSignals) return [];
    return allSignals.filter(signal => signal.status === 'active');
  },

  /**
   * Update signal
   */
  async update(signalId: string, updates: Partial<TradingSignal>): Promise<TradingSignal | null> {
    const signal = await this.getById(signalId);
    if (!signal) return null;
    
    const updatedSignal = { ...signal, ...updates };
    await kv.set(SignalStorage.getKey(signalId), updatedSignal);
    return updatedSignal;
  },
};

// ============================================
// AUTO TRADER SERVICE
// ============================================

export const AutoTraderService = {
  /**
   * Create config
   */
  async create(configData: Omit<AutoTraderConfig, 'id' | 'createdAt' | 'updatedAt' | 'statistics'>): Promise<AutoTraderConfig> {
    const config = await AutoTraderStorage.create(configData);
    await kv.set(AutoTraderStorage.getKey(configData.userId, config.id), config);
    return config;
  },

  /**
   * Get config by ID
   */
  async getById(userId: string, configId: string): Promise<AutoTraderConfig | null> {
    return await kv.get<AutoTraderConfig>(AutoTraderStorage.getKey(userId, configId));
  },

  /**
   * Get all configs for user
   */
  async getByUserId(userId: string): Promise<AutoTraderConfig[]> {
    const configs = await kv.getByPrefix<AutoTraderConfig>(AutoTraderStorage.getUserConfigsPrefix(userId));
    return configs || [];
  },

  /**
   * Update config
   */
  async update(userId: string, configId: string, updates: Partial<AutoTraderConfig>): Promise<AutoTraderConfig | null> {
    const config = await this.getById(userId, configId);
    if (!config) return null;
    
    const updatedConfig = {
      ...config,
      ...updates,
      updatedAt: getCurrentTimestamp(),
    };
    
    await kv.set(AutoTraderStorage.getKey(userId, configId), updatedConfig);
    return updatedConfig;
  },
};

// ============================================
// SETTINGS SERVICE
// ============================================

export const SettingsService = {
  /**
   * Get settings
   */
  async get(): Promise<AdminSettings> {
    const settings = await kv.get<AdminSettings>(SettingsStorage.getKey());
    return settings || SettingsStorage.getDefault();
  },

  /**
   * Update settings
   */
  async update(updates: Partial<AdminSettings>): Promise<AdminSettings> {
    const current = await this.get();
    const updated = await SettingsStorage.update(current, updates);
    await kv.set(SettingsStorage.getKey(), updated);
    return updated;
  },
};

// ============================================
// ACTIVITY LOG SERVICE
// ============================================

export const ActivityLogService = {
  /**
   * Create activity log
   */
  async create(logData: Omit<ActivityLog, 'id' | 'timestamp'>): Promise<ActivityLog> {
    const log = await ActivityLogStorage.create(logData);
    await kv.set(ActivityLogStorage.getKey(log.timestamp, log.id), log);
    return log;
  },

  /**
   * Get logs by date range
   */
  async getByDateRange(startTimestamp: number, endTimestamp: number): Promise<ActivityLog[]> {
    const allLogs = await kv.getByPrefix<ActivityLog>(`log:${startTimestamp}:`);
    if (!allLogs) return [];
    return allLogs.filter(log => log.timestamp >= startTimestamp && log.timestamp <= endTimestamp);
  },
};

// ============================================
// PRICE ALERT SERVICE
// ============================================

export const PriceAlertService = {
  /**
   * Create alert
   */
  async create(alertData: Omit<PriceAlert, 'id' | 'createdAt' | 'triggered'>): Promise<PriceAlert> {
    const alert = await PriceAlertStorage.create(alertData);
    await kv.set(PriceAlertStorage.getKey(alertData.userId, alert.id), alert);
    return alert;
  },

  /**
   * Get all alerts for user
   */
  async getByUserId(userId: string): Promise<PriceAlert[]> {
    const alerts = await kv.getByPrefix<PriceAlert>(PriceAlertStorage.getUserAlertsPrefix(userId));
    return alerts || [];
  },

  /**
   * Check and trigger alerts
   */
  async checkAlerts(userId: string, symbol: string, currentPrice: number): Promise<void> {
    const alerts = await this.getByUserId(userId);
    const activeAlerts = alerts.filter(
      alert => alert.isActive && !alert.triggered && alert.symbol === symbol
    );
    
    for (const alert of activeAlerts) {
      let shouldTrigger = false;
      
      if (alert.condition === 'above' && currentPrice > alert.targetPrice) {
        shouldTrigger = true;
      } else if (alert.condition === 'below' && currentPrice < alert.targetPrice) {
        shouldTrigger = true;
      }
      
      if (shouldTrigger) {
        const triggered = await PriceAlertStorage.trigger(alert);
        await kv.set(PriceAlertStorage.getKey(userId, alert.id), triggered);
        
        // Create notification
        await NotificationService.create({
          userId,
          type: 'alert',
          category: 'warning',
          title: 'Price Alert Triggered',
          message: alert.message,
        });
      }
    }
  },
};