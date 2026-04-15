-- =======================================================
-- MIGRATION: Fix pending_orders table and RLS
-- =======================================================

-- 1. Ensure both amount and units columns exist
ALTER TABLE public.pending_orders ADD COLUMN IF NOT EXISTS amount numeric;
ALTER TABLE public.pending_orders ADD COLUMN IF NOT EXISTS units numeric;

-- 2. Drop existing restrictive RLS policies on pending_orders that might cause 42501
DROP POLICY IF EXISTS "Users can insert their own pending orders" ON public.pending_orders;
DROP POLICY IF EXISTS "Users can insert own orders" ON public.pending_orders;
DROP POLICY IF EXISTS "Users can create their own pending orders" ON public.pending_orders;

-- 3. Recreate a highly robust Allow-Insert Policy
CREATE POLICY "Users can insert their own pending orders" 
ON public.pending_orders 
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- 4. Reload PostgREST schema cache to clear the PGRST204 error
NOTIFY pgrst, 'reload schema';
