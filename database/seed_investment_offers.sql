-- This script seeds the investment_offers table with an IPO and an ECN offer

-- Ensure table structure matches the application's actual used columns
ALTER TABLE investment_offers ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE investment_offers ADD COLUMN IF NOT EXISTS price_per_unit DECIMAL(20, 2);
ALTER TABLE investment_offers ADD COLUMN IF NOT EXISTS expected_return DECIMAL(10, 4);
ALTER TABLE investment_offers ADD COLUMN IF NOT EXISTS duration_days INTEGER;
ALTER TABLE investment_offers ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE investment_offers ADD COLUMN IF NOT EXISTS min_investment DECIMAL(20, 2);
ALTER TABLE investment_offers ADD COLUMN IF NOT EXISTS max_investment DECIMAL(20, 2);

-- Insert demo IPO Offer
INSERT INTO investment_offers (
  id,
  name,
  logo_url,
  type,
  category,
  description,
  price_per_unit,
  total_units,
  available_units,
  min_investment,
  max_investment,
  expected_return,
  duration_days,
  is_active,
  created_at,
  updated_at
) VALUES (
  '55555555-5555-4555-a555-555555555555',
  'SpaceX Series K Pre-IPO',
  'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=200',
  'IPO',
  'Aerospace & Defense',
  'Exclusive early access to SpaceX pre-IPO shares. SpaceX designs, manufactures and launches advanced rockets and spacecraft.',
  75.50,
  100000,
  85000,
  10.00,
  5000.00,
  25.50,
  365,
  true,
  extract(epoch from now())::bigint * 1000,
  extract(epoch from now())::bigint * 1000
) ON CONFLICT (id) DO NOTHING;

-- Insert demo ECN Offer
INSERT INTO investment_offers (
  id,
  name,
  logo_url,
  type,
  category,
  description,
  price_per_unit,
  total_units,
  available_units,
  min_investment,
  max_investment,
  expected_return,
  duration_days,
  is_active,
  created_at,
  updated_at
) VALUES (
  '66666666-6666-4666-a666-666666666666',
  'Global Tech Algorithmic ECN Fund',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=200',
  'ECN',
  'Technology',
  'An Electronic Communication Network fund executing high-frequency trades across top tech sector stocks yielding consistent payouts.',
  120.00,
  50000,
  42000,
  5.00,
  1000.00,
  18.20,
  180,
  true,
  extract(epoch from now())::bigint * 1000,
  extract(epoch from now())::bigint * 1000
) ON CONFLICT (id) DO NOTHING;
