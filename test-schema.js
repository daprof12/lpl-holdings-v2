import { createClient } from '@supabase/supabase-js';

const projectId = "jxoduiuezcpdzmmlydtf";
const publicAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4b2R1aXVlemNwZHptbWx5ZHRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NDIxNzEsImV4cCI6MjA5MTMxODE3MX0.4u8vWodo7vpGmk75vDWhYRTAiBq4mnNyWakp7zSAoH8";

const supabase = createClient(`https://${projectId}.supabase.co`, publicAnonKey);
async function run() {
  const { data, error } = await supabase.from('users').select('*').limit(1);
  console.log(Object.keys(data[0] || {}));
}
run();
