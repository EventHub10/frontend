import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

import { EditOutlined } from "@ant-design/icons";

const Event = ({ event}) => {
  const user = useSelector((state) => state.user);
  Event.propTypes = {
    event: PropTypes.object,
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
    <div className="event md:w-[600px] w-90 p-4 mx-auto rounded-xl">
      <div className="flex items-center">
        <img src={getPhoto(event.event_photo)} className="w-[100px] h-[100px] rounded-full" />
        <div className="ml-4">
          <span>{event.location}</span>
          <p className="font-bold text-2xl">{event.event_title}</p>
          <span>{dayjs(event.event_date).format("DD/MM/YYYY")}</span>
        </div>
      </div>
      {user && user.id === event.ownerId && (
        <div className="flex justify-center mt-[8px]">
          <Link to={`/edit-event/${event.id}`} className="edit-button">
            <EditOutlined className="text-[14px] text-white icon" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Event;
