import { projectId, publicAnonKey } from './supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-5d4be467`;

/**
 * Migrate localStorage data to Supabase
 * This should be called once when a user logs in
 */
export async function migrateUserDataToSupabase(userId: string) {
  console.log('Starting migration to Supabase for user:', userId);
  
  try {
    // Migrate user preferences (theme, language)
    const theme = localStorage.getItem('theme') || 'light';
    const language = localStorage.getItem('language') || 'en';
    
    await fetch(`${API_BASE}/users/${userId}/preferences`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        theme,
        language,
      }),
    });
    
    console.log('✓ Migrated preferences');

    // Migrate paper trading account
    const paperAccountKey = 'gross_paper_account';
    const paperAccount = localStorage.getItem(paperAccountKey);
    if (paperAccount) {
      const paperData = JSON.parse(paperAccount);
      await fetch(`${API_BASE}/trading/${userId}/paper`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paperData),
      });
      console.log('✓ Migrated paper trading account');
    }

    // Migrate live trading account
    const liveAccountKey = 'gross_live_account';
    const liveAccount = localStorage.getItem(liveAccountKey);
    if (liveAccount) {
      const liveData = JSON.parse(liveAccount);
      await fetch(`${API_BASE}/trading/${userId}/live`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(liveData),
      });
      console.log('✓ Migrated live trading account');
    }

    // Migrate investment balances
    const investmentKey = `investment_balances_${userId}`;
    const investments = localStorage.getItem(investmentKey);
    if (investments) {
      const investmentData = JSON.parse(investments);
      await fetch(`${API_BASE}/investments/${userId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(investmentData),
      });
      console.log('✓ Migrated investment balances');
    }

    console.log('✓ Migration completed successfully');
    return true;
  } catch (error) {
    console.error('Migration failed:', error);
    return false;
  }
}

/**
 * Migrate platform-wide settings (admin only)
 * This includes deposit methods, withdrawal methods, etc.
 */
export async function migratePlatformSettingsToSupabase() {
  console.log('Starting platform settings migration to Supabase');
  
  try {
    // Migrate deposit methods
    const depositMethods = localStorage.getItem('depositMethods');
    if (depositMethods) {
      await fetch(`${API_BASE}/settings/depositMethods`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: depositMethods,
      });
      console.log('✓ Migrated deposit methods');
    }

    // Migrate withdrawal methods
    const withdrawalMethods = localStorage.getItem('withdrawalMethods');
    if (withdrawalMethods) {
      await fetch(`${API_BASE}/settings/withdrawalMethods`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: withdrawalMethods,
      });
      console.log('✓ Migrated withdrawal methods');
    }

    // Migrate platform withdrawal info
    const withdrawalInfo = localStorage.getItem('platformWithdrawalInfo');
    if (withdrawalInfo) {
      await fetch(`${API_BASE}/settings/platformWithdrawalInfo`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: withdrawalInfo,
      });
      console.log('✓ Migrated platform withdrawal info');
    }

    // Migrate trading settings
    const tradingSettings = localStorage.getItem('admin_trading_settings');
    if (tradingSettings) {
      await fetch(`${API_BASE}/settings/tradingSettings`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: tradingSettings,
      });
      console.log('✓ Migrated trading settings');
    }

    // Migrate API config
    const apiConfig = localStorage.getItem('gross_api_config');
    if (apiConfig) {
      await fetch(`${API_BASE}/settings/apiConfig`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: apiConfig,
      });
      console.log('✓ Migrated API config');
    }

    // Migrate custom categories
    const customCategories = localStorage.getItem('gross_custom_categories');
    if (customCategories) {
      await fetch(`${API_BASE}/settings/customCategories`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: customCategories,
      });
      console.log('✓ Migrated custom categories');
    }

    console.log('✓ Platform settings migration completed');
    return true;
  } catch (error) {
    console.error('Platform settings migration failed:', error);
    return false;
  }
}

/**
 * Migrate bulk data (users, trades, signals, etc.)
 */
export async function migrateBulkDataToSupabase() {
  console.log('Starting bulk data migration to Supabase');
  
  const dataTypes = [
    'gross_users',
    'gross_trades',
    'gross_signals',
    'gross_subscriptions',
    'gross_assets',
    'gross_tickets',
    'gross_transactions',
    'kycSubmissions',
    'gross_paper_positions',
    'gross_live_positions',
    'gross_paper_history',
    'gross_live_history',
    'gross_paper_orders',
    'gross_live_orders',
  ];

  try {
    for (const dataType of dataTypes) {
      const data = localStorage.getItem(dataType);
      if (data) {
        await fetch(`${API_BASE}/data/${dataType}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: data,
        });
        console.log(`✓ Migrated ${dataType}`);
      }
    }

    console.log('✓ Bulk data migration completed');
    return true;
  } catch (error) {
    console.error('Bulk data migration failed:', error);
    return false;
  }
}

/**
 * Check if migration has been completed for a user
 */
export function hasMigrated(userId: string): boolean {
  const key = `migrated_to_supabase_${userId}`;
  return localStorage.getItem(key) === 'true';
}

/**
 * Mark migration as completed for a user
 */
export function markMigrationComplete(userId: string) {
  const key = `migrated_to_supabase_${userId}`;
  localStorage.setItem(key, 'true');
}

/**
 * Complete migration flow for a user
 */
export async function runUserMigration(userId: string) {
  if (hasMigrated(userId)) {
    console.log('Migration already completed for this user');
    return true;
  }

  console.log('Running first-time migration for user:', userId);
  
  const success = await migrateUserDataToSupabase(userId);
  
  if (success) {
    markMigrationComplete(userId);
    console.log('Migration completed and marked as done');
  }
  
  return success;
}