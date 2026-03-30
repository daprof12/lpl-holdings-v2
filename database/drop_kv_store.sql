-- ============================================
-- DROP OLD KV STORE
-- ============================================
-- Run this in Supabase SQL Editor to remove the old KV store
-- IMPORTANT: Only run this AFTER confirming the new tables are working

-- Drop the KV store table and all its indexes
DROP TABLE IF EXISTS kv_store_5d4be467 CASCADE;

-- Drop any remaining indexes (CASCADE should handle this, but just in case)
DROP INDEX IF EXISTS idx_kv_store_5d4be467_key;
DROP INDEX IF EXISTS idx_kv_store_5d4be467_created_at;

-- Verify the drop was successful
-- Run this query to confirm the table no longer exists:
-- SELECT tablename FROM pg_tables WHERE tablename = 'kv_store_5d4be467';
-- (Should return no rows)

-- ============================================
-- CLEANUP COMPLETE!
-- ============================================
