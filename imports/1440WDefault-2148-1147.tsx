import svgPaths from "./svg-mzf4mzxwei";
import imgSection from "figma:asset/09cb59786dd23d41cbbbdb76856ab863053b8abd.png";
import imgBulb from "figma:asset/116c6abd71522947b490629b36032883efe958d7.png";
import imgScamsImage from "figma:asset/27a06ccfd53b47ffe7f651c5603ded4eb7ea3365.png";
import imgScamsImage1 from "figma:asset/81a0002a40a8e16517b22c20f49f1199e651d48f.png";
import imgScamsImage2 from "figma:asset/52ecdb73f493cb9131e6ce522e0c696bf348ecef.png";
import imgScamsImage3 from "figma:asset/7afbaa344f90c7e3e5f2a2830d711551b540db44.png";
import imgScamsImage4 from "figma:asset/3bb4f017622475437167c852b93a053f758c2ee2.png";
import imgScamsImage5 from "figma:asset/d4cd6417612e43a3d0cfbed0579f0a0b8aab6bf9.png";
import imgScamsImage6 from "figma:asset/2d0e3a58c3dc6c09b47c1cb100a8b48b7ee39a27.png";
import imgScamsImage7 from "figma:asset/ee2b26872d39100c8f5608477855f6cc33bf3ee3.png";
import imgReportScam from "figma:asset/e84880534c7f458544305f83309ab5006cd3fd5d.png";
import imgSection1 from "figma:asset/49712abe12194c268a5c9981e2bf290c369efc5f.png";

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px]">Securing Your Information for Safer Trading</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16.9px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[25.31px]">How to spot common trading scams and ways to keep your information safe?</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="bg-[#34e834] content-stretch flex items-start justify-center px-[39px] py-[15.563px] relative rounded-[5.63px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[5.63px]" />
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[20.6px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24.38px]">Start Trading</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[14.3px] items-center px-[14.063px] relative size-full">
          <Heading1 />
          <Container3 />
          <Link />
        </div>
      </div>
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
    <div className="absolute bg-size-[1774.5031356811523px_478.1300115585327px,auto_auto] bg-top-left content-stretch flex h-[478.13px] items-center justify-center left-0 pt-[105.938px] right-0 top-0" data-name="Section" style={{ backgroundImage: `url('${imgSection}'), linear-gradient(90deg, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 100%)` }}>
      <Container />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[30px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[37.5px] whitespace-pre-wrap">Common signs of cybersecurity threats and trading scams</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[25.31px] relative shrink-0 text-[16.9px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Scams are intricately designed to deceive, and each day, scammers devise new methods to gain access to your personal information for their</p>
        <p>financial gain. Below are the most common ways that scammers may deceive you:</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col gap-[14.405px] items-start px-[14.063px] relative size-full">
        <Heading2 />
        <Container6 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-wrap items-start justify-center min-h-[140.6300048828125px] relative shrink-0 w-[1124.06px]" data-name="Container">
      <Container5 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Heading 3">
      <div className="content-stretch flex flex-col items-start px-[11.25px] relative size-full">
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[30px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[36px] whitespace-pre-wrap">Cybersecurity threats</p>
        </div>
      </div>
    </div>
  );
}

function Heading3Margin() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[0_0_240px_0] items-start justify-center pb-[15px]" data-name="Heading 3:margin">
      <Heading3 />
    </div>
  );
}

function Threats1Svg() {
  return (
    <div className="h-[45px] relative shrink-0 w-[40.61px]" data-name="threats_1.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40.6098 45">
        <g clipPath="url(#clip0_2148_1170)" id="threats_1.svg">
          <path d={svgPaths.p37afc9f2} fill="var(--fill-0, #34E834)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2148_1170">
            <rect fill="white" height="45" width="40.6098" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Threats1SvgFill() {
  return (
    <div className="content-stretch flex flex-col h-[45px] items-center justify-center overflow-clip relative shrink-0 w-[40.61px]" data-name="threats_1.svg fill">
      <Threats1Svg />
    </div>
  );
}

function ThreatsImage() {
  return (
    <div className="aspect-[40.61000061035156/45] content-stretch flex items-start overflow-clip relative shrink-0" data-name="threats image">
      <Threats1SvgFill />
    </div>
  );
}

function Container10() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-0 max-w-[505.7799987792969px] px-[14.063px] right-[83.33%] top-[calc(50%-58.13px)]" data-name="Container">
      <ThreatsImage />
    </div>
  );
}

function Heading4() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[16.67%] max-w-[505.7799987792969px] px-[14.063px] right-0 top-[calc(50%-58.13px)]" data-name="Heading 4">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[27px]">Phishing Emails</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-0 px-[14.063px] right-0 top-[calc(50%+29.6px)]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[25.31px] relative shrink-0 text-[#000806] text-[16.9px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Scammers send deceptive emails that appear to be from</p>
        <p className="mb-0">reputable CFD brokers such XAI Technology or financial</p>
        <p className="mb-0">institutions, urging recipients to click on malicious links or</p>
        <p>provide sensitive financial information.</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[161.25px] relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Heading4 />
      <Container11 />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#f6f6f6] h-[225px] relative rounded-[9.38px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col items-start pl-[14.06px] pr-[14.07px] py-[23.438px] relative size-full">
        <Container9 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="flex-[1_0_0] max-w-[1124.06005859375px] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] px-[14.063px] relative size-full">
        <Background />
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[51px_562.03px_0_0] items-start justify-center max-w-[1124.06005859375px] pb-[15px]" data-name="Margin">
      <Container8 />
    </div>
  );
}

