export default function BondsTradingExample() {
  return (
    <section className="bg-[#f3f3f3] py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <h2 className="text-4xl font-bold text-gray-900">Bonds trading example</h2>
          <div className="bg-[#34e834] rounded-md px-5 py-2.5">
            <span className="font-medium text-gray-900 text-base whitespace-nowrap">
              Selling: 5-Year U.S Treasury Note
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
                <p className="text-sm text-gray-700">
                  ($120.25 × 10 contracts) × $200 = USD $240,500
                </p>
              </div>
              <p className="text-sm font-medium text-gray-900 mb-1">Closing Price</p>
              <div className="border-b border-[rgba(218,218,218,0.8)] pb-3 mb-3">
                <p className="text-sm text-gray-700">
                  ($118.32 × 10 contracts) × $200 = USD $236,640
                </p>
              </div>
              <p className="text-sm font-medium text-gray-900 mb-1">Gross Profit on Trade</p>
              <div className="border-b border-[rgba(218,218,218,0.8)] pb-3">
                <p className="text-sm text-gray-700">$240,500 − $236,640 = USD $3,860</p>
              </div>
            </div>
          </div>

          {/* Card 2 — Opening the Position */}
          <div className="bg-white rounded-2xl p-7">
            <h3 className="text-lg font-bold text-gray-900 mb-5">Opening the Position</h3>
            <p className="text-sm text-gray-700 leading-7">
              You hold the view that the US Federal Reserve will increase Interest Rates and
              5-Year Treasury yields will increase as a result. You sell 10 contracts of March
              2017 5-Year US Treasury Note at 120.25.
            </p>
          </div>

          {/* Card 3 — Closing the Position */}
          <div className="bg-white rounded-2xl p-7">
            <h3 className="text-lg font-bold text-gray-900 mb-5">Closing the Position</h3>
            <p className="text-sm text-gray-700 leading-7 mb-4">
              Your view is correct and March 2017 5-Year T-note prices decline.
            </p>
            <p className="text-sm text-gray-700 leading-7">
              <span className="font-medium">Note:</span> For Bonds with a contract size of 200,
              it means every 0.01 move in the Bond CFD is worth US$2.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
