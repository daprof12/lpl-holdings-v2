import svgPaths from "./svg-jd6eytdjgy";
import imgDefaultLogo from "figma:asset/636e2f836e77ac426649d6a64c07faf2f12ec20d.png";
import imgTradeCapPng from "figma:asset/eaaa70c990c2adb09c620548fa58ffff10e4c788.png";
import imgLettersPng from "figma:asset/dad3d9eaf2b26306f697aea99e5f5cf58a28538e.png";
import imgBackground from "figma:asset/95959aa3138ed40d697b1da77b127b867f5f50c5.png";
import imgBackground1 from "figma:asset/bf98fe3b60c22e0d825f32cb4841b8f47251a08e.png";
import imgBackground2 from "figma:asset/85b23da8892ed8950e5ace3a65b88a163abb09de.png";
import imgBackground3 from "figma:asset/4421e60d62fc21de7918bc3736f44707b6c705f6.png";
import imgNotebookImageBgPng from "figma:asset/9642509007b8e7869e6377de7b3c71825f52dbb0.png";
import imgSlideImage from "figma:asset/0f2557dd444a4dfafa83297b0ea0ad5b08020def.png";
import imgDataSecurityLockingAFolderPng from "figma:asset/0638ba4c196c4bd0bc7a756d89928117f9d3eb64.png";
import imgPhoneWithAFinancialGrowthGraphPng from "figma:asset/bdef1bd8cd2a9e6646277974e9a95f25d9184241.png";
import imgAiPoweredChatbotForCustomerSupportPng from "figma:asset/78f996aa8e1a364f20d77b8db256f45975096dab.png";
import imgUSSecuritiesAndExchangeCommissionPng from "figma:asset/d81a406b5869ba1614d9a6b5e4a9424e9a5997bb.png";
import imgBrokercheckPng from "figma:asset/adfa9b3ad22d741d74d2bfea301bfe7888fee4ce.png";
import { imgGradient, imgGradient1 } from "./svg-8qe2b";

function DefaultLogo() {
  return (
    <div className="absolute aspect-[176.02000427246094/65.19999694824219] left-0 right-[60%] top-0" data-name="default-logo">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[100.01%] left-0 max-w-none top-[-0.01%] w-full" src={imgDefaultLogo} />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[71.7px] relative shrink-0 w-full" data-name="Container">
      <DefaultLogo />
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Link">
      <Container3 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-[440.06px]" data-name="Container">
      <Container2 />
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex items-start justify-center px-[15px] relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[24px] text-black text-center tracking-[-0.48px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[32.4px]">Home</p>
      </div>
    </div>
  );
}

function Item() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Item">
      <div className="flex flex-col items-end size-full">
        <div className="content-stretch flex flex-col h-full items-end pb-[2px] pt-[3.25px] relative">
          <Link1 />
        </div>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex items-start justify-center px-[15px] relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[24px] text-black text-center tracking-[-0.48px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[32.4px]">Pricing</p>
      </div>
    </div>
  );
}

function Item1() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Item">
      <div className="flex flex-col items-end size-full">
        <div className="content-stretch flex flex-col h-full items-end pb-[2px] pt-[3.25px] relative">
          <Link2 />
        </div>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex items-start justify-center px-[15px] relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[24px] text-black text-center tracking-[-0.48px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[32.4px]">Platform</p>
      </div>
    </div>
  );
}

function Item2() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Item">
      <div className="flex flex-col items-end size-full">
        <div className="content-stretch flex flex-col h-full items-end pb-[2px] pt-[3.25px] relative">
          <Link3 />
        </div>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex items-start justify-center px-[15px] relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[24px] text-black text-center tracking-[-0.48px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[32.4px]">About</p>
      </div>
    </div>
  );
}

function Item3() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Item">
      <div className="flex flex-col items-end size-full">
        <div className="content-stretch flex flex-col h-full items-end pb-[2px] pt-[3.25px] relative">
          <Link4 />
        </div>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="content-stretch flex items-start justify-center px-[15px] relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#4572c4] text-[24px] text-center tracking-[-0.48px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[32.4px]">Trade</p>
      </div>
    </div>
  );
}

function Item4() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Item">
      <div className="flex flex-col items-end size-full">
        <div className="content-stretch flex flex-col h-full items-end pb-[2px] pt-[3.25px] relative">
          <Link5 />
        </div>
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div className="bg-black content-stretch flex items-start justify-center pb-[2.15px] pt-[1.25px] px-[40px] relative rounded-[12px] shrink-0" data-name="Link">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[24px] text-center text-white tracking-[-0.48px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[32.4px]">Login</p>
      </div>
    </div>
  );
}

function Item5() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Item">
      <div className="flex flex-col items-end size-full">
        <div className="content-stretch flex flex-col h-full items-end pt-[2px] relative">
          <Link6 />
        </div>
      </div>
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex h-[38.4px] items-start relative shrink-0" data-name="List">
      <Item />
      <Item1 />
      <Item2 />
      <Item3 />
      <Item4 />
      <Item5 />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col items-end left-[-176.02px] min-h-[50px] pb-[11.6px] right-0 top-0" data-name="Container">
      <List />
    </div>
  );
}

function Margin() {
  return (
    <div className="h-[50px] relative shrink-0 w-[704.117px]" data-name="Margin">
      <Container4 />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex gap-[0.003px] items-center left-0 px-[57.398px] py-[4.305px] top-0 w-[1435px]" data-name="Container">
      <Container1 />
      <Margin />
    </div>
  );
}

