// ============================================
// METATRADE PRO SERVER - TABLE-BASED VERSION
// ============================================
// This version uses Supabase tables instead of KV store

import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";

// Import all table-based services
import {
  PositionService,
  NotificationService,
  SignalService,
  TradingAccountService,
  PendingOrderService,
} from "./tableService.ts";

import * as kv from "./kv_store.ts";

import {
  TradeHistoryService,
  SessionService,
  LoginHistoryService,
  PasswordResetService,
  ContactSubmissionService,
  InvestmentWalletService,
  CRMMessageService,
  EmailTemplateService,
  SMTPConfigService,
  UserWithdrawalMethodService,
} from "./allTableServices.ts";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// ============================================
// HEALTH CHECK
// ============================================

app.get("/make-server-5d4be467/health", (c) => {
  return c.json({ status: "ok", database: "tables", version: "2.0" });
});

// ============================================
// KV STORE COMPATIBILITY ENDPOINTS
// ============================================

// Get a value from the KV store
app.get("/make-server-5d4be467/kv/:key", async (c) => {
  try {
    const key = c.req.param("key");
    const value = await kv.get(key);
    return c.json({ key, value });
  } catch (error: any) {
    console.error(`Error getting KV key ${c.req.param("key")}:`, error);
    return c.json({ error: error.message }, 500);
  }
});

// Set a value in the KV store
app.post("/make-server-5d4be467/kv/:key", async (c) => {
  try {
    const key = c.req.param("key");
    const { value } = await c.req.json();
    await kv.set(key, value);
    return c.json({ success: true, key });
  } catch (error: any) {
    console.error(`Error setting KV key ${c.req.param("key")}:`, error);
    return c.json({ error: error.message }, 500);
  }
});

