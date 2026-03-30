import svgPaths from "./svg-uaqd9d761y";
import imgSection from "figma:asset/670de4f093518026af122894c8f169ef3102fb6c.png";
import imgForexImgWebp from "figma:asset/cf45541d2eaf766313f6760d4e89ea81082930fc.png";
import imgSection1 from "figma:asset/49712abe12194c268a5c9981e2bf290c369efc5f.png";

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px]">Forex CFDs</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[8.1px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[25.31px] relative shrink-0 text-[16.9px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">ThexAI TechnologyForex offering is one of the most competitive in the world. Access</p>
        <p>the world’s largest and most liquid market with Raw spreads starting from 0.0 pips.</p>
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
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#34e834] text-[13.1px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
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

function Heading4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.07px] top-[102.5px]" data-name="Heading 5">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[28.13px] relative shrink-0 text-[18.8px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Open 24 hours a day 5 days a week, the foreign exchange market is the</p>
        <p className="mb-0">largest and most liquid market in the world with volumes of over $4 trillion</p>
        <p>a day surpassing any exchange based market.</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.07px] top-[201.88px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[28.13px] relative shrink-0 text-[15px] text-[rgba(0,0,0,0.5)] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">Foreign exchange trading involves trading one currency pair against another, predicting that one</p>
        <p className="mb-0">currency will rise or fall against another. Currencies are traded in pairs, like the Euro versus the US</p>
        <p>Dollar (EUR/USD).</p>
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
    </div>
  );
}

function Heading5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 6">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[18px] whitespace-pre-wrap">Forex</p>
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
    <div className="absolute left-[4.69px] size-[15px] top-[13.13px]" data-name="Image">
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
          <p className="leading-[21.56px]">Over 61 currency pairs</p>
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

function Item9() {
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
    <div className="absolute left-[4.69px] size-[15px] top-[13.12px]" data-name="Image">
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
    <div className="absolute left-[4.69px] size-[15px] top-[13.13px]" data-name="Image">
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
          <p className="leading-[21.56px]">Deep liquidity</p>
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
    <div className="absolute content-stretch flex flex-col items-start left-[4.69px] size-[15px] top-[13.13px]" data-name="Image">
      <CheckSvgFill4 />
    </div>
  );
}

function Item12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div className="content-stretch flex flex-col items-start pb-[12.03px] pl-[31.875px] pr-[6.563px] pt-[11.47px] relative w-full">
        <Image4 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[21.56px] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="mb-0">Trade 24 hours a day,</p>
          <p>five days a week</p>
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

function Container11() {
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
      <Container11 />
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
    <div className="content-stretch flex flex-wrap items-start justify-center py-[84.37px] relative shrink-0 w-[1158px]" data-name="Section">
      <Container6 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[30px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[36px]">Forex Spreads</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[25.31px] relative shrink-0 text-[16.9px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">XAI Technology offers Forex traders some of the tightest spreads out of all Forex exchange brokers globally with our EUR/USD spread</p>
        <p className="mb-0">averaging 0.1 pips. Tight spreads combined with our low latency enterprise grade hardware makesxAI Technologythe ideal choice for active</p>
        <p className="mb-0">day traders and those using Expert Advisors. The table at the bottom of this page shows our minimum and average spreads across all of the</p>
        <p>major currency pairs.</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col gap-[6.72px] items-start px-[14.063px] relative size-full">
        <Heading3 />
        <Container14 />
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

function Section3() {
  return (
    <div className="bg-[#f3f3f3] relative shrink-0 w-full" data-name="Section">
      <div className="content-stretch flex flex-col items-start px-[157.97px] py-[84.375px] relative w-full">
        <Container12 />
      </div>
    </div>
  );
}

function ForexImgWebp() {
  return (
    <div className="h-[424px] max-w-[562.030029296875px] relative shrink-0 w-[488px]" data-name="forexImg.webp">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgForexImgWebp} />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="flex-[1_0_0] max-w-[1124.06005859375px] min-h-px min-w-px relative" data-name="Container">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] px-[14.063px] relative w-full">
        <ForexImgWebp />
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[36px] relative shrink-0 text-[30px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">How does Forex</p>
        <p>Trading work?</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[25.31px] relative shrink-0 text-[16.9px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Forex trading is similar to trading shares or futures except that when</p>
        <p className="mb-0">trading foreign exchange you are buying or selling one currency</p>
        <p className="mb-0">against another and you do not take delivery of the underlying</p>
        <p className="mb-0">currency. One of the key advantages Forex has over other financial</p>
        <p className="mb-0">instruments is that relatively small lot sizes can be traded - lot sizes</p>
        <p className="mb-0">can be as small as 1000 units (one micro lot). Typically, foreign</p>
        <p className="mb-0">exchange also involves leverage which in some cases can be as high</p>
        <p className="mb-0">as 1:1000, which is very different to trading shares where no leverage</p>
        <p>is involved.</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="flex-[1_0_0] max-w-[1124.06005859375px] min-h-px min-w-px relative" data-name="Container">
      <div className="content-stretch flex flex-col gap-[7.5px] items-start max-w-[inherit] pb-[15px] px-[14.063px] relative w-full">
        <Heading6 />
        <Container17 />
      </div>
    </div>
  );
}

function Section4() {
  return (
    <div className="content-center flex flex-wrap gap-0 items-center pb-[84.38px] pt-[84.37px] relative shrink-0 w-[1124.06px]" data-name="Section">
      <Container15 />
      <Container16 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px]">Forex Trading Examples</p>
      </div>
    </div>
  );
}

function Heading2Margin() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pb-[18.75px] relative self-stretch shrink-0" data-name="Heading 2:margin">
      <Heading7 />
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#34e834] content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px pb-[7.56px] pt-[6.75px] px-[15.938px] relative rounded-[3.75px]" data-name="Background">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16.9px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[25.31px]">Selling: EUR/USD</p>
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

function Container20() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Heading2Margin />
      <Margin />
    </div>
  );
}

