import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { updateUser } from "../store/actions";

import { EditOutlined } from "@ant-design/icons";
import Event from "../components/Event";

const Profile = () => {
  // const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const getData = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5101/api/event/`,
        config
      );
      if (result.status === 200) {
        console.log("deu certo o get dos eventos!", result);
      }
    } catch (e) {
      console.error(e);
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
            <Event link={getPhoto(user.photo)} user={user} event={event} />
            <Event link={getPhoto(user.photo)} user={user} event={event} />
            <Event link={getPhoto(user.photo)} user={user} event={event} />
            <Event link={getPhoto(user.photo)} user={user} event={event} />
            <Event link={getPhoto(user.photo)} user={user} event={event} />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
