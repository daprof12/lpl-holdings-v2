import { Link } from 'react-router-dom';
import svgPaths from '../../imports/svg-rg9vmp9bp3';

function CheckIcon() {
  return (
    <svg fill="none" viewBox="0 0 14.5455 15" width="15" height="15" className="shrink-0 mt-0.5">
      <g clipPath="url(#chk-c)">
        <path d={svgPaths.paf62000} fill="#34E834" />
        <path d={svgPaths.p38b8d680} fill="black" />
      </g>
      <defs><clipPath id="chk-c"><rect fill="white" height="15" width="14.5455" /></clipPath></defs>
    </svg>
  );
}

const facts = [
  { text: 'Up to 1:500 Leverage MetaTrader4/MT5\n1:300 Leverage cTrader and TradingView', multiline: true },
  { text: 'Trade the market 7 days a week', multiline: false },
  { text: 'Long or short', multiline: false },
  { text: 'FSA regulated', multiline: false },
  { text: 'No commissions', multiline: false },
  { text: 'REAL live support!', multiline: false },
];

export default function CryptoOverview() {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 pt-10 pb-4">

      {/* ── Green notice banner ── */}
      <div
        className="rounded-xl px-7 py-6 mb-8 text-center"
        style={{ backgroundColor: 'rgba(52,232,52,0.2)' }}
      >
        <p className="font-semibold text-gray-900 text-sm">
          Please note that some symbols may not be available on weekends. Detailed trading
          sessions are available on the platforms.
        </p>
      </div>

      {/* ── Grey card ── */}
      <div className="bg-[#f6f6f6] rounded-2xl p-7">
        <div className="flex flex-col lg:flex-row gap-8 min-h-[520px]">

          {/* Left: content */}
          <div className="flex-1 min-w-0 relative">
            {/* Crypto icon */}
            <div className="w-[84px] h-[84px] mb-6">
              <svg fill="none" viewBox="0 0 84.38 84.38" className="h-full w-auto">
                <g clipPath="url(#clip-crypto)">
                  <path clipRule="evenodd" d={svgPaths.p182aa80} fill="#34E834" fillRule="evenodd" />
                </g>
                <defs>
                  <clipPath id="clip-crypto">
                    <rect fill="white" height="84.38" width="84.38" />
                  </clipPath>
                </defs>
              </svg>
            </div>

            <h2 className="text-xl font-bold text-gray-900 leading-snug mb-4">
              Now you can trade Cryptocurrency 7 days a week on all XAI Technology platforms.
            </h2>

            <p className="text-gray-700 text-sm leading-7 mb-3">
              The leverage available on Cryptocurrency pairs BTCUSD and ETHUSD is now up to 1:500
              and for BCHUSD and LTCUSD 1:200 for clients registered with Raw Trading.
            </p>

            {/* Leverage bullets */}
            <div className="mb-3">
              <p className="text-sm font-bold text-gray-900 mb-1">BTCUSD</p>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-3">
                <li>Up to 1:500 leverage for positions below 50 lots net exposure</li>
                <li>1:300 leverage for positions above 50 lots net exposure</li>
                <li>MT5 Max Net Position 100 BTC</li>
              </ul>
              <p className="text-sm font-bold text-gray-900 mb-1">ETHUSD</p>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-3">
                <li>Up to 1:500 leverage for positions below 1,000 lots net exposure</li>
                <li>1:300 leverage for positions above 1,000 lots net exposure</li>
                <li>MT5 Max Net Position 2000 ETH</li>
              </ul>
            </div>

            <p className="text-gray-500 text-sm leading-7 mb-3">
              Unlike other asset classes (FX, Equities, CFDs on Commodities, etc.), the
              Cryptocurrency market is dominated by retail speculators. With XAI Technology
              Cryptocurrency CFDs, you will trade in a market where there is no central bank
              intervention, interbank dealers controlling order flow or giant pension funds
              moving prices.
            </p>

            <p className="text-gray-500 text-sm leading-7">
              Price movements on Cryptocurrencies like Bitcoin or Ethereum are driven primarily
              by news and prevailing sentiment. These sometimes dramatic shifts can lead to
              massive intraday price swings, making Cryptocurrency CFDs an exciting product for
              aggressive and experienced day traders.
            </p>
          </div>

          {/* Right: Facts card */}
          <div className="flex items-start justify-center lg:justify-end shrink-0">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 w-full max-w-[303px]">
              <div className="border-b border-black/10 pb-3 mb-1">
                <p className="text-xs text-gray-500 mb-0.5">Cryptocurrency CFDs</p>
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