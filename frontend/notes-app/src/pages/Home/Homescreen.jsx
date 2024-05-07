import React, { useState } from 'react';
import NavbarHome from '../../components/nav/NavbarHome';
import { Link } from 'react-router-dom';
import createImg from '../../assets/images/home-img/create.png';
import retrieveImg from '../../assets/images/home-img/retrieve.png';
import updateImg from '../../assets/images/home-img/update.png';
import prioImg from '../../assets/images/home-img/prioritize.png';
import createMob from '../../assets/images/home-img-mobile/createMob.png';
import retrieveMob from '../../assets/images/home-img-mobile/retrieveMob.png';
import updateMob from '../../assets/images/home-img-mobile/updateMob.png';
import prioMob from '../../assets/images/home-img-mobile/prioMob.png';
import Encrpytion from '../../components/security/Encrpytion';

const Homescreen = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 630);

    const images = [
        createImg,
        retrieveImg,
        updateImg,
        prioImg
    ];

    const mobileImages = [
        createMob,
        retrieveMob,
        updateMob,
        prioMob
    ];

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 700);
        };

        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleButtonClick = (index) => {
        setSelectedIndex(index);
    };

    return (
        <div className='flex flex-col h-screen mx-auto subpixel-antialiased'>

            {/* BG Blur */}
            <div className='-z-50 color-crcl absolute top-[900px] bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[400px] md:h-[600px] bg-gradient-to-b from-blue-600 to-green-500 rounded-full opacity-100 blur-[1000px]'></div>
            <header className='sticky top-0 z-50 w-[100vw] bg-white/90 border-b-2'>
                <NavbarHome />
            </header>

            <main className='animate-in'>

            <section className='mx-auto w-[80%] pb-2'>
                <div className='flex items-center z-40 bg-bl'>
                    <div className='w-[400px] sm:w-[630px] lg:w-[700px] flex flex-col justify-center items-center mx-auto mt-32'>
                        <h1 className='text-5xl sm:text-6xl md:text-8xl text-center font-bold select-none z-20'>
                            Where notes are simple
                            <span className="dot-animation font-normal z-20">|</span>
                        </h1>
                        <h2 className='w-[90%] sm:w-[500px] text-base sm:text-xl text-center mt-7 select-none z-20'>
                            Notes is the destination for conceptualizing, organizing, and safeguarding your ideas.
                        </h2>
                        <Link to='/signup' className='text-lg hover:shadow-xl border z-20 border-blue-500 px-5 py-2 mt-7 rounded-xl bg-gradient-to-br from-blue-500 to-green-600 font-medium text-white transition-all duration-300 hover:rounded-3xl hover:scale-110'>Sign Me Up!</Link>
                    </div>
                </div>
            
                <section className='w-full mt-10 relative z-10'>

                    <div className='selection-btns selection flex flex-row justify-center'>
                        <ul className='flex flex-row justify-between bg-black/20 px-3 py-2 rounded-xl font-medium text-gray-700 select-none text-sm w-full sm:w-min'>
                            {["Create", "Retrieve", "Update", "Prioritize"].map((text, index) => (
                                <li key={index} onClick={() => handleButtonClick(index)} role='button' className={`cursor-pointer px-2 sm:px-4 py-2 transition-all  ${selectedIndex === index ? 'bg-white rounded-xl transition-all duration-500 hover:scale-105 '  : ''}`}>
                                    <div className={selectedIndex === index ? 'bg-gradient-to-br from-blue-600 to-green-500 inline-block text-transparent bg-clip-text font-medium' : 'active:text-white'}>
                                        {text}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='z-10 flex justify-center items-center'>
                        <div className='flex justify-center slide-show mt-2 z-1 select-none'>
                            <img
                                src={isMobile ? mobileImages[selectedIndex] : images[selectedIndex]}
                                alt="Slide"
                                className={`min-w-full max-w-full sm:w-[1000px] rounded-3xl sm:rounded-xl p-2 bg-black/10 select-none ${isMobile ? 'w-full' : ''}`}
                            />
                        </div>
                    </div>
                </section>
            </section>

            <section className='py-10 bg-white'>
                <Encrpytion/>
            </section>

            </main>

        </div>
    );
};

export default Homescreen;
