import svgPaths from "./svg-xb7jbac4vq";
import imgMainCapPng from "figma:asset/4c74d2b0ea7bc2950efe5609054955d66d7af0c6.png";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[60px] text-black tracking-[-1.2px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[66px]">Gateway to Smart Trading</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[20px] text-black tracking-[-0.4px] w-full" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[27px] mb-0">At LPL-Holdings, we empower traders and investors with the tools, insights, and resources</p>
        <p className="leading-[27px] mb-0">they need to navigate today’s dynamic markets. Whether you’re just starting your financial</p>
        <p className="leading-[27px] mb-0">journey or refining a seasoned strategy, our platform provides secure, intuitive solutions</p>
        <p className="leading-[27px]">designed to help you make confident, informed decisions.</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start mr-[-0.01px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nunito_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[22px] text-white tracking-[-0.44px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[29.7px]">Start Trading</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px overflow-clip relative w-[27px]" data-name="Frame">
      <div className="absolute inset-[28.49%_6.25%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.625 11.6128">
          <path d={svgPaths.p1f957100} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0 size-[27px]" data-name="SVG">
      <Frame />
    </div>
  );
}

function SvgMargin() {
  return (
    <div className="content-stretch flex flex-col h-[27px] items-start mr-[-0.01px] pl-[12px] relative shrink-0 w-[39px]" data-name="SVG:margin">
      <Svg />
    </div>
  );
}

function Link() {
  return (
    <div className="bg-black content-stretch flex items-center pl-[5px] pr-[5.01px] py-[5px] relative rounded-[15px] shrink-0" data-name="Link">
      <Container6 />
      <SvgMargin />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Container4 />
      <Container5 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[804px]" data-name="Container">
      <Container3 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[818.56px]" data-name="Container">
      <Container2 />
    </div>
  );
}

function MainCapPng() {
  return (
    <div className="h-[513.52px] max-w-[539.0499877929688px] mix-blend-luminosity relative shrink-0 w-[539.05px]" data-name="MainCap.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgMainCapPng} />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-center relative self-stretch shrink-0 w-[539.05px]" data-name="Container">
      <MainCapPng />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[20px] h-[513.52px] items-start relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Container7 />
    </div>
  );
}

export default function HerorSection() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center px-[28.695px] py-[106.24px] relative size-full" data-name="heror section" style={{ backgroundImage: "linear-gradient(20deg, rgb(99, 142, 223) 25%, rgb(234, 238, 255) 60%)" }}>
      <Container />
    </div>
  );
}