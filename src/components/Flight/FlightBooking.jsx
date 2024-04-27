import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { flightCodeArray, getAirportName, getFLightTicket, monthNames, weekName } from '../Constant/constant';
import { AppContext } from '../ContextAPI/AppContext';
import { useNavigate, useParams } from 'react-router';
import { BrowserView, MobileView } from 'react-device-detect';

function FlightBooking(props) {
    const { flightId } = useParams();
    const navigate = useNavigate();
    const { setCurrentTravelOption, flightArray, setFlightArray,
        flightdate, setBookingStatus, setPaymentOption } = useContext(AppContext);
    const [flightTicket, setFlightTicket] = useState([]);
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [day, setDay] = useState("");

    useEffect(() => {
        setCurrentTravelOption("FLIGHTS")
        let date = flightdate;
        setDate(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setDay(date.getDay());
    }, []);
    const getTicket = async () => {
        try {
            let res = await getFLightTicket(flightId);
            setFlightTicket(res);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }
    console.log(flightTicket?.source);
    useEffect(() => {
        getTicket();
        (
            async () => {
                let res = await getAirportName();
                console.log(res);
                setFlightArray(res);
            }
        )();
    }, []);
    return (
        <>
            <BrowserView>
                <section className='mb-20 fullHeightInVh bg-blue-50'>
                    <div className='relative pt-5 pb-16  gradientBackgroundBlue'>
                        <h1 className='m-auto mb-2 text-2xl font-bold text-left text-white  payWidth'>Complete Your Booking</h1>
                        <div className='absolute z-10 w-full  top-16'>
                            <div className='grid gap-5 p-5 m-auto bg-white payWidth flightBookingBox'>
                                <div className='p-3 grayBlurShadow'>
                                    <div className='flex alignCenter '>
                                        <h1>{flightCodeArray?.map((val) => {
                                            return flightTicket?.source === val.code ? val.city : "";
                                        })
                                        }</h1>
                                        <img className='w-4' src="/img/blueRightArrow.png" alt="" />
                                        <h1>{flightCodeArray?.map((val) => {
                                            return flightTicket?.destination === val.code ? val.city : "";
                                        })
                                        }</h1>
                                    </div>
                                    <div className='flex pb-4 alignCenter '>
                                        <h1 className='px-2 font-semibold  bg-red-50'>{weekName[day]}, {monthNames[month]} {date}</h1>
                                        <h1 className="ml-2 text-sm ">{flightTicket?.stops != 0 ? flightTicket?.stops + " stop" : "Non stop"}</h1>
                                        <span className='mx-1'>-</span>
                                        <h1 className="text-sm ">0{flightTicket?.duration}h 00m</h1>
                                    </div>
                                    <div className="flex pb-3 text-left">
                                        <img className="w-8 h-8 mr-1 " src="/img/flightLogo.jpg" alt="" />
                                        <h1 className="text-xl font-bold ">IndiGo <span className="px-1 text-gray-400 rounded-full  flightIdText borderGray">{flightTicket?.flightID}</span></h1>
                                    </div>
                                    <div className='p-4 mt-3 grayBack'>
                                        <div className='flex text-sm alignCenter'>
                                            <h1 className='font-bold '>{flightTicket?.arrivalTime}</h1>
                                            <div className='w-3 h-3 mx-4 mt-1 rounded-full borderblack'></div>
                                            <h1 className='font-bold '>{flightCodeArray?.map((val) => {
                                                return flightTicket?.source === val.code ? val.city : "";
                                            })},</h1>
                                            <h1>{flightArray?.map((val) => {
                                                return flightTicket?.source === val.iata_code ? val.name : "";
                                            })}, Terminal 3</h1>
                                        </div>
                                        <div><h1 className="py-2 text-sm font-semibold text-gray-500 ">0{flightTicket?.duration}h 00m</h1></div>
                                        <div className='flex pb-4 text-sm alignCenter borderBottomGray'>
                                            <h1 className='font-bold '>{flightTicket?.departureTime}</h1>
                                            <div className='w-3 h-3 mx-4 mt-1 rounded-full borderblack'></div>
                                            <h1 className='font-bold '>{flightCodeArray?.map((val) => {
                                                return flightTicket?.destination === val.code ? val.city : "";
                                            })},</h1>
                                            <h1>{flightArray?.map((val) => {
                                                return flightTicket?.destination === val.iata_code ? val.name : "";
                                            })}, Terminal 2</h1>
                                        </div>
                                        <div className='flex py-3 text-sm alignCenter'>
                                            <img className='w-6  yellowback' src="/img/cabinBag.png" alt="" />
                                            <h1 className='ml-2 font-semibold '>Cabin Baggage: <span className='font-normal '>8Kgs / Adult</span></h1>
                                            <img className='w-4 ml-4' src="/img/checkInBag.png" alt="" />
                                            <h1 className='ml-2 font-semibold '>Check-In Baggage: <span className='font-normal '>25 Kgs / Adult</span></h1>
                                        </div>
                                    </div>
                                </div>
                                <div className='p-3 grayBlurShadow'>
                                    <h1 className='text-xl font-bold text-left'>Fare Summary</h1>
                                    <div className='flex justify-between py-4 alignCenter borderBottomGray'>
                                        <div className='flex alignCenter'>
                                            <img className='w-4 h-4 mr-3' src="/img/addIcon.png" alt="" />
                                            <h2>Base Fare</h2>
                                        </div>
                                        <h2 className='text-gray-500'>₹ {flightTicket?.ticketPrice + 888}</h2>
                                    </div>
                                    <div className='flex justify-between py-4 alignCenter borderBottomBlack'>
                                        <div className='flex alignCenter'>
                                            <img className='w-4 h-4 mr-3' src="/img/addIcon.png" alt="" />
                                            <h2>Taxes and Surcharges</h2>
                                        </div>
                                        <h2 className='text-gray-500'>₹ 369</h2>
                                    </div>
                                    <div className='flex justify-between py-4 alignCenter '>
                                        <h2 className='font-bold '>Total Amount</h2>
                                        <h2 className='font-bold '>₹ {flightTicket?.ticketPrice + 369 + 888}</h2>
                                    </div>
                                    <div className='text-right '>
                                        <button onClick={() => { setBookingStatus(false); setPaymentOption(false); navigate(`/payment/FLIGHTS/${flightId}/""`) }} className='py-2 font-bold text-center text-white rounded-full  gradientBlueBack payBtn'>Book Now</button>
                                    </div>
                                    <img className='w-1/2 pr-2 m-auto ' src="/img/mmtbackWhiteImage.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </BrowserView>
            <MobileView >
                <section className='pb-6 fullHeightInVh gradientBackgroundBlue'>
                    <div className='relative pt-5 pb-16 '>
                        <img className='w-20 m-auto mb-5 ' src="/img/mmt_logo_rt.png" alt="" />
                        <h3 className='text-xs text-white '>Trip to</h3>
                        <h1 className='m-auto mb-5 text-3xl font-bold text-white '>{flightCodeArray?.map((val) => {
                            return flightTicket?.destination === val.code ? val.city : "";
                        })
                        }</h1>
                        <div className="flex px-5 text-left text-white alignCenter">
                            <img className="w-5 h-5 mb-1 mr-1 " src="/img/flightLogo.jpg" alt="" />
                            <h1 className="text-xl font-bold ">IndiGo|<span className=" flightIdText">{flightTicket?.flightID}</span></h1>
                        </div>
                        {/* ---------------------------------- */}
                        <div className='z-10 w-full text-white '>
                            <div className='m-auto  flightBookingBox'>
                                <div className=''>
                                    <div className='grid grid-cols-3 px-5 mt-3 '>
                                        <div className='text-left '>
                                            <h1 className='text-2xl font-bold'>{flightTicket?.departureTime}</h1>
                                            <h3 className='mb-3 text-xs '>{weekName[day]},{date}{monthNames[month]}{year}</h3>
                                            <h1 className='text-sm font-bold'>{flightCodeArray?.map((val) => {
                                                return flightTicket?.source === val.code ? val.city : "";
                                            })} ,</h1>
                                            <h1 className='text-sm '>{flightArray?.map((val) => {
                                                return flightTicket?.source === val.iata_code ? val.name : "";
                                            })}</h1>
                                        </div>
                                        <div>
                                            <h1 className="mb-1 text-sm font-semibold">0{flightTicket?.duration}h 00m</h1>
                                            <img className='w-10 m-auto ' src="/img/stop_info_icon.png" alt="" />
                                        </div>
                                        <div className='text-right '>
                                            <h1 className='text-2xl font-bold'>{flightTicket?.arrivalTime}</h1>
                                            <h3 className='mb-3 text-xs '>{weekName[day]},{date}{monthNames[month]}{year}</h3>
                                            <h1 className='text-sm font-bold '>{flightCodeArray?.map((val) => {
                                                return flightTicket?.destination === val.code ? val.city : "";
                                            })} ,</h1>
                                            <h1 className='text-sm '>{flightArray?.map((val) => {
                                                return flightTicket?.destination === val.iata_code ? val.name : "";
                                            })}</h1>
                                        </div>
                                    </div>
                                    <div className='p-3 mx-3 mt-6 text-sm text-black bg-white rounded-lg '>
                                        <div className='flex justify-between mb-3 alignCenter'>
                                            <div className='flex alignCenter'>
                                                <img className='w-6 ' src="/img/cabinBag.png" alt="" />
                                                <h1 className='ml-2 font-semibold '>Cabin Baggage</h1>
                                            </div>
                                            <span className='font-normal '>8 Kgs(1 Piece only) / Adult</span>
                                        </div>
                                        <div className='flex justify-between alignCenter'>
                                            <div className='flex alignCenter'>
                                                <img className='w-4 ml-1.5' src="/img/checkInBag.png" alt="" />
                                                <h1 className='ml-2 font-semibold '>Check-In Baggage</h1>
                                            </div>
                                            <span className='font-normal '>25 Kgs(1 Piece only) / Adult</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='px-3 pt-2 mx-3 mt-4 text-black bg-white rounded-lg grayBlurShadow'>
                                    <h1 className='text-xl font-bold text-left'>Fare Summary</h1>
                                    <div className='flex justify-between py-4 alignCenter borderBottomGray'>
                                        <div className='flex alignCenter'>
                                            <img className='w-4 h-4 mr-3' src="/img/addIcon.png" alt="" />
                                            <h2>Base Fare</h2>
                                        </div>
                                        <h2 className='text-gray-500'>₹ {flightTicket?.ticketPrice + 888}</h2>
                                    </div>
                                    <div className='flex justify-between py-4 alignCenter borderBottomBlack'>
                                        <div className='flex alignCenter'>
                                            <img className='w-4 h-4 mr-3' src="/img/addIcon.png" alt="" />
                                            <h2>Taxes and Surcharges</h2>
                                        </div>
                                        <h2 className='text-gray-500'>₹ 369</h2>
                                    </div>
                                    <div className='flex justify-between pt-4 alignCenter '>
                                        <h2 className='font-bold '>Total Amount</h2>
                                        <h2 className='font-bold '>₹ {flightTicket?.ticketPrice + 369 + 888}</h2>
                                    </div>
                                    <img className='w-1/3 pr-2 m-auto ' src="/img/mmtbackWhiteImage.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className='fixed bottom-0 z-20 flex justify-between w-full px-4 py-3 bg-gray-900  alignCenter'>
                            <h2 className='text-3xl font-bold text-white '>₹ {flightTicket?.ticketPrice + 369 + 888}<span className='ml-1 text-xs font-normal '>DUE</span></h2>
                            <button onClick={() => { setBookingStatus(false); setPaymentOption(false); navigate(`/payment/FLIGHTS/${flightId}/""`) }} className='px-4 py-2 font-bold text-center text-white rounded-full  gradientBlueBack'>CONTINUE</button>
                        </div>
                    </div>
                </section>
            </MobileView>
        </>
    );
}

export default FlightBooking;