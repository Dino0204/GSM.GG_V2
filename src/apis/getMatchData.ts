import { API } from "../types/api";

export const getMatchData = async (id: string) => {
  const res = await API<any, any>(
    `${import.meta.env.VITE_RIOT_ASIA_URL}/lol/match/v5/matches/${id}?api_key=${
      import.meta.env.VITE_RIOT_API
    }`,
    {
      method: "GET",
    }
  );
  return res;
};

export const getItem = (id: number) => {
  return ` ${import.meta.env.VITE_DDRAGON_URL}/${
    import.meta.env.VITE_DDRAGON_VER
  }/img/item/${id}.png`;
};
