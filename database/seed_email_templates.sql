-- Create the email_templates table
CREATE TABLE IF NOT EXISTS email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('deposit', 'withdrawal', 'deals', 'subscription', 'promotion', 'general')),
  subject TEXT NOT NULL,
  logo_url TEXT,
  hero_image TEXT,
  hero_title TEXT,
  blocks JSONB DEFAULT '[]'::jsonb,
  footer_text TEXT,
  accent_color TEXT DEFAULT '#E50914',
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

-- Ensure table is accessible by the frontend
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "email_templates_all" ON email_templates;
CREATE POLICY "email_templates_all" ON email_templates FOR ALL USING (true) WITH CHECK (true);

-- Insert sample templates
INSERT INTO email_templates (
  id, name, category, subject, logo_url, hero_image, hero_title, blocks, footer_text, accent_color, created_at, updated_at
) VALUES (
  '11111111-1111-4111-a111-111111111111',
  'Welcome Email',
  'general',
  'Welcome to MetaTrade Pro!',
  '/logo.png',
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1200',
  'Welcome Aboard!',
  '[
    {"id": "block-1", "type": "text", "content": "We are thrilled to have you! Start trading and managing your portfolio with MetaTrade Pro."},
    {"id": "block-2", "type": "button", "content": {"label": "Go to Dashboard", "url": "https://metatrade.pro/dashboard"}}
  ]'::jsonb,
  'Thank you for joining us.',
  '#2563EB',
  extract(epoch from now())::bigint * 1000,
  extract(epoch from now())::bigint * 1000
) ON CONFLICT (id) DO NOTHING;

INSERT INTO email_templates (
  id, name, category, subject, logo_url, hero_image, hero_title, blocks, footer_text, accent_color, created_at, updated_at
) VALUES (
  '22222222-2222-4222-a222-222222222222',
  'Deposit Confirmation',
  'deposit',
  'Your Deposit Was Successful',
  '/logo.png',
  '',
  'Deposit Confirmed',
  '[
    {"id": "block-1", "type": "text", "content": "Your recent deposit of {{amount}} has been successfully processed and credited to your account."},
    {"id": "block-2", "type": "text", "content": "Reference ID: {{referenceId}}"},
    {"id": "block-3", "type": "button", "content": {"label": "View Wallet", "url": "https://metatrade.pro/wallet"}}
  ]'::jsonb,
  'If you have any questions, please contact support.',
  '#059669',
  extract(epoch from now())::bigint * 1000,
  extract(epoch from now())::bigint * 1000
) ON CONFLICT (id) DO NOTHING;

INSERT INTO email_templates (
  id, name, category, subject, logo_url, hero_image, hero_title, blocks, footer_text, accent_color, created_at, updated_at
) VALUES (
  '33333333-3333-4333-a333-333333333333',
  'Withdrawal Request Initiated',
  'withdrawal',
  'Withdrawal Request Received',
  '/logo.png',
  '',
  'Withdrawal Initiated',
  '[
    {"id": "block-1", "type": "text", "content": "We have received your request to withdraw {{amount}} from your account."},
    {"id": "block-2", "type": "text", "content": "Your request is currently being processed by our team. This generally takes 1-3 business days."},
    {"id": "block-3", "type": "button", "content": {"label": "Track Transfer", "url": "https://metatrade.pro/wallet/transactions"}}
  ]'::jsonb,
  'You will receive another email once the transaction is completed.',
  '#D97706',
  extract(epoch from now())::bigint * 1000,
  extract(epoch from now())::bigint * 1000
) ON CONFLICT (id) DO NOTHING;

INSERT INTO email_templates (
  id, name, category, subject, logo_url, hero_image, hero_title, blocks, footer_text, accent_color, created_at, updated_at
) VALUES (
  '44444444-4444-4444-a444-444444444444',
  'Summer Promotion Offer',
  'promotion',
  'Exclusive Summer Deals Inside!',
  '/logo.png',
  'https://images.unsplash.com/photo-1579621970588-a3f5ce599fac?auto=format&fit=crop&q=80&w=1200',
  'Summer Special Offer',
  '[
    {"id": "block-1", "type": "text", "content": "Do not miss out on our summer trading fee discounts! Enjoy 50% off all commissions for the next 30 days."},
    {"id": "block-2", "type": "button", "content": {"label": "Claim Offer Now", "url": "https://metatrade.pro/promotions/summer"}}
  ]'::jsonb,
  'Terms and conditions apply.',
  '#7C3AED',
  extract(epoch from now())::bigint * 1000,
  extract(epoch from now())::bigint * 1000
) ON CONFLICT (id) DO NOTHING;
