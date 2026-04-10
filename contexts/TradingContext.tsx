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
  mode: 'paper' | 'live';
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
  mode: 'paper' | 'live';
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
  mode: 'paper' | 'live';
}

export interface Account {
  balance: number;
  equity: number;
  realizedPnL: number;
  unrealizedPnL: number;
  margin: number;
  availableFunds: number;
  bonus: number;
}

export interface PortfolioSnapshot {
  timestamp: Date;
  equity: number;
  balance: number;
  pnl: number;
}

interface TradingContextType {
  // Paper trading state
  paperPositions: Position[];
  setPaperPositions: (positions: Position[]) => void;
  paperOrders: Order[];
  setPaperOrders: (orders: Order[]) => void;
  paperHistory: HistoryItem[];
  setPaperHistory: (history: HistoryItem[]) => void;
  paperAccount: Account;
  setPaperAccount: (account: Account) => void;
  paperPortfolioHistory: PortfolioSnapshot[];
  setPaperPortfolioHistory: (history: PortfolioSnapshot[]) => void;

  // Live trading state
  livePositions: Position[];
  setLivePositions: (positions: Position[]) => void;
  liveOrders: Order[];
  setLiveOrders: (orders: Order[]) => void;
  liveHistory: HistoryItem[];
  setLiveHistory: (history: HistoryItem[]) => void;
  liveAccount: Account;
  setLiveAccount: (account: Account) => void;
  livePortfolioHistory: PortfolioSnapshot[];
  setLivePortfolioHistory: (history: PortfolioSnapshot[]) => void;

  // Current trading mode
  tradingMode: 'paper' | 'live';
  setTradingMode: (mode: 'paper' | 'live') => void;

  // Helper getters
  positions: Position[];
  orders: Order[];
  history: HistoryItem[];
  account: Account;
  portfolioHistory: PortfolioSnapshot[];

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
  depositToTradingAccount: (amount: number, mode: 'paper' | 'live') => void;
  withdrawFromTradingAccount: (amount: number, mode: 'paper' | 'live') => boolean;
}

const TradingContext = createContext<TradingContextType | undefined>(undefined);

