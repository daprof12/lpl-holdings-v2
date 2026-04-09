// ============================================
// COMPLETE TABLE SERVICES FOR ALL 25 TABLES
// ============================================
// This file contains services for tables not in the basic tableService.tsx
// Import these along with the basic services

import supabase from './supabaseClient.ts';
import { generateId, getCurrentTimestamp } from './storageUtils.ts';

// ============================================
// MARKET ASSETS SERVICE
// ============================================
export const MarketAssetService = {
  async getAll(): Promise<any[]> {
    const { data, error } = await supabase
      .from('market_assets')
      .select('*')
      .eq('enabled', true)
      .order('symbol', { ascending: true });

    if (error) throw new Error(`Failed to fetch market assets: ${error.message}`);
    return data || [];
  },

  async getBySymbol(symbol: string): Promise<any | null> {
    const { data, error } = await supabase
      .from('market_assets')
      .select('*')
      .eq('symbol', symbol)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to fetch asset: ${error.message}`);
    }
    return data;
  },

  async getByCategory(category: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('market_assets')
      .select('*')
      .eq('category', category)
      .eq('enabled', true)
      .order('symbol', { ascending: true });

    if (error) throw new Error(`Failed to fetch assets by category: ${error.message}`);
    return data || [];
  },

  async updatePrice(symbol: string, price: number, change24h: number): Promise<void> {
    const { error } = await supabase
      .from('market_assets')
      .update({
        price,
        change_24h: change24h,
        updated_at: getCurrentTimestamp(),
      })
      .eq('symbol', symbol);

    if (error) throw new Error(`Failed to update asset price: ${error.message}`);
  },
};

// ============================================
// PAYMENT METHODS SERVICE
// ============================================
export const PaymentMethodService = {
  async getAll(): Promise<any[]> {
    const { data, error } = await supabase
      .from('payment_methods')
      .select('*')
      .eq('is_enabled', true)
      .eq('is_maintenance', false)
      .order('name', { ascending: true });

    if (error) throw new Error(`Failed to fetch payment methods: ${error.message}`);
    return data || [];
  },

  async getByType(type: string, availableFor: 'deposit' | 'withdrawal' | 'both'): Promise<any[]> {
    let query = supabase
      .from('payment_methods')
      .select('*')
      .eq('is_enabled', true)
      .eq('is_maintenance', false);

    if (type) {
      query = query.eq('type', type);
    }

    if (availableFor !== 'both') {
      query = query.or(`available_for.eq.${availableFor},available_for.eq.both`);
    }

    const { data, error } = await query.order('name', { ascending: true });

    if (error) throw new Error(`Failed to fetch payment methods: ${error.message}`);
    return data || [];
  },

  async getById(id: string): Promise<any | null> {
    const { data, error } = await supabase
      .from('payment_methods')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to fetch payment method: ${error.message}`);
    }
    return data;
  },
};

// ============================================
// USER PREFERENCES SERVICE
// ============================================
export const UserPreferencesService = {
  async get(userId: string): Promise<any | null> {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to fetch preferences: ${error.message}`);
    }
    return data;
  },

  async createOrUpdate(userId: string, preferences: any): Promise<any> {
    // Filter out fields that don't exist in the database table
    // Only keep fields that are actually in the user_preferences table
    const allowedFields = [
      'favorite_symbols',
      'default_leverage',
      'default_stop_loss',
      'default_take_profit',
      'confirm_before_trade',
      'sound_enabled',
      'chart_type',
      'chart_timeframe',
      'show_balance',
      'theme',
      'tradingMode',
    ];
    
    const filteredPreferences: any = {};
    for (const key of allowedFields) {
      if (preferences[key] !== undefined) {
        filteredPreferences[key] = preferences[key];
      }
    }
    
    const { data, error } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: userId,
        ...filteredPreferences,
        updated_at: getCurrentTimestamp(),
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to save preferences: ${error.message}`);
    return data;
  },

  async updateFavorites(userId: string, symbols: string[]): Promise<void> {
    const { error } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: userId,
        favorite_symbols: symbols,
        updated_at: getCurrentTimestamp(),
      });

    if (error) throw new Error(`Failed to update favorites: ${error.message}`);
  },
};

