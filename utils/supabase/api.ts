import { serverUrl, publicAnonKey, supabase } from './client';

const headers = {
  'Authorization': `Bearer ${publicAnonKey}`,
  'Content-Type': 'application/json'
};

export const api = {
  // Users
  users: {
    getAll: async () => {
      const { data, error } = await supabase.from('users').select('*');
      if (error) {
        console.error('[API] Error in getAll users:', error);
        return [];
      }
      return data;
    },
    getById: async (id: string) => {
      const { data, error } = await supabase.from('users').select('*').eq('id', id).maybeSingle();
      if (error) {
        console.error('[API] Error in getById user:', error);
        return null;
      }
      return data;
    },
    getByEmail: async (email: string) => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .maybeSingle();

      if (error) {
        console.error('[API] Error in getByEmail:', error);
        return null;
      }
      return data;
    },
    update: async (id: string, updates: any) => {
      const { data, error } = await supabase.from('users').update(updates).eq('id', id).select().maybeSingle();
      if (error) throw error;
      return data;
    },
    updateBalance: async (id: string, balance: number) => {
      const { data, error } = await supabase.from('users').update({ balance }).eq('id', id).select().maybeSingle();
      if (error) throw error;
      return data;
    },
    delete: async (id: string) => {
      // Manually cascade-delete associated records to prevent foreign key constraint errors
      await Promise.allSettled([
        supabase.from('trading_accounts').delete().eq('user_id', id),
        supabase.from('investment_wallets').delete().eq('user_id', id),
        supabase.from('activity_logs').delete().eq('actor_id', id),
        supabase.from('transactions').delete().eq('user_id', id),
        supabase.from('trade_history').delete().eq('user_id', id),
        supabase.from('positions').delete().eq('user_id', id),
        supabase.from('pending_orders').delete().eq('user_id', id),
        supabase.from('deposits').delete().eq('user_id', id),
        supabase.from('withdrawals').delete().eq('user_id', id),
        supabase.from('withdrawal_methods').delete().eq('user_id', id),
        supabase.from('user_investments').delete().eq('user_id', id),
        supabase.from('sell_requests').delete().eq('user_id', id),
        supabase.from('support_tickets').delete().eq('user_id', id),
        supabase.from('system_memos').delete().eq('user_id', id),
        supabase.from('member_packages').delete().eq('user_id', id),
      ]);

      // Delete the user from the custom table
      const { data, error } = await supabase.from('users').delete().eq('id', id).select();
      
      // If RLS blocks it (0 rows returned) and there's no error, we throw
      if (error) throw error;
      if (!data || data.length === 0) {
        throw new Error('RLS blocked deletion. Please run the `fix_users_delete_rls.sql` script in your Supabase SQL Editor to enable delete access.');
      }
      return true;
    },
  },

  // Trading Accounts
  tradingAccounts: {
    getByUserId: async (userId: string) => {
      const { data, error } = await supabase.from('trading_accounts').select('*').eq('user_id', userId).maybeSingle();
      return error ? null : data;
    },
    update: async (userId: string, updates: any) => {
      const { data, error } = await supabase.from('trading_accounts').update(updates).eq('user_id', userId).select().maybeSingle();
      return error ? null : data;
    },
    insert: async (data: any) => {
      const { data: res, error } = await supabase.from('trading_accounts').insert(data).select().maybeSingle();
      return error ? null : res;
    },
    getAll: async () => {
      const { data, error } = await supabase.from('trading_accounts').select('*');
      return error ? [] : data;
    },
  },

  // Sessions & History
  sessions: {
    getByUserId: async (userId: string) => {
      const { data, error } = await supabase.from('activity_logs').select('*').eq('actor_id', userId).in('action', ['login', 'logout']).order('created_at', { ascending: false });
      return error ? [] : data;
    },
    create: async (_data: any) => {
      // Session records come from login actions logged via loginHistory.log
      return { success: true };
    },
    revoke: async (id: string) => {
      const { error } = await supabase.from('activity_logs').delete().eq('id', id);
      return { success: !error };
    },
    revokeAll: async (userId: string, exemptId: string) => {
      const { error } = await supabase.from('activity_logs').delete().eq('actor_id', userId).neq('id', exemptId);
      return { success: !error };
    },
  },

  loginHistory: {
    getAll: async (limit = 500) => {
      const { data, error } = await supabase
        .from('activity_logs')
        .select('*')
        .in('action', ['login', 'logout'])
        .order('created_at', { ascending: false })
        .limit(limit);
      if (error) {
        console.error('[API] loginHistory.getAll error:', error);
        return [];
      }
      return data;
    },
    getByUserId: async (userId: string, limit = 20) => {
      const { data, error } = await supabase.from('activity_logs')
        .select('*')
        .eq('actor_id', userId)
        .in('action', ['login', 'logout'])
        .order('created_at', { ascending: false })
        .limit(limit);
      return error ? [] : data;
    },
    log: async (data: any) => {
      const { data: res, error } = await supabase.from('activity_logs').insert({
        actor_id: data.userId,
        actor_type: 'user',
        action: data.action, // 'login' or 'logout'
        description: `User ${data.action}`,
        metadata: {
           device: data.device || 'Unknown',
           success: data.success,
           browser: data.browser,
           ip: data.ip,
           location: data.location,
           userAgent: data.userAgent || data.device
        },
        resource: 'session',
        resource_type: 'session',
        created_at: Date.now()
      }).select().single();
      
      if (error) {
        console.error('[API] loginHistory.log error:', error);
        return { success: false, error };
      }
      return { success: true, data: res };
    },
    deleteById: async (id: string) => {
      const { error } = await supabase.from('activity_logs').delete().eq('id', id);
      return { success: !error, error };
    },
    deleteAll: async () => {
      const { error } = await supabase.from('activity_logs').delete().in('action', ['login', 'logout']);
      return { success: !error, error };
    },
  },

  // Preferences
  preferences: {
    get: (userId: string) => fetch(`${serverUrl}/users/${userId}/preferences`, { headers }).then(r => r.json()).catch(() => ({})),
    update: (userId: string, updates: any) => fetch(`${serverUrl}/users/${userId}/preferences`, {
      method: 'POST',
      headers,
      body: JSON.stringify(updates)
    }).then(r => r.json()),
    updateNotifications: (userId: string, prefs: any) => fetch(`${serverUrl}/users/${userId}/preferences/notifications`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(prefs)
    }).then(r => r.json()),
  },

  // Wallet/Investments
  investmentWallets: {
    get: (userId: string) => fetch(`${serverUrl}/investment-wallets/${userId}`, { headers }).then(r => r.json()),
    update: async (userId: string, updates: any) => {
      const { data, error } = await supabase.from('investment_wallets').update(updates).eq('user_id', userId).select().maybeSingle();
      return error ? null : data;
    },
    insert: async (data: any) => {
      const { data: res, error } = await supabase.from('investment_wallets').insert(data).select().maybeSingle();
      return error ? null : res;
    },
    getByUserId: async (userId: string) => {
      const { data, error } = await supabase.from('investment_wallets').select('*').eq('user_id', userId).maybeSingle();
      return error ? null : data;
    },
    getAll: async () => {
      const { data, error } = await supabase.from('investment_wallets').select('*');
      return error ? [] : data;
    },
  },

  // Withdrawal Methods
  withdrawalMethods: {
    getByUserId: (userId: string) => fetch(`${serverUrl}/withdrawal-methods/${userId}`, { headers }).then(r => r.json()),
    create: (data: any) => fetch(`${serverUrl}/withdrawal-methods`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    }).then(r => r.json()),
    setDefault: (userId: string, methodId: string) => fetch(`${serverUrl}/withdrawal-methods/${methodId}/default`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ userId })
    }).then(r => r.json()),
    delete: (id: string) => fetch(`${serverUrl}/withdrawal-methods/${id}`, { method: 'DELETE', headers }).then(r => r.json()),
  },

  // SMTP Config
  smtpConfig: {
    get: async () => {
      const { data, error } = await supabase
        .from('smtp_config')
        .select('*')
        .eq('id', 'global_smtp')
        .maybeSingle();
      if (error) {
        console.error('Error fetching SMTP config:', error);
        return {};
      }
      return data || {};
    },
    update: async (config: any) => {
      const payload = {
        id: 'global_smtp',
        ...config,
        updated_at: Date.now()
      };
      const { data, error } = await supabase
        .from('smtp_config')
        .upsert(payload)
        .select()
        .single();
      if (error) {
        console.error('Error updating SMTP config:', error);
        throw error;
      }
      return data;
    },
  },

  // Positions
  positions: {
    getByUserId: async (userId: string) => {
      const { data, error } = await supabase.from('positions').select('*').eq('user_id', userId).eq('status', 'open').order('created_at', { ascending: false });
      return error ? [] : data;
    },
    getAll: async () => {
      const { data, error } = await supabase.from('positions').select('*').order('created_at', { ascending: false });
      return error ? [] : data;
    },
    create: async (data: any) => {
      const { data: res, error } = await supabase.from('positions').insert(data).select().single();
      if (error) {
        console.error('❌ Database Error (createPosition):', error);
        throw error;
      }
      return res;
    },
    close: async (id: string, exitPrice: number) => {
      // 1. Fetch current position to calculate profit
      const { data: pos, error: fetchErr } = await supabase.from('positions').select('*').eq('id', id).single();
      if (fetchErr) throw fetchErr;

      // 2. Calculate profit
      const posSide = pos.side || (pos.type === 'buy' || pos.type === 'sell' ? pos.type : 'buy');
      const priceDiff = posSide === 'buy' ? exitPrice - pos.entry_price : pos.entry_price - exitPrice;
      const profit = priceDiff * pos.units;
      const now = Date.now();

      // 3. Update position
      const { data, error } = await supabase.from('positions')
        .update({ 
          status: 'closed', 
          exit_price: exitPrice, 
          profit: profit,
          closed_at: now,
          updated_at: now
        })
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
    update: async (id: string, updates: any) => {
      const { data, error } = await supabase.from('positions').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
  },

  // Pending Orders
  pendingOrders: {
    getByUserId: async (userId: string) => {
      const { data, error } = await supabase.from('pending_orders').select('*').eq('user_id', userId).order('created_at', { ascending: false });
      // Handle "does not exist" or permissions
      if (error) return [];
      return data;
    },
    getAll: async () => {
      const { data, error } = await supabase.from('pending_orders').select('*');
      if (error) return [];
      return data;
    },
    create: async (data: any) => {
      const { data: res, error } = await supabase.from('pending_orders').insert(data).select().single();
      if (error) throw error;
      return res;
    },
    update: async (id: string, updates: any) => {
      const { data, error } = await supabase.from('pending_orders').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    delete: async (id: string) => {
      const { error } = await supabase.from('pending_orders').delete().eq('id', id);
      if (error) throw error;
      return true;
    },
  },

  // Trade History
  tradeHistory: {
    getByUserId: async (userId: string) => {
      const { data, error } = await supabase.from('trade_history').select('*').eq('user_id', userId).order('created_at', { ascending: false });
      if (error) return [];
      return data;
    },
    getAll: async () => {
      const { data, error } = await supabase.from('trade_history').select('*').order('created_at', { ascending: false });
      if (error) return [];
      return data;
    },
    create: async (data: any) => {
      const { data: res, error } = await supabase.from('trade_history').insert(data).select().single();
      if (error) throw error;
      return res;
    },
  },

  // Transactions
  transactions: {
    getByUserId: async (userId: string) => {
      const { data, error } = await supabase.from('transactions').select('*').eq('user_id', userId).order('created_at', { ascending: false });
      return error ? [] : data;
    },
    getAll: async () => {
      const { data, error } = await supabase.from('transactions').select('*').order('created_at', { ascending: false });
      return error ? [] : data;
    },
    create: async (data: any) => {
      const { data: res, error } = await supabase.from('transactions').insert(data).select().single();
      if (error) throw error;
      return res;
    },
    update: async (id: string, updates: any) => {
      const { data: res, error } = await supabase.from('transactions').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return res;
    },
    delete: async (id: string) => {
      const { error } = await supabase.from('transactions').delete().eq('id', id);
      if (error) throw error;
      return true;
    }
  },

  // Deposits
  deposits: {
    getByUserId: async (userId: string) => {
      const { data, error } = await supabase.from('deposits').select('*').eq('user_id', userId).order('created_at', { ascending: false });
      return error ? [] : data;
    },
    getAll: async () => {
      const { data, error } = await supabase.from('deposits').select('*').order('created_at', { ascending: false });
      return error ? [] : data;
    },
    create: async (data: any) => {
      const { data: res, error } = await supabase.from('deposits').insert(data).select().single();
      if (error) throw error;
      return res;
    },
    update: async (id: string, updates: any) => {
      const { data, error } = await supabase.from('deposits').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
  },

  // Withdrawals
  withdrawals: {
    getByUserId: async (userId: string) => {
      const { data, error } = await supabase.from('withdrawals').select('*').eq('user_id', userId).order('created_at', { ascending: false });
      return error ? [] : data;
    },
    getAll: async () => {
      const { data, error } = await supabase.from('withdrawals').select('*').order('created_at', { ascending: false });
      return error ? [] : data;
    },
    create: async (data: any) => {
      const { data: res, error } = await supabase.from('withdrawals').insert(data).select().single();
      if (error) throw error;
      return res;
    },
    update: async (id: string, updates: any) => {
      const { data, error } = await supabase.from('withdrawals').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
  },

  // Withdrawal Methods
  withdrawalMethods: {
    getByUserId: async (userId: string) => {
      const { data, error } = await supabase.from('withdrawal_methods').select('*').eq('user_id', userId);
      return error ? [] : data;
    },
    getAll: async () => {
      const { data, error } = await supabase.from('withdrawal_methods').select('*').order('created_at', { ascending: false });
      return error ? [] : data;
    },
    create: async (data: any) => {
      const payload = {
        id: crypto.randomUUID(),
        created_at: Date.now(),
        updated_at: new Date().toISOString(),
        ...data
      };
      const { data: res, error } = await supabase.from('withdrawal_methods').insert(payload).select().single();
      if (error) throw error;
      return res;
    },
    setDefault: async (userId: string, methodId: string) => {
      await supabase.from('withdrawal_methods').update({ is_default: false }).eq('user_id', userId);
      const { data, error } = await supabase.from('withdrawal_methods').update({ is_default: true }).eq('id', methodId).select().single();
      if (error) throw error;
      return data;
    },
    update: async (id: string, updates: any) => {
      const { data, error } = await supabase.from('withdrawal_methods').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    delete: async (id: string) => {
      const { error } = await supabase.from('withdrawal_methods').delete().eq('id', id);
      if (error) throw error;
      return true;
    },
  },

  // Payment Methods
  paymentMethods: {
    getAll: async () => {
      const { data, error } = await supabase.from('payment_methods').select('*').order('created_at', { ascending: false });
      return error ? [] : data;
    },
    getById: async (id: string) => {
      const { data, error } = await supabase.from('payment_methods').select('*').eq('id', id).maybeSingle();
      return error ? null : data;
    },
    create: async (data: any) => {
      const payload = {
        id: crypto.randomUUID(),
        created_at: Date.now(),
        updated_at: new Date().toISOString(),
        ...data
      };
      const { data: res, error } = await supabase.from('payment_methods').insert(payload).select().single();
      if (error) throw error;
      return res;
    },
    update: async (id: string, updates: any) => {
      const { data, error } = await supabase.from('payment_methods').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    delete: async (id: string) => {
      const { error } = await supabase.from('payment_methods').delete().eq('id', id);
      if (error) throw error;
      return true;
    },
  },

  // Investment Offers
  investmentOffers: {
    getAll: async () => {
      const { data, error } = await supabase.from('investment_offers').select('*').order('created_at', { ascending: false });
      return error ? [] : data;
    },
    create: async (data: any) => {
      const { data: res, error } = await supabase.from('investment_offers').insert(data).select().single();
      if (error) throw error;
      return res;
    },
    update: async (id: string, updates: any) => {
      const { data: res, error } = await supabase.from('investment_offers').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return res;
    },
    delete: async (id: string) => {
      const { error } = await supabase.from('investment_offers').delete().eq('id', id);
      if (error) throw error;
      return true;
    }
  },

  // User Investments
  investments: {
    getByUserId: async (userId: string) => {
      const { data, error } = await supabase.from('user_investments').select('*').eq('user_id', userId).order('created_at', { ascending: false });
      return error ? [] : data;
    },
    getAll: async () => {
      const { data, error } = await supabase.from('user_investments').select('*').order('created_at', { ascending: false });
      return error ? [] : data;
    },
    create: async (data: any) => {
      const { data: res, error } = await supabase.from('user_investments').insert(data).select().single();
      if (error) throw error;
      return res;
    },
    update: async (id: string, updates: any) => {
      const { data: res, error } = await supabase.from('user_investments').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return res;
    },
    delete: async (id: string) => {
      const { error } = await supabase.from('user_investments').delete().eq('id', id);
      if (error) throw error;
      return true;
    }
  },

  // Sell Requests
  sellRequests: {
    getByUserId: async (userId: string) => {
      const { data, error } = await supabase.from('sell_requests').select('*').eq('user_id', userId).order('created_at', { ascending: false });
      return error ? [] : data;
    },
    getAll: async () => {
      const { data, error } = await supabase.from('sell_requests').select('*').order('created_at', { ascending: false });
      return error ? [] : data;
    },
    create: async (data: any) => {
      const { data: res, error } = await supabase.from('sell_requests').insert(data).select().single();
      if (error) throw error;
      return res;
    },
    update: async (id: string, updates: any) => {
      const { data: res, error } = await supabase.from('sell_requests').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return res;
    },
  },

  // Auto Trader
  autoTrader: {
    getByUserId: (userId: string) => fetch(`${serverUrl}/auto-trader/user/${userId}`, { headers }).then(r => r.json()),
    getAll: () => fetch(`${serverUrl}/auto-trader`, { headers }).then(r => r.json()),
    create: (data: any) => fetch(`${serverUrl}/auto-trader`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: string, updates: any) => fetch(`${serverUrl}/auto-trader/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updates)
    }).then(r => r.json()),
    delete: (id: string) => fetch(`${serverUrl}/auto-trader/${id}`, { method: 'DELETE', headers }).then(r => r.json())
  },

  // Tickets — direct Supabase calls (bypasses broken server routes)
  tickets: {
    getByUserId: async (userId: string) => {
      const { data, error } = await supabase.from('support_tickets').select('*').eq('user_id', userId).order('created_at', { ascending: false });
      if (error) { console.error('[API] tickets.getByUserId error:', error); return []; }
      return data;
    },
    getAll: async () => {
      const { data, error } = await supabase.from('support_tickets').select('*').order('created_at', { ascending: false });
      if (error) { console.error('[API] tickets.getAll error:', error); return []; }
      return data;
    },
    getMessages: async (ticketId: string) => {
      const { data, error } = await supabase.from('ticket_messages').select('*').eq('ticket_id', ticketId).order('created_at', { ascending: true });
      if (error) { console.error('[API] tickets.getMessages error:', error); return []; }
      return data;
    },
    create: async (data: any) => {
      const now = Date.now();
      // Extract initial_message before inserting ticket
      const { initial_message, ...ticketFields } = data;
      const ticketPayload = {
        id: crypto.randomUUID(),
        ...ticketFields,
        status: ticketFields.status || 'open',
        created_at: now,
        updated_at: now,
      };
      const { data: ticket, error } = await supabase.from('support_tickets').insert(ticketPayload).select().single();
      if (error) {
        console.error('[API] tickets.create error:', error);
        throw error;
      }
      // Also create the initial message if provided
      if (initial_message && ticket) {
        const msgPayload = {
          id: crypto.randomUUID(),
          ticket_id: ticket.id,
          sender_type: 'user',
          sender_id: ticketFields.user_id,
          sender_name: ticketFields.user_name || 'User',
          message: initial_message,
          created_at: now,
        };
        await supabase.from('ticket_messages').insert(msgPayload);
      }
      return ticket;
    },
    addMessage: async (ticketId: string, data: any) => {
      const now = Date.now();
      const msgPayload = {
        id: crypto.randomUUID(),
        ticket_id: ticketId,
        sender_type: data.sender_role || data.sender_type || 'user',
        sender_id: data.sender_id,
        sender_name: data.sender_name || 'Unknown',
        message: data.message,
        created_at: now,
      };
      const { data: msg, error } = await supabase.from('ticket_messages').insert(msgPayload).select().single();
      if (error) {
        console.error('[API] tickets.addMessage error:', error);
        throw error;
      }
      // Update ticket updated_at timestamp
      await supabase.from('support_tickets').update({ updated_at: now }).eq('id', ticketId);
      return msg;
    },
    updateMessage: async (messageId: string, updates: any) => {
      const { data, error } = await supabase.from('ticket_messages').update(updates).eq('id', messageId).select().single();
      if (error) {
        console.error('[API] tickets.updateMessage error:', error);
        throw error;
      }
      return data;
    },
    updateStatus: async (ticketId: string, status: string) => {
      const now = Date.now();
      const updates: any = { status, updated_at: now };
      if (status === 'resolved') {
        updates.resolved_at = now;
      }
      const { data, error } = await supabase.from('support_tickets').update(updates).eq('id', ticketId).select().single();
      if (error) {
        console.error('[API] tickets.updateStatus error:', error);
        throw error;
      }
      return data;
    },
    updatePriority: async (ticketId: string, priority: string) => {
      const { data, error } = await supabase.from('support_tickets').update({ priority, updated_at: Date.now() }).eq('id', ticketId).select().single();
      if (error) {
        console.error('[API] tickets.updatePriority error:', error);
        throw error;
      }
      return data;
    },
    assign: async (ticketId: string, adminId: string) => {
      const { data, error } = await supabase.from('support_tickets').update({ assigned_to: adminId, assigned_at: Date.now(), updated_at: Date.now() }).eq('id', ticketId).select().single();
      if (error) {
        console.error('[API] tickets.assign error:', error);
        throw error;
      }
      return data;
    },
    delete: async (ticketId: string) => {
      // Messages cascade-delete via FK
      const { error } = await supabase.from('support_tickets').delete().eq('id', ticketId);
      if (error) {
        console.error('[API] tickets.delete error:', error);
        throw error;
      }
      return true;
    },
  },

  // KYC
  kyc: {
    getByUserId: (userId: string) => fetch(`${serverUrl}/kyc/user/${userId}`, { headers }).then(r => r.json()),
    getAll: () => fetch(`${serverUrl}/kyc`, { headers }).then(r => r.json()),
    create: (data: any) => fetch(`${serverUrl}/kyc`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    }).then(r => r.json()),
    updateStatus: (userId: string, status: string, notes?: string) => fetch(`${serverUrl}/kyc/user/${userId}/status`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ status, notes })
    }).then(r => r.json()),
  },

  // Notifications
  notifications: {
    getByUserId: async (userId: string) => {
      const { data, error } = await supabase
        .from('system_memos')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      return error ? [] : data;
    },
    getAll: async () => {
      const { data, error } = await supabase
        .from('system_memos')
        .select('*')
        .order('created_at', { ascending: false });
      return error ? [] : data;
    },
    create: async (data: any) => {
      const payload = {
        created_at: data.created_at || Date.now(),
        updated_at: Date.now(),
        ...data
      };
      // Remove id from payload if it exists but is empty/invalid to let DB handle it
      if (!payload.id) delete payload.id;
      
      const { data: res, error } = await supabase.from('system_memos').insert(payload).select().single();
      if (error) {
        console.error('[API] Error creating notification:', error);
        throw error;
      }
      return res;
    },
    update: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from('system_memos')
        .update({ ...updates, updated_at: Date.now() })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    markAsRead: async (id: string) => {
      const { data, error } = await supabase
        .from('system_memos')
        .update({ is_read: true, read_at: Date.now(), updated_at: Date.now() })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    delete: async (id: string) => {
      const { error } = await supabase.from('system_memos').delete().eq('id', id);
      if (error) throw error;
      return true;
    },
    deleteAllByUserId: async (userId: string) => {
      const { error } = await supabase.from('system_memos').delete().eq('user_id', userId);
      if (error) throw error;
      return true;
    },
    deleteAll: async () => {
      const { error } = await supabase.from('system_memos').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      if (error) throw error;
      return true;
    },
  },

  // CRM Messaging
  crm: {
    getAll: async () => {
      const { data, error } = await supabase.from('crm_messages').select('*').order('created_at', { ascending: false });
      return error ? [] : data;
    },
    getById: async (id: string) => {
      const { data, error } = await supabase.from('crm_messages').select('*').eq('id', id).single();
      if (error) throw error;
      return data;
    },
    create: async (payload: any) => {
      const { data, error } = await supabase.from('crm_messages').insert({
        ...payload,
        created_at: Date.now()
      }).select().single();
      if (error) throw error;
      return data;
    },
    update: async (id: string, updates: any) => {
      const { data, error } = await supabase.from('crm_messages').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    delete: async (id: string) => {
      const { error } = await supabase.from('crm_messages').delete().eq('id', id);
      if (error) throw error;
      return true;
    },
  },

  // Email Templates
  emailTemplates: {
    getAll: async () => {
      const { data, error } = await supabase.from('email_templates').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error("Supabase Error fetch email_templates:", error);
        return [];
      }
      return data;
    },
    getById: async (id: string) => {
      const { data, error } = await supabase.from('email_templates').select('*').eq('id', id).single();
      if (error) throw error;
      return data;
    },
    create: async (data: any) => {
      const dbData: any = {
        name: data.name,
        category: data.category,
        subject: data.subject,
        logo_url: data.logoUrl,
        hero_image: data.heroImage,
        hero_title: data.heroTitle,
        blocks: data.blocks,
        footer_text: data.footerText || data.footer,
        accent_color: data.accentColor,
        updated_at: new Date().toISOString(),
        created_at: Date.now()
      };
      // Only attach id if it is a valid UUID, else let Supabase generate it
      if (data.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.id)) {
        dbData.id = data.id;
      }
      
      const { data: res, error } = await supabase.from('email_templates').insert(dbData).select().single();
      if (error) throw error;
      return res;
    },
    update: async (id: string, updates: any) => {
      const dbUpdates: any = { updated_at: new Date().toISOString() };
      if (updates.name !== undefined) dbUpdates.name = updates.name;
      if (updates.category !== undefined) dbUpdates.category = updates.category;
      if (updates.subject !== undefined) dbUpdates.subject = updates.subject;
      if (updates.logoUrl !== undefined) dbUpdates.logo_url = updates.logoUrl;
      if (updates.heroImage !== undefined) dbUpdates.hero_image = updates.heroImage;
      if (updates.heroTitle !== undefined) dbUpdates.hero_title = updates.heroTitle;
      if (updates.blocks !== undefined) dbUpdates.blocks = updates.blocks;
      if (updates.footerText !== undefined || updates.footer !== undefined) dbUpdates.footer_text = updates.footerText || updates.footer;
      if (updates.accentColor !== undefined) dbUpdates.accent_color = updates.accentColor;

      const { data, error } = await supabase.from('email_templates').update(dbUpdates).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    delete: async (id: string) => {
      const { data, error } = await supabase.from('email_templates').delete().eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
  },

  // Password Resets
  passwordResets: {
    getAll: async () => {
      const { data, error } = await supabase.from('password_resets').select('*').order('created_at', { ascending: false });
      return error ? [] : data;
    },
    getByEmail: async (email: string) => {
      const { data, error } = await supabase.from('password_resets').select('*').eq('email', email).order('created_at', { ascending: false });
      return error ? [] : data;
    },
    create: async (email: string) => {
      const { data, error } = await supabase.from('password_resets').insert({ email, status: 'pending', created_at: Date.now(), updated_at: Date.now() }).select().single();
      if (error) throw error;
      return data;
    },
    update: async (id: string, updates: any) => {
      const { data, error } = await supabase.from('password_resets').update({ ...updates, updated_at: Date.now() }).eq('id', id).select().single();
      if (error) throw error;
      return data;
    }
  },

  // User Plans (Subscribers)
  subscribers: {
    getByUserId: async (userId: string) => {
      const { data, error } = await supabase.from('member_packages').select('*').eq('user_id', userId).order('created_at', { ascending: false });
      return error ? [] : data;
    },
    getAll: async () => {
      const { data, error } = await supabase.from('member_packages').select('*').order('created_at', { ascending: false });
      return error ? [] : data;
    },
    create: async (data: any) => {
      const { data: res, error } = await supabase.from('member_packages').insert(data).select().single();
      if (error) throw error;
      return res;
    },
    update: async (id: string, updates: any) => {
      const { data, error } = await supabase.from('member_packages').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    delete: async (id: string) => {
      const { error } = await supabase.from('member_packages').delete().eq('id', id);
      if (error) throw error;
      return true;
    }
  }
};

