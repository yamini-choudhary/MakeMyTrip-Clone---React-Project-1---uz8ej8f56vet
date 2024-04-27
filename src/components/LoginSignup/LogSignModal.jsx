import React, { useContext } from 'react';
import { AppContext } from '../ContextAPI/AppContext';
import "./loginSignup.css";
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';


function LogSignModal(props) {
    const { token,setToken, isLogin, setIsLogin } = useContext(AppContext);
    const logout=()=>{
        setIsLogin({...isLogin,status:false});
        setToken(""); 
        localStorage.removeItem("mmtToken");
    }
    return (
        <>
            {!token?
            isLogin.status ?
                <div onClick={() => { setIsLogin({ ...isLogin, status: false }) }} className="fixed top-0 left-0 z-50 flex justify-center alignCenter py-9 modalBox">
                    {isLogin.page === "login" ? <LoginPage /> : <SignUpPage />}
                </div>
             : "":
             isLogin.status? <div className="fixed top-0 left-0 z-50 flex justify-center alignCenter modalBox">
                <div className='flex flex-col px-5 bg-white rounded-lg alignCenter justify-evenly w-72 h-1/4'>
                    <h1 className='text-lg font-bold '>Want to Logout?</h1>
                    <div className='grid w-full grid-cols-2 gap-2'>
                        <button onClick={() => { setIsLogin({...isLogin, status:false}) }} className='py-2 font-bold text-white bg-green-500 rounded-md '>No</button><button onClick={() => { logout() }} className='py-2 font-bold text-white bg-red-500 rounded-md '>Yes</button>
                    </div>
                </div>
            </div>:""}
        </>
    );
}

export default LogSignModal;