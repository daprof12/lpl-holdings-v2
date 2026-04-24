import { createClient } from '@supabase/supabase-js';

const projectId = "jxoduiuezcpdzmmlydtf";
const publicAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4b2R1aXVlemNwZHptbWx5ZHRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NDIxNzEsImV4cCI6MjA5MTMxODE3MX0.4u8vWodo7vpGmk75vDWhYRTAiBq4mnNyWakp7zSAoH8";

const supabase = createClient(`https://${projectId}.supabase.co`, publicAnonKey);
async function run() {
  const { error } = await supabase.from('users').delete().eq('id', 'bd660bcf-3963-40b8-8e3a-dbe312bdd55b');
  console.log('Delete error:', JSON.stringify(error, null, 2));
}
run();
