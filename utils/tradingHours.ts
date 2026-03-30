// Trading hours configuration and utilities

export interface TradingHours {
  openTime: string; // Format: "HH:MM" in UTC
  closeTime: string; // Format: "HH:MM" in UTC
  timezone: string; // IANA timezone identifier
  tradingDays: number[]; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
}

export interface AssetSchedule {
  symbol: string;
  name: string;
  alwaysOpen?: boolean; // If true, ignore trading hours
  tradingHours?: TradingHours;
}

// Market schedules for different asset types
export const assetSchedules: AssetSchedule[] = [
  // Forex - 24/5 (Closes Friday 5pm EST, Opens Sunday 5pm EST)
  {
    symbol: 'EURUSD',
    name: 'EUR/USD',
    tradingHours: {
      openTime: '22:00', // Sunday 5pm EST = 22:00 UTC
      closeTime: '22:00', // Friday 5pm EST = 22:00 UTC
      timezone: 'America/New_York',
      tradingDays: [0, 1, 2, 3, 4, 5], // Sunday evening to Friday evening
    },
  },
  {
    symbol: 'GBPUSD',
    name: 'GBP/USD',
    tradingHours: {
      openTime: '22:00',
      closeTime: '22:00',
      timezone: 'America/New_York',
      tradingDays: [0, 1, 2, 3, 4, 5],
    },
  },
  {
    symbol: 'USDJPY',
    name: 'USD/JPY',
    tradingHours: {
      openTime: '22:00',
      closeTime: '22:00',
      timezone: 'America/New_York',
      tradingDays: [0, 1, 2, 3, 4, 5],
    },
  },
  
  // US Stocks - NYSE hours (9:30 AM - 4:00 PM EST, Mon-Fri)
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    tradingHours: {
      openTime: '14:30', // 9:30 AM EST = 14:30 UTC
      closeTime: '21:00', // 4:00 PM EST = 21:00 UTC
      timezone: 'America/New_York',
      tradingDays: [1, 2, 3, 4, 5], // Monday to Friday
    },
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    tradingHours: {
      openTime: '14:30',
      closeTime: '21:00',
      timezone: 'America/New_York',
      tradingDays: [1, 2, 3, 4, 5],
    },
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    tradingHours: {
      openTime: '14:30',
      closeTime: '21:00',
      timezone: 'America/New_York',
      tradingDays: [1, 2, 3, 4, 5],
    },
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    tradingHours: {
      openTime: '14:30',
      closeTime: '21:00',
      timezone: 'America/New_York',
      tradingDays: [1, 2, 3, 4, 5],
    },
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    tradingHours: {
      openTime: '14:30',
      closeTime: '21:00',
      timezone: 'America/New_York',
      tradingDays: [1, 2, 3, 4, 5],
    },
  },
  
  // Crypto - 24/7
  {
    symbol: 'BTCUSD',
    name: 'Bitcoin',
    alwaysOpen: true,
  },
  {
    symbol: 'ETHUSD',
    name: 'Ethereum',
    alwaysOpen: true,
  },
  
  // Commodities - Gold (23 hours/day, Mon-Fri, 1hr break at 5pm EST)
  {
    symbol: 'XAUUSD',
    name: 'Gold',
    tradingHours: {
      openTime: '23:00', // Sunday 6pm EST = 23:00 UTC
      closeTime: '22:00', // Friday 5pm EST = 22:00 UTC
      timezone: 'America/New_York',
      tradingDays: [0, 1, 2, 3, 4, 5],
    },
  },
];

export interface MarketStatus {
  isOpen: boolean;
  nextOpenTime?: Date;
  nextCloseTime?: Date;
  message: string;
}

/**
 * Check if a market is currently open
 */
