import imgDefaultLogo from "figma:asset/636e2f836e77ac426649d6a64c07faf2f12ec20d.png";

function DefaultLogo() {
  return (
    <div className="absolute aspect-[176.02000427246094/65.19999694824219] left-0 right-[60%] top-0" data-name="default-logo">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[100.01%] left-0 max-w-none top-[-0.01%] w-full" src={imgDefaultLogo} />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[71.7px] relative shrink-0 w-full" data-name="Container">
      <DefaultLogo />
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Link">
      <Container3 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-[440.06px]" data-name="Container">
      <Container2 />
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex items-start justify-center px-[15px] relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#4572c4] text-[24px] text-center tracking-[-0.48px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[32.4px]">Home</p>
      </div>
    </div>
  );
}

function Item() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Item">
      <div className="flex flex-col items-end size-full">
        <div className="content-stretch flex flex-col h-full items-end pb-[2px] pt-[3.25px] relative">
          <Link1 />
        </div>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex items-start justify-center px-[15px] relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[24px] text-black text-center tracking-[-0.48px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[32.4px]">Pricing</p>
      </div>
    </div>
  );
}

function Item1() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Item">
      <div className="flex flex-col items-end size-full">
        <div className="content-stretch flex flex-col h-full items-end pb-[2px] pt-[3.25px] relative">
          <Link2 />
        </div>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex items-start justify-center px-[15px] relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[24px] text-black text-center tracking-[-0.48px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[32.4px]">Platform</p>
      </div>
    </div>
  );
}

function Item2() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Item">
      <div className="flex flex-col items-end size-full">
        <div className="content-stretch flex flex-col h-full items-end pb-[2px] pt-[3.25px] relative">
          <Link3 />
        </div>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex items-start justify-center px-[15px] relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[24px] text-black text-center tracking-[-0.48px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[32.4px]">About</p>
      </div>
    </div>
  );
}

function Item3() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Item">
      <div className="flex flex-col items-end size-full">
        <div className="content-stretch flex flex-col h-full items-end pb-[2px] pt-[3.25px] relative">
          <Link4 />
        </div>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="content-stretch flex items-start justify-center px-[15px] relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[24px] text-black text-center tracking-[-0.48px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[32.4px]">Trade</p>
      </div>
    </div>
  );
}

function Item4() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Item">
      <div className="flex flex-col items-end size-full">
        <div className="content-stretch flex flex-col h-full items-end pb-[2px] pt-[3.25px] relative">
          <Link5 />
        </div>
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div className="bg-black content-stretch flex items-start justify-center pb-[2.15px] pt-[1.25px] px-[40px] relative rounded-[12px] shrink-0" data-name="Link">
      <div className="flex flex-col font-['Nunito_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[24px] text-center text-white tracking-[-0.48px] whitespace-nowrap" style={{ fontVariationSettings: "'YTLC' 500, 'wdth' 100" }}>
        <p className="leading-[32.4px]">Login</p>
      </div>
    </div>
  );
}

function Item5() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Item">
      <div className="flex flex-col items-end size-full">
        <div className="content-stretch flex flex-col h-full items-end pt-[2px] relative">
          <Link6 />
        </div>
      </div>
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex h-[38.4px] items-start relative shrink-0" data-name="List">
      <Item />
      <Item1 />
      <Item2 />
      <Item3 />
      <Item4 />
      <Item5 />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col items-end left-[-176.02px] min-h-[50px] pb-[11.6px] right-0 top-0" data-name="Container">
      <List />
    </div>
  );
}

function Margin() {
  return (
    <div className="h-[50px] relative shrink-0 w-[704.117px]" data-name="Margin">
      <Container4 />
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex gap-[0.003px] items-center px-[57.398px] py-[4.305px] relative size-full" data-name="Container">
      <Container1 />
      <Margin />
    </div>
  );
}