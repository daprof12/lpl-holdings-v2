import svgPaths from "./svg-u7s61ts41v";
import imgSection from "figma:asset/90ccbf9bfde00433ded2c7449f3d4bade12cbb55.png";
import imgBondsimgWebp from "figma:asset/acd9f8a36e50b95f04b836ee0c755365861c3c55.png";
import imgSection1 from "figma:asset/49712abe12194c268a5c9981e2bf290c369efc5f.png";

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px]">Bonds CFDs</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[8.1px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[25.31px] relative shrink-0 text-[16.9px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Trade the world’s most popular and liquid fixed income securities from the United States,</p>
        <p>the UK, Europe and Japan on MetaTrader 4 and 5.</p>
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
          <img alt="" className="absolute h-[109.67%] left-0 max-w-none top-0 w-full" src={imgSection} />
        </div>
      </div>
      <Container />
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex flex-col items-start px-[9.375px] py-[14.063px] relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-[rgba(255,255,255,0.3)] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18.75px]">Range of Products</p>
      </div>
    </div>
  );
}

function Item() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Item">
      <Link1 />
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col items-start px-[9.375px] py-[14.063px] relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-[rgba(255,255,255,0.3)] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18.75px]">Forex CFDs</p>
      </div>
    </div>
  );
}

function Item1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Item">
      <Link2 />
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-col items-start px-[9.375px] py-[14.063px] relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-[rgba(255,255,255,0.3)] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18.75px]">Commodities CFDs</p>
      </div>
    </div>
  );
}

function Item2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Item">
      <Link3 />
    </div>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex flex-col items-start px-[9.375px] py-[14.063px] relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-[rgba(255,255,255,0.3)] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18.75px]">Indices CFDs</p>
      </div>
    </div>
  );
}

function Item3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Item">
      <Link4 />
    </div>
  );
}

function Link5() {
  return (
    <div className="content-stretch flex flex-col items-start px-[9.375px] py-[14.063px] relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#34e834] text-[13.1px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18.75px]">Bonds CFDs</p>
      </div>
    </div>
  );
}

function Item4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Item">
      <Link5 />
    </div>
  );
}

function Link6() {
  return (
    <div className="content-stretch flex flex-col items-start px-[9.375px] py-[14.063px] relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-[rgba(255,255,255,0.3)] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18.75px]">Cryptocurrency CFDs</p>
      </div>
    </div>
  );
}

function Item5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Item">
      <Link6 />
    </div>
  );
}

function Link7() {
  return (
    <div className="content-stretch flex flex-col items-start px-[9.375px] py-[14.063px] relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-[rgba(255,255,255,0.3)] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18.75px]">Stocks CFDs</p>
      </div>
    </div>
  );
}

function Item6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Item">
      <Link7 />
    </div>
  );
}

function Link8() {
  return (
    <div className="content-stretch flex flex-col items-start px-[9.375px] py-[14.063px] relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-[rgba(255,255,255,0.3)] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18.75px]">Futures CFDs</p>
      </div>
    </div>
  );
}

function Item7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Item">
      <Link8 />
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="List">
      <Item />
      <Item1 />
      <Item2 />
      <Item3 />
      <Item4 />
      <Item5 />
      <Item6 />
      <Item7 />
    </div>
  );
}

function Container5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[14.063px] relative size-full">
        <List />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-wrap items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Container5 />
    </div>
  );
}

function Section1() {
  return (
    <div className="bg-black relative shrink-0 w-full" data-name="Section">
      <div className="content-stretch flex flex-col items-start px-[157.97px] relative w-full">
        <Container4 />
      </div>
    </div>
  );
}

function IconBondSvg1() {
  return (
    <div className="h-[84.38px] relative shrink-0 w-[88.534px]" data-name="icon-bond.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88.5342 84.38">
        <g clipPath="url(#clip0_2124_920)" id="icon-bond.svg">
          <path clipRule="evenodd" d={svgPaths.pdf50900} fill="var(--fill-0, #34E834)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2124_920">
            <rect fill="white" height="84.38" width="88.5342" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconBondSvgFill() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[84.38px]" data-name="icon-bond.svg fill">
      <IconBondSvg1 />
    </div>
  );
}

function IconBondSvg() {
  return (
    <div className="content-stretch flex items-start max-w-[705.6300048828125px] overflow-clip relative self-stretch shrink-0" data-name="icon-bond.svg">
      <IconBondSvgFill />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex items-start left-[14.06px] top-0 w-[84.38px]" data-name="Container">
      <IconBondSvg />
    </div>
  );
}

