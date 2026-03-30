import svgPaths from "./svg-omlv1i2hor";
import imgSection from "figma:asset/ea7333b07193567de00537f987123286502597c2.png";
import imgSection1 from "figma:asset/51f20067cf5e71c090bf55233b6d4398640d4a22.png";
import imgTradingviewMinimalWebp from "figma:asset/6aead3ba085cad20a5a5b1a08cb087c72541ef5c.png";
import imgMobileTradingviewWebp from "figma:asset/aad022d4b0586b57695b0296de1bb5e185753ba1.png";
import imgAppsTradingWebp from "figma:asset/84968a8a34a50b54d1e587e1acf4cfb7a1efaac8.png";
import imgTradingviewScreensWebp from "figma:asset/74ec17a09500eb357c326d40b5d51d693df3d6ce.png";
import imgNewCustomerIconWebp from "figma:asset/2882e4de027a2771f9db0d7be062a4406a23da94.png";
import imgExistingCustomerIconWebp from "figma:asset/8d7d9a88367113ed2db75c1377cbaaec1a9b21b2.png";
import imgSection2 from "figma:asset/9bf386abf5ebe8137fc57ef8352c95fac56bef61.png";
import { imgGroup, imgGroup1, imgGroup2, imgGroup3, imgGroup4 } from "./svg-szlne";

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px]">Trade on TradingView</p>
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 5">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[18.8px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px]">Level up your trading experience with the best-in-class charting and analytical tools.</p>
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
    <div className="content-stretch flex flex-col gap-[22.5px] items-center max-w-[1124.06005859375px] px-[14.063px] relative self-stretch shrink-0 w-[936.72px]" data-name="Container">
      <Heading1 />
      <Heading4 />
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
    <div className="bg-size-[1928.591537475586px_478.129985332489px,auto_auto] bg-top-left content-stretch flex h-[478.13px] items-center justify-center pt-[105.938px] relative shrink-0 w-full" data-name="Section" style={{ backgroundImage: `url('${imgSection}'), linear-gradient(90deg, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 100%)` }}>
      <Container />
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex flex-col items-start px-[9.375px] py-[14.063px] relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[13.1px] text-[rgba(255,255,255,0.3)] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18.75px]">IC Insights</p>
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
        <p className="leading-[18.75px]">Trading Central</p>
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
        <p className="leading-[18.75px]">Virtual Private Server</p>
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
        <p className="leading-[18.75px]">Trading Servers</p>
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
        <p className="leading-[18.75px]">MetaTrader 4 Advanced Trading Tools</p>
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

function List() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="List">
      <Item />
      <Item1 />
      <Item2 />
      <Item3 />
      <Item4 />
    </div>
  );
}

function Container4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[14.063px] relative size-full">
        <List />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-wrap items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Container4 />
    </div>
  );
}

function Section1() {
  return (
    <div className="bg-black relative shrink-0 w-full" data-name="Section">
      <div className="content-stretch flex flex-col items-start px-[157.97px] relative w-full">
        <Container3 />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[58.5px] relative shrink-0 text-[48.8px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Premiere charting and</p>
        <p className="mb-0">trading with IC Markets</p>
        <p>Global</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[19.5px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[25.31px] relative shrink-0 text-[#282828] text-[16.9px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">TradingView is the world’s leading charting platform and a vibrant</p>
        <p className="mb-0">community used by over 50 million traders. Our trading integration</p>
        <p className="mb-0">via cTrader will allow you to access the best charting and technical</p>
        <p>analysis tools on the market and be informed like never before.</p>
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div className="bg-[#34e834] content-stretch flex items-start justify-center pb-[15.44px] pt-[15.06px] px-[39px] relative rounded-[5.63px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[5.63px]" />
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[20.6px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24.38px]">Open Account</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="flex-[1_0_0] max-w-[1124.06005859375px] min-h-px min-w-px relative" data-name="Container">
      <div className="content-stretch flex flex-col gap-[18px] items-start max-w-[inherit] pt-[22.5px] px-[14.063px] relative w-full">
        <Heading />
        <Container7 />
        <Link6 />
      </div>
    </div>
  );
}

function TradingviewMinimalWebp() {
  return (
    <div className="h-[320.5px] max-w-[533.9099731445312px] relative shrink-0 w-[533.9px]" data-name="tradingview-minimal.webp">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgTradingviewMinimalWebp} />
      </div>
    </div>
  );
}

function Figure() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Figure">
      <TradingviewMinimalWebp />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[18.33%_0.93%_3.53%_0]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 107 14.0646">
        <g id="Group">
          <path d={svgPaths.p39ab9400} fill="var(--fill-0, #0F0F0F)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Svg() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-[108px]" data-name="SVG">
      <Group />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex items-start relative self-stretch shrink-0" data-name="Container">
      <Svg />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-wrap items-start relative shrink-0 w-full" data-name="Container">
      <Container10 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 overflow-x-clip overflow-y-auto top-[-2px]" data-name="Heading 1">
      <div className="flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] relative shrink-0 text-[#0f0f0f] text-[28px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[36px]">Excellent</p>
      </div>
    </div>
  );
}

function Heading1Margin() {
  return (
    <div className="h-[34px] relative shrink-0 w-[116.23px]" data-name="Heading 1:margin">
      <Heading2 />
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="SVG">
          <path d={svgPaths.p3c959500} fill="var(--fill-0, #0F0F0F)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="SVG">
          <path d={svgPaths.p3c959500} fill="var(--fill-0, #0F0F0F)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="SVG">
          <path d={svgPaths.p3c959500} fill="var(--fill-0, #0F0F0F)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="SVG">
          <path d={svgPaths.p3c959500} fill="var(--fill-0, #0F0F0F)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Svg5() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="SVG">
          <path d={svgPaths.p3c959500} fill="var(--fill-0, #0F0F0F)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Figure1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Figure">
      <Svg1 />
      <Svg2 />
      <Svg3 />
      <Svg4 />
      <Svg5 />
    </div>
  );
}

function Component9353314958Ec43Ea98A058Bff051D35D1() {
  return (
    <div className="relative shrink-0 size-[44px]" data-name="93533149-58ec-43ea-98a0-58bff051d35d">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 44">
        <g clipPath="url(#clip0_2144_438)" id="93533149-58ec-43ea-98a0-58bff051d35d">
          <path d={svgPaths.p8b39480} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p8b39480} id="Vector_2" stroke="url(#paint0_linear_2144_438)" strokeWidth="1.04762" />
          <path d={svgPaths.p37ff2480} fill="url(#paint1_linear_2144_438)" id="Vector_3" />
          <path d={svgPaths.p1bde5d80} fill="url(#paint2_linear_2144_438)" id="Vector_4" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_2144_438" x1="1.46667" x2="43.2667" y1="10.1619" y2="33">
            <stop stopColor="#788FFF" />
            <stop offset="0.2" />
            <stop offset="0.8" />
            <stop offset="1" stopColor="#788FFF" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_2144_438" x1="-0.523809" x2="17.0762" y1="8.8" y2="39.0762">
            <stop stopColor="#C3CDFF" />
            <stop offset="0.1" stopColor="#7689E4" />
            <stop offset="0.2" stopColor="#5A76FF" />
            <stop offset="0.3" stopColor="#C3CDFF" />
            <stop offset="0.4" stopColor="#5A76FF" />
            <stop offset="0.5" stopColor="#C3CDFF" />
            <stop offset="0.7" stopColor="#5A76FF" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_2144_438" x1="-0.52381" x2="13.8286" y1="23.2571" y2="51.4381">
            <stop stopColor="#C3CDFF" />
            <stop offset="0.1" stopColor="#7689E4" />
            <stop offset="0.2" stopColor="#5A76FF" />
            <stop offset="0.3" stopColor="#C3CDFF" />
            <stop offset="0.4" stopColor="#5A76FF" />
            <stop offset="0.5" stopColor="#C3CDFF" />
            <stop offset="0.7" stopColor="#5A76FF" />
          </linearGradient>
          <clipPath id="clip0_2144_438">
            <rect fill="white" height="44" width="44" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Component9353314958Ec43Ea98A058Bff051D35DFill() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[44px]" data-name="93533149-58ec-43ea-98a0-58bff051d35d fill">
      <Component9353314958Ec43Ea98A058Bff051D35D1 />
    </div>
  );
}

