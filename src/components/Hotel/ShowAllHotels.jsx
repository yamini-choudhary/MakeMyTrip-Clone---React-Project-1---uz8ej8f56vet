
import "./hotel.css";
import { filterHotels, headerNavlist, roomAndGuestArr, searchHotels, suggetionFilterArray } from "../Constant/constant";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../ContextAPI/AppContext";
import { useNavigate, useParams } from "react-router";
import { memo } from "react";
import { HotelListArray, cityListArray, getHotelName, hotelPerNightPrice, monthNames, weekName } from "../Constant/constant";
import HotelModal from "../Modals/HotelModal";
import ShimmerLocation from "../Loader/ShimmerLocation";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Calendar from "react-calendar";
import { BrowserView, MobileView } from "react-device-detect";

function ShowAllHotels(props) {
    const { city } = useParams();
    const navigate = useNavigate();
    const { token, setToken, currentTravelOption, setCurrentTravelOption, hotelLocation, isModalOpen, setIsModalOpen, hotelArray, setHotelArray, setHotelLocation, source, setSource,
        destination, setDestination, hotelInDate, setHotelInDate,
        hotelOutDate, setHotelOutDate, roomAndGuest, setRoomAndGuest, } = useContext(AppContext);
    const [roomGuestModal, setRoomGuestModal] = useState(false);
    const [sourceModal, setSourceModal] = useState(false);
    const [hotelName, setHotelName] = useState(hotelArray);
    const [hotelDateInModal, setHotelDateInModal] = useState(false);
    const [hotelDateOutModal, setHotelDateOutModal] = useState(false);
    const [listOfHotels, setListOfHotels] = useState([]);
    const [filterFields, setFilterFields] = useState(false);
    const [prevCheckbox, setPrevCheckbox] = useState("");
    const [sortByPrice, setSortByPrice] = useState("");
    const [prevSortByPrice, setPrevSortByPrice] = useState("");
    const [editHotel, setEditHotel] = useState(false);
    const [mobileFilter, setMobileFilter] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cardLoading, setCardLoading] = useState(false);
    const [scrollUp, setScrollUp] = useState(false);
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [day, setDay] = useState("");
    const [dateOut, setDateOut] = useState("");
    const [monthOut, setMonthOut] = useState("");
    const [yearOut, setYearOut] = useState("");
    const [dayOut, setDayOut] = useState("");

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
    // get all hotels list
    const getSearchedHotel = async () => {
        setCardLoading(true);
        let res = await searchHotels(city);
        setListOfHotels(res.data.data.hotels);
        setCardLoading(false);
        console.log("list Hotels", res.data.data.hotels)
    }
    useEffect(() => {
        getSearchedHotel();
    }, [city]);
    const handleDateModal = (e) => {
        e.stopPropagation();
        setSourceModal(false);
        setHotelDateOutModal(false);
        setHotelDateInModal(true);
        setIsModalOpen(true);

    }
    const handleDateOutModal = (e) => {
        e.stopPropagation();
        setHotelDateOutModal(true);
        setSourceModal(false);
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
    // handle filters-----------------------------
    const handleFilter = async () => {
        setCardLoading(true);
        console.log("field", filterFields);
        let res = await filterHotels(city, filterFields);
        setListOfHotels(res.hotels);
        setCardLoading(false);
        console.log("filter list", res.hotels);
    }
    useEffect(() => {
        if (filterFields) {
            handleFilter();
        }
    }, [filterFields]);
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
    const isSticky = (e) => {
        const header = document.getElementById('showBookingBar');
        const sorting = document.getElementById("sortBox");
        const scrollTop = window.scrollY;
        scrollTop >= 60 ? header?.classList.add('sticky') : header.classList.remove('sticky');
        // if (screen.width <= 768) {
        //     scrollTop >= 60 ? sorting?.classList.add('sortSticky') : sorting.classList.remove('sortSticky');
        //     scrollTop >= 500 ? setScrollUp(true) : setScrollUp(false);;
        // }
        console.log("screen", screen.width);
    };
    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });
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
    const handleNav = (id) => {
        setCurrentTravelOption(id);
        navigate("/");
        window.scrollTo(0, 0);
    }
    useEffect(() => {
        setHotelLocation(city);
        setCurrentTravelOption("HOTELS");
    }, []);
    const getData = async () => {
        setLoading(true);
        let resp = await getHotelName();
        let hotelData = resp.data.data.cities;
        let hotelPlace = hotelData?.map((val) => {
            return val.cityState;
        });
        hotelPlace = hotelPlace.map((val) => {
            return val.split(",");
        });
        hotelPlace = hotelPlace.map((val, idx) => {
            return { _id: hotelData[idx]._id, name: val[0], location: val[0] + "," + val[1] }
        });
        setHotelArray(hotelPlace);
        setHotelName(hotelPlace);
        setLoading(false);
    }
    useEffect(() => {
        getData();
    }, []);
    const filterdata = (id, filterTag) => {
        setCardLoading(true);
        suggetionFilterArray.forEach((val) => {
            if (document.getElementById(val.id).checked) {
                document.getElementById(val.id).checked = false;
            }
        })
        if (prevCheckbox != id) {
            document.getElementById(id).checked = true;
            setFilterFields({ "amenities": filterTag });
            setPrevCheckbox(id);
        }
        else {
            document.getElementById(id).checked = false;
            setPrevCheckbox("");
            setFilterFields({});
        }

    }
    const budgetHandle = () => {
        let min = document.getElementById("minBudget");
        let max = document.getElementById("maxBudget");
        if (min.value && max.value) {
            let data = listOfHotels?.filter((val) => {
                if (Math.floor(val.avgCostPerNight) >= min.value && Math.floor(val.avgCostPerNight) <= max.value) {
                    return val;
                }
            });
            setListOfHotels(data);
        }
        else {
            getSearchedHotel();
        }
    }
    const sortHotelsHandle = () => {
        setCardLoading(true);
        if (sortByPrice === 1) {
            let sorting = listOfHotels.sort((a, b) => {
                return Math.floor(a?.avgCostPerNight) - Math.floor(b?.avgCostPerNight);
            });
            setListOfHotels(sorting);
        }
        else if (sortByPrice === -1) {
            let sorting = listOfHotels.sort((a, b) => {
                return Math.floor(b?.avgCostPerNight) - Math.floor(a?.avgCostPerNight);
            });
            setListOfHotels(sorting);
        }
        setCardLoading(false);
    }
    useEffect(() => {
        sortHotelsHandle();
    }, [sortByPrice]);
    const selectSortBy = (id, val) => {
        console.log(id);
        document.getElementById("mostPrice").style.color = "black";
        document.getElementById("mostPrice").style.borderBottom = "none";
        document.getElementById("lowPrice").style.color = "black";
        document.getElementById("lowPrice").style.borderBottom = "none";
        if (prevSortByPrice === val) {
            getSearchedHotel();
            setPrevSortByPrice("");
        }
        else {
            setCardLoading(true);
            document.getElementById(id).style.color = "#008CFF";
            document.getElementById(id).style.borderBottom = "2px solid #008CFF";
            setSortByPrice(val);
            setPrevSortByPrice(val);
        }
    }
    return (
        <>
            <BrowserView>
                <div onClick={() => { setIsModalOpen(false); }}>
                    <div id="showBookingBar" className="">
                        <div className="flex justify-center px-6 pt-2 pb-2 text-left  alignCenter gap-9 gradientBackgroundBlue">
                            <div className="grid gap-2 rounded-lg cursor-pointer  allHotelsBookingBox">
                                <div onClick={handleHotel} className="relative px-3 py-1 rounded-lg  borderRight lightWhite">
                                    <span className="flex flex-row gap-1 text-xs text-blue-600 alignCenter">CITY, AREA OR PROPERTY <img id="fromArrow" className="w-3 h-2 mt-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {!loading ?
                                        hotelName?.map((val) => {
                                            return (
                                                <>
                                                    {val?.name === hotelLocation ?
                                                        <div key={val._id} className="mt-2 ">
                                                            <h1 className="text-sm font-bold text-white ">{val?.name}</h1>
                                                        </div> : ""}</>
                                            )
                                        }) : <img className='m-auto  w-7' src="/img/loadingBlue.webp" alt="" />}
                                    {sourceModal ?
                                        <div className="absolute left-0 z-20 w-64  top-10 flightModal" >
                                            <HotelModal />
                                        </div> : ""}
                                </div>
                                <div onClick={handleDateModal} className="relative px-3 py-0 rounded-lg  borderRight lightWhite">
                                    <span className="text-xs text-blue-600 ">CHECK-IN</span>
                                    <div className="text-white">
                                        <span className="text-sm font-extrabold ">{date}</span>
                                        <span className="font-semibold ">{monthNames[month]}'{year}, </span>
                                        <span className="">{weekName[day]}</span>
                                    </div>
                                    {hotelDateInModal ?
                                        <div onClick={() => { setIsModalOpen(false); }} className="absolute left-0 z-20 w-full p-2 bg-white rounded-lg  top-7 grayBlurShadow calenderBox" >
                                            <Calendar onChange={onChange} />
                                        </div> : ""}
                                </div>
                                <div onClick={handleDateOutModal} className="relative px-3 py-0 rounded-lg  borderRight lightWhite">
                                    <span className="text-xs text-blue-600 ">CHECK-OUT</span>
                                    <div className="text-white">
                                        <span className="text-sm font-extrabold ">{dateOut}</span>
                                        <span className="font-semibold ">{monthNames[monthOut]}'{yearOut}, </span>
                                        <span className="">{weekName[dayOut]}</span>
                                    </div>
                                    {hotelDateOutModal ?
                                        <div onClick={() => { setIsModalOpen(false); }} className="absolute left-0 z-20 w-full p-2 bg-white rounded-lg  top-7 grayBlurShadow calenderBox" >
                                            <Calendar onChange={onChangeOut} />
                                        </div> : ""}
                                </div>
                                <div className="px-3 py-0 rounded-lg  borderRight lightWhite">
                                    <span className="text-xs text-blue-600 ">ROOMS_&_GUESTS</span>
                                    <div className="text-white ">
                                        <span className="text-sm font-extrabold ">{roomAndGuest.room}</span>
                                        <span className="font-semibold ">Room, </span>
                                        <span className="text-sm font-extrabold ">{roomAndGuest.guest}</span>
                                        <span className="font-semibold ">Adults</span>
                                    </div>
                                </div>

                            </div>
                            <button onClick={() => { navigate(`/hotels/${hotelLocation}`) }} className="px-10 py-3 my-1 text-lg font-bold text-white rounded-full  h-fit blueSearch">SEARCH</button>
                        </div>
                        <div className=" sortByBoxCover">
                            <div className="flex sortByBox">
                                <h1 className="py-3 ">SORT BY:</h1>
                                <p className="flex justify-center alignCenter"><span id="mostPrice" onClick={() => { selectSortBy("mostPrice", -1) }} className="py-3 cursor-pointer ">Price <span>(Highest First)</span></span></p>
                                <p className="flex justify-center alignCenter"><span id="lowPrice" onClick={() => { selectSortBy("lowPrice", 1) }} className="py-3 cursor-pointer ">Price <span>(Lowest First)</span></span></p>
                            </div>
                        </div>
                    </div>

                    <main className="grid gap-2 px-4 allCardMainBox">
                        {/* filter */}
                        <aside className=" filterBox">
                            <h1 className="mb-4 text-2xl font-bold text-left ">Select Filters</h1>
                            <div className="text-left ">
                                <h1 className="mb-2 font-semibold ">Suggested For You</h1>
                                {suggetionFilterArray?.map((val) => {
                                    return (
                                        <div key={val.id} onClick={() => { filterdata(val.id, val.name) }} className="flex text-left alignCenter checkbox">
                                            <input id={val.id} type="checkbox" />
                                            <label className="ml-3 ">{val.name}</label>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="mt-5 text-left ">
                                <h1 className="mb-2 font-semibold ">Budget</h1>
                                <div className="flex justify-between alignCenter">
                                    <input id="minBudget" className="w-20 h-10 pl-1 rounded-md borderGray" type="number" placeholder="min" />
                                    <span>to</span>
                                    <input id="maxBudget" className="w-20 h-10 pl-1 rounded-md borderGray" type="number" placeholder="max" />
                                    <button id="budgetBtn" onClick={budgetHandle} className="h-10 px-2 rounded-md  blueBack"><img className="w-6 " src="/img/rightArrow.png" alt="" /></button>
                                </div>
                            </div>
                        </aside>
                        {/* hotel cards div */}
                        <div className="flex flex-col gap-3">
                            {!cardLoading ?
                                listOfHotels?.map((val) => {
                                    return (
                                        // hotel cards
                                        <>
                                            <div key={val?._id} id={val?._id} onClick={() => { navigate(`/hotels/hotel-details/${val?._id}`) }} className="overflow-hidden rounded-md cursor-pointer  borderGray grayBlurShadow hotelCard">
                                                <div className="flex justify-between ">
                                                    {/* card left side */}
                                                    <div className="flex gap-4 p-3 hotelCardLeftSide">
                                                        <div>
                                                            <LazyLoadImage className="rounded-md hotelCardImg" src={val?.images[0]} placeholderSrc="/img/mmtLoading.gif" />
                                                        </div>
                                                        <div >
                                                            <h2 className="flex text-left alignCenter"><span className="text-2xl font-bold ">{val?.name}</span></h2>
                                                            <p className="mb-2 font-semibold text-left  blueText">{val?.location}</p>
                                                            <ul className="flex gap-2">
                                                                {val?.amenities?.map((amenity, idx) => {
                                                                    return <li className="p-1 text-xs font-semibold text-gray-500 rounded borderblack">{amenity}</li>;
                                                                })}
                                                            </ul>
                                                            <p className="mt-3 font-semibold text-left text-yellow-800 ">{val?.rooms.length} rooms available</p>
                                                        </div>

                                                    </div>
                                                    {/* card right side */}
                                                    <div className="flex flex-col justify-between p-3 text-right leftGrayBorder hotelCardRightSide">
                                                        <span>{val?.rating >= 4.5 ?
                                                            <span className="font-bold ratingColor">Excellent <span className="px-1 text-white rounded-md  ratingBackColor">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span></span> :
                                                            val?.rating >= 3.5 ?
                                                                <span className="font-bold ratingColor">Very Good <span className="px-1 text-white rounded-md  ratingBackColor">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span></span> :
                                                                val?.rating >= 2.5 ?
                                                                    <span className="font-bold ratingColor"> Good <span className="px-1 text-white rounded-md  ratingBackColor">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span></span> :
                                                                    <span className="font-bold ratingColor">Average <span className="px-1 text-white rounded-md  ratingBackColor">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span></span>
                                                        }</span>
                                                        <h2 className=" lineHeight"><span className="text-2xl font-bold ">₹{Math.floor(val?.avgCostPerNight)}</span><br /><span className="text-sm text-gray-400 ">+ ₹{val?.childAndExtraBedPolicy.extraBedCharge} taxes & fees</span><br /><span className="text-sm text-gray-400 ">For per bed chargees</span></h2>
                                                        <p className="font-bold blueText">{token ? "" : "Login to unlock the best deals"}</p>
                                                    </div>
                                                </div>
                                                <div className="px-3 py-2 font-semibold text-left text-green-900 bg-green-200 "><p>Exclusive discount of INR 1000 applied on your 1st Hotel booking.</p></div>
                                            </div>
                                        </>
                                    )
                                }) : <img className='w-32 m-auto ' src="/img/mmtLoading.gif" alt="" />}
                        </div>
                    </main>
                </div>
            </BrowserView>
            <MobileView>

                <div className="relative " onClick={() => { setIsModalOpen(false); }}>
                    {editHotel ?
                        <div className="absolute z-20 w-full bg-gray-100  fullHeightInVh">
                            <div id="showBookingBar" className="px-6 pt-2 pb-2 text-left bg-gray-100  fullHeightInVh gap-9">
                                <p onClick={() => { setEditHotel(false); }} className="py-2 text-right text-blue-600 ">Cancel</p>
                                <div className="gap-2 rounded-lg cursor-pointer ">
                                    <div onClick={handleHotel} className="relative w-full px-3 py-1 mb-2 rounded-lg  borderGray lightWhite">
                                        <span className="flex flex-row gap-1 text-xs text-blue-600 alignCenter">CITY, AREA OR PROPERTY <img id="fromArrow" className="w-3 h-2 mt-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                        {!loading ?
                                            hotelName?.map((val) => {
                                                return (
                                                    <>
                                                        {val?.name === hotelLocation ?
                                                            <div key={val._id} className="">
                                                                <h1 className="text-sm font-bold ">{val?.name}</h1>
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
                                    <div onClick={handleDateModal} className="relative px-3 py-0 mb-2 rounded-lg  borderGray lightWhite">
                                        <span className="text-xs text-blue-600 ">CHECK-IN</span>
                                        <div className="">
                                            <span className="text-sm font-extrabold ">{date}</span>
                                            <span className="font-semibold ">{monthNames[month]}'{year}, </span>
                                            <span className="">{weekName[day]}</span>
                                        </div>
                                        {hotelDateInModal ?
                                            <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className="fixed top-0 left-0 z-40 w-full bg-white  fullHeightInVh flightModal" >
                                                <div className='flex justify-end px-5 pt-5 bg-white rounded-full cursor-pointer '><img className='w-3 ' src="/img/cancel.png" alt="" /></div>
                                                <h1 className="px-2 text-xl font-extrabold ">Check-In Date</h1>
                                                <h1 className="px-2 mb-2 font-medium "><span className="text-xl font-extrabold ">{date}</span> {monthNames[month]} {year}, {weekName[day]}</h1>
                                                <div className="ml-1 mr-2 rounded-md borderGray" onClick={(e) => { e.stopPropagation() }}>
                                                    <Calendar onChange={onChange} />
                                                </div>
                                            </div> : ""}
                                    </div>
                                    <div onClick={handleDateOutModal} className="relative px-3 py-0 mb-2 rounded-lg  borderGray lightWhite">
                                        <span className="text-xs text-blue-600 ">CHECK-OUT</span>
                                        <div className="">
                                            <span className="text-sm font-extrabold ">{dateOut}</span>
                                            <span className="font-semibold ">{monthNames[monthOut]}'{yearOut}, </span>
                                            <span className="">{weekName[dayOut]}</span>
                                        </div>
                                        {hotelDateOutModal ?
                                            <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className="fixed top-0 left-0 z-40 w-full bg-white  fullHeightInVh flightModal" >
                                                <div className='flex justify-end px-5 pt-5 bg-white rounded-full cursor-pointer '><img className='w-3 ' src="/img/cancel.png" alt="" /></div>
                                                <h1 className="px-2 text-xl font-extrabold ">Check-Out Date</h1>
                                                <h1 className="px-2 mb-2 font-medium "><span className="text-xl font-extrabold ">{date}</span> {monthNames[month]} {year}, {weekName[day]}</h1>
                                                <div className="ml-1 mr-2 rounded-md borderGray" onClick={(e) => { e.stopPropagation() }}>
                                                    <Calendar onChange={onChangeOut} />
                                                </div>
                                            </div> : ""}
                                    </div>
                                    <div onClick={handleRoomGuestModal} className="px-3 py-0 mb-2 rounded-lg  borderGray lightWhite">
                                        <span className="text-xs text-blue-600 ">ROOMS_&_GUESTS</span>
                                        <div className="">
                                            <span className="text-sm font-extrabold ">{roomAndGuest.room}</span>
                                            <span className="font-semibold ">Room, </span>
                                            <span className="text-sm font-extrabold ">{roomAndGuest.guest}</span>
                                            <span className="font-semibold ">Adults</span>
                                        </div>
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
                                <button onClick={() => { navigate(`/hotels/${hotelLocation}`); setEditHotel(false); }} className="w-full px-10 py-2 my-1 text-lg font-bold text-white rounded-lg  h-fit blueSearch">SEARCH</button>
                            </div>
                        </div> :
                        <>
                            <div id="showBookingBar" className="px-2 py-2 bg-white ">
                                <div className="flex justify-between py-2 pl-2 bg-gray-100 rounded-md alignCenter borderGray">
                                    <div>
                                        <h1 className="flex">
                                            {hotelName?.map((val) => {
                                                return (
                                                    <>
                                                        {val?.name === hotelLocation ?
                                                            <div key={val._id} className="">
                                                                <h1 className="text-base font-bold ">{val?.name}</h1>
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
                                    <div className="p-2" onClick={(e) => { e.stopPropagation(); setEditHotel(true); console.log("hello"); }}>
                                        <img className="w-3 ml-1 " src="/img/editIcon.png" alt="" />
                                        <h2 className="text-xs text-blue-600 ">Edit</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="text-left ">
                                    <div className="gap-2 rounded-lg cursor-pointer ">
                                        <div onClick={handleHotel} className="relative rounded-lg  borderRight lightWhite">
                                            <span className="flex flex-row gap-1 text-xs text-blue-600 alignCenter"><img id="fromArrow" className="w-0 h-0 mt-1  arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </>}
                    <div className="fixed bottom-0 w-full ">
                        <div className="z-10 flex py-3 pl-4 bg-white  alignCenter borderTopGray grayBlurShadow">
                            <div onClick={() => { mobileFilterHandle("open"); }}><img className="w-8 " src="/img/filterIcon.png" alt="" /></div>
                            <div className="flex justify-around w-full text-xs">
                                {/* <h1 className="py-3 ">SORT BY:</h1> */}
                                <p className="flex justify-center alignCenter"><span id="mostPrice" onClick={() => { selectSortBy("mostPrice", -1) }} className="py-3 cursor-pointer ">Price <span>(Highest First)</span></span></p>
                                <p className="flex justify-center alignCenter"><span id="lowPrice" onClick={() => { selectSortBy("lowPrice", 1) }} className="py-3 cursor-pointer ">Price <span>(Lowest First)</span></span></p>
                            </div>
                        </div>
                    </div>
                    {scrollUp ? <div onClick={() => { window.scrollTo(0, 0); }} className="fixed w-full top-20"><p className="flex px-3 py-1 m-auto font-bold bg-white rounded-lg alignCenter blueText w-fit grayBlurShadow">Scroll Top <img className="h-2 ml-1 arrowUp" src="/img/blueDownArrow.png" alt="" /></p></div> : ""}
                    <main className="gap-2  allCardMainBox">
                        {/* filter */}
                        <div onClick={() => { mobileFilterHandle("close"); }} id="mobFilter" className="fixed top-0 z-20 w-full fullHeightInVh lowOpacityGrayBack mobileFilterClose ">
                            <aside onClick={(e) => { e.stopPropagation(); }} className="w-3/4 px-5 py-6 bg-white  fullHeightInVh filterBox">
                                <h1 className="text-right " > <span className="px-2 py-1 rounded-md grayBlurShadow" onClick={() => { mobileFilterHandle("close"); }}>Close</span></h1>
                                <h1 className="mb-4 text-2xl font-bold text-left ">Select Filters</h1>
                                <div className="text-left ">
                                    <h1 className="mb-2 font-semibold ">Suggested For You</h1>
                                    {suggetionFilterArray?.map((val) => {
                                        return (
                                            <div key={val.id} onClick={() => { filterdata(val.id, val.name) }} className="flex text-left alignCenter checkbox">
                                                <input id={val.id} type="checkbox" />
                                                <label className="ml-3 ">{val.name}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="mt-5 text-left ">
                                    <h1 className="mb-2 font-semibold ">Budget</h1>
                                    <div className="flex justify-start alignCenter">
                                        <input id="minBudget" className="w-20 h-10 pl-1 mr-3 rounded-md borderGray" type="number" placeholder="min" />
                                        <span>to</span>
                                        <input id="maxBudget" className="w-20 h-10 pl-1 ml-3 rounded-md borderGray" type="number" placeholder="max" />
                                        <button id="budgetBtn" onClick={budgetHandle} className="h-10 px-2 ml-3 rounded-md  blueBack"><img className="w-6 " src="/img/rightArrow.png" alt="" /></button>
                                    </div>
                                </div>
                            </aside>
                        </div>
                        {/* hotel cards div */}
                        <div className="flex flex-col gap-3">
                            {!cardLoading ?
                                listOfHotels?.map((val) => {
                                    return (
                                        // hotel cards
                                        <>
                                            <div key={val?._id} id={val?._id} onClick={() => { navigate(`/hotels/hotel-details/${val?._id}`) }} className="overflow-hidden rounded-md cursor-pointer  borderGray grayBlurShadow hotelCard">
                                                <div className="">
                                                    <div>
                                                        <LazyLoadImage className="rounded-md hotelCardImgMob" src={val?.images[0]} placeholderSrc="/img/mmtLoading.gif" />
                                                    </div>
                                                    <div className="flex justify-between">
                                                        {/* card left side */}
                                                        <div className="p-3 ">
                                                            <div >
                                                                <div className="text-left" >{val?.rating >= 4.5 ?
                                                                    <span className="font-bold ratingColor"><span className="px-1 text-white rounded-md  ratingBackColor">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span> Excellent</span> :
                                                                    val?.rating >= 3.5 ?
                                                                        <span className="font-bold ratingColor"><span className="px-1 text-white rounded-md  ratingBackColor">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span>Very Good</span> :
                                                                        val?.rating >= 2.5 ?
                                                                            <span className="font-bold ratingColor"><span className="px-1 text-white rounded-md  ratingBackColor">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span>Good</span> :
                                                                            <span className="font-bold ratingColor"><span className="px-1 text-white rounded-md  ratingBackColor">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span>Average</span>
                                                                }</div>
                                                                <h2 className="flex text-left alignCenter"><span className="text-2xl font-bold ">{val?.name}</span></h2>
                                                                <p className="mb-2 font-semibold text-left  blueText">{val?.location}</p>
                                                                <ul className="flex flex-wrap gap-2">
                                                                    {val?.amenities?.map((amenity, idx) => {
                                                                        return <li className="p-1 text-xs font-semibold text-gray-500 rounded borderblack">{amenity}</li>;
                                                                    })}
                                                                </ul>
                                                                <p className="mt-3 font-semibold text-left text-yellow-800 ">{val?.rooms.length} rooms available</p>
                                                            </div>
                                                        </div>
                                                        {/* card right side */}
                                                        <div className="flex flex-col justify-end p-3 text-right pb-7">
                                                            <h2 className=" lineHeight"><span className="text-2xl font-bold ">₹{Math.floor(val?.avgCostPerNight)}</span><br /><span className="text-sm text-gray-400 ">+ ₹{val?.childAndExtraBedPolicy.extraBedCharge} taxes & fees</span><br /><span className="text-sm text-gray-400 ">For per bed chargees</span></h2>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="px-3 py-2 mx-5 mb-2 text-xs font-semibold text-left text-green-900 bg-green-200 rounded-full "><p>Exclusive discount of INR 1000 applied on your 1st Hotel booking.</p></div>
                                            </div>
                                        </>
                                    )
                                }) : <img className='w-20 m-auto ' src="/img/mmtLoading.gif" alt="" />}
                        </div>
                    </main>
                </div>
            </MobileView>
        </>
    );
}

export default ShowAllHotels;