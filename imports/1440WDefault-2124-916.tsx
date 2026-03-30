import svgPaths from "./svg-vuwn8am6lz";
import imgSection from "figma:asset/670de4f093518026af122894c8f169ef3102fb6c.png";
import imgIconFuturesWebp from "figma:asset/f16315421ae217e214668fdaaea9611dbb4d91dc.png";
import imgSection1 from "figma:asset/49712abe12194c268a5c9981e2bf290c369efc5f.png";

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px]">Range of Products</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[8.1px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[25.31px] relative shrink-0 text-[16.9px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">{`XAI Technology's carefully selected range of products gives you access to the most`}</p>
        <p>popular and liquid markets across the world for the best trading opportunities 24/7.</p>
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
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#34e834] text-[13.1px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
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
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-[rgba(255,255,255,0.3)] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
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

function IconForexSvg1() {
  return (
    <div className="h-[84.38px] relative shrink-0 w-[95.792px]" data-name="icon-forex.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 95.7924 84.38">
        <g clipPath="url(#clip0_2124_934)" id="icon-forex.svg">
          <path clipRule="evenodd" d={svgPaths.p20a7c300} fill="var(--fill-0, #34E834)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2124_934">
            <rect fill="white" height="84.38" width="95.7924" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconForexSvgFill() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[84.38px]" data-name="icon-forex.svg fill">
      <IconForexSvg1 />
    </div>
  );
}

function IconForexSvg() {
  return (
    <div className="content-stretch flex items-start max-w-[705.6300048828125px] overflow-clip relative self-stretch shrink-0" data-name="icon-forex.svg">
      <IconForexSvgFill />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex items-start left-[14.06px] top-0 w-[84.38px]" data-name="Container">
      <IconForexSvg />
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.07px] top-[103.13px]" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px]">Forex CFD</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.07px] top-[168.51px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[28.13px] relative shrink-0 text-[16.9px] text-[rgba(0,0,0,0.5)] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">The Forex market provides traders the opportunity to trade 24 hours a day, 5 days a</p>
        <p className="mb-0">week in the world’s most liquid financial market. Traders can take advantage of some</p>
        <p>of the tightest spreads, superior execution, and deep liquidity across 61 currency pairs.</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[26.25px] whitespace-pre-wrap">See our</p>
      </div>
    </div>
  );
}

function Link9() {
  return (
    <div className="bg-white relative rounded-[9.38px] shrink-0 w-full" data-name="Link">
      <div className="content-stretch flex flex-col items-start pb-[11.88px] pt-[10.5px] px-[15px] relative w-full">
        <Container11 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] mb-[-0.75px] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[28.13px]">Spreads</p>
        </div>
      </div>
    </div>
  );
}

function Item8() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[213.34px]" data-name="Item">
      <Link9 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[26.25px] whitespace-pre-wrap">Download</p>
      </div>
    </div>
  );
}

function Link10() {
  return (
    <div className="bg-white relative rounded-[9.38px] shrink-0 w-full" data-name="Link">
      <div className="content-stretch flex flex-col items-start pb-[11.88px] pt-[10.5px] px-[15px] relative w-full">
        <Container12 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] mb-[-0.75px] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[28.13px]">Product Details</p>
        </div>
      </div>
    </div>
  );
}

function Item9() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[213.33px]" data-name="Item">
      <Link10 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[26.25px] whitespace-pre-wrap">Popular Account</p>
      </div>
    </div>
  );
}

function Link11() {
  return (
    <div className="bg-white relative rounded-[9.38px] shrink-0 w-full" data-name="Link">
      <div className="content-stretch flex flex-col items-start pb-[11.88px] pt-[10.5px] px-[15px] relative w-full">
        <Container13 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] mb-[-0.75px] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[28.13px]">Raw Spread</p>
        </div>
      </div>
    </div>
  );
}

function Item10() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[213.34px]" data-name="Item">
      <Link11 />
    </div>
  );
}

function List1() {
  return (
    <div className="absolute content-stretch flex gap-[18.8px] items-start justify-center left-[14.06px] right-[14.07px] top-[276.94px]" data-name="List">
      <Item8 />
      <Item9 />
      <Item10 />
    </div>
  );
}

function Container8() {
  return (
    <div className="max-w-[1058.43994140625px] relative self-stretch shrink-0 w-[705.63px]" data-name="Container">
      <Container9 />
      <Heading2 />
      <Container10 />
      <List1 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 6">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[18px] whitespace-pre-wrap">Markets</p>
        </div>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[30px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[36px] whitespace-pre-wrap">Forex</p>
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
        <Heading3 />
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

function Item11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[12.688px] pl-[31.875px] pr-[6.563px] pt-[12.188px] relative w-full">
        <Image />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">61 currency pairs</p>
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
    <div className="absolute left-[4.69px] size-[15px] top-[13.12px]" data-name="Image">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <CheckSvgFill1 />
      </div>
    </div>
  );
}

function Item12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[12.688px] pl-[31.875px] pr-[6.563px] pt-[12.188px] relative w-full">
        <Image1 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">Tight spreads from 0.0 pips</p>
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

function Item13() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[12.688px] pl-[31.875px] pr-[6.563px] pt-[12.188px] relative w-full">
        <Image2 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">Up to 1:1000 leverage</p>
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
    <div className="absolute content-stretch flex flex-col items-start left-[4.69px] size-[15px] top-[13.13px]" data-name="Image">
      <CheckSvgFill3 />
    </div>
  );
}

function Item14() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div className="content-stretch flex flex-col items-start pl-[31.875px] pr-[6.563px] py-[12.188px] relative w-full">
        <Image3 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">Deep liquidity</p>
        </div>
      </div>
    </div>
  );
}

function List2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="List">
      <Item11 />
      <Item12 />
      <Item13 />
      <Item14 />
    </div>
  );
}

function ListMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4.688px] relative shrink-0 w-full" data-name="List:margin">
      <List2 />
    </div>
  );
}

