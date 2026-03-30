import svgPaths from "./svg-opl7rqsois";

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-center relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#4572c4] text-[22px] text-center tracking-[-0.44px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[32.4px]">Pricing</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[33px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-start justify-center relative">
        <Container2 />
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex items-start pb-[11px] pt-[10.25px] px-[11px] relative rounded-[550px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#4572c4] border-solid inset-0 pointer-events-none rounded-[550px]" />
      <Container1 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <Link />
    </div>
  );
}

function Heading() {
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
    <div className="content-stretch flex flex-col items-center pb-[45.44px] pt-[44.76px] px-[20px] relative rounded-tl-[20px] shrink-0 w-[268.52px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid inset-[0_-1px_0_0] pointer-events-none rounded-tl-[20px]" />
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[24px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[26.16px]">LPL-Holdings</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-center mb-[-0.1px] relative shrink-0 w-full" data-name="Container">
      <div className="capitalize flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#503131] text-[44px] text-center tracking-[-0.88px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[46.64px]">$250</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[0.1px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] mb-[-0.1px] relative shrink-0 text-[#4572c4] text-[24px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[26.16px]">Basic</p>
      </div>
      <Container4 />
    </div>
  );
}

function Cell1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[29.4px] pt-[14px] px-[20px] relative shrink-0 w-[135.37px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid inset-[0_-1px_0_0] pointer-events-none" />
      <Container3 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-center mb-[-0.1px] relative shrink-0 w-full" data-name="Container">
      <div className="capitalize flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#503131] text-[44px] text-center tracking-[-0.88px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[46.64px]">$5000</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[0.1px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] mb-[-0.1px] relative shrink-0 text-[#4572c4] text-[24px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[26.16px]">Standard</p>
      </div>
      <Container6 />
    </div>
  );
}

function Cell2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[29.4px] pt-[14px] px-[20px] relative shrink-0 w-[189.27px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid inset-[0_-1px_0_0] pointer-events-none" />
      <Container5 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-center mb-[-0.1px] relative shrink-0 w-full" data-name="Container">
      <div className="capitalize flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#503131] text-[44px] text-center tracking-[-0.88px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[46.64px]">$25000</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[0.1px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] mb-[-0.1px] relative shrink-0 text-[#4572c4] text-[24px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[26.16px]">Silver</p>
      </div>
      <Container8 />
    </div>
  );
}

function Cell3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[29.4px] pt-[14px] px-[20px] relative shrink-0 w-[198.88px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid inset-[0_-1px_0_0] pointer-events-none" />
      <Container7 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-center mb-[-0.1px] relative shrink-0 w-full" data-name="Container">
      <div className="capitalize flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#503131] text-[44px] text-center tracking-[-0.88px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[46.64px]">$50000</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[0.1px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] mb-[-0.1px] relative shrink-0 text-[#4572c4] text-[24px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[26.16px]">Gold</p>
      </div>
      <Container10 />
    </div>
  );
}

function Cell4() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[29.4px] pt-[14px] px-[20px] relative shrink-0 w-[198.88px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid inset-[0_-1px_0_0] pointer-events-none" />
      <Container9 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-center mb-[-0.1px] relative shrink-0 w-full" data-name="Container">
      <div className="capitalize flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#503131] text-[44px] text-center tracking-[-0.88px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[46.64px]">$100000</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[0.1px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] mb-[-0.1px] relative shrink-0 text-[#4572c4] text-[24px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[26.16px]">Platinum</p>
      </div>
      <Container12 />
    </div>
  );
}

function Cell5() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[29.4px] pt-[14px] px-[20px] relative rounded-tr-[20px] shrink-0 w-[208.49px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid inset-[0_-1px_0_0] pointer-events-none rounded-tr-[20px]" />
      <Container11 />
    </div>
  );
}

function HeaderRow() {
  return (
    <div className="mb-[-0.01px] relative shrink-0 w-full" data-name="Header → Row">
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

function Container13() {
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
      <Container13 />
    </div>
  );
}

function Svg() {
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

function Container14() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[28.68px] pr-[28.69px] relative w-full">
        <Svg />
      </div>
    </div>
  );
}

function Data1() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[135.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container14 />
    </div>
  );
}

function Svg1() {
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

function Container15() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[55.63px] pr-[55.64px] relative w-full">
        <Svg1 />
      </div>
    </div>
  );
}