function Heading8() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[28.13px] right-[28.12px] top-[23.44px]" data-name="Heading 5">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[22.5px] relative shrink-0 text-[18.8px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">The gross profit on your trade is</p>
        <p>calculated as follows:</p>
      </div>
    </div>
  );
}

function Heading9() {
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
    <div className="absolute content-stretch flex flex-col items-start left-[28.13px] pb-[6.125px] pt-[5.625px] right-[28.12px] top-[101.44px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(218,218,218,0.8)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[19.69px]">€200,000 x 1.33623 = USD $267,246</p>
      </div>
    </div>
  );
}

function Heading10() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[28.13px] right-[28.12px] top-[147.88px]" data-name="Heading 6">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Closing Price</p>
      </div>
    </div>
  );
}

function HorizontalBorder2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[28.13px] pb-[6.125px] pt-[5.625px] right-[28.12px] top-[165.88px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(218,218,218,0.8)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[19.69px]">€200,000 x 1.32129 = USD $264,258</p>
      </div>
    </div>
  );
}

function Heading11() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[28.13px] right-[28.12px] top-[212.32px]" data-name="Heading 6">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Gross Profit on Trade</p>
      </div>
    </div>
  );
}

function HorizontalBorder3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[28.13px] pb-[6.125px] pt-[5.625px] right-[28.12px] top-[230.32px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(218,218,218,0.8)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[19.69px]">$2988</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-white h-[285.19px] relative rounded-[9.38px] shrink-0 w-full" data-name="Background">
      <Heading8 />
      <Heading9 />
      <HorizontalBorder1 />
      <Heading10 />
      <HorizontalBorder2 />
      <Heading11 />
      <HorizontalBorder3 />
    </div>
  );
}

function Container22() {
  return (
    <div className="flex-[1_0_0] max-w-[1124.06005859375px] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] px-[14.063px] relative size-full">
        <Background3 />
      </div>
    </div>
  );
}

function Heading12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 5">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[18.8px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px] whitespace-pre-wrap">Opening the Position</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[22.5px] relative shrink-0 text-[15px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">The price of the Euro against the US Dollar</p>
        <p className="mb-0">(EUR/USD) is 1.33623/1.33624 and you</p>
        <p className="mb-0">decide to sell 2 standard lots (the</p>
        <p>equivalent of €200,000) at 1.33623.</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-white relative rounded-[9.38px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col gap-[15px] items-start px-[28.125px] py-[23.438px] relative w-full">
        <Heading12 />
        <Container24 />
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="flex-[1_0_0] max-w-[1124.06005859375px] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] px-[14.063px] relative size-full">
        <Background4 />
      </div>
    </div>
  );
}

function Heading13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 5">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[18.8px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px] whitespace-pre-wrap">Closing the Position</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[22.5px] relative shrink-0 text-[15px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">One week later the Euro has fallen against</p>
        <p className="mb-0">the US Dollar to 1.32128/1.32129 and you</p>
        <p className="mb-0">decide to take your profit by buying back</p>
        <p>2 standard lots at 1.32129.</p>
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-white relative rounded-[9.38px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col gap-[15px] items-start px-[28.125px] py-[23.438px] relative w-full">
        <Heading13 />
        <Container26 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="flex-[1_0_0] max-w-[1124.06005859375px] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] px-[14.063px] relative size-full">
        <Background5 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-wrap gap-0 items-start relative shrink-0 w-[1124.06px]" data-name="Container">
      <Container22 />
      <Container23 />
      <Container25 />
    </div>
  );
}

