import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { useMarketData } from './MarketDataContext';
import { useAuth } from './AuthContext';
import { projectId, publicAnonKey } from '../utils/supabase/info';

// @refresh reset

// ============================================
// API CONFIGURATION
// ============================================

const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-5d4be467`;

// ============================================
// TYPES
// ============================================

// Define types
export interface Position {
  id: string;
  userId: string; // Track which user owns this position
  symbol: string;
  side: 'buy' | 'sell';
  units: number;
  entryPrice: number;
  currentPrice: number;
  stopLoss?: number;
  takeProfit?: number;
  leverage: number;
  pnl: number;
  margin: number;
  timestamp: Date;
  mode: 'paper' | 'live';
  status?: 'open' | 'closed'; // Add status for database
}

export interface Order {
  id: string;
  userId: string; // Track which user owns this order
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
  userId: string; // Track which user owns this history item
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
   * Load live positions and history from database when user is authenticated
   */
  useEffect(() => {
    const loadUserData = async () => {
      if (auth.currentUser && auth.currentUser.id) {
        console.log('🔄 Loading trading data for user:', auth.currentUser.id);
        
        // Fetch live positions from database
        const dbPositions = await fetchPositionsFromDatabase(auth.currentUser.id);
        if (dbPositions.length > 0) {
          setLivePositions(dbPositions);
        }

        // Fetch trade history from database
        const dbHistory = await fetchTradeHistoryFromDatabase(auth.currentUser.id);
        if (dbHistory.length > 0) {
          setLiveHistory(dbHistory);
        }
      }
    };

    loadUserData();
  }, [auth.currentUser?.id]);

  // Load from localStorage on mount (now per-user)
  useEffect(() => {
    const userId = auth.currentUser?.id;
    if (!userId) return;

    const storedPaperPositions = localStorage.getItem(`gross_paper_positions_${userId}`);
    const storedPaperOrders = localStorage.getItem(`gross_paper_orders_${userId}`);
    const storedPaperHistory = localStorage.getItem(`gross_paper_history_${userId}`);
    const storedLivePositions = localStorage.getItem(`gross_live_positions_${userId}`);
    const storedLiveOrders = localStorage.getItem(`gross_live_orders_${userId}`);
    const storedLiveHistory = localStorage.getItem(`gross_live_history_${userId}`);

    if (storedPaperPositions) setPaperPositions(JSON.parse(storedPaperPositions));
    if (storedPaperOrders) setPaperOrders(JSON.parse(storedPaperOrders));
    if (storedPaperHistory) setPaperHistory(JSON.parse(storedPaperHistory));
    if (storedLivePositions) setLivePositions(JSON.parse(storedLivePositions));
    if (storedLiveOrders) setLiveOrders(JSON.parse(storedLiveOrders));
    if (storedLiveHistory) setLiveHistory(JSON.parse(storedLiveHistory));
  }, [auth.currentUser?.id]); // Re-load when user changes (e.g. in same tab)

  // Save to localStorage whenever data changes (per-user)
  useEffect(() => {
    const userId = auth.currentUser?.id;
    if (!userId) return;
    localStorage.setItem(`gross_paper_positions_${userId}`, JSON.stringify(paperPositions));
  }, [paperPositions, auth.currentUser?.id]);

  useEffect(() => {
    const userId = auth.currentUser?.id;
    if (!userId) return;
    localStorage.setItem(`gross_paper_orders_${userId}`, JSON.stringify(paperOrders));
  }, [paperOrders, auth.currentUser?.id]);

  useEffect(() => {
    const userId = auth.currentUser?.id;
    if (!userId) return;
    localStorage.setItem(`gross_paper_history_${userId}`, JSON.stringify(paperHistory));
  }, [paperHistory, auth.currentUser?.id]);

  useEffect(() => {
    const userId = auth.currentUser?.id;
    if (!userId) return;
    localStorage.setItem(`gross_live_positions_${userId}`, JSON.stringify(livePositions));
  }, [livePositions, auth.currentUser?.id]);

  useEffect(() => {
    const userId = auth.currentUser?.id;
    if (!userId) return;
    localStorage.setItem(`gross_live_orders_${userId}`, JSON.stringify(liveOrders));
  }, [liveOrders, auth.currentUser?.id]);

  useEffect(() => {
    const userId = auth.currentUser?.id;
    if (!userId) return;
    localStorage.setItem(`gross_live_history_${userId}`, JSON.stringify(liveHistory));
  }, [liveHistory, auth.currentUser?.id]);

  // Lazy-init live account from per-user localStorage key when user is known.
  // This runs AFTER the save effect, so the ref guard prevents the initial
  // zero-balance from ever being written before the stored value is loaded.
  useEffect(() => {
    const userId = auth.currentUser?.id;
    if (!userId) return;

    // Always prioritize per-user key for explicit session isolation
    const stored = localStorage.getItem(`gross_live_account_${userId}`);

    if (stored) {
      try {
        setLiveAccount(JSON.parse(stored));
        // Mark pending — the save effect must NOT run until React has processed
        // the setLiveAccount call above.  We'll flip isLiveAccountHydrated in
        // a separate effect that depends on [liveAccount].
        pendingLiveHydration.current = true;
      } catch { /* ignore malformed data */ }
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
    localStorage.setItem(`gross_live_account_${userId}`, JSON.stringify(liveAccount));
    // Keep the generic key in sync so the storage-event listener can still read it
    localStorage.setItem('gross_live_account', JSON.stringify(liveAccount));
  }, [liveAccount, auth.currentUser?.id]);

  // Listen for storage events to sync balance changes from admin in real-time
  useEffect(() => {
    const handleStorageChange = (e?: StorageEvent) => {
      const currentUserId = auth.currentUser?.id;
      if (!currentUserId) return;

      // Only respond to events for THIS user's specific account keys
      const liveKey = `gross_live_account_${currentUserId}`;
      const paperKey = `gross_paper_account_${currentUserId}`;

      if (e && e.key && e.key !== liveKey && e.key !== paperKey) {
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

  // Actions
  const addPosition = (position: Position) => {
    // Get current market price for the symbol if available
    const priceData = marketData.getPrice(position.symbol);
    const currentMarketPrice = priceData?.price || position.entryPrice;
    
    // Ensure currentPrice is set to live market price
    const positionWithPrice = {
      ...position,
      currentPrice: currentMarketPrice
    };
    
    if (tradingMode === 'paper') {
      setPaperPositions([...paperPositions, positionWithPrice]);
    } else {
      setLivePositions([...livePositions, positionWithPrice]);
    }
  };

  const removePosition = (positionId: string) => {
    if (tradingMode === 'paper') {
      setPaperPositions(paperPositions.filter(p => p.id !== positionId));
    } else {
      setLivePositions(livePositions.filter(p => p.id !== positionId));
    }
  };

  const updatePosition = (positionId: string, updates: Partial<Position>) => {
    if (tradingMode === 'paper') {
      setPaperPositions(paperPositions.map(p => 
        p.id === positionId ? { ...p, ...updates } : p
      ));
    } else {
      setLivePositions(livePositions.map(p => 
        p.id === positionId ? { ...p, ...updates } : p
      ));
    }
  };

  const addOrder = (order: Order) => {
    if (tradingMode === 'paper') {
      setPaperOrders([...paperOrders, order]);
    } else {
      setLiveOrders([...liveOrders, order]);
    }
  };

  const removeOrder = (orderId: string) => {
    if (tradingMode === 'paper') {
      setPaperOrders(paperOrders.filter(o => o.id !== orderId));
    } else {
      setLiveOrders(liveOrders.filter(o => o.id !== orderId));
    }
  };

  const updateOrder = (orderId: string, updates: Partial<Order>) => {
    if (tradingMode === 'paper') {
      setPaperOrders(paperOrders.map(o => 
        o.id === orderId ? { ...o, ...updates } : o
      ));
    } else {
      setLiveOrders(liveOrders.map(o => 
        o.id === orderId ? { ...o, ...updates } : o
      ));
    }
  };

  const addHistory = (item: HistoryItem) => {
    if (tradingMode === 'paper') {
      setPaperHistory([item, ...paperHistory]);
    } else {
      setLiveHistory([item, ...liveHistory]);
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
          
          const pnl = priceDiff * position.units * position.leverage;
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