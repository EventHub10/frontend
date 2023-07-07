import "./App.scss";
import "antd/dist/antd";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CreateEvent from "./pages/CreateEvent";
import Profile from "./pages/Profile";
import EventDetail from "./pages/EventDetail";
import EditProfile from "./pages/EditProfile";
import EditEvent from "./pages/EditEvent";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col justify-between min-h-screen">
        <Navbar />
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/event-detail" element={<EventDetail />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/edit-event" element={<EditEvent />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