function Link12() {
  return (
    <div className="relative rounded-[7.5px] shrink-0 w-full" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[7.5px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center pb-[7.19px] pt-[6.31px] px-[16.438px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[15px] text-black text-center tracking-[0.469px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[24.38px]">DETAILS</p>
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
      <Link12 />
    </div>
  );
}

function Container14() {
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
      <Container14 />
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

function Heading6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 6">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[18px] whitespace-pre-wrap">Markets</p>
        </div>
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[30px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[36px] whitespace-pre-wrap">Indices</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div className="relative rounded-tl-[4.63px] rounded-tr-[4.63px] shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none rounded-tl-[4.63px] rounded-tr-[4.63px]" />
      <div className="content-stretch flex flex-col items-start pb-[14.563px] px-[6.563px] relative w-full">
        <Heading6 />
        <Heading4 />
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

function Item15() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[12.535px] pl-[31.875px] pr-[6.563px] pt-[11.465px] relative w-full">
        <Image4 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[21.56px] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="mb-0">25 Indices to trade from across</p>
          <p>the globe</p>
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
    <div className="absolute left-[4.69px] size-[15px] top-[13.12px]" data-name="Image">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <CheckSvgFill5 />
      </div>
    </div>
  );
}

function Item16() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[12.688px] pl-[31.875px] pr-[6.563px] pt-[12.188px] relative w-full">
        <Image5 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">Up to 1:200 leverage</p>
        </div>
      </div>
    </div>
  );
}

function CheckSvg6() {
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

function CheckSvgFill6() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pr-[0.455px] relative shrink-0 size-[15px]" data-name="check.svg fill">
      <CheckSvg6 />
    </div>
  );
}

function Image6() {
  return (
    <div className="absolute left-[4.69px] size-[15px] top-[13.13px]" data-name="Image">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <CheckSvgFill6 />
      </div>
    </div>
  );
}

function Item17() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[12.688px] pl-[31.875px] pr-[6.563px] pt-[12.188px] relative w-full">
        <Image6 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">No commissions</p>
        </div>
      </div>
    </div>
  );
}

function CheckSvg7() {
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

function CheckSvgFill7() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pr-[0.455px] relative shrink-0 size-[15px]" data-name="check.svg fill">
      <CheckSvg7 />
    </div>
  );
}

function Image7() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[4.69px] size-[15px] top-[13.13px]" data-name="Image">
      <CheckSvgFill7 />
    </div>
  );
}

function Item18() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div className="content-stretch flex flex-col items-start pl-[31.875px] pr-[6.563px] py-[12.188px] relative w-full">
        <Image7 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">All platforms</p>
        </div>
      </div>
    </div>
  );
}

function List3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="List">
      <Item15 />
      <Item16 />
      <Item17 />
      <Item18 />
    </div>
  );
}

function ListMargin1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4.688px] relative shrink-0 w-full" data-name="List:margin">
      <List3 />
    </div>
  );
}

function Link13() {
  return (
    <div className="relative rounded-[7.5px] shrink-0 w-full" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[7.5px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center pb-[7.19px] pt-[6.31px] px-[16.438px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[15px] text-black text-center tracking-[0.469px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[24.38px]">DETAILS</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start max-w-[302.81201171875px] p-[23.438px] relative rounded-[5.63px] shrink-0 w-[302.81px]" data-name="Background">
      <HorizontalBorder1 />
      <ListMargin1 />
      <Link13 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1058.43994140625px] px-[14.063px] relative self-stretch shrink-0 w-[352.81px]" data-name="Container">
      <Background3 />
    </div>
  );
}

function IconIndicesSvg1() {
  return (
    <div className="h-[84.38px] relative shrink-0 w-[73.071px]" data-name="icon-indices.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 73.0713 84.38">
        <g clipPath="url(#clip0_2124_940)" id="icon-indices.svg">
          <path clipRule="evenodd" d={svgPaths.p2b0ce100} fill="var(--fill-0, #34E834)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2124_940">
            <rect fill="white" height="84.38" width="73.0713" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconIndicesSvgFill() {
  return (
    <div className="content-stretch flex flex-col h-[84.38px] items-center justify-center overflow-clip relative shrink-0 w-[73.06px]" data-name="icon-indices.svg fill">
      <IconIndicesSvg1 />
    </div>
  );
}

function IconIndicesSvg() {
  return (
    <div className="content-stretch flex items-start max-w-[705.6300048828125px] overflow-clip relative self-stretch shrink-0" data-name="icon-indices.svg">
      <IconIndicesSvgFill />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[84.38px]" data-name="Container">
      <IconIndicesSvg />
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px] whitespace-pre-wrap">Indices CFD</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[28.13px] relative shrink-0 text-[16.9px] text-[rgba(0,0,0,0.5)] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">{`Gain exposure to the world’s largest equity markets through XAI Technology's`}</p>
        <p className="mb-0">offering of global Indices CFDs. With spreads from 0.4 points on 25 Indices, traders</p>
        <p className="mb-0">can take a wider view of equities markets whilst enjoying commission free and 24/5</p>
        <p>trading across major markets.</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[26.25px] whitespace-pre-wrap">See our</p>
      </div>
    </div>
  );
}

function Link14() {
  return (
    <div className="bg-white relative rounded-[9.38px] shrink-0 w-full" data-name="Link">
      <div className="content-stretch flex flex-col items-start pb-[11.88px] pt-[10.5px] px-[15px] relative w-full">
        <Container20 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] mb-[-0.75px] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[28.13px]">Spreads</p>
        </div>
      </div>
    </div>
  );
}

function Item19() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[213.34px]" data-name="Item">
      <Link14 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[26.25px] whitespace-pre-wrap">Download</p>
      </div>
    </div>
  );
}

function Link15() {
  return (
    <div className="bg-white relative rounded-[9.38px] shrink-0 w-full" data-name="Link">
      <div className="content-stretch flex flex-col items-start pb-[11.88px] pt-[10.5px] px-[15px] relative w-full">
        <Container21 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] mb-[-0.75px] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[28.13px]">Product Details</p>
        </div>
      </div>
    </div>
  );
}

function Item20() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[213.33px]" data-name="Item">
      <Link15 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[26.25px] whitespace-pre-wrap">Popular Account</p>
      </div>
    </div>
  );
}

function Link16() {
  return (
    <div className="bg-white relative rounded-[9.38px] shrink-0 w-full" data-name="Link">
      <div className="content-stretch flex flex-col items-start pb-[11.88px] pt-[10.5px] px-[15px] relative w-full">
        <Container22 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] mb-[-0.75px] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[28.13px]">Raw Spread</p>
        </div>
      </div>
    </div>
  );
}

function Item21() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[213.34px]" data-name="Item">
      <Link16 />
    </div>
  );
}

function List4() {
  return (
    <div className="content-stretch flex gap-[18.7px] items-start justify-center pt-[4.74px] relative shrink-0 w-full" data-name="List">
      <Item19 />
      <Item20 />
      <Item21 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col gap-[18.7px] items-start max-w-[1058.43994140625px] px-[14.063px] relative self-stretch shrink-0 w-[705.63px]" data-name="Container">
      <Container18 />
      <Heading7 />
      <Container19 />
      <List4 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-wrap gap-0 items-start relative shrink-0 w-full" data-name="Container">
      <Container16 />
      <Container17 />
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#f6f6f6] relative rounded-[18.75px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col items-start px-[18.75px] py-[28.125px] relative w-full">
        <Container15 />
      </div>
    </div>
  );
}

