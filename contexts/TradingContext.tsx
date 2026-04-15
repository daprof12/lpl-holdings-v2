import { createContext, useContext, useState, useEffect, useRef, ReactNode, useCallback } from 'react';
import { toast } from 'sonner';
import { useMarketData } from './MarketDataContext';
import { useAuth } from './AuthContext';
import { supabase, serverUrl, publicAnonKey } from '../utils/supabase/client';
import { api } from '../utils/supabase/api';
import { initialAssets } from '../data/assets';

// @refresh reset

// ============================================
// API CONFIGURATION
// ============================================

// serverUrl is imported from ../utils/supabase/client

// ============================================
// TYPES
// ============================================

export interface Position {
  id: string;
  userId: string; // Required for global mapping
  symbol: string;
  assetName?: string;
  assetCategory?: string;
  side: 'buy' | 'sell';
  type: 'market' | 'limit';
  units: number;
  entryPrice: number;
  currentPrice: number;
  leverage: number;
  margin: number;
  stopLoss?: number;
  takeProfit?: number;
  pnl: number;
  timestamp: Date;
  status: 'open' | 'closed';
}

export interface Order {
  id: string;
  userId: string;
  symbol: string;
  assetName?: string;
  assetCategory?: string;
  side: 'buy' | 'sell';
  type: 'limit' | 'stop' | 'market';
  units: number;
  price: number;           // entry / limit price
  currentPrice?: number;   // live market price for comparison
  stopLoss?: number;
  takeProfit?: number;
  leverage: number;
  status: 'pending' | 'filled' | 'cancelled';
  timestamp: Date;
}

export interface HistoryItem {
  id: string;
  userId: string;
  symbol: string;
  assetName?: string;
  assetCategory?: string;
  side: 'buy' | 'sell';
  type: 'market' | 'limit' | 'stop';
  units: number;
  price: number;
  entryPrice?: number;
  entryTimestamp?: Date; // When the position was opened
  pnl?: number;
  timestamp: Date;
  status: 'filled' | 'cancelled' | 'closed';
}

export interface Account {
  balance: number;
  equity: number;
  realizedPnL: number;
  unrealizedPnL: number;
  margin: number;
  availableFunds: number;
  bonus: number;
  credit: number;
}

export interface PortfolioSnapshot {
  timestamp: Date;
  equity: number;
  balance: number;
  pnl: number;
}

interface TradingContextType {
  // Trading state
  positions: Position[];
  setPositions: (positions: Position[]) => void;
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  history: HistoryItem[];
  setHistory: (history: HistoryItem[]) => void;
  account: Account;
  setAccount: (account: Account) => void;
  portfolioHistory: PortfolioSnapshot[];
  setPortfolioHistory: (history: PortfolioSnapshot[]) => void;
  tradingMode: 'live' | 'paper';
  setTradingMode: (mode: 'live' | 'paper') => void;

  // Actions
  addPosition: (position: Position) => void;
  removePosition: (positionId: string) => void;
  updatePosition: (positionId: string, updates: Partial<Position>) => void;
  addOrder: (order: Order) => void;
  removeOrder: (orderId: string) => void;
  updateOrder: (orderId: string, updates: Partial<Order>) => void;
  addHistory: (item: HistoryItem) => void;
  updateAccount: (updates: Partial<Account>) => void;
  addPortfolioSnapshot: () => void;

  // Balance management
  depositToTradingAccount: (amount: number) => void;
  withdrawFromTradingAccount: (amount: number) => boolean;
}

const TradingContext = createContext<TradingContextType | undefined>(undefined);