// ============================================
// INVESTMENT OFFERS SERVICE
// ============================================
export const InvestmentOfferService = {
  async getAll(): Promise<any[]> {
    const { data, error } = await supabase
      .from('investment_offers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to fetch investment offers: ${error.message}`);
    return data || [];
  },

  async getByType(type: 'IPO' | 'ECN'): Promise<any[]> {
    const { data, error } = await supabase
      .from('investment_offers')
      .select('*')
      .eq('type', type)
      .eq('enabled', true)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to fetch investment offers: ${error.message}`);
    return data || [];
  },

  async getById(id: string): Promise<any | null> {
    const { data, error } = await supabase
      .from('investment_offers')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to fetch investment offer: ${error.message}`);
    }
    return data;
  },

  async create(offerData: any): Promise<any> {
    const offer = {
      id: generateId('offer'),
      ...offerData,
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp(),
    };

    const { data, error } = await supabase
      .from('investment_offers')
      .insert(offer)
      .select()
      .single();

    if (error) throw new Error(`Failed to create investment offer: ${error.message}`);
    return data;
  },

  async update(id: string, updates: any): Promise<any | null> {
    const { data, error } = await supabase
      .from('investment_offers')
      .update({
        ...updates,
        updated_at: getCurrentTimestamp(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to update investment offer: ${error.message}`);
    }
    return data;
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('investment_offers')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Failed to delete investment offer: ${error.message}`);
    return true;
  },
};

// ============================================
// USER INVESTMENTS SERVICE
// ============================================
export const UserInvestmentService = {
  async getByUserId(userId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('user_investments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to fetch user investments: ${error.message}`);
    return data || [];
  },

  async create(investmentData: any): Promise<any> {
    const investment = {
      id: generateId('inv'),
      ...investmentData,
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp(),
    };

    const { data, error } = await supabase
      .from('user_investments')
      .insert(investment)
      .select()
      .single();

    if (error) throw new Error(`Failed to create investment: ${error.message}`);
    return data;
  },

  async updateStatus(investmentId: string, status: string): Promise<void> {
    const { error } = await supabase
      .from('user_investments')
      .update({
        status,
        updated_at: getCurrentTimestamp(),
      })
      .eq('id', investmentId);

    if (error) throw new Error(`Failed to update investment status: ${error.message}`);
  },
};

// ============================================
// SUPPORT TICKETS SERVICE
// ============================================
export const SupportTicketService = {
  async getByUserId(userId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('support_tickets')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to fetch support tickets: ${error.message}`);
    return data || [];
  },

  async getById(ticketId: string): Promise<any | null> {
    const { data, error } = await supabase
      .from('support_tickets')
      .select('*')
      .eq('id', ticketId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to fetch support ticket: ${error.message}`);
    }
    return data;
  },

  async create(ticketData: any): Promise<any> {
    const ticket = {
      id: generateId('tkt'),
      ...ticketData,
      status: 'open',
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp(),
    };

    const { data, error } = await supabase
      .from('support_tickets')
      .insert(ticket)
      .select()
      .single();

    if (error) throw new Error(`Failed to create support ticket: ${error.message}`);
    return data;
  },

  async updateStatus(ticketId: string, status: string): Promise<void> {
    const { error } = await supabase
      .from('support_tickets')
      .update({
        status,
        updated_at: getCurrentTimestamp(),
      })
      .eq('id', ticketId);

    if (error) throw new Error(`Failed to update ticket status: ${error.message}`);
  },
};

// ============================================
// TICKET MESSAGES SERVICE
// ============================================
export const TicketMessageService = {
  async getByTicketId(ticketId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('ticket_messages')
      .select('*')
      .eq('ticket_id', ticketId)
      .eq('is_internal', false) // Don't return internal admin notes to client
      .order('created_at', { ascending: true });

    if (error) throw new Error(`Failed to fetch ticket messages: ${error.message}`);
    return data || [];
  },

  async create(messageData: any): Promise<any> {
    const message = {
      id: generateId('msg'),
      ...messageData,
      created_at: getCurrentTimestamp(),
    };

    const { data, error } = await supabase
      .from('ticket_messages')
      .insert(message)
      .select()
      .single();

    if (error) throw new Error(`Failed to create ticket message: ${error.message}`);
    return data;
  },
};

