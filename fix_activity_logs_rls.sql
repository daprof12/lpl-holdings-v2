-- ============================================================
-- FIX: Ensure activity_logs table is properly set up
-- for storing session/login/logout history
-- id: UUID (auto-generated)
-- created_at: BIGINT (Unix ms)
-- actor_type: TEXT NOT NULL (e.g. 'user', 'admin')
-- resource: TEXT NOT NULL
-- Run this in Supabase SQL Editor
-- ============================================================

-- 1. Create the table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id      TEXT,
  actor_type    TEXT NOT NULL DEFAULT 'user',
  action        TEXT NOT NULL,
  description   TEXT,
  metadata      JSONB DEFAULT '{}',
  resource      TEXT NOT NULL DEFAULT 'unknown',
  resource_type TEXT,
  created_at    BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT
);

-- 2. Add any missing columns (safe to run even if they already exist)
ALTER TABLE public.activity_logs ADD COLUMN IF NOT EXISTS actor_id      TEXT;
ALTER TABLE public.activity_logs ADD COLUMN IF NOT EXISTS actor_type    TEXT NOT NULL DEFAULT 'user';
ALTER TABLE public.activity_logs ADD COLUMN IF NOT EXISTS description   TEXT;
ALTER TABLE public.activity_logs ADD COLUMN IF NOT EXISTS metadata      JSONB DEFAULT '{}';
ALTER TABLE public.activity_logs ADD COLUMN IF NOT EXISTS resource      TEXT NOT NULL DEFAULT 'unknown';
ALTER TABLE public.activity_logs ADD COLUMN IF NOT EXISTS resource_type TEXT;
ALTER TABLE public.activity_logs ADD COLUMN IF NOT EXISTS created_at    BIGINT;

-- 3. Ensure id column has gen_random_uuid() as default
ALTER TABLE public.activity_logs
  ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- 4. Ensure actor_type has a default so existing rows without it don't break
ALTER TABLE public.activity_logs
  ALTER COLUMN actor_type SET DEFAULT 'user';

-- 5. Ensure resource has a default so existing rows without it don't break
ALTER TABLE public.activity_logs
  ALTER COLUMN resource SET DEFAULT 'unknown';

-- 6. Enable Row Level Security
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- 7. Drop any conflicting policies first
DROP POLICY IF EXISTS "Allow all inserts"  ON public.activity_logs;
DROP POLICY IF EXISTS "Allow anon inserts" ON public.activity_logs;
DROP POLICY IF EXISTS "Allow all reads"    ON public.activity_logs;
DROP POLICY IF EXISTS "Allow anon reads"   ON public.activity_logs;
DROP POLICY IF EXISTS "Allow all deletes"  ON public.activity_logs;

-- 8. Allow anyone (including anon) to INSERT
--    (login happens before the user has an authenticated session)
CREATE POLICY "Allow anon inserts"
  ON public.activity_logs
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 9. Allow anyone to SELECT (admin reads all sessions)
CREATE POLICY "Allow anon reads"
  ON public.activity_logs
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 10. Allow anyone to DELETE (admin can remove session rows)
CREATE POLICY "Allow all deletes"
  ON public.activity_logs
  FOR DELETE
  TO anon, authenticated
  USING (true);

-- 11. Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_activity_logs_action     ON public.activity_logs(action);
CREATE INDEX IF NOT EXISTS idx_activity_logs_actor      ON public.activity_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_actor_type ON public.activity_logs(actor_type);
CREATE INDEX IF NOT EXISTS idx_activity_logs_resource   ON public.activity_logs(resource);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created    ON public.activity_logs(created_at DESC);

-- 12. Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema';
