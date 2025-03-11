import { API } from "../types/api";
import { DDRAGON, VERSION } from "./env_valuable";

export const getRuneData = async () => {
  const res = await API<any>(
    `${DDRAGON}/${VERSION}/data/ko_KR/runesReforged.json`,
    {
      method: "GET",
    }
  );
  return res;
};

export const getRuneImg = (icon: string) => {
  return `${DDRAGON}/img/${icon}`;
};
