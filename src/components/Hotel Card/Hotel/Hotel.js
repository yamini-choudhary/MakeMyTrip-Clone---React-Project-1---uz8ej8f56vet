import "./Hotel.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { DoneAll } from "@mui/icons-material";
// import VerifiedIcon from "@mui/icons-material/Verified";
import { useNavigate } from "react-router-dom";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Header2 from "../../Navbar/Header2/Header2";
import HotelInputBox from "../../HotelInputBox/HotelInputBox";
// import Header from "../../Navbar/Header/Header";
import Header1 from "../../Navbar/Header1/Header1";
// import TopSection from "../../TopSection/TopSection";

const Hotel = () => {
  const [hotel, setHotel] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  function showModal(hotelId) {
    navigate(`/hotels/${hotelId}`);
  }
  const config = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDFmMTA2YThjMDQ2ZWM5NWVmNjQ5NCIsImlhdCI6MTY5ODgyMDM1OCwiZXhwIjoxNzMwMzU2MzU4fQ.6bVVRMx-QuIPvv_eDU5wTvo5z1RUHzTod7IICQARwcc",
      projectID: "9sa80czkq1na",
    },
  };
  const getApi = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://academics.newtonschool.co/api/v1/bookingportals/hotel",
        config
      );
      //   console.log("res", response);
      setHotel(response.data.data.hotels);
    } catch (error) {
      console.log("err", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getApi();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="isLoading">Loading...</div>
      ) : (
        <section>
          {/* <Header /> */}
          <Header1/>
          <HotelInputBox />
          <main className="hotel-container">
            <section className="hotel-data-show">
              <div className="right-nav">
                <h3>Available Hotels(20)</h3>
              </div>
              {hotel.length > 0 &&
                hotel.map((hotelData) => (
                  <div key={hotelData._id} className="hotel-details">
                    <div className="hotel-data-image">
                      <img src={hotelData.images[0]} alt={hotelData.name} />
                    </div>

                    <div className="hotel-left-data">
                      <div className="name-star">
                        <h1 className="hotel-name">{hotelData.name}</h1>
                        <FontAwesomeIcon className="star" icon={faStar} />
                        <FontAwesomeIcon className="star" icon={faStar} />
                        <FontAwesomeIcon className="star" icon={faStar} />
                        <FontAwesomeIcon className="star" icon={faStar} />
                        <FontAwesomeIcon className="low-star" icon={faStar} />
                      </div>
                      <p className="hotel-location">
                        <LocationOnIcon
                          style={{ fontSize: "18px" }}
                        ></LocationOnIcon>
                        {hotelData.location}
                      </p>
                      <p className="hotel-amenities">
                        {hotelData.amenities + " "}
                      </p>

                      <p className="hotel-cancellation">
                        <DoneAll
                          className="doneall"
                          style={{ fontSize: "18px" }}
                        />
                        {hotelData.rooms[0].cancellationPolicy}
                      </p>
                      <button className="hotel-bedDetail">
                        {hotelData.rooms[0].bedDetail} |{" "}
                        {hotelData.rooms[0].roomType}
                      </button>
                    </div>

                    <div className="hotel-right-data">
                      <p className="hotel-rating">{hotelData.rating}</p>
                      <h2 className="hotel-price">
                        रु {hotelData.rooms[0].price}
                      </h2>
                      <p className="hotel-cost-tax">
                        + रु {hotelData.rooms[0].costDetails.taxesAndFees} Taxes
                        & fees
                      </p>
                      <p className="per-night"> Per Night</p>
                      <button
                        className="hotel-view-btn"
                        onClick={() => showModal(hotelData._id)}
                      >
                        View Room
                      </button>
                    </div>
                  </div>
                ))}
            </section>
          </main>
        </section>
      )}
    </>
  );
};

export default Hotel;