function TradeCapPng() {
  return (
    <div className="h-[630.27px] max-w-[539.0399780273438px] relative shrink-0 w-[539.04px]" data-name="TradeCap.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgTradeCapPng} />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-[539.04px]" data-name="Container">
      <TradeCapPng />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[60px] text-black tracking-[-1.2px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[66px]">Forex Trading</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[27px] relative shrink-0 text-[20px] text-black tracking-[-0.4px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">Unlock the world’s largest and most liquid market with LPL-Holdings advanced Forex trading</p>
        <p className="mb-0">platform. Trade currencies with precision, speed, and confidence backed by powerful tools and</p>
        <p>expert support.</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[22px] text-white tracking-[-0.44px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[29.7px]">Start Trading</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px overflow-clip relative w-[27px]" data-name="Frame">
      <div className="absolute inset-[28.49%_6.25%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.625 11.6128">
          <path d={svgPaths.p1f957100} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0 size-[27px]" data-name="SVG">
      <Frame />
    </div>
  );
}

function SvgMargin() {
  return (
    <div className="content-stretch flex flex-col h-[27px] items-start pl-[12px] relative shrink-0 w-[39px]" data-name="SVG:margin">
      <Svg />
    </div>
  );
}

function Link7() {
  return (
    <div className="bg-black content-stretch flex items-center p-[5px] relative rounded-[15px] shrink-0" data-name="Link">
      <Container12 />
      <SvgMargin />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link7 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Container10 />
      <Container11 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[818.57px]" data-name="Container">
      <Container9 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[19.99px] items-center relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Container8 />
    </div>
  );
}

function Background() {
  return (
    <div className="min-h-[726px] relative shrink-0 w-full" data-name="Background" style={{ backgroundImage: "linear-gradient(-25deg, rgb(99, 142, 223) 20%, rgb(234, 238, 255) 60%)" }}>
      <div className="flex flex-col justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center min-h-[inherit] pb-[47.87px] pt-[47.86px] px-[28.695px] relative w-full">
          <Container6 />
        </div>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#1446b7] text-[48px] text-center tracking-[-0.96px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[52.8px]">Why Trade Forex?</p>
      </div>
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="SVG">
          <path d={svgPaths.p24617500} fill="var(--fill-0, #1446B7)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex items-start pr-[18px] relative shrink-0 z-[2]" data-name="Container">
      <Svg1 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[5px] pr-[85.3px] relative shrink-0 z-[1]" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[28px] relative shrink-0 text-[28px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">24/5 Market Access: Trade</p>
        <p className="mb-0">currencies around the clock</p>
        <p className="mb-0">during the business week,</p>
        <p>maximizing opportunities.</p>
      </div>
    </div>
  );
}

function Item6() {
  return (
    <div className="content-stretch flex isolate items-center pb-[6px] relative shrink-0 w-full" data-name="Item">
      <Container15 />
      <Container16 />
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="SVG">
          <path d={svgPaths.p24617500} fill="var(--fill-0, #1446B7)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex items-start pr-[18px] relative shrink-0 z-[2]" data-name="Container">
      <Svg2 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[5px] pr-[85.25px] relative shrink-0 z-[1]" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[28px] relative shrink-0 text-[28px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">High Liquidity: Enjoy fast</p>
        <p className="mb-0">execution and tight spreads</p>
        <p className="mb-0">thanks to the massive daily</p>
        <p>trading volume.</p>
      </div>
    </div>
  );
}

function Item7() {
  return (
    <div className="content-stretch flex isolate items-center pb-[6px] relative shrink-0 w-full" data-name="Item">
      <Container17 />
      <Container18 />
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="SVG">
          <path d={svgPaths.p24617500} fill="var(--fill-0, #1446B7)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex items-start pr-[18px] relative shrink-0 z-[2]" data-name="Container">
      <Svg3 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[5px] pr-[26.13px] relative shrink-0 z-[1]" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[28px] relative shrink-0 text-[28px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">Leverage Potential: Amplify your</p>
        <p className="mb-0">trading power to maximize gains</p>
        <p>(while managing risk carefully).</p>
      </div>
    </div>
  );
}

function Item8() {
  return (
    <div className="content-stretch flex isolate items-center pb-[6px] relative shrink-0 w-full" data-name="Item">
      <Container19 />
      <Container20 />
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="SVG">
          <path d={svgPaths.p24617500} fill="var(--fill-0, #1446B7)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex items-start pr-[18px] relative shrink-0 z-[2]" data-name="Container">
      <Svg4 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[5px] pr-[32.39px] relative shrink-0 z-[1]" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[28px] relative shrink-0 text-[28px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">Diverse Trading Pairs: Access a</p>
        <p className="mb-0">wide range of currency pairs to</p>
        <p className="mb-0">suit any strategy or market</p>
        <p>outlook.</p>
      </div>
    </div>
  );
}

function Item9() {
  return (
    <div className="content-stretch flex isolate items-center pb-[6px] relative shrink-0 w-full" data-name="Item">
      <Container21 />
      <Container22 />
    </div>
  );
}

function Svg5() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="SVG">
          <path d={svgPaths.p24617500} fill="var(--fill-0, #1446B7)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex items-start pr-[18px] relative shrink-0 z-[2]" data-name="Container">
      <Svg5 />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[5px] pr-[1.26px] relative shrink-0 z-[1]" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[28px] relative shrink-0 text-[28px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">Global Economic Insight: Benefit</p>
        <p className="mb-0">from trading that reflects global</p>
        <p className="mb-0">events, news, and economic shifts</p>
        <p>in real time.</p>
      </div>
    </div>
  );
}

function Item10() {
  return (
    <div className="content-stretch flex isolate items-center relative shrink-0 w-full" data-name="Item">
      <Container23 />
      <Container24 />
    </div>
  );
}

function List1() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="List">
      <Item6 />
      <Item7 />
      <Item8 />
      <Item9 />
      <Item10 />
    </div>
  );
}

function OverlayShadow() {
  return (
    <div className="bg-[rgba(242,245,251,0.4)] flex-[1_0_0] min-h-px min-w-px relative rounded-[30px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" data-name="Overlay+Shadow">
      <div className="content-stretch flex flex-col items-start px-[55px] py-[63px] relative w-full">
        <List1 />
      </div>
    </div>
  );
}

function LettersPng() {
  return (
    <div className="h-[507.3px] max-w-[592.7000122070312px] relative shrink-0 w-[592.7px]" data-name="letters.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgLettersPng} />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center min-h-px min-w-px relative" data-name="Container">
      <LettersPng />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <OverlayShadow />
      <Container25 />
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[19.99px] items-start px-[114.797px] py-[43.047px] relative w-full">
        <Heading1 />
        <Container14 />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[48px] text-black text-center tracking-[-0.96px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[52.8px]">Why Trade Forex with LPL-Holdings?</p>
      </div>
    </div>
  );
}

function Svg6() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="SVG">
          <path d={svgPaths.p26af7780} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex items-center relative self-stretch shrink-0" data-name="Container">
      <Svg6 />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex h-[22px] items-start justify-center relative shrink-0" data-name="Container">
      <Container30 />
    </div>
  );
}

function Link8() {
  return (
    <div className="bg-black content-stretch flex items-start p-[10px] relative rounded-[21px] shrink-0" data-name="Link">
      <Container29 />
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <Link8 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[44px] relative shrink-0 text-[40px] text-center text-white tracking-[-0.8px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">Lightning-fast</p>
        <p className="mb-0">execution you</p>
        <p>can trust</p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="flex-[1_0_0] min-h-[508.20001220703125px] min-w-px relative rounded-[24px] self-stretch" data-name="Background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[24px]">
        <img alt="" className="absolute h-full left-[-4.94%] max-w-none top-0 w-[109.88%]" src={imgBackground} />
      </div>
      <div className="content-stretch flex flex-col items-start justify-between min-h-[inherit] pb-[45px] pt-[15px] px-[15px] relative size-full">
        <Container28 />
        <Container31 />
      </div>
    </div>
  );
}

function Svg7() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="SVG">
          <path d={svgPaths.p26af7780} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex items-center relative self-stretch shrink-0" data-name="Container">
      <Svg7 />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex h-[22px] items-start justify-center relative shrink-0" data-name="Container">
      <Container34 />
    </div>
  );
}

function Link9() {
  return (
    <div className="bg-black content-stretch flex items-start p-[10px] relative rounded-[21px] shrink-0" data-name="Link">
      <Container33 />
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <Link9 />
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[44px] relative shrink-0 text-[40px] text-center text-white tracking-[-0.8px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">Advanced</p>
        <p className="mb-0">tools designed</p>
        <p>for every trader</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="flex-[1_0_0] min-h-[508.20001220703125px] min-w-px relative rounded-[24px] self-stretch" data-name="Background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[24px]">
        <img alt="" className="absolute h-full left-[-5.01%] max-w-none top-0 w-[110.02%]" src={imgBackground1} />
      </div>
      <div className="content-stretch flex flex-col items-start justify-between min-h-[inherit] pb-[45px] pt-[15px] px-[15px] relative size-full">
        <Container32 />
        <Container35 />
      </div>
    </div>
  );
}

function Svg8() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="SVG">
          <path d={svgPaths.p26af7780} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex items-center relative self-stretch shrink-0" data-name="Container">
      <Svg8 />
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex h-[22px] items-start justify-center relative shrink-0" data-name="Container">
      <Container38 />
    </div>
  );
}

