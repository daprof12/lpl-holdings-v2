-- COMPREHENSIVE INVESTMENT SYSTEM SEED SCRIPT
-- This script fixes missing columns and seeds Offers, History, and Sell Requests

-- 1. FIX INVESTMENT_OFFERS TABLE
ALTER TABLE investment_offers ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE investment_offers ADD COLUMN IF NOT EXISTS yield_tier TEXT DEFAULT 'average_yield';
ALTER TABLE investment_offers ADD COLUMN IF NOT EXISTS asset_symbol TEXT;
ALTER TABLE investment_offers ADD COLUMN IF NOT EXISTS exporter TEXT; -- Keeping legacy for compatibility
ALTER TABLE investment_offers ADD COLUMN IF NOT EXISTS exchanger TEXT;
ALTER TABLE investment_offers ADD COLUMN IF NOT EXISTS market_price DECIMAL(20, 8);
ALTER TABLE investment_offers ADD COLUMN IF NOT EXISTS expected_return DECIMAL(10, 4);
ALTER TABLE investment_offers ADD COLUMN IF NOT EXISTS duration_days INTEGER;
ALTER TABLE investment_offers ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE investment_offers ADD COLUMN IF NOT EXISTS price_per_unit DECIMAL(20, 2);
ALTER TABLE investment_offers ADD COLUMN IF NOT EXISTS min_investment DECIMAL(20, 2);
ALTER TABLE investment_offers ADD COLUMN IF NOT EXISTS max_investment DECIMAL(20, 2);

-- 2. FIX USER_INVESTMENTS TABLE
ALTER TABLE user_investments ADD COLUMN IF NOT EXISTS offer_logo TEXT;
ALTER TABLE user_investments ADD COLUMN IF NOT EXISTS amount DECIMAL(20, 2);
ALTER TABLE user_investments ADD COLUMN IF NOT EXISTS maturity_date BIGINT;
ALTER TABLE user_investments ADD COLUMN IF NOT EXISTS expected_return DECIMAL(10, 4);
ALTER TABLE user_investments ADD COLUMN IF NOT EXISTS show_value_and_date BOOLEAN DEFAULT false;

-- 3. SEED INVESTMENT OFFERS
INSERT INTO investment_offers (
  id, name, logo_url, type, exchanger, category, description, price_per_unit,
  total_units, available_units, min_investment, max_investment,
  expected_return, yield_tier, duration_days, is_active,
  asset_symbol, market_price, created_at, updated_at
) VALUES 
(
  '55555555-5555-4555-a555-555555555555',
  'SpaceX Pre-IPO Series K',
  'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=200',
  'IPO',
  'Private Equity',
  'Aerospace',
  'Early access to SpaceX pre-IPO shares. High growth potential in the private space exploration sector.',
  75.50, 100000, 85000, 10.00, 5000.00,
  25.50, 'ultra_high_yield', 365, true,
  NULL, NULL, extract(epoch from now())::bigint * 1000, extract(epoch from now())::bigint * 1000
),
(
  '66666666-6666-4666-a666-666666666666',
  'Global Tech Algorithmic ECN',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=200',
  'ECN',
  'NASDAQ / Binance',
  'Technology',
  'High-frequency trading fund targeting top-tier tech liquidity pools.',
  120.00, 50000, 42000, 5.00, 1000.00,
  18.20, 'high_yield', 180, true,
  'XLK', 165.40, extract(epoch from now())::bigint * 1000, extract(epoch from now())::bigint * 1000
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  exchanger = EXCLUDED.exchanger,
  expected_return = EXCLUDED.expected_return,
  price_per_unit = EXCLUDED.price_per_unit;

-- 4. SEED USER INVESTMENTS (History)
-- Uses a subquery to find a valid user if usr_demo001 doesn't exist as a UUID
DO $$
DECLARE
  target_user_id UUID;
  target_offer_id UUID := '55555555-5555-4555-a555-555555555555';
  inv_id UUID := '77777777-7777-4777-a777-777777777777';
BEGIN
  -- Try to get the first available user
  SELECT id INTO target_user_id FROM auth.users LIMIT 1;
  
  IF target_user_id IS NOT NULL THEN
    -- Seed User Investment
    INSERT INTO user_investments (
      id, user_id, offer_id, offer_name, offer_logo, offer_type,
      units, purchase_price, amount, current_value, 
      expected_return, maturity_date, status, show_value_and_date,
      created_at, updated_at
    ) VALUES 
    (
      inv_id,
      target_user_id,
      target_offer_id,
      'SpaceX Pre-IPO Series K',
      'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=200',
      'IPO',
      100, 75.50, 7550.00, 9437.50,
      25.50, (extract(epoch from (now() + interval '200 days')) * 1000)::bigint,
      'in-progress', true,
      (extract(epoch from (now() - interval '100 days')) * 1000)::bigint,
      extract(epoch from now())::bigint * 1000
    ) ON CONFLICT (id) DO NOTHING;

    -- Seed Sell Request
    INSERT INTO sell_requests (
      id, user_id, investment_id, offer_name, offer_logo, offer_type,
      units, current_price, total_amount, payment_wallet, 
      status, created_at, updated_at
    ) VALUES 
    (
      '88888888-8888-4888-a888-888888888888',
      target_user_id,
      inv_id,
      'SpaceX Pre-IPO Series K',
      'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=200',
      'IPO',
      50, 94.37, 4718.50, 'wallet',
      'pending',
      extract(epoch from now())::bigint * 1000,
      extract(epoch from now())::bigint * 1000
    ) ON CONFLICT (id) DO NOTHING;
  END IF;
END $$;
