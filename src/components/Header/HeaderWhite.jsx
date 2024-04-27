import React, { useContext } from 'react';
import { headerNavlist } from '../Constant/constant';
import { Outlet, useNavigate } from 'react-router';
import { AppContext } from '../ContextAPI/AppContext';
import { BrowserView, MobileView } from 'react-device-detect';
import { BrowserRouter } from 'react-router-dom';

function HeaderWhite(props) {
    const { token, setToken, nameOfUser, setNameOfUser, isLogin, setIsLogin, currentTravelOption, setCurrentTravelOption } = useContext(AppContext);
    const navigate = useNavigate();
    const handleNav = (id) => {
        setCurrentTravelOption(id);
        navigate("/");
        window.scrollTo(0, 0);
    }
    return (
        <>
            <BrowserView>
            <header id="showHeader" className="overflow-hidden bg-white  headerTwo">
                <div className="flex flex-row justify-between px-4 py-3 m-auto  alignCenter headerBox">
                    <div className="flex flex-row  alignCenter">
                        <div onClick={()=>{navigate("/"); window.scrollTo(0, 0);}} className="cursor-pointer  mmtlogo">
                            <img className=" w-28" src="/img/mmtBlueLogo.png" alt="" />
                        </div>
                        <ul className="flex flex-row gap-10 ml-8  alignCenter">
                            {headerNavlist?.map((val) => {
                                return (
                                    <li className="flex flex-col justify-between h-full cursor-pointer" onClick={() => { handleNav(val.id) }} key={val.id} id={val.id}>
                                        <img className=" w-9" src={currentTravelOption === val.id ? val.imageOn : val.imageOff} alt="" />
                                        {currentTravelOption === val.id ? <p className="text-xs font-bold  blueText">{val.name}</p> :
                                            <p className="text-xs text-gray-500 ">{val.name}</p>}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div onClick={() => { setIsLogin({ ...isLogin, status: true }) }} className={`flex flex-row alignCenter p-3 rounded cursor-pointer loginGreenBtn ${token ? "borderGray grayBlurShadow" : ""}`}>
                        <span className="relative flex justify-center w-8 mr-2  alignCenter"><img className="absolute text-white " src="/img/mmtLoginLogoGreen.png" alt="" />
                        </span>
                        <span className="flex justify-between w-full text-xs text-center alignCenter">
                            <p className="font-bold ">{token ? <h1 className=''>Hi, {nameOfUser}</h1> : "Login or Create Account"}</p>
                            <span><img className="w-3  opacity-80" src="/img/blueDownArrow.png" alt="" /></span>
                        </span>
                    </div>
                </div>
            </header>
            </BrowserView>
            <MobileView>
                <header className=" headerTwo">
                    <div className="flex flex-row justify-between px-3 py-3 m-auto  alignCenter headerBox">
                        <div className="flex flex-row  alignCenter">
                            <div onClick={()=>{navigate("/"); window.scrollTo(0, 0);}} className="cursor-pointer ">
                                <img className=" w-28" src="/img/mmtBlueLogo.png" alt="" />
                            </div>
                            {/* <ul className="flex flex-row justify-around gap-2 ml-3  alignCenter headerNavList">
                                {headerNavlist?.map((val) => {
                                    return (
                                        <li className="flex flex-col justify-center h-full cursor-pointer alignCenter" onClick={() => { handleNav(val.id) }} key={val.id} id={val.id}>
                                            <img className={val.id === "HOTELS" ? "w-4" : "w-5"} src={currentTravelOption === val.id ? val.imageOn : val.imageOff} alt="" />
                                            {currentTravelOption === val.id ? <p className="text-xs font-bold  blueText">{val.name}</p> :
                                                <p className="text-xs text-gray-500 ">{val.name}</p>}
                                        </li>
                                    )
                                })}
                            </ul> */}
                        </div>
                        <div onClick={() => { setIsLogin({ ...isLogin, status: true }) }} className="flex flex-row p-1 rounded-lg cursor-pointer  alignCenter grayBlurShadow loginGreenBtn">
                            <span className="relative flex justify-center w-8 mr-2  alignCenter"><img className="absolute text-white " src="/img/mmtLoginLogoGreen.png" alt="" />
                            </span>
                            <span className="flex justify-between w-full text-xs text-left alignCenter">
                                <p className="text-base font-bold ">{token ? <h1 className=' userNameWidth'>{nameOfUser.split(" ")[0]}</h1> : "Login"}</p>
                                <span><img className="w-3  opacity-80" src="/img/blueDownArrow.png" alt="" /></span>
                            </span> 
                        </div>
                    </div>
                </header>
            </MobileView>
            <Outlet />
        </>
    );
}

export default HeaderWhite;