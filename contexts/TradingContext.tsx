import { createContext, useContext, useState, useEffect, useRef, ReactNode, useCallback } from 'react';
import { useMarketData } from './MarketDataContext';
import { useAuth } from './AuthContext';
import { supabase, serverUrl, publicAnonKey } from '../utils/supabase/client';
import { api } from '../utils/supabase/api';

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
  side: 'buy' | 'sell';
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
  side: 'buy' | 'sell';
  type: 'limit' | 'stop';
  units: number;
  price: number;
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
          side: dbPos.type,
          units: parseFloat(dbPos.amount),
          entryPrice: parseFloat(dbPos.entry_price),
          currentPrice: parseFloat(dbPos.current_price || dbPos.entry_price),
          stopLoss: dbPos.stop_loss ? parseFloat(dbPos.stop_loss) : undefined,
          takeProfit: dbPos.take_profit ? parseFloat(dbPos.take_profit) : undefined,
          leverage: dbPos.leverage || 1,
          pnl: parseFloat(dbPos.profit || 0),
          margin: (parseFloat(dbPos.amount) * parseFloat(dbPos.entry_price)) / (dbPos.leverage || 1),
          timestamp: new Date(dbPos.created_at),
          status: dbPos.status
        })));
      }

      // Transform and set history
      if (Array.isArray(dbHistory)) {
        setHistory(dbHistory.map((dbItem: any) => ({
          id: dbItem.id,
          userId: dbItem.user_id,
          symbol: dbItem.symbol,
          side: dbItem.type,
          type: 'market',
          units: parseFloat(dbItem.amount),
          price: parseFloat(dbItem.exit_price || dbItem.entry_price),
          entryPrice: parseFloat(dbItem.entry_price),
          entryTimestamp: new Date(dbItem.created_at),
          pnl: parseFloat(dbItem.profit || 0),
          timestamp: new Date(dbItem.closed_at || dbItem.created_at),
          status: 'closed'
        })));
      }

      // Transform and set orders
      if (Array.isArray(dbOrders)) {
        setOrders(dbOrders.map((dbOrder: any) => ({
          id: dbOrder.id,
          userId: dbOrder.user_id,
          symbol: dbOrder.symbol,
          side: dbOrder.type,
          type: dbOrder.order_type || 'limit',
          units: parseFloat(dbOrder.amount),
          price: parseFloat(dbOrder.price),
          stopLoss: dbOrder.stop_loss ? parseFloat(dbOrder.stop_loss) : undefined,
          takeProfit: dbOrder.take_profit ? parseFloat(dbOrder.take_profit) : undefined,
          leverage: dbOrder.leverage || 1,
          status: dbOrder.status,
          timestamp: new Date(dbOrder.created_at)
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

  // ── REALTIME: Listen for admin changes to trading_accounts ──────────────────
  // When admin adds balance/credit/bonus, this picks it up instantly.
  useEffect(() => {
    const userId = auth.currentUser?.id;
    if (!userId) return;

    const channel = supabase
      .channel(`trading-account-${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'trading_accounts',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          console.log('⚡ Realtime: trading_accounts updated', payload);
          const updated = payload.new as any;
          if (updated) {
            skipNextSyncRef.current = true; // don't sync these values back
            setAccount(prev => ({
              ...prev,
              balance: parseFloat(updated.balance ?? prev.balance),
              credit: parseFloat(updated.credit ?? prev.credit),
              bonus: parseFloat(updated.bonus ?? prev.bonus),
            }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [auth.currentUser?.id]);

  // Actions
  const addPosition = async (position: Position) => {
    const userId = auth.currentUser?.id;
    if (!userId) return;

    try {
      const priceData = marketData.getPrice(position.symbol);
      const currentMarketPrice = priceData?.price || position.entryPrice;
      
      const res = await api.positions.create({
        user_id: userId,
        symbol: position.symbol,
        type: position.side,
        amount: position.units,
        entry_price: position.entryPrice,
        current_price: currentMarketPrice,
        leverage: position.leverage,
        take_profit: position.takeProfit,
        stop_loss: position.stopLoss,
        status: 'open'
      });

      if (res && res.id) {
        loadTradingData();
        toast.success('Position opened');
      }
    } catch (err) {
      console.error('Failed to open position:', err);
      toast.error('Failed to open position in database');
    }
  };

  const removePosition = async (positionId: string) => {
    try {
      const position = positions.find(p => p.id === positionId);
      if (!position) return;

      const res = await api.positions.close(positionId, position.currentPrice);
      if (res) {
        loadTradingData();
        toast.success('Position closed');
      }
    } catch (err) {
      console.error('Failed to close position:', err);
      toast.error('Failed to close position');
    }
  };

  const updatePosition = async (positionId: string, updates: Partial<Position>) => {
    try {
      setPositions(prev => prev.map(p => p.id === positionId ? { ...p, ...updates } : p));
      await api.positions.update(positionId, updates);
    } catch (err) {
      console.error('Failed to update position:', err);
    }
  };

  const addOrder = async (order: Order) => {
    const userId = auth.currentUser?.id;
    if (!userId) return;

    try {
      await api.pendingOrders.create({
        user_id: userId,
        symbol: order.symbol,
        type: order.side,
        order_type: order.type,
        amount: order.units,
        price: order.price,
        stop_loss: order.stopLoss,
        take_profit: order.takeProfit,
        leverage: order.leverage,
        status: 'pending'
      });
      loadTradingData();
      toast.success('Order placed');
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
      await api.pendingOrders.update(orderId, updates);
      loadTradingData();
    } catch (err) {
      console.error('Failed to update order:', err);
    }
  };

  const addHistory = async (item: HistoryItem) => {
    const userId = auth.currentUser?.id;
    if (!userId) return;
    setHistory(prev => [{ ...item, userId }, ...prev]);
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
    const allPositions = positions;
    const uniqueSymbols = new Set(allPositions.map(p => p.symbol));
    const symbolsKey = Array.from(uniqueSymbols).sort().join(',');
    
    // Only re-subscribe if the set of symbols has actually changed
    if (symbolsKey === subscribedSymbolsKeyRef.current) return;
    subscribedSymbolsKeyRef.current = symbolsKey;
    
    // Subscribe to all symbols
    uniqueSymbols.forEach(symbol => {
      marketData.subscribeToSymbol(symbol);
    });
  }, [positions]);

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
        setAccountState: (acc: Account) => void
      ) => {
        // When no positions remain, reset unrealized P&L, margin, and derived values
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
        accountRef.current, setAccount
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