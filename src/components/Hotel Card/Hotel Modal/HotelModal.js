import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import Header2 from "../../Navbar/Header2/Header2";
import "./HotelModal.css";
import { useDispatch } from "react-redux";
import { bookTicket } from "../../../redux/slice/ticketSlice";
import { faCheck, faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HotelModal = (Hotel) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bookHandler = () => {
    dispatch(bookTicket(hotel));
    navigate(`/hotels/checkout`);
  };
  const [hotel, setHotel] = useState({});
  const[isLoading,setIsLoading]=useState(false);
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
      setIsLoading(true);
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel/${id}`,
        config
      );
      console.log("res", response);
      setHotel(response.data.data); // Assuming the response contains only one hotel
    } catch (error) {
      console.log("err", error);
    }finally{
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
    <section className="modal">
      <div className="modal-wrapper">
        <div className="hotel-modal-container">
          <img
            src={hotel.images && hotel.images[0]}
            alt={hotel.name}
            className="hotel-image"
          />
          <div className="hotel-modal-name">
            {hotel.name}...  {hotel.location}  <FontAwesomeIcon style={{ fontSize: "22px",marginBottom:"2px " }} icon={faStar} />
            <FontAwesomeIcon style={{ fontSize: "22px",marginBottom:"2px "}} icon={faStar} />
            <FontAwesomeIcon style={{ fontSize: "22px",marginBottom:"2px " }} icon={faStar} />
            <FontAwesomeIcon style={{ fontSize: "22px",marginBottom:"2px " }} icon={faStar} />
            <FontAwesomeIcon style={{ fontSize: "22px",marginBottom:"2px " }} icon={faStarHalfStroke}  />
          </div>
        </div>
        <div className="hotel-modal">
          <div>
            <img
              src={hotel.images && hotel.images[0]}
              alt={hotel.name}
              className="hotel-modal-image"
            />
          </div>

          <h3>Standard Room, {hotel.rooms?.[0]?.bedDetail}</h3>
          <div className="hotel-modal-content">
            <div className="hotel-modal-left-data">
              <p
                className="hotel-cancellation"
                style={{
                  color: "#17a2b8",
                  fontWeight: "600",
                  marginTop: "6px",
                }}
              >
                <FontAwesomeIcon
                  style={{
                    marginTop: "3px",
                    marginRight: "3px",
                    color: "#17a2b8",
                  }}
                  icon={faCheck}
                />
                {hotel.rooms?.[0]?.cancellationPolicy}
              </p>
              <p className="hotel-cancellation" style={{ fontWeight: "600" }}>
                <FontAwesomeIcon
                  style={{ marginTop: "3px", marginRight: "3px" }}
                  icon={faCheck}
                />
                Room With Free Cancellation
              </p>
            </div>
            <div className="hotel-modal-right-data">
              <p style={{ fontSize: "12px", padding: "2px" }}> Per Night</p>
              <p
                style={{ fontSize: "18px", fontWeight: "600", padding: "2px" }}
              >
                रु {hotel.rooms?.[0]?.price}
              </p>
              <p style={{ fontSize: "10px", padding: "2px", color: "grey" }}>
                + रु {hotel.rooms?.[0]?.costDetails.taxesAndFees} Taxes & fees
              </p>
            </div>
          </div>

          <button className="book-now-button" onClick={bookHandler}>
            BOOK THIS NOW
          </button>
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
    )}
    </>
  );
};

export default HotelModal;
