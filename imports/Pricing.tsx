import svgPaths from "./svg-qp6i8qtyh4";
import imgDefaultLogo from "figma:asset/636e2f836e77ac426649d6a64c07faf2f12ec20d.png";
import imgPricingMapPng from "figma:asset/434427830302a41b0a19200d33876b0a220ea005.png";
import imgBackgroundShadow from "figma:asset/05d8f12ec66e223b9fd4b7b297b0ab442df243f4.png";
import imgUSSecuritiesAndExchangeCommissionPng from "figma:asset/d81a406b5869ba1614d9a6b5e4a9424e9a5997bb.png";
import imgBrokercheckPng from "figma:asset/adfa9b3ad22d741d74d2bfea301bfe7888fee4ce.png";
import { imgGradient } from "./svg-r9kit";

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
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#4572c4] text-[24px] text-center tracking-[-0.48px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
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
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[24px] text-black text-center tracking-[-0.48px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
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

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[66px] relative shrink-0 text-[60px] text-black tracking-[-1.2px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">Transparent Pricing,</p>
        <p className="mb-0">Tailored for Your</p>
        <p>Success</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[707px]" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[27px] relative shrink-0 text-[20px] text-black tracking-[-0.4px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">At LPL-Holdings, we believe great trading starts with fair, straightforward</p>
        <p className="mb-0">pricing. Whether you’re just getting started or scaling your strategy, our account</p>
        <p className="mb-0">plans are designed to give you more value, not more costs. Compare the options</p>
        <p>below and choose the one that fits your goals—no hidden fees, no surprises.</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start pb-[15px] relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Container9 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[686.32px]" data-name="Container">
      <Container8 />
    </div>
  );
}

function PricingMapPng() {
  return (
    <div className="h-[408.66px] max-w-[450.8800048828125px] relative shrink-0 w-[450.88px]" data-name="PricingMap.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgPricingMapPng} />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-[450.88px]" data-name="Container">
      <PricingMapPng />
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[20px] items-center p-[24.102px] relative w-full">
          <Container7 />
          <Container10 />
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[36px] text-black tracking-[-0.72px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[48.6px]">Upgrade Your Edge</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.8px] pb-[15px] relative shrink-0 w-full" data-name="Container">
      <Container13 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.8px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[37.8px] relative shrink-0 text-[28px] text-black tracking-[-0.56px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">Higher-tier plans unlock premium features</p>
        <p className="mb-0">like advanced analytics, dedicated support,</p>
        <p className="mb-0">and tighter spreads—because your success</p>
        <p>shouldn’t be limited by your account.</p>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[21px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
        <g id="SVG">
          <path d={svgPaths.p6d64170} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Link7() {
  return (
    <div className="bg-black content-stretch flex items-center p-[10px] relative rounded-[100px] shrink-0" data-name="Link">
      <Svg />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-end mb-[-0.8px] pt-[0.79px] relative shrink-0 w-full" data-name="Container">
      <Link7 />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#f2f5fb] flex-[1_0_0] min-h-px min-w-px relative rounded-[30px] w-full" data-name="Background">
      <div className="content-stretch flex flex-col items-start pb-[15.8px] pl-[43px] pr-[15px] pt-[27px] relative size-full">
        <Container12 />
        <Container14 />
        <Container15 />
      </div>
    </div>
  );
}

function OverlayShadow() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative rounded-[30px] self-stretch shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" data-name="Overlay+Shadow">
      <Background1 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[36px] text-black tracking-[-0.72px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[48.6px]">Start Small, Scale Fast</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.8px] pb-[15px] relative shrink-0 w-full" data-name="Container">
      <Container17 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.8px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[37.8px] relative shrink-0 text-[28px] text-black tracking-[-0.56px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">Begin with essentials and upgrade</p>
        <p className="mb-0">seamlessly as your needs evolve. All plans</p>
        <p className="mb-0">include free real-time data and 24/7</p>
        <p>customer support to keep you ahead.</p>
      </div>
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[21px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
        <g id="SVG">
          <path d={svgPaths.p6d64170} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Link8() {
  return (
    <div className="bg-black content-stretch flex items-center p-[10px] relative rounded-[100px] shrink-0" data-name="Link">
      <Svg1 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-end mb-[-0.8px] pt-[0.79px] relative shrink-0 w-full" data-name="Container">
      <Link8 />
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#f2f5fb] flex-[1_0_0] min-h-px min-w-px relative rounded-[30px] w-full" data-name="Background">
      <div className="content-stretch flex flex-col items-start pb-[15.8px] pl-[43px] pr-[15px] pt-[27px] relative size-full">
        <Container16 />
        <Container18 />
        <Container19 />
      </div>
    </div>
  );
}

function OverlayShadow1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative rounded-[30px] self-stretch shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" data-name="Overlay+Shadow">
      <Background2 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex gap-[20px] h-[297.79px] items-start relative shrink-0 w-full" data-name="Container">
      <OverlayShadow />
      <OverlayShadow1 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#1446b7] text-[48px] text-center tracking-[-0.96px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[52.8px]">Choose a plan that meets your goals</p>
      </div>
    </div>
  );
}

function Cell() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[45.43px] pt-[44.77px] px-[20px] relative rounded-tl-[20px] shrink-0 w-[268.52px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid inset-[0_-1px_0_0] pointer-events-none rounded-tl-[20px]" />
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[24px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[26.16px]">LPL-Holdings</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-center mb-[-0.09px] relative shrink-0 w-full" data-name="Container">
      <div className="capitalize flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#503131] text-[44px] text-center tracking-[-0.88px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[46.64px]">$250</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[0.09px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] mb-[-0.09px] relative shrink-0 text-[#4572c4] text-[24px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[26.16px]">Basic</p>
      </div>
      <Container21 />
    </div>
  );
}

function Cell1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[29.4px] pt-[14px] px-[20px] relative shrink-0 w-[135.37px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid inset-[0_-1px_0_0] pointer-events-none" />
      <Container20 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-center mb-[-0.09px] relative shrink-0 w-full" data-name="Container">
      <div className="capitalize flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#503131] text-[44px] text-center tracking-[-0.88px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[46.64px]">$5000</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[0.09px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] mb-[-0.09px] relative shrink-0 text-[#4572c4] text-[24px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[26.16px]">Standard</p>
      </div>
      <Container23 />
    </div>
  );
}

function Cell2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[29.4px] pt-[14px] px-[20px] relative shrink-0 w-[189.27px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid inset-[0_-1px_0_0] pointer-events-none" />
      <Container22 />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-center mb-[-0.09px] relative shrink-0 w-full" data-name="Container">
      <div className="capitalize flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#503131] text-[44px] text-center tracking-[-0.88px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[46.64px]">$25000</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[0.09px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] mb-[-0.09px] relative shrink-0 text-[#4572c4] text-[24px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[26.16px]">Silver</p>
      </div>
      <Container25 />
    </div>
  );
}

function Cell3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[29.4px] pt-[14px] px-[20px] relative shrink-0 w-[198.88px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid inset-[0_-1px_0_0] pointer-events-none" />
      <Container24 />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-center mb-[-0.09px] relative shrink-0 w-full" data-name="Container">
      <div className="capitalize flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#503131] text-[44px] text-center tracking-[-0.88px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[46.64px]">$50000</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[0.09px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] mb-[-0.09px] relative shrink-0 text-[#4572c4] text-[24px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[26.16px]">Gold</p>
      </div>
      <Container27 />
    </div>
  );
}

function Cell4() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[29.4px] pt-[14px] px-[20px] relative shrink-0 w-[198.88px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid inset-[0_-1px_0_0] pointer-events-none" />
      <Container26 />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-center mb-[-0.09px] relative shrink-0 w-full" data-name="Container">
      <div className="capitalize flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#503131] text-[44px] text-center tracking-[-0.88px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[46.64px]">$100000</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[0.09px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] mb-[-0.09px] relative shrink-0 text-[#4572c4] text-[24px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[26.16px]">Platinum</p>
      </div>
      <Container29 />
    </div>
  );
}

function Cell5() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[29.4px] pt-[14px] px-[20px] relative rounded-tr-[20px] shrink-0 w-[208.49px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid inset-[0_-1px_0_0] pointer-events-none rounded-tr-[20px]" />
      <Container28 />
    </div>
  );
}

function HeaderRow() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header → Row">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex gap-px items-start justify-center pr-[1.01px] relative w-full">
          <Cell />
          <Cell1 />
          <Cell2 />
          <Cell3 />
          <Cell4 />
          <Cell5 />
        </div>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[24px] text-black w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[34.88px]">Spreads</p>
      </div>
    </div>
  );
}

function Data() {
  return (
    <div className="content-stretch flex flex-col items-start p-[20px] relative shrink-0 w-[268.52px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container30 />
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container31() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[28.68px] pr-[28.69px] relative w-full">
        <Svg2 />
      </div>
    </div>
  );
}

function Data1() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[135.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container31 />
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container32() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[55.63px] pr-[55.64px] relative w-full">
        <Svg3 />
      </div>
    </div>
  );
}

function Data2() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[189.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container32 />
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container33() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] px-[60.44px] relative w-full">
        <Svg4 />
      </div>
    </div>
  );
}

function Data3() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container33 />
    </div>
  );
}

