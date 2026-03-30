export default function IndicesSpreadTypes() {
  return (
    <section className="bg-[#f3f3f3] py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-8">

        {/* (Spot) Equity Indices Spreads */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            (Spot) Equity Indices Spreads
          </h2>
          <p className="text-gray-700 leading-7 max-w-3xl">
            XAI Technology offers competitive spreads across all of our cash Indices, including the
            E-mini S&amp;P 500 Index from 0.4 points, the FTSE 100 Index from 1 point, Xetra DAX
            Index from 1 point and S&amp;P 200 Index from 1 point.
          </p>
        </div>

        {/* Futures Indices */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Futures Indices
          </h2>
          <p className="text-gray-700 leading-7 max-w-3xl">
            In addition to Equity Indices, xAI Technology also offers Futures Indices: ICE Dollar
            Index and VIX Index.
          </p>
        </div>

      </div>
    </section>
  );
}