function Heading4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.07px] top-[102.57px]" data-name="Heading 5">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[28.13px] relative shrink-0 text-[18.8px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">XAI Technology Bond CFDs are based off fixed income debt securities</p>
        <p className="mb-0">that pay investors a regular coupon in exchange for their investment. We</p>
        <p className="mb-0">offer the bonds products as a CFD with flexible lot sizing, so you can</p>
        <p>speculate on the price of the Bond by going long or short.</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.07px] top-[230.01px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[28.13px] relative shrink-0 text-[15px] text-[rgba(0,0,0,0.5)] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">There is no interest debited or credited on these Bonds CFDs, just like the underlying Futures</p>
        <p className="mb-0">markets that they’re based off. Again, this means you only have to worry about the price of the</p>
        <p>bond and whether you go long or short.</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.07px] top-[321.94px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[28.13px] relative shrink-0 text-[15px] text-[rgba(0,0,0,0.5)] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">Bond CFDs provided byxAI Technologyare based off highly rated government issued debt</p>
        <p className="mb-0">securities, including governments of the United States, Japan and Europe. Bonds offer traders the</p>
        <p className="mb-0">opportunity to speculate on interest rates and risk on/off sentiment, diversify a portfolio or</p>
        <p>reduce risk and build defensive positions during periods of economic weakness or uncertainty.</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="max-w-[1058.43994140625px] relative self-stretch shrink-0 w-[705.63px]" data-name="Container">
      <Container9 />
      <Heading4 />
      <Container10 />
      <Container11 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 6">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[18px] whitespace-pre-wrap">Bonds</p>
        </div>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[30px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[36px] whitespace-pre-wrap">Facts</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="relative rounded-tl-[4.63px] rounded-tr-[4.63px] shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none rounded-tl-[4.63px] rounded-tr-[4.63px]" />
      <div className="content-stretch flex flex-col items-start pb-[14.563px] px-[6.563px] relative w-full">
        <Heading5 />
        <Heading2 />
      </div>
    </div>
  );
}

function CheckSvg() {
  return (
    <div className="h-[15px] relative shrink-0 w-[14.545px]" data-name="check.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.5455 15">
        <g clipPath="url(#clip0_2124_923)" id="check.svg">
          <path d={svgPaths.paf62000} fill="var(--fill-0, #34E834)" id="Vector" />
          <path d={svgPaths.p38b8d680} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_2124_923">
            <rect fill="white" height="15" width="14.5455" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CheckSvgFill() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pr-[0.455px] relative shrink-0 size-[15px]" data-name="check.svg fill">
      <CheckSvg />
    </div>
  );
}

function Image() {
  return (
    <div className="absolute left-[4.69px] size-[15px] top-[13.12px]" data-name="Image">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <CheckSvgFill />
      </div>
    </div>
  );
}

function Item8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[12.688px] pl-[31.875px] pr-[6.563px] pt-[12.188px] relative w-full">
        <Image />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">Over 9 Bonds available to trade</p>
        </div>
      </div>
    </div>
  );
}

function CheckSvg1() {
  return (
    <div className="h-[15px] relative shrink-0 w-[14.545px]" data-name="check.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.5455 15">
        <g clipPath="url(#clip0_2124_923)" id="check.svg">
          <path d={svgPaths.paf62000} fill="var(--fill-0, #34E834)" id="Vector" />
          <path d={svgPaths.p38b8d680} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_2124_923">
            <rect fill="white" height="15" width="14.5455" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CheckSvgFill1() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pr-[0.455px] relative shrink-0 size-[15px]" data-name="check.svg fill">
      <CheckSvg1 />
    </div>
  );
}

function Image1() {
  return (
    <div className="absolute left-[4.69px] size-[15px] top-[13.13px]" data-name="Image">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <CheckSvgFill1 />
      </div>
    </div>
  );
}

function Item9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[12.688px] pl-[31.875px] pr-[6.563px] pt-[12.188px] relative w-full">
        <Image1 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">No commissions</p>
        </div>
      </div>
    </div>
  );
}

function CheckSvg2() {
  return (
    <div className="h-[15px] relative shrink-0 w-[14.545px]" data-name="check.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.5455 15">
        <g clipPath="url(#clip0_2124_923)" id="check.svg">
          <path d={svgPaths.paf62000} fill="var(--fill-0, #34E834)" id="Vector" />
          <path d={svgPaths.p38b8d680} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_2124_923">
            <rect fill="white" height="15" width="14.5455" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CheckSvgFill2() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pr-[0.455px] relative shrink-0 size-[15px]" data-name="check.svg fill">
      <CheckSvg2 />
    </div>
  );
}

function Image2() {
  return (
    <div className="absolute left-[4.69px] size-[15px] top-[13.13px]" data-name="Image">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <CheckSvgFill2 />
      </div>
    </div>
  );
}

function Item10() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[12.688px] pl-[31.875px] pr-[6.563px] pt-[12.188px] relative w-full">
        <Image2 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">Up to 1:200 leverage</p>
        </div>
      </div>
    </div>
  );
}

function CheckSvg3() {
  return (
    <div className="h-[15px] relative shrink-0 w-[14.545px]" data-name="check.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.5455 15">
        <g clipPath="url(#clip0_2124_923)" id="check.svg">
          <path d={svgPaths.paf62000} fill="var(--fill-0, #34E834)" id="Vector" />
          <path d={svgPaths.p38b8d680} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_2124_923">
            <rect fill="white" height="15" width="14.5455" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CheckSvgFill3() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pr-[0.455px] relative shrink-0 size-[15px]" data-name="check.svg fill">
      <CheckSvg3 />
    </div>
  );
}

function Image3() {
  return (
    <div className="absolute left-[4.69px] size-[15px] top-[13.12px]" data-name="Image">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <CheckSvgFill3 />
      </div>
    </div>
  );
}

function Item11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[12.688px] pl-[31.875px] pr-[6.563px] pt-[12.188px] relative w-full">
        <Image3 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">Deep Liquidity</p>
        </div>
      </div>
    </div>
  );
}

