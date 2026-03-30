import DashboardLayout from '../layouts/DashboardLayout';
import TradingHistory from './TradingHistory';

export default function HistoryPage() {
  return (
    <DashboardLayout>
      <div className="p-4 lg:p-8">
        <TradingHistory />
      </div>
    </DashboardLayout>
  );
}