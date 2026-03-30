import imgSection from "figma:asset/7cad92b834c6156f8556828a496d0241b03bb3da.png";
import imgImageBackground from "figma:asset/4928966855d52dc044628ab447351ae93fe013b5.png";
import imgChatIconWebp from "figma:asset/561f5009ffc053e64fb84e5781e336da22140735.png";
import imgImage from "figma:asset/1af9030b1727a277a1d5222fd6e109a097ac4eb5.png";
import imgSection1 from "figma:asset/49712abe12194c268a5c9981e2bf290c369efc5f.png";

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px]">Why Choose XAI Technology</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[8.1px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[25.31px] relative shrink-0 text-[16.9px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">XAI Technology has grown to become one of the largest MetaTrader 4 Forex CFD</p>
        <p>provider in the world by giving traders what they really want.</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="bg-[#34e834] content-stretch flex items-start justify-center pb-[15.44px] pt-[15.06px] px-[39px] relative rounded-[5.63px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[5.63px]" />
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[20.6px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24.38px]">Start Trading</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[6.9px] items-center max-w-[1124.06005859375px] px-[14.063px] relative self-stretch shrink-0 w-[749.38px]" data-name="Container">
      <Heading1 />
      <Container3 />
      <Link />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-wrap items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Container2 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1124.06005859375px] relative shrink-0 w-[1124.06px]" data-name="Container">
      <Container1 />
    </div>
  );
}

function Section() {
  return (
    <div className="content-stretch flex h-[478.13px] items-center justify-center pt-[105.938px] relative shrink-0 w-full" data-name="Section">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-black inset-0" />
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-full left-0 max-w-none top-0 w-[117.52%]" src={imgSection} />
        </div>
      </div>
      <Container />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] pl-[37.5px] pr-[45px] right-[14.03px] top-[-0.69px]" data-name="Container">
      <div className="absolute left-0 rounded-[27.19px] size-[27.19px] top-[1.62px]" data-name="Image+Background">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[27.19px]">
          <div className="absolute bg-[#34e834] inset-0 rounded-[27.19px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[27.19px]">
            <img alt="" className="absolute left-[-1.49%] max-w-none size-[102.98%] top-[-1.49%]" src={imgImageBackground} />
          </div>
        </div>
      </div>
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[28.13px] relative shrink-0 text-[18.8px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Join XAI Technology to experience tight spreads and trading</p>
        <p>conditions plus a live support team committed to helping you.</p>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.03px] top-[101.25px]" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px]">Low Spreads</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.03px] top-[166.63px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[25.31px] relative shrink-0 text-[16.9px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Our mission is to provide traders with the lowest spreads possible during all market</p>
        <p className="mb-0">conditions. We have invested heavily in technology and establishing strong relationships with</p>
        <p className="mb-0">some of the largest and most reliable liquidity providers in the market. We are constantly</p>
        <p className="mb-0">adding and tweaking our technology in order to bring our traders the best possible</p>
        <p>conditions in the industry.</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute inset-[0_33.33%_552.69px_0]" data-name="Container">
      <Container5 />
      <Heading2 />
      <Container6 />
    </div>
  );
}

function ChatIconWebp() {
  return (
    <div className="absolute left-[18.75px] size-[45px] top-[18.75px]" data-name="chat-icon.webp">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-[-3.33%] max-w-none size-[106.67%] top-[-3.33%]" src={imgChatIconWebp} />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[18.75px] right-[44.99px] top-[82.5px]" data-name="Heading 3">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[30px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[36px]">Contact Us</p>
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[18.75px] right-[44.99px] top-[131.06px]" data-name="Heading 6">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[24.38px] relative shrink-0 text-[#777] text-[15px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">We are here 24hrs a day</p>
        <p>Monday to Sunday.</p>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="h-[199.63px] mb-[-0.01px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.15)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <ChatIconWebp />
      <Heading3 />
      <Heading5 />
    </div>
  );
}

function Link1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.15)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[13.625px] pl-[48.75px] pr-[15px] pt-[13.125px] relative w-full">
        <div className="absolute left-[18.75px] size-[18.75px] top-[14.06px]" data-name="Image">
          <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage} />
          </div>
        </div>
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[22.5px]">Help Centre</p>
        </div>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="content-stretch flex flex-col items-start pl-[48.75px] pr-[15px] py-[13.125px] relative w-full">
        <div className="absolute left-[18.75px] size-[18.75px] top-[14.06px]" data-name="Image">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage} />
          </div>
        </div>
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[22.5px]">Email Us</p>
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.01px] relative shrink-0 w-full" data-name="Container">
      <Link1 />
      <Link2 />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#f6f6f6] content-stretch flex flex-col items-start overflow-clip pb-[0.01px] relative rounded-[15px] shrink-0 w-full" data-name="Background">
      <HorizontalBorder />
      <Container8 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute bottom-[552.69px] content-stretch flex flex-col items-start left-3/4 px-[14.063px] right-0 top-0" data-name="Container">
      <Background />
    </div>
  );
}