function Threats2Svg() {
  return (
    <div className="h-[45px] relative shrink-0 w-[52.5px]" data-name="threats_2.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52.5 45">
        <g clipPath="url(#clip0_2148_1151)" id="threats_2.svg">
          <path d={svgPaths.p27fcb300} fill="var(--fill-0, #34E834)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2148_1151">
            <rect fill="white" height="45" width="52.5" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Threats2SvgFill() {
  return (
    <div className="content-stretch flex flex-col h-[45px] items-center justify-center overflow-clip relative shrink-0 w-[52.5px]" data-name="threats_2.svg fill">
      <Threats2Svg />
    </div>
  );
}

function ThreatsImage1() {
  return (
    <div className="aspect-[52.5/45] content-stretch flex items-start overflow-clip relative shrink-0" data-name="threats image">
      <Threats2SvgFill />
    </div>
  );
}

function Container14() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-0 max-w-[505.7799987792969px] px-[14.063px] right-[83.33%] top-[calc(50%-45.47px)]" data-name="Container">
      <ThreatsImage1 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[16.67%] max-w-[505.7799987792969px] px-[14.063px] right-0 top-[calc(50%-45.47px)]" data-name="Heading 4">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[27px]">Fake Websites</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-0 px-[14.063px] right-0 top-[calc(50%+30.03px)]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[25.31px] relative shrink-0 text-[#000806] text-[16.9px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">They create fraudulent CFD trading platforms that closely</p>
        <p className="mb-0">mimic legitimate ones, tricking traders into depositing funds</p>
        <p>or sharing personal and financial information.</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[135.94px] relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Heading5 />
      <Container15 />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#f6f6f6] h-[225px] relative rounded-[9.38px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col items-start pl-[14.07px] pr-[14.06px] py-[23.438px] relative size-full">
        <Container13 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="flex-[1_0_0] max-w-[1124.06005859375px] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] px-[14.063px] relative size-full">
        <Background1 />
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[51px_0_0_562.03px] items-start justify-center max-w-[1124.06005859375px] pb-[15px]" data-name="Margin">
      <Container12 />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[291px] relative shrink-0 w-[1124.06px]" data-name="Container">
      <Heading3Margin />
      <Margin />
      <Margin1 />
    </div>
  );
}

function Bulb() {
  return (
    <div className="relative shrink-0 size-[45px]" data-name="Bulb">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgBulb} />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Bulb />
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#34e834] text-[16.9px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[25.31px]">link</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[#000806] text-[16.9px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[25.31px]">{`To find out how to keep your account secure, check out this `}</p>
      </div>
      <Link1 />
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[#000806] text-[16.9px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[25.31px]">{` for helpful tips and information.`}</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Container18 />
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#34e834] relative rounded-[9.38px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col items-start pb-[15.927px] pt-[23.438px] px-[28.125px] relative w-full">
        <Container16 />
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Heading 3">
      <div className="content-stretch flex flex-col items-start px-[11.25px] relative size-full">
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[30px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[36px] whitespace-pre-wrap">Trading scams</p>
        </div>
      </div>
    </div>
  );
}

function Heading3Margin1() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[0_0_960px_0] items-start justify-center pb-[15px]" data-name="Heading 3:margin">
      <Heading6 />
    </div>
  );
}

function ScamsImage() {
  return (
    <div className="h-[45px] relative shrink-0 w-[43.88px]" data-name="scams image">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[0.01%] max-w-none top-0 w-[99.99%]" src={imgScamsImage} />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-0 max-w-[505.7799987792969px] px-[14.063px] right-[83.33%] top-[calc(50%-45.47px)]" data-name="Container">
      <ScamsImage />
    </div>
  );
}

function Heading7() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[16.67%] max-w-[505.7799987792969px] pr-[14.063px] right-0 top-[calc(50%-45.47px)]" data-name="Heading 4">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[27px]">False Promises</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-0 px-[14.063px] right-0 top-[calc(50%+30.03px)]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[25.31px] relative shrink-0 text-[#000806] text-[16.9px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Scammers may promise unrealistic returns on CFD</p>
        <p className="mb-0">investments, luring traders with the prospect of high profits</p>
        <p>and minimal risk.</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[135.94px] relative shrink-0 w-full" data-name="Container">
      <Container22 />
      <Heading7 />
      <Container23 />
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#f6f6f6] h-[225px] relative rounded-[9.38px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col items-start pl-[14.06px] pr-[14.07px] py-[23.438px] relative size-full">
        <Container21 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="flex-[1_0_0] max-w-[1124.06005859375px] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] px-[14.063px] relative size-full">
        <Background3 />
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[51px_562.03px_720px_0] items-start justify-center max-w-[1124.06005859375px] pb-[15px]" data-name="Margin">
      <Container20 />
    </div>
  );
}

function ScamsImage1() {
  return (
    <div className="h-[45px] relative shrink-0 w-[37.84px]" data-name="scams image">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgScamsImage1} />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-0 max-w-[505.7799987792969px] px-[14.063px] right-[83.33%] top-[calc(50%-45.47px)]" data-name="Container">
      <ScamsImage1 />
    </div>
  );
}

function Heading8() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[16.67%] max-w-[505.7799987792969px] pr-[14.063px] right-0 top-[calc(50%-45.47px)]" data-name="Heading 4">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[27px]">Impersonation</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-0 px-[14.063px] right-0 top-[calc(50%+30.03px)]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[25.31px] relative shrink-0 text-[#000806] text-[16.9px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Scammers may impersonate XAI Technology or other well-</p>
        <p className="mb-0">known CFD providers, using similar logos and branding to</p>
        <p>deceive potential traders.</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[135.94px] relative shrink-0 w-full" data-name="Container">
      <Container26 />
      <Heading8 />
      <Container27 />
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#f6f6f6] h-[225px] relative rounded-[9.38px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col items-start pl-[14.07px] pr-[14.06px] py-[23.438px] relative size-full">
        <Container25 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="flex-[1_0_0] max-w-[1124.06005859375px] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] px-[14.063px] relative size-full">
        <Background4 />
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[51px_0_720px_562.03px] items-start justify-center max-w-[1124.06005859375px] pb-[15px]" data-name="Margin">
      <Container24 />
    </div>
  );
}

function ScamsImage2() {
  return (
    <div className="h-[45px] relative shrink-0 w-[55.13px]" data-name="scams image">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-0 max-w-none top-0 w-[99.99%]" src={imgScamsImage2} />
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-0 max-w-[505.7799987792969px] px-[14.063px] right-[83.33%] top-[calc(50%-45.47px)]" data-name="Container">
      <ScamsImage2 />
    </div>
  );
}

