import imgBondsImg from 'figma:asset/acd9f8a36e50b95f04b836ee0c755365861c3c55.png';

export default function BondsHowItWorks() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* Platform screenshot */}
          <div className="shrink-0">
            <img
              src={imgBondsImg}
              alt="Bonds trading platform"
              className="rounded-lg object-cover shadow-md"
              style={{ width: 488, maxWidth: '100%', height: 424 }}
            />
          </div>

          {/* Text block */}
          <div className="flex-1 min-w-0 space-y-5">
            <h2 className="text-3xl font-bold text-gray-900 leading-snug">
              How does<br />Bonds trading work?
            </h2>

            <p className="text-gray-700 text-sm leading-7">
              Bonds are part of the fixed income asset class.
            </p>

            <p className="text-gray-700 text-sm leading-7">
              Bonds pay a regular fixed coupon to the bondholder and can be sold in secondary
              markets. Governments issue bonds to finance government spending on projects such
              as public infrastructure.
            </p>

            <p className="text-gray-700 text-sm leading-7">
              Traders generally trade bonds on the basis of future interest rate expectations.
            </p>

            <p className="text-gray-700 text-sm leading-7">
              If a central bank increases interest rates, bond prices will decline and yields
              will increase.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