function Container19() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[14.063px] relative size-full">
          <Container20 />
          <Container21 />
        </div>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-wrap items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Container19 />
    </div>
  );
}

function Section5() {
  return (
    <div className="bg-[#f3f3f3] relative shrink-0 w-full" data-name="Section">
      <div className="content-stretch flex flex-col items-start px-[157.97px] py-[84.375px] relative w-full">
        <Container18 />
      </div>
    </div>
  );
}

function Heading14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px]">Spreads</p>
      </div>
    </div>
  );
}

function Heading2Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pb-[18.75px] relative self-stretch shrink-0" data-name="Heading 2:margin">
      <Heading14 />
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#34e834] content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px pb-[7.56px] pt-[6.75px] px-[15.938px] relative rounded-[3.75px]" data-name="Background">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16.9px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[25.31px]">Forex</p>
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

function Container28() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Heading2Margin1 />
      <Margin1 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex font-['DM_Sans:SemiBold',sans-serif] font-semibold gap-[10.8px] items-start leading-[0] pr-[7.5px] relative shrink-0 text-[15px] tracking-[-0.281px] whitespace-nowrap" data-name="Paragraph">
      <div className="flex flex-col justify-center relative shrink-0 text-[#34e834]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px]">Major</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[rgba(0,0,0,0.6)]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px]">Minor</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[rgba(0,0,0,0.6)]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px]">Exotic</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-[rgba(0,0,0,0.6)] tracking-[-0.281px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p>
          <span className="leading-[22.5px]">{`* `}</span>
          <span className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[22.5px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            MIN
          </span>
          <span className="leading-[22.5px]">{` - Mininum, `}</span>
          <span className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[22.5px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            AVG
          </span>
          <span className="leading-[22.5px]">{` - Average`}</span>
        </p>
      </div>
    </div>
  );
}

function Container34() {
  return <div className="h-[16.88px] shrink-0 w-[104.5px]" data-name="Container" />;
}

function Margin2() {
  return <div className="h-[8px] shrink-0 w-[12px]" data-name="Margin" />;
}

function Container33() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative">
        <Container34 />
        <Margin2 />
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="absolute bg-[#f3f3f3] left-[132.11px] rounded-[28.13px] top-0" data-name="Input">
      <div className="content-stretch flex items-start overflow-clip pl-[11.75px] pr-[33.313px] py-[8.938px] relative rounded-[inherit]">
        <Container33 />
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

function Image5() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start right-[14.06px] size-[13.13px] top-[calc(50%+0.01px)]" data-name="Image">
      <SearchSvgFill />
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[34.75px] relative shrink-0 w-[293.68px]" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['DM_Sans:Light',sans-serif] font-light h-[23px] justify-center leading-[0] left-0 text-[15px] text-[rgba(0,0,0,0.6)] top-[15.69px] tracking-[-0.281px] w-[119.274px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px] whitespace-pre-wrap">Search by Symbol</p>
      </div>
      <Input />
      <Image5 />
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-[rgba(0,0,0,0.6)] tracking-[-0.281px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px]">Table Skin</p>
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pr-[9.375px] relative self-stretch shrink-0" data-name="Margin">
      <Container36 />
    </div>
  );
}

function Background7() {
  return <div className="bg-[#e2e3e3] rounded-[3.75px] shrink-0 size-[22.5px]" data-name="Background" />;
}

function Margin4() {
  return (
    <div className="content-stretch flex flex-col h-[22.5px] items-start pr-[9.375px] relative shrink-0 w-[31.875px]" data-name="Margin">
      <Background7 />
    </div>
  );
}

function Background8() {
  return <div className="bg-black rounded-[3.75px] shrink-0 size-[22.5px]" data-name="Background" />;
}

function Container35() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <Margin3 />
      <Margin4 />
      <Background8 />
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph />
      <Container31 />
      <Container32 />
      <Container35 />
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[15px] text-white w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px] whitespace-pre-wrap">Product</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[15px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px]">Raw Spread Account</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[15px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px]">Standard Account</p>
      </div>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(119,119,119,0.8)] relative rounded-[9.38px] shrink-0 w-full" data-name="Overlay">
      <div className="content-stretch flex items-start justify-between p-[15px] relative w-full">
        <Container37 />
        <Container38 />
        <Container39 />
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px]">SYMBOL</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[260.63px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px]">DESCRIPTION</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[30px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px]">MIN</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[30px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px]">AVG</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[30px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px]">MIN</p>
      </div>
    </div>
  );
}

