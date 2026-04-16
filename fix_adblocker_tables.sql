-- Drop old tables if they exist
DROP TABLE IF EXISTS public.alerts CASCADE;
DROP TABLE IF EXISTS public.account_tiers CASCADE;

-- Create member_packages table (to avoid adblocker "subscription" / "tier" / "plan" filters)
CREATE TABLE IF NOT EXISTS public.member_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  amount NUMERIC DEFAULT 0,
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  next_billing TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.member_packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous read" ON public.member_packages FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert" ON public.member_packages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous update" ON public.member_packages FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete" ON public.member_packages FOR DELETE USING (true);

-- Create system_memos table (to avoid adblocker "alerts" / "notifications" filters)
CREATE TABLE IF NOT EXISTS public.system_memos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  read BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.system_memos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous read" ON public.system_memos FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert" ON public.system_memos FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous update" ON public.system_memos FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete" ON public.system_memos FOR DELETE USING (true);

-- Trigger functions for updated_at
DROP TRIGGER IF EXISTS update_member_packages_updated_at ON public.member_packages;
CREATE TRIGGER update_member_packages_updated_at
  BEFORE UPDATE ON public.member_packages
  FOR EACH ROW
  EXECUTE FUNCTION update_modified_column();

DROP TRIGGER IF EXISTS update_system_memos_updated_at ON public.system_memos;
CREATE TRIGGER update_system_memos_updated_at
  BEFORE UPDATE ON public.system_memos
  FOR EACH ROW
  EXECUTE FUNCTION update_modified_column();
