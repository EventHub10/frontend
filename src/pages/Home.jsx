import Event from "../components/Event";

const user = {
  name: "Jorge Douglas",
  email: "jorge@gmail.com",
  password: "12345678",
  photo:
    "https://media.istockphoto.com/id/1270987867/pt/foto/close-up-young-smiling-man-in-casual-clothes-posing-isolated-on-blue-wall-background-studio.jpg?s=612x612&w=0&k=20&c=yl2rYQMNKmFqNOSaKplUd8doJAnEuTHEZcmUI45XkJo=",
  user_events: [],
  id: "1243dsvbvarare",
};

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
  organizer: "Jorge Douglas",
  id: "t4rwfwq133vd",
};

const Home = () => {
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
    <div className="events w-full flex flex-col justify-center my-8 px-4 gap-2">
      <Event link={getPhoto(user.photo)} user={user} event={event} />
      <Event link={getPhoto(user.photo)} user={user} event={event} />
      <Event link={getPhoto(user.photo)} user={user} event={event} />
      <Event link={getPhoto(user.photo)} user={user} event={event} />
      <Event link={getPhoto(user.photo)} user={user} event={event} />
    </div>
  );
};

export default Home;