export function TradingProvider({ children }: { children: ReactNode }) {
  const marketData = useMarketData();
  const auth = useAuth();

  // Trading state
  const [positions, setPositions] = useState<Position[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [account, setAccount] = useState<Account>({
    balance: 0, // Start at $0 - user must deposit
    equity: 0,
    realizedPnL: 0,
    unrealizedPnL: 0,
    margin: 0,
    availableFunds: 0,
    bonus: 0,
    credit: 0,
  });
  const [portfolioHistory, setPortfolioHistory] = useState<PortfolioSnapshot[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [tradingMode, setTradingMode] = useState<'live' | 'paper'>('live');
  // Flag to prevent sync-back effect from re-writing values that just arrived via Realtime
  const skipNextSyncRef = useRef(false);

  // ============================================
  // API FUNCTIONS - Database Integration
  // ============================================

  /**
   * Fetch trading data from database for current user
   */
  const fetchAllTradingData = async (userId: string) => {
    try {
      const [dbPositions, dbHistory, dbOrders, dbAccount] = await Promise.all([
        api.positions.getByUserId(userId),
        api.tradeHistory.getByUserId(userId),
        api.pendingOrders.getByUserId(userId),
        api.tradingAccounts.getByUserId(userId)
      ]);

      // Transform and set positions
      if (Array.isArray(dbPositions)) {
        setPositions(dbPositions.map((dbPos: any) => ({
          id: dbPos.id,
          userId: dbPos.user_id,
          symbol: dbPos.symbol,
          assetName: dbPos.asset_name || dbPos.symbol,
          assetCategory: dbPos.asset_category || 'Forex',
          side: dbPos.side || 'buy',
          type: dbPos.order_type || 'market',
          units: parseFloat(dbPos.units || 0),
          entryPrice: parseFloat(dbPos.entry_price),
          currentPrice: parseFloat(dbPos.current_price || dbPos.entry_price),
          stopLoss: dbPos.stop_loss ? parseFloat(dbPos.stop_loss) : undefined,
          takeProfit: dbPos.take_profit ? parseFloat(dbPos.take_profit) : undefined,
          leverage: dbPos.leverage || 1,
          pnl: parseFloat(dbPos.profit || 0),
          margin: (parseFloat(dbPos.units) * parseFloat(dbPos.entry_price)) / (dbPos.leverage || 1),
          timestamp: new Date(dbPos.created_at),
          status: dbPos.status
        })));
      }

      // Transform and set history
      if (Array.isArray(dbHistory)) {
        const actualClosed = dbHistory.filter((dbItem: any) =>
          dbItem.status === 'closed' || dbItem.exit_price !== null || dbItem.closed_at !== null
        );

        setHistory(actualClosed.map((dbItem: any) => ({
          id: dbItem.id,
          userId: dbItem.user_id,
          symbol: dbItem.symbol,
          assetName: dbItem.asset_name || dbItem.symbol,
          assetCategory: dbItem.asset_category || 'Forex',
          side: dbItem.side || 'buy',
          type: dbItem.order_type || 'market',
          units: parseFloat(dbItem.volume || 0),
          price: parseFloat(dbItem.exit_price || dbItem.entry_price || 0),
          entryPrice: parseFloat(dbItem.entry_price || 0),
          entryTimestamp: new Date(dbItem.opened_at || dbItem.created_at || now),
          pnl: parseFloat(dbItem.profit || 0),
          timestamp: new Date(dbItem.closed_at || dbItem.created_at || now),
          status: 'closed'
        })));
      }

      // Transform and set orders
      if (Array.isArray(dbOrders)) {
        setOrders(dbOrders.map((dbOrder: any) => ({
          id: dbOrder.id,
          userId: dbOrder.user_id,
          symbol: dbOrder.symbol,
          assetName: dbOrder.asset_name || dbOrder.symbol,
          assetCategory: dbOrder.asset_category || 'Forex',
          side: dbOrder.side || 'buy',
          type: dbOrder.order_type || dbOrder.type || 'limit',
          units: parseFloat(dbOrder.units || dbOrder.amount || 0),
          price: parseFloat(dbOrder.entry_price || dbOrder.price || 0),
          currentPrice: parseFloat(dbOrder.current_price || dbOrder.entry_price || dbOrder.price || 0),
          stopLoss: dbOrder.stop_loss ? parseFloat(dbOrder.stop_loss) : undefined,
          takeProfit: dbOrder.take_profit ? parseFloat(dbOrder.take_profit) : undefined,
          leverage: dbOrder.leverage || 1,
          status: dbOrder.status || 'pending',
          timestamp: new Date(dbOrder.created_at || now)
        })));
      }

      // Set account
      if (dbAccount || auth.currentUser) {
        setAccount({
          balance: parseFloat(dbAccount?.balance ?? auth.currentUser?.balance ?? auth.currentUser?.liveBalance ?? 0),
          equity: parseFloat(dbAccount?.equity || 0),
          realizedPnL: parseFloat(dbAccount?.realized_pnl || 0),
          unrealizedPnL: parseFloat(dbAccount?.unrealized_pnl || 0),
          margin: parseFloat(dbAccount?.margin || 0),
          availableFunds: parseFloat(dbAccount?.available_funds || 0),
          bonus: parseFloat(dbAccount?.bonus ?? auth.currentUser?.bonus ?? 0),
          credit: parseFloat(dbAccount?.credit ?? auth.currentUser?.credit ?? 0),
        });
      }
    } catch (error) {
      console.error('Error fetching all trading data:', error);
    }
  };

  // ============================================
  // LOAD DATA FROM DATABASE ON MOUNT
  // ============================================

  /**
   * Load all trading data (positions, history, account) from database
   */
  const loadTradingData = useCallback(async () => {
    const userId = auth.currentUser?.id;
    if (!userId) return;

    try {
      console.log('🔄 Syncing trading data from database for user:', userId);
      await fetchAllTradingData(userId);
      console.log('✅ Trading data successfully hydrated');
      setIsHydrated(true);
    } catch (err) {
      console.error('❌ Failed to hydrate trading data:', err);
      setIsHydrated(true);
    }
  }, [auth.currentUser?.id]);

  useEffect(() => {
    loadTradingData();
  }, [loadTradingData]);

  // monitor effects removed in v2.0 - sync happens via actions

  // Account metrics sync v2.2 (Relational)
  // Only sync DERIVED values (equity, margin, P&L) to DB.
  // Balance, credit, and bonus are "source of truth" values that are only changed
  // via explicit actions (deposit, withdraw, admin fund), never overwritten by this effect.
  useEffect(() => {
    const userId = auth.currentUser?.id;
    if (!userId || !isHydrated) return;
    if (skipNextSyncRef.current) {
      skipNextSyncRef.current = false;
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        await api.tradingAccounts.update(userId, {
          equity: account.equity,
          realized_pnl: account.realizedPnL,
          unrealized_pnl: account.unrealizedPnL,
          margin: account.margin,
          available_funds: account.availableFunds
        });
      } catch (err) {
        console.error('Failed to sync account metrics to DB:', err);
      }
    }, 5000); // 5s debounce to prevent DB spam

    return () => clearTimeout(timeout);
  }, [account.equity, auth.currentUser?.id, isHydrated]);

  // ── REALTIME: Listen for all trading changes ──────────────────
  useEffect(() => {
    const userId = auth.currentUser?.id;
    if (!userId) return;

    // 1. Account Subscription
    const accountChannel = supabase
      .channel(`trading-account-${userId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'trading_accounts', filter: `user_id=eq.${userId}` }, (payload) => {
        console.log('⚡ Realtime: account updated', payload);
        const updated = payload.new as any;
        if (updated) {
          skipNextSyncRef.current = true;
          setAccount(prev => ({
            ...prev,
            balance: parseFloat(updated.balance ?? prev.balance),
            credit: parseFloat(updated.credit ?? prev.credit),
            bonus: parseFloat(updated.bonus ?? prev.bonus),
          }));
        }
      })
      .subscribe();

    // 2. Positions Subscription
    const posChannel = supabase
      .channel(`positions-${userId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'positions', filter: `user_id=eq.${userId}` }, () => {
        console.log('⚡ Realtime: positions changed');
        loadTradingData();
      })
      .subscribe();

    // 3. Orders Subscription
    const orderChannel = supabase
      .channel(`orders-${userId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pending_orders', filter: `user_id=eq.${userId}` }, () => {
        console.log('⚡ Realtime: orders changed');
        loadTradingData();
      })
      .subscribe();

    // 4. History Subscription
    const historyChannel = supabase
      .channel(`history-${userId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'trade_history', filter: `user_id=eq.${userId}` }, () => {
        console.log('⚡ Realtime: history changed');
        loadTradingData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(accountChannel);
      supabase.removeChannel(posChannel);
      supabase.removeChannel(orderChannel);
      supabase.removeChannel(historyChannel);
    };
  }, [auth.currentUser?.id, loadTradingData]);

  // Actions
  const addPosition = async (position: Position) => {
    const userId = auth.currentUser?.id;
    if (!userId) return;

    try {
      const priceData = marketData.getPrice(position.symbol);
      const currentMarketPrice = priceData?.price || position.entryPrice;
      const asset = initialAssets.find(a => a.symbol === position.symbol);
      const now = Date.now();

      const res = await api.positions.create({
        // Removed manual ID so Supabase uses gen_random_uuid()
        user_id: userId,
        symbol: position.symbol,
        asset_name: position.assetName || asset?.name || position.symbol,
        asset_category: position.assetCategory || asset?.category || 'Forex',
        side: position.side,
        order_type: position.type || 'market',
        units: position.units,
        entry_price: position.entryPrice,
        current_price: currentMarketPrice,
        leverage: position.leverage,
        take_profit: position.takeProfit,
        stop_loss: position.stopLoss,
        status: 'open',
        opened_at: now,
        created_at: now,
        updated_at: now,
        source: 'manual'
      });

      if (res && res.id) {
        await loadTradingData();
        toast.success('Position opened successfully');
      }
    } catch (err) {
      console.error('Failed to open position:', err);
      toast.error('Trading Error: Could not save to database');
    }
  };

  const removePosition = async (positionId: string) => {
    try {
      const position = positions.find(p => p.id === positionId);
      if (!position) return;

      // Optimistic UI update: Remove immediately from screen
      setPositions(prev => prev.filter(p => p.id !== positionId));

      const res = await api.positions.close(positionId, position.currentPrice);
      if (res) {
        // The DB trigger handles history entry. 
        // We await the refresh to ensure local state is perfectly synced.
        await loadTradingData();
        toast.success('Position closed');
      }
    } catch (err) {
      console.error('Failed to close position:', err);
      toast.error('Failed to close position');
    }
  };

  const updatePosition = async (positionId: string, updates: Partial<Position>) => {
    try {
      // Optmistic UI update
      setPositions(prev => prev.map(p => p.id === positionId ? { ...p, ...updates } : p));

      // Map camelCase to snake_case for DB
      const dbUpdates: any = {};
      if (updates.symbol !== undefined) dbUpdates.symbol = updates.symbol;
      if (updates.assetName !== undefined) dbUpdates.asset_name = updates.assetName;
      if (updates.assetCategory !== undefined) dbUpdates.asset_category = updates.assetCategory;
      if (updates.side !== undefined) dbUpdates.side = updates.side;
      if (updates.type !== undefined) dbUpdates.type = updates.type;
      if (updates.units !== undefined) dbUpdates.amount = updates.units;
      if (updates.entryPrice !== undefined) dbUpdates.entry_price = updates.entryPrice;
      if (updates.currentPrice !== undefined) dbUpdates.current_price = updates.currentPrice;
      if (updates.leverage !== undefined) dbUpdates.leverage = updates.leverage;
      if (updates.stopLoss !== undefined) dbUpdates.stop_loss = updates.stopLoss;
      if (updates.takeProfit !== undefined) dbUpdates.take_profit = updates.takeProfit;
      if (updates.status !== undefined) dbUpdates.status = updates.status;

      await api.positions.update(positionId, dbUpdates);
      // loadTradingData will be triggered by Realtime
    } catch (err) {
      console.error('Failed to update position:', err);
    }
  };

  const addOrder = async (order: Order) => {
    const userId = auth.currentUser?.id;
    if (!userId) return;

    try {
      const res = await api.pendingOrders.create({
        user_id: userId,
        symbol: order.symbol,
        asset_name: order.assetName || order.symbol,
        asset_category: order.assetCategory || 'Forex',
        side: order.side,
        order_type: order.type,
        type: order.type,           // satisfy NOT NULL constraint on legacy column
        units: order.units,
        entry_price: order.price,       // canonical
        current_price: order.price,     // will update as market moves
        price: order.price,             // legacy compat
        stop_loss: order.stopLoss,
        take_profit: order.takeProfit,
        leverage: order.leverage,
        status: 'pending',
        created_at: Date.now()
      });
      if (res) {
        await loadTradingData();
        toast.success('Order placed');
      }
    } catch (err) {
      console.error('Failed to add order:', err);
    }
  };

  const removeOrder = async (orderId: string) => {
    try {
      await api.pendingOrders.delete(orderId);
      loadTradingData();
      toast.success('Order cancelled');
    } catch (err) {
      console.error('Failed to remove order:', err);
    }
  };

  const updateOrder = async (orderId: string, updates: Partial<Order>) => {
    try {
      // Map camelCase to snake_case for DB
      const dbUpdates: any = {};
      if (updates.symbol !== undefined) dbUpdates.symbol = updates.symbol;
      if (updates.assetName !== undefined) dbUpdates.asset_name = updates.assetName;
      if (updates.assetCategory !== undefined) dbUpdates.asset_category = updates.assetCategory;
      if (updates.side !== undefined) dbUpdates.side = updates.side;
      if (updates.type !== undefined) dbUpdates.type = updates.type;
      if (updates.units !== undefined) dbUpdates.amount = updates.units;
      if (updates.price !== undefined) dbUpdates.price = updates.price;
      if (updates.stopLoss !== undefined) dbUpdates.stop_loss = updates.stopLoss;
      if (updates.takeProfit !== undefined) dbUpdates.take_profit = updates.takeProfit;
      if (updates.leverage !== undefined) dbUpdates.leverage = updates.leverage;
      if (updates.status !== undefined) dbUpdates.status = updates.status;

      await api.pendingOrders.update(orderId, dbUpdates);
    } catch (err) {
      console.error('Failed to update order:', err);
    }
  };

  const addHistory = async (item: HistoryItem) => {
    const userId = auth.currentUser?.id;
    if (!userId) return;
    try {
      const asset = initialAssets.find(a => a.symbol === item.symbol);
      const dbData = {
        user_id: userId,
        symbol: item.symbol,
        asset_name: item.assetName || asset?.name || item.symbol,
        asset_category: item.assetCategory || asset?.category || 'Forex',
        side: item.side,
        type: item.type || 'market',
        volume: item.units,
        price: item.price,
        entry_price: item.entryPrice || item.price,
        exit_price: item.price,
        profit: item.pnl || 0,
        profit_percentage: 0, // Calculated by DB trigger or 0 for now
        status: item.status,
        opened_at: Date.parse((item.entryTimestamp || item.timestamp).toString()),
        closed_at: Date.parse(item.timestamp.toString()),
        duration: 0, // Calculated by DB trigger
        created_at: Date.now()
      };
      await api.tradeHistory.create(dbData);
      // History list will refresh via Realtime
    } catch (err) {
      console.error('Failed to add history:', err);
    }
  };

  const updateAccount = (updates: Partial<Account>) => {
    setAccount(prev => ({ ...prev, ...updates }));
  };

  const addPortfolioSnapshot = () => {
    const snapshot: PortfolioSnapshot = {
      timestamp: new Date(),
      equity: account.equity,
      balance: account.balance,
      pnl: account.realizedPnL + account.unrealizedPnL,
    };
    setPortfolioHistory(prev => [...prev, snapshot]);
  };

  const depositToTradingAccount = async (amount: number) => {
    const userId = auth.currentUser?.id;
    if (!userId) return;

    const newBalance = account.balance + amount;
    setAccount(prev => ({ ...prev, balance: newBalance }));

    try {
      await api.tradingAccounts.update(userId, { balance: newBalance });
      auth.updateUser(userId, { balance: newBalance, liveBalance: newBalance });
    } catch (err) {
      console.error('Failed to deposit to trading account:', err);
    }
  };

  const withdrawFromTradingAccount = async (amount: number) => {
    const userId = auth.currentUser?.id;
    if (!userId) return false;

    if (account.balance < amount) return false;

    const newBalance = account.balance - amount;
    setAccount(prev => ({ ...prev, balance: newBalance }));

    try {
      await api.tradingAccounts.update(userId, { balance: newBalance });
      auth.updateUser(userId, { balance: newBalance, liveBalance: newBalance });
      return true;
    } catch (err) {
      console.error('Failed to withdraw from trading account:', err);
      return false;
    }
  };

  // Subscribe to market data for all positions and update prices in real-time
  const subscribedSymbolsKeyRef = useRef('');

  useEffect(() => {
    const uniqueSymbols = new Set([
      ...positions.map(p => p.symbol),
      ...orders.map(o => o.symbol)
    ]);
    const symbolsKey = Array.from(uniqueSymbols).sort().join(',');

    // Only re-subscribe if the set of symbols has actually changed
    if (symbolsKey === subscribedSymbolsKeyRef.current) return;
    subscribedSymbolsKeyRef.current = symbolsKey;

    // Subscribe to all symbols
    uniqueSymbols.forEach(symbol => {
      marketData.subscribeToSymbol(symbol);
    });
  }, [positions, orders]);

  // Update position prices and P&L on a fixed 5-second interval
  const positionsRef = useRef(positions);
  const accountRef = useRef(account);

  // Keep refs in sync
  positionsRef.current = positions;
  accountRef.current = account;

  useEffect(() => {
    const PRICE_UPDATE_INTERVAL = 5000; // Same 5s as MarketDataContext

    const updateAllPositionPrices = () => {
      const updatePositionPrices = (
        currentPositions: Position[],
        setPositionsState: (pos: Position[]) => void,
        currentAccount: Account,
        setAccountState: (acc: Account) => void,
        currentOrders: Order[],
        setOrdersState: (orders: Order[]) => void
      ) => {
        // --- 1. HANDLE ORDER FILLING & PRICE UPDATES ---
        let ordersChanged = false;
        const updatedOrders = currentOrders.map((order) => {
          if (order.status !== 'pending') return order;

          const priceData = marketData.getPrice(order.symbol);
          if (!priceData || !priceData.price) return;

          const currentPrice = priceData.price;
          let shouldFill = false;

          if (order.side === 'buy') {
            // Limit Buy: fill if price falls to or below limit
            if (order.type === 'limit' && currentPrice <= order.price) shouldFill = true;
            // Stop Buy: fill if price rises to or above stop
            if (order.type === 'stop' && currentPrice >= order.price) shouldFill = true;
          } else {
            // Limit Sell: fill if price rises to or above limit
            if (order.type === 'limit' && currentPrice >= order.price) shouldFill = true;
            // Stop Sell: fill if price falls to or below stop
            if (order.type === 'stop' && currentPrice <= order.price) shouldFill = true;
          }

          if (shouldFill) {
            console.log(`🎯 Order filled! Converting Order ${order.id} to Position`);
            const asset = initialAssets.find(a => a.symbol === order.symbol);
            const now = Date.now();

            // 1. Mark as filled in DB first (so user sees the state)
            api.pendingOrders.update(order.id, { status: 'filled', current_price: currentPrice })
              .then(() => {
                // 2. Create the position with correct fields
                return api.positions.create({
                  user_id: order.userId,
                  symbol: order.symbol,
                  asset_name: order.assetName || asset?.name || order.symbol,
                  asset_category: order.assetCategory || asset?.category || 'Forex',
                  side: order.side,
                  order_type: order.type,
                  units: order.units,
                  entry_price: order.price,      // use the limit price as entry
                  current_price: currentPrice,   // current market price
                  leverage: order.leverage,
                  margin: (order.units * order.price) / order.leverage,
                  status: 'open',
                  opened_at: now,
                  created_at: now,
                  updated_at: now,
                  source: 'order',
                  stop_loss: order.stopLoss,
                  take_profit: order.takeProfit
                });
              })
              .then(() => {
                // 3. Delete the pending order after a short delay so user sees "Filled"
                setTimeout(() => {
                  api.pendingOrders.delete(order.id);
                }, 2000);
              })
              .catch(err => console.error("Failed to process order fill:", err));

            toast.success(`✅ Order filled: ${order.side.toUpperCase()} ${order.units} ${order.symbol} @ $${order.price.toFixed(2)}`);
            
            ordersChanged = true;
            // Return updated local state so it doesn't get filled twice before DB triggers
            return { ...order, status: 'filled', currentPrice };
          }
          
          if (currentPrice !== order.currentPrice) {
            ordersChanged = true;
            return { ...order, currentPrice };
          }
          
          return order;
        });

        if (ordersChanged) {
          setOrdersState(updatedOrders);
        }

        // --- 2. HANDLE POSITION PRICE UPDATES ---
        if (currentPositions.length === 0) {
          const targetEquity = currentAccount.balance + (currentAccount.bonus || 0) + (currentAccount.credit || 0);
          if (currentAccount.unrealizedPnL !== 0 || currentAccount.margin !== 0 || currentAccount.availableFunds !== targetEquity || currentAccount.equity !== targetEquity) {
            setAccountState({
              ...currentAccount,
              equity: targetEquity,
              unrealizedPnL: 0,
              margin: 0,
              availableFunds: targetEquity,
            });
          }
          return;
        }

        let totalUnrealizedPnL = 0;
        let totalMargin = 0;
        let hasUpdates = false;

        const updatedPositions = currentPositions.map(position => {
          const priceData = marketData.getPrice(position.symbol);
          if (!priceData || !priceData.price) {
            totalUnrealizedPnL += position.pnl || 0;
            totalMargin += position.margin || 0;
            return position;
          }

          const currentPrice = priceData.price;

          const priceDiff = position.side === 'buy'
            ? currentPrice - position.entryPrice
            : position.entryPrice - currentPrice;

          const pnl = priceDiff * position.units;
          const margin = (position.units * position.entryPrice) / position.leverage;

          totalUnrealizedPnL += pnl;
          totalMargin += margin;

          if (currentPrice !== position.currentPrice) {
            hasUpdates = true;
          }

          return {
            ...position,
            currentPrice,
            pnl,
            margin,
          };
        });

        const equity = currentAccount.balance + (currentAccount.bonus || 0) + (currentAccount.credit || 0) + totalUnrealizedPnL;
        const availableFunds = equity - totalMargin;

        // Force update if position prices changed OR if derived summary values don't match latest polls
        if (hasUpdates || currentAccount.equity !== equity || currentAccount.availableFunds !== availableFunds || currentAccount.margin !== totalMargin) {
          setPositionsState(updatedPositions);
          setAccountState({
            ...currentAccount,
            equity,
            unrealizedPnL: totalUnrealizedPnL,
            margin: totalMargin,
            availableFunds,
          });
        }
      };

      updatePositionPrices(
        positionsRef.current, setPositions,
        accountRef.current, setAccount,
        orders, setOrders
      );
    };

    // Run once immediately, then on interval
    updateAllPositionPrices();
    const interval = setInterval(updateAllPositionPrices, PRICE_UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, []); // Empty deps — uses refs internally, runs on a fixed interval

  const value: TradingContextType = {
    positions,
    setPositions,
    orders,
    setOrders,
    history,
    setHistory,
    account,
    setAccount,
    portfolioHistory,
    setPortfolioHistory,
    addPosition,
    removePosition,
    updatePosition,
    addOrder,
    removeOrder,
    updateOrder,
    addHistory,
    updateAccount,
    addPortfolioSnapshot,
    depositToTradingAccount,
    withdrawFromTradingAccount,
    tradingMode,
    setTradingMode,
  };

  return (
    <TradingContext.Provider value={value}>
      {children}
    </TradingContext.Provider>
  );
}

export function useTrading() {
  const context = useContext(TradingContext);
  if (context === undefined) {
    throw new Error('useTrading must be used within a TradingProvider');
  }
  return context;
}