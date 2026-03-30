-- ============================================
-- METATRADE PRO DATABASE SCHEMA
-- ============================================
-- This creates all tables for the forex trading platform
-- Run this in Supabase SQL Editor to create the database structure

-- ============================================
-- 1. USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  date_of_birth BIGINT,
  
  -- Account Status
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'closed', 'pending')),
  email_verified BOOLEAN DEFAULT false,
  phone_verified BOOLEAN DEFAULT false,
  two_factor_enabled BOOLEAN DEFAULT false,
  
  -- KYC
  kyc_status TEXT NOT NULL DEFAULT 'not_started' CHECK (kyc_status IN ('not_started', 'pending', 'approved', 'rejected')),
  kyc_submitted_at BIGINT,
  kyc_reviewed_at BIGINT,
  kyc_reviewed_by TEXT,
  
  -- Account Type
  account_type TEXT NOT NULL DEFAULT 'demo' CHECK (account_type IN ('demo', 'live')),
  
  -- Preferences
  language TEXT DEFAULT 'en',
  theme TEXT DEFAULT 'light' CHECK (theme IN ('light', 'dark')),
  timezone TEXT DEFAULT 'UTC',
  
  -- Trading Account
  balance DECIMAL(20, 2) DEFAULT 0,
  equity DECIMAL(20, 2) DEFAULT 0,
  margin DECIMAL(20, 2) DEFAULT 0,
  free_margin DECIMAL(20, 2) DEFAULT 0,
  margin_level DECIMAL(10, 2) DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  
  -- Subscription
  subscription_plan TEXT DEFAULT 'free' CHECK (subscription_plan IN ('free', 'basic', 'pro', 'premium', 'vip')),
  subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active', 'cancelled', 'expired', 'suspended')),
  subscription_started_at BIGINT,
  subscription_expires_at BIGINT,
  
  -- Metadata
  last_login_at BIGINT,
  last_login_ip TEXT,
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

-- Indexes for users table
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_users_kyc_status ON users(kyc_status);
CREATE INDEX IF NOT EXISTS idx_users_subscription_plan ON users(subscription_plan);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at DESC);

