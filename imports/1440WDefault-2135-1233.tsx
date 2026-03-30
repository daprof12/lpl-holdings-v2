import svgPaths from "./svg-w09orljdik";
import imgSection from "figma:asset/670de4f093518026af122894c8f169ef3102fb6c.png";
import imgIndicesImgWebp from "figma:asset/67ebee4dab45418d54d523c1174fd638ad616e33.png";
import imgSection1 from "figma:asset/49712abe12194c268a5c9981e2bf290c369efc5f.png";

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px]">Indices CFDs</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[8.1px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[25.31px] relative shrink-0 text-[16.9px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Gain exposure to the basket of instruments making up the index in just one trade. The</p>
        <p>world’s most popular Indices are available on allxAI Technologytrading platforms.</p>
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
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#34e834] text-[13.1px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
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

function Container9() {
  return (
    <div className="absolute content-stretch flex items-start left-[14.06px] top-0 w-[84.38px]" data-name="Container">
      <IconIndicesSvg />
    </div>
  );
}

function Heading4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.07px] top-[102.57px]" data-name="Heading 5">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[28.13px] relative shrink-0 text-[18.8px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Indices are the most popular form of CFDs.xAI Technologyhas a large</p>
        <p className="mb-0">range of Indices from around the world to choose from, including the</p>
        <p className="mb-0">{`Australian S&P 200 Index, UK FTSE 100 Index, US E-mini S&P 500 and US`}</p>
        <p>DJIA Index.</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.07px] top-[230.07px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[28.13px] relative shrink-0 text-[15px] text-[rgba(0,0,0,0.5)] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">A stock index is a good indicative measure of market performance. Indices such as the FTSE 100</p>
        <p className="mb-0">and DJIA Index are baskets of blue chip stocks listed on the exchange and are generally a good</p>
        <p className="mb-0">measure of the current market sentiment. A change in the performance of any constituent stock</p>
        <p>in an index is reflected in a change in the overall value of that index.</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.07px] top-[357.51px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[28.13px] relative shrink-0 text-[15px] text-[rgba(0,0,0,0.5)] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">Indices have the advantage of allowing traders to take a wider view of a basket of stocks rather</p>
        <p className="mb-0">than taking a view on one individual stock alone. Online CFD and futures based indices are</p>
        <p>offered on all platforms.</p>
      </div>
    </div>
  );
}

