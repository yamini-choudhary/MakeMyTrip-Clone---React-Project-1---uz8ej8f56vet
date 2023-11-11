import React from "react";
import Card from "./Card/Card";
import Slider1 from "./Slider1/Slider1";
import Multicarousel from "./Carousel/Multicarousel";
// import FlightCard from "./FlightCard/FlightCard";
import Details from "./Footer/Details";
import Qna from "./Footer/Qna";
import Bottom from "./Footer/Bottom";
import Header from "./Navbar/Header/Header";
import FlightCard from "./FlightCard/FlightCard";
import TopSection from "./TopSection/TopSection";
import Offer from "../pages/Offer Card/Offer";
import { HomeSliders } from "./HomeSliders/HomeSlider";
// import FlightInputBox from "./FlightInputBox/FlightInputBox";

function Home() {
  return (
    <div>
      <TopSection />
      {/* <Card /> */}
      <div
        className="container"
        style={{
          boxSizing: "border-box",
          margin: "auto",
          width: "100%",
          height: "100%",
          padding: "0px 100px",
          backgroundColor: "#f2f2f2",
        }}
      >
        
        <div style={{  }}>
        <Multicarousel />
        </div>
        <div style={{ marginTop: 25 }}>
          <Slider1 />
        </div>
        <div style={{ marginTop: 25 }}>
          {/* <Offer /> */}
        </div>
        <div style={{ marginTop: 25 }}>
          <HomeSliders />
        </div>
        <div style={{ marginTop: 25 }}>
          <img
            src="https://mmt.servedbyadbutler.com/getad.img/;libID=3405582"
            style={{ width: "100%", height: "80%" }}
          />
        </div>
        <div style={{ marginTop: 70 }}>
          <Details />
        </div>
      </div>
      <Qna />
      <Bottom />
    </div>
  );
}

export default Home;