function Link10() {
  return (
    <div className="bg-black content-stretch flex items-start p-[10px] relative rounded-[21px] shrink-0" data-name="Link">
      <Container37 />
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <Link10 />
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[44px] relative shrink-0 text-[40px] text-center text-white tracking-[-0.8px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">Dedicated</p>
        <p className="mb-0">support,</p>
        <p className="mb-0">anytime you</p>
        <p>need it</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="flex-[1_0_0] min-h-[508.20001220703125px] min-w-px relative rounded-[24px] self-stretch" data-name="Background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[24px]">
        <img alt="" className="absolute h-full left-[-5.01%] max-w-none top-0 w-[110.02%]" src={imgBackground2} />
      </div>
      <div className="content-stretch flex flex-col items-start justify-between min-h-[inherit] pb-[45px] pt-[15px] px-[15px] relative size-full">
        <Container36 />
        <Container39 />
      </div>
    </div>
  );
}

function Svg9() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="SVG">
          <path d={svgPaths.p26af7780} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex items-center relative self-stretch shrink-0" data-name="Container">
      <Svg9 />
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex h-[22px] items-start justify-center relative shrink-0" data-name="Container">
      <Container42 />
    </div>
  );
}

function Link11() {
  return (
    <div className="bg-black content-stretch flex items-start p-[10px] relative rounded-[21px] shrink-0" data-name="Link">
      <Container41 />
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <Link11 />
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[44px] relative shrink-0 text-[40px] text-center text-white tracking-[-0.8px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">Rock-solid</p>
        <p className="mb-0">security</p>
        <p className="mb-0">protecting your</p>
        <p>trades</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="flex-[1_0_0] min-h-[508.20001220703125px] min-w-px relative rounded-[24px] self-stretch" data-name="Background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[24px]">
        <img alt="" className="absolute h-full left-[-5.28%] max-w-none top-0 w-[110.57%]" src={imgBackground3} />
      </div>
      <div className="content-stretch flex flex-col items-start justify-between min-h-[inherit] pb-[45px] pt-[15px] px-[15px] relative size-full">
        <Container40 />
        <Container43 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex gap-[18px] h-[508.2px] items-start relative shrink-0 w-full" data-name="Container">
      <Background1 />
      <Background2 />
      <Background3 />
      <Background4 />
    </div>
  );
}

function Container26() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[38.99px] items-start px-[57.398px] py-[43.047px] relative w-full">
        <Heading2 />
        <Container27 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#1446b7] text-[48px] text-center tracking-[-0.96px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[52.8px]">Web Trader for Comfortable Forex Trading</p>
      </div>
    </div>
  );
}

function NotebookImageBgPng() {
  return (
    <div className="absolute aspect-[1188.1800537109375/616.8900146484375] left-[5%] right-[5%] top-0" data-name="NotebookImageBG.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgNotebookImageBgPng} />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="h-[616.89px] relative shrink-0 w-full" data-name="Container">
      <NotebookImageBgPng />
    </div>
  );
}

function Container46() {
  return <div className="h-[92px] shrink-0 w-full" data-name="Container" />;
}

function Container49() {
  return <div className="h-[90.3px] shrink-0 w-[95.71px]" data-name="Container" />;
}

function Container50() {
  return <div className="h-[48px] shrink-0 w-[239.29px]" data-name="Container" />;
}

function Container48() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-between min-h-px min-w-px relative self-stretch" data-name="Container">
      <Container49 />
      <Container50 />
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex h-[120.3px] items-start pt-[30px] relative shrink-0 w-full" data-name="Container">
      <Container48 />
    </div>
  );
}

function OverlayOverlayBlur() {
  return (
    <div className="backdrop-blur-[12.5px] bg-[rgba(242,245,251,0.5)] flex-[1_0_0] h-full min-h-px min-w-px opacity-0 relative rounded-[24px]" data-name="Overlay+OverlayBlur">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center justify-between pb-[25px] pt-[45px] px-[30px] relative size-full">
          <Container46 />
          <Container47 />
        </div>
      </div>
    </div>
  );
}

function Listitem4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[414px]" data-name="Listitem - 4 / 4">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center p-[2px] relative size-full">
          <OverlayOverlayBlur />
        </div>
      </div>
    </div>
  );
}

function Listitem44Margin() {
  return (
    <div className="content-stretch flex flex-col h-full items-start justify-center pr-[30px] relative shrink-0 w-[444px]" data-name="Listitem - 4 / 4:margin">
      <Listitem4 />
    </div>
  );
}

function Container51() {
  return <div className="h-[70px] shrink-0 w-full" data-name="Container" />;
}

function Container54() {
  return <div className="h-[90.3px] shrink-0 w-[95.71px]" data-name="Container" />;
}

function Container55() {
  return <div className="h-[48px] shrink-0 w-[239.29px]" data-name="Container" />;
}

function Container53() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-between min-h-px min-w-px relative self-stretch" data-name="Container">
      <Container54 />
      <Container55 />
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex h-[120.3px] items-start pt-[30px] relative shrink-0 w-full" data-name="Container">
      <Container53 />
    </div>
  );
}

function OverlayOverlayBlur1() {
  return (
    <div className="backdrop-blur-[12.5px] bg-[rgba(242,245,251,0.5)] flex-[1_0_0] h-full min-h-px min-w-px opacity-0 relative rounded-[24px]" data-name="Overlay+OverlayBlur">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center justify-between pb-[25px] pt-[45px] px-[30px] relative size-full">
          <Container51 />
          <Container52 />
        </div>
      </div>
    </div>
  );
}

function Listitem() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[414px]" data-name="Listitem - 1 / 4">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center p-[2px] relative size-full">
          <OverlayOverlayBlur1 />
        </div>
      </div>
    </div>
  );
}

function Listitem14Margin() {
  return (
    <div className="content-stretch flex flex-col h-full items-start justify-center pr-[30px] relative shrink-0 w-[444px]" data-name="Listitem - 1 / 4:margin">
      <Listitem />
    </div>
  );
}

function Container56() {
  return <div className="h-[70px] shrink-0 w-full" data-name="Container" />;
}

function Container59() {
  return <div className="h-[90.3px] shrink-0 w-[95.71px]" data-name="Container" />;
}

function Container60() {
  return <div className="h-[48px] shrink-0 w-[239.29px]" data-name="Container" />;
}

function Container58() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-between min-h-px min-w-px relative self-stretch" data-name="Container">
      <Container59 />
      <Container60 />
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex h-[120.3px] items-start pt-[30px] relative shrink-0 w-full" data-name="Container">
      <Container58 />
    </div>
  );
}

function OverlayOverlayBlur2() {
  return (
    <div className="backdrop-blur-[12.5px] bg-[rgba(242,245,251,0.5)] flex-[1_0_0] h-full min-h-px min-w-px opacity-0 relative rounded-[24px]" data-name="Overlay+OverlayBlur">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center justify-between pb-[25px] pt-[45px] px-[30px] relative size-full">
          <Container56 />
          <Container57 />
        </div>
      </div>
    </div>
  );
}

function Listitem2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[414px]" data-name="Listitem - 2 / 4">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center p-[2px] relative size-full">
          <OverlayOverlayBlur2 />
        </div>
      </div>
    </div>
  );
}

function Listitem24Margin() {
  return (
    <div className="content-stretch flex flex-col h-full items-start justify-center pr-[30px] relative shrink-0 w-[444px]" data-name="Listitem - 2 / 4:margin">
      <Listitem2 />
    </div>
  );
}