function Data2() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[189.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container15 />
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

function Container16() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] px-[60.44px] relative w-full">
        <Svg2 />
      </div>
    </div>
  );
}

function Data3() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container16 />
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

function Container17() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[60.43px] pr-[60.45px] relative w-full">
        <Svg3 />
      </div>
    </div>
  );
}

function Data4() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container17 />
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

function Container18() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[65.24px] pr-[65.25px] relative w-full">
        <Svg4 />
      </div>
    </div>
  );
}

function Data5() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[208.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container18 />
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

function Container19() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Nunito_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[24px] text-black w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          <p className="leading-[34.88px] mb-0">Negative Balance</p>
          <p className="leading-[34.88px]">Protection</p>
        </div>
      </div>
    </div>
  );
}

function Data6() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[269.52px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container19 />
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

function Container20() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[28.68px] pr-[28.69px] relative w-full">
        <Svg5 />
      </div>
    </div>
  );
}

function Data7() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[27.45px] pl-[20px] pr-[21px] pt-[28.44px] relative shrink-0 w-[136.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container20 />
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

function Container21() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[55.63px] pr-[55.64px] relative w-full">
        <Svg6 />
      </div>
    </div>
  );
}

function Data8() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[27.45px] pl-[20px] pr-[21px] pt-[28.44px] relative shrink-0 w-[190.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container21 />
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

function Container22() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] px-[60.44px] relative w-full">
        <Svg7 />
      </div>
    </div>
  );
}

function Data9() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[27.45px] pl-[20px] pr-[21px] pt-[28.44px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container22 />
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

function Container23() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[60.43px] pr-[60.45px] relative w-full">
        <Svg8 />
      </div>
    </div>
  );
}

function Data10() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[27.45px] pl-[20px] pr-[21px] pt-[28.44px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container23 />
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

function Container24() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[65.24px] pr-[65.25px] relative w-full">
        <Svg9 />
      </div>
    </div>
  );
}

function Data11() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[27.45px] pl-[20px] pr-[21px] pt-[28.44px] relative shrink-0 w-[209.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container24 />
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

function Container25() {
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
      <Container25 />
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

function Container26() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[28.68px] pr-[28.69px] relative w-full">
        <Svg10 />
      </div>
    </div>
  );
}

function Data13() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[135.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container26 />
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

function Container27() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[55.63px] pr-[55.64px] relative w-full">
        <Svg11 />
      </div>
    </div>
  );
}

function Data14() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[189.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container27 />
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

function Container28() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] px-[60.44px] relative w-full">
        <Svg12 />
      </div>
    </div>
  );
}

function Data15() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container28 />
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

function Container29() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[60.43px] pr-[60.45px] relative w-full">
        <Svg13 />
      </div>
    </div>
  );
}

function Data16() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container29 />
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

function Container30() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[65.24px] pr-[65.25px] relative w-full">
        <Svg14 />
      </div>
    </div>
  );
}

function Data17() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[208.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container30 />
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

function Container31() {
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
      <Container31 />
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

function Container32() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[28.68px] pr-[28.69px] relative w-full">
        <Svg15 />
      </div>
    </div>
  );
}

function Data19() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[136.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container32 />
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

function Container33() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[55.63px] pr-[55.64px] relative w-full">
        <Svg16 />
      </div>
    </div>
  );
}

function Data20() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[190.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container33 />
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

function Container34() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] px-[60.44px] relative w-full">
        <Svg17 />
      </div>
    </div>
  );
}

function Data21() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container34 />
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

function Container35() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[60.43px] pr-[60.45px] relative w-full">
        <Svg18 />
      </div>
    </div>
  );
}

function Data22() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container35 />
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

function Container36() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[65.24px] pr-[65.25px] relative w-full">
        <Svg19 />
      </div>
    </div>
  );
}

function Data23() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[209.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container36 />
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

function Container37() {
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
      <Container37 />
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

function Container38() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[28.68px] pr-[28.69px] relative w-full">
        <Svg20 />
      </div>
    </div>
  );
}

function Data25() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[135.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container38 />
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

function Container39() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[55.63px] pr-[55.64px] relative w-full">
        <Svg21 />
      </div>
    </div>
  );
}

function Data26() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[189.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container39 />
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

function Container40() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] px-[60.44px] relative w-full">
        <Svg22 />
      </div>
    </div>
  );
}