function Svg5() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container34() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[60.43px] pr-[60.45px] relative w-full">
        <Svg5 />
      </div>
    </div>
  );
}

function Data4() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container34 />
    </div>
  );
}

function Svg6() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container35() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[65.24px] pr-[65.25px] relative w-full">
        <Svg6 />
      </div>
    </div>
  );
}

function Data5() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[208.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container35 />
    </div>
  );
}

function Row() {
  return (
    <div className="relative shrink-0 w-full" data-name="Row">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex gap-px items-start justify-center pr-[1.01px] pt-px relative w-full">
          <Data />
          <Data1 />
          <Data2 />
          <Data3 />
          <Data4 />
          <Data5 />
        </div>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Nunito_Sans:Light',sans-serif] font-light justify-center leading-[34.88px] relative shrink-0 text-[24px] text-black w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          <p className="mb-0">Negative Balance</p>
          <p>Protection</p>
        </div>
      </div>
    </div>
  );
}

function Data6() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[269.52px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container36 />
    </div>
  );
}

function Svg7() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container37() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[28.68px] pr-[28.69px] relative w-full">
        <Svg7 />
      </div>
    </div>
  );
}

function Data7() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[27.45px] pl-[20px] pr-[21px] pt-[28.44px] relative shrink-0 w-[136.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container37 />
    </div>
  );
}

function Svg8() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container38() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[55.63px] pr-[55.64px] relative w-full">
        <Svg8 />
      </div>
    </div>
  );
}

function Data8() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[27.45px] pl-[20px] pr-[21px] pt-[28.44px] relative shrink-0 w-[190.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container38 />
    </div>
  );
}

function Svg9() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container39() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] px-[60.44px] relative w-full">
        <Svg9 />
      </div>
    </div>
  );
}

function Data9() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[27.45px] pl-[20px] pr-[21px] pt-[28.44px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container39 />
    </div>
  );
}

function Svg10() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container40() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[60.43px] pr-[60.45px] relative w-full">
        <Svg10 />
      </div>
    </div>
  );
}

function Data10() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[27.45px] pl-[20px] pr-[21px] pt-[28.44px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container40 />
    </div>
  );
}

function Svg11() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container41() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[65.24px] pr-[65.25px] relative w-full">
        <Svg11 />
      </div>
    </div>
  );
}

function Data11() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[27.45px] pl-[20px] pr-[21px] pt-[28.44px] relative shrink-0 w-[209.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container41 />
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data6 />
      <Data7 />
      <Data8 />
      <Data9 />
      <Data10 />
      <Data11 />
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[24px] text-black w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[34.88px]">Education</p>
      </div>
    </div>
  );
}

function Data12() {
  return (
    <div className="content-stretch flex flex-col items-start p-[20px] relative shrink-0 w-[268.52px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container42 />
    </div>
  );
}

function Svg12() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container43() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[28.68px] pr-[28.69px] relative w-full">
        <Svg12 />
      </div>
    </div>
  );
}

function Data13() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[135.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container43 />
    </div>
  );
}

function Svg13() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container44() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[55.63px] pr-[55.64px] relative w-full">
        <Svg13 />
      </div>
    </div>
  );
}

function Data14() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[189.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container44 />
    </div>
  );
}

function Svg14() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container45() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] px-[60.44px] relative w-full">
        <Svg14 />
      </div>
    </div>
  );
}

function Data15() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container45 />
    </div>
  );
}

function Svg15() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container46() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[60.43px] pr-[60.45px] relative w-full">
        <Svg15 />
      </div>
    </div>
  );
}

function Data16() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container46 />
    </div>
  );
}

