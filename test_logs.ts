import { supabase } from './utils/supabase/client';
async function test() {
  const { data: cols } = await supabase.rpc('get_table_columns_not_real_rpc').catch(() => null);
  // Actually let's just query 1 row
  const { data: logs, error } = await supabase.from('activity_logs').select('*').limit(1);
  console.log("logs error:", error);
  console.log("logs data:", logs);
}
test();