function Component9353314958Ec43Ea98A058Bff051D35D() {
  return (
    <div className="relative rounded-[7px] shrink-0 size-[44px]" data-name="93533149-58ec-43ea-98a0-58bff051d35d">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <Component9353314958Ec43Ea98A058Bff051D35DFill />
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[7px]" />
    </div>
  );
}

function Item5() {
  return (
    <div className="content-stretch flex flex-col h-[44px] items-end relative shrink-0" data-name="Item">
      <Component9353314958Ec43Ea98A058Bff051D35D />
    </div>
  );
}

function List1() {
  return (
    <div className="content-stretch flex h-[44px] items-start relative shrink-0" data-name="List">
      <Item5 />
    </div>
  );
}

function Component0A5Db6FcF66F46Ec911C5Cbb584Fdac1() {
  return (
    <div className="relative shrink-0 size-[44px]" data-name="0a5db6fc-f66f-46ec-911c-5cbb584fdac6">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 44">
        <g clipPath="url(#clip0_2144_465)" id="0a5db6fc-f66f-46ec-911c-5cbb584fdac6">
          <path d={svgPaths.p71b9e80} fill="url(#paint0_linear_2144_465)" id="Vector" />
          <path d={svgPaths.p15d40e00} fill="var(--fill-0, black)" id="Vector_2" />
          <path d={svgPaths.p106a3600} id="Vector_3" stroke="url(#paint1_linear_2144_465)" strokeWidth="2.09524" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_2144_465" x1="49.2381" x2="4.71428" y1="-2.61904" y2="40.8571">
            <stop offset="0.13" stopColor="#91D7C8" />
            <stop offset="0.24" stopColor="#B1FFEF" />
            <stop offset="0.37" stopColor="#8AD2C3" />
            <stop offset="0.48" stopColor="#CFFEF4" />
            <stop offset="0.56" stopColor="#A7F3E3" />
            <stop offset="0.72" stopColor="#7ABBAC" />
            <stop offset="0.83" stopColor="#B1FFEF" />
            <stop offset="0.91" stopColor="#8AD2C3" />
            <stop offset="1" stopColor="#CFFEF4" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_2144_465" x1="44" x2="-1.19805e-06" y1="44" y2="-1.19805e-06">
            <stop stopColor="#B1FFEF" />
            <stop offset="0.13" stopColor="#91D7C8" />
            <stop offset="0.24" stopColor="#B1FFEF" />
            <stop offset="0.37" stopColor="#8AD7C7" />
            <stop offset="0.48" stopColor="#CFFFF5" />
            <stop offset="0.56" stopColor="#70A89C" />
            <stop offset="0.62" stopColor="#375852" />
            <stop offset="0.72" stopColor="#7DC0B0" />
            <stop offset="0.83" stopColor="#B2FFEF" />
            <stop offset="0.91" stopColor="#90DACB" />
            <stop offset="1" stopColor="#D3FFF6" />
          </linearGradient>
          <clipPath id="clip0_2144_465">
            <rect fill="white" height="44" width="44" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Component0A5Db6FcF66F46Ec911C5Cbb584Fdac6Fill() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[44px]" data-name="0a5db6fc-f66f-46ec-911c-5cbb584fdac6 fill">
      <Component0A5Db6FcF66F46Ec911C5Cbb584Fdac1 />
    </div>
  );
}

function Component0A5Db6FcF66F46Ec911C5Cbb584Fdac() {
  return (
    <div className="relative rounded-[7px] shrink-0 size-[44px]" data-name="0a5db6fc-f66f-46ec-911c-5cbb584fdac6">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <Component0A5Db6FcF66F46Ec911C5Cbb584Fdac6Fill />
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[7px]" />
    </div>
  );
}

function Item6() {
  return (
    <div className="content-stretch flex flex-col h-[44px] items-end relative shrink-0" data-name="Item">
      <Component0A5Db6FcF66F46Ec911C5Cbb584Fdac />
    </div>
  );
}

function List2() {
  return (
    <div className="content-stretch flex h-[44px] items-start relative shrink-0" data-name="List">
      <Item6 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-start flex flex-wrap gap-[0px_12px] items-start relative shrink-0" data-name="Container">
      <List1 />
      <List2 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-center flex flex-wrap gap-[0px_8px] items-center relative shrink-0 w-full" data-name="Container">
      <Heading1Margin />
      <Figure1 />
      <Container12 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#0f0f0f] text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px] whitespace-pre-wrap">Based on 7.9k reviews</p>
      </div>
    </div>
  );
}

function SectionBrokerRatingOnTradingViewSectionBrokerRatingOnTradingView() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Section - Broker Rating on TradingView → Section - Broker Rating on TradingView">
      <Container9 />
      <Container11 />
      <Container13 />
    </div>
  );
}

function TvBrokerRatingLink() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="tv-broker-rating → Link">
      <div aria-hidden="true" className="absolute border border-[#ebebeb] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col items-start p-[21px] relative w-full">
        <SectionBrokerRatingOnTradingViewSectionBrokerRatingOnTradingView />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="flex-[1_0_0] max-w-[1124.06005859375px] min-h-px min-w-px relative" data-name="Container">
      <div className="content-stretch flex flex-col gap-[22.5px] items-start max-w-[inherit] px-[14.063px] relative w-full">
        <Figure />
        <TvBrokerRatingLink />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-center flex flex-wrap items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <Container8 />
    </div>
  );
}

