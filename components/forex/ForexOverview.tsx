import { Link } from 'react-router-dom';
import svgPaths from '../../imports/svg-uaqd9d761y';

function CheckIcon() {
  return (
    <svg fill="none" viewBox="0 0 14.5455 15" width="15" height="15" className="shrink-0 mt-0.5">
      <g clipPath="url(#chk-fx)">
        <path d={svgPaths.paf62000} fill="#34E834" />
        <path d={svgPaths.p38b8d680} fill="black" />
      </g>
      <defs><clipPath id="chk-fx"><rect fill="white" height="15" width="14.5455" /></clipPath></defs>
    </svg>
  );
}

const facts = [
  { text: 'Over 61 currency pairs' },
  { text: 'Tight spreads from 0.0 pips' },
  { text: 'Up to 1:1000 leverage' },
  { text: 'Deep liquidity' },
  { text: 'Trade 24 hours a day,\nfive days a week', multiline: true },
];

export default function ForexOverview() {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <div className="bg-[#f6f6f6] rounded-2xl p-7">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left: content */}
          <div className="flex-1 min-w-0 relative">
            {/* Forex icon */}
            <div className="w-[84px] h-[84px] mb-5">
              <svg fill="none" viewBox="0 0 95.7924 84.38" className="h-full w-auto">
                <g clipPath="url(#clip-forex)">
                  <path clipRule="evenodd" d={svgPaths.p20a7c300} fill="#34E834" fillRule="evenodd" />
                </g>
                <defs>
                  <clipPath id="clip-forex">
                    <rect fill="white" height="84.38" width="95.7924" />
                  </clipPath>
                </defs>
              </svg>
            </div>

            <h2 className="text-xl font-bold text-gray-900 leading-relaxed mb-3">
              Open 24 hours a day 5 days a week, the foreign exchange market is the largest and
              most liquid market in the world with volumes of over $4 trillion a day surpassing
              any exchange based market.
            </h2>

            <p className="text-gray-500 text-sm leading-7">
              Foreign exchange trading involves trading one currency pair against another,
              predicting that one currency will rise or fall against another. Currencies are
              traded in pairs, like the Euro versus the US Dollar (EUR/USD).
            </p>
          </div>

          {/* Right: Facts card */}
          <div className="flex items-start justify-center lg:justify-end shrink-0">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 w-full max-w-[303px]">
              <div className="border-b border-black/10 pb-3 mb-1">
                <p className="text-xs text-gray-500 mb-0.5">Forex</p>
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