function Svg16() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container47() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[65.24px] pr-[65.25px] relative w-full">
        <Svg16 />
      </div>
    </div>
  );
}

function Data17() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[208.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container47 />
    </div>
  );
}

function Row2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Row">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex gap-px items-start justify-center pr-[1.01px] pt-px relative w-full">
          <Data12 />
          <Data13 />
          <Data14 />
          <Data15 />
          <Data16 />
          <Data17 />
        </div>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Nunito_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[24px] text-black w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          <p className="leading-[34.88px]">Market Overview</p>
        </div>
      </div>
    </div>
  );
}

function Data18() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[20px] pl-[20px] pr-[21px] pt-[21px] relative shrink-0 w-[269.52px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container48 />
    </div>
  );
}

function Svg17() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container49() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[28.68px] pr-[28.69px] relative w-full">
        <Svg17 />
      </div>
    </div>
  );
}

function Data19() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[136.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container49 />
    </div>
  );
}

function Svg18() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container50() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[55.63px] pr-[55.64px] relative w-full">
        <Svg18 />
      </div>
    </div>
  );
}

function Data20() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[190.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container50 />
    </div>
  );
}

function Svg19() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container51() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] px-[60.44px] relative w-full">
        <Svg19 />
      </div>
    </div>
  );
}

function Data21() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container51 />
    </div>
  );
}

function Svg20() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container52() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[60.43px] pr-[60.45px] relative w-full">
        <Svg20 />
      </div>
    </div>
  );
}

function Data22() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container52 />
    </div>
  );
}

function Svg21() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container53() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[65.24px] pr-[65.25px] relative w-full">
        <Svg21 />
      </div>
    </div>
  );
}

function Data23() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[209.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container53 />
    </div>
  );
}

function Row3() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data18 />
      <Data19 />
      <Data20 />
      <Data21 />
      <Data22 />
      <Data23 />
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[24px] text-black w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[34.88px]">Signals</p>
      </div>
    </div>
  );
}

function Data24() {
  return (
    <div className="content-stretch flex flex-col items-start p-[20px] relative shrink-0 w-[268.52px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container54 />
    </div>
  );
}

function Svg22() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container55() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[28.68px] pr-[28.69px] relative w-full">
        <Svg22 />
      </div>
    </div>
  );
}

function Data25() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[135.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container55 />
    </div>
  );
}

function Svg23() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container56() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[55.63px] pr-[55.64px] relative w-full">
        <Svg23 />
      </div>
    </div>
  );
}

function Data26() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[189.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container56 />
    </div>
  );
}

function Svg24() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container57() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] px-[60.44px] relative w-full">
        <Svg24 />
      </div>
    </div>
  );
}

function Data27() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container57 />
    </div>
  );
}

function Svg25() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container58() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[60.43px] pr-[60.45px] relative w-full">
        <Svg25 />
      </div>
    </div>
  );
}

function Data28() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container58 />
    </div>
  );
}

function Svg26() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container59() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[65.24px] pr-[65.25px] relative w-full">
        <Svg26 />
      </div>
    </div>
  );
}

function Data29() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[208.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container59 />
    </div>
  );
}

function Row4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Row">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex gap-px items-start justify-center pr-[1.01px] pt-px relative w-full">
          <Data24 />
          <Data25 />
          <Data26 />
          <Data27 />
          <Data28 />
          <Data29 />
        </div>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Nunito_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[24px] text-black w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          <p className="leading-[34.88px]">Zero Swap Account</p>
        </div>
      </div>
    </div>
  );
}

function Data30() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[20px] pl-[20px] pr-[21px] pt-[21px] relative shrink-0 w-[269.52px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container60 />
    </div>
  );
}

function Svg27() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d="M1.1875 19H36.8125" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.74" strokeWidth="2.375" />
        </g>
      </svg>
    </div>
  );
}

function Container61() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[28.68px] pr-[28.69px] relative w-full">
        <Svg27 />
      </div>
    </div>
  );
}

function Data31() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[136.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container61 />
    </div>
  );
}

function Svg28() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d="M1.1875 19H36.8125" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.74" strokeWidth="2.375" />
        </g>
      </svg>
    </div>
  );
}

function Container62() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[55.63px] pr-[55.64px] relative w-full">
        <Svg28 />
      </div>
    </div>
  );
}

function Data32() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[190.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container62 />
    </div>
  );
}

function Svg29() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container63() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] px-[60.44px] relative w-full">
        <Svg29 />
      </div>
    </div>
  );
}

function Data33() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container63 />
    </div>
  );
}

function Svg30() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container64() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[60.43px] pr-[60.45px] relative w-full">
        <Svg30 />
      </div>
    </div>
  );
}

function Data34() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container64 />
    </div>
  );
}

function Svg31() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container65() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[65.24px] pr-[65.25px] relative w-full">
        <Svg31 />
      </div>
    </div>
  );
}

function Data35() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[209.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container65 />
    </div>
  );
}

function Row5() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data30 />
      <Data31 />
      <Data32 />
      <Data33 />
      <Data34 />
      <Data35 />
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[24px] text-black w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[34.88px]">Cashback</p>
      </div>
    </div>
  );
}

function Data36() {
  return (
    <div className="content-stretch flex flex-col items-start p-[20px] relative shrink-0 w-[268.52px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container66 />
    </div>
  );
}

function Svg32() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d="M1.1875 19H36.8125" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.74" strokeWidth="2.375" />
        </g>
      </svg>
    </div>
  );
}

function Container67() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[28.68px] pr-[28.69px] relative w-full">
        <Svg32 />
      </div>
    </div>
  );
}

function Data37() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[135.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container67 />
    </div>
  );
}

function Svg33() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d="M1.1875 19H36.8125" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.74" strokeWidth="2.375" />
        </g>
      </svg>
    </div>
  );
}

function Container68() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[55.63px] pr-[55.64px] relative w-full">
        <Svg33 />
      </div>
    </div>
  );
}

function Data38() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[189.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container68 />
    </div>
  );
}

function Svg34() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d="M1.1875 19H36.8125" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.74" strokeWidth="2.375" />
        </g>
      </svg>
    </div>
  );
}

function Container69() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] px-[60.44px] relative w-full">
        <Svg34 />
      </div>
    </div>
  );
}

function Data39() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container69 />
    </div>
  );
}

function Svg35() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container70() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[60.43px] pr-[60.45px] relative w-full">
        <Svg35 />
      </div>
    </div>
  );
}