function CheckSvg4() {
  return (
    <div className="h-[15px] relative shrink-0 w-[14.545px]" data-name="check.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.5455 15">
        <g clipPath="url(#clip0_2124_923)" id="check.svg">
          <path d={svgPaths.paf62000} fill="var(--fill-0, #34E834)" id="Vector" />
          <path d={svgPaths.p38b8d680} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_2124_923">
            <rect fill="white" height="15" width="14.5455" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CheckSvgFill4() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pr-[0.455px] relative shrink-0 size-[15px]" data-name="check.svg fill">
      <CheckSvg4 />
    </div>
  );
}

function Image4() {
  return (
    <div className="absolute left-[4.69px] size-[15px] top-[13.12px]" data-name="Image">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <CheckSvgFill4 />
      </div>
    </div>
  );
}

function Item12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[12.688px] pl-[31.875px] pr-[6.563px] pt-[12.188px] relative w-full">
        <Image4 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">MetaTrader 4 and 5</p>
        </div>
      </div>
    </div>
  );
}

function CheckSvg5() {
  return (
    <div className="h-[15px] relative shrink-0 w-[14.545px]" data-name="check.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.5455 15">
        <g clipPath="url(#clip0_2124_923)" id="check.svg">
          <path d={svgPaths.paf62000} fill="var(--fill-0, #34E834)" id="Vector" />
          <path d={svgPaths.p38b8d680} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_2124_923">
            <rect fill="white" height="15" width="14.5455" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CheckSvgFill5() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pr-[0.455px] relative shrink-0 size-[15px]" data-name="check.svg fill">
      <CheckSvg5 />
    </div>
  );
}

function Image5() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[4.69px] size-[15px] top-[13.13px]" data-name="Image">
      <CheckSvgFill5 />
    </div>
  );
}

function Item13() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div className="content-stretch flex flex-col items-start pl-[31.875px] pr-[6.563px] py-[12.188px] relative w-full">
        <Image5 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">Trade 24/5</p>
        </div>
      </div>
    </div>
  );
}

function List1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="List">
      <Item8 />
      <Item9 />
      <Item10 />
      <Item11 />
      <Item12 />
      <Item13 />
    </div>
  );
}

function ListMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4.688px] relative shrink-0 w-full" data-name="List:margin">
      <List1 />
    </div>
  );
}

function Link9() {
  return (
    <div className="relative rounded-[7.5px] shrink-0 w-full" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[7.5px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center pb-[7.19px] pt-[6.31px] px-[16.438px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[15px] text-black text-center tracking-[0.469px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[24.38px]">Open Account</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start max-w-[302.81201171875px] p-[23.438px] relative rounded-[5.63px] shrink-0 w-[302.81px]" data-name="Background">
      <HorizontalBorder />
      <ListMargin />
      <Link9 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex items-center justify-end max-w-[1058.43994140625px] px-[14.063px] relative self-stretch shrink-0 w-[352.81px]" data-name="Container">
      <Background1 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-wrap gap-0 items-start relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Container12 />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#f6f6f6] relative rounded-[18.75px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col items-start px-[18.75px] py-[28.125px] relative w-full">
        <Container7 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[14.063px] relative size-full">
        <Background />
      </div>
    </div>
  );
}

function Section2() {
  return (
    <div className="content-stretch flex flex-wrap items-start justify-center pt-[84.37px] relative shrink-0 w-[1124.06px]" data-name="Section">
      <Container6 />
    </div>
  );
}

function BondsimgWebp() {
  return (
    <div className="h-[424px] max-w-[562.030029296875px] relative shrink-0 w-[488px]" data-name="bondsimg.webp">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgBondsimgWebp} />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="flex-[1_0_0] max-w-[1124.06005859375px] min-h-px min-w-px relative" data-name="Container">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] px-[14.063px] relative w-full">
        <BondsimgWebp />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[36px] relative shrink-0 text-[30px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">How does</p>
        <p>Bonds trading work?</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px] whitespace-pre-wrap">Bonds are part of the fixed income asset class.</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[22.5px] relative shrink-0 text-[15px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Bonds pay a regular fixed coupon to the bondholder and can be sold in</p>
        <p className="mb-0">secondary markets. Governments issue bonds to finance government</p>
        <p>spending on projects such as public infrastructure.</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[22.5px] relative shrink-0 text-[15px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Traders generally trade bonds on the basis of future interest rate</p>
        <p>expectations.</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[22.5px] relative shrink-0 text-[15px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">If a central bank increases interest rates, bond prices will decline and yields</p>
        <p>will increase.</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="flex-[1_0_0] max-w-[1124.06005859375px] min-h-px min-w-px relative" data-name="Container">
      <div className="content-stretch flex flex-col gap-[15px] items-start max-w-[inherit] px-[14.063px] relative w-full">
        <Heading3 />
        <Container15 />
        <Container16 />
        <Container17 />
        <Container18 />
      </div>
    </div>
  );
}

function Section3() {
  return (
    <div className="content-center flex flex-wrap gap-0 items-center pb-[84.37px] pt-[168.75px] relative shrink-0 w-[1124.06px]" data-name="Section">
      <Container13 />
      <Container14 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px]">Bonds trading example</p>
      </div>
    </div>
  );
}

function Heading2Margin() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pb-[18.75px] relative self-stretch shrink-0" data-name="Heading 2:margin">
      <Heading6 />
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#34e834] content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px pb-[7.56px] pt-[6.75px] px-[15.938px] relative rounded-[3.75px]" data-name="Background">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16.9px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[25.31px]">Selling: 5-Year U.S Treasury Note</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pb-[37.5px] relative self-stretch shrink-0" data-name="Margin">
      <Background2 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Heading2Margin />
      <Margin />
    </div>
  );
}

