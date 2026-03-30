import { Link } from 'react-router-dom';
import svgPaths from '../../imports/svg-thtm2t39jk';

function CheckIcon() {
  return (
    <svg fill="none" viewBox="0 0 14.5455 15" width="15" height="15" className="shrink-0 mt-0.5">
      <g clipPath="url(#chk-comm)">
        <path d={svgPaths.paf62000} fill="#34E834" />
        <path d={svgPaths.p38b8d680} fill="black" />
      </g>
      <defs>
        <clipPath id="chk-comm">
          <rect fill="white" height="15" width="14.5455" />
        </clipPath>
      </defs>
    </svg>
  );
}

const facts = [
  { text: 'Over 22 CFDs on Commodities to\ntrade', multiline: true },
  { text: 'Energy, Agriculture and Metals' },
  { text: 'Spot and Futures CFDs' },
  { text: 'Leverage up to 1:1000' },
  { text: 'Spreads as low as 0.0 pips' },
  { text: 'Deep liquidity' },
];

export default function CommoditiesOverview() {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <div className="bg-[#f6f6f6] rounded-2xl p-7">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left: content */}
          <div className="flex-1 min-w-0 relative">
            {/* Commodities SVG icon */}
            <div className="w-[84px] h-[84px] mb-5">
              <svg fill="none" viewBox="0 0 84.4339 84.38" className="h-full w-auto">
                <g clipPath="url(#clip-comm)">
                  <path clipRule="evenodd" d={svgPaths.p6daa600} fill="#34E834" fillRule="evenodd" />
                </g>
                <defs>
                  <clipPath id="clip-comm">
                    <rect fill="white" height="84.38" width="84.4339" />
                  </clipPath>
                </defs>
              </svg>
            </div>

            <h2 className="text-xl font-bold text-gray-900 leading-relaxed mb-4">
              XAI Technology offers a flexible and easy way to gain exposure to some of the world's
              most popular CFDs on Commodities including energies and metals all from within your
              MetaTrader 4, 5, cTrader and TradingView trading platforms.
            </h2>

            <p className="text-gray-500 text-sm leading-7">
              Commodity markets are attractive to speculators as they are susceptible to dramatic
              changes in supply and demand.
            </p>
          </div>

          {/* Right: Facts card */}
          <div className="flex items-start justify-center lg:justify-end shrink-0">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 w-full max-w-[303px]">
              <div className="border-b border-black/10 pb-3 mb-1">
                <p className="text-xs text-gray-500 mb-0.5">Commodities CFDs</p>
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
                    <span className="whitespace-pre-line leading-snug">{f.text}</span>
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