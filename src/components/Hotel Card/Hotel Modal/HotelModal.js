import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header2 from "../../Navbar/Header2/Header2";
import { DoneAll } from "@mui/icons-material";
import "./HotelModal.css";
import { useDispatch } from "react-redux";
import { bookTicket } from "../../../redux/slice/ticketSlice";

const HotelModal = (Hotel) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bookHandler = () => {
    dispatch(bookTicket(hotel));
    navigate(`/hotels/checkout`);
  };
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
        <div className="hotel-modal">
          <div>
            <img
              src={hotel.images && hotel.images[0]}
              alt={hotel.name}
              className="hotel-modal-image"
            />
          </div>
          <h3>Standard Room, {hotel.rooms?.[0]?.bedDetail}</h3>
          <div className="hotel-modal-content"></div>
          <div className="hotel-modal-left-data">
            <p className="hotel-cancellation">
              <DoneAll className="doneall" style={{ fontSize: "18px" }} />
              {hotel.rooms?.[0]?.cancellationPolicy}
            </p>
          </div>
          <div className="hotel-modal-right-data">
            <p className="per-night"> Per Night</p>
            <p className="hotel-price">रु {hotel.rooms?.[0]?.price}</p>
            <p className="hotel-cost-tax">
              + रु {hotel.rooms?.[0]?.costDetails.taxesAndFees} Taxes & fees
            </p>
          </div>

          <button className="book-now-button" onClick={bookHandler}>BOOK THIS NOW</button>
        </div>
      </div>
      <p className="para">Discover The Best Of Luxury</p>
      <div className="image-gallary">
        <div className="outer-div">
          <div className="inner-circle">
            <img
              src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ7TpBaJ4KVSb9HxlZKxDj4izD8Mn7efeuB5GHYISk2eA1Utirw"
              alt="Your Image"
            />
          </div>
          <p>Spacious Rooms</p>
        </div>
        <div className="outer-div">
          <div className="inner-circle">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREi7iz-MgPJAcl4P3UCcUCCF972sZp0clV2bru3pZ0kjJywzNTc_8rz7bKbW0EJfwx3_Y&usqp=CAU"
              alt="Your Image"
            />
          </div>
          <p>Clever Fox Cafe</p>
        </div>
        <div className="outer-div">
          <div className="inner-circle">
            <img
              src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS4Ou3rxepaMVWWPpgb_bf0c7C6pPBPVBwOhyR9FtWtdHqExeQM"
              alt="Your Image"
            />
          </div>
          <p>Fitness Center</p>
        </div>
      </div>
    </section>
  );
};

export default HotelModal;
