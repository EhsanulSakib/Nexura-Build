import React, { useContext } from 'react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import Swal from "sweetalert2";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/scrollbar';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic/useAxiosPublic';

const ApartmentCard = ({ apartment }) => {
    const { user, applied, setApplied } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()

    const handleAgreement = () => {
        const agreement = {
            userName: user.displayName,
            userEmail: user.email,
            floor_no: apartment.floor_no,
            block_name: apartment.block_name,
            apartment_no: apartment.apartment_no,
            rent: false,
            status: "pending"
        }

        Swal.fire({
            title: "Do you want to apply to rent this apartment?",
            showDenyButton: true,
            confirmButtonText: "Apply",
            denyButtonText: `Cancel`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axiosPublic.post('/agreement', agreement)
                    .then(res => {
                        axiosPublic.get(`/agreement/${user.email}`)
                            .then(res => {
                                setApplied(res.data)
                            })
                        Swal.fire("Applied Successfully!", "", "success");
                    })
            } else if (result.isDenied) {
                Swal.fire("Canceled", "", "info");
            }
        });

    }

    return (
        <div className="card card-compact shadow-sm rounded-md border border-gray-400 shadow-gray-400">
            <figure>
                <Swiper
                    modules={[A11y, Autoplay]}
                    spaceBetween={100}
                    slidesPerView={1}
                    autoplay={{ delay: 2000 }}
                >
                    <SwiperSlide>
                        <div className='flex items-center justify-center z-1 w-full h-96 bg-cover bg-center relative'>
                            <div className='absolute w-full h-96 bg-black opacity-20'>
                            </div>
                            <img src={apartment.apartment_images[0]} alt="" className='w-full h-96 object-cover object-center' />
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className='flex items-center justify-center z-1 w-full h-96  bg-cover bg-center relative'>
                            <div className='absolute w-full h-96 bg-black opacity-20'>
                            </div>
                            <img src={apartment.apartment_images[1]} alt="" className='w-full h-96 object-cover object-center' />
                        </div>
                    </SwiperSlide>


                    <SwiperSlide>
                        <div className='flex items-center justify-center z-1 w-full h-96 bg-cover bg-top relative'>
                            <div className='absolute w-full h-96 bg-black opacity-20'>
                            </div>
                            <img src={apartment.apartment_images[2]} alt="" className='w-full h-96 object-cover object-center' />
                        </div>
                    </SwiperSlide>



                    <SwiperSlide>
                        <div className='flex items-center justify-center z-1 w-full h-96  bg-cover bg-center relative'>
                            <div className='absolute w-full h-96 bg-black opacity-20'>
                            </div>
                            <img src={apartment.apartment_images[3]} alt="" className='w-full h-96 object-cover object-center' />
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className='flex items-center justify-center z-1 w-full h-96  bg-cover bg-center relative'>
                            <div className='absolute w-full h-96 bg-black opacity-20'>
                            </div>
                            <img src={apartment.apartment_images[4]} alt="" className='w-full h-96 object-cover object-center' />
                        </div>
                    </SwiperSlide>
                </Swiper>

            </figure>
            <div className="card-body">
                <h2 className="card-title text-2xl lg:text-3xl">Apartment: {apartment.apartment_no}</h2>
                <div className='flex gap-4 text-xs md:text-sm lg:text-base xl:text-lg'>
                    <h2 className='font-semibold'>{apartment.block_name}</h2>
                    <h2 className='font-semibold'>Floor No: {apartment.floor_no}</h2>
                </div>
                <h2 className='text-xs md:text-sm lg:text-base xl:text-lg'>
                    <span className='font-semibold'>Facilities: </span>
                    2 Bedrooms | 2 Bathrooms | 1 Balcony | 1 Kitchen | 1 Drawing Room
                </h2>

                <h2 className='text-xl lg:text-2xl font-bold text-blue-400'>{apartment.price} BDT/month</h2>
                <div className="card-actions" >
                    {
                        apartment.rent ?
                            <h2 className='text-xl lg:text-2xl font-bold text-blue-400'>
                                Already In Rent
                            </h2>
                            :
                            applied ?
                                <h2 className='text-xs md:text-sm lg:text-base xl:text-lg text-blue-500'>
                                    You can't apply more than an Apartment.
                                </h2>
                                :
                                <button className="btn bg-blue-600 hover:bg-blue-400 text-white font-bold text-lg border-none" onClick={handleAgreement}>Agreement</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default ApartmentCard;