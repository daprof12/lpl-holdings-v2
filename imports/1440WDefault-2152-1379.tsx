import svgPaths from "./svg-tculhvw1ha";
import imgSection from "figma:asset/f4f75c3f8db50fe920b8721a6f74f024836b605a.png";
import imgSeychellesFlagWebp from "figma:asset/e17d1fb9b20b698b170e1a2f1e60c8ec3effdff1.png";
import imgInfocircleWebp from "figma:asset/35593117416516776d9b143dd4d9095d33fe7993.png";
import imgChatIconWebp from "figma:asset/561f5009ffc053e64fb84e5781e336da22140735.png";
import imgImage from "figma:asset/1af9030b1727a277a1d5222fd6e109a097ac4eb5.png";
import imgCertificateIcon2Webp from "figma:asset/2685ba2a6460af9ce990664ebc5d560b9d7c7f3d.png";
import imgSection1 from "figma:asset/49712abe12194c268a5c9981e2bf290c369efc5f.png";

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px]">Regulation</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[7.5px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[25.31px] relative shrink-0 text-[16.9px] text-[rgba(255,255,255,0.8)] text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">XAI Technology is authorised and regulated by Financial Services Authority of Seychelles</p>
        <p className="mb-0">{`(FSA). Trade with peace of mind knowing that clients are protected by XAI Technology's`}</p>
        <p>strict compliance protocols.</p>
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
    <div className="content-stretch flex flex-col gap-[7.5px] items-center max-w-[1124.06005859375px] px-[14.063px] relative self-stretch shrink-0 w-[749.38px]" data-name="Container">
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
          <img alt="" className="absolute h-[134.43%] left-0 max-w-none top-0 w-full" src={imgSection} />
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
        <p className="leading-[18.75px]">Sponsorship</p>
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
        <p className="leading-[18.75px]">About XAI Technology</p>
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
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#34e834] text-[13.1px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18.75px]">Regulation</p>
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
        <p className="leading-[18.75px]">Careers</p>
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
        <p className="leading-[18.75px]">Contact us</p>
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

function SeychellesFlagWebp() {
  return (
    <div className="absolute h-[56.25px] left-0 top-0 w-[75px]" data-name="seychelles-flag.webp">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgSeychellesFlagWebp} />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[65.63px]" data-name="Heading 3">
      <div className="flex flex-col font-['DM_Sans:Black',sans-serif] font-black justify-center leading-[0] relative shrink-0 text-[30px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[36px]">FSA</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start mr-[-0.005px] pb-[7.5px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px]">Financial Services Authority</p>
      </div>
    </div>
  );
}

function InfocircleWebp() {
  return (
    <div className="relative shrink-0 size-[14.06px]" data-name="infocircle.webp">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-[-35.35%] max-w-none size-[170.7%] top-[-35.35%]" src={imgInfocircleWebp} />
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[14.06px]" data-name="Link">
      <InfocircleWebp />
    </div>
  );
}

function Background() {
  return (
    <div className="absolute bg-white h-[160.5px] opacity-0 right-[-14.07px] rounded-[9.38px] top-[28.12px] w-[290.63px]" data-name="Background">
      <div className="absolute bg-[rgba(255,255,255,0)] bottom-0 right-0 rounded-[9.38px] shadow-[0px_0px_20.625px_1.875px_rgba(0,0,0,0.1)] top-0 w-[290.63px]" data-name="Overlay+Shadow" />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip pb-[17px] relative shrink-0" data-name="Container">
      <Link6 />
      <Background />
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start mr-[-0.005px] pl-[9.375px] relative shrink-0" data-name="Margin">
      <Container9 />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex items-center left-0 pr-[0.005px] right-0 top-[101.63px]" data-name="Container">
      <Margin />
      <Margin1 />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[132.69px] relative shrink-0 w-full" data-name="Container">
      <SeychellesFlagWebp />
      <Heading2 />
      <Container8 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal gap-[22.25px] items-start leading-[22.5px] relative shrink-0 text-[15px] text-black w-full whitespace-nowrap" data-name="Paragraph">
      <div className="flex flex-col justify-center relative shrink-0" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">XAI Technology complies with the FSA regulatory requirements</p>
        <p className="mb-0">and has in place internal risk management controls to ensure that it</p>
        <p>is sufficiently capitalized to support its operations.</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">External audits supplement XAI Technology operational and</p>
        <p>accounting process and ensure full regulatory compliance.</p>
      </div>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(243,243,243,0.5)] relative rounded-[5.63px] shrink-0 w-full" data-name="Overlay">
      <div className="content-stretch flex flex-col items-start p-[28.125px] relative w-full">
        <Container7 />
        <Paragraph />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1124.06005859375px] px-[14.063px] relative self-stretch shrink-0 w-[562.03px]" data-name="Container">
      <Overlay />
    </div>
  );
}

