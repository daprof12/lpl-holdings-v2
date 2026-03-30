// ── Coin card data ───────────────────────────────────────────────────────────

export interface CryptoCoind {
  id: string;
  name: string;
  description: string;
  imgAsset: string;
}

export const cryptoCoins: CryptoCoind[] = [
  {
    id: 'btc',
    name: 'Bitcoin CFD',
    description:
      'The first and largest cryptocurrency, Bitcoin paved the ways for hundreds of similar currencies and boasts a market cap of over $100 billion.',
    imgAsset: 'figma:asset/c965e9bf78aaf49c8e401727eb4978bb1a59991b.png',
  },
  {
    id: 'eth',
    name: 'Ethereum CFD',
    description:
      "The world's second-largest cryptocurrency, it is labelled by many as 'the next Bitcoin'. Ethereum has received international recognition and support from giant organisations such as Microsoft, JP Morgan, and Intel.",
    imgAsset: 'figma:asset/b3bc1ed7b91dd381559b5481605ef55aa3381335.png',
  },
  {
    id: 'dash',
    name: 'Dash CFD',
    description:
      "Dash's focus is on instant transactions and owner privacy. Dash has an infrastructure that enables much faster transactions than other cryptocurrencies and therefore displays higher liquidity than many of its counterparts.",
    imgAsset: 'figma:asset/b7430711abaa6b1c0d037465aca0f22bea43c629.png',
  },
  {
    id: 'ltc',
    name: 'Litecoin CFD',
    description:
      "Designed by a former Google engineer to improve upon Bitcoin's technology, Litecoin offers quicker processing times and a larger number of tokens. It is also the first cryptocurrency to implement SegWit.",
    imgAsset: 'figma:asset/6388249b9da5d54ae9a1b173aefad54d575e05a0.png',
  },
  {
    id: 'bch',
    name: 'Bitcoin Cash CFD',
    description:
      'Bitcoin Cash resulted from a hard fork of the Bitcoin blockchain. It increased block size from 1 megabyte to 8 megabytes without incorporating SegWit.',
    imgAsset: 'figma:asset/28d1f1ca810fe961fc7881f213ca81b405c8d326.png',
  },
  {
    id: 'xrp',
    name: 'Ripple CFD',
    description:
      'Ripple is both a transaction network and crypto token which was created in 2012 as the go-to cryptocurrency for banks and global money transfers, and has recently experienced a period of growth.',
    imgAsset: 'figma:asset/f56fa1ab322e821ee7cbf05fc5415304d1f6a7f9.png',
  },
  {
    id: 'emc',
    name: 'Emercoin CFD',
    description:
      'Emercoin is an open-source cryptocurrency which originated from Bitcoin, Peercoin and Namecoin. Other than being a cryptocurrency, it is also a platform for secure distributed blockchain business services.',
    imgAsset: 'figma:asset/da55efccf79e5b4cf7944fb243baa614a2e36c0e.png',
  },
  {
    id: 'nmc',
    name: 'NameCoin CFD',
    description:
      'Namecoin is a blockchain protocol that serves as a naming system. Since Namecoin is a fork of Bitcoin, it is also a cryptocurrency that can be used for peer-to-peer transactions.',
    imgAsset: 'figma:asset/8c900231c66877776673c3184ae9a5f08fd78bef.png',
  },
  {
    id: 'ppc',
    name: 'PeerCoin CFD',
    description:
      'PeerCoin aims to solve the inefficiency problem of the Proof-of-Work that is used by bitcoin and many other coins using its own Proof-of-Stake system.',
    imgAsset: 'figma:asset/bf86352ceb7f792e5f33853384fb8ca54aa1956f.png',
  },
  {
    id: 'dot',
    name: 'Polkadot CFD',
    description:
      'Polkadot is a platform that allows diverse blockchains to transfer messages, including value, in a trust-free fashion; sharing their unique features while pooling their security.',
    imgAsset: 'figma:asset/0395ee6844290fd2b2c57b30c50e2cb31333e135.png',
  },
  {
    id: 'xlm',
    name: 'Stellar CFD',
    description:
      'Stellar, or Stellar Lumens, is an open source, decentralized protocol for digital currency to fiat money low-cost transfers which allows cross-border transactions between any pair of currencies.',
    imgAsset: 'figma:asset/309c70159312dd5d52ec3e47dcee7ec0680d85d6.png',
  },
  {
    id: 'lnk',
    name: 'Chainlink CFD',
    description:
      'Chainlink is a decentralized oracle network and cryptocurrency that provides data to blockchains. It is one of the main sources of data used to feed information to applications in decentralized finance.',
    imgAsset: 'figma:asset/c86b6ea7d6a0a0a60a4f0b2e2f59fce925015549.png',
  },
  {
    id: 'doge',
    name: 'Dogecoin CFD',
    description:
      "Dogecoin was founded by software engineers Billy Markus and Jackson Palmer, as a payment system. This coin began as a 'meme coin' and is now seen as a popular option for traders.",
    imgAsset: 'figma:asset/20d87656d22be9864daf99cb302efdeeb6890955.png',
  },
  {
    id: 'xtz',
    name: 'Tezos CFD',
    description:
      'Tezos is a decentralized and Proof of Stake blockchain network that can perform peer-to-peer transactions and assists as a platform to arrange smart contracts.',
    imgAsset: 'figma:asset/1841de35702f1f4f9d8dac0f0612148050bfe6f1.png',
  },
  {
    id: 'uni',
    name: 'Uniswap CFD',
    description:
      'Uniswap is used to exchange cryptocurrencies. It enables automated transactions between cryptocurrency tokens on the Ethereum blockchain through smart contracts.',
    imgAsset: 'figma:asset/0e549dd5026dd6d27bfc0b17a3151f5f8e4ae2c4.png',
  },
  {
    id: 'ada',
    name: 'Cardano CFD',
    description:
      'Cardano is a public blockchain platform that enables peer-to-peer transactions with its internal cryptocurrency, Ada. It is open-source and decentralized, with consensus achieved using proof of stake.',
    imgAsset: 'figma:asset/e1e8a6fc491fadfb84ebd3b316afb4900260a23f.png',
  },
  {
    id: 'bnb',
    name: 'Binance Coin CFD',
    description:
      'Binance Coin was initially formed as a utility token for reduced trading fees, but its uses have extended to payments for transaction fees, travel bookings, entertainment, online services and financial services.',
    imgAsset: 'figma:asset/eb57c7990c772d54715575c563f530ae17ee7fda.png',
  },
  {
    id: 'avax',
    name: 'Avalanche CFD',
    description:
      'Avalanche is a decentralized, open-source proof of stake blockchain platform. It uses smart contracts to support various blockchain-based projects with high transaction processing speed.',
    imgAsset: 'figma:asset/b48129d55632ea067f911479a7f237473304e012.png',
  },
  {
    id: 'luna',
    name: 'Luna CFD',
    description:
      "One of the native tokens of the Terra network, a blockchain-based project in South Korea. Luna can be used to mint a stablecoin TerraUSD (UST) and maintain Terra stablecoins' price.",
    imgAsset: 'figma:asset/6c4b9ecf1f6c9b932b3f639276f54b095e7c452e.png',
  },
  {
    id: 'matic',
    name: 'Polygon Matic CFD',
    description:
      'Ethereum blockchain is used in the Polygon platform, which can connect and evolve Ethereum-compatible projects and blockchains. It uses a modified proof-of-stake consensus mechanism.',
    imgAsset: 'figma:asset/e044c7a88e0601468c95c0f2bf20a4d0372f6bc9.png',
  },
  {
    id: 'glmr',
    name: 'Moonbeam CFD',
    description:
      'An Ethereum-compatible smart contract platform on Polkadot founded by Derek Yoo. It can simplify the process of building and/or deploying Solidity projects in a Substrate-based environment.',
    imgAsset: 'figma:asset/7c0ed5bdac9f274551af9c2553e478df6629c615.png',
  },
  {
    id: 'ksm',
    name: 'Kusama CFD',
    description:
      'Kusama utilizes two types of blockchains, the relay chain and parachains in the Polkadot ecosystem. It serves like a sandbox that help testing and developing new features in early projects.',
    imgAsset: 'figma:asset/37c3c5184a2491d7d7005f2a721a4dd18605b88d.png',
  },
];

