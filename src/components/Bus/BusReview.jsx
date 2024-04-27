import React, { useContext, useState } from 'react';
import { getBusTicket, monthNames, weekName } from '../Constant/constant';
import { useNavigate, useParams } from 'react-router';
import { AppContext } from '../ContextAPI/AppContext';
import { BrowserView, MobileView } from 'react-device-detect';

function BusReview(props) {
    const { busId } = useParams();
    const navigate = useNavigate();
    const { token, sourceBusTrain, destinationBusTrain, isLogin, setIsLogin,
        setCurrentTravelOption, flightdate, setBookingStatus, setPaymentOption,
        trainPassangers, setTrainPassangers } = useContext(AppContext);
    const [busTicket, setBusTicket] = useState([]);
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [day, setDay] = useState("");
    // get bus ticket info
    const getTicket = async () => {
        setLoading(true);
        let res = await getBusTicket(busId);
        console.log(res);
        setBusTicket(res);
        setLoading(false);
    }
    // set date and travel option
    useState(() => {
        getTicket();
        setCurrentTravelOption("BUSES")
        let date = flightdate;
        setDate(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setDay(date.getDay());
    }, []);
    // move to payment section if user login
    const handlePay = () => {
        if (token) {
            navigate(`/payment/BUSES/${busId}/"`)
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
                        <div className='grid justify-between gap-3 px-2 m-auto mt-6 trainWidth trainReviewBox'>
                            <div className='borderGray rounded-2xl'>
                                <div className='flex gap-8 px-5 pt-3 pb-5 text-left'>
                                    <div>
                                        <h1 className='text-xl font-bold '>{busTicket?.name}</h1>
                                        <h1 className='w-20 mr-6 font-semibold '>{busTicket?.type}</h1>
                                    </div>
                                    <div className='w-3/4 '>
                                        <h1 className='font-semibold text-left '>Your Boarding Station</h1>
                                        <div className='flex justify-between px-2 py-1 rounded-md alignCenter borderGray'>
                                            <h1>{sourceBusTrain} - {busTicket?.destinationBusTrain}({date} {monthNames[month]}) </h1>
                                            <div className='flex ml-5  alignCenter'>
                                                <h1>Passangers</h1>
                                                <select onChange={(e) => { setTrainPassangers(e.target.value); }} className='w-12 ml-2 rounded-md borderGray' >
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

                                <div className='mb-8 '>
                                    <div className='px-5 py-1 mb-5 bg-gray-200 '>
                                        <div className='flex pr-1 text-white rounded-md alignCenter w-fit ratingBack'><img className=' w-5 mt-0.5' src="/img/populer.png" alt="" /><span>3.4</span></div>
                                    </div>
                                    <div className='px-5 '>
                                        <div className='flex justify-between alignCenter'>
                                            <h1 className='font-bold '>{busTicket?.departureTime}, <span className='font-normal text-gray-600 '>{date} {monthNames[month]}'{year}, {weekName[day]}</span></h1>
                                            <div className='flex gap-2 alignCenter'>
                                                <div className='h-0.5 w-12 bg-gray-300'></div>
                                                <h3 className='text-xs font-semibold text-gray-400 '>To</h3>
                                                <div className='h-0.5 w-12 bg-gray-300'></div>
                                            </div>
                                            <h1 className='font-bold '>{busTicket?.arrivalTime}, <span className='font-normal text-gray-600 '>{date} {monthNames[month]}'{year}, {weekName[day]}</span></h1>
                                        </div>
                                        <div className='flex justify-between text-sm'>
                                            <div className='text-left  w-28'>
                                                <h1 className='font-bold '>{sourceBusTrain},</h1>
                                                <h2 className='text-gray-500'>{busTicket?.source}</h2>
                                            </div>
                                            <div className='text-right  w-28'>
                                                <h1 className='font-bold '>{destinationBusTrain},</h1>
                                                <h2 className='text-gray-500 '>{busTicket?.destination}</h2>
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
                                        <h1 className='font-bold '>₹{busTicket?.fare}</h1>
                                    </div>

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
                                    <h1 className='font-bold '>₹{(busTicket?.fare * trainPassangers) + 40 + 58}</h1>
                                </div>
                            </div>
                        </div> : <img className='w-32 m-auto ' src="/img/mmtLoading.gif" alt="" />}
                </div>
            </BrowserView>
            <MobileView>
                <div className='pt-5 pb-20 text-white  fullHeightInVh gradientBackgroundBlue'>
                    <img className='w-20 m-auto mb-3 ' src="/img/mmt_logo_rt.png" alt="" />
                    <h3 className='text-xs text-white '>Trip to</h3>
                    <h1 className='mb-5 text-xl font-semibold '>{destinationBusTrain}</h1>
                    <div className='justify-between px-2 m-auto mt-2 '>
                        <div className=''>
                            <div className='gap-6 mb-8 '>
                                <div className='mb-4 text-left '>
                                    <h1 className='text-xl font-bold '>{busTicket?.name}</h1>

                                </div>
                                <div className=''>
                                    <div className='flex justify-between alignCenter'>
                                        <h1 className='font-bold '>{busTicket?.departureTime},{weekName[day]}</h1>

                                        <h3 className='flex gap-1 text-xs font-semibold text-gray-400 alignCenter'> <div className='h-0.5 w-5 mt-1 bg-gray-300'></div>To<div className='h-0.5 w-5 mt-1 bg-gray-300'></div></h3>

                                        <h1 className='font-bold '>{busTicket?.arrivalTime},{weekName[day]}</h1>
                                    </div>
                                    <div className='flex justify-between text-sm font-medium'>
                                        <h1>{sourceBusTrain}</h1>
                                        <h1>{destinationBusTrain}</h1>
                                    </div>
                                </div>
                            </div>
                            <>
                                <div className='mb-5'>
                                    <h1 className='mb-2 font-semibold text-left '>Availability Status</h1>
                                    <div className='px-5 py-1 rounded-md  borderGray'>
                                        <div className='flex justify-between mb-2 alignCenter'>
                                            <h1 className='mr-6 font-semibold '>{busTicket?.type}</h1>
                                            <h1 className='flex flex-row font-medium  greenText'>AVAILABLE-<span>{busTicket?.seats}</span> </h1>
                                        </div>
                                        <h3 className='text-xs text-left text-gray-400 '>moments ago</h3>
                                    </div>
                                </div>
                                <div className='mb-5 '>
                                    <h1 className='mb-2 font-semibold text-left '>Your Boarding Stop</h1>
                                    <div className='flex justify-between p-3 rounded-md alignCenter borderGray'>
                                        <h1>{sourceBusTrain} - {busTicket?.departureTime}({date} {monthNames[month]}) </h1>
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
                                    <h1 className='font-bold '>₹{busTicket?.fare}</h1>
                                </div>

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
                                <h1 className='font-bold '>₹{(busTicket?.fare * trainPassangers) + 40 + 58}</h1>
                            </div>
                        </div>
                    </div>
                    <div className='fixed bottom-0 z-20 flex justify-between w-full px-4 py-3 bg-gray-900  alignCenter'>
                        <h2 className='text-3xl font-bold text-white '>₹ {(busTicket?.fare * trainPassangers) + 40 + 58}<span className='ml-1 text-xs font-normal '>DUE</span></h2>
                        <button onClick={handlePay} className='px-4 py-2 font-bold text-center text-white rounded-full  gradientBlueBack'>CONTINUE</button>
                    </div>
                </div>
            </MobileView>
        </div>
    );
}

export default BusReview;