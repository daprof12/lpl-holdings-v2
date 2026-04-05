import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { projectId, publicAnonKey } from '../utils/supabase/info';

// ============================================
// API CONFIGURATION
// ============================================

const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-5d4be467`;

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
        createdAt: new Date(inv.created_at).getTime()
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
          status: investment.status
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
      setInvestmentOffers(offers);
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
        await refreshInvestments();
      }
    };

    loadUserData();
  }, [currentUser?.id]);

  // Load data from localStorage on mount (fallback)
  useEffect(() => {
    const userId = currentUser?.id;
    if (!userId) return;

    try {
      const storedOffers = localStorage.getItem('investmentOffers');
      const storedInvestments = localStorage.getItem(`userInvestments_${userId}`);
      const storedRequests = localStorage.getItem(`sellRequests_${userId}`);

      if (storedOffers) setInvestmentOffers(JSON.parse(storedOffers));
      if (storedInvestments) setUserInvestments(JSON.parse(storedInvestments));
      if (storedRequests) setSellRequests(JSON.parse(storedRequests));
    } catch (error) {
      console.error('Failed to load investment data:', error);
    }
  }, [currentUser?.id]);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('investmentOffers', JSON.stringify(investmentOffers));
  }, [investmentOffers]);

  useEffect(() => {
    const userId = currentUser?.id;
    if (userId) {
      localStorage.setItem(`userInvestments_${userId}`, JSON.stringify(userInvestments));
    }
  }, [userInvestments, currentUser?.id]);

  useEffect(() => {
    const userId = currentUser?.id;
    if (userId) {
      localStorage.setItem(`sellRequests_${userId}`, JSON.stringify(sellRequests));
    }
  }, [sellRequests, currentUser?.id]);

  // Cross-tab sync via storage event (fires when another tab modifies localStorage)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      const userId = currentUser?.id;
      if (!userId) return;

      try {
        if (e.key === 'investmentOffers' && e.newValue) {
          setInvestmentOffers(JSON.parse(e.newValue));
        }
        // ONLY sync user-specific data that belongs to THIS user
        if (e.key === `userInvestments_${userId}` && e.newValue) {
          setUserInvestments(JSON.parse(e.newValue));
        }
        if (e.key === `sellRequests_${userId}` && e.newValue) {
          setSellRequests(JSON.parse(e.newValue));
        }
        if (e.key === 'investment_access' && e.newValue) {
          window.dispatchEvent(new CustomEvent('investment_access_changed'));
        }
      } catch (error) {
        console.error('Cross-tab investment sync failed:', error);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

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
      // Update local state with database ID
      setInvestmentOffers(prev => 
        prev.map(o => o.id === newOffer.id ? { ...o, id: created.id } : o)
      );
    })
    .catch(error => {
      console.error('❌ Failed to save investment offer to database:', error);
    });
    
    // Update local state immediately for responsiveness
    setInvestmentOffers(prev => [...prev, newOffer]);
    return newOffer.id;
  };

  const updateInvestmentOffer = (id: string, updates: Partial<InvestmentOffer>): boolean => {
    // Update local state immediately first
    setInvestmentOffers(prev => {
      const index = prev.findIndex(o => o.id === id);
      if (index === -1) return prev;
      
      const updated = [...prev];
      updated[index] = { ...updated[index], ...updates };
      return updated;
    });
    
    // Update in database (async, no await)
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
    .then(() => {
      console.log('✅ Investment offer updated in database:', id);
    })
    .catch(error => {
      console.error('❌ Failed to update investment offer in database:', error);
    });
    
    return true;
  };

  const deleteInvestmentOffer = (id: string): boolean => {
    // Delete from database
    fetch(`${serverUrl}/investment-offers/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`
      }
    })
    .then(() => {
      console.log('✅ Investment offer deleted from database:', id);
    })
    .catch(error => {
      console.error('❌ Failed to delete investment offer from database:', error);
    });
    
    // Update local state immediately
    setInvestmentOffers(prev => prev.filter(o => o.id !== id));
    return true;
  };

  const getInvestmentOffer = (id: string): InvestmentOffer | undefined => {
    return investmentOffers.find(o => o.id === id);
  };

  // User Investments Management
  const addUserInvestment = (investment: Omit<UserInvestment, 'id' | 'createdAt'>): string => {
    const newInvestment: UserInvestment = {
      ...investment,
      id: `investment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(),
    };
    setUserInvestments(prev => [...prev, newInvestment]);
    
    // Update available units in the offer
    updateInvestmentOffer(investment.offerId, {
      availableUnits: (getInvestmentOffer(investment.offerId)?.availableUnits || 0) - investment.units,
    });
    
    return newInvestment.id;
  };

  const updateUserInvestment = (id: string, updates: Partial<UserInvestment>): boolean => {
    setUserInvestments(prev => {
      const index = prev.findIndex(i => i.id === id);
      if (index === -1) return prev;
      
      const updated = [...prev];
      updated[index] = { ...updated[index], ...updates };
      return updated;
    });
    return true;
  };

  const deleteUserInvestment = (id: string): boolean => {
    const investment = userInvestments.find(i => i.id === id);
    if (!investment) return false;
    
    // Return units to the offer
    updateInvestmentOffer(investment.offerId, {
      availableUnits: (getInvestmentOffer(investment.offerId)?.availableUnits || 0) + investment.units,
    });
    
    setUserInvestments(prev => prev.filter(i => i.id !== id));
    return true;
  };

  const getUserInvestments = (userId: string): UserInvestment[] => {
    return userInvestments.filter(i => i.userId === userId);
  };

  // Sell Requests Management
  const createSellRequest = (request: Omit<SellRequest, 'id' | 'createdAt' | 'status'>): string => {
    const newRequest: SellRequest = {
      ...request,
      id: `sell-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      status: 'pending',
      createdAt: Date.now(),
    };
    setSellRequests(prev => [...prev, newRequest]);
    return newRequest.id;
  };

  const updateSellRequest = (id: string, updates: Partial<SellRequest>): boolean => {
    setSellRequests(prev => {
      const index = prev.findIndex(r => r.id === id);
      if (index === -1) return prev;
      
      const updated = [...prev];
      updated[index] = { ...updated[index], ...updates };
      return updated;
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