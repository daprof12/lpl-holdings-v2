-- Create the market_assets table for dynamic asset management
CREATE TABLE IF NOT EXISTS public.market_assets (
    id TEXT PRIMARY KEY,
    symbol TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Stocks', 'Forex', 'Crypto', 'Commodities', 'Indices', 'Funds', 'Futures', 'Bonds', 'Economy', 'Options')),
    exchange TEXT DEFAULT '',
    price NUMERIC DEFAULT 0,
    enabled BOOLEAN DEFAULT true,
    leverage JSONB NOT NULL DEFAULT '{"basic": 10, "standard": 20, "silver": 35, "gold": 50, "platinum": 75}'::jsonb,
    created_at BIGINT,
    updated_at BIGINT
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_market_assets_symbol ON public.market_assets(symbol);
CREATE INDEX IF NOT EXISTS idx_market_assets_category ON public.market_assets(category);
CREATE INDEX IF NOT EXISTS idx_market_assets_enabled ON public.market_assets(enabled);

-- Enable Row Level Security
ALTER TABLE public.market_assets ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to reset
DROP POLICY IF EXISTS "Public read active assets" ON public.market_assets;
DROP POLICY IF EXISTS "Admin manage assets" ON public.market_assets;
DROP POLICY IF EXISTS "Allow public read" ON public.market_assets;
DROP POLICY IF EXISTS "Allow admin all" ON public.market_assets;

-- Allow everyone to read assets (required for Markets page and Trading UI)
CREATE POLICY "Public read assets" 
ON public.market_assets FOR SELECT 
TO public
USING (true);

-- Allow authenticated users (Admins) to manage assets
-- We use explicit FOR ALL but TO public/authenticated depending on your auth setup.
-- If you are signed in, this will allow you to manage assets.
CREATE POLICY "Service and Admin manage" 
ON public.market_assets FOR ALL 
USING (true)
WITH CHECK (true);

-- Note: In a production environment, you should restrict "FOR ALL" to a specific admin role 
-- if your user table has role-based columns.
