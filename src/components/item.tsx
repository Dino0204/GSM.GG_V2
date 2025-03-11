interface ItemProps {
  type?: "Circle" | "Rectangle",
  src?: string,
  isImg?: boolean
}

export default function Item({ type = "Rectangle", src, isImg = false }: ItemProps) {
  return (
    <>
      {isImg ? (
        <img src={src} className={`w-5.5 h-5.5 ${type == "Circle" ? "rounded-full" : "rounded-[0.25rem]"}`} />
      ) : (
        <div className={`w-5.5 h-5.5 bg-black ${type == "Circle" ? "rounded-full" : "rounded-[0.25rem]"}`} />
      )}
    </>
  );
}
