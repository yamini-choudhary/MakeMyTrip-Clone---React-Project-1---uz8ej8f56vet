// import { faUser } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { useAuth } from "../../provider/AuthProvider.js";
import { BiChevronDown } from "react-icons/bi";

export const Profile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const userName = JSON.parse(sessionStorage.getItem("userName"));

  const navigateHandler = (path) => {
    navigate(path);
    setIsModalVisible(false);
  };

  const logout = () => {
    sessionStorage.removeItem("userToken");
    sessionStorage.removeItem("userName");
    setIsLoggedIn(false);
    navigateHandler("/login");
  };

  return (
    <section>
      <section
        className="profile-icon-container"
        onClick={() => setIsModalVisible(!isModalVisible)}
      >
        {isLoggedIn ? (
          <div>
            <h3 className="user-name">Hi {userName?.split(' ')?.[0]} </h3>
          </div>
        ) : (
          <div className="login">
            <img
              src="https://raw.githubusercontent.com/GitsOfVivek/MakeMyTrip-Clone/b862e8a1c392c93ab828bd47fc8b73e1aaf7e7f0/client/src/assets/img/makemytrip.svg"
              className="cropped-img"
              alt="myTrip"
            />{" "}
            <span>Login or Create Account</span>
            <BiChevronDown className="down-arrow" />
          </div>
        )}
      </section>
      {isModalVisible && (
        <section className="auth-modal">
          {isLoggedIn ? (
            <>
              <button
                className="profile-btn"
                onClick={() => navigateHandler("/myProfile")}
              >
                My Profile
              </button >
              <button className="profile-logout-btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <button
                className="profile-login-btn"
                onClick={() => navigateHandler("/login")}
              >
                Login
              </button>
              <button
                className="profile-signup-btn"
                onClick={() => navigateHandler("/signup")}
              >
                Sign Up
              </button>
            </>
          )}
        </section>
      )}
    </section>
  );
};
