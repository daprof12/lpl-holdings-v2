export default function IndicesTradingExample() {
  return (
    <section className="bg-[#f3f3f3] py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <h2 className="text-4xl font-bold text-gray-900">Indices example</h2>
          <div className="bg-[#34e834] rounded-md px-5 py-2.5">
            <span className="font-medium text-gray-900 text-base whitespace-nowrap">
              Buying: Australia 200 Index
            </span>
          </div>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Card 1 — Gross Profit Calculation */}
          <div className="bg-white rounded-2xl p-7">
            <h3 className="text-lg font-bold text-gray-900 mb-6 leading-tight">
              The gross profit on your trade is calculated as follows:
            </h3>
            <div className="space-y-0">
              <p className="text-sm font-medium text-gray-900 mb-1">Opening Price</p>
              <div className="border-b border-[rgba(218,218,218,0.8)] pb-3 mb-3">
                <p className="text-sm text-gray-900">4951</p>
              </div>
              <p className="text-sm font-medium text-gray-900 mb-1">Closing Price</p>
              <div className="border-b border-[rgba(218,218,218,0.8)] pb-3 mb-3">
                <p className="text-sm text-gray-900">4970</p>
              </div>
              <p className="text-sm font-medium text-gray-900 mb-1">Difference</p>
              <div className="border-b border-[rgba(218,218,218,0.8)] pb-3 mb-3">
                <p className="text-sm text-gray-900">19</p>
              </div>
              <p className="text-sm font-medium text-gray-900 mb-1">Gross Profit on Trade</p>
              <div className="border-b border-[rgba(218,218,218,0.8)] pb-3">
                <p className="text-sm text-gray-900">
                  19.00 points × 2 contracts ($2 per point) = AUD $38.00
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 — Opening the Position */}
          <div className="bg-white rounded-2xl p-7">
            <h3 className="text-lg font-bold text-gray-900 mb-5">Opening the Position</h3>
            <p className="text-sm text-gray-700 leading-7">
              The price of the Australia 200 Index is 4950.00/4951.00. You are of the view that
              blue-chip stocks are undervalued so you decide to buy 2 contracts at 4951.00. (One
              contract is equal to $1 per index point). No commission is charged on Indices.
            </p>
          </div>

          {/* Card 3 — Closing the Position */}
          <div className="bg-white rounded-2xl p-7">
            <h3 className="text-lg font-bold text-gray-900 mb-5">Closing the Position</h3>
            <p className="text-sm text-gray-700 leading-7">
              Four days later, the Australia 200 Index has risen to 4970.00/4971.00 and you decide
              to take your profit. You close your position by selling 2 contracts at 4970.00.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
