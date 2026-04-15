-- ============================================================
-- FIX: Relax constraints on payment_methods table (V3)
-- ============================================================

-- Disable RLS on payment_methods so admins can freely edit it from the frontend
ALTER TABLE public.payment_methods DISABLE ROW LEVEL SECURITY;

-- Safely drop user-defined CHECK constraints on type or other columns causing issues
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (
        SELECT constraint_name 
        FROM information_schema.table_constraints 
        WHERE table_name = 'payment_methods' 
          AND constraint_type = 'CHECK'
          AND constraint_name NOT LIKE '%not_null%' -- Skip system constraints
    ) LOOP
        -- Using quote_ident to safely wrap constraint names
        EXECUTE 'ALTER TABLE public.payment_methods DROP CONSTRAINT IF EXISTS ' || quote_ident(r.constraint_name);
    END LOOP;
END $$;

-- Refresh schema cache
NOTIFY pgrst, 'reload schema';
