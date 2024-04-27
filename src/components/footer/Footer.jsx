import React from 'react';
import "./footer.css";
import { BrowserView, MobileView } from 'react-device-detect';

function Footer(props) {
    return (
        <>
            <BrowserView>
                <div className='flex justify-between text-white bg-black alignCenter py-14 px-28'>
                    <div className='flex gap-8 alignCenter'>
                        <a href="https://twitter.com/makemytrip/" target='blank'><img className='w-8 ' src="/img/twitter.png" alt="twitter" /></a>
                        <a href="https://www.facebook.com/makemytrip/" target='blank'><img className=' w-7' src="/img/facebook.png" alt="facebook" /></a>
                    </div>
                    <div>
                        <h1 className='text-right '>©2024 MAKEMYTRIP PVT. LTD.</h1>
                        <p className='text-right '>Country India USA UAE</p>
                    </div>
                </div>
            </BrowserView>
            <MobileView>
                <div className='flex flex-col justify-between pt-12 pb-1 text-white bg-black alignCenter footer'>
                    <div className='flex flex-col gap-4 alignCenter'>
                        <div className='flex gap-8 alignCenter'>
                            <a href="https://twitter.com/makemytrip/" target='blank'><img className='w-5 ' src="/img/twitter.png" alt="twitter" /></a>
                            <a href="https://www.facebook.com/makemytrip/" target='blank'><img className='w-5 ' src="/img/facebook.png" alt="facebook" /></a>

                        </div>
                        <div className='flex gap-4'>
                            <a href="https://play.google.com/store/games?hl=en_IN&gl=US" target='blank'><img src="/img/playstore.avif" alt="playstore" /></a>
                            <a href="https://www.apple.com/in/app-store/" target='blank'><img src="/img/iosAppstore.avif" alt="app store" /></a>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-xs '>©2024 MAKEMYTRIP PVT. LTD.</h1>
                    </div>
                </div>
            </MobileView>
        </>
    );
}

export default Footer;