function IconComoditySvg1() {
  return (
    <div className="h-[84.38px] relative shrink-0 w-[84.434px]" data-name="icon-comodity.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 84.4339 84.38">
        <g clipPath="url(#clip0_2124_937)" id="icon-comodity.svg">
          <path clipRule="evenodd" d={svgPaths.p6daa600} fill="var(--fill-0, #34E834)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2124_937">
            <rect fill="white" height="84.38" width="84.4339" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconComoditySvgFill() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[84.38px]" data-name="icon-comodity.svg fill">
      <IconComoditySvg1 />
    </div>
  );
}

function IconComoditySvg() {
  return (
    <div className="content-stretch flex items-start max-w-[705.6300048828125px] overflow-clip relative self-stretch shrink-0" data-name="icon-comodity.svg">
      <IconComoditySvgFill />
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex items-start left-[14.06px] top-0 w-[84.38px]" data-name="Container">
      <IconComoditySvg />
    </div>
  );
}

function Heading8() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.07px] top-[103.12px]" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px]">Commodities CFD</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.07px] top-[168.49px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[28.13px] relative shrink-0 text-[16.9px] text-[rgba(0,0,0,0.5)] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">Trade energy, agriculture and metals products like a currency pair against the USD or</p>
        <p className="mb-0">as a Futures CFD. We have combined tight pricing and flexible lot sizes from 10c per</p>
        <p>point to give you one powerful product.</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[26.25px] whitespace-pre-wrap">See our</p>
      </div>
    </div>
  );
}

function Link17() {
  return (
    <div className="bg-white relative rounded-[9.38px] shrink-0 w-full" data-name="Link">
      <div className="content-stretch flex flex-col items-start pb-[11.88px] pt-[10.5px] px-[15px] relative w-full">
        <Container27 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] mb-[-0.75px] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[28.13px]">Spreads</p>
        </div>
      </div>
    </div>
  );
}

function Item22() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[213.34px]" data-name="Item">
      <Link17 />
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[26.25px] whitespace-pre-wrap">Download</p>
      </div>
    </div>
  );
}

function Link18() {
  return (
    <div className="bg-white relative rounded-[9.38px] shrink-0 w-full" data-name="Link">
      <div className="content-stretch flex flex-col items-start pb-[11.88px] pt-[10.5px] px-[15px] relative w-full">
        <Container28 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] mb-[-0.75px] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[28.13px]">Product Details</p>
        </div>
      </div>
    </div>
  );
}

function Item23() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[213.33px]" data-name="Item">
      <Link18 />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[26.25px] whitespace-pre-wrap">Popular Account</p>
      </div>
    </div>
  );
}

function Link19() {
  return (
    <div className="bg-white relative rounded-[9.38px] shrink-0 w-full" data-name="Link">
      <div className="content-stretch flex flex-col items-start pb-[11.88px] pt-[10.5px] px-[15px] relative w-full">
        <Container29 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] mb-[-0.75px] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[28.13px]">Raw Spread</p>
        </div>
      </div>
    </div>
  );
}

function Item24() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[213.34px]" data-name="Item">
      <Link19 />
    </div>
  );
}

function List5() {
  return (
    <div className="absolute content-stretch flex gap-[18.8px] items-start justify-center left-[14.06px] right-[14.07px] top-[276.93px]" data-name="List">
      <Item22 />
      <Item23 />
      <Item24 />
    </div>
  );
}

function Container24() {
  return (
    <div className="max-w-[1058.43994140625px] relative self-stretch shrink-0 w-[705.63px]" data-name="Container">
      <Container25 />
      <Heading8 />
      <Container26 />
      <List5 />
    </div>
  );
}

function Heading9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 6">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[18px] whitespace-pre-wrap">Markets</p>
        </div>
      </div>
    </div>
  );
}

function Heading10() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[30px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[36px] whitespace-pre-wrap">Commodities</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder2() {
  return (
    <div className="relative rounded-tl-[4.63px] rounded-tr-[4.63px] shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none rounded-tl-[4.63px] rounded-tr-[4.63px]" />
      <div className="content-stretch flex flex-col items-start pb-[14.563px] px-[6.563px] relative w-full">
        <Heading9 />
        <Heading10 />
      </div>
    </div>
  );
}

function CheckSvg8() {
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

function CheckSvgFill8() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pr-[0.455px] relative shrink-0 size-[15px]" data-name="check.svg fill">
      <CheckSvg8 />
    </div>
  );
}

function Image8() {
  return (
    <div className="absolute left-[4.69px] size-[15px] top-[13.12px]" data-name="Image">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <CheckSvgFill8 />
      </div>
    </div>
  );
}

function Item25() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[12.535px] pl-[31.875px] pr-[6.563px] pt-[11.465px] relative w-full">
        <Image8 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[21.56px] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="mb-0">Over 20 CFDs on Commodities to</p>
          <p>trade</p>
        </div>
      </div>
    </div>
  );
}

function CheckSvg9() {
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

function CheckSvgFill9() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pr-[0.455px] relative shrink-0 size-[15px]" data-name="check.svg fill">
      <CheckSvg9 />
    </div>
  );
}

function Image9() {
  return (
    <div className="absolute left-[4.69px] size-[15px] top-[13.12px]" data-name="Image">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <CheckSvgFill9 />
      </div>
    </div>
  );
}

function Item26() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[12.688px] pl-[31.875px] pr-[6.563px] pt-[12.188px] relative w-full">
        <Image9 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">Energy, agriculture and metals</p>
        </div>
      </div>
    </div>
  );
}

function CheckSvg10() {
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

function CheckSvgFill10() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pr-[0.455px] relative shrink-0 size-[15px]" data-name="check.svg fill">
      <CheckSvg10 />
    </div>
  );
}

function Image10() {
  return (
    <div className="absolute left-[4.69px] size-[15px] top-[13.13px]" data-name="Image">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <CheckSvgFill10 />
      </div>
    </div>
  );
}

function Item27() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[12.688px] pl-[31.875px] pr-[6.563px] pt-[12.188px] relative w-full">
        <Image10 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">Spot and Futures CFDs</p>
        </div>
      </div>
    </div>
  );
}

function CheckSvg11() {
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

function CheckSvgFill11() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pr-[0.455px] relative shrink-0 size-[15px]" data-name="check.svg fill">
      <CheckSvg11 />
    </div>
  );
}

function Image11() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[4.69px] size-[15px] top-[13.13px]" data-name="Image">
      <CheckSvgFill11 />
    </div>
  );
}

function Item28() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div className="content-stretch flex flex-col items-start pl-[31.875px] pr-[6.563px] py-[12.188px] relative w-full">
        <Image11 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">Up to 1:1000 leverage</p>
        </div>
      </div>
    </div>
  );
}

