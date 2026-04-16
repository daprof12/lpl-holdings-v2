-- Create account_tiers table
CREATE TABLE IF NOT EXISTS public.account_tiers (
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

ALTER TABLE public.account_tiers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous read" ON public.account_tiers FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert" ON public.account_tiers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous update" ON public.account_tiers FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete" ON public.account_tiers FOR DELETE USING (true);

-- Create alerts table
CREATE TABLE IF NOT EXISTS public.alerts (
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

ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous read" ON public.alerts FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert" ON public.alerts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous update" ON public.alerts FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete" ON public.alerts FOR DELETE USING (true);
