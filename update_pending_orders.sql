-- ============================================================
-- UPDATE: pending_orders table schema
-- Add entry_price, current_price, order_type, side, units
-- Also relax NOT NULL on legacy 'type' column
-- ============================================================

-- Add new canonical pricing columns
ALTER TABLE public.pending_orders ADD COLUMN IF NOT EXISTS entry_price numeric;
ALTER TABLE public.pending_orders ADD COLUMN IF NOT EXISTS current_price numeric;

-- Populate entry_price from existing price column for all existing rows
UPDATE public.pending_orders SET entry_price = price WHERE entry_price IS NULL AND price IS NOT NULL;
UPDATE public.pending_orders SET current_price = price WHERE current_price IS NULL AND price IS NOT NULL;

-- Add side and order_type columns if missing
ALTER TABLE public.pending_orders ADD COLUMN IF NOT EXISTS side text;
ALTER TABLE public.pending_orders ADD COLUMN IF NOT EXISTS order_type text DEFAULT 'limit';
ALTER TABLE public.pending_orders ADD COLUMN IF NOT EXISTS asset_name text;
ALTER TABLE public.pending_orders ADD COLUMN IF NOT EXISTS asset_category text DEFAULT 'Forex';
ALTER TABLE public.pending_orders ADD COLUMN IF NOT EXISTS units numeric;

-- Relax the NOT NULL on the legacy 'type' column and set a default
-- so it never blocks inserts even if the app forgets to send it
ALTER TABLE public.pending_orders ALTER COLUMN type SET DEFAULT 'limit';
UPDATE public.pending_orders SET type = 'limit' WHERE type IS NULL;

-- Refresh schema cache
NOTIFY pgrst, 'reload schema';
