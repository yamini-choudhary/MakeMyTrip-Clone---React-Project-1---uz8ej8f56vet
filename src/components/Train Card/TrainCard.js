import "./TrainCard.scss";
import date from "date-and-time";
import { bookTicket } from "../../redux/slice/ticketSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TrainCard = ({ train }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bookHandler = () => {
    dispatch(bookTicket(train));
    navigate(`/trains/:${train._id}`);
  };

  return (
    <section className="train-card-wrapper">
      <div className="train-card">
        <div className="sec">
          <div>
            <img
              className="train-icon"
              src="https://static.vecteezy.com/system/resources/previews/010/158/228/original/transport-train-icon-sign-design-free-png.png"
            />
          </div>
          <div>
            <div className="val">{train?.from}</div>
          </div>
          <div>
            <div className="duration">{train?.duration}</div>
            <div className="duration-line"></div>
          </div>
          <div>
            <div className="val">{train?.to}</div>
          </div>
        </div>
        <div className="sec">
          <div>
            <div className="airline">
              <div>Departure Date :</div>
              {/* <FontAwesomeIcon className="departure-line" icon={faCircle} /> */}
              {/* <div className="">{train?.train_number}</div> */}
            </div>
            <div className="date">
              <div>
                <span>
                  {date.format(new Date(train?.departure?.departureDate), `D `)}
                </span>
                <p>
                  {date.format(
                    new Date(train?.departure?.departureDate),
                    `MMM'YY,`
                  )}
                </p>
                <p>
                  {date.format(
                    new Date(train?.departure?.departureDate),
                    `dddd`
                  )}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="airline">
              <div>Departure Time:</div>
              {/* <FontAwesomeIcon className="departure-line" icon={faCircle} /> */}
              {/* <div className="">{train?.train_number}</div> */}
            </div>
            <div>
              {/* <div>Departure Time:</div> */}
              <div className="date">
                <div>{train?.departure?.departureTime}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="sec">
          <div>
            <div className="val">₹ {train?.price}</div>
          </div>
          <button onClick={bookHandler} className="book-now">
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrainCard;
