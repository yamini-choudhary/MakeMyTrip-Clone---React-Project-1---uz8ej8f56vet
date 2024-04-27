import { memo, useContext, useEffect, useState } from "react";
import "./travelOption.css"
import { AppContext } from "../ContextAPI/AppContext";
import { monthNames, weekName } from "../Constant/constant";
import { Link } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";

function TravelOptions(props) {
    const { currentTravelOption, setCurrentTravelOption, source, setSource,
        destination, setDestination, } = useContext(AppContext);
    return (
        <>
            <BrowserView className="absolute w-3/4 px-5 py-3 m-auto bg-white rounded-2xl bookingIcons">
                <div className="flex justify-around alignCenter">
                    <div onClick={() => { setCurrentTravelOption('FLIGHTS') }} className="w-10 cursor-pointer ">
                        {currentTravelOption === "FLIGHTS" ? <img src="/img/flightOn.png" alt="flight img" /> : <img src="/img/flightOff.png" alt="flight img" />}
                        <p>{currentTravelOption === "FLIGHTS" ? <span className="pb-2 font-bold  blueText blueBottomBorder">Flights</span> : <span>Flights</span>}</p>
                    </div>

                    <div onClick={() => { setCurrentTravelOption('HOTELS') }} className="cursor-pointer  w-7">
                        {currentTravelOption === "HOTELS" ? <img src="/img/hotelOn.png" alt="hotel img" /> : <img src="/img/hotelOff.png" alt="hotel img" />}
                        <p>{currentTravelOption === "HOTELS" ? <span className="font-bold  blueText blueBottomBorder">Hotels</span> : <span>Hotels</span>}</p>
                    </div>

                    <div onClick={() => { setCurrentTravelOption('RAILS') }} className="w-10 cursor-pointer ">
                        {currentTravelOption === "RAILS" ? <img src="/img/trainOn.png" alt="train img" /> : <img src="/img/trainOff.png" alt="train img" />}
                        <p>{currentTravelOption === "RAILS" ? <span className="pb-2 font-bold  blueText blueBottomBorder">Trains</span> : <span>Trains</span>}</p>
                    </div>

                    <div onClick={() => { setCurrentTravelOption('BUSES') }} className="cursor-pointer  w-9">
                        {currentTravelOption === "BUSES" ? <img src="/img/busOn.png" alt="bus img" /> : <img src="/img/busOff.png" alt="bus img" />}
                        <p>{currentTravelOption === "BUSES" ? <span className="pb-2 font-bold  blueText blueBottomBorder">Buses</span> : <span>Buses</span>}</p>
                    </div>
                </div>
            </BrowserView>
            <MobileView>
                <div className="absolute grid w-full grid-cols-4 gap-2 pl-1 pr-3 m-auto mt-2  rounded-2xl alignCenter">
                    <div onClick={() => { setCurrentTravelOption('FLIGHTS') }} className="flex flex-col justify-center py-1 bg-white rounded-lg cursor-pointer  alignCenter">
                        {currentTravelOption === "FLIGHTS" ? <img className="w-10" src="/img/flightOn.png" alt="flight img" /> : <img className="w-10" src="/img/flightOff.png" alt="flight img" />}
                        <p>{currentTravelOption === "FLIGHTS" ? <span className="font-bold  blueText blueBottomBorder">Flights</span> : <span>Flights</span>}</p>
                    </div>

                    <div onClick={() => { setCurrentTravelOption('HOTELS') }} className="flex flex-col justify-center py-1 bg-white rounded-lg cursor-pointer  alignCenter">
                        {currentTravelOption === "HOTELS" ? <img className="w-7" src="/img/hotelOn.png" alt="hotel img" /> : <img className="w-7" src="/img/hotelOff.png" alt="hotel img" />}
                        <p>{currentTravelOption === "HOTELS" ? <span className="font-bold  blueText blueBottomBorder">Hotels</span> : <span>Hotels</span>}</p>
                    </div>

                    <div onClick={() => { setCurrentTravelOption('RAILS') }} className="flex flex-col justify-center py-1 bg-white rounded-lg cursor-pointer  alignCenter">
                        {currentTravelOption === "RAILS" ? <img className="w-10" src="/img/trainOn.png" alt="train img" /> : <img className="w-10" src="/img/trainOff.png" alt="train img" />}
                        <p>{currentTravelOption === "RAILS" ? <span className="font-bold  blueText blueBottomBorder">Trains</span> : <span>Trains</span>}</p>
                    </div>

                    <div onClick={() => { setCurrentTravelOption('BUSES') }} className="flex flex-col justify-center py-1 bg-white rounded-lg cursor-pointer  alignCenter">
                        {currentTravelOption === "BUSES" ? <img className="w-9" src="/img/busOn.png" alt="bus img" /> : <img className="w-9" src="/img/busOff.png" alt="bus img" />}
                        <p>{currentTravelOption === "BUSES" ? <span className="font-bold  blueText blueBottomBorder">Buses</span> : <span>Buses</span>}</p>
                    </div>
                </div>
            </MobileView>
        </>
    );
}

export default TravelOptions;