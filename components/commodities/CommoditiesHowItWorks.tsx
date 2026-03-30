import imgCommImg from 'figma:asset/b2e5bfb448640860c22184a669701827f36c6bdc.png';

export default function CommoditiesHowItWorks() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* Platform image */}
          <div className="shrink-0">
            <img
              src={imgCommImg}
              alt="Commodities trading platform"
              className="rounded-lg object-cover shadow-md"
              style={{ width: 488, maxWidth: '100%', height: 424 }}
            />
          </div>

          {/* Text block */}
          <div className="flex-1 min-w-0 space-y-5">
            <h2 className="text-3xl font-bold text-gray-900 leading-snug">
              How does CFDs on Commodities trading work?
            </h2>
            <p className="text-gray-700 text-sm leading-7">
              CFDs on Commodities cover energy, agriculture and metals products. These products are
              traded in futures markets and derive their value from demand and supply characteristics.
            </p>
            <p className="text-gray-700 text-sm leading-7">
              Supply characteristics include the weather in the case of agriculture and costs of
              extraction in the case of mining and energies.
            </p>
            <p className="text-gray-700 text-sm leading-7">
              Demand for CFDs on Commodities tends to be characterised by broader conditions such as
              economic cycles and population growth. CFDs on Commodities can be traded as stand alone
              products or in pairs.
            </p>
            <p className="text-gray-700 text-sm leading-7">
              Metals and energies are traded against major currencies whereas agriculture futures
              contracts are traded as stand-alone contracts.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
