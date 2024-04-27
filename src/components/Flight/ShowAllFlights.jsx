
import "./flight.css";
import { filterHotels, flightCodeArray, getAirportName, getAirports, headerNavlist, searchHotels, suggetionFilterArray } from "../Constant/constant";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../ContextAPI/AppContext";
import { useNavigate, useParams } from "react-router";

import { HotelListArray, cityListArray, getHotelName, hotelPerNightPrice, monthNames, weekName } from "../Constant/constant";

import ShimmerLocation from "../Loader/ShimmerLocation";

import FlightModal from "../Modals/FlightModal";
import Calendar from "react-calendar";
import { BrowserView, MobileView } from "react-device-detect";

function ShowAllFlights(props) {
    const { from, to, weekDay } = useParams();
    const navigate = useNavigate();
    const {token, currentTravelOption, setCurrentTravelOption, hotelLocation, isModalOpen, setIsModalOpen, fromOrTo, setFromOrTo, source, setSource, setFlightArray,
        destination, setDestination, flightdate, setFlightDate, isLogin,setIsLogin,setBookingStatus } = useContext(AppContext);
    const [editFlight, setEditFlight] = useState(false);
    const [fromCity, setFromCity] = useState(from);
    const [toCity, setToCity] = useState(to);
    const [week, setWeek] = useState(weekDay);
    const [sourceModal, setSourceModal] = useState(false);
    const [destinationModal, setDestinationModal] = useState(false);
    const [flightSourceCode, setFlightSourceCode] = useState("DEL");
    const [flightDestinationCode, setFlightDestinationCode] = useState("BOM");
    const [flightDateModal, setFlightDateModal] = useState(false);
    const [listOfFlights, setListOfFlights] = useState([]);
    const [lowPrice, setLowPrice] = useState([]);
    const [nonStopPrice, setNonStopPrice] = useState("");
    const [preferPrice, setPreferPrice] = useState("");
    const [showTicketBox, setShowTicketBox] = useState("");
    const [selectedFlightDetailsNav, setSelectedFlightDetailsNav] = useState("flightDetails");
    const [loading, setLoading] = useState(false);
    const [cardLoading, setCardLoading] = useState(false);
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [day, setDay] = useState("");

    const onChange = (newDate) => {
        let chek = newDate;
        setFlightDate(chek);
        setDate(chek.getDate());
        setMonth(chek.getMonth());
        setYear(chek.getFullYear());
        setDay(chek.getDay());
        setIsModalOpen(false);
        setFlightDateModal(false);
    };
    const handleFrom = (e) => {
        e.stopPropagation();
        setDestinationModal(false);
        setFlightDateModal(false);
        setSourceModal(true);
        setIsModalOpen(true);
        setFromOrTo("from");
        document.getElementById("fromArrow").style.transform = "rotate(180deg)";
    }
    const handleTo = (e) => {
        e.stopPropagation();
        setSourceModal(false);
        setFlightDateModal(false);
        setDestinationModal(true)
        setIsModalOpen(true);
        setFromOrTo("to");
        document.getElementById("toArrow").style.transform = "rotate(180deg)";
    }
    const handleDateModal = (e) => {
        e.stopPropagation();
        setDestinationModal(false);
        setSourceModal(false);
        setFlightDateModal(true);
        setIsModalOpen(true);
    }
    useEffect(() => {
        if (!isModalOpen) {
            setSourceModal(false);
            setDestinationModal(false);
            setFlightDateModal(false);
            document.getElementById("fromArrow").style.transform = "rotate(0deg)";
            document.getElementById("toArrow").style.transform = "rotate(0deg)";
        }
    }, [isModalOpen]);
    // get all flight list
    const getSearchedFlights = async () => {
        setCardLoading(true);
        let res = await getAirports(fromCity, toCity, week);
        setPreferPrice({ price: res?.flights[0]?.ticketPrice, time: res?.flights[0]?.duration });
        let sortingRes = res?.flights.sort((a, b) => {
            return a?.ticketPrice - b?.ticketPrice;
        });
        let noStop = res?.flights?.sort((a, b) => {
            return a?.stops - b?.stops;
        });
        setNonStopPrice({ price: noStop[0]?.ticketPrice, time: noStop[0]?.duration })
        setLowPrice({ price: sortingRes[0]?.ticketPrice, time: sortingRes[0]?.duration });
        setListOfFlights(sortingRes);
        setCardLoading(false);
        console.log("list Flights", res?.flights)
    }
    const handleSearch = () => {
        setFromCity(flightSourceCode);
        setToCity(flightDestinationCode);
        setWeek(weekName[day]);
        let sortArr = ["cheapest", "nonStop", "prefer"];
        sortArr.forEach((val) => {
            document.getElementById(val)?.classList.remove("flightSort");
            document.getElementById(val + "Icon")?.classList.remove("blueBack");
        });
        document.getElementById("cheapest")?.classList.add("flightSort");
        document.getElementById("cheapestIcon")?.classList.add("blueBack");
    }
    const getFlightData = async () => {
        let res = await getAirportName();
        setFlightArray(res);
    }
    useEffect(() => {
        getSearchedFlights();
        getFlightData();
    }, [fromCity, toCity, week]);
    useEffect(() => {
        let from = flightCodeArray?.filter((val) => {
            if (source === val.city) {
                return val.code;
            }
        });
        let to = flightCodeArray?.filter((val) => {
            if (destination === val.city) {
                return val.code;
            }
        });
        setFlightSourceCode(from[0]?.code);
        setFlightDestinationCode(to[0]?.code);
        console.log(from[0]?.code, to[0]?.code);
    }, [source, destination])
    const isSticky = (e) => {
        const header = document.getElementById('showBookingBar');
        const sortBox = document.getElementById('sortBox');
        const scrollTop = window.scrollY;
        scrollTop >= 60 ? header?.classList.add('sticky') : header?.classList.remove('sticky');
        // scrollTop >= 180 ? sortBox?.classList.add('sticky') : sortBox?.classList.remove('sticky');
        // scrollTop >= 60 ? header?.classList?.add('gradientBackgroundBlue') : header.classList.remove('gradientBackgroundBlue');
        scrollTop >= 60 ? header?.classList.add('grayBlurShadow') : header.classList.remove('grayBlurShadow');

    };
    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });
    useEffect(() => {
        let date = flightdate;
        setDate(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setDay(date.getDay());
    }, []);
    const handleNav = (id) => {
        setCurrentTravelOption(id);
        navigate("/");
        window.scrollTo(0, 0);
    }
    useEffect(() => {
        setCurrentTravelOption("FLIGHTS");
    }, []);
    const nonStopHandle = async () => {
        setCardLoading(true);
        let res = await getAirports(fromCity, toCity, week);
        let noStop = res?.flights?.sort((a, b) => {
            return a?.stops - b?.stops;
        });
        console.log("nonStop", noStop);
        setNonStopPrice({ price: noStop[0]?.ticketPrice, time: noStop[0]?.duration })
        setListOfFlights(noStop);
        setCardLoading(false);
    }
    const preferHandle = async () => {
        setCardLoading(true);
        let res = await getAirports(fromCity, toCity, week);
        setListOfFlights(res?.flights);
        setCardLoading(false);
    }
    const selectSortBy = (id) => {
        let sortArr = ["cheapest", "nonStop", "prefer"];
        sortArr.forEach((val) => {
            document.getElementById(val)?.classList.remove("flightSort");
            document.getElementById(val + "Icon")?.classList.remove("blueBack");
        });
        document.getElementById(id)?.classList.add("flightSort");
        document.getElementById(id + "Icon")?.classList.add("blueBack");
        if (id === "cheapest") {
            getSearchedFlights();
        }
        else if (id === "nonStop") {
            nonStopHandle();
        }
        else if (id === "prefer") {
            preferHandle();
        }
    }
    const flightDetailsNavHandle = (navId1, navId2) => {
        setSelectedFlightDetailsNav(navId1);
        document.getElementById(navId1).classList.add("flightDetailsNav");
        document.getElementById(navId2).classList.remove("flightDetailsNav");
    }
    const handleBook=(id)=>{
        if(token){
            setBookingStatus(false); 
            navigate(`/flight-review/${id}`)
        }
        else{
            setIsLogin({ ...isLogin, status: true });
        }
    }
    return (
        <>
            <BrowserView>
                <div className=" bg-blue-50 fullHeightInVh" onClick={() => { setIsModalOpen(false); }}>
                    <div className="mb-6">
                        <div id="showBookingBar" className="flex justify-center px-6 pt-2 pb-2 text-left  alignCenter gap-9 gradientBackgroundBlue">
                            <div className="grid gap-2 rounded-lg cursor-pointer  allFlightsBookingBox">
                                <div onClick={handleFrom} className="relative px-3 py-1 rounded-lg  borderRight lightWhite">
                                    <span className="flex flex-row gap-1 text-xs text-blue-600 alignCenter">FROM <img id="fromArrow" className="w-3 h-2 mt-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {!loading ?
                                        flightCodeArray?.map((val) => {
                                            return (
                                                <>
                                                    {val?.city === source ?
                                                        <div key={val.code} className="mt-2 ">
                                                            <h1 className="text-sm font-bold text-white ">{val?.city}</h1>
                                                        </div> : ""}</>
                                            )
                                        }) : <img className='m-auto  w-7' src="/img/loadingBlue.webp" alt="" />}
                                    {sourceModal ?
                                        <div className="absolute left-0 z-20 w-64  top-10 flightModal" >
                                            <FlightModal />
                                        </div> : ""}
                                </div>
                                <div onClick={handleTo} className="relative px-3 py-1 rounded-lg  borderRight lightWhite">
                                    <span className="flex flex-row gap-1 text-xs text-blue-600 alignCenter">TO <img id="toArrow" className="w-3 h-2 mt-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {!loading ?
                                        flightCodeArray?.map((val) => {
                                            return (
                                                <>
                                                    {val?.city === destination ?
                                                        <div key={val.code} className="mt-2 ">
                                                            <h1 className="text-sm font-bold text-white ">{val?.city}</h1>
                                                        </div> : ""}</>
                                            )
                                        }) : <img className='m-auto  w-7' src="/img/loadingBlue.webp" alt="" />}
                                    {destinationModal ?
                                        <div className="absolute left-0 z-20 w-64  top-10 flightModal" >
                                            <FlightModal />
                                        </div> : ""}
                                </div>
                                <div onClick={handleDateModal} className="relative px-3 py-0 rounded-lg  borderRight lightWhite">
                                    <span className="text-xs text-blue-600 ">DEPART</span>
                                    <div className="text-white">
                                        <span className="text-sm font-extrabold ">{date} </span>
                                        <span className="font-semibold ">{monthNames[month]}'{year}, </span>
                                        <span className="">{weekName[day]}</span>
                                        {flightDateModal ?
                                             <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className="absolute right-0 z-10 w-full p-2 bg-white rounded-lg  top-10 grayBlurShadow calenderBox" >
                                             <div className="ml-1 mr-2 text-black rounded-md borderGray" onClick={(e) => { e.stopPropagation() }}>
                                                <Calendar onChange={onChange} value={flightdate} />
                                                </div>
                                            </div> : ""}
                                    </div>
                                </div>
                            </div>
                            <button onClick={handleSearch} className="h-10 px-10 my-1 text-lg font-bold text-white rounded-full  blueSearch">SEARCH</button>
                        </div>
                    </div>
                    <main className=" allCardMainBox">
                        {/* sorting */}
                        <div className="flex flex-col gap-3 mx-2 ">
                            <div id="sortBox" className="p-4 bg-white ">
                                <div className="grid grid-cols-3 gap-2 ">
                                    <div id="cheapest" onClick={() => { selectSortBy("cheapest") }} className="flex p-3 bg-gray-100 rounded-md alignCenter flightSort">
                                        <div id="cheapestIcon" className="mr-2 bg-gray-300 rounded-md  blueBack">
                                            <img className="w-10 " src="/img/cheapest.png" alt="" />
                                        </div>
                                        <div>
                                            <h1 className="font-bold text-left ">CHEAPEST</h1>
                                            <p className="text-xs ">₹ {lowPrice.price + 888} | 0{lowPrice.time}h 00m</p>
                                        </div>
                                    </div>
                                    <div id="nonStop" onClick={() => { selectSortBy("nonStop") }} className="flex p-3 text-left bg-gray-100 rounded-md alignCenter">
                                        <div id="nonStopIcon" className="mr-2 bg-gray-300 rounded-md ">
                                            <img className="w-10 " src="/img/fastest.png" alt="" />
                                        </div>
                                        <div>
                                            <h1 className="font-bold text-left ">NON STOP FIRST</h1>
                                            <p className="text-xs ">₹ {nonStopPrice.price + 888} | 0{nonStopPrice.time}h 00m</p>
                                        </div>
                                    </div>
                                    <div id="prefer" onClick={() => { selectSortBy("prefer") }} className="flex p-3 text-left bg-gray-100 rounded-md alignCenter">
                                        <div id="preferIcon" className="mr-2 bg-gray-300 rounded-md ">
                                            <img className="w-10 " src="/img/populer.png" alt="" />
                                        </div>
                                        <div>
                                            <h1 className="font-bold text-left ">YOU MAY PREFER</h1>
                                            <p className="text-xs ">₹ {preferPrice.price + 888} | 0{preferPrice.time}h 00m</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* flight cards div */}
                            {!cardLoading ?
                                listOfFlights?.map((val) => {
                                    return (
                                        <div>
                                            <div className="px-3 pt-5 bg-white ">
                                                <div className="text-right ">
                                                    <button onClick={() => { handleBook(val._id); }} className='w-1/6 px-2 py-1 font-bold text-center text-white rounded-full  gradientBlueBack'>Book Now</button>
                                                </div>
                                                <div className="flex justify-around gap-3 p-4 alignCenter">
                                                    <div className="flex text-left">
                                                        <img className="w-10 h-10 mr-1 " src="/img/flightLogo.jpg" alt="" />
                                                        <div>
                                                            <h1 className="text-xl font-bold ">IndiGo</h1>
                                                            <p className="text-gray-400  flightIdText">{val.flightID}</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h1 className="text-xl font-bold ">{val.departureTime}</h1>
                                                        <p className="text-xs ">{flightCodeArray?.map((val)=>{
                                                            return (
                                                                val.code === fromCity?
                                                                <span>{val.city}</span>:""
                                                            );
                                                        })}</p>
                                                    </div>
                                                    <div>
                                                        <p className="mb-2 text-xs ">0{val.duration} h 00 m</p>
                                                        <div className=" w-full h-0.5 bg-green-500"></div>
                                                        <p className="mt-1 text-xs font-semibold text-gray-500 ">{val.stops != 0 ? val.stops + " stop" : "Non stop"}</p>
                                                    </div>
                                                    <div>
                                                        <h1 className="text-xl font-bold ">{val.arrivalTime}</h1>
                                                        <p className="text-xs ">{flightCodeArray?.map((val)=>{
                                                            return (
                                                                val.code === toCity?
                                                                <span>{val.city}</span>:""
                                                            );
                                                        })}</p>
                                                    </div>
                                                    <div>
                                                        <h1 className="text-xl font-bold ">₹ {val.ticketPrice + 888}</h1>
                                                        <p className="text-xs text-gray-400 ">per person</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="flex justify-center py-1 text-sm  alignCenter bg-red-50"><div className="w-2 h-2 bg-red-400 rounded-full "></div> Get Rs 100 off using MMTBONUS</p>
                                                </div>
                                                <p onClick={() => { showTicketBox === val._id ? setShowTicketBox("") : setShowTicketBox(val._id) }} className="py-3 text-xs text-right cursor-pointer  blueText">{showTicketBox === val._id ? "Hide" : "Show"} Flight Details</p>
                                            </div>
                                            {showTicketBox === val._id ?
                                                <>
                                                    <div className="p-5  showFlightDetailsBox">
                                                        <div className="flex mb-4 text-xs bg-white cursor-pointer w-fit">
                                                            <h1 id="flightDetails" onClick={() => { flightDetailsNavHandle("flightDetails", "fareSummary") }} className="px-3 py-1  flightDetailsNav">FLIGHT DETAILS</h1>
                                                            <h1 id="fareSummary" onClick={() => { flightDetailsNavHandle("fareSummary", "flightDetails") }} className="px-3 py-1 ">FARE SUMMARY</h1>
                                                        </div>
                                                        {selectedFlightDetailsNav === "flightDetails" ?
                                                            <div className="rounded-md borderGray">
                                                                <h1 className="px-2 py-3 font-bold text-left  borderBottomGray">{source} to {destination} , {date} {monthNames[month]}</h1>
                                                                <div className="flex p-2 text-sm alignCenter">
                                                                    <img className="mr-1  w-7 h-7" src="/img/flightLogo.jpg" alt="" />
                                                                    <h1 className="mr-1 font-bold ">IndiGo</h1>
                                                                    <p className="text-gray-400 ">{val.flightID}</p>
                                                                </div>
                                                                <div className="flex justify-between p-2 text-left">
                                                                    <div>
                                                                        <h1 className="text-xl font-bold ">{val.arrivalTime}</h1>
                                                                        <p className="mb-3 text-xs font-bold ">{weekDay}, {date} {monthNames[month]} {year}</p>
                                                                        <p className="text-xs text-gray-600 ">Terminal 2</p>
                                                                        <p className="text-xs ">{source}, India</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="mb-2 text-xs ">02 h 10 m</p>
                                                                        <div className=" w-full h-0.5 bg-green-500"></div>
                                                                    </div>
                                                                    <div>
                                                                        <h1 className="text-xl font-bold ">{val.departureTime}</h1>
                                                                        <p className="mb-3 text-xs font-bold ">{weekDay}, {date} {monthNames[month]} {year}</p>
                                                                        <p className="text-xs text-gray-600 ">Terminal 2</p>
                                                                        <p className="text-xs ">{destination}, India</p>
                                                                    </div>
                                                                    <div>
                                                                        <h1 className="font-bold ">BAGGAGE:</h1>
                                                                        <p className="text-xs text-gray-600 ">ADULT</p>
                                                                    </div>
                                                                    <div>
                                                                        <h1 className="font-bold ">CHECK IN</h1>
                                                                        <p className="text-xs text-gray-600 ">15 Kgs (1 piece only)</p>
                                                                    </div>
                                                                    <div>
                                                                        <h1 className="font-bold ">CABIN</h1>
                                                                        <p className="text-xs text-gray-600 ">7 Kgs (1 piece only)</p>
                                                                    </div>
                                                                </div>
                                                            </div> :
                                                            <div className="pb-4 rounded-md borderGray">
                                                                <h1 className="px-2 py-3 font-bold text-left  borderBottomGray">Fare breakup</h1>
                                                                <div>
                                                                    <table className="text-left ">
                                                                        <tr>
                                                                            <th className="font-medium ">TOTAL</th>
                                                                            <th className="font-medium ">₹ {val.ticketPrice + 888}</th>
                                                                        </tr>
                                                                        <tr className="text-xs text-gray-400 ">
                                                                            <td>Base Fare</td>
                                                                            <td>₹ {val.ticketPrice}</td>
                                                                        </tr>
                                                                        <tr className="text-xs text-gray-400 ">
                                                                            <td>Surcharges</td>
                                                                            <td>₹ 888</td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </div>}
                                                    </div></>
                                                : ""
                                            }
                                        </div>
                                    );
                                }) : <img className='w-32 m-auto ' src="/img/mmtLoading.gif" alt="" />}
                        </div>
                    </main>
                </div>
            </BrowserView>
            <MobileView>
                <div className="relative  bg-blue-50 fullHeightInVh" onClick={() => { setIsModalOpen(false); }}>
                    {editFlight ?
                        <div className="absolute top-0 z-20 w-full  fullHeightInVh">
                            <div className="mb-6 ">
                                <div id="showBookingBar" className="px-2 py-1 text-left bg-gray-100 fullHeightInVh">
                                    <p onClick={() => { setEditFlight(false); }} className="py-3 text-right text-blue-600 ">Cancel</p>
                                    <div className="gap-2 rounded-lg cursor-pointer ">
                                        <div onClick={(e) => { handleFrom(e) }} className="relative px-3 py-2 mb-3 bg-white rounded-lg ">
                                            <span className="flex flex-row gap-1 text-xs text-blue-600 alignCenter">FROM <img id="fromArrow" className="w-3 h-2 mt-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                            {!loading ?
                                                flightCodeArray?.map((val) => {
                                                    return (
                                                        <>
                                                            {val?.city === source ?
                                                                <div key={val.code} className="">
                                                                    <h1 className="font-bold ">{val?.city}</h1>
                                                                </div> : ""}</>
                                                    )
                                                }) : <ShimmerLocation />}
                                            {sourceModal ?
                                                <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className="fixed top-0 left-0 z-40 w-full bg-white  fullHeightInVh flightModal" >
                                                    <div className='flex justify-end p-5 bg-white rounded-full cursor-pointer '><img className='w-3 ' src="/img/cancel.png" alt="" /></div>
                                                    <div onClick={(e) => { e.stopPropagation() }}>
                                                        <FlightModal />
                                                    </div>
                                                </div> : ""}
                                        </div>
                                        <div onClick={handleTo} className="relative px-3 py-2 mb-3 bg-white rounded-lg  borderRight">
                                            <span className="flex flex-row gap-1 text-xs text-blue-600 alignCenter">TO <img id="toArrow" className="w-3 h-2 mt-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                            {!loading ?
                                                flightCodeArray?.map((val) => {
                                                    return (
                                                        <>
                                                            {val?.city === destination ?
                                                                <div key={val.code} className="">
                                                                    <h1 className="font-bold ">{val?.city}</h1>
                                                                </div> : ""}</>
                                                    )
                                                }) : <ShimmerLocation />}
                                            {destinationModal ?
                                                <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className="fixed top-0 left-0 z-40 w-full bg-white  fullHeightInVh flightModal" >
                                                    <div className='flex justify-end p-5 bg-white rounded-full cursor-pointer '><img className='w-3 ' src="/img/cancel.png" alt="" /></div>
                                                    <div onClick={(e) => { e.stopPropagation() }}>
                                                        <FlightModal />
                                                    </div>
                                                </div> : ""}
                                        </div>
                                        <div onClick={handleDateModal} className="relative px-3 py-2 mb-3 bg-white rounded-lg  borderRight">
                                            <span className="text-xs text-blue-600 ">DEPART</span>
                                            <div className="">
                                                <span className="text-xl font-extrabold ">{date} </span>
                                                <span className="font-semibold ">{monthNames[month]}'{year}, </span>
                                                <span className="">{weekName[day]}</span>
                                                {flightDateModal ?
                                                    <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className="fixed top-0 left-0 z-40 w-full bg-white  fullHeightInVh flightModal" >
                                                        <div className='flex justify-end px-5 pt-5 bg-white rounded-full cursor-pointer '><img className='w-3 ' src="/img/cancel.png" alt="" /></div>
                                                        <h1 className="px-2 text-xl font-extrabold ">Departure</h1>
                                                        <h1 className="px-2 mb-2 font-medium "><span className="text-xl font-extrabold ">{date}</span> {monthNames[month]} {year}, {weekName[day]}</h1>
                                                        <div className="ml-1 mr-2 rounded-md borderGray" onClick={(e) => { e.stopPropagation() }}>
                                                            <Calendar onChange={onChange} value={flightdate} />
                                                        </div>
                                                    </div> : ""}
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={(e) => { handleSearch(e); setEditFlight(false); }} className="w-full px-10 py-2 my-1 text-lg font-bold text-white rounded-lg  blueSearch">SEARCH</button>
                                </div>
                            </div>
                        </div> :
                        <>
                            <div id="showBookingBar" className="px-2 py-2 bg-white ">
                                <div className="flex justify-between py-1 pl-2 bg-gray-100 rounded-md alignCenter borderGray">
                                    <div>
                                        <h1 className="flex">
                                            {flightCodeArray?.map((val) => {
                                                return (
                                                    <>
                                                        {val?.city === source ?
                                                            <div key={val.code} className="">
                                                                <h1 className="text-base font-bold ">{val?.city}-</h1>
                                                            </div> : ""}</>
                                                )
                                            })}
                                            {flightCodeArray?.map((val) => {
                                                return (
                                                    <>
                                                        {val?.city === destination ?
                                                            <div key={val.code} className="">
                                                                <h1 className="text-base font-bold ">{val?.city}</h1>
                                                            </div> : ""}</>
                                                )
                                            })}
                                        </h1>
                                        <div className="text-xs text-left text-gray-400 ">
                                            <span className="font-semibold ">{date} </span>
                                            <span className="font-semibold ">{monthNames[month]}'{year}, </span>
                                            <span className="">{weekName[day]}</span>
                                        </div>
                                    </div>
                                    <div className="p-2" onClick={(e) => { e.stopPropagation(); setEditFlight(true); console.log("hello"); }}>
                                        <img className="w-3 ml-1 " src="/img/editIcon.png" alt="" />
                                        <h2 className="text-xs text-blue-600 ">Edit</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="z-20 bg-gray-100 opacity-0 ">
                                <div className="">
                                    <div  className="w-2 text-left bg-gray-100">
                                        <div className="gap-2 rounded-lg cursor-pointer ">
                                            <div onClick={handleFrom} className="relative bg-white rounded-lg ">
                                                <span className="flex flex-row gap-1 text-sm text-blue-600 alignCenter"><img id="fromArrow" className="w-0 h-0 mt-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                            </div>
                                            <div onClick={handleTo} className="bg-white  relativerounded-lg borderRight">
                                                <span className="flex flex-row gap-1 text-sm text-blue-600 alignCenter"> <img id="toArrow" className="w-0 h-0 mt-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>}
                    {/* sorting */}
                    <div id="sortBox" className="p-1 mb-2 bg-white ">
                        <div className="grid grid-cols-3 gap-2 ">
                            <div id="cheapest" onClick={() => { selectSortBy("cheapest") }} className="flex flex-col p-1 bg-gray-100 rounded-md alignCenter flightSort">
                                <h1 className="text-sm font-bold ">CHEAPEST</h1>
                                <p className="text-xs ">₹ {lowPrice.price + 888} | 0{lowPrice.time}h 00m</p>
                            </div>
                            <div id="nonStop" onClick={() => { selectSortBy("nonStop") }} className="flex flex-col p-1 text-left bg-gray-100 rounded-md alignCenter">
                                <h1 className="text-sm font-bold ">NON STOP</h1>
                                <p className="text-xs ">₹ {nonStopPrice.price + 888} | 0{nonStopPrice.time}h 00m</p>
                            </div>
                            <div id="prefer" onClick={() => { selectSortBy("prefer") }} className="flex flex-col p-1 text-left bg-gray-100 rounded-md alignCenter">
                                <h1 className="text-sm font-bold ">PREFER</h1>
                                <p className="text-xs ">₹ {preferPrice.price + 888} | 0{preferPrice.time}h 00m</p>
                            </div>
                        </div>
                    </div>
                    <main className=" allCardMainBox">
                        <div className="flex flex-col gap-3 mx-2 ">

                            {/* flight cards div */}
                            {!cardLoading ?
                                listOfFlights?.map((val) => {
                                    return (
                                        <div key={val._id}>
                                            <div className="px-3 pt-2 bg-white rounded-lg ">

                                                <div className="flex justify-between text-left alignCenter">
                                                    <div className="flex alignCenter">
                                                        <img className="w-8 h-8 mr-1 " src="/img/flightLogo.jpg" alt="" />
                                                        <div>
                                                            <h1 className="text-lg font-bold ">IndiGo</h1>
                                                            <p className="text-gray-400  flightIdText">{val.flightID}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right ">
                                                        <button onClick={()=>{ handleBook(val._id); }} className='px-2 py-1 font-bold text-center text-white rounded-full  gradientBlueBack'>Book Now</button>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between gap-3 py-5 alignCenter">

                                                    <div>
                                                        <h1 className="text-xl font-bold ">{val.departureTime}</h1>
                                                        <p className="text-xs ">{flightCodeArray?.map((val)=>{
                                                            return (
                                                                val.code === fromCity?
                                                                <span>{val.city}</span>:""
                                                            );
                                                        })}</p>
                                                    </div>
                                                    <div>
                                                        <p className="mb-2 text-xs ">0{val.duration} h 00 m</p>
                                                        <div className=" w-full h-0.5 bg-green-500"></div>
                                                        <p className="mt-1 text-xs font-semibold text-gray-500 ">{val.stops != 0 ? val.stops + " stop" : "Non stop"}</p>
                                                    </div>
                                                    <div>
                                                        <h1 className="text-xl font-bold ">{val.arrivalTime}</h1>
                                                        <p className="text-xs ">{flightCodeArray?.map((val)=>{
                                                            return (
                                                                val.code === toCity?
                                                                <span>{val.city}</span>:""
                                                            );
                                                        })}</p>
                                                    </div>
                                                    <div>
                                                        <h1 className="text-xl font-bold ">₹ {val.ticketPrice + 888}</h1>
                                                        <p className="text-xs text-gray-400 ">per person</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="flex justify-center py-1 text-sm  alignCenter bg-red-50"><div className="w-2 h-2 bg-red-400 rounded-full "></div> Get Rs 100 off using MMTBONUS</p>
                                                </div>
                                                <p onClick={() => { showTicketBox === val._id ? setShowTicketBox("") : setShowTicketBox(val._id) }} className="py-3 text-xs text-right cursor-pointer  blueText">{showTicketBox === val._id ? "Hide" : "Show"} Flight Details</p>
                                            </div>
                                            {showTicketBox === val._id ?
                                                <>
                                                    <div className="p-5  showFlightDetailsBox">
                                                        <div className="flex mb-4 text-xs bg-white cursor-pointer w-fit">
                                                            <h1 id="flightDetails" onClick={() => { flightDetailsNavHandle("flightDetails", "fareSummary") }} className="px-3 py-1  flightDetailsNav">FLIGHT DETAILS</h1>
                                                            <h1 id="fareSummary" onClick={() => { flightDetailsNavHandle("fareSummary", "flightDetails") }} className="px-3 py-1 ">FARE SUMMARY</h1>
                                                        </div>
                                                        {selectedFlightDetailsNav === "flightDetails" ?
                                                            <div className="rounded-md borderGray">
                                                                <h1 className="px-2 py-3 font-bold text-left  borderBottomGray">{source} to {destination} , {date} {monthNames[month]}</h1>
                                                                <div className="flex p-2 text-sm alignCenter">
                                                                    <img className="mr-1  w-7 h-7" src="/img/flightLogo.jpg" alt="" />
                                                                    <h1 className="mr-1 font-bold ">IndiGo</h1>
                                                                    <p className="text-gray-400 ">{val.flightID}</p>
                                                                </div>
                                                                <div className="flex justify-between p-2 text-left">
                                                                    <div>
                                                                        <h1 className="text-base font-bold ">{val.arrivalTime}</h1>
                                                                        <p className="text-xs font-bold ">{weekDay}, {date} {monthNames[month]}</p>
                                                                        <p className="mb-3 text-xs font-bold ">{year}</p>
                                                                        <p className="text-xs text-gray-600 ">Terminal 2</p>
                                                                        <p className="text-xs ">{source}, India</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="mt-2 mb-2 text-xs ">02 h 10 m</p>
                                                                        <div className=" w-full h-0.5 bg-green-500"></div>
                                                                    </div>
                                                                    <div>
                                                                        <h1 className="text-base font-bold ">{val.departureTime}</h1>
                                                                        <p className="text-xs font-bold ">{weekDay}, {date} {monthNames[month]}</p>
                                                                        <p className="mb-3 text-xs font-bold ">{year}</p>
                                                                        <p className="text-xs text-gray-600 ">Terminal 2</p>
                                                                        <p className="text-xs ">{destination}, India</p>
                                                                    </div>
                                                                    {/* <div>
                                                                        <h1 className="font-bold ">BAGGAGE:</h1>
                                                                        <p className="text-xs text-gray-600 ">ADULT</p>
                                                                    </div> */}
                                                                    {/* <div>
                                                                        <h1 className="font-bold ">CHECK IN</h1>
                                                                        <p className="text-xs text-gray-600 ">15 Kgs (1 piece only)</p>
                                                                    </div> */}
                                                                    <div>
                                                                        <h1 className="text-sm font-bold ">CABIN</h1>
                                                                        <p className="text-xs text-gray-600 ">7 Kgs (1 piece only)</p>
                                                                    </div>
                                                                </div>
                                                            </div> :
                                                            <div className="pb-4 rounded-md borderGray">
                                                                <h1 className="px-2 py-3 font-bold text-left  borderBottomGray">Fare breakup</h1>
                                                                <div>
                                                                    <table className="text-left ">
                                                                        <tr>
                                                                            <th className="font-medium ">TOTAL</th>
                                                                            <th className="font-medium ">₹ {val.ticketPrice + 888}</th>
                                                                        </tr>
                                                                        <tr className="text-xs text-gray-400 ">
                                                                            <td>Base Fare</td>
                                                                            <td>₹ {val.ticketPrice}</td>
                                                                        </tr>
                                                                        <tr className="text-xs text-gray-400 ">
                                                                            <td>Surcharges</td>
                                                                            <td>₹ 888</td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </div>}
                                                    </div></>
                                                : ""
                                            }
                                        </div>
                                    );
                                }) : <img className='w-32 m-auto ' src="/img/mmtLoading.gif" alt="" />}
                        </div>
                    </main>
                </div>
            </MobileView>
        </>
    );
}

export default ShowAllFlights;