function Heading7() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[28.13px] right-[28.12px] top-[23.44px]" data-name="Heading 5">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[22.5px] relative shrink-0 text-[18.8px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">The gross profit on your trade is</p>
        <p>calculated as follows:</p>
      </div>
    </div>
  );
}

function Heading8() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[28.13px] right-[28.12px] top-[83.44px]" data-name="Heading 6">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Opening Price</p>
      </div>
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[28.13px] pb-[6.165px] pt-[4.965px] right-[28.12px] top-[101.44px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(218,218,218,0.8)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[19.69px] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">($120.25 x 10 contracts) x $200 = USD</p>
        <p>$240,500</p>
      </div>
    </div>
  );
}

function Heading9() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[28.13px] right-[28.12px] top-[167.56px]" data-name="Heading 6">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Closing Price</p>
      </div>
    </div>
  );
}

function HorizontalBorder2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[28.13px] pb-[6.125px] pt-[5.625px] right-[28.12px] top-[185.56px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(218,218,218,0.8)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[19.69px]">($118.32 x 10 contracts) x $200 = USD $236,640</p>
      </div>
    </div>
  );
}

function Heading10() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[28.13px] right-[28.12px] top-[232px]" data-name="Heading 6">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Gross Profit on Trade</p>
      </div>
    </div>
  );
}

function HorizontalBorder3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[28.13px] pb-[6.125px] pt-[5.625px] right-[28.12px] top-[250px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(218,218,218,0.8)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[19.69px]">$240,500 - $236,640 = USD $3,860</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-white h-[304.88px] relative rounded-[9.38px] shrink-0 w-full" data-name="Background">
      <Heading7 />
      <Heading8 />
      <HorizontalBorder1 />
      <Heading9 />
      <HorizontalBorder2 />
      <Heading10 />
      <HorizontalBorder3 />
    </div>
  );
}

function Container23() {
  return (
    <div className="flex-[1_0_0] max-w-[1124.06005859375px] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] px-[14.063px] relative size-full">
        <Background3 />
      </div>
    </div>
  );
}

function Heading11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 5">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[18.8px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px] whitespace-pre-wrap">Opening the Position</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[22.5px] relative shrink-0 text-[15px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">You hold the view that the US Federal</p>
        <p className="mb-0">Reserve will increase Interest Rates and 5-</p>
        <p className="mb-0">Year Treasury yields will increase as a</p>
        <p className="mb-0">result. You sell 10 contracts of March 2017</p>
        <p>5-Year US Treasury Note at 120.25.</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-white relative rounded-[9.38px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col gap-[15px] items-start px-[28.125px] py-[23.438px] relative w-full">
        <Heading11 />
        <Container25 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="flex-[1_0_0] max-w-[1124.06005859375px] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] px-[14.063px] relative size-full">
        <Background4 />
      </div>
    </div>
  );
}

function Heading12() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[28.12px] right-[28.13px] top-[23.44px]" data-name="Heading 5">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[18.8px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px]">Closing the Position</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[28.12px] right-[28.13px] top-[60.94px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[22.5px] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Your view is correct and March 2017 5-</p>
        <p>Year T-note prices decline.</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[28.12px] right-[28.13px] top-[105.94px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[22.5px] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Note: For Bonds with a contract size of</p>
        <p className="mb-0">200, it means every 0.01 move in the Bond</p>
        <p>CFD is worth US$2.</p>
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-white h-[196.88px] relative rounded-[9.38px] shrink-0 w-full" data-name="Background">
      <Heading12 />
      <Container27 />
      <Container28 />
    </div>
  );
}

function Container26() {
  return (
    <div className="flex-[1_0_0] max-w-[1124.06005859375px] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] px-[14.063px] relative size-full">
        <Background5 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-wrap gap-0 items-start relative shrink-0 w-[1124.06px]" data-name="Container">
      <Container23 />
      <Container24 />
      <Container26 />
    </div>
  );
}

function Container20() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[14.063px] relative size-full">
          <Container21 />
          <Container22 />
        </div>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-wrap items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Container20 />
    </div>
  );
}

function Section4() {
  return (
    <div className="bg-[#f3f3f3] relative shrink-0 w-full" data-name="Section">
      <div className="content-stretch flex flex-col items-start px-[157.97px] py-[84.375px] relative w-full">
        <Container19 />
      </div>
    </div>
  );
}

function Heading13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px]">Upcoming Expiring Futures</p>
      </div>
    </div>
  );
}

function Heading2Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pb-[18.75px] relative self-stretch shrink-0" data-name="Heading 2:margin">
      <Heading13 />
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#34e834] content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px pb-[7.56px] pt-[6.75px] px-[15.938px] relative rounded-[3.75px]" data-name="Background">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16.9px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[25.31px]">Futures expiry/roll process</p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pb-[37.5px] relative self-stretch shrink-0" data-name="Margin">
      <Background6 />
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex items-start justify-between mb-[-0.8px] relative shrink-0 w-full" data-name="Container">
      <Heading2Margin1 />
      <Margin1 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.8px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[25.31px] relative shrink-0 text-[16.9px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">XAI Technology Futures CFDs are set to expire two working days before the contract expires on the underlying market. When a Futures CFD</p>
        <p className="mb-0">contract expires, all open positions will be closed at the futures settlement price; as reported by the futures exchange. This process would</p>
        <p className="mb-0">usually take place on the day following the expiry. Open positions are not rolled to the next front month so any clients wishing to hold long</p>
        <p>term positions must reopen the trade on the next available contract.</p>
      </div>
    </div>
  );
}

