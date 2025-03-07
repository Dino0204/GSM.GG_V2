import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChampDetails, getChampSkin } from "../apis/getChampData";
import Champcard from "../components/champcard";
import { ChampSkin } from "../types/champion";

export default function Details() {
  const { id } = useParams()
  const [championSkins, setChampionSkins] = useState<ChampSkin[]>([]);
  const [currentImgIndex, setCurrentImgIndex] = useState(1)

  const [style, setStyle] = useState<{
    transform: string,
    transition: string
  }>()

  const nextSlide = () => {
    setCurrentImgIndex(currentImgIndex + 1);
    setStyle({
      transform: `translateX(-${currentImgIndex + 1}00%)`,
      transition: `all 0.4s ease-in-out`,
    });
  };

  const prevSlide = () => {
    setCurrentImgIndex(currentImgIndex - 1);
    setStyle({
      transform: `translateX(-${currentImgIndex - 1}00%)`,
      transition: `all 0.4s ease-in-out`,
    });
  };

  useEffect(() => {
    if (currentImgIndex === 0) {
      setCurrentImgIndex(championSkins.length - 2);
      setTimeout(() => {
        setStyle({
          transform: `translateX(-${championSkins.length - 2}00%)`,
          transition: '0ms',
        });
      }, 500);
    }
    else if (currentImgIndex >= championSkins.length - 1) {
      setCurrentImgIndex(1);
      setTimeout(() => {
        setStyle({
          transform: `translateX(-${1}00%)`,
          transition: '0ms',
        });
      }, 500);
    }
  }, [currentImgIndex, championSkins.length]);

  useEffect(() => {
    setStyle({
      transform: `translateX(-${1}00%)`,
      transition: '0ms',
    });
  }, [championSkins]);

  useEffect(() => {
    const fetchChampionSkins = async () => {
      if (id) {
        const res = await getChampDetails(id)
        const skinsData = (res?.data?.data[id]?.skins || []).map((skin) => ({
          num: skin.num,
          name: skin.name,
          image: getChampSkin(id, skin.num),
        }));

        console.log(skinsData)
        setChampionSkins([skinsData[skinsData.length - 1], ...skinsData, skinsData[0]]);
      }
    };

    fetchChampionSkins();
  }, []);

  return (
    <div className="flex justify-center w-full">
      <div className="relative">
        <div className="overflow-hidden w-full max-w-80">
          <div style={style} className="flex ">
            {championSkins && championSkins.map((skin, index) => (
              <Champcard
                key={index}
                splashImage={skin.image}
                name={skin.name == "default" ? "기본 스킨" : skin.name}
                alt={skin.name}
              />
            ))}
          </div>
        </div>
        <div className="absolute w-full flex justify-between top-[50%]">
          <button className="text-white text-xl cursor-pointer" onClick={prevSlide}>
            {"<"}
          </button>
          <button className="text-white text-xl cursor-pointer" onClick={nextSlide}>
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
