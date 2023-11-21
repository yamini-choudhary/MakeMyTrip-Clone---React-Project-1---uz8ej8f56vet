import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";
import { getHeaderWithProjectId } from "../../../utils/service";
import axios from "axios";
// import "../Login&SignUp.css";

export const SignUp = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const createUser = async (user) => {
    const config = getHeaderWithProjectId();

    const isValidEmail = validateEmail(user.email);
    if (!isValidEmail) {
      setErrorMessage("Email is incorrect");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://academics.newtonschool.co/api/v1/user/signup",
        { ...user, appType: "bookingportals" },
        config
      );
      console.log("res", res);
      const token = res.data.token;

      if (token) {
        sessionStorage.setItem("userToken", token);
        const storedUserName = JSON.parse(sessionStorage.getItem("userName"));
        setIsLoggedIn(true);
        setIsRegistered(true);
        setErrorMessage("");
        navigate("/login");
      }
    } catch (err) {
      console.log("Error:", err);
      setIsRegistered(false);
      setErrorMessage("User already exists. Please go to Login.");
    } finally {
      setIsLoading(false);
    }
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userDetails = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    createUser(userDetails);
  };
  return (
    <>
      {isLoading ? (
        <div className="isLoading">Loading...</div>
      ) : (
        <div className="form-wrapper">
          <div className="form-image-both">
            <section>
              <div className="image-contain">
                <img src="https://makemytrip-vivek.netlify.app/assets/loginPersuassionRoad-dc193709.avif" />
              </div>
            </section>
            <form
              action=""
              className="form-container"
              onSubmit={handleFormSubmit}
            >
              <h2>SIGNUP</h2>
              {isRegistered && (
                <div style={{ color: "green" }}>Successfully Registered!</div>
              )}
              {errorMessage && (
                <div style={{ color: "red" }}>{errorMessage}</div>
              )}

              <div>
                <label className="all-label" htmlFor="name">
                  Name:{" "}
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  ref={nameRef}
                  placeholder="Name"
                />
              </div>
              <div>
                <label className="all-label" htmlFor="email">
                  Email:{" "}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  ref={emailRef}
                  placeholder="Email"
                />
              </div>
              <div>
                <label className="all-label" htmlFor="password">
                  Password:{" "}
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  ref={passwordRef}
                  placeholder="Password"
                />
              </div>
              <div>
                <input type="submit" value="SIGNUP" />
              </div>
              <h3>
                Already have an account?
                <NavLink className="login-signup" to="/login">
                  {" "}
                  Login
                </NavLink>
              </h3>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