function Container61() {
  return <div className="h-[70px] shrink-0 w-full" data-name="Container" />;
}

function Container64() {
  return <div className="h-[90.3px] shrink-0 w-[95.71px]" data-name="Container" />;
}

function Container65() {
  return <div className="h-[48px] shrink-0 w-[239.29px]" data-name="Container" />;
}

function Container63() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-between min-h-px min-w-px relative self-stretch" data-name="Container">
      <Container64 />
      <Container65 />
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex h-[120.3px] items-start pt-[30px] relative shrink-0 w-full" data-name="Container">
      <Container63 />
    </div>
  );
}

function OverlayOverlayBlur3() {
  return (
    <div className="backdrop-blur-[12.5px] bg-[rgba(242,245,251,0.5)] flex-[1_0_0] h-full min-h-px min-w-px opacity-0 relative rounded-[24px]" data-name="Overlay+OverlayBlur">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center justify-between pb-[25px] pt-[45px] px-[30px] relative size-full">
          <Container61 />
          <Container62 />
        </div>
      </div>
    </div>
  );
}

function Listitem3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[414px]" data-name="Listitem - 3 / 4">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center p-[2px] relative size-full">
          <OverlayOverlayBlur3 />
        </div>
      </div>
    </div>
  );
}

function Listitem34Margin() {
  return (
    <div className="content-stretch flex flex-col h-full items-start justify-center pr-[30px] relative shrink-0 w-[444px]" data-name="Listitem - 3 / 4:margin">
      <Listitem3 />
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[22px] relative shrink-0 text-[28px] text-black tracking-[-0.56px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">Trading forex with LPL-Holdings</p>
        <p className="mb-0">Securities feels secure and</p>
        <p>{`transparent. `}</p>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[26px] relative shrink-0 w-full" data-name="Container">
      <Container67 />
    </div>
  );
}

function Image1() {
  return (
    <div className="h-[63px] relative shrink-0 w-[82px]" data-name="image">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 82 63">
        <g clipPath="url(#clip0_4017_1159)" id="image">
          <path d={svgPaths.p1436ff00} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p1edb15c0} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_4017_1159">
            <rect fill="white" height="63" width="82" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ImageFill() {
  return (
    <div className="content-stretch flex flex-col h-[63px] items-center justify-center overflow-clip relative shrink-0 w-[82px]" data-name="image fill">
      <Image1 />
    </div>
  );
}

function Image() {
  return (
    <div className="absolute content-stretch flex flex-col h-[63px] items-start left-[30px] top-[-28.22px] w-[82px]" data-name="Image">
      <ImageFill />
    </div>
  );
}

function SlideImage() {
  return (
    <div className="max-w-[95.70999908447266px] relative rounded-[50px] shrink-0 size-[75px]" data-name="Slide Image">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[50px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgSlideImage} />
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15.3px] relative shrink-0 w-[95.71px]" data-name="Container">
      <SlideImage />
    </div>
  );
}

function Container72() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[24px] text-black w-full">
        <p className="leading-[24px]">Emma Clarke</p>
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#4572c4] text-[16px] w-full">
        <p className="leading-[16px]">Seasoned Trader</p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[239.29px]" data-name="Container">
      <Container72 />
      <Container73 />
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-between min-h-px min-w-px relative self-stretch" data-name="Container">
      <Container70 />
      <Container71 />
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex items-start pt-[30px] relative shrink-0 w-full" data-name="Container">
      <Container69 />
      <div className="absolute bg-[rgba(166,166,166,0.4)] h-px left-[-30px] top-0 w-[410px]" data-name="Horizontal Divider" />
    </div>
  );
}

function OverlayShadowOverlayBlur() {
  return (
    <div className="backdrop-blur-[12.5px] bg-[rgba(242,245,251,0.5)] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" data-name="Overlay+Shadow+OverlayBlur">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center justify-between pb-[25px] pt-[45px] px-[30px] relative size-full">
          <Container66 />
          <div className="absolute bg-gradient-to-r from-white inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0%_0%] mask-size-[100%_100%] rounded-[24px] to-[rgba(255,255,255,0)]" data-name="Gradient" style={{ maskImage: `url('${imgGradient}')` }} />
          <Image />
          <Container68 />
        </div>
      </div>
    </div>
  );
}

function Listitem5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[414px]" data-name="Listitem - 4 / 4">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center p-[2px] relative size-full">
          <OverlayShadowOverlayBlur />
        </div>
      </div>
    </div>
  );
}

function Listitem44Margin1() {
  return (
    <div className="content-stretch flex flex-col h-full items-start justify-center pr-[30px] relative shrink-0 w-[444px]" data-name="Listitem - 4 / 4:margin">
      <Listitem5 />
    </div>
  );
}

function Container74() {
  return <div className="h-[70px] shrink-0 w-full" data-name="Container" />;
}

function Container77() {
  return <div className="h-[90.3px] shrink-0 w-[95.71px]" data-name="Container" />;
}

function Container78() {
  return <div className="h-[48px] shrink-0 w-[239.29px]" data-name="Container" />;
}

function Container76() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-between min-h-px min-w-px relative self-stretch" data-name="Container">
      <Container77 />
      <Container78 />
    </div>
  );
}

function Container75() {
  return (
    <div className="content-stretch flex h-[120.3px] items-start pt-[30px] relative shrink-0 w-full" data-name="Container">
      <Container76 />
    </div>
  );
}

function OverlayOverlayBlur4() {
  return (
    <div className="backdrop-blur-[12.5px] bg-[rgba(242,245,251,0.5)] flex-[1_0_0] h-full min-h-px min-w-px opacity-0 relative rounded-[24px]" data-name="Overlay+OverlayBlur">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center justify-between pb-[25px] pt-[45px] px-[30px] relative size-full">
          <Container74 />
          <Container75 />
        </div>
      </div>
    </div>
  );
}

function Listitem1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[414px]" data-name="Listitem - 1 / 4">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center p-[2px] relative size-full">
          <OverlayOverlayBlur4 />
        </div>
      </div>
    </div>
  );
}

function Listitem14Margin1() {
  return (
    <div className="content-stretch flex flex-col h-full items-start justify-center pr-[30px] relative shrink-0 w-[444px]" data-name="Listitem - 1 / 4:margin">
      <Listitem1 />
    </div>
  );
}

function List2() {
  return (
    <div className="absolute content-stretch flex inset-[30px_-444.45px_160.12px_-1746px] items-start" data-name="List">
      <Listitem44Margin />
      <Listitem14Margin />
      <Listitem24Margin />
      <Listitem34Margin />
      <Listitem44Margin1 />
      <Listitem14Margin1 />
    </div>
  );
}

function Container80() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start relative shrink-0 w-[10.27px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1446b7] text-[10px] whitespace-nowrap">
        <p className="leading-[20px]">prev</p>
      </div>
    </div>
  );
}

function ButtonPreviousSlide() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[30px] shrink-0 size-[60px]" data-name="Button - Previous slide">
      <Container80 />
    </div>
  );
}

function ButtonPreviousSlideMargin() {
  return (
    <div className="content-stretch flex flex-col h-[60px] items-start pr-[50px] relative shrink-0 w-[110px]" data-name="Button - Previous slide:margin">
      <ButtonPreviousSlide />
    </div>
  );
}

