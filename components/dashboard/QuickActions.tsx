import { Plus, TrendingUp, Wallet, Settings, Bot, Signal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Button 
        size="lg" 
        className="h-auto py-4 flex-col gap-2 bg-gradient-to-br from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
        onClick={() => navigate('/wallet')}
      >
        <Plus className="w-6 h-6" />
        <span>Deposit</span>
      </Button>
      
      {/* Withdraw button hidden */}
      {false && (
      <Button 
        size="lg" 
        variant="outline"
        className="h-auto py-4 flex-col gap-2 border-2"
        onClick={() => navigate('/wallet')}
      >
        <Wallet className="w-6 h-6" />
        <span>Withdraw</span>
      </Button>
      )}
      
      <Button 
        size="lg" 
        className="h-auto py-4 flex-col gap-2 bg-gradient-to-br from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
        onClick={() => navigate('/markets')}
      >
        <TrendingUp className="w-6 h-6" />
        <span>Trade Now</span>
      </Button>
      
      <Button 
        size="lg" 
        variant="outline"
        className="h-auto py-4 flex-col gap-2 border-2"
        onClick={() => navigate('/auto-trader')}
      >
        <Bot className="w-6 h-6" />
        <span>AI Auto Trade</span>
      </Button>
    </div>
  );
}