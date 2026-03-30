export default function CommoditiesCategories() {
  return (
    <section className="bg-[#f3f3f3] py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        {/* Top: Energies full width */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Energies</h2>
          <p className="text-gray-700 text-sm leading-7 max-w-2xl">
            XAI Technology allows trading of spot energy contracts including Crude Oil, Brent, and
            Natural Gas from your chosen trading platform against the US Dollar.
          </p>
          <p className="text-gray-700 text-sm leading-7 max-w-2xl mt-2">
            Trading energy contracts as a spot instrument has many advantages for investors who are
            only interested in price speculation.
          </p>
        </div>

        {/* Bottom: Precious Metals + Soft CFDs side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Precious Metals</h2>
            <p className="text-gray-700 text-sm leading-7">
              XAI Technology allows trading the spot price for metals including Gold or Silver
              against the US Dollar or Euro and the metals Platinum or Palladium against the US
              Dollar as a currency pair on 1:1000 leverage.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Soft CFDs on Commodities</h2>
            <p className="text-gray-700 text-sm leading-7">
              In addition to energy and metal contracts, at xAI Technology we offer a range of
              soft commodity products to trade, including corn, soybeans, sugar, cocoa, coffee,
              and wheat as CFDs — all with low spreads and leverage up to 1:100.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
