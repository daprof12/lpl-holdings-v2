-- ============================================================
-- FIX: Drop method constraint and add proof column
-- ============================================================

-- 1. Drop the check constraint that is failing for specific string values
ALTER TABLE public.deposits DROP CONSTRAINT IF EXISTS deposits_method_check;
ALTER TABLE public.withdrawals DROP CONSTRAINT IF EXISTS withdrawals_method_check;

-- 2. Add column to store the base64 string of the uploaded transfer proof
ALTER TABLE public.deposits ADD COLUMN IF NOT EXISTS proof_data text;

-- Refresh schema cache
NOTIFY pgrst, 'reload schema';
