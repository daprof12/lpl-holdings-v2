-- ============================================
-- CREATE SUPPORT TICKETS + TICKET MESSAGES TABLES
-- ============================================

-- 1. Create support_tickets table
CREATE TABLE IF NOT EXISTS support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- User info (denormalized for admin view)
  user_email TEXT,
  user_name TEXT,
  
  -- Ticket Details
  subject TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('account', 'deposit', 'withdrawal', 'trading', 'kyc', 'technical', 'other')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  
  -- Status
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'pending', 'in_progress', 'waiting_user', 'waiting_admin', 'resolved', 'closed')),
  
  -- Assignment
  assigned_to UUID,
  assigned_at BIGINT,
  
  -- Resolution
  resolved_at BIGINT,
  resolved_by UUID,
  resolution_notes TEXT,
  
  -- Metadata
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_support_tickets_category ON support_tickets(category);
CREATE INDEX IF NOT EXISTS idx_support_tickets_priority ON support_tickets(priority);
CREATE INDEX IF NOT EXISTS idx_support_tickets_assigned_to ON support_tickets(assigned_to);
CREATE INDEX IF NOT EXISTS idx_support_tickets_created_at ON support_tickets(created_at DESC);

-- 2. Create ticket_messages table
CREATE TABLE IF NOT EXISTS ticket_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
  
  -- Sender
  sender_type TEXT NOT NULL CHECK (sender_type IN ('user', 'admin')),
  sender_id UUID NOT NULL,
  sender_name TEXT NOT NULL,
  
  -- Message
  message TEXT NOT NULL,
  
  -- Attachments
  attachments JSONB DEFAULT '[]'::jsonb,
  
  -- Status
  is_internal BOOLEAN DEFAULT false,
  is_read BOOLEAN DEFAULT false,
  read_at BIGINT,
  
  -- Metadata
  created_at BIGINT NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_ticket_messages_ticket_id ON ticket_messages(ticket_id);
CREATE INDEX IF NOT EXISTS idx_ticket_messages_sender_type ON ticket_messages(sender_type);
CREATE INDEX IF NOT EXISTS idx_ticket_messages_created_at ON ticket_messages(created_at DESC);

-- 3. Disable RLS
ALTER TABLE support_tickets DISABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_messages DISABLE ROW LEVEL SECURITY;

-- 4. Verify
SELECT 'support_tickets' as table_name, count(*) as columns 
FROM information_schema.columns WHERE table_name = 'support_tickets'
UNION ALL
SELECT 'ticket_messages', count(*) 
FROM information_schema.columns WHERE table_name = 'ticket_messages';
