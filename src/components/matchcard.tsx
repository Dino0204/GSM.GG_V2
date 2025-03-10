import { useEffect, useState } from "react";
import { getItem, getMatchData } from "../apis/getMatchData";
import { Match, Participant } from "../types/match";
import Item from "./item";
import { getChampProfile } from "../apis/getChampData";

interface MatchcardProps {
  id: string,
  index: number,
  myPuuid: string
}

export default function Matchcard({ id, index, myPuuid }: MatchcardProps) {
  const [matchData, setMatchData] = useState<Match>();
  const [timeDifference, setTimeDifference] = useState<string>();
  const [myParticipant, setMyParticipant] = useState<Participant>();

  useEffect(() => {
    const fetchMatchData = async () => {

      const res = await getMatchData(id);

      const { gameCreation, gameDuration, gameMode, participants, teams } = res?.data?.info;


      const myParticipant = participants.find((participant: Participant) => participant.puuid === myPuuid);
      const items = [myParticipant.item0, myParticipant.item1, myParticipant.item2, myParticipant.item3, myParticipant.item4, myParticipant.item5, myParticipant.item6]

      setMatchData({ gameCreation, gameDuration, gameMode, participants, teams });

      setMyParticipant({ items, ...myParticipant });
    };

    fetchMatchData();
  }, []);

  useEffect(() => {
    const caltimeDifference = () => {
      if (matchData) {
        const matchTime = new Date(matchData.gameCreation);
        const currentTime = new Date();
        const timeDifference = Math.abs(Number(currentTime) - Number(matchTime));
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

    matchData && setTimeDifference(caltimeDifference());

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
        <div className="flex items-center">
          <div className="flex gap-1">
            {myParticipant?.perks &&
              <>
                <img
                  className="w-12 h-12 rounded-md overflow-hidden"
                  src={getChampProfile(myParticipant?.championName)}
                  alt="champion"
                />
                <div className="flex flex-col gap-1">
                  {/* {myParticipant?.perks?.styles[0]?.style} */}
                  {/* {myParticipant?.perks?.styles[1]?.style} */}
                  <Item />
                  <Item />
                </div>
              </>
            }
            <div className="flex flex-col gap-1">
              <Item type="Circle" />
              <Item type="Circle" />
            </div>
          </div>
          <div className="flex gap-1 pl-2 font-black text-base">
            <p>{myParticipant?.kills}</p>
            <p className="text-red-400">{myParticipant?.deaths}</p>
            <p>{myParticipant?.assists}</p>
          </div>
        </div>
        <div className="flex gap-1">
          {myParticipant?.items.map((item, index) => (
            <Item key={index} src={getItem(item)} isImg={item ? true : false} />
          ))}
        </div>
      </section >
    </div >
  );
}