function List6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="List">
      <Item25 />
      <Item26 />
      <Item27 />
      <Item28 />
    </div>
  );
}

function ListMargin2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4.688px] relative shrink-0 w-full" data-name="List:margin">
      <List6 />
    </div>
  );
}

function Link20() {
  return (
    <div className="relative rounded-[7.5px] shrink-0 w-full" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[7.5px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center pb-[7.19px] pt-[6.31px] px-[16.438px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[15px] text-black text-center tracking-[0.469px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[24.38px]">DETAILS</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start max-w-[302.81201171875px] p-[23.438px] relative rounded-[5.63px] shrink-0 w-[302.81px]" data-name="Background">
      <HorizontalBorder2 />
      <ListMargin2 />
      <Link20 />
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex items-center justify-end max-w-[1058.43994140625px] px-[14.063px] relative self-stretch shrink-0 w-[352.81px]" data-name="Container">
      <Background5 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-wrap gap-0 items-start relative shrink-0 w-full" data-name="Container">
      <Container24 />
      <Container30 />
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#f6f6f6] relative rounded-[18.75px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col items-start px-[18.75px] py-[28.125px] relative w-full">
        <Container23 />
      </div>
    </div>
  );
}

function Heading11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 6">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[18px] whitespace-pre-wrap">Markets</p>
        </div>
      </div>
    </div>
  );
}

function Heading12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[30px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[36px] whitespace-pre-wrap">Stocks</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder3() {
  return (
    <div className="relative rounded-tl-[4.63px] rounded-tr-[4.63px] shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none rounded-tl-[4.63px] rounded-tr-[4.63px]" />
      <div className="content-stretch flex flex-col items-start pb-[14.563px] px-[6.563px] relative w-full">
        <Heading11 />
        <Heading12 />
      </div>
    </div>
  );
}

function CheckSvg12() {
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

function CheckSvgFill12() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pr-[0.455px] relative shrink-0 size-[15px]" data-name="check.svg fill">
      <CheckSvg12 />
    </div>
  );
}

function Image12() {
  return (
    <div className="absolute left-[4.69px] size-[15px] top-[13.12px]" data-name="Image">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <CheckSvgFill12 />
      </div>
    </div>
  );
}

function Item29() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[12.535px] pl-[31.875px] pr-[6.563px] pt-[11.465px] relative w-full">
        <Image12 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[21.56px] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="mb-0">{`+2100 stocks from ASX, Nasdaq &`}</p>
          <p>NYSE</p>
        </div>
      </div>
    </div>
  );
}

function CheckSvg13() {
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

function CheckSvgFill13() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pr-[0.455px] relative shrink-0 size-[15px]" data-name="check.svg fill">
      <CheckSvg13 />
    </div>
  );
}

function Image13() {
  return (
    <div className="absolute left-[4.69px] size-[15px] top-[13.12px]" data-name="Image">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <CheckSvgFill13 />
      </div>
    </div>
  );
}

function Item30() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[12.688px] pl-[31.875px] pr-[6.563px] pt-[12.188px] relative w-full">
        <Image13 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">Earn dividends</p>
        </div>
      </div>
    </div>
  );
}

function CheckSvg14() {
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

function CheckSvgFill14() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pr-[0.455px] relative shrink-0 size-[15px]" data-name="check.svg fill">
      <CheckSvg14 />
    </div>
  );
}

function Image14() {
  return (
    <div className="absolute left-[4.69px] size-[15px] top-[13.13px]" data-name="Image">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <CheckSvgFill14 />
      </div>
    </div>
  );
}

function Item31() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[12.688px] pl-[31.875px] pr-[6.563px] pt-[12.188px] relative w-full">
        <Image14 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">MT5</p>
        </div>
      </div>
    </div>
  );
}

function CheckSvg15() {
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

function CheckSvgFill15() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pr-[0.455px] relative shrink-0 size-[15px]" data-name="check.svg fill">
      <CheckSvg15 />
    </div>
  );
}

function Image15() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[4.69px] size-[15px] top-[13.13px]" data-name="Image">
      <CheckSvgFill15 />
    </div>
  );
}

function Item32() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div className="content-stretch flex flex-col items-start pl-[31.875px] pr-[6.563px] py-[12.188px] relative w-full">
        <Image15 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">Up to 1:20 leverage</p>
        </div>
      </div>
    </div>
  );
}

function List7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="List">
      <Item29 />
      <Item30 />
      <Item31 />
      <Item32 />
    </div>
  );
}

function ListMargin3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4.688px] relative shrink-0 w-full" data-name="List:margin">
      <List7 />
    </div>
  );
}

function Link21() {
  return (
    <div className="relative rounded-[7.5px] shrink-0 w-full" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[7.5px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center pb-[7.19px] pt-[6.31px] px-[16.438px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[15px] text-black text-center tracking-[0.469px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[24.38px]">DETAILS</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start max-w-[302.81201171875px] p-[23.438px] relative rounded-[5.63px] shrink-0 w-[302.81px]" data-name="Background">
      <HorizontalBorder3 />
      <ListMargin3 />
      <Link21 />
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1058.43994140625px] px-[14.063px] relative self-stretch shrink-0 w-[352.81px]" data-name="Container">
      <Background7 />
    </div>
  );
}

function IconStockSvg1() {
  return (
    <div className="h-[84.38px] overflow-clip relative shrink-0 w-[87.711px]" data-name="icon-stock.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 87.7108 84.38">
        <g id="Group">
          <path d={svgPaths.p3c0ae800} fill="var(--fill-0, #34E834)" id="Vector" />
          <path d={svgPaths.p32249300} fill="var(--fill-0, #34E834)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function IconStockSvgFill() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[84.38px]" data-name="icon-stock.svg fill">
      <IconStockSvg1 />
    </div>
  );
}

function IconStockSvg() {
  return (
    <div className="content-stretch flex items-start max-w-[705.6300048828125px] overflow-clip relative self-stretch shrink-0" data-name="icon-stock.svg">
      <IconStockSvgFill />
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute content-stretch flex items-start left-[14.07px] top-0 w-[84.38px]" data-name="Container">
      <IconStockSvg />
    </div>
  );
}

function Heading13() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.07px] right-[14.06px] top-[103.12px]" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px]">Stocks CFD</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.07px] right-[14.06px] top-[168.49px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[28.13px] relative shrink-0 text-[16.9px] text-[rgba(0,0,0,0.5)] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">Access over +2100 large-cap Stocks CFDs across the ASX, NYSE and NASDAQ stock</p>
        <p className="mb-0">exchanges. We have selected a range of the world’s most popular companies to give</p>
        <p>you the best trading opportunities.</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[26.25px] whitespace-pre-wrap">See our</p>
      </div>
    </div>
  );
}

