-- ============================================================
-- FIX: Add payment_method column to transactions table
-- ============================================================

-- If payment_method wasn't on the transactions table, add it so the UI knows if it was bank vs crypto
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS payment_method text;

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';
