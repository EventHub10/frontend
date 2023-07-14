import Event from "../components/Event";
import axios from "axios";
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'



const Home = () => {

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

  useEffect(() => {
    getEvents()
  }, [navigate])

  return (
    <div className="events w-full flex flex-col justify-center my-8 px-4 gap-2">
      {events.map(event => {
        let userId = localStorage.getItem("userId")
        return (
          <Event userId={userId} event={event} />
        )
      })}
    </div>
  );
};

export default Home;
