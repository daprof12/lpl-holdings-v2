-- ============================================================
-- OVERRIDE: Disable RLS for transaction-related tables
-- Recommended if using custom auth (where auth.uid() doesn't match)
-- ============================================================

ALTER TABLE public.deposits DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.withdrawals DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions DISABLE ROW LEVEL SECURITY;

-- If you still want RLS enabled, run these commands instead:
-- ALTER TABLE public.deposits ENABLE ROW LEVEL SECURITY;
-- DROP POLICY IF EXISTS "allow_all_deposits" ON public.deposits;
-- CREATE POLICY "allow_all_deposits" ON public.deposits FOR ALL USING (true) WITH CHECK (true);

-- Refresh schema cache
NOTIFY pgrst, 'reload schema';