function Data27() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container40 />
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

function Container41() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[60.43px] pr-[60.45px] relative w-full">
        <Svg23 />
      </div>
    </div>
  );
}

function Data28() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container41 />
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

function Container42() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[65.24px] pr-[65.25px] relative w-full">
        <Svg24 />
      </div>
    </div>
  );
}

function Data29() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[208.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container42 />
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

function Container43() {
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
      <Container43 />
    </div>
  );
}

function Svg25() {
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

function Container44() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[28.68px] pr-[28.69px] relative w-full">
        <Svg25 />
      </div>
    </div>
  );
}

function Data31() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[136.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container44 />
    </div>
  );
}

function Svg26() {
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

function Container45() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[55.63px] pr-[55.64px] relative w-full">
        <Svg26 />
      </div>
    </div>
  );
}

function Data32() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[190.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container45 />
    </div>
  );
}

function Svg27() {
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
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] px-[60.44px] relative w-full">
        <Svg27 />
      </div>
    </div>
  );
}

function Data33() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container46 />
    </div>
  );
}

function Svg28() {
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
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[60.43px] pr-[60.45px] relative w-full">
        <Svg28 />
      </div>
    </div>
  );
}

function Data34() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container47 />
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

function Container48() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[65.24px] pr-[65.25px] relative w-full">
        <Svg29 />
      </div>
    </div>
  );
}

function Data35() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[209.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container48 />
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

function Container49() {
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
      <Container49 />
    </div>
  );
}

function Svg30() {
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

function Container50() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[28.68px] pr-[28.69px] relative w-full">
        <Svg30 />
      </div>
    </div>
  );
}

function Data37() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[135.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container50 />
    </div>
  );
}

function Svg31() {
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

function Container51() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[55.63px] pr-[55.64px] relative w-full">
        <Svg31 />
      </div>
    </div>
  );
}

function Data38() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[189.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container51 />
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

function Container52() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] px-[60.44px] relative w-full">
        <Svg32 />
      </div>
    </div>
  );
}

function Data39() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container52 />
    </div>
  );
}

function Svg33() {
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
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[60.43px] pr-[60.45px] relative w-full">
        <Svg33 />
      </div>
    </div>
  );
}

function Data40() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container53 />
    </div>
  );
}

function Svg34() {
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

function Container54() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[65.24px] pr-[65.25px] relative w-full">
        <Svg34 />
      </div>
    </div>
  );
}

function Data41() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[208.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container54 />
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

function Container55() {
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
      <Container55 />
    </div>
  );
}

function Svg35() {
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

function Container56() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[28.68px] pr-[28.69px] relative w-full">
        <Svg35 />
      </div>
    </div>
  );
}

function Data43() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[136.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container56 />
    </div>
  );
}

function Svg36() {
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

function Container57() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[55.63px] pr-[55.64px] relative w-full">
        <Svg36 />
      </div>
    </div>
  );
}

function Data44() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[190.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container57 />
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

function Container58() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] px-[60.44px] relative w-full">
        <Svg37 />
      </div>
    </div>
  );
}

function Data45() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container58 />
    </div>
  );
}

function Svg38() {
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
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[60.43px] pr-[60.45px] relative w-full">
        <Svg38 />
      </div>
    </div>
  );
}

function Data46() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container59 />
    </div>
  );
}

function Svg39() {
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

function Container60() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[65.24px] pr-[65.25px] relative w-full">
        <Svg39 />
      </div>
    </div>
  );
}

function Data47() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[209.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container60 />
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

function Container61() {
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
    <div className="content-stretch flex flex-col items-start pb-[32.46px] pt-[32.43px] px-[20px] relative shrink-0 w-[268.52px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container61 />
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[32px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[34.88px] mb-0">1</p>
        <p className="leading-[34.88px]">Time</p>
      </div>
    </div>
  );
}

function Data49() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pt-[14.44px] px-[20px] relative shrink-0 w-[135.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container62 />
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[32px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[34.88px] mb-0">1 per</p>
        <p className="leading-[34.88px]">month</p>
      </div>
    </div>
  );
}

function Data50() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pt-[14.44px] px-[20px] relative shrink-0 w-[189.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container63 />
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[32px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[34.88px] mb-0">2 per</p>
        <p className="leading-[34.88px]">month</p>
      </div>
    </div>
  );
}

function Data51() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pt-[14.44px] px-[20px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container64 />
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[32px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[34.88px] mb-0">3 per</p>
        <p className="leading-[34.88px]">month</p>
      </div>
    </div>
  );
}

function Data52() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pt-[14.44px] px-[20px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container65 />
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[32px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[34.88px] mb-0">4 per</p>
        <p className="leading-[34.88px]">month</p>
      </div>
    </div>
  );
}

function Data53() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pt-[14.44px] px-[20px] relative shrink-0 w-[208.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container66 />
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

function Container67() {
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
      <Container67 />
    </div>
  );
}

function Svg40() {
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
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[28.68px] pr-[28.69px] relative w-full">
        <Svg40 />
      </div>
    </div>
  );
}

