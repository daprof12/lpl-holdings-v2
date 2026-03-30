export default function StockTradingExample() {
  return (
    <section className="bg-[#f3f3f3] py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        {/* ── Header row ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <h2 className="text-4xl font-bold text-gray-900">Stocks trading example</h2>
          <div className="bg-[#34e834] rounded-md px-5 py-2.5">
            <span className="font-medium text-gray-900 text-base whitespace-nowrap">
              Buying: Apple Inc (NASDAQ: AAPL)
            </span>
          </div>
        </div>

        {/* ── 3 cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Card 1 — Gross profit calculation */}
          <div className="bg-white rounded-2xl p-7 relative">
            <h3 className="text-lg font-bold text-gray-900 mb-6 leading-tight">
              The gross profit on your trade is calculated as follows:
            </h3>

            <div className="space-y-0">
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">Opening Price</p>
                <div className="border-b border-[rgba(218,218,218,0.8)] pb-3 mb-3">
                  <p className="text-sm text-gray-900">$152 x 100 shares = USD $15,200</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">Closing Price</p>
                <div className="border-b border-[rgba(218,218,218,0.8)] pb-3 mb-3">
                  <p className="text-sm text-gray-900">$170 x 100 shares = USD $17,000</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">Gross Profit on Trade</p>
                <div className="border-b border-[rgba(218,218,218,0.8)] pb-3">
                  <p className="text-sm text-gray-900">USD $17,000 - $15,200 = $1,800</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 — Opening the Position */}
          <div className="bg-white rounded-2xl p-7">
            <h3 className="text-lg font-bold text-gray-900 mb-5">Opening the Position</h3>
            <p className="text-sm text-gray-700 leading-7 mb-5">
              Apple is trading at 150/152 and you are of the view that Apple's latest product
              release will boost sales. You decide to purchase 100 shares of AAPL. For each
              contract, one point (a price movement of 1) is equal to $1 USD.
            </p>
            <p className="text-sm text-gray-700 leading-7">
              With 100 contracts, every point that the bid quote on AAPL rises above 152 you
              will make a profit of $100 USD, and for every point the bid quote falls below 152
              you will lose $100 USD.
            </p>
          </div>

          {/* Card 3 — Closing the Position */}
          <div className="bg-white rounded-2xl p-7">
            <h3 className="text-lg font-bold text-gray-900 mb-5">Closing the Position</h3>
            <p className="text-sm text-gray-700 leading-7 mb-5">
              1 month later, after sales results are released, the price of AAPL has increased
              to 170/172 and you decide to take profit by selling 100 AAPL Stock CFD contracts.
            </p>
            <p className="text-sm text-gray-700 leading-7">
              To calculate the net profit you must include any financing or dividend adjustments.
              In the case of a 'long' position interest is credited and in the case of a 'short'
              position interest is debited.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
