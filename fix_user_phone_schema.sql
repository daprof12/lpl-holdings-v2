-- ============================================================
-- FIX: Missing phone_verified column in users table
-- ============================================================

-- 1. Add the missing phone_verified column if it doesn't exist
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS phone_verified BOOLEAN DEFAULT false;

-- 2. Add missing access control columns if they don't exist
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS has_investment_access BOOLEAN DEFAULT false;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS has_auto_trade_access BOOLEAN DEFAULT false;

-- 3. Verify email_verified also exists
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false;

-- 4. Refresh PostgREST schema cache to make the new columns visible to the API
NOTIFY pgrst, 'reload schema';