function Link22() {
  return (
    <div className="bg-white relative rounded-[9.38px] shrink-0 w-full" data-name="Link">
      <div className="content-stretch flex flex-col items-start pb-[11.88px] pt-[10.5px] px-[15px] relative w-full">
        <Container36 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] mb-[-0.75px] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[28.13px]">Spreads</p>
        </div>
      </div>
    </div>
  );
}

function Item33() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[213.34px]" data-name="Item">
      <Link22 />
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[26.25px] whitespace-pre-wrap">Download</p>
      </div>
    </div>
  );
}

function Link23() {
  return (
    <div className="bg-white relative rounded-[9.38px] shrink-0 w-full" data-name="Link">
      <div className="content-stretch flex flex-col items-start pb-[11.88px] pt-[10.5px] px-[15px] relative w-full">
        <Container37 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] mb-[-0.75px] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[28.13px]">Product Details</p>
        </div>
      </div>
    </div>
  );
}

function Item34() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[213.33px]" data-name="Item">
      <Link23 />
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[26.25px] whitespace-pre-wrap">Popular Account</p>
      </div>
    </div>
  );
}

function Link24() {
  return (
    <div className="bg-white relative rounded-[9.38px] shrink-0 w-full" data-name="Link">
      <div className="content-stretch flex flex-col items-start pb-[11.88px] pt-[10.5px] px-[15px] relative w-full">
        <Container38 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] mb-[-0.75px] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[28.13px]">Raw Spread</p>
        </div>
      </div>
    </div>
  );
}

function Item35() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[213.34px]" data-name="Item">
      <Link24 />
    </div>
  );
}

function List8() {
  return (
    <div className="absolute content-stretch flex gap-[18.7px] items-start justify-center left-[14.07px] right-[14.06px] top-[276.93px]" data-name="List">
      <Item33 />
      <Item34 />
      <Item35 />
    </div>
  );
}

function Container33() {
  return (
    <div className="max-w-[1058.43994140625px] relative self-stretch shrink-0 w-[705.63px]" data-name="Container">
      <Container34 />
      <Heading13 />
      <Container35 />
      <List8 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-wrap gap-0 items-start relative shrink-0 w-full" data-name="Container">
      <Container32 />
      <Container33 />
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#f6f6f6] relative rounded-[18.75px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col items-start px-[18.75px] py-[28.125px] relative w-full">
        <Container31 />
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

function Container41() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[84.38px]" data-name="Container">
      <IconBondSvg />
    </div>
  );
}

function Heading14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px] whitespace-pre-wrap">Bonds CFD</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[28.13px] relative shrink-0 text-[16.9px] text-[rgba(0,0,0,0.5)] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">Bonds offer traders the opportunity to speculate on interest rates and global risk</p>
        <p className="mb-0">on/off sentiment, hedging equities exposure and to diversify their strategy. Choose</p>
        <p className="mb-0">from a range of Bonds issued by governments around the world including Japan,</p>
        <p>Europe, the U.K, and the U.S.</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[26.25px] whitespace-pre-wrap">See our</p>
      </div>
    </div>
  );
}

function Link25() {
  return (
    <div className="bg-white relative rounded-[9.38px] shrink-0 w-full" data-name="Link">
      <div className="content-stretch flex flex-col items-start pb-[11.88px] pt-[10.5px] px-[15px] relative w-full">
        <Container43 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] mb-[-0.75px] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[28.13px]">Spreads</p>
        </div>
      </div>
    </div>
  );
}

function Item36() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[213.34px]" data-name="Item">
      <Link25 />
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[26.25px] whitespace-pre-wrap">Download</p>
      </div>
    </div>
  );
}

function Link26() {
  return (
    <div className="bg-white relative rounded-[9.38px] shrink-0 w-full" data-name="Link">
      <div className="content-stretch flex flex-col items-start pb-[11.88px] pt-[10.5px] px-[15px] relative w-full">
        <Container44 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] mb-[-0.75px] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[28.13px]">Product Details</p>
        </div>
      </div>
    </div>
  );
}

function Item37() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[213.33px]" data-name="Item">
      <Link26 />
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[26.25px] whitespace-pre-wrap">Popular Account</p>
      </div>
    </div>
  );
}

function Link27() {
  return (
    <div className="bg-white relative rounded-[9.38px] shrink-0 w-full" data-name="Link">
      <div className="content-stretch flex flex-col items-start pb-[11.88px] pt-[10.5px] px-[15px] relative w-full">
        <Container45 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] mb-[-0.75px] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[28.13px]">Raw Spread</p>
        </div>
      </div>
    </div>
  );
}

function Item38() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[213.34px]" data-name="Item">
      <Link27 />
    </div>
  );
}

function List9() {
  return (
    <div className="content-stretch flex gap-[18.8px] items-start justify-center pt-[4.74px] relative shrink-0 w-full" data-name="List">
      <Item36 />
      <Item37 />
      <Item38 />
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col gap-[18.7px] items-start max-w-[1058.43994140625px] px-[14.063px] relative self-stretch shrink-0 w-[705.63px]" data-name="Container">
      <Container41 />
      <Heading14 />
      <Container42 />
      <List9 />
    </div>
  );
}

function Heading15() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 6">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[18px] whitespace-pre-wrap">Markets</p>
        </div>
      </div>
    </div>
  );
}

function Heading16() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[30px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[36px] whitespace-pre-wrap">Bonds</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder4() {
  return (
    <div className="relative rounded-tl-[4.63px] rounded-tr-[4.63px] shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none rounded-tl-[4.63px] rounded-tr-[4.63px]" />
      <div className="content-stretch flex flex-col items-start pb-[14.563px] px-[6.563px] relative w-full">
        <Heading15 />
        <Heading16 />
      </div>
    </div>
  );
}

function CheckSvg16() {
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

function CheckSvgFill16() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pr-[0.455px] relative shrink-0 size-[15px]" data-name="check.svg fill">
      <CheckSvg16 />
    </div>
  );
}

function Image16() {
  return (
    <div className="absolute left-[4.69px] size-[15px] top-[13.12px]" data-name="Image">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <CheckSvgFill16 />
      </div>
    </div>
  );
}

function Item39() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[12.688px] pl-[31.875px] pr-[6.563px] pt-[12.188px] relative w-full">
        <Image16 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">Over 9 Bonds available to trade</p>
        </div>
      </div>
    </div>
  );
}

function CheckSvg17() {
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

function CheckSvgFill17() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pr-[0.455px] relative shrink-0 size-[15px]" data-name="check.svg fill">
      <CheckSvg17 />
    </div>
  );
}

function Image17() {
  return (
    <div className="absolute left-[4.69px] size-[15px] top-[13.13px]" data-name="Image">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <CheckSvgFill17 />
      </div>
    </div>
  );
}

