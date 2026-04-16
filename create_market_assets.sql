-- Create the market_assets table
CREATE TABLE IF NOT EXISTS market_assets (
  id TEXT PRIMARY KEY,
  
  -- Asset Identification
  symbol TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Crypto', 'Forex', 'Stocks', 'Commodities', 'Indices', 'Funds', 'Futures', 'Bonds', 'Economy', 'Options', 'CFD', 'ETFs')),
  exchange TEXT NOT NULL,
  
  -- Current Market Data
  price DECIMAL(20, 8),
  change_24h DECIMAL(10, 4), -- Percentage
  volume BIGINT,
  
  -- Leverage Settings (stored as JSONB)
  leverage JSONB DEFAULT '{"basic": 10, "standard": 20, "premium": 50}'::jsonb,
  
  -- Trading Configuration
  min_trade_size DECIMAL(20, 8) DEFAULT 0.01,
  max_trade_size DECIMAL(20, 8) DEFAULT 1000,
  tick_size DECIMAL(20, 8) DEFAULT 0.01,
  
  -- Status
  enabled BOOLEAN DEFAULT true,
  
  -- Metadata
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

-- Create necessary indexes for performance
CREATE INDEX IF NOT EXISTS idx_market_assets_symbol ON market_assets(symbol);
CREATE INDEX IF NOT EXISTS idx_market_assets_category ON market_assets(category);
CREATE INDEX IF NOT EXISTS idx_market_assets_exchange ON market_assets(exchange);
CREATE INDEX IF NOT EXISTS idx_market_assets_enabled ON market_assets(enabled);

-- Enable RLS (Row Level Security) if you want to restrict write access
ALTER TABLE market_assets ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active assets
CREATE POLICY "Public can view active assets" 
  ON market_assets FOR SELECT 
  USING (enabled = true);

-- Allow authenticated admins to do everything (you may need to adjust the condition depending on how roles are checked)
-- CREATE POLICY "Admins can manage assets" ON market_assets FOR ALL USING (true);