function Container12() {
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
        <Container12 />
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

function Container13() {
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
        <Container13 />
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

function Container14() {
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
        <Container14 />
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
    <div className="absolute content-stretch flex gap-[18.8px] items-start justify-center left-[14.06px] right-[14.07px] top-[450px]" data-name="List">
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
      <Heading4 />
      <Container10 />
      <Container11 />
      <List1 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 6">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[18px] whitespace-pre-wrap">Indices</p>
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

function Item11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[12.688px] pl-[31.875px] pr-[6.563px] pt-[12.188px] relative w-full">
        <Image />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">25 Indices to trade from</p>
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

function Item12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[12.688px] pl-[31.875px] pr-[6.563px] pt-[12.188px] relative w-full">
        <Image1 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">Leverage up to 1:200</p>
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

function Item13() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[12.688px] pl-[31.875px] pr-[6.563px] pt-[12.188px] relative w-full">
        <Image2 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">Spreads as low as 0.4 pips</p>
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

function Item14() {
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
    <div className="absolute left-[4.69px] size-[15px] top-[13.13px]" data-name="Image">
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
      <div className="content-stretch flex flex-col items-start pb-[12.688px] pl-[31.875px] pr-[6.563px] pt-[12.188px] relative w-full">
        <Image4 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">No commissions</p>
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

function Item16() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div className="content-stretch flex flex-col items-start pl-[31.875px] pr-[6.563px] py-[12.188px] relative w-full">
        <Image5 />
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21.56px]">All platforms</p>
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
      <Item15 />
      <Item16 />
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
      <Link12 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex items-center justify-end max-w-[1058.43994140625px] px-[14.063px] relative self-stretch shrink-0 w-[352.81px]" data-name="Container">
      <Background1 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-wrap gap-0 items-start min-h-[526.8800048828125px] relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Container15 />
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
    <div className="content-stretch flex flex-wrap items-start justify-center py-[84.37px] relative shrink-0 w-[1186px]" data-name="Section">
      <Container6 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[30px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[36px] whitespace-pre-wrap">(Spot) Equity Indices Spreads</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[25.31px] relative shrink-0 text-[16.9px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">{`XAI Technology offers competitive spreads across all of our cash Indices, including the E-mini S&P 500 Index from 0.4 points, the FTSE 100`}</p>
        <p>{`Index from 1 point, Xetra DAX Index from 1 point and S&P 200 Index from 1 point.`}</p>
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[30.6px] relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[30px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[36px] whitespace-pre-wrap">Futures Indices</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[16.9px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[25.31px] whitespace-pre-wrap">In addition to Equity Indices,xAI Technologyalso offers Futures Indices: ICE Dollar Index and VIX Index.</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col gap-[6.9px] items-start px-[14.063px] relative size-full">
        <Heading3 />
        <Container18 />
        <Heading6 />
        <Container19 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-wrap items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Container17 />
    </div>
  );
}

function Section3() {
  return (
    <div className="bg-[#f3f3f3] relative shrink-0 w-full" data-name="Section">
      <div className="content-stretch flex flex-col items-start px-[157.97px] py-[84.375px] relative w-full">
        <Container16 />
      </div>
    </div>
  );
}

function IndicesImgWebp() {
  return (
    <div className="h-[424px] max-w-[562.030029296875px] relative shrink-0 w-[488px]" data-name="indicesImg.webp">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgIndicesImgWebp} />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="flex-[1_0_0] max-w-[1124.06005859375px] min-h-px min-w-px relative" data-name="Container">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] px-[14.063px] relative w-full">
        <IndicesImgWebp />
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.06px] top-0" data-name="Heading 3">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[36px] relative shrink-0 text-[30px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">How to determine if a client is</p>
        <p className="mb-0">entitled dividend from Index</p>
        <p>AUS200?</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.06px] top-[123px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[22.5px] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">From the above example, let us assume that the ex-dividend date for Index</p>
        <p className="mb-0">AUS200 is on the of 18th August 2016. Therefore, a client must have an open</p>
        <p className="mb-0">position for Index AUS200 before the 18th of August 2016 and it must remain</p>
        <p className="mb-0">open until the 18th August 2016, in order to have the dividend adjustment of</p>
        <p className="mb-0">$2.44 per lot. To determine if the dividend adjustment is added or deducted</p>
        <p className="mb-0">to the client’s account, will depend on whether it is a SELL or BUY on AUS200.</p>
        <p className="mb-0">If the client has 1 lot of BUY for AUS200, the client will be entitled $2.44 per</p>
        <p className="mb-0">lot. However, if it is a SELL of AUS200, the client will be deducted $2.44 per</p>
        <p className="mb-0">lot. The amount $2.44 per lot will be converted to the client’s base currency,</p>
        <p>before it is being deducted.</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.06px] top-[355.5px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[22.5px] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Since this is from index AUS200, the dividend adjustment will be AUD$2.44</p>
        <p className="mb-0">per lot. Alternatively, if the index is US500, the dividend adjustment would be</p>
        <p className="mb-0">USD$2.44 per lot.xAI TechnologyEX- Dividends Excel sheet shows the</p>
        <p className="mb-0">expected Indices that will have their index points adjusted for the given week</p>
        <p className="mb-0">and the actual ex-dividend adjustment amount for each indices will be</p>
        <p>updated regularly on our blog, Ex- Dividends Adjustments.</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="flex-[1_0_0] h-[528px] max-w-[1124.06005859375px] min-h-px min-w-px relative" data-name="Container">
      <Heading7 />
      <Container22 />
      <Container23 />
    </div>
  );
}

