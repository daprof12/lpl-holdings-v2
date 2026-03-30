import imgIndicesImg from 'figma:asset/67ebee4dab45418d54d523c1174fd638ad616e33.png';

export default function IndicesDividend() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* Platform screenshot */}
          <div className="shrink-0">
            <img
              src={imgIndicesImg}
              alt="Indices trading platform"
              className="rounded-lg object-cover shadow-md"
              style={{ width: 488, maxWidth: '100%', height: 424 }}
            />
          </div>

          {/* Text block */}
          <div className="flex-1 min-w-0 space-y-5">
            <h2 className="text-3xl font-bold text-gray-900 leading-snug">
              How to determine if a client is entitled dividend from Index AUS200?
            </h2>

            <p className="text-gray-700 text-sm leading-7">
              From the above example, let us assume that the ex-dividend date for Index AUS200 is
              on the of 18th August 2016. Therefore, a client must have an open position for Index
              AUS200 before the 18th of August 2016 and it must remain open until the 18th August
              2016, in order to have the dividend adjustment of $2.44 per lot. To determine if the
              dividend adjustment is added or deducted to the client's account, will depend on
              whether it is a SELL or BUY on AUS200. If the client has 1 lot of BUY for AUS200,
              the client will be entitled $2.44 per lot. However, if it is a SELL of AUS200, the
              client will be deducted $2.44 per lot. The amount $2.44 per lot will be converted to
              the client's base currency, before it is being deducted.
            </p>

            <p className="text-gray-700 text-sm leading-7">
              Since this is from index AUS200, the dividend adjustment will be AUD$2.44 per lot.
              Alternatively, if the index is US500, the dividend adjustment would be USD$2.44 per
              lot. xAI Technology EX-Dividends Excel sheet shows the expected Indices that will
              have their index points adjusted for the given week and the actual ex-dividend
              adjustment amount for each indices will be updated regularly on our blog,
              Ex-Dividends Adjustments.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
