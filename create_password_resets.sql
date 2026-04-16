-- ============================================================
-- Password Reset Requests Table
-- ============================================================

CREATE TABLE IF NOT EXISTS public.password_resets (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT NOT NULL,
  status        TEXT NOT NULL DEFAULT 'pending', -- pending, code_sent, completed, rejected
  recovery_code TEXT,
  created_at    BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
  updated_at    BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT
);

-- Enable RLS
ALTER TABLE public.password_resets ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow anon inserts" ON public.password_resets;
DROP POLICY IF EXISTS "Allow all reads" ON public.password_resets;
DROP POLICY IF EXISTS "Allow all updates" ON public.password_resets;
DROP POLICY IF EXISTS "Allow all deletes" ON public.password_resets;

-- Policies
CREATE POLICY "Allow anon inserts" ON public.password_resets FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow all reads" ON public.password_resets FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow all updates" ON public.password_resets FOR UPDATE TO anon, authenticated USING (true);
CREATE POLICY "Allow all deletes" ON public.password_resets FOR DELETE TO anon, authenticated USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_pwd_resets_email ON public.password_resets(email);
CREATE INDEX IF NOT EXISTS idx_pwd_resets_status ON public.password_resets(status);
CREATE INDEX IF NOT EXISTS idx_pwd_resets_created ON public.password_resets(created_at DESC);

NOTIFY pgrst, 'reload schema';
