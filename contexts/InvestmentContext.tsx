import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { useAuth } from './AuthContext';
import { supabase, getKV, setKV } from '../utils/supabase/client';
import { publicAnonKey } from '../utils/supabase/info';

// ============================================
// API CONFIGURATION
// ============================================

// serverUrl is imported from ../utils/supabase/client
import { serverUrl } from '../utils/supabase/client';

// ============================================
// TYPES
// ============================================

export type ProfitabilityTier = 'ultra_high_yield' | 'high_yield' | 'medium_yield' | 'average_yield';

export const PROFITABILITY_TIER_LABELS: Record<ProfitabilityTier, string> = {
  ultra_high_yield: 'Ultra High Yield',
  high_yield: 'High Yield',
  medium_yield: 'Medium Yield',
  average_yield: 'Average Yield',
};

export const PROFITABILITY_TIER_COLORS: Record<ProfitabilityTier, string> = {
  ultra_high_yield: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400',
  high_yield: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
  medium_yield: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
  average_yield: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
};

export interface InvestmentOffer {
  id: string;
  name: string;
  logo: string;
  type: 'IPO' | 'ECN';
  exchanger: string; // Exchanger name
  profitability: number; // Percentage
  profitabilityTier: ProfitabilityTier; // Yield tier
  period: number; // Days
  category: string;
  price: number; // Price per unit in USD
  totalUnits: number;
  availableUnits: number;
  minPurchase: number;
  maxPurchase: number;
  description: string;
  enabled: boolean;
  createdAt: number;
  assetSymbol?: string; // For ECN offers
  marketPrice?: number; // For ECN offers - current market price
}

export interface UserInvestment {
  id: string;
  userId: string;
  offerId: string;
  offerName: string;
  offerLogo: string;
  offerType: 'IPO' | 'ECN';
  units: number;
  purchasePrice: number; // Price per unit at purchase
  totalAmount: number; // Total investment amount
  currentValue: number; // Current value
  startDate: number;
  endDate: number;
  profitability: number;
  status: 'in-progress' | 'completed' | 'cancelled';
  createdAt: number;
  showValueAndDate?: boolean; // Controls visibility of current value and end date for IPOs
}

export interface SellRequest {
  id: string;
  userId: string;
  investmentId: string;
  offerName: string;
  offerLogo: string;
  offerType: 'IPO' | 'ECN';
  units: number;
  currentPrice: number;
  totalAmount: number;
  paymentWallet: 'wallet' | 'portfolio' | 'ecn' | 'ipo';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: number;
  processedAt?: number;
  processedBy?: string;
  rejectionReason?: string;
}

interface InvestmentContextType {
  // Investment Offers
  investmentOffers: InvestmentOffer[];
  loading: boolean;
  addInvestmentOffer: (offer: Omit<InvestmentOffer, 'id' | 'createdAt'>) => string;
  updateInvestmentOffer: (id: string, updates: Partial<InvestmentOffer>) => boolean;
  deleteInvestmentOffer: (id: string) => boolean;
  getInvestmentOffer: (id: string) => InvestmentOffer | undefined;
  
  // User Investments
  userInvestments: UserInvestment[];
  addUserInvestment: (investment: Omit<UserInvestment, 'id' | 'createdAt'>) => string;
  updateUserInvestment: (id: string, updates: Partial<UserInvestment>) => boolean;
  deleteUserInvestment: (id: string) => boolean;
  getUserInvestments: (userId: string) => UserInvestment[];
  
  // Sell Requests
  sellRequests: SellRequest[];
  createSellRequest: (request: Omit<SellRequest, 'id' | 'createdAt' | 'status'>) => string;
  updateSellRequest: (id: string, updates: Partial<SellRequest>) => boolean;
  getUserSellRequests: (userId: string) => SellRequest[];
  getAllSellRequests: () => SellRequest[];
  
  // New database functions
  refreshInvestments: () => Promise<void>;
  refreshOffers: () => Promise<void>;
}

const InvestmentContext = createContext<InvestmentContextType | undefined>(undefined);

