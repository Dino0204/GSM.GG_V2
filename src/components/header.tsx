import logo_img from "../../public/logo/logo-gsmgg.svg"
import profile_img from "../../public/profile.svg"
import { useNavigate } from "react-router-dom";

export default function Header() {
  const go = useNavigate()

  return (
    <header>
      <section className="flex items-center bg-gray-800 p-2">
        <img src={logo_img} alt="logo" height={32} className="ml-2" onClick={() => go("/main")} />
      </section>
      <section className="flex items-center bg-blue-500 p-2 justify-between text-sm ">
        <ul className="flex gap-4 ">
          <li className="cursor-pointer" onClick={() => go("/champions")}>챔피언 분석</li>
          <li className="cursor-pointer" onClick={() => go("/gamemodes")}>게임 모드</li>
          <li className="cursor-pointer" onClick={() => go("/leaderboards")}>랭킹</li>
          <li className="cursor-pointer" onClick={() => go("/stats")}>통계</li>
        </ul>
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => go("/profile")}>
          프로필
          <img src={profile_img} alt="profile" width={24} height={24} />
        </div>
      </section>
    </header>
  );
}