export function TradingProvider({ children }: { children: ReactNode }) {
  const marketData = useMarketData();
  const auth = useAuth();
  const [tradingMode, setTradingMode] = useState<'paper' | 'live'>('live');

  // Get default paper balance from admin settings
  const getDefaultPaperBalance = () => {
    const settings = localStorage.getItem('admin_trading_settings');
    if (settings) {
      try {
        const parsed = JSON.parse(settings);
        return parsed.defaultPaperBalance || 10000;
      } catch {
        return 10000;
      }
    }
    return 10000; // Default $10,000 for paper trading
  };

  // Paper trading state
  const [paperPositions, setPaperPositions] = useState<Position[]>([]);
  const [paperOrders, setPaperOrders] = useState<Order[]>([]);
  const [paperHistory, setPaperHistory] = useState<HistoryItem[]>([]);
  const [paperAccount, setPaperAccount] = useState<Account>(() => {
    // Check if account exists in localStorage first
    const stored = localStorage.getItem('gross_paper_account');
    if (stored) {
      return JSON.parse(stored);
    }
    // Otherwise, initialize with default paper balance
    const defaultBalance = getDefaultPaperBalance();
    return {
      balance: defaultBalance,
      equity: defaultBalance,
      realizedPnL: 0,
      unrealizedPnL: 0,
      margin: 0,
      availableFunds: defaultBalance,
      bonus: 0,
    };
  });
  const [paperPortfolioHistory, setPaperPortfolioHistory] = useState<PortfolioSnapshot[]>([]);

  // Live trading state
  const [livePositions, setLivePositions] = useState<Position[]>([]);
  const [liveOrders, setLiveOrders] = useState<Order[]>([]);
  const [liveHistory, setLiveHistory] = useState<HistoryItem[]>([]);
  const [liveAccount, setLiveAccount] = useState<Account>({
    balance: 0, // Start at $0 - user must deposit
    equity: 0,
    realizedPnL: 0,
    unrealizedPnL: 0,
    margin: 0,
    availableFunds: 0,
    bonus: 0,
  });
  // Guard: prevent the save effect from overwriting a stored balance on first mount
  const isLiveAccountHydrated = useRef(false);
  const pendingLiveHydration = useRef(false);
  const [livePortfolioHistory, setLivePortfolioHistory] = useState<PortfolioSnapshot[]>([]);

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
        mode: 'live', // Positions from database are live positions
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
        status: 'closed',
        mode: 'live'
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
      
      // 1. Fetch Relational Data (Prioritized for Live Mode)
      const [dbPositions, dbHistory] = await Promise.all([
        fetchPositionsFromDatabase(userId),
        fetchTradeHistoryFromDatabase(userId)
      ]);

      // 2. Fetch KV Data (Backup and metadata)
      const [paperAccountDb, liveAccountDb, paperPosDb, paperOrdDb, paperHisDb, livePosDb, liveOrdDb, liveHisDb] = await Promise.all([
        getKV(`gross_paper_account_${userId}`),
        getKV(`gross_live_account_${userId}`),
        getKV('gross_paper_positions'),
        getKV('gross_paper_orders'),
        getKV('gross_paper_history'),
        getKV('gross_live_positions'),
        getKV('gross_live_orders'),
        getKV('gross_live_history')
      ]);

      const filterByUser = (items: any[]) => (items || []).filter(item => item.userId === userId);

      // 3. Hydrate Account States
      if (paperAccountDb) setPaperAccount(paperAccountDb);
      if (liveAccountDb) {
        setLiveAccount(liveAccountDb);
        isLiveAccountHydrated.current = true;
      }

      // 4. Hydrate Positions
      // Combine RELATIONAL and KV positions (Relational is source of truth for open trades)
      // Map relational positions to KV-style for state consistency
      const livePositionsFromKV = filterByUser(livePosDb);
      
      // Merge: Relational has IDs that should match. Use Relational for open trades.
      if (dbPositions.length > 0) {
        setLivePositions(dbPositions);
      } else if (livePositionsFromKV.length > 0) {
        setLivePositions(livePositionsFromKV);
      }

      // 5. Hydrate History
      const liveHistoryFromKV = filterByUser(liveHisDb);
      if (dbHistory.length > 0) {
        setLiveHistory(dbHistory);
      } else if (liveHistoryFromKV.length > 0) {
        setLiveHistory(liveHistoryFromKV);
      }

      // 6. Hydrate Paper & Orders (KV only)
      if (paperPosDb) setPaperPositions(filterByUser(paperPosDb));
      if (paperOrdDb) setPaperOrders(filterByUser(paperOrdDb));
      if (paperHisDb) setPaperHistory(filterByUser(paperHisDb));
      if (liveOrdDb)  setLiveOrders(filterByUser(liveOrdDb));
      
      console.log('✅ Trading data successfully hydrated');
    } catch (err) {
      console.error('❌ Failed to hydrate trading data:', err);
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
          case `gross_paper_account_${userId}`: setPaperAccount(value); break;
          case `gross_live_account_${userId}`:  setLiveAccount(value); break;
          case 'gross_paper_positions': setPaperPositions(filterByUser(value)); break;
          case 'gross_paper_orders':    setPaperOrders(filterByUser(value)); break;
          case 'gross_paper_history':   setPaperHistory(filterByUser(value)); break;
          case 'gross_live_positions':  setLivePositions(filterByUser(value)); break;
          case 'gross_live_orders':     setLiveOrders(filterByUser(value)); break;
          case 'gross_live_history':    setLiveHistory(filterByUser(value)); break;
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
    // Only the owner of a change or an admin should ideally push? 
    // Actually, in this model, every client is a sync node.
    if (paperPositions.length > 0) {
      const allStr = localStorage.getItem('gross_paper_positions');
      if (allStr) syncListToDB('gross_paper_positions', JSON.parse(allStr));
    }
  }, [paperPositions, syncListToDB]);

  useEffect(() => {
    if (livePositions.length > 0) {
      const allStr = localStorage.getItem('gross_live_positions');
      if (allStr) syncListToDB('gross_live_positions', JSON.parse(allStr));
    }
  }, [livePositions, syncListToDB]);

  useEffect(() => {
    if (paperHistory.length > 0) {
      const allStr = localStorage.getItem('gross_paper_history');
      if (allStr) syncListToDB('gross_paper_history', JSON.parse(allStr));
    }
  }, [paperHistory, syncListToDB]);

  useEffect(() => {
    if (liveHistory.length > 0) {
      const allStr = localStorage.getItem('gross_live_history');
      if (allStr) syncListToDB('gross_live_history', JSON.parse(allStr));
    }
  }, [liveHistory, syncListToDB]);

  useEffect(() => {
    if (paperOrders.length > 0) {
      const allStr = localStorage.getItem('gross_paper_orders');
      if (allStr) syncListToDB('gross_paper_orders', JSON.parse(allStr));
    }
  }, [paperOrders, syncListToDB]);

  useEffect(() => {
    if (liveOrders.length > 0) {
      const allStr = localStorage.getItem('gross_live_orders');
      if (allStr) syncListToDB('gross_live_orders', JSON.parse(allStr));
    }
  }, [liveOrders, syncListToDB]);

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

        if (e.key === 'gross_paper_positions') setPaperPositions(filtered);
        if (e.key === 'gross_paper_orders') setPaperOrders(filtered);
        if (e.key === 'gross_paper_history') setPaperHistory(filtered);
        if (e.key === 'gross_live_positions') setLivePositions(filtered);
        if (e.key === 'gross_live_orders') setLiveOrders(filtered);
        if (e.key === 'gross_live_history') setLiveHistory(filtered);
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
      isLiveAccountHydrated.current = false;
      return;
    }

    // Reset hydration state for the new user context
    isLiveAccountHydrated.current = false;
    pendingLiveHydration.current = false;

    // Always prioritize per-user key for explicit session isolation
    const stored = localStorage.getItem(`gross_live_account_${userId}`);

    if (stored) {
      try {
        setLiveAccount(JSON.parse(stored));
        pendingLiveHydration.current = true;
      } catch { 
        // fallback for malformed data
        isLiveAccountHydrated.current = true;
      }
    } else {
      // No stored data — nothing to overwrite, safe to allow saves immediately
      isLiveAccountHydrated.current = true;
    }
  }, [auth.currentUser?.id]);

  // Complete hydration AFTER setLiveAccount has been processed by React.
  // This ensures the save effect sees the correct (hydrated) liveAccount
  // value rather than the stale initial { balance: 0 }.
  useEffect(() => {
    if (pendingLiveHydration.current) {
      pendingLiveHydration.current = false;
      isLiveAccountHydrated.current = true;
    }
  }, [liveAccount]);

  // Save account state to localStorage
  useEffect(() => {
    localStorage.setItem('gross_paper_account', JSON.stringify(paperAccount));
  }, [paperAccount]);

  // Guarded save: only write after the stored value has been loaded,
  // and always use the per-user key so each user has their own balance.
  useEffect(() => {
    const userId = auth.currentUser?.id;
    if (!isLiveAccountHydrated.current || !userId) return;
    
    // 1. Local cache
    const liveKey = `gross_live_account_${userId}`;
    localStorage.setItem(liveKey, JSON.stringify(liveAccount));
    // Keep the generic key in sync so the storage-event listener can still read it
    localStorage.setItem('gross_live_account', JSON.stringify(liveAccount));

    // 2. Database Sync (Aggressive 1s debounce)
    const timeout = setTimeout(() => {
      setKV(liveKey, liveAccount);
      console.log('✅ Live account synced to DB for user:', userId);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [liveAccount, auth.currentUser?.id]);

  // Similar sync for paper account
  useEffect(() => {
    const userId = auth.currentUser?.id;
    if (!userId) return;

    const paperKey = `gross_paper_account_${userId}`;
    localStorage.setItem(paperKey, JSON.stringify(paperAccount));
    localStorage.setItem('gross_paper_account', JSON.stringify(paperAccount));

    const timeout = setTimeout(() => {
      setKV(paperKey, paperAccount);
      console.log('✅ Paper account synced to DB for user:', userId);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [paperAccount, auth.currentUser?.id]);

  // Listen for storage events to sync balance changes from admin in real-time
  useEffect(() => {
    const handleStorageChange = (e?: StorageEvent) => {
      const currentUserId = auth.currentUser?.id;
      if (!currentUserId) return;

      // Only respond to events for THIS user's specific account keys
      const liveKey = `gross_live_account_${currentUserId}`;
      const paperKey = `gross_paper_account_${currentUserId}`;

      // If it's a StorageEvent (from another tab), only react if it's our key.
      // If it's a generic Event (from dispatchEvent), it won't have a 'key', so we always reload.
      if (e && 'key' in e && e.key && e.key !== liveKey && e.key !== paperKey) {
        return;
      }

      console.log('📬 Storage event received for user:', currentUserId);
      const rawLive = localStorage.getItem(liveKey);
      if (rawLive) {
        try {
          const parsed = JSON.parse(rawLive);
          setLiveAccount(parsed);
          isLiveAccountHydrated.current = true;
          console.log(`✅ Live balance synced for ${currentUserId}: $${parsed.balance}`);
        } catch { /* ignore */ }
      }

      const rawPaper = localStorage.getItem(paperKey);
      if (rawPaper) {
        try {
          setPaperAccount(JSON.parse(rawPaper));
        } catch { /* ignore */ }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [auth.currentUser?.id]);

  // Helper getters
  const positions = tradingMode === 'paper' ? paperPositions : livePositions;
  const orders = tradingMode === 'paper' ? paperOrders : liveOrders;
  const history = tradingMode === 'paper' ? paperHistory : liveHistory;
  const account = tradingMode === 'paper' ? paperAccount : liveAccount;
  const portfolioHistory = tradingMode === 'paper' ? paperPortfolioHistory : livePortfolioHistory;

  // Helper to persist changes to the global list in a way that doesn't overwrite others
  const patchGlobalList = useCallback((key: string, items: any[], mode: 'paper' | 'live') => {
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
    
    if (tradingMode === 'paper') {
      const next = [...paperPositions, positionWithUserId];
      setPaperPositions(next);
      patchGlobalList('gross_paper_positions', next, 'paper');
    } else {
      const next = [...livePositions, positionWithUserId];
      setLivePositions(next);
      patchGlobalList('gross_live_positions', next, 'live');
      
      // SYNC TO RELATIONAL DATABASE
      createPositionInDatabase(positionWithUserId).catch(err => {
        console.error('Failed to sync new position to relational DB:', err);
      });
    }
  };

  const removePosition = (positionId: string) => {
    if (tradingMode === 'paper') {
      const next = paperPositions.filter(p => p.id !== positionId);
      setPaperPositions(next);
      patchGlobalList('gross_paper_positions', next, 'paper');
    } else {
      const position = livePositions.find(p => p.id === positionId);
      const next = livePositions.filter(p => p.id !== positionId);
      setLivePositions(next);
      patchGlobalList('gross_live_positions', next, 'live');

      // SYNC TO RELATIONAL DATABASE
      if (position) {
        closePositionInDatabase(positionId, position.currentPrice).catch(err => {
          console.error('Failed to sync position closure to relational DB:', err);
        });
      }
    }
  };

  const updatePosition = (positionId: string, updates: Partial<Position>) => {
    if (tradingMode === 'paper') {
      const next = paperPositions.map(p => p.id === positionId ? { ...p, ...updates } : p);
      setPaperPositions(next);
      patchGlobalList('gross_paper_positions', next, 'paper');
    } else {
      const next = livePositions.map(p => p.id === positionId ? { ...p, ...updates } : p);
      setLivePositions(next);
      patchGlobalList('gross_live_positions', next, 'live');
    }
  };

  const addOrder = (order: Order) => {
    const userId = auth.currentUser?.id;
    if (!userId) return;

    const orderWithUserId: Order = { ...order, userId };
    if (tradingMode === 'paper') {
      const next = [...paperOrders, orderWithUserId];
      setPaperOrders(next);
      patchGlobalList('gross_paper_orders', next, 'paper');
    } else {
      const next = [...liveOrders, orderWithUserId];
      setLiveOrders(next);
      patchGlobalList('gross_live_orders', next, 'live');
    }
  };

  const removeOrder = (orderId: string) => {
    if (tradingMode === 'paper') {
      const next = paperOrders.filter(o => o.id !== orderId);
      setPaperOrders(next);
      patchGlobalList('gross_paper_orders', next, 'paper');
    } else {
      const next = liveOrders.filter(o => o.id !== orderId);
      setLiveOrders(next);
      patchGlobalList('gross_live_orders', next, 'live');
    }
  };

  const updateOrder = (orderId: string, updates: Partial<Order>) => {
    if (tradingMode === 'paper') {
      const next = paperOrders.map(o => o.id === orderId ? { ...o, ...updates } : o);
      setPaperOrders(next);
      patchGlobalList('gross_paper_orders', next, 'paper');
    } else {
      const next = liveOrders.map(o => o.id === orderId ? { ...o, ...updates } : o);
      setLiveOrders(next);
      patchGlobalList('gross_live_orders', next, 'live');
    }
  };

  const addHistory = (item: HistoryItem) => {
    const userId = auth.currentUser?.id;
    if (!userId) return;

    const itemWithUserId: HistoryItem = { ...item, userId };
    if (tradingMode === 'paper') {
      const next = [itemWithUserId, ...paperHistory];
      setPaperHistory(next);
      patchGlobalList('gross_paper_history', next, 'paper');
    } else {
      const next = [itemWithUserId, ...liveHistory];
      setLiveHistory(next);
      patchGlobalList('gross_live_history', next, 'live');
    }
  };

  const updateAccount = (updates: Partial<Account>) => {
    if (tradingMode === 'paper') {
      setPaperAccount({ ...paperAccount, ...updates });
    } else {
      setLiveAccount({ ...liveAccount, ...updates });
    }
  };

  const addPortfolioSnapshot = () => {
    const snapshot: PortfolioSnapshot = {
      timestamp: new Date(),
      equity: account.equity,
      balance: account.balance,
      pnl: account.realizedPnL + account.unrealizedPnL,
    };
    if (tradingMode === 'paper') {
      setPaperPortfolioHistory([...paperPortfolioHistory, snapshot]);
    } else {
      setLivePortfolioHistory([...livePortfolioHistory, snapshot]);
    }
  };

  const depositToTradingAccount = (amount: number, mode: 'paper' | 'live') => {
    if (mode === 'paper') {
      const newAcc = { ...paperAccount, balance: paperAccount.balance + amount };
      setPaperAccount(newAcc);
    } else {
      const newBalance = liveAccount.balance + amount;
      const newAcc = { ...liveAccount, balance: newBalance };
      setLiveAccount(newAcc);
      
      // Update global user record
      if (auth.currentUser) {
        auth.updateUser(auth.currentUser.id, { balance: newBalance, liveBalance: newBalance });
      }
    }
  };

  const withdrawFromTradingAccount = (amount: number, mode: 'paper' | 'live') => {
    if (mode === 'paper') {
      if (paperAccount.balance < amount) return false;
      const newAcc = { ...paperAccount, balance: paperAccount.balance - amount };
      setPaperAccount(newAcc);
      return true;
    } else {
      if (liveAccount.balance < amount) return false;
      const newBalance = liveAccount.balance - amount;
      const newAcc = { ...liveAccount, balance: newBalance };
      setLiveAccount(newAcc);
      
      // Update global user record
      if (auth.currentUser) {
        auth.updateUser(auth.currentUser.id, { balance: newBalance, liveBalance: newBalance });
      }
      return true;
    }
  };

  // Subscribe to market data for all positions and update prices in real-time
  // Use a ref to track subscribed symbols so we only re-subscribe when the
  // set of unique symbols actually changes, NOT on every position update.
  const subscribedSymbolsKeyRef = useRef('');
  
  useEffect(() => {
    const allPositions = [...paperPositions, ...livePositions];
    const uniqueSymbols = new Set(allPositions.map(p => p.symbol));
    const symbolsKey = Array.from(uniqueSymbols).sort().join(',');
    
    // Only re-subscribe if the set of symbols has actually changed
    if (symbolsKey === subscribedSymbolsKeyRef.current) return;
    subscribedSymbolsKeyRef.current = symbolsKey;
    
    // Subscribe to all symbols
    uniqueSymbols.forEach(symbol => {
      marketData.subscribeToSymbol(symbol);
    });

    // No cleanup unsubscribe here — symbols stay subscribed as long as
    // they are in positions. Unsubscription happens naturally when the
    // MarketDataProvider unmounts or when symbols are removed.
  }, [paperPositions, livePositions]);

  // Update position prices and P&L on a fixed 5-second interval
  // instead of reacting to every `marketData.prices` change to prevent loops.
  const paperPositionsRef = useRef(paperPositions);
  const livePositionsRef = useRef(livePositions);
  const paperAccountRef = useRef(paperAccount);
  const liveAccountRef = useRef(liveAccount);
  
  // Keep refs in sync
  paperPositionsRef.current = paperPositions;
  livePositionsRef.current = livePositions;
  paperAccountRef.current = paperAccount;
  liveAccountRef.current = liveAccount;

  useEffect(() => {
    const PRICE_UPDATE_INTERVAL = 5000; // Same 5s as MarketDataContext
    
    const updateAllPositionPrices = () => {
      const updatePositionPrices = (
        positions: Position[],
        setPositions: (pos: Position[]) => void,
        accountState: Account,
        setAccountState: (acc: Account) => void
      ) => {
        // When no positions remain, reset unrealized P&L, margin, and derived values
        if (positions.length === 0) {
          if (accountState.unrealizedPnL !== 0 || accountState.margin !== 0) {
            setAccountState({
              ...accountState,
              equity: accountState.balance,
              unrealizedPnL: 0,
              margin: 0,
              availableFunds: accountState.balance,
            });
          }
          return;
        }
        
        let totalUnrealizedPnL = 0;
        let totalMargin = 0;
        let hasUpdates = false;
        
        const updatedPositions = positions.map(position => {
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

        const equity = accountState.balance + totalUnrealizedPnL;
        const availableFunds = equity - totalMargin;

        if (hasUpdates) {
          setPositions(updatedPositions);
          setAccountState({
            ...accountState,
            equity,
            unrealizedPnL: totalUnrealizedPnL,
            margin: totalMargin,
            availableFunds,
          });
        }
      };

      // Update both paper and live positions using refs (no stale closures)
      updatePositionPrices(
        paperPositionsRef.current, setPaperPositions,
        paperAccountRef.current, setPaperAccount
      );
      updatePositionPrices(
        livePositionsRef.current, setLivePositions,
        liveAccountRef.current, setLiveAccount
      );
    };

    // Run once immediately, then on interval
    updateAllPositionPrices();
    const interval = setInterval(updateAllPositionPrices, PRICE_UPDATE_INTERVAL);
    
    return () => clearInterval(interval);
  }, []); // Empty deps — uses refs internally, runs on a fixed interval

  const value: TradingContextType = {
    paperPositions,
    setPaperPositions,
    paperOrders,
    setPaperOrders,
    paperHistory,
    setPaperHistory,
    paperAccount,
    setPaperAccount,
    paperPortfolioHistory,
    setPaperPortfolioHistory,
    livePositions,
    setLivePositions,
    liveOrders,
    setLiveOrders,
    liveHistory,
    setLiveHistory,
    liveAccount,
    setLiveAccount,
    livePortfolioHistory,
    setLivePortfolioHistory,
    tradingMode,
    setTradingMode,
    positions,
    orders,
    history,
    account,
    portfolioHistory,
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