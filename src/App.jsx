import "./App.scss";
import "antd/dist/antd";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar />
      <p className="text-white">reacttt</p>
      <Footer />
    </div>
  );
}

export default App;
