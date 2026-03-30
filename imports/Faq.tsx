import svgPaths from "./svg-9d7kligfza";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[286.35px]" data-name="Heading 1">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[128px] text-black tracking-[-3.84px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[121.6px]">FAQ</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1f2124] text-[24px] tracking-[0.18px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[36px]">Why should I choose LPL-Holdings?</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex h-[36px] items-start relative shrink-0" data-name="Container">
      <Container1 />
    </div>
  );
}

function Svg() {
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

function Background() {
  return (
    <div className="bg-white content-stretch flex items-start p-[10px] relative rounded-[17px] shrink-0 size-[34px]" data-name="Background">
      <Svg />
    </div>
  );
}

function SlotSummary() {
  return (
    <div className="mb-[-0.605px] relative shrink-0 w-full" data-name="Slot → Summary">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[42px] py-[29px] relative w-full">
          <Container />
          <Background />
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[18px] text-black tracking-[-0.36px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[24.3px] mb-0">We combine user-friendly tools, competitive pricing, and reliable execution to give traders of all levels a</p>
        <p className="leading-[24.3px]">smooth and efficient experience.</p>
      </div>
    </div>
  );
}

function SlotRegion() {
  return (
    <div className="mb-[-0.605px] relative shrink-0 w-full" data-name="Slot → Region">
      <div className="content-stretch flex flex-col items-start pb-[43.4px] px-[42px] relative w-full">
        <Container2 />
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

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[24px] text-black tracking-[0.18px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[36px]">What assets can I trade?</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex h-[36px] items-start relative shrink-0" data-name="Container">
      <Container4 />
    </div>
  );
}

function Svg1() {
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

function Background1() {
  return (
    <div className="bg-black content-stretch flex items-start p-[10px] relative rounded-[17px] shrink-0 size-[34px]" data-name="Background">
      <Svg1 />
    </div>
  );
}

function SlotSummary1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Slot → Summary">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[42px] py-[29px] relative w-full">
          <Container3 />
          <Background1 />
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

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[24px] text-black tracking-[0.18px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[36px]">How do I contact customer support?</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex h-[36px] items-start relative shrink-0" data-name="Container">
      <Container6 />
    </div>
  );
}

function Svg2() {
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

function Background2() {
  return (
    <div className="bg-black content-stretch flex items-start p-[10px] relative rounded-[17px] shrink-0 size-[34px]" data-name="Background">
      <Svg2 />
    </div>
  );
}

function SlotSummary2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Slot → Summary">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[42px] py-[29px] relative w-full">
          <Container5 />
          <Background2 />
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

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[24px] text-black tracking-[0.18px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[36px]">Are there educational resources available?</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex h-[36px] items-start relative shrink-0" data-name="Container">
      <Container8 />
    </div>
  );
}

function Svg3() {
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

function Background3() {
  return (
    <div className="bg-black content-stretch flex items-start p-[10px] relative rounded-[17px] shrink-0 size-[34px]" data-name="Background">
      <Svg3 />
    </div>
  );
}

function SlotSummary3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Slot → Summary">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[42px] py-[29px] relative w-full">
          <Container7 />
          <Background3 />
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

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[24px] text-black tracking-[0.18px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[36px]">Can I access my account from multiple devices?</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex h-[36px] items-start relative shrink-0" data-name="Container">
      <Container10 />
    </div>
  );
}

function Svg4() {
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

function Background4() {
  return (
    <div className="bg-black content-stretch flex items-start p-[10px] relative rounded-[17px] shrink-0 size-[34px]" data-name="Background">
      <Svg4 />
    </div>
  );
}

function SlotSummary4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Slot → Summary">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[42px] py-[29px] relative w-full">
          <Container9 />
          <Background4 />
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

export default function Faq() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative size-full" data-name="faq">
      <Heading />
      <AccordionOpenLinksWithEnterOrSpaceCloseWithEscapeAndNavigateWithArrowKeys />
    </div>
  );
}