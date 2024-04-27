import React, { memo, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { monthNames, trainTickets, weekInitials, weekName } from '../Constant/constant';
import { AppContext } from "../ContextAPI/AppContext";
import "./train.css";
import { BrowserView, MobileView } from 'react-device-detect';

function TrainReview(props) {
    const { from, to, trainId, trainClass } = useParams();
    const navigate = useNavigate();
    const { token, isLogin, setIsLogin, hotelLocation, isModalOpen, setIsModalOpen, hotelArray, setHotelArray, setHotelLocation, source, setSource, fromOrTo, setFromOrTo, setFlightArray,
        destination, setDestination, currentTravelOption, setCurrentTravelOption, flightdate, setFlightDate, setBookingStatus, setPaymentOption, trainPassangers, setTrainPassangers } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [ticket, setTicket] = useState([]);
    const [ticketType, setTicketType] = useState("");
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [day, setDay] = useState("");
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 600);
        let getTicket = trainTickets?.filter((val) => {
            return val._id == trainId;
        });
        console.log(getTicket);
        setTicket(getTicket[0]);
        let getType = getTicket[0].availableTicket.filter((val) => {
            return val.class === trainClass
        });
        console.log(getType);
        setTicketType(getType[0]);
        setCurrentTravelOption("RAILS");
        let date = new Date();
        setDate(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setDay(date.getDay());
    }, []);
    console.log(ticket);
    const handlePay = () => {
        if (token) {
            navigate(`/payment/RAILS/${trainId}/${trainClass}`) 
            setBookingStatus(false);
            setPaymentOption(false);
        }
        else {
            setIsLogin({ ...isLogin, status: true });
        }

    }
    return (
        <div>
            <BrowserView>
                <div className='mb-20'>
                    <div className='relative pt-5 pb-5  gradientBackgroundBlue'>
                        <h1 className='m-auto mb-2 text-2xl font-bold text-left text-white  payWidth'>Review Your Booking</h1>
                    </div>
                    {!loading ?
                        <div className='grid justify-between px-2 m-auto mt-6 trainWidth trainReviewBox'>
                            <div>
                                <div className='flex gap-6 mb-8'>
                                    <div className='mr-8 text-left '>
                                        <h1 className='text-xl font-bold '>{ticket?.name}</h1>
                                        <h3 className='text-xs text-gray-400 '><span className='mr-2 '>{ticket?.trainCode}</span> | <span className='ml-2'>Departs on:</span>{ticket?.departOn?.map((val, idx) => {
                                            return val != weekInitials[idx] ? <span className='pl-1 font-semibold text-gray-300 '>{weekInitials[idx]}</span> : <span className='pl-1 font-semibold greenText'>{val}</span>
                                        })}</h3>
                                    </div>
                                    <div className='w-2/4 '>
                                        <div className='flex justify-between alignCenter'>
                                            <h1 className='font-bold '>{ticket?.arrivalTime},{weekName[day]}</h1>
                                            <div className='h-0.5 w-12 bg-gray-300'></div>
                                            <h3 className='text-xs font-semibold text-gray-400 '>{ticket?.duration}</h3>
                                            <div className='h-0.5 w-12 bg-gray-300'></div>
                                            <h1 className='font-bold '>{ticket?.departureTime},{ticket?.travelDayDuration === 1 ? weekName[day + 1] : weekName[day]}</h1>
                                        </div>
                                        <div className='flex justify-between text-sm text-gray-600'>
                                            <h1>{from}</h1>
                                            <h1>{to}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex gap-14'>
                                    <div>
                                        <h1 className='mb-2 font-semibold text-left '>Availability Status</h1>
                                        <div className='px-5 py-1 rounded-md  borderGray'>
                                            <div className='flex justify-between mb-2 alignCenter'>
                                                <h1 className='mr-6 font-semibold '>{ticketType.class}</h1>
                                                <h1 className='flex flex-row font-medium  greenText'>AVAILABLE-<span>{ticketType.seats}</span> </h1>
                                            </div>
                                            <h3 className='text-xs text-left text-gray-400 '>moments ago</h3>
                                        </div>
                                    </div>
                                    <div className='w-full pr-5 ml-5 '>
                                        <h1 className='mb-2 font-semibold text-left '>Your Boarding Station</h1>
                                        <div className='flex justify-between p-2 rounded-md alignCenter borderGray'>
                                            <h1>{from} - {ticket.arrivalTime}({date} {monthNames[month]}) </h1>
                                            <div className='flex  alignCenter'>
                                                <h1>Person</h1>
                                                <select onChange={(e) => { setTrainPassangers(e.target.value); }} className='w-12 ml-2 rounded-md borderGray' name="" id="">
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='rounded-md  borderGray fareWidth'>
                                <div className='p-4  bg-blue-50 borderBottomGray'>
                                    <button onClick={handlePay} className='w-full py-2 font-bold text-center text-white rounded-md  gradientBlueBack'>PAY & BOOK NOW</button>
                                </div>
                                <div className='flex flex-col gap-3 p-4'>
                                    <div className='flex justify-between alignCenter'>
                                        <h1>Base fare per adult</h1>
                                        <h1 className='font-bold '>₹{ticketType?.price}</h1>
                                    </div>
                                    {ticketType?.price > 1000 ?
                                        <div className='flex justify-between alignCenter'>
                                            <h1>Catering charge</h1>
                                            <h1 className='font-bold '>₹308</h1>
                                        </div> : ""}
                                    <div className='flex justify-between alignCenter'>
                                        <h1>Tax</h1>
                                        <h1 className='font-bold '>₹58</h1>
                                    </div>
                                    <div className='flex justify-between alignCenter'>
                                        <h1>Reservation charge</h1>
                                        <h1 className='font-bold '>₹40</h1>
                                    </div>

                                </div>
                                <div className='flex justify-between p-4 alignCenter bg-gray-50'>
                                    <h1>Total Price</h1>
                                    <h1 className='font-bold '>₹{(ticketType?.price * trainPassangers) + 40 + 58 + 308}</h1>
                                </div>
                            </div>
                        </div> : <img className='w-32 m-auto ' src="/img/mmtLoading.gif" alt="" />}
                </div>
            </BrowserView>
            <MobileView>
                <div className='pt-5 pb-20 text-white  fullHeightInVh gradientBackgroundBlue'>
                    <img className='w-20 m-auto mb-3 ' src="/img/mmt_logo_rt.png" alt="" />
                    <h3 className='text-xs text-white '>Trip to</h3>
                    <h1 className='mb-5 text-xl font-semibold '>{to}</h1>
                    <div className='justify-between px-2 m-auto mt-2 '>
                        <div className=''>
                            <div className='gap-6 mb-8 '>
                                <div className='mb-4 text-left '>
                                    <h1 className='text-xl font-bold '>{ticket?.name}</h1>
                                    <h3 className='text-xs text-gray-400 '><span className='mr-2 '>{ticket?.trainCode}</span> | <span className='ml-2'>Departs on:</span>{ticket?.departOn?.map((val, idx) => {
                                        return val != weekInitials[idx] ? <span className='pl-1 font-semibold text-gray-300 '>{weekInitials[idx]}</span> : <span className='pl-1 font-semibold greenText'>{val}</span>
                                    })}</h3>
                                </div>
                                <div className=''>
                                    <div className='flex justify-between alignCenter'>
                                        <h1 className='font-bold '>{ticket?.arrivalTime},{weekName[day]}</h1>

                                        <h3 className='flex gap-1 text-xs font-semibold text-gray-400 alignCenter'> <div className='h-0.5 w-5 mt-1 bg-gray-300'></div>{ticket?.duration}<div className='h-0.5 w-5 mt-1 bg-gray-300'></div></h3>

                                        <h1 className='font-bold '>{ticket?.departureTime},{ticket?.travelDayDuration === 1 ? weekName[day + 1] : weekName[day]}</h1>
                                    </div>
                                    <div className='flex justify-between text-sm font-medium'>
                                        <h1>{from}</h1>
                                        <h1>{to}</h1>
                                    </div>
                                </div>
                            </div>
                            <>
                                <div className='mb-5'>
                                    <h1 className='mb-2 font-semibold text-left '>Availability Status</h1>
                                    <div className='px-5 py-1 rounded-md  borderGray'>
                                        <div className='flex justify-between mb-2 alignCenter'>
                                            <h1 className='mr-6 font-semibold '>{ticketType.class}</h1>
                                            <h1 className='flex flex-row font-medium  greenText'>AVAILABLE-<span>{ticketType.seats}</span> </h1>
                                        </div>
                                        <h3 className='text-xs text-left text-gray-400 '>moments ago</h3>
                                    </div>
                                </div>
                                <div className='mb-5 '>
                                    <h1 className='mb-2 font-semibold text-left '>Your Boarding Station</h1>
                                    <div className='flex justify-between p-3 rounded-md alignCenter borderGray'>
                                        <h1>{from} - {ticket.arrivalTime}({date} {monthNames[month]}) </h1>
                                        <div className='flex  alignCenter'>
                                            <h1>Person</h1>
                                            <select onChange={(e) => { setTrainPassangers(e.target.value); }} className='w-12 pl-1 ml-2 text-gray-400 bg-transparent rounded-md borderGray' name="" id="">
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </>
                        </div>
                        {/* fare breakup */}
                        <div className='rounded-md  borderGray'>
                            <div className='flex flex-col gap-3 p-4'>
                                <div className='flex justify-between alignCenter'>
                                    <h1>Base fare per adult</h1>
                                    <h1 className='font-bold '>₹{ticketType?.price}</h1>
                                </div>
                                {ticketType?.price > 1000 ?
                                    <div className='flex justify-between alignCenter'>
                                        <h1>Catering charge</h1>
                                        <h1 className='font-bold '>₹308</h1>
                                    </div> : ""}
                                <div className='flex justify-between alignCenter'>
                                    <h1>Tax</h1>
                                    <h1 className='font-bold '>₹58</h1>
                                </div>
                                <div className='flex justify-between alignCenter'>
                                    <h1>Reservation charge</h1>
                                    <h1 className='font-bold '>₹40</h1>
                                </div>

                            </div>
                            <div className='flex justify-between p-4 alignCenter borderTopGray'>
                                <h1>Total Price</h1>
                                <h1 className='font-bold '>₹{(ticketType?.price * trainPassangers) + 40 + 58 + (ticketType?.price > 1000 ? 308 : 0)}</h1>
                            </div>
                        </div>
                    </div>
                    <div className='fixed bottom-0 z-20 flex justify-between w-full px-4 py-3 bg-gray-900  alignCenter'>
                        <h2 className='text-3xl font-bold text-white '>₹ {(ticketType?.price * trainPassangers) + 40 + 58 + (ticketType?.price > 1000 ? 308 : 0)}<span className='ml-1 text-xs font-normal '>DUE</span></h2>
                        <button onClick={handlePay} className='px-4 py-2 font-bold text-center text-white rounded-full  gradientBlueBack'>CONTINUE</button>
                    </div>
                </div>
            </MobileView>
        </div>
    );
}

export default memo(TrainReview);