function Data40() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container70 />
    </div>
  );
}

function Svg36() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container71() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[65.24px] pr-[65.25px] relative w-full">
        <Svg36 />
      </div>
    </div>
  );
}

function Data41() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[208.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container71 />
    </div>
  );
}

function Row6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Row">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex gap-px items-start justify-center pr-[1.01px] pt-px relative w-full">
          <Data36 />
          <Data37 />
          <Data38 />
          <Data39 />
          <Data40 />
          <Data41 />
        </div>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Nunito_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[24px] text-black w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          <p className="leading-[34.88px]">Individual Strategy</p>
        </div>
      </div>
    </div>
  );
}

function Data42() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[20px] pl-[20px] pr-[21px] pt-[21px] relative shrink-0 w-[269.52px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container72 />
    </div>
  );
}

function Svg37() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d="M1.1875 19H36.8125" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.74" strokeWidth="2.375" />
        </g>
      </svg>
    </div>
  );
}

function Container73() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[28.68px] pr-[28.69px] relative w-full">
        <Svg37 />
      </div>
    </div>
  );
}

function Data43() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[136.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container73 />
    </div>
  );
}

function Svg38() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d="M1.1875 19H36.8125" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.74" strokeWidth="2.375" />
        </g>
      </svg>
    </div>
  );
}

function Container74() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[55.63px] pr-[55.64px] relative w-full">
        <Svg38 />
      </div>
    </div>
  );
}

function Data44() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[190.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container74 />
    </div>
  );
}

function Svg39() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d="M1.1875 19H36.8125" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.74" strokeWidth="2.375" />
        </g>
      </svg>
    </div>
  );
}

function Container75() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] px-[60.44px] relative w-full">
        <Svg39 />
      </div>
    </div>
  );
}

function Data45() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container75 />
    </div>
  );
}

function Svg40() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container76() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[60.43px] pr-[60.45px] relative w-full">
        <Svg40 />
      </div>
    </div>
  );
}

function Data46() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container76 />
    </div>
  );
}

function Svg41() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container77() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[65.24px] pr-[65.25px] relative w-full">
        <Svg41 />
      </div>
    </div>
  );
}

function Data47() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[209.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container77 />
    </div>
  );
}

function Row7() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data42 />
      <Data43 />
      <Data44 />
      <Data45 />
      <Data46 />
      <Data47 />
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[24px] text-black w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[34.88px]">Webinars</p>
      </div>
    </div>
  );
}

function Data48() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[32.45px] pt-[32.44px] px-[20px] relative shrink-0 w-[268.52px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container78 />
    </div>
  );
}

function Container79() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[34.88px] relative shrink-0 text-[32px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">1</p>
        <p>Time</p>
      </div>
    </div>
  );
}

function Data49() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pt-[14.44px] px-[20px] relative shrink-0 w-[135.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container79 />
    </div>
  );
}

function Container80() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[34.88px] relative shrink-0 text-[32px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">1 per</p>
        <p>month</p>
      </div>
    </div>
  );
}

function Data50() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pt-[14.44px] px-[20px] relative shrink-0 w-[189.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container80 />
    </div>
  );
}

function Container81() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[34.88px] relative shrink-0 text-[32px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">2 per</p>
        <p>month</p>
      </div>
    </div>
  );
}

function Data51() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pt-[14.44px] px-[20px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container81 />
    </div>
  );
}

function Container82() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[34.88px] relative shrink-0 text-[32px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">3 per</p>
        <p>month</p>
      </div>
    </div>
  );
}

function Data52() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pt-[14.44px] px-[20px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container82 />
    </div>
  );
}

function Container83() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[34.88px] relative shrink-0 text-[32px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">4 per</p>
        <p>month</p>
      </div>
    </div>
  );
}

function Data53() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pt-[14.44px] px-[20px] relative shrink-0 w-[208.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container83 />
    </div>
  );
}

function Row8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Row">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex gap-px items-start justify-center pr-[1.01px] pt-px relative w-full">
          <Data48 />
          <Data49 />
          <Data50 />
          <Data51 />
          <Data52 />
          <Data53 />
        </div>
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Nunito_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[24px] text-black w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          <p className="leading-[34.88px]">Account Manager</p>
        </div>
      </div>
    </div>
  );
}

function Data54() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[20px] pl-[20px] pr-[21px] pt-[21px] relative shrink-0 w-[269.52px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container84 />
    </div>
  );
}

function Svg42() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d="M1.1875 19H36.8125" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.74" strokeWidth="2.375" />
        </g>
      </svg>
    </div>
  );
}

function Container85() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[28.68px] pr-[28.69px] relative w-full">
        <Svg42 />
      </div>
    </div>
  );
}

function Data55() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[136.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container85 />
    </div>
  );
}

function Svg43() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d="M1.1875 19H36.8125" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.74" strokeWidth="2.375" />
        </g>
      </svg>
    </div>
  );
}

function Container86() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[55.63px] pr-[55.64px] relative w-full">
        <Svg43 />
      </div>
    </div>
  );
}

function Data56() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[190.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container86 />
    </div>
  );
}

function Svg44() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container87() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] px-[60.44px] relative w-full">
        <Svg44 />
      </div>
    </div>
  );
}

function Data57() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container87 />
    </div>
  );
}

function Svg45() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container88() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[60.43px] pr-[60.45px] relative w-full">
        <Svg45 />
      </div>
    </div>
  );
}

function Data58() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container88 />
    </div>
  );
}

function Svg46() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container89() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[65.24px] pr-[65.25px] relative w-full">
        <Svg46 />
      </div>
    </div>
  );
}

function Data59() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[209.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container89 />
    </div>
  );
}

function Row9() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data54 />
      <Data55 />
      <Data56 />
      <Data57 />
      <Data58 />
      <Data59 />
    </div>
  );
}

function Container90() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[24px] text-black w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[34.88px]">Individual Assistance</p>
      </div>
    </div>
  );
}

function Data60() {
  return (
    <div className="content-stretch flex flex-col items-start p-[20px] relative shrink-0 w-[268.52px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container90 />
    </div>
  );
}

function Svg47() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d="M1.1875 19H36.8125" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.74" strokeWidth="2.375" />
        </g>
      </svg>
    </div>
  );
}

function Container91() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[28.68px] pr-[28.69px] relative w-full">
        <Svg47 />
      </div>
    </div>
  );
}

function Data61() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[135.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container91 />
    </div>
  );
}