function ButtonGoToSlide1Margin() {
  return (
    <div className="content-stretch flex flex-col h-[16px] items-start px-[5px] relative shrink-0 w-[26px]" data-name="Button - Go to slide 1:margin">
      <div className="bg-[rgba(166,166,166,0.4)] rounded-[8px] shrink-0 size-[16px]" data-name="Button - Go to slide 1" />
    </div>
  );
}

function ButtonGoToSlide2Margin() {
  return (
    <div className="content-stretch flex flex-col h-[16px] items-start px-[5px] relative shrink-0 w-[26px]" data-name="Button - Go to slide 2:margin">
      <div className="bg-[rgba(166,166,166,0.4)] rounded-[8px] shrink-0 size-[16px]" data-name="Button - Go to slide 2" />
    </div>
  );
}

function ButtonGoToSlide3Margin() {
  return (
    <div className="content-stretch flex flex-col h-[16px] items-start px-[5px] relative shrink-0 w-[26px]" data-name="Button - Go to slide 3:margin">
      <div className="bg-[rgba(166,166,166,0.4)] rounded-[8px] shrink-0 size-[16px]" data-name="Button - Go to slide 3" />
    </div>
  );
}

function ButtonGoToSlide4Margin() {
  return (
    <div className="content-stretch flex flex-col h-[16px] items-start px-[5px] relative shrink-0 w-[26px]" data-name="Button - Go to slide 4:margin">
      <div className="bg-[#1446b7] rounded-[8px] shrink-0 size-[16px]" data-name="Button - Go to slide 4" />
    </div>
  );
}

function Container81() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Container">
      <ButtonGoToSlide1Margin />
      <ButtonGoToSlide2Margin />
      <ButtonGoToSlide3Margin />
      <ButtonGoToSlide4Margin />
    </div>
  );
}

function Container82() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start relative shrink-0 w-[10.27px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1446b7] text-[10px] whitespace-nowrap">
        <p className="leading-[20px]">next</p>
      </div>
    </div>
  );
}

function ButtonNextSlide() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[30px] shrink-0 size-[60px]" data-name="Button - Next slide">
      <Container82 />
    </div>
  );
}

function ButtonNextSlideMargin() {
  return (
    <div className="content-stretch flex flex-col h-[60px] items-start pl-[50px] relative shrink-0 w-[110px]" data-name="Button - Next slide:margin">
      <ButtonNextSlide />
    </div>
  );
}

function Container79() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[30px] right-[30px] top-[366.3px]" data-name="Container">
      <ButtonPreviousSlideMargin />
      <Container81 />
      <ButtonNextSlideMargin />
    </div>
  );
}

function Section() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px overflow-clip relative w-full" data-name="Section">
      <List2 />
      <Container79 />
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[10%_65%_30.08%_2%] items-start justify-center max-w-[1440px]" data-name="Container">
      <Section />
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="absolute inset-[0_0_0.1px_0]" data-name="Mask Group">
      <div className="absolute bg-gradient-to-r from-white inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0%_0%] mask-size-[100%_100%] rounded-[24px] to-[rgba(255,255,255,0)]" data-name="Gradient" style={{ maskImage: `url('${imgGradient1}')` }} />
    </div>
  );
}

function Container84() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[37.8px] relative shrink-0 text-[28px] text-black tracking-[-0.56px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">Designed for comfort and</p>
        <p className="mb-0">efficiency, our web trader</p>
        <p className="mb-0">keeps you connected to the</p>
        <p className="mb-0">markets whenever you</p>
        <p>need.</p>
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[32px] text-white tracking-[-0.64px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[43.2px]">Start Trading</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px overflow-clip relative w-[27px]" data-name="Frame">
      <div className="absolute inset-[28.49%_6.25%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.625 11.6128">
          <path d={svgPaths.p1f957100} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Svg10() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0 size-[27px]" data-name="SVG">
      <Frame1 />
    </div>
  );
}

function SvgMargin1() {
  return (
    <div className="content-stretch flex flex-col h-[27px] items-start pl-[12px] relative shrink-0 w-[39px]" data-name="SVG:margin">
      <Svg10 />
    </div>
  );
}

function Link12() {
  return (
    <div className="bg-black content-stretch flex gap-[0.01px] items-center px-[34px] py-[15px] relative rounded-[15px] shrink-0" data-name="Link">
      <Container86 />
      <SvgMargin1 />
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link12 />
    </div>
  );
}

function Container83() {
  return (
    <div className="content-stretch flex flex-col gap-[90.01px] items-start relative shrink-0 w-full" data-name="Container">
      <Container84 />
      <Container85 />
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(242,245,251,0.5)] relative rounded-[24px] shrink-0 w-full" data-name="Overlay">
      <div className="content-stretch flex flex-col items-start p-[35px] relative w-full">
        <Container83 />
      </div>
    </div>
  );
}

function OverlayBlur() {
  return (
    <div className="absolute backdrop-blur-[12.5px] content-stretch flex flex-col inset-[36.87%_4%_10.01%_68%] items-start max-w-[1440px]" data-name="OverlayBlur">
      <MaskGroup />
      <Overlay />
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-gradient-to-t from-[#638edf] min-h-[726px] relative shrink-0 to-white w-full" data-name="Background">
      <div className="content-stretch flex flex-col gap-[39px] items-start min-h-[inherit] px-[57.398px] py-[43.047px] relative w-full">
        <Heading3 />
        <Container44 />
        <Container45 />
        <OverlayBlur />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[48px] text-black text-center tracking-[-0.96px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[52.8px]">Empower Your Forex Journey with LPL-Holdings</p>
      </div>
    </div>
  );
}

function DataSecurityLockingAFolderPng() {
  return (
    <div className="h-[155.3px] max-w-[166.47999572753906px] relative shrink-0 w-[166.48px]" data-name="Data-security-locking-a-folder.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgDataSecurityLockingAFolderPng} />
      </div>
    </div>
  );
}

function Figure() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Figure">
      <DataSecurityLockingAFolderPng />
    </div>
  );
}

function FigureMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[10px] relative shrink-0 w-[176.48px]" data-name="Figure:margin">
      <Figure />
    </div>
  );
}

function Container91() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[44px] relative shrink-0 text-[40px] text-black tracking-[-0.8px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">Educational</p>
        <p>Resources</p>
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[37.8px] relative shrink-0 text-[28px] text-black tracking-[-0.56px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">Stay sharp with our</p>
        <p className="mb-0">comprehensive learning materials</p>
        <p className="mb-0">— from beginner guides to</p>
        <p className="mb-0">advanced strategies, webinars,</p>
        <p className="mb-0">and market analysis that help you</p>
        <p>grow your skills and confidence.</p>
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[416.22px]" data-name="Container">
      <Container91 />
      <Container92 />
    </div>
  );
}

function Container89() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Container">
      <FigureMargin />
      <Container90 />
    </div>
  );
}

function BackgroundShadow() {
  return (
    <div className="absolute bg-[#f2f5fb] content-stretch flex flex-col inset-[0_612.71px_414.78px_0] items-start py-[30px] rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" data-name="Background+Shadow">
      <Container89 />
    </div>
  );
}

function Container93() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[44px] relative shrink-0 text-[40px] text-black tracking-[-0.8px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">Seamless Multi-Device</p>
        <p>Access</p>
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[37.8px] relative shrink-0 text-[28px] text-black tracking-[-0.56px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">Access your trading account</p>
        <p className="mb-0">securely from any device with a</p>
        <p className="mb-0">web browser — enjoy consistent</p>
        <p className="mb-0">performance and full functionality</p>
        <p className="mb-0">whether at your desk or on the</p>
        <p>move.</p>
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[592.7000122070312px] pb-[14.4px] relative shrink-0 w-[399.52px]" data-name="Container">
      <Container95 />
    </div>
  );
}

