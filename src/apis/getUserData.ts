import { API } from "../types/api";
import { ASIA, KR, RIOT_API } from "./env_valuable";

/** 계정 정보 취득 */
export const getAccountData = async (game_name: string, tag_line: string) => {
  const res = await API<any>(
    `${ASIA}/riot/account/v1/accounts/by-riot-id/${game_name}/${tag_line}?api_key=${RIOT_API}`,
    {
      method: "GET",
    }
  );
  return res;
};

/** 계정 상세 정보 취득 */
export const getUserDetail = async (puuid: string) => {
  const res = await API<any>(
    `${KR}/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${RIOT_API}`,
    {
      method: "GET",
    }
  );
  return res;
};

/** 계정 티어 취득 */
export const getUserTier = async (id: string) => {
  const res = await API<any>(
    `${KR}/lol/league/v4/entries/by-summoner/${id}?api_key=${RIOT_API}`,
    {
      method: "GET",
    }
  );
  return res;
};

/** 계정 프로필 이미지 취득 */
export const getUserProfile = (id: number) => {
  return `https://ddragon.leagueoflegends.com/cdn/15.3.1/img/profileicon/${id}.png`;
};
