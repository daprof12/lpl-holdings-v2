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
    getByUserId: (userId: string) => fetch(`${serverUrl}/sessions/${userId}`, { headers }).then(r => r.json()),
    create: (data: any) => fetch(`${serverUrl}/sessions`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    }).then(r => r.json()),
    revoke: (id: string) => fetch(`${serverUrl}/sessions/${id}`, { method: 'DELETE', headers }).then(r => r.json()),
    revokeAll: (userId: string, exemptId: string) => fetch(`${serverUrl}/sessions/user/${userId}/all-except/${exemptId}`, {
      method: 'DELETE',
      headers
    }).then(r => r.json()),
  },

  loginHistory: {
    getByUserId: (userId: string, limit = 20) => fetch(`${serverUrl}/login-history/${userId}?limit=${limit}`, { headers }).then(r => r.json()),
    log: (data: any) => fetch(`${serverUrl}/login-history`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    }).then(r => r.json()),
  },

  // Preferences
  preferences: {
    get: (userId: string) => fetch(`${serverUrl}/users/${userId}/preferences`, { headers }).then(r => r.json()),
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
    get: () => fetch(`${serverUrl}/smtp-config`, { headers }).then(r => r.json()),
    update: (config: any) => fetch(`${serverUrl}/smtp-config`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(config)
    }).then(r => r.json()),
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
        if (error) throw error;
        return res;
    },
    close: async (id: string, exitPrice: number) => {
        const { data, error } = await supabase.from('positions').update({ status: 'closed', exit_price: exitPrice }).eq('id', id).select().single();
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
        const items = JSON.parse(localStorage.getItem('gross_deposits') || '[]');
        return items.filter((i: any) => i.userId === userId || i.user_id === userId);
    },
    getAll: async () => JSON.parse(localStorage.getItem('gross_deposits') || '[]'),
    create: async (data: any) => {
        const items = JSON.parse(localStorage.getItem('gross_deposits') || '[]');
        const newItem = { id: `dep_${Date.now()}`, ...data, created_at: new Date().toISOString() };
        items.push(newItem);
        localStorage.setItem('gross_deposits', JSON.stringify(items));
        return newItem;
    },
    update: async (id: string, updates: any) => {
        const items = JSON.parse(localStorage.getItem('gross_deposits') || '[]');
        const index = items.findIndex((i: any) => i.id === id);
        if (index > -1) {
            items[index] = { ...items[index], ...updates, updated_at: new Date().toISOString() };
            localStorage.setItem('gross_deposits', JSON.stringify(items));
            return items[index];
        }
        throw new Error('Not found');
    },
  },

  // Withdrawals
  withdrawals: {
    getByUserId: async (userId: string) => {
        const items = JSON.parse(localStorage.getItem('gross_withdrawals') || '[]');
        return items.filter((i: any) => i.userId === userId || i.user_id === userId);
    },
    getAll: async () => JSON.parse(localStorage.getItem('gross_withdrawals') || '[]'),
    create: async (data: any) => {
        const items = JSON.parse(localStorage.getItem('gross_withdrawals') || '[]');
        const newItem = { id: `wd_${Date.now()}`, ...data, created_at: new Date().toISOString() };
        items.push(newItem);
        localStorage.setItem('gross_withdrawals', JSON.stringify(items));
        return newItem;
    },
    update: async (id: string, updates: any) => {
        const items = JSON.parse(localStorage.getItem('gross_withdrawals') || '[]');
        const index = items.findIndex((i: any) => i.id === id);
        if (index > -1) {
            items[index] = { ...items[index], ...updates, updated_at: new Date().toISOString() };
            localStorage.setItem('gross_withdrawals', JSON.stringify(items));
            return items[index];
        }
        throw new Error('Not found');
    },
  },

  // Withdrawal Methods
  withdrawalMethods: {
    getByUserId: async (userId: string) => {
        const items = JSON.parse(localStorage.getItem('gross_withdrawal_methods') || '[]');
        return items.filter((i: any) => i.userId === userId || i.user_id === userId);
    },
    getAll: async () => JSON.parse(localStorage.getItem('gross_withdrawal_methods') || '[]'),
    create: async (data: any) => {
        const items = JSON.parse(localStorage.getItem('gross_withdrawal_methods') || '[]');
        const newItem = { id: `wm_${Date.now()}`, ...data, created_at: new Date().toISOString() };
        items.push(newItem);
        localStorage.setItem('gross_withdrawal_methods', JSON.stringify(items));
        return newItem;
    },
    setDefault: async (userId: string, methodId: string) => {
        const items = JSON.parse(localStorage.getItem('gross_withdrawal_methods') || '[]');
        const updated = items.map((i: any) => ({
            ...i,
            isDefault: (i.userId === userId || i.user_id === userId) ? (i.id === methodId) : i.isDefault
        }));
        localStorage.setItem('gross_withdrawal_methods', JSON.stringify(updated));
        return updated.find((i: any) => i.id === methodId);
    },
    update: async (id: string, updates: any) => {
        const items = JSON.parse(localStorage.getItem('gross_withdrawal_methods') || '[]');
        const index = items.findIndex((i: any) => i.id === id);
        if (index > -1) {
            items[index] = { ...items[index], ...updates, updated_at: new Date().toISOString() };
            localStorage.setItem('gross_withdrawal_methods', JSON.stringify(items));
            return items[index];
        }
        throw new Error('Not found');
    },
    delete: async (id: string) => {
        let items = JSON.parse(localStorage.getItem('gross_withdrawal_methods') || '[]');
        items = items.filter((i: any) => i.id !== id);
        localStorage.setItem('gross_withdrawal_methods', JSON.stringify(items));
        return true;
    },
  },

  // Payment Methods
  paymentMethods: {
    getAll: async () => JSON.parse(localStorage.getItem('gross_payment_methods') || '[]'),
    getById: async (id: string) => {
        const items = JSON.parse(localStorage.getItem('gross_payment_methods') || '[]');
        return items.find((i: any) => i.id === id);
    },
    create: async (data: any) => {
        const items = JSON.parse(localStorage.getItem('gross_payment_methods') || '[]');
        const newItem = { id: `pm_${Date.now()}`, ...data, created_at: new Date().toISOString() };
        items.push(newItem);
        localStorage.setItem('gross_payment_methods', JSON.stringify(items));
        return newItem;
    },
    update: async (id: string, updates: any) => {
        const items = JSON.parse(localStorage.getItem('gross_payment_methods') || '[]');
        const index = items.findIndex((i: any) => i.id === id);
        if (index > -1) {
            items[index] = { ...items[index], ...updates, updated_at: new Date().toISOString() };
            localStorage.setItem('gross_payment_methods', JSON.stringify(items));
            return items[index];
        }
        throw new Error('Not found');
    },
    delete: async (id: string) => {
        let items = JSON.parse(localStorage.getItem('gross_payment_methods') || '[]');
        items = items.filter((i: any) => i.id !== id);
        localStorage.setItem('gross_payment_methods', JSON.stringify(items));
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

  // Tickets
  tickets: {
    getByUserId: (userId: string) => fetch(`${serverUrl}/tickets/user/${userId}`, { headers }).then(r => r.json()),
    getMessages: (ticketId: string) => fetch(`${serverUrl}/tickets/${ticketId}/messages`, { headers }).then(r => r.json()),
    getAll: () => fetch(`${serverUrl}/tickets`, { headers }).then(r => r.json()),
    create: (data: any) => fetch(`${serverUrl}/tickets`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    }).then(r => r.json()),
    addMessage: (ticketId: string, data: any) => fetch(`${serverUrl}/tickets/${ticketId}/messages`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    }).then(r => r.json()),
    updateStatus: (ticketId: string, status: string) => fetch(`${serverUrl}/tickets/${ticketId}/status`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ status })
    }).then(r => r.json()),
    updatePriority: (ticketId: string, priority: string) => fetch(`${serverUrl}/tickets/${ticketId}/priority`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ priority })
    }).then(r => r.json()),
    assign: (ticketId: string, adminId: string) => fetch(`${serverUrl}/tickets/${ticketId}/assign`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ assigned_to: adminId })
    }).then(r => r.json()),
    delete: (ticketId: string) => fetch(`${serverUrl}/tickets/${ticketId}`, { method: 'DELETE', headers }).then(r => r.json())
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
    getByUserId: (userId: string) => fetch(`${serverUrl}/notifications/user/${userId}`, { headers }).then(r => r.json()),
    getAll: () => fetch(`${serverUrl}/notifications`, { headers }).then(r => r.json()),
    create: (data: any) => fetch(`${serverUrl}/notifications`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: string, updates: any) => fetch(`${serverUrl}/notifications/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updates)
    }).then(r => r.json()),
    delete: (id: string) => fetch(`${serverUrl}/notifications/${id}`, { method: 'DELETE', headers }).then(r => r.json()),
    deleteAllByUserId: (userId: string) => fetch(`${serverUrl}/notifications/user/${userId}`, { method: 'DELETE', headers }).then(r => r.json()),
    deleteAll: () => fetch(`${serverUrl}/notifications/all`, { method: 'DELETE', headers }).then(r => r.json()),
  },

  // CRM Messaging
  crm: {
    getAll: () => fetch(`${serverUrl}/crm-messages`, { headers }).then(r => r.json()),
    getById: (id: string) => fetch(`${serverUrl}/crm-messages/${id}`, { headers }).then(r => r.json()),
    create: (data: any) => fetch(`${serverUrl}/crm-messages`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: string, updates: any) => fetch(`${serverUrl}/crm-messages/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updates)
    }).then(r => r.json()),
    delete: (id: string) => fetch(`${serverUrl}/crm-messages/${id}`, { method: 'DELETE', headers }).then(r => r.json()),
  },

  // Email Templates
  emailTemplates: {
    getAll: () => fetch(`${serverUrl}/email-templates`, { headers }).then(r => r.json()),
    getById: (id: string) => fetch(`${serverUrl}/email-templates/${id}`, { headers }).then(r => r.json()),
    create: (data: any) => fetch(`${serverUrl}/email-templates`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: string, updates: any) => fetch(`${serverUrl}/email-templates/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updates)
    }).then(r => r.json()),
    delete: (id: string) => fetch(`${serverUrl}/email-templates/${id}`, { method: 'DELETE', headers }).then(r => r.json()),
  }
};