function Data55() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[136.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container68 />
    </div>
  );
}

function Svg41() {
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
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[55.63px] pr-[55.64px] relative w-full">
        <Svg41 />
      </div>
    </div>
  );
}

function Data56() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[190.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container69 />
    </div>
  );
}

function Svg42() {
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
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] px-[60.44px] relative w-full">
        <Svg42 />
      </div>
    </div>
  );
}

function Data57() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container70 />
    </div>
  );
}

function Svg43() {
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
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[60.43px] pr-[60.45px] relative w-full">
        <Svg43 />
      </div>
    </div>
  );
}

function Data58() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container71 />
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

function Container72() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[65.24px] pr-[65.25px] relative w-full">
        <Svg44 />
      </div>
    </div>
  );
}

function Data59() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[209.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container72 />
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

function Container73() {
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
      <Container73 />
    </div>
  );
}

function Svg45() {
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
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[28.68px] pr-[28.69px] relative w-full">
        <Svg45 />
      </div>
    </div>
  );
}

function Data61() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[135.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container74 />
    </div>
  );
}

function Svg46() {
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
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[55.63px] pr-[55.64px] relative w-full">
        <Svg46 />
      </div>
    </div>
  );
}

function Data62() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[189.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container75 />
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

function Container76() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] px-[60.44px] relative w-full">
        <Svg47 />
      </div>
    </div>
  );
}

function Data63() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container76 />
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

function Container77() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[60.43px] pr-[60.45px] relative w-full">
        <Svg48 />
      </div>
    </div>
  );
}

function Data64() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container77 />
    </div>
  );
}

function Svg49() {
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

function Container78() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[65.24px] pr-[65.25px] relative w-full">
        <Svg49 />
      </div>
    </div>
  );
}

function Data65() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[208.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container78 />
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

function Container79() {
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
      <Container79 />
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

function Container80() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[28.68px] pr-[28.69px] relative w-full">
        <Svg50 />
      </div>
    </div>
  );
}

function Data67() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[136.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container80 />
    </div>
  );
}

function Svg51() {
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

function Container81() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[55.63px] pr-[55.64px] relative w-full">
        <Svg51 />
      </div>
    </div>
  );
}

function Data68() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[190.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container81 />
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

function Container82() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] px-[60.44px] relative w-full">
        <Svg52 />
      </div>
    </div>
  );
}

function Data69() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container82 />
    </div>
  );
}

function Svg53() {
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

function Container83() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[60.43px] pr-[60.45px] relative w-full">
        <Svg53 />
      </div>
    </div>
  );
}

function Data70() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container83 />
    </div>
  );
}

function Svg54() {
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

function Container84() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[65.24px] pr-[65.25px] relative w-full">
        <Svg54 />
      </div>
    </div>
  );
}

function Data71() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[209.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container84 />
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

function Container85() {
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
    <div className="content-stretch flex flex-col items-start px-[20px] py-[39.64px] relative shrink-0 w-[268.52px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container85 />
    </div>
  );
}

function Svg55() {
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
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[28.68px] pr-[28.69px] relative w-full">
        <Svg55 />
      </div>
    </div>
  );
}

function Data73() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[34.64px] relative shrink-0 w-[135.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container86 />
    </div>
  );
}

function Container88() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[32px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[34.88px]">1 time</p>
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Container88 />
    </div>
  );
}

function Data74() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[46.84px] pt-[32.44px] px-[20px] relative shrink-0 w-[189.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container87 />
    </div>
  );
}

function Container90() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[32px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[34.88px] mb-0">1 per</p>
        <p className="leading-[34.88px]">month</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Container90 />
    </div>
  );
}