function Svg48() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d="M1.1875 19H36.8125" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.74" strokeWidth="2.375" />
        </g>
      </svg>
    </div>
  );
}

function Container92() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[55.63px] pr-[55.64px] relative w-full">
        <Svg48 />
      </div>
    </div>
  );
}

function Data62() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[189.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container92 />
    </div>
  );
}

function Svg49() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d="M1.1875 19H36.8125" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.74" strokeWidth="2.375" />
        </g>
      </svg>
    </div>
  );
}

function Container93() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] px-[60.44px] relative w-full">
        <Svg49 />
      </div>
    </div>
  );
}

function Data63() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container93 />
    </div>
  );
}

function Svg50() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d="M1.1875 19H36.8125" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.74" strokeWidth="2.375" />
        </g>
      </svg>
    </div>
  );
}

function Container94() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[60.43px] pr-[60.45px] relative w-full">
        <Svg50 />
      </div>
    </div>
  );
}

function Data64() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container94 />
    </div>
  );
}

function Svg51() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container95() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[65.24px] pr-[65.25px] relative w-full">
        <Svg51 />
      </div>
    </div>
  );
}

function Data65() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[208.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container95 />
    </div>
  );
}

function Row10() {
  return (
    <div className="relative shrink-0 w-full" data-name="Row">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex gap-px items-start justify-center pr-[1.01px] pt-px relative w-full">
          <Data60 />
          <Data61 />
          <Data62 />
          <Data63 />
          <Data64 />
          <Data65 />
        </div>
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Nunito_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[24px] text-black w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          <p className="leading-[34.88px]">Private Portfolio</p>
        </div>
      </div>
    </div>
  );
}

function Data66() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[20px] pl-[20px] pr-[21px] pt-[21px] relative shrink-0 w-[269.52px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container96 />
    </div>
  );
}

function Svg52() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d="M1.1875 19H36.8125" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.74" strokeWidth="2.375" />
        </g>
      </svg>
    </div>
  );
}

function Container97() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[28.68px] pr-[28.69px] relative w-full">
        <Svg52 />
      </div>
    </div>
  );
}

function Data67() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[136.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container97 />
    </div>
  );
}

function Svg53() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d="M1.1875 19H36.8125" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.74" strokeWidth="2.375" />
        </g>
      </svg>
    </div>
  );
}

function Container98() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[55.63px] pr-[55.64px] relative w-full">
        <Svg53 />
      </div>
    </div>
  );
}

function Data68() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[190.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container98 />
    </div>
  );
}

function Svg54() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d="M1.1875 19H36.8125" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.74" strokeWidth="2.375" />
        </g>
      </svg>
    </div>
  );
}

function Container99() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] px-[60.44px] relative w-full">
        <Svg54 />
      </div>
    </div>
  );
}

function Data69() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container99 />
    </div>
  );
}

function Svg55() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container100() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[60.43px] pr-[60.45px] relative w-full">
        <Svg55 />
      </div>
    </div>
  );
}

function Data70() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container100 />
    </div>
  );
}

function Svg56() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container101() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[65.24px] pr-[65.25px] relative w-full">
        <Svg56 />
      </div>
    </div>
  );
}

function Data71() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[209.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container101 />
    </div>
  );
}

function Row11() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data66 />
      <Data67 />
      <Data68 />
      <Data69 />
      <Data70 />
      <Data71 />
    </div>
  );
}

function Container102() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[24px] text-black w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[34.88px]">Free Withdrawal</p>
      </div>
    </div>
  );
}

function Data72() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[39.63px] pt-[39.65px] px-[20px] relative shrink-0 w-[268.52px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container102 />
    </div>
  );
}

function Svg57() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d="M1.1875 19H36.8125" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.74" strokeWidth="2.375" />
        </g>
      </svg>
    </div>
  );
}

function Container103() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[28.68px] pr-[28.69px] relative w-full">
        <Svg57 />
      </div>
    </div>
  );
}

function Data73() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[34.63px] pt-[34.65px] px-[20px] relative shrink-0 w-[135.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container103 />
    </div>
  );
}

function Container105() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[32px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[34.88px]">1 time</p>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Container105 />
    </div>
  );
}

function Data74() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[46.84px] pt-[32.44px] px-[20px] relative shrink-0 w-[189.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container104 />
    </div>
  );
}

function Container107() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[34.88px] relative shrink-0 text-[32px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">1 per</p>
        <p>month</p>
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Container107 />
    </div>
  );
}

function Data75() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[29.39px] pt-[14.445px] px-[20px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container106 />
    </div>
  );
}

function Container109() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[34.88px] relative shrink-0 text-[32px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">1 per</p>
        <p>month</p>
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Container109 />
    </div>
  );
}

function Data76() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[29.39px] pt-[14.445px] px-[20px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container108 />
    </div>
  );
}

function Container111() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[34.88px] relative shrink-0 text-[32px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">3 per</p>
        <p>month</p>
      </div>
    </div>
  );
}

function Container110() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Container111 />
    </div>
  );
}

function Data77() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[29.39px] pt-[14.445px] px-[20px] relative shrink-0 w-[208.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container110 />
    </div>
  );
}

function Row12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Row">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex gap-px items-start justify-center pr-[1.01px] pt-px relative w-full">
          <Data72 />
          <Data73 />
          <Data74 />
          <Data75 />
          <Data76 />
          <Data77 />
        </div>
      </div>
    </div>
  );
}

function Container112() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Nunito_Sans:Light',sans-serif] font-light justify-center leading-[34.88px] relative shrink-0 text-[24px] text-black w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          <p className="mb-0">Interest on free</p>
          <p>capital</p>
        </div>
      </div>
    </div>
  );
}

function Data78() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[269.52px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container112 />
    </div>
  );
}

function Svg58() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d="M1.1875 19H36.8125" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.74" strokeWidth="2.375" />
        </g>
      </svg>
    </div>
  );
}

function Container113() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[28.68px] pr-[28.69px] relative w-full">
        <Svg58 />
      </div>
    </div>
  );
}

function Data79() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[27.45px] pl-[20px] pr-[21px] pt-[28.44px] relative shrink-0 w-[136.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container113 />
    </div>
  );
}

function Svg59() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d="M1.1875 19H36.8125" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.74" strokeWidth="2.375" />
        </g>
      </svg>
    </div>
  );
}

function Container114() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[55.63px] pr-[55.64px] relative w-full">
        <Svg59 />
      </div>
    </div>
  );
}

