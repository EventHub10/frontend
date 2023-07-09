import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import { EditOutlined } from "@ant-design/icons";

const Event = ({ link, event, user }) => {
  Event.propTypes = {
    link: PropTypes.string,
    event: PropTypes.object,
    user: PropTypes.object,
  };
  return (
    <div className="event md:w-[600px] w-90 p-4 mx-auto rounded-xl">
      <div className="flex items-center">
        <img src={link} className="w-[100px] h-[100px] rounded-full" />
        <div className="ml-4">
          <span>{event.location}</span>
          <p className="font-bold text-2xl">{event.title}</p>
          <span>{dayjs(event.event_date).format("DD/MM/YYYY")}</span>
        </div>
      </div>
      {user.name === event.organizer && (
        <div className="flex justify-center mt-[8px]">
          <Link to={`/edit-event:${user.id}`} className="edit-button">
            <EditOutlined className="text-[14px] text-white icon" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Event;
