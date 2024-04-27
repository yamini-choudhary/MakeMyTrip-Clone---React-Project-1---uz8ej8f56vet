import { memo, useContext, useEffect, useState } from "react";
import "./train.css";
import { AppContext } from "../ContextAPI/AppContext";
import { cityListArray, monthNames, trainClassArray, weekName } from "../Constant/constant";
import { BrowserView, MobileView } from "react-device-detect";
import TravelOptions from "../TravelOptions/TravelOptions";
import TrainModal from "../Modals/TrainModal";
import { useNavigate } from "react-router";
import Calendar from "react-calendar";

function Train(props) {
    const navigate = useNavigate();
    const { trainClassCode, setTrainClassesCode,  sourceBusTrain,
        destinationBusTrain, isModalOpen, setIsModalOpen, fromOrTo, setFromOrTo, flightdate, setFlightDate } = useContext(AppContext);
    const [sourceModal, setSourceModal] = useState(false);
    const [destinationModal, setDestinationModal] = useState(false);
    const [trainDateModal, setTrainDateModal] = useState(false);
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
        setTrainDateModal(false);
        // Add any additional logic you need when the date changes
    };

    const handleFrom = (e) => {
        e.stopPropagation();
        setSourceModal(true);
        setDestinationModal(false);
        setTrainDateModal(false);
        setIsModalOpen(true);
        setFromOrTo("from");
        document.getElementById("toArrow").style.transform = "rotate(0deg)";
        document.getElementById("fromArrow").style.transform = "rotate(180deg)";
    }
    const handleTo = (e) => {
        e.stopPropagation();
        setDestinationModal(true);
        setSourceModal(false);
        setTrainDateModal(false);
        setIsModalOpen(true);
        setFromOrTo("to");
        document.getElementById("toArrow").style.transform = "rotate(180deg)";
        document.getElementById("fromArrow").style.transform = "rotate(0deg)";
    }
    const handleDate = (e) => {
        e.stopPropagation();
        setDestinationModal(false);
        setSourceModal(false);
        setTrainDateModal(true);
        setIsModalOpen(true);
    }
    useEffect(() => {
        if (!isModalOpen) {
            setSourceModal(false);
            setDestinationModal(false);
            setTrainDateModal(false);
            document.getElementById("fromArrow").style.transform = "rotate(0deg)";
            document.getElementById("toArrow").style.transform = "rotate(0deg)";
        }
    }, [isModalOpen]);
    useEffect(() => {
        let date = new Date();
        setDate(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setDay(date.getDay());
    }, []);

    return (
        <>
            <BrowserView>
                <section className="absolute flex justify-center  top-20 subNavbarBox">
                    <div className="relative flex justify-center  subNavbarBoxCover">
                        <TravelOptions />
                        <div className="px-6 pt-16 pb-12 mt-12 text-left bg-white  rounded-2xl">
                            <p className="w-full mb-2 font-bold text-center text-gray-700 ">Train Ticket Booking
                                IRCTC Authorized e-ticketing.</p>
                            <div className="grid w-full rounded-lg cursor-pointer  borderGray trainbookingBox">
                                <div onClick={handleFrom} className="relative px-6 py-3  borderRight hoverLightBlue">
                                    <span className="flex flex-row gap-1 text-gray-800 alignCenter">From <img id="fromArrow" className="w-3 h-2 mt-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {cityListArray?.map((val) => {
                                        return (
                                            <>
                                                {val?.name === sourceBusTrain ?
                                                    <p className="mt-2 ">
                                                        <h1 className="text-3xl font-extrabold ">{val.name}</h1>
                                                        <p className="text-gray-800 ">{val.location}</p>
                                                    </p> : ""}</>
                                        )
                                    })}
                                    {sourceModal ?
                                        <div className="absolute left-0 z-20 w-full  top-10 flightModal" >
                                            <TrainModal />
                                        </div> : ""}
                                </div>
                                <div onClick={handleTo} className="relative px-6 py-3  borderRight hoverLightBlue">
                                    <span className="flex flex-row gap-1 text-gray-800 alignCenter">To <img id="toArrow" className="w-3 h-2 mt-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {cityListArray?.map((val) => {
                                        return (
                                            <>
                                                {val?.name === destinationBusTrain ?
                                                    <p className="mt-2 ">
                                                        <h1 className="text-3xl font-extrabold ">{val.name}</h1>
                                                        <p className="text-gray-800 ">{val.location}</p>
                                                    </p> : ""}</>
                                        )
                                    })}
                                    {destinationModal ?
                                        <div className="absolute left-0 z-20 w-full  top-10 flightModal" >
                                            <TrainModal />
                                        </div> : ""}
                                </div>
                                <div onClick={handleDate} className="relative px-6 py-3  borderRight hoverLightBlue">
                                    <span className="text-gray-800 ">Travel Date</span>
                                    <p>
                                        <span className="text-3xl font-extrabold ">{date + 1}</span>
                                        <span className="font-semibold ">{monthNames[month]}'{year}</span>
                                        <p className="text-gray-800 ">{weekName[day - 1]}</p>
                                    </p>
                                    {trainDateModal ?
                                        <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className="absolute right-0 z-10 w-full p-2 bg-white rounded-lg  top-10 grayBlurShadow calenderBox" >
                                            <div className="ml-1 mr-2 rounded-md borderGray" onClick={(e) => { e.stopPropagation() }}>
                                            <Calendar onChange={onChange} />
                                            </div>
                                        </div> : ""}

                                </div>
                                {/* <div className="px-6 py-3  hoverLightBlue">
                                    <span className="text-gray-800 ">Class</span>
                                    <p>
                                        {trainClassArray?.map((val) => {
                                            return (
                                                <>{
                                                    val.code === trainClassCode ?
                                                        <>
                                                            <span className="text-3xl font-extrabold ">{val.code}</span>
                                                            <p className="text-gray-800 ">{val.class}</p></> : ""
                                                }</>
                                            )
                                        })}

                                    </p>
                                </div> */}
                            </div>
                            <button onClick={() => { navigate("/trains") }} className="absolute w-1/6 px-6 py-1 text-2xl font-bold text-white rounded-full  blueSearch">SEARCH</button>
                        </div>
                    </div>
                </section>
            </BrowserView>
            <MobileView>
                <section className="flex justify-center m-auto  subNavbarBox">
                    <div className="flex justify-center  subNavbarBoxCover">
                        <TravelOptions />
                        <div className="w-full px-4 pt-3 pb-4 mt-20 text-left bg-white  rounded-xl">
                            <p className="w-full mb-2 font-bold text-center text-gray-700 ">Train Ticket Booking
                                IRCTC Authorized e-ticketing.</p>
                            <div className="w-full cursor-pointer ">
                                <div onClick={handleFrom} className="w-full px-3 py-1 mb-2 rounded-lg borderGray hoverLightBlue">
                                    <span className="flex flex-row gap-1 text-xs text-gray-800 alignCenter">From <img id="fromArrow" className="w-3 h-2 mt-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {cityListArray?.map((val) => {
                                        return (
                                            <>
                                                {val?.name === sourceBusTrain ?
                                                    <p className="">
                                                        <h1 className="text-base font-extrabold ">{val.name}</h1>
                                                        <p className="text-sm text-gray-800 ">{val.location}</p>
                                                    </p> : ""}</>
                                        )
                                    })}
                                    {sourceModal ?
                                        <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className="fixed top-0 left-0 z-40 w-full bg-white  fullHeightInVh flightModal" >
                                            <div className='flex justify-end p-5 bg-white rounded-full cursor-pointer '><img className='w-3 ' src="/img/cancel.png" alt="" /></div>
                                            <div onClick={(e) => { e.stopPropagation() }}>
                                                <TrainModal />
                                            </div>
                                        </div> : ""}
                                </div>
                                <div onClick={handleTo} className="relative px-3 py-1 mb-2 rounded-lg  borderGray hoverLightBlue">
                                    <span className="flex flex-row gap-1 text-xs text-gray-800 alignCenter">To <img id="toArrow" className="w-3 h-2 mt-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {cityListArray?.map((val) => {
                                        return (
                                            <>
                                                {val?.name === destinationBusTrain ?
                                                    <p className="">
                                                        <h1 className="text-base font-extrabold ">{val.name}</h1>
                                                        <p className="text-sm text-gray-800 ">{val.location}</p>
                                                    </p> : ""}</>
                                        )
                                    })}
                                    {destinationModal ?
                                        <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className="fixed top-0 left-0 z-40 w-full bg-white  fullHeightInVh flightModal" >
                                            <div className='flex justify-end p-5 bg-white rounded-full cursor-pointer '><img className='w-3 ' src="/img/cancel.png" alt="" /></div>
                                            <div onClick={(e) => { e.stopPropagation() }}>
                                                <TrainModal />
                                            </div>
                                        </div> : ""}
                                </div>
                                <div onClick={handleDate} className="px-3 py-1 mb-2 rounded-lg  borderGray hoverLightBlue">
                                    <span className="text-xs text-gray-800 ">Travel Date</span>
                                    <p>
                                        <span className="text-xl font-extrabold ">{date}</span>
                                        <span className="text-sm font-semibold ">{monthNames[month]}'{year}</span>
                                        <p className="text-sm text-gray-800 ">{weekName[day]}</p>
                                    </p>
                                    {trainDateModal ?
                                        <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className="fixed top-0 left-0 z-40 w-full bg-white  fullHeightInVh flightModal" >
                                            <div className='flex justify-end px-5 pt-5 bg-white rounded-full cursor-pointer '><img className='w-3 ' src="/img/cancel.png" alt="" /></div>
                                            <h1 className="px-2 text-xl font-extrabold ">Travel Date</h1>
                                            <h1 className="px-2 mb-2 font-medium "><span className="text-xl font-extrabold ">{date}</span> {monthNames[month]} {year}, {weekName[day]}</h1>
                                            <div className="ml-1 mr-2 rounded-md borderGray" onClick={(e) => { e.stopPropagation() }}>
                                                <Calendar className={"m-auto"} onChange={onChange} />
                                            </div>
                                        </div> : ""}
                                </div>
                                {/* <div className="px-3 py-1 mb-2 rounded-lg borderGray hoverLightBlue">
                                    <span className="text-xs text-gray-800 ">Class</span>
                                    <p>
                                        {trainClassArray?.map((val) => {
                                            return (
                                                <>{
                                                    val.code === trainClassCode ?
                                                        <>
                                                            <span className="text-xl font-extrabold ">{val.code}</span>
                                                            <p className="text-sm text-gray-800 ">{val.class}</p></> : ""
                                                }</>
                                            )
                                        })}

                                    </p>
                                </div> */}
                            </div>
                            <button onClick={() => { navigate("/trains") }} className="w-full py-2 mt-3 text-xl font-bold text-white rounded-md  blueSearch">SEARCH</button>
                        </div>
                    </div>
                </section>
            </MobileView>
        </>
    )
}

export default memo(Train);