// Delete a value from the KV store
app.delete("/make-server-5d4be467/kv/:key", async (c) => {
  try {
    const key = c.req.param("key");
    await kv.del(key);
    return c.json({ success: true, key });
  } catch (error: any) {
    console.error(`Error deleting KV key ${c.req.param("key")}:`, error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// USER ENDPOINTS
// ============================================

// Get all users (admin only)
app.get("/make-server-5d4be467/users", async (c) => {
  try {
    const users = await UserService.getAll();
    return c.json(users);
  } catch (error: any) {
    console.error('Error fetching users:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Get user by ID
app.get("/make-server-5d4be467/users/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const user = await UserService.getById(userId);
    
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }
    
    return c.json(user);
  } catch (error: any) {
    console.error('Error fetching user:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Get user by email
app.get("/make-server-5d4be467/users/email/:email", async (c) => {
  try {
    const email = c.req.param("email");
    const user = await UserService.getByEmail(email);
    
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }
    
    return c.json(user);
  } catch (error: any) {
    console.error('Error fetching user by email:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Create user
app.post("/make-server-5d4be467/users", async (c) => {
  try {
    const userData = await c.req.json();
    const user = await UserService.create(userData);
    return c.json(user, 201);
  } catch (error: any) {
    console.error('Error creating user:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Update user
app.put("/make-server-5d4be467/users/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const updates = await c.req.json();
    const user = await UserService.update(userId, updates);
    
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }
    
    return c.json(user);
  } catch (error: any) {
    console.error('Error updating user:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Update user balance
app.post("/make-server-5d4be467/users/:userId/balance", async (c) => {
  try {
    const userId = c.req.param("userId");
    const { balance } = await c.req.json();
    await UserService.updateBalance(userId, balance);
    return c.json({ success: true, balance });
  } catch (error: any) {
    console.error('Error updating user balance:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// USER PREFERENCES ENDPOINTS
// ============================================

// Get user preferences
app.get("/make-server-5d4be467/users/:userId/preferences", async (c) => {
  try {
    const userId = c.req.param("userId");
    const preferences = await UserPreferencesService.get(userId);
    
    if (!preferences) {
      // Return default preferences
      return c.json({
        user_id: userId,
        favorite_symbols: [],
        default_leverage: 1,
        default_stop_loss: 2,
        default_take_profit: 5,
        confirm_before_trade: true,
        sound_enabled: true,
        chart_type: 'candlestick',
        chart_timeframe: '1h',
        show_balance: true,
      });
    }
    
    return c.json(preferences);
  } catch (error: any) {
    console.error('Error fetching preferences:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Update user preferences
app.post("/make-server-5d4be467/users/:userId/preferences", async (c) => {
  try {
    const userId = c.req.param("userId");
    const updates = await c.req.json();
    const preferences = await UserPreferencesService.createOrUpdate(userId, updates);
    return c.json({ success: true, preferences });
  } catch (error: any) {
    console.error('Error updating preferences:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Update notification preferences only
app.put("/make-server-5d4be467/users/:userId/preferences/notifications", async (c) => {
  try {
    const userId = c.req.param("userId");
    const prefs = await c.req.json();
    const result = await UserPreferencesService.updateNotificationPrefs(userId, prefs);
    return c.json({ success: true, result });
  } catch (error: any) {
    console.error('Error updating notification preferences:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// TRADING ACCOUNT ENDPOINTS
// ============================================

// Get user's trading account
app.get("/make-server-5d4be467/trading-accounts/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const account = await TradingAccountService.getByUserId(userId);
    if (!account) return c.json({ error: "Account not found" }, 404);
    return c.json(account);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Create trading account
app.post("/make-server-5d4be467/trading-accounts", async (c) => {
  try {
    const { userId, ...data } = await c.req.json();
    const account = await TradingAccountService.create(userId, data);
    return c.json(account, 201);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Update trading account
app.put("/make-server-5d4be467/trading-accounts/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const updates = await c.req.json();
    const account = await TradingAccountService.update(userId, updates);
    return c.json(account);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Get all trading accounts (admin)
app.get("/make-server-5d4be467/trading-accounts", async (c) => {
  try {
    const accounts = await TradingAccountService.getAll();
    return c.json(accounts);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// PENDING ORDER ENDPOINTS
// ============================================

// Get pending orders for user
app.get("/make-server-5d4be467/pending-orders/user/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const orders = await PendingOrderService.getByUserId(userId);
    return c.json(orders);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Get all pending orders (admin)
app.get("/make-server-5d4be467/pending-orders", async (c) => {
  try {
    const orders = await PendingOrderService.getAll();
    return c.json(orders);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Create pending order
app.post("/make-server-5d4be467/pending-orders", async (c) => {
  try {
    const orderData = await c.req.json();
    const order = await PendingOrderService.create(orderData);
    return c.json(order, 201);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Update pending order
app.put("/make-server-5d4be467/pending-orders/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const updates = await c.req.json();
    const order = await PendingOrderService.update(id, updates);
    return c.json(order);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Delete pending order
app.delete("/make-server-5d4be467/pending-orders/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await PendingOrderService.delete(id);
    return c.json({ success: true });
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// SESSION & LOGIN HISTORY ENDPOINTS
// ============================================

// Get active sessions for user
app.get("/make-server-5d4be467/sessions/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const sessions = await SessionService.getByUserId(userId);
    return c.json(sessions);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Create session (on login)
app.post("/make-server-5d4be467/sessions", async (c) => {
  try {
    const sessionData = await c.req.json();
    const session = await SessionService.create(sessionData);
    return c.json(session, 201);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Revoke session
app.delete("/make-server-5d4be467/sessions/:sessionId", async (c) => {
  try {
    const sessionId = c.req.param("sessionId");
    await SessionService.revoke(sessionId);
    return c.json({ success: true });
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Revoke all other sessions
app.delete("/make-server-5d4be467/sessions/user/:userId/all-except/:sessionId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const sessionId = c.req.param("sessionId");
    await SessionService.revokeAllExcept(userId, sessionId);
    return c.json({ success: true });
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Get login history for user
app.get("/make-server-5d4be467/login-history/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const limit = parseInt(c.req.query("limit") || "20");
    const history = await LoginHistoryService.getByUserId(userId, limit);
    return c.json(history);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Log activity/login
app.post("/make-server-5d4be467/login-history", async (c) => {
  try {
    const logData = await c.req.json();
    await LoginHistoryService.log(logData);
    return c.json({ success: true });
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// PASSWORD RESET ENDPOINTS
// ============================================

// Get all password reset requests (admin)
app.get("/make-server-5d4be467/password-resets", async (c) => {
  try {
    const resets = await PasswordResetService.getAll();
    return c.json(resets);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Create password reset request
app.post("/make-server-5d4be467/password-resets", async (c) => {
  try {
    const resetData = await c.req.json();
    const reset = await PasswordResetService.create(resetData);
    return c.json(reset, 201);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Approve/Reject password reset
app.put("/make-server-5d4be467/password-resets/:id/status", async (c) => {
  try {
    const id = c.req.param("id");
    const { status, resolvedBy, reason } = await c.req.json();
    await PasswordResetService.updateStatus(id, status, resolvedBy, reason);
    return c.json({ success: true });
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// CONTACT SUBMISSION ENDPOINTS
// ============================================

// Get all contact submissions
app.get("/make-server-5d4be467/contact-submissions", async (c) => {
  try {
    const submissions = await ContactSubmissionService.getAll();
    return c.json(submissions);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Create contact submission (public)
app.post("/make-server-5d4be467/contact-submissions", async (c) => {
  try {
    const submissionData = await c.req.json();
    const submission = await ContactSubmissionService.create(submissionData);
    return c.json(submission, 201);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// INVESTMENT WALLET ENDPOINTS
// ============================================

// Get user investment wallet
app.get("/make-server-5d4be467/investment-wallets/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const wallet = await InvestmentWalletService.getByUserId(userId);
    if (!wallet) return c.json({ error: "Wallet not found" }, 404);
    return c.json(wallet);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Update investment balances
app.put("/make-server-5d4be467/investment-wallets/:userId/balances", async (c) => {
  try {
    const userId = c.req.param("userId");
    const balances = await c.req.json();
    const wallet = await InvestmentWalletService.updateBalances(userId, balances);
    return c.json(wallet);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// CRM & EMAIL TEMPLATE ENDPOINTS
// ============================================

// CRM Messages
app.get("/make-server-5d4be467/crm-messages", async (c) => {
  try {
    const messages = await CRMMessageService.getAll();
    return c.json(messages);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-5d4be467/crm-messages", async (c) => {
  try {
    const messageData = await c.req.json();
    const message = await CRMMessageService.create(messageData);
    return c.json(message, 201);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-5d4be467/crm-messages/:id/send", async (c) => {
  try {
    const id = c.req.param("id");
    await CRMMessageService.send(id);
    return c.json({ success: true });
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Email Templates
app.get("/make-server-5d4be467/email-templates", async (c) => {
  try {
    const templates = await EmailTemplateService.getAll();
    return c.json(templates);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-5d4be467/email-templates", async (c) => {
  try {
    const templateData = await c.req.json();
    const template = await EmailTemplateService.create(templateData);
    return c.json(template, 201);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// SMTP Config
app.get("/make-server-5d4be467/smtp-config", async (c) => {
  try {
    const config = await SMTPConfigService.get();
    return c.json(config);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.put("/make-server-5d4be467/smtp-config", async (c) => {
  try {
    const config = await c.req.json();
    const result = await SMTPConfigService.update(config);
    return c.json(result);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// WITHDRAWAL METHOD ENDPOINTS
// ============================================

// Get user withdrawal methods
app.get("/make-server-5d4be467/withdrawal-methods/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const methods = await UserWithdrawalMethodService.getByUserId(userId);
    return c.json(methods);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Create withdrawal method
app.post("/make-server-5d4be467/withdrawal-methods", async (c) => {
  try {
    const methodData = await c.req.json();
    const method = await UserWithdrawalMethodService.create(methodData);
    return c.json(method, 201);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Set default withdrawal method
app.put("/make-server-5d4be467/withdrawal-methods/:methodId/default", async (c) => {
  try {
    const methodId = c.req.param("methodId");
    const { userId } = await c.req.json();
    await UserWithdrawalMethodService.setDefault(userId, methodId);
    return c.json({ success: true });
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// Delete withdrawal method
app.delete("/make-server-5d4be467/withdrawal-methods/:methodId", async (c) => {
  try {
    const methodId = c.req.param("methodId");
    await UserWithdrawalMethodService.delete(methodId);
    return c.json({ success: true });
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// MARKET ASSETS ENDPOINTS
// ============================================

// Get all market assets
app.get("/make-server-5d4be467/market-assets", async (c) => {
  try {
    const assets = await MarketAssetService.getAll();
    return c.json(assets);
  } catch (error: any) {
    console.error('Error fetching market assets:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Get market asset by symbol
app.get("/make-server-5d4be467/market-assets/:symbol", async (c) => {
  try {
    const symbol = c.req.param("symbol");
    const asset = await MarketAssetService.getBySymbol(symbol);
    
    if (!asset) {
      return c.json({ error: "Asset not found" }, 404);
    }
    
    return c.json(asset);
  } catch (error: any) {
    console.error('Error fetching market asset:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Get market assets by category
app.get("/make-server-5d4be467/market-assets/category/:category", async (c) => {
  try {
    const category = c.req.param("category");
    const assets = await MarketAssetService.getByCategory(category);
    return c.json(assets);
  } catch (error: any) {
    console.error('Error fetching market assets by category:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// PAYMENT METHODS ENDPOINTS
// ============================================

// Get all payment methods
app.get("/make-server-5d4be467/payment-methods", async (c) => {
  try {
    const methods = await PaymentMethodService.getAll();
    return c.json(methods);
  } catch (error: any) {
    console.error('Error fetching payment methods:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Get payment methods by type
app.get("/make-server-5d4be467/payment-methods/type/:type", async (c) => {
  try {
    const type = c.req.param("type");
    const availableFor = c.req.query("availableFor") || 'both';
    const methods = await PaymentMethodService.getByType(type, availableFor as any);
    return c.json(methods);
  } catch (error: any) {
    console.error('Error fetching payment methods by type:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// DEPOSITS ENDPOINTS
// ============================================

// Get all deposits (admin)
app.get("/make-server-5d4be467/deposits", async (c) => {
  try {
    const deposits = await DepositService.getAll();
    return c.json(deposits);
  } catch (error: any) {
    console.error('Error fetching deposits:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Get deposits for a user
app.get("/make-server-5d4be467/deposits/user/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const deposits = await DepositService.getByUserId(userId);
    return c.json(deposits);
  } catch (error: any) {
    console.error('Error fetching user deposits:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Get pending deposits (admin)
app.get("/make-server-5d4be467/deposits/pending", async (c) => {
  try {
    const deposits = await DepositService.getPending();
    return c.json(deposits);
  } catch (error: any) {
    console.error('Error fetching pending deposits:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Create deposit
app.post("/make-server-5d4be467/deposits", async (c) => {
  try {
    const depositData = await c.req.json();
    const deposit = await DepositService.create(depositData);
    return c.json(deposit, 201);
  } catch (error: any) {
    console.error('Error creating deposit:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Update deposit status
app.put("/make-server-5d4be467/deposits/:depositId/status", async (c) => {
  try {
    const depositId = c.req.param("depositId");
    const { status } = await c.req.json();
    await DepositService.updateStatus(depositId, status);
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Error updating deposit status:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// WITHDRAWALS ENDPOINTS
// ============================================

// Get all withdrawals (admin)
app.get("/make-server-5d4be467/withdrawals", async (c) => {
  try {
    const withdrawals = await WithdrawalService.getAll();
    return c.json(withdrawals);
  } catch (error: any) {
    console.error('Error fetching withdrawals:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Get withdrawals for a user
app.get("/make-server-5d4be467/withdrawals/user/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const withdrawals = await WithdrawalService.getByUserId(userId);
    return c.json(withdrawals);
  } catch (error: any) {
    console.error('Error fetching user withdrawals:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Get pending withdrawals (admin)
app.get("/make-server-5d4be467/withdrawals/pending", async (c) => {
  try {
    const withdrawals = await WithdrawalService.getPending();
    return c.json(withdrawals);
  } catch (error: any) {
    console.error('Error fetching pending withdrawals:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Create withdrawal
app.post("/make-server-5d4be467/withdrawals", async (c) => {
  try {
    const withdrawalData = await c.req.json();
    const withdrawal = await WithdrawalService.create(withdrawalData);
    return c.json(withdrawal, 201);
  } catch (error: any) {
    console.error('Error creating withdrawal:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Update withdrawal status
app.put("/make-server-5d4be467/withdrawals/:withdrawalId/status", async (c) => {
  try {
    const withdrawalId = c.req.param("withdrawalId");
    const { status } = await c.req.json();
    await WithdrawalService.updateStatus(withdrawalId, status);
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Error updating withdrawal status:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// POSITIONS ENDPOINTS
// ============================================

// Get positions for a user
app.get("/make-server-5d4be467/positions/user/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const positions = await PositionService.getByUserId(userId);
    return c.json(positions);
  } catch (error: any) {
    console.error('Error fetching positions:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Get open positions for a user
app.get("/make-server-5d4be467/positions/user/:userId/open", async (c) => {
  try {
    const userId = c.req.param("userId");
    const positions = await PositionService.getOpenPositions(userId);
    return c.json(positions);
  } catch (error: any) {
    console.error('Error fetching open positions:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Create position
app.post("/make-server-5d4be467/positions", async (c) => {
  try {
    const positionData = await c.req.json();
    const position = await PositionService.create(positionData);
    return c.json(position, 201);
  } catch (error: any) {
    console.error('Error creating position:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Update position
app.put("/make-server-5d4be467/positions/:positionId", async (c) => {
  try {
    const positionId = c.req.param("positionId");
    const updates = await c.req.json();
    const position = await PositionService.update(positionId, updates);
    
    if (!position) {
      return c.json({ error: "Position not found" }, 404);
    }
    
    return c.json(position);
  } catch (error: any) {
    console.error('Error updating position:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Close position
app.post("/make-server-5d4be467/positions/:positionId/close", async (c) => {
  try {
    const positionId = c.req.param("positionId");
    const { exitPrice } = await c.req.json();
    await PositionService.closePosition(positionId, exitPrice);
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Error closing position:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// TRADE HISTORY ENDPOINTS
// ============================================

// Get trade history for a user
app.get("/make-server-5d4be467/trade-history/user/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const limit = parseInt(c.req.query("limit") || "50");
    const history = await TradeHistoryService.getByUserId(userId, limit);
    return c.json(history);
  } catch (error: any) {
    console.error('Error fetching trade history:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// TRADING SIGNALS ENDPOINTS
// ============================================

// Get all trading signals
app.get("/make-server-5d4be467/signals", async (c) => {
  try {
    const signals = await SignalService.getAll();
    return c.json(signals);
  } catch (error: any) {
    console.error('Error fetching signals:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Get active signals
app.get("/make-server-5d4be467/signals/active", async (c) => {
  try {
    const signals = await SignalService.getActive();
    return c.json(signals);
  } catch (error: any) {
    console.error('Error fetching active signals:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// NOTIFICATIONS ENDPOINTS
// ============================================

// Get notifications for a user
app.get("/make-server-5d4be467/notifications/user/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const notifications = await NotificationService.getByUserId(userId);
    return c.json(notifications);
  } catch (error: any) {
    console.error('Error fetching notifications:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Create notification
app.post("/make-server-5d4be467/notifications", async (c) => {
  try {
    const notificationData = await c.req.json();
    const notification = await NotificationService.create(notificationData);
    return c.json(notification, 201);
  } catch (error: any) {
    console.error('Error creating notification:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Mark notification as read
app.put("/make-server-5d4be467/notifications/:notificationId/read", async (c) => {
  try {
    const notificationId = c.req.param("notificationId");
    await NotificationService.markAsRead(notificationId);
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Error marking notification as read:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// TRANSACTIONS ENDPOINTS (Ledger)
// ============================================

// Get transactions for a user
app.get("/make-server-5d4be467/transactions/user/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const limit = parseInt(c.req.query("limit") || "50");
    const transactions = await TransactionService.getByUserId(userId, limit);
    return c.json(transactions);
  } catch (error: any) {
    console.error('Error fetching transactions:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Create transaction
app.post("/make-server-5d4be467/transactions", async (c) => {
  try {
    const transactionData = await c.req.json();
    const transaction = await TransactionService.create(transactionData);
    return c.json(transaction, 201);
  } catch (error: any) {
    console.error('Error creating transaction:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// INVESTMENT OFFERS ENDPOINTS
// ============================================

// Get all investment offers
app.get("/make-server-5d4be467/investment-offers", async (c) => {
  try {
    const offers = await InvestmentOfferService.getAll();
    return c.json(offers);
  } catch (error: any) {
    console.error('Error fetching investment offers:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Get investment offers by type
app.get("/make-server-5d4be467/investment-offers/type/:type", async (c) => {
  try {
    const type = c.req.param("type") as 'IPO' | 'ECN';
    const offers = await InvestmentOfferService.getByType(type);
    return c.json(offers);
  } catch (error: any) {
    console.error('Error fetching investment offers by type:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Create investment offer
app.post("/make-server-5d4be467/investment-offers", async (c) => {
  try {
    const offerData = await c.req.json();
    const offer = await InvestmentOfferService.create(offerData);
    console.log('✅ Investment offer created in database:', offer.id);
    return c.json(offer, 201);
  } catch (error: any) {
    console.error('Error creating investment offer:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Update investment offer
app.put("/make-server-5d4be467/investment-offers/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const updates = await c.req.json();
    const updated = await InvestmentOfferService.update(id, updates);
    
    if (!updated) {
      return c.json({ error: "Investment offer not found" }, 404);
    }
    
    console.log('✅ Investment offer updated in database:', id);
    return c.json(updated);
  } catch (error: any) {
    console.error('Error updating investment offer:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Delete investment offer
app.delete("/make-server-5d4be467/investment-offers/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const deleted = await InvestmentOfferService.delete(id);
    
    if (!deleted) {
      return c.json({ error: "Investment offer not found" }, 404);
    }
    
    console.log('✅ Investment offer deleted from database:', id);
    return c.json({ success: true, message: "Investment offer deleted" });
  } catch (error: any) {
    console.error('Error deleting investment offer:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// USER INVESTMENTS ENDPOINTS
// ============================================

// Get user investments
app.get("/make-server-5d4be467/user-investments/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const investments = await UserInvestmentService.getByUserId(userId);
    return c.json(investments);
  } catch (error: any) {
    console.error('Error fetching user investments:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Create user investment
app.post("/make-server-5d4be467/user-investments", async (c) => {
  try {
    const investmentData = await c.req.json();
    const investment = await UserInvestmentService.create(investmentData);
    return c.json(investment, 201);
  } catch (error: any) {
    console.error('Error creating user investment:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// SUPPORT TICKETS ENDPOINTS
// ============================================

// Get support tickets for a user
app.get("/make-server-5d4be467/support-tickets/user/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const tickets = await SupportTicketService.getByUserId(userId);
    return c.json(tickets);
  } catch (error: any) {
    console.error('Error fetching support tickets:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Get ticket by ID
app.get("/make-server-5d4be467/support-tickets/:ticketId", async (c) => {
  try {
    const ticketId = c.req.param("ticketId");
    const ticket = await SupportTicketService.getById(ticketId);
    
    if (!ticket) {
      return c.json({ error: "Ticket not found" }, 404);
    }
    
    return c.json(ticket);
  } catch (error: any) {
    console.error('Error fetching support ticket:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Create support ticket
app.post("/make-server-5d4be467/support-tickets", async (c) => {
  try {
    const ticketData = await c.req.json();
    const ticket = await SupportTicketService.create(ticketData);
    return c.json(ticket, 201);
  } catch (error: any) {
    console.error('Error creating support ticket:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Get ticket messages
app.get("/make-server-5d4be467/support-tickets/:ticketId/messages", async (c) => {
  try {
    const ticketId = c.req.param("ticketId");
    const messages = await TicketMessageService.getByTicketId(ticketId);
    return c.json(messages);
  } catch (error: any) {
    console.error('Error fetching ticket messages:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Create ticket message
app.post("/make-server-5d4be467/support-tickets/:ticketId/messages", async (c) => {
  try {
    const ticketId = c.req.param("ticketId");
    const messageData = await c.req.json();
    const message = await TicketMessageService.create({
      ...messageData,
      ticket_id: ticketId,
    });
    return c.json(message, 201);
  } catch (error: any) {
    console.error('Error creating ticket message:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// KYC DOCUMENTS ENDPOINTS
// ============================================

// Get KYC documents for a user
app.get("/make-server-5d4be467/kyc/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const documents = await KYCDocumentService.getByUserId(userId);
    return c.json(documents);
  } catch (error: any) {
    console.error('Error fetching KYC documents:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Create KYC document
app.post("/make-server-5d4be467/kyc", async (c) => {
  try {
    const kycData = await c.req.json();
    const document = await KYCDocumentService.create(kycData);
    return c.json(document, 201);
  } catch (error: any) {
    console.error('Error creating KYC document:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// AUTO TRADER ENDPOINTS
// ============================================

// Get auto trader configs for a user
app.get("/make-server-5d4be467/auto-trader/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const configs = await AutoTraderConfigService.getByUserId(userId);
    return c.json(configs);
  } catch (error: any) {
    console.error('Error fetching auto trader configs:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Create auto trader config
app.post("/make-server-5d4be467/auto-trader", async (c) => {
  try {
    const configData = await c.req.json();
    const config = await AutoTraderConfigService.create(configData);
    return c.json(config, 201);
  } catch (error: any) {
    console.error('Error creating auto trader config:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// PRICE ALERTS ENDPOINTS
// ============================================

// Get price alerts for a user
app.get("/make-server-5d4be467/price-alerts/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const alerts = await PriceAlertService.getByUserId(userId);
    return c.json(alerts);
  } catch (error: any) {
    console.error('Error fetching price alerts:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Create price alert
app.post("/make-server-5d4be467/price-alerts", async (c) => {
  try {
    const alertData = await c.req.json();
    const alert = await PriceAlertService.create(alertData);
    return c.json(alert, 201);
  } catch (error: any) {
    console.error('Error creating price alert:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Delete price alert
app.delete("/make-server-5d4be467/price-alerts/:alertId", async (c) => {
  try {
    const alertId = c.req.param("alertId");
    await PriceAlertService.delete(alertId);
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting price alert:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// ADMIN SETTINGS ENDPOINTS
// ============================================

// Get admin settings
app.get("/make-server-5d4be467/admin-settings", async (c) => {
  try {
    const settings = await AdminSettingsService.get();
    return c.json(settings);
  } catch (error: any) {
    console.error('Error fetching admin settings:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Update admin settings
app.put("/make-server-5d4be467/admin-settings", async (c) => {
  try {
    const updates = await c.req.json();
    const settings = await AdminSettingsService.update(updates);
    return c.json(settings);
  } catch (error: any) {
    console.error('Error updating admin settings:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// START SERVER
// ============================================

Deno.serve(app.fetch);