import { useState, useMemo } from 'react';
import { Check, Edit, Trash2, Search, Calendar, CreditCard } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { useAuth } from '../../contexts/AuthContext';
import { formatCurrency } from '../../utils/formatNumber';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Subscriber {
  id: string;
  name: string;
  email: string;
  plan: string;
  status: 'active' | 'cancelled' | 'expired';
  startDate: string;
  nextBilling: string;
  amount: number;
}

// ─── Static comparison-table data ────────────────────────────────────────────
const TABLE_PLANS = [
  { name: 'Basic',    minDeposit: 250 },
  { name: 'Standard', minDeposit: 5_000 },
  { name: 'Silver',   minDeposit: 25_000 },
  { name: 'Gold',     minDeposit: 50_000 },
  { name: 'Platinum', minDeposit: 100_000 },
  { name: 'VIP',      minDeposit: 250_000 },
];

const TABLE_FEATURES: { name: string; values: (boolean | string)[] }[] = [
  { name: 'Spreads',                    values: [true,  true,  true,  true,  true] },
  { name: 'Negative Balance Protection',values: [true,  true,  true,  true,  true] },
  { name: 'Education',                  values: [true,  true,  true,  true,  true] },
  { name: 'Market Overview',            values: [true,  true,  true,  true,  true] },
  { name: 'Signals',                    values: [true,  true,  true,  true,  true] },
  { name: 'Zero Swap Account',          values: [false, false, false, false, false] },
  { name: 'Cashback',                   values: [false, false, false, false, false] },
  { name: 'Individual Strategy',        values: [false, false, false, true,  true] },
  { name: 'Webinars',                   values: ['1 Time', '1 per month', '2 per month', '3 per month', '4 per month'] },
  { name: 'Account Manager',            values: [false, false, false, true,  true] },
  { name: 'Individual Assistance',      values: [false, false, false, false, true] },
  { name: 'Private Portfolio',          values: [false, false, false, true,  true] },
  { name: 'Free Withdrawal',            values: [false, '1 time', '1 per month', '1 per month', '3 per month'] },
  { name: 'Interest on free capital',   values: [false, false, false, '3%', '5%'] },
  { name: 'Pre-capital mobility',       values: [false, false, true,  true,  true] },
  { name: 'Bitcoin discounter',         values: [false, false, false, true,  true] },
];

function CellValue({ val }: { val: boolean | string }) {
  if (val === true)  return <Check className="w-4 h-4 text-green-400 mx-auto" />;
  if (val === false) return <span className="text-gray-500 select-none">–</span>;
  return <span className="text-gray-300 text-xs">{val}</span>;
}

