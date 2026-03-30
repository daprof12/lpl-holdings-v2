-- ============================================
-- INITIALIZE DEMO DATA FOR METATRADE PRO
-- ============================================
-- Run this after creating tables to populate with sample data
-- This creates realistic demo data for testing

-- ============================================
-- INSERT DEMO DATA
-- ============================================
DO $$
DECLARE
  now_ms BIGINT := (extract(epoch from now()) * 1000)::bigint;
  admin_id TEXT := 'adm_demo123';
  demo_user1_id TEXT := 'usr_demo001';
  demo_user2_id TEXT := 'usr_demo002';
  demo_user3_id TEXT := 'usr_demo003';
BEGIN

-- ============================================
-- 1. INSERT DEMO USERS
-- ============================================
INSERT INTO users (
  id, email, name, phone, country, address, city, postal_code, date_of_birth,
  status, email_verified, phone_verified, two_factor_enabled,
  kyc_status, account_type, language, theme, timezone,
  balance, equity, margin, free_margin, margin_level, currency,
  subscription_plan, subscription_status, subscription_started_at, subscription_expires_at,
  created_at, updated_at
) VALUES
  -- Demo User 1: Premium VIP trader
  (
    demo_user1_id, 'john.trader@example.com', 'John Trader', '+1-555-0101', 'United States',
    '123 Wall Street', 'New York', '10005', 
    (extract(epoch from (now() - interval '30 years')) * 1000)::bigint,
    'active', true, true, true,
    'approved', 'live', 'en', 'dark', 'America/New_York',
    50000.00, 52500.00, 5000.00, 45000.00, 1050.00, 'USD',
    'vip', 'active', 
    (extract(epoch from (now() - interval '30 days')) * 1000)::bigint,
    (extract(epoch from (now() + interval '335 days')) * 1000)::bigint,
    (extract(epoch from (now() - interval '180 days')) * 1000)::bigint, 
    now_ms
  ),
  
  -- Demo User 2: Basic trader
  (
    demo_user2_id, 'sarah.investor@example.com', 'Sarah Investor', '+44-20-7123-4567', 'United Kingdom',
    '456 Trading Lane', 'London', 'EC2M 7PP', 
    (extract(epoch from (now() - interval '28 years')) * 1000)::bigint,
    'active', true, false, false,
    'pending', 'demo', 'en', 'light', 'Europe/London',
    10000.00, 10250.00, 0.00, 10250.00, 0.00, 'USD',
    'basic', 'active', 
    (extract(epoch from (now() - interval '60 days')) * 1000)::bigint,
    (extract(epoch from (now() + interval '305 days')) * 1000)::bigint,
    (extract(epoch from (now() - interval '90 days')) * 1000)::bigint, 
    now_ms
  ),
  
  -- Demo User 3: Suspended user
  (
    demo_user3_id, 'mike.suspended@example.com', 'Mike Suspended', NULL, 'Canada',
    NULL, NULL, NULL, 
    (extract(epoch from (now() - interval '25 years')) * 1000)::bigint,
    'suspended', true, false, false,
    'rejected', 'demo', 'en', 'light', 'America/Toronto',
    0.00, 0.00, 0.00, 0.00, 0.00, 'USD',
    'free', 'cancelled', NULL, NULL,
    (extract(epoch from (now() - interval '365 days')) * 1000)::bigint, 
    now_ms
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 2. INSERT USER PREFERENCES
-- ============================================
INSERT INTO user_preferences (
  user_id, favorite_symbols, email_notifications, push_notifications, sms_notifications,
  default_leverage, default_stop_loss, default_take_profit, confirm_before_trade,
  sound_enabled, auto_close_on_profit, chart_type, chart_timeframe, show_balance, updated_at
) VALUES
  (
    demo_user1_id,
    ARRAY['BTCUSD', 'EURUSD', 'AAPL', 'GOLD'],
    '{"trades": true, "deposits": true, "withdrawals": true, "kyc": true, "marketing": false, "signals": true}'::jsonb,
    '{"trades": true, "deposits": true, "withdrawals": true, "priceAlerts": true, "signals": true}'::jsonb,
    '{"trades": false, "withdrawals": true, "security": true}'::jsonb,
    50, 2.0, 5.0, false,
    true, false, 'candlestick', '1h', true, now_ms
  ),
  (
    demo_user2_id,
    ARRAY['BTCUSD', 'ETHUSD'],
    '{"trades": true, "deposits": true, "withdrawals": true, "kyc": true, "marketing": true, "signals": true}'::jsonb,
    '{"trades": true, "deposits": true, "withdrawals": true, "priceAlerts": true, "signals": true}'::jsonb,
    '{"trades": false, "withdrawals": true, "security": true}'::jsonb,
    10, 2.0, 5.0, true,
    true, false, 'candlestick', '15m', true, now_ms
  )
ON CONFLICT (user_id) DO NOTHING;

-- ============================================
-- 3. INSERT MARKET ASSETS
-- ============================================
INSERT INTO market_assets (
  id, symbol, name, category, exchange, price, change_24h, volume,
  leverage, min_trade_size, max_trade_size, tick_size, enabled, created_at, updated_at
) VALUES
  ('ast_btc', 'BTCUSD', 'Bitcoin', 'Crypto', 'BINANCE', 43250.50, 2.34, 1234567890,
   '{"basic": 10, "standard": 20, "premium": 50}'::jsonb, 0.01, 100, 0.01, true, now_ms, now_ms),
  
  ('ast_eth', 'ETHUSD', 'Ethereum', 'Crypto', 'BINANCE', 2280.75, 1.89, 987654321,
   '{"basic": 10, "standard": 20, "premium": 50}'::jsonb, 0.1, 1000, 0.01, true, now_ms, now_ms),
  
  ('ast_eurusd', 'EURUSD', 'Euro/US Dollar', 'Forex', 'FOREX', 1.0875, 0.12, 5000000000,
   '{"basic": 30, "standard": 50, "premium": 100}'::jsonb, 0.01, 1000, 0.0001, true, now_ms, now_ms),
  
  ('ast_aapl', 'AAPL', 'Apple Inc.', 'Stocks', 'NASDAQ', 187.45, -0.56, 45000000,
   '{"basic": 5, "standard": 10, "premium": 20}'::jsonb, 1, 10000, 0.01, true, now_ms, now_ms),
  
  ('ast_gold', 'XAUUSD', 'Gold', 'Commodities', 'COMEX', 2045.30, 0.78, 12000000,
   '{"basic": 20, "standard": 30, "premium": 50}'::jsonb, 0.01, 100, 0.01, true, now_ms, now_ms)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 4. INSERT PAYMENT METHODS
-- ============================================
INSERT INTO payment_methods (
  id, name, type, available_for, crypto_currency, crypto_network, provider,
  min_amount, max_amount, fee_type, fee_percentage, min_fee,
  processing_time, requires_kyc, auto_approve, is_enabled, is_maintenance,
  created_at, updated_at
) VALUES
  ('pm_bank', 'Bank Transfer', 'bank_transfer', 'both', NULL, NULL, 'Manual',
   50.00, 100000.00, 'fixed', 0, 0,
   '1-3 business days', true, false, true, false, now_ms, now_ms),
  
  ('pm_btc', 'Bitcoin', 'crypto', 'both', 'BTC', 'Bitcoin', 'Blockchain',
   10.00, 50000.00, 'percentage', 0.5, 2.00,
   '30-60 minutes', false, true, true, false, now_ms, now_ms),
  
  ('pm_eth', 'Ethereum', 'crypto', 'both', 'ETH', 'Ethereum', 'Blockchain',
   10.00, 50000.00, 'percentage', 0.5, 1.00,
   '5-10 minutes', false, true, true, false, now_ms, now_ms),
  
  ('pm_usdt', 'Tether (TRC20)', 'crypto', 'both', 'USDT', 'TRC20', 'Blockchain',
   10.00, 100000.00, 'fixed', 0, 1.00,
   'Instant', false, true, true, false, now_ms, now_ms),
  
  ('pm_card', 'Credit/Debit Card', 'credit_card', 'deposit', NULL, NULL, 'Stripe',
   20.00, 10000.00, 'percentage', 2.9, 0.50,
   'Instant', false, true, true, false, now_ms, now_ms)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 5. INSERT DEPOSITS
-- ============================================
INSERT INTO deposits (
  id, user_id, amount, currency, fee, net_amount, payment_method, payment_provider,
  crypto_currency, crypto_tx_hash, crypto_network, crypto_confirmations,
  status, processed_at, completed_at, reviewed_by, created_at, updated_at
) VALUES
  (
    'dep_001', demo_user1_id, 50000.00, 'USD', 0.00, 50000.00, 'bank_transfer', 'Manual',
    NULL, NULL, NULL, 0,
    'completed', 
    (extract(epoch from (now() - interval '150 days')) * 1000)::bigint,
    (extract(epoch from (now() - interval '150 days')) * 1000)::bigint, 
    admin_id,
    (extract(epoch from (now() - interval '150 days')) * 1000)::bigint,
    (extract(epoch from (now() - interval '150 days')) * 1000)::bigint
  ),
  
  (
    'dep_002', demo_user2_id, 10000.00, 'USD', 0.00, 10000.00, 'crypto', 'Blockchain',
    'USDT', '0x1234567890abcdef', 'TRC20', 20,
    'completed', 
    (extract(epoch from (now() - interval '80 days')) * 1000)::bigint,
    (extract(epoch from (now() - interval '80 days')) * 1000)::bigint, 
    admin_id,
    (extract(epoch from (now() - interval '80 days')) * 1000)::bigint,
    (extract(epoch from (now() - interval '80 days')) * 1000)::bigint
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 6. INSERT POSITIONS (Open trades)
-- ============================================
INSERT INTO positions (
  id, user_id, symbol, asset_name, asset_category, type, status,
  entry_price, current_price, volume, units, stop_loss, take_profit,
  profit, profit_percentage, commission, swap, source,
  opened_at, created_at, updated_at
) VALUES
  (
    'pos_001', demo_user1_id, 'BTCUSD', 'Bitcoin', 'Crypto', 'buy', 'open',
    42000.00, 43250.50, 1.0, 1.0, 40000.00, 45000.00,
    1250.50, 2.97, 5.00, 0.00, 'manual',
    (extract(epoch from (now() - interval '48 hours')) * 1000)::bigint,
    (extract(epoch from (now() - interval '48 hours')) * 1000)::bigint, 
    now_ms
  ),
  
  (
    'pos_002', demo_user1_id, 'EURUSD', 'Euro/US Dollar', 'Forex', 'sell', 'open',
    1.0900, 1.0875, 100000.00, 100000.00, 1.0950, 1.0850,
    250.00, 0.23, 2.00, -0.50, 'manual',
    (extract(epoch from (now() - interval '24 hours')) * 1000)::bigint,
    (extract(epoch from (now() - interval '24 hours')) * 1000)::bigint, 
    now_ms
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 7. INSERT TRADING SIGNALS
-- ============================================
INSERT INTO trading_signals (
  id, symbol, asset_name, asset_category, type, strength,
  entry_price, current_price, stop_loss, take_profit,
  status, analysis, source, confidence, required_tier,
  created_at, updated_at
) VALUES
  (
    'sig_001', 'BTCUSD', 'Bitcoin', 'Crypto', 'buy', 'strong',
    43000.00, 43250.50, 41000.00, 46000.00,
    'active', 'Strong bullish momentum with RSI showing oversold conditions', 'ai', 85, 'basic',
    (extract(epoch from (now() - interval '12 hours')) * 1000)::bigint, 
    now_ms
  ),
  
  (
    'sig_002', 'AAPL', 'Apple Inc.', 'Stocks', 'buy', 'moderate',
    185.00, 187.45, 180.00, 195.00,
    'active', 'Positive earnings report expected, technical breakout pattern', 'analyst', 72, 'pro',
    (extract(epoch from (now() - interval '6 hours')) * 1000)::bigint, 
    now_ms
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 8. INSERT NOTIFICATIONS
-- ============================================
INSERT INTO notifications (
  id, user_id, type, category, title, message, is_read, action_url, created_at
) VALUES
  (
    'not_001', demo_user1_id, 'deposit', 'success', 'Deposit Completed',
    'Your deposit of $50,000.00 has been successfully processed.', true, '/wallet', 
    (extract(epoch from (now() - interval '150 days')) * 1000)::bigint
  ),
  
  (
    'not_002', demo_user1_id, 'trade', 'success', 'Position Opened',
    'You have successfully opened a BUY position on BTCUSD at $42,000.00', false, '/trading', 
    (extract(epoch from (now() - interval '48 hours')) * 1000)::bigint
  ),
  
  (
    'not_003', demo_user2_id, 'kyc', 'warning', 'KYC Verification Pending',
    'Your KYC documents are currently under review. You will be notified once approved.', false, '/kyc', 
    (extract(epoch from (now() - interval '24 hours')) * 1000)::bigint
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 9. INSERT INVESTMENT OFFERS
-- ============================================
INSERT INTO investment_offers (
  id, name, logo, type, category, description, price,
  total_units, available_units, min_purchase, max_purchase,
  profitability, period, enabled, created_at, updated_at
) VALUES
  (
    'offer_001', 'Tech Growth Fund', NULL, 'IPO', 'Technology',
    'High-growth technology sector investment fund', 100.00,
    10000, 8500, 10, 1000,
    15.50, 365, true, now_ms, now_ms
  ),
  
  (
    'offer_002', 'Crypto Index ECN', NULL, 'ECN', 'Cryptocurrency',
    'Diversified cryptocurrency index fund', 50.00,
    50000, 45000, 20, 5000,
    12.75, 180, true, now_ms, now_ms
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 10. INSERT SUPPORT TICKET
-- ============================================
INSERT INTO support_tickets (
  id, user_id, subject, category, priority, status,
  assigned_to, created_at, updated_at
) VALUES
  (
    'tkt_001', demo_user2_id, 'Withdrawal delay', 'withdrawal', 'high', 'in_progress',
    admin_id, 
    (extract(epoch from (now() - interval '12 hours')) * 1000)::bigint, 
    now_ms
  )
ON CONFLICT (id) DO NOTHING;

-- Insert ticket messages
INSERT INTO ticket_messages (
  id, ticket_id, sender_type, sender_id, sender_name, message, is_internal, is_read, created_at
) VALUES
  (
    'msg_001', 'tkt_001', 'user', demo_user2_id, 'Sarah Investor',
    'My withdrawal request has been pending for 24 hours. Can you please check the status?',
    false, true, 
    (extract(epoch from (now() - interval '12 hours')) * 1000)::bigint
  ),
  
  (
    'msg_002', 'tkt_001', 'admin', admin_id, 'Support Team',
    'Thank you for contacting us. We are reviewing your withdrawal request and will process it shortly.',
    false, false, 
    (extract(epoch from (now() - interval '6 hours')) * 1000)::bigint
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 11. INSERT MESSAGE TEMPLATE
-- ============================================
INSERT INTO message_templates (
  id, name, category, subject, content, variables, channels, is_active,
  created_by, created_at, updated_at
) VALUES
  (
    'tpl_001', 'Welcome Email', 'welcome', 'Welcome to Metatrade Pro, {{user_name}}!',
    'Dear {{user_name}}, welcome to Metatrade Pro! Your account has been successfully created.',
    '["{{user_name}}", "{{user_email}}", "{{account_type}}"]'::jsonb,
    ARRAY['email', 'notification'], true,
    admin_id, now_ms, now_ms
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 12. INSERT ADMIN NOTE
-- ============================================
INSERT INTO admin_notes (
  id, user_id, category, note, is_flagged, flag_reason,
  created_by, created_by_name, created_at, updated_at
) VALUES
  (
    'note_001', demo_user1_id, 'vip', 'High-value VIP client. Provide priority support.',
    true, 'VIP client with $50k+ balance',
    admin_id, 'Admin Demo', 
    (extract(epoch from (now() - interval '100 days')) * 1000)::bigint, 
    now_ms
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 13. INSERT API SETTINGS
-- ============================================
INSERT INTO api_settings (
  id, provider, category, endpoint_url, is_enabled, is_test_mode,
  rate_limit_per_minute, rate_limit_per_hour, rate_limit_per_day,
  created_at, updated_at
) VALUES
  (
    'api_001', 'tradingview', 'market_data', 'https://api.tradingview.com', true, false,
    60, 1000, 10000, now_ms, now_ms
  ),
  
  (
    'api_002', 'openai', 'ai', 'https://api.openai.com/v1', true, false,
    20, 500, 5000, now_ms, now_ms
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 14. INSERT TRANSACTIONS (Ledger)
-- ============================================
INSERT INTO transactions (
  id, user_id, type, amount, currency, balance_before, balance_after,
  related_type, related_id, description, status, created_at
) VALUES
  (
    'txn_001', demo_user1_id, 'deposit', 50000.00, 'USD', 0.00, 50000.00,
    'deposit', 'dep_001', 'Bank transfer deposit', 'completed',
    (extract(epoch from (now() - interval '150 days')) * 1000)::bigint
  ),
  
  (
    'txn_002', demo_user1_id, 'trade_profit', 1250.50, 'USD', 50000.00, 51250.50,
    'position', 'pos_001', 'Profit from BTCUSD position', 'completed',
    (extract(epoch from (now() - interval '24 hours')) * 1000)::bigint
  )
ON CONFLICT (id) DO NOTHING;

END $$;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================
-- Run these to verify data was inserted:

SELECT 'Data initialization complete!' as status;

SELECT 
  'users' as table_name, COUNT(*) as record_count FROM users
UNION ALL
SELECT 'market_assets', COUNT(*) FROM market_assets
UNION ALL
SELECT 'payment_methods', COUNT(*) FROM payment_methods
UNION ALL
SELECT 'deposits', COUNT(*) FROM deposits
UNION ALL
SELECT 'positions', COUNT(*) FROM positions
UNION ALL
SELECT 'trading_signals', COUNT(*) FROM trading_signals
UNION ALL
SELECT 'notifications', COUNT(*) FROM notifications
UNION ALL
SELECT 'support_tickets', COUNT(*) FROM support_tickets
UNION ALL
SELECT 'transactions', COUNT(*) FROM transactions
ORDER BY table_name;

-- ============================================
-- DEMO DATA INITIALIZATION COMPLETE!
-- ============================================