function ChatIconWebp() {
  return (
    <div className="absolute left-[18.75px] size-[45px] top-[18.75px]" data-name="chat-icon.webp">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-[-3.33%] max-w-none size-[106.67%] top-[-3.33%]" src={imgChatIconWebp} />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[18.75px] right-[45.01px] top-[82.5px]" data-name="Heading 3">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[30px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[36px]">Contact Us</p>
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[18.75px] right-[45.01px] top-[131.06px]" data-name="Heading 6">
      <div className="flex flex-col font-['DM_Sans:9pt_Regular',sans-serif] font-normal justify-center leading-[24.38px] relative shrink-0 text-[#777] text-[15px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 9" }}>
        <p className="mb-0">We are here 24hrs a day Monday to</p>
        <p>Sunday.</p>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="h-[199.63px] mb-[-0.01px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.15)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <ChatIconWebp />
      <Heading3 />
      <Heading5 />
    </div>
  );
}

function Link7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.15)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[13.625px] pl-[48.75px] pr-[15px] pt-[13.125px] relative w-full">
        <div className="absolute left-[18.75px] size-[18.75px] top-[14.06px]" data-name="Image">
          <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage} />
          </div>
        </div>
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[22.5px]">Help Centre</p>
        </div>
      </div>
    </div>
  );
}

function Link8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="content-stretch flex flex-col items-start pl-[48.75px] pr-[15px] py-[13.125px] relative w-full">
        <div className="absolute left-[18.75px] size-[18.75px] top-[14.06px]" data-name="Image">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage} />
          </div>
        </div>
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[22.5px]">Email Us</p>
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.01px] relative shrink-0 w-full" data-name="Container">
      <Link7 />
      <Link8 />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#f6f6f6] content-stretch flex flex-col items-start overflow-clip pb-[0.01px] relative rounded-[15px] shrink-0 w-full" data-name="Background">
      <HorizontalBorder />
      <Container11 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1124.06005859375px] px-[14.063px] relative self-stretch shrink-0 w-[374.69px]" data-name="Container">
      <Background1 />
    </div>
  );
}

