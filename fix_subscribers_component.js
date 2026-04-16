const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'components/admin/SubscriptionManagement.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Add import
if (!content.includes("import { api }")) {
    content = content.replace("import { useAuth }", "import { useAuth } from '../../contexts/AuthContext';\nimport { api } from '../../utils/supabase/api';\nimport { toast } from 'sonner';\n//");
    content = content.replace("import { useAuth } from '../../contexts/AuthContext';\nimport { useAuth }", "import { useAuth }");
}

// Ensure api and toast are imported
if (!content.includes("import { api }")) {
    content = content.replace("import { formatCurrency }", "import { api } from '../../utils/supabase/api';\nimport { toast } from 'sonner';\nimport { formatCurrency }");
}

// Modify Subscriber type
content = content.replace(
    "interface Subscriber {",
    "interface Subscriber {\n  dbId?: string;\n  userId?: string;"
);

// We need to fetch subscribers from DB
const hookCode = `
  const { users, updateProfile } = useAuth();
  const [dbSubscribers, setDbSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const data = await api.subscribers.getAll();
        setDbSubscribers(data || []);
      } catch (err) {
        console.error('Failed to fetch subscribers', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscribers();
  }, [activeTab]);

  const subscribers = useMemo<Subscriber[]>(() => {
    return dbSubscribers.map(sub => {
      const user = users.find(u => u.id === sub.user_id);
      const planObj = TABLE_PLANS.find(p => p.name.toLowerCase() === sub.plan?.toLowerCase());
      
      return {
        id: sub.user_id, // we use user_id as id for backwards comp
        dbId: sub.id,
        userId: sub.user_id,
        name: user ? \`\${user.firstName || 'Unknown'} \${user.lastName || 'User'}\` : 'Unknown User',
        email: user ? user.email : 'Unknown Email',
        plan: sub.plan,
        status: sub.status as any,
        startDate: new Date(sub.start_date || sub.created_at).toLocaleDateString(),
        nextBilling: sub.next_billing ? new Date(sub.next_billing).toLocaleDateString() : 'N/A',
        amount: sub.amount || planObj?.minDeposit || 0,
      };
    });
  }, [dbSubscribers, users]);
`;

// Replace hook code
content = content.replace(
  /const subscribers = useMemo<Subscriber\[\]>\(\(\) => \{[\s\S]*?\}, \[users\]\);/m,
  "// Replaced block"
);

content = content.replace(
    /const { users, updateProfile } = useAuth\(\);/,
    hookCode
);

// handleEditSubscriber, handleDeleteSubscriber, handleSubmitSubscriber updates
const handleDeleteNew = `
  const handleDeleteSubscriber = async (id: string, dbId?: string) => {
    if (confirm('Remove this subscription?')) {
      if (dbId) {
        await api.subscribers.delete(dbId);
        setDbSubscribers(prev => prev.filter(s => s.id !== dbId));
      }
      updateProfile(id, { subscriptionPlan: undefined });
      toast.success('Subscription removed');
    }
  };
`;

content = content.replace(
    /const handleDeleteSubscriber = \(id: string\) => \{[\s\S]*?\};/,
    handleDeleteNew
);


const handleSubmitNew = `
  const handleSubmitSubscriber = async () => {
    if (selectedSubscriber) {
      try {
         const planObj = TABLE_PLANS.find(p => p.name.toLowerCase() === subscriberFormData.plan.toLowerCase());
         if (selectedSubscriber.dbId) {
           await api.subscribers.update(selectedSubscriber.dbId, {
             plan: subscriberFormData.plan,
             status: subscriberFormData.status,
             amount: planObj?.minDeposit || 0
           });
           setDbSubscribers(prev => prev.map(s => s.id === selectedSubscriber.dbId ? { ...s, plan: subscriberFormData.plan, status: subscriberFormData.status, amount: planObj?.minDeposit || 0 } : s));
         } else {
           const newSub = await api.subscribers.create({
             user_id: selectedSubscriber.userId || selectedSubscriber.id,
             plan: subscriberFormData.plan,
             status: subscriberFormData.status,
             amount: planObj?.minDeposit || 0
           });
           if (newSub) setDbSubscribers(prev => [newSub, ...prev]);
         }
         updateProfile(selectedSubscriber.id, { subscriptionPlan: subscriberFormData.plan });
         toast.success('Subscription updated successfully');
         setShowSubscriberDialog(false);
      } catch (err) {
         toast.error('Failed to update subscription');
      }
    }
  };
`;

content = content.replace(
    /const handleSubmitSubscriber = \(\) => \{[\s\S]*?\};/,
    handleSubmitNew
);

// fix button bindings to use dbId
content = content.replace(
    /onClick=\{\(\) => handleDeleteSubscriber\(sub\.id\)\}/g,
    "onClick={() => handleDeleteSubscriber(sub.id, sub.dbId)}"
);

fs.writeFileSync(filePath, content);
