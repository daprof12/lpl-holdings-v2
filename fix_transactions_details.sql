-- ============================================================
-- FIX: Add details, wallet_type, and admin_notes columns to transactions
-- These are needed to store withdrawal-specific info (bank details,
-- PayPal email, wallet address, etc.) so admins can see them.
-- ============================================================

ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS details jsonb DEFAULT '{}';
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS wallet_type text DEFAULT 'live';
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS admin_notes text;
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS network text;

-- Refresh the schema cache so Supabase API picks up the new columns immediately
NOTIFY pgrst, 'reload schema';