export function InvestmentProvider({ children }: { children: ReactNode }) {
  const [investmentOffers, setInvestmentOffers] = useState<InvestmentOffer[]>([]);
  const [userInvestments, setUserInvestments] = useState<UserInvestment[]>([]);
  const [sellRequests, setSellRequests] = useState<SellRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const { currentUser } = useAuth();

  // ============================================
  // API FUNCTIONS - Database Integration
  // ============================================

  /**
   * Fetch investment offers from database
   */
  const fetchInvestmentOffers = async () => {
    try {
      const response = await fetch(`${serverUrl}/investment-offers`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      }).catch(() => null);

      if (!response || !response.ok) {
        // Silently return empty array if server not available
        return [];
      }

      const dbOffers = await response.json();
      console.log('✅ Investment offers loaded from database:', dbOffers.length);
      
      // Transform database format to app format
      return dbOffers.map((offer: any) => (({
        id: offer.id,
        name: offer.name,
        logo: offer.logo_url || '',
        type: offer.type,
        profitability: parseFloat(offer.expected_return || 0),
        profitabilityTier: offer.yield_tier || 'average_yield',
        period: offer.duration_days || 30,
        category: offer.category || 'general',
        price: parseFloat(offer.price_per_unit || 0),
        totalUnits: parseInt(offer.total_units || 0),
        availableUnits: parseInt(offer.available_units || 0),
        minPurchase: parseFloat(offer.min_investment || 0),
        maxPurchase: parseFloat(offer.max_investment || 0),
        description: offer.description || '',
        enabled: offer.is_active || false,
        createdAt: new Date(offer.created_at).getTime(),
        assetSymbol: offer.asset_symbol || undefined,
        marketPrice: offer.market_price ? parseFloat(offer.market_price) : undefined
      })));
    } catch (error) {
      // Silently handle error - server might not be available yet
      return [];
    }
  };

  /**
   * Fetch user investments from database
   */
  const fetchUserInvestments = async (userId: string) => {
    try {
      const response = await fetch(`${serverUrl}/investments/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      }).catch(() => null);

      if (!response || !response.ok) {
        // Silently return empty array if server not available
        return [];
      }

      const dbInvestments = await response.json();
      console.log('✅ User investments loaded from database:', dbInvestments.length);
      
      // Transform database format to app format
      return dbInvestments.map((inv: any) => ({
        id: inv.id,
        userId: inv.user_id,
        offerId: inv.offer_id,
        offerName: inv.offer_name || '',
        offerLogo: inv.offer_logo || '',
        offerType: inv.offer_type || 'IPO',
        units: parseFloat(inv.units || 0),
        purchasePrice: parseFloat(inv.purchase_price || 0),
        totalAmount: parseFloat(inv.amount || 0),
        currentValue: parseFloat(inv.current_value || inv.amount || 0),
        startDate: new Date(inv.created_at).getTime(),
        endDate: inv.maturity_date ? new Date(inv.maturity_date).getTime() : Date.now() + 30 * 24 * 60 * 60 * 1000,
        profitability: parseFloat(inv.expected_return || 0),
        status: inv.status || 'in-progress',
        createdAt: new Date(inv.created_at).getTime(),
        showValueAndDate: inv.show_value_and_date || false
      }));
    } catch (error) {
      // Silently handle error - server might not be available yet
      return [];
    }
  };

  /**
   * Create investment in database
   */
  const createInvestmentInDatabase = async (investment: Omit<UserInvestment, 'id' | 'createdAt'>) => {
    try {
      const response = await fetch(`${serverUrl}/investments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: investment.userId,
          offer_id: investment.offerId,
          offer_name: investment.offerName,
          offer_logo: investment.offerLogo,
          offer_type: investment.offerType,
          units: investment.units,
          purchase_price: investment.purchasePrice,
          amount: investment.totalAmount,
          expected_return: investment.profitability,
          status: investment.status,
          show_value_and_date: investment.showValueAndDate
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create investment');
      }

      const created = await response.json();
      console.log('✅ Investment created in database:', created.id);
      return created;
    } catch (error) {
      console.error('Error creating investment:', error);
      throw error;
    }
  };

  /**
   * Refresh investment offers from database
   */
  const refreshOffers = async () => {
    setLoading(true);
    try {
      const offers = await fetchInvestmentOffers();
      // Only update if we actually got data, to avoid wiping healthy KV state with empty DB response
      if (offers && offers.length > 0) {
        setInvestmentOffers(offers);
      } else {
        // Fallback to KV if DB is empty
        const dbOffers = await getKV('gross_investment_offers');
        if (dbOffers && dbOffers.length > 0) {
          setInvestmentOffers(dbOffers);
        }
      }
    } catch (error) {
      console.error('Error refreshing offers:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Refresh user investments from database
   */
  const refreshInvestments = async () => {
    if (!currentUser?.id) return;
    
    setLoading(true);
    try {
      const investments = await fetchUserInvestments(currentUser.id);
      setUserInvestments(investments);
    } catch (error) {
      console.error('Error refreshing investments:', error);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // LOAD DATA FROM DATABASE ON MOUNT
  // ============================================

  /**
   * Load investment offers on mount
   */
  useEffect(() => {
    refreshOffers();
  }, []);

  /**
   * Load user investments when authenticated
   */
  useEffect(() => {
    const loadUserData = async () => {
      if (currentUser && currentUser.id) {
        console.log('🔄 Loading investments for user:', currentUser.id);
        // If admin, we'll rely on the global KV load for all user data
        // but for compatibility we still call this if needed.
        if (currentUser.role !== 'admin') {
          await refreshInvestments();
        }
      }
    };

    loadUserData();
  }, [currentUser?.id, currentUser?.role]);

  // Synchronize with database on mount
  useEffect(() => {
    const loadAllDatabaseData = async () => {
      try {
        setLoading(true);
        console.log('🔄 Loading investment data from database...');
        
        // Fetch investment offers
        const dbOffers = await getKV('gross_investment_offers');
        if (dbOffers) setInvestmentOffers(dbOffers);

        // Fetch global user investments & sell requests (filtered by userId in state)
        const dbUserInvestments = await getKV('gross_user_investments');
        const dbSellRequests = await getKV('gross_sell_requests');

        const userId = currentUser?.id;
        const isAdmin = currentUser?.role === 'admin';
        const filterByUser = (items: any[]) => {
          if (!items) return [];
          if (isAdmin) return items;
          return userId ? items.filter(item => item.userId === userId) : [];
        };

        if (dbUserInvestments) setUserInvestments(filterByUser(dbUserInvestments));
        if (dbSellRequests) setSellRequests(filterByUser(dbSellRequests));

        console.log('✅ Investment data synced with DB');
      } catch (error) {
        console.error('Failed to load investment data from database:', error);
      } finally {
        setLoading(false);
        setIsHydrated(true);
      }
    };

    loadAllDatabaseData();
  }, [currentUser?.id]);

  // Real-time listener for investment data
  useEffect(() => {
    const channel = supabase
      .channel('public:kv_store_investments')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'kv_store_5d4be467' 
      }, (payload: any) => {
        const { key, value } = payload.new;
        const userId = currentUser?.id;
        const isAdmin = currentUser?.role === 'admin';
        if (!userId) return;

        const filterByUser = (items: any[]) => {
          if (!items) return [];
          if (isAdmin) return items;
          return items.filter(item => item.userId === userId);
        };

        switch (key) {
          case 'gross_investment_offers':
            setInvestmentOffers(value || []);
            break;
          case 'gross_user_investments':
            setUserInvestments(filterByUser(value));
            break;
          case 'gross_sell_requests':
            setSellRequests(filterByUser(value));
            break;
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUser?.id]);

  // Patch helper for global sets
  const patchGlobalList = (key: string, items: any[]) => {
    const userId = currentUser?.id;
    const isAdmin = currentUser?.role === 'admin';
    if (!userId) return;

    try {
      const raw = localStorage.getItem(key);
      const globalItems = raw ? JSON.parse(raw) : [];
      
      let merged: any[];
      
      if (isAdmin) {
        // Admins in this application load the global sets (all users' investments/requests)
        // in InvestmentContext's loadAllDatabaseData. Therefore, their state represents
        // the "Total Truth". We can safely replace the global list with their state.
        merged = items;
      } else {
        // Regular users only have access to their own investments.
        // To update the global list without erasing other users' data, 
        // we filter out current user's old records and append the new ones.
        const others = globalItems.filter((item: any) => item.userId !== userId);
        merged = [...items, ...others];
      }

      // Final deduplication by ID just in case of any synchronization edge cases
      const deduplicated = Array.from(
        new Map(merged.map(item => [item.id, item])).values()
      );
      
      localStorage.setItem(key, JSON.stringify(deduplicated));
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error('Patch error:', err);
    }
  };

  // Save base offers globally
  useEffect(() => {
    if (investmentOffers.length > 0) {
      localStorage.setItem('investmentOffers', JSON.stringify(investmentOffers));
    }
  }, [investmentOffers]);

  // ── Sync to Supabase Logic ──────────────────────────────────────────
  const syncTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Clear any pending sync
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);

    // Debounce sync briefly to capture rapid changes
    syncTimeoutRef.current = setTimeout(async () => {
      // Safety check: Don't sync if not hydrated or list is empty but we expect data
      if (!isHydrated) return;
      if (investmentOffers.length === 0 && userInvestments.length === 0 && sellRequests.length === 0) {
          // If EVERYTHING is empty, maybe don't sync unless we explicitly cleared it?
          // For now, let's just make sure we ARE hydrated.
      }

      console.log('🔄 Triggering investment auto-sync to Supabase...');
      try {
        await Promise.all([
          setKV('gross_investment_offers', investmentOffers),
          setKV('gross_user_investments', userInvestments),
          setKV('gross_sell_requests', sellRequests)
        ]);
        console.log('✅ Investment Supabase sync complete');
      } catch (error) {
        console.error('❌ Investment Supabase sync failed:', error);
      }
    }, 2000); // 2 second debounce

    return () => {
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    };
  }, [investmentOffers, userInvestments, sellRequests]);

  // Cross-tab sync via storage event
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      const userId = currentUser?.id;
      if (!userId || !e.newValue) return;

      try {
        if (e.key === 'investmentOffers') {
          setInvestmentOffers(JSON.parse(e.newValue));
        }
        
        const items = JSON.parse(e.newValue);
        const isAdmin = currentUser?.role === 'admin';
        const filtered = items.filter((item: any) => isAdmin || item.userId === userId || !item.userId);

        if (e.key === 'userInvestments') setUserInvestments(filtered);
        if (e.key === 'sellRequests') setSellRequests(filtered);
        
        if (e.key === 'investment_access') {
          window.dispatchEvent(new CustomEvent('investment_access_changed'));
        }
      } catch (error) {
        console.error('Cross-tab investment sync failed:', error);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [currentUser?.id]);

  // Investment Offers Management
  const addInvestmentOffer = (offer: Omit<InvestmentOffer, 'id' | 'createdAt'>): string => {
    const newOffer: InvestmentOffer = {
      ...offer,
      id: `offer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(),
    };
    
    // Save to database
    fetch(`${serverUrl}/investment-offers`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: offer.name,
        logo_url: offer.logo,
        type: offer.type,
        expected_return: offer.profitability,
        duration_days: offer.period,
        category: offer.category,
        price_per_unit: offer.price,
        total_units: offer.totalUnits,
        available_units: offer.availableUnits,
        min_investment: offer.minPurchase,
        max_investment: offer.maxPurchase,
        description: offer.description,
        is_active: offer.enabled,
        asset_symbol: offer.assetSymbol || undefined,
        market_price: offer.marketPrice || undefined
      })
    })
    .then(response => response.json())
    .then(created => {
      console.log('✅ Investment offer saved to database:', created.id);
      setInvestmentOffers(prev => 
        prev.map(o => o.id === newOffer.id ? { ...o, id: created.id } : o)
      );
    })
    .catch(error => {
      console.error('❌ Failed to save investment offer to database:', error);
    });
    
    const nextOffers = [...investmentOffers, newOffer];
    setInvestmentOffers(nextOffers);
    
    // Immediate local persistence to avoid loss on quick refresh
    localStorage.setItem('investmentOffers', JSON.stringify(nextOffers));
    window.dispatchEvent(new Event('storage'));

    return newOffer.id;
  };

  const updateInvestmentOffer = (id: string, updates: Partial<InvestmentOffer>): boolean => {
    setInvestmentOffers(prev => {
      const index = prev.findIndex(o => o.id === id);
      if (index === -1) return prev;
      const updated = [...prev];
      updated[index] = { ...updated[index], ...updates };
      
      // Immediate local persistence
      localStorage.setItem('investmentOffers', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
      
      return updated;
    });
    
    fetch(`${serverUrl}/investment-offers/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: updates.name,
        logo_url: updates.logo,
        type: updates.type,
        expected_return: updates.profitability,
        duration_days: updates.period,
        category: updates.category,
        price_per_unit: updates.price,
        total_units: updates.totalUnits,
        available_units: updates.availableUnits,
        min_investment: updates.minPurchase,
        max_investment: updates.maxPurchase,
        description: updates.description,
        is_active: updates.enabled,
        asset_symbol: updates.assetSymbol,
        market_price: updates.marketPrice
      })
    })
    .then(() => console.log('✅ Investment offer updated in database:', id))
    .catch(error => console.error('❌ Failed to update investment offer in database:', error));
    
    return true;
  };

  const deleteInvestmentOffer = (id: string): boolean => {
    fetch(`${serverUrl}/investment-offers/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${publicAnonKey}` }
    })
    .then(() => console.log('✅ Investment offer deleted from database:', id))
    .catch(error => console.error('❌ Failed to delete investment offer from database:', error));
    
    setInvestmentOffers(prev => prev.filter(o => o.id !== id));
    return true;
  };

  const getInvestmentOffer = (id: string): InvestmentOffer | undefined => {
    return investmentOffers.find(o => o.id === id);
  };

  // User Investments Management
  const addUserInvestment = (investment: Omit<UserInvestment, 'id' | 'createdAt'>): string => {
    const userId = currentUser?.id;
    if (!userId) return '';

    const newInvestment: UserInvestment = {
      ...investment,
      userId,
      id: `investment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(),
    };
    
    setUserInvestments(prev => {
      const next = [...prev, newInvestment];
      patchGlobalList('userInvestments', next);
      return next;
    });
    
    updateInvestmentOffer(investment.offerId, {
      availableUnits: (getInvestmentOffer(investment.offerId)?.availableUnits || 0) - investment.units,
    });
    
    return newInvestment.id;
  };

  const updateUserInvestment = (id: string, updates: Partial<UserInvestment>): boolean => {
    setUserInvestments(prev => {
      const index = prev.findIndex(i => i.id === id);
      if (index === -1) return prev;
      const next = [...prev];
      next[index] = { ...next[index], ...updates };
      patchGlobalList('userInvestments', next);
      return next;
    });
    return true;
  };

  const deleteUserInvestment = (id: string): boolean => {
    const investment = userInvestments.find(i => i.id === id);
    if (!investment) return false;
    
    updateInvestmentOffer(investment.offerId, {
      availableUnits: (getInvestmentOffer(investment.offerId)?.availableUnits || 0) + investment.units,
    });
    
    setUserInvestments(prev => {
      const next = prev.filter(i => i.id !== id);
      patchGlobalList('userInvestments', next);
      return next;
    });
    return true;
  };

  const getUserInvestments = (userId: string): UserInvestment[] => {
    return userInvestments.filter(i => i.userId === userId);
  };

  // Sell Requests Management
  const createSellRequest = (request: Omit<SellRequest, 'id' | 'createdAt' | 'status'>): string => {
    const userId = currentUser?.id;
    if (!userId) return '';

    const newRequest: SellRequest = {
      ...request,
      userId,
      id: `sell-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      status: 'pending',
      createdAt: Date.now(),
    };
    
    setSellRequests(prev => {
      const next = [...prev, newRequest];
      patchGlobalList('sellRequests', next);
      return next;
    });
    return newRequest.id;
  };

  const updateSellRequest = (id: string, updates: Partial<SellRequest>): boolean => {
    setSellRequests(prev => {
      const index = prev.findIndex(r => r.id === id);
      if (index === -1) return prev;
      const next = [...prev];
      next[index] = { ...next[index], ...updates };
      patchGlobalList('sellRequests', next);
      return next;
    });
    return true;
  };

  const getUserSellRequests = (userId: string): SellRequest[] => {
    return sellRequests.filter(r => r.userId === userId);
  };

  const getAllSellRequests = (): SellRequest[] => {
    return sellRequests;
  };

  return (
    <InvestmentContext.Provider
      value={{
        investmentOffers,
        loading,
        addInvestmentOffer,
        updateInvestmentOffer,
        deleteInvestmentOffer,
        getInvestmentOffer,
        userInvestments,
        addUserInvestment,
        updateUserInvestment,
        deleteUserInvestment,
        getUserInvestments,
        sellRequests,
        createSellRequest,
        updateSellRequest,
        getUserSellRequests,
        getAllSellRequests,
        refreshInvestments,
        refreshOffers,
      }}
    >
      {children}
    </InvestmentContext.Provider>
  );
}


export function useInvestments() {
  const context = useContext(InvestmentContext);
  if (!context) {
    throw new Error('useInvestments must be used within InvestmentProvider');
  }
  return context;
}