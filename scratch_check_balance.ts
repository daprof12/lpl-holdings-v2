
import { api } from './utils/supabase/api';

async function checkUserBalance() {
  const email = 'nrconstruction_99@yahoo.com';
  console.log(`Checking balance for ${email}...`);
  
  const user = await api.users.getByEmail(email);
  if (!user) {
    console.log('User not found in users table.');
    return;
  }
  
  console.log('User ID:', user.id);
  console.log('Users table balance:', user.balance);
  
  const account = await api.tradingAccounts.getByUserId(user.id);
  if (!account) {
    console.log('Trading account not found in trading_accounts table.');
  } else {
    console.log('Trading accounts table balance:', account.balance);
  }
}

checkUserBalance();