function Section2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[89.52%] left-0 max-w-none top-0 w-full" src={imgSection1} />
      </div>
      <div className="content-stretch flex flex-col items-start px-[157.97px] py-[84.375px] relative w-full">
        <Container5 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[26.06px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[11.25px] relative size-full">
          <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#34e834] text-[16.9px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[25.31px]">Start trading with XAI Technology</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Heading 2">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[11.25px] relative size-full">
          <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[47.25px] relative shrink-0 text-[39.4px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="mb-0">What makes TradingView a leading charting</p>
            <p>platform?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Heading2Margin() {
  return (
    <div className="content-stretch flex flex-col h-[154.5px] items-start justify-center pb-[45px] pt-[15px] relative shrink-0 w-full" data-name="Heading 2:margin">
      <Heading3 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[29.02%_24.59%_22.29%_22.95%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-2.228px] mask-size-[25.6px_25.6px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.6001 23.3728">
        <g id="Group">
          <path d={svgPaths.p23fd7b00} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-[24.38%_24.59%_22.29%_22.95%]" data-name="Clip path group">
      <Group1 />
    </div>
  );
}

function Feature1Svg() {
  return (
    <div className="h-[48px] overflow-clip relative shrink-0 w-[48.8px]" data-name="feature_1.svg">
      <div className="absolute inset-[0_0.82%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
          <path d={svgPaths.p1a1b900} fill="var(--fill-0, #34E834)" id="Vector" />
        </svg>
      </div>
      <ClipPathGroup />
    </div>
  );
}

function Feature1SvgFill() {
  return (
    <div className="content-stretch flex flex-col h-[47.99px] items-center justify-center overflow-clip relative shrink-0 w-[48.8px]" data-name="feature_1.svg fill">
      <Feature1Svg />
    </div>
  );
}

function BestInClassCharts() {
  return (
    <div className="aspect-[48.79999923706055/47.9900016784668] content-stretch flex items-start overflow-clip relative shrink-0" data-name="Best-in-class charts">
      <Feature1SvgFill />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[12.2px] relative shrink-0" data-name="Container">
      <BestInClassCharts />
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[7.5px] relative shrink-0" data-name="Margin">
      <Container17 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 5">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[27px]">Best-in-class charts</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[22.5px] relative shrink-0 text-[#212121] text-[15px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">Interactive and responsive 15+ chart</p>
        <p className="mb-0">types with 110+ drawing tools and a</p>
        <p>wide range of customisations.</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col gap-[22.5px] items-start min-w-[273.9800109863281px] pb-[37.5px] relative shrink-0" data-name="Container">
      <Heading5 />
      <Container19 />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[22.5px] w-full" data-name="Background">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[18.75px] items-start justify-center px-[33.75px] py-[30px] relative size-full">
          <Margin1 />
          <Container18 />
        </div>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[0_771.33px_333.74px_11.25px] items-start justify-center pb-[22.5px]" data-name="Margin">
      <Background />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[28.24%_21.31%_29.48%_19.67%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-4.253px] mask-size-[28.801px_28.8px]" data-name="Group" style={{ maskImage: `url('${imgGroup1}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.8 20.2933">
        <g id="Group">
          <path d={svgPaths.p34990700} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p3b56b9c0} fill="var(--fill-0, black)" id="Vector_2" />
          <path d={svgPaths.p2ecf5700} fill="var(--fill-0, black)" id="Vector_3" />
          <path d={svgPaths.p1174b080} fill="var(--fill-0, black)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup1() {
  return (
    <div className="absolute contents inset-[19.38%_21.31%_20.62%_19.67%]" data-name="Clip path group">
      <Group2 />
    </div>
  );
}

function Feature2Svg() {
  return (
    <div className="h-[48px] overflow-clip relative shrink-0 w-[48.8px]" data-name="feature_2.svg">
      <div className="absolute inset-[0_0.27%_0_1.37%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
          <path d={svgPaths.p1a1b900} fill="var(--fill-0, #34E834)" id="Vector" />
        </svg>
      </div>
      <ClipPathGroup1 />
    </div>
  );
}

function Feature2SvgFill() {
  return (
    <div className="content-stretch flex flex-col h-[47.99px] items-center justify-center overflow-clip relative shrink-0 w-[48.8px]" data-name="feature_2.svg fill">
      <Feature2Svg />
    </div>
  );
}

function TechnicalAnalysis() {
  return (
    <div className="aspect-[48.79999923706055/47.9900016784668] content-stretch flex items-start overflow-clip relative shrink-0" data-name="Technical analysis">
      <Feature2SvgFill />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[12.2px] relative shrink-0" data-name="Container">
      <TechnicalAnalysis />
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[7.5px] relative shrink-0" data-name="Margin">
      <Container20 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 5">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[27px]">Technical analysis</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[22.5px] relative shrink-0 text-[#212121] text-[15px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">400+ pre-built indicators for popular</p>
        <p className="mb-0">strategies and thousands more</p>
        <p>custom-built in the community.</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col gap-[22.5px] items-start min-w-[273.9800109863281px] pb-[37.5px] relative shrink-0" data-name="Container">
      <Heading6 />
      <Container22 />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[22.5px] w-full" data-name="Background">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[18.75px] items-start justify-center px-[33.75px] py-[30px] relative size-full">
          <Margin3 />
          <Container21 />
        </div>
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[0_391.29px_333.74px_391.29px] items-start justify-center pb-[22.5px]" data-name="Margin">
      <Background1 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[22.5%_26.77%_22.5%_25.68%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-1.598px_0px] mask-size-[26.4px_26.4px]" data-name="Group" style={{ maskImage: `url('${imgGroup2}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.2032 26.4">
        <g id="Group">
          <path d={svgPaths.p27be5bc0} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p38c90a00} fill="var(--fill-0, black)" id="Vector_2" />
          <path d={svgPaths.p2e759400} fill="var(--fill-0, black)" id="Vector_3" />
          <path d={svgPaths.ped91a00} fill="var(--fill-0, black)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup2() {
  return (
    <div className="absolute contents inset-[22.5%_23.5%_22.5%_22.4%]" data-name="Clip path group">
      <Group3 />
    </div>
  );
}

function Feature3Svg() {
  return (
    <div className="h-[48px] overflow-clip relative shrink-0 w-[48.8px]" data-name="feature_3.svg">
      <div className="absolute inset-[0_1.37%_0_0.27%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
          <path d={svgPaths.p1a1b900} fill="var(--fill-0, #34E834)" id="Vector" />
        </svg>
      </div>
      <ClipPathGroup2 />
    </div>
  );
}

function Feature3SvgFill() {
  return (
    <div className="content-stretch flex flex-col h-[47.99px] items-center justify-center overflow-clip relative shrink-0 w-[48.8px]" data-name="feature_3.svg fill">
      <Feature3Svg />
    </div>
  );
}

function UnmissableAlerts() {
  return (
    <div className="aspect-[48.79999923706055/47.9900016784668] content-stretch flex items-start overflow-clip relative shrink-0" data-name="Unmissable alerts">
      <Feature3SvgFill />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[12.2px] relative shrink-0" data-name="Container">
      <UnmissableAlerts />
    </div>
  );
}

function Margin5() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[7.5px] relative shrink-0" data-name="Margin">
      <Container23 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 5">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[27px]">Unmissable alerts</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[22.5px] relative shrink-0 text-[#212121] text-[15px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">Never miss a trading opportunity with</p>
        <p className="mb-0">13 notification conditions on price,</p>
        <p>indicators, and strategies.</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col gap-[22.5px] items-start min-w-[273.9800109863281px] pb-[37.5px] relative shrink-0" data-name="Container">
      <Heading7 />
      <Container25 />
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[22.5px] w-full" data-name="Background">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[18.75px] items-start justify-center px-[33.75px] py-[30px] relative size-full">
          <Margin5 />
          <Container24 />
        </div>
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[0_11.25px_333.74px_771.33px] items-start justify-center pb-[22.5px]" data-name="Margin">
      <Background2 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[29.01%_23.77%_29.92%_23.77%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-0.728px] mask-size-[25.6px_21.6px]" data-name="Group" style={{ maskImage: `url('${imgGroup3}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.6 19.7099">
        <g id="Group">
          <path d={svgPaths.p3473e100} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p18d70c00} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup3() {
  return (
    <div className="absolute contents inset-[27.5%_23.77%]" data-name="Clip path group">
      <Group4 />
    </div>
  );
}

function Feature4Svg() {
  return (
    <div className="h-[48px] overflow-clip relative shrink-0 w-[48.8px]" data-name="feature_4.svg">
      <div className="absolute inset-[0_0.82%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
          <path d={svgPaths.p1a1b900} fill="var(--fill-0, #34E834)" id="Vector" />
        </svg>
      </div>
      <ClipPathGroup3 />
    </div>
  );
}

function Feature4SvgFill() {
  return (
    <div className="content-stretch flex flex-col h-[47.99px] items-center justify-center overflow-clip relative shrink-0 w-[48.8px]" data-name="feature_4.svg fill">
      <Feature4Svg />
    </div>
  );
}

function AnalyticalSuite() {
  return (
    <div className="aspect-[48.79999923706055/47.9900016784668] content-stretch flex items-start overflow-clip relative shrink-0" data-name="Analytical suite">
      <Feature4SvgFill />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[12.2px] relative shrink-0" data-name="Container">
      <AnalyticalSuite />
    </div>
  );
}

function Margin7() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[7.5px] relative shrink-0" data-name="Margin">
      <Container26 />
    </div>
  );
}

function Heading8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 5">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[27px]">Analytical suite</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[22.5px] relative shrink-0 text-[#212121] text-[15px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">Forex screener with 100+ descriptive</p>
        <p className="mb-0">and technical criteria, financial news</p>
        <p>and corporate statements.</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col gap-[22.5px] items-start min-w-[273.9800109863281px] pb-[37.5px] relative shrink-0" data-name="Container">
      <Heading8 />
      <Container28 />
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[22.5px] w-full" data-name="Background">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[18.75px] items-start justify-center px-[33.75px] py-[30px] relative size-full">
          <Margin7 />
          <Container27 />
        </div>
      </div>
    </div>
  );
}

function Margin6() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[311.24px_771.33px_0_11.25px] items-start justify-center pb-[22.5px]" data-name="Margin">
      <Background3 />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute inset-[0_0.27%_0_1.37%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Group">
          <path d={svgPaths.p1a1b900} fill="var(--fill-0, #34E834)" id="Vector" />
          <g id="Group_2">
            <path d={svgPaths.p1b801a80} fill="var(--fill-0, black)" id="Vector_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Feature5Svg() {
  return (
    <div className="h-[48px] overflow-clip relative shrink-0 w-[48.8px]" data-name="feature_5.svg">
      <Group5 />
    </div>
  );
}

function Feature5SvgFill() {
  return (
    <div className="content-stretch flex flex-col h-[47.99px] items-center justify-center overflow-clip relative shrink-0 w-[48.8px]" data-name="feature_5.svg fill">
      <Feature5Svg />
    </div>
  );
}

function StrategyTester() {
  return (
    <div className="aspect-[48.79999923706055/47.9900016784668] content-stretch flex items-start overflow-clip relative shrink-0" data-name="Strategy tester">
      <Feature5SvgFill />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[12.2px] relative shrink-0" data-name="Container">
      <StrategyTester />
    </div>
  );
}

function Margin9() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[7.5px] relative shrink-0" data-name="Margin">
      <Container29 />
    </div>
  );
}

