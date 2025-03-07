import Gamecard from "../components/gamecard";
import Search from "../components/search";

export default function Main() {
  return (
    <div className="flex justify-center items-center flex-col">
      <Search />
      <section className="flex p-5 gap-4">
        <Gamecard />
      </section>
    </div>
  );
}
