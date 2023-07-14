import Event from "../components/Event";
import { useSelector } from "react-redux";

const Home = () => {
  const events = useSelector((state) => state.events);

  return (
    <div className="events w-full flex flex-col justify-center my-8 px-4 gap-2">
      {events.length > 0 ? (
        events.map((item) => {
          return <Event key={item.id} event={item} />;
        })
      ):(
        <p className="text-white text-2xl text-center">Ainda não há nenhum evento cadastrado :(</p>
      )}
    </div>
  );
};

export default Home;
