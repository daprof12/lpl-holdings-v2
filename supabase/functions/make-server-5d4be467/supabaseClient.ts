// ============================================
// SUPABASE CLIENT INITIALIZATION
// ============================================
// This creates a Supabase client for server-side database operations

import { createClient } from 'jsr:@supabase/supabase-js@2';

// Create Supabase client with service role key for full access
export const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export default supabase;
