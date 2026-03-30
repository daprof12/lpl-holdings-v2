import { useState } from 'react';
import { Check, CreditCard, Calendar, ArrowRight, Crown, Zap, Star, Info } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
  popular?: boolean;
  current?: boolean;
}

export default function UserSubscription() {
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // Current subscription
  const currentSubscription = {
    plan: 'Basic',
    status: 'active',
    startDate: '2024-03-15',
    nextBillingDate: '2024-12-15',
    amount: 29,
    paymentMethod: 'Visa •••• 4242',
    autoRenew: true,
  };

  // Available plans (matching admin subscription structure)
  const plans: SubscriptionPlan[] = [
    {
      id: '1',
      name: 'Basic',
      price: billingCycle === 'monthly' ? 29 : 290,
      interval: billingCycle,
      features: [
        'Access to 500+ assets',
        'Basic charts and indicators',
        'Email support',
        'Mobile app access',
        'Market news and updates',
      ],
      current: currentSubscription.plan === 'Basic',
    },
    {
      id: '2',
      name: 'Pro',
      price: billingCycle === 'monthly' ? 79 : 790,
      interval: billingCycle,
      features: [
        'Access to 3,000+ assets',
        'Advanced charts and indicators',
        'Priority email & chat support',
        'Trading signals (10/day)',
        'API access',
        'Advanced analytics',
        'MT4/MT5 integration',
      ],
      popular: true,
    },
    {
      id: '3',
      name: 'Premium',
      price: billingCycle === 'monthly' ? 199 : 1990,
      interval: billingCycle,
      features: [
        'All Pro features',
        'AI Auto-trader with custom strategies',
        'Unlimited trading signals',
        'Personal account manager',
        'Advanced analytics & reports',
        'Custom risk management tools',
        'VIP support (24/7)',
        'Exclusive webinars & training',
      ],
    },
  ];

  const handleUpgrade = (plan: SubscriptionPlan) => {
    if (plan.current) return;
    setSelectedPlan(plan);
    setShowUpgradeDialog(true);
  };

  const confirmUpgrade = () => {
    // Handle subscription upgrade
    console.log('Upgrading to:', selectedPlan?.name);
    setShowUpgradeDialog(false);
  };

  const getPlanIcon = (planName: string) => {
    switch (planName) {
      case 'Premium':
        return <Crown className="w-6 h-6" />;
      case 'Pro':
        return <Zap className="w-6 h-6" />;
      default:
        return <Star className="w-6 h-6" />;
    }
  };

  const getPlanGradient = (planName: string) => {
    switch (planName) {
      case 'Premium':
        return 'from-purple-600 to-pink-600';
      case 'Pro':
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
            <h1 className="text-3xl font-bold mb-2">Subscription & Billing</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your subscription plan and billing information
            </p>
          </div>

          {/* Current Subscription Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold">Current Subscription</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  currentSubscription.status === 'active' 
                    ? 'bg-green-500' 
                    : 'bg-yellow-500'
                }`}>
                  {currentSubscription.status.toUpperCase()}
                </span>
              </div>
              <div className="text-3xl font-bold mb-1">{currentSubscription.plan} Plan</div>
              <div className="text-sm opacity-90">
                ${currentSubscription.amount}/month
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Start Date</span>
                </div>
                <div className="font-semibold">{currentSubscription.startDate}</div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Next Billing</span>
                </div>
                <div className="font-semibold">{currentSubscription.nextBillingDate}</div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                  <CreditCard className="w-4 h-4" />
                  <span className="text-sm">Payment Method</span>
                </div>
                <div className="font-semibold">{currentSubscription.paymentMethod}</div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                  <Info className="w-4 h-4" />
                  <span className="text-sm">Auto Renewal</span>
                </div>
                <div className="font-semibold">
                  {currentSubscription.autoRenew ? 'Enabled' : 'Disabled'}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                  <CreditCard className="w-4 h-4" />
                  <span className="text-sm">Next Charge</span>
                </div>
                <div className="font-semibold text-green-600 dark:text-green-400">
                  ${currentSubscription.amount}.00
                </div>
              </div>

              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  Manage Payment Methods
                </Button>
              </div>
            </div>
          </div>

          {/* Billing Cycle Toggle */}
          <div className="flex justify-center">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-2 shadow-sm inline-flex gap-2">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  billingCycle === 'monthly'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors relative ${
                  billingCycle === 'yearly'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700'
                }`}
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Save 15%
                </span>
              </button>
            </div>
          </div>

          {/* Available Plans */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Available Plans</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 ${
                    plan.popular ? 'ring-2 ring-blue-600' : 'border-2 border-gray-200 dark:border-slate-700'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                      MOST POPULAR
                    </div>
                  )}

                  {plan.current && (
                    <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                      CURRENT PLAN
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className={`bg-gradient-to-br ${getPlanGradient(plan.name)} p-6 text-white`}>
                    <div className="flex items-center gap-3 mb-4">
                      {getPlanIcon(plan.name)}
                      <h3 className="text-2xl font-bold">{plan.name}</h3>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-sm opacity-80">
                        /{plan.interval === 'monthly' ? 'mo' : 'yr'}
                      </span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <div className="text-sm opacity-90 mt-1">
                        ${(plan.price / 12).toFixed(2)}/month
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="p-6">
                    <div className="space-y-4 mb-6">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    {plan.current ? (
                      <Button disabled className="w-full bg-gray-100 dark:bg-slate-700">
                        Current Plan
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleUpgrade(plan)}
                        className={`w-full ${
                          plan.popular 
                            ? 'bg-blue-600 hover:bg-blue-700' 
                            : ''
                        }`}
                      >
                        {currentSubscription.plan === 'Basic' ? 'Upgrade' : 
                         plans.findIndex(p => p.name === currentSubscription.plan) > plans.findIndex(p => p.id === plan.id) 
                           ? 'Downgrade' 
                           : 'Upgrade'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Billing History */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-slate-700">
              <h2 className="text-xl font-bold">Billing History</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-slate-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Invoice
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                  <tr className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4">2024-11-15</td>
                    <td className="px-6 py-4">Basic Plan - Monthly</td>
                    <td className="px-6 py-4 font-semibold">$29.00</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                        Paid
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4">2024-10-15</td>
                    <td className="px-6 py-4">Basic Plan - Monthly</td>
                    <td className="px-6 py-4 font-semibold">$29.00</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                        Paid
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4">2024-09-15</td>
                    <td className="px-6 py-4">Basic Plan - Monthly</td>
                    <td className="px-6 py-4 font-semibold">$29.00</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                        Paid
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Confirmation Dialog */}
      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedPlan && plans.findIndex(p => p.name === currentSubscription.plan) > plans.findIndex(p => p.name === selectedPlan.name)
                ? 'Downgrade Subscription'
                : 'Upgrade Subscription'}
            </DialogTitle>
            <DialogDescription>
              {selectedPlan && plans.findIndex(p => p.name === currentSubscription.plan) > plans.findIndex(p => p.name === selectedPlan.name)
                ? 'Downgrade your subscription to a lower plan.'
                : 'Upgrade your subscription to a higher plan.'}
            </DialogDescription>
          </DialogHeader>

          {selectedPlan && (
            <div className="space-y-4 py-4">
              <div className="bg-gray-50 dark:bg-slate-900/50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Current Plan:</span>
                  <span className="font-semibold">{currentSubscription.plan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">New Plan:</span>
                  <span className="font-semibold">{selectedPlan.name}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-slate-700 pt-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                    <span className="text-xl font-bold text-green-600 dark:text-green-400">
                      ${selectedPlan.price}/{selectedPlan.interval === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Next billing date:</span>
                  <span className="font-semibold">{currentSubscription.nextBillingDate}</span>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    {plans.findIndex(p => p.name === currentSubscription.plan) > plans.findIndex(p => p.name === selectedPlan.name)
                      ? 'Your subscription will be downgraded immediately. The price difference will be prorated and credited to your account.'
                      : 'Your subscription will be upgraded immediately. You will be charged the prorated amount for the remaining billing period.'}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setShowUpgradeDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={confirmUpgrade}>
                  Confirm {plans.findIndex(p => p.name === currentSubscription.plan) > plans.findIndex(p => p.name === selectedPlan.name) ? 'Downgrade' : 'Upgrade'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}