function Data80() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[27.45px] pl-[20px] pr-[21px] pt-[28.44px] relative shrink-0 w-[190.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container114 />
    </div>
  );
}

function Svg60() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d="M1.1875 19H36.8125" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.74" strokeWidth="2.375" />
        </g>
      </svg>
    </div>
  );
}

function Container115() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] px-[60.44px] relative w-full">
        <Svg60 />
      </div>
    </div>
  );
}

function Data81() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[27.45px] pl-[20px] pr-[21px] pt-[28.44px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container115 />
    </div>
  );
}

function Container117() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[32px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[34.88px]">3%</p>
      </div>
    </div>
  );
}

function Container116() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Container117 />
      </div>
    </div>
  );
}

function Data82() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[39.65px] pl-[20px] pr-[21px] pt-[26.24px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container116 />
    </div>
  );
}

function Container119() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[32px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[34.88px]">5%</p>
      </div>
    </div>
  );
}

function Container118() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Container119 />
      </div>
    </div>
  );
}

function Data83() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[39.65px] pl-[20px] pr-[21px] pt-[26.24px] relative shrink-0 w-[209.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container118 />
    </div>
  );
}

function Row13() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data78 />
      <Data79 />
      <Data80 />
      <Data81 />
      <Data82 />
      <Data83 />
    </div>
  );
}

function Container120() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[24px] text-black w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[34.88px]">Pro-capital mobility</p>
      </div>
    </div>
  );
}

function Data84() {
  return (
    <div className="content-stretch flex flex-col items-start p-[20px] relative shrink-0 w-[268.52px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container120 />
    </div>
  );
}

function Svg61() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d="M1.1875 19H36.8125" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.74" strokeWidth="2.375" />
        </g>
      </svg>
    </div>
  );
}

function Container121() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[28.68px] pr-[28.69px] relative w-full">
        <Svg61 />
      </div>
    </div>
  );
}

function Data85() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[135.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container121 />
    </div>
  );
}

function Svg62() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d="M1.1875 19H36.8125" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.74" strokeWidth="2.375" />
        </g>
      </svg>
    </div>
  );
}

function Container122() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[55.63px] pr-[55.64px] relative w-full">
        <Svg62 />
      </div>
    </div>
  );
}

function Data86() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[189.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container122 />
    </div>
  );
}

function Svg63() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container123() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] px-[60.44px] relative w-full">
        <Svg63 />
      </div>
    </div>
  );
}

function Data87() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container123 />
    </div>
  );
}

function Svg64() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container124() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[60.43px] pr-[60.45px] relative w-full">
        <Svg64 />
      </div>
    </div>
  );
}

function Data88() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container124 />
    </div>
  );
}

function Svg65() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container125() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[65.24px] pr-[65.25px] relative w-full">
        <Svg65 />
      </div>
    </div>
  );
}

function Data89() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[208.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container125 />
    </div>
  );
}

function Row14() {
  return (
    <div className="relative shrink-0 w-full" data-name="Row">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex gap-px items-start justify-center pr-[1.01px] pt-px relative w-full">
          <Data84 />
          <Data85 />
          <Data86 />
          <Data87 />
          <Data88 />
          <Data89 />
        </div>
      </div>
    </div>
  );
}

function Container126() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Nunito_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[24px] text-black w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          <p className="leading-[34.88px]">Bitcoin discounter</p>
        </div>
      </div>
    </div>
  );
}

function Data90() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[20px] pl-[20px] pr-[21px] pt-[21px] relative rounded-bl-[20px] shrink-0 w-[269.52px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none rounded-bl-[20px]" />
      <Container126 />
    </div>
  );
}

function Svg66() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d="M1.1875 19H36.8125" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.74" strokeWidth="2.375" />
        </g>
      </svg>
    </div>
  );
}

function Container127() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[28.68px] pr-[28.69px] relative w-full">
        <Svg66 />
      </div>
    </div>
  );
}

function Data91() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[136.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container127 />
    </div>
  );
}

function Svg67() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d="M1.1875 19H36.8125" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.74" strokeWidth="2.375" />
        </g>
      </svg>
    </div>
  );
}

function Container128() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[55.63px] pr-[55.64px] relative w-full">
        <Svg67 />
      </div>
    </div>
  );
}

function Data92() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[190.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container128 />
    </div>
  );
}

function Svg68() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d="M1.1875 19H36.8125" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.74" strokeWidth="2.375" />
        </g>
      </svg>
    </div>
  );
}

function Container129() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] px-[60.44px] relative w-full">
        <Svg68 />
      </div>
    </div>
  );
}

function Data93() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container129 />
    </div>
  );
}

function Svg69() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container130() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[60.43px] pr-[60.45px] relative w-full">
        <Svg69 />
      </div>
    </div>
  );
}

function Data94() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container130 />
    </div>
  );
}

function Svg70() {
  return (
    <div className="relative shrink-0 size-[38px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="SVG">
          <path d={svgPaths.p1436d500} id="Vector" stroke="var(--stroke-0, #1E55CD)" strokeLinecap="round" strokeWidth="1.9" />
        </g>
      </svg>
    </div>
  );
}

function Container131() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[65.24px] pr-[65.25px] relative w-full">
        <Svg70 />
      </div>
    </div>
  );
}

function Data95() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative rounded-br-[20px] shrink-0 w-[209.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none rounded-br-[20px]" />
      <Container131 />
    </div>
  );
}

function Row15() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data90 />
      <Data91 />
      <Data92 />
      <Data93 />
      <Data94 />
      <Data95 />
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Body">
      <Row />
      <Row1 />
      <Row2 />
      <Row3 />
      <Row4 />
      <Row5 />
      <Row6 />
      <Row7 />
      <Row8 />
      <Row9 />
      <Row10 />
      <Row11 />
      <Row12 />
      <Row13 />
      <Row14 />
      <Row15 />
    </div>
  );
}

function Table() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-auto relative shrink-0 w-full" data-name="Table">
      <HeaderRow />
      <Body />
    </div>
  );
}

function OverlayShadowOverlayBlur() {
  return (
    <div className="backdrop-blur-[7.5px] bg-[rgba(242,245,251,0.15)] content-stretch flex flex-col items-start relative rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="Overlay+Shadow+OverlayBlur">
      <Table />
    </div>
  );
}

function Container135() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#1446b7] text-[48px] tracking-[-0.96px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[52.8px]">VIP</p>
      </div>
    </div>
  );
}

