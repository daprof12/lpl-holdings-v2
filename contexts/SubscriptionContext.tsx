import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';

// The 6-tier subscription plan system matching admin SubscriptionManagement
export type SubscriptionPlan = 'Basic' | 'Standard' | 'Silver' | 'Gold' | 'Platinum' | 'VIP';

const VALID_PLANS: SubscriptionPlan[] = ['Basic', 'Standard', 'Silver', 'Gold', 'Platinum', 'VIP'];

interface SubscriptionContextType {
  plan: SubscriptionPlan;
  setPlan: (plan: SubscriptionPlan) => void;
  /** Human-readable plan label */
  planLabel: string;
  /** Minimum deposit for the current plan */
  planMinDeposit: number;
}

/** Minimum deposit thresholds per plan tier */
export const PLAN_MIN_DEPOSITS: Record<SubscriptionPlan, number> = {
  Basic: 250,
  Standard: 5_000,
  Silver: 25_000,
  Gold: 50_000,
  Platinum: 100_000,
  VIP: 250_000,
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const { currentUser } = useAuth();
  const [plan, setPlanState] = useState<SubscriptionPlan>('Basic');

  // Derive plan from the user's profile
  useEffect(() => {
    if (currentUser?.subscriptionPlan) {
      const userPlan = currentUser.subscriptionPlan as SubscriptionPlan;
      if (VALID_PLANS.includes(userPlan)) {
        setPlanState(userPlan);
      }
    } else {
      setPlanState('Basic');
    }
  }, [currentUser?.subscriptionPlan]);

  // Public setter — also persists to user profile
  const setPlan = (newPlan: SubscriptionPlan) => {
    setPlanState(newPlan);
  };

  const value: SubscriptionContextType = {
    plan,
    setPlan,
    planLabel: plan,
    planMinDeposit: PLAN_MIN_DEPOSITS[plan] ?? 250,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}
