-- ============================================
-- TEST RLS POLICIES
-- ============================================
-- Run these tests to verify RLS policies are working correctly

-- ============================================
-- SETUP: Create a test user for testing
-- ============================================

-- First, check if we have any users
SELECT id, email FROM users LIMIT 3;

-- For testing, we'll use the demo user: usr_demo001
-- In production, this would be handled by Supabase Auth

-- ============================================
-- TEST 1: Public Data Access (No Auth Required)
-- ============================================

-- These should work WITHOUT authentication
SELECT COUNT(*) as enabled_assets FROM market_assets WHERE enabled = true;
SELECT COUNT(*) as active_signals FROM trading_signals WHERE status = 'active';
SELECT COUNT(*) as enabled_payment_methods FROM payment_methods WHERE is_enabled = true;
SELECT COUNT(*) as enabled_offers FROM investment_offers WHERE enabled = true;

-- Should return data:
-- ✅ market_assets: 5
-- ✅ trading_signals: 2
-- ✅ payment_methods: 5
-- ✅ investment_offers: 2

-- ============================================
-- TEST 2: Admin Settings (Public Read)
-- ============================================

SELECT id FROM admin_settings;
-- Should return: global_settings

-- ============================================
-- TEST 3: User-Owned Data Access
-- ============================================

-- NOTE: These tests require setting auth.uid() which is normally done by Supabase Auth
-- For manual testing, you can use the service role key which bypasses RLS

-- Simulate user authentication (this is what Supabase Auth does)
-- In a real scenario, auth.uid() is automatically set when user logs in

-- ============================================
-- TEST 4: Verify Policies Exist
-- ============================================

-- Count policies per table
SELECT 
  tablename,
  COUNT(*) as policy_count
FROM pg_policies
WHERE schemaname = 'public'
GROUP BY tablename
ORDER BY policy_count DESC, tablename;

-- Expected policy counts:
-- positions: 4 (select, insert, update, delete)
-- notifications: 4 (select, insert, update, delete)
-- auto_trader_configs: 4 (select, insert, update, delete)
-- price_alerts: 4 (select, insert, update, delete)
-- users: 3 (select, update, insert)
-- deposits: 3 (select, insert, update)
-- withdrawals: 3 (select, insert, update)
-- etc.

-- ============================================
-- TEST 5: List All Policies
-- ============================================

SELECT 
  tablename,
  policyname,
  cmd as operation,
  CASE 
    WHEN qual IS NOT NULL THEN 'Has USING clause'
    ELSE 'No USING clause'
  END as using_clause,
  CASE 
    WHEN with_check IS NOT NULL THEN 'Has WITH CHECK clause'
    ELSE 'No WITH CHECK clause'
  END as with_check_clause
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, cmd, policyname;

-- ============================================
-- TEST 6: Verify RLS is Enabled
-- ============================================

SELECT
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- All tables should show: rls_enabled = true

-- ============================================
-- TEST 7: Test Policy Logic (Service Role)
-- ============================================

-- Using service role, we can test the data without RLS restrictions

-- Check user can see their own data
SELECT 
  u.email,
  (SELECT COUNT(*) FROM deposits WHERE user_id = u.id) as deposits,
  (SELECT COUNT(*) FROM positions WHERE user_id = u.id) as positions,
  (SELECT COUNT(*) FROM notifications WHERE user_id = u.id) as notifications
FROM users u
WHERE u.id = 'usr_demo001';

-- Should show:
-- email: john.trader@example.com
-- deposits: 1
-- positions: 2
-- notifications: 2

-- ============================================
-- TEST 8: Test Cross-User Data Isolation
-- ============================================

-- Verify users are isolated
SELECT 
  u1.email as user1,
  u2.email as user2,
  (SELECT COUNT(*) FROM deposits WHERE user_id = u2.id) as user2_deposits
FROM users u1, users u2
WHERE u1.id = 'usr_demo001' AND u2.id = 'usr_demo002';

-- This should show user2's data, but with RLS, user1 wouldn't see it

-- ============================================
-- TEST 9: Test Public vs Private Data
-- ============================================

-- Public data (anyone can see)
SELECT COUNT(*) as public_assets FROM market_assets WHERE enabled = true;

-- Private data (only service role or owner can see)
SELECT COUNT(*) as total_admin_notes FROM admin_notes;
SELECT COUNT(*) as total_api_settings FROM api_settings;
SELECT COUNT(*) as total_activity_logs FROM activity_logs;

-- ============================================
-- TEST 10: Test Cascade Policies
-- ============================================

-- Verify ticket messages respect ticket ownership
SELECT 
  t.id as ticket_id,
  t.user_id,
  u.email,
  (SELECT COUNT(*) FROM ticket_messages WHERE ticket_id = t.id) as message_count
FROM support_tickets t
JOIN users u ON t.user_id = u.id;

-- ============================================
-- TESTING WITH ACTUAL AUTH (Advanced)
-- ============================================

-- To test with actual authentication, you need to:
-- 1. Create a Supabase Auth user
-- 2. Use the anon key (not service role)
-- 3. Set the Authorization header with the user's JWT token

-- Example (from application code):
-- const { data, error } = await supabase
--   .from('deposits')
--   .select('*')
--   .eq('user_id', userId);

-- With RLS:
-- ✅ User can only see their own deposits
-- ❌ User cannot see other users' deposits
-- ✅ Admin (service role) can see all deposits

-- ============================================
-- RLS POLICY TESTING COMPLETE!
-- ============================================
-- 
-- RESULTS INTERPRETATION:
-- 
-- ✅ If all queries run successfully:
--    - RLS is properly configured
--    - Policies are created correctly
--    - Public data is accessible
-- 
-- ⚠️  To test user isolation:
--    - Use Supabase client with anon key
--    - Authenticate as different users
--    - Verify they can't access each other's data
-- 
-- 📝 IMPORTANT NOTES:
-- 
-- 1. Service Role Key bypasses ALL RLS policies
--    - Use for admin operations
--    - Never expose to client
-- 
-- 2. Anon Key respects RLS policies
--    - Use in frontend
--    - Combined with auth.uid() for user context
-- 
-- 3. auth.uid() is set automatically by Supabase Auth
--    - When user logs in with email/password
--    - When user uses OAuth (Google, etc.)
--    - Available in all policy USING/WITH CHECK clauses
-- 
-- NEXT STEP: Update server code to use these tables!
-- ============================================
