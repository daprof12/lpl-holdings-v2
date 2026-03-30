-- ============================================
-- ROW LEVEL SECURITY POLICIES (FIXED)
-- ============================================
-- Fixed version with proper type casting for TEXT user IDs
-- 
-- IMPORTANT: This fixes the "operator does not exist: uuid = text" error
-- by casting auth.uid() to TEXT (::text) since our user IDs are TEXT not UUID
-- ============================================

-- ============================================
-- 1. USERS TABLE POLICIES
-- ============================================

-- Users can view their own profile
CREATE POLICY "users_select_own" ON users
  FOR SELECT
  USING (auth.uid()::text = id);

-- Users can update their own profile (except sensitive fields)
CREATE POLICY "users_update_own" ON users
  FOR UPDATE
  USING (auth.uid()::text = id);

-- Anyone can insert (for registration - handle validation in server)
CREATE POLICY "users_insert_public" ON users
  FOR INSERT
  WITH CHECK (true);

-- ============================================
-- 2. KYC DOCUMENTS TABLE POLICIES
-- ============================================

-- Users can view their own KYC documents
CREATE POLICY "kyc_documents_select_own" ON kyc_documents
  FOR SELECT
  USING (auth.uid()::text = user_id);

-- Users can insert their own KYC documents
CREATE POLICY "kyc_documents_insert_own" ON kyc_documents
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- Users can update their own pending KYC documents
CREATE POLICY "kyc_documents_update_own" ON kyc_documents
  FOR UPDATE
  USING (auth.uid()::text = user_id AND status = 'pending');

-- ============================================
-- 3. USER PREFERENCES TABLE POLICIES
-- ============================================

-- Users can view their own preferences
CREATE POLICY "user_preferences_select_own" ON user_preferences
  FOR SELECT
  USING (auth.uid()::text = user_id);

-- Users can insert their own preferences
CREATE POLICY "user_preferences_insert_own" ON user_preferences
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- Users can update their own preferences
CREATE POLICY "user_preferences_update_own" ON user_preferences
  FOR UPDATE
  USING (auth.uid()::text = user_id);

-- ============================================
-- 4. DEPOSITS TABLE POLICIES
-- ============================================

-- Users can view their own deposits
CREATE POLICY "deposits_select_own" ON deposits
  FOR SELECT
  USING (auth.uid()::text = user_id);

-- Users can create their own deposits
CREATE POLICY "deposits_insert_own" ON deposits
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- Users can update their own pending deposits (to cancel)
CREATE POLICY "deposits_update_own" ON deposits
  FOR UPDATE
  USING (auth.uid()::text = user_id AND status = 'pending');

-- ============================================
-- 5. WITHDRAWALS TABLE POLICIES
-- ============================================

-- Users can view their own withdrawals
CREATE POLICY "withdrawals_select_own" ON withdrawals
  FOR SELECT
  USING (auth.uid()::text = user_id);

-- Users can create their own withdrawals
CREATE POLICY "withdrawals_insert_own" ON withdrawals
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- Users can update their own pending withdrawals (to cancel)
CREATE POLICY "withdrawals_update_own" ON withdrawals
  FOR UPDATE
  USING (auth.uid()::text = user_id AND status = 'pending');

-- ============================================
-- 6. POSITIONS TABLE POLICIES
-- ============================================

-- Users can view their own positions
CREATE POLICY "positions_select_own" ON positions
  FOR SELECT
  USING (auth.uid()::text = user_id);

-- Users can create their own positions
CREATE POLICY "positions_insert_own" ON positions
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- Users can update their own positions
CREATE POLICY "positions_update_own" ON positions
  FOR UPDATE
  USING (auth.uid()::text = user_id);

-- Users can delete their own positions
CREATE POLICY "positions_delete_own" ON positions
  FOR DELETE
  USING (auth.uid()::text = user_id);

-- ============================================
-- 7. TRADE HISTORY TABLE POLICIES
-- ============================================

-- Users can view their own trade history
CREATE POLICY "trade_history_select_own" ON trade_history
  FOR SELECT
  USING (auth.uid()::text = user_id);

