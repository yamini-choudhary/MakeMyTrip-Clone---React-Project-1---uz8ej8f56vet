import React, { memo, useContext, useEffect, useState } from 'react';
import { cityListArray, getBuses, monthNames, weekName } from '../Constant/constant';
import { AppContext } from '../ContextAPI/AppContext';
import { useNavigate, useParams } from 'react-router';
import ShimmerLocation from '../Loader/ShimmerLocation';
import Calendar from 'react-calendar';
import BusModal from '../Modals/BusModal';
import { BrowserView, MobileView } from 'react-device-detect';

function ShowAllBuses(props) {
    const { from, to, weekDay } = useParams();
    const navigate = useNavigate();
    const [fromCity, setFromCity] = useState(from);
    const [toCity, setToCity] = useState(to);
    const [listOfBuses, setListOfBuses] = useState([]);
    const [week, setWeek] = useState(weekDay);
    const [loading, setLoading] = useState(false);
    const [cardLoading, setCardLoading] = useState(false);
    const [sourceModal, setSourceModal] = useState(false);
    const [destinationModal, setDestinationModal] = useState(false);
    const [editBus, setEditBus] = useState(false);
    const [busDateModal, setBusDateModal] = useState(false);
    const [amenity, setAmenity] = useState(false);
    const [prevAmenity, setPrevAmenity] = useState(false);
    const [ac, setAc] = useState(false);
    const [nonAc, setNonAc] = useState(false);
    const [lowHighPrice, setLowHighPrice] = useState("");
    const { token, setBookingStatus, isLogin, setIsLogin, isModalOpen, setIsModalOpen,
        sourceBusTrain, destinationBusTrain, setFromOrTo, setCurrentTravelOption,
        flightdate, setFlightDate, setTrainPassangers } = useContext(AppContext);
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [day, setDay] = useState("");
    // get all bus tickets
    const getAllBuses = async () => {
        setCardLoading(true);
        let res = await getBuses(fromCity, toCity, week);
        setListOfBuses(res?.buses);
        setCardLoading(false);
    }
    useEffect(() => {
        getAllBuses();
    }, [fromCity, toCity]);
    // onscroll make booking section sticky
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
    // set bus date
    const onChange = (newDate) => {
        let chek = newDate;
        setFlightDate(chek);
        setDate(chek.getDate());
        setMonth(chek.getMonth());
        setYear(chek.getFullYear());
        setDay(chek.getDay());
        setIsModalOpen(false);
        setBusDateModal(false);
    };
    // open source modal
    const handleFrom = (e) => {
        e.stopPropagation();
        setDestinationModal(false);
        setBusDateModal(false);
        setSourceModal(true);
        setIsModalOpen(true);
        setFromOrTo("from");
        document.getElementById("fromArrow").style.transform = "rotate(180deg)";
    }
    // open destination modal
    const handleTo = (e) => {
        e.stopPropagation();
        setSourceModal(false);
        setBusDateModal(false);
        setDestinationModal(true)
        setIsModalOpen(true);
        setFromOrTo("to");
        document.getElementById("toArrow").style.transform = "rotate(180deg)";
    }
    //open date modal
    const handleDateModal = (e) => {
        e.stopPropagation();
        setDestinationModal(false);
        setSourceModal(false);
        setBusDateModal(true);
        setIsModalOpen(true);
    }
    //close modal
    useEffect(() => {
        if (!isModalOpen) {
            setSourceModal(false);
            setDestinationModal(false);
            setBusDateModal(false);
            document.getElementById("fromArrow").style.transform = "rotate(0deg)";
            document.getElementById("toArrow").style.transform = "rotate(0deg)";
        }
    }, [isModalOpen]);
    // set source and destination code
    const handleSearch = () => {
        setFromCity(sourceBusTrain);
        setToCity(destinationBusTrain);
    }
    //open and close amenity box
    const amenityHandle = (id) => {
        if (prevAmenity !== id) {
            document.getElementById(id + 1).style.background = "#EAF5FF";
            document.getElementById(id).style.border = "1px solid #008CFF";
            document.getElementById(id + 2)?.classList.add("amenityBox");
            document.getElementById("busAmenitiesArrow").style.transform = "rotate(180deg)";
            setAmenity(id);
            setPrevAmenity(id);
        }
        else {
            document.getElementById(id + 1).style.background = "white";
            document.getElementById(id).style.border = "1px solid rgba(128, 128, 128, 0.293)";
            document.getElementById(id + 2)?.classList.remove("amenityBox");
            document.getElementById("busAmenitiesArrow").style.transform = "rotate(0deg)";
            setAmenity("");
            setPrevAmenity("");
        }
    }
    // open and close mobile site filter modal
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
    // sort ac buses and non ac buses
    const handleAc = async (id) => {
        document.getElementById("acBox")?.classList.remove("sortPriceBox");
        document.getElementById("nonAcBox")?.classList.remove("sortPriceBox")
        if (id === "acBox" && ac != id) {
            setCardLoading(true);
            setAc(id);
            document.getElementById(id)?.classList.add("sortPriceBox");
            setNonAc(false);
            let res = await getBuses(fromCity, toCity, week);
            let acArr = res?.buses?.filter((val) => {
                return val.type === "AC";
            });
            setListOfBuses(acArr);
            setCardLoading(false);
        }
        else if (id === "nonAcBox" && ac != id) {
            setCardLoading(true);
            setAc(id);
            document.getElementById(id)?.classList.add("sortPriceBox")
            setNonAc(true);
            let res = await getBuses(fromCity, toCity, week);
            let acArr = res?.buses?.filter((val) => {
                return val.type === "Non-AC";
            });
            setListOfBuses(acArr);
            setCardLoading(false);
        }
        else {
            setAc("");
            setNonAc(false);
            getAllBuses();
        }
    }
    // sort by lowest and highest price
    const sortPrice = async (id) => {
        document.getElementById("lowPrice")?.classList.remove("sortPriceBox");
        document.getElementById("highPrice")?.classList.remove("sortPriceBox");
        if (id === "lowPrice" && lowHighPrice != id) {
            setLowHighPrice(id);
            document.getElementById(id)?.classList.add("sortPriceBox");
            let sortArr = listOfBuses?.sort((a, b) => {
                return a?.fare - b?.fare;
            });
            setListOfBuses(sortArr);
        }
        else if (id === "highPrice" && lowHighPrice != id) {
            setLowHighPrice(id);
            document.getElementById(id)?.classList.add("sortPriceBox");
            let sortArr = listOfBuses?.sort((a, b) => {
                return b?.fare - a?.fare;
            });
            setListOfBuses(sortArr);
        }
        else {
            setLowHighPrice("");
            if (!ac) {
                getAllBuses();
            }
            else {
                if (ac === "acBox") {
                    setCardLoading(true);

                    setNonAc(false);
                    let res = await getBuses(fromCity, toCity, week);
                    let acArr = res?.buses?.filter((val) => {
                        return val.type === "AC";
                    });
                    setListOfBuses(acArr);
                    setCardLoading(false);
                }
                else {
                    setCardLoading(true);
                    setNonAc(true);
                    let res = await getBuses(fromCity, toCity, week);
                    let acArr = res?.buses?.filter((val) => {
                        return val.type === "Non-AC";
                    });
                    setListOfBuses(acArr);
                    setCardLoading(false);
                }
            }
        }
    }
    // mobile site sort by lowest and highest price
    const mobSortBox = async (id) => {
        document.getElementById("lowPrice")?.classList.remove("mobSortPriceBox");
        document.getElementById("highPrice")?.classList.remove("mobSortPriceBox");
        if (id === "lowPrice" && lowHighPrice != id) {
            setLowHighPrice(id);
            document.getElementById(id)?.classList.add("mobSortPriceBox");
            let sortArr = listOfBuses?.sort((a, b) => {
                return a?.fare - b?.fare;
            });
            setListOfBuses(sortArr);
        }
        else if (id === "highPrice" && lowHighPrice != id) {
            setLowHighPrice(id);
            document.getElementById(id)?.classList.add("mobSortPriceBox");
            let sortArr = listOfBuses?.sort((a, b) => {
                return b?.fare - a?.fare;
            });
            setListOfBuses(sortArr);
        }
        else {
            setLowHighPrice("");

            if (!ac) {
                getAllBuses();
            }
            else {

                if (ac === "acBox") {
                    setCardLoading(true);

                    setNonAc(false);
                    let res = await getBuses(fromCity, toCity, week);
                    let acArr = res?.buses?.filter((val) => {
                        return val.type === "AC";
                    });
                    setListOfBuses(acArr);
                    setCardLoading(false);
                }
                else {
                    setCardLoading(true);
                    setNonAc(true);
                    let res = await getBuses(fromCity, toCity, week);
                    let acArr = res?.buses?.filter((val) => {
                        return val.type === "Non-AC";
                    });
                    setListOfBuses(acArr);
                    setCardLoading(false);
                }
            }
        }
    }
    // set date
    useEffect(() => {
        let date = flightdate;
        setDate(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setDay(date.getDay());
        setCurrentTravelOption("BUSES");
    }, []);
    // move to ticket review section if user login
    const handleBook = (id) => {
        if (token) {
            setBookingStatus(false);
            setTrainPassangers(1);
            navigate(`/Bus-review/${id}`);
        }
        else {
            setIsLogin({ ...isLogin, status: true });
        }
    }
    return (
        <>
            <BrowserView>
                <div className="h-full  bg-gray-50" onClick={() => { setIsModalOpen(false); }}>
                    <div className="mb-6 ">
                        <div id="showBookingBar" className="flex justify-center px-6 pt-2 pb-2 text-left  alignCenter gap-9 gradientBackgroundBlue">
                            <div className="grid gap-2 rounded-lg cursor-pointer  allFlightsBookingBox">
                                <div onClick={handleFrom} className="relative px-3 py-1 rounded-lg  borderRight lightWhite">
                                    <span className="flex flex-row gap-1 text-xs text-blue-600 alignCenter">FROM <img id="fromArrow" className="w-3 h-2 mt-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {!loading ?
                                        cityListArray?.map((val) => {
                                            return (
                                                <>
                                                    {val?.name === sourceBusTrain ?
                                                        <div key={val.name} className="mt-2 ">
                                                            <h1 className="text-sm font-bold text-white ">{val?.name}</h1>
                                                        </div> : ""}</>
                                            )
                                        }) : <img className='m-auto  w-7' src="/img/loadingBlue.webp" alt="" />}
                                    {sourceModal ?
                                        <div className="absolute left-0 z-20 w-64  top-10 flightModal" >
                                            <BusModal />
                                        </div> : ""}
                                </div>
                                <div onClick={handleTo} className="relative px-3 py-1 rounded-lg  borderRight lightWhite">
                                    <span className="flex flex-row gap-1 text-xs text-blue-600 alignCenter">TO <img id="toArrow" className="w-3 h-2 mt-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {!loading ?
                                        cityListArray?.map((val) => {
                                            return (
                                                <>
                                                    {val?.name === destinationBusTrain ?
                                                        <div key={val.name} className="mt-2 ">
                                                            <h1 className="text-sm font-bold text-white ">{val?.name}</h1>
                                                        </div> : ""}</>
                                            )
                                        }) : <img className='m-auto  w-7' src="/img/loadingBlue.webp" alt="" />}
                                    {destinationModal ?
                                        <div className="absolute left-0 z-20 w-64  top-10 flightModal" >
                                            <BusModal />
                                        </div> : ""}
                                </div>
                                <div onClick={handleDateModal} className="relative px-3 py-0 rounded-lg  borderRight lightWhite">
                                    <span className="text-xs text-blue-600 ">DEPART</span>
                                    <div className="text-white">
                                        <span className="text-sm font-extrabold ">{date} </span>
                                        <span className="font-semibold ">{monthNames[month]}'{year}, </span>
                                        <span className="">{weekName[day]}</span>
                                        {busDateModal ?
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
                    <main className="grid gap-2 allBusCardMainBox">
                        {/* filter */}
                        <aside className="p-4 bg-white rounded-lg  filterBox h-fit grayBlurShadow">
                            <h1 className="pb-2 mb-2 text-2xl font-bold text-left  borderBottomGray">Filters</h1>
                            <div className="text-left ">
                                <h1 className="mb-2 text-xl font-semibold ">AC</h1>
                                <div className='grid grid-cols-2 gap-3 pb-4 borderBottomGray'>
                                    <>
                                        <div id='acBox' onClick={() => { handleAc("acBox") }} className='flex justify-center gap-3 py-1 rounded-lg cursor-pointer alignCenter borderGray hoverLightBlue'>
                                            <img className='w-4 ' src={ac === "acBox" ? "/img/acOn.png" : "/img/acOff.png"} alt="" />
                                            <h2>AC</h2>
                                        </div>
                                    </>
                                    <>
                                        <div id='nonAcBox' onClick={() => { handleAc("nonAcBox") }} className='flex justify-center gap-3 py-1 rounded-lg cursor-pointer alignCenter borderGray hoverLightBlue'>
                                            <img className='w-4 ' src={ac === "nonAcBox" ? "/img/nonAcOn.png" : "/img/nonAcOff.png"} alt="" />
                                            <h2>Non AC</h2>
                                        </div>
                                    </>

                                </div>
                                <h1 className="mt-2 mb-2 text-xl font-semibold ">Sort by price</h1>
                                <div className='grid grid-cols-2 gap-3 pb-4 borderBottomGray'>
                                    <>
                                        <div id='lowPrice' onClick={() => { sortPrice("lowPrice") }} className='flex justify-center gap-3 py-1 rounded-lg cursor-pointer alignCenter borderGray hoverLightBlue'>
                                            <h2>Lowest First</h2>
                                        </div>
                                    </>
                                    <>
                                        <div id='highPrice' onClick={() => { sortPrice("highPrice") }} className='flex justify-center gap-3 py-1 rounded-lg cursor-pointer alignCenter borderGray hoverLightBlue'>
                                            <h2>Highest First</h2>
                                        </div>
                                    </>

                                </div>
                                <div>
                                </div>
                            </div>
                        </aside>
                        {/* flight cards div */}
                        <div className="flex flex-col gap-3 ">
                            {!cardLoading ?
                                listOfBuses?.map((val) => {
                                    return (
                                        <div key={val._id} id={val._id} className='overflow-hidden bg-white  rounded-2xl grayBlurShadow borderGray'>
                                            <div id={val._id + 1} className='flex flex-col gap-2 px-5 py-3'>
                                                <div className='grid grid-cols-5 text-left alignCenter'>
                                                    <h1 className='text-lg font-bold '>{val.name}</h1>
                                                    <div className='text-lg font-bold text-right '>
                                                        <h1>{val.departureTime} <span className='text-sm font-normal text-gray-500 '>{fromCity}</span></h1>

                                                    </div>
                                                    <div className='flex justify-center alignCenter '>
                                                        <div className=" w-5 h-0.5 mt-0.5 bg-green-500"></div>
                                                        <p className='px-1 text-gray-500 '>To</p>
                                                        <div className=" w-5 h-0.5 mt-0.5 bg-green-500"></div>
                                                    </div>
                                                    <div className='text-lg font-bold text-left '>
                                                        <h1>{val.arrivalTime} <span className='text-sm font-normal text-gray-500 '>{toCity}</span></h1>
                                                    </div>
                                                    <div className='text-lg font-bold text-right '>
                                                        <h1>₹ {val.fare}</h1>
                                                    </div>
                                                </div>
                                                <div className='flex justify-between text-left'>
                                                    <h1>{val.type}</h1>
                                                    <div className="text-right ">
                                                        <button onClick={() => { handleBook(val._id); }} className='px-2 py-1 font-bold text-center text-white rounded-full  gradientBlueBack'>Book Now</button>
                                                    </div>
                                                </div>
                                                <div className='flex justify-between font-bold'>
                                                    <div className='flex pr-1 text-white rounded-md alignCenter w-fit ratingBack'><img className=' w-5 mt-0.5' src="/img/populer.png" alt="" /><span>3.4</span></div>
                                                    <div>
                                                        <p className='text-sm font-normal text-gray-500 '>{val.seats} Available seats</p>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='flex gap-3 px-5 py-3 borderTopGray prevent-select'>
                                                <h1 id={val._id + 2} onClick={() => { amenityHandle(val._id) }} className='flex px-3 py-1 text-sm rounded-lg cursor-pointer alignCenter'>Amenities <img id="busAmenitiesArrow" className="w-3 h-2 mt-1 ml-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></h1>
                                            </div>
                                            {amenity === val._id ?
                                                <div className='px-5 py-3 text-left  borderTopGray'>
                                                    {val?.amenities?.map((ameni) => {
                                                        return <li>{ameni}</li>
                                                    })}
                                                </div> : ""}
                                        </div>
                                    )
                                })
                                : <img className='w-32 m-auto ' src="/img/mmtLoading.gif" alt="" />}
                        </div>
                    </main>
                </div>
            </BrowserView>
            <MobileView>
                <div className='fixed bottom-0 flex justify-around w-full gap-2 px-3 py-2 text-sm text-white bg-black rounded-t-lg '>
                    <div id='lowPrice' onClick={() => { mobSortBox("lowPrice") }} className='flex justify-center gap-3 px-2 rounded-lg cursor-pointer alignCenter filterblackBack '>
                        <h2>Lowest First</h2>
                    </div>
                    <div id='highPrice' onClick={() => { mobSortBox("highPrice") }} className='flex justify-center gap-3 px-2 rounded-lg cursor-pointer alignCenter filterblackBack '>
                        <h2>Highest First</h2>
                    </div>
                    <div className='px-2 rounded-md filterblackBack' onClick={() => { mobileFilterHandle("open") }}>
                        <img src="/img/busFilter.png" alt="" />
                    </div>
                </div>
                <div className="h-full  bg-gray-50" onClick={() => { setIsModalOpen(false); }}>
                    {editBus ?
                        <div className="absolute top-0 z-20 w-full  fullHeightInVh">
                            <div className="mb-6 ">
                                <div id="showBookingBar" className="px-6 py-4 text-left bg-gray-100 fullHeightInVh">
                                    <p onClick={() => { setEditBus(false); }} className="py-2 text-right text-blue-600 ">Cancel</p>
                                    <div className="gap-2 rounded-lg cursor-pointer ">
                                        <div onClick={(e) => { handleFrom(e) }} className="relative px-3 py-2 mb-3 bg-white rounded-lg ">
                                            <span className="flex flex-row gap-1 text-sm text-blue-600 alignCenter">FROM <img id="fromArrow" className="w-3 h-2 mt-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                            {!loading ?
                                                cityListArray?.map((val) => {
                                                    return (
                                                        <>
                                                            {val?.name === source ?
                                                                <div key={val.name} className="">
                                                                    <h1 className="text-xl font-bold ">{val?.name}</h1>
                                                                </div> : ""}</>
                                                    )
                                                }) : <ShimmerLocation />}
                                            {sourceModal ?
                                                <div className="absolute left-0 z-20 w-64  top-9 flightModal" >
                                                    <BusModal />
                                                </div> : ""}
                                        </div>
                                        <div onClick={handleTo} className="relative px-3 py-2 mb-3 bg-white rounded-lg  borderRight">
                                            <span className="flex flex-row gap-1 text-sm text-blue-600 alignCenter">TO <img id="toArrow" className="w-3 h-2 mt-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                            {!loading ?
                                                cityListArray?.map((val) => {
                                                    return (
                                                        <>
                                                            {val?.name === destination ?
                                                                <div key={val.name} className="">
                                                                    <h1 className="text-xl font-bold ">{val?.name}</h1>
                                                                </div> : ""}</>
                                                    )
                                                }) : <ShimmerLocation />}
                                            {destinationModal ?
                                                <div className="absolute left-0 z-20 w-64  top-9 flightModal" >
                                                    <BusModal />
                                                </div> : ""}
                                        </div>
                                        <div onClick={handleDateModal} className="relative px-3 py-2 mb-3 bg-white rounded-lg  borderRight">
                                            <span className="text-sm text-blue-600 ">DEPART</span>
                                            <div className="">
                                                <span className="text-xl font-extrabold ">{date} </span>
                                                <span className="font-semibold ">{monthNames[month]}'{year}, </span>
                                                <span className="">{weekName[day]}</span>
                                                {busDateModal ?
                                                    <div onClick={() => { setIsModalOpen(false); }} className="absolute left-0 z-20 w-full p-2 text-black bg-white rounded-lg  top-7 grayBlurShadow calenderBox" >
                                                        <Calendar onChange={onChange} value={flightdate} />
                                                    </div> : ""}
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={(e) => { handleSearch(e); setEditBus(false); }} className="w-full px-10 py-2 my-1 text-lg font-bold text-white rounded-lg  blueSearch">SEARCH</button>
                                </div>
                            </div>
                        </div> :
                        <>
                            <div id="showBookingBar" className="px-2 py-2 mb-3 bg-white  rounded-b-md">
                                <div className="flex justify-between py-0 pl-2 bg-gray-100 rounded-md alignCenter borderGray">
                                    <div>
                                        <h1 className="flex">
                                            {cityListArray?.map((val) => {
                                                return (
                                                    <>
                                                        {val?.name === sourceBusTrain ?
                                                            <div key={val.name} className="">
                                                                <h1 className="font-bold ">{val?.name}-</h1>
                                                            </div> : ""}</>
                                                )
                                            })}
                                            {cityListArray?.map((val) => {
                                                return (
                                                    <>
                                                        {val?.name === destinationBusTrain ?
                                                            <div key={val.name} className="">
                                                                <h1 className="font-bold ">{val?.name}</h1>
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
                                    <div className="p-2" onClick={(e) => { e.stopPropagation(); setEditBus(true); console.log("hello"); }}>
                                        <img className="w-3 ml-1 " src="/img/editIcon.png" alt="" />
                                        <h2 className="text-xs text-blue-600 ">Edit</h2>
                                    </div>
                                </div>
                            </div>
                            <span id="fromArrow"></span>
                            <span id="toArrow" > </span>
                        </>
                    }
                    {/* <div className="mb-6 ">
                        <div id="showBookingBar" className="flex justify-center px-6 pt-2 pb-2 text-left  alignCenter gap-9 gradientBackgroundBlue">
                            <div className="grid gap-2 rounded-lg cursor-pointer  allFlightsBookingBox">
                                <div onClick={handleFrom} className="relative px-3 py-1 rounded-lg  borderRight lightWhite">
                                    <span className="flex flex-row gap-1 text-xs text-blue-600 alignCenter">FROM <img id="fromArrow" className="w-3 h-2 mt-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {!loading ?
                                        cityListArray?.map((val) => {
                                            return (
                                                <>
                                                    {val?.name === source ?
                                                        <div key={val.name} className="mt-2 ">
                                                            <h1 className="text-sm font-bold text-white ">{val?.name}</h1>
                                                        </div> : ""}</>
                                            )
                                        }) : <ShimmerLocation />}
                                    {sourceModal ?
                                        <div className="absolute left-0 z-20 w-64  top-10 flightModal" >
                                            <BusModal />
                                        </div> : ""}
                                </div>
                                <div onClick={handleTo} className="relative px-3 py-1 rounded-lg  borderRight lightWhite">
                                    <span className="flex flex-row gap-1 text-xs text-blue-600 alignCenter">TO <img id="toArrow" className="w-3 h-2 mt-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {!loading ?
                                        cityListArray?.map((val) => {
                                            return (
                                                <>
                                                    {val?.name === destination ?
                                                        <div key={val.name} className="mt-2 ">
                                                            <h1 className="text-sm font-bold text-white ">{val?.name}</h1>
                                                        </div> : ""}</>
                                            )
                                        }) : <ShimmerLocation />}
                                    {destinationModal ?
                                        <div className="absolute left-0 z-20 w-64  top-10 flightModal" >
                                            <BusModal />
                                        </div> : ""}
                                </div>
                                <div onClick={handleDateModal} className="relative px-3 py-0 rounded-lg  borderRight lightWhite">
                                    <span className="text-xs text-blue-600 ">DEPART</span>
                                    <div className="text-white">
                                        <span className="text-sm font-extrabold ">{date} </span>
                                        <span className="font-semibold ">{monthNames[month]}'{year}, </span>
                                        <span className="">{weekName[day]}</span>
                                        {busDateModal ?
                                            <div onClick={() => { setIsModalOpen(false); }} className="absolute left-0 z-20 w-full p-2 text-black bg-white rounded-lg  top-7 grayBlurShadow calenderBox" >
                                                <Calendar onChange={onChange} value={flightdate} />
                                            </div> : ""}
                                    </div>
                                </div>
                            </div>
                            <button onClick={handleSearch} className="h-10 px-10 my-1 text-lg font-bold text-white rounded-full  blueSearch">SEARCH</button>
                        </div>
                    </div> */}
                    <main className="gap-2 px-2 ">
                        {/* filter */}
                        <div onClick={() => { mobileFilterHandle("close"); }} id="mobFilter" className="fixed top-0 z-20 w-full fullHeightInVh lowOpacityGrayBack mobileFilterClose ">
                            <aside className="w-3/4 p-4 bg-white rounded-lg  filterBox fullHeightInVh grayBlurShadow">
                                <h1 className="pb-2 mb-2 text-2xl font-bold text-left  borderBottomGray">Filters</h1>
                                <div className="text-left ">
                                    <h1 className="mb-2 text-xl font-semibold ">AC</h1>
                                    <div className='grid grid-cols-2 gap-3 pb-4 borderBottomGray'>
                                        <>
                                            <div id='acBox' onClick={() => { handleAc("acBox") }} className='flex justify-center gap-3 py-1 rounded-lg cursor-pointer alignCenter borderGray hoverLightBlue'>
                                                <img className='w-4 ' src={ac === "acBox" ? "/img/acOn.png" : "/img/acOff.png"} alt="" />
                                                <h2>AC</h2>
                                            </div>
                                        </>
                                        <>
                                            <div id='nonAcBox' onClick={() => { handleAc("nonAcBox") }} className='flex justify-center gap-3 py-1 rounded-lg cursor-pointer alignCenter borderGray hoverLightBlue'>
                                                <img className='w-4 ' src={ac === "nonAcBox" ? "/img/nonAcOn.png" : "/img/nonAcOff.png"} alt="" />
                                                <h2>Non AC</h2>
                                            </div>
                                        </>

                                    </div>
                                    {/* <h1 className="mt-2 mb-2 text-xl font-semibold ">Sort by price</h1>
                                    <div className='grid grid-cols-2 gap-3 pb-4 borderBottomGray'>
                                        <>
                                            <div id='lowPrice' onClick={() => { sortPrice("lowPrice") }} className='flex justify-center gap-3 py-1 rounded-lg cursor-pointer alignCenter borderGray hoverLightBlue'>
                                                <h2>Lowest First</h2>
                                            </div>
                                        </>
                                        <>
                                            <div id='highPrice' onClick={() => { sortPrice("highPrice") }} className='flex justify-center gap-3 py-1 rounded-lg cursor-pointer alignCenter borderGray hoverLightBlue'>
                                                <h2>Highest First</h2>
                                            </div>
                                        </>

                                    </div> */}
                                </div>
                            </aside>
                        </div>
                        {/* flight cards div */}
                        <div className="flex flex-col w-full gap-3 pb-20">
                            {!cardLoading ?
                                listOfBuses?.map((val) => {
                                    return (
                                        <div key={val._id} id={val._id} className='w-full overflow-hidden bg-white  rounded-2xl grayBlurShadow borderGray'>
                                            <div id={val._id + 1} className='flex flex-col gap-2 px-2 py-3'>
                                                <div className='flex justify-between alignCenter'>
                                                    <h1 className='text-lg font-bold text-left '>{val.name}</h1>
                                                    <div className='text-lg font-bold text-right '>
                                                        <h1>₹ {val.fare}</h1>
                                                    </div>
                                                </div>
                                                <div className='flex justify-between text-left alignCenter'>

                                                    <div className='text-lg font-bold text-right '>
                                                        <h1>{val.departureTime} <span className='text-sm font-normal text-gray-500 '>{fromCity}</span></h1>

                                                    </div>
                                                    <div className='flex justify-center alignCenter '>
                                                        <div className=" w-5 h-0.5 mt-0.5 bg-green-500"></div>
                                                        <p className='px-1 text-gray-500 '>To</p>
                                                        <div className=" w-5 h-0.5 mt-0.5 bg-green-500"></div>
                                                    </div>
                                                    <div className='text-lg font-bold text-left '>
                                                        <h1>{val.arrivalTime} <span className='text-sm font-normal text-gray-500 '>{toCity}</span></h1>
                                                    </div>

                                                </div>
                                                <div className='flex justify-between text-left'>
                                                    <h1>{val.type}</h1>
                                                    <div className="text-right ">
                                                        <button onClick={() => { handleBook(val._id); }} className='px-2 py-1 text-sm font-bold text-center text-white rounded-full  gradientBlueBack'>Book Now</button>
                                                    </div>
                                                </div>
                                                <div className='flex justify-between font-bold'>
                                                    <div className='flex pr-1 text-white rounded-md alignCenter w-fit ratingBack'><img className=' w-5 mt-0.5' src="/img/populer.png" alt="" /><span>3.4</span></div>
                                                    <div>
                                                        <p className='text-sm font-normal text-gray-500 '>{val.seats} Available seats</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex gap-3 px-4 py-1 borderTopGray prevent-select'>
                                                <h1 id={val._id + 2} onClick={() => { amenityHandle(val._id) }} className='flex px-3 py-1 text-sm rounded-lg cursor-pointer alignCenter'>Amenities <img id="busAmenitiesArrow" className="w-3 h-2 mt-1 ml-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></h1>
                                            </div>
                                            {amenity === val._id ?
                                                <div className='px-5 py-3 text-left  borderTopGray'>
                                                    {val?.amenities?.map((ameni) => {
                                                        return <li>{ameni}</li>
                                                    })}
                                                </div> : ""}
                                        </div>
                                    )
                                })
                                : <img className='w-32 m-auto ' src="/img/mmtLoading.gif" alt="" />}
                        </div>
                    </main>
                </div >
            </MobileView >
        </>
    );
}

export default memo(ShowAllBuses);