function Heading4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.06px] top-0" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px]">Fast Execution</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.06px] top-[66px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[25.31px] relative shrink-0 text-[16.9px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">{`XAI Technology utilises enterprise grade hardware on our trade servers in the NY4 & LD5 data centre in New York & London respectively. Our`}</p>
        <p className="mb-0">trader servers are collocated with the data server of our pricing providers in these data centres. Dedicated fibre optic cross connects us and</p>
        <p>our pricing providers to ensure the lowest latency and fastest possible trade execution for our clients.</p>
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] pt-[18.7px] right-[14.06px] top-[160.74px]" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px]">Superior Technology</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.06px] top-[244.65px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[25.31px] relative shrink-0 text-[16.9px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">{`XAI Technology has partnered with the world’s best trading technology companies to bring you the ultimate trading experience  and cutting`}</p>
        <p className="mb-0">edge trading tools. These tools include: Depth of Market (DoM), inbuilt spread monitoring, ladder trading, automated close of trades with</p>
        <p className="mb-0">custom order templates, and more. Our iPhone and Android trading applications have been optimised to provide you the best possible mobile</p>
        <p>trading experience.</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute inset-[332.31px_-0.06px_167.5px_0]" data-name="Container">
      <Heading4 />
      <Container10 />
      <Heading6 />
      <Container11 />
    </div>
  );
}

function Section1() {
  return (
    <div className="h-[717px] relative shrink-0 w-[1124px]" data-name="Section">
      <Container4 />
      <div className="absolute bottom-[552.69px] left-[66.67%] right-1/4 top-0" data-name="Rectangle" />
      <Container7 />
      <Container9 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px] whitespace-pre-wrap">The Ultimate in Trading Conditions</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[25.31px] relative shrink-0 text-[16.9px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">XAI Technology has been created with traders in mind. Scalping, hedging, and automated trading are all allowed. Our Raw Spread account</p>
        <p>spreads start from 0.0 pips. We have flexible leverage options offering up to 1:1000, and accept deposits in 10 major currencies.</p>
      </div>
    </div>
  );
}

function Heading8() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[19.29px] relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px] whitespace-pre-wrap">Better Fills</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[0.55px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[25.31px] relative shrink-0 text-[16.9px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Clients can open trades from 1 micro lot (1,000 base currency) to 200 lots (20 million base currency) through our bridge. Our technology</p>
        <p className="mb-0">sorts and ranks prices to allow real-time execution of large trades over multiple pricing providers and their pricing tiers, and this ensures the</p>
        <p>best price for any trade size.</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col gap-[18.2px] items-start px-[14.063px] relative size-full">
        <Heading7 />
        <Container14 />
        <Heading8 />
        <Container15 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-wrap items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Container13 />
    </div>
  );
}

function Section2() {
  return (
    <div className="bg-[#f6f6f6] relative shrink-0 w-full" data-name="Section">
      <div className="content-stretch flex flex-col items-start px-[157.97px] py-[84.375px] relative w-full">
        <Container12 />
      </div>
    </div>
  );
}