function Item40() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[12.688px] pl-[31.875px] pr-[6.563px] pt-[12.188px] relative w-full">
        <Image17 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">No commissions</p>
        </div>
      </div>
    </div>
  );
}

function CheckSvg18() {
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

function CheckSvgFill18() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pr-[0.455px] relative shrink-0 size-[15px]" data-name="check.svg fill">
      <CheckSvg18 />
    </div>
  );
}

function Image18() {
  return (
    <div className="absolute left-[4.69px] size-[15px] top-[13.13px]" data-name="Image">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <CheckSvgFill18 />
      </div>
    </div>
  );
}

function Item41() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[12.688px] pl-[31.875px] pr-[6.563px] pt-[12.188px] relative w-full">
        <Image18 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">Up to 1:200 leverage</p>
        </div>
      </div>
    </div>
  );
}

function CheckSvg19() {
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

function CheckSvgFill19() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pr-[0.455px] relative shrink-0 size-[15px]" data-name="check.svg fill">
      <CheckSvg19 />
    </div>
  );
}

function Image19() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[4.69px] size-[15px] top-[13.12px]" data-name="Image">
      <CheckSvgFill19 />
    </div>
  );
}

function Item42() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div className="content-stretch flex flex-col items-start pl-[31.875px] pr-[6.563px] py-[12.188px] relative w-full">
        <Image19 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">Deep Liquidity</p>
        </div>
      </div>
    </div>
  );
}

function List10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="List">
      <Item39 />
      <Item40 />
      <Item41 />
      <Item42 />
    </div>
  );
}

function ListMargin4() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4.688px] relative shrink-0 w-full" data-name="List:margin">
      <List10 />
    </div>
  );
}

function Link28() {
  return (
    <div className="relative rounded-[7.5px] shrink-0 w-full" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[7.5px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center pb-[7.18px] pt-[6.32px] px-[16.438px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[15px] text-black text-center tracking-[0.469px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[24.38px]">DETAILS</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start max-w-[302.81201171875px] p-[23.438px] relative rounded-[5.63px] shrink-0 w-[302.81px]" data-name="Background">
      <HorizontalBorder4 />
      <ListMargin4 />
      <Link28 />
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex items-center justify-end max-w-[1058.43994140625px] px-[14.063px] relative self-stretch shrink-0 w-[352.81px]" data-name="Container">
      <Background9 />
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-wrap gap-0 items-start relative shrink-0 w-full" data-name="Container">
      <Container40 />
      <Container46 />
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-[#f6f6f6] relative rounded-[18.75px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col items-start px-[18.75px] py-[28.125px] relative w-full">
        <Container39 />
      </div>
    </div>
  );
}

function Heading17() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 6">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[18px] whitespace-pre-wrap">Markets</p>
        </div>
      </div>
    </div>
  );
}

function Heading18() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[30px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[36px] whitespace-pre-wrap">Cryptocurrency</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder5() {
  return (
    <div className="relative rounded-tl-[4.63px] rounded-tr-[4.63px] shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none rounded-tl-[4.63px] rounded-tr-[4.63px]" />
      <div className="content-stretch flex flex-col items-start pb-[14.563px] px-[6.563px] relative w-full">
        <Heading17 />
        <Heading18 />
      </div>
    </div>
  );
}

function CheckSvg20() {
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

function CheckSvgFill20() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pr-[0.455px] relative shrink-0 size-[15px]" data-name="check.svg fill">
      <CheckSvg20 />
    </div>
  );
}

function Image20() {
  return (
    <div className="absolute left-[4.69px] size-[15px] top-[13.12px]" data-name="Image">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <CheckSvgFill20 />
      </div>
    </div>
  );
}

function Item43() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[12.535px] pl-[31.875px] pr-[6.563px] pt-[11.465px] relative w-full">
        <Image20 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[21.56px] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="mb-0">21 of the most popular</p>
          <p>Cryptocurrency</p>
        </div>
      </div>
    </div>
  );
}

function CheckSvg21() {
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

function CheckSvgFill21() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pr-[0.455px] relative shrink-0 size-[15px]" data-name="check.svg fill">
      <CheckSvg21 />
    </div>
  );
}

function Image21() {
  return (
    <div className="absolute left-[4.69px] size-[15px] top-[13.12px]" data-name="Image">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <CheckSvgFill21 />
      </div>
    </div>
  );
}

function Item44() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[12.688px] pl-[31.875px] pr-[6.563px] pt-[12.188px] relative w-full">
        <Image21 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">Trade the market 7 days a week</p>
        </div>
      </div>
    </div>
  );
}

function CheckSvg22() {
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

function CheckSvgFill22() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pr-[0.455px] relative shrink-0 size-[15px]" data-name="check.svg fill">
      <CheckSvg22 />
    </div>
  );
}

function Image22() {
  return (
    <div className="absolute left-[4.69px] size-[15px] top-[13.13px]" data-name="Image">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <CheckSvgFill22 />
      </div>
    </div>
  );
}

function Item45() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[12.688px] pl-[31.875px] pr-[6.563px] pt-[12.188px] relative w-full">
        <Image22 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">Long or short</p>
        </div>
      </div>
    </div>
  );
}

function CheckSvg23() {
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

function CheckSvgFill23() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pr-[0.455px] relative shrink-0 size-[15px]" data-name="check.svg fill">
      <CheckSvg23 />
    </div>
  );
}

function Image23() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[4.69px] size-[15px] top-[13.13px]" data-name="Image">
      <CheckSvgFill23 />
    </div>
  );
}

function Item46() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div className="content-stretch flex flex-col items-start pb-[12.095px] pl-[31.875px] pr-[6.563px] pt-[11.535px] relative w-full">
        <Image23 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[21.56px] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="mb-0">Up to 1:500 Leverage</p>
          <p className="mb-0">MetaTrader4/MT5</p>
          <p className="mb-0">1:300 Leverage cTrader and</p>
          <p>TradingView</p>
        </div>
      </div>
    </div>
  );
}

function List11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="List">
      <Item43 />
      <Item44 />
      <Item45 />
      <Item46 />
    </div>
  );
}

function ListMargin5() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4.688px] relative shrink-0 w-full" data-name="List:margin">
      <List11 />
    </div>
  );
}

