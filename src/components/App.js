import "../styles/App.css";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import Checkout from "../pages/Checkout/Checkout";
import Trains from "../pages/Trains/Trains";
import Flights from "../pages/Flights/Flights";
import Hotel from "./Hotel Card/Hotel/Hotel";
import HotelModal from "./Hotel Card/Hotel Modal/HotelModal";
import HotelCheckout from "./Hotel Card/Hotel Checkout/HotelCheckout";
import { AuthProvider } from "./provider/AuthProvider";
import { Login } from "./Authentication/Login/Login";
import { SignUp } from "./Authentication/SignUp/SignUp";
import { AuthNavigator } from "./navigator/AuthNavigator";

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/trains" element={<Trains />} />
        <Route path="/trains/:id" element={<Checkout />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/flights/:id" element={<AuthNavigator><Checkout /></AuthNavigator>} />
        <Route path="/hotels" element={<Hotel />} />
        <Route path="/hotels/:id" element={<HotelModal />} />
        <Route path="/hotels/checkout" element={<HotelCheckout />} />
        <Route path="" element={<Home />} />
      </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
