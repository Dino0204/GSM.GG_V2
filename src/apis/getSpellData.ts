import { API } from "../types/api";
import { DDRAGON, VERSION } from "./env_valuable";

export const getSpellData = async () => {
  const res = await API<any>(`${DDRAGON}/${VERSION}/data/ko_KR/summoner.json`, {
    method: "GET",
  });
  return res;
};

export const getSpellImg = (name: string): string => {
  return `${DDRAGON}/${VERSION}/img/spell/${name}.png`;
};