function Container99() {
  return (
    <div className="content-stretch flex flex-col items-center relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[22px] text-center text-white tracking-[-0.44px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[43.2px]">Start Trading</p>
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="content-stretch flex h-[44px] items-start justify-center relative shrink-0" data-name="Container">
      <Container99 />
    </div>
  );
}

function Link13() {
  return (
    <div className="bg-black content-stretch flex items-start pb-[10px] pt-[9.25px] px-[10px] relative rounded-[15px] shrink-0" data-name="Link">
      <Container98 />
    </div>
  );
}

function Container97() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center min-h-px min-w-px relative" data-name="Container">
      <Link13 />
    </div>
  );
}

function PhoneWithAFinancialGrowthGraphPng() {
  return (
    <div className="max-w-[246.35000610351562px] relative shrink-0 size-[246.35px]" data-name="Phone-with-a-financial-growth-graph.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgPhoneWithAFinancialGrowthGraphPng} />
      </div>
    </div>
  );
}

function Container100() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Container">
      <PhoneWithAFinancialGrowthGraphPng />
    </div>
  );
}

function Container96() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[40px] items-end min-h-px min-w-px relative w-full" data-name="Container">
      <Container97 />
      <Container100 />
    </div>
  );
}

function BackgroundShadow1() {
  return (
    <div className="absolute bg-[#f2f5fb] content-stretch flex flex-col gap-[20px] inset-[0_0.01px_0_612.7px] items-start p-[30px] rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.5)]" data-name="Background+Shadow">
      <Container93 />
      <Container94 />
      <Container96 />
    </div>
  );
}

function Container103() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[44px] relative shrink-0 text-[40px] text-black tracking-[-0.8px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">Flexible Account</p>
        <p>Options</p>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[37.8px] relative shrink-0 text-[28px] text-black tracking-[-0.56px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">Choose the account type that fits</p>
        <p className="mb-0">your trading style and goals, with</p>
        <p className="mb-0">competitive spreads, tailored</p>
        <p className="mb-0">leverage, and transparent fee</p>
        <p className="mb-0">structures designed to support</p>
        <p>traders at every level.</p>
      </div>
    </div>
  );
}

function Container102() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[394.79px] z-[2]" data-name="Container">
      <Container103 />
      <Container104 />
    </div>
  );
}

function AiPoweredChatbotForCustomerSupportPng() {
  return (
    <div className="h-[147.86px] max-w-[157.91000366210938px] relative shrink-0 w-[157.91px]" data-name="AI-powered-chatbot-for-customer-support.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgAiPoweredChatbotForCustomerSupportPng} />
      </div>
    </div>
  );
}

function Figure1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Figure">
      <AiPoweredChatbotForCustomerSupportPng />
    </div>
  );
}

function FigureMargin1() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[10px] relative shrink-0 w-[167.91px] z-[1]" data-name="Figure:margin">
      <Figure1 />
    </div>
  );
}

function Container101() {
  return (
    <div className="content-stretch flex isolate items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Container102 />
      <FigureMargin1 />
    </div>
  );
}

function BackgroundShadow2() {
  return (
    <div className="absolute bg-[#f2f5fb] content-stretch flex flex-col inset-[414.78px_612.71px_0_0] items-start pl-[30px] py-[30px] rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" data-name="Background+Shadow">
      <Container101 />
    </div>
  );
}

function Container88() {
  return (
    <div className="h-[809.56px] relative shrink-0 w-full" data-name="Container">
      <BackgroundShadow />
      <BackgroundShadow1 />
      <BackgroundShadow2 />
    </div>
  );
}

function Container87() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[20px] items-start pb-[86.097px] pt-[43.047px] px-[114.797px] relative w-full">
        <Heading4 />
        <Container88 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[286.35px]" data-name="Heading 1">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[128px] text-black tracking-[-3.84px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[121.6px]">FAQ</p>
      </div>
    </div>
  );
}

function Container107() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1f2124] text-[24px] tracking-[0.18px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[36px]">What is Forex trading?</p>
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="content-stretch flex h-[36px] items-start relative shrink-0" data-name="Container">
      <Container107 />
    </div>
  );
}

function Svg11() {
  return (
    <div className="h-[17px] relative shrink-0 w-[14px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 17">
        <g id="SVG">
          <path d={svgPaths.pc118340} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-white content-stretch flex items-start p-[10px] relative rounded-[17px] shrink-0 size-[34px]" data-name="Background">
      <Svg11 />
    </div>
  );
}

function SlotSummary() {
  return (
    <div className="mb-[-0.605px] relative shrink-0 w-full" data-name="Slot → Summary">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[42px] py-[29px] relative w-full">
          <Container106 />
          <Background6 />
        </div>
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[24.3px] relative shrink-0 text-[18px] text-black tracking-[-0.36px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">Forex trading involves buying and selling currencies to profit from changes in their exchange rates. It’s the</p>
        <p>largest financial market in the world, operating 24 hours a day during weekdays.</p>
      </div>
    </div>
  );
}

function SlotRegion() {
  return (
    <div className="mb-[-0.605px] relative shrink-0 w-full" data-name="Slot → Region">
      <div className="content-stretch flex flex-col items-start pb-[43.4px] px-[42px] relative w-full">
        <Container108 />
      </div>
    </div>
  );
}

function Details() {
  return (
    <div className="bg-[#f2f5fb] content-stretch flex flex-col items-start pb-[0.605px] relative rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="Details">
      <SlotSummary />
      <SlotRegion />
    </div>
  );
}

function Container110() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[24px] text-black tracking-[0.18px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[36px]">How do I start trading Forex with LPL-Holdings?</p>
      </div>
    </div>
  );
}

function Container109() {
  return (
    <div className="content-stretch flex h-[36px] items-start relative shrink-0" data-name="Container">
      <Container110 />
    </div>
  );
}

function Svg12() {
  return (
    <div className="h-[17px] relative shrink-0 w-[14px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 17">
        <g id="SVG">
          <path d={svgPaths.p29582a80} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-black content-stretch flex items-start p-[10px] relative rounded-[17px] shrink-0 size-[34px]" data-name="Background">
      <Svg12 />
    </div>
  );
}

function SlotSummary1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Slot → Summary">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[42px] py-[29px] relative w-full">
          <Container109 />
          <Background7 />
        </div>
      </div>
    </div>
  );
}

function Details1() {
  return (
    <div className="bg-[#f2f5fb] content-stretch flex flex-col items-start relative rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="Details">
      <SlotSummary1 />
    </div>
  );
}

function Container112() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[24px] text-black tracking-[0.18px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[36px]">What currencies can I trade on LPL-Holdings?</p>
      </div>
    </div>
  );
}

function Container111() {
  return (
    <div className="content-stretch flex h-[36px] items-start relative shrink-0" data-name="Container">
      <Container112 />
    </div>
  );
}

function Svg13() {
  return (
    <div className="h-[17px] relative shrink-0 w-[14px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 17">
        <g id="SVG">
          <path d={svgPaths.p29582a80} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-black content-stretch flex items-start p-[10px] relative rounded-[17px] shrink-0 size-[34px]" data-name="Background">
      <Svg13 />
    </div>
  );
}