function Section4() {
  return (
    <div className="content-center flex flex-wrap gap-0 items-center py-[84.37px] relative shrink-0 w-[1124.06px]" data-name="Section">
      <Container20 />
      <Container21 />
    </div>
  );
}

function Heading8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px]">Indices example</p>
      </div>
    </div>
  );
}

function Heading2Margin() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pb-[18.75px] relative self-stretch shrink-0" data-name="Heading 2:margin">
      <Heading8 />
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#34e834] content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px pb-[7.56px] pt-[6.75px] px-[15.938px] relative rounded-[3.75px]" data-name="Background">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16.9px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[25.31px]">Buying: Australia 200 Index</p>
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

function Container26() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Heading2Margin />
      <Margin />
    </div>
  );
}

function Heading9() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[28.13px] right-[28.12px] top-[23.44px]" data-name="Heading 5">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[22.5px] relative shrink-0 text-[18.8px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">The gross profit on your trade is</p>
        <p>calculated as follows:</p>
      </div>
    </div>
  );
}

function Heading10() {
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
        <p className="leading-[19.69px]">4951</p>
      </div>
    </div>
  );
}

function Heading11() {
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
        <p className="leading-[19.69px]">4970</p>
      </div>
    </div>
  );
}

function Heading12() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[28.13px] right-[28.12px] top-[212.31px]" data-name="Heading 6">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Difference</p>
      </div>
    </div>
  );
}

function HorizontalBorder3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[28.13px] pb-[6.125px] pt-[5.625px] right-[28.12px] top-[230.31px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(218,218,218,0.8)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[19.69px]">19</p>
      </div>
    </div>
  );
}

function Heading13() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[28.13px] right-[28.12px] top-[276.75px]" data-name="Heading 6">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Gross Profit on Trade</p>
      </div>
    </div>
  );
}

function HorizontalBorder4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[28.13px] pb-[6.16px] pt-[4.97px] right-[28.12px] top-[294.75px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(218,218,218,0.8)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[19.69px] relative shrink-0 text-[13.1px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">19.00 points x 2 contracts ($2 per point) = AUD</p>
        <p>$38.00</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-white h-[369.31px] relative rounded-[9.38px] shrink-0 w-full" data-name="Background">
      <Heading9 />
      <Heading10 />
      <HorizontalBorder1 />
      <Heading11 />
      <HorizontalBorder2 />
      <Heading12 />
      <HorizontalBorder3 />
      <Heading13 />
      <HorizontalBorder4 />
    </div>
  );
}

function Container28() {
  return (
    <div className="flex-[1_0_0] max-w-[1124.06005859375px] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] px-[14.063px] relative size-full">
        <Background3 />
      </div>
    </div>
  );
}

function Heading14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 5">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[18.8px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px] whitespace-pre-wrap">Opening the Position</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[22.5px] relative shrink-0 text-[15px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">The price of the Australia 200 Index is</p>
        <p className="mb-0">4950.00/4951.00. You are of the view that</p>
        <p className="mb-0">blue-chip stocks are undervalued so you</p>
        <p className="mb-0">decide to buy 2 contracts at 4951.00.</p>
        <p className="mb-0">(One contract is equal to $1 per index</p>
        <p className="mb-0">point). No commission is charged on</p>
        <p>Indices.</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-white relative rounded-[9.38px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col gap-[15px] items-start px-[28.125px] py-[23.438px] relative w-full">
        <Heading14 />
        <Container30 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="flex-[1_0_0] max-w-[1124.06005859375px] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] px-[14.063px] relative size-full">
        <Background4 />
      </div>
    </div>
  );
}