function Heading9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 5">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[27px]">Strategy tester</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[22.5px] relative shrink-0 text-[#212121] text-[15px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">Simulate trading activity and use</p>
        <p className="mb-0">historical data to test various</p>
        <p className="mb-0">strategies and setups with detailed</p>
        <p>reports.</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col gap-[22.5px] items-start min-w-[273.9800109863281px] pb-[37.5px] relative shrink-0" data-name="Container">
      <Heading9 />
      <Container31 />
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[22.5px] w-full" data-name="Background">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[18.75px] items-start justify-center px-[33.75px] py-[30px] relative size-full">
          <Margin9 />
          <Container30 />
        </div>
      </div>
    </div>
  );
}

function Margin8() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[311.24px_391.29px_0_391.29px] items-start justify-center pb-[22.5px]" data-name="Margin">
      <Background4 />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute inset-[27.23%_27.59%_28.48%_25.95%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-0.709px] mask-size-[22.676px_22.676px]" data-name="Group" style={{ maskImage: `url('${imgGroup4}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.6762 21.2589">
        <g id="Group">
          <path d={svgPaths.p8767180} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup4() {
  return (
    <div className="absolute contents inset-[25.76%_27.59%_27%_25.95%]" data-name="Clip path group">
      <Group6 />
    </div>
  );
}

function Feature6Svg() {
  return (
    <div className="h-[48px] overflow-clip relative shrink-0 w-[48.8px]" data-name="feature_6.svg">
      <div className="absolute inset-[0_1.37%_0_0.27%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
          <path d={svgPaths.p1a1b900} fill="var(--fill-0, #34E834)" id="Vector" />
        </svg>
      </div>
      <ClipPathGroup4 />
    </div>
  );
}

function Feature6SvgFill() {
  return (
    <div className="content-stretch flex flex-col h-[47.99px] items-center justify-center overflow-clip relative shrink-0 w-[48.8px]" data-name="feature_6.svg fill">
      <Feature6Svg />
    </div>
  );
}

function ChatAndLearn() {
  return (
    <div className="aspect-[48.79999923706055/47.9900016784668] content-stretch flex items-start overflow-clip relative shrink-0" data-name="Chat and learn">
      <Feature6SvgFill />
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[12.2px] relative shrink-0" data-name="Container">
      <ChatAndLearn />
    </div>
  );
}

function Margin11() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[7.5px] relative shrink-0" data-name="Margin">
      <Container32 />
    </div>
  );
}

function Heading10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 5">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[27px]">Chat and learn</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[22.5px] relative shrink-0 text-[#212121] text-[15px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">Communicate and follow top</p>
        <p className="mb-0">community traders from around the</p>
        <p>world and never trade alone again.</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col gap-[22.5px] items-start min-w-[273.9800109863281px] pb-[37.5px] relative shrink-0" data-name="Container">
      <Heading10 />
      <Container34 />
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[22.5px] w-full" data-name="Background">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[18.75px] items-start justify-center px-[33.75px] py-[30px] relative size-full">
          <Margin11 />
          <Container33 />
        </div>
      </div>
    </div>
  );
}

function Margin10() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[311.24px_11.25px_0_771.33px] items-start justify-center pb-[22.5px]" data-name="Margin">
      <Background5 />
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[644.98px] relative shrink-0 w-full" data-name="Container">
      <Margin />
      <Margin2 />
      <Margin4 />
      <Margin6 />
      <Margin8 />
      <Margin10 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Container15 />
      <Heading2Margin />
      <Container16 />
    </div>
  );
}

function Section3() {
  return (
    <div className="bg-[#f3f3f3] relative shrink-0 w-full" data-name="Section">
      <div className="content-stretch flex flex-col items-start pb-[84.37px] pt-[83.63px] px-[157.97px] relative w-full">
        <Container14 />
      </div>
    </div>
  );
}

function MobileTradingviewWebp() {
  return (
    <div className="h-[486.95px] max-w-[1124.06005859375px] relative shrink-0 w-[562.03px]" data-name="mobile-tradingview.webp">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[2.5%] max-w-none top-0 w-[95%]" src={imgMobileTradingviewWebp} />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[26.06px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[11.25px] relative size-full">
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#34e834] text-[16.9px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[25.31px] whitespace-pre-wrap">Start trading with XAI Technology</p>
        </div>
      </div>
    </div>
  );
}

function Heading11() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Heading 2">
      <div className="content-stretch flex flex-col items-start px-[11.25px] relative size-full">
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[47.25px] relative shrink-0 text-[39.4px] text-white w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="mb-0">Why trade on TradingView</p>
          <p>with XAI Technology?</p>
        </div>
      </div>
    </div>
  );
}

function Heading2Margin1() {
  return (
    <div className="content-stretch flex flex-col h-[113.25px] items-start justify-center pb-[18.75px] relative shrink-0 w-full" data-name="Heading 2:margin">
      <Heading11 />
    </div>
  );
}

function TickMarkSvg1() {
  return (
    <div className="relative shrink-0 size-[24.63px]" data-name="tick-mark.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.63 24.63">
        <g clipPath="url(#clip0_2144_426)" id="tick-mark.svg">
          <path d={svgPaths.p10cb0af0} fill="var(--fill-0, #34E834)" id="Vector" />
          <path d={svgPaths.p38d10e00} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_2144_426">
            <rect fill="white" height="24.63" width="24.63" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TickMarkSvgFill() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[24.63px]" data-name="tick-mark.svg fill">
      <TickMarkSvg1 />
    </div>
  );
}

function TickMarkSvg() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative w-full" data-name="tick-mark.svg">
      <TickMarkSvgFill />
    </div>
  );
}

