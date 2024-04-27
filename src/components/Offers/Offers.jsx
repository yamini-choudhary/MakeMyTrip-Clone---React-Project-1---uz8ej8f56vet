import React, { useEffect, useState } from 'react';
import "./offers.css";
import { offerNavlist } from '../Constant/constant';
import axios from 'axios';
import { BrowserView, MobileView } from 'react-device-detect';

function Offers(props) {
    const [currentTravelOption, setcurrentTravelOption] = useState("ALL");
    const [offersArray, setOffersArray] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const getOffers = async () => {
        setLoading(true);
        let url = `https://academics.newtonschool.co/api/v1/bookingportals/offers?filter={"type":"${currentTravelOption}"}`;
        let res = await axios.get(url,
            {
                headers: { "projectId": "ywhyenbsclpi" }
            });
        setOffersArray(res.data.data.offers);
        setLoading(false);
    }

    const handleNext = () => {
        if (currentIndex < offersArray.length - 4) {
            setCurrentIndex(currentIndex + 2);
        }
    }
    const handlePrev = () => {
        if (currentIndex > 1) {
            setCurrentIndex(currentIndex - 2);
        }
    }
    useEffect(() => {
        setOffersArray([]);
        getOffers();
    }, [currentTravelOption]);
    return (
        <>
            <BrowserView>
                <div className='p-8 m-auto bg-white rounded-lg offerMainBox'>
                    <nav className='flex justify-between alignCenter'>
                        <div className='flex gap-3 px-1 py-3 alignCenter'>
                            <h1 className='text-4xl font-bold text-gray-800 '>Offers</h1>
                            <ul className='flex justify-between gap-8 navlist borderBottom'>
                                {offerNavlist?.map((val) => {
                                    return <li id={val.id} className={`px-1 py-1 ${val.id === currentTravelOption ? "blueNav" : ""}`} onClick={(e) => { setcurrentTravelOption(e.target.id); setCurrentIndex(0) }} >{val.name}</li>
                                })}
                            </ul>
                        </div>
                        <div className='flex gap-3 alignCenter'>
                            {/* <h2 className='flex gap-3 cursor-pointer alignCenter'>View All <img src="/img/blueRightArrow.png" alt="right arrow" /></h2> */}
                            <div className='flex alignCenter'>
                                <div style={{ opacity: currentIndex === 0 ? ".4" : "1", cursor: currentIndex === 0 ? "no-drop" : "pointer" }} onClick={handlePrev} className='p-3 borderGray leftRadius prevent-select'><img className='transformLeftArrow' src="/img/blueDownArrow.png" alt="" /></div>
                                <div style={{ opacity: currentIndex === offersArray?.length - 4 ? ".4" : "1", cursor: currentIndex === offersArray?.length - 3 ? "no-drop" : "pointer" }} onClick={handleNext} className='p-3  borderGray rightRadius prevent-select'><img className='transformRightArrow' src="/img/blueDownArrow.png" alt="" /></div>
                            </div></div>
                    </nav>
                    <div className='grid gap-4 p-3 overflow-x-scroll overflow-y-hidden no-scrollbar allCards'>
                        {!loading?
                        offersArray?.map((val, idx) => {
                            return (
                                <>
                                    {idx >= currentIndex ?
                                        <div >
                                            <div className='flex p-2 text-left rounded-lg offerCard cardBorder' key={val._id} id={val._id}>
                                                <div className='offerCardImgBox'>
                                                    <img className='mb-4 rounded-lg ' src={offersArray[idx].newHeroUrl} alt={offersArray[idx].cardCTAText} />
                                                    <p className='mt-2 text-xs text-center text-gray-500 '>T&Cs<span className='text-white '>_</span>Apply</p>
                                                </div>
                                                <div className='pl-4 '>
                                                    <p className='font-bold text-gray-600 '>{val.type}</p>
                                                    <h2 className='font-extrabold '>{val.pTl}</h2>
                                                    <p className='my-3  redborder'></p>
                                                    <p className='text-xs font-semibold text-gray-500 '>{val.pTx}</p>
                                                </div>
                                            </div>
                                        </div> : ""}
                                </>
                            )
                        }): <img className='w-32 m-auto ' src="/img/mmtLoading.gif" alt="" /> }
                    </div>
                </div>
            </BrowserView>
            <MobileView>
                <div className='px-1 m-auto bg-white rounded-lg offerMainBox'>
                    <nav className='flex justify-between alignCenter'>
                        <div className='flex gap-3 px-1 py-2 alignCenter'>
                            <h1 className='text-2xl font-bold text-gray-800 '>Offers</h1>
                            <ul className='flex justify-between gap-1 navlist borderBottom'>
                                {offerNavlist?.map((val) => {
                                    return <li id={val.id} className={`px-1 py-1 ${val.id === currentTravelOption ? "blueNav" : ""}`} onClick={(e) => { setcurrentTravelOption(e.target.id); setCurrentIndex(0) }} >{val.name}</li>
                                })}
                            </ul>
                        </div>
                        <div className='flex gap-3 alignCenter'>
                            {/* <h2 className='flex gap-3 cursor-pointer alignCenter'>View All <img src="/img/blueRightArrow.png" alt="right arrow" /></h2> */}
                            <div className='flex alignCenter'>
                                <div style={{ opacity: currentIndex === 0 ? ".4" : "1", cursor: currentIndex === 0 ? "no-drop" : "pointer" }} onClick={handlePrev} className='p-2 borderGray leftRadius prevent-select'><img className='transformLeftArrow' src="/img/blueDownArrow.png" alt="" /></div>
                                <div style={{ opacity: currentIndex === offersArray?.length - 4 ? ".4" : "1", cursor: currentIndex === offersArray?.length - 3 ? "no-drop" : "pointer" }} onClick={handleNext} className='p-2  borderGray rightRadius prevent-select'><img className='transformRightArrow' src="/img/blueDownArrow.png" alt="" /></div>
                            </div></div>
                    </nav>
                    <div className='grid gap-4 p-3 overflow-x-scroll overflow-y-hidden no-scrollbar allCards'>
                        {!loading? 
                        offersArray?.map((val, idx) => {
                            return (
                                <>
                                    {idx >= currentIndex ?
                                        <div >
                                            <div className='flex p-2 text-left rounded-lg offerCard cardBorder' key={val._id} id={val._id}>
                                                <div className='offerCardImgBox'>
                                                    <img className='mb-4 rounded-lg ' src={offersArray[idx].newHeroUrl} alt={offersArray[idx].cardCTAText} />
                                                    <p className='mt-2 text-xs text-center text-gray-500 '>T&Cs<span className='text-white '>_</span>Apply</p>
                                                </div>
                                                <div className='pl-4 '>
                                                    <p className='font-bold text-gray-600 '>{val.type}</p>
                                                    <h2 className='font-extrabold '>{val.pTl}</h2>
                                                    <p className='my-3  redborder'></p>
                                                    <p className='text-xs font-semibold text-gray-500 '>{val.pTx}</p>
                                                </div>
                                            </div>
                                        </div> : ""}
                                </>
                            )
                        }): <img className='w-32 m-auto ' src="/img/mmtLoading.gif" alt="" /> }
                    </div>
                </div>
            </MobileView>
        </>
    );
}

export default Offers;