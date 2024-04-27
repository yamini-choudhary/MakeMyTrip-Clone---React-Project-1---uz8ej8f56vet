import { memo, useContext, useEffect, useState } from "react";
import "./hotel.css";
import { AppContext } from "../ContextAPI/AppContext";
import { HotelListArray, cityListArray, getHotelName, hotelPerNightPrice, monthNames, roomAndGuestArr, weekName } from "../Constant/constant";
import { BrowserView, MobileView } from "react-device-detect";
import TravelOptions from "../TravelOptions/TravelOptions";
import HotelModal from "../Modals/HotelModal";
import ShimmerLocation from "../Loader/ShimmerLocation";
import { useNavigate } from "react-router";
import Calendar from "react-calendar";

const Hotel = (props) => {
    const { loading, } = props;
    const { hotelLocation, isModalOpen, setIsModalOpen, hotelArray, setHotelArray, setHotelLocation, source, setSource,
        destination, setDestination, hotelInDate, setHotelInDate,
        hotelOutDate, setHotelOutDate, roomAndGuest, setRoomAndGuest, } = useContext(AppContext);

    const [sourceModal, setSourceModal] = useState(false);
    const [hotelName, setHotelName] = useState(hotelArray);
    const [hotelDateInModal, setHotelDateInModal] = useState(false);
    const [hotelDateOutModal, setHotelDateOutModal] = useState(false);
    const [roomGuestModal, setRoomGuestModal] = useState(false);
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [day, setDay] = useState("");
    const [dateOut, setDateOut] = useState("");
    const [monthOut, setMonthOut] = useState("");
    const [yearOut, setYearOut] = useState("");
    const [dayOut, setDayOut] = useState("");
    const navigate = useNavigate();

    const onChange = (newDate) => {
        let chek = newDate;
        setHotelInDate(chek);
        setDate(chek.getDate());
        setMonth(chek.getMonth());
        setYear(chek.getFullYear());
        setDay(chek.getDay());
        setIsModalOpen(false);
        setHotelDateInModal(false);
        // Add any additional logic you need when the date changes
    };
    const onChangeOut = (newDate) => {
        let chek = newDate;
        setHotelOutDate(chek);
        setDateOut(chek.getDate());
        setMonthOut(chek.getMonth());
        setYearOut(chek.getFullYear());
        setDayOut(chek.getDay());
        setIsModalOpen(false);
        setHotelDateOutModal(false);
        // Add any additional logic you need when the date changes
    };
    const handleHotel = (e) => {
        e.stopPropagation();
        setSourceModal(true);
        setIsModalOpen(true);
        setHotelDateInModal(false);
        setHotelDateOutModal(false);
        setRoomGuestModal(false);
        document.getElementById("fromArrow").style.transform = "rotate(180deg)";
    }
    useEffect(() => {
        if (!isModalOpen) {
            setSourceModal(false);
            setHotelDateInModal(false);
            setHotelDateOutModal(false);
            setRoomGuestModal(false);
            document.getElementById("fromArrow").style.transform = "rotate(0deg)";
        }
    }, [isModalOpen]);
    useEffect(() => {
        let dateIn = hotelInDate;
        let dateOut = hotelOutDate;
        setDate(dateIn.getDate());
        setMonth(dateIn.getMonth());
        setYear(dateIn.getFullYear());
        setDay(dateIn.getDay());
        setDateOut(dateOut.getDate());
        setMonthOut(dateOut.getMonth());
        setYearOut(dateOut.getFullYear());
        setDayOut(dateOut.getDay());
    }, []);
    const handleDateModal = (e) => {
        e.stopPropagation();
        setSourceModal(false);
        setHotelDateOutModal(false);
        setRoomGuestModal(false);
        setHotelDateInModal(true);
        setIsModalOpen(true);

    }
    const handleDateOutModal = (e) => {
        e.stopPropagation();
        setHotelDateOutModal(true);
        setSourceModal(false);
        setRoomGuestModal(false);
        setHotelDateInModal(false);
        setIsModalOpen(true);

    }
    const handleRoomGuestModal = (e) => {
        e.stopPropagation();
        setHotelDateOutModal(false);
        setSourceModal(false);
        setHotelDateInModal(false);
        setRoomGuestModal(true);
        setIsModalOpen(true);
    }
    const searchHotelsHandle = () => {
        navigate(`/hotels/${hotelLocation}`);
    }

    return (
        <>
            <BrowserView>
                <section className="absolute flex justify-center  top-20 subNavbarBox">
                    <div className="relative flex justify-center  subNavbarBoxCover">
                        <TravelOptions />
                        <div className="px-6 pt-16 pb-12 mt-12 text-left bg-white  rounded-2xl">
                            <p className="w-full mb-2 font-bold text-center text-gray-700 ">Book Domestic and International Property Online.</p>
                            <div className="grid w-full rounded-lg cursor-pointer  borderGray hotelBookingBox">
                                <div onClick={handleHotel} className="relative px-6 py-3  borderRight hoverLightBlue">
                                    <span className="flex flex-row gap-1 text-gray-800 alignCenter">City, Property Name Or Location <img id="fromArrow" className="w-3 h-2 mt-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>

                                    {!loading ?
                                        hotelName?.map((val) => {
                                            return (
                                                <>
                                                    {val?.name === hotelLocation ?
                                                        <div key={val._id} className="mt-2 ">
                                                            <h1 className="text-3xl font-extrabold ">{val.name}</h1>
                                                            <p className="text-gray-800 ">{val.location}</p>
                                                        </div> : ""}</>
                                            )
                                        }) : <ShimmerLocation />}
                                    {sourceModal ?
                                        <div className="absolute left-0 z-20 w-full  top-10 flightModal" >
                                            <HotelModal />
                                        </div> : ""}
                                </div>
                                <div onClick={handleDateModal} className="relative px-6 py-3  borderRight hoverLightBlue">
                                    <span className="text-gray-800 ">Check-In</span>
                                    <p>
                                        <span className="text-3xl font-extrabold ">{date}</span>
                                        <span className="font-semibold ">{monthNames[month]}'{year}</span>
                                        <p className="text-gray-800 ">{weekName[day]}</p>
                                    </p>
                                    {hotelDateInModal ?
                                        <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className="absolute right-0 z-10 w-full p-2 bg-white rounded-lg  top-10 grayBlurShadow calenderBox" >
                                            <div className="ml-1 mr-2 rounded-md borderGray" onClick={(e) => { e.stopPropagation() }}>
                                                <Calendar onChange={onChange} />
                                            </div>
                                        </div> : ""}
                                </div>
                                <div onClick={handleDateOutModal} className="relative px-6 py-3  borderRight hoverLightBlue">
                                    <span className="text-gray-800 ">Check-Out</span>
                                    <p>
                                        <span className="text-3xl font-extrabold ">{dateOut}</span>
                                        <span className="font-semibold ">{monthNames[monthOut]}'{yearOut}</span>
                                        <p className="text-gray-800 ">{weekName[dayOut]}</p>
                                    </p>
                                    {hotelDateOutModal ?
                                        <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className="absolute right-0 z-10 w-full p-2 bg-white rounded-lg  top-10 grayBlurShadow calenderBox" >
                                            <div className="ml-1 mr-2 rounded-md borderGray" onClick={(e) => { e.stopPropagation() }}>
                                                <Calendar onChange={onChangeOut} />
                                            </div>
                                        </div> : ""}
                                </div>
                                <div onClick={handleRoomGuestModal} className="relative px-6 py-3  borderRight hoverLightBlue">
                                    <span className="text-gray-800 ">Rooms & Guestes</span>
                                    <p>
                                        <span className="text-3xl font-extrabold ">{roomAndGuest.room}</span>
                                        <span className="font-semibold ">Room</span>
                                        <span className="text-3xl font-extrabold ">{roomAndGuest.guest}</span>
                                        <span className="font-semibold ">Adults</span>
                                    </p>
                                    {roomGuestModal ?
                                        <div className="absolute right-0 z-20 w-full p-2 bg-white rounded-lg  top-10 grayBlurShadow calenderBox" >
                                            <div className="p-5">
                                                <div className="flex justify-between mb-5">
                                                    <h1 className="font-bold ">Room</h1>
                                                    <select onChange={(e) => { setRoomAndGuest({ ...roomAndGuest, room: e.target.value }); }} name="" id="">
                                                        {roomAndGuestArr?.map((val, idx) => {
                                                            return idx <= 20 ? <option value={val}>{val}</option> : "";
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="flex justify-between mb-6">
                                                    <h1 className="font-bold ">Guest</h1>
                                                    <select onChange={(e) => { setRoomAndGuest({ ...roomAndGuest, guest: e.target.value }); }} name="" id="">
                                                        {roomAndGuestArr?.map((val, idx) => {
                                                            return <option value={val}>{val}</option>;
                                                        })}
                                                    </select>
                                                </div>
                                                <p className="text-xs ">Please provide right number of Guests for best options and prices.</p>
                                                <div>
                                                </div>
                                            </div>
                                        </div> : ""
                                    }
                                </div>

                            </div>
                            <button onClick={searchHotelsHandle} className="absolute w-1/6 px-6 py-1 text-2xl font-bold text-white rounded-full  blueSearch">SEARCH</button>
                        </div>
                    </div>
                </section>
            </BrowserView>
            <MobileView>
                <section className="flex justify-center m-auto  subNavbarBox">
                    <div className="flex justify-center  subNavbarBoxCover">
                        <TravelOptions />
                        <div className="w-full px-2 pt-3 pb-12 mt-20 text-left bg-white  rounded-2xl">
                            <p className="w-full mb-2 font-bold text-center text-gray-700 ">Book Domestic and International Property Online.</p>
                            <div className="w-full rounded-lg cursor-pointer ">
                                <div onClick={handleHotel} className="px-3 py-1 mb-2  borderGray hoverLightBlue">
                                    <span className="flex flex-row gap-1 text-xs text-gray-800 alignCenter ">City, Property Name Or Location <img id="fromArrow" className="w-3 h-2 mt-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {!loading ?
                                        hotelName?.map((val) => {
                                            return (
                                                <>
                                                    {val?.name === hotelLocation ?
                                                        <div key={val._id} className="">
                                                            <h1 className="text-base font-extrabold ">{val.name}</h1>
                                                            <p className="text-xs text-gray-800 ">{val.location}</p>
                                                        </div> : ""}</>
                                            )
                                        }) : <ShimmerLocation />}
                                    {sourceModal ?
                                        <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className="fixed top-0 left-0 z-40 w-full bg-white  fullHeightInVh flightModal" >
                                            <div className='flex justify-end p-5 bg-white rounded-full cursor-pointer '><img className='w-3 ' src="/img/cancel.png" alt="" /></div>
                                            <div onClick={(e) => { e.stopPropagation() }}>
                                                <HotelModal />
                                            </div>
                                        </div> : ""}
                                </div>
                                <div onClick={handleDateModal} className="relative px-3 py-1 mb-2  borderGray hoverLightBlue">
                                    <span className="text-xs text-gray-800 ">Check-In</span>
                                    <p>
                                        <span className="text-xl font-extrabold ">{date}</span>
                                        <span className="font-semibold ">{monthNames[month]}'{year}</span>
                                        <p className="text-xs text-gray-800 ">{weekName[day]}</p>
                                        {hotelDateInModal ?
                                            <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className="fixed top-0 left-0 z-40 w-full bg-white  fullHeightInVh flightModal" >
                                                <div className='flex justify-end px-5 pt-5 bg-white rounded-full cursor-pointer '><img className='w-3 ' src="/img/cancel.png" alt="" /></div>
                                                <h1 className="px-2 text-xl font-extrabold ">Check-In Date</h1>
                                                <h1 className="px-2 mb-2 font-medium "><span className="text-xl font-extrabold ">{date}</span> {monthNames[month]} {year}, {weekName[day]}</h1>
                                                <div className="ml-1 mr-2 rounded-md borderGray" onClick={(e) => { e.stopPropagation() }}>
                                                    <Calendar onChange={onChange} />
                                                </div>
                                            </div> : ""}
                                    </p>
                                </div>
                                <div onClick={handleDateOutModal} className="relative px-3 py-1 mb-2  borderGray hoverLightBlue">
                                    <span className="text-xs text-gray-800 ">Check-Out</span>
                                    <p>
                                        <span className="text-xl font-extrabold ">{dateOut}</span>
                                        <span className="font-semibold ">{monthNames[monthOut]}'{yearOut}</span>
                                        <p className="text-xs text-gray-800 ">{weekName[dayOut]}</p>
                                        {hotelDateOutModal ?
                                            <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className="fixed top-0 left-0 z-40 w-full bg-white  fullHeightInVh flightModal" >
                                                <div className='flex justify-end px-5 pt-5 bg-white rounded-full cursor-pointer '><img className='w-3 ' src="/img/cancel.png" alt="" /></div>
                                                <h1 className="px-2 text-xl font-extrabold ">Check-Out Date</h1>
                                                <h1 className="px-2 mb-2 font-medium "><span className="text-xl font-extrabold ">{date}</span> {monthNames[month]} {year}, {weekName[day]}</h1>
                                                <div className="ml-1 mr-2 rounded-md borderGray" onClick={(e) => { e.stopPropagation() }}>
                                                    <Calendar onChange={onChangeOut} />
                                                </div>
                                            </div> : ""}
                                    </p>
                                </div>
                                <div onClick={handleRoomGuestModal} className="px-3 py-1 mb-2  borderGray hoverLightBlue">
                                    <span className="text-xs text-gray-800 ">Rooms & Guestes</span>
                                    <p>
                                        <span className="text-xl font-extrabold ">{roomAndGuest.room}</span>
                                        <span className="font-semibold ">Room</span>
                                        <span className="text-xl font-extrabold ">{roomAndGuest.guest}</span>
                                        <span className="font-semibold ">Adults</span>
                                    </p>
                                    {roomGuestModal ?
                                        <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className="fixed top-0 left-0 z-40 w-full bg-white  fullHeightInVh flightModal" >
                                            <div className='flex justify-end p-5 bg-white rounded-full cursor-pointer '><img className='w-3 ' src="/img/cancel.png" alt="" /></div>
                                            <div className="rounded-md  borderblack" onClick={(e) => { e.stopPropagation() }}>
                                                <div className="p-5">
                                                    <div className="flex justify-between mb-5">
                                                        <h1 className="font-bold ">Room</h1>

                                                        <select onChange={(e) => { setRoomAndGuest({ ...roomAndGuest, room: e.target.value }); }} className="w-20 py-1 pl-3 rounded-md borderblack" name="" id="">
                                                            {roomAndGuestArr?.map((val, idx) => {
                                                                return idx <= 20 ? <option value={val}>{val}</option> : "";
                                                            })}
                                                        </select>

                                                    </div>
                                                    <div className="flex justify-between mb-6">
                                                        <h1 className="font-bold ">Guest</h1>
                                                        <select onChange={(e) => { setRoomAndGuest({ ...roomAndGuest, guest: e.target.value }); }} className="w-20 py-1 pl-3 rounded-md borderblack" name="" id="">
                                                            {roomAndGuestArr?.map((val, idx) => {
                                                                return <option value={val}>{val}</option>;
                                                            })}
                                                        </select>
                                                    </div>
                                                    <p className="text-xs ">Please provide right number of Guests for best options and prices.</p>
                                                    <div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> : ""
                                    }
                                </div>
                            </div>
                            <button onClick={searchHotelsHandle} className="w-full px-6 py-2 mt-4 text-lg font-bold text-white rounded-lg  blueSearch">SEARCH</button>
                        </div>
                    </div>
                </section>
            </MobileView>
        </>
    )
}

export default memo(Hotel);