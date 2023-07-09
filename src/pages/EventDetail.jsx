import { Link } from "react-router-dom";
import dayjs from "dayjs";

import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import InfoButton from "../components/InfoButton";

const EventDetail = () => {
  const event = {
    title: "Festa do peao",
    description: "evento rapido",
    photo:
      "https://media.istockphoto.com/id/1270987867/pt/foto/close-up-young-smiling-man-in-casual-clothes-posing-isolated-on-blue-wall-background-studio.jpg?s=612x612&w=0&k=20&c=yl2rYQMNKmFqNOSaKplUd8doJAnEuTHEZcmUI45XkJo=",
    location: "Palacio Sunset",
    price: 10,
    link_to_buy: "https://byma.com.br/event/6491f300b575750008d79e1f",
    event_date: "2023-08-03",
    confirmed_people: ["id123", "id2345"],
    organizer: "Michael Douglas",
    id: "t4rwfwq133vd",
  };

  const isImageLink = (link) => {
    const imageRegex = /\.(jpeg|jpg|gif|png)/i;
    return imageRegex.test(link);
  };

  const getPhoto = (photoLink) => {
    if (isImageLink(photoLink)) {
      return photoLink;
    }
    return "https://www.steaua-dunarii.ro/client/img/image-not-found.png";
  };

  return (
    <div className="flex flex-col items-center">
      <img
        src={getPhoto(event.photo)}
        className="md:w-[600px] w-full h-[150px] rounded-2xl px-2 mt-8 mb-4"
      />
      <div className="flex">
        <h1 className="text-center text-white text-3xl font-bold ">
          {event.title}
        </h1>
        <div className="flex justify-center ml-[8px] mt-[8px]">
          <Link to={`/edit-event:${event.id}`} className="edit-button">
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
            src={getPhoto(event.photo)}
            className="w-[32px] h-[32px] rounded-2xl person"
          />
          <img
            src={getPhoto(event.photo)}
            className="w-[32px] h-[32px] rounded-2xl person"
          />
          <img
            src={getPhoto(event.photo)}
            className="w-[32px] h-[32px] rounded-2xl person"
          />
          <img
            src={getPhoto(event.photo)}
            className="w-[32px] h-[32px] rounded-2xl person"
          />
          <img
            src={getPhoto(event.photo)}
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
