import "./App.scss";
import "antd/dist/antd";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateEvents, updateUser } from "./store/actions";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CreateEvent from "./pages/CreateEvent";
import Profile from "./pages/Profile";
import EventDetail from "./pages/EventDetail";
import EditProfile from "./pages/EditProfile";
import EditEvent from "./pages/EditEvent";
import axios from "axios";

function App() {
  const { darkAlgorithm } = theme;
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId") ?? null;

  const getData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const _events = await axios.get("http://localhost:5101/api/event", config);
    dispatch(updateEvents(_events.data));

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
    <BrowserRouter>
      <ConfigProvider
        theme={{
          algorithm: darkAlgorithm,
        }}
      >
        <div className="flex flex-col justify-between min-h-screen">
          <Navbar />
          <div className="flex flex-col justify-between">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/create-event" element={<CreateEvent />} />
              <Route path="/edit-event/:eventId" element={<EditEvent />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/event-detail" element={<EventDetail />} />
              <Route path="/event-detail/:eventId" element={<EventDetail />} />
              <Route path="/edit-profile" element={<EditProfile />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