function Heading9() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[16.67%] max-w-[505.7799987792969px] pr-[14.063px] right-0 top-[calc(50%-45.47px)]" data-name="Heading 4">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[27px]">Unregistered Brokers</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-0 px-[14.063px] right-0 top-[calc(50%+30.03px)]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[25.31px] relative shrink-0 text-[#000806] text-[16.9px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Some scammers pose as unregistered brokers, operating</p>
        <p className="mb-0">without the necessary licenses or regulatory approvals, and</p>
        <p>attract traders with enticing offers.</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[135.94px] relative shrink-0 w-full" data-name="Container">
      <Container30 />
      <Heading9 />
      <Container31 />
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#f6f6f6] h-[225px] relative rounded-[9.38px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col items-start pl-[14.06px] pr-[14.07px] py-[23.438px] relative size-full">
        <Container29 />
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="flex-[1_0_0] max-w-[1124.06005859375px] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] px-[14.063px] relative size-full">
        <Background5 />
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[291px_562.03px_480px_0] items-start justify-center max-w-[1124.06005859375px] pb-[15px]" data-name="Margin">
      <Container28 />
    </div>
  );
}

function ScamsImage3() {
  return (
    <div className="h-[45px] relative shrink-0 w-[47.93px]" data-name="scams image">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-0 max-w-none top-0 w-[100.01%]" src={imgScamsImage3} />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-0 max-w-[505.7799987792969px] px-[14.063px] right-[83.33%] top-[calc(50%-45.47px)]" data-name="Container">
      <ScamsImage3 />
    </div>
  );
}

function Heading10() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[16.67%] max-w-[505.7799987792969px] pr-[14.063px] right-0 top-[calc(50%-45.47px)]" data-name="Heading 4">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[27px]">Social Media Scams</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-0 px-[14.063px] right-0 top-[calc(50%+30.03px)]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[25.31px] relative shrink-0 text-[#000806] text-[16.9px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">They use social media platforms to promote fake CFD trading</p>
        <p className="mb-0">opportunities, often targeting inexperienced traders with</p>
        <p>promises of quick riches.</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[135.94px] relative shrink-0 w-full" data-name="Container">
      <Container34 />
      <Heading10 />
      <Container35 />
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#f6f6f6] h-[225px] relative rounded-[9.38px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col items-start pl-[14.07px] pr-[14.06px] py-[23.438px] relative size-full">
        <Container33 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="flex-[1_0_0] max-w-[1124.06005859375px] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] px-[14.063px] relative size-full">
        <Background6 />
      </div>
    </div>
  );
}

function Margin5() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[291px_0_480px_562.03px] items-start justify-center max-w-[1124.06005859375px] pb-[15px]" data-name="Margin">
      <Container32 />
    </div>
  );
}

function ScamsImage4() {
  return (
    <div className="h-[45px] relative shrink-0 w-[35px]" data-name="scams image">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgScamsImage4} />
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-0 max-w-[505.7799987792969px] px-[14.063px] right-[83.33%] top-[calc(50%-45.47px)]" data-name="Container">
      <ScamsImage4 />
    </div>
  );
}

function Heading11() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[16.67%] max-w-[505.7799987792969px] pr-[14.063px] right-0 top-[calc(50%-45.47px)]" data-name="Heading 4">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[27px]">Pressure Sales Tactics</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-0 px-[14.063px] right-0 top-[calc(50%+30.03px)]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[25.31px] relative shrink-0 text-[#000806] text-[16.9px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Scammers may employ high-pressure sales tactics,</p>
        <p className="mb-0">encouraging traders to make quick decisions or deposits</p>
        <p>without proper research.</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[135.94px] relative shrink-0 w-full" data-name="Container">
      <Container38 />
      <Heading11 />
      <Container39 />
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#f6f6f6] h-[225px] relative rounded-[9.38px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col items-start pl-[14.06px] pr-[14.07px] py-[23.438px] relative size-full">
        <Container37 />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="flex-[1_0_0] max-w-[1124.06005859375px] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] px-[14.063px] relative size-full">
        <Background7 />
      </div>
    </div>
  );
}

function Margin6() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[531px_562.03px_240px_0] items-start justify-center max-w-[1124.06005859375px] pb-[15px]" data-name="Margin">
      <Container36 />
    </div>
  );
}

function ScamsImage5() {
  return (
    <div className="h-[45px] relative shrink-0 w-[59.31px]" data-name="scams image">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-0.01%] max-w-none top-0 w-[100.01%]" src={imgScamsImage5} />
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-0 max-w-[505.7799987792969px] px-[14.063px] right-[83.33%] top-[calc(50%-45.47px)]" data-name="Container">
      <ScamsImage5 />
    </div>
  );
}

function Heading12() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[16.67%] max-w-[505.7799987792969px] pr-[14.063px] right-0 top-[calc(50%-45.47px)]" data-name="Heading 4">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[27px]">Misleading Information</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-0 px-[14.063px] right-0 top-[calc(50%+30.03px)]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[25.31px] relative shrink-0 text-[#000806] text-[16.9px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">They provide false or misleading information about CFD</p>
        <p className="mb-0">products, making them appear less risky or more lucrative</p>
        <p>than they are.</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="h-[135.94px] relative shrink-0 w-full" data-name="Container">
      <Container42 />
      <Heading12 />
      <Container43 />
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-[#f6f6f6] h-[225px] relative rounded-[9.38px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col items-start pl-[14.07px] pr-[14.06px] py-[23.438px] relative size-full">
        <Container41 />
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="flex-[1_0_0] max-w-[1124.06005859375px] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] px-[14.063px] relative size-full">
        <Background8 />
      </div>
    </div>
  );
}

function Margin7() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[531px_0_240px_562.03px] items-start justify-center max-w-[1124.06005859375px] pb-[15px]" data-name="Margin">
      <Container40 />
    </div>
  );
}

function ScamsImage6() {
  return (
    <div className="h-[45px] relative shrink-0 w-[51.42px]" data-name="scams image">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-0.01%] max-w-none top-0 w-[100.02%]" src={imgScamsImage6} />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-0 max-w-[505.7799987792969px] px-[14.063px] right-[83.33%] top-[calc(50%-45.47px)]" data-name="Container">
      <ScamsImage6 />
    </div>
  );
}