function Heading9() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.06px] top-0" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px]">Unrivalled Customer Service</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.06px] top-[66px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[25.31px] relative shrink-0 text-[16.9px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">XAI Technology strives to offer you the best possible customer service and support. Our team has a significant amount of experience within</p>
        <p className="mb-0">the forex industry so they understand what traders want and need. You can trade with confidence knowing that the XAI Technology team</p>
        <p>will always be there to help 24 hours a day, 7 days a week.</p>
      </div>
    </div>
  );
}

function Heading10() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] pt-[18.7px] right-[14.06px] top-[160.74px]" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px]">Advanced Trading Tools</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.06px] top-[244.85px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[25.31px] relative shrink-0 text-[16.9px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Our additions to MetaTrader 4 such as a one click trade module, market depth, spread monitor, trade risk calculator, and advanced order</p>
        <p>types previously not available on MetaTrader 4 make for a better trading experience.</p>
      </div>
    </div>
  );
}

function Heading11() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.06px] top-[333.56px]" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px]">Superior Trading Platforms</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.06px] top-[398.96px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[25.31px] relative shrink-0 text-[16.9px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">MetaTrader 4, MetaTrader 5, cTrader and TradingView are some of the best trading platforms available today. XAI Technology has</p>
        <p>revolutionised forex trading by giving traders direct access to our Raw Pricing using any of these popular trading platforms.</p>
      </div>
    </div>
  );
}

function Heading12() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.06px] top-[487.69px]" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px]">Trust and Transparency</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.06px] top-[553.09px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[25.31px] relative shrink-0 text-[16.9px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">{`Trust and Transparency form the basis of XAI Technology's core values. XAI Technology is a regulated Forex CFD provider that applies Raw`}</p>
        <p>Spreads on its main and most famous account type, so there is no requotes, no price manipulation and no restrictions.</p>
      </div>
    </div>
  );
}

function Heading13() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.06px] top-[641.81px]" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px]">Regulation</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.06px] top-[707.81px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[25.31px] relative shrink-0 text-[16.9px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">XAI Technology is regulated by the Financial Services Authority of Seychelles (FSA) meeting strict capital requirements. All client funds are</p>
        <p className="mb-0">held in segregated client money accounts with top International banks. XAI Technology do not use these funds for any operational expenses</p>
        <p>or purposes.</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <Heading9 />
      <Container17 />
      <Heading10 />
      <Container18 />
      <Heading11 />
      <Container19 />
      <Heading12 />
      <Container20 />
      <Heading13 />
      <Container21 />
    </div>
  );
}

function Section3() {
  return (
    <div className="content-stretch flex flex-wrap items-start justify-center pb-[84.37px] pt-[84.38px] relative shrink-0 w-[1124.06px]" data-name="Section">
      <Container16 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[48.8px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[58.5px]">Start trading with</p>
      </div>
    </div>
  );
}

function Heading14() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[22.5px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[27px]">{`a  regulated broker `}</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="bg-[#34e834] content-stretch flex items-start justify-center pb-[15.44px] pt-[15.06px] px-[39px] relative rounded-[5.63px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[5.63px]" />
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[20.6px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24.38px]">Open Trading Account</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex items-start justify-center pb-[15.44px] pt-[15.06px] px-[39px] relative rounded-[7.5px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[7.5px]" />
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[20.6px] text-center text-white tracking-[0.469px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24.38px]">View Dashboard</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex gap-[19.14px] items-start pl-[265.2px] pr-[265.21px] pt-[4.64px] relative w-full">
        <Link3 />
        <Link4 />
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col gap-[18.8px] items-start px-[14.063px] relative size-full">
        <Heading />
        <Heading14 />
        <Container24 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-wrap items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Container23 />
    </div>
  );
}

function Section4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[244.6%] left-0 max-w-none top-[-72.3%] w-full" src={imgSection1} />
      </div>
      <div className="content-stretch flex flex-col items-start px-[157.97px] py-[117.188px] relative w-full">
        <Container22 />
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 right-0 top-0" data-name="Main">
      <Section />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </div>
  );
}

export default function Component1440WDefault() {
  return (
    <div className="bg-white relative size-full" data-name="1440w default">
      <Main />
    </div>
  );
}