// ============================================
// TRANSACTIONS SERVICE (Ledger)
// ============================================
export const TransactionService = {
  async getByUserId(userId: string, limit: number = 50): Promise<any[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw new Error(`Failed to fetch transactions: ${error.message}`);
    return data || [];
  },

  async create(transactionData: any): Promise<any> {
    const transaction = {
      id: generateId('txn'),
      ...transactionData,
      status: transactionData.status || 'completed',
      created_at: getCurrentTimestamp(),
    };

    const { data, error } = await supabase
      .from('transactions')
      .insert(transaction)
      .select()
      .single();

    if (error) throw new Error(`Failed to create transaction: ${error.message}`);
    return data;
  },

  async getByType(userId: string, type: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .eq('type', type)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to fetch transactions by type: ${error.message}`);
    return data || [];
  },
};

// ============================================
// KYC DOCUMENTS SERVICE
// ============================================
export const KYCDocumentService = {
  async getByUserId(userId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('kyc_documents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to fetch KYC documents: ${error.message}`);
    return data || [];
  },

  async create(kycData: any): Promise<any> {
    const kyc = {
      id: generateId('kyc'),
      ...kycData,
      status: 'pending',
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp(),
    };

    const { data, error } = await supabase
      .from('kyc_documents')
      .insert(kyc)
      .select()
      .single();

    if (error) throw new Error(`Failed to create KYC document: ${error.message}`);
    return data;
  },

  async updateStatus(kycId: string, status: string, rejectionReason?: string): Promise<void> {
    const { error } = await supabase
      .from('kyc_documents')
      .update({
        status,
        rejection_reason: rejectionReason,
        verified_at: status === 'approved' ? getCurrentTimestamp() : null,
        updated_at: getCurrentTimestamp(),
      })
      .eq('id', kycId);

    if (error) throw new Error(`Failed to update KYC status: ${error.message}`);
  },
};

// ============================================
// AUTO TRADER CONFIGS SERVICE
// ============================================
export const AutoTraderConfigService = {
  async getByUserId(userId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('auto_trader_configs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to fetch auto trader configs: ${error.message}`);
    return data || [];
  },

  async create(configData: any): Promise<any> {
    const config = {
      id: generateId('atc'),
      ...configData,
      is_active: false,
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp(),
    };

    const { data, error } = await supabase
      .from('auto_trader_configs')
      .insert(config)
      .select()
      .single();

    if (error) throw new Error(`Failed to create auto trader config: ${error.message}`);
    return data;
  },

  async toggleActive(configId: string, isActive: boolean): Promise<void> {
    const { error } = await supabase
      .from('auto_trader_configs')
      .update({
        is_active: isActive,
        updated_at: getCurrentTimestamp(),
      })
      .eq('id', configId);

    if (error) throw new Error(`Failed to toggle auto trader: ${error.message}`);
  },
};

// ============================================
// PRICE ALERTS SERVICE
// ============================================
export const PriceAlertService = {
  async getByUserId(userId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('price_alerts')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to fetch price alerts: ${error.message}`);
    return data || [];
  },

  async create(alertData: any): Promise<any> {
    const alert = {
      id: generateId('alt'),
      ...alertData,
      is_active: true,
      triggered: false,
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp(),
    };

    const { data, error } = await supabase
      .from('price_alerts')
      .insert(alert)
      .select()
      .single();

    if (error) throw new Error(`Failed to create price alert: ${error.message}`);
    return data;
  },

  async trigger(alertId: string): Promise<void> {
    const { error } = await supabase
      .from('price_alerts')
      .update({
        triggered: true,
        triggered_at: getCurrentTimestamp(),
        is_active: false,
        updated_at: getCurrentTimestamp(),
      })
      .eq('id', alertId);

    if (error) throw new Error(`Failed to trigger price alert: ${error.message}`);
  },

  async delete(alertId: string): Promise<void> {
    const { error } = await supabase
      .from('price_alerts')
      .delete()
      .eq('id', alertId);

    if (error) throw new Error(`Failed to delete price alert: ${error.message}`);
  },
};

// ============================================
// ADMIN SETTINGS SERVICE
// ============================================
export const AdminSettingsService = {
  async get(): Promise<any | null> {
    const { data, error } = await supabase
      .from('admin_settings')
      .select('*')
      .eq('id', 'global_settings')
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to fetch admin settings: ${error.message}`);
    }
    return data;
  },

  async update(settings: any): Promise<any> {
    const { data, error } = await supabase
      .from('admin_settings')
      .update({
        ...settings,
        updated_at: getCurrentTimestamp(),
      })
      .eq('id', 'global_settings')
      .select()
      .single();

    if (error) throw new Error(`Failed to update admin settings: ${error.message}`);
    return data;
  },
};

// ============================================
// TRADE HISTORY SERVICE
// ============================================
export const TradeHistoryService = {
  async getByUserId(userId: string, limit: number = 50): Promise<any[]> {
    const { data, error } = await supabase
      .from('trade_history')
      .select('*')
      .eq('user_id', userId)
      .order('closed_at', { ascending: false })
      .limit(limit);

    if (error) throw new Error(`Failed to fetch trade history: ${error.message}`);
    return data || [];
  },

  async create(tradeData: any): Promise<any> {
    const trade = {
      id: generateId('trd'),
      ...tradeData,
      created_at: getCurrentTimestamp(),
    };

    const { data, error } = await supabase
      .from('trade_history')
      .insert(trade)
      .select()
      .single();

    if (error) throw new Error(`Failed to create trade history: ${error.message}`);
    return data;
  },
};