function Heading15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 5">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[18.8px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px] whitespace-pre-wrap">Closing the Position</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[22.5px] relative shrink-0 text-[15px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Four days later, the Australia 200 Index</p>
        <p className="mb-0">has risen to 4970.00/4971.00 and you</p>
        <p className="mb-0">decide to take your profit. You close your</p>
        <p>position by selling 2 contracts at 4970.00.</p>
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-white relative rounded-[9.38px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col gap-[15px] items-start px-[28.125px] py-[23.438px] relative w-full">
        <Heading15 />
        <Container32 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="flex-[1_0_0] max-w-[1124.06005859375px] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] px-[14.063px] relative size-full">
        <Background5 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-wrap gap-0 items-start relative shrink-0 w-[1124.06px]" data-name="Container">
      <Container28 />
      <Container29 />
      <Container31 />
    </div>
  );
}

function Container25() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[14.063px] relative size-full">
          <Container26 />
          <Container27 />
        </div>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-wrap items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Container25 />
    </div>
  );
}

function Section5() {
  return (
    <div className="bg-[#f3f3f3] relative shrink-0 w-full" data-name="Section">
      <div className="content-stretch flex flex-col items-start px-[157.97px] py-[84.375px] relative w-full">
        <Container24 />
      </div>
    </div>
  );
}

function Heading16() {
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
      <Heading16 />
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#34e834] content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px pb-[7.56px] pt-[6.75px] px-[15.938px] relative rounded-[3.75px]" data-name="Background">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16.9px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[25.31px]">Indices</p>
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

function Container34() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Heading2Margin1 />
      <Margin1 />
    </div>
  );
}

function Container37() {
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

function Container40() {
  return <div className="h-[16.88px] shrink-0 w-[104.5px]" data-name="Container" />;
}

function Margin2() {
  return <div className="h-[8px] shrink-0 w-[12px]" data-name="Margin" />;
}

function Container39() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative">
        <Container40 />
        <Margin2 />
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="absolute bg-[#f3f3f3] left-[132.12px] rounded-[28.13px] top-0" data-name="Input">
      <div className="content-stretch flex items-start overflow-clip pl-[11.75px] pr-[33.313px] py-[8.938px] relative rounded-[inherit]">
        <Container39 />
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

function Container38() {
  return (
    <div className="h-[34.75px] relative shrink-0 w-[293.68px]" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['DM_Sans:Light',sans-serif] font-light h-[23px] justify-center leading-[0] left-0 text-[15px] text-[rgba(0,0,0,0.6)] top-[15.68px] tracking-[-0.281px] w-[119.274px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px] whitespace-pre-wrap">Search by Symbol</p>
      </div>
      <Input />
      <Image6 />
    </div>
  );
}

function Container42() {
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
      <Container42 />
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

function Container41() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <Margin3 />
      <Margin4 />
      <Background8 />
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container37 />
      <Container38 />
      <Container41 />
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[15px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px]">Product</p>
      </div>
    </div>
  );
}

function Container44() {
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
        <Container43 />
        <Container44 />
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px]">SYMBOL</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[260.63px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px]">DESCRIPTION</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[30px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px]">MIN</p>
      </div>
    </div>
  );
}

function Container48() {
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
          <Container45 />
          <Container46 />
          <Container47 />
          <Container48 />
        </div>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">AUS200</p>
        </div>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">{`Australia S&P ASX 200 Index`}</p>
        </div>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.000</p>
        </div>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">1.220</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder5() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center justify-between left-0 pb-[0.5px] px-[15px] right-0 top-0" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <Container50 />
      <Container51 />
      <Container52 />
      <Container53 />
    </div>
  );
}

function Container54() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">DE40</p>
        </div>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">Germany 40 Index</p>
        </div>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.500</p>
        </div>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">1.338</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder6() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center justify-between left-0 pb-[0.5px] px-[15px] right-0 top-[60px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <Container54 />
      <Container55 />
      <Container56 />
      <Container57 />
    </div>
  );
}

function Container58() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">F40</p>
        </div>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">France 40 Index</p>
        </div>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.000</p>
        </div>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.749</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder7() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center justify-between left-0 pb-[0.5px] px-[15px] right-0 top-[120px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <Container58 />
      <Container59 />
      <Container60 />
      <Container61 />
    </div>
  );
}

