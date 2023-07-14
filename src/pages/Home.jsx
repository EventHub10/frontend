import Event from "../components/Event";
import axios from "axios";
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const getEvents = async() => {
    let config = {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    }

    let { data } = await axios.get("http://localhost:5101/api/event", config);

    setEvents(data)
  }

  const teste = () => {
    console.log(user)
  }

  useEffect(() => {
    getEvents()
  }, [navigate])

  return (
    <div className="events w-full flex flex-col justify-center my-8 px-4 gap-2">
      <p className="text-white">user: {user.name}</p>
      <button className="text-white" onClick={teste}>click</button>
      {events && events.map(event => {
        const userId = localStorage.getItem("userId")
        return (
          <Event key={event.id} userId={userId} event={event} />
        )
      })}
    </div>
  );
};

export default Home;
