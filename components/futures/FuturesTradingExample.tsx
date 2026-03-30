import { AlertTriangle } from 'lucide-react';

export default function FuturesTradingExample() {
  return (
    <section className="bg-[#f3f3f3] py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <h2 className="text-4xl font-bold text-gray-900">Futures CFD Example</h2>
          <div className="bg-[#34e834] rounded-md px-5 py-2.5 shrink-0">
            <span className="font-medium text-gray-900 text-base whitespace-nowrap">
              Buying the Volatility Index (VIX)
            </span>
          </div>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

          {/* Card 1 — Gross Profit Calculation */}
          <div className="bg-white rounded-2xl p-7">
            <h3 className="text-lg font-bold text-gray-900 mb-6 leading-tight">
              The gross profit on your trade is calculated as follows:
            </h3>
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">Opening Price</p>
              <div className="border-b border-[rgba(218,218,218,0.8)] pb-3 mb-3">
                <p className="text-sm text-gray-700">$14.20</p>
              </div>
              <p className="text-sm font-medium text-gray-900 mb-1">Closing Price</p>
              <div className="border-b border-[rgba(218,218,218,0.8)] pb-3 mb-3">
                <p className="text-sm text-gray-700">$18.20</p>
              </div>
              <p className="text-sm font-medium text-gray-900 mb-1">Difference</p>
              <div className="border-b border-[rgba(218,218,218,0.8)] pb-3 mb-3">
                <p className="text-sm text-gray-700">4.00 (400 Index points)</p>
              </div>
              <p className="text-sm font-medium text-gray-900 mb-1">Gross Profit on Trade</p>
              <div className="border-b border-[rgba(218,218,218,0.8)] pb-3">
                <p className="text-sm text-gray-700">
                  400 × 1 contracts ($0.01 per point) = USD $4.00
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 — Opening the Position */}
          <div className="bg-white rounded-2xl p-7">
            <h3 className="text-lg font-bold text-gray-900 mb-5">Opening the Position</h3>
            <p className="text-sm text-gray-700 leading-7 mb-4">
              The price of the VIX is 14.05/14.20. You are of the view that market volatility
              will increase so you decide to buy 1 contract at 14.20. (One contract is equal to
              $0.01 per point, there are 100 points per 1.00 change in the index). No
              commission is charged on Futures CFDs.
            </p>
            <p className="text-sm text-gray-700 leading-7">
              For every point that the bid quote on the VIX rises above 14.20 you will make a
              profit of $0.01 USD, for every point the bid quote falls below 14.20 you will
              lose $0.01 USD.
            </p>
          </div>

          {/* Card 3 — Closing the Position */}
          <div className="bg-white rounded-2xl p-7">
            <h3 className="text-lg font-bold text-gray-900 mb-5">Closing the Position</h3>
            <p className="text-sm text-gray-700 leading-7">
              Four days later, the VIX has risen to 18.20/18.35 and you decide to take your
              profit. You close your position by selling 1 contract at 18.20.
            </p>
          </div>

        </div>

        {/* Warning Banner */}
        <div
          className="rounded-xl px-7 py-6 flex items-start gap-4"
          style={{ backgroundColor: 'rgba(52,232,52,0.2)' }}
        >
          <AlertTriangle size={18} className="text-green-700 shrink-0 mt-0.5" />
          <p className="text-sm font-semibold text-gray-800 leading-relaxed">
            You should be aware that if the market had moved in the opposite direction, you
            would have made a loss that could have exceeded your initial deposit.
          </p>
        </div>

      </div>
    </section>
  );
}
