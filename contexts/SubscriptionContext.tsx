import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';

// The 5-tier subscription plan system matching admin SubscriptionManagement
export type SubscriptionPlan = 'Basic' | 'Standard' | 'Silver' | 'Gold' | 'Platinum';

const VALID_PLANS: SubscriptionPlan[] = ['Basic', 'Standard', 'Silver', 'Gold', 'Platinum'];

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
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const { currentUser } = useAuth();
  const [plan, setPlanState] = useState<SubscriptionPlan>('Basic');

  // Derive plan from the user's profile (admin-assigned subscriptionPlan)
  // This is the single source of truth set by admin in SubscriptionManagement
  useEffect(() => {
    if (currentUser?.subscriptionPlan) {
      const userPlan = currentUser.subscriptionPlan as SubscriptionPlan;
      if (VALID_PLANS.includes(userPlan)) {
        setPlanState(userPlan);
      }
    } else {
      // Default to Basic if no plan is assigned
      setPlanState('Basic');
    }
  }, [currentUser?.subscriptionPlan]);

  // Cross-tab sync: listen for usersUpdated events (admin changes)
  useEffect(() => {
    const handleUsersUpdated = () => {
      const storedUsers = localStorage.getItem('gross_users');
      const storedCurrentUser = localStorage.getItem('gross_current_user');
      if (storedCurrentUser) {
        try {
          const parsed = JSON.parse(storedCurrentUser);
          if (parsed.subscriptionPlan && VALID_PLANS.includes(parsed.subscriptionPlan)) {
            setPlanState(parsed.subscriptionPlan as SubscriptionPlan);
          }
        } catch { /* ignore */ }
      } else if (storedUsers) {
        // Fallback: look up in users array
        try {
          const users = JSON.parse(storedUsers);
          const user = users.find((u: any) => u.id === currentUser?.id);
          if (user?.subscriptionPlan && VALID_PLANS.includes(user.subscriptionPlan)) {
            setPlanState(user.subscriptionPlan as SubscriptionPlan);
          }
        } catch { /* ignore */ }
      }
    };

    window.addEventListener('usersUpdated', handleUsersUpdated);
    window.addEventListener('storage', handleUsersUpdated);
    return () => {
      window.removeEventListener('usersUpdated', handleUsersUpdated);
      window.removeEventListener('storage', handleUsersUpdated);
    };
  }, [currentUser?.id]);

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