function Container136() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Light',sans-serif] font-light justify-center leading-[30.52px] relative shrink-0 text-[28px] text-black w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">Best trading conditions. Lowest swaps</p>
        <p className="mb-0">and spreads. Increased income from</p>
        <p className="mb-0">swaps, cashback and interest on free</p>
        <p className="mb-0">capital. Access to exclusive trading</p>
        <p className="mb-0">strategies and development of</p>
        <p className="mb-0">customized, diversified portfolios.</p>
        <p>Contact your account manager.</p>
      </div>
    </div>
  );
}

function Container134() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Container">
      <Container135 />
      <Container136 />
    </div>
  );
}

function OverlayShadow2() {
  return (
    <div className="bg-[rgba(242,245,251,0.3)] flex-[1_0_0] min-h-px min-w-px relative rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-full" data-name="Overlay+Shadow">
      <div className="content-stretch flex flex-col items-start px-[39px] py-[32px] relative size-full">
        <Container134 />
      </div>
    </div>
  );
}

function Container133() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative self-stretch" data-name="Container">
      <OverlayShadow2 />
    </div>
  );
}

function Container139() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#1446b7] text-[48px] tracking-[-0.96px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[52.8px]">ELITE</p>
      </div>
    </div>
  );
}

function Container140() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Light',sans-serif] font-light justify-center leading-[30.52px] relative shrink-0 text-[28px] text-black w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">For exclusive clients only. To determine</p>
        <p className="mb-0">whether you are eligible to apply for an</p>
        <p className="mb-0">Elite Account, please contact your</p>
        <p>Account Manager.</p>
      </div>
    </div>
  );
}

function Container138() {
  return (
    <div className="content-stretch flex flex-col gap-[9.285px] items-start relative shrink-0 w-full" data-name="Container">
      <Container139 />
      <Container140 />
    </div>
  );
}

function OverlayShadow3() {
  return (
    <div className="bg-[rgba(242,245,251,0.3)] flex-[1_0_0] min-h-px min-w-px relative rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-full" data-name="Overlay+Shadow">
      <div className="content-stretch flex flex-col items-start px-[39px] py-[32px] relative size-full">
        <Container138 />
      </div>
    </div>
  );
}

function Container137() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative self-stretch" data-name="Container">
      <OverlayShadow3 />
    </div>
  );
}

function Container132() {
  return (
    <div className="content-stretch flex gap-[30px] h-[340.46px] items-start relative shrink-0 w-full" data-name="Container">
      <Container133 />
      <Container137 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[10px] relative shrink-0 w-full" data-name="Margin">
      <Container132 />
    </div>
  );
}

function Background() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background" style={{ backgroundImage: "linear-gradient(20.0161deg, rgb(99, 142, 223) 30%, rgb(234, 238, 255) 80%)" }}>
      <div className="content-stretch flex flex-col gap-[20px] items-start px-[114.797px] py-[43.047px] relative w-full">
        <Container6 />
        <Container11 />
        <Heading1 />
        <OverlayShadowOverlayBlur />
        <Margin1 />
      </div>
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="absolute h-[351.59px] left-0 top-0 w-[602.7px]" data-name="Mask Group">
      <div className="absolute bg-gradient-to-r from-white h-[351.59px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[602.7px_351.59px] rounded-[24px] to-[rgba(255,255,255,0)] top-0 w-[602.7px]" data-name="Gradient" style={{ maskImage: `url('${imgGradient}')` }} />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[52.8px] relative shrink-0 text-[48px] text-black text-center tracking-[-0.96px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">Pick Your Perfect Fit –</p>
        <p className="mb-0">Begin Trading in</p>
        <p>Minutes</p>
      </div>
    </div>
  );
}

function Container143() {
  return (
    <div className="content-stretch flex flex-col h-full items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[22px] text-center text-white tracking-[-0.44px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[43.2px]">Start Trading</p>
      </div>
    </div>
  );
}

function Svg71() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="SVG">
          <path d={svgPaths.p2d3abf00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container144() {
  return (
    <div className="content-stretch flex h-[43.2px] items-center relative shrink-0" data-name="Container">
      <Svg71 />
    </div>
  );
}

function Container142() {
  return (
    <div className="content-stretch flex gap-[12px] items-end justify-center relative shrink-0" data-name="Container">
      <div className="flex flex-row items-end self-stretch">
        <Container143 />
      </div>
      <Container144 />
    </div>
  );
}

function Link9() {
  return (
    <div className="bg-black content-stretch flex items-start pb-[10px] pt-[9.25px] px-[10px] relative rounded-[12px] shrink-0" data-name="Link">
      <Container142 />
    </div>
  );
}

function Container141() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <Link9 />
    </div>
  );
}

function OverlayShadowOverlayBlur1() {
  return (
    <div className="backdrop-blur-[8px] bg-[rgba(242,245,251,0.3)] relative rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="Overlay+Shadow+OverlayBlur">
      <div className="content-stretch flex flex-col gap-[20px] items-start pb-[55px] pt-[54.3px] px-[30px] relative w-full">
        <MaskGroup />
        <Heading2 />
        <Container141 />
      </div>
    </div>
  );
}

function BackgroundShadow() {
  return (
    <div className="content-stretch flex flex-col items-start px-[301.352px] py-[120.539px] relative rounded-[25px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-[1205.41px]" data-name="Background+Shadow">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[25px]">
        <img alt="" className="absolute h-full left-[-13.52%] max-w-none top-0 w-[127.03%]" src={imgBackgroundShadow} />
      </div>
      <OverlayShadowOverlayBlur1 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[43.04px] items-center pb-[43.05px] relative shrink-0 w-full" data-name="Container">
      <Background />
      <BackgroundShadow />
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

function Container147() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[6.5px] relative shrink-0 w-full" data-name="Container">
      <DefaultLogo1 />
    </div>
  );
}

function Link10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Link">
      <Container147 />
    </div>
  );
}

function Container146() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[0_989.93px_192px_0] items-start" data-name="Container">
      <Link10 />
    </div>
  );
}

function Container149() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[32px] text-black tracking-[0.18px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[48px]">Resources</p>
      </div>
    </div>
  );
}

function Link11() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-[1_0_0] flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px relative text-[16px] text-black tracking-[0.15px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[24px]">Privacy Policy</p>
      </div>
    </div>
  );
}

function Container151() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link11 />
    </div>
  );
}

function Link12() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-[1_0_0] flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px relative text-[16px] text-black tracking-[0.15px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[24px]">Risk Warnings Document</p>
      </div>
    </div>
  );
}

