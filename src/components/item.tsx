interface ItemProps {
  type?: "Circle" | "Rectamgle",
  src?: string,
  isImg?: boolean
}

export default function Item({ type, src, isImg = false }: ItemProps) {
  return (
    <>
      {isImg ? (
        <img src={src} className={`w-5.5 h-5.5 rounded-[${type == "Circle" ? "100%" : "4px"}]`} />
      ) : (
        <div className={`w-5.5 h-5.5 bg-black rounded-[${type == "Circle" ? "100%" : "4px"}]`} />
      )}
    </>
  );
}
