import { API } from "../types/api";
import { ChampionsResponse } from "../types/champion";

/** 모든 챔피언 정보 획득 */
export const getChampData = async () => {
  const res = await API<ChampionsResponse>(
    `${import.meta.env.VITE_DDRAGON_URL}/${
      import.meta.env.VITE_DDRAGON_VER
    }/data/ko_KR/champion.json`,
    {
      method: "GET",
    }
  );
  return res;
};

/** 챔피언 상세 정보 취득 */
export const getChampDetails = async (champ_id: string) => {
  const res = await API<any>(
    `${import.meta.env.VITE_DDRAGON_URL}/${
      import.meta.env.VITE_DDRAGON_VER
    }/data/ko_KR/champion/${champ_id}.json`,
    {
      method: "GET",
    }
  );
  return res;
};

/** 챔피언 프로필 이미지 취득 */
export const getChampProfile = (champ_id: string): string => {
  return `${import.meta.env.VITE_DDRAGON_URL}/${
    import.meta.env.VITE_DDRAGON_VER
  }/img/champion/${champ_id}.png`;
};

/** 챔피언 로딩 이미지(스킨) 취득 */
export const getChampSkin = (champ_id: string, champ_num: number): string => {
  return `${
    import.meta.env.VITE_DDRAGON_URL
  }/img/champion/loading/${champ_id}_${champ_num}.jpg
`;
};