function SlotSummary2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Slot → Summary">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[42px] py-[29px] relative w-full">
          <Container111 />
          <Background8 />
        </div>
      </div>
    </div>
  );
}

function Details2() {
  return (
    <div className="bg-[#f2f5fb] content-stretch flex flex-col items-start relative rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="Details">
      <SlotSummary2 />
    </div>
  );
}

function Container114() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[24px] text-black tracking-[0.18px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[36px]">Is there a minimum deposit required to start trading?</p>
      </div>
    </div>
  );
}

function Container113() {
  return (
    <div className="content-stretch flex h-[36px] items-start relative shrink-0" data-name="Container">
      <Container114 />
    </div>
  );
}

function Svg14() {
  return (
    <div className="h-[17px] relative shrink-0 w-[14px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 17">
        <g id="SVG">
          <path d={svgPaths.p29582a80} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-black content-stretch flex items-start p-[10px] relative rounded-[17px] shrink-0 size-[34px]" data-name="Background">
      <Svg14 />
    </div>
  );
}

function SlotSummary3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Slot → Summary">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[42px] py-[29px] relative w-full">
          <Container113 />
          <Background9 />
        </div>
      </div>
    </div>
  );
}

function Details3() {
  return (
    <div className="bg-[#f2f5fb] content-stretch flex flex-col items-start relative rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="Details">
      <SlotSummary3 />
    </div>
  );
}

function Container116() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[24px] text-black tracking-[0.18px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[36px]">Can I practice Forex trading before investing real money?</p>
      </div>
    </div>
  );
}

function Container115() {
  return (
    <div className="content-stretch flex h-[36px] items-start relative shrink-0" data-name="Container">
      <Container116 />
    </div>
  );
}

function Svg15() {
  return (
    <div className="h-[17px] relative shrink-0 w-[14px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 17">
        <g id="SVG">
          <path d={svgPaths.p29582a80} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Background10() {
  return (
    <div className="bg-black content-stretch flex items-start p-[10px] relative rounded-[17px] shrink-0 size-[34px]" data-name="Background">
      <Svg15 />
    </div>
  );
}

function SlotSummary4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Slot → Summary">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[42px] py-[29px] relative w-full">
          <Container115 />
          <Background10 />
        </div>
      </div>
    </div>
  );
}

function Details4() {
  return (
    <div className="bg-[#f2f5fb] content-stretch flex flex-col items-start relative rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="Details">
      <SlotSummary4 />
    </div>
  );
}

function AccordionOpenLinksWithEnterOrSpaceCloseWithEscapeAndNavigateWithArrowKeys() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-[899.05px]" data-name="Accordion. Open links with Enter or Space, close with Escape, and navigate with Arrow Keys">
      <Details />
      <Details1 />
      <Details2 />
      <Details3 />
      <Details4 />
    </div>
  );
}

function Container105() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-[1205.41px]" data-name="Container">
      <Heading5 />
      <AccordionOpenLinksWithEnterOrSpaceCloseWithEscapeAndNavigateWithArrowKeys />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[43.05px] relative shrink-0 w-full" data-name="Container">
      <Background />
      <Container13 />
      <Container26 />
      <Background5 />
      <Container87 />
      <Container105 />
    </div>
  );
}

function DefaultLogo1() {
  return (
    <div className="h-[79.82px] max-w-[215.47999572753906px] relative shrink-0 w-[215.46px]" data-name="default-logo">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-[100.01%] top-0" src={imgDefaultLogo} />
      </div>
    </div>
  );
}

function Container119() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[6.5px] relative shrink-0 w-full" data-name="Container">
      <DefaultLogo1 />
    </div>
  );
}

function Link14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Link">
      <Container119 />
    </div>
  );
}

function Container118() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[0_989.93px_192px_0] items-start" data-name="Container">
      <Link14 />
    </div>
  );
}

function Container121() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[32px] text-black tracking-[0.18px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[48px]">Resources</p>
      </div>
    </div>
  );
}

function Link15() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-[1_0_0] flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px relative text-[16px] text-black tracking-[0.15px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[24px]">Privacy Policy</p>
      </div>
    </div>
  );
}

function Container123() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link15 />
    </div>
  );
}

function Link16() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-[1_0_0] flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px relative text-[16px] text-black tracking-[0.15px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[24px]">Risk Warnings Document</p>
      </div>
    </div>
  );
}

function Container124() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link16 />
    </div>
  );
}

function Link17() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-[1_0_0] flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px relative text-[16px] text-black tracking-[0.15px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[24px]">Terms and Conditions</p>
      </div>
    </div>
  );
}

function Container125() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link17 />
    </div>
  );
}

function Link18() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-[1_0_0] flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px relative text-[16px] text-black tracking-[0.15px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[24px]">Investment Agreement</p>
      </div>
    </div>
  );
}

function Container126() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link18 />
    </div>
  );
}

function Container122() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pb-[16px] relative shrink-0 w-full" data-name="Container">
      <Container123 />
      <Container124 />
      <Container125 />
      <Container126 />
    </div>
  );
}

function Container120() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] inset-[0_742.46px_192px_247.47px] items-start" data-name="Container">
      <Container121 />
      <Container122 />
    </div>
  );
}

function Container128() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[32px] text-black tracking-[0.18px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[48px]">Pricing</p>
      </div>
    </div>
  );
}

function Link19() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-[1_0_0] flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px relative text-[16px] text-black tracking-[0.15px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[24px]">All plans</p>
      </div>
    </div>
  );
}

function Container130() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link19 />
    </div>
  );
}

function Link20() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-[1_0_0] flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px relative text-[16px] text-black tracking-[0.15px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[24px]">Gold</p>
      </div>
    </div>
  );
}

function Container131() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link20 />
    </div>
  );
}

function Link21() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-[1_0_0] flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px relative text-[16px] text-black tracking-[0.15px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[24px]">VIP</p>
      </div>
    </div>
  );
}

function Container132() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link21 />
    </div>
  );
}

function Container129() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pb-[16px] relative shrink-0 w-full" data-name="Container">
      <Container130 />
      <Container131 />
      <Container132 />
    </div>
  );
}

function Container127() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] inset-[0_494.97px_192px_494.96px] items-start" data-name="Container">
      <Container128 />
      <Container129 />
    </div>
  );
}

function Container134() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[32px] text-black tracking-[0.18px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[48px]">Platform</p>
      </div>
    </div>
  );
}

function Link22() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-[1_0_0] flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px relative text-[16px] text-black tracking-[0.15px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[24px]">Web-Trader</p>
      </div>
    </div>
  );
}

function Container136() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link22 />
    </div>
  );
}

function Container135() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0 w-full" data-name="Container">
      <Container136 />
    </div>
  );
}

function Container133() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] inset-[0_247.5px_192px_742.43px] items-start" data-name="Container">
      <Container134 />
      <Container135 />
    </div>
  );
}

function Container138() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[32px] text-black tracking-[0.18px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[48px]">Trade</p>
      </div>
    </div>
  );
}

function Link23() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-[1_0_0] flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px relative text-[16px] text-black tracking-[0.15px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[24px]">Futures contracts</p>
      </div>
    </div>
  );
}

function Container140() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link23 />
    </div>
  );
}

function Link24() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-[1_0_0] flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px relative text-[16px] text-black tracking-[0.15px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[24px]">Raw Materials</p>
      </div>
    </div>
  );
}

function Container141() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link24 />
    </div>
  );
}

function Link25() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-[1_0_0] flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px relative text-[16px] text-black tracking-[0.15px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[24px]">Actions</p>
      </div>
    </div>
  );
}