function ImgMargin() {
  return (
    <div className="content-stretch flex flex-col h-full items-start justify-center pr-[15px] relative shrink-0 w-[39.63px]" data-name="Img:margin">
      <TickMarkSvg />
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col h-[26.06px] items-start relative shrink-0 w-[461.95px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16.9px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[25.31px]">Real-time forex and CFD quotes</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[1.44px] items-center pb-[0.75px] px-[11.25px] relative size-full">
          <ImgMargin />
          <Container39 />
        </div>
      </div>
    </div>
  );
}

function Margin13() {
  return (
    <div className="content-stretch flex flex-col h-[32.81px] items-start justify-center pb-[7.5px] relative shrink-0 w-full" data-name="Margin">
      <Container38 />
    </div>
  );
}

function TickMarkSvg3() {
  return (
    <div className="relative shrink-0 size-[24.63px]" data-name="tick-mark.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.63 24.63">
        <g clipPath="url(#clip0_2144_426)" id="tick-mark.svg">
          <path d={svgPaths.p10cb0af0} fill="var(--fill-0, #34E834)" id="Vector" />
          <path d={svgPaths.p38d10e00} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_2144_426">
            <rect fill="white" height="24.63" width="24.63" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TickMarkSvgFill1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[24.63px]" data-name="tick-mark.svg fill">
      <TickMarkSvg3 />
    </div>
  );
}

function TickMarkSvg2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative w-full" data-name="tick-mark.svg">
      <TickMarkSvgFill1 />
    </div>
  );
}

function ImgMargin1() {
  return (
    <div className="content-stretch flex flex-col h-full items-start justify-center pr-[15px] relative shrink-0 w-[39.63px]" data-name="Img:margin">
      <TickMarkSvg2 />
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col h-[26.06px] items-start relative shrink-0 w-[461.95px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16.9px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[25.31px]">Market leading spreads and low commissions</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[1.44px] items-center pb-[0.75px] px-[11.25px] relative size-full">
          <ImgMargin1 />
          <Container41 />
        </div>
      </div>
    </div>
  );
}

function Margin14() {
  return (
    <div className="content-stretch flex flex-col h-[32.81px] items-start justify-center pb-[7.5px] relative shrink-0 w-full" data-name="Margin">
      <Container40 />
    </div>
  );
}

function TickMarkSvg5() {
  return (
    <div className="relative shrink-0 size-[24.63px]" data-name="tick-mark.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.63 24.63">
        <g clipPath="url(#clip0_2144_426)" id="tick-mark.svg">
          <path d={svgPaths.p10cb0af0} fill="var(--fill-0, #34E834)" id="Vector" />
          <path d={svgPaths.p38d10e00} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_2144_426">
            <rect fill="white" height="24.63" width="24.63" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TickMarkSvgFill2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[24.63px]" data-name="tick-mark.svg fill">
      <TickMarkSvg5 />
    </div>
  );
}

function TickMarkSvg4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative w-full" data-name="tick-mark.svg">
      <TickMarkSvgFill2 />
    </div>
  );
}

function ImgMargin2() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[0_484.9px_26px_11.25px] items-start justify-center pr-[15px]" data-name="Img:margin">
      <TickMarkSvg4 />
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[-0.6px_21.51px_0_52.32px] items-start" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[25.31px] relative shrink-0 text-[16.9px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">Micro lot trading – Minimum lot size of 0.01 with no</p>
        <p>maximum</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Container">
      <ImgMargin2 />
      <Container43 />
    </div>
  );
}

function Margin15() {
  return (
    <div className="content-stretch flex flex-col h-[58.13px] items-start justify-center pb-[7.5px] relative shrink-0 w-full" data-name="Margin">
      <Container42 />
    </div>
  );
}

function TickMarkSvg7() {
  return (
    <div className="relative shrink-0 size-[24.63px]" data-name="tick-mark.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.63 24.63">
        <g clipPath="url(#clip0_2144_426)" id="tick-mark.svg">
          <path d={svgPaths.p10cb0af0} fill="var(--fill-0, #34E834)" id="Vector" />
          <path d={svgPaths.p38d10e00} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_2144_426">
            <rect fill="white" height="24.63" width="24.63" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TickMarkSvgFill3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[24.63px]" data-name="tick-mark.svg fill">
      <TickMarkSvg7 />
    </div>
  );
}

function TickMarkSvg6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative w-full" data-name="tick-mark.svg">
      <TickMarkSvgFill3 />
    </div>
  );
}

function ImgMargin3() {
  return (
    <div className="content-stretch flex flex-col h-full items-start justify-center pr-[15px] relative shrink-0 w-[39.63px]" data-name="Img:margin">
      <TickMarkSvg6 />
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col h-[26.06px] items-start relative shrink-0 w-[461.95px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16.9px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[25.31px]">No restrictions on limit orders</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[1.44px] items-center pb-[0.75px] px-[11.25px] relative size-full">
          <ImgMargin3 />
          <Container45 />
        </div>
      </div>
    </div>
  );
}

function Margin16() {
  return (
    <div className="content-stretch flex flex-col h-[32.81px] items-start justify-center pb-[7.5px] relative shrink-0 w-full" data-name="Margin">
      <Container44 />
    </div>
  );
}

function TickMarkSvg9() {
  return (
    <div className="relative shrink-0 size-[24.63px]" data-name="tick-mark.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.63 24.63">
        <g clipPath="url(#clip0_2144_426)" id="tick-mark.svg">
          <path d={svgPaths.p10cb0af0} fill="var(--fill-0, #34E834)" id="Vector" />
          <path d={svgPaths.p38d10e00} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_2144_426">
            <rect fill="white" height="24.63" width="24.63" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TickMarkSvgFill4() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[24.63px]" data-name="tick-mark.svg fill">
      <TickMarkSvg9 />
    </div>
  );
}

function TickMarkSvg8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative w-full" data-name="tick-mark.svg">
      <TickMarkSvgFill4 />
    </div>
  );
}

function ImgMargin4() {
  return (
    <div className="content-stretch flex flex-col h-full items-start justify-center pr-[15px] relative shrink-0 w-[39.63px]" data-name="Img:margin">
      <TickMarkSvg8 />
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col h-[26.06px] items-start relative shrink-0 w-[461.95px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16.9px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[25.31px]">Expanded symbol display</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[1.44px] items-center pb-[0.75px] px-[11.25px] relative size-full">
          <ImgMargin4 />
          <Container47 />
        </div>
      </div>
    </div>
  );
}

function Margin17() {
  return (
    <div className="content-stretch flex flex-col h-[32.81px] items-start justify-center pb-[7.5px] relative shrink-0 w-full" data-name="Margin">
      <Container46 />
    </div>
  );
}

function TickMarkSvg11() {
  return (
    <div className="relative shrink-0 size-[24.63px]" data-name="tick-mark.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.63 24.63">
        <g clipPath="url(#clip0_2144_426)" id="tick-mark.svg">
          <path d={svgPaths.p10cb0af0} fill="var(--fill-0, #34E834)" id="Vector" />
          <path d={svgPaths.p38d10e00} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_2144_426">
            <rect fill="white" height="24.63" width="24.63" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TickMarkSvgFill5() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[24.63px]" data-name="tick-mark.svg fill">
      <TickMarkSvg11 />
    </div>
  );
}

function TickMarkSvg10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative w-full" data-name="tick-mark.svg">
      <TickMarkSvgFill5 />
    </div>
  );
}

