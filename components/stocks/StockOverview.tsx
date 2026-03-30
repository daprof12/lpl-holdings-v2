import { Link } from 'react-router-dom';
import svgPaths from '../../imports/svg-g90oq4xzyn';
import imgStockPlatform from 'figma:asset/76a0c86b3299687a5a3a85687d25a3a424ae207c.png';

function CheckIcon() {
  return (
    <svg fill="none" viewBox="0 0 14.5455 15" width="15" height="15" className="shrink-0">
      <g clipPath="url(#chk-clip)">
        <path d={svgPaths.paf62000} fill="#34E834" />
        <path d={svgPaths.p38b8d680} fill="black" />
      </g>
      <defs>
        <clipPath id="chk-clip">
          <rect fill="white" height="15" width="14.5455" />
        </clipPath>
      </defs>
    </svg>
  );
}

const facts = [
  '+2100 stocks',
  'ASX, NASDAQ, NYSE',
  'Ultra fast execution',
  'Earn dividends',
  'MetaTrader 5',
];

export default function StockOverview() {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 pt-12 pb-4">
      {/* ── Grey card ── */}
      <div className="bg-[#f6f6f6] rounded-2xl p-7">
        <div className="flex flex-col lg:flex-row gap-8 min-h-[524px]">

          {/* ── Left: icon + description + download ── */}
          <div className="flex-1 min-w-0 relative">
            {/* Icon */}
            <div className="w-[84px] h-[84px] mb-6">
              <svg fill="none" viewBox="0 0 87.7108 84.38" className="h-full w-auto">
                <g>
                  <path d={svgPaths.p3c0ae800} fill="#34E834" />
                  <path d={svgPaths.p32249300} fill="#34E834" />
                </g>
              </svg>
            </div>

            {/* Heading */}
            <h2 className="text-2xl font-bold text-gray-900 leading-snug mb-4">
              XAI Technology single stock CFD give traders the ability to trade the
              world's most popular companies such as Nvidia, Apple, Meta, Microsoft or
              BHP Billiton.
            </h2>

            {/* Body text */}
            <p className="text-gray-500 text-sm leading-7 mb-4">
              We have listed the most popular stocks across the Australian and US markets to give
              you the best trading opportunities. Alternatively you can trade global macro themes
              with our special selection of US Exchange listed CFDs including a range of emerging
              markets Indices and popular such as the VanEck Vectors Gold Miners (GDX).
            </p>
            <p className="text-gray-500 text-sm leading-7 mb-6">
              Stocks are available exclusively on the XAI Technology MetaTrader 5 platform which
              offers advanced functionalities for both new and experienced traders who require
              world class execution and superior charting tools.
            </p>

            {/* Links */}
            <div className="flex flex-wrap gap-6 mb-6">
              <button className="text-[#34e834] text-xs font-bold tracking-[0.6px] uppercase hover:opacity-80 transition-opacity">
                Further Information on US Stock Trading
              </button>
              <button className="text-[#34e834] text-xs font-bold tracking-[0.6px] uppercase hover:opacity-80 transition-opacity">
                Further information about ASX trading
              </button>
            </div>

            {/* Download Product Details */}
            <div className="bg-white rounded-xl p-4 inline-block shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 mb-0.5">Download</p>
              <p className="text-xl font-bold text-gray-900">Product Details</p>
            </div>
          </div>

          {/* ── Right: Facts card ── */}
          <div className="flex items-start justify-center lg:justify-end shrink-0">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 w-full max-w-[303px]">
              {/* Header */}
              <div className="border-b border-black/10 pb-3 mb-1">
                <p className="text-xs text-gray-500 mb-0.5">Stocks</p>
                <p className="text-3xl font-medium text-gray-900">Facts</p>
              </div>
              {/* Fact items */}
              <ul className="mb-5">
                {facts.map((f, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-3 py-3 text-sm font-bold text-gray-900 ${
                      i < facts.length - 1 ? 'border-b border-black/10' : ''
                    }`}
                  >
                    <CheckIcon />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              {/* CTA */}
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

      {/* ── How does Stock CFD Trading work? ── */}
      <div className="mt-12 mb-4 flex flex-col lg:flex-row gap-12 items-center px-2">
        {/* Image */}
        <div className="shrink-0">
          <img
            src={imgStockPlatform}
            alt="Stock CFD trading platform"
            className="rounded-lg object-cover"
            style={{ width: 488, maxWidth: '100%', height: 424 }}
          />
        </div>
        {/* Text */}
        <div className="flex-1 min-w-0">
          <h2 className="text-3xl font-bold text-gray-900 mb-5 leading-tight">
            How does Stock CFD<br />Trading work?
          </h2>
          <p className="text-gray-700 text-sm leading-7 mb-4">
            Stock trading involves buying or selling a share of ownership in an individual
            company listed on an exchange such as the ASX or NASDAQ. Stocks are typically
            traded without leverage and through a stock exchange. Stock CFDs however can be
            traded using leverage and are done so over-the-counter (OTC). Participants are
            able to access stocks of individual companies, building positions in an individual
            company or in a specified sector of the economy.
          </p>
          <p className="text-gray-700 text-sm leading-7">
            Participants often build strategies with diversification in mind to diversify away
            unsystematic risk across a number of companies or a range of sectors. Investors
            may choose to build positions in defensives if they are predicting volatility.
            Similarly, investors may decide to build a portfolio around a growth strategy
            consisting of small to mid-cap technology stocks.
          </p>
        </div>
      </div>
    </section>
  );
}