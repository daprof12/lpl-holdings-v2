const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Read env vars from LPL-holdings/.env
const envFile = fs.readFileSync('.env', 'utf8');
const supabaseUrl = envFile.match(/VITE_SUPABASE_URL=(.+)/)[1];
const supabaseKey = envFile.match(/VITE_SUPABASE_ANON_KEY=(.+)/)[1];

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.rpc('get_policies');
  if (error) {
    console.error("RPC get_policies failed, let's try direct query if we have service role key.");
  }
}
check();