function ImgMargin5() {
  return (
    <div className="content-stretch flex flex-col h-full items-start justify-center pr-[15px] relative shrink-0 w-[39.63px]" data-name="Img:margin">
      <TickMarkSvg10 />
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col h-[26.06px] items-start relative shrink-0 w-[461.95px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16.9px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="leading-[25.31px]">One-click trading</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[1.44px] items-center pb-[0.75px] px-[11.25px] relative size-full">
          <ImgMargin5 />
          <Container49 />
        </div>
      </div>
    </div>
  );
}

function Margin18() {
  return (
    <div className="content-stretch flex flex-col h-[32.81px] items-start justify-center pb-[7.5px] relative shrink-0 w-full" data-name="Margin">
      <Container48 />
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15px] items-start justify-center left-[-14.06px] max-w-[1124.06005859375px] pl-[15px] pr-[11.25px] right-[-14.06px] top-[-0.75px]" data-name="Container">
      <Container37 />
      <Heading2Margin1 />
      <Margin13 />
      <Margin14 />
      <Margin15 />
      <Margin16 />
      <Margin17 />
      <Margin18 />
    </div>
  );
}

function Margin12() {
  return (
    <div className="h-[465.75px] max-w-[1095.93505859375px] relative shrink-0 w-[533.905px]" data-name="Margin">
      <Container36 />
    </div>
  );
}

function AppsTradingWebp() {
  return (
    <div className="absolute inset-[20%_70%_54.13%_10%]" data-name="apps-trading.webp">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[5%] max-w-none top-0 w-[89.99%]" src={imgAppsTradingWebp} />
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-center flex flex-wrap items-center justify-between pr-[0.002px] relative w-full">
          <MobileTradingviewWebp />
          <Margin12 />
          <AppsTradingWebp />
        </div>
      </div>
    </div>
  );
}

function Section4() {
  return (
    <div className="bg-[#050505] relative shrink-0 w-full" data-name="Section">
      <div className="content-stretch flex flex-col items-start px-[157.97px] py-[84.375px] relative w-full">
        <Container35 />
      </div>
    </div>
  );
}

function Heading12() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.06px] top-0" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[47.25px] relative shrink-0 text-[39.4px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">{`TradingView desktop &`}</p>
        <p>mobile apps</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.06px] top-[112.65px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[25.31px] relative shrink-0 text-[#282828] text-[16.9px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">Trade on the go on your phone or enhance your experience with the</p>
        <p>powerful desktop terminal.</p>
      </div>
    </div>
  );
}

function TickMarkSvg13() {
  return (
    <div className="relative shrink-0 size-[25.63px]" data-name="tick-mark.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.63 25.63">
        <g clipPath="url(#clip0_2144_449)" id="tick-mark.svg">
          <path d={svgPaths.p3412edc0} fill="var(--fill-0, #34E834)" id="Vector" />
          <path d={svgPaths.p2656d540} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_2144_449">
            <rect fill="white" height="25.63" width="25.63" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TickMarkSvgFill6() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[25.63px]" data-name="tick-mark.svg fill">
      <TickMarkSvg13 />
    </div>
  );
}

function TickMarkSvg12() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="tick-mark.svg">
      <TickMarkSvgFill6 />
    </div>
  );
}

function ImgMargin6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 pr-[15px] right-[493.28px] top-0" data-name="Img:margin">
      <TickMarkSvg12 />
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[42.71px] right-[10.68px] top-[-0.6px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[25.31px] relative shrink-0 text-[#111] text-[16.9px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">100% synchronisation across your browser, mobile and</p>
        <p>desktop versions.</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[50.63px] relative shrink-0 w-full" data-name="Container">
      <ImgMargin6 />
      <Container55 />
    </div>
  );
}

function TickMarkSvg15() {
  return (
    <div className="relative shrink-0 size-[25.63px]" data-name="tick-mark.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.63 25.63">
        <g clipPath="url(#clip0_2144_449)" id="tick-mark.svg">
          <path d={svgPaths.p3412edc0} fill="var(--fill-0, #34E834)" id="Vector" />
          <path d={svgPaths.p2656d540} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_2144_449">
            <rect fill="white" height="25.63" width="25.63" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TickMarkSvgFill7() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[25.63px]" data-name="tick-mark.svg fill">
      <TickMarkSvg15 />
    </div>
  );
}

function TickMarkSvg14() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="tick-mark.svg">
      <TickMarkSvgFill7 />
    </div>
  );
}

function ImgMargin7() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 pr-[15px] right-[493.28px] top-0" data-name="Img:margin">
      <TickMarkSvg14 />
    </div>
  );
}

function Container57() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[42.71px] right-[10.68px] top-[-0.6px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[25.31px] relative shrink-0 text-[#111] text-[16.9px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Get expanded workspace, multiple displays and more</p>
        <p>features in the terminal.</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="h-[50.63px] relative shrink-0 w-full" data-name="Container">
      <ImgMargin7 />
      <Container57 />
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[7.5px] items-start left-[14.06px] right-[14.06px] top-[178.87px]" data-name="Container">
      <Container54 />
      <Container56 />
    </div>
  );
}

function Link7() {
  return (
    <div className="absolute bg-[#34e834] content-stretch flex items-start justify-center left-[14.06px] pb-[15.44px] pt-[15.06px] px-[39px] rounded-[5.63px] top-[310.12px]" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[5.63px]" />
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[20.6px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24.38px]">Open Account</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="flex-[1_0_0] max-w-[1124.06005859375px] min-h-px min-w-px relative self-stretch" data-name="Container">
      <Heading12 />
      <Container52 />
      <Container53 />
      <Link7 />
    </div>
  );
}

function TradingviewScreensWebp() {
  return (
    <div className="flex-[1_0_0] max-w-[1124.06005859375px] min-h-px min-w-px relative self-stretch" data-name="tradingview-screens.webp">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[88.07%] left-[2.5%] max-w-none top-[5.96%] w-[95%]" src={imgTradingviewScreensWebp} />
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-wrap gap-0 items-start relative shrink-0 w-full" data-name="Container">
      <Container51 />
      <TradingviewScreensWebp />
    </div>
  );
}

function Section5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 1440 534.38\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(26.237 0 0 25.768 1065.6 251.16)\\'><stop stop-color=\\'rgba(52,232,52,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(52,232,52,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }}>
      <div className="content-stretch flex flex-col items-start px-[157.97px] py-[84.375px] relative w-full">
        <Container50 />
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#282828] text-[16.9px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[25.31px]">Start Trading with Tradingview</p>
      </div>
    </div>
  );
}

function Heading13() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px]">Connect your XAI Technology account to TradingView</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[-0.75px_0_247.88px_0] items-start px-[14.063px]" data-name="Container">
      <Container60 />
      <Heading13 />
    </div>
  );
}

function NewCustomerIconWebp() {
  return (
    <div className="h-[72px] max-w-[533.9099731445312px] relative shrink-0 w-[73px]" data-name="new-customer-icon.webp">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgNewCustomerIconWebp} />
      </div>
    </div>
  );
}

function Heading14() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[7.5px] relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[30px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[36px]">NEW to XAI Technology</p>
      </div>
    </div>
  );
}

function Link8() {
  return (
    <div className="bg-[#34e834] relative rounded-[5.63px] shrink-0 w-full" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[5.63px]" />
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center pb-[15.44px] pt-[15.06px] px-[39px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[20.6px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[24.38px]">Connect your Account</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-white relative rounded-[9.38px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[15px] items-center px-[28.125px] py-[23.438px] relative w-full">
          <NewCustomerIconWebp />
          <Heading14 />
          <Link8 />
        </div>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-start left-0 max-w-[1124.06005859375px] px-[14.063px] right-1/2 top-[117.56px]" data-name="Container">
      <Background6 />
    </div>
  );
}

function ExistingCustomerIconWebp() {
  return (
    <div className="h-[72px] max-w-[533.9099731445312px] relative shrink-0 w-[73px]" data-name="existing-customer-icon.webp">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgExistingCustomerIconWebp} />
      </div>
    </div>
  );
}

function Heading15() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[7.5px] relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[30px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[36px]">Existing XAI Technology Client</p>
      </div>
    </div>
  );
}