function Container62() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">JP225</p>
        </div>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">Japan 225 Index</p>
        </div>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">6.000</p>
        </div>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">8.858</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder8() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center justify-between left-0 pb-[0.5px] px-[15px] right-0 top-[180px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <Container62 />
      <Container63 />
      <Container64 />
      <Container65 />
    </div>
  );
}

function Container66() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">STOXX50</p>
        </div>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">EU Stocks 50 Index</p>
        </div>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.200</p>
        </div>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">1.760</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder9() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center justify-between left-0 pb-[0.5px] px-[15px] right-0 top-[240px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <Container66 />
      <Container67 />
      <Container68 />
      <Container69 />
    </div>
  );
}

function Container70() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">UK100</p>
        </div>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">UK 100 Index</p>
        </div>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">1.000</p>
        </div>
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">2.133</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder10() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center justify-between left-0 pb-[0.5px] px-[15px] right-0 top-[300px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <Container70 />
      <Container71 />
      <Container72 />
      <Container73 />
    </div>
  );
}

function Container74() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">US30</p>
        </div>
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">US Wall Street 30 Index</p>
        </div>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">1.000</p>
        </div>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">1.411</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder11() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center justify-between left-0 pb-[0.5px] px-[15px] right-0 top-[360px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <Container74 />
      <Container75 />
      <Container76 />
      <Container77 />
    </div>
  );
}

function Container78() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">US500</p>
        </div>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">US SPX 500 Index</p>
        </div>
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.200</p>
        </div>
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.492</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder12() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center justify-between left-0 pb-[0.5px] px-[15px] right-0 top-[420px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <Container78 />
      <Container79 />
      <Container80 />
      <Container81 />
    </div>
  );
}

function Container82() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">USTEC</p>
        </div>
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">US Tech 100 Index</p>
        </div>
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">1.000</p>
        </div>
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">1.807</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder13() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center justify-between left-0 pb-[0.5px] px-[15px] right-0 top-[480px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <Container82 />
      <Container83 />
      <Container84 />
      <Container85 />
    </div>
  );
}

function Container86() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">CA60</p>
        </div>
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">Canada 60 Index</p>
        </div>
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.600</p>
        </div>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.600</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder14() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center justify-between left-0 pb-[0.5px] px-[15px] right-0 top-[540px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <Container86 />
      <Container87 />
      <Container88 />
      <Container89 />
    </div>
  );
}

function Container90() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">CHINA50</p>
        </div>
      </div>
    </div>
  );
}

function Container91() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">FTSE China A50 Index</p>
        </div>
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">3.290</p>
        </div>
      </div>
    </div>
  );
}

function Container93() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">6.953</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder15() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center justify-between left-0 pb-[0.5px] px-[15px] right-0 top-[600px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <Container90 />
      <Container91 />
      <Container92 />
      <Container93 />
    </div>
  );
}

function Container94() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">CHINAH</p>
        </div>
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">Hong Kong China H-shares Index</p>
        </div>
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.000</p>
        </div>
      </div>
    </div>
  );
}

function Container97() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">2.083</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder16() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center justify-between left-0 pb-[0.5px] px-[15px] right-0 top-[660px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <Container94 />
      <Container95 />
      <Container96 />
      <Container97 />
    </div>
  );
}

function Container98() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">ES35</p>
        </div>
      </div>
    </div>
  );
}

function Container99() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">Spain 35 Index</p>
        </div>
      </div>
    </div>
  );
}

function Container100() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">4.200</p>
        </div>
      </div>
    </div>
  );
}

function Container101() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">4.426</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder17() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center justify-between left-0 pb-[0.5px] px-[15px] right-0 top-[720px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <Container98 />
      <Container99 />
      <Container100 />
      <Container101 />
    </div>
  );
}