export function getMarketStatus(symbol: string): MarketStatus {
  const schedule = assetSchedules.find(s => s.symbol === symbol);
  
  // If no schedule found or always open, market is open
  if (!schedule || schedule.alwaysOpen) {
    return {
      isOpen: true,
      message: 'Market is open 24/7',
    };
  }

  const now = new Date();
  const currentDay = now.getUTCDay(); // 0 = Sunday, 1 = Monday, etc.
  const currentHour = now.getUTCHours();
  const currentMinute = now.getUTCMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  if (!schedule.tradingHours) {
    return {
      isOpen: true,
      message: 'Market is open',
    };
  }

  const { openTime, closeTime, tradingDays } = schedule.tradingHours;
  
  // Parse open and close times
  const [openHour, openMinute] = openTime.split(':').map(Number);
  const [closeHour, closeMinute] = closeTime.split(':').map(Number);
  const openTimeInMinutes = openHour * 60 + openMinute;
  const closeTimeInMinutes = closeHour * 60 + closeMinute;

  // Check if current day is a trading day
  const isTradingDay = tradingDays.includes(currentDay);
  
  // Special handling for markets that open Sunday evening and close Friday evening
  const isForexStyle = tradingDays.includes(0) && tradingDays.includes(5);
  
  if (isForexStyle) {
    // Forex: Opens Sunday 22:00 UTC, Closes Friday 22:00 UTC
    if (currentDay === 0) {
      // Sunday - check if after opening time
      const isOpen = currentTimeInMinutes >= openTimeInMinutes;
      if (isOpen) {
        const nextClose = new Date(now);
        nextClose.setUTCDate(nextClose.getUTCDate() + 5); // Next Friday
        nextClose.setUTCHours(closeHour, closeMinute, 0, 0);
        return {
          isOpen: true,
          nextCloseTime: nextClose,
          message: 'Market is open',
        };
      } else {
        const nextOpen = new Date(now);
        nextOpen.setUTCHours(openHour, openMinute, 0, 0);
        return {
          isOpen: false,
          nextOpenTime: nextOpen,
          message: `Market opens at ${openTime} UTC`,
        };
      }
    } else if (currentDay >= 1 && currentDay <= 4) {
      // Monday to Thursday - always open
      const nextClose = new Date(now);
      const daysUntilFriday = 5 - currentDay;
      nextClose.setUTCDate(nextClose.getUTCDate() + daysUntilFriday);
      nextClose.setUTCHours(closeHour, closeMinute, 0, 0);
      return {
        isOpen: true,
        nextCloseTime: nextClose,
        message: 'Market is open',
      };
    } else if (currentDay === 5) {
      // Friday - check if before closing time
      const isOpen = currentTimeInMinutes < closeTimeInMinutes;
      if (isOpen) {
        const nextClose = new Date(now);
        nextClose.setUTCHours(closeHour, closeMinute, 0, 0);
        return {
          isOpen: true,
          nextCloseTime: nextClose,
          message: 'Market is open',
        };
      } else {
        const nextOpen = new Date(now);
        nextOpen.setUTCDate(nextOpen.getUTCDate() + 2); // Next Sunday
        nextOpen.setUTCHours(openHour, openMinute, 0, 0);
        return {
          isOpen: false,
          nextOpenTime: nextOpen,
          message: 'Market closed for the weekend',
        };
      }
    } else {
      // Saturday - market closed
      const nextOpen = new Date(now);
      nextOpen.setUTCDate(nextOpen.getUTCDate() + (7 - currentDay)); // Next Sunday
      nextOpen.setUTCHours(openHour, openMinute, 0, 0);
      return {
        isOpen: false,
        nextOpenTime: nextOpen,
        message: 'Market closed for the weekend',
      };
    }
  } else {
    // Regular markets (stocks, etc.) - Mon-Fri with daily hours
    if (!isTradingDay) {
      // Find next trading day
      const daysUntilMonday = currentDay === 0 ? 1 : currentDay === 6 ? 2 : 0;
      const nextOpen = new Date(now);
      if (daysUntilMonday > 0) {
        nextOpen.setUTCDate(nextOpen.getUTCDate() + daysUntilMonday);
      }
      nextOpen.setUTCHours(openHour, openMinute, 0, 0);
      return {
        isOpen: false,
        nextOpenTime: nextOpen,
        message: 'Market closed for the weekend',
      };
    }

    // It's a trading day - check if within trading hours
    const isOpen = currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes;
    
    if (isOpen) {
      const nextClose = new Date(now);
      nextClose.setUTCHours(closeHour, closeMinute, 0, 0);
      return {
        isOpen: true,
        nextCloseTime: nextClose,
        message: 'Market is open',
      };
    } else if (currentTimeInMinutes < openTimeInMinutes) {
      // Before market opens today
      const nextOpen = new Date(now);
      nextOpen.setUTCHours(openHour, openMinute, 0, 0);
      return {
        isOpen: false,
        nextOpenTime: nextOpen,
        message: `Market opens at ${openTime} UTC`,
      };
    } else {
      // After market closes today
      const nextOpen = new Date(now);
      if (currentDay === 5) {
        // Friday - next open is Monday
        nextOpen.setUTCDate(nextOpen.getUTCDate() + 3);
      } else {
        // Other days - next open is tomorrow
        nextOpen.setUTCDate(nextOpen.getUTCDate() + 1);
      }
      nextOpen.setUTCHours(openHour, openMinute, 0, 0);
      return {
        isOpen: false,
        nextOpenTime: nextOpen,
        message: 'Market closed for the day',
      };
    }
  }
}

/**
 * Calculate time remaining until market opens
 */
export function getTimeUntilOpen(nextOpenTime: Date): string {
  const now = new Date();
  const diff = nextOpenTime.getTime() - now.getTime();
  
  if (diff <= 0) return 'Opening soon...';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
}

/**
 * Format market hours for display
 */
export function formatMarketHours(schedule: AssetSchedule): string {
  if (schedule.alwaysOpen) {
    return '24/7';
  }
  
  if (!schedule.tradingHours) {
    return 'Always open';
  }
  
  const { openTime, closeTime, timezone, tradingDays } = schedule.tradingHours;
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const tradingDayNames = tradingDays.map(d => dayNames[d]);
  
  return `${tradingDayNames.join(', ')} ${openTime}-${closeTime} ${timezone}`;
}