function Link29() {
  return (
    <div className="relative rounded-[7.5px] shrink-0 w-full" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[7.5px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center pb-[7.18px] pt-[6.32px] px-[16.438px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[15px] text-black text-center tracking-[0.469px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[24.38px]">DETAILS</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background11() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start max-w-[302.81201171875px] p-[23.438px] relative rounded-[5.63px] shrink-0 w-[302.81px]" data-name="Background">
      <HorizontalBorder5 />
      <ListMargin5 />
      <Link29 />
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1058.43994140625px] px-[14.063px] relative self-stretch shrink-0 w-[352.81px]" data-name="Container">
      <Background11 />
    </div>
  );
}

function IconCryptoSvg1() {
  return (
    <div className="relative shrink-0 size-[84.38px]" data-name="icon-crypto.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 84.38 84.38">
        <g clipPath="url(#clip0_2124_927)" id="icon-crypto.svg">
          <path clipRule="evenodd" d={svgPaths.p182aa80} fill="var(--fill-0, #34E834)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2124_927">
            <rect fill="white" height="84.38" width="84.38" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconCryptoSvgFill() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[84.38px]" data-name="icon-crypto.svg fill">
      <IconCryptoSvg1 />
    </div>
  );
}

function IconCryptoSvg() {
  return (
    <div className="content-stretch flex items-start max-w-[705.6300048828125px] overflow-clip relative self-stretch shrink-0" data-name="icon-crypto.svg">
      <IconCryptoSvgFill />
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[84.38px]" data-name="Container">
      <IconCryptoSvg />
    </div>
  );
}

function Heading19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px] whitespace-pre-wrap">Cryptocurrency CFD</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[28.13px] relative shrink-0 text-[16.9px] text-[rgba(0,0,0,0.5)] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">Go long or short across our range of the world’s largest and most popular</p>
        <p className="mb-0">Cryptocurrencies. Trade the market 7 days a week where price movements are driven</p>
        <p className="mb-0">primarily by fear and greed, news and prevailing sentiment. Enjoy trading with a</p>
        <p className="mb-0">leverage of up to 1:200 and eliminate Cryptocurrency Exchange risk by trading with an</p>
        <p>FSA-regulated CFD Provider.</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[26.25px] whitespace-pre-wrap">See our</p>
      </div>
    </div>
  );
}

function Link30() {
  return (
    <div className="bg-white relative rounded-[9.38px] shrink-0 w-full" data-name="Link">
      <div className="content-stretch flex flex-col items-start pb-[11.88px] pt-[10.5px] px-[15px] relative w-full">
        <Container52 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] mb-[-0.75px] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[28.13px]">Spreads</p>
        </div>
      </div>
    </div>
  );
}

function Item47() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[213.34px]" data-name="Item">
      <Link30 />
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[26.25px] whitespace-pre-wrap">Download</p>
      </div>
    </div>
  );
}

function Link31() {
  return (
    <div className="bg-white relative rounded-[9.38px] shrink-0 w-full" data-name="Link">
      <div className="content-stretch flex flex-col items-start pb-[11.88px] pt-[10.5px] px-[15px] relative w-full">
        <Container53 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] mb-[-0.75px] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[28.13px]">Product Details</p>
        </div>
      </div>
    </div>
  );
}

function Item48() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[213.33px]" data-name="Item">
      <Link31 />
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[26.25px] whitespace-pre-wrap">Popular Account</p>
      </div>
    </div>
  );
}

function Link32() {
  return (
    <div className="bg-white relative rounded-[9.38px] shrink-0 w-full" data-name="Link">
      <div className="content-stretch flex flex-col items-start pb-[11.88px] pt-[10.5px] px-[15px] relative w-full">
        <Container54 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] mb-[-0.75px] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[28.13px]">Raw Spread</p>
        </div>
      </div>
    </div>
  );
}

function Item49() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[213.34px]" data-name="Item">
      <Link32 />
    </div>
  );
}

function List12() {
  return (
    <div className="content-stretch flex gap-[18.7px] items-start justify-center pt-[4.73px] relative shrink-0 w-full" data-name="List">
      <Item47 />
      <Item48 />
      <Item49 />
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col gap-[18.7px] items-start max-w-[1058.43994140625px] px-[14.063px] relative self-stretch shrink-0 w-[705.63px]" data-name="Container">
      <Container50 />
      <Heading19 />
      <Container51 />
      <List12 />
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-wrap gap-0 items-start relative shrink-0 w-full" data-name="Container">
      <Container48 />
      <Container49 />
    </div>
  );
}

function Background10() {
  return (
    <div className="bg-[#f6f6f6] relative rounded-[18.75px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col items-start px-[18.75px] py-[28.125px] relative w-full">
        <Container47 />
      </div>
    </div>
  );
}

function IconFuturesWebp() {
  return (
    <div className="aspect-[84.37999725341797/84.37999725341797] max-w-[705.6300048828125px] relative self-stretch shrink-0" data-name="icon-futures.webp">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgIconFuturesWebp} />
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="absolute content-stretch flex items-start left-[14.06px] top-0 w-[84.38px]" data-name="Container">
      <IconFuturesWebp />
    </div>
  );
}

function Heading20() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.07px] top-[103.13px]" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px]">Futures CFD</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.07px] top-[168.57px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[28.13px] relative shrink-0 text-[16.9px] text-[rgba(0,0,0,0.5)] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">Futures are one of the most popular form of CFDs. XAI Technology offer a range of</p>
        <p className="mb-0">Futures from around the world, including ICE Dollar Index and CBOE VIX Index. Online</p>
        <p className="mb-0">{`Futures based CFDs are offered exclusively on XAI Technology's MetaTrader 4`}</p>
        <p>Platform.</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[26.25px] whitespace-pre-wrap">See our</p>
      </div>
    </div>
  );
}

function Link33() {
  return (
    <div className="bg-white relative rounded-[9.38px] shrink-0 w-full" data-name="Link">
      <div className="content-stretch flex flex-col items-start pb-[11.88px] pt-[10.5px] px-[15px] relative w-full">
        <Container59 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] mb-[-0.75px] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[28.13px]">Spreads</p>
        </div>
      </div>
    </div>
  );
}

function Item50() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[213.34px]" data-name="Item">
      <Link33 />
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[26.25px] whitespace-pre-wrap">Download</p>
      </div>
    </div>
  );
}

function Link34() {
  return (
    <div className="bg-white relative rounded-[9.38px] shrink-0 w-full" data-name="Link">
      <div className="content-stretch flex flex-col items-start pb-[11.88px] pt-[10.5px] px-[15px] relative w-full">
        <Container60 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] mb-[-0.75px] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[28.13px]">Product Details</p>
        </div>
      </div>
    </div>
  );
}

function Item51() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[213.33px]" data-name="Item">
      <Link34 />
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[26.25px] whitespace-pre-wrap">Popular Account</p>
      </div>
    </div>
  );
}

function Link35() {
  return (
    <div className="bg-white relative rounded-[9.38px] shrink-0 w-full" data-name="Link">
      <div className="content-stretch flex flex-col items-start pb-[11.88px] pt-[10.5px] px-[15px] relative w-full">
        <Container61 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] mb-[-0.75px] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[28.13px]">Raw Spread</p>
        </div>
      </div>
    </div>
  );
}