function Heading13() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[16.67%] max-w-[505.7799987792969px] pr-[14.063px] right-0 top-[calc(50%-45.47px)]" data-name="Heading 4">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[27px]">Inadequate Risk Disclosure</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-0 px-[14.063px] right-0 top-[calc(50%+30.03px)]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[25.31px] relative shrink-0 text-[#000806] text-[16.9px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Some scams involve unregistered or unregulated CFD</p>
        <p className="mb-0">products, making it difficult for traders to seek recourse in</p>
        <p>case of issues.</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="h-[135.94px] relative shrink-0 w-full" data-name="Container">
      <Container46 />
      <Heading13 />
      <Container47 />
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-[#f6f6f6] h-[225px] relative rounded-[9.38px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col items-start pl-[14.06px] pr-[14.07px] py-[23.438px] relative size-full">
        <Container45 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="flex-[1_0_0] max-w-[1124.06005859375px] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] px-[14.063px] relative size-full">
        <Background9 />
      </div>
    </div>
  );
}

function Margin8() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[771px_562.03px_0_0] items-start justify-center max-w-[1124.06005859375px] pb-[15px]" data-name="Margin">
      <Container44 />
    </div>
  );
}

function ScamsImage7() {
  return (
    <div className="h-[45px] relative shrink-0 w-[38.44px]" data-name="scams image">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-0 max-w-none top-0 w-[99.99%]" src={imgScamsImage7} />
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-0 max-w-[505.7799987792969px] px-[14.063px] right-[83.33%] top-[calc(50%-45.47px)]" data-name="Container">
      <ScamsImage7 />
    </div>
  );
}

function Heading14() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[16.67%] max-w-[505.7799987792969px] pr-[14.063px] right-0 top-[calc(50%-45.47px)]" data-name="Heading 4">
      <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[22.5px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[27px]">Investment Clubs</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-0 px-[14.063px] right-0 top-[calc(50%+30.03px)]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[25.31px] relative shrink-0 text-[#000806] text-[16.9px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Scammers promote fraudulent investment clubs or groups,</p>
        <p className="mb-0">asking traders to pool their money into a collective fund,</p>
        <p>which they later abscond with.</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="h-[135.94px] relative shrink-0 w-full" data-name="Container">
      <Container50 />
      <Heading14 />
      <Container51 />
    </div>
  );
}

function Background10() {
  return (
    <div className="bg-[#f6f6f6] h-[225px] relative rounded-[9.38px] shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col items-start pl-[14.07px] pr-[14.06px] py-[23.438px] relative size-full">
        <Container49 />
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="flex-[1_0_0] max-w-[1124.06005859375px] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] px-[14.063px] relative size-full">
        <Background10 />
      </div>
    </div>
  );
}

function Margin9() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[771px_0_0_562.03px] items-start justify-center max-w-[1124.06005859375px] pb-[15px]" data-name="Margin">
      <Container48 />
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[1011px] relative shrink-0 w-[1124.06px]" data-name="Container">
      <Heading3Margin1 />
      <Margin2 />
      <Margin3 />
      <Margin4 />
      <Margin5 />
      <Margin6 />
      <Margin7 />
      <Margin8 />
      <Margin9 />
    </div>
  );
}

function Section1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[22.5px] items-center left-[157.97px] max-w-[1124.06005859375px] px-[14.063px] right-[157.97px] top-[562.5px]" data-name="Section">
      <Container4 />
      <Container7 />
      <Background2 />
      <Container19 />
    </div>
  );
}

function Heading15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[36px] relative shrink-0 text-[30px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">How to protect yourself</p>
        <p className="mb-0">against cybercrime and</p>
        <p>trading scams?</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1124.06005859375px] px-[14.063px] relative self-stretch shrink-0 w-[374.69px]" data-name="Container">
      <Heading15 />
    </div>
  );
}

function MinusSvg() {
  return (
    <div className="h-[3px] relative shrink-0 w-[13px]" data-name="minus.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 3">
        <g clipPath="url(#clip0_2148_1159)" id="minus.svg">
          <path d={svgPaths.p17b3080} fill="var(--fill-0, black)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2148_1159">
            <rect fill="white" height="3" width="13" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function MinusSvgFill() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip px-[5.69px] py-[10.69px] relative shrink-0 size-[24.38px]" data-name="minus.svg fill">
      <MinusSvg />
    </div>
  );
}

function Image() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[24.38px] size-[24.38px]" data-name="Image">
      <MinusSvgFill />
    </div>
  );
}

