import React, { memo, useContext, useEffect, useState } from 'react';
import "./flightAndTrainModal.css";
import { debounce } from 'lodash';
import { AppContext } from '../ContextAPI/AppContext';
import { cityListArray } from '../Constant/constant';
import ShimmerLocation from '../Loader/ShimmerLocation';

function HotelModal(props) {
    const {hotelLocation,setHotelLocation,hotelArray, isModalOpen, fromOrTo, setFromOrTo, setIsModalOpen,source, setSource,destination, setDestination } = useContext(AppContext);
    const [hotelName, setHotelName] = useState(hotelArray);
    const [filterHotelName, setFilterHotelName] = useState(hotelArray);
    const [searchCityName, setSearchCityName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleText = debounce((text) => {
        setSearchCityName(text);
    }, 700);
    
    const searchAirport = () => {
        if (searchCityName) {
            const filterCity = hotelName?.filter((val) => {
                let wordArr = val.name?.toLocaleLowerCase();
                let wordArr2= val.location?.toLocaleLowerCase();
                wordArr = wordArr?.split("");
                wordArr2= wordArr2?.split("");
                let word = wordArr?.slice(0, searchCityName.length);
                let word2 = wordArr2?.slice(0, searchCityName.length);
                word = word?.join("");
                word2 = word2?.join("");
                if (word === searchCityName?.toLocaleLowerCase() || word2 === searchCityName?.toLocaleLowerCase()) {
                    return val;
                }
            });
            console.log(filterCity);
            if(filterCity[0]?.location!==hotelLocation){
                setFilterHotelName(filterCity);
            }
            else{
                setFilterHotelName([]);
            }
            
            setLoading(false);
        }
        else if (!searchCityName) {
            setLoading(false);
            setFilterHotelName(hotelName);
        }
        setLoading(false);
    }
    const handleModal = (e, hotel) => {
        e.stopPropagation();
            setHotelLocation(hotel);
            setIsModalOpen(false);
    }
    useEffect(() => {
        searchAirport();
    }, [searchCityName]);

    return (
        <div className='px-1 py-1 bg-white grayBlurShadow '>
            <div className='flex  alignCenter' ><img className='w-6 h-6 ' src="/img/graySearch.png" alt="search" />
                <input type="text" className='w-full p-1  cityNameSearchInput' onChange={(e) => {setLoading(true); handleText(e.target.value) }} autoFocus placeholder={fromOrTo === "from" ? 'From' : 'To'} /></div>
                <p className='mb-1 text-xs '>Hotels</p>
            <div className='overflow-y-scroll  no-scrollbar cityList'>
                {!loading  && filterHotelName.length>=1?
                filterHotelName?.map((val,idx) => {
                    return (
                        <>
                            {
                                val.name!==hotelLocation?
                                <div key={val.id} onClick={(e) => { handleModal(e, val.name) }} className='flex w-full px-1  alignCenter hoverGrayShadow'>
                                    <img className='w-6 h-6 mr-1 ' src="/img/hotelOff.png" alt="hotel img" />
                                    <div className='px-1'>
                                        <p className='text-base font-semibold '>{val.name}</p>
                                        <p className='w-full text-sm text-gray-400  textOverflowHide'>{val.location}</p>
                                    </div>
                                </div>:""
                            }</>
                    )
                }):!loading? <><h3 className='font-semibold text-red-600 ' >Sorry!!</h3><p className='font-semibold '>Your search is not available.</p></>: <ShimmerLocation/>}
            </div>
        </div>
    );
}

export default memo(HotelModal);