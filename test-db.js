import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const file = fs.readFileSync('./utils/supabase/client.ts', 'utf8');
const urlMatch = file.match(/export const serverUrl = '([^']+)'/);
const keyMatch = file.match(/export const publicAnonKey = '([^']+)'/);

const supabase = createClient(urlMatch[1], keyMatch[1]);
async function run() {
  const { data, error } = await supabase.from('users').select('id, role').eq('id', 'bd660bcf-3963-40b8-8e3a-dbe312bdd55b');
  console.log(data, error);
}
run();
