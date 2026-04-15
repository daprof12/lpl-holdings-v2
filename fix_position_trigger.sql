-- =======================================================
-- FIX: positions -> trade_history sync trigger
-- Maintains current table structure (side + type separate)
-- =======================================================

-- 1. Ensure positions table has all needed columns (non-destructive)
ALTER TABLE public.positions ADD COLUMN IF NOT EXISTS side text;
ALTER TABLE public.positions ADD COLUMN IF NOT EXISTS order_type text;
ALTER TABLE public.positions ADD COLUMN IF NOT EXISTS asset_name text;
ALTER TABLE public.positions ADD COLUMN IF NOT EXISTS asset_category text;

-- 2. Ensure trade_history table has all needed columns (non-destructive)
ALTER TABLE public.trade_history ADD COLUMN IF NOT EXISTS side text;
ALTER TABLE public.trade_history ADD COLUMN IF NOT EXISTS order_type text;
ALTER TABLE public.trade_history ADD COLUMN IF NOT EXISTS asset_name text;
ALTER TABLE public.trade_history ADD COLUMN IF NOT EXISTS asset_category text;

-- 3. Drop old trigger and function
DROP TRIGGER IF EXISTS on_position_closed ON public.positions;
DROP FUNCTION IF EXISTS sync_position_to_history();

-- 4. Recreate the trigger function with correct column mapping
CREATE OR REPLACE FUNCTION sync_position_to_history()
RETURNS TRIGGER AS $$
DECLARE
    v_now_ms BIGINT;
    v_side   TEXT;
    v_otype  TEXT;
BEGIN
    -- Only fire when a position transitions from open -> closed
    IF NEW.status = 'closed' AND OLD.status != 'closed' THEN
        v_now_ms := (extract(epoch from now()) * 1000)::BIGINT;

        -- Resolve side: prefer explicit side column, fall back to legacy type column
        v_side := CASE
            WHEN NEW.side IS NOT NULL AND NEW.side IN ('buy', 'sell') THEN NEW.side
            WHEN NEW.type IS NOT NULL AND NEW.type IN ('buy', 'sell') THEN NEW.type
            ELSE 'buy'
        END;

        -- Resolve order type: prefer order_type column, fall back to type
        v_otype := CASE
            WHEN NEW.order_type IS NOT NULL THEN NEW.order_type
            WHEN NEW.type IS NOT NULL AND NEW.type NOT IN ('buy', 'sell') THEN NEW.type
            ELSE 'market'
        END;

        INSERT INTO public.trade_history (
            id,
            user_id,
            symbol,
            asset_name,
            asset_category,
            side,
            order_type,
            type,        -- kept for backward compat, stores order type
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
            v_side,
            v_otype,
            v_otype,    -- mirror into legacy type column
            NEW.entry_price,
            NEW.exit_price,
            COALESCE(NEW.units, NEW.amount, NEW.volume),
            COALESCE(NEW.profit, 0),
            CASE
                WHEN COALESCE(OLD.entry_price, 0) > 0 AND COALESCE(OLD.units, OLD.amount, OLD.volume, 0) > 0
                THEN (COALESCE(NEW.profit, 0) / (OLD.entry_price * COALESCE(OLD.units, OLD.amount, OLD.volume))) * 100
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

-- 5. Re-attach trigger
CREATE TRIGGER on_position_closed
    AFTER UPDATE ON public.positions
    FOR EACH ROW
    EXECUTE FUNCTION sync_position_to_history();

-- 6. Reload schema cache
NOTIFY pgrst, 'reload schema';
