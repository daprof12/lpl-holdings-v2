-- ============================================================
-- FIX: Update activity_logs table to match the fields used by AuthContext
-- Ensure the columns exist so API functions don't fail.
-- ============================================================

ALTER TABLE public.activity_logs ADD COLUMN IF NOT EXISTS actor_id TEXT;
ALTER TABLE public.activity_logs ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.activity_logs ADD COLUMN IF NOT EXISTS metadata JSONB;
ALTER TABLE public.activity_logs ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

NOTIFY pgrst, 'reload schema';
