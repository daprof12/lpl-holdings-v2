import { createContext, useContext, useState, useEffect, useRef, ReactNode, useCallback } from 'react';
import { useMarketData } from './MarketDataContext';
import { useAuth } from './AuthContext';
import { supabase, getKV, setKV } from '../utils/supabase/client';
import { publicAnonKey } from '../utils/supabase/info';

// @refresh reset

// ============================================
// API CONFIGURATION
// ============================================

// serverUrl is imported from ../utils/supabase/client
import { serverUrl } from '../utils/supabase/client';

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
  // Guard: prevent the save effect from overwriting a stored balance on first mount
  const isAccountHydrated = useRef(false);
  const pendingHydration = useRef(false);
  const [portfolioHistory, setPortfolioHistory] = useState<PortfolioSnapshot[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [tradingMode, setTradingMode] = useState<'live' | 'paper'>('live');

  // ============================================
  // API FUNCTIONS - Database Integration
  // ============================================

  /**
   * Fetch positions from database for current user
   */
  const fetchPositionsFromDatabase = async (userId: string) => {
    try {
      const response = await fetch(`${serverUrl}/positions/user/${userId}/open`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (!response.ok) {
        console.error('Failed to fetch positions:', response.statusText);
        return [];
      }

      const dbPositions = await response.json();
      console.log('✅ Positions loaded from database:', dbPositions.length);
      
      // Transform database positions to match our Position interface
      return dbPositions.map((dbPos: any) => ({
        id: dbPos.id,
        userId: dbPos.user_id,
        symbol: dbPos.symbol,
        side: dbPos.type, // 'buy' or 'sell'
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
      }));
    } catch (error) {
      console.error('Error fetching positions from database:', error);
      return [];
    }
  };

  /**
   * Fetch trade history from database for current user
   */
  const fetchTradeHistoryFromDatabase = async (userId: string) => {
    try {
      const response = await fetch(`${serverUrl}/trade-history/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (!response.ok) {
        console.error('Failed to fetch trade history:', response.statusText);
        return [];
      }

      const dbHistory = await response.json();
      console.log('✅ Trade history loaded from database:', dbHistory.length);
      
      // Transform database history to match our HistoryItem interface
      return dbHistory.map((dbItem: any) => ({
        id: dbItem.id,
        userId: dbItem.user_id,
        symbol: dbItem.symbol,
        side: dbItem.type, // 'buy' or 'sell'
        type: 'market', // Default to market order
        units: parseFloat(dbItem.amount),
        price: parseFloat(dbItem.exit_price || dbItem.entry_price),
        entryPrice: parseFloat(dbItem.entry_price),
        entryTimestamp: new Date(dbItem.created_at),
        pnl: parseFloat(dbItem.profit || 0),
        timestamp: new Date(dbItem.closed_at || dbItem.created_at),
        status: 'closed'
      }));
    } catch (error) {
      console.error('Error fetching trade history from database:', error);
      return [];
    }
  };

  /**
   * Create position in database
   */
  const createPositionInDatabase = async (position: Position) => {
    try {
      const response = await fetch(`${serverUrl}/positions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: position.userId,
          symbol: position.symbol,
          type: position.side,
          amount: position.units,
          entry_price: position.entryPrice,
          current_price: position.currentPrice,
          leverage: position.leverage,
          take_profit: position.takeProfit,
          stop_loss: position.stopLoss,
          status: 'open'
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create position');
      }

      const createdPosition = await response.json();
      console.log('✅ Position created in database:', createdPosition.id);
      return createdPosition;
    } catch (error) {
      console.error('Error creating position in database:', error);
      throw error;
    }
  };

  /**
   * Close position in database
   */
  const closePositionInDatabase = async (positionId: string, exitPrice: number) => {
    try {
      const response = await fetch(`${serverUrl}/positions/${positionId}/close`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          exit_price: exitPrice
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to close position');
      }

      const closedPosition = await response.json();
      console.log('✅ Position closed in database:', closedPosition.id);
      return closedPosition;
    } catch (error) {
      console.error('Error closing position in database:', error);
      throw error;
    }
  };

  // ============================================
  // LOAD DATA FROM DATABASE ON MOUNT
  // ============================================

  /**
   * Load all trading data (positions, history, account) from database or KV store
   */
  const loadTradingData = useCallback(async () => {
    const userId = auth.currentUser?.id;
    if (!userId) return;

    try {
      console.log('🔄 Syncing trading data from database for user:', userId);
      
      // 1. Fetch Relational Data
      const [dbPositions, dbHistory] = await Promise.all([
        fetchPositionsFromDatabase(userId),
        fetchTradeHistoryFromDatabase(userId)
      ]);

      // 2. Fetch KV Data (Backup and metadata)
      const [accountDb, posDb, ordDb, hisDb] = await Promise.all([
        getKV(`gross_live_account_${userId}`),
        getKV('gross_live_positions'),
        getKV('gross_live_orders'),
        getKV('gross_live_history')
      ]);

      const filterByUser = (items: any[]) => (items || []).filter(item => item.userId === userId);

      // 3. Hydrate Account State
      if (accountDb) {
        setAccount(accountDb);
        isAccountHydrated.current = true;
      }

      // 4. Hydrate Positions
      const positionsFromKV = filterByUser(posDb);
      if (dbPositions.length > 0) {
        setPositions(dbPositions);
      } else if (positionsFromKV.length > 0) {
        setPositions(positionsFromKV);
      }

      // 5. Hydrate History
      const historyFromKV = filterByUser(hisDb);
      if (dbHistory.length > 0) {
        setHistory(dbHistory);
      } else if (historyFromKV.length > 0) {
        setHistory(historyFromKV);
      }

      // 6. Hydrate Orders
      if (ordDb) setOrders(filterByUser(ordDb));
      
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

  // Combined real-time subscription for global trading lists
  useEffect(() => {
    const channel = supabase
      .channel('public:kv_store_trading')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'kv_store_5d4be467' 
      }, (payload: any) => {
        const { key, value } = payload.new;
        const userId = auth.currentUser?.id;
        if (!userId) return;

        const filterByUser = (items: any[]) => (items || []).filter(item => item.userId === userId);

        switch (key) {
          case `gross_live_account_${userId}`:  setAccount(value); break;
          case 'gross_live_positions':  setPositions(filterByUser(value)); break;
          case 'gross_live_orders':     setOrders(filterByUser(value)); break;
          case 'gross_live_history':    setHistory(filterByUser(value)); break;
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [auth.currentUser?.id]);

  // Central Sync for Global Lists (Debounced)
  const syncGlobalListsTimeoutRef = useRef<Record<string, NodeJS.Timeout>>({});

  const syncListToDB = useCallback((key: string, items: any[]) => {
    if (syncGlobalListsTimeoutRef.current[key]) {
      clearTimeout(syncGlobalListsTimeoutRef.current[key]);
    }

    syncGlobalListsTimeoutRef.current[key] = setTimeout(async () => {
      try {
        await setKV(key, items);
        console.log(`✅ Global list ${key} synced to Supabase KV`);
      } catch (error) {
        console.error(`❌ Failed to sync global list ${key}:`, error);
      }
    }, 3000); // 3 second debounce to reduce write frequency
  }, []);

  // Monitor positions for changes and sync
  useEffect(() => {
    if (!isHydrated) return;
    const allStr = localStorage.getItem('gross_live_positions');
    if (allStr) syncListToDB('gross_live_positions', JSON.parse(allStr));
  }, [positions, isHydrated, syncListToDB]);

  useEffect(() => {
    if (!isHydrated) return;
    const allStr = localStorage.getItem('gross_live_history');
    if (allStr) syncListToDB('gross_live_history', JSON.parse(allStr));
  }, [history, isHydrated, syncListToDB]);

  useEffect(() => {
    if (!isHydrated) return;
    const allStr = localStorage.getItem('gross_live_orders');
    if (allStr) syncListToDB('gross_live_orders', JSON.parse(allStr));
  }, [orders, isHydrated, syncListToDB]);

  // Helper to update global localStorage lists without overwriting other users' data
  const updateGlobalList = (key: string, updater: (items: any[]) => any[]) => {
    const userId = auth.currentUser?.id;
    if (!userId) return;
    
    try {
      const raw = localStorage.getItem(key);
      const items = raw ? JSON.parse(raw) : [];
      // Pass the WHOLE list to updater, or handle merging here.
      // Actually, it's easier to just handle it in the add/remove functions.
    } catch (err) {
      console.error(`Error updating global list ${key}:`, err);
    }
  };

  // Cross-tab sync: listen for storage events on global keys and re-filter
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      const userId = auth.currentUser?.id;
      if (!userId || !e.newValue) return;

      try {
        const items = JSON.parse(e.newValue);
        const filtered = items.filter((item: any) => item.userId === userId || !item.userId);

        if (e.key === 'gross_live_positions') setPositions(filtered);
        if (e.key === 'gross_live_orders') setOrders(filtered);
        if (e.key === 'gross_live_history') setHistory(filtered);
      } catch (err) {
        console.error('Cross-tab sync error:', err);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [auth.currentUser?.id]);

  // Account balance isolation is still per-user (correct for singletons)
  useEffect(() => {
    const userId = auth.currentUser?.id;
    if (!userId) {
      isAccountHydrated.current = false;
      return;
    }

    // Reset hydration state for the new user context
    isAccountHydrated.current = false;
    pendingHydration.current = false;

    // Always prioritize per-user key for explicit session isolation
    const stored = localStorage.getItem(`gross_live_account_${userId}`);

    if (stored) {
      try {
        setAccount(JSON.parse(stored));
        pendingHydration.current = true;
      } catch { 
        // fallback for malformed data
        isAccountHydrated.current = true;
      }
    } else {
      // No stored data — nothing to overwrite, safe to allow saves immediately
      isAccountHydrated.current = true;
    }
  }, [auth.currentUser?.id]);

  // Complete hydration AFTER setAccount has been processed by React.
  // This ensures the save effect sees the correct (hydrated) account
  // value rather than the stale initial { balance: 0 }.
  useEffect(() => {
    if (pendingHydration.current) {
      pendingHydration.current = false;
      isAccountHydrated.current = true;
    }
  }, [account]);

  // Guarded save: only write after the stored value has been loaded,
  // and always use the per-user key so each user has their own balance.
  useEffect(() => {
    const userId = auth.currentUser?.id;
    if (!isAccountHydrated.current || !userId) return;
    
    // 1. Local cache
    const liveKey = `gross_live_account_${userId}`;
    localStorage.setItem(liveKey, JSON.stringify(account));
    // Keep the generic key in sync so the storage-event listener can still read it
    localStorage.setItem('gross_live_account', JSON.stringify(account));

    // 2. Database Sync (Aggressive 1s debounce)
    const timeout = setTimeout(() => {
      setKV(liveKey, account);
      console.log('✅ Account synced to DB for user:', userId);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [account, auth.currentUser?.id]);

  // Listen for storage events to sync balance changes from admin in real-time
  useEffect(() => {
    const handleStorageChange = (e?: StorageEvent) => {
      const currentUserId = auth.currentUser?.id;
      if (!currentUserId) return;

      // Only respond to events for THIS user's specific account key
      const liveKey = `gross_live_account_${currentUserId}`;

      // If it's a StorageEvent (from another tab), only react if it's our key.
      if (e && 'key' in e && e.key && e.key !== liveKey) {
        return;
      }

      console.log('📬 Storage event received for user:', currentUserId);
      const rawLive = localStorage.getItem(liveKey);
      if (rawLive) {
        try {
          const parsed = JSON.parse(rawLive);
          setAccount(parsed);
          isAccountHydrated.current = true;
          console.log(`✅ Balance synced for ${currentUserId}: $${parsed.balance}`);
        } catch { /* ignore */ }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [auth.currentUser?.id]);

  // Helper getters

  // Helper to persist changes to the global list in a way that doesn't overwrite others
  const patchGlobalList = useCallback((key: string, items: any[]) => {
    const userId = auth.currentUser?.id;
    if (!userId) return;

    try {
      // 1. Get current global state
      const raw = localStorage.getItem(key);
      const globalItems = raw ? JSON.parse(raw) : [];
      
      // 2. Filter out ALL items belonging to THIS user from the global list
      const otherUsersItems = globalItems.filter((item: any) => item.userId !== userId);
      
      // 3. Merge this user's current LOCAL state (already filtered) into the global list
      const merged = [...items, ...otherUsersItems];
      
      // 4. Save back to global key
      localStorage.setItem(key, JSON.stringify(merged));
      // 5. Important: storage event doesn't fire for the same window, so this ensures other tabs see it
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error(`Failed to patch global list ${key}:`, err);
    }
  }, [auth.currentUser?.id]);

  // Actions
  const addPosition = (position: Position) => {
    const userId = auth.currentUser?.id;
    if (!userId) return;

    const priceData = marketData.getPrice(position.symbol);
    const currentMarketPrice = priceData?.price || position.entryPrice;
    
    const positionWithUserId: Position = {
      ...position,
      userId,
      currentPrice: currentMarketPrice
    };
    
    const next = [...positions, positionWithUserId];
    setPositions(next);
    patchGlobalList('gross_live_positions', next);
    
    // SYNC TO RELATIONAL DATABASE
    createPositionInDatabase(positionWithUserId).catch(err => {
      console.error('Failed to sync new position to relational DB:', err);
    });
  };

  const removePosition = (positionId: string) => {
    const position = positions.find(p => p.id === positionId);
    const next = positions.filter(p => p.id !== positionId);
    setPositions(next);
    patchGlobalList('gross_live_positions', next);

    // SYNC TO RELATIONAL DATABASE
    if (position) {
      closePositionInDatabase(positionId, position.currentPrice).catch(err => {
        console.error('Failed to sync position closure to relational DB:', err);
      });
    }
  };

  const updatePosition = (positionId: string, updates: Partial<Position>) => {
    const next = positions.map(p => p.id === positionId ? { ...p, ...updates } : p);
    setPositions(next);
    patchGlobalList('gross_live_positions', next);
  };

  const addOrder = (order: Order) => {
    const userId = auth.currentUser?.id;
    if (!userId) return;

    const orderWithUserId: Order = { ...order, userId };
    const next = [...orders, orderWithUserId];
    setOrders(next);
    patchGlobalList('gross_live_orders', next);
  };

  const removeOrder = (orderId: string) => {
    const next = orders.filter(o => o.id !== orderId);
    setOrders(next);
    patchGlobalList('gross_live_orders', next);
  };

  const updateOrder = (orderId: string, updates: Partial<Order>) => {
    const next = orders.map(o => o.id === orderId ? { ...o, ...updates } : o);
    setOrders(next);
    patchGlobalList('gross_live_orders', next);
  };

  const addHistory = (item: HistoryItem) => {
    const userId = auth.currentUser?.id;
    if (!userId) return;

    const itemWithUserId: HistoryItem = { ...item, userId };
    const next = [itemWithUserId, ...history];
    setHistory(next);
    patchGlobalList('gross_live_history', next);
  };

  const updateAccount = (updates: Partial<Account>) => {
    setAccount({ ...account, ...updates });
  };

  const addPortfolioSnapshot = () => {
    const snapshot: PortfolioSnapshot = {
      timestamp: new Date(),
      equity: account.equity,
      balance: account.balance,
      pnl: account.realizedPnL + account.unrealizedPnL,
    };
    setPortfolioHistory([...portfolioHistory, snapshot]);
  };


  const depositToTradingAccount = (amount: number) => {
    const newBalance = account.balance + amount;
    const newAcc = { ...account, balance: newBalance };
    setAccount(newAcc);
    
    // Update global user record
    if (auth.currentUser) {
      auth.updateUser(auth.currentUser.id, { balance: newBalance, liveBalance: newBalance });
    }
  };

  const withdrawFromTradingAccount = (amount: number) => {
    if (account.balance < amount) return false;
    const newBalance = account.balance - amount;
    const newAcc = { ...account, balance: newBalance };
    setAccount(newAcc);
    
    // Update global user record
    if (auth.currentUser) {
      auth.updateUser(auth.currentUser.id, { balance: newBalance, liveBalance: newBalance });
    }
    return true;
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