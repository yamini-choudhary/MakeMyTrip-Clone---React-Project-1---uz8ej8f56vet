import React, { useContext, useState } from 'react';
import { AppContext } from '../ContextAPI/AppContext';
import "./loginSignup.css";

function LoginPage(props) {
    const {closeHandler, isLogin, setIsLogin, token, setToken, nameOfUser, setNameOfUser } = useContext(AppContext);
    const [user, setUser] = useState({ email: '', password: '', "appType": "bookingportals" });

    const [emailErrorMsg, setEmailErrorMsg] = useState(false);
    const [passErrorMsg, setPassErrorMsg] = useState(false);
    const [userExistErrorMsg, setUserExistErrorMsg] = useState(false);

    const postLogin = async (e) => {
        e.preventDefault();
        if (user.password?.length >= 4 && user.email.includes("@gmail.com")) {
            try {
                let postData = await fetch("https://academics.newtonschool.co/api/v1/bookingportals/login",
                    {
                        method: "POST",
                        headers: { 'projectID': 'ywhyenbsclpi', "Content-Type": "application/json", },
                        body: JSON.stringify({ ...user }),

                    });
                let jsonData = await postData.json();
                console.log("jsonData", jsonData);
                if (jsonData.status === "success") {
                    localStorage.setItem("mmtToken", jsonData.token);
                    localStorage.setItem("mmtName", jsonData.data.name);
                    setNameOfUser(localStorage.getItem("mmtName"));
                    setToken(localStorage.getItem("mmtToken"));
                    setUser({email: '', password: '', "appType": "bookingportals" })
                    closeHandler();
                }
                else if (jsonData.status == "fail") {
                    console.log("fail", jsonData);
                    setUserExistErrorMsg(true);
                }
                clearForm();
            } catch (error) {
                console.log("Error:", error);
            }
        }
        else {
            if (!user.email.includes("@gmail.com")) {
                setEmailErrorMsg(true);
            }
            if (user.password?.length < 4) {
                setPassErrorMsg(true);
            }
        }
    }
    const clearForm = () => { 
        console.log("clearForm enter");
        document.getElementById("signupForm").reset();
      }
    const handleChange = (e) => {
        if (e.target.id === "email") {
            if (e.target.value.includes("@gmail.com")) {
                setEmailErrorMsg(false);
            }
            let update = { ...user };
            update = { ...update, email: e.target.value }
            setUser(update);
        }
        else if (e.target.id === "password") {
            if (e.target.value?.length >= 4) {
                setPassErrorMsg(false)
            }
            let update = { ...user };
            update = { ...update, password: e.target.value }
            setUser(update);
        }
    }
    console.log("setUserInfo", user);
    return (
        <div onClick={(e)=>{e.stopPropagation();}}  className='relative flex w-2/3  mx-9 signUpBox'>
            <div onClick={() => { setIsLogin({ ...isLogin, status: false }) }} className='absolute p-2 bg-white rounded-full cursor-pointer  logSignCancelBtn'><img className='w-3 ' src="/img/cancel.png" alt="" /></div>
            <img className='mt-12 mb-3 rounded-s-xl loginImg' src="/img/loginPersuassionValley.avif" alt="" />
            <div className='w-full px-3 pt-10 mt-10 bg-white  rounded-xl'>
                <div className='grid grid-cols-2 gap-3 p-2 mb-10 rounded-full grayBlurShadow'>
                    <p className='py-1 font-bold text-white rounded-full cursor-pointer gradientBlueBack prevent-select'>LOGIN ACCOUNT</p>
                    <p onClick={() => { setIsLogin({ ...isLogin, page: "signup" }) }} className='py-1 font-bold text-gray-600 rounded-full cursor-pointer  prevent-select'>SIGNUP ACCOUNT</p>
                </div>

                {userExistErrorMsg ? <div className="ml-4 text-lg font-semibold text-left text-red-600"><p>Incorrect EmailId or Password</p></div> : ""}
                <div className='w-full '>
                    <form id="signupForm" className="flex flex-col w-full gap-1 px-3 pb-3 text-left  inputBox" onSubmit={postLogin}>
                        <div>
                            <label htmlFor="username" className='font-semibold text-gray-700 '>Enter Email</label>
                            <input id="email" onChange={handleChange} className="h-10 px-3 rounded  loginsignInput inputBox" autoComplete="on" type="email" placeholder="Enter your email" />
                            {emailErrorMsg ? <span className="ml-1 text-xs font-semibold text-red-600 ">Enter Correct E-mail!!!</span> : ""}
                        </div>
                        <div>
                            <label htmlFor="username" className='font-semibold text-gray-700 '>Enter Password</label>
                            <input id="password" onChange={handleChange} className="h-10 px-3 rounded  loginsignInput" autoComplete="current-password" type="password" placeholder="Enter your password" />
                            {passErrorMsg ? <span className="ml-1 text-xs font-semibold text-red-600 ">minimum 4 character required for password!!!</span> : ""}
                        </div>
                        <button type="submit" className="py-3 mt-4 font-semibold text-white rounded-full  blueBack loginButton prevent-select">LOGIN</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;