function Container142() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link25 />
    </div>
  );
}

function Link26() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-[1_0_0] flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px relative text-[16px] text-black tracking-[0.15px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[24px]">Cryptocurrency CFDs</p>
      </div>
    </div>
  );
}

function Container143() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link26 />
    </div>
  );
}

function Link27() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-[1_0_0] flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px relative text-[16px] text-black tracking-[0.15px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[24px]">Indices</p>
      </div>
    </div>
  );
}

function Container144() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link27 />
    </div>
  );
}

function Container139() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pb-[16px] relative shrink-0 w-full" data-name="Container">
      <Container140 />
      <Container141 />
      <Container142 />
      <Container143 />
      <Container144 />
    </div>
  );
}

function Container137() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] inset-[0_0.01px_192px_989.92px] items-start" data-name="Container">
      <Container138 />
      <Container139 />
    </div>
  );
}

function Container146() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[32px] relative shrink-0 text-[20px] text-black tracking-[0.15px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">The company operates under the name: LPL-Holdings</p>
        <p className="mb-0">Securities</p>
        <p className="mb-0">Legal address: 751 BROAD STREET</p>
        <p className="mb-0">NEWARK, NJ 07102-3777 UNITED STATES</p>
        <p>( CRD # 5685/SEC#:801-52208,8-16402 )</p>
      </div>
    </div>
  );
}

function Container145() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[296px_742.45px_0_0] items-start" data-name="Container">
      <Container146 />
    </div>
  );
}

function USSecuritiesAndExchangeCommissionPng() {
  return (
    <div className="h-[35.7px] max-w-[140.97999572753906px] relative shrink-0 w-[140.98px]" data-name="u-s_securities_and_exchange_commission.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[99.99%] left-0 max-w-none top-0 w-full" src={imgUSSecuritiesAndExchangeCommissionPng} />
      </div>
    </div>
  );
}

function Link28() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0" data-name="Link">
      <USSecuritiesAndExchangeCommissionPng />
    </div>
  );
}

function Container148() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[5.96px] relative shrink-0 w-[140.98px]" data-name="Container">
      <Link28 />
    </div>
  );
}

function BrokercheckPng() {
  return (
    <div className="h-[72.09px] max-w-[140.97999572753906px] relative shrink-0 w-[140.98px]" data-name="brokercheck.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgBrokercheckPng} />
      </div>
    </div>
  );
}

function Link29() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0" data-name="Link">
      <BrokercheckPng />
    </div>
  );
}

function Container149() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[140.98px]" data-name="Container">
      <Link29 />
    </div>
  );
}

function LeiLookupSvg1() {
  return (
    <div className="h-[30px] relative shrink-0 w-[118px]" data-name="LEILookup.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 118 30">
        <g clipPath="url(#clip0_4013_1062)" id="LEILookup.svg">
          <path d={svgPaths.pec20b80} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p21452680} fill="var(--fill-0, black)" id="Vector_2" />
          <path d={svgPaths.p39f284f2} fill="var(--fill-0, black)" id="Vector_3" />
          <path d={svgPaths.p3760cd80} fill="var(--fill-0, black)" id="Vector_4" />
          <path d={svgPaths.p3cc73900} fill="var(--fill-0, black)" id="Vector_5" />
          <path d={svgPaths.p333ba580} fill="var(--fill-0, black)" id="Vector_6" />
          <path d={svgPaths.p92f4800} fill="var(--fill-0, black)" id="Vector_7" />
          <path d={svgPaths.p1ea53d00} fill="var(--fill-0, black)" id="Vector_8" />
          <path d={svgPaths.p2d21a7c0} fill="var(--fill-0, black)" id="Vector_9" />
          <path d={svgPaths.p1e76b500} fill="var(--fill-0, black)" id="Vector_10" />
          <path d={svgPaths.p96bfe00} fill="var(--fill-0, black)" id="Vector_11" />
          <path d={svgPaths.p18baf00} fill="var(--fill-0, black)" id="Vector_12" />
          <path d={svgPaths.p1f2ffa00} fill="var(--fill-0, black)" id="Vector_13" />
          <path d={svgPaths.p19b5600} fill="var(--fill-0, black)" id="Vector_14" />
          <path d={svgPaths.p36d82180} fill="var(--fill-0, black)" id="Vector_15" />
          <path d={svgPaths.p6159900} fill="var(--fill-0, black)" id="Vector_16" />
          <path d={svgPaths.p32f3f680} fill="var(--fill-0, black)" id="Vector_17" />
          <path d={svgPaths.p19586500} fill="var(--fill-0, black)" id="Vector_18" />
          <path d={svgPaths.p255dcf00} fill="var(--fill-0, black)" id="Vector_19" />
          <path d={svgPaths.p76cb600} fill="var(--fill-0, black)" id="Vector_20" />
          <path d={svgPaths.p5929400} fill="var(--fill-0, black)" id="Vector_21" />
          <path d={svgPaths.p2494d680} fill="var(--fill-0, black)" id="Vector_22" />
        </g>
        <defs>
          <clipPath id="clip0_4013_1062">
            <rect fill="white" height="30" width="118" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function LeiLookupSvgFill() {
  return (
    <div className="content-stretch flex flex-col h-[30px] items-center justify-center overflow-clip relative shrink-0 w-[118px]" data-name="LEILookup.svg fill">
      <LeiLookupSvg1 />
    </div>
  );
}

function LeiLookupSvg() {
  return (
    <div className="content-stretch flex items-start max-w-[140.99000549316406px] overflow-clip relative shrink-0" data-name="LEILookup.svg">
      <LeiLookupSvgFill />
    </div>
  );
}

function Link30() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0" data-name="Link">
      <LeiLookupSvg />
    </div>
  );
}

function Container150() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8.81px] relative shrink-0 w-[140.99px]" data-name="Container">
      <Link30 />
    </div>
  );
}

function Container147() {
  return (
    <div className="absolute content-stretch flex gap-[20px] items-center left-[494.96px] right-[247.49px] top-[339.96px]" data-name="Container">
      <Container148 />
      <Container149 />
      <Container150 />
    </div>
  );
}

function Svg16() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p1f18a00} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Link31() {
  return (
    <div className="content-stretch flex items-start p-[13px] relative rounded-[4px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Svg16 />
    </div>
  );
}

function Container152() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Link31 />
    </div>
  );
}

function Container154() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[24px] relative shrink-0 text-[16px] text-black tracking-[0.15px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">support@lpl-holdings.com</p>
        <p>rities.com</p>
      </div>
    </div>
  );
}

function Container153() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <Container154 />
    </div>
  );
}

function Container151() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-center left-[989.92px] right-[0.01px] top-[351px]" data-name="Container">
      <Container152 />
      <Container153 />
    </div>
  );
}

function Container117() {
  return (
    <div className="h-[456px] relative shrink-0 w-full" data-name="Container">
      <Container118 />
      <Container120 />
      <Container127 />
      <Container133 />
      <Container137 />
      <Container145 />
      <Container147 />
      <Container151 />
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-gradient-to-b from-white relative shrink-0 to-[#638edf] w-full" data-name="Footer">
      <div className="content-stretch flex flex-col items-start pb-[71.75px] pt-[43.047px] px-[114.797px] relative w-full">
        <Container117 />
      </div>
    </div>
  );
}

export default function Trade() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Trade">
      <Container />
      <Container5 />
      <Footer />
    </div>
  );
}