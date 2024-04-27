import React from 'react';

function ShimmerOffers(props) {
    return (
        <div >
            <div className='flex p-2 mb-4 text-left rounded-lg offerCard cardBorder' >
                <div className='offerCardImgBox'>
                    <img className='rounded-lg ' src="" alt="" />
                    <p className='mt-2 text-xs text-center text-gray-500 '></p>
                </div>
                <div className='pl-4 '>
                    <p className='font-bold text-gray-600 '></p>
                    <h2 className='font-extrabold '></h2>
                    <p className='my-3  redborder'></p>
                    <p className='text-xs font-semibold text-gray-500 '></p>
                </div>
            </div>
            <div className='flex p-2 text-left rounded-lg offerCard cardBorder' >
                <div className='offerCardImgBox'>
                    <img className='rounded-lg ' src="" alt="" />
                    <p className='mt-2 text-xs text-center text-gray-500 '></p>
                </div>
                <div className='pl-4 '>
                    <p className='font-bold text-gray-600 '></p>
                    <h2 className='font-extrabold '></h2>
                    <p className='my-3  redborder'></p>
                    <p className='text-xs font-semibold text-gray-500 '></p>
                </div>
            </div>
        </div>
    );
}

export default ShimmerOffers;