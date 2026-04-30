import { useState } from 'react';
import { Check, Crown, Zap, Star, Info, Wallet } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../utils/supabase/api';

import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}

export default function UserSubscription() {
  const { currentUser, updateProfile, addWalletTransaction } = useAuth();
  const navigate = useNavigate();
  
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);

  // Available plans
  const plans: SubscriptionPlan[] = [
    {
      id: '1',
      name: 'Basic',
      price: 250,
      features: [
        'Spreads',
        'Negative Balance Protection',
        'Education',
        'Market Overview',
        'Signals',
      ]
    },
    {
      id: '2',
      name: 'Standard',
      price: 5000,
      features: [
        'All Basic Features',
        '1 Free Withdrawal',
        'Webinars: 1 per month',
      ]
    },
    {
      id: '3',
      name: 'Silver',
      price: 25000,
      features: [
        'All Standard Features',
        '1 Free Withdrawal per month',
        'Pre-capital mobility',
        'Webinars: 2 per month',
      ]
    },
    {
      id: '4',
      name: 'Gold',
      price: 50000,
      popular: true,
      features: [
        'All Silver Features',
        'Individual Strategy',
        'Account Manager',
        'Private Portfolio',
        '3% Interest on free capital',
        'Bitcoin discounter',
      ]
    },
    {
      id: '5',
      name: 'Platinum',
      price: 100000,
      features: [
        'All Gold Features',
        'Zero Swap Account',
        'Cashback',
        'Individual Assistance',
        '3 Free Withdrawals per month',
        '5% Interest on free capital',
      ]
    },
  ];

  const currentPlanName = currentUser?.subscriptionPlan || 'Basic';
  const currentPlanIndex = plans.findIndex(p => p.name === currentPlanName);

  const handleUpgrade = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setShowUpgradeDialog(true);
  };

  const confirmUpgrade = async () => {
    if (!selectedPlan || !currentUser) return;
    
    const price = selectedPlan.price;
    const balance = currentUser.liveBalance || 0;
    
    if (balance < price) {
      toast.error('Insufficient wallet balance. Please add funds to upgrade.');
      setShowUpgradeDialog(false);
      navigate('/dashboard/wallet');
      return;
    }
    
    const newBalance = balance - price;
    
    // Create transaction record directly marking it as paid
    addWalletTransaction({
      userId: currentUser.id,
      type: 'withdraw',
      accountType: 'live',
      amount: price,
      currency: 'USD',
      method: 'system',
      status: 'completed',
      notes: `Lifetime Subscription Upgrade: ${selectedPlan.name} Plan`
    });

    try {
      // Deactivate old plan if exists
      const existingSubs = await api.subscribers.getByUserId(currentUser.id);
      if (existingSubs && existingSubs.length > 0) {
        await api.subscribers.update(existingSubs[0].id, {
          plan: selectedPlan.name,
          amount: price,
          updated_at: Date.now()
        });
      } else {
        await api.subscribers.create({
          user_id: currentUser.id,
          plan: selectedPlan.name,
          amount: price,
          status: 'active',
          created_at: Date.now(),
          updated_at: Date.now()
        });
      }
    } catch (err) {
      console.error("Failed to sync new plan to database", err);
    }

    try {
      await api.tradingAccounts.update(currentUser.id, { balance: newBalance });
    } catch (e) {
      console.error("Failed to update trading account balance", e);
    }

    // Update user profile immediately
    updateProfile(currentUser.id, {
      subscriptionPlan: selectedPlan.name,
      liveBalance: newBalance
    });
    
    toast.success(`Successfully upgraded to ${selectedPlan.name} Plan!`);
    setShowUpgradeDialog(false);
  };

  const getPlanIcon = (planName: string) => {
    switch (planName) {
      case 'Platinum':
        return <Crown className="w-6 h-6" />;
      case 'Gold':
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 'Silver':
        return <Zap className="w-6 h-6" />;
      case 'Standard':
        return <Zap className="w-6 h-6 text-blue-300" />;
      default:
        return <Star className="w-6 h-6" />;
    }
  };

  const getPlanGradient = (planName: string) => {
    switch (planName) {
      case 'Platinum':
        return 'from-purple-600 to-pink-600';
      case 'Gold':
        return 'from-yellow-500 to-amber-600';
      case 'Silver':
        return 'from-slate-500 to-slate-700';
      case 'Standard':
        return 'from-blue-600 to-indigo-600';
      default:
        return 'from-gray-600 to-gray-700';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Subscription & Membership</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your lifetime access plan and membership tiers.
            </p>
          </div>

          {/* Current Subscription Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
            <div className={`bg-gradient-to-r ${getPlanGradient(currentPlanName)} p-6 text-white`}>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold">Current Plan</h2>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500 shadow-sm">
                  LIFETIME ACCESS
                </span>
              </div>
              <div className="flex items-center gap-3">
                {getPlanIcon(currentPlanName)}
                <div className="text-3xl font-bold">{currentPlanName} Tier</div>
              </div>
              <div className="text-sm opacity-90 mt-2">
                You currently have permanent access to the {currentPlanName} tier features. No recurring billing.
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 dark:bg-slate-900/50">
              <div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-medium">Membership Status</span>
                </div>
                <div className="font-bold text-lg">{currentPlanName} Plan</div>
              </div>
            </div>
          </div>

          {/* Available Plans */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Upgrade Options</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {plans.map((plan, index) => {
                const isCurrent = plan.name === currentPlanName;
                const isDowngrade = index < Math.max(0, currentPlanIndex);
                
                return (
                  <div
                    key={plan.id}
                    className={`relative bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden flex flex-col transition-transform ${
                      plan.popular ? 'ring-2 ring-blue-600 hover:scale-[1.02]' : 'border-2 border-gray-200 dark:border-slate-700 hover:scale-[1.02]'
                    }`}
                  >
                    {plan.popular && !isCurrent && (
                      <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                        POPULAR
                      </div>
                    )}
  
                    {isCurrent && (
                      <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg shadow-sm">
                        CURRENT TIER
                      </div>
                    )}
  
                    {/* Plan Header */}
                    <div className={`bg-gradient-to-br ${getPlanGradient(plan.name)} p-6 text-white`}>
                      <div className="flex items-center gap-3 mb-4">
                        {getPlanIcon(plan.name)}
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">${(plan.price || 0).toLocaleString()}</span>
                        <span className="text-sm opacity-80 pl-1">
                          one-time
                        </span>
                      </div>
                      <div className="text-sm opacity-90 mt-1">
                        Lifetime Access
                      </div>
                    </div>
  
                    {/* Features */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="space-y-4 mb-6 flex-grow">
                        {plan.features.map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
  
                      {/* Action Button */}
                      <div className="mt-auto pt-4 border-t border-gray-100 dark:border-slate-700">
                        {isCurrent ? (
                          <Button disabled className="w-full bg-gray-100 dark:bg-slate-700 text-gray-500 dark:!text-white">
                            Current Plan
                          </Button>
                        ) : isDowngrade ? (
                          <Button disabled variant="outline" className="w-full text-gray-400 border-gray-200 dark:border-slate-700">
                            Included in {currentPlanName}
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleUpgrade(plan)}
                            className={`w-full ${
                              plan.popular 
                                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md' 
                                : 'bg-slate-800 hover:bg-slate-900 dark:bg-slate-600 dark:hover:bg-slate-500 !text-white'
                            }`}
                          >
                            Upgrade for ${(plan.price || 0).toLocaleString()}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Confirmation Dialog */}
      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Confirm Upgrade
            </DialogTitle>
            <DialogDescription>
              You are upgrading to a lifetime membership.
            </DialogDescription>
          </DialogHeader>

          {selectedPlan && (
            <div className="space-y-5 py-4">
              <div className="bg-gray-50 dark:bg-slate-900/50 rounded-lg p-5 border border-gray-100 dark:border-slate-800 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Current Tier:</span>
                  <span className="font-semibold text-gray-900 dark:text-white px-2 py-1 bg-gray-200 dark:bg-slate-800 rounded">{currentPlanName}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">New Tier (Lifetime):</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400 px-2 py-1 bg-blue-50 dark:bg-blue-900/20 rounded">{selectedPlan.name}</span>
                </div>
                
                <div className="border-t border-gray-200 dark:border-slate-700 my-2 pt-4">
                  <div className="flex justify-between items-center text-sm mb-3">
                    <span className="text-gray-600 dark:text-gray-400">Live Wallet Balance:</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      ${(currentUser?.liveBalance || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Upgrade Cost:</span>
                    <span className="text-lg font-bold text-red-500">
                      -${(selectedPlan.price || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-slate-700 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Remaining Balance:</span>
                    <span className={`text-lg font-bold ${(currentUser?.liveBalance || 0) < selectedPlan.price ? 'text-red-500' : 'text-green-600 dark:text-green-400'}`}>
                      ${Math.max(0, (currentUser?.liveBalance || 0) - (selectedPlan.price || 0)).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              {(currentUser?.liveBalance || 0) < selectedPlan.price ? (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800 dark:text-red-200 font-medium leading-relaxed">
                      Insufficient live wallet balance. Please make a deposit of at least <span className="font-bold text-red-900 dark:text-red-100">${((selectedPlan.price || 0) - (currentUser?.liveBalance || 0)).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span> to proceed with this upgrade.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                      The amount will be deducted directly from your live wallet balance and your account will be upgraded instantly.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" onClick={() => setShowUpgradeDialog(false)}>
                  Cancel
                </Button>
                
                {(currentUser?.liveBalance || 0) < selectedPlan.price ? (
                  <Button onClick={() => { setShowUpgradeDialog(false); navigate('/dashboard/wallet'); }} className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                    Deposit Funds
                  </Button>
                ) : (
                  <Button onClick={confirmUpgrade} className="bg-green-600 hover:bg-green-700 text-white shadow-sm">
                    Confirm Purchase
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}