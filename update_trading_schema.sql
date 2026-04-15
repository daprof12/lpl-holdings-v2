-- =======================================================
-- MIGRATION: Update Trading Schema for side and type
-- =======================================================

-- IMPORTANT: Drop any existing constraints on the type column
ALTER TABLE public.positions DROP CONSTRAINT IF EXISTS positions_type_check;
ALTER TABLE public.pending_orders DROP CONSTRAINT IF EXISTS pending_orders_type_check;
ALTER TABLE public.trade_history DROP CONSTRAINT IF EXISTS trade_history_type_check;

-- 1. UPDATE POSITIONS TABLE
-- Add new columns if they do not exist
ALTER TABLE public.positions 
ADD COLUMN IF NOT EXISTS asset_name text,
ADD COLUMN IF NOT EXISTS asset_category text,
ADD COLUMN IF NOT EXISTS side text,
ADD COLUMN IF NOT EXISTS type text;

-- Migrate data from old 'type' column to 'side' and set default 'type'
-- Assuming old `type` was 'buy' or 'sell'
UPDATE public.positions 
SET 
  side = 
    CASE 
      WHEN type = 'buy' OR type = 'sell' THEN type 
      ELSE 'buy' 
    END,
  type = 'market',
  asset_name = symbol,
  asset_category = 'Forex'
WHERE side IS NULL;

-- 2. UPDATE PENDING_ORDERS TABLE
ALTER TABLE public.pending_orders 
ADD COLUMN IF NOT EXISTS asset_name text,
ADD COLUMN IF NOT EXISTS asset_category text,
ADD COLUMN IF NOT EXISTS side text,
ADD COLUMN IF NOT EXISTS type text;

-- Migrate data for pending_orders
UPDATE public.pending_orders 
SET 
  side = 
    CASE 
      WHEN type = 'buy' OR type = 'sell' THEN type 
      ELSE 'buy' 
    END,
  type = 'limit',
  asset_name = symbol,
  asset_category = 'Forex'
WHERE side IS NULL;

-- 3. UPDATE TRADE_HISTORY TABLE
ALTER TABLE public.trade_history 
ADD COLUMN IF NOT EXISTS asset_name text,
ADD COLUMN IF NOT EXISTS asset_category text,
ADD COLUMN IF NOT EXISTS side text,
ADD COLUMN IF NOT EXISTS type text;

-- Migrate data for trade_history
UPDATE public.trade_history 
SET 
  side = 
    CASE 
      WHEN type = 'buy' OR type = 'sell' THEN type 
      ELSE 'buy' 
    END,
  type = 'market',
  asset_name = symbol,
  asset_category = 'Forex'
WHERE side IS NULL;
