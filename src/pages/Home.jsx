import Event from "../components/Event";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateEvents } from "../store/actions";

const Home = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const navigate = useNavigate();

  const getEvents = async () => {
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };

    const { data } = await axios.get("http://localhost:5101/api/event", config);
    dispatch(updateEvents(data));
  };

  useEffect(() => {
    getEvents();
  }, [navigate]);

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