function Item52() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[213.34px]" data-name="Item">
      <Link35 />
    </div>
  );
}

function List13() {
  return (
    <div className="absolute content-stretch flex gap-[18.8px] items-start justify-center left-[14.06px] right-[14.07px] top-[305.07px]" data-name="List">
      <Item50 />
      <Item51 />
      <Item52 />
    </div>
  );
}

function Container56() {
  return (
    <div className="max-w-[1058.43994140625px] relative self-stretch shrink-0 w-[705.63px]" data-name="Container">
      <Container57 />
      <Heading20 />
      <Container58 />
      <List13 />
    </div>
  );
}

function Heading21() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 6">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[18px] whitespace-pre-wrap">Markets</p>
        </div>
      </div>
    </div>
  );
}

function Heading22() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[30px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[36px] whitespace-pre-wrap">Futures</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder6() {
  return (
    <div className="relative rounded-tl-[4.63px] rounded-tr-[4.63px] shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none rounded-tl-[4.63px] rounded-tr-[4.63px]" />
      <div className="content-stretch flex flex-col items-start pb-[14.563px] px-[6.563px] relative w-full">
        <Heading21 />
        <Heading22 />
      </div>
    </div>
  );
}

function CheckSvg24() {
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

function CheckSvgFill24() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pr-[0.455px] relative shrink-0 size-[15px]" data-name="check.svg fill">
      <CheckSvg24 />
    </div>
  );
}

function Image24() {
  return (
    <div className="absolute left-[4.69px] size-[15px] top-[13.13px]" data-name="Image">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <CheckSvgFill24 />
      </div>
    </div>
  );
}

function Item53() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[12.53px] pl-[31.875px] pr-[6.563px] pt-[11.47px] relative w-full">
        <Image24 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[21.56px] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="mb-0">5 Global Futures available to</p>
          <p>trade</p>
        </div>
      </div>
    </div>
  );
}

function CheckSvg25() {
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

function CheckSvgFill25() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pr-[0.455px] relative shrink-0 size-[15px]" data-name="check.svg fill">
      <CheckSvg25 />
    </div>
  );
}

function Image25() {
  return (
    <div className="absolute left-[4.69px] size-[15px] top-[13.13px]" data-name="Image">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <CheckSvgFill25 />
      </div>
    </div>
  );
}

function Item54() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[12.688px] pl-[31.875px] pr-[6.563px] pt-[12.188px] relative w-full">
        <Image25 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">No commissions</p>
        </div>
      </div>
    </div>
  );
}

function CheckSvg26() {
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

function CheckSvgFill26() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pr-[0.455px] relative shrink-0 size-[15px]" data-name="check.svg fill">
      <CheckSvg26 />
    </div>
  );
}

function Image26() {
  return (
    <div className="absolute left-[4.69px] size-[15px] top-[13.13px]" data-name="Image">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <CheckSvgFill26 />
      </div>
    </div>
  );
}

function Item55() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[12.688px] pl-[31.875px] pr-[6.563px] pt-[12.188px] relative w-full">
        <Image26 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">Up to 1:200 leverage</p>
        </div>
      </div>
    </div>
  );
}

function CheckSvg27() {
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

function CheckSvgFill27() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pr-[0.455px] relative shrink-0 size-[15px]" data-name="check.svg fill">
      <CheckSvg27 />
    </div>
  );
}

function Image27() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[4.69px] size-[15px] top-[13.12px]" data-name="Image">
      <CheckSvgFill27 />
    </div>
  );
}

function Item56() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div className="content-stretch flex flex-col items-start pl-[31.875px] pr-[6.563px] py-[12.188px] relative w-full">
        <Image27 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">Deep Liquidity</p>
        </div>
      </div>
    </div>
  );
}

function List14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="List">
      <Item53 />
      <Item54 />
      <Item55 />
      <Item56 />
    </div>
  );
}

function ListMargin6() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4.688px] relative shrink-0 w-full" data-name="List:margin">
      <List14 />
    </div>
  );
}

function Link36() {
  return (
    <div className="relative rounded-[7.5px] shrink-0 w-full" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[7.5px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center pb-[7.18px] pt-[6.32px] px-[16.438px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[15px] text-black text-center tracking-[0.469px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[24.38px]">DETAILS</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background13() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start max-w-[302.81201171875px] p-[23.438px] relative rounded-[5.63px] shrink-0 w-[302.81px]" data-name="Background">
      <HorizontalBorder6 />
      <ListMargin6 />
      <Link36 />
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex items-center justify-end max-w-[1058.43994140625px] px-[14.063px] relative self-stretch shrink-0 w-[352.81px]" data-name="Container">
      <Background13 />
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-wrap gap-0 items-start min-h-[381.94000244140625px] relative shrink-0 w-full" data-name="Container">
      <Container56 />
      <Container62 />
    </div>
  );
}

function Background12() {
  return (
    <div className="bg-[#f6f6f6] relative rounded-[18.75px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col items-start px-[18.75px] py-[28.125px] relative w-full">
        <Container55 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[32.8px] items-start px-[14.063px] relative self-stretch shrink-0 w-[1212px]" data-name="Container">
      <Background />
      <Background2 />
      <Background4 />
      <Background6 />
      <Background8 />
      <Background10 />
      <Background12 />
    </div>
  );
}

function Section2() {
  return (
    <div className="content-stretch flex flex-wrap items-start justify-center py-[84.37px] relative shrink-0 w-[1124.06px]" data-name="Section">
      <Container6 />
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

function Heading23() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[22.5px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[27px]">global markets today!</p>
      </div>
    </div>
  );
}

function Link37() {
  return (
    <div className="bg-[#34e834] content-stretch flex items-start justify-center pb-[15.44px] pt-[15.06px] px-[39px] relative rounded-[5.63px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[5.63px]" />
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[20.6px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24.38px]">Open Trading Account</p>
      </div>
    </div>
  );
}

function Link38() {
  return (
    <div className="content-stretch flex items-start justify-center pb-[15.44px] pt-[15.06px] px-[39px] relative rounded-[7.5px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[7.5px]" />
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[20.6px] text-center text-white tracking-[0.469px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24.38px]">View My Dashboard</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex gap-[19.13px] items-start pt-[4.74px] px-[262.69px] relative w-full">
        <Link37 />
        <Link38 />
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col gap-[18.7px] items-start px-[14.063px] relative size-full">
        <Heading />
        <Heading23 />
        <Container65 />
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex flex-wrap items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Container64 />
    </div>
  );
}

function Section3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[244.6%] left-0 max-w-none top-[-72.3%] w-full" src={imgSection1} />
      </div>
      <div className="content-stretch flex flex-col items-start px-[157.97px] py-[117.188px] relative w-full">
        <Container63 />
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