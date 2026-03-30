import { Link } from 'react-router-dom';
import svgPaths from '../../imports/svg-u7s61ts41v';

function CheckIcon() {
  return (
    <svg fill="none" viewBox="0 0 14.5455 15" width="15" height="15" className="shrink-0 mt-0.5">
      <g clipPath="url(#chk-bonds)">
        <path d={svgPaths.paf62000} fill="#34E834" />
        <path d={svgPaths.p38b8d680} fill="black" />
      </g>
      <defs>
        <clipPath id="chk-bonds">
          <rect fill="white" height="15" width="14.5455" />
        </clipPath>
      </defs>
    </svg>
  );
}

const facts = [
  'Over 9 Bonds available to trade',
  'No commissions',
  'Up to 1:200 leverage',
  'Deep Liquidity',
  'MetaTrader 4 and 5',
  'Trade 24/5',
];

const infoLinks = [
  { top: 'See our',        bold: 'Spreads' },
  { top: 'Download',       bold: 'Product Details' },
  { top: 'Popular Account',bold: 'Raw Spread' },
];

export default function BondsOverview() {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <div className="bg-[#f6f6f6] rounded-2xl p-7">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Left: content ── */}
          <div className="flex-1 min-w-0 relative">
            {/* Bond SVG icon */}
            <div className="w-[88px] h-[84px] mb-5">
              <svg fill="none" viewBox="0 0 88.5342 84.38" className="h-full w-auto">
                <g clipPath="url(#clip-bonds)">
                  <path clipRule="evenodd" d={svgPaths.pdf50900} fill="#34E834" fillRule="evenodd" />
                </g>
                <defs>
                  <clipPath id="clip-bonds">
                    <rect fill="white" height="84.38" width="88.5342" />
                  </clipPath>
                </defs>
              </svg>
            </div>

            {/* Headline */}
            <h2 className="text-lg font-bold text-gray-900 leading-7 mb-4 max-w-2xl">
              XAI Technology Bond CFDs are based off fixed income debt securities that pay
              investors a regular coupon in exchange for their investment. We offer the bonds
              products as a CFD with flexible lot sizing, so you can speculate on the price of
              the Bond by going long or short.
            </h2>

            {/* Description paragraphs */}
            <p className="text-gray-500 text-sm leading-7 mb-3">
              There is no interest debited or credited on these Bonds CFDs, just like the
              underlying Futures markets that they're based off. Again, this means you only
              have to worry about the price of the bond and whether you go long or short.
            </p>
            <p className="text-gray-500 text-sm leading-7 mb-7">
              Bond CFDs provided by xAI Technology are based off highly rated government
              issued debt securities, including governments of the United States, Japan and
              Europe. Bonds offer traders the opportunity to speculate on interest rates and
              risk on/off sentiment, diversify a portfolio or reduce risk and build defensive
              positions during periods of economic weakness or uncertainty.
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
                <p className="text-xs text-gray-500 mb-0.5">Bonds</p>
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