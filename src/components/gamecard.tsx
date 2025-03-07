import { useState } from "react";
import card_img from "../../public/character-lol.png"
import card_hover_img from "../../public/character-hover-lol.png"
import logo_img from "../../public/logo/logo-lol-small.svg"
import title_img from "../../public/logo/logo-lol-big.png"

export default function Gamecard() {
  const [mouse, setMouse] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center w-max h-max">
      <div
        className="flex relative items-center justify-center w-[170px] h-[240px] bg-[url('/bg-lol.png')] bg-cover bg-center "
        onMouseEnter={() => setMouse(true)}
        onMouseLeave={() => setMouse(false)}
      >
        <img
          src={card_hover_img}
          alt="hover-image"
          className={`absolute -top-5 left-1/2 transform -translate-x-1/2 origin-bottom 
          max-w-[350px] h-[260px] transition-transform duration-300 ease-out
        ${mouse
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
            }`}
        />
        <img
          src={card_img}
          alt="default-image"
          className={`absolute -top-5 left-0 transform origin-bottom 
          max-w-[170px] h-[260px] transition-transform duration-300 ease-out
        ${mouse
              ? "opacity-0 scale-95 pointer-events-none"
              : "opacity-100 scale-100"
            }`}
        />
        <img src={title_img} alt="logo" className="absolute left-0 bottom-0" />
      </div>
      <div className="flex items-center justify-start w-full pt-1">
        <img src={logo_img} alt="logo" className="" />
        <span className="text-white text-xs font-bold">리그 오브 레전드</span>
      </div>
    </div>
  );
}
