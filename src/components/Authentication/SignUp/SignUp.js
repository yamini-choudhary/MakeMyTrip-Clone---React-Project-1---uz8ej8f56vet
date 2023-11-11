// import React, { useRef, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useAuth } from '../../provider/AuthProvider'
// import {getHeaderWithProjectId} from "./../../utils/service"
// import axios from 'axios';
// import "./../../styles/Signup.css"

// export const SignUp = () => {
//   const nameRef = useRef();
//   const emailRef = useRef();
//   const passwordRef = useRef();
//   const navigate = useNavigate();
//   const { setIsLoggedIn } = useAuth();

//   const createUser = async (user) => {
//     const config = getHeaderWithProjectId();
//     try {
//       const res = await axios.post(
//         "https://academics.newtonschool.co/api/v1/user/signup",
//         { ...user, },
//         config
//       );
//       console.log("res", res);
//       const token = res.data.token;
//       if (token) {
//         sessionStorage.setItem("userToken", token);
//         sessionStorage.setItem(
//           "userName",
//           JSON.stringify(res.data.data.user.name)
//         );
//         setIsLoggedIn(true);
//         navigate("/home");
//       }
//     } catch (err) {
//       console.log("Error:", err);
//     }
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     const userDetails = {
//       name: nameRef.current.value,
//       email: emailRef.current.value,
//       password: passwordRef.current.value,
//     };
//     createUser(userDetails);
//   };

//   return (
//     <>
//     <div className="form-wrapper">
//       <div className='form-image-both'>
//       <section>
//         <div className='image-contain'>
//           <img src='https://makemytrip-vivek.netlify.app/assets/loginPersuassionRoad-dc193709.avif'/>
//         </div>
//       </section>
//     <form action="" className="form-container" onSubmit={handleFormSubmit}>
//       <h2>SIGNUP</h2>
//       <div>
//         <label htmlFor="name">Name: </label>
//         <input type="text" name="name" id="name" ref={nameRef} placeholder='Name'/>
//       </div>
//       <div>
//         <label htmlFor="email">Email: </label>
//         <input type="email" name="email" id="email" ref={emailRef} placeholder='Email'/>
//       </div>
//       <div>
//         <label htmlFor="password">Password: </label>
//         <input
//           type="password"
//           name="password"
//           id="password"
//           ref={passwordRef}
//           placeholder='Password'
//         />
//       </div>
//       <div>
//         <input type="submit" value="Sign Up" />
//       </div>
//     </form>
//     </div>
//     </div>
//     </>
//   );
// };