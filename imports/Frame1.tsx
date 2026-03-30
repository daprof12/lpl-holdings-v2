import svgPaths from "./svg-zpbb0msyel";
import imgBeautifulCryptocurrwncyConceptPng from "figma:asset/a84549908c46fbdc3944c6294fbee1781852bedf.png";
import imgBlurStarPng from "figma:asset/e3d00909724e8aea86d730520ae241084a79d6a6.png";

function BeautifulCryptocurrwncyConceptPng() {
  return (
    <div className="h-[543px] max-w-[628.8800048828125px] relative shrink-0 w-[537px]" data-name="beautiful-cryptocurrwncy-concept.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgBeautifulCryptocurrwncyConceptPng} />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-end justify-center relative shrink-0 w-full" data-name="Container">
      <BeautifulCryptocurrwncyConceptPng />
    </div>
  );
}

function BlurStarPng() {
  return (
    <div className="absolute aspect-[222.39999389648438/222.39999389648438] left-0 right-[64.64%] top-0" data-name="BlurStar.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgBlurStarPng} />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col h-[582.78px] items-start relative shrink-0 w-[628.88px]" data-name="Container">
      <Container1 />
      <BlurStarPng />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[36px] text-black tracking-[-0.72px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[48.6px]">Clients at the Core</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.8px] pb-[15px] relative shrink-0 w-full" data-name="Container">
      <Container4 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.8px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[28px] text-black tracking-[-0.56px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[37.8px] mb-0">Your success is our priority. Every</p>
        <p className="leading-[37.8px] mb-0">feature, service, and innovation we offer</p>
        <p className="leading-[37.8px] mb-0">is built around the needs and goals of</p>
        <p className="leading-[37.8px]">our users.</p>
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

function Link() {
  return (
    <div className="bg-black content-stretch flex items-center p-[10px] relative rounded-[100px] shrink-0" data-name="Link">
      <Svg />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-end mb-[-0.8px] pt-[0.8px] relative shrink-0 w-full" data-name="Container">
      <Link />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#f2f5fb] relative rounded-[30px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col items-start pb-[15.8px] pl-[43px] pr-[15px] pt-[27px] relative w-full">
        <Container3 />
        <Container5 />
        <Container6 />
      </div>
    </div>
  );
}

function OverlayShadow() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start justify-center relative rounded-[30px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="Overlay+Shadow">
      <Background />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[36px] text-black tracking-[-0.72px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[48.6px]">Driven by Technology</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.7px] pb-[15px] relative shrink-0 w-full" data-name="Container">
      <Container8 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.7px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[28px] text-black tracking-[-0.56px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[37.8px] mb-0">From advanced algorithms to real-time</p>
        <p className="leading-[37.8px] mb-0">analytics, we harness cutting-edge tools</p>
        <p className="leading-[37.8px]">to give you an edge in every trade.</p>
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

function Link1() {
  return (
    <div className="bg-black content-stretch flex items-center p-[10px] relative rounded-[100px] shrink-0" data-name="Link">
      <Svg1 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-end mb-[-0.7px] pt-[0.7px] relative shrink-0 w-full" data-name="Container">
      <Link1 />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#f2f5fb] relative rounded-[30px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col items-start pb-[15.7px] pl-[43px] pr-[15px] pt-[27px] relative w-full">
        <Container7 />
        <Container9 />
        <Container10 />
      </div>
    </div>
  );
}

function OverlayShadow1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start justify-center relative rounded-[30px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="Overlay+Shadow">
      <Background1 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[25px] items-start relative shrink-0 w-[546.52px]" data-name="Container">
      <OverlayShadow />
      <OverlayShadow1 />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex items-start justify-between relative size-full">
      <Container />
      <Container2 />
    </div>
  );
}