import { API } from "../types/api";
import { ASIA, DDRAGON, RIOT_API, VERSION } from "./env_valuable";

/** 매치 정보 취득 */
export const getMatchId = async (
  puuid: string,
  start: number,
  count: number
) => {
  const res = await API<any>(
    `${ASIA}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}&api_key=${RIOT_API}`,
    {
      method: "GET",
    }
  );
  return res;
};

/** 매치 상세 정보 취득 */
export const getMatchData = async (id: string) => {
  const res = await API<any, any>(
    `${ASIA}/lol/match/v5/matches/${id}?api_key=${RIOT_API}`,
    {
      method: "GET",
    }
  );
  return res;
};

export const getItem = (id: number) => {
  return `${DDRAGON}/${VERSION}/img/item/${id}.png`;
};
