import React, { memo, useContext, useEffect, useState } from 'react';
import "./flightAndTrainModal.css";
import { debounce } from 'lodash';
import { AppContext } from '../ContextAPI/AppContext';
import { cityListArray } from '../Constant/constant';
import ShimmerLocation from '../Loader/ShimmerLocation';

function TrainModal(props) {
    const { flightArray, isModalOpen, fromOrTo, setFromOrTo, setIsModalOpen,sourceBusTrain, setSourceBusTrain,
        destinationBusTrain, setDestinationBusTrain, } = useContext(AppContext);
    const [trainName, setTrainName] = useState(cityListArray);
    const [filterTrainName, setFilterTrainName] = useState(cityListArray);
    const [searchCityName, setSearchCityName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleText = debounce((text) => {
        setSearchCityName(text);
    }, 700);
    const searchAirport = () => {
        if (searchCityName) {
            const filterCity = trainName?.filter((val) => {
                let wordArr = val.city?.toLocaleLowerCase();
                wordArr = wordArr?.split("");
                let word = wordArr?.slice(0, searchCityName.length);
                word = word?.join("");
                if (word === searchCityName?.toLocaleLowerCase()) {
                    return val;
                }
            });
            console.log(filterCity);
            setFilterTrainName(filterCity);
            setLoading(false);
        }
        else if (!searchCityName) {
            setLoading(false);
            setFilterTrainName(trainName);
        }
        setLoading(false);
    }
    const handleModal = (e, city) => {
        e.stopPropagation();
        if (fromOrTo === "from") {
            setSourceBusTrain(city);
            setIsModalOpen(false);
        }
        else if (fromOrTo === "to") {
            setDestinationBusTrain(city);
            setIsModalOpen(false);
        }

    }
    useEffect(() => {
        searchAirport();
    }, [searchCityName]);

    useEffect(() => {
        console.log("Modal", isModalOpen);
    }, [isModalOpen]);
    return (
        <div className='px-1 py-1 bg-white grayBlurShadow '>
            <div className='flex  alignCenter' ><img className='w-6 h-6 ' src="/img/graySearch.png" alt="search" />
                <input type="text" className='w-full p-1  cityNameSearchInput' onChange={(e) => { setLoading(true); handleText(e.target.value) }} autoFocus placeholder={fromOrTo === "from" ? 'From' : 'To'} /></div>
                <p className='mb-1 text-xs '>POPULAR CITIES</p>
            <div className='overflow-y-scroll  no-scrollbar cityList'>
                
                {!loading && filterTrainName.length>=1?
                filterTrainName?.map((val) => {
                    return (
                        <>
                            {
                                val.name!==sourceBusTrain && val.location!==destinationBusTrain?
                                <div key={val.name} onClick={(e) => { handleModal(e, val.name) }} className='flex w-full px-1  alignCenter hoverGrayShadow'>
                                    <img className='w-6 h-6 mr-1 ' src="/img/trainOff.png" alt="train img" />
                                    <div className='px-1'>
                                        <p className='text-base font-semibold '>{val.name}</p>
                                        <p className='w-full text-sm text-gray-400  textOverflowHide'>{val.location}</p>
                                    </div>
                                </div>:""
                            }</>
                    )
                }): !loading? <><h3 className='font-semibold text-red-600 ' >Sorry!!</h3><p className='font-semibold '>Your search is not available.</p></> :<ShimmerLocation/>}
            </div>
        </div>
    );
}

export default memo(TrainModal);