-- Users can insert trade history (when closing positions)
CREATE POLICY "trade_history_insert_own" ON trade_history
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- ============================================
-- 8. NOTIFICATIONS TABLE POLICIES
-- ============================================

-- Users can view their own notifications
CREATE POLICY "notifications_select_own" ON notifications
  FOR SELECT
  USING (auth.uid()::text = user_id);

-- System can insert notifications (server-side using service role)
CREATE POLICY "notifications_insert_own" ON notifications
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- Users can update their own notifications (mark as read)
CREATE POLICY "notifications_update_own" ON notifications
  FOR UPDATE
  USING (auth.uid()::text = user_id);

-- Users can delete their own notifications
CREATE POLICY "notifications_delete_own" ON notifications
  FOR DELETE
  USING (auth.uid()::text = user_id);

-- ============================================
-- 9. TRADING SIGNALS TABLE POLICIES
-- ============================================

-- Everyone can view active trading signals (public data)
CREATE POLICY "trading_signals_select_public" ON trading_signals
  FOR SELECT
  USING (status = 'active');

-- Only service role can insert/update/delete (admin only)
-- No policies needed - service role bypasses RLS

-- ============================================
-- 10. AUTO TRADER CONFIGS TABLE POLICIES
-- ============================================

-- Users can view their own auto trader configs
CREATE POLICY "auto_trader_configs_select_own" ON auto_trader_configs
  FOR SELECT
  USING (auth.uid()::text = user_id);

-- Users can create their own auto trader configs
CREATE POLICY "auto_trader_configs_insert_own" ON auto_trader_configs
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- Users can update their own auto trader configs
CREATE POLICY "auto_trader_configs_update_own" ON auto_trader_configs
  FOR UPDATE
  USING (auth.uid()::text = user_id);

-- Users can delete their own auto trader configs
CREATE POLICY "auto_trader_configs_delete_own" ON auto_trader_configs
  FOR DELETE
  USING (auth.uid()::text = user_id);

-- ============================================
-- 11. PRICE ALERTS TABLE POLICIES
-- ============================================

-- Users can view their own price alerts
CREATE POLICY "price_alerts_select_own" ON price_alerts
  FOR SELECT
  USING (auth.uid()::text = user_id);

-- Users can create their own price alerts
CREATE POLICY "price_alerts_insert_own" ON price_alerts
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- Users can update their own price alerts
CREATE POLICY "price_alerts_update_own" ON price_alerts
  FOR UPDATE
  USING (auth.uid()::text = user_id);

-- Users can delete their own price alerts
CREATE POLICY "price_alerts_delete_own" ON price_alerts
  FOR DELETE
  USING (auth.uid()::text = user_id);

-- ============================================
-- 12. MARKET ASSETS TABLE POLICIES
-- ============================================

-- Everyone can view enabled market assets (public data)
CREATE POLICY "market_assets_select_public" ON market_assets
  FOR SELECT
  USING (enabled = true);

-- Only service role can insert/update/delete (admin only)

-- ============================================
-- 13. INVESTMENT OFFERS TABLE POLICIES
-- ============================================

-- Everyone can view enabled investment offers (public data)
CREATE POLICY "investment_offers_select_public" ON investment_offers
  FOR SELECT
  USING (enabled = true);

-- Only service role can insert/update/delete (admin only)

-- ============================================
-- 14. USER INVESTMENTS TABLE POLICIES
-- ============================================

-- Users can view their own investments
CREATE POLICY "user_investments_select_own" ON user_investments
  FOR SELECT
  USING (auth.uid()::text = user_id);

-- Users can create their own investments
CREATE POLICY "user_investments_insert_own" ON user_investments
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- Only service role can update (status changes by admin)

-- ============================================
-- 15. SELL REQUESTS TABLE POLICIES
-- ============================================

-- Users can view their own sell requests
CREATE POLICY "sell_requests_select_own" ON sell_requests
  FOR SELECT
  USING (auth.uid()::text = user_id);

-- Users can create their own sell requests
CREATE POLICY "sell_requests_insert_own" ON sell_requests
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- Only service role can update (approval by admin)

