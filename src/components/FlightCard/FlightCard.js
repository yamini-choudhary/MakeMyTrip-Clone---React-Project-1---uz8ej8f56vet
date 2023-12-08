import { useDispatch } from "react-redux";
import "./FlightCard.scss";
import date from "date-and-time";
import { useNavigate } from "react-router-dom";
import { bookTicket } from "../../redux/slice/ticketSlice";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
          <div>
            {/* <div>From:</div> */}
            <div className="val">{flight?.from}</div>
          </div>

          <div>
            <div className="duration">{flight?.duration}</div>
            <div className="duration-line"></div>
          </div>
          <div>
            {/* <div>To:</div> */}
            <div className="val">{flight?.to}</div>
          </div>
        </div>
        <div className="sec">
          <div>
            <div className="airline">
              <div>Departure</div>
              <FontAwesomeIcon className="departure-line" icon={faCircle} />
              <div className="">{flight?.airlineName}</div>
            </div>
            <div className="date">
              <div>
                <span>
                  {date.format(
                    new Date(flight?.departure?.departureDate),
                    `D `
                  )}
                </span>
                <p>
                  {date.format(
                    new Date(flight?.departure?.departureDate),
                    `MMM'YY,`
                  )}
                </p>
                <p>
                  {date.format(
                    new Date(flight?.departure?.departureDate),
                    `dddd`
                  )}
                </p>
              </div>
              {/* <div className="departureTime">{flight?.departure?.departureTime}</div> */}
            </div>
          </div>
          <div>
            <div className="airline">
              <div>Return</div>
              <FontAwesomeIcon className="departure-line" icon={faCircle} />
              <div className="">{flight?.airlineName}</div>
            </div>
            <div className="date">
              <div>
                <span>
                  {date.format(new Date(flight?.return?.returnDate), `D `)}
                </span>
                <p>
                  {date.format(new Date(flight?.return?.returnDate), `MMM'YY,`)}
                </p>
                <p>
                  {date.format(new Date(flight?.return?.returnDate), `dddd`)}
                </p>
              </div>
              {/* <div className="departureTime">{flight?.return?.returnTime}</div> */}
            </div>
          </div>
        </div>
        <div className="sec">
          <div>
            {/* <div>Price:</div> */}
            <div className="val">₹ {flight?.price}</div>
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