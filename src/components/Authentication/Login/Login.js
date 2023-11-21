import axios from "axios";
import React, { useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";
import { getHeaderWithProjectId } from "../../../utils/service";
import "./Login.css";

export const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const { state } = useLocation();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = async (user) => {
    const config = getHeaderWithProjectId();
    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://academics.newtonschool.co/api/v1/user/login",
        { ...user, appType: "bookingportals" },
        config
      );

      const token = res.data.token;
      if (token) {
        sessionStorage.setItem("userToken", token);
        sessionStorage.setItem("userName", JSON.stringify(res.data.data.name));
        setIsLoggedIn(true);
        if (state) {
          navigate(state.prevPath);
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const userDetails = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    loginUser(userDetails);
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
              <h2>LOGIN</h2>
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
                <input type="submit" value="LOGIN" />
                {error && <p style={{ color: "red" }}>{error}</p>}
              </div>
              <h3>
                Don't have an account?
                <NavLink className="login-signup" to="/signup">
                  {" "}
                  SignUp
                </NavLink>
              </h3>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
