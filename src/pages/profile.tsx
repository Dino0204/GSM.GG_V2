import { useEffect, useState } from "react";
import { getAccountData, getMatchId, getUserDetail, getUserTier } from "../apis/getUserData";
import Matchcard from "../components/matchcard";

interface User {
  gameName: string,
  tagLine: string,
  profileIconId: number,
  summonerLevel: number,
  revisionDate: number,
}

interface Tier {
  tier: string,
  rank: string,
  leaguePoints: number,
  queueType: string,
  wins: number,
  losses: number
}

interface Match {

}

export default function Profile() {
  const user_name = "푹우린공룡탕을안먹으면못나가는방";
  const tag_line = "dino";

  const [user, setUser] = useState<User>()
  const [tiers, setTiers] = useState<Tier[]>([])
  const [matches, setMatches] = useState<Match[]>([])

  useEffect(() => {
    const fetchSummonerData = async () => {

      // 0. 닉네임, 태그로 puuid 얻기
      const account_res = await getAccountData(user_name, tag_line)
      const { gameName, tagLine, puuid } = account_res.data;
      //console.log(account_res.data)

      // 1. 소환사 상세정보 얻기
      const user_res = await getUserDetail(puuid)
      const { id, profileIconId, summonerLevel, revisionDate } = user_res.data;
      //console.log(user_res.data)

      // 2. 소환사 매치 아이디 얻기
      const match_id = await getMatchId(puuid, 0, 20)
      setMatches(match_id.data)
      //console.log(match_id.data)

      // 3. 소환사 티어 얻기
      const user_tier = await getUserTier(id)
      setTiers(user_tier.data)
      //console.log(user_tier.data)

      setUser({ gameName, tagLine, profileIconId, summonerLevel, revisionDate })

    };
    fetchSummonerData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-2">

      <div className="bg-white w-[750px] h-[240px] rounded-[30px] text-black flex overflow-hidden p-5 gap-4">
        <header className="border-[5px] border-[#3A8BFE] w-[200px] h-[200px] rounded-[15px] overflow-hidden relative">
          <img
            alt="profile"
            className="w-full h-full absolute"
            src={`https://ddragon.leagueoflegends.com/cdn/15.3.1/img/profileicon/${user?.profileIconId}.png`}
          />
          <p className="absolute bottom-1 left-1/2 -translate-x-1/2 text-white bg-slate-950 px-2 rounded-xl">
            {user?.summonerLevel}
          </p>
        </header>
        <main className="flex flex-col justify-around">
          <header className="flex gap-2">
            <h1 className="text-2xl font-bold">{user?.gameName}</h1>
            <h2 className="text-2xl font-semibold text-gray-400">{"#"}{user?.tagLine}</h2>
          </header>
          {tiers && tiers.map((tier, index) => (
            <footer className="flex items-center gap-2" key={index}>
              <div className="w-20 h-20 bg-slate-800 rounded-full flex overflow-hidden items-center justify-center border-4 border-black">
                <img src={`../public/rank/${tier.tier}.png`} />
              </div>
              <p className="font-extrabold text-lg">
                {tier.tier} {tier.rank} - {tier.leaguePoints}LP
              </p>
              <p>{tier.queueType}</p>
              <p>{tier.wins}{"/"}{tier.losses}</p>
            </footer>
          ))}
        </main>
      </div>
      {/* {matches && matches.map((match, index) => (
        <Matchcard
          key={match}
          id={match}
          index={index}
          myPuuid={`UG7N5mRoWAITdQAHcSux5rwufHL9_-fNq43ProGZPH9cz3DOMxBgod9-ydA4I-zZePI8l4Dfkn-V5Q`}
        />
      ))} */}
    </div>
  );
}