function Container102() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">HK50</p>
        </div>
      </div>
    </div>
  );
}

function Container103() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">Hong Kong 50 Index</p>
        </div>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">7.000</p>
        </div>
      </div>
    </div>
  );
}

function Container105() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">8.169</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder18() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center justify-between left-0 pb-[0.5px] px-[15px] right-0 top-[780px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <Container102 />
      <Container103 />
      <Container104 />
      <Container105 />
    </div>
  );
}

function Container106() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">IT40</p>
        </div>
      </div>
    </div>
  );
}

function Container107() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">Italy 40 Index</p>
        </div>
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">9.000</p>
        </div>
      </div>
    </div>
  );
}

function Container109() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">9.000</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder19() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center justify-between left-0 pb-[0.5px] px-[15px] right-0 top-[840px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <Container106 />
      <Container107 />
      <Container108 />
      <Container109 />
    </div>
  );
}

function Container110() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">MidDE50</p>
        </div>
      </div>
    </div>
  );
}

function Container111() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">Germany Mid 50 Index</p>
        </div>
      </div>
    </div>
  );
}

function Container112() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">7.500</p>
        </div>
      </div>
    </div>
  );
}

function Container113() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">27.864</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder20() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center justify-between left-0 pb-[0.5px] px-[15px] right-0 top-[900px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <Container110 />
      <Container111 />
      <Container112 />
      <Container113 />
    </div>
  );
}

function Container114() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">NETH25</p>
        </div>
      </div>
    </div>
  );
}

function Container115() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">Netherlands 25 Index</p>
        </div>
      </div>
    </div>
  );
}

function Container116() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.190</p>
        </div>
      </div>
    </div>
  );
}

function Container117() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.190</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder21() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center justify-between left-0 pb-[0.5px] px-[15px] right-0 top-[960px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <Container114 />
      <Container115 />
      <Container116 />
      <Container117 />
    </div>
  );
}

function Container118() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">NOR25</p>
        </div>
      </div>
    </div>
  );
}

function Container119() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">Norway 25 Index</p>
        </div>
      </div>
    </div>
  );
}

function Container120() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.680</p>
        </div>
      </div>
    </div>
  );
}

function Container121() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.680</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder22() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center justify-between left-0 pb-[0.5px] px-[15px] right-0 top-[1020px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <Container118 />
      <Container119 />
      <Container120 />
      <Container121 />
    </div>
  );
}

function Container122() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">SA40</p>
        </div>
      </div>
    </div>
  );
}

function Container123() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">South Africa 40 Index</p>
        </div>
      </div>
    </div>
  );
}

function Container124() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">7.500</p>
        </div>
      </div>
    </div>
  );
}

function Container125() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">15.444</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder23() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center justify-between left-0 pb-[0.5px] px-[15px] right-0 top-[1080px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <Container122 />
      <Container123 />
      <Container124 />
      <Container125 />
    </div>
  );
}

function Container126() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">SE30</p>
        </div>
      </div>
    </div>
  );
}

function Container127() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">Sweden 30</p>
        </div>
      </div>
    </div>
  );
}

function Container128() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.380</p>
        </div>
      </div>
    </div>
  );
}

function Container129() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.380</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder24() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center justify-between left-0 pb-[0.5px] px-[15px] right-0 top-[1140px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <Container126 />
      <Container127 />
      <Container128 />
      <Container129 />
    </div>
  );
}

function Container130() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">SWI20</p>
        </div>
      </div>
    </div>
  );
}

function Container131() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">Switzerland 20 Index</p>
        </div>
      </div>
    </div>
  );
}

function Container132() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">3.000</p>
        </div>
      </div>
    </div>
  );
}

function Container133() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">3.500</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder25() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center justify-between left-0 pb-[0.5px] px-[15px] right-0 top-[1200px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <Container130 />
      <Container131 />
      <Container132 />
      <Container133 />
    </div>
  );
}

function Container134() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">TecDE30</p>
        </div>
      </div>
    </div>
  );
}