function Data75() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[29.39px] pt-[14.44px] px-[20px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container89 />
    </div>
  );
}

function Container92() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[32px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[34.88px] mb-0">1 per</p>
        <p className="leading-[34.88px]">month</p>
      </div>
    </div>
  );
}

function Container91() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Container92 />
    </div>
  );
}

function Data76() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[29.39px] pt-[14.44px] px-[20px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container91 />
    </div>
  );
}

function Container94() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[32px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[34.88px] mb-0">3 per</p>
        <p className="leading-[34.88px]">month</p>
      </div>
    </div>
  );
}

function Container93() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Container94 />
    </div>
  );
}

function Data77() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[29.39px] pt-[14.44px] px-[20px] relative shrink-0 w-[208.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container93 />
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

function Container95() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Nunito_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[24px] text-black w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
          <p className="leading-[34.88px] mb-0">Interest on free</p>
          <p className="leading-[34.88px]">capital</p>
        </div>
      </div>
    </div>
  );
}

function Data78() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[269.52px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container95 />
    </div>
  );
}

function Svg56() {
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

function Container96() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[28.68px] pr-[28.69px] relative w-full">
        <Svg56 />
      </div>
    </div>
  );
}

function Data79() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[27.46px] pl-[20px] pr-[21px] pt-[28.43px] relative shrink-0 w-[136.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container96 />
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

function Container97() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[55.63px] pr-[55.64px] relative w-full">
        <Svg57 />
      </div>
    </div>
  );
}

function Data80() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[27.46px] pl-[20px] pr-[21px] pt-[28.43px] relative shrink-0 w-[190.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container97 />
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

function Container98() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] px-[60.44px] relative w-full">
        <Svg58 />
      </div>
    </div>
  );
}

function Data81() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[27.46px] pl-[20px] pr-[21px] pt-[28.43px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container98 />
    </div>
  );
}

function Container100() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[32px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[34.88px]">3%</p>
      </div>
    </div>
  );
}

function Container99() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Container100 />
      </div>
    </div>
  );
}

function Data82() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[39.65px] pl-[20px] pr-[21px] pt-[26.24px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container99 />
    </div>
  );
}

function Container102() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[32px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[34.88px]">5%</p>
      </div>
    </div>
  );
}

function Container101() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Container102 />
      </div>
    </div>
  );
}

function Data83() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[39.65px] pl-[20px] pr-[21px] pt-[26.24px] relative shrink-0 w-[209.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container101 />
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

function Container103() {
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
      <Container103 />
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

function Container104() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[28.68px] pr-[28.69px] relative w-full">
        <Svg59 />
      </div>
    </div>
  );
}

function Data85() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[135.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container104 />
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

function Container105() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[55.63px] pr-[55.64px] relative w-full">
        <Svg60 />
      </div>
    </div>
  );
}

function Data86() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[189.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container105 />
    </div>
  );
}

function Svg61() {
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

function Container106() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] px-[60.44px] relative w-full">
        <Svg61 />
      </div>
    </div>
  );
}

function Data87() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container106 />
    </div>
  );
}

function Svg62() {
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

function Container107() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[60.43px] pr-[60.45px] relative w-full">
        <Svg62 />
      </div>
    </div>
  );
}

function Data88() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[198.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container107 />
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

function Container108() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[6.88px] pl-[65.24px] pr-[65.25px] relative w-full">
        <Svg63 />
      </div>
    </div>
  );
}

function Data89() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[15px] relative shrink-0 w-[208.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-[-1px_-1px_0_0] pointer-events-none" />
      <Container108 />
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

function Container109() {
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
      <Container109 />
    </div>
  );
}

function Svg64() {
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

function Container110() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[28.68px] pr-[28.69px] relative w-full">
        <Svg64 />
      </div>
    </div>
  );
}

function Data91() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[136.37px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container110 />
    </div>
  );
}

function Svg65() {
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

function Container111() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[55.63px] pr-[55.64px] relative w-full">
        <Svg65 />
      </div>
    </div>
  );
}

function Data92() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[190.27px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container111 />
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

function Container112() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] px-[60.44px] relative w-full">
        <Svg66 />
      </div>
    </div>
  );
}

function Data93() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container112 />
    </div>
  );
}

function Svg67() {
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

function Container113() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[60.43px] pr-[60.45px] relative w-full">
        <Svg67 />
      </div>
    </div>
  );
}

