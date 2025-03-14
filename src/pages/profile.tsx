import { useEffect, useState } from "react";
import { getAccountData, getUserDetail, getUserProfile, getUserTier } from "../apis/getUserData";
import { getMatchId } from "../apis/getMatchData";
import Matchcard from "../components/matchcard";
import { Tier, User } from "../types/user";

export default function Profile() {
  const [user_name, setUserName] = useState("HideOnBush");
  const [tag_line, setTagLine] = useState("KR1");

  const [user, setUser] = useState<User>()
  const [tiers, setTiers] = useState<Tier[]>([])
  const [matches, setMatches] = useState<[]>([])

  const fetchSummonerData = async () => {

    // 0. 닉네임, 태그로 puuid 얻기
    const account_res = await getAccountData(user_name, tag_line)
    const { gameName, tagLine, puuid } = account_res?.data;

    // 1. 소환사 상세정보 얻기
    const user_res = await getUserDetail(puuid)
    const { id, profileIconId, summonerLevel, revisionDate } = user_res.data;

    // 2. 소환사 매치 아이디 얻기
    const match_id = await getMatchId(puuid, 0, 20)
    setMatches(match_id.data)

    // 3. 소환사 티어 얻기
    const user_tier = await getUserTier(id)
    setTiers(user_tier.data)

    setUser({ gameName, tagLine, profileIconId, summonerLevel, revisionDate, puuid })

  };
  useEffect(() => {
    fetchSummonerData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className="bg-white w-187.5 h-60 rounded-4xl text-black flex overflow-hidden p-5 gap-4">
        <header className="border-4 border-[#3A8BFE] w-50 h-50 rounded-2xl overflow-hidden relative">
          {user?.profileIconId && <img
            alt="profile"
            className="w-full h-full absolute"
            src={getUserProfile(user?.profileIconId)}
          />}
          <p className="absolute bottom-1 left-1/2 -translate-x-1/2 text-white bg-slate-950 px-2 rounded-xl">
            {user?.summonerLevel}
          </p>
        </header>
        <main className="flex flex-col justify-around">
          <header className="flex gap-2">
            <h1 className="text-2xl font-bold">{user?.gameName}</h1>
            <h2 className="text-2xl font-semibold text-gray-400">{"#"}{user?.tagLine}</h2>
            <input type="text" className="bg-blue-300" onChange={(e) => setUserName(e.target.value)} />
            <input type="text" className="bg-blue-300" onChange={(e) => setTagLine(e.target.value)} />
            <button className="bg-blue-500 p-2 rounded-sm" onClick={() => fetchSummonerData()}>검색 하기</button>
          </header>
          {tiers && tiers.map((tier, index) => (
            <footer className="flex items-center gap-2" key={index}>
              <div className="w-20 h-20 bg-slate-800 rounded-full flex overflow-hidden items-center justify-center border-4 border-black">
                <img src={`../public/rank/${tier.tier}.png`} />
              </div>
              <p className="font-extrabold text-lg">
                {tier.tier} {tier.rank} - {tier.leaguePoints}LP
              </p>
              <p>{tier.queueType == "RANKED_SOLO_5x5" ? "솔로랭크" : "자유랭크"}</p>
              <p>{"승: "}{tier.wins} {"패: "}{tier.losses}</p>
            </footer>
          ))}
        </main>
      </div>
      {matches && user && matches.map((match, index) => (
        <Matchcard
          key={index}
          id={match}
          index={index}
          myPuuid={user?.puuid}
        />
      ))}
    </div>
  );
}
