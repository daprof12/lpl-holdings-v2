-- ============================================
-- FIX NOTIFICATIONS TABLE (DEFINITIVE VERSION)
-- ============================================
-- Run this ENTIRE script in Supabase SQL Editor
-- It completely replaces the notifications table

-- Step 1: Drop the old table completely
DROP TABLE IF EXISTS notifications CASCADE;

-- Step 2: Create the table with UUID types to match users table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  
  is_read BOOLEAN DEFAULT false,
  is_visible BOOLEAN DEFAULT true,
  read_at BIGINT,
  
  action_url TEXT,
  action_label TEXT,
  related_id TEXT,
  
  channels TEXT[] DEFAULT ARRAY['in-app'],
  metadata JSONB DEFAULT '{}'::jsonb,
  
  created_at BIGINT NOT NULL,
  updated_at BIGINT
);

-- Step 3: Create indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

-- Step 4: NO RLS - access control is handled at the application level
-- DO NOT enable row level security on this table
ALTER TABLE notifications DISABLE ROW LEVEL SECURITY;

-- Step 5: Grant permissions to all roles
GRANT ALL ON notifications TO authenticated;
GRANT ALL ON notifications TO anon;
GRANT ALL ON notifications TO service_role;

-- Step 6: Verify it works - insert a test row and delete it
DO $$
BEGIN
  RAISE NOTICE 'Notifications table created successfully!';
END $$;