function Link9() {
  return (
    <div className="bg-[#34e834] relative rounded-[5.63px] shrink-0 w-full" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[5.63px]" />
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center pb-[15.44px] pt-[15.06px] px-[39px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[20.6px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[24.38px]">Connect your Account</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-white relative rounded-[9.38px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[15px] items-center px-[28.125px] py-[23.438px] relative w-full">
          <ExistingCustomerIconWebp />
          <Heading15 />
          <Link9 />
        </div>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-start left-1/2 max-w-[1124.06005859375px] px-[14.063px] right-0 top-[117.56px]" data-name="Container">
      <Background7 />
    </div>
  );
}

function Container58() {
  return (
    <div className="h-[365.44px] relative shrink-0 w-full" data-name="Container">
      <Container59 />
      <Container61 />
      <Container62 />
    </div>
  );
}

function Section6() {
  return (
    <div className="bg-[#f3f3f3] relative shrink-0 w-full" data-name="Section">
      <div className="content-stretch flex flex-col items-start pb-[84.375px] pt-[45px] px-[157.97px] relative w-full">
        <Container58 />
      </div>
    </div>
  );
}

function Heading16() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px]">TradingView FAQs</p>
      </div>
    </div>
  );
}

function MinusIconSvg() {
  return (
    <div className="relative shrink-0 size-[24.38px]" data-name="minus-icon.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.38 24.38">
        <g clipPath="url(#clip0_2144_453)" id="minus-icon.svg">
          <path d={svgPaths.p1a011e00} id="Vector" stroke="var(--stroke-0, #34E834)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.21636" />
        </g>
        <defs>
          <clipPath id="clip0_2144_453">
            <rect fill="white" height="24.38" width="24.38" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function MinusIconSvgFill() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 size-[24.38px]" data-name="minus-icon.svg fill">
      <MinusIconSvg />
    </div>
  );
}

function Image() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[24.38px] size-[24.38px]" data-name="Image">
      <MinusIconSvgFill />
    </div>
  );
}

function Heading4Button() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="Heading 4 → Button">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[434.67px] items-center p-[22.5px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[18.8px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[22.5px]">How do I create an account on TradingView?</p>
          </div>
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <Image />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Link10() {
  return (
    <div className="absolute font-['DM_Sans:Bold',sans-serif] font-bold h-[42px] left-0 text-black top-[1.5px] w-[751.34px]" data-name="Link">
      <div className="-translate-y-1/2 absolute flex flex-col h-[23px] justify-center left-[434.79px] top-[9.75px] w-[316.873px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="decoration-solid leading-[22.5px] underline whitespace-pre-wrap">open a free or subscription-based account</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col h-[23px] justify-center left-0 top-[32.25px] w-[43.171px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="decoration-solid leading-[22.5px] underline whitespace-pre-wrap">today</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="h-[45px] relative shrink-0 w-[871.09px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid leading-[0] relative size-full text-[15px]">
        <div className="-translate-y-1/2 absolute flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal h-[23px] justify-center left-0 text-[#272727] top-[11.25px] w-[435.159px]" style={{ fontVariationSettings: "'opsz' 9" }}>
          <p className="leading-[22.5px] whitespace-pre-wrap">{`Opening a TradingView account is simple! Visit TradingView to `}</p>
        </div>
        <Link10 />
        <div className="-translate-y-1/2 absolute flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal h-[23px] justify-center left-[42.85px] text-[#272727] top-[33.75px] w-[3.378px]" style={{ fontVariationSettings: "'opsz' 9" }}>
          <p className="leading-[22.5px] whitespace-pre-wrap">.</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[15px] items-center pb-[16px] relative rounded-tl-[5.63px] rounded-tr-[5.63px] shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e7ec] border-b border-solid inset-0 pointer-events-none rounded-tl-[5.63px] rounded-tr-[5.63px]" />
      <Heading4Button />
      <Container65 />
    </div>
  );
}

function MinusIconSvg1() {
  return (
    <div className="relative shrink-0 size-[24.38px]" data-name="minus-icon.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.38 24.38">
        <g clipPath="url(#clip0_2144_453)" id="minus-icon.svg">
          <path d={svgPaths.p1a011e00} id="Vector" stroke="var(--stroke-0, #34E834)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.21636" />
        </g>
        <defs>
          <clipPath id="clip0_2144_453">
            <rect fill="white" height="24.38" width="24.38" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function MinusIconSvgFill1() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 size-[24.38px]" data-name="minus-icon.svg fill">
      <MinusIconSvg1 />
    </div>
  );
}

function Image1() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[24.38px] size-[24.38px]" data-name="Image">
      <MinusIconSvgFill1 />
    </div>
  );
}

function Heading4Button1() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="Heading 4 → Button">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[162.7px] items-center p-[22.5px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[18.8px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[22.5px]">Which type of XAI Technology account is compatible with TradingView?</p>
          </div>
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <Image1 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="relative shrink-0 w-[871.09px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[87.109px] relative w-full">
        <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#272727] text-[15px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
          <p className="leading-[22.5px]">You can only trade on TradingView with our cTrader Raw Account.</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder1() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[14.99px] items-center pb-[16.01px] relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e7ec] border-b border-solid inset-0 pointer-events-none" />
      <Heading4Button1 />
      <Container66 />
    </div>
  );
}

function MinusIconSvg2() {
  return (
    <div className="relative shrink-0 size-[24.38px]" data-name="minus-icon.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.38 24.38">
        <g clipPath="url(#clip0_2144_453)" id="minus-icon.svg">
          <path d={svgPaths.p1a011e00} id="Vector" stroke="var(--stroke-0, #34E834)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.21636" />
        </g>
        <defs>
          <clipPath id="clip0_2144_453">
            <rect fill="white" height="24.38" width="24.38" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function MinusIconSvgFill2() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 size-[24.38px]" data-name="minus-icon.svg fill">
      <MinusIconSvg2 />
    </div>
  );
}

function Image2() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[24.38px] size-[24.38px]" data-name="Image">
      <MinusIconSvgFill2 />
    </div>
  );
}

function Heading4Button2() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="Heading 4 → Button">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[473.67px] items-center p-[22.5px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[18.8px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[22.5px]">How do I fund my TradingView account?</p>
          </div>
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <Image2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Link11() {
  return (
    <div className="absolute content-stretch flex items-start left-[21.5px] top-[22.25px]" data-name="Link">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="decoration-solid leading-[22.5px] underline">funding</p>
      </div>
    </div>
  );
}

function Link12() {
  return (
    <div className="absolute content-stretch flex items-start left-[111.79px] top-[22.25px]" data-name="Link">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="decoration-solid leading-[22.5px] underline">withdrawals here</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="h-[45px] relative shrink-0 w-[871.09px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal h-[45px] justify-center leading-[22.5px] left-0 text-[#272727] text-[15px] top-[22.5px] w-[778.38px] whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 9" }}>
          <p className="mb-0">You can transfer funds from your Secure Client Area to your TradingView account. You can find more information</p>
          <p>{`on `}</p>
        </div>
        <Link11 />
        <div className="-translate-y-1/2 absolute flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal h-[23px] justify-center leading-[0] left-[77.64px] text-[#272727] text-[15px] top-[33.75px] w-[34.454px]" style={{ fontVariationSettings: "'opsz' 9" }}>
          <p className="leading-[22.5px] whitespace-pre-wrap">{` and `}</p>
        </div>
        <Link12 />
        <div className="-translate-y-1/2 absolute flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal h-[23px] justify-center leading-[0] left-[238.08px] text-[#272727] text-[15px] top-[33.75px] w-[3.378px]" style={{ fontVariationSettings: "'opsz' 9" }}>
          <p className="leading-[22.5px] whitespace-pre-wrap">.</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder2() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[15px] items-center pb-[16px] relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e7ec] border-b border-solid inset-0 pointer-events-none" />
      <Heading4Button2 />
      <Container67 />
    </div>
  );
}

