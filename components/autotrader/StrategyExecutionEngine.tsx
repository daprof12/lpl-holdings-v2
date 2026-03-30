import { useEffect, useRef } from 'react';
import { useAutoTrader } from '../../contexts/AutoTraderContext';
import { useTrading } from '../../contexts/TradingContext';
import { useAuth } from '../../contexts/AuthContext';
import { useMarketData } from '../../contexts/MarketDataContext';
import { toast } from 'sonner';
import { formatPercentage } from '../../utils/formatNumber';

// Risk Management Constants
const RISK_LIMITS = {
  MAX_DAILY_LOSS_PERCENT: 10, // Max 10% daily loss before auto-pause
  MAX_POSITION_SIZE_PERCENT: 20, // Max 20% of account per position
  MAX_OPEN_POSITIONS: 10, // Maximum number of concurrent positions
  MAX_LEVERAGE: 100, // Maximum allowed leverage
  MIN_ACCOUNT_BALANCE: 10, // Minimum $10 balance required
  DAILY_LOSS_RESET_HOUR: 0, // Reset daily loss at midnight
};

/**
 * This component runs in the background and executes strategies automatically
 * It monitors all active strategies and places trades when signals are detected
 * Includes risk management and circuit breakers
 */
export default function StrategyExecutionEngine() {
  const { strategies, updateStrategy, calculateIndicators, getStrategySignal, pauseAllStrategies } = useAutoTrader();
  const { addPosition, account, tradingMode, positions } = useTrading();
  const { currentUser } = useAuth();
  const marketData = useMarketData();
  const priceHistoryRef = useRef<Map<string, number[]>>(new Map());
  const lastExecutionRef = useRef<Map<string, number>>(new Map());
  const dailyLossTrackerRef = useRef<{ date: string; loss: number }>({ date: new Date().toDateString(), loss: 0 });
  const MIN_EXECUTION_INTERVAL = 10000; // 10 seconds between trades per strategy

  // Risk Management: Check circuit breakers
  const checkCircuitBreakers = (): { passed: boolean; reason?: string } => {
    // Check 1: Minimum account balance
    if (account.balance < RISK_LIMITS.MIN_ACCOUNT_BALANCE) {
      return { passed: false, reason: `Account balance below minimum ($${RISK_LIMITS.MIN_ACCOUNT_BALANCE})` };
    }

    // Check 2: Maximum open positions
    if (positions.length >= RISK_LIMITS.MAX_OPEN_POSITIONS) {
      return { passed: false, reason: `Maximum open positions reached (${RISK_LIMITS.MAX_OPEN_POSITIONS})` };
    }

    // Check 3: Daily loss limit
    const today = new Date().toDateString();
    if (dailyLossTrackerRef.current.date !== today) {
      // Reset daily loss tracker
      dailyLossTrackerRef.current = { date: today, loss: 0 };
    }

    const dailyLossPercent = (dailyLossTrackerRef.current.loss / account.balance) * 100;
    if (dailyLossPercent >= RISK_LIMITS.MAX_DAILY_LOSS_PERCENT) {
      // Circuit breaker triggered!
      pauseAllStrategies();
      toast.error(`CIRCUIT BREAKER: Daily loss limit reached (${formatPercentage(dailyLossPercent)}). All strategies paused.`, {
        duration: 10000,
      });
      return { passed: false, reason: `Daily loss limit reached (${formatPercentage(dailyLossPercent)})` };
    }

    return { passed: true };
  };

  // Risk Management: Validate individual strategy execution
  const validateStrategyExecution = (strategy: any, currentPrice: number): { passed: boolean; reason?: string } => {
    // Check 1: Leverage limit
    if (strategy.leverage > RISK_LIMITS.MAX_LEVERAGE) {
      return { passed: false, reason: `Leverage exceeds maximum (${RISK_LIMITS.MAX_LEVERAGE}x)` };
    }

    // Check 2: Position size as percentage of account
    const positionValue = strategy.investmentAmount;
    const positionSizePercent = (positionValue / account.balance) * 100;
    if (positionSizePercent > RISK_LIMITS.MAX_POSITION_SIZE_PERCENT) {
      return { 
        passed: false, 
        reason: `Position size ${formatPercentage(positionSizePercent)} exceeds maximum ${RISK_LIMITS.MAX_POSITION_SIZE_PERCENT}%` 
      };
    }

    // Check 3: Sufficient margin
    const requiredMargin = (strategy.investmentAmount * currentPrice) / strategy.leverage;
    if (account.availableFunds < requiredMargin) {
      return { passed: false, reason: `Insufficient margin. Need $${requiredMargin.toFixed(2)}` };
    }

    // Check 4: Strategy drawdown limit
    if (strategy.currentDrawdown >= strategy.maxDrawdown) {
      updateStrategy(strategy.id, { isActive: false });
      return { passed: false, reason: `Max drawdown ${strategy.maxDrawdown}% reached` };
    }

    return { passed: true };
  };

  // Update daily loss when positions are closed
  useEffect(() => {
    // Monitor realized P/L and update daily loss tracker
    const updateDailyLoss = () => {
      const today = new Date().toDateString();
      if (dailyLossTrackerRef.current.date !== today) {
        dailyLossTrackerRef.current = { date: today, loss: 0 };
      }

      // Calculate losses for today
      const todayLoss = Math.abs(Math.min(0, account.realizedPnL));
      dailyLossTrackerRef.current.loss = todayLoss;
    };

    updateDailyLoss();
  }, [account.realizedPnL]);

  useEffect(() => {
    if (!currentUser) return;

    // Get user's active strategies
    const activeStrategies = strategies.filter(s => s.isActive && s.userId === currentUser.id);

    if (activeStrategies.length === 0) return;

    // Monitor market data and execute strategies
    const interval = setInterval(() => {
      activeStrategies.forEach(strategy => {
        try {
          // Skip if strategy was recently executed
          const lastExecution = lastExecutionRef.current.get(strategy.id) || 0;
          if (Date.now() - lastExecution < MIN_EXECUTION_INTERVAL) {
            return;
          }

          // Get current price data
          const priceData = marketData.getPrice(strategy.symbol);
          if (!priceData) {
            console.warn(`No price data for ${strategy.symbol}`);
            return;
          }

          const currentPrice = priceData.price;

          // Build price history
          let history = priceHistoryRef.current.get(strategy.symbol) || [];
          history.push(currentPrice);
          
          // Keep last 200 prices for indicator calculation
          if (history.length > 200) {
            history = history.slice(-200);
          }
          priceHistoryRef.current.set(strategy.symbol, history);

          // Need at least 200 data points for reliable indicators
          if (history.length < 200) {
            return;
          }

          // Calculate technical indicators
          const indicators = calculateIndicators(strategy.symbol, history);

          // Get trading signal
          const signal = getStrategySignal(strategy, indicators, currentPrice);

          if (!signal) {
            return; // No signal, continue monitoring
          }

          // Validate strategy execution
          const validation = validateStrategyExecution(strategy, currentPrice);
          if (!validation.passed) {
            toast.error(`Strategy ${strategy.name} execution failed: ${validation.reason}`);
            return;
          }

          // Execute the trade
          const positionId = `pos-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          const units = strategy.investmentAmount / currentPrice;
          const margin = (units * currentPrice) / strategy.leverage;

          const stopLoss = signal.action === 'buy'
            ? currentPrice * (1 - strategy.stopLossPercent / 100)
            : currentPrice * (1 + strategy.stopLossPercent / 100);

          const takeProfit = signal.action === 'buy'
            ? currentPrice * (1 + strategy.takeProfitPercent / 100)
            : currentPrice * (1 - strategy.takeProfitPercent / 100);

          addPosition({
            id: positionId,
            userId: currentUser.id,
            symbol: strategy.symbol,
            side: signal.action === 'buy' ? 'buy' : 'sell',
            units: units,
            entryPrice: currentPrice,
            currentPrice: currentPrice,
            stopLoss: stopLoss,
            takeProfit: takeProfit,
            leverage: strategy.leverage,
            pnl: 0,
            margin: margin,
            timestamp: new Date(),
            mode: strategy.mode,
          });

          // Update strategy statistics
          updateStrategy(strategy.id, {
            totalTrades: strategy.totalTrades + 1,
            lastTradeAt: new Date(),
          });

          // Update last execution time
          lastExecutionRef.current.set(strategy.id, Date.now());

          // Show notification
          toast.success(
            `${strategy.name}: ${signal.action.toUpperCase()} ${units.toFixed(4)} ${strategy.symbol} @ $${currentPrice.toFixed(2)}`,
            { description: signal.reason }
          );

          console.log(`[AutoTrader] Executed trade:`, {
            strategy: strategy.name,
            signal: signal,
            position: {
              id: positionId,
              symbol: strategy.symbol,
              side: signal.action,
              units: units,
              price: currentPrice,
            }
          });
        } catch (error) {
          console.error(`Error executing strategy ${strategy.name}:`, error);
        }
      });
    }, 5000); // Check every 5 seconds

    // Cleanup
    return () => {
      clearInterval(interval);
    };
  }, [strategies, currentUser, account, marketData, addPosition, updateStrategy, calculateIndicators, getStrategySignal]);

  // This component doesn't render anything
  return null;
}