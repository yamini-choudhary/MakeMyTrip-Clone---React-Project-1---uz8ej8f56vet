import "../styles/App.css";
import SignUp from "./Authentication/SignUp/SignUp";
import Home from "./Home";
import {Route,Routes} from "react-router-dom"
import TrainInputBox from "./TrainInputBox/TrainInputBox";
import TrainCard from "./Train Card/TrainCard";
import Checkout from "../pages/Checkout/Checkout";
import TopSection from "./TopSection/TopSection";
import Trains from "../pages/Trains/Trains";

function App() {
  return <div className="App">
    <Routes>
      <Route path="" element={<Home/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/trains" element={<Trains/>}/>
      {/* <Route path="/traindata" element={<TrainCard/>}/> */}
      <Route path="/check" element={<Checkout/>}/>
      <Route path="/flights" element={<Home/>}/>
    </Routes>
  </div>;
}

export default App;
