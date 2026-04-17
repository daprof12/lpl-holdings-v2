-- ============================================
-- FIX SYSTEM_MEMOS TABLE (Notifications)
-- ============================================
-- The notifications API now uses 'system_memos' table
-- This script fixes the RLS blocking issue

-- Step 1: Drop ALL policies on system_memos
DO $$ 
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN 
        SELECT policyname FROM pg_policies WHERE tablename = 'system_memos'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON system_memos', pol.policyname);
    END LOOP;
END $$;

-- Step 2: Disable RLS entirely (app handles authorization)
ALTER TABLE system_memos DISABLE ROW LEVEL SECURITY;

-- Step 3: Grant full permissions
GRANT ALL ON system_memos TO authenticated;
GRANT ALL ON system_memos TO anon;
GRANT ALL ON system_memos TO service_role;

-- Step 4: Verify existing columns match what the API expects
-- The API sends: user_id, type, title, message, channels, is_visible, 
--                is_read, read_at, related_id, metadata, created_at, updated_at
-- Add any missing columns if needed:
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='system_memos' AND column_name='is_visible') THEN
        ALTER TABLE system_memos ADD COLUMN is_visible BOOLEAN DEFAULT true;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='system_memos' AND column_name='is_read') THEN
        ALTER TABLE system_memos ADD COLUMN is_read BOOLEAN DEFAULT false;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='system_memos' AND column_name='read_at') THEN
        ALTER TABLE system_memos ADD COLUMN read_at BIGINT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='system_memos' AND column_name='channels') THEN
        ALTER TABLE system_memos ADD COLUMN channels TEXT[] DEFAULT ARRAY['in-app'];
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='system_memos' AND column_name='related_id') THEN
        ALTER TABLE system_memos ADD COLUMN related_id TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='system_memos' AND column_name='metadata') THEN
        ALTER TABLE system_memos ADD COLUMN metadata JSONB DEFAULT '{}'::jsonb;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='system_memos' AND column_name='action_url') THEN
        ALTER TABLE system_memos ADD COLUMN action_url TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='system_memos' AND column_name='action_label') THEN
        ALTER TABLE system_memos ADD COLUMN action_label TEXT;
    END IF;
END $$;

-- Done! Verify with:
SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'system_memos' ORDER BY ordinal_position;