function MinusIconSvg3() {
  return (
    <div className="relative shrink-0 size-[24.38px]" data-name="minus-icon.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.38 24.38">
        <g clipPath="url(#clip0_2144_453)" id="minus-icon.svg">
          <path d={svgPaths.p1a011e00} id="Vector" stroke="var(--stroke-0, #34E834)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.21636" />
        </g>
        <defs>
          <clipPath id="clip0_2144_453">
            <rect fill="white" height="24.38" width="24.38" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function MinusIconSvgFill3() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 size-[24.38px]" data-name="minus-icon.svg fill">
      <MinusIconSvg3 />
    </div>
  );
}

function Image3() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[24.38px] size-[24.38px]" data-name="Image">
      <MinusIconSvgFill3 />
    </div>
  );
}

function Heading4Button3() {
  return (
    <div className="mb-[-0.01px] relative rounded-[12px] shrink-0 w-full" data-name="Heading 4 → Button">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[225.11px] items-center p-[22.5px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[18.8px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[22.5px]">Is it possible to trade on TradingView if my account is still pending?</p>
          </div>
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <Image3 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pr-[87.109px] relative w-full">
        <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#272727] text-[15px] w-full" style={{ fontVariationSettings: "'opsz' 9" }}>
          <p className="leading-[22.5px] whitespace-pre-wrap">Yes, you can! You can trade with a Demo account while your live application is pending.</p>
        </div>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pr-[87.109px] relative w-full">
        <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[22.5px] relative shrink-0 text-[#272727] text-[15px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 9" }}>
          <p className="mb-0">You can open a Demo TradingView account in your Secure Client Area or on TradingView. Once you have logged</p>
          <p>into TradingView, you can connect using the Trading Panel, just as you would with your live account.</p>
        </div>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="mb-[-0.01px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[11.25px] items-start px-[18.75px] py-[15px] relative w-full">
        <Container69 />
        <Container70 />
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder3() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start pb-[1.01px] relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e7ec] border-b border-solid inset-0 pointer-events-none" />
      <Heading4Button3 />
      <Container68 />
    </div>
  );
}

function MinusIconSvg4() {
  return (
    <div className="relative shrink-0 size-[24.38px]" data-name="minus-icon.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.38 24.38">
        <g clipPath="url(#clip0_2144_453)" id="minus-icon.svg">
          <path d={svgPaths.p1a011e00} id="Vector" stroke="var(--stroke-0, #34E834)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.21636" />
        </g>
        <defs>
          <clipPath id="clip0_2144_453">
            <rect fill="white" height="24.38" width="24.38" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function MinusIconSvgFill4() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 size-[24.38px]" data-name="minus-icon.svg fill">
      <MinusIconSvg4 />
    </div>
  );
}

function Image4() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[24.38px] size-[24.38px]" data-name="Image">
      <MinusIconSvgFill4 />
    </div>
  );
}

function Heading4Button4() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="Heading 4 → Button">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[92.99px] items-center p-[22.5px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[22.5px] relative shrink-0 text-[18.8px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="mb-0">Can I trade with different XAI Technology Account Types in my Trading Panel on</p>
            <p>TradingView?</p>
          </div>
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <Image4 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="relative shrink-0 w-[871.09px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[87.109px] relative w-full">
        <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[22.5px] relative shrink-0 text-[#272727] text-[15px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
          <p className="mb-0">Currently, only one account type is available. We are continuously improving our services to ensure that you have</p>
          <p>access to all available options.</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder4() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[15px] items-center pb-[16px] relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#e4e7ec] border-b border-solid inset-0 pointer-events-none" />
      <Heading4Button4 />
      <Container71 />
    </div>
  );
}

function MinusIconSvg5() {
  return (
    <div className="relative shrink-0 size-[24.38px]" data-name="minus-icon.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.38 24.38">
        <g clipPath="url(#clip0_2144_453)" id="minus-icon.svg">
          <path d={svgPaths.p1a011e00} id="Vector" stroke="var(--stroke-0, #34E834)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.21636" />
        </g>
        <defs>
          <clipPath id="clip0_2144_453">
            <rect fill="white" height="24.38" width="24.38" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function MinusIconSvgFill5() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 size-[24.38px]" data-name="minus-icon.svg fill">
      <MinusIconSvg5 />
    </div>
  );
}

function Image5() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[24.38px] size-[24.38px]" data-name="Image">
      <MinusIconSvgFill5 />
    </div>
  );
}

function Heading4Button5() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="Heading 4 → Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[360.21px] items-center p-[22.5px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[18.8px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[22.5px]">Where can I find information about my other trades?</p>
          </div>
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <Image5 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[87.109px] relative shrink-0 w-[871.09px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[22.5px] relative shrink-0 text-[#272727] text-[15px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">If you are an existing cTrader user, you can access your positions and continue trading as usual. The integration</p>
        <p>with TradingView will not affect your pre-existing cTrader account.</p>
      </div>
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[15px] items-center pb-[15px] relative rounded-bl-[5.63px] rounded-br-[5.63px] shrink-0 w-full" data-name="Background">
      <Heading4Button5 />
      <Container72 />
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <BackgroundHorizontalBorder />
      <BackgroundHorizontalBorder1 />
      <BackgroundHorizontalBorder2 />
      <BackgroundHorizontalBorder3 />
      <BackgroundHorizontalBorder4 />
      <Background8 />
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex flex-col gap-[45px] items-start max-w-[1124.06005859375px] px-[14.063px] relative self-stretch shrink-0 w-[936.72px]" data-name="Container">
      <Heading16 />
      <Container64 />
    </div>
  );
}

function Section7() {
  return (
    <div className="content-stretch flex flex-wrap items-start justify-center min-h-[1201.6199951171875px] py-[84.37px] relative shrink-0 w-[1124.06px]" data-name="Section">
      <Container63 />
    </div>
  );
}

function Heading17() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px]">Start Trading with Tradingview</p>
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[16.9px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[25.31px]">Trade within minutes!</p>
      </div>
    </div>
  );
}

function Link13() {
  return (
    <div className="bg-[#34e834] content-stretch flex items-start justify-center pb-[15.44px] pt-[15.06px] px-[39px] relative rounded-[5.63px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[5.63px]" />
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[20.6px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24.38px]">Start Trading</p>
      </div>
    </div>
  );
}

function Link14() {
  return (
    <div className="content-stretch flex items-start justify-center pb-[15.44px] pt-[15.06px] px-[39px] relative rounded-[7.5px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[7.5px]" />
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[20.6px] text-center text-white tracking-[0.469px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24.38px]">View Dashboard</p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex gap-[19.13px] items-start pl-[310.83px] pr-[310.84px] pt-[8.2px] relative w-full">
        <Link13 />
        <Link14 />
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col gap-[6.8px] items-start px-[14.063px] relative size-full">
        <Heading17 />
        <Container75 />
        <Container76 />
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="content-stretch flex flex-wrap items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Container74 />
    </div>
  );
}

function Section8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[128.23%] left-0 max-w-none top-0 w-full" src={imgSection2} />
      </div>
      <div className="content-stretch flex flex-col items-start px-[157.97px] py-[126.562px] relative w-full">
        <Container73 />
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
      <Section8 />
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