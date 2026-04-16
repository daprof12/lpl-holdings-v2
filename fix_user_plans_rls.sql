-- Drop existing strict policies
DROP POLICY IF EXISTS "Users can view own subscriptions" ON public.user_plans;
DROP POLICY IF EXISTS "Admin can view all subscriptions" ON public.user_plans;
DROP POLICY IF EXISTS "Admin can insert subscriptions" ON public.user_plans;
DROP POLICY IF EXISTS "Admin can update subscriptions" ON public.user_plans;
DROP POLICY IF EXISTS "Admin can delete subscriptions" ON public.user_plans;

-- Create open policies to allow the frontend application to manage user plans
-- since the platform uses custom authentication instead of native Supabase Auth
CREATE POLICY "Allow anonymous read" ON public.user_plans FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert" ON public.user_plans FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous update" ON public.user_plans FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete" ON public.user_plans FOR DELETE USING (true);
