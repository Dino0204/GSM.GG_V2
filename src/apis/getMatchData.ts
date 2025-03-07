import { API } from "../types/api";

export const getChampData = async () => {
  const res = await API("", {
    method: "GET",
  });
  return res;
};
