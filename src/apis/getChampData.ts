import { API } from "../types/api";
import { ChampionsResponse } from "../types/champion";

export const getChampData = async () => {
  const res = await API<any, ChampionsResponse>(
    `${import.meta.env.VITE_DDRAGON_URL}/${
      import.meta.env.VITE_DDRAGON_VER
    }/data/ko_KR/champion.json`,
    {
      method: "GET",
    }
  );
  return res;
};

export const getChampDetails = async (champ_id: string) => {
  const res = await API<any, any>(
    `${import.meta.env.VITE_DDRAGON_URL}/${
      import.meta.env.VITE_DDRAGON_VER
    }/data/ko_KR/champion/${champ_id}.json`,
    {
      method: "GET",
    }
  );
  return res;
};

export const getChampProfile = (champ_id: string) => {
  return `${import.meta.env.VITE_DDRAGON_URL}/${
    import.meta.env.VITE_DDRAGON_VER
  }/img/champion/${champ_id}.png`;
};

export const getChampSkin = (champ_id: string, champ_num: number) => {
  return `${
    import.meta.env.VITE_DDRAGON_URL
  }/img/champion/loading/${champ_id}_${champ_num}.jpg
`;
};
