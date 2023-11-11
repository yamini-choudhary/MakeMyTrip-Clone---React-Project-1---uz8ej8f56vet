import "../styles/App.css";
import SignUp from "./Authentication/SignUp/SignUp";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import TrainInputBox from "./TrainInputBox/TrainInputBox";
import TrainCard from "./Train Card/TrainCard";
import Checkout from "../pages/Checkout/Checkout";
import TopSection from "./TopSection/TopSection";
import Trains from "../pages/Trains/Trains";
import Flights from "../pages/Flights/Flights";
import Hotel from "./Hotel Card/Hotel";
import HotelModal from "./Hotel Card/HotelModal/HotelModal";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/trains" element={<Trains />} />
        <Route path="/trains/:id" element={<Checkout />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/flights/:id" element={<Checkout />} />
        <Route path="/hotels" element={<Hotel />} />
        <Route path="/hotels/:id" element={<HotelModal />} />
        <Route path="" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
