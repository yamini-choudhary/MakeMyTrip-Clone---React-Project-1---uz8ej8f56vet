import { memo, useContext, useEffect, useState } from "react";
import "./flight.css";
import { AppContext } from "../ContextAPI/AppContext";
import { flightCodeArray, getAirportName, monthNames, weekName } from "../Constant/constant";
import { BrowserView, MobileView } from "react-device-detect";
import TravelOptions from "../TravelOptions/TravelOptions";
import FlightModal from "../Modals/FlightModal";
import ShimmerLocation from "../Loader/ShimmerLocation";
import Calendar from "react-calendar";
import { useNavigate } from "react-router";


const Flight = (props) => {
    const { loading, } = props;
    const { flightArray, source, destination, isModalOpen, setIsModalOpen,
        setFromOrTo, setFlightDate } = useContext(AppContext);
    const [sourceModal, setSourceModal] = useState(false);
    const [destinationModal, setDestinationModal] = useState(false);
    const [flightSourceCode, setFlightSourceCode] = useState("DEL");
    const [flightDestinationCode, setFlightDestinationCode] = useState("BOM");
    const [flightDateModal, setFlightDateModal] = useState(false);
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [day, setDay] = useState("");
    const navigate = useNavigate();
    // set flight source and destination code
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
    }, [source, destination]);
    // set date
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
    //open source modal
    const handleFrom = (e) => {
        e.stopPropagation();
        setSourceModal(true);
        setDestinationModal(false);
        setFlightDateModal(false);
        setIsModalOpen(true);
        setFromOrTo("from");
        document.getElementById("fromArrow").style.transform = "rotate(180deg)";
        document.getElementById("toArrow").style.transform = "rotate(0deg)";
    }
    // open destination modal
    const handleTo = (e) => {
        e.stopPropagation();
        setDestinationModal(true);
        setSourceModal(false);
        setFlightDateModal(false);
        setIsModalOpen(true);
        setFromOrTo("to");
        document.getElementById("toArrow").style.transform = "rotate(180deg)";
        document.getElementById("fromArrow").style.transform = "rotate(0deg)";
    }
    //open date modal
    const handleDateModal = (e) => {
        e.stopPropagation();
        setDestinationModal(false);
        setSourceModal(false);
        setFlightDateModal(true);
        setIsModalOpen(true);
    }
    // close modal
    useEffect(() => {
        if (!isModalOpen) {
            setSourceModal(false);
            setDestinationModal(false);
            setFlightDateModal(false);
            document.getElementById("fromArrow").style.transform = "rotate(0deg)";
            document.getElementById("toArrow").style.transform = "rotate(0deg)";
        }
    }, [isModalOpen]);
    // set default date
    useEffect(() => {
        let date = new Date();
        setDate(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setDay(date.getDay());
    }, []);
    console.log(isModalOpen);
    return (
        <>
            <BrowserView>
                <section className="absolute flex justify-center  top-20 subNavbarBox">
                    <div className="relative flex justify-center  subNavbarBoxCover">
                        <TravelOptions />
                        <div className="px-6 pt-16 pb-12 mt-12 text-left bg-white  rounded-2xl">
                            <p className="w-full mb-2 font-bold text-center text-gray-700 ">Book International and Domestic Flights.</p>
                            <div className="relative grid w-full rounded-lg cursor-pointer  borderGray bookingBox">
                                <div onClick={handleFrom} className="relative px-6 py-3  borderRight hoverLightBlue">
                                    <span className="flex flex-row gap-1 text-gray-800 alignCenter">From <img id="fromArrow" className="w-3 h-2 mt-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {!loading ? flightArray?.map((val) => {
                                        return (
                                            <>
                                                {val?.city === source ?
                                                    <p key={val.city} className="mt-2 ">
                                                        <h1 className="text-3xl font-extrabold ">{val.city}</h1>
                                                        <p className="text-gray-800 ">{val.name}</p>
                                                    </p> : ""}</>
                                        )
                                    }) : <ShimmerLocation />}
                                    {sourceModal ?
                                        <div className="absolute left-0 z-20 w-full  top-10 flightModal" >
                                            <FlightModal />
                                        </div> : ""}
                                </div>
                                <div onClick={handleTo} className="relative px-6 py-3  borderRight hoverLightBlue">
                                    <span className="flex flex-row gap-1 text-gray-800 alignCenter">To <img id="toArrow" className="w-3 h-2 mt-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {!loading ? flightArray?.map((val) => {
                                        return (
                                            <>
                                                {val?.city === destination ?
                                                    <p key={val.name} className="mt-2 ">
                                                        <h1 className="text-3xl font-extrabold ">{val.city}</h1>
                                                        <p className="text-gray-800 ">{val.name}</p>
                                                    </p> : ""}</>
                                        )
                                    }) : <ShimmerLocation />}
                                    {destinationModal ?
                                        <div className="absolute left-0 z-20 w-full  top-10 flightModal" >
                                            <FlightModal />
                                        </div> : ""}
                                </div>
                                <div onClick={handleDateModal} className="relative px-6 py-3  hoverLightBlue">
                                    <span className="text-gray-800 ">Departure</span>
                                    <p>
                                        <span className="text-3xl font-extrabold ">{date}</span>
                                        <span className="font-semibold ">{monthNames[month]}'{year}</span>
                                        <p className="text-gray-800 ">{weekName[day]}</p>
                                    </p>
                                    {flightDateModal ?
                                        <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className="absolute right-0 z-10 w-full p-2 bg-white rounded-lg  top-10 grayBlurShadow calenderBox" >
                                            <div className="ml-1 mr-2 rounded-md borderGray" onClick={(e) => { e.stopPropagation() }}>
                                                <Calendar onChange={onChange} />
                                            </div>
                                        </div> : ""}
                                </div>
                                {/* <div className="px-6 py-3  hoverLightBlue">
                                    <span className="text-gray-800 ">Travellers & Class</span>
                                    <p>
                                        
                                    </p>
                                </div> */}
                            </div>
                            <button onClick={() => { navigate(`/flights/${flightSourceCode}/${flightDestinationCode}/${weekName[day]}`) }} className="absolute w-1/6 px-6 py-1 text-2xl font-bold text-white rounded-full  blueSearch">SEARCH</button>
                        </div>
                    </div>
                </section>
            </BrowserView>
            <MobileView>
                <section className="flex justify-center m-auto  subNavbarBox">
                    <div className="flex justify-center  subNavbarBoxCover">
                        <TravelOptions />
                        <div className="w-full px-2 pt-3 pb-6 mt-20 text-left bg-white  rounded-2xl">
                            <p className="w-full mb-2 font-bold text-center text-gray-700 ">Book International and Domestic Flights.</p>
                            <div className="w-full cursor-pointer ">
                                <div onClick={handleFrom} className="relative px-3 py-1 mb-3  borderGray hoverLightBlue">
                                    <span className="flex flex-row gap-1 text-xs text-gray-800 alignCenter">From <img id="fromArrow" className="w-3 h-2 mt-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {!loading ? flightArray?.map((val) => {
                                        return (
                                            <>
                                                {val?.city === source ?
                                                    <p key={val.city} className="">
                                                        <h1 className="text-base font-extrabold ">{val.city}</h1>
                                                        <p className="text-xs text-gray-800 ">{val.name}</p>
                                                    </p> : ""}</>
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
                                <div onClick={handleTo} className="px-3 py-1 mb-3  borderGray hoverLightBlue">
                                    <span className="flex flex-row gap-1 text-xs text-gray-800 alignCenter">To <img id="toArrow" className="w-3 h-2 mt-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {!loading ? flightArray?.map((val) => {
                                        return (
                                            <>
                                                {val?.city === destination ?
                                                    <p key={val.name} className="">
                                                        <h1 className="text-base font-extrabold ">{val.city}</h1>
                                                        <p className="text-xs text-gray-800 ">{val.name}</p>
                                                    </p> : ""}</>
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
                                <div onClick={handleDateModal} className="relative px-3 py-1 mb-4  borderGray hoverLightBlue">
                                    <span className="text-xs text-gray-800 ">Departure</span>
                                    <p>
                                        <span className="text-xl font-extrabold ">{date}</span>
                                        <span className="text-sm font-semibold ">{monthNames[month]}'{year}</span>
                                        <p className="text-sm text-gray-800 ">{weekName[day]}</p>
                                        {flightDateModal ?
                                            <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className="fixed top-0 left-0 z-40 w-full bg-white  fullHeightInVh flightModal" >
                                                <div className='flex justify-end px-5 pt-5 bg-white rounded-full cursor-pointer '><img className='w-3 ' src="/img/cancel.png" alt="" /></div>
                                                <h1 className="px-2 text-xl font-extrabold ">Departure</h1>
                                                <h1 className="px-2 mb-2 font-medium "><span className="text-xl font-extrabold ">{date}</span> {monthNames[month]} {year}, {weekName[day]}</h1>
                                                <div className="ml-1 mr-2 rounded-md " onClick={(e) => { e.stopPropagation() }}>
                                                    <Calendar onChange={onChange} />
                                                </div>
                                            </div> : ""}
                                        <p>{ }</p>
                                    </p>
                                </div>
                                {/* <div className="px-6 py-3  hoverLightBlue">
                                    <span className="text-gray-800 ">Travellers & Class</span>
                                    <p>
                                        
                                    </p>
                                </div> */}
                            </div>
                            <button onClick={() => { navigate(`/flights/${flightSourceCode}/${flightDestinationCode}/${weekName[day]}`) }} className="w-full px-6 py-2 text-xl font-bold text-white rounded-md  blueSearch">SEARCH</button>
                        </div>
                    </div>
                </section>
            </MobileView>
        </>
    )
}

export default memo(Flight);