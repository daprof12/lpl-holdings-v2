-- ============================================================
-- FIX: Add missing columns to transactions and deposits
-- ============================================================

-- Add currency, reference_id, and description to transactions table
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS currency text DEFAULT 'USD';
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS reference_id uuid;
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS description text;

-- Add currency to deposits and withdrawals (for consistency, if missing)
ALTER TABLE public.deposits ADD COLUMN IF NOT EXISTS currency text DEFAULT 'USD';
ALTER TABLE public.withdrawals ADD COLUMN IF NOT EXISTS currency text DEFAULT 'USD';

-- Refresh the schema cache so Supabase API picks up the new columns immediately
NOTIFY pgrst, 'reload schema';
