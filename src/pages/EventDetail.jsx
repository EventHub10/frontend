import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import { EditOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import InfoButton from "../components/InfoButton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EventDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [photoLink, setPhotoLink] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [event, setEvent] = useState({
    id: params.eventId,
    event_title: "",
    description: "",
    event_photo: "",
    location: "",
    event_price: "",
    link_to_buy: "",
    event_date: "",
    confirmed_peoples: [],
  });

  const error = (msg) => {
    messageApi.open({
      type: "error",
      content: msg,
      duration: 3,
    });
  };

  const success = (msg) => {
    messageApi.open({
      type: "success",
      content: msg,
      duration: 3,
    });
  };

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

  const confirmPresence = async () => {
    if (!user.id) {
      navigate("/login");
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };

    try {
      let { status, data } = await axios.post(
        `http://localhost:5101/api/event/confirmPresence/${user.id}/${params.eventId}`,
        {},
        config
      );
      if (status === 200 && data === true) {
        success("Presença confirmada!");
        getEventById(params.eventId);
      }
    } catch (exception) {
      error(exception?.response?.data);
    }
  };

  useEffect(() => {
    console.log("entrou aqui");
    getEventById(params.eventId);
  }, []);

  return (
    <div className="flex flex-col items-center">
      {contextHolder}
      <img
        src={photoLink}
        className="md:w-[600px] w-full h-[150px] rounded-3xl px-2 mt-8 mb-4"
      />
      <div className="flex">
        <h1 className="text-center text-white text-3xl font-bold ">
          {event.event_title}
        </h1>
        {user && user.id === event.ownerId && (
          <div className="flex justify-center ml-[8px] mt-[8px]">
            <Link to={`/edit-event/${params.eventId}`} className="edit-button">
              <EditOutlined className="text-[14px] text-white icon" />
            </Link>
          </div>
        )}
      </div>
      <p className="text-white max-w-[500px] px-[20px]">{event.description}</p>
      <div className="flex gap-1 justify-center flex-wrap my-4">
        <InfoButton
          link={event.link_to_buy}
          main_text={"Comprar ingresso"}
          secondary_text={`R$${event.event_price}`}
        />
        <InfoButton
          link={event.link_to_buy}
          main_text={event.location}
          secondary_text={"Local"}
        />
        <InfoButton
          link={event.link_to_buy}
          main_text={dayjs(event.event_date).format("DD/MM/YYYY")}
          secondary_text={"Data"}
        />
      </div>
      {event.confirmed_peoples.length && (
        <div className="people flex justify-center mt-4 mb-2">
          {event.confirmed_peoples.map((c) => {
            return (
              <img
                key={c.id}
                src={c.user.photo}
                className="w-[32px] h-[32px] rounded-2xl person"
              />
            );
          })}
        </div>
      )}
      <Button onClick={confirmPresence} className="primary-button rounded-2xl">
        CONFIRMAR PRESENÇA
      </Button>
    </div>
  );
};

export default EventDetail;
