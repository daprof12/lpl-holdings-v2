import { createClient } from '@supabase/supabase-js';

const projectId = "jxoduiuezcpdzmmlydtf";
const publicAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4b2R1aXVlemNwZHptbWx5ZHRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NDIxNzEsImV4cCI6MjA5MTMxODE3MX0.4u8vWodo7vpGmk75vDWhYRTAiBq4mnNyWakp7zSAoH8";
const supabase = createClient(`https://${projectId}.supabase.co`, publicAnonKey);

async function run() {
  const { data: users } = await supabase.from('users').select('id, email, balance, liveBalance:balance').limit(3);
  for (const u of users) {
     const { data: ta } = await supabase.from('trading_accounts').select('balance, equity, margin').eq('user_id', u.id).single();
     console.log(u.email, 'User Bal:', u.balance, 'TradingAcc Bal:', ta?.balance);
  }
}
run();
