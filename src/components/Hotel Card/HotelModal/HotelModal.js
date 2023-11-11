import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header2 from "../../Navbar/Header2/Header2";
import "./HotelModal.css"

const HotelModal = () => {
  const [hotel, setHotel] = useState({});
  const { id } = useParams();
  const config = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDFmMTA2YThjMDQ2ZWM5NWVmNjQ5NCIsImlhdCI6MTY5ODgyMDM1OCwiZXhwIjoxNzMwMzU2MzU4fQ.6bVVRMx-QuIPvv_eDU5wTvo5z1RUHzTod7IICQARwcc",
      projectID: "9sa80czkq1na",
    },
  };

  const getApi = async () => {
    try {
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel/${id}`,
        config
      );
      console.log("res", response);
      setHotel(response.data.data); // Assuming the response contains only one hotel
    } catch (error) {
      console.log("err", error);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <section className="modal">
      <Header2 />
      <div className="modal-wrapper">
      <img
          src={hotel.images && hotel.images[0]}
          alt={hotel.name}
          className="hotel-image"
        />
        <div className="hotel-details">
          <h1>Name: {hotel.name}</h1>
          <p>Location: {hotel.location}</p>
          <p>Rating: {hotel.rating}</p>
          <button className="book-now-button">Book Now</button>
        </div>
        
      </div>
    </section>
  );
};

export default HotelModal;
