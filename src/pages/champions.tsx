import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getChampData, getChampProfile } from "../apis/getChampData";
import { Champion } from "../types/champion";

export default function Champions() {
  const [champions, setChampions] = useState<Champion[]>([]);
  const { pathname } = useLocation();
  const go = useNavigate()

  useEffect(() => {
    const fetchChampions = async () => {
      const res = await getChampData()
      const championsData = Object.values(res?.data?.data || {}).map((champion) => ({
        id: champion.id,
        key: champion.key,
        name: champion.name,
        title: champion.title,
        profile: getChampProfile(champion.id)
      }))

      //console.log(championsData)
      setChampions(championsData);

    };

    fetchChampions();
  }, []);

  return (
    <div className="flex justify-center ">
      <ul className="flex flex-col justify-center items-start text-sm w-1/4 gap-2">
        {champions && champions.map((champion, index) => (
          <li
            className="flex items-center bg-gray-700 w-full p-1"
            key={champion.key}
          >
            {/* 번호 */}
            <span className="w-8">{index + 1}</span>
            {/* 챔프 */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => go(`${pathname}/details/${champion.id}`)}
            >
              <img
                className="rounded-sm"
                src={champion.profile}
                alt={`${champion.id} profile`}
                width={32}
                height={32}
              />
              <span>{champion.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
