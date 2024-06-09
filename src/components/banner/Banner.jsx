import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/scrollbar';

const Banner = () => {
    return (
        <div className='mb-4 md:mb-8 lg:mb-12'>
            <div className='relative'>
                <Swiper
                    modules={[Pagination, A11y, Autoplay]}
                    spaceBetween={100}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 2000 }}
                >
                    <SwiperSlide>
                        <div style={{ backgroundImage: `url("https://i.ibb.co/ydxkQ5r/48219.jpg")` }} className='flex items-center justify-center z-1 w-full h-60 md:h-96 lg:h-[650px] bg-cover bg-center relative'>
                            <div className='absolute w-full h-full bg-black opacity-50'>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div style={{ backgroundImage: `url("https://i.ibb.co/5Y0HbY3/12323.jpg")` }} className='flex items-center justify-center z-1 w-full h-60 md:h-96 lg:h-[650px] bg-cover bg-center relative'>
                            <div className='absolute w-full h-full bg-black opacity-50'>
                            </div>
                        </div>
                    </SwiperSlide>


                    <SwiperSlide>
                        <div style={{ backgroundImage: `url("https://i.ibb.co/MN5LHTJ/2150164706.jpg")` }} className='flex items-center justify-center z-1 w-full h-60 md:h-96 lg:h-[650px] bg-cover bg-center relative'>
                            <div className='absolute w-full h-full bg-black opacity-50'>
                            </div>

                        </div>
                    </SwiperSlide>


                    <SwiperSlide>
                        <div style={{ backgroundImage: `url("https://i.ibb.co/0tpkyMC/152143.jpg")` }} className='flex items-center justify-center z-1 w-full h-60 md:h-96 lg:h-[650px] bg-cover bg-center relative'>
                            <div className='absolute w-full h-full bg-black opacity-50'>
                            </div>

                        </div>
                    </SwiperSlide>
                </Swiper>
                <h2 className='text-white drop-shadow-lg font-extrabold text-xl md:text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl md:text-left inline-block w-1/2 2xl:w-1/3 left-4 md:left-8 text absolute top-16 md:top-1/3 lg:top-[30%] space z-10 '>
                    Welcome to <br /><span className='text-blue-400'>Nexura Building</span><br /> A dream place for you and your family.
                </h2>
            </div>


        </div>

    );
};

export default Banner;