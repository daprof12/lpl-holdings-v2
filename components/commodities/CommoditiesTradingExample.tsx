export default function CommoditiesTradingExample() {
  return (
    <section className="bg-[#f3f3f3] py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <h2 className="text-4xl font-bold text-gray-900">Commodity trading example</h2>
          <div className="bg-[#34e834] rounded-md px-5 py-2.5">
            <span className="font-medium text-gray-900 text-base whitespace-nowrap">
              Buying: Wheat
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
                <p className="text-sm text-gray-900">$435.25 × 100 contracts × 4 = USD $174,100</p>
              </div>
              <p className="text-sm font-medium text-gray-900 mb-1">Closing Price</p>
              <div className="border-b border-[rgba(218,218,218,0.8)] pb-3 mb-3">
                <p className="text-sm text-gray-900">$460 × 100 contracts × 4 = USD $184,000</p>
              </div>
              <p className="text-sm font-medium text-gray-900 mb-1">Gross Profit on Trade</p>
              <div className="border-b border-[rgba(218,218,218,0.8)] pb-3">
                <p className="text-sm text-gray-900">USD $184,000 − $174,100 = $9,900</p>
              </div>
            </div>
          </div>

          {/* Card 2 — Opening the Position */}
          <div className="bg-white rounded-2xl p-7 flex flex-col gap-4">
            <h3 className="text-lg font-bold text-gray-900">Opening the Position</h3>
            <p className="text-sm text-gray-700 leading-7">
              Wheat_N7 is currently trading at 434.00/435.25 and you are expecting Australia's East
              Coast crops to be affected by adverse weather patterns over the coming year which will
              result in lower than average crop yields.
            </p>
            <div className="bg-[#f3f3f3] rounded-lg px-4 py-3">
              <p className="text-xs text-gray-600 leading-6">
                You buy 100 contracts of Wheat (4 bushels per contract) at 435.25 which equals USD
                $174,100 (435.25 × 100 × 4).
              </p>
            </div>
          </div>

          {/* Card 3 — Closing the Position */}
          <div className="bg-white rounded-2xl p-7">
            <h3 className="text-lg font-bold text-gray-900 mb-5">Closing the Position</h3>
            <p className="text-sm text-gray-700 leading-7">
              Your research surrounding weather conditions turns out to be correct. Lower crop yields
              this year have caused Wheat prices to increase to 460.00/462.15. You exit your position
              by selling your contracts at 460.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
