function WelkomPlm() {
  return (
    <div
      className="absolute box-border font-['Raleway:Bold',_sans-serif] font-bold gap-[7px] grid grid-cols-[repeat(1,_minmax(0px,_1fr))] grid-rows-[repeat(3,_minmax(0px,_1fr))] h-[163px] leading-[0] left-1/2 p-0 text-[#00747c] text-center translate-x-[-50%] translate-y-[-50%] w-[416px]"
      data-name="Welkom - PLM"
      style={{ top: "calc(50% - 55.5px)" }}
    >
      <div className="[grid-area:1_/_1] relative self-start shrink-0 text-[32px] tracking-[-0.5px]">
        <p className="block leading-[52px]">Welkom bij het</p>
      </div>
      <div className="[grid-area:2_/_1] relative shrink-0 text-[57px] tracking-[-1px] w-[504px]">
        <p className="adjustLetterSpacing block leading-[42px]">
          Patients Like Me
        </p>
      </div>
      <div className="[grid-area:3_/_1] relative self-start shrink-0 text-[32px] tracking-[-0.5px]">
        <p className="block leading-[52px]">Dashboard</p>
      </div>
    </div>
  );
}

function GaDoorButton() {
  return (
    <div
      className="absolute bg-[#00747c] box-border content-stretch flex flex-row gap-2.5 items-center justify-center left-[124px] px-0 py-3 rounded-[17px] top-[232px] w-[168px]"
      data-name="Ga door button"
    >
      <div className="font-['Raleway:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#ffffff] text-[16px] text-center w-[85px]">
        <p className="block leading-[18px]">Ga door</p>
      </div>
    </div>
  );
}

export default function Frame58() {
  return (
    <div className="relative size-full">
      <WelkomPlm />
      <GaDoorButton />
    </div>
  );
}