function Heading4Button() {
  return (
    <div className="bg-[#f6f6f6] mb-[-0.61px] relative rounded-[12px] shrink-0 w-full" data-name="Heading 4 → Button">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[229.42px] items-center px-[15px] py-[18.75px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[18.8px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[22.5px]">Verify Website Authenticity</p>
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

function Container56() {
  return (
    <div className="mb-[-0.61px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[18.75px] px-[15px] relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[21px] relative shrink-0 text-[14.1px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="mb-0">Confirm that the XAI Technology trading platform is legitimate and</p>
          <p className="mb-0">registered. Also, do not forget to check the Business Registration Number and</p>
          <p className="mb-0">License numbers. You will find all of this information on the footer of the IC</p>
          <p>Markets Global website.</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#f6f6f6] content-stretch flex flex-col items-start pb-[1.11px] pt-[2.5px] relative shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-[#d6d6d6] border-b-[0.5px] border-solid border-t-[2.5px] inset-0 pointer-events-none" />
      <Heading4Button />
      <Container56 />
    </div>
  );
}

function MinusSvg1() {
  return (
    <div className="h-[3px] relative shrink-0 w-[13px]" data-name="minus.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 3">
        <g clipPath="url(#clip0_2148_1159)" id="minus.svg">
          <path d={svgPaths.p17b3080} fill="var(--fill-0, black)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2148_1159">
            <rect fill="white" height="3" width="13" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function MinusSvgFill1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip px-[5.69px] py-[10.69px] relative shrink-0 size-[24.38px]" data-name="minus.svg fill">
      <MinusSvg1 />
    </div>
  );
}

function Image1() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[24.38px] size-[24.38px]" data-name="Image">
      <MinusSvgFill1 />
    </div>
  );
}

function Heading4Button1() {
  return (
    <div className="bg-[#f6f6f6] relative rounded-[12px] shrink-0 w-full" data-name="Heading 4 → Button">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[205.26px] items-center px-[15px] py-[18.75px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[18.8px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[22.5px]">Use Strong Passwords and 2FA</p>
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

function Link2() {
  return (
    <div className="absolute content-stretch flex items-start left-[40.06px] top-[20.34px]" data-name="Link">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[#34e834] text-[14.1px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="decoration-solid leading-[21px] underline">Protect your Account</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="h-[60.94px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['DM_Sans:Light',sans-serif] font-light h-[43px] justify-center leading-[21px] left-[15px] text-[14.1px] text-black top-[20.8px] w-[483.445px] whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="mb-0">To learn more about 2FA and protecting your online account, please visit to</p>
          <p>{`the `}</p>
        </div>
        <Link2 />
        <div className="-translate-y-1/2 absolute flex flex-col font-['DM_Sans:Light',sans-serif] font-light h-[22px] justify-center leading-[0] left-[177.11px] text-[14.1px] text-black top-[31.34px] w-[38.366px]" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[21px] whitespace-pre-wrap">{` page.`}</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-[#f6f6f6] content-stretch flex flex-col items-start py-[0.5px] relative shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-[#d6d6d6] border-b-[0.5px] border-solid border-t-[0.5px] inset-0 pointer-events-none" />
      <Heading4Button1 />
      <Container57 />
    </div>
  );
}

function MinusSvg2() {
  return (
    <div className="h-[3px] relative shrink-0 w-[13px]" data-name="minus.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 3">
        <g clipPath="url(#clip0_2148_1159)" id="minus.svg">
          <path d={svgPaths.p17b3080} fill="var(--fill-0, black)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2148_1159">
            <rect fill="white" height="3" width="13" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function MinusSvgFill2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip px-[5.69px] py-[10.69px] relative shrink-0 size-[24.38px]" data-name="minus.svg fill">
      <MinusSvg2 />
    </div>
  );
}

function Image2() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[24.38px] size-[24.38px]" data-name="Image">
      <MinusSvgFill2 />
    </div>
  );
}

function Heading4Button2() {
  return (
    <div className="bg-[#f6f6f6] mb-[-0.705px] relative rounded-[12px] shrink-0 w-full" data-name="Heading 4 → Button">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[229.04px] items-center px-[15px] py-[18.75px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[18.8px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[22.5px]">Use Your Secure Client Area</p>
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

function Container58() {
  return (
    <div className="mb-[-0.705px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[18.75px] px-[15px] relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[21px] relative shrink-0 text-[14.1px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="mb-0">Only use your secure client area for all transactions, like withdrawals, transfers,</p>
          <p>and deposits.</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-[#f6f6f6] content-stretch flex flex-col items-start pb-[1.205px] pt-[0.5px] relative shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-[#d6d6d6] border-b-[0.5px] border-solid border-t-[0.5px] inset-0 pointer-events-none" />
      <Heading4Button2 />
      <Container58 />
    </div>
  );
}

function MinusSvg3() {
  return (
    <div className="h-[3px] relative shrink-0 w-[13px]" data-name="minus.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 3">
        <g clipPath="url(#clip0_2148_1159)" id="minus.svg">
          <path d={svgPaths.p17b3080} fill="var(--fill-0, black)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2148_1159">
            <rect fill="white" height="3" width="13" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function MinusSvgFill3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip px-[5.69px] py-[10.69px] relative shrink-0 size-[24.38px]" data-name="minus.svg fill">
      <MinusSvg3 />
    </div>
  );
}

function Image3() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[24.38px] size-[24.38px]" data-name="Image">
      <MinusSvgFill3 />
    </div>
  );
}

function Heading4Button3() {
  return (
    <div className="bg-[#f6f6f6] mb-[-0.715px] relative rounded-[12px] shrink-0 w-full" data-name="Heading 4 → Button">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[170.01px] items-center px-[15px] py-[18.75px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[18.8px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[22.5px]">Be Wary of Attachments and Links</p>
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

function Container59() {
  return (
    <div className="mb-[-0.715px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[18.75px] px-[15px] relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[21px] relative shrink-0 text-[14.1px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="mb-0">Always pause and think twice before clicking on any email attachments or</p>
          <p>{`links. Do not forget to verify the sender's details to ensure authenticity.`}</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="bg-[#f6f6f6] content-stretch flex flex-col items-start pb-[1.215px] pt-[0.5px] relative shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-[#d6d6d6] border-b-[0.5px] border-solid border-t-[0.5px] inset-0 pointer-events-none" />
      <Heading4Button3 />
      <Container59 />
    </div>
  );
}

function MinusSvg4() {
  return (
    <div className="h-[3px] relative shrink-0 w-[13px]" data-name="minus.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 3">
        <g clipPath="url(#clip0_2148_1159)" id="minus.svg">
          <path d={svgPaths.p17b3080} fill="var(--fill-0, black)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2148_1159">
            <rect fill="white" height="3" width="13" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function MinusSvgFill4() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip px-[5.69px] py-[10.69px] relative shrink-0 size-[24.38px]" data-name="minus.svg fill">
      <MinusSvg4 />
    </div>
  );
}

function Image4() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[24.38px] size-[24.38px]" data-name="Image">
      <MinusSvgFill4 />
    </div>
  );
}

function Heading4Button4() {
  return (
    <div className="bg-[#f6f6f6] mb-[-0.71px] relative rounded-[12px] shrink-0 w-full" data-name="Heading 4 → Button">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[327.99px] items-center px-[15px] py-[18.75px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[18.8px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[22.5px]">Educate Yourself</p>
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

function Container60() {
  return (
    <div className="mb-[-0.71px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[18.75px] px-[15px] relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[21px] relative shrink-0 text-[14.1px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="mb-0">Stay informed about CFD trading, market dynamics, and common trading</p>
          <p>strategies. Education is a crucial defense against fraud and scams.</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder4() {
  return (
    <div className="bg-[#f6f6f6] content-stretch flex flex-col items-start pb-[1.21px] pt-[0.5px] relative shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-[#d6d6d6] border-b-[0.5px] border-solid border-t-[0.5px] inset-0 pointer-events-none" />
      <Heading4Button4 />
      <Container60 />
    </div>
  );
}

function MinusSvg5() {
  return (
    <div className="h-[3px] relative shrink-0 w-[13px]" data-name="minus.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 3">
        <g clipPath="url(#clip0_2148_1159)" id="minus.svg">
          <path d={svgPaths.p17b3080} fill="var(--fill-0, black)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2148_1159">
            <rect fill="white" height="3" width="13" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function MinusSvgFill5() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip px-[5.69px] py-[10.69px] relative shrink-0 size-[24.38px]" data-name="minus.svg fill">
      <MinusSvg5 />
    </div>
  );
}

function Image5() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[24.38px] size-[24.38px]" data-name="Image">
      <MinusSvgFill5 />
    </div>
  );
}

function Heading4Button5() {
  return (
    <div className="bg-[#f6f6f6] mb-[-0.66px] relative rounded-[12px] shrink-0 w-full" data-name="Heading 4 → Button">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[262.34px] items-center px-[15px] py-[18.75px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[18.8px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[22.5px]">Avoid Unsolicited Offers</p>
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

function Container61() {
  return (
    <div className="mb-[-0.66px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[18.75px] px-[15px] relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[21px] relative shrink-0 text-[14.1px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="mb-0">Be wary of unsolicited emails, phone calls, or social media messages offering</p>
          <p className="mb-0">CFD trading opportunities. Scammers often use these channels to reach</p>
          <p>potential victims.</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder5() {
  return (
    <div className="bg-[#f6f6f6] content-stretch flex flex-col items-start pb-[1.16px] pt-[0.5px] relative shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-[#d6d6d6] border-b-[0.5px] border-solid border-t-[0.5px] inset-0 pointer-events-none" />
      <Heading4Button5 />
      <Container61 />
    </div>
  );
}

function MinusSvg6() {
  return (
    <div className="h-[3px] relative shrink-0 w-[13px]" data-name="minus.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 3">
        <g clipPath="url(#clip0_2148_1159)" id="minus.svg">
          <path d={svgPaths.p17b3080} fill="var(--fill-0, black)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2148_1159">
            <rect fill="white" height="3" width="13" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function MinusSvgFill6() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip px-[5.69px] py-[10.69px] relative shrink-0 size-[24.38px]" data-name="minus.svg fill">
      <MinusSvg6 />
    </div>
  );
}

function Image6() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[24.38px] size-[24.38px]" data-name="Image">
      <MinusSvgFill6 />
    </div>
  );
}

function Heading4Button6() {
  return (
    <div className="bg-[#f6f6f6] mb-[-0.71px] relative rounded-[12px] shrink-0 w-full" data-name="Heading 4 → Button">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[306.1px] items-center px-[15px] py-[18.75px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[18.8px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[22.5px]">Trust Your Instincts</p>
          </div>
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <Image6 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="mb-[-0.71px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[18.75px] px-[15px] relative w-full">
        <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[21px] relative shrink-0 text-[14.1px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="mb-0">If something does not feel right or if you are being pressured to make quick</p>
          <p>decisions, take a step back and evaluate the situation.</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder6() {
  return (
    <div className="bg-[#f6f6f6] content-stretch flex flex-col items-start pb-[3.21px] pt-[0.5px] relative shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-[#d6d6d6] border-b-[2.5px] border-solid border-t-[0.5px] inset-0 pointer-events-none" />
      <Heading4Button6 />
      <Container62 />
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <BackgroundBorder />
      <BackgroundBorder1 />
      <BackgroundBorder2 />
      <BackgroundBorder3 />
      <BackgroundBorder4 />
      <BackgroundBorder5 />
      <BackgroundBorder6 />
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1124.06005859375px] px-[14.063px] relative self-stretch shrink-0 w-[562.03px]" data-name="Container">
      <Container55 />
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-wrap items-start justify-between min-h-[971.469970703125px] relative shrink-0 w-full" data-name="Container">
      <Container53 />
      <Container54 />
    </div>
  );
}

function Section2() {
  return (
    <div className="absolute bg-[#f6f6f6] content-stretch flex flex-col items-start left-0 px-[157.97px] py-[84.375px] right-0 top-[2263.88px]" data-name="Section">
      <Container52 />
    </div>
  );
}

function Heading16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[30px] text-white w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[36px] whitespace-pre-wrap">We are here to help.</p>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.535px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#34e834] text-[16.9px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[25.31px] whitespace-pre-wrap">report-scams@icmarkets.com</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.535px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[25.31px] mb-[-0.535px] relative shrink-0 text-[16.9px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">If you suspect that you have fallen victim to an investment scam or if</p>
        <p>you have any inquiries, please do not hesitate to reach out to us at:</p>
      </div>
      <Container66 />
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[22.475px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[25.31px] relative shrink-0 text-[16.9px] text-white w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">We are dedicated to conducting thorough investigations and taking</p>
        <p className="mb-0">all essential measures to stop and prevent scammers from</p>
        <p className="mb-0">impersonating XAI Technology, and its employees and misusing our</p>
        <p className="mb-0">logo to deceive individuals genuinely interested in our products and</p>
        <p>services.</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex flex-col gap-[14.4px] items-start max-w-[1124.06005859375px] pb-[37.5px] px-[14.063px] relative shrink-0 w-[562.03px]" data-name="Container">
      <Heading16 />
      <Container65 />
      <Container67 />
    </div>
  );
}

function Margin10() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[562.030029296875px] px-[46.836px] relative shrink-0 w-[655.702px]" data-name="Margin">
      <Container64 />
    </div>
  );
}

function ReportScam() {
  return (
    <div className="h-[334px] relative shrink-0 w-[304px]" data-name="report scam">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgReportScam} />
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="max-w-[1124.06005859375px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] px-[14.063px] relative w-full">
        <ReportScam />
      </div>
    </div>
  );
}

function Margin11() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1124.06005859375px] pt-[45px] relative shrink-0 w-[468.36px]" data-name="Margin">
      <Container68 />
    </div>
  );
}

function Container63() {
  return (
    <div className="content-center flex flex-wrap gap-[0px_0.004px] items-center relative shrink-0 w-full" data-name="Container">
      <Margin10 />
      <Margin11 />
    </div>
  );
}

function Section3() {
  return (
    <div className="absolute bg-black content-stretch flex flex-col items-start left-[158px] max-w-[1150px] rounded-[18.75px] top-[3488px] w-[1150px]" data-name="Section">
      <Container63 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[48.8px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[58.5px]">Get Started with XAI Technology</p>
      </div>
    </div>
  );
}

function Background11() {
  return (
    <div className="bg-[#34e834] h-[70.31px] relative rounded-[35.83px] shrink-0 w-[73px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pb-[14px] pt-[13.31px] relative size-full">
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[28.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[42.19px]">1</p>
        </div>
      </div>
    </div>
  );
}

function Border() {
  return (
    <div className="content-stretch flex h-[87px] items-center justify-center max-w-[224.80999755859375px] p-[8.5px] relative rounded-[44.25px] shrink-0 w-[90px]" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[44.25px]" />
      <Background11 />
    </div>
  );
}

function Container73() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[11.25px] relative size-full">
          <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[22.5px] relative shrink-0 text-[15px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
            <p className="mb-0">Register for a Live or</p>
            <p>Demo trading profile.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Margin13() {
  return (
    <div className="content-stretch flex flex-col h-[67.5px] items-start justify-center pb-[22.5px] relative shrink-0 w-full" data-name="Margin">
      <Container73 />
    </div>
  );
}

function Container72() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[22.5px] items-center left-[-14.06px] max-w-[1124.06005859375px] px-[11.25px] right-[-14.06px] top-0" data-name="Container">
      <Border />
      <Margin13 />
    </div>
  );
}

function Margin12() {
  return (
    <div className="absolute h-[177px] left-[42.18px] right-[885.19px] top-0" data-name="Margin">
      <Container72 />
    </div>
  );
}

function Container74() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[21.25%] max-w-[1124.06005859375px] pb-[6px] pl-[11.25px] pr-[3.56px] pt-[12.75px] right-[58.75%] top-[36.41px]" data-name="Container">
      <div className="bg-[#34e834] h-[3.75px] shrink-0 w-[210px]" data-name="Background" />
    </div>
  );
}

function Background12() {
  return (
    <div className="bg-[#34e834] h-[70.31px] relative rounded-[35.83px] shrink-0 w-[73px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pb-[14px] pt-[13.31px] relative size-full">
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[28.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[42.19px]">2</p>
        </div>
      </div>
    </div>
  );
}

function Border1() {
  return (
    <div className="content-stretch flex h-[87px] items-center justify-center max-w-[224.80999755859375px] p-[8.5px] relative rounded-[44.25px] shrink-0 w-[90px]" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[44.25px]" />
      <Background12 />
    </div>
  );
}

function Container76() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[11.25px] relative size-full">
          <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[22.5px] relative shrink-0 text-[15px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
            <p className="mb-0">Handpick your account,</p>
            <p>fund with local options.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Margin15() {
  return (
    <div className="content-stretch flex flex-col h-[67.5px] items-start justify-center pb-[22.5px] relative shrink-0 w-full" data-name="Margin">
      <Container76 />
    </div>
  );
}

function Container75() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[22.5px] items-center left-[-14.06px] max-w-[1124.06005859375px] px-[11.25px] right-[-14.06px] top-0" data-name="Container">
      <Border1 />
      <Margin15 />
    </div>
  );
}

function Margin14() {
  return (
    <div className="absolute h-[177px] left-[463.68px] right-[463.69px] top-0" data-name="Margin">
      <Container75 />
    </div>
  );
}

function Container77() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[58.75%] max-w-[1124.06005859375px] pb-[6px] pl-[11.25px] pr-[3.56px] pt-[12.75px] right-[21.25%] top-[36.41px]" data-name="Container">
      <div className="bg-[#34e834] h-[3.75px] shrink-0 w-[210px]" data-name="Background" />
    </div>
  );
}

function Background13() {
  return (
    <div className="bg-[#34e834] h-[70.31px] relative rounded-[35.83px] shrink-0 w-[73px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pb-[14px] pt-[13.31px] relative size-full">
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[28.1px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[42.19px]">3</p>
        </div>
      </div>
    </div>
  );
}

function Border2() {
  return (
    <div className="content-stretch flex h-[87px] items-center justify-center max-w-[224.80999755859375px] p-[8.5px] relative rounded-[44.25px] shrink-0 w-[90px]" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[44.25px]" />
      <Background13 />
    </div>
  );
}

function Container79() {
  return (
    <div className="h-[67.5px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[11.25px] relative size-full">
          <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[22.5px] relative shrink-0 text-[15px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
            <p className="mb-0">Get trading using</p>
            <p className="mb-0">cutting-</p>
            <p>edge platforms.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[22.5px] items-center left-[-14.06px] max-w-[1124.06005859375px] px-[11.25px] right-[-14.06px] top-0" data-name="Container">
      <Border2 />
      <Container79 />
    </div>
  );
}

function Margin16() {
  return (
    <div className="absolute h-[177px] left-[885.18px] right-[42.19px] top-0" data-name="Margin">
      <Container78 />
    </div>
  );
}

function Container71() {
  return (
    <div className="h-[177px] relative shrink-0 w-[1124.06px]" data-name="Container">
      <Margin12 />
      <Container74 />
      <Margin14 />
      <Container77 />
      <Margin16 />
    </div>
  );
}

function Link3() {
  return (
    <div className="bg-[#34e834] content-stretch flex items-start justify-center pb-[15.44px] pt-[15.06px] px-[39px] relative rounded-[5.63px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[5.63px]" />
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[20.6px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24.38px]">Invest Today</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[45px] items-center px-[14.063px] relative size-full">
          <Heading />
          <Container71 />
          <Link3 />
        </div>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex flex-wrap items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Container70 />
    </div>
  );
}

function Section4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 px-[157.97px] py-[117.188px] right-0 top-[3951.84px]" data-name="Section">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[165.97%] left-0 max-w-none top-[-32.99%] w-full" src={imgSection1} />
      </div>
      <Container69 />
    </div>
  );
}

function Container83() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#191919] text-[17.4px] text-center whitespace-nowrap">
        <p className="leading-[18px]">Excellent</p>
      </div>
    </div>
  );
}

function Margin17() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[12px] relative shrink-0" data-name="Margin">
      <Container83 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[0_81.52%_-0.72%_0.01%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.0148 23.9912">
        <g id="Group">
          <path d={svgPaths.p22cc6b00} fill="var(--fill-0, #00B67A)" id="Vector" />
          <path d={svgPaths.pf779a80} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[0_61.1%_-0.72%_20.42%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.0148 23.9912">
        <g id="Group">
          <path d={svgPaths.p22cc6b00} fill="var(--fill-0, #00B67A)" id="Vector" />
          <path d={svgPaths.p739e200} fill="var(--fill-0, #00B67A)" id="Vector_2" />
          <path d={svgPaths.p138c5b00} fill="var(--fill-0, white)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[0_40.68%_-0.72%_40.85%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.0148 23.9912">
        <g id="Group">
          <path d={svgPaths.p22cc6b00} fill="var(--fill-0, #00B67A)" id="Vector" />
          <path d={svgPaths.p739e200} fill="var(--fill-0, #00B67A)" id="Vector_2" />
          <path d={svgPaths.p14b8fb00} fill="var(--fill-0, white)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[0_20.25%_-0.72%_61.28%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.0148 23.9912">
        <g id="Group">
          <path d={svgPaths.p31a1ec00} fill="var(--fill-0, #00B67A)" id="Vector" />
          <path d={svgPaths.p38a9f980} fill="var(--fill-0, #00B67A)" id="Vector_2" />
          <path d={svgPaths.p36d9b700} fill="var(--fill-0, white)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[0_-0.17%_-0.72%_81.69%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.0148 23.9912">
        <g id="Group">
          <path d={svgPaths.p31a1ec00} fill="var(--fill-0, #00B67A)" id="Vector" />
          <path d={svgPaths.p38a9f980} fill="var(--fill-0, #00B67A)" id="Vector_2" />
          <path d={svgPaths.p26d8300} fill="var(--fill-0, white)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Img() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="Img">
      <Group />
      <Group1 />
      <Group2 />
      <Group3 />
      <Group4 />
    </div>
  );
}

function Container84() {
  return (
    <div className="h-[23.82px] relative shrink-0 w-full" data-name="Container">
      <Img />
    </div>
  );
}

function Stars() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[130px]" data-name="Stars">
      <Container84 />
    </div>
  );
}

function StarsMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[12px] relative shrink-0 w-[142px]" data-name="Stars:margin">
      <Stars />
    </div>
  );
}

function Container86() {
  return (
    <div className="h-[19.68px] relative shrink-0 w-full" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80 19.6797">
        <g clipPath="url(#clip0_2148_1165)" id="Img">
          <path d={svgPaths.p381fb700} fill="var(--fill-0, #191919)" id="Vector" />
          <path d={svgPaths.p2496ee00} fill="var(--fill-0, #00B67A)" id="Vector_2" />
          <path d={svgPaths.p1aa93800} fill="var(--fill-0, #005128)" id="Vector_3" />
        </g>
        <defs>
          <clipPath id="clip0_2148_1165">
            <rect fill="white" height="19.6797" width="80" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Logo() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[80px]" data-name="Logo">
      <Container86 />
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Logo />
    </div>
  );
}

function LinkTrustpilotReviews() {
  return (
    <div className="content-center flex flex-wrap gap-0 items-center justify-center relative shrink-0 w-full" data-name="Link - Trustpilot reviews">
      <div className="absolute inset-[2px] rounded-[4px]" data-name="Border">
        <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
      <Margin17 />
      <StarsMargin />
      <Container85 />
    </div>
  );
}

function Container82() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start max-w-[750px] min-h-px min-w-px relative w-full" data-name="Container">
      <LinkTrustpilotReviews />
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-[797px] px-[23.5px] relative w-[797px]" data-name="Body">
      <Container82 />
    </div>
  );
}

function Html() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px overflow-clip relative w-full" data-name="Html">
      <Body />
    </div>
  );
}

function Iframe() {
  return (
    <div className="content-stretch flex flex-col h-[28px] items-start justify-center overflow-clip relative shrink-0 w-full" data-name="Iframe">
      <Html />
    </div>
  );
}

function Container81() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[797.02px]" data-name="Container">
      <Iframe />
    </div>
  );
}

function Container80() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1124.06005859375px] relative shrink-0 w-[775.7px]" data-name="Container">
      <Container81 />
    </div>
  );
}