function Section2() {
  return (
    <div className="content-stretch flex flex-wrap gap-0 items-start py-[84.37px] relative shrink-0 w-[1124.06px]" data-name="Section">
      <Container6 />
      <div className="max-w-[1124.06005859375px] self-stretch shrink-0 w-[187.34px]" data-name="Rectangle" />
      <Container10 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[30px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[36px] whitespace-pre-wrap">Segregation of Client Funds</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[22.5px] relative shrink-0 text-[15px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">When funding your trading account, your funds are held in client-segregated accounts with top-tier banking institutions.xAI complies with the Securities Act</p>
        <p className="mb-0">and the Securities (Conduct of Business) Regulations, ensuring strxAIt adherence to polxAIies and procedures governing the maintenance and operation of these</p>
        <p>accounts.</p>
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[37.5px] relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[30px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[36px] whitespace-pre-wrap">Anti-Money Laundering</p>
      </div>
    </div>
  );
}

function Link9() {
  return (
    <div className="absolute font-['DM_Sans:Medium',sans-serif] font-medium h-[42px] leading-[0] left-0 text-[#34e834] top-[24px] w-[1039.77px]" data-name="Link">
      <div className="-translate-y-1/2 absolute flex flex-col h-[23px] justify-center left-[809.72px] top-[9.75px] w-[230.429px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px] whitespace-pre-wrap">Anti-Money Laundering and KYC</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col h-[23px] justify-center left-0 top-[32.25px] w-[95.597px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px] whitespace-pre-wrap">requirements</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[67.5px] relative shrink-0 text-[15px] w-full" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['DM_Sans:Light',sans-serif] font-light h-[45px] justify-center leading-[22.5px] left-0 text-black top-[22.5px] w-[1049.645px] whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">In compliance with the FSA Anti-Money Laundering and Counter-Terrorism Financing Act,xAI has implemented comprehensive polxAIies and procedures to</p>
        <p>{`ensure compliance with the law. These measures are designed to prevent money laundering and related activities.xAI's `}</p>
      </div>
      <Link9 />
      <div className="-translate-y-1/2 absolute flex flex-col font-['DM_Sans:Light',sans-serif] font-light h-[23px] justify-center leading-[0] left-[95.25px] text-black top-[56.25px] w-[605.038px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px] whitespace-pre-wrap">{` specify the necessary documents that clients must provide before opening an account.`}</p>
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[37.5px] relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[30px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[36px] whitespace-pre-wrap">Licence</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[22.5px] relative shrink-0 text-[15px] text-black w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Raw Trading Ltd,xAI, is authorised by the Seychelles Financial ServxAIes Authority as a Securities Dealer for the provision of financial servxAIes under LxAIense NO</p>
        <p>SD018.</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[14.063px] relative size-full">
        <Heading4 />
        <Container14 />
        <Heading6 />
        <Container15 />
        <Heading7 />
        <Container16 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-wrap items-start justify-center min-h-[400.5px] relative shrink-0 w-full" data-name="Container">
      <Container13 />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.07px] top-[-0.75px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16.9px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[25.31px]">We have got you covered</p>
      </div>
    </div>
  );
}

function Heading8() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.07px] top-[40.32px]" data-name="Heading 2">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[39.4px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[47.25px]">Client Funds Insurance up to US$1,000,000</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.06px] right-[14.07px] top-[94.32px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16.9px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[25.31px]">*No opt-in is required and no extra costs</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="max-w-[1124.06005859375px] relative self-stretch shrink-0 w-[936.72px]" data-name="Container">
      <Container19 />
      <Heading8 />
      <Container20 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-wrap items-start relative shrink-0 w-full" data-name="Container">
      <Container18 />
    </div>
  );
}

