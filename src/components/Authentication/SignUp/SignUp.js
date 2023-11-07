import React, { useRef } from 'react';
import './SignUp.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate=useNavigate();
    const config={
        headers:{
            projectID:"uz8ej8f56vet"
        }
    }
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

 async function createUser(user){
    try{
        const res=await axios.post("https://academics.newtonschool.co/api/v1/bookingportals/signup",
        {...user,appType:"bookingportals"},
        config
        );
        console.log("res",res);
        const token=res.data.token;
        if(token){
            sessionStorage.setItem("userToken",token);
            navigate("/home");
        }
    }catch(err){
        console.log("Error",err);
    }

 }
  function handleFormSubmit(e) {
    e.preventDefault();
    const userDetails = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    createUser(userDetails);
  }

  return (
    <div>
      <form action='' className='form-container' onSubmit={handleFormSubmit}>
        <h2>Sign Up</h2>
        <div>
          <label htmlFor='name'>Name:</label>
          <input type='text' name='name' id='name' ref={nameRef} />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input type='email' name='email' id='email' ref={emailRef} />
        </div>
        <div>
          <label htmlFor='password'>Pswd:</label>
          <input type='password' name='password' id='password' ref={passwordRef} />
        </div>
        <div>
          <input type='submit' value='Sign Up' />
        </div>
      </form>
    </div>
  );
}

export default SignUp;