function Container152() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link12 />
    </div>
  );
}

function Link13() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-[1_0_0] flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px relative text-[16px] text-black tracking-[0.15px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[24px]">Terms and Conditions</p>
      </div>
    </div>
  );
}

function Container153() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link13 />
    </div>
  );
}

function Link14() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-[1_0_0] flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px relative text-[16px] text-black tracking-[0.15px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[24px]">Investment Agreement</p>
      </div>
    </div>
  );
}

function Container154() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link14 />
    </div>
  );
}

function Container150() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pb-[16px] relative shrink-0 w-full" data-name="Container">
      <Container151 />
      <Container152 />
      <Container153 />
      <Container154 />
    </div>
  );
}

function Container148() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] inset-[0_742.46px_192px_247.47px] items-start" data-name="Container">
      <Container149 />
      <Container150 />
    </div>
  );
}

function Container156() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[32px] text-black tracking-[0.18px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[48px]">Pricing</p>
      </div>
    </div>
  );
}

function Link15() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-[1_0_0] flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px relative text-[16px] text-black tracking-[0.15px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[24px]">All plans</p>
      </div>
    </div>
  );
}

function Container158() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link15 />
    </div>
  );
}

function Link16() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Link">
      <button className="cursor-pointer flex flex-[1_0_0] flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px relative text-[16px] text-black text-left tracking-[0.15px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[24px]">Gold</p>
      </button>
    </div>
  );
}

function Container159() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link16 />
    </div>
  );
}

function Link17() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Link">
      <button className="cursor-pointer flex flex-[1_0_0] flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px relative text-[16px] text-black text-left tracking-[0.15px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[24px]">VIP</p>
      </button>
    </div>
  );
}

function Container160() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link17 />
    </div>
  );
}

function Container157() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pb-[16px] relative shrink-0 w-full" data-name="Container">
      <Container158 />
      <Container159 />
      <Container160 />
    </div>
  );
}

function Container155() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] inset-[0_494.97px_192px_494.96px] items-start" data-name="Container">
      <Container156 />
      <Container157 />
    </div>
  );
}

function Container162() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[32px] text-black tracking-[0.18px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[48px]">Platform</p>
      </div>
    </div>
  );
}

function Link18() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-[1_0_0] flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px relative text-[16px] text-black tracking-[0.15px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[24px]">Web-Trader</p>
      </div>
    </div>
  );
}

function Container164() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link18 />
    </div>
  );
}

function Container163() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0 w-full" data-name="Container">
      <Container164 />
    </div>
  );
}

function Container161() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] inset-[0_247.5px_192px_742.43px] items-start" data-name="Container">
      <Container162 />
      <Container163 />
    </div>
  );
}

function Container166() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[32px] text-black tracking-[0.18px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[48px]">Trade</p>
      </div>
    </div>
  );
}

function Link19() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-[1_0_0] flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px relative text-[16px] text-black tracking-[0.15px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[24px]">Futures contracts</p>
      </div>
    </div>
  );
}

function Container168() {
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
        <p className="leading-[24px]">Raw Materials</p>
      </div>
    </div>
  );
}

function Container169() {
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
        <p className="leading-[24px]">Actions</p>
      </div>
    </div>
  );
}

function Container170() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link21 />
    </div>
  );
}

function Link22() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-[1_0_0] flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px relative text-[16px] text-black tracking-[0.15px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[24px]">Cryptocurrency CFDs</p>
      </div>
    </div>
  );
}

function Container171() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link22 />
    </div>
  );
}

function Link23() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-[1_0_0] flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px relative text-[16px] text-black tracking-[0.15px]" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[24px]">Indices</p>
      </div>
    </div>
  );
}

function Container172() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link23 />
    </div>
  );
}

function Container167() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pb-[16px] relative shrink-0 w-full" data-name="Container">
      <Container168 />
      <Container169 />
      <Container170 />
      <Container171 />
      <Container172 />
    </div>
  );
}

function Container165() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] inset-[0_0.01px_192px_989.92px] items-start" data-name="Container">
      <Container166 />
      <Container167 />
    </div>
  );
}

function Container174() {
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

function Container173() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[296px_742.45px_0_0] items-start" data-name="Container">
      <Container174 />
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

function Link24() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0" data-name="Link">
      <USSecuritiesAndExchangeCommissionPng />
    </div>
  );
}

function Container176() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[5.96px] relative shrink-0 w-[140.98px]" data-name="Container">
      <Link24 />
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

function Link25() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0" data-name="Link">
      <BrokercheckPng />
    </div>
  );
}

function Container177() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[140.98px]" data-name="Container">
      <Link25 />
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

function Link26() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0" data-name="Link">
      <LeiLookupSvg />
    </div>
  );
}

function Container178() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8.82px] relative shrink-0 w-[140.99px]" data-name="Container">
      <Link26 />
    </div>
  );
}

function Container175() {
  return (
    <div className="absolute content-stretch flex gap-[20px] items-center left-[494.96px] right-[247.49px] top-[339.95px]" data-name="Container">
      <Container176 />
      <Container177 />
      <Container178 />
    </div>
  );
}

function Svg72() {
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

function Link27() {
  return (
    <div className="content-stretch flex items-start p-[13px] relative rounded-[4px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Svg72 />
    </div>
  );
}

function Container180() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Link27 />
    </div>
  );
}

function Container182() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[24px] relative shrink-0 text-[16px] text-black tracking-[0.15px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="mb-0">support@lpl-holdings.com</p>
        <p>rities.com</p>
      </div>
    </div>
  );
}

function Container181() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <Container182 />
    </div>
  );
}

function Container179() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-center left-[989.92px] right-[0.01px] top-[351px]" data-name="Container">
      <Container180 />
      <Container181 />
    </div>
  );
}

function Container145() {
  return (
    <div className="h-[456px] relative shrink-0 w-full" data-name="Container">
      <Container146 />
      <Container148 />
      <Container155 />
      <Container161 />
      <Container165 />
      <Container173 />
      <Container175 />
      <Container179 />
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-gradient-to-b from-white relative shrink-0 to-[#638edf] w-full" data-name="Footer">
      <div className="content-stretch flex flex-col items-start pb-[71.75px] pt-[43.047px] px-[114.797px] relative w-full">
        <Container145 />
      </div>
    </div>
  );
}

export default function Pricing() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Pricing">
      <Container />
      <Container5 />
      <Footer />
    </div>
  );
}