function Container45() {
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
          <Container40 />
          <Container41 />
          <Container42 />
          <Container43 />
          <Container44 />
          <Container45 />
        </div>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">AUDUSD</p>
        </div>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">Australian Dollar vs United States Dollar</p>
        </div>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0</p>
        </div>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.02</p>
        </div>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.08</p>
        </div>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.1</p>
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
          <Container47 />
          <Container48 />
          <Container49 />
          <Container50 />
          <Container51 />
          <Container52 />
        </div>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">EURUSD</p>
        </div>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">Euro vs United States Dollar</p>
        </div>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0</p>
        </div>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.01</p>
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
          <p className="leading-[normal]">0.08</p>
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
          <p className="leading-[normal]">0.1</p>
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
          <Container53 />
          <Container54 />
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
          <p className="leading-[normal]">GBPUSD</p>
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
          <p className="leading-[normal]">British Pound vs United States Dollar</p>
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
          <p className="leading-[normal]">0</p>
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
          <p className="leading-[normal]">0.04</p>
        </div>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.08</p>
        </div>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.12</p>
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
          <Container63 />
          <Container64 />
        </div>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">USDCAD</p>
        </div>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">United States Dollar vs Canadian Dollar</p>
        </div>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0</p>
        </div>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.04</p>
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
          <p className="leading-[normal]">0.08</p>
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
          <p className="leading-[normal]">0.12</p>
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
          <Container65 />
          <Container66 />
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
          <p className="leading-[normal]">USDCHF</p>
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
          <p className="leading-[normal]">United States Dollar vs Swiss Franc</p>
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
          <p className="leading-[normal]">0</p>
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
          <p className="leading-[normal]">0.09</p>
        </div>
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.08</p>
        </div>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.17</p>
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
          <Container71 />
          <Container72 />
          <Container73 />
          <Container74 />
          <Container75 />
          <Container76 />
        </div>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">USDJPY</p>
        </div>
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">United States Dollar vs Japanese Yen</p>
        </div>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0</p>
        </div>
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.03</p>
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
          <p className="leading-[normal]">0.08</p>
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
          <p className="leading-[normal]">0.11</p>
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
          <Container77 />
          <Container78 />
          <Container79 />
          <Container80 />
          <Container81 />
          <Container82 />
        </div>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start max-h-[562.5px] overflow-auto relative shrink-0 w-full" data-name="Container">
      <HorizontalBorder4 />
      <HorizontalBorder5 />
      <HorizontalBorder6 />
      <HorizontalBorder7 />
      <HorizontalBorder8 />
      <HorizontalBorder9 />
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Background">
      <Overlay />
      <Overlay1 />
      <Container46 />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col gap-[18.75px] items-start relative shrink-0 w-full" data-name="Container">
      <Container30 />
      <Background9 />
    </div>
  );
}

function Container83() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[7.51px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[12.2px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="whitespace-pre-wrap">
          <span className="leading-[18.28px]">{`The spread data displayed should be based on `}</span>
          <span className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[18.28px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            current or very recent market conditions.
          </span>
        </p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[14.063px] relative size-full">
        <Container28 />
        <Container29 />
        <Container83 />
      </div>
    </div>
  );
}

function Section6() {
  return (
    <div className="content-stretch flex flex-wrap items-start justify-center min-h-[827.4000244140625px] py-[84.37px] relative shrink-0 w-[1124.06px]" data-name="Section">
      <Container27 />
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

function Heading15() {
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
    <div className="bg-[#34e834] content-stretch flex items-start justify-center pb-[15.44px] pt-[15.06px] px-[39px] relative rounded-[5.63px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[5.63px]" />
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[20.6px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24.38px]">Open Trading Account</p>
      </div>
    </div>
  );
}

function Link11() {
  return (
    <div className="content-stretch flex items-start justify-center pb-[15.44px] pt-[15.06px] px-[39px] relative rounded-[7.5px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[7.5px]" />
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[20.6px] text-center text-white tracking-[0.469px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24.38px]">Try a Free Demo</p>
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex gap-[19.13px] items-start pt-[4.64px] px-[262.69px] relative w-full">
        <Link10 />
        <Link11 />
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col gap-[18.8px] items-start px-[14.063px] relative size-full">
        <Heading />
        <Heading15 />
        <Container86 />
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="content-stretch flex flex-wrap items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Container85 />
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
        <Container84 />
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