// import { faUser } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "./../App.js";
// import "./../../styles/Profile.css"
// import { useAuth } from "../../provider/AuthProvider.jsx";




// export const Profile = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const navigate = useNavigate();
//   const { isLoggedIn, setIsLoggedIn } = useAuth();
//   const userName = JSON.parse(sessionStorage.getItem("userName"));

//   const navigateHandler = (path) => {
//     navigate(path);
//     setIsModalVisible(false);
//   };

//   const logout = () => {
//     sessionStorage.removeItem("userToken");
//     sessionStorage.removeItem("userName");
//     setIsLoggedIn(false);
//     navigateHandler("/login");
//   };

//   return (
//     <section>
//       <section
//         className="profile-icon-container"
//         onClick={() => setIsModalVisible(!isModalVisible)}
//       >
//         <section className="profile-icon">
//           <FontAwesomeIcon className="profile-icon" icon={faUser} />
//         </section>

//         {isLoggedIn && <span className="user-name">{userName}</span>}
//       </section>
//       {isModalVisible && (
//         <section className="auth-modal">
//           {isLoggedIn ? (
//             <>
//               <button className="profile-btn" onClick={() => navigateHandler("/myProfile")}>
//                 My Profile
//               </button>
//               <button onClick={logout}>Logout</button>
//             </>
//           ) : (
//             <>
//               <button className="profile-login-btn" onClick={() => navigateHandler("/login")}>Login</button>
//               <button className="profile-signup-btn" onClick={() => navigateHandler("/signup")}>
//                 Sign Up
//               </button>
//             </>
//           )}
//         </section>
//       )}
//     </section>
//   );
// };