// ============================================
// TABLE-BASED DATA SERVICE
// ============================================
// This replaces the KV store with proper Supabase table operations

import supabase from './supabaseClient.tsx';
import { generateId, getCurrentTimestamp } from './storageUtils.tsx';
import type {
  User,
  Deposit,
  Withdrawal,
  Position,
  Notification,
  TradingSignal,
} from '../../../types/database';

// ============================================
// USER SERVICE
// ============================================
export const UserService = {
  async create(userData: Partial<User>): Promise<User> {
    const user: User = {
      id: generateId('usr'),
      email: userData.email!,
      name: userData.name!,
      phone: userData.phone,
      country: userData.country,
      address: userData.address,
      city: userData.city,
      postal_code: userData.postal_code,
      date_of_birth: userData.date_of_birth,
      status: userData.status || 'active',
      email_verified: userData.email_verified || false,
      phone_verified: userData.phone_verified || false,
      two_factor_enabled: userData.two_factor_enabled || false,
      kyc_status: userData.kyc_status || 'not_started',
      account_type: userData.account_type || 'demo',
      language: userData.language || 'en',
      theme: userData.theme || 'light',
      timezone: userData.timezone || 'UTC',
      balance: userData.balance || 0,
      equity: userData.equity || 0,
      margin: userData.margin || 0,
      free_margin: userData.free_margin || 0,
      margin_level: userData.margin_level || 0,
      currency: userData.currency || 'USD',
      subscription_plan: userData.subscription_plan || 'free',
      subscription_status: userData.subscription_status || 'active',
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp(),
    } as User;

    const { data, error } = await supabase
      .from('users')
      .insert(user)
      .select()
      .single();

    if (error) throw new Error(`Failed to create user: ${error.message}`);
    return data;
  },

  async getAll(): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to fetch users: ${error.message}`);
    return data || [];
  },

  async getById(userId: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = not found
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
    return data;
  },

  async getByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to fetch user by email: ${error.message}`);
    }
    return data;
  },

  async update(userId: string, updates: Partial<User>): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .update({
        ...updates,
        updated_at: getCurrentTimestamp(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw new Error(`Failed to update user: ${error.message}`);
    return data;
  },

  async delete(userId: string): Promise<void> {
    const { error } = await supabase
      .from('users')
      .update({ status: 'closed' })
      .eq('id', userId);

    if (error) throw new Error(`Failed to delete user: ${error.message}`);
  },
};

// ============================================
// DEPOSIT SERVICE
// ============================================
export const DepositService = {
  async create(depositData: Partial<Deposit>): Promise<Deposit> {
    const deposit: Deposit = {
      id: generateId('dep'),
      user_id: depositData.user_id!,
      amount: depositData.amount!,
      currency: depositData.currency || 'USD',
      fee: depositData.fee || 0,
      net_amount: depositData.net_amount || depositData.amount!,
      payment_method: depositData.payment_method!,
      payment_provider: depositData.payment_provider,
      bank_name: depositData.bank_name,
      crypto_currency: depositData.crypto_currency,
      crypto_address: depositData.crypto_address,
      crypto_tx_hash: depositData.crypto_tx_hash,
      crypto_network: depositData.crypto_network,
      status: depositData.status || 'pending',
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp(),
    } as Deposit;

    const { data, error } = await supabase
      .from('deposits')
      .insert(deposit)
      .select()
      .single();

    if (error) throw new Error(`Failed to create deposit: ${error.message}`);
    
    // Create notification
    await NotificationService.create({
      user_id: deposit.user_id,
      type: 'deposit',
      category: 'info',
      title: 'Deposit Request Received',
      message: `Your deposit of ${deposit.currency} ${deposit.amount} is being processed.`,
    });

    return data;
  },

  async getByUserId(userId: string): Promise<Deposit[]> {
    const { data, error } = await supabase
      .from('deposits')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to fetch deposits: ${error.message}`);
    return data || [];
  },

  async getByStatus(status: string): Promise<Deposit[]> {
    const { data, error } = await supabase
      .from('deposits')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to fetch deposits by status: ${error.message}`);
    return data || [];
  },

  async approve(userId: string, depositId: string, adminId: string): Promise<Deposit> {
    const { data, error } = await supabase
      .from('deposits')
      .update({
        status: 'completed',
        processed_at: getCurrentTimestamp(),
        completed_at: getCurrentTimestamp(),
        reviewed_by: adminId,
        updated_at: getCurrentTimestamp(),
      })
      .eq('id', depositId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw new Error(`Failed to approve deposit: ${error.message}`);

    // Update user balance
    const { data: user } = await supabase
      .from('users')
      .select('balance, equity, free_margin')
      .eq('id', userId)
      .single();

    if (user) {
      await supabase
        .from('users')
        .update({
          balance: user.balance + data.net_amount,
          equity: user.equity + data.net_amount,
          free_margin: user.free_margin + data.net_amount,
          updated_at: getCurrentTimestamp(),
        })
        .eq('id', userId);
    }

    // Create notification
    await NotificationService.create({
      user_id: userId,
      type: 'deposit',
      category: 'success',
      title: 'Deposit Approved',
      message: `Your deposit of ${data.currency} ${data.amount} has been credited to your account.`,
    });

    return data;
  },

  async reject(userId: string, depositId: string, adminId: string, reason: string): Promise<Deposit> {
    const { data, error } = await supabase
      .from('deposits')
      .update({
        status: 'failed',
        processed_at: getCurrentTimestamp(),
        reviewed_by: adminId,
        rejection_reason: reason,
        updated_at: getCurrentTimestamp(),
      })
      .eq('id', depositId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw new Error(`Failed to reject deposit: ${error.message}`);

    // Create notification
    await NotificationService.create({
      user_id: userId,
      type: 'deposit',
      category: 'error',
      title: 'Deposit Rejected',
      message: `Your deposit request has been rejected. Reason: ${reason}`,
    });

    return data;
  },
};

// ============================================
// WITHDRAWAL SERVICE
// ============================================
export const WithdrawalService = {
  async create(withdrawalData: Partial<Withdrawal>): Promise<Withdrawal> {
    const withdrawal: Withdrawal = {
      id: generateId('wd'),
      user_id: withdrawalData.user_id!,
      amount: withdrawalData.amount!,
      currency: withdrawalData.currency || 'USD',
      fee: withdrawalData.fee || 0,
      net_amount: withdrawalData.net_amount || withdrawalData.amount!,
      payment_method: withdrawalData.payment_method!,
      bank_name: withdrawalData.bank_name,
      crypto_currency: withdrawalData.crypto_currency,
      crypto_address: withdrawalData.crypto_address,
      crypto_network: withdrawalData.crypto_network,
      status: withdrawalData.status || 'pending',
      requires_kyc: withdrawalData.requires_kyc || false,
      kyc_verified: withdrawalData.kyc_verified || false,
      two_factor_verified: withdrawalData.two_factor_verified || false,
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp(),
    } as Withdrawal;

    const { data, error } = await supabase
      .from('withdrawals')
      .insert(withdrawal)
      .select()
      .single();

    if (error) throw new Error(`Failed to create withdrawal: ${error.message}`);

    // Create notification
    await NotificationService.create({
      user_id: withdrawal.user_id,
      type: 'withdrawal',
      category: 'info',
      title: 'Withdrawal Request Received',
      message: `Your withdrawal of ${withdrawal.currency} ${withdrawal.amount} is being processed.`,
    });

    return data;
  },

  async getByUserId(userId: string): Promise<Withdrawal[]> {
    const { data, error } = await supabase
      .from('withdrawals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to fetch withdrawals: ${error.message}`);
    return data || [];
  },

  async getByStatus(status: string): Promise<Withdrawal[]> {
    const { data, error } = await supabase
      .from('withdrawals')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to fetch withdrawals by status: ${error.message}`);
    return data || [];
  },

  async approve(userId: string, withdrawalId: string, adminId: string): Promise<Withdrawal> {
    const { data, error } = await supabase
      .from('withdrawals')
      .update({
        status: 'processing',
        processed_at: getCurrentTimestamp(),
        reviewed_by: adminId,
        updated_at: getCurrentTimestamp(),
      })
      .eq('id', withdrawalId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw new Error(`Failed to approve withdrawal: ${error.message}`);

    // Deduct from user balance
    const { data: user } = await supabase
      .from('users')
      .select('balance, equity, free_margin')
      .eq('id', userId)
      .single();

    if (user) {
      await supabase
        .from('users')
        .update({
          balance: user.balance - data.amount,
          equity: user.equity - data.amount,
          free_margin: user.free_margin - data.amount,
          updated_at: getCurrentTimestamp(),
        })
        .eq('id', userId);
    }

    // Create notification
    await NotificationService.create({
      user_id: userId,
      type: 'withdrawal',
      category: 'info',
      title: 'Withdrawal Approved',
      message: `Your withdrawal of ${data.currency} ${data.amount} is being processed.`,
    });

    return data;
  },
};

// ============================================
// POSITION SERVICE
// ============================================
export const PositionService = {
  async create(positionData: Partial<Position>): Promise<Position> {
    const position: Position = {
      id: generateId('pos'),
      user_id: positionData.user_id!,
      symbol: positionData.symbol!,
      asset_name: positionData.asset_name!,
      asset_category: positionData.asset_category!,
      type: positionData.type!,
      status: positionData.status || 'open',
      entry_price: positionData.entry_price!,
      current_price: positionData.current_price!,
      volume: positionData.volume!,
      units: positionData.units!,
      stop_loss: positionData.stop_loss,
      take_profit: positionData.take_profit,
      profit: positionData.profit || 0,
      profit_percentage: positionData.profit_percentage || 0,
      commission: positionData.commission || 0,
      swap: positionData.swap || 0,
      source: positionData.source || 'manual',
      opened_at: getCurrentTimestamp(),
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp(),
    } as Position;

    const { data, error } = await supabase
      .from('positions')
      .insert(position)
      .select()
      .single();

    if (error) throw new Error(`Failed to create position: ${error.message}`);

    // Create notification
    await NotificationService.create({
      user_id: position.user_id,
      type: 'trade',
      category: 'success',
      title: 'Position Opened',
      message: `${position.type.toUpperCase()} ${position.symbol} at ${position.entry_price}`,
    });

    return data;
  },

  async getOpenPositions(userId: string): Promise<Position[]> {
    const { data, error } = await supabase
      .from('positions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'open')
      .order('opened_at', { ascending: false });

    if (error) throw new Error(`Failed to fetch positions: ${error.message}`);
    return data || [];
  },
};

// ============================================
// NOTIFICATION SERVICE
// ============================================
export const NotificationService = {
  async create(notificationData: Partial<Notification>): Promise<Notification> {
    const notification: Notification = {
      id: generateId('notif'),
      user_id: notificationData.user_id!,
      type: notificationData.type!,
      category: notificationData.category!,
      title: notificationData.title!,
      message: notificationData.message!,
      is_read: false,
      action_url: notificationData.action_url,
      action_label: notificationData.action_label,
      created_at: getCurrentTimestamp(),
    } as Notification;

    const { data, error } = await supabase
      .from('notifications')
      .insert(notification)
      .select()
      .single();

    if (error) throw new Error(`Failed to create notification: ${error.message}`);
    return data;
  },

  async getByUserId(userId: string): Promise<Notification[]> {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw new Error(`Failed to fetch notifications: ${error.message}`);
    return data || [];
  },
};

// ============================================
// SIGNAL SERVICE
// ============================================
export const SignalService = {
  async create(signalData: Partial<TradingSignal>): Promise<TradingSignal> {
    const signal: TradingSignal = {
      id: generateId('sig'),
      symbol: signalData.symbol!,
      asset_name: signalData.asset_name!,
      asset_category: signalData.asset_category!,
      type: signalData.type!,
      strength: signalData.strength!,
      entry_price: signalData.entry_price!,
      current_price: signalData.current_price!,
      stop_loss: signalData.stop_loss!,
      take_profit: signalData.take_profit!,
      targets: signalData.targets,
      status: signalData.status || 'active',
      analysis: signalData.analysis,
      indicators: signalData.indicators,
      source: signalData.source!,
      confidence: signalData.confidence,
      required_tier: signalData.required_tier!,
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp(),
    } as TradingSignal;

    const { data, error } = await supabase
      .from('trading_signals')
      .insert(signal)
      .select()
      .single();

    if (error) throw new Error(`Failed to create signal: ${error.message}`);
    return data;
  },

  async getAll(): Promise<TradingSignal[]> {
    const { data, error } = await supabase
      .from('trading_signals')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to fetch signals: ${error.message}`);
    return data || [];
  },
};
