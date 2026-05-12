import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { useMarketData } from './MarketDataContext';
import { api } from '../utils/supabase/api';
import { supabase, serverUrl } from '../utils/supabase/client';
import { publicAnonKey } from '../utils/supabase/info';

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
  ultra_high_yield: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
  high_yield: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
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
  isCustomValue?: boolean; // If true, current value is manually set by admin and shouldn't be auto-calculated
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
  const marketData = useMarketData();

  // Refresh functions v2.0
  const refreshOffers = async () => {
    setLoading(true);
    try {
      const dbOffers = await api.investmentOffers.getAll();
      if (Array.isArray(dbOffers)) {
        setInvestmentOffers(dbOffers.map((offer: any) => ({
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
          exchanger: offer.exchanger || '',
          enabled: offer.is_active || false,
          createdAt: new Date(offer.created_at).getTime(),
          assetSymbol: offer.asset_symbol || undefined,
          marketPrice: offer.market_price ? parseFloat(offer.market_price) : undefined
        })));
      }
    } catch (error) {
       console.error('Failed to refresh offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshInvestments = async () => {
    if (!currentUser?.id) return;
    setLoading(true);
    try {
        const fetchId = currentUser.role === 'admin' ? 'all' : currentUser.id;
        const [dbInvestments, dbRequests] = await Promise.all([
          currentUser.role === 'admin' ? api.investments.getAll() : api.investments.getByUserId(currentUser.id),
          currentUser.role === 'admin' ? api.sellRequests.getAll() : api.sellRequests.getByUserId(currentUser.id),
        ]);

        if (Array.isArray(dbInvestments)) {
          setUserInvestments(dbInvestments.map((inv: any) => ({
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
            showValueAndDate: inv.show_value_and_date || false,
            isCustomValue: inv.is_custom_value || false
          })));
        }

        if (Array.isArray(dbRequests)) {
          setSellRequests(dbRequests.map((r: any) => ({
            id: r.id,
            userId: r.user_id,
            investmentId: r.investment_id,
            offerName: r.offer_name,
            offerLogo: r.offer_logo,
            offerType: r.offer_type,
            units: r.units,
            currentPrice: r.current_price,
            totalAmount: r.total_amount,
            paymentWallet: r.payment_wallet,
            status: r.status,
            createdAt: new Date(r.created_at).getTime()
          })));
        }
    } catch (error) {
      console.error('Failed to refresh investments:', error);
    } finally {
      setLoading(false);
      setIsHydrated(true);
    }
  };

  useEffect(() => {
    refreshOffers();
    if (currentUser?.id) refreshInvestments();

    // Enable Realtime Subscriptions for instant updates (User & Admin)
    const investmentsSubscription = supabase
      .channel('investment_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'user_investments' }, (payload) => {
        console.log('Realtime change detected in user_investments:', payload);
        refreshInvestments();
      })
      .subscribe();

    const sellRequestsSubscription = supabase
      .channel('sell_request_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sell_requests' }, (payload) => {
        console.log('Realtime change detected in sell_requests:', payload);
        refreshInvestments();
      })
      .subscribe();

    const offersSubscription = supabase
      .channel('offer_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'investment_offers' }, (payload) => {
        console.log('Realtime change detected in investment_offers:', payload);
        refreshOffers();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(investmentsSubscription);
      supabase.removeChannel(sellRequestsSubscription);
      supabase.removeChannel(offersSubscription);
    };
  }, [currentUser?.id]);

  // ── WebSocket Price Integration ──────────────────────────────────────────
  
  // 1. Automatically subscribe to all asset symbols in ECN offers
  useEffect(() => {
    const symbolsToSubscribe = investmentOffers
      .filter(o => o.type === 'ECN' && o.assetSymbol)
      .map(o => o.assetSymbol as string);
    
    symbolsToSubscribe.forEach(sym => marketData.subscribeToSymbol(sym));
  }, [investmentOffers, marketData.subscribeToSymbol]);

  // 2. React to live price changes and update the offer list state
  useEffect(() => {
    const hasPriceUpdates = investmentOffers.some(offer => {
      if (offer.type !== 'ECN' || !offer.assetSymbol) return false;
      const livePrice = marketData.getPrice(offer.assetSymbol)?.price;
      return livePrice && livePrice !== offer.marketPrice;
    });

    if (hasPriceUpdates) {
      setInvestmentOffers(prevOffers => prevOffers.map(offer => {
        if (offer.type === 'ECN' && offer.assetSymbol) {
          const livePrice = marketData.getPrice(offer.assetSymbol)?.price;
          if (livePrice && livePrice !== offer.marketPrice) {
            return { ...offer, marketPrice: livePrice };
          }
        }
        return offer;
      }));
    }
  }, [marketData.prices, marketData.getPrice]);

  // Legacy sync logic and real-time listeners removed
  // All state changes are now triggered via API calls with local refresh

  // Investment Offers Management
  const addInvestmentOffer = (offer: Omit<InvestmentOffer, 'id' | 'createdAt'>): string => {
    const id = `offer-${Date.now()}`;
    api.investmentOffers.create({
      name: offer.name,
      logo_url: offer.logo,
      type: offer.type,
      exchanger: offer.exchanger,
      expected_return: offer.profitability,
      yield_tier: offer.profitabilityTier,
      duration_days: offer.period,
      category: offer.category,
      price_per_unit: offer.price,
      total_units: offer.totalUnits,
      available_units: offer.availableUnits,
      min_investment: offer.minPurchase,
      max_investment: offer.maxPurchase,
      description: offer.description,
      is_active: offer.enabled,
      asset_symbol: offer.assetSymbol,
      market_price: offer.marketPrice
    }).then(() => refreshOffers());
    return id;
  };

  const updateInvestmentOffer = (id: string, updates: Partial<InvestmentOffer>): boolean => {
    const dbUpdates: any = {};
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.logo !== undefined) dbUpdates.logo_url = updates.logo;
    if (updates.type !== undefined) dbUpdates.type = updates.type;
    if (updates.exchanger !== undefined) dbUpdates.exchanger = updates.exchanger;
    if (updates.profitability !== undefined) dbUpdates.expected_return = updates.profitability;
    if (updates.profitabilityTier !== undefined) dbUpdates.yield_tier = updates.profitabilityTier;
    if (updates.period !== undefined) dbUpdates.duration_days = updates.period;
    if (updates.category !== undefined) dbUpdates.category = updates.category;
    if (updates.price !== undefined) dbUpdates.price_per_unit = updates.price;
    if (updates.totalUnits !== undefined) dbUpdates.total_units = updates.totalUnits;
    if (updates.availableUnits !== undefined) dbUpdates.available_units = updates.availableUnits;
    if (updates.minPurchase !== undefined) dbUpdates.min_investment = updates.minPurchase;
    if (updates.maxPurchase !== undefined) dbUpdates.max_investment = updates.maxPurchase;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.enabled !== undefined) dbUpdates.is_active = updates.enabled;
    if (updates.assetSymbol !== undefined) dbUpdates.asset_symbol = updates.assetSymbol;
    if (updates.marketPrice !== undefined) dbUpdates.market_price = updates.marketPrice;

    api.investmentOffers.update(id, dbUpdates).then(() => refreshOffers());
    return true;
  };

  const deleteInvestmentOffer = (id: string): boolean => {
    api.investmentOffers.delete(id).then(() => refreshOffers());
    return true;
  };

  const getInvestmentOffer = (id: string): InvestmentOffer | undefined => {
    return investmentOffers.find(o => o.id === id);
  };

  // User Investments Management
  const addUserInvestment = async (investment: Omit<UserInvestment, 'id' | 'createdAt'>): Promise<string> => {
    // Generate a valid UUID
    const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

    try {
      console.log('Attempting to create investment:', { ...investment, id });
      await api.investments.create({
        id: id,
        user_id: investment.userId,
        offer_id: investment.offerId,
        offer_name: investment.offerName,
        offer_logo: investment.offerLogo || '',
        offer_type: investment.offerType,
        units: investment.units,
        purchase_price: investment.purchasePrice,
        amount: investment.totalAmount,
        current_value: investment.currentValue,
        maturity_date: investment.endDate,
        expected_return: investment.profitability,
        status: investment.status,
        show_value_and_date: investment.showValueAndDate,
        created_at: Date.now(),
        updated_at: Date.now()
      });
      await refreshInvestments();
      return id;
    } catch (error) {
      console.error('❌ Detailed Database Error (addUserInvestment):', error);
      throw error; // Let the UI handle it
    }
  };

  const updateUserInvestment = async (id: string, updates: Partial<UserInvestment>): Promise<boolean> => {
    const dbUpdates: any = { updated_at: Date.now() };
    if (updates.units !== undefined) dbUpdates.units = updates.units;
    if (updates.totalAmount !== undefined) dbUpdates.amount = updates.totalAmount;
    if (updates.currentValue !== undefined) dbUpdates.current_value = updates.currentValue;
    if (updates.status !== undefined) dbUpdates.status = updates.status;
    if (updates.endDate !== undefined) dbUpdates.maturity_date = updates.endDate;
    if (updates.showValueAndDate !== undefined) dbUpdates.show_value_and_date = updates.showValueAndDate;
    if (updates.profitability !== undefined) dbUpdates.expected_return = updates.profitability;
    if (updates.isCustomValue !== undefined) dbUpdates.is_custom_value = updates.isCustomValue;

    try {
      await api.investments.update(id, dbUpdates);
      await refreshInvestments();
      return true;
    } catch (error) {
      console.error('Failed to update investment:', error);
      return false;
    }
  };

  const deleteUserInvestment = (id: string): boolean => {
    api.investments.delete(id).then(() => refreshInvestments());
    return true;
  };

  const getUserInvestments = (userId: string): UserInvestment[] => {
    return userInvestments.filter(i => i.userId === userId);
  };

  // Sell Requests Management
  const createSellRequest = async (request: Omit<SellRequest, 'id' | 'createdAt' | 'status'>): Promise<string> => {
    // Generate a valid UUID
    const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

    try {
      console.log('Attempting to create sell request:', { ...request, id });
      await api.sellRequests.create({
        id: id,
        user_id: request.userId,
        investment_id: (request as any).investment_id || request.investmentId,
        offer_name: request.offerName,
        offer_logo: request.offerLogo || '',
        offer_type: request.offerType,
        units: request.units,
        current_price: request.currentPrice,
        total_amount: request.totalAmount,
        payment_wallet: request.paymentWallet,
        status: 'pending',
        created_at: Date.now(),
        updated_at: Date.now()
      });
      await refreshInvestments();
      return id;
    } catch (error) {
      console.error('❌ Detailed Database Error (createSellRequest):', error);
      throw error;
    }
  };

  const updateSellRequest = async (id: string, updates: Partial<SellRequest>): Promise<boolean> => {
    const dbUpdates: any = { updated_at: Date.now() };
    if (updates.status !== undefined) dbUpdates.status = updates.status;
    if ((updates as any).processedAt !== undefined) dbUpdates.processed_at = (updates as any).processedAt;
    if ((updates as any).processedBy !== undefined) dbUpdates.processed_by = (updates as any).processedBy;
    if ((updates as any).rejectionReason !== undefined) dbUpdates.rejection_reason = (updates as any).rejectionReason;

    try {
      await api.sellRequests.update(id, dbUpdates);
      await refreshInvestments();
      return true;
    } catch (error) {
      console.error('Failed to update sell request:', error);
      return false;
    }
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