// ─── Plan badge colour helper ─────────────────────────────────────────────────
function planBadgeClass(plan: string) {
  switch (plan) {
    case 'VIP':      return 'bg-amber-900/40 text-amber-300 border border-amber-500/30';
    case 'Platinum': return 'bg-purple-900/30 text-purple-300';
    case 'Gold':     return 'bg-yellow-900/30 text-yellow-300';
    case 'Silver':   return 'bg-slate-700/50 text-slate-300';
    case 'Standard': return 'bg-blue-900/30 text-blue-300';
    default:         return 'bg-gray-800 text-gray-300';
  }
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function SubscriptionManagement() {
  const { users, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'plans' | 'subscribers'>('plans');
  const [showSubscriberDialog, setShowSubscriberDialog] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [subscriberFormData, setSubscriberFormData] = useState({
    plan: 'Basic',
    status: 'active',
  });

  // Build subscribers list from real users
  const subscribers = useMemo<Subscriber[]>(() => {
    return users
      .filter(u => u.subscriptionPlan && u.subscriptionPlan !== '')
      .map(u => {
        // Find matching plan case-insensitively, fallback to whatever string is stored
        const planObj = TABLE_PLANS.find(p => p.name.toLowerCase() === u.subscriptionPlan?.toLowerCase());
        
        // Ensure safe dates to prevent "Invalid Date" crashes
        const validStartDate = u.createdAt ? new Date(u.createdAt) : new Date();
        const startDate = isNaN(validStartDate.getTime()) ? new Date() : validStartDate;
        
        const nextBilling = new Date(startDate);
        nextBilling.setMonth(nextBilling.getMonth() + 1);
        
        return {
          id: u.id,
          name: `${u.firstName || 'Unknown'} ${u.lastName || 'User'}`,
          email: u.email,
          plan: planObj ? planObj.name : (u.subscriptionPlan || 'Basic'),
          status: 'active' as const,
          startDate: startDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-'),
          nextBilling: nextBilling.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-'),
          amount: planObj?.minDeposit ?? 0,
        };
      });
  }, [users]);

  const filteredSubscribers = useMemo(() =>
    subscribers.filter(s =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.plan.toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery, subscribers]);

  const handleEditSubscriber = (sub: Subscriber) => {
    setSelectedSubscriber(sub);
    setSubscriberFormData({ plan: sub.plan, status: sub.status });
    setShowSubscriberDialog(true);
  };

  const handleDeleteSubscriber = (id: string) => {
    if (confirm('Remove this subscription?')) {
      updateProfile(id, { subscriptionPlan: undefined });
    }
  };

  const handleSubmitSubscriber = () => {
    if (selectedSubscriber) {
      updateProfile(selectedSubscriber.id, { subscriptionPlan: subscriberFormData.plan });
      setShowSubscriberDialog(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':    return 'bg-green-900/30 text-green-400';
      case 'cancelled': return 'bg-orange-900/30 text-orange-400';
      case 'expired':   return 'bg-red-900/30 text-red-400';
      default:          return 'bg-gray-800 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Subscription Management</h1>
        <p className="text-gray-400 mt-1">Manage subscription plans and user subscriptions</p>
      </div>

      {/* Tabs */}
      <div className="bg-[#111115] rounded-xl p-2 border border-gray-800">
        <div className="flex gap-2">
          {(['plans', 'subscribers'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors capitalize ${
                activeTab === tab
                  ? 'bg-[#25AABE] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {tab === 'plans' ? 'Subscription Plans' : 'User Subscribers'}
            </button>
          ))}
        </div>
      </div>

      {/* ── Plans Tab ─────────────────────────────────────────────────────── */}
      {activeTab === 'plans' && (
        <div className="space-y-4">
          <p className="text-gray-400 text-sm">
            Overview of all available account tiers and their included features.
          </p>

          {/* Comparison table */}
          <div className="overflow-x-auto rounded-2xl border border-[#22c55e]">
            <table className="w-full min-w-[760px] border-collapse text-sm">
              {/* Header */}
              <thead>
                <tr>
                  <th className="bg-[#111115] px-5 py-5 text-left border-r border-b border-[#22c55e]/20 w-[200px]">
                    <span className="text-white font-semibold">LPL-Holdings</span>
                  </th>
                  {TABLE_PLANS.map(plan => (
                    <th
                      key={plan.name}
                      className="bg-[#111115] px-4 py-5 text-center border-r border-b border-[#22c55e]/20 last:border-r-0"
                    >
                      <p className="text-gray-400 text-xs mb-1">{plan.name}</p>
                      <p className="text-white text-lg">${formatCurrency(plan.minDeposit)}</p>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Feature rows */}
              <tbody>
                {TABLE_FEATURES.map((feature, ri) => (
                  <tr key={ri} className={ri % 2 === 0 ? 'bg-[#0b0b0d]' : 'bg-[#0e0f10]'}>
                    <td className="px-5 py-3 text-gray-300 border-r border-[#22c55e]/10 whitespace-nowrap">
                      {feature.name}
                    </td>
                    {feature.values.map((val, ci) => (
                      <td key={ci} className="px-4 py-3 text-center border-r border-[#22c55e]/10 last:border-r-0">
                        <CellValue val={val} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* VIP & ELITE info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#111115] rounded-xl p-5 border border-gray-800">
              <h4 className="text-[#22c55e] font-bold mb-2 tracking-widest text-sm">VIP</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Best trading conditions. Lowest swaps and spreads. Increased income from swaps, cashback and interest on free capital. Access to exclusive trading strategies and development of customized, diversified portfolios. Contact your account manager.
              </p>
            </div>
            <div className="bg-[#111115] rounded-xl p-5 border border-gray-800">
              <h4 className="text-white font-bold mb-2 tracking-widest text-sm">ELITE</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                For exclusive clients only. To determine whether you are eligible to apply for an Elite Account, please contact your Account Manager.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Subscribers Tab ───────────────────────────────────────────────── */}
      {activeTab === 'subscribers' && (
        <>
          {/* Search */}
          <div className="bg-[#111115] rounded-xl p-4 border border-gray-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, email, or plan…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#0b0b0d] border-gray-700 text-white"
              />
            </div>
          </div>

          {/* Table */}
          <div className="bg-[#111115] rounded-xl border border-gray-800 overflow-hidden">
            {filteredSubscribers.length === 0 ? (
              <div className="text-center py-16 px-4">
                <CreditCard className="w-14 h-14 mx-auto text-gray-600 mb-3" />
                <h3 className="text-xl font-semibold text-white mb-2">No Subscribers Found</h3>
                <p className="text-gray-400 text-sm">
                  {searchQuery ? 'No subscribers match your search.' : 'No users have active subscriptions yet.'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#0b0b0d] border-b border-gray-800">
                    <tr>
                      {['User', 'Plan', 'Deposit', 'Start Date', 'Next Billing', 'Status', 'Actions'].map(h => (
                        <th key={h} className="px-5 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {filteredSubscribers.map(sub => (
                      <tr key={sub.id} className="hover:bg-gray-800/30 transition-colors">
                        <td className="px-5 py-4">
                          <div className="font-semibold text-white">{sub.name}</div>
                          <div className="text-xs text-gray-400">{sub.email}</div>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${planBadgeClass(sub.plan)}`}>
                            {sub.plan}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-white font-semibold">
                          ${formatCurrency(sub.amount)}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 text-gray-300">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            {sub.startDate}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 text-gray-300">
                            <CreditCard className="w-4 h-4 text-gray-500" />
                            {sub.nextBilling}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(sub.status)}`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEditSubscriber(sub)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteSubscriber(sub.id)}>
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── Edit Subscriber Dialog ────────────────────────────────────────── */}
      <Dialog open={showSubscriberDialog} onOpenChange={setShowSubscriberDialog}>
        <DialogContent className="bg-[#111115] border border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Edit User Subscription</DialogTitle>
            <DialogDescription className="text-gray-400">
              Update the subscription tier for this user.
            </DialogDescription>
          </DialogHeader>

          {selectedSubscriber && (
            <div className="space-y-4 py-4">
              <div className="bg-[#0b0b0d] rounded-lg p-4 space-y-2 border border-gray-800">
                {[
                  ['User',       selectedSubscriber.name],
                  ['Email',      selectedSubscriber.email],
                  ['Start Date', selectedSubscriber.startDate],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-gray-400">{label}:</span>
                    <span className="font-semibold text-white">{value}</span>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white">Subscription Plan</label>
                <select
                  value={subscriberFormData.plan}
                  onChange={e => setSubscriberFormData({ ...subscriberFormData, plan: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-[#0b0b0d] text-white"
                >
                  {TABLE_PLANS.map(p => (
                    <option key={p.name} value={p.name}>
                      {p.name} — ${formatCurrency(p.minDeposit)} min deposit
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white">Status</label>
                <select
                  value={subscriberFormData.status}
                  onChange={e => setSubscriberFormData({ ...subscriberFormData, status: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-[#0b0b0d] text-white"
                >
                  <option value="active">Active</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="expired">Expired</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setShowSubscriberDialog(false)}>Cancel</Button>
                <Button onClick={handleSubmitSubscriber}>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}