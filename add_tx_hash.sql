ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS transaction_hash text;
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS payment_method text;
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS wallet_type text;
NOTIFY pgrst, 'reload schema';
