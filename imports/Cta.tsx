import svgPaths from "./svg-zt713w641b";
import imgCta from "figma:asset/05d8f12ec66e223b9fd4b7b297b0ab442df243f4.png";
import { imgGradient } from "./svg-i0vr9";

function MaskGroup() {
  return (
    <div className="absolute h-[298.8px] left-0 top-0 w-[602.7px]" data-name="Mask Group">
      <div className="absolute bg-gradient-to-r from-white h-[298.8px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[602.7px_298.8px] rounded-[24px] to-[rgba(255,255,255,0)] top-0 w-[602.7px]" data-name="Gradient" style={{ maskImage: `url('${imgGradient}')` }} />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[48px] text-black text-center tracking-[-0.96px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[52.8px] mb-0">Your Market Edge</p>
        <p className="leading-[52.8px]">Awaits – Sign Up Today!</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col h-full items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[22px] text-center text-white tracking-[-0.44px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[43.2px]">Start Trading</p>
      </div>
    </div>
  );
}

function Svg() {
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

function Container3() {
  return (
    <div className="content-stretch flex h-[43.2px] items-center relative shrink-0" data-name="Container">
      <Svg />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[12px] items-end justify-center relative shrink-0" data-name="Container">
      <div className="flex flex-row items-end self-stretch">
        <Container2 />
      </div>
      <Container3 />
    </div>
  );
}

function Link() {
  return (
    <div className="bg-black content-stretch flex items-start pb-[10px] pt-[9.25px] px-[10px] relative rounded-[12px] shrink-0" data-name="Link">
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

function OverlayShadowOverlayBlur() {
  return (
    <div className="backdrop-blur-[8px] bg-[rgba(242,245,251,0.3)] relative rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="Overlay+Shadow+OverlayBlur">
      <div className="content-stretch flex flex-col gap-[20px] items-start pb-[55.01px] pt-[54.395px] px-[30px] relative w-full">
        <MaskGroup />
        <Heading />
        <Container />
      </div>
    </div>
  );
}

export default function Cta() {
  return (
    <div className="content-stretch flex flex-col items-start px-[301.352px] py-[120.539px] relative rounded-[25px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] size-full" data-name="CTA">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[25px]">
        <img alt="" className="absolute h-full left-[-7.86%] max-w-none top-0 w-[115.72%]" src={imgCta} />
      </div>
      <OverlayShadowOverlayBlur />
    </div>
  );
}