function Data94() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative shrink-0 w-[199.88px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none" />
      <Container113 />
    </div>
  );
}

function Svg68() {
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

function Container114() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6.88px] pl-[65.24px] pr-[65.25px] relative w-full">
        <Svg68 />
      </div>
    </div>
  );
}

function Data95() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[15px] pl-[20px] pr-[21px] pt-[16px] relative rounded-br-[20px] shrink-0 w-[209.49px]" data-name="Data">
      <div aria-hidden="true" className="absolute border-[rgba(166,166,166,0.4)] border-r border-solid border-t inset-0 pointer-events-none rounded-br-[20px]" />
      <Container114 />
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
    <div className="content-stretch flex flex-col items-start mb-[-0.01px] relative shrink-0 w-full" data-name="Body">
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
    <div className="content-stretch flex flex-col items-start overflow-auto pb-[0.01px] relative shrink-0 w-full" data-name="Table">
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

function Container118() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#1446b7] text-[48px] tracking-[-0.96px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[52.8px]">VIP</p>
      </div>
    </div>
  );
}

function Container119() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[28px] text-black w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[30.52px] mb-0">Best trading conditions. Lowest swaps</p>
        <p className="leading-[30.52px] mb-0">and spreads. Increased income from</p>
        <p className="leading-[30.52px] mb-0">swaps, cashback and interest on free</p>
        <p className="leading-[30.52px] mb-0">capital. Access to exclusive trading</p>
        <p className="leading-[30.52px] mb-0">strategies and development of</p>
        <p className="leading-[30.52px] mb-0">customized, diversified portfolios.</p>
        <p className="leading-[30.52px]">Contact your account manager.</p>
      </div>
    </div>
  );
}

function Container117() {
  return (
    <div className="content-stretch flex flex-col gap-[9.99px] items-start relative shrink-0 w-full" data-name="Container">
      <Container118 />
      <Container119 />
    </div>
  );
}

function OverlayShadow() {
  return (
    <div className="bg-[rgba(242,245,251,0.3)] flex-[1_0_0] min-h-px min-w-px relative rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-full" data-name="Overlay+Shadow">
      <div className="content-stretch flex flex-col items-start px-[39px] py-[32px] relative size-full">
        <Container117 />
      </div>
    </div>
  );
}

function Container116() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative self-stretch" data-name="Container">
      <OverlayShadow />
    </div>
  );
}

function Container122() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#1446b7] text-[48px] tracking-[-0.96px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[52.8px]">ELITE</p>
      </div>
    </div>
  );
}

function Container123() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[28px] text-black w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[30.52px] mb-0">For exclusive clients only. To determine</p>
        <p className="leading-[30.52px] mb-0">whether you are eligible to apply for an</p>
        <p className="leading-[30.52px] mb-0">Elite Account, please contact your</p>
        <p className="leading-[30.52px]">Account Manager.</p>
      </div>
    </div>
  );
}

function Container121() {
  return (
    <div className="content-stretch flex flex-col gap-[9.275px] items-start relative shrink-0 w-full" data-name="Container">
      <Container122 />
      <Container123 />
    </div>
  );
}

function OverlayShadow1() {
  return (
    <div className="bg-[rgba(242,245,251,0.3)] flex-[1_0_0] min-h-px min-w-px relative rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-full" data-name="Overlay+Shadow">
      <div className="content-stretch flex flex-col items-start px-[39px] py-[32px] relative size-full">
        <Container121 />
      </div>
    </div>
  );
}

function Container120() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative self-stretch" data-name="Container">
      <OverlayShadow1 />
    </div>
  );
}

function Container115() {
  return (
    <div className="content-stretch flex gap-[30px] h-[340.46px] items-start relative shrink-0 w-full" data-name="Container">
      <Container116 />
      <Container120 />
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[10px] relative shrink-0 w-full" data-name="Margin">
      <Container115 />
    </div>
  );
}

export default function Plan() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start pb-[43.05px] pt-[42.44px] px-[114.797px] relative size-full" data-name="plan" style={{ backgroundImage: "linear-gradient(15.4424deg, rgb(99, 142, 223) 20%, rgb(255, 255, 255) 60%)" }}>
      <Container />
      <Heading />
      <OverlayShadowOverlayBlur />
      <Margin />
    </div>
  );
}