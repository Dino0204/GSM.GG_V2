import { useEffect, useState } from "react";

interface Matchcard {
  id: string,
  index: number,
  myPuuid: string
}

export default function Matchcard({ id, index, myPuuid }: Matchcard) {
  const [matchData, setMatchData] = useState(null);
  const [timeDifference, setTimeDifference] = useState(null);
  const [myParticipant, setMyParticipant] = useState(null);

  const runeData = [
    { id: 8100, key: "Domination" },
    { id: 8112, key: "Electrocute" },
    { id: 8128, key: "DarkHarvest" },
    { id: 9923, key: "HailOfBlades" },
    { id: 8126, key: "CheapShot" },
    { id: 8139, key: "TasteOfBlood" },
    { id: 8143, key: "SuddenImpact" },
    { id: 8137, key: "SixthSense" },
    { id: 8140, key: "GrislyMementos" },
    { id: 8141, key: "DeepWard" },
    { id: 8135, key: "TreasureHunter" },
    { id: 8105, key: "RelentlessHunter" },
    { id: 8106, key: "UltimateHunter" },
    { id: 8300, key: "Inspiration" },
    { id: 8351, key: "GlacialAugment" },
    { id: 8360, key: "UnsealedSpellbook" },
    { id: 8369, key: "FirstStrike" },
    { id: 8306, key: "HextechFlashtraption" },
    { id: 8304, key: "MagicalFootwear" },
    { id: 8321, key: "CashBack" },
    { id: 8313, key: "PerfectTiming" },
    { id: 8352, key: "TimeWarpTonic" },
    { id: 8345, key: "BiscuitDelivery" },
    { id: 8347, key: "CosmicInsight" },
    { id: 8410, key: "ApproachVelocity" },
    { id: 8316, key: "JackOfAllTrades" },
    { id: 8000, key: "Precision" },
    { id: 8005, key: "PressTheAttack" },
    { id: 8008, key: "LethalTempo" },
    { id: 8021, key: "FleetFootwork" },
    { id: 8010, key: "Conqueror" },
    { id: 9101, key: "AbsorbLife" },
    { id: 9111, key: "Triumph" },
    { id: 8009, key: "PresenceOfMind" },
    { id: 9104, key: "LegendAlacrity" },
    { id: 9105, key: "LegendHaste" },
    { id: 9103, key: "LegendBloodline" },
    { id: 8014, key: "CoupDeGrace" },
    { id: 8017, key: "CutDown" },
    { id: 8299, key: "LastStand" },
    { id: 8400, key: "Resolve" },
    { id: 8437, key: "GraspOfTheUndying" },
    { id: 8439, key: "Aftershock" },
    { id: 8465, key: "Guardian" },
    { id: 8446, key: "Demolish" },
    { id: 8463, key: "FontOfLife" },
    { id: 8401, key: "ShieldBash" },
    { id: 8429, key: "Conditioning" },
    { id: 8444, key: "SecondWind" },
    { id: 8473, key: "BonePlating" },
    { id: 8451, key: "Overgrowth" },
    { id: 8453, key: "Revitalize" },
    { id: 8242, key: "Unflinching" },
    { id: 8200, key: "Sorcery" },
    { id: 8214, key: "SummonAery" },
    { id: 8229, key: "ArcaneComet" },
    { id: 8230, key: "PhaseRush" },
    { id: 8224, key: "NullifyingOrb" },
    { id: 8226, key: "ManaflowBand" },
    { id: 8275, key: "NimbusCloak" },
    { id: 8210, key: "Transcendence" },
    { id: 8234, key: "Celerity" },
    { id: 8233, key: "AbsoluteFocus" },
    { id: 8237, key: "Scorch" },
    { id: 8232, key: "Waterwalking" },
    { id: 8236, key: "GatheringStorm" },
    { id: 5008, key: "AdaptiveForce" },
    { id: 5005, key: "AttackSpeed" },
    { id: 5007, key: "AbilityHaste" },
    { id: 5010, key: "MoveSpeed" },
    { id: 5001, key: "HealthScaling" },
    { id: 5011, key: "Health" },
    { id: 5013, key: "TenacityAndSlowResist" },
  ];

  const fetchMatchData = async () => {
    try {
      const matchDetail = await axios.get(
        `https://asia.api.riotgames.com/lol/match/v5/matches/${id}?api_key=${process.env.NEXT_PUBLIC_RIOT_API}`
      );
      const { gameCreation, gameDuration, gameMode, participants, teams } =
        matchDetail.data.info;

      const myParticipant = participants.find(
        (participant) => participant.puuid === myPuuid
      );

      setMatchData({
        gameCreation,
        gameDuration,
        gameMode,
        participants,
        teams,
      });

      setMyParticipant(myParticipant);
    } catch (error) {
      console.log(error);
    }
  };

  const caltimeDifference = () => {
    if (matchData) {
      const matchTime = new Date(matchData.gameCreation);
      const currentTime = new Date();
      const timeDifference = Math.abs(currentTime - matchTime);
      const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
      const daysDifference = Math.floor(hoursDifference / 24);
      const monthsDifference = Math.floor(daysDifference / 30);

      if (monthsDifference > 0) {
        return `${monthsDifference}달 전`;
      } else if (daysDifference > 0) {
        return `${daysDifference}일 전`;
      } else {
        return `${hoursDifference}시간 전`;
      }
    }
    return "N/A시간 전";
  };

  useEffect(() => {
    fetchMatchData();
  }, []);

  useEffect(() => {
    if (matchData) {
      setTimeDifference(caltimeDifference());
    }
  }, [matchData]);

  useEffect(() => {
    const primaryRune = runeData.find(
      (rune) => rune.id === myParticipant?.perks?.styles[0]?.style
    );
    console.log(myParticipant?.perks);
    console.log(primaryRune?.key);
  }, [matchData]);

  return (
    <div className="w-[750px] h-[100px] bg-slate-400 rounded-[5px] flex gap-2 items-center overflow-hidden p-[10px]">
      {index + 1}
      <section className="font-extrabold text-xs">
        <p>{matchData ? matchData.gameMode : "게임모드"}</p>
        <p>{timeDifference}</p>
        <p>{myParticipant?.win ? "승리" : "패배"}</p>
        <p>
          {matchData
            ? `${Math.floor(matchData.gameDuration / 60)}분 ${matchData.gameDuration % 60
            }초`
            : "N/A분 N/A초"}
        </p>
      </section>
      <section className="flex flex-col gap-1">
        <div className="flex">
          <div className="flex gap-1">
            <img
              className="w-12 h-12 rounded-md overflow-hidden"
              src={`https://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_DATA_DRAGON_VERSION}/img/champion/${myParticipant?.championName}.png`.trim()}
              alt="champion"
            />
            {matchData && myParticipant.perks ? (
              <div className="flex flex-col gap-1">
                {myParticipant?.perks?.styles[0]?.style}
                {myParticipant?.perks?.styles[1]?.style}
                {/* <img className="w-[22px] h-[22px] rounded-[4px]" /> */}
              </div>
            ) : null}
            <div className="flex flex-col gap-1">
              <div className="bg-black w-[22px] h-[22px] rounded-full"></div>
              <div className="bg-black w-[22px] h-[22px] rounded-full"></div>
            </div>
          </div>
          {myParticipant ? (
            <div className="h-full flex items-center pl-2 font-black text-sm">
              <span className="">{myParticipant.kills} / </span>
              <span className="text-red-500">{myParticipant.deaths}</span>
              <span className=""> / {myParticipant.assists}</span>
            </div>
          ) : (
            "0 / 0 / 0"
          )}
        </div>
        <div className="flex gap-1">
          {myParticipant
            ? Array.from({ length: 7 }).map((_, i) =>
              myParticipant[`item${i}`] !== 0 ? (
                <img
                  key={i}
                  className="w-[22px] h-[22px] rounded-[4px]"
                  src={`https://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_DATA_DRAGON_VERSION
                    }/img/item/${myParticipant[`item${i}`]}.png`}
                  alt={`item${i}`}
                />
              ) : (
                <div
                  key={i}
                  className="bg-black w-[22px] h-[22px] rounded-[4px]"
                ></div>
              )
            )
            : Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="bg-black w-[22px] h-[22px] rounded-[4px]"
              ></div>
            ))}
        </div>
      </section>
    </div>
  );
}
