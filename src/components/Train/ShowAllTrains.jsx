import React, { memo, useContext, useEffect, useState } from 'react';
import { cityListArray, flightCodeArray, headerNavlist, monthNames, suggetionFilterArray, trainTickets, weekInitials, weekName } from '../Constant/constant';
import { AppContext } from '../ContextAPI/AppContext';
import { useNavigate } from 'react-router';
import ShimmerLocation from '../Loader/ShimmerLocation';
import FlightModal from '../Modals/FlightModal';
import TrainModal from '../Modals/TrainModal';
import Calendar from 'react-calendar';
import "./train.css";
import { BrowserView, MobileView } from 'react-device-detect';

function ShowAllTrains(props) {
    const navigate = useNavigate();
    const { hotelLocation, isModalOpen, setIsModalOpen, hotelArray, setHotelArray, setHotelLocation, source, setSource, fromOrTo, setFromOrTo, setFlightArray,
        destination, setDestination, currentTravelOption, sourceBusTrain,
        destinationBusTrain, setCurrentTravelOption, flightdate, setFlightDate,
        trainPassangers, setTrainPassangers } = useContext(AppContext);
    const [allTrainTickets, setAllTrainTickets] = useState(trainTickets);
    const [fromTrain, setFromTrain] = useState(sourceBusTrain);
    const [toTrain, setToTrain] = useState(destinationBusTrain);
    const [loading, setLoading] = useState(false);
    const [cardLoading, setCardLoading] = useState(false);
    const [prevCheckbox, setPrevCheckbox] = useState("");
    const [prevCheckboxTicketType, setPrevCheckboxTicketType] = useState("");
    const [editTrain, setEditTrain] = useState(false);
    const [sourceModal, setSourceModal] = useState(false);
    const [destinationModal, setDestinationModal] = useState(false);
    const [flightDateModal, setFlightDateModal] = useState(false);

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
        // Add any additional logic you need when the date changes
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
    const isSticky = () => {
        const header = document.getElementById('showBookingBar');
        const scrollTop = window.scrollY;
        scrollTop >= 60 ? header?.classList.add('sticky') : header.classList.remove('sticky');

    };
    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });
    const handleSearch = () => {
        setFromTrain(source);
        setToTrain(destination);
        setCardLoading(true);
        setTimeout(() => {
            setCardLoading(false);
        }, 300);
    }
    const filterdata = (id) => {
        setCardLoading(true);
        const filterArr = []
        document.getElementById("ac").checked = false;
        document.getElementById("nonAc").checked = false;
        document.getElementById("free").checked = false;
        document.getElementById("trip").checked = false;
        if (prevCheckbox != id) {
            document.getElementById(id).checked = true;
            if (id === "ac") {
                let arr = trainTickets?.filter((val) => {
                    return val.ac === true;
                });
                setAllTrainTickets(arr);
            }
            else if (id === "nonAc") {
                let arr = trainTickets?.filter((val) => {
                    return val.nonAc === true;
                });
                setAllTrainTickets(arr);
            }
            setPrevCheckbox(id);
        }
        else {
            document.getElementById(id).checked = false;
            setAllTrainTickets(trainTickets);
            setPrevCheckbox("");
        }
        setTimeout(() => {
            setCardLoading(false);
        }, 300);
    }
    const handleTicketType = (id) => {
        setCardLoading(true);
        document.getElementById("ac").checked = false;
        document.getElementById("nonAc").checked = false;
        document.getElementById("free").checked = false;
        document.getElementById("trip").checked = false;
        if (screen.width <= 720) {
            document.getElementById("freeTag").classList.remove("mobSortPriceBox");
            document.getElementById("tripTag").classList.remove("mobSortPriceBox");
        }
        if (prevCheckboxTicketType != id) {
            document.getElementById(id).checked = true;
            if (id === "free") {
                let arr = trainTickets?.filter((val) => {
                    return val.tripFree === true;
                });
                if (screen.width <= 720) {
                    document.getElementById("freeTag").classList.add("mobSortPriceBox");
                }
                setAllTrainTickets(arr);
            }
            else if (id === "trip") {
                let arr = trainTickets?.filter((val) => {
                    return val.tripGuarantee === true
                });
                if (screen.width <= 720) {
                    document.getElementById("tripTag").classList.add("mobSortPriceBox");
                }
                setAllTrainTickets(arr);
            }
            setPrevCheckboxTicketType(id);
        }
        else {
            document.getElementById(id).checked = false;
            setAllTrainTickets(trainTickets);
            setPrevCheckboxTicketType("");
        }
        setTimeout(() => {
            setCardLoading(false);
        }, 300);
    }
    const mobileFilterHandle = (check) => {
        if (check === "open") {
            document.getElementById("mobFilter").classList.remove("mobileFilterClose")
            document.getElementById("mobFilter").classList.add("mobileFilterOpen");
        }
        else {
            document.getElementById("mobFilter").classList.add("mobileFilterClose")
            document.getElementById("mobFilter").classList.remove("mobileFilterOpen");
        }
    }
    useEffect(() => {
        setFromTrain(source);
        setToTrain(destination);
        setCurrentTravelOption("RAILS");
        let date = flightdate;
        setDate(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setDay(date.getDay());
        setCardLoading(true);
        setTimeout(() => {
            setCardLoading(false);
        }, 600);
    }, []);

    return (
        <><BrowserView>
            <div className="h-full " onClick={() => { setIsModalOpen(false); }}>
                <div className="mb-6 ">
                    <div id="showBookingBar" className="flex justify-center px-6 pt-2 pb-2 text-left  alignCenter gap-9 grayBlurShadow gradientBackgroundBlue">
                        <div className="grid gap-2 rounded-lg cursor-pointer  allFlightsBookingBox">
                            <div onClick={handleFrom} className="relative px-3 py-1 rounded-lg  borderRight lightWhite">
                                <span className="flex flex-row gap-1 text-xs text-blue-600 alignCenter">FROM <img id="fromArrow" className="w-3 h-2 mt-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                {!loading ?
                                    flightCodeArray?.map((val) => {
                                        return (
                                            <>
                                                {val?.city === sourceBusTrain ?
                                                    <div key={val.code} className="mt-2 ">
                                                        <h1 className="text-sm font-bold text-white ">{val?.city}</h1>
                                                    </div> : ""}</>
                                        )
                                    }) : <img className='m-auto  w-7' src="/img/loadingBlue.webp" alt="" />}
                                {sourceModal ?
                                    <div className="absolute left-0 z-20 w-64  top-10 flightModal" >
                                        <TrainModal />
                                    </div> : ""}
                            </div>
                            <div onClick={handleTo} className="relative px-3 py-1 rounded-lg  borderRight lightWhite">
                                <span className="flex flex-row gap-1 text-xs text-blue-600 alignCenter">TO <img id="toArrow" className="w-3 h-2 mt-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                {!loading ?
                                    flightCodeArray?.map((val) => {
                                        return (
                                            <>
                                                {val?.city === destinationBusTrain ?
                                                    <div key={val.code} className="mt-2 ">
                                                        <h1 className="text-sm font-bold text-white ">{val?.city}</h1>
                                                    </div> : ""}</>
                                        )
                                    }) : <img className='m-auto  w-7' src="/img/loadingBlue.webp" alt="" />}
                                {destinationModal ?
                                    <div className="absolute left-0 z-20 w-64  top-10 flightModal" >
                                        <TrainModal />
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
                <main className="grid gap-2 allCardMainBox">
                    {/* filter */}
                    <aside className=" filterBox">
                        <h1 className="mb-4 text-2xl font-bold text-left ">Select Filters</h1>
                        <div className="text-left ">
                            <h1 className="mb-2 font-semibold ">Quick Filter</h1>
                            <div onClick={() => { filterdata("ac") }} className="flex mb-4 text-left alignCenter checkbox">
                                <input id='ac' type="checkbox" />
                                <label className="ml-3 ">AC</label>
                            </div>
                            <div onClick={() => { filterdata("nonAc") }} className="flex text-left alignCenter checkbox">
                                <input id='nonAc' type="checkbox" />
                                <label className="ml-3 ">Non AC</label>
                            </div>

                        </div>
                        <div className="mt-6 text-left ">
                            <h1 className="mb-2 font-semibold ">Ticket Type</h1>
                            <div onClick={() => { handleTicketType("free") }} className="flex mb-4 text-left alignCenter checkbox">
                                <input id='free' type="checkbox" />
                                <label className="ml-3 ">Free Cancellation</label>
                            </div>
                            <div onClick={() => { handleTicketType("trip") }} className="flex text-left alignCenter checkbox">
                                <input id='trip' type="checkbox" />
                                <label className="ml-3 ">Trip Guarantee</label>
                            </div>
                        </div>
                    </aside>
                    {/* flight cards div */}
                    <div className="flex flex-col mb-10 gap-7">
                        {!cardLoading ?
                            allTrainTickets?.map((val) => {
                                return (
                                    <div key={val._id} className='px-6 py-6 rounded-lg  grayBlurShadow borderGray'>
                                        <div className='flex gap-6 mb-8'>
                                            <div className='mr-8 text-left '>
                                                <h1 className='text-xl font-bold '>{val.name}</h1>
                                                <h3 className='text-xs text-gray-400 '><span className='mr-2 '>{val.trainCode}</span> | <span className='ml-2'>Departs on:</span>{val.departOn?.map((val, idx) => {
                                                    return val != weekInitials[idx] ? <span className='pl-1 font-semibold text-gray-300 '>{weekInitials[idx]}</span> : <span className='pl-1 font-semibold greenText'>{val}</span>
                                                })}</h3>
                                            </div>
                                            <div className='w-2/4 '>
                                                <div className='flex justify-between alignCenter'>
                                                    <h1 className='font-bold '>{val.arrivalTime},{weekName[day]}</h1>
                                                    <div className='h-0.5 w-12 bg-gray-300'></div>
                                                    <h3 className='text-xs font-semibold text-gray-400 '>{val.duration}</h3>
                                                    <div className='h-0.5 w-12 bg-gray-300'></div>
                                                    <h1 className='font-bold '>{val.departureTime},{val.travelDayDuration === 1 ? weekName[day + 1] : weekName[day]}</h1>
                                                </div>
                                                <div className='flex justify-between text-sm text-gray-600'>
                                                    <h1>{fromTrain}</h1>
                                                    <h1>{toTrain}</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex gap-5'>
                                            {val.availableTicket?.map((ticket) => {
                                                return (
                                                    <div onClick={() => { setTrainPassangers(1); navigate(`/train/review/${fromTrain}/${toTrain}/${val._id}/${ticket.class}`) }} className='p-3 text-left rounded-md cursor-pointer  grayBlurShadow borderGray'>
                                                        <div className='flex justify-between mb-1 font-bold alignCenter'>
                                                            <h1>{ticket.class}</h1>
                                                            <h1>₹{ticket.price}</h1>
                                                        </div>
                                                        <h3 className='text-xs text-green-500 '>AVAILABLE {ticket.seats}</h3>
                                                        <h3 className='mt-3 text-xs '>{ticket.extra}</h3>
                                                        <h4 className='pr-16 mt-1 text-xs text-gray-300 '>Updated {ticket.updated}</h4>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )
                            })
                            : <img className='w-32 m-auto ' src="/img/mmtLoading.gif" alt="" />}
                    </div>
                </main>
            </div>
        </BrowserView>
            <MobileView>
                <div className='fixed bottom-0 flex justify-around w-full gap-2 px-3 py-3 text-xs font-medium text-white bg-black  rounded-t-xl'>
                    <div id='free' onClick={() => { handleTicketType("free") }} className='flex justify-center gap-3 px-2 py-1 rounded-lg cursor-pointer alignCenter filterblackBack '>
                        <h2 id='freeTag'>Free Cencellation</h2>
                    </div>
                    <div id='trip' onClick={() => { handleTicketType("trip") }} className='flex justify-center gap-3 px-2 py-1 rounded-lg cursor-pointer alignCenter filterblackBack '>
                        <h2 id='tripTag'>Trip Guarantee</h2>
                    </div>
                    <div className='px-2 rounded-md filterblackBack' onClick={() => { mobileFilterHandle("open") }}>
                        <img src="/img/busFilter.png" alt="" />
                    </div>
                </div>
                <div className="h-full pb-8 " onClick={() => { setIsModalOpen(false); }}>
                    {editTrain ?
                        <div className="absolute top-0 z-20 w-full  fullHeightInVh">
                            <div className="mb-6 ">
                                <div id="showBookingBar" className="px-6 py-4 text-left bg-gray-100 fullHeightInVh">
                                    <p onClick={() => { setEditTrain(false); }} className="py-2 text-right text-blue-600 ">Cancel</p>
                                    <div className="gap-2 rounded-lg cursor-pointer ">
                                        <div onClick={handleFrom} className="relative px-3 py-2 mb-3 bg-white rounded-lg ">
                                            <span className="flex flex-row gap-1 text-sm text-blue-600 alignCenter">FROM <img id="fromArrow" className="w-3 h-2 mt-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                            {!loading ?
                                                flightCodeArray?.map((val) => {
                                                    return (
                                                        <>
                                                            {val?.city === source ?
                                                                <div key={val.code} className="">
                                                                    <h1 className="text-xl font-bold">{val?.city}</h1>
                                                                </div> : ""}</>
                                                    )
                                                }) : <ShimmerLocation />}
                                            {sourceModal ?
                                                <div className="absolute left-0 z-20 w-64  top-8 flightModal" >
                                                    <TrainModal />
                                                </div> : ""}
                                        </div>
                                        <div onClick={handleTo} className="relative px-3 py-2 mb-3 bg-white rounded-lg ">
                                            <span className="flex flex-row gap-1 text-sm text-blue-600 alignCenter">TO <img id="toArrow" className="w-3 h-2 mt-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                            {!loading ?
                                                flightCodeArray?.map((val) => {
                                                    return (
                                                        <>
                                                            {val?.city === destination ?
                                                                <div key={val.code} className="">
                                                                    <h1 className="text-xl font-bold">{val?.city}</h1>
                                                                </div> : ""}</>
                                                    )
                                                }) : <ShimmerLocation />}
                                            {destinationModal ?
                                                <div className="absolute left-0 z-20 w-64  top-8 flightModal" >
                                                    <TrainModal />
                                                </div> : ""}
                                        </div>
                                        <div onClick={handleDateModal} className="relative px-3 py-2 mb-3 bg-white rounded-lg ">
                                            <span className="text-sm text-blue-600 ">DEPART</span>
                                            <div className="">
                                                <span className="text-xl font-extrabold ">{date} </span>
                                                <span className="font-semibold ">{monthNames[month]}'{year}, </span>
                                                <span className="">{weekName[day]}</span>
                                                {flightDateModal ?
                                                    <div onClick={() => { setIsModalOpen(false); }} className="absolute left-0 z-20 w-full p-2 text-black bg-white rounded-lg  top-8 grayBlurShadow calenderBox" >
                                                        <Calendar onChange={onChange} value={flightdate} />
                                                    </div> : ""}
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={(e) => { handleSearch(e); setEditTrain(false); }} className="w-full px-10 py-2 my-1 text-lg font-bold text-white rounded-lg  blueSearch">SEARCH</button>
                                </div>
                            </div>
                        </div> :
                        <>
                            <div id="showBookingBar" className="px-2 py-2 mb-3 bg-white rounded-b-lg ">
                                <div className="flex justify-between py-1 pl-2 bg-gray-100 rounded-md alignCenter borderGray">
                                    <div>
                                        <h1 className="flex">
                                            {cityListArray?.map((val) => {
                                                return (
                                                    <>
                                                        {val?.name === source ?
                                                            <div key={val.name} className="">
                                                                <h1 className="text-xl font-bold ">{val?.name}-</h1>
                                                            </div> : ""}</>
                                                )
                                            })}
                                            {cityListArray?.map((val) => {
                                                return (
                                                    <>
                                                        {val?.name === destination ?
                                                            <div key={val.name} className="">
                                                                <h1 className="text-xl font-bold ">{val?.name}</h1>
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
                                    <div className="p-2" onClick={(e) => { e.stopPropagation(); setEditTrain(true); }}>
                                        <img className="w-3 ml-1 " src="/img/editIcon.png" alt="" />
                                        <h2 className="text-xs text-blue-600 ">Edit</h2>
                                    </div>
                                </div>
                            </div>
                            <span id="fromArrow"></span>
                            <span id="toArrow" > </span>
                        </>
                    }
                    <main className="gap-2  allCardMainBox">
                        {/* filter */}
                        <div onClick={() => { mobileFilterHandle("close"); }} id="mobFilter" className="fixed top-0 z-20 w-full fullHeightInVh lowOpacityGrayBack mobileFilterClose ">
                            <aside className="w-3/4 p-4 bg-white rounded-lg  filterBox fullHeightInVh grayBlurShadow">
                                <h1 className="mb-4 text-2xl font-bold text-left ">Select Filters</h1>
                                <div className="text-left ">
                                    <h1 className="mb-2 font-semibold ">Quick Filter</h1>
                                    <div onClick={() => { filterdata("ac") }} className="flex mb-4 text-left alignCenter checkbox">
                                        <input id='ac' type="checkbox" />
                                        <label className="ml-3 ">AC</label>
                                    </div>
                                    <div onClick={() => { filterdata("nonAc") }} className="flex text-left alignCenter checkbox">
                                        <input id='nonAc' type="checkbox" />
                                        <label className="ml-3 ">Non AC</label>
                                    </div>

                                </div>
                                {/* <div className="mt-6 text-left ">
                                    <h1 className="mb-2 font-semibold ">Ticket Type</h1>
                                    <div onClick={() => { handleTicketType("free") }} className="flex mb-4 text-left alignCenter checkbox">
                                        <input id='free' type="checkbox" />
                                        <label className="ml-3 ">Free Cancellation</label>
                                    </div>
                                    <div onClick={() => { handleTicketType("trip") }} className="flex text-left alignCenter checkbox">
                                        <input id='trip' type="checkbox" />
                                        <label className="ml-3 ">Trip Guarantee</label>
                                    </div>
                                </div> */}
                            </aside>
                        </div>
                        {/* flight cards div */}
                        <div className="flex flex-col mb-10 gap-7">
                            {!cardLoading ?
                                allTrainTickets?.map((val) => {
                                    return (
                                        <div key={val._id} className='px-2 pt-2 pb-4 rounded-lg  grayBlurShadow borderGray'>
                                            <div className='mb-3 '>
                                                <div className='mb-3 text-left '>
                                                    <h1 className='text-2xl font-bold '>{val.name}</h1>
                                                    <h3 className='text-xs text-gray-400 '><span className='mr-2 '>{val.trainCode}</span> | <span className='ml-2'>Departs on:</span>{val.departOn?.map((val, idx) => {
                                                        return val != weekInitials[idx] ? <span className='pl-1 font-semibold text-gray-300 '>{weekInitials[idx]}</span> : <span className='pl-1 font-semibold greenText'>{val}</span>
                                                    })}</h3>
                                                </div>
                                                <div className=''>
                                                    <div className='flex justify-between alignCenter'>
                                                        <h1 className='font-bold '>{val.arrivalTime},{weekName[day]}</h1>
                                                        <div className='h-0.5 w-3 bg-gray-300'></div>
                                                        <h3 className='text-xs font-semibold text-gray-400 '>{val.duration}</h3>
                                                        <div className='h-0.5 w-3 bg-gray-300'></div>
                                                        <h1 className='font-bold '>{val.departureTime},{val.travelDayDuration === 1 ? weekName[day + 1] : weekName[day]}</h1>
                                                    </div>
                                                    <div className='flex justify-between text-sm text-gray-600'>
                                                        <h1>{fromTrain}</h1>
                                                        <h1>{toTrain}</h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex gap-2 overflow-x-scroll no-scrollbar'>
                                                {val.availableTicket?.map((ticket) => {
                                                    return (
                                                        <div>
                                                            <div onClick={() => { setTrainPassangers(1); navigate(`/train/review/${fromTrain}/${toTrain}/${val._id}/${ticket.class}`) }} className='px-3 py-1 text-left rounded-md cursor-pointer  grayBlurShadow borderGray mobTicketTypeCard'>
                                                                <div className='flex justify-between mb-1 font-bold alignCenter'>
                                                                    <h1 className='text-sm'>{ticket.class}</h1>
                                                                    <h1 className='text-sm'>₹{ticket.price}</h1>
                                                                </div>
                                                                <h3 className='text-xs text-green-500 '>AVAILABLE {ticket.seats}</h3>
                                                                <h3 className='text-xs '>{ticket.extra}</h3>
                                                                <h4 className='text-xs text-gray-300 '>Updated {ticket.updated}</h4>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )
                                })
                                : <img className='w-32 m-auto ' src="/img/mmtLoading.gif" alt="" />}
                        </div>
                    </main>
                </div>
            </MobileView></>
    );
}

export default memo(ShowAllTrains);