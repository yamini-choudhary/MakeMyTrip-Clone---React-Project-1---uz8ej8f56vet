import "./Header2.scss";
import { Link, NavLink } from "react-router-dom";
import { Profile } from "../../Authentication/Profile/Profile";
import { FaTrain } from "react-icons/fa";
import {
  MdOutlineFlight,
  MdOutlineMapsHomeWork,
  MdDirectionsBus,
  MdHiking,
} from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import { AiOutlineCar } from "react-icons/ai";
import { VscGraphLine } from "react-icons/vsc";

const Header2 = () => {
  return (
    <section className="header2-wrapper">
      <div className="header2">
        <Link className="logo" to={"/"}>
          <img
            src="https://github.com/GitsOfVivek/MakeMyTrip-Clone/blob/main/client/src/assets/img/logo2.png?raw=true"
            alt="logo-mmt"
          />
        </Link>
        <section className="navigation-wrapper-2">
          <div className="navigation">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to={"/flights"}
            >
              <MdOutlineFlight className="icon" />
              <span>Flights</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to={"/hotels"}
            >
              <RiHotelLine className="icon" />
              <span>Hotels</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to={"/home"}
            >
              <MdOutlineMapsHomeWork className="icon" />
              <span>Homestays</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to={"/home"}
            >
              <RiHotelLine className="icon" />
              <span>Holiday Packages</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to={"/trains"}
            >
              <FaTrain className="icon" />
              <span>Trains</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to={"/home"}
            >
              <MdDirectionsBus className="icon" />
              <span>Buses</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to={"/home"}
            >
              <AiOutlineCar className="icon" />
              <span>Cabs</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to={"/home"}
            >
              <VscGraphLine className="icon" />
              <span>Forex</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to={"/home"}
            >
              <MdHiking className="icon" />
              <span>Activities</span>
            </NavLink>
          </div>
        </section>
        <div>
          <Profile />
        </div>
      </div>
    </section>
  );
};

export default Header2;