-- ============================================
-- 2. KYC DOCUMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS kyc_documents (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Document Types
  document_type TEXT NOT NULL CHECK (document_type IN ('passport', 'drivers_license', 'national_id', 'proof_of_address')),
  document_number TEXT,
  
  -- Files
  front_image_url TEXT,
  back_image_url TEXT,
  selfie_url TEXT,
  
  -- Verification
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  rejection_reason TEXT,
  verified_at BIGINT,
  verified_by TEXT,
  
  -- Metadata
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_kyc_user_id ON kyc_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_kyc_status ON kyc_documents(status);

-- ============================================
-- 3. DEPOSITS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS deposits (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Amount
  amount DECIMAL(20, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  fee DECIMAL(20, 2) DEFAULT 0,
  net_amount DECIMAL(20, 2) NOT NULL,
  
  -- Payment Method
  payment_method TEXT NOT NULL CHECK (payment_method IN ('bank_transfer', 'credit_card', 'crypto', 'e_wallet')),
  payment_provider TEXT,
  
  -- Bank Transfer Details
  bank_name TEXT,
  bank_account_number TEXT,
  bank_swift_code TEXT,
  bank_reference_number TEXT,
  
  -- Crypto Details
  crypto_currency TEXT,
  crypto_address TEXT,
  crypto_tx_hash TEXT,
  crypto_network TEXT,
  crypto_confirmations INTEGER DEFAULT 0,
  
  -- Card Details (last 4 digits only)
  card_last_four TEXT,
  card_type TEXT,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
  
  -- Processing
  processed_at BIGINT,
  completed_at BIGINT,
  reviewed_by TEXT,
  rejection_reason TEXT,
  
  -- Metadata
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_deposits_user_id ON deposits(user_id);
CREATE INDEX IF NOT EXISTS idx_deposits_status ON deposits(status);
CREATE INDEX IF NOT EXISTS idx_deposits_created_at ON deposits(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_deposits_payment_method ON deposits(payment_method);

-- ============================================
-- 4. WITHDRAWALS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS withdrawals (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Amount
  amount DECIMAL(20, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  fee DECIMAL(20, 2) DEFAULT 0,
  net_amount DECIMAL(20, 2) NOT NULL,
  
  -- Payment Method
  payment_method TEXT NOT NULL CHECK (payment_method IN ('bank_transfer', 'crypto', 'e_wallet')),
  
  -- Bank Transfer Details
  bank_name TEXT,
  bank_account_number TEXT,
  bank_swift_code TEXT,
  bank_account_holder_name TEXT,
  
  -- Crypto Details
  crypto_currency TEXT,
  crypto_address TEXT,
  crypto_tx_hash TEXT,
  crypto_network TEXT,
  
  -- Verification
  requires_kyc BOOLEAN DEFAULT false,
  kyc_verified BOOLEAN DEFAULT false,
  two_factor_verified BOOLEAN DEFAULT false,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'rejected', 'cancelled')),
  
  -- Processing
  processed_at BIGINT,
  completed_at BIGINT,
  reviewed_by TEXT,
  rejection_reason TEXT,
  
  -- Metadata
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_withdrawals_user_id ON withdrawals(user_id);
CREATE INDEX IF NOT EXISTS idx_withdrawals_status ON withdrawals(status);
CREATE INDEX IF NOT EXISTS idx_withdrawals_created_at ON withdrawals(created_at DESC);

-- ============================================
-- 5. POSITIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS positions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Symbol
  symbol TEXT NOT NULL,
  asset_name TEXT NOT NULL,
  asset_category TEXT NOT NULL CHECK (asset_category IN ('Forex', 'Crypto', 'Stocks', 'Commodities', 'Indices', 'ETFs')),
  
  -- Position Details
  type TEXT NOT NULL CHECK (type IN ('buy', 'sell')),
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed', 'pending')),
  
  -- Prices
  entry_price DECIMAL(20, 8) NOT NULL,
  current_price DECIMAL(20, 8) NOT NULL,
  exit_price DECIMAL(20, 8),
  
  -- Volume
  volume DECIMAL(20, 8) NOT NULL,
  units DECIMAL(20, 8) NOT NULL,
  
  -- Risk Management
  stop_loss DECIMAL(20, 8),
  take_profit DECIMAL(20, 8),
  trailing_stop DECIMAL(20, 8),
  
  -- Profit/Loss
  profit DECIMAL(20, 2) DEFAULT 0,
  profit_percentage DECIMAL(10, 4) DEFAULT 0,
  commission DECIMAL(20, 2) DEFAULT 0,
  swap DECIMAL(20, 2) DEFAULT 0,
  
  -- Source
  source TEXT NOT NULL DEFAULT 'manual' CHECK (source IN ('manual', 'signal', 'autotrader', 'copy_trade')),
  signal_id TEXT,
  
  -- Timestamps
  opened_at BIGINT NOT NULL,
  closed_at BIGINT,
  duration BIGINT,
  
  -- Metadata
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_positions_user_id ON positions(user_id);
CREATE INDEX IF NOT EXISTS idx_positions_status ON positions(status);
CREATE INDEX IF NOT EXISTS idx_positions_symbol ON positions(symbol);
CREATE INDEX IF NOT EXISTS idx_positions_opened_at ON positions(opened_at DESC);

-- ============================================
-- 6. TRADE HISTORY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS trade_history (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  position_id TEXT,
  
  -- Symbol
  symbol TEXT NOT NULL,
  asset_name TEXT NOT NULL,
  asset_category TEXT NOT NULL,
  
  -- Trade Details
  type TEXT NOT NULL CHECK (type IN ('buy', 'sell')),
  entry_price DECIMAL(20, 8) NOT NULL,
  exit_price DECIMAL(20, 8) NOT NULL,
  volume DECIMAL(20, 8) NOT NULL,
  
  -- Results
  profit DECIMAL(20, 2) NOT NULL,
  profit_percentage DECIMAL(10, 4) NOT NULL,
  commission DECIMAL(20, 2) DEFAULT 0,
  swap DECIMAL(20, 2) DEFAULT 0,
  
  -- Timestamps
  opened_at BIGINT NOT NULL,
  closed_at BIGINT NOT NULL,
  duration BIGINT NOT NULL,
  
  -- Metadata
  created_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_trade_history_user_id ON trade_history(user_id);
CREATE INDEX IF NOT EXISTS idx_trade_history_symbol ON trade_history(symbol);
CREATE INDEX IF NOT EXISTS idx_trade_history_closed_at ON trade_history(closed_at DESC);

-- ============================================
-- 7. NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Notification Details
  type TEXT NOT NULL CHECK (type IN ('trade', 'deposit', 'withdrawal', 'kyc', 'signal', 'system', 'promotion')),
  category TEXT NOT NULL CHECK (category IN ('success', 'error', 'warning', 'info')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  
  -- Status
  is_read BOOLEAN DEFAULT false,
  read_at BIGINT,
  
  -- Action
  action_url TEXT,
  action_label TEXT,
  
  -- Metadata
  created_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

-- ============================================
-- 8. USER PREFERENCES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_preferences (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  
  -- Favorites
  favorite_symbols TEXT[] DEFAULT '{}',
  
  -- Notifications (stored as JSONB)
  email_notifications JSONB DEFAULT '{"trades": true, "deposits": true, "withdrawals": true, "kyc": true, "marketing": false, "signals": true}'::jsonb,
  push_notifications JSONB DEFAULT '{"trades": true, "deposits": true, "withdrawals": true, "priceAlerts": true, "signals": true}'::jsonb,
  sms_notifications JSONB DEFAULT '{"trades": false, "withdrawals": true, "security": true}'::jsonb,
  
  -- Trading Preferences
  default_leverage INTEGER DEFAULT 1,
  default_stop_loss DECIMAL(10, 2) DEFAULT 2,
  default_take_profit DECIMAL(10, 2) DEFAULT 5,
  confirm_before_trade BOOLEAN DEFAULT true,
  sound_enabled BOOLEAN DEFAULT true,
  auto_close_on_profit BOOLEAN DEFAULT false,
  
  -- Chart Preferences
  chart_type TEXT DEFAULT 'candlestick',
  chart_timeframe TEXT DEFAULT '1h',
  show_balance BOOLEAN DEFAULT true,
  
  -- Metadata
  updated_at BIGINT NOT NULL
);

-- ============================================
-- 9. TRADING SIGNALS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS trading_signals (
  id TEXT PRIMARY KEY,
  
  -- Symbol
  symbol TEXT NOT NULL,
  asset_name TEXT NOT NULL,
  asset_category TEXT NOT NULL,
  
  -- Signal Details
  type TEXT NOT NULL CHECK (type IN ('buy', 'sell')),
  strength TEXT NOT NULL CHECK (strength IN ('weak', 'moderate', 'strong', 'very_strong')),
  
  -- Prices
  entry_price DECIMAL(20, 8) NOT NULL,
  current_price DECIMAL(20, 8) NOT NULL,
  stop_loss DECIMAL(20, 8) NOT NULL,
  take_profit DECIMAL(20, 8) NOT NULL,
  
  -- Targets (stored as JSONB)
  targets JSONB,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'triggered', 'expired', 'cancelled')),
  
  -- Analysis
  analysis TEXT,
  indicators TEXT[],
  
  -- Source
  source TEXT NOT NULL CHECK (source IN ('ai', 'analyst', 'community')),
  confidence INTEGER CHECK (confidence >= 0 AND confidence <= 100),
  
  -- Access Control
  required_tier TEXT NOT NULL CHECK (required_tier IN ('free', 'basic', 'pro', 'premium', 'vip')),
  
  -- Timestamps
  triggered_at BIGINT,
  expires_at BIGINT,
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_signals_symbol ON trading_signals(symbol);
CREATE INDEX IF NOT EXISTS idx_signals_status ON trading_signals(status);
CREATE INDEX IF NOT EXISTS idx_signals_created_at ON trading_signals(created_at DESC);

-- ============================================
-- 10. AUTO TRADER CONFIGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS auto_trader_configs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Config Details
  name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT false,
  
  -- Strategy
  strategy TEXT NOT NULL CHECK (strategy IN ('scalping', 'day_trading', 'swing_trading', 'trend_following', 'mean_reversion', 'breakout', 'custom')),
  
  -- Assets
  allowed_symbols TEXT[] NOT NULL,
  
  -- Risk Management (stored as JSONB)
  risk_settings JSONB NOT NULL,
  
  -- Trading Rules (stored as JSONB)
  entry_rules JSONB,
  exit_rules JSONB,
  
  -- Statistics (stored as JSONB)
  statistics JSONB DEFAULT '{}'::jsonb,
  
  -- Timestamps
  last_trade_at BIGINT,
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_auto_trader_user_id ON auto_trader_configs(user_id);
CREATE INDEX IF NOT EXISTS idx_auto_trader_is_active ON auto_trader_configs(is_active);

-- ============================================
-- 11. PRICE ALERTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS price_alerts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Symbol
  symbol TEXT NOT NULL,
  asset_name TEXT NOT NULL,
  
  -- Alert Conditions
  condition TEXT NOT NULL CHECK (condition IN ('above', 'below', 'equals')),
  target_price DECIMAL(20, 8) NOT NULL,
  current_price DECIMAL(20, 8) NOT NULL,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  triggered BOOLEAN DEFAULT false,
  repeatable BOOLEAN DEFAULT false,
  
  -- Notification Method
  notify_via TEXT[] DEFAULT ARRAY['push', 'email'],
  
  -- Timestamps
  triggered_at BIGINT,
  expires_at BIGINT,
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_price_alerts_user_id ON price_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_price_alerts_symbol ON price_alerts(symbol);
CREATE INDEX IF NOT EXISTS idx_price_alerts_is_active ON price_alerts(is_active);

-- ============================================
-- 12. ADMIN SETTINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS admin_settings (
  id TEXT PRIMARY KEY DEFAULT 'global_settings',
  
  -- Trading Settings (stored as JSONB)
  trading_settings JSONB NOT NULL,
  
  -- Fee Structure (stored as JSONB)
  fees JSONB NOT NULL,
  
  -- Limits (stored as JSONB)
  limits JSONB NOT NULL,
  
  -- Subscription Plans (stored as JSONB)
  subscription_plans JSONB NOT NULL,
  
  -- Payment Providers (stored as JSONB)
  payment_providers JSONB NOT NULL,
  
  -- Notification Settings (stored as JSONB)
  notification_settings JSONB NOT NULL,
  
  -- Metadata
  updated_at BIGINT NOT NULL
);

-- Insert default admin settings
INSERT INTO admin_settings (id, trading_settings, fees, limits, subscription_plans, payment_providers, notification_settings, updated_at)
VALUES (
  'global_settings',
  '{"enableLiveTrading": true, "enableDemoTrading": true, "maintenanceMode": false, "maxLeverage": 100, "minTradeSize": 0.01, "maxTradeSize": 1000, "defaultSpread": 0.0001, "spreadMultiplier": 1, "useRealMarketData": true, "marketDataProvider": "tradingview"}'::jsonb,
  '{"depositFeePercentage": 0, "withdrawalFeePercentage": 1, "tradingFeePercentage": 0.1, "inactivityFee": 10, "inactivityDays": 90, "minDepositFee": 0, "minWithdrawalFee": 5}'::jsonb,
  '{"minDeposit": 10, "maxDeposit": 100000, "minWithdrawal": 20, "maxWithdrawal": 50000, "dailyWithdrawalLimit": 10000, "monthlyWithdrawalLimit": 100000, "kycRequiredForWithdrawalAbove": 1000}'::jsonb,
  '{}'::jsonb,
  '{}'::jsonb,
  '{"emailNotifications": true, "smsNotifications": true, "pushNotifications": true, "notifyOnLargeDeposit": 10000, "notifyOnLargeWithdrawal": 5000, "notifyOnSuspiciousActivity": true}'::jsonb,
  extract(epoch from now())::bigint * 1000
)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 13. ACTIVITY LOGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS activity_logs (
  id TEXT PRIMARY KEY,
  
  -- Actor
  admin_id TEXT,
  admin_name TEXT,
  
  -- Action
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  
  -- Details
  details TEXT,
  changes JSONB,
  
  -- Request Info
  ip_address TEXT,
  user_agent TEXT,
  
  -- Timestamp
  timestamp BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_activity_logs_admin_id ON activity_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_resource_type ON activity_logs(resource_type);
CREATE INDEX IF NOT EXISTS idx_activity_logs_timestamp ON activity_logs(timestamp DESC);

-- ============================================
-- 14. INVESTMENT OFFERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS investment_offers (
  id TEXT PRIMARY KEY,
  
  -- Offer Details
  name TEXT NOT NULL,
  logo TEXT,
  type TEXT NOT NULL CHECK (type IN ('IPO', 'ECN')),
  category TEXT NOT NULL,
  description TEXT,
  
  -- Pricing
  price DECIMAL(20, 2) NOT NULL, -- Price per unit in USD
  
  -- Units
  total_units INTEGER NOT NULL,
  available_units INTEGER NOT NULL,
  min_purchase INTEGER NOT NULL,
  max_purchase INTEGER NOT NULL,
  
  -- Investment Terms
  profitability DECIMAL(10, 4) NOT NULL, -- Percentage (e.g., 12.50 for 12.5%)
  period INTEGER NOT NULL, -- Investment period in days
  
  -- Status
  enabled BOOLEAN DEFAULT true,
  
  -- Metadata
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_investment_offers_type ON investment_offers(type);
CREATE INDEX IF NOT EXISTS idx_investment_offers_category ON investment_offers(category);
CREATE INDEX IF NOT EXISTS idx_investment_offers_enabled ON investment_offers(enabled);
CREATE INDEX IF NOT EXISTS idx_investment_offers_created_at ON investment_offers(created_at DESC);

-- ============================================
-- 15. USER INVESTMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_investments (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  offer_id TEXT NOT NULL REFERENCES investment_offers(id) ON DELETE CASCADE,
  
  -- Offer Snapshot (at purchase time)
  offer_name TEXT NOT NULL,
  offer_logo TEXT,
  offer_type TEXT NOT NULL CHECK (offer_type IN ('IPO', 'ECN')),
  
  -- Investment Details
  units INTEGER NOT NULL,
  purchase_price DECIMAL(20, 2) NOT NULL, -- Price per unit at purchase
  total_amount DECIMAL(20, 2) NOT NULL, -- Total investment amount
  current_value DECIMAL(20, 2) NOT NULL, -- Current value
  
  -- Terms
  profitability DECIMAL(10, 4) NOT NULL, -- Percentage
  start_date BIGINT NOT NULL,
  end_date BIGINT NOT NULL,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'in-progress' CHECK (status IN ('in-progress', 'completed', 'cancelled')),
  
  -- Metadata
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_user_investments_user_id ON user_investments(user_id);
CREATE INDEX IF NOT EXISTS idx_user_investments_offer_id ON user_investments(offer_id);
CREATE INDEX IF NOT EXISTS idx_user_investments_status ON user_investments(status);
CREATE INDEX IF NOT EXISTS idx_user_investments_created_at ON user_investments(created_at DESC);

-- ============================================
-- 16. SELL REQUESTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS sell_requests (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  investment_id TEXT NOT NULL REFERENCES user_investments(id) ON DELETE CASCADE,
  
  -- Offer Details
  offer_name TEXT NOT NULL,
  offer_logo TEXT,
  offer_type TEXT NOT NULL CHECK (offer_type IN ('IPO', 'ECN')),
  
  -- Sell Details
  units INTEGER NOT NULL,
  current_price DECIMAL(20, 2) NOT NULL,
  total_amount DECIMAL(20, 2) NOT NULL,
  
  -- Payment
  payment_wallet TEXT NOT NULL CHECK (payment_wallet IN ('wallet', 'ecn', 'ipo')),
  
  -- Status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  
  -- Processing
  processed_at BIGINT,
  processed_by TEXT,
  rejection_reason TEXT,
  
  -- Metadata
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sell_requests_user_id ON sell_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_sell_requests_investment_id ON sell_requests(investment_id);
CREATE INDEX IF NOT EXISTS idx_sell_requests_status ON sell_requests(status);
CREATE INDEX IF NOT EXISTS idx_sell_requests_created_at ON sell_requests(created_at DESC);

-- ============================================
-- 17. MARKET ASSETS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS market_assets (
  id TEXT PRIMARY KEY,
  
  -- Asset Identification
  symbol TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Crypto', 'Forex', 'Stocks', 'Commodities', 'Indices', 'Funds', 'Futures', 'Bonds', 'Economy', 'Options', 'CFD', 'ETFs')),
  exchange TEXT NOT NULL,
  
  -- Current Market Data
  price DECIMAL(20, 8),
  change_24h DECIMAL(10, 4), -- Percentage
  volume BIGINT,
  
  -- Leverage Settings (stored as JSONB)
  leverage JSONB DEFAULT '{"basic": 10, "standard": 20, "premium": 50}'::jsonb,
  
  -- Trading Configuration
  min_trade_size DECIMAL(20, 8) DEFAULT 0.01,
  max_trade_size DECIMAL(20, 8) DEFAULT 1000,
  tick_size DECIMAL(20, 8) DEFAULT 0.01,
  
  -- Status
  enabled BOOLEAN DEFAULT true,
  
  -- Metadata
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_market_assets_symbol ON market_assets(symbol);
CREATE INDEX IF NOT EXISTS idx_market_assets_category ON market_assets(category);
CREATE INDEX IF NOT EXISTS idx_market_assets_exchange ON market_assets(exchange);
CREATE INDEX IF NOT EXISTS idx_market_assets_enabled ON market_assets(enabled);

-- ============================================
-- 18. SUPPORT TICKETS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS support_tickets (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Ticket Details
  subject TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('account', 'deposit', 'withdrawal', 'trading', 'kyc', 'technical', 'other')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  
  -- Status
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'waiting_user', 'waiting_admin', 'resolved', 'closed')),
  
  -- Assignment
  assigned_to TEXT, -- Admin ID who is handling this ticket
  assigned_at BIGINT,
  
  -- Resolution
  resolved_at BIGINT,
  resolved_by TEXT, -- Admin ID who resolved
  resolution_notes TEXT,
  
  -- Metadata
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_support_tickets_category ON support_tickets(category);
CREATE INDEX IF NOT EXISTS idx_support_tickets_priority ON support_tickets(priority);
CREATE INDEX IF NOT EXISTS idx_support_tickets_assigned_to ON support_tickets(assigned_to);
CREATE INDEX IF NOT EXISTS idx_support_tickets_created_at ON support_tickets(created_at DESC);

-- ============================================
-- 19. TICKET MESSAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ticket_messages (
  id TEXT PRIMARY KEY,
  ticket_id TEXT NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
  
  -- Sender
  sender_type TEXT NOT NULL CHECK (sender_type IN ('user', 'admin')),
  sender_id TEXT NOT NULL, -- user_id or admin_id
  sender_name TEXT NOT NULL,
  
  -- Message
  message TEXT NOT NULL,
  
  -- Attachments (stored as JSONB array)
  attachments JSONB DEFAULT '[]'::jsonb,
  
  -- Status
  is_internal BOOLEAN DEFAULT false, -- Internal admin notes not visible to user
  is_read BOOLEAN DEFAULT false,
  read_at BIGINT,
  
  -- Metadata
  created_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_ticket_messages_ticket_id ON ticket_messages(ticket_id);
CREATE INDEX IF NOT EXISTS idx_ticket_messages_sender_type ON ticket_messages(sender_type);
CREATE INDEX IF NOT EXISTS idx_ticket_messages_created_at ON ticket_messages(created_at DESC);

-- ============================================
-- 20. MESSAGE TEMPLATES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS message_templates (
  id TEXT PRIMARY KEY,
  
  -- Template Details
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('welcome', 'deposit', 'withdrawal', 'kyc', 'promotion', 'alert', 'custom')),
  
  -- Content
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  
  -- Variables (stored as JSONB array of available placeholders)
  variables JSONB DEFAULT '["{{user_name}}", "{{user_email}}", "{{amount}}", "{{date}}"]'::jsonb,
  
  -- Channels
  channels TEXT[] DEFAULT ARRAY['email', 'notification', 'sms'],
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  
  -- Metadata
  created_by TEXT NOT NULL, -- Admin ID
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_message_templates_category ON message_templates(category);
CREATE INDEX IF NOT EXISTS idx_message_templates_is_active ON message_templates(is_active);

-- ============================================
-- 21. CRM MESSAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS crm_messages (
  id TEXT PRIMARY KEY,
  
  -- Recipient
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE, -- NULL for broadcast messages
  recipient_type TEXT NOT NULL DEFAULT 'individual' CHECK (recipient_type IN ('individual', 'segment', 'broadcast')),
  
  -- Segment Filters (for targeted campaigns, stored as JSONB)
  segment_filters JSONB, -- e.g., {"subscription_plan": "premium", "kyc_status": "approved"}
  
  -- Template
  template_id TEXT REFERENCES message_templates(id) ON DELETE SET NULL,
  
  -- Message Content
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  
  -- Channel
  channel TEXT NOT NULL CHECK (channel IN ('email', 'sms', 'push', 'notification', 'in_app')),
  
  -- Status
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sent', 'failed')),
  
  -- Delivery
  scheduled_at BIGINT,
  sent_at BIGINT,
  delivered_at BIGINT,
  read_at BIGINT,
  
  -- Error Handling
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  
  -- Metadata
  sent_by TEXT NOT NULL, -- Admin ID
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_crm_messages_user_id ON crm_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_crm_messages_recipient_type ON crm_messages(recipient_type);
CREATE INDEX IF NOT EXISTS idx_crm_messages_status ON crm_messages(status);
CREATE INDEX IF NOT EXISTS idx_crm_messages_channel ON crm_messages(channel);
CREATE INDEX IF NOT EXISTS idx_crm_messages_sent_at ON crm_messages(sent_at DESC);

-- ============================================
-- 22. ADMIN NOTES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS admin_notes (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Note Details
  category TEXT NOT NULL CHECK (category IN ('general', 'kyc', 'risk', 'vip', 'compliance', 'support')),
  note TEXT NOT NULL,
  
  -- Priority/Flag
  is_flagged BOOLEAN DEFAULT false,
  flag_reason TEXT,
  
  -- Author
  created_by TEXT NOT NULL, -- Admin ID
  created_by_name TEXT NOT NULL, -- Admin name
  
  -- Metadata
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_admin_notes_user_id ON admin_notes(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_notes_category ON admin_notes(category);
CREATE INDEX IF NOT EXISTS idx_admin_notes_is_flagged ON admin_notes(is_flagged);
CREATE INDEX IF NOT EXISTS idx_admin_notes_created_at ON admin_notes(created_at DESC);

-- ============================================
-- 23. PAYMENT METHODS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS payment_methods (
  id TEXT PRIMARY KEY,
  
  -- Method Details
  name TEXT NOT NULL, -- e.g., "Bank Transfer", "Bitcoin", "Credit Card"
  type TEXT NOT NULL CHECK (type IN ('bank_transfer', 'credit_card', 'debit_card', 'crypto', 'e_wallet', 'mobile_money')),
  
  -- Availability
  available_for TEXT NOT NULL CHECK (available_for IN ('deposit', 'withdrawal', 'both')),
  
  -- Crypto Specific
  crypto_currency TEXT, -- e.g., "BTC", "ETH", "USDT"
  crypto_network TEXT, -- e.g., "Bitcoin", "Ethereum", "TRC20"
  
  -- Payment Provider
  provider TEXT, -- e.g., "Stripe", "PayPal", "Coinbase", "Binance"
  provider_config JSONB, -- API keys and configuration (encrypted)
  
  -- Limits
  min_amount DECIMAL(20, 2) NOT NULL DEFAULT 10,
  max_amount DECIMAL(20, 2) NOT NULL DEFAULT 100000,
  daily_limit DECIMAL(20, 2),
  
  -- Fees
  fee_type TEXT NOT NULL DEFAULT 'percentage' CHECK (fee_type IN ('fixed', 'percentage', 'mixed')),
  fee_fixed DECIMAL(20, 2) DEFAULT 0,
  fee_percentage DECIMAL(10, 4) DEFAULT 0,
  min_fee DECIMAL(20, 2) DEFAULT 0,
  max_fee DECIMAL(20, 2),
  
  -- Processing
  processing_time TEXT, -- e.g., "Instant", "1-3 hours", "1-2 business days"
  requires_kyc BOOLEAN DEFAULT false,
  auto_approve BOOLEAN DEFAULT false,
  
  -- Display
  icon_url TEXT,
  description TEXT,
  instructions TEXT,
  
  -- Status
  is_enabled BOOLEAN DEFAULT true,
  is_maintenance BOOLEAN DEFAULT false,
  
  -- Metadata
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_payment_methods_type ON payment_methods(type);
CREATE INDEX IF NOT EXISTS idx_payment_methods_available_for ON payment_methods(available_for);
CREATE INDEX IF NOT EXISTS idx_payment_methods_is_enabled ON payment_methods(is_enabled);
CREATE INDEX IF NOT EXISTS idx_payment_methods_crypto_currency ON payment_methods(crypto_currency);

-- ============================================
-- 24. API SETTINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS api_settings (
  id TEXT PRIMARY KEY,
  
  -- API Provider
  provider TEXT NOT NULL UNIQUE, -- e.g., "tradingview", "binance", "alpha_vantage", "openai"
  category TEXT NOT NULL CHECK (category IN ('market_data', 'payment', 'kyc', 'ai', 'notification', 'other')),
  
  -- Configuration
  api_key TEXT, -- Encrypted
  api_secret TEXT, -- Encrypted
  endpoint_url TEXT,
  config JSONB DEFAULT '{}'::jsonb, -- Additional configuration
  
  -- Status
  is_enabled BOOLEAN DEFAULT true,
  is_test_mode BOOLEAN DEFAULT false,
  
  -- Monitoring
  last_used_at BIGINT,
  request_count BIGINT DEFAULT 0,
  error_count BIGINT DEFAULT 0,
  last_error TEXT,
  last_error_at BIGINT,
  
  -- Rate Limiting
  rate_limit_per_minute INTEGER,
  rate_limit_per_hour INTEGER,
  rate_limit_per_day INTEGER,
  
  -- Metadata
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_api_settings_provider ON api_settings(provider);
CREATE INDEX IF NOT EXISTS idx_api_settings_category ON api_settings(category);
CREATE INDEX IF NOT EXISTS idx_api_settings_is_enabled ON api_settings(is_enabled);

-- ============================================
-- 25. TRANSACTIONS TABLE (Unified Ledger)
-- ============================================
CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Transaction Type
  type TEXT NOT NULL CHECK (type IN ('deposit', 'withdrawal', 'trade_profit', 'trade_loss', 'commission', 'swap', 'fee', 'bonus', 'refund', 'investment', 'dividend', 'transfer')),
  
  -- Amount
  amount DECIMAL(20, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  
  -- Balance Impact
  balance_before DECIMAL(20, 2) NOT NULL,
  balance_after DECIMAL(20, 2) NOT NULL,
  
  -- Reference
  related_type TEXT, -- 'deposit', 'withdrawal', 'position', 'investment', etc.
  related_id TEXT, -- ID of the related record
  
  -- Description
  description TEXT NOT NULL,
  notes TEXT,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'reversed')),
  
  -- Metadata
  created_at BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
CREATE INDEX IF NOT EXISTS idx_transactions_related_type ON transactions(related_type);
CREATE INDEX IF NOT EXISTS idx_transactions_related_id ON transactions(related_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);

-- Enable RLS on transactions table
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Note: You'll need to create RLS policies based on your auth setup
-- Example: Users can only see their own data
-- CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);

-- ============================================
-- COMPLETE! METATRADE PRO DATABASE - 25 TABLES
-- ============================================
-- 
-- DATABASE STRUCTURE SUMMARY:
-- 
-- USER MANAGEMENT (3 tables):
--   1. users - Main user accounts
--   2. kyc_documents - KYC verification documents
--   3. user_preferences - User settings and preferences
-- 
-- TRADING & POSITIONS (6 tables):
--   4. positions - Open and closed positions
--   5. trade_history - Historical trades
--   6. trading_signals - AI/analyst trading signals
--   7. auto_trader_configs - Automated trading configurations
--   8. price_alerts - Price notification alerts
--   9. market_assets - Available trading instruments
-- 
-- FINANCIAL TRANSACTIONS (4 tables):
--   10. deposits - Deposit transactions
--   11. withdrawals - Withdrawal transactions
--   12. transactions - Unified financial ledger (audit trail)
--   13. payment_methods - Available payment methods (admin managed)
-- 
-- INVESTMENTS (3 tables):
--   14. investment_offers - IPO/ECN investment opportunities
--   15. user_investments - User's active investments
--   16. sell_requests - Investment sell requests
-- 
-- COMMUNICATIONS (5 tables):
--   17. notifications - User notifications
--   18. support_tickets - Customer support tickets
--   19. ticket_messages - Support ticket conversation history
--   20. message_templates - Reusable message templates
--   21. crm_messages - Admin-to-user CRM communications
-- 
-- ADMIN & SYSTEM (4 tables):
--   22. admin_notes - Internal admin notes on users
--   23. admin_settings - Global platform settings
--   24. activity_logs - Admin activity audit trail
--   25. api_settings - External API configurations
-- 
-- RELATIONSHIPS:
--   - users (1:M) → deposits, withdrawals, positions, trade_history, investments
--   - users (1:1) → user_preferences
--   - investment_offers (1:M) → user_investments
--   - user_investments (1:M) → sell_requests
--   - support_tickets (1:M) → ticket_messages
--   - message_templates (1:M) → crm_messages
--   - All user-related tables cascade delete when user is deleted
-- 
-- NEXT STEPS:
-- 1. Run this entire schema in Supabase SQL Editor
-- 2. Drop old kv_store_5d4be467 table after migration
-- 3. Update /supabase/functions/server/tableService.tsx to use these tables
-- 4. Create RLS policies for proper data access control
-- 5. Initialize demo data for testing
-- 6. Test all CRUD operations
-- 
-- ADMIN FEATURES CAPTURED:
-- ✅ CRM messaging system (crm_messages, message_templates)
-- ✅ Support ticket management (support_tickets, ticket_messages)
-- ✅ Payment method configuration (payment_methods)
-- ✅ Withdrawal management (withdrawals table)
-- ✅ API setup and monitoring (api_settings)
-- ✅ Transaction audit trail (transactions)
-- ✅ Admin notes and user flagging (admin_notes)
-- ✅ Activity logging (activity_logs)
-- 
-- ============================================