function Image() {
  return (
    <div className="relative shrink-0 size-[15.197px]" data-name="image">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.197 15.197">
        <g id="image">
          <path clipRule="evenodd" d={svgPaths.p32ef5900} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ImageFill() {
  return (
    <div className="relative shrink-0 size-[24.38px]" data-name="image fill">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center overflow-clip p-[4.591px] relative rounded-[inherit] size-full">
        <Image />
      </div>
    </div>
  );
}

function ImageBackgroundBorder() {
  return (
    <div className="bg-[#34e834] content-stretch flex items-center justify-center p-px relative rounded-[24.38px] size-[26.38px]" data-name="Image+Background+Border">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[24.38px]" />
      <ImageFill />
    </div>
  );
}

function Heading4Button() {
  return (
    <div className="bg-black relative rounded-[12px] shrink-0 w-full" data-name="Heading 4 → Button">
      <div className="content-stretch flex gap-[188.33px] items-start pb-[22.38px] pt-[21.75px] px-[22.5px] relative w-full">
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[23.4px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[28.13px]">{`What is XAI Technology's Insurance Coverage?`}</p>
        </div>
        <div className="flex items-center justify-center relative shrink-0">
          <div className="flex-none rotate-180">
            <ImageBackgroundBorder />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#dee2e6]" />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[777.42px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[22.5px] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">We have added additional protection on your funds so you can continue trading with more confidence. The</p>
        <p>insurance will cover up to US$1,000,000 for all claimants.</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[15px] items-center pb-[15px] relative rounded-tl-[5.63px] rounded-tr-[5.63px] shrink-0 w-full" data-name="Background">
      <Heading4Button />
      <Container23 />
    </div>
  );
}

function Image1() {
  return (
    <div className="relative shrink-0 size-[15.197px]" data-name="image">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.197 15.197">
        <g id="image">
          <path clipRule="evenodd" d={svgPaths.p32ef5900} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ImageFill1() {
  return (
    <div className="relative shrink-0 size-[24.38px]" data-name="image fill">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center overflow-clip p-[4.591px] relative rounded-[inherit] size-full">
        <Image1 />
      </div>
    </div>
  );
}

function ImageBackgroundBorder1() {
  return (
    <div className="bg-[#34e834] content-stretch flex items-center justify-center p-px relative rounded-[24.38px] size-[26.38px]" data-name="Image+Background+Border">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[24.38px]" />
      <ImageFill1 />
    </div>
  );
}

function Heading4Button1() {
  return (
    <div className="bg-black relative rounded-[12px] shrink-0 w-full" data-name="Heading 4 → Button">
      <div className="content-stretch flex gap-[240.2px] items-start pb-[22.38px] pt-[21.75px] px-[22.5px] relative w-full">
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[23.4px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[28.13px]">What does the Insurance Coverage include?</p>
        </div>
        <div className="flex items-center justify-center relative shrink-0">
          <div className="flex-none rotate-180">
            <ImageBackgroundBorder1 />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#dee2e6]" />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[777.42px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[22.5px]">The Insurance Coverage includes the available balance and open CFD positions of the client.</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[14.99px] items-center pb-[15.01px] relative shrink-0 w-full" data-name="Background">
      <Heading4Button1 />
      <Container24 />
    </div>
  );
}

function Image2() {
  return (
    <div className="relative shrink-0 size-[15.197px]" data-name="image">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.197 15.197">
        <g id="image">
          <path clipRule="evenodd" d={svgPaths.p32ef5900} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ImageFill2() {
  return (
    <div className="relative shrink-0 size-[24.38px]" data-name="image fill">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center overflow-clip p-[4.591px] relative rounded-[inherit] size-full">
        <Image2 />
      </div>
    </div>
  );
}

function ImageBackgroundBorder2() {
  return (
    <div className="bg-[#34e834] content-stretch flex items-center justify-center p-px relative rounded-[24.38px] size-[26.38px]" data-name="Image+Background+Border">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[24.38px]" />
      <ImageFill2 />
    </div>
  );
}

function Heading4Button2() {
  return (
    <div className="bg-black relative rounded-[12px] shrink-0 w-full" data-name="Heading 4 → Button">
      <div className="content-stretch flex gap-[249.46px] items-start pb-[22.38px] pt-[21.75px] px-[22.5px] relative w-full">
        <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[23.4px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
          <p className="leading-[28.13px]">Can I benefit from the Insurance Coverage?</p>
        </div>
        <div className="flex items-center justify-center relative shrink-0">
          <div className="flex-none rotate-180">
            <ImageBackgroundBorder2 />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_#dee2e6]" />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[777.42px]" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[22.5px] relative shrink-0 text-[15px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">The Insurance Coverage is available to all the XAI Technology clients of Raw Trading Ltd, and will be triggered</p>
        <p>{`only in the unlikely event of Raw Trading Ltd's insolvency.`}</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[15px] items-center pb-[15px] relative rounded-bl-[5.63px] rounded-br-[5.63px] shrink-0 w-full" data-name="Background">
      <Heading4Button2 />
      <Container25 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Background2 />
      <Background3 />
      <Background4 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col h-[422.39px] items-start max-w-[1124.06005859375px] px-[14.063px] relative shrink-0 w-[843.05px]" data-name="Container">
      <Container22 />
    </div>
  );
}

function Heading9() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[27px] relative shrink-0 text-[22.5px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Have a question</p>
        <p className="mb-0">or require</p>
        <p className="mb-0">specialist</p>
        <p>assistance?</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[18.28px] relative shrink-0 text-[12.2px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Our dedicated customer service</p>
        <p>team is here 24/7 to assist you.</p>
      </div>
    </div>
  );
}

function Overlay1() {
  return (
    <div className="bg-[rgba(52,232,52,0.2)] relative rounded-[9.38px] shrink-0 w-full" data-name="Overlay">
      <div className="content-stretch flex flex-col items-start px-[28.125px] py-[23.438px] relative w-full">
        <Heading9 />
        <Container27 />
      </div>
    </div>
  );
}

function CertificateIcon2Webp() {
  return (
    <div className="h-[30.09px] max-w-[28.125px] relative shrink-0 w-[28.12px]" data-name="certificate_icon2.webp">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[99.99%] left-[-0.01%] max-w-none top-0 w-[100.02%]" src={imgCertificateIcon2Webp} />
      </div>
    </div>
  );
}

function Link10() {
  return (
    <div className="bg-[#f3f3f3] relative rounded-[4.69px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-end justify-center size-full">
        <div className="content-stretch flex items-end justify-center p-[12.188px] relative w-full">
          <CertificateIcon2Webp />
          <div className="capitalize flex flex-col font-['DM_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[18.8px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[28.13px]">{` Certificate`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col gap-[22.5px] h-[268.84px] items-start max-w-[1124.06005859375px] px-[14.063px] relative shrink-0 w-[281.02px]" data-name="Container">
      <Overlay1 />
      <Link10 />
    </div>
  );
}

function Section4() {
  return (
    <div className="content-start flex flex-wrap gap-0 items-start relative shrink-0 w-full" data-name="Section">
      <Container21 />
      <Container26 />
    </div>
  );
}

function Section3() {
  return (
    <div className="bg-[#f3f3f3] relative shrink-0 w-full" data-name="Section">
      <div className="content-stretch flex flex-col items-start px-[157.97px] py-[84.375px] relative w-full">
        <Container12 />
        <Container17 />
        <Section4 />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[48.8px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[58.5px]">Trade with</p>
      </div>
    </div>
  );
}

function Heading10() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[22.5px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[27px]">{`a regulated Forex CFD provider `}</p>
      </div>
    </div>
  );
}

function Link11() {
  return (
    <div className="bg-[#34e834] content-stretch flex items-start justify-center pb-[15.43px] pt-[15.07px] px-[39px] relative rounded-[5.63px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[5.63px]" />
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[20.6px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24.38px]">Open Trading Account</p>
      </div>
    </div>
  );
}

function Link12() {
  return (
    <div className="content-stretch flex items-start justify-center pb-[15.43px] pt-[15.07px] px-[39px] relative rounded-[7.5px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[#34e834] border-solid inset-0 pointer-events-none rounded-[7.5px]" />
      <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[20.6px] text-center text-white tracking-[0.469px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24.38px]">View Dashboard</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex gap-[19.14px] items-start pl-[265.2px] pr-[265.21px] pt-[4.63px] relative w-full">
        <Link11 />
        <Link12 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="content-stretch flex flex-col gap-[18.8px] items-start px-[14.063px] relative size-full">
        <Heading />
        <Heading10 />
        <Container30 />
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-wrap items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Container29 />
    </div>
  );
}

function Section5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[244.6%] left-0 max-w-none top-[-72.3%] w-full" src={imgSection1} />
      </div>
      <div className="content-stretch flex flex-col items-start px-[157.97px] py-[117.188px] relative w-full">
        <Container28 />
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