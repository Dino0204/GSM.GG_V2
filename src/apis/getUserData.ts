import { API } from "../types/api";

export const getAccountData = async (game_name: string, tag_line: string) => {
  const res = await API<any>(
    `${
      import.meta.env.VITE_RIOT_ASIA_URL
    }/riot/account/v1/accounts/by-riot-id/${game_name}/${tag_line}?api_key=${
      import.meta.env.VITE_RIOT_API
    }`,
    {
      method: "GET",
    }
  );
  return res;
};

export const getUserDetail = async (puuid: string) => {
  const res = await API<any>(
    `${
      import.meta.env.VITE_RIOT_KR_URL
    }/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${
      import.meta.env.VITE_RIOT_API
    }`,
    {
      method: "GET",
    }
  );
  return res;
};

export const getMatchId = async (
  puuid: string,
  start: number,
  count: number
) => {
  const res = await API<any>(
    `${
      import.meta.env.VITE_RIOT_ASIA_URL
    }/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}&api_key=${
      import.meta.env.VITE_RIOT_API
    }`,
    {
      method: "GET",
    }
  );
  return res;
};

export const getUserTier = async (id: string) => {
  const res = await API<any>(
    `${
      import.meta.env.VITE_RIOT_KR_URL
    }/lol/league/v4/entries/by-summoner/${id}?api_key=${
      import.meta.env.VITE_RIOT_API
    }`,
    {
      method: "GET",
    }
  );
  return res;
};
