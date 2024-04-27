import axios from 'axios';
import "./hotel.css";
import React, { useEffect, useState } from 'react';
import { getHotelDetails } from '../Constant/constant';
import "./hotel.css";
import { filterHotels, headerNavlist, searchHotels, suggetionFilterArray } from "../Constant/constant";
import { useContext } from "react";
import { AppContext } from "../ContextAPI/AppContext";
import { useNavigate, useParams } from "react-router";
import { memo } from "react";
import { HotelListArray, cityListArray, getHotelName, hotelPerNightPrice, monthNames, weekName } from "../Constant/constant";
import HotelModal from "../Modals/HotelModal";
import ShimmerLocation from "../Loader/ShimmerLocation";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { BrowserView, MobileView } from 'react-device-detect';

function HotelDetails(props) {
    const { hotelId } = useParams();
    const [hotelInfo, sethotelInfo] = useState([]);
    const { currentTravelOption, setCurrentTravelOption,token,isLogin,setIsLogin,bookingStatus, setBookingStatus,roomAndGuest, setRoomAndGuest,  } = useContext(AppContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        setCurrentTravelOption("HOTELS");
    }, []);
    const handleNav = (id) => {
        setCurrentTravelOption(id);
        navigate("/");
        window.scrollTo(0, 0);
    }
    const nextImg = () => {
        if (currentIndex < hotelInfo[0].images?.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
        else if (currentIndex === hotelInfo[0].images?.length - 1) {
            setCurrentIndex(0);
        }
    }
    const prevImg = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
        else if (currentIndex === 0) {
            setCurrentIndex(hotelInfo[0].images?.length - 1)
        }
    }

    const getval = async () => {
        setLoading(true);
        let res = await getHotelDetails(hotelId);
        sethotelInfo([res]);
        setLoading(false);
        console.log(res);
    }
    useEffect(() => {
        getval();
    }, []);
    const handleBook=(id1,id2)=>{
        if(token){
            setBookingStatus(false);
            navigate( `/hotel-review/${id1}/${id2}`)
        }
        else{
            setIsLogin({ ...isLogin, status: true });
        }
    }
    

    return (
        <main>
            <BrowserView>
                {/* <header id="showHeader" className="mb-3 overflow-hidden bg-white  headerTwo">
                    <div className="flex flex-row justify-between py-3 m-auto  alignCenter headerBox">
                        <div className="flex flex-row  alignCenter">
                            <div className="cursor-pointer  mmtlogo">

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
                        <div className="flex flex-row p-3 rounded cursor-pointer  alignCenter loginGreenBtn">
                            <span className="relative flex justify-center w-8 mr-2  alignCenter"><img className="absolute text-white " src="/img/mmtLoginLogoGreen.png" alt="" />
                            </span>
                            <span className="flex justify-between w-full text-xs text-left alignCenter">
                                <p className="font-bold ">Login or Create Account</p>
                                <span><img className="w-3  opacity-80" src="/img/downArrow.png" alt="" /></span>
                            </span>
                        </div>
                    </div>
                </header> */}
                {!loading ?
                    hotelInfo?.map((val) => {
                        return (
                            <div className='grid gap-4 pt-5  hotelDetailBox' key={val._id}>
                                <div className=''>
                                    <div className='grid w-full gap-3  hotelImageBox'>
                                        <div className='relative flex justify-center rounded-md alignCenter arrowBack'>
                                            <img onClick={prevImg} className='absolute cursor-pointer  arrowBack left-1 top-1/2 w-7 transformLeftArrow grayBlurShadow' src="/img/downArrow.png" alt="" />
                                            <img onClick={nextImg} className='absolute cursor-pointer  arrowBack right-1 top-1/2 w-7 transformRightArrow grayBlurShadow' src="/img/downArrow.png" alt="" />
                                            {/* <img className='rounded-md  grayBlurShadow' src={val?.images[currentIndex]} alt="" /> */}
                                            <LazyLoadImage className='rounded-md  mainImage grayBlurShadow' src={val?.images[currentIndex]} placeholderSrc='/img/mmtLoading.gif' />
                                        </div>
                                        <div className='grid grid-flow-row grid-cols-1 gap-2 overflow-y-scroll no-scrollbar allHotelImageBox'>
                                            {val?.images.map((image, idx) => {
                                                return <LazyLoadImage key={idx} onClick={() => { setCurrentIndex(idx) }} className='rounded-md cursor-pointer ' src={image} placeholderSrc='/img/mmtLoading.gif' />

                                            })}
                                        </div>
                                    </div>
                                    <div className='text-left '>
                                        <h1 className='text-3xl font-semibold '>{val?.name}</h1>
                                        <p className='flex text-gray-600 alignCenter'><img className='w-2 h-3 mr-1 ' src="/img/locationLogoGray.png" alt="" />{val?.location}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className='p-3 mb-4 text-left rounded-md  grayBlurShadow borderGray'>
                                        <h1 className='font-semibold '>Superior Room</h1>
                                        <div>
                                            <div className='flex justify-between'>
                                                <div>
                                                    <p>For {roomAndGuest.guest} Adults</p>
                                                    <p className='text-red-600 '>x Non-Refundable</p>
                                                    <p>✓ Rooms only</p>
                                                </div>
                                                <div className='text-right '>
                                                    <p>Per Night</p>
                                                    <h1>₹ {Math.floor(val?.avgCostPerNight)}</h1>
                                                    <p className='text-xs text-gray-500 '>+{val?.childAndExtraBedPolicy.extraBedCharge} Taxes & fees</p>
                                                </div>

                                            </div>
                                            <div className='flex justify-end'>
                                                <button onClick={()=>{window.scrollTo(500, 500);}} className='px-2 py-1 mt-2 font-bold text-center text-white rounded-full  gradientBlueBack'>View Rooms</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-between p-3 text-left rounded-md grayBlurShadow borderGray">
                                        <span className="p-2 mb-2 text-3xl font-bold text-white rounded-md  w-fit ratingBackColor">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span>
                                        <span className='mb-2 text-xl '>{val?.rating >= 4.5 ?
                                            <span className="font-bold ratingColor">Excellent</span> :
                                            val?.rating >= 3.5 ?
                                                <span className="font-bold ratingColor">Very Good </span> :
                                                val?.rating >= 2.5 ?
                                                    <span className="font-bold ratingColor"> Good </span> :
                                                    <span className="font-bold ratingColor">Average</span>
                                        }</span>

                                        <p className="font-bold text-gray-500 ">Based on <span className='text-gray-700 '>{656} Ratings</span></p>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <img className='w-32 m-auto ' src="/img/mmtLoading.gif" alt="" />}
                <section id='showRooms' className='m-auto mb-8 fullWidth borderGray'>
                    <div className='grid grid-cols-3 font-bold  bg-slate-200 borderGray'>
                        <p>ROOM</p>
                        <p>ROOM INFO</p>
                        <p>PRICE</p>
                    </div>
                    {hotelInfo[0]?.rooms?.map((val) => {
                        return (
                            <div className='grid grid-cols-3 text-left borderGray'>
                                <div className='p-5 '>
                                    <LazyLoadImage src={hotelInfo[0]?.images[0]} placeholderSrc='/img/mmtLoading.gif' />
                                </div>
                                <div className='p-3  borderLeftGray'>
                                    <h1 className='text-xl font-bold'>{val?.roomType} Room</h1>
                                    <p>Area : {val?.roomSize}sq.ft</p>
                                    <p>Bed Detail : {val?.bedDetail}</p>

                                </div>
                                <div className='p-3 borderLeftGray'>
                                    <p className='text-xs  text-slate-400'>Per Night</p>
                                    <h1 className='text-2xl font-bold'>₹ {val.costPerNight}</h1>
                                    <p className='text-sm font-semibold '>+₹ {val.costDetails.taxesAndFees} taxes & fees</p>
                                    <p className='text-blue-400 '>{val?.cancellationPolicy}</p>
                                    <button onClick={()=>{handleBook(hotelInfo[0]?._id,val._id)}} className='px-2 py-1 mt-2 font-bold text-center text-white rounded-full  gradientBlueBack'>Book Now</button>
                                </div>
                            </div>
                        );
                    })}
                </section>
            </BrowserView>
            <MobileView>
                {!loading ?
                    hotelInfo?.map((val) => {
                        return (
                            <div className='' key={val._id}>
                                <div className='relative flex justify-center py-2 alignCenter w-fit mainImage'>
                                    <img onClick={prevImg} className='absolute cursor-pointer  left-1 top-1/2 w-7 transformLeftArrow grayBlurShadow lowOpacityGrayBack' src="/img/downArrow.png" alt="" />
                                    <img onClick={nextImg} className='absolute cursor-pointer  right-1 top-1/2 w-7 transformRightArrow grayBlurShadow lowOpacityGrayBack' src="/img/downArrow.png" alt="" />
                                    {/* <img className='rounded-md  grayBlurShadow' src={val?.images[currentIndex]} alt="" /> */}
                                    <LazyLoadImage className='mb-3 rounded-md  grayBlurShadow hotelDetailMainImg' src={val?.images[currentIndex]} placeholderSrc='/img/mmtLoading.gif"' />
                                </div>
                                <div className='flex gap-2 ml-4 no-scrollbar allHotelImageBox'>
                                    {val?.images.map((image, idx) => {
                                        return (
                                            <div className=''>
                                                <LazyLoadImage onClick={() => { setCurrentIndex(idx) }} className='h-16 rounded-md cursor-pointer ' src={image} placeholderSrc='/img/mmtLoading.gif"' />
                                            </div>
                                        )

                                    })}
                                </div>
                                <div className='p-3 text-left '>
                                    <h1 className='text-xl font-semibold '>{val?.name}</h1>
                                    <p className='flex text-gray-600 alignCenter'><img className='w-2 h-3 mr-1 ' src="/img/locationLogoGray.png" alt="" />{val?.location}</p>
                                </div>
                                <div>
                                    <div className='p-3 mb-4 text-left rounded-md  grayBlurShadow borderGray'>
                                        <h1 className='font-semibold '>Superior Room</h1>
                                        <div className='flex justify-between'>
                                            <div>
                                                <p>{roomAndGuest.room} {roomAndGuest.room<2? "Room":"Rooms"} | {roomAndGuest.guest} {roomAndGuest.guest<2? "Adult":"Adults"}</p>
                                                <p className='text-red-600 '>x Non-Refundable</p>
                                                <p>✓ Rooms only</p>
                                            </div>
                                            <div className='text-right '>
                                                <p>Per Night</p>
                                                <h1>₹ {Math.floor(val?.avgCostPerNight)}</h1>
                                                <p className='text-xs text-gray-500 '>+{val?.childAndExtraBedPolicy.extraBedCharge} Taxes & fees</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-between p-3 text-left rounded-md grayBlurShadow borderGray">
                                        <span className="p-2 mb-2 text-3xl font-bold text-white rounded-md  w-fit ratingBackColor">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span>
                                        <span className='mb-2 text-xl '>{val?.rating >= 4.5 ?
                                            <span className="font-bold ratingColor">Excellent</span> :
                                            val?.rating >= 3.5 ?
                                                <span className="font-bold ratingColor">Very Good </span> :
                                                val?.rating >= 2.5 ?
                                                    <span className="font-bold ratingColor"> Good </span> :
                                                    <span className="font-bold ratingColor">Average</span>
                                        }</span>

                                        <p className="font-bold text-gray-500 ">Based on <span className='text-gray-700 '>{656} Ratings</span></p>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <img className='w-32 m-auto ' src="/img/mmtLoading.gif" alt="" />}
                <section className='m-auto fullWidth borderGray'>
                    <div className='grid grid-cols-3 font-bold  bg-slate-200 borderGray'>
                        <p>ROOM</p>
                        <p className='borderLeftGray'>ROOM INFO</p>
                        <p className='borderLeftGray'>PRICE</p>
                    </div>
                    {hotelInfo[0]?.rooms?.map((val) => {
                        return (
                            <div className='grid grid-cols-3 text-left borderGray'>
                                <div className='p-5 '>
                                    <img className='' src={hotelInfo[0]?.images[0]} alt="" />
                                </div>
                                <div className='p-3  borderLeftGray'>
                                    <h1 className='text-xl font-bold'>{val?.roomType} Room</h1>
                                    <p>Area : {val?.roomSize}</p>
                                    <p>Bed Detail : {val?.bedDetail}</p>

                                </div>
                                <div className='p-3 borderLeftGray'>
                                    <p className='text-xs  text-slate-400'>Per Night</p>
                                    <h1 className='text-2xl font-bold'>₹ {val.costPerNight}</h1>
                                    <p className='text-sm font-semibold '>+₹ {val.costDetails.taxesAndFees} taxes & fees</p>
                                    <p className='text-blue-400 '>{val?.cancellationPolicy}</p>
                                    <button onClick={()=>{handleBook(hotelInfo[0]?._id,val._id)}} className='w-full py-2 font-bold text-center text-white rounded-full  gradientBlueBack'>Book Now</button>
                                </div>
                            </div>
                        );
                    })}
                </section>
            </MobileView>
        </main>
    );
}

export default HotelDetails;