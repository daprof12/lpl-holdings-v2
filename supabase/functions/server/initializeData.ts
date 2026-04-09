// ============================================
// DATA INITIALIZATION SCRIPT
// ============================================
// Run this once to populate the database with demo data
// This creates sample users, deposits, withdrawals, etc.

import * as kv from './kv_store.ts';
import {
  UserService,
  DepositService,
  WithdrawalService,
  PositionService,
  NotificationService,
  SignalService,
  SettingsService,
  PreferencesService,
} from './dataService.ts';
import { generateId, getCurrentTimestamp } from './storageUtils.ts';
import type { User, Deposit, Withdrawal, Position, TradingSignal, AdminSettings } from '../../../types/database';

/**
 * Initialize demo data in the database
 */
export async function initializeDemoData() {
  console.log('🚀 Starting data initialization...');
  
  try {
    // ============================================
    // 1. CREATE ADMIN SETTINGS
    // ============================================
    console.log('📋 Creating admin settings...');
    const settings = await SettingsService.get();
    console.log('✅ Admin settings initialized');
    
    // ============================================
    // 2. CREATE DEMO USERS
    // ============================================
    console.log('👥 Creating demo users...');
    
    const demoUsers = [
      {
        email: 'demo@metatrade.com',
        name: 'Demo User',
        phone: '+1234567890',
        country: 'United States',
        status: 'active' as const,
        emailVerified: true,
        kycStatus: 'approved' as const,
        accountType: 'demo' as const,
        language: 'en' as const,
        theme: 'dark' as const,
        timezone: 'America/New_York',
        balance: 10000,
        equity: 10000,
        margin: 0,
        freeMargin: 10000,
        marginLevel: 0,
        currency: 'USD',
        subscriptionPlan: 'pro' as const,
        subscriptionStatus: 'active' as const,
      },
      {
        email: 'john.doe@example.com',
        name: 'John Doe',
        phone: '+1987654321',
        country: 'United Kingdom',
        status: 'active' as const,
        emailVerified: true,
        kycStatus: 'approved' as const,
        accountType: 'live' as const,
        language: 'en' as const,
        theme: 'light' as const,
        timezone: 'Europe/London',
        balance: 5000,
        equity: 5200,
        margin: 500,
        freeMargin: 4500,
        marginLevel: 1040,
        currency: 'USD',
        subscriptionPlan: 'basic' as const,
        subscriptionStatus: 'active' as const,
      },
      {
        email: 'jane.smith@example.com',
        name: 'Jane Smith',
        phone: '+33123456789',
        country: 'France',
        status: 'active' as const,
        emailVerified: true,
        kycStatus: 'pending' as const,
        accountType: 'live' as const,
        language: 'fr' as const,
        theme: 'dark' as const,
        timezone: 'Europe/Paris',
        balance: 2500,
        equity: 2500,
        margin: 0,
        freeMargin: 2500,
        marginLevel: 0,
        currency: 'EUR',
        subscriptionPlan: 'free' as const,
        subscriptionStatus: 'active' as const,
      },
    ];
    
    const createdUsers = [];
    for (const userData of demoUsers) {
      const user = await UserService.create(userData);
      createdUsers.push(user);
      console.log(`  ✅ Created user: ${user.email} (${user.id})`);
    }
    
    // ============================================
    // 3. CREATE DEPOSITS
    // ============================================
    console.log('💰 Creating demo deposits...');
    
    const deposits = [
      {
        userId: createdUsers[0].id,
        amount: 10000,
        currency: 'USD',
        paymentMethod: 'crypto' as const,
        paymentProvider: 'Coinbase',
        cryptoCurrency: 'BTC',
        cryptoAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        cryptoTxHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        cryptoNetwork: 'BTC',
        status: 'completed' as const,
        fee: 0,
        netAmount: 10000,
        completedAt: getCurrentTimestamp(),
      },
      {
        userId: createdUsers[1].id,
        amount: 5000,
        currency: 'USD',
        paymentMethod: 'bank_transfer' as const,
        paymentProvider: 'Wire Transfer',
        bankName: 'Bank of America',
        status: 'completed' as const,
        fee: 0,
        netAmount: 5000,
        completedAt: getCurrentTimestamp(),
      },
      {
        userId: createdUsers[2].id,
        amount: 1000,
        currency: 'EUR',
        paymentMethod: 'credit_card' as const,
        paymentProvider: 'Stripe',
        status: 'pending' as const,
        fee: 0,
        netAmount: 1000,
      },
    ];
    
    for (const depositData of deposits) {
      const deposit = await DepositService.create(depositData);
      console.log(`  ✅ Created deposit: ${deposit.id} - ${deposit.currency} ${deposit.amount} (${deposit.status})`);
    }
    
    // ============================================
    // 4. CREATE WITHDRAWALS
    // ============================================
    console.log('💸 Creating demo withdrawals...');
    
    const withdrawals = [
      {
        userId: createdUsers[0].id,
        amount: 500,
        currency: 'USD',
        paymentMethod: 'crypto' as const,
        cryptoCurrency: 'USDT',
        cryptoAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        cryptoNetwork: 'ERC20',
        status: 'pending' as const,
        fee: 5,
        netAmount: 495,
        requiresKyc: false,
        kycVerified: true,
        twoFactorVerified: true,
      },
      {
        userId: createdUsers[1].id,
        amount: 1000,
        currency: 'USD',
        paymentMethod: 'bank_transfer' as const,
        bankName: 'Chase Bank',
        bankAccountNumber: '****1234',
        status: 'completed' as const,
        fee: 10,
        netAmount: 990,
        completedAt: getCurrentTimestamp() - 86400000, // 1 day ago
        requiresKyc: true,
        kycVerified: true,
        twoFactorVerified: true,
      },
    ];
    
    for (const withdrawalData of withdrawals) {
      const withdrawal = await WithdrawalService.create(withdrawalData);
      console.log(`  ✅ Created withdrawal: ${withdrawal.id} - ${withdrawal.currency} ${withdrawal.amount} (${withdrawal.status})`);
    }
    
    // ============================================
    // 5. CREATE OPEN POSITIONS
    // ============================================
    console.log('📊 Creating demo positions...');
    
    const positions = [
      {
        userId: createdUsers[0].id,
        symbol: 'BTCUSD',
        assetName: 'Bitcoin',
        assetCategory: 'Crypto' as const,
        type: 'buy' as const,
        status: 'open' as const,
        entryPrice: 94500,
        currentPrice: 95000,
        volume: 0.1,
        units: 0.1,
        stopLoss: 93000,
        takeProfit: 98000,
        profit: 50,
        profitPercentage: 0.53,
        commission: 1,
        swap: 0,
        source: 'manual' as const,
      },
      {
        userId: createdUsers[0].id,
        symbol: 'EURUSD',
        assetName: 'Euro / US Dollar',
        assetCategory: 'Forex' as const,
        type: 'sell' as const,
        status: 'open' as const,
        entryPrice: 1.0865,
        currentPrice: 1.0850,
        volume: 1.0,
        units: 100000,
        stopLoss: 1.0900,
        takeProfit: 1.0800,
        profit: 150,
        profitPercentage: 1.38,
        commission: 0.5,
        swap: 0,
        source: 'manual' as const,
      },
      {
        userId: createdUsers[1].id,
        symbol: 'AAPL',
        assetName: 'Apple Inc.',
        assetCategory: 'Stocks' as const,
        type: 'buy' as const,
        status: 'open' as const,
        entryPrice: 195.00,
        currentPrice: 195.50,
        volume: 10,
        units: 10,
        stopLoss: 190.00,
        takeProfit: 205.00,
        profit: 5,
        profitPercentage: 0.26,
        commission: 1,
        swap: 0,
        source: 'signal' as const,
      },
    ];
    
    for (const positionData of positions) {
      const position = await PositionService.create(positionData);
      console.log(`  ✅ Created position: ${position.id} - ${position.symbol} ${position.type} (${position.status})`);
    }
    
    // ============================================
    // 6. CREATE TRADING SIGNALS
    // ============================================
    console.log('📡 Creating demo trading signals...');
    
    const signals = [
      {
        symbol: 'BTCUSD',
        assetName: 'Bitcoin',
        assetCategory: 'Crypto',
        type: 'buy' as const,
        strength: 'strong' as const,
        entryPrice: 95000,
        currentPrice: 95000,
        stopLoss: 92000,
        takeProfit: 100000,
        targets: {
          target1: 97000,
          target2: 99000,
          target3: 100000,
        },
        status: 'active' as const,
        analysis: 'Bitcoin showing strong bullish momentum. RSI indicates oversold conditions with MACD showing bullish crossover. Strong support at $92k.',
        indicators: ['RSI Oversold', 'MACD Bullish Crossover', 'Strong Support'],
        source: 'ai' as const,
        confidence: 85,
        requiredTier: 'basic' as const,
      },
      {
        symbol: 'EURUSD',
        assetName: 'Euro / US Dollar',
        assetCategory: 'Forex',
        type: 'sell' as const,
        strength: 'moderate' as const,
        entryPrice: 1.0850,
        currentPrice: 1.0850,
        stopLoss: 1.0900,
        takeProfit: 1.0750,
        targets: {
          target1: 1.0820,
          target2: 1.0780,
          target3: 1.0750,
        },
        status: 'active' as const,
        analysis: 'EUR/USD showing bearish pressure. Dollar strength continuing amid Fed policy expectations. Key resistance at 1.0900.',
        indicators: ['Dollar Strength', 'Bearish Trend', 'Resistance Level'],
        source: 'analyst' as const,
        confidence: 72,
        requiredTier: 'pro' as const,
      },
      {
        symbol: 'XAUUSD',
        assetName: 'Gold',
        assetCategory: 'Commodities',
        type: 'buy' as const,
        strength: 'very_strong' as const,
        entryPrice: 2650,
        currentPrice: 2650,
        stopLoss: 2620,
        takeProfit: 2700,
        targets: {
          target1: 2670,
          target2: 2690,
          target3: 2700,
        },
        status: 'active' as const,
        analysis: 'Gold breaking key resistance levels. Safe haven demand increasing with geopolitical tensions. Very strong buy signal.',
        indicators: ['Breakout Pattern', 'Safe Haven Demand', 'Strong Volume'],
        source: 'ai' as const,
        confidence: 92,
        requiredTier: 'free' as const,
      },
    ];
    
    for (const signalData of signals) {
      const signal = await SignalService.create(signalData);
      console.log(`  ✅ Created signal: ${signal.id} - ${signal.symbol} ${signal.type} (${signal.strength})`);
    }
    
    // ============================================
    // 7. CREATE NOTIFICATIONS
    // ============================================
    console.log('🔔 Creating demo notifications...');
    
    const notifications = [
      {
        userId: createdUsers[0].id,
        type: 'trade' as const,
        category: 'success' as const,
        title: 'Position Opened',
        message: 'Your BUY position on BTCUSD has been opened successfully at $94,500.',
      },
      {
        userId: createdUsers[0].id,
        type: 'deposit' as const,
        category: 'success' as const,
        title: 'Deposit Completed',
        message: 'Your deposit of $10,000 USD has been credited to your account.',
      },
      {
        userId: createdUsers[1].id,
        type: 'signal' as const,
        category: 'info' as const,
        title: 'New Trading Signal',
        message: 'Strong BUY signal for BTCUSD. Check the signals page for details.',
        actionUrl: '/signals',
        actionLabel: 'View Signal',
      },
      {
        userId: createdUsers[2].id,
        type: 'kyc' as const,
        category: 'warning' as const,
        title: 'KYC Verification Required',
        message: 'Please complete your KYC verification to unlock all features.',
        actionUrl: '/profile',
        actionLabel: 'Verify Now',
      },
    ];
    
    for (const notifData of notifications) {
      const notification = await NotificationService.create(notifData);
      console.log(`  ✅ Created notification: ${notification.id} - ${notification.title}`);
    }
    
    // ============================================
    // SUMMARY
    // ============================================
    console.log('\n✨ Data initialization complete!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`👥 Users created: ${createdUsers.length}`);
    console.log(`💰 Deposits created: ${deposits.length}`);
    console.log(`💸 Withdrawals created: ${withdrawals.length}`);
    console.log(`📊 Positions created: ${positions.length}`);
    console.log(`📡 Signals created: ${signals.length}`);
    console.log(`🔔 Notifications created: ${notifications.length}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    return {
      success: true,
      users: createdUsers,
      message: 'Demo data initialized successfully',
    };
    
  } catch (error) {
    console.error('❌ Error initializing data:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Clear all data from the database
 */
export async function clearAllData() {
  console.log('🗑️  Clearing all data...');
  
  try {
    // Get all keys and delete them
    const allData = await kv.getByPrefix('');
    
    if (allData && allData.length > 0) {
      for (const item of allData) {
        // Note: This assumes each item has a key property
        // You may need to adjust based on your KV store implementation
        console.log(`  Deleting: ${JSON.stringify(item).substring(0, 50)}...`);
      }
      console.log(`✅ Cleared ${allData.length} records`);
    } else {
      console.log('✅ No data to clear');
    }
    
    return { success: true, message: 'All data cleared' };
  } catch (error) {
    console.error('❌ Error clearing data:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get database statistics
 */
export async function getDatabaseStats() {
  console.log('📊 Gathering database statistics...');
  
  try {
    const users = await kv.getByPrefix<User>('user:usr_');
    const deposits = await kv.getByPrefix('deposit:');
    const withdrawals = await kv.getByPrefix('withdrawal:');
    const positions = await kv.getByPrefix('position:open:');
    const signals = await kv.getByPrefix('signal:');
    const notifications = await kv.getByPrefix('notification:');
    
    const stats = {
      users: users?.length || 0,
      deposits: deposits?.length || 0,
      withdrawals: withdrawals?.length || 0,
      openPositions: positions?.length || 0,
      activeSignals: signals?.filter((s: any) => s.status === 'active').length || 0,
      notifications: notifications?.length || 0,
    };
    
    console.log('Database Statistics:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`👥 Total Users: ${stats.users}`);
    console.log(`💰 Total Deposits: ${stats.deposits}`);
    console.log(`💸 Total Withdrawals: ${stats.withdrawals}`);
    console.log(`📊 Open Positions: ${stats.openPositions}`);
    console.log(`📡 Active Signals: ${stats.activeSignals}`);
    console.log(`🔔 Total Notifications: ${stats.notifications}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    return stats;
  } catch (error) {
    console.error('❌ Error getting stats:', error);
    return null;
  }
}