function Heading14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 6">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[16.9px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[23.63px]">Name</p>
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#dadada] mb-[-0.01px] min-h-[68.4375px] relative shrink-0 w-full z-[2]" data-name="Background">
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center min-h-[inherit] pb-[22.41px] pt-[22.4px] px-[14.063px] relative w-full">
          <div className="absolute bg-[#dadada] inset-0 rounded-tl-[9.38px] rounded-tr-[9.38px]" data-name="Background" />
          <Heading14 />
        </div>
      </div>
    </div>
  );
}

function Item14() {
  return (
    <div className="min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] pb-[16.75px] pt-[16.13px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">EURBBL_H6</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item15() {
  return (
    <div className="bg-[#f6f6f6] min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] pb-[16.76px] pt-[16.12px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">EURBND_H6</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item16() {
  return (
    <div className="min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] pb-[16.75px] pt-[16.13px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">EURSCA_H6</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item17() {
  return (
    <div className="bg-[#f6f6f6] min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] pb-[16.76px] pt-[16.12px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">UST05Y_H6</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item18() {
  return (
    <div className="min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] pb-[16.75px] pt-[16.13px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">UST10Y_H6</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item19() {
  return (
    <div className="bg-[#f6f6f6] min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] pb-[16.76px] pt-[16.12px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">UST30Y_H6</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item20() {
  return (
    <div className="min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] pb-[16.75px] pt-[16.13px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">UKGB_H6</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item21() {
  return (
    <div className="bg-[#f6f6f6] min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] pb-[16.76px] pt-[16.12px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">JGB10Y_H6</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item22() {
  return (
    <div className="min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] pb-[16.5px] pt-[16.38px] px-[12.188px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px relative text-[13.1px] text-black" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px] whitespace-pre-wrap">ITB10Y_H6</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function List2() {
  return (
    <div className="mb-[-0.01px] relative shrink-0 w-full z-[1]" data-name="List">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Item14 />
        <Item15 />
        <Item16 />
        <Item17 />
        <Item18 />
        <Item19 />
        <Item20 />
        <Item21 />
        <Item22 />
      </div>
    </div>
  );
}

function Border() {
  return (
    <div className="content-stretch flex flex-col isolate items-start pb-[1.01px] pl-px pt-px relative self-stretch shrink-0 w-[219.03px]" data-name="Border">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b border-l border-solid border-t inset-0 pointer-events-none" />
      <Background7 />
      <List2 />
    </div>
  );
}

function Heading15() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Heading 6">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[16.9px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[23.63px]">Start Date</p>
      </div>
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-[#dadada] mb-[-0.01px] min-h-[68.4375px] relative shrink-0 w-full z-[2]" data-name="Background">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center min-h-[inherit] pb-[22.41px] pt-[22.4px] px-[14.063px] relative w-full">
          <div className="absolute bg-[#dadada] inset-0 rounded-tl-[9.38px] rounded-tr-[9.38px]" data-name="Background" />
          <Heading15 />
        </div>
      </div>
    </div>
  );
}

function Item23() {
  return (
    <div className="min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.75px] pt-[16.13px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">03/12/2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item24() {
  return (
    <div className="bg-[#f6f6f6] min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.76px] pt-[16.12px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">03/12/2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item25() {
  return (
    <div className="min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.75px] pt-[16.13px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">03/12/2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item26() {
  return (
    <div className="bg-[#f6f6f6] min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.76px] pt-[16.12px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">25/11/2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item27() {
  return (
    <div className="min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.75px] pt-[16.13px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">25/11/2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item28() {
  return (
    <div className="bg-[#f6f6f6] min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.76px] pt-[16.12px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">26/11/2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item29() {
  return (
    <div className="min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.75px] pt-[16.13px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">24/11/2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item30() {
  return (
    <div className="bg-[#f6f6f6] min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.76px] pt-[16.12px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">09/12/2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item31() {
  return (
    <div className="min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.5px] pt-[16.38px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">03/12/2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function List3() {
  return (
    <div className="mb-[-0.01px] relative shrink-0 w-full z-[1]" data-name="List">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Item23 />
        <Item24 />
        <Item25 />
        <Item26 />
        <Item27 />
        <Item28 />
        <Item29 />
        <Item30 />
        <Item31 />
      </div>
    </div>
  );
}

function Border1() {
  return (
    <div className="content-stretch flex flex-col isolate items-start pb-[1.01px] pl-px pt-px relative self-stretch shrink-0 w-[219.02px]" data-name="Border">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b border-l border-solid border-t inset-0 pointer-events-none" />
      <Background8 />
      <List3 />
    </div>
  );
}

function Heading16() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Heading 6">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[16.9px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[23.63px]">Close Only Date</p>
      </div>
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-[#dadada] mb-[-0.01px] min-h-[68.4375px] relative shrink-0 w-full z-[2]" data-name="Background">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center min-h-[inherit] pb-[22.41px] pt-[22.4px] px-[14.063px] relative w-full">
          <div className="absolute bg-[#dadada] inset-0 rounded-tl-[9.38px] rounded-tr-[9.38px]" data-name="Background" />
          <Heading16 />
        </div>
      </div>
    </div>
  );
}

function Item32() {
  return (
    <div className="min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.75px] pt-[16.13px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">03/03/2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item33() {
  return (
    <div className="bg-[#f6f6f6] min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.76px] pt-[16.12px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">03/03/2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item34() {
  return (
    <div className="min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.75px] pt-[16.13px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">03/03/2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item35() {
  return (
    <div className="bg-[#f6f6f6] min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.76px] pt-[16.12px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">24/02/2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item36() {
  return (
    <div className="min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.75px] pt-[16.13px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">24/02/2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item37() {
  return (
    <div className="bg-[#f6f6f6] min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.76px] pt-[16.12px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">24/02/2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item38() {
  return (
    <div className="min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.75px] pt-[16.13px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">23/02/2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item39() {
  return (
    <div className="bg-[#f6f6f6] min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.76px] pt-[16.12px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">09/03/2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item40() {
  return (
    <div className="min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.5px] pt-[16.38px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">03/03/2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function List4() {
  return (
    <div className="mb-[-0.01px] relative shrink-0 w-full z-[1]" data-name="List">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Item32 />
        <Item33 />
        <Item34 />
        <Item35 />
        <Item36 />
        <Item37 />
        <Item38 />
        <Item39 />
        <Item40 />
      </div>
    </div>
  );
}

function Border2() {
  return (
    <div className="content-stretch flex flex-col isolate items-start pb-[1.01px] pl-px pt-px relative self-stretch shrink-0 w-[219.03px]" data-name="Border">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b border-l border-solid border-t inset-0 pointer-events-none" />
      <Background9 />
      <List4 />
    </div>
  );
}

function Heading17() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Heading 6">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[16.9px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[23.63px]">Expiry Date</p>
      </div>
    </div>
  );
}

function Background10() {
  return (
    <div className="bg-[#34e834] mb-[-0.01px] min-h-[68.4375px] relative shrink-0 w-full z-[2]" data-name="Background">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center min-h-[inherit] pb-[31.78px] pt-[13.03px] px-[14.063px] relative w-full">
          <div className="absolute bg-[#34e834] inset-[-29.85%_0_-1.16%_0] rounded-tl-[9.38px] rounded-tr-[9.38px]" data-name="Background" />
          <Heading17 />
        </div>
      </div>
    </div>
  );
}

function Item41() {
  return (
    <div className="min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.75px] pt-[16.13px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">04/03/2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item42() {
  return (
    <div className="bg-[#f6f6f6] min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.76px] pt-[16.12px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">04/03/2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item43() {
  return (
    <div className="min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.75px] pt-[16.13px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">04/03/2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item44() {
  return (
    <div className="bg-[#f6f6f6] min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.76px] pt-[16.12px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">25/02/2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item45() {
  return (
    <div className="min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.75px] pt-[16.13px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">25/02/2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item46() {
  return (
    <div className="bg-[#f6f6f6] min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.76px] pt-[16.12px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">25/02/2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item47() {
  return (
    <div className="min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.75px] pt-[16.13px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">24/02/2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item48() {
  return (
    <div className="bg-[#f6f6f6] min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.76px] pt-[16.12px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">10/03/2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item49() {
  return (
    <div className="min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.5px] pt-[16.38px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">04/03/2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function List5() {
  return (
    <div className="mb-[-0.01px] relative shrink-0 w-full z-[1]" data-name="List">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Item41 />
        <Item42 />
        <Item43 />
        <Item44 />
        <Item45 />
        <Item46 />
        <Item47 />
        <Item48 />
        <Item49 />
      </div>
    </div>
  );
}

function Border3() {
  return (
    <div className="content-stretch flex flex-col isolate items-start pb-[1.01px] pl-px pt-px relative self-stretch shrink-0 w-[219.02px]" data-name="Border">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b border-l border-solid border-t inset-0 pointer-events-none" />
      <Background10 />
      <List5 />
    </div>
  );
}

function Heading18() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Heading 6">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[16.9px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[23.63px]">Contract Month</p>
      </div>
    </div>
  );
}

function Background11() {
  return (
    <div className="bg-[#dadada] mb-[-0.01px] min-h-[68.4375px] relative shrink-0 w-full z-[2]" data-name="Background">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center min-h-[inherit] pb-[22.41px] pt-[22.4px] px-[14.063px] relative w-full">
          <div className="absolute bg-[#dadada] inset-0 rounded-tl-[9.38px] rounded-tr-[9.38px]" data-name="Background" />
          <Heading18 />
        </div>
      </div>
    </div>
  );
}

function Item50() {
  return (
    <div className="min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.75px] pt-[16.13px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">March</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item51() {
  return (
    <div className="bg-[#f6f6f6] min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.76px] pt-[16.12px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">March</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item52() {
  return (
    <div className="min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.75px] pt-[16.13px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">March</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item53() {
  return (
    <div className="bg-[#f6f6f6] min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.76px] pt-[16.12px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">March</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item54() {
  return (
    <div className="min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.75px] pt-[16.13px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">March</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item55() {
  return (
    <div className="bg-[#f6f6f6] min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.76px] pt-[16.12px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">March</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item56() {
  return (
    <div className="min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.75px] pt-[16.13px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">March</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item57() {
  return (
    <div className="bg-[#f6f6f6] min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(119,119,119,0.4)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.76px] pt-[16.12px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">March</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item58() {
  return (
    <div className="min-h-[46.875px] relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] pb-[16.5px] pt-[16.38px] px-[12.188px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[13.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[13.13px]">March</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function List6() {
  return (
    <div className="mb-[-0.01px] relative shrink-0 w-full z-[1]" data-name="List">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Item50 />
        <Item51 />
        <Item52 />
        <Item53 />
        <Item54 />
        <Item55 />
        <Item56 />
        <Item57 />
        <Item58 />
      </div>
    </div>
  );
}

function Border4() {
  return (
    <div className="content-stretch flex flex-col isolate items-start pb-[1.01px] pt-px px-px relative self-stretch shrink-0 w-[219.83px]" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[rgba(119,119,119,0.4)] border-solid inset-0 pointer-events-none" />
      <Background11 />
      <List6 />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex items-start justify-center relative rounded-[1.88px] shrink-0 w-full" data-name="Container">
      <Border />
      <Border1 />
      <Border2 />
      <Border3 />
      <Border4 />
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center mb-[-0.8px] overflow-auto pt-[60.8px] relative shrink-0 w-full" data-name="Container">
      <Container33 />
    </div>
  );
}

function Container29() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[0.8px] px-[14.063px] relative size-full">
        <Container30 />
        <Container31 />
        <Container32 />
      </div>
    </div>
  );
}

function Section5() {
  return (
    <div className="content-stretch flex flex-wrap items-start justify-center pt-[84.37px] relative shrink-0 w-[1124.06px]" data-name="Section">
      <Container29 />
    </div>
  );
}

function Heading19() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px]">Spreads</p>
      </div>
    </div>
  );
}

function Heading2Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pb-[18.75px] relative self-stretch shrink-0" data-name="Heading 2:margin">
      <Heading19 />
    </div>
  );
}

function Background12() {
  return (
    <div className="bg-[#34e834] content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px pb-[7.56px] pt-[6.75px] px-[15.938px] relative rounded-[3.75px]" data-name="Background">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16.9px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[25.31px]">Bonds</p>
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pb-[37.5px] relative self-stretch shrink-0" data-name="Margin">
      <Background12 />
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Heading2Margin2 />
      <Margin2 />
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-[rgba(0,0,0,0.6)] tracking-[-0.281px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p>
          <span className="leading-[22.5px]">{`* `}</span>
          <span className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[22.5px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            MIN
          </span>
          <span className="leading-[22.5px]">{` - minimum, `}</span>
          <span className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[22.5px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            AVG
          </span>
          <span className="leading-[22.5px]">{` - average`}</span>
        </p>
      </div>
    </div>
  );
}

function Container41() {
  return <div className="h-[16.88px] shrink-0 w-[104.5px]" data-name="Container" />;
}

function Margin3() {
  return <div className="h-[8px] shrink-0 w-[12px]" data-name="Margin" />;
}

function Container40() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative">
        <Container41 />
        <Margin3 />
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="absolute bg-[#f3f3f3] left-[132.12px] rounded-[28.13px] top-0" data-name="Input">
      <div className="content-stretch flex items-start overflow-clip pl-[11.75px] pr-[33.313px] py-[8.938px] relative rounded-[inherit]">
        <Container40 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#eaeaea] border-solid inset-0 pointer-events-none rounded-[28.13px]" />
    </div>
  );
}

function SearchSvg() {
  return (
    <div className="relative shrink-0 size-[13.13px]" data-name="search.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.13 13.13">
        <g clipPath="url(#clip0_2125_12089)" id="search.svg">
          <path d={svgPaths.p17da9e80} fill="var(--fill-0, black)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2125_12089">
            <rect fill="white" height="13.13" width="13.13" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SearchSvgFill() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 size-[13.13px]" data-name="search.svg fill">
      <SearchSvg />
    </div>
  );
}

function Image6() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start right-[14.06px] size-[13.13px] top-1/2" data-name="Image">
      <SearchSvgFill />
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[34.75px] relative shrink-0 w-[293.68px]" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['DM_Sans:Light',sans-serif] font-light h-[23px] justify-center leading-[0] left-0 text-[15px] text-[rgba(0,0,0,0.6)] top-[15.69px] tracking-[-0.281px] w-[119.274px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px] whitespace-pre-wrap">Search by Symbol</p>
      </div>
      <Input />
      <Image6 />
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-[rgba(0,0,0,0.6)] tracking-[-0.281px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px]">Table Skin</p>
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pr-[9.375px] relative self-stretch shrink-0" data-name="Margin">
      <Container43 />
    </div>
  );
}

function Background13() {
  return <div className="bg-[#e2e3e3] rounded-[3.75px] shrink-0 size-[22.5px]" data-name="Background" />;
}

function Margin5() {
  return (
    <div className="content-stretch flex flex-col h-[22.5px] items-start pr-[9.375px] relative shrink-0 w-[31.875px]" data-name="Margin">
      <Background13 />
    </div>
  );
}

function Background14() {
  return <div className="bg-black rounded-[3.75px] shrink-0 size-[22.5px]" data-name="Background" />;
}

function Container42() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <Margin4 />
      <Margin5 />
      <Background14 />
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container38 />
      <Container39 />
      <Container42 />
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[15px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px]">Product</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[15px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px]">All Accounts</p>
      </div>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(119,119,119,0.8)] relative rounded-[9.38px] shrink-0 w-full" data-name="Overlay">
      <div className="content-stretch flex items-start justify-between p-[15px] relative w-full">
        <Container44 />
        <Container45 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px]">SYMBOL</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[260.63px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px]">DESCRIPTION</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[30px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px]">MIN</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[30px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px]">AVG</p>
      </div>
    </div>
  );
}

function Overlay1() {
  return (
    <div className="bg-[rgba(218,218,218,0.7)] h-[51.56px] relative rounded-[9.38px] shrink-0 w-full" data-name="Overlay">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[15px] relative size-full">
          <Container46 />
          <Container47 />
          <Container48 />
          <Container49 />
        </div>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">EURBOBL</p>
        </div>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">Euro Bobl</p>
        </div>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.010</p>
        </div>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.010</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder4() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[0.5px] px-[15px] relative size-full">
          <Container51 />
          <Container52 />
          <Container53 />
          <Container54 />
        </div>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">EURBUND</p>
        </div>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">Euro Bund</p>
        </div>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.010</p>
        </div>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.011</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder5() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[0.5px] px-[15px] relative size-full">
          <Container55 />
          <Container56 />
          <Container57 />
          <Container58 />
        </div>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">EURSCHA</p>
        </div>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">Euro Schatz</p>
        </div>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.010</p>
        </div>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.010</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder6() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[0.5px] px-[15px] relative size-full">
          <Container59 />
          <Container60 />
          <Container61 />
          <Container62 />
        </div>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">ITBTP10Y</p>
        </div>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">BTP Italian Bonds</p>
        </div>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.020</p>
        </div>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.020</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder7() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[0.5px] px-[15px] relative size-full">
          <Container63 />
          <Container64 />
          <Container65 />
          <Container66 />
        </div>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">JGB10Y</p>
        </div>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">Japanese 10 YR</p>
        </div>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.030</p>
        </div>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.034</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder8() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[0.5px] px-[15px] relative size-full">
          <Container67 />
          <Container68 />
          <Container69 />
          <Container70 />
        </div>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">UKGB</p>
        </div>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">UK Long Gilt</p>
        </div>
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.010</p>
        </div>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.012</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder9() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[0.5px] px-[15px] relative size-full">
          <Container71 />
          <Container72 />
          <Container73 />
          <Container74 />
        </div>
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">UST05Y</p>
        </div>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">US 5 YR T-Note</p>
        </div>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.014</p>
        </div>
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.014</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder10() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[0.5px] px-[15px] relative size-full">
          <Container75 />
          <Container76 />
          <Container77 />
          <Container78 />
        </div>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">UST10Y</p>
        </div>
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">US 10 YR T-Note</p>
        </div>
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.031</p>
        </div>
      </div>
    </div>
  );
}

function Container82() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.031</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder11() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[0.5px] px-[15px] relative size-full">
          <Container79 />
          <Container80 />
          <Container81 />
          <Container82 />
        </div>
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">UST30Y</p>
        </div>
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">US T-Bond (30 year)</p>
        </div>
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.030</p>
        </div>
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.031</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder12() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[0.5px] px-[15px] relative size-full">
          <Container83 />
          <Container84 />
          <Container85 />
          <Container86 />
        </div>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col items-start max-h-[562.5px] overflow-auto relative shrink-0 w-full" data-name="Container">
      <HorizontalBorder4 />
      <HorizontalBorder5 />
      <HorizontalBorder6 />
      <HorizontalBorder7 />
      <HorizontalBorder8 />
      <HorizontalBorder9 />
      <HorizontalBorder10 />
      <HorizontalBorder11 />
      <HorizontalBorder12 />
    </div>
  );
}

function Background15() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Background">
      <Overlay />
      <Overlay1 />
      <Container50 />
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col gap-[18.75px] items-start relative shrink-0 w-full" data-name="Container">
      <Container37 />
      <Background15 />
    </div>
  );
}

function Container34() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[14.063px] relative size-full">
        <Container35 />
        <Container36 />
      </div>
    </div>
  );
}

function Section6() {
  return (
    <div className="content-stretch flex flex-wrap items-start justify-center pb-[84.37px] pt-[168.75px] relative shrink-0 w-[1124.06px]" data-name="Section">
      <Container34 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[48.8px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[58.5px]">Start trading</p>
      </div>
    </div>
  );
}

function Heading20() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[22.5px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[27px]">global markets today!</p>
      </div>
    </div>
  );
}

function Link10() {
  return (
    <div className="bg-[#34e834] content-stretch flex items-start justify-center pb-[15.43px] pt-[15.07px] px-[39px] relative rounded-[5.63px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[5.63px]" />
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[20.6px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24.38px]">Open Trading Account</p>
      </div>
    </div>
  );
}

function Link11() {
  return (
    <div className="content-stretch flex items-start justify-center pb-[15.43px] pt-[15.07px] px-[39px] relative rounded-[7.5px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[7.5px]" />
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[20.6px] text-center text-white tracking-[0.469px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24.38px]">View My Dasboard</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex gap-[19.13px] items-start pt-[4.63px] px-[262.69px] relative w-full">
        <Link10 />
        <Link11 />
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col gap-[18.8px] items-start px-[14.063px] relative size-full">
        <Heading />
        <Heading20 />
        <Container89 />
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="content-stretch flex flex-wrap items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Container88 />
    </div>
  );
}

function Section7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[244.6%] left-0 max-w-none top-[-72.3%] w-full" src={imgSection1} />
      </div>
      <div className="content-stretch flex flex-col items-start px-[157.97px] py-[117.188px] relative w-full">
        <Container87 />
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
      <Section5 />
      <Section6 />
      <Section7 />
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