import { API } from "../types/api";
import { ChampionsResponse } from "../types/champion";

export const getChampData = async () => {
  const res = await API<any, ChampionsResponse>("/data/ko_KR/champion.json", {
    method: "GET",
  });
  return res;
};

export const getChampDetails = async (champ_id: string) => {
  const res = await API(`/data/ko_KR/champion/${champ_id}.json`, {
    method: "GET",
  });
  return res;
};

export const getChampProfile = (champ_id: string) => {
  return `${import.meta.env.VITE_DDRAGON_BASE_URL}${
    import.meta.env.VITE_DDRAGON_VERSION
  }/img/champion/${champ_id}.png`;
};

export const getChampSkin = (champ_id: string, champ_num: number) => {
  return `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ_id}_${champ_num}.jpg
`;
};
