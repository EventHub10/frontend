import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, updateEvents } from "../store/actions";

import { EditOutlined } from "@ant-design/icons";
import Event from "../components/Event";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const events = useSelector((state) => state.events);
  const userId = localStorage.getItem("userId") ?? null;

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

  // const config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${localStorage.getItem("token")}`,
  //   },
  // };

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
    <>
      {user && user.id && (
        <div className="flex flex-col items-center justify-center">
          <img
            src={getPhoto(user.photo)}
            className="w-[150px] h-[150px] rounded-full mx-8 mt-8 mb-4"
          />
          <div className="flex">
            <h1 className="text-center text-white text-3xl font-bold ">
              {user.name}
            </h1>
            <div className="flex justify-center ml-[8px] mt-[8px]">
              <Link to={`/edit-profile/`} className="edit-button">
                <EditOutlined className="text-[14px] text-white icon" />
              </Link>
            </div>
          </div>
          <div className="events w-full flex flex-col justify-center my-8 px-4 gap-2">
            {user &&
              events &&
              events.map((item) => {
                if (user.id == events.ownerId) {
                  return <Event key={item.id} event={item} />;
                }
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