function Container135() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">Germany Tech 30 Index</p>
        </div>
      </div>
    </div>
  );
}

function Container136() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">2.300</p>
        </div>
      </div>
    </div>
  );
}

function Container137() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">3.172</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder26() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center justify-between left-0 pb-[0.5px] px-[15px] right-0 top-[1260px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <Container134 />
      <Container135 />
      <Container136 />
      <Container137 />
    </div>
  );
}

function Container138() {
  return (
    <div className="relative shrink-0 w-[86.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">US2000</p>
        </div>
      </div>
    </div>
  );
}

function Container139() {
  return (
    <div className="relative shrink-0 w-[281.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">US Small Cap 2000 Index</p>
        </div>
      </div>
    </div>
  );
}

function Container140() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.140</p>
        </div>
      </div>
    </div>
  );
}

function Container141() {
  return (
    <div className="relative shrink-0 w-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[normal]">0.480</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder27() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center justify-between left-0 pb-[0.5px] px-[15px] right-0 top-[1320px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e3e3] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <Container138 />
      <Container139 />
      <Container140 />
      <Container141 />
    </div>
  );
}

function Container49() {
  return (
    <div className="h-[562.5px] max-h-[562.5px] overflow-auto relative shrink-0 w-full" data-name="Container">
      <HorizontalBorder5 />
      <HorizontalBorder6 />
      <HorizontalBorder7 />
      <HorizontalBorder8 />
      <HorizontalBorder9 />
      <HorizontalBorder10 />
      <HorizontalBorder11 />
      <HorizontalBorder12 />
      <HorizontalBorder13 />
      <HorizontalBorder14 />
      <HorizontalBorder15 />
      <HorizontalBorder16 />
      <HorizontalBorder17 />
      <HorizontalBorder18 />
      <HorizontalBorder19 />
      <HorizontalBorder20 />
      <HorizontalBorder21 />
      <HorizontalBorder22 />
      <HorizontalBorder23 />
      <HorizontalBorder24 />
      <HorizontalBorder25 />
      <HorizontalBorder26 />
      <HorizontalBorder27 />
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Background">
      <Overlay />
      <Overlay1 />
      <Container49 />
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col gap-[18.75px] items-start relative shrink-0 w-full" data-name="Container">
      <Container36 />
      <Background9 />
    </div>
  );
}

function Container33() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col gap-[0.01px] items-start px-[14.063px] relative size-full">
        <Container34 />
        <Container35 />
      </div>
    </div>
  );
}

function Section6() {
  return (
    <div className="content-stretch flex flex-wrap items-start justify-center py-[84.37px] relative shrink-0 w-[1124.06px]" data-name="Section">
      <Container33 />
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

function Heading17() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[22.5px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[27px]">global markets today!</p>
      </div>
    </div>
  );
}

function Link13() {
  return (
    <div className="bg-[#34e834] content-stretch flex items-start justify-center pb-[15.44px] pt-[15.06px] px-[39px] relative rounded-[5.63px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[5.63px]" />
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[20.6px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24.38px]">Open Trading Account</p>
      </div>
    </div>
  );
}

function Link14() {
  return (
    <div className="content-stretch flex items-start justify-center pb-[15.44px] pt-[15.06px] px-[39px] relative rounded-[7.5px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[7.5px]" />
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[20.6px] text-center text-white tracking-[0.469px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24.38px]">View My Dashboard</p>
      </div>
    </div>
  );
}

function Container144() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex gap-[19.13px] items-start pt-[4.64px] px-[262.69px] relative w-full">
        <Link13 />
        <Link14 />
      </div>
    </div>
  );
}

function Container143() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col gap-[18.8px] items-start px-[14.063px] relative size-full">
        <Heading />
        <Heading17 />
        <Container144 />
      </div>
    </div>
  );
}

function Container142() {
  return (
    <div className="content-stretch flex flex-wrap items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Container143 />
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
        <Container142 />
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