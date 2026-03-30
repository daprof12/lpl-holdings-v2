import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { cryptoCoins } from '../../data/cryptoData';

// Pre-import all coin images (figma:asset scheme)
import imgBtc from 'figma:asset/c965e9bf78aaf49c8e401727eb4978bb1a59991b.png';
import imgEth from 'figma:asset/b3bc1ed7b91dd381559b5481605ef55aa3381335.png';
import imgDash from 'figma:asset/b7430711abaa6b1c0d037465aca0f22bea43c629.png';
import imgLtc from 'figma:asset/6388249b9da5d54ae9a1b173aefad54d575e05a0.png';
import imgBch from 'figma:asset/28d1f1ca810fe961fc7881f213ca81b405c8d326.png';
import imgXrp from 'figma:asset/f56fa1ab322e821ee7cbf05fc5415304d1f6a7f9.png';
import imgEmc from 'figma:asset/da55efccf79e5b4cf7944fb243baa614a2e36c0e.png';
import imgNmc from 'figma:asset/8c900231c66877776673c3184ae9a5f08fd78bef.png';
import imgPpc from 'figma:asset/bf86352ceb7f792e5f33853384fb8ca54aa1956f.png';
import imgDot from 'figma:asset/0395ee6844290fd2b2c57b30c50e2cb31333e135.png';
import imgXlm from 'figma:asset/309c70159312dd5d52ec3e47dcee7ec0680d85d6.png';
import imgLnk from 'figma:asset/c86b6ea7d6a0a0a60a4f0b2e2f59fce925015549.png';
import imgDgc from 'figma:asset/20d87656d22be9864daf99cb302efdeeb6890955.png';
import imgTzs from 'figma:asset/1841de35702f1f4f9d8dac0f0612148050bfe6f1.png';
import imgUsp from 'figma:asset/0e549dd5026dd6d27bfc0b17a3151f5f8e4ae2c4.png';
import imgCdo from 'figma:asset/e1e8a6fc491fadfb84ebd3b316afb4900260a23f.png';
import imgBnc from 'figma:asset/eb57c7990c772d54715575c563f530ae17ee7fda.png';
import imgAvax from 'figma:asset/b48129d55632ea067f911479a7f237473304e012.png';
import imgLuna from 'figma:asset/6c4b9ecf1f6c9b932b3f639276f54b095e7c452e.png';
import imgMatic from 'figma:asset/e044c7a88e0601468c95c0f2bf20a4d0372f6bc9.png';
import imgGlmr from 'figma:asset/7c0ed5bdac9f274551af9c2553e478df6629c615.png';
import imgKsm from 'figma:asset/37c3c5184a2491d7d7005f2a721a4dd18605b88d.png';

const coinImages: Record<string, string> = {
  btc: imgBtc, eth: imgEth, dash: imgDash, ltc: imgLtc,
  bch: imgBch, xrp: imgXrp, emc: imgEmc, nmc: imgNmc,
  ppc: imgPpc, dot: imgDot, xlm: imgXlm, lnk: imgLnk,
  doge: imgDgc, xtz: imgTzs, uni: imgUsp, ada: imgCdo,
  bnb: imgBnc, avax: imgAvax, luna: imgLuna, matic: imgMatic,
  glmr: imgGlmr, ksm: imgKsm,
};

export default function CryptoCoinsGrid() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return cryptoCoins;
    return cryptoCoins.filter((c) => c.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <section className="bg-[#f3f3f3] py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        {/* Search */}
        <div className="flex items-center gap-3 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search coins…"
              className="pl-9 pr-4 py-2 w-full text-sm bg-white border border-gray-200 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#34e834]/40"
            />
          </div>
          <span className="text-xs text-gray-400">
            {filtered.length}/{cryptoCoins.length} coins
          </span>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">No coins match "{query}"</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((coin) => (
              <div
                key={coin.id}
                className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-[75px] h-[75px] mb-4 overflow-hidden rounded-full">
                  <img
                    src={coinImages[coin.id]}
                    alt={coin.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{coin.name}</h3>
                <p className="text-sm text-gray-700 leading-7">{coin.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
