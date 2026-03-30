-- ============================================
-- VERIFY DATABASE STRUCTURE
-- ============================================
-- Run these queries to verify your database is properly set up

-- ============================================
-- 1. LIST ALL TABLES (Should show 25 tables)
-- ============================================
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Expected output: 25 tables
-- users, kyc_documents, deposits, withdrawals, positions, trade_history,
-- notifications, user_preferences, trading_signals, auto_trader_configs,
-- price_alerts, admin_settings, activity_logs, investment_offers,
-- user_investments, sell_requests, market_assets, support_tickets,
-- ticket_messages, message_templates, crm_messages, admin_notes,
-- payment_methods, api_settings, transactions

-- ============================================
-- 2. CHECK RECORD COUNTS
-- ============================================
SELECT 
  'users' as table_name, COUNT(*) as record_count FROM users
UNION ALL
SELECT 'kyc_documents', COUNT(*) FROM kyc_documents
UNION ALL
SELECT 'deposits', COUNT(*) FROM deposits
UNION ALL
SELECT 'withdrawals', COUNT(*) FROM withdrawals
UNION ALL
SELECT 'positions', COUNT(*) FROM positions
UNION ALL
SELECT 'trade_history', COUNT(*) FROM trade_history
UNION ALL
SELECT 'notifications', COUNT(*) FROM notifications
UNION ALL
SELECT 'user_preferences', COUNT(*) FROM user_preferences
UNION ALL
SELECT 'trading_signals', COUNT(*) FROM trading_signals
UNION ALL
SELECT 'auto_trader_configs', COUNT(*) FROM auto_trader_configs
UNION ALL
SELECT 'price_alerts', COUNT(*) FROM price_alerts
UNION ALL
SELECT 'admin_settings', COUNT(*) FROM admin_settings
UNION ALL
SELECT 'activity_logs', COUNT(*) FROM activity_logs
UNION ALL
SELECT 'investment_offers', COUNT(*) FROM investment_offers
UNION ALL
SELECT 'user_investments', COUNT(*) FROM user_investments
UNION ALL
SELECT 'sell_requests', COUNT(*) FROM sell_requests
UNION ALL
SELECT 'market_assets', COUNT(*) FROM market_assets
UNION ALL
SELECT 'support_tickets', COUNT(*) FROM support_tickets
UNION ALL
SELECT 'ticket_messages', COUNT(*) FROM ticket_messages
UNION ALL
SELECT 'message_templates', COUNT(*) FROM message_templates
UNION ALL
SELECT 'crm_messages', COUNT(*) FROM crm_messages
UNION ALL
SELECT 'admin_notes', COUNT(*) FROM admin_notes
UNION ALL
SELECT 'payment_methods', COUNT(*) FROM payment_methods
UNION ALL
SELECT 'api_settings', COUNT(*) FROM api_settings
UNION ALL
SELECT 'transactions', COUNT(*) FROM transactions
ORDER BY table_name;

-- ============================================
-- 3. LIST ALL INDEXES
-- ============================================
SELECT 
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- ============================================
-- 4. VERIFY FOREIGN KEYS
-- ============================================
SELECT
  tc.table_name as child_table,
  kcu.column_name as child_column,
  ccu.table_name AS parent_table,
  ccu.column_name AS parent_column,
  rc.delete_rule
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
JOIN information_schema.referential_constraints AS rc
  ON rc.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = 'public'
ORDER BY tc.table_name, kcu.column_name;

-- ============================================
-- 5. CHECK RLS STATUS
-- ============================================
SELECT
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- Expected: All tables should have rls_enabled = true

-- ============================================
-- 6. LIST ALL CONSTRAINTS
-- ============================================
SELECT
  tc.table_name,
  tc.constraint_name,
  tc.constraint_type,
  cc.check_clause
FROM information_schema.table_constraints tc
LEFT JOIN information_schema.check_constraints cc
  ON tc.constraint_name = cc.constraint_name
WHERE tc.table_schema = 'public'
  AND tc.constraint_type IN ('CHECK', 'PRIMARY KEY', 'UNIQUE')
ORDER BY tc.table_name, tc.constraint_type;

-- ============================================
-- 7. SAMPLE DATA VERIFICATION
-- ============================================

-- Check if demo users exist
SELECT id, email, name, status, kyc_status, subscription_plan, balance
FROM users
ORDER BY created_at DESC
LIMIT 5;

-- Check if market assets exist
SELECT id, symbol, name, category, price, enabled
FROM market_assets
ORDER BY created_at DESC
LIMIT 10;

-- Check if payment methods exist
SELECT id, name, type, available_for, is_enabled
FROM payment_methods
ORDER BY created_at DESC;

-- Check if deposits exist
SELECT d.id, u.email, d.amount, d.status, d.payment_method
FROM deposits d
JOIN users u ON d.user_id = u.id
ORDER BY d.created_at DESC
LIMIT 10;

-- Check if positions exist
SELECT p.id, u.email, p.symbol, p.type, p.status, p.profit
FROM positions p
JOIN users u ON p.user_id = u.id
ORDER BY p.created_at DESC
LIMIT 10;

-- ============================================
-- 8. CHECK FOR OLD KV STORE (Should be empty)
-- ============================================
SELECT tablename 
FROM pg_tables 
WHERE tablename = 'kv_store_5d4be467';

-- Expected: No rows (table should not exist if dropped)

-- ============================================
-- 9. DATABASE SIZE AND STATISTICS
-- ============================================

-- Total database size
SELECT 
  pg_size_pretty(pg_database_size(current_database())) as database_size;

-- Table sizes
SELECT
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size,
  pg_total_relation_size(schemaname||'.'||tablename) AS size_bytes
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- ============================================
-- 10. CHECK COLUMN DETAILS FOR KEY TABLES
-- ============================================

-- Users table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'users'
ORDER BY ordinal_position;

-- Deposits table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'deposits'
ORDER BY ordinal_position;

-- Positions table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'positions'
ORDER BY ordinal_position;

-- ============================================
-- VERIFICATION COMPLETE!
-- ============================================
-- If all queries run successfully:
-- ✅ All 25 tables exist
-- ✅ Indexes are created
-- ✅ Foreign keys are properly set up
-- ✅ RLS is enabled on all tables
-- ✅ Sample data is loaded (if you ran initialize_demo_data.sql)
-- ✅ Old KV store is removed (if you ran drop_kv_store.sql)
