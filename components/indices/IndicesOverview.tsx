import { Link } from 'react-router-dom';
import svgPaths from '../../imports/svg-w09orljdik';

function CheckIcon() {
  return (
    <svg fill="none" viewBox="0 0 14.5455 15" width="15" height="15" className="shrink-0 mt-0.5">
      <g clipPath="url(#chk-idx)">
        <path d={svgPaths.paf62000} fill="#34E834" />
        <path d={svgPaths.p38b8d680} fill="black" />
      </g>
      <defs>
        <clipPath id="chk-idx">
          <rect fill="white" height="15" width="14.5455" />
        </clipPath>
      </defs>
    </svg>
  );
}

const facts = [
  '25 Indices to trade from',
  'Leverage up to 1:200',
  'Spreads as low as 0.4 pips',
  'Deep Liquidity',
  'No commissions',
  'All platforms',
];

const infoLinks = [
  { top: 'See our',        bold: 'Spreads' },
  { top: 'Download',       bold: 'Product Details' },
  { top: 'Popular Account',bold: 'Raw Spread' },
];

export default function IndicesOverview() {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <div className="bg-[#f6f6f6] rounded-2xl p-7">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Left: content ── */}
          <div className="flex-1 min-w-0 relative">
            {/* Indices bar-chart SVG icon */}
            <div className="w-[73px] h-[84px] mb-5">
              <svg fill="none" viewBox="0 0 73.0713 84.38" className="h-full w-auto">
                <g clipPath="url(#clip-idx)">
                  <path clipRule="evenodd" d={svgPaths.p2b0ce100} fill="#34E834" fillRule="evenodd" />
                </g>
                <defs>
                  <clipPath id="clip-idx">
                    <rect fill="white" height="84.38" width="73.0713" />
                  </clipPath>
                </defs>
              </svg>
            </div>

            {/* Headline */}
            <h2 className="text-lg font-bold text-gray-900 leading-7 mb-4 max-w-2xl">
              Indices are the most popular form of CFDs. xAI Technology has a large range of
              Indices from around the world to choose from, including the Australian S&amp;P 200
              Index, UK FTSE 100 Index, US E-mini S&amp;P 500 and US DJIA Index.
            </h2>

            {/* Description paragraphs */}
            <p className="text-gray-500 text-sm leading-7 mb-3">
              A stock index is a good indicative measure of market performance. Indices such as the
              FTSE 100 and DJIA Index are baskets of blue chip stocks listed on the exchange and
              are generally a good measure of the current market sentiment. A change in the
              performance of any constituent stock in an index is reflected in a change in the
              overall value of that index.
            </p>
            <p className="text-gray-500 text-sm leading-7 mb-7">
              Indices have the advantage of allowing traders to take a wider view of a basket of
              stocks rather than taking a view on one individual stock alone. Online CFD and
              futures based indices are offered on all platforms.
            </p>

            {/* Quick-link tiles */}
            <div className="grid grid-cols-3 gap-4">
              {infoLinks.map((l) => (
                <Link
                  key={l.bold}
                  to="/login"
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <p className="text-xs text-gray-500 mb-0.5">{l.top}</p>
                  <p className="text-lg font-bold text-gray-900 leading-tight">{l.bold}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* ── Right: Facts card ── */}
          <div className="flex items-start justify-center lg:justify-end shrink-0">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 w-full max-w-[303px]">
              <div className="border-b border-black/10 pb-3 mb-1">
                <p className="text-xs text-gray-500 mb-0.5">Indices</p>
                <p className="text-3xl font-medium text-gray-900">Facts</p>
              </div>
              <ul className="mb-5">
                {facts.map((f, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-3 py-3 text-sm font-bold text-gray-900 ${
                      i < facts.length - 1 ? 'border-b border-black/10' : ''
                    }`}
                  >
                    <CheckIcon />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/login"
                className="block text-center py-2 rounded-lg border border-[#34e834] text-gray-900 text-sm font-bold tracking-wide hover:bg-[#34e834]/10 transition-colors"
              >
                Open Account
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}