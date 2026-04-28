import { Wallet, TrendingUp, TrendingDown, DollarSign, PieChart, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { useTrading } from '../../contexts/TradingContext';
import { useMarketData } from '../../contexts/MarketDataContext';
import { formatPercentage } from '../../utils/formatNumber';
import { SkeletonCard } from '../ui/Skeleton';

export default function AccountSummary() {
  const { account, balanceLoaded, isHydrated } = useTrading();
  const { pricesReady } = useMarketData();

  // Calculate margin level
  const marginLevel = account.margin > 0 && account.equity > 0
    ? (account.equity / account.margin) * 100
    : 0;

  // Determine if margin level is healthy
  const marginStatus = marginLevel === 0 
    ? 'N/A' 
    : marginLevel > 200 
      ? 'Healthy (>200%)' 
      : marginLevel > 100 
        ? 'Good (>100%)' 
        : marginLevel > 50 
          ? 'Warning (<100%)' 
          : 'Critical (<50%)';

  // Calculate total P/L
  const totalPnL = account.realizedPnL + account.unrealizedPnL;
  const isPnLPositive = totalPnL >= 0;

  // Calculate P/L percentage (based on starting balance vs current equity)
  const pnlPercentage = account.balance > 0 
    ? formatPercentage((totalPnL / account.balance) * 100)
    : '0.00%';

  // Whether price-dependent metrics are ready (need both balance AND live prices)
  const metricsReady = balanceLoaded && pricesReady;

  const cards = [
    {
      title: 'Total Balance',
      value: `$${(account.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: Wallet,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
      needsBalance: true,
      needsPrices: false,
    },
    {
      title: 'Bonus Funds',
      value: `$${(account.bonus || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      subtitle: 'Promotional funds',
      needsBalance: true,
      needsPrices: false,
    },
    {
      title: 'Credit Line',
      value: `$${(account.credit || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: Wallet,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
      subtitle: 'Funds to be repaid',
      needsBalance: true,
      needsPrices: false,
    },
    {
      title: 'Equity',
      value: `$${(account.equity || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400',
      subtitle: `Total assets + Profit/Loss`,
      needsBalance: true,
      needsPrices: true,
    },
    {
      title: 'Margin Used',
      value: `$${(account.margin || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: PieChart,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      iconColor: 'text-orange-600 dark:text-orange-400',
      needsBalance: true,
      needsPrices: true,
    },
    {
      title: 'Free Margin',
      value: `$${(account.availableFunds || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: Activity,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-600 dark:text-green-400',
      needsBalance: true,
      needsPrices: true,
    },
    {
      title: 'Margin Level',
      value: marginLevel > 0 
        ? marginLevel.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%' 
        : 'N/A',
      icon: TrendingUp,
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50 dark:bg-teal-900/20',
      iconColor: 'text-teal-600 dark:text-teal-400',
      subtitle: marginStatus,
      needsBalance: true,
      needsPrices: true,
    },
    {
      title: 'Total P/L',
      value: `${isPnLPositive ? '+' : ''}$${(totalPnL || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: isPnLPositive ? TrendingUp : TrendingDown,
      color: isPnLPositive ? 'from-green-500 to-emerald-600' : 'from-red-500 to-red-600',
      bgColor: isPnLPositive ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20',
      iconColor: isPnLPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400',
      subtitle: `${isPnLPositive ? '+' : ''}${pnlPercentage}`,
      change: parseFloat(pnlPercentage),
      needsBalance: true,
      needsPrices: true,
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        
        // Determine if this card should show skeleton
        const showSkeleton = (card.needsBalance && !balanceLoaded) || (card.needsPrices && !metricsReady);

        if (showSkeleton) {
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <SkeletonCard />
            </motion.div>
          );
        }

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${card.bgColor} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{card.title}</p>
            <p className="text-2xl mb-1">{card.value}</p>
            
            {card.subtitle && (
              <p className={`text-xs ${
                card.change !== undefined 
                  ? card.change >= 0 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {card.subtitle}
              </p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}