import { useDispatch } from "react-redux";
import "./FlightCard.scss";
import { useNavigate } from "react-router-dom";
import { bookTicket } from "../../redux/slice/ticketSlice";

const FlightCard = ({ flight }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bookHandler = () => {
    dispatch(bookTicket(flight));
    navigate(`/flights/:${flight._id}`);
  };

  return (
    <section className="flight-card-wrapper">
      <div className="flight-card">
        <div className="sec">
          <div>
            <img
              className="flight-icon"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuIuDAd9wIBFhDtoYxC_Kr1SnYcxXVjTjvjA&usqp=CAU"
            />
          </div>
          <div style={{ marginLeft: "90px" }}>
            <div className="val">{flight?.departureTime}</div>
            <div style={{ fontSize: "12px", marginTop: "12px" }}>
              {flight?.source}
            </div>
          </div>
          <div>
            <div className="duration"> 0{flight?.duration} hour</div>
            <div className="duration-line"></div>
          </div>
          <div>
            <div className="val">{flight?.arrivalTime}</div>
            <div style={{ fontSize: "12px", marginTop: "12px" }}>
              {flight?.destination}
            </div>
          </div>
        </div>
        <div className="sec">
          <div>
            <div className="ticket-price">₹ {flight?.ticketPrice}</div>
          </div>
          <button onClick={bookHandler} className="book-now">
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default FlightCard;
