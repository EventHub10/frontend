import Event from "../components/Event";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateEvents, updateUser } from "../store/actions";

const Home = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const userId = localStorage.getItem("userId") ?? null;

  const getData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { events } = await axios.get(
      "http://localhost:5101/api/event",
      config
    );
    dispatch(updateEvents(events));
    if (userId.length > 0) {
      const _user = await axios.get(
        `http://localhost:5101/api/user/${userId}`,
        config
      );
      dispatch(updateUser(_user.data));
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