// ── Spreads table data ────────────────────────────────────────────────────────

export interface CryptoSpread {
  symbol: string;
  description: string;
  min: string;
  avg: string;
}

export const cryptoSpreads: CryptoSpread[] = [
  { symbol: 'BCHUSD', description: 'Bitcoin Cash vs United States Dollar CFD', min: '1.56', avg: '1.6' },
  { symbol: 'BTCUSD', description: 'Bitcoin vs United States Dollar CFD', min: '12', avg: '12.01' },
  { symbol: 'DOTUSD', description: 'Polkadot vs United States Dollar CFD', min: '0.011', avg: '0.013' },
  { symbol: 'DSHUSD', description: 'Dash Coin vs United States Dollar CFD', min: '0.000', avg: '1.241' },
  { symbol: 'EMCUSD', description: 'Emercoin vs United States Dollar CFD', min: '0.157', avg: '0.157' },
  { symbol: 'ETHUSD', description: 'Ethereum vs United States Dollar CFD', min: '2.89', avg: '2.9' },
  { symbol: 'LNKUSD', description: 'Chainlink vs United States Dollar CFD', min: '0.012', avg: '0.020' },
  { symbol: 'LTCUSD', description: 'Lite Coin vs United States Dollar CFD', min: '1.05', avg: '1.06' },
  { symbol: 'NMCUSD', description: 'NameCoin vs United States Dollar CFD', min: '7.895', avg: '7.895' },
  { symbol: 'PPCUSD', description: 'PeerCoin vs United States Dollar CFD', min: '0.097', avg: '0.097' },
  { symbol: 'XRPUSD', description: 'Ripple vs United States Dollar CFD', min: '0.022', avg: '0.025' },
  { symbol: 'XLMUSD', description: 'Stellar vs United States Dollar CFD', min: '0.002', avg: '0.003' },
  { symbol: 'ADAUSD', description: 'Cardano vs United States Dollar CFD', min: '0.003', avg: '0.005' },
  { symbol: 'BNBUSD', description: 'Binance Coin vs United States Dollar CFD', min: '0.85', avg: '0.90' },
  { symbol: 'AVAXUSD', description: 'Avalanche vs United States Dollar CFD', min: '0.12', avg: '0.15' },
  { symbol: 'LUNAUSD', description: 'Luna vs United States Dollar CFD', min: '0.008', avg: '0.010' },
  { symbol: 'MATICUSD', description: 'Polygon Matic vs United States Dollar CFD', min: '0.004', avg: '0.006' },
  { symbol: 'DOGEUSD', description: 'Dogecoin vs United States Dollar CFD', min: '0.0003', avg: '0.0005' },
  { symbol: 'XTZUSD', description: 'Tezos vs United States Dollar CFD', min: '0.015', avg: '0.018' },
  { symbol: 'UNIUSD', description: 'Uniswap vs United States Dollar CFD', min: '0.030', avg: '0.040' },
  { symbol: 'GLMRUSD', description: 'Moonbeam vs United States Dollar CFD', min: '0.010', avg: '0.015' },
  { symbol: 'KSMUSD', description: 'Kusama vs United States Dollar CFD', min: '0.25', avg: '0.30' },
];
