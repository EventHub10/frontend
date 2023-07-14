import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { EditOutlined } from "@ant-design/icons";
import Event from "../components/Event";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const events = useSelector((state) => state.events);

  const getPhoto = (photoLink) => {
    if (photoLink) {
      return photoLink;
    }
    return "https://www.steaua-dunarii.ro/client/img/image-not-found.png";
  };

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
                if (user.id == item.ownerId) {
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
