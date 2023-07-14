import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import InfoButton from "../components/InfoButton";

const EventDetail = () => {
  const params = useParams();
  const [photoLink, setPhotoLink] = useState("");
  const [event, setEvent] = useState({
    id: params.eventId,
    event_title: "",
    description: "",
    event_photo: "",
    location: "",
    event_price: "",
    link_to_buy: "",
    event_date: "",
  });

  const getPhoto = (photoLink) => {
    if (photoLink) {
      setPhotoLink(photoLink);
    } else {
      setPhotoLink(
        "https://www.steaua-dunarii.ro/client/img/image-not-found.png"
      );
    }
  };

  const getEventById = async (id) => {
    try {
      let result = await axios.get(`http://localhost:5101/api/event/${id}`);
      if (result.status === 200) {
        setEvent(result.data);
        console.log("event", event);
        getPhoto(result.data.event_photo);
      }
    } catch (exception) {
      console.error("Aconteceu algum erro. Recarregue a página.");
    }
  };

  useEffect(() => {
    console.log("entrou aqui");
    getEventById(params.eventId);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <img
        src={photoLink}
        className="md:w-[600px] w-full h-[150px] rounded-3xl px-2 mt-8 mb-4"
      />
      <div className="flex">
        <h1 className="text-center text-white text-3xl font-bold ">
          {event.event_title}
        </h1>
        <div className="flex justify-center ml-[8px] mt-[8px]">
          <Link to={`/edit-event/${params.eventId}`} className="edit-button">
            <EditOutlined className="text-[14px] text-white icon" />
          </Link>
        </div>
      </div>
      <p className="text-white">{event.description}</p>
      <div className="flex gap-1 justify-center flex-wrap my-4">
        <InfoButton
          link={"https://google.com"}
          main_text={"Comprar ingresso"}
          secondary_text={"R$30,00"}
        />
        <InfoButton
          link={"https://google.com"}
          main_text={event.location}
          secondary_text={"Local"}
        />
        <InfoButton
          link={"https://google.com"}
          main_text={dayjs(event.event_date).format("DD/MM/YYYY")}
          secondary_text={"Terça-feira"}
        />
      </div>
      <div>
        <div className="people flex justify-center mt-4 mb-2">
          <img
            src={event.photo}
            className="w-[32px] h-[32px] rounded-2xl person"
          />
          <img
            src={event.photo}
            className="w-[32px] h-[32px] rounded-2xl person"
          />
          <img
            src={event.photo}
            className="w-[32px] h-[32px] rounded-2xl person"
          />
          <img
            src={event.photo}
            className="w-[32px] h-[32px] rounded-2xl person"
          />
          <img
            src={event.photo}
            className="w-[32px] h-[32px] rounded-2xl person"
          />
        </div>
        <Button className="primary-button rounded-2xl">
          CONFIRMAR PRESENÇA
        </Button>
      </div>
    </div>
  );
};

export default EventDetail;