function Link4() {
  return (
    <div className="bg-[#34e834] content-stretch flex items-start justify-center pb-[6.26px] pt-[5.37px] px-[16.438px] relative rounded-[5.63px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[5.63px]" />
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[15px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24.38px]">Open an Account</p>
      </div>
    </div>
  );
}

function ChatSvg1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chat.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_2148_1162)" id="chat.svg">
          <path d={svgPaths.p19536200} fill="var(--fill-0, black)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_2148_1162">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ChatSvgFill() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[24px]" data-name="chat.svg fill">
      <ChatSvg1 />
    </div>
  );
}

function ChatSvg() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex items-start left-[calc(50%-52.8px)] overflow-clip top-[8.29px]" data-name="chat.svg">
      <ChatSvgFill />
    </div>
  );
}

function Link5() {
  return (
    <div className="h-[39.35px] relative rounded-[7.5px] shrink-0 w-[162.47px]" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[7.5px]" />
      <ChatSvg />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold h-[25px] justify-center leading-[0] left-[calc(50%+12.18px)] text-[15px] text-black text-center top-[18.81px] tracking-[0.469px] w-[105.953px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24.38px] whitespace-pre-wrap">{` 24/7 Support`}</p>
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[11.63px] items-center pl-[105.72px] relative w-full">
          <Link4 />
          <Link5 />
        </div>
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1124.06005859375px] px-[14.063px] relative shrink-0 w-[468.36px]" data-name="Container">
      <Container88 />
    </div>
  );
}

function Section5() {
  return (
    <div className="absolute content-center flex flex-wrap gap-0 items-center left-[37.97px] right-[157.97px] top-[4582.22px]" data-name="Section">
      <Container80 />
      <Container87 />
    </div>
  );
}

function Main() {
  return (
    <div className="absolute h-[4636.57px] left-0 right-0 top-0" data-name="Main">
      <Section />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
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