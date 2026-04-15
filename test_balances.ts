import { supabase } from './utils/supabase/client';

async function test() {
  const { data: iw } = await supabase.from('investment_wallets').select('*').limit(5);
  console.log("investment_wallets:", JSON.stringify(iw, null, 2));
  
  const { data: users } = await supabase.from('users').select('id, portfolio_balance, investment_balances').limit(5);
  console.log("users:", JSON.stringify(users, null, 2));
  
  const { data: cols } = await supabase.rpc('get_table_columns_not_real_rpc').catch(() => null);
}

test();
