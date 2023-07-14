import Event from "../components/Event";
import { useSelector } from "react-redux";

const Home = () => {
  const events = useSelector((state) => state.events);

  return (
    <div className="events w-full flex flex-col justify-center my-8 px-4 gap-2">
      {events &&
        events.map((item) => {
          return <Event key={item.id} event={item} />;
        })}
    </div>
  );
};

export default Home;
