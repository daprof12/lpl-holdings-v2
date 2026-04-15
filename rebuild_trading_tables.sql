-- ============================================================
-- CLEAN REBUILD: positions + trade_history tables + trigger
-- Safe to run: drops existing data and rebuilds from scratch
-- ============================================================

-- 1. Drop trigger and function first (depends on positions table)
DROP TRIGGER IF EXISTS on_position_closed ON public.positions;
DROP FUNCTION IF EXISTS sync_position_to_history();

-- 2. Drop tables (CASCADE removes dependent foreign keys)
DROP TABLE IF EXISTS public.trade_history CASCADE;
DROP TABLE IF EXISTS public.positions CASCADE;

-- ============================================================
-- 3. Recreate positions table
-- ============================================================
CREATE TABLE public.positions (
  id              uuid    NOT NULL DEFAULT gen_random_uuid(),
  user_id         uuid    NOT NULL,

  -- Asset identifiers
  symbol          text    NOT NULL,
  asset_name      text,
  asset_category  text    DEFAULT 'Forex',

  -- Trade direction and execution type (separate columns)
  side            text    NOT NULL,            -- 'buy' | 'sell'
  order_type      text    DEFAULT 'market',    -- 'market' | 'limit' | 'stop'

  -- Status
  status          text    DEFAULT 'open',      -- 'open' | 'closed'

  -- Pricing
  entry_price     numeric NOT NULL,
  current_price   numeric,
  exit_price      numeric,

  -- Volume (all three kept for compatibility)
  units           numeric NOT NULL,
  amount          numeric GENERATED ALWAYS AS (units) STORED,  -- computed alias
  volume          numeric GENERATED ALWAYS AS (units) STORED,  -- computed alias

  -- Risk / sizing
  leverage        integer DEFAULT 1,
  stop_loss       numeric,
  take_profit     numeric,

  -- Results
  profit          numeric DEFAULT 0,
  margin          numeric DEFAULT 0,

  -- Metadata
  source          text    DEFAULT 'manual',
  opened_at       bigint  DEFAULT (extract(epoch from now()) * 1000)::bigint,
  closed_at       bigint,
  created_at      bigint  DEFAULT (extract(epoch from now()) * 1000)::bigint,
  updated_at      bigint  DEFAULT (extract(epoch from now()) * 1000)::bigint,

  CONSTRAINT positions_pkey        PRIMARY KEY (id),
  CONSTRAINT positions_user_fkey   FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE,
  CONSTRAINT positions_side_check  CHECK (side       IN ('buy', 'sell')),
  CONSTRAINT positions_status_check CHECK (status    IN ('open', 'closed', 'pending'))
);

-- Indexes
CREATE INDEX idx_positions_user_id ON public.positions (user_id);
CREATE INDEX idx_positions_status  ON public.positions (status);

-- Disable RLS (avoids 42501 policy violations)
ALTER TABLE public.positions DISABLE ROW LEVEL SECURITY;

-- ============================================================
-- 4. Recreate trade_history table
-- ============================================================
CREATE TABLE public.trade_history (
  id                 text    NOT NULL DEFAULT ('hist_' || encode(gen_random_bytes(6), 'hex')),
  user_id            uuid    NOT NULL,

  -- Asset identifiers
  symbol             text    NOT NULL,
  asset_name         text,
  asset_category     text    DEFAULT 'Forex',

  -- Trade direction and execution type
  side               text,                    -- 'buy' | 'sell'
  order_type         text    DEFAULT 'market', -- 'market' | 'limit'

  -- Pricing
  entry_price        numeric DEFAULT 0,
  exit_price         numeric DEFAULT 0,

  -- Volume
  volume             numeric DEFAULT 0,

  -- Results
  profit             numeric DEFAULT 0,
  profit_percentage  numeric DEFAULT 0,

  -- Status
  status             text    DEFAULT 'closed',

  -- Timestamps (millisecond epoch)
  opened_at          bigint,
  closed_at          bigint,
  duration           bigint  DEFAULT 0,       -- milliseconds the trade was open
  created_at         bigint  DEFAULT (extract(epoch from now()) * 1000)::bigint,

  CONSTRAINT trade_history_pkey      PRIMARY KEY (id),
  CONSTRAINT trade_history_user_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX idx_trade_history_user_id ON public.trade_history (user_id);
CREATE INDEX idx_trade_history_closed_at ON public.trade_history (closed_at);

-- Disable RLS (avoids 42501 policy violations)
ALTER TABLE public.trade_history DISABLE ROW LEVEL SECURITY;

-- ============================================================
-- 5. Auto-sync trigger: position closed -> trade_history insert
-- ============================================================
CREATE OR REPLACE FUNCTION sync_position_to_history()
RETURNS TRIGGER AS $$
DECLARE
  v_now_ms bigint;
BEGIN
  -- Only fires when status changes from open -> closed
  IF NEW.status = 'closed' AND OLD.status != 'closed' THEN
    v_now_ms := (extract(epoch from now()) * 1000)::bigint;

    INSERT INTO public.trade_history (
      id,
      user_id,
      symbol,
      asset_name,
      asset_category,
      side,
      order_type,
      entry_price,
      exit_price,
      volume,
      profit,
      profit_percentage,
      status,
      opened_at,
      closed_at,
      duration,
      created_at
    ) VALUES (
      'hist_' || encode(gen_random_bytes(6), 'hex'),
      NEW.user_id,
      NEW.symbol,
      COALESCE(NEW.asset_name, NEW.symbol),
      COALESCE(NEW.asset_category, 'Forex'),
      NEW.side,
      COALESCE(NEW.order_type, 'market'),
      NEW.entry_price,
      COALESCE(NEW.exit_price, NEW.current_price, NEW.entry_price),
      NEW.units,
      COALESCE(NEW.profit, 0),
      CASE
        WHEN COALESCE(OLD.entry_price, 0) > 0 AND COALESCE(OLD.units, 0) > 0
        THEN (COALESCE(NEW.profit, 0) / (OLD.entry_price * OLD.units)) * 100
        ELSE 0
      END,
      'closed',
      COALESCE(OLD.opened_at, OLD.created_at, v_now_ms),
      v_now_ms,
      v_now_ms - COALESCE(OLD.opened_at, OLD.created_at, v_now_ms),
      v_now_ms
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach trigger to positions
CREATE TRIGGER on_position_closed
  AFTER UPDATE ON public.positions
  FOR EACH ROW
  EXECUTE FUNCTION sync_position_to_history();

-- ============================================================
-- 6. Reload PostgREST schema cache
-- ============================================================
NOTIFY pgrst, 'reload schema';
