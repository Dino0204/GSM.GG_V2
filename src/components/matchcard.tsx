import { useEffect, useState } from "react";
import { getItem, getMatchData } from "../apis/getMatchData";
import { Match, Participant } from "../types/match";
import Item from "./item";
import { getChampProfile } from "../apis/getChampData";
import { getRuneData, getRuneImg } from "../apis/getRuneData";
import { getSpellData, getSpellImg } from "../apis/getSpellData";
import { Rune } from "../types/rune";

interface MatchcardProps {
  id: string;
  index: number;
  myPuuid: string;
}

export default function Matchcard({ id, index, myPuuid }: MatchcardProps) {
  const [matchData, setMatchData] = useState<Match>();
  const [timeDifference, setTimeDifference] = useState<string>();
  const [myParticipant, setMyParticipant] = useState<Participant>();

  useEffect(() => {
    const fetchMatchData = async () => {
      // Fetch match data
      const { data: matchRes } = await getMatchData(id);
      const { gameCreation, gameDuration, gameMode, participants, teams } = matchRes?.info;

      // Fetch rune and spell data
      const { data: runeData } = await getRuneData();
      const { data: spellData } = await getSpellData();

      // 찾고자 하는 참여자 찾기
      const participant = participants.find((p: Participant) => p.puuid === myPuuid);

      // 소환사 주문 정보 찾기
      const spellEntries = Object.entries(spellData.data);
      const foundSpell1 = spellEntries.find(([, value]: [string, any]) => Number(value.key) === participant.summoner1Id);
      const foundSpell2 = spellEntries.find(([, value]: [string, any]) => Number(value.key) === participant.summoner2Id);

      const mySpell1 = foundSpell1 ? foundSpell1[1] : null;
      const mySpell2 = foundSpell2 ? foundSpell2[1] : null;

      // 아이템 배열 생성
      const items = [
        participant.item0,
        participant.item1,
        participant.item2,
        participant.item3,
        participant.item4,
        participant.item5,
        participant.item6,
      ];

      // 룬 데이터 처리
      const primaryStyleId = participant.perks?.styles[0]?.style;
      const secondaryStyleId = participant.perks?.styles[1]?.style;
      const primaryKeystoneId = participant.perks?.styles[0]?.selections[0]?.perk;

      const primaryRuneTree = runeData.find((rune: Rune) => rune.id === primaryStyleId);
      const myPriRune = primaryRuneTree?.slots[0]?.runes.find((rune: Rune) => rune.id === primaryKeystoneId);
      const mySubRune = runeData.find((rune: Rune) => rune.id === secondaryStyleId);

      // 상태 업데이트
      setMatchData({ gameCreation, gameDuration, gameMode, participants, teams });
      setMyParticipant({
        ...participant,
        items,
        myPriRune,
        mySubRune,
        mySpell1,
        mySpell2
      });
    };

    fetchMatchData();
  }, [id, myPuuid]);

  useEffect(() => {
    if (!matchData) return;

    const matchTime = new Date(matchData.gameCreation);
    const currentTime = new Date();
    const diffMs = Math.abs(currentTime.getTime() - matchTime.getTime());
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    if (months > 0) {
      setTimeDifference(`${months}달 전`);
    } else if (days > 0) {
      setTimeDifference(`${days}일 전`);
    } else {
      setTimeDifference(`${hours}시간 전`);
    }
  }, [matchData]);

  if (!matchData || !myParticipant) return null;

  return (
    <div className={`w-187.5 h-25 rounded-sm flex gap-2 items-center overflow-hidden p-2.5 ${myParticipant.win ? "bg-[#2D344C]" : "bg-[#4C2D2D]"}`}>
      <section className={`w-5 h-full flex justify-center items-center rounded-sm ${myParticipant.win ? "bg-[#6983E0]" : "bg-[#E06969]"}`}>
        {index + 1}
      </section>
      <section className="font-extrabold text-xs">
        <p>{matchData.gameMode}</p>
        <p>{timeDifference}</p>
        <p>{myParticipant.win ? "승리" : "패배"}</p>
        <p>
          {`${Math.floor(matchData.gameDuration / 60)}분 ${matchData.gameDuration % 60}초`}
        </p>
      </section>
      <section className="flex flex-col gap-1">
        <div className="flex items-center">
          <div className="flex gap-1">
            {myParticipant.perks && (
              <>
                <img
                  className="w-12 h-12 rounded-md overflow-hidden"
                  src={getChampProfile(myParticipant.championName)}
                  alt="champion"
                />
                <div className="flex flex-col gap-1">
                  <Item
                    src={getRuneImg(myParticipant.myPriRune?.icon)}
                    type="Circle"
                    isImg={!!myParticipant.myPriRune?.icon}
                  />
                  <Item
                    src={getRuneImg(myParticipant.mySubRune?.icon)}
                    type="Circle"
                    isImg={!!myParticipant.mySubRune?.icon}
                  />
                </div>
              </>
            )}
            <div className="flex flex-col gap-1">
              <Item
                src={getSpellImg(myParticipant.mySpell1?.id)}
                isImg={!!myParticipant.mySpell1?.id}
              />
              <Item
                src={getSpellImg(myParticipant.mySpell2?.id)}
                isImg={!!myParticipant.mySpell2?.id}
              />
            </div>
          </div>
          <div className="flex gap-1 pl-2 font-black text-base">
            <p>{myParticipant.kills}</p>
            <p className="text-red-400">{myParticipant.deaths}</p>
            <p>{myParticipant.assists}</p>
          </div>
        </div>
        <div className="flex gap-1">
          {myParticipant.items.map((item, idx) => (
            <Item key={idx} src={getItem(item)} isImg={!!item} />
          ))}
        </div>
      </section>
    </div>
  );
}
