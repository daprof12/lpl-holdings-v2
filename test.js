import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function test() {
  const id = `test-login-${Date.now()}`;
  const { data, error } = await supabase.from('activity_logs').insert({
    id,
    actor_id: 'test-user-id',
    action: 'login',
    description: 'User login',
    metadata: { test: true },
    resource_type: 'session',
    created_at: new Date().toISOString(),
    timestamp: Date.now()
  }).select().single();
  
  if (error) {
    console.error("Insert error:", error);
  } else {
    console.log("Insert success:", data);
  }
}

test();