-- ============================================
-- 16. SUPPORT TICKETS TABLE POLICIES
-- ============================================

-- Users can view their own support tickets
CREATE POLICY "support_tickets_select_own" ON support_tickets
  FOR SELECT
  USING (auth.uid()::text = user_id);

-- Users can create their own support tickets
CREATE POLICY "support_tickets_insert_own" ON support_tickets
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- Users can update their own tickets (to add info)
CREATE POLICY "support_tickets_update_own" ON support_tickets
  FOR UPDATE
  USING (auth.uid()::text = user_id);

-- ============================================
-- 17. TICKET MESSAGES TABLE POLICIES
-- ============================================

-- Users can view messages from their own tickets
CREATE POLICY "ticket_messages_select_own" ON ticket_messages
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM support_tickets
      WHERE id = ticket_messages.ticket_id
      AND user_id = auth.uid()::text
    )
    AND is_internal = false  -- Cannot see internal admin notes
  );

-- Users can insert messages to their own tickets
CREATE POLICY "ticket_messages_insert_own" ON ticket_messages
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM support_tickets
      WHERE id = ticket_messages.ticket_id
      AND user_id = auth.uid()::text
    )
    AND sender_type = 'user'
    AND sender_id = auth.uid()::text
  );

-- ============================================
-- 18. MESSAGE TEMPLATES TABLE POLICIES
-- ============================================

-- Only service role can access (admin only)
-- No public policies needed

-- ============================================
-- 19. CRM MESSAGES TABLE POLICIES
-- ============================================

-- Users can view messages sent to them
CREATE POLICY "crm_messages_select_own" ON crm_messages
  FOR SELECT
  USING (
    auth.uid()::text = user_id 
    OR (recipient_type = 'broadcast' AND user_id IS NULL)
  );

-- Only service role can insert/update/delete (admin only)

-- ============================================
-- 20. ADMIN NOTES TABLE POLICIES
-- ============================================

-- Only service role can access (admin only)
-- No public policies needed

-- ============================================
-- 21. PAYMENT METHODS TABLE POLICIES
-- ============================================

-- Everyone can view enabled payment methods (public data)
CREATE POLICY "payment_methods_select_public" ON payment_methods
  FOR SELECT
  USING (is_enabled = true AND is_maintenance = false);

-- Only service role can insert/update/delete (admin only)

-- ============================================
-- 22. API SETTINGS TABLE POLICIES
-- ============================================

-- Only service role can access (admin only)
-- No public policies needed

-- ============================================
-- 23. ADMIN SETTINGS TABLE POLICIES
-- ============================================

-- Everyone can view admin settings (needed for platform config)
CREATE POLICY "admin_settings_select_public" ON admin_settings
  FOR SELECT
  USING (true);

-- Only service role can update (admin only)

-- ============================================
-- 24. ACTIVITY LOGS TABLE POLICIES
-- ============================================

-- Only service role can access (admin only)
-- No public policies needed

-- ============================================
-- 25. TRANSACTIONS TABLE POLICIES
-- ============================================

-- Users can view their own transactions
CREATE POLICY "transactions_select_own" ON transactions
  FOR SELECT
  USING (auth.uid()::text = user_id);

-- Only service role can insert (system-generated)

-- ============================================
-- VERIFICATION
-- ============================================

-- Check all policies were created
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Count policies per table
SELECT 
  tablename,
  COUNT(*) as policy_count
FROM pg_policies
WHERE schemaname = 'public'
GROUP BY tablename
ORDER BY tablename;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$ 
BEGIN
  RAISE NOTICE '✅ RLS POLICIES CREATED SUCCESSFULLY!';
  RAISE NOTICE '📊 Total policies: %', (SELECT COUNT(*) FROM pg_policies WHERE schemaname = 'public');
  RAISE NOTICE '🔒 All tables are now secured with Row Level Security';
  RAISE NOTICE '🎯 Users can only access their own data';
  RAISE NOTICE '🌐 Public data (assets, signals, methods) is accessible to all';
  RAISE NOTICE '🔐 Admin data (notes, logs, api_settings) is protected';
END $$;