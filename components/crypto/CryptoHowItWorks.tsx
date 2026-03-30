import imgForexImg from 'figma:asset/cf45541d2eaf766313f6760d4e89ea81082930fc.png';

export default function CryptoHowItWorks() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* Platform image */}
          <div className="shrink-0">
            <img
              src={imgForexImg}
              alt="Cryptocurrency CFD trading platform"
              className="rounded-lg object-cover shadow-md"
              style={{ width: 488, maxWidth: '100%', height: 424 }}
            />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">
              How does Cryptocurrency CFD trading work?
            </h2>
            <div className="space-y-5">
              <p className="text-gray-700 text-base leading-7">
                Bitcoin is a digital cryptocurrency that derives its value from supply and demand
                factors unique to this asset class.
              </p>
              <p className="text-gray-700 text-base leading-7">
                Bitcoin is available in a finite supply and therefore increases in price as
                demand increases.
              </p>
              <p className="text-gray-700 text-base leading-7">
                Demand stems from speculative sources and more practical sources, for example
                Internet purchases paid for in Bitcoin.
              </p>
              <p className="text-gray-700 text-base leading-7">
                Bitcoin also has a tendency to react to market sentiment in more traditional
                markets such as equities and foreign exchange, increasing during periods of
                negative sentiment.
              </p>
              <p className="text-gray-700 text-base leading-7">
                The XAI Technology Cryptocurrency CFD product allows traders to go long or short
                without actually holding the Cryptocurrency. This means traders can get exposure
                to the price of the Cryptocurrency without worrying about the security risks
                associated with storing it and the counterparty risk from the exchange.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
