import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { useTrading } from './TradingContext';
import { useAuth } from './AuthContext';
import { useMarketData } from './MarketDataContext';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from 'sonner';
import { setKV } from '../utils/supabase/client';

// @refresh reset

// ============================================
// API CONFIGURATION
// ============================================

const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-5d4be467`;

// ============================================
// TYPES
// ============================================

// Strategy types
export type StrategyType = 'scalping' | 'trend-following' | 'grid-trading' | 'mean-reversion' | 'breakout';

export interface TechnicalIndicators {
  sma20: number;
  sma50: number;
  sma200: number;
  rsi: number;
  macd: number;
  macdSignal: number;
  bollinger: {
    upper: number;
    middle: number;
    lower: number;
  };
}

export interface StrategyConfig {
  id: string;
  userId: string;
  name: string;
  type: StrategyType;
  symbol: string;
  isActive: boolean;
  mode: 'paper' | 'live';
  
  // Risk management
  investmentAmount: number;
  maxDrawdown: number; // percentage
  stopLossPercent: number;
  takeProfitPercent: number;
  leverage: number;
  
  // Strategy-specific parameters
  parameters: {
    timeframe?: '1m' | '5m' | '15m' | '1h' | '4h' | '1d';
    rsiOverbought?: number;
    rsiOversold?: number;
    gridLevels?: number;
    gridSpacing?: number;
    trendStrength?: number;
  };
  
  // Performance tracking
  totalTrades: number;
  winningTrades: number;
  totalProfit: number;
  currentDrawdown: number;
  createdAt: Date;
  lastTradeAt?: Date;
}

export interface StrategySignal {
  strategyId: string;
  symbol: string;
  action: 'buy' | 'sell' | 'close';
  reason: string;
  confidence: number; // 0-100
  price: number;
  timestamp: Date;
}

interface AutoTraderContextType {
  strategies: StrategyConfig[];
  loading: boolean;
  addStrategy: (strategy: Omit<StrategyConfig, 'id' | 'totalTrades' | 'winningTrades' | 'totalProfit' | 'currentDrawdown' | 'createdAt'>) => string;
  updateStrategy: (strategyId: string, updates: Partial<StrategyConfig>) => void;
  deleteStrategy: (strategyId: string) => void;
  toggleStrategy: (strategyId: string, isActive: boolean) => void;
  getUserStrategies: (userId: string) => StrategyConfig[];
  getAllStrategies: () => StrategyConfig[]; // Admin only
  pauseAllStrategies: () => void;
  calculateIndicators: (symbol: string, prices: number[]) => TechnicalIndicators;
  getStrategySignal: (strategy: StrategyConfig, indicators: TechnicalIndicators, currentPrice: number) => StrategySignal | null;
  // New database functions
  refreshStrategies: () => Promise<void>;
}

const AutoTraderContext = createContext<AutoTraderContextType | undefined>(undefined);

export const useAutoTrader = () => {
  const context = useContext(AutoTraderContext);
  if (!context) {
    throw new Error('useAutoTrader must be used within AutoTraderProvider');
  }
  return context;
};

export const AutoTraderProvider = ({ children }: { children: ReactNode }) => {
  const [strategies, setStrategies] = useState<StrategyConfig[]>([]);
  const [loading, setLoading] = useState(false);
  const { addPosition, account, tradingMode } = useTrading();
  const { currentUser } = useAuth();
  const marketData = useMarketData();

  // ============================================
  // API FUNCTIONS - Database Integration
  // ============================================

  /**
   * Fetch strategies from database for current user
   */
  const fetchStrategies = async (userId: string) => {
    try {
      const response = await fetch(`${serverUrl}/auto-trader/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (!response.ok) {
        console.error('Failed to fetch strategies:', response.statusText);
        return [];
      }

      const dbStrategies = await response.json();
      console.log('✅ Auto-trader strategies loaded from database:', dbStrategies.length);
      
      // Transform database format to app format
      return dbStrategies.map((strat: any) => ({
        id: strat.id,
        userId: strat.user_id,
        name: strat.name,
        type: strat.strategy_type,
        symbol: strat.symbol,
        isActive: strat.is_active || false,
        mode: strat.mode || 'paper',
        investmentAmount: parseFloat(strat.investment_amount || 0),
        maxDrawdown: parseFloat(strat.max_drawdown || 10),
        stopLossPercent: parseFloat(strat.stop_loss || 5),
        takeProfitPercent: parseFloat(strat.take_profit || 10),
        leverage: parseInt(strat.leverage || 1),
        parameters: strat.parameters ? JSON.parse(strat.parameters) : {},
        totalTrades: parseInt(strat.total_trades || 0),
        winningTrades: parseInt(strat.winning_trades || 0),
        totalProfit: parseFloat(strat.total_profit || 0),
        currentDrawdown: parseFloat(strat.current_drawdown || 0),
        createdAt: new Date(strat.created_at),
        lastTradeAt: strat.last_trade_at ? new Date(strat.last_trade_at) : undefined
      }));
    } catch (error) {
      console.error('Error fetching strategies:', error);
      return [];
    }
  };

  /**
   * Create strategy in database
   */
  const createStrategyInDatabase = async (strategy: Omit<StrategyConfig, 'id' | 'totalTrades' | 'winningTrades' | 'totalProfit' | 'currentDrawdown' | 'createdAt'>) => {
    try {
      const response = await fetch(`${serverUrl}/auto-trader`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: strategy.userId,
          name: strategy.name,
          strategy_type: strategy.type,
          symbol: strategy.symbol,
          is_active: strategy.isActive,
          mode: strategy.mode,
          investment_amount: strategy.investmentAmount,
          max_drawdown: strategy.maxDrawdown,
          stop_loss: strategy.stopLossPercent,
          take_profit: strategy.takeProfitPercent,
          leverage: strategy.leverage,
          parameters: JSON.stringify(strategy.parameters)
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create strategy');
      }

      const created = await response.json();
      console.log('✅ Auto-trader strategy created in database:', created.id);
      return created;
    } catch (error) {
      console.error('Error creating strategy:', error);
      throw error;
    }
  };

  /**
   * Update strategy in database
   */
  const updateStrategyInDatabase = async (strategyId: string, updates: Partial<StrategyConfig>) => {
    try {
      const updateData: any = {};
      
      if (updates.name) updateData.name = updates.name;
      if (updates.isActive !== undefined) updateData.is_active = updates.isActive;
      if (updates.investmentAmount) updateData.investment_amount = updates.investmentAmount;
      if (updates.parameters) updateData.parameters = JSON.stringify(updates.parameters);
      if (updates.totalTrades !== undefined) updateData.total_trades = updates.totalTrades;
      if (updates.winningTrades !== undefined) updateData.winning_trades = updates.winningTrades;
      if (updates.totalProfit !== undefined) updateData.total_profit = updates.totalProfit;
      if (updates.currentDrawdown !== undefined) updateData.current_drawdown = updates.currentDrawdown;

      const response = await fetch(`${serverUrl}/auto-trader/${strategyId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        throw new Error('Failed to update strategy');
      }

      console.log('✅ Strategy updated in database:', strategyId);
    } catch (error) {
      console.error('Error updating strategy:', error);
    }
  };

  /**
   * Delete strategy from database
   */
  const deleteStrategyInDatabase = async (strategyId: string) => {
    try {
      const response = await fetch(`${serverUrl}/auto-trader/${strategyId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete strategy');
      }

      console.log('✅ Strategy deleted from database:', strategyId);
    } catch (error) {
      console.error('Error deleting strategy:', error);
    }
  };

  /**
   * Refresh strategies from database
   */
  const refreshStrategies = async () => {
    if (!currentUser?.id) return;
    
    setLoading(true);
    try {
      const dbStrategies = await fetchStrategies(currentUser.id);
      setStrategies(dbStrategies);
    } catch (error) {
      console.error('Error refreshing strategies:', error);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // LOAD DATA FROM DATABASE ON MOUNT
  // ============================================

  /**
   * Load strategies when user is authenticated
   */
  useEffect(() => {
    const loadUserStrategies = async () => {
      if (currentUser && currentUser.id) {
        console.log('🔄 Loading auto-trader strategies for user:', currentUser.id);
        await refreshStrategies();
      }
    };

    loadUserStrategies();
  }, [currentUser?.id]);

  // Load strategies from localStorage (fallback)
  useEffect(() => {
    const stored = localStorage.getItem('gross_autotrader_strategies');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert date strings back to Date objects
      const strategiesWithDates = parsed.map((s: any) => ({
        ...s,
        createdAt: new Date(s.createdAt),
        lastTradeAt: s.lastTradeAt ? new Date(s.lastTradeAt) : undefined,
      }));
      setStrategies(strategiesWithDates);
    }
  }, []);

  // Sync strategies to Supabase KV (Debounced)
  const syncStrategiesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (strategies.length >= 0) {
      localStorage.setItem('gross_autotrader_strategies', JSON.stringify(strategies));
      
      if (syncStrategiesTimeoutRef.current) clearTimeout(syncStrategiesTimeoutRef.current);
      
      syncStrategiesTimeoutRef.current = setTimeout(async () => {
        try {
          await setKV('gross_autotrader_strategies', strategies);
          console.log('✅ Autotrader strategies synced to DB');
        } catch (err) {
          console.error('Failed to sync autotrader strategies:', err);
        }
      }, 3000);
    }
  }, [strategies]);

  // Cross-tab sync via storage event
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'gross_autotrader_strategies' && e.newValue) {
        try {
          setStrategies(JSON.parse(e.newValue));
        } catch (error) {
          console.error('Cross-tab autotrader sync failed:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Calculate technical indicators
  const calculateIndicators = (symbol: string, prices: number[]): TechnicalIndicators => {
    if (prices.length < 200) {
      // Not enough data, return defaults
      return {
        sma20: prices[prices.length - 1] || 0,
        sma50: prices[prices.length - 1] || 0,
        sma200: prices[prices.length - 1] || 0,
        rsi: 50,
        macd: 0,
        macdSignal: 0,
        bollinger: {
          upper: prices[prices.length - 1] || 0,
          middle: prices[prices.length - 1] || 0,
          lower: prices[prices.length - 1] || 0,
        }
      };
    }

    // Simple Moving Averages
    const sma20 = prices.slice(-20).reduce((a, b) => a + b, 0) / 20;
    const sma50 = prices.slice(-50).reduce((a, b) => a + b, 0) / 50;
    const sma200 = prices.slice(-200).reduce((a, b) => a + b, 0) / 200;

    // RSI Calculation
    const calculateRSI = (prices: number[], period: number = 14): number => {
      const changes = prices.slice(1).map((price, i) => price - prices[i]);
      const gains = changes.map(change => change > 0 ? change : 0);
      const losses = changes.map(change => change < 0 ? -change : 0);
      
      const avgGain = gains.slice(-period).reduce((a, b) => a + b, 0) / period;
      const avgLoss = losses.slice(-period).reduce((a, b) => a + b, 0) / period;
      
      if (avgLoss === 0) return 100;
      const rs = avgGain / avgLoss;
      return 100 - (100 / (1 + rs));
    };

    const rsi = calculateRSI(prices);

    // MACD Calculation (12, 26, 9)
    const ema12 = prices.slice(-12).reduce((a, b) => a + b, 0) / 12;
    const ema26 = prices.slice(-26).reduce((a, b) => a + b, 0) / 26;
    const macd = ema12 - ema26;
    const macdSignal = macd * 0.8; // Simplified signal line

    // Bollinger Bands
    const middle = sma20;
    const stdDev = Math.sqrt(
      prices.slice(-20).reduce((sum, price) => sum + Math.pow(price - middle, 2), 0) / 20
    );
    const bollinger = {
      upper: middle + (stdDev * 2),
      middle: middle,
      lower: middle - (stdDev * 2),
    };

    return {
      sma20,
      sma50,
      sma200,
      rsi,
      macd,
      macdSignal,
      bollinger,
    };
  };

  // Generate trading signal based on strategy type
  const getStrategySignal = (
    strategy: StrategyConfig,
    indicators: TechnicalIndicators,
    currentPrice: number
  ): StrategySignal | null => {
    const { type, parameters } = strategy;

    switch (type) {
      case 'scalping':
        // Scalping: Quick trades on RSI extremes + Bollinger bands
        if (indicators.rsi < (parameters.rsiOversold || 30) && currentPrice <= indicators.bollinger.lower) {
          return {
            strategyId: strategy.id,
            symbol: strategy.symbol,
            action: 'buy',
            reason: 'RSI oversold + price at lower Bollinger band',
            confidence: 85,
            price: currentPrice,
            timestamp: new Date(),
          };
        }
        if (indicators.rsi > (parameters.rsiOverbought || 70) && currentPrice >= indicators.bollinger.upper) {
          return {
            strategyId: strategy.id,
            symbol: strategy.symbol,
            action: 'sell',
            reason: 'RSI overbought + price at upper Bollinger band',
            confidence: 85,
            price: currentPrice,
            timestamp: new Date(),
          };
        }
        break;

      case 'trend-following':
        // Trend Following: Moving average crossovers
        if (indicators.sma20 > indicators.sma50 && indicators.sma50 > indicators.sma200) {
          return {
            strategyId: strategy.id,
            symbol: strategy.symbol,
            action: 'buy',
            reason: 'Golden cross - strong uptrend (SMA20 > SMA50 > SMA200)',
            confidence: 90,
            price: currentPrice,
            timestamp: new Date(),
          };
        }
        if (indicators.sma20 < indicators.sma50 && indicators.sma50 < indicators.sma200) {
          return {
            strategyId: strategy.id,
            symbol: strategy.symbol,
            action: 'sell',
            reason: 'Death cross - strong downtrend (SMA20 < SMA50 < SMA200)',
            confidence: 90,
            price: currentPrice,
            timestamp: new Date(),
          };
        }
        break;

      case 'mean-reversion':
        // Mean Reversion: Price deviation from SMA
        const deviationPercent = ((currentPrice - indicators.sma20) / indicators.sma20) * 100;
        if (deviationPercent < -2) {
          return {
            strategyId: strategy.id,
            symbol: strategy.symbol,
            action: 'buy',
            reason: `Price ${deviationPercent.toFixed(2)}% below SMA20 - oversold`,
            confidence: 75,
            price: currentPrice,
            timestamp: new Date(),
          };
        }
        if (deviationPercent > 2) {
          return {
            strategyId: strategy.id,
            symbol: strategy.symbol,
            action: 'sell',
            reason: `Price ${deviationPercent.toFixed(2)}% above SMA20 - overbought`,
            confidence: 75,
            price: currentPrice,
            timestamp: new Date(),
          };
        }
        break;

      case 'breakout':
        // Breakout: Price breaking through Bollinger bands with momentum
        if (currentPrice > indicators.bollinger.upper && indicators.rsi > 60) {
          return {
            strategyId: strategy.id,
            symbol: strategy.symbol,
            action: 'buy',
            reason: 'Bullish breakout above upper Bollinger band',
            confidence: 80,
            price: currentPrice,
            timestamp: new Date(),
          };
        }
        if (currentPrice < indicators.bollinger.lower && indicators.rsi < 40) {
          return {
            strategyId: strategy.id,
            symbol: strategy.symbol,
            action: 'sell',
            reason: 'Bearish breakdown below lower Bollinger band',
            confidence: 80,
            price: currentPrice,
            timestamp: new Date(),
          };
        }
        break;

      case 'grid-trading':
        // Grid Trading: Buy at support levels, sell at resistance
        const gridLevels = parameters.gridLevels || 5;
        const gridSpacing = parameters.gridSpacing || 1; // percentage
        const basePrice = indicators.sma50;
        
        for (let i = 1; i <= gridLevels; i++) {
          const buyLevel = basePrice * (1 - (gridSpacing * i) / 100);
          const sellLevel = basePrice * (1 + (gridSpacing * i) / 100);
          
          if (Math.abs(currentPrice - buyLevel) < basePrice * 0.001) {
            return {
              strategyId: strategy.id,
              symbol: strategy.symbol,
              action: 'buy',
              reason: `Grid level ${i} buy signal at ${buyLevel.toFixed(2)}`,
              confidence: 70,
              price: currentPrice,
              timestamp: new Date(),
            };
          }
          
          if (Math.abs(currentPrice - sellLevel) < basePrice * 0.001) {
            return {
              strategyId: strategy.id,
              symbol: strategy.symbol,
              action: 'sell',
              reason: `Grid level ${i} sell signal at ${sellLevel.toFixed(2)}`,
              confidence: 70,
              price: currentPrice,
              timestamp: new Date(),
            };
          }
        }
        break;
    }

    return null;
  };

  const addStrategy = (strategy: Omit<StrategyConfig, 'id' | 'totalTrades' | 'winningTrades' | 'totalProfit' | 'currentDrawdown' | 'createdAt'>): string => {
    const newStrategy: StrategyConfig = {
      ...strategy,
      id: `strategy-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      totalTrades: 0,
      winningTrades: 0,
      totalProfit: 0,
      currentDrawdown: 0,
      createdAt: new Date(),
    };
    
    setStrategies(prev => [...prev, newStrategy]);
    toast.success(`Strategy "${newStrategy.name}" created successfully`);
    return newStrategy.id;
  };

  const updateStrategy = (strategyId: string, updates: Partial<StrategyConfig>) => {
    setStrategies(prev => 
      prev.map(s => s.id === strategyId ? { ...s, ...updates } : s)
    );
  };

  const deleteStrategy = (strategyId: string) => {
    const strategy = strategies.find(s => s.id === strategyId);
    if (strategy?.isActive) {
      toast.error('Cannot delete active strategy. Please pause it first.');
      return;
    }
    setStrategies(prev => prev.filter(s => s.id !== strategyId));
    toast.success('Strategy deleted');
  };

  const toggleStrategy = (strategyId: string, isActive: boolean) => {
    const strategy = strategies.find(s => s.id === strategyId);
    if (!strategy) return;

    // Check if user has sufficient balance
    if (isActive) {
      const currentAccount = strategy.mode === 'paper' ? account : account;
      if (currentAccount.availableFunds < strategy.investmentAmount) {
        toast.error(`Insufficient funds. Need $${strategy.investmentAmount}, have $${currentAccount.availableFunds.toFixed(2)}`);
        return;
      }
    }

    setStrategies(prev =>
      prev.map(s => s.id === strategyId ? { ...s, isActive } : s)
    );
    
    toast.success(isActive ? `Strategy "${strategy.name}" activated` : `Strategy "${strategy.name}" paused`);
  };

  const getUserStrategies = (userId: string): StrategyConfig[] => {
    return strategies.filter(s => s.userId === userId);
  };

  const getAllStrategies = (): StrategyConfig[] => {
    return strategies;
  };

  const pauseAllStrategies = () => {
    setStrategies(prev => prev.map(s => ({ ...s, isActive: false })));
    toast.warning('All strategies have been paused');
  };

  const value: AutoTraderContextType = {
    strategies,
    loading,
    addStrategy,
    updateStrategy,
    deleteStrategy,
    toggleStrategy,
    getUserStrategies,
    getAllStrategies,
    pauseAllStrategies,
    calculateIndicators,
    getStrategySignal,
    refreshStrategies
  };

  return (
    <AutoTraderContext.Provider value={value}>
      {children}
    </AutoTraderContext.Provider>
  );
};