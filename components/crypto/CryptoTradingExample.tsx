export default function CryptoTradingExample() {
  return (
    <section className="bg-[#f3f3f3] py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <h2 className="text-4xl font-bold text-gray-900">Bitcoin CFD Trading Example</h2>
          <div className="bg-[#34e834] rounded-md px-5 py-2.5">
            <span className="font-medium text-gray-900 text-base whitespace-nowrap">
              Buying: BTCUSD
            </span>
          </div>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Card 1 — Profit calc */}
          <div className="bg-white rounded-2xl p-7">
            <h3 className="text-lg font-bold text-gray-900 mb-6 leading-tight">
              The gross profit on your trade is calculated as follows:
            </h3>
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">Opening Price</p>
              <div className="border-b border-[rgba(218,218,218,0.8)] pb-3 mb-3">
                <p className="text-sm text-gray-900">3910.25 * 2 = USD $7,820.50</p>
              </div>
              <p className="text-sm font-medium text-gray-900 mb-1">Closing Price</p>
              <div className="border-b border-[rgba(218,218,218,0.8)] pb-3 mb-3">
                <p className="text-sm text-gray-900">4200.50 * 2 = USD $8,401.00</p>
              </div>
              <p className="text-sm font-medium text-gray-900 mb-1">Gross Profit on Trade</p>
              <div className="border-b border-[rgba(218,218,218,0.8)] pb-3">
                <p className="text-sm text-gray-900">USD $8,401.00 − $7,820.50 = $580.50</p>
              </div>
            </div>
          </div>

          {/* Card 2 — Opening position */}
          <div className="bg-white rounded-2xl p-7">
            <h3 className="text-lg font-bold text-gray-900 mb-5">Opening the Position</h3>
            <p className="text-sm text-gray-700 leading-7">
              The price of Bitcoin CFD against the US Dollar is 3900.25/3910.25 and you decide
              to buy 2 contracts at 3910.25.
            </p>
          </div>

          {/* Card 3 — Closing position */}
          <div className="bg-white rounded-2xl p-7">
            <h3 className="text-lg font-bold text-gray-900 mb-5">Closing the Position</h3>
            <p className="text-sm text-gray-700 leading-7">
              One month later Bitcoin CFD has increased to 4200.50/4210.50 and you decide to
              take your profit by selling your 2 contracts at 4200.50 each.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
