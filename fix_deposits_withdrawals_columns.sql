-- ============================================================
-- FIX: Ensure deposits and withdrawals have all required
-- admin processing columns (reviewed_by, rejection_reason,
-- processed_at, completed_at, updated_at)
-- Safe to run multiple times (ADD COLUMN IF NOT EXISTS)
-- ============================================================

-- DEPOSITS
ALTER TABLE public.deposits ADD COLUMN IF NOT EXISTS reviewed_by      text;
ALTER TABLE public.deposits ADD COLUMN IF NOT EXISTS rejection_reason  text;
ALTER TABLE public.deposits ADD COLUMN IF NOT EXISTS processed_at      bigint;
ALTER TABLE public.deposits ADD COLUMN IF NOT EXISTS completed_at      bigint;
ALTER TABLE public.deposits ADD COLUMN IF NOT EXISTS updated_at        bigint;
ALTER TABLE public.deposits ADD COLUMN IF NOT EXISTS proof_data        text;   -- proof of payment image/url

-- WITHDRAWALS
ALTER TABLE public.withdrawals ADD COLUMN IF NOT EXISTS reviewed_by      text;
ALTER TABLE public.withdrawals ADD COLUMN IF NOT EXISTS rejection_reason  text;
ALTER TABLE public.withdrawals ADD COLUMN IF NOT EXISTS processed_at      bigint;
ALTER TABLE public.withdrawals ADD COLUMN IF NOT EXISTS completed_at      bigint;
ALTER TABLE public.withdrawals ADD COLUMN IF NOT EXISTS updated_at        bigint;
ALTER TABLE public.withdrawals ADD COLUMN IF NOT EXISTS destination_address text;
ALTER TABLE public.withdrawals ADD COLUMN IF NOT EXISTS wallet_type        text DEFAULT 'live';

-- Reload PostgREST schema cache so new columns are immediately available
NOTIFY pgrst, 'reload schema';
