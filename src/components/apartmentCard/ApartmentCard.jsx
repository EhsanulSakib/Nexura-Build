import React, { useContext, useEffect } from 'react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import Swal from "sweetalert2";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/scrollbar';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic/useAxiosPublic';

const ApartmentCard = ({ apartment }) => {
    const { user, databaseUser, darkMode, applied, setApplied } = useContext(AuthContext)
    const notifySuccess = () => toast.success('Applied Successfully');
    const notifyError = error => toast.error(error);
    const axiosPublic = useAxiosPublic()

    const handleAgreement = () => {
        const agreement = {
            userName: databaseUser.name,
            userEmail: databaseUser.email,
            agreementRequestDate: new Date().toISOString().split("T")[0],
            floor_no: apartment.floor_no,
            block_name: apartment.block_name,
            apartment_no: apartment.apartment_no,
            price: apartment.price,
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
                axiosPublic.post('/apply-agreement', agreement)
                    .then(res => {
                        Swal.fire("Applied Successfully!", "", "success");
                        axiosPublic.get(`/member-agreement?email=${databaseUser.email}`)
                            .then(res => {
                                setApplied(res.data)
                            })
                    })
                    .catch(err => {
                        console.log(err.message)
                        notifyError(err.message)
                    })
            } else if (result.isDenied) {
                Swal.fire("Canceled", "", "info");
            }
        });
    }

    const handleCancel = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/delete-agreement/${applied._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            notifySuccess()
                            axiosPublic.get(`/member-agreement?email=${databaseUser.email}`)
                                .then(res => {
                                    setApplied(res.data)
                                })
                        }
                    })
                    .catch(err => {
                        notifyError(err.message)
                    })
            }
        });
    }

    return (
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700 shadow-gray-700' : 'bg-white border-slate-200 shadow-slate-200'} border card card-compact shadow-sm rounded-md`}>
            <figure>
                <Swiper
                    modules={[A11y, Autoplay]}
                    spaceBetween={100}
                    slidesPerView={1}
                    autoplay={{ delay: 2000 }}
                >
                    <SwiperSlide>
                        <div className='flex items-center justify-center z-1 w-full h-96 2xl:h-[500px] bg-cover bg-center relative'>
                            <div className='absolute w-full h-96 2xl:h-[500px] bg-black opacity-20'>
                            </div>
                            <img src={apartment.apartment_images[0]} alt="" className='w-full h-96 2xl:h-[500px] object-cover object-center' />
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className='flex items-center justify-center z-1 w-full h-96 2xl:h-[500px]  bg-cover bg-center relative'>
                            <div className='absolute w-full h-96 2xl:h-[500px] bg-black opacity-20'>
                            </div>
                            <img src={apartment.apartment_images[1]} alt="" className='w-full h-96 2xl:h-[500px] object-cover object-center' />
                        </div>
                    </SwiperSlide>


                    <SwiperSlide>
                        <div className='flex items-center justify-center z-1 w-full h-96 2xl:h-[500px] bg-cover bg-top relative'>
                            <div className='absolute w-full h-96 2xl:h-[500px] bg-black opacity-20'>
                            </div>
                            <img src={apartment.apartment_images[2]} alt="" className='w-full h-96 2xl:h-[500px] object-cover object-center' />
                        </div>
                    </SwiperSlide>



                    <SwiperSlide>
                        <div className='flex items-center justify-center z-1 w-full h-96 2xl:h-[500px]  bg-cover bg-center relative'>
                            <div className='absolute w-full h-96 2xl:h-[500px] bg-black opacity-20'>
                            </div>
                            <img src={apartment.apartment_images[3]} alt="" className='w-full h-96 2xl:h-[500px] object-cover object-center' />
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className='flex items-center justify-center z-1 w-full h-96 2xl:h-[500px]  bg-cover bg-center relative'>
                            <div className='absolute w-full h-96 2xl:h-[500px] bg-black opacity-20'>
                            </div>
                            <img src={apartment.apartment_images[4]} alt="" className='w-full h-96 2xl:h-[500px] object-cover object-center' />
                        </div>
                    </SwiperSlide>
                </Swiper>

            </figure>
            <div className="card-body">
                <div className='flex justify-between items-center'>
                    <h2 className="card-title text-2xl lg:text-3xl">Apartment: {apartment.apartment_no}</h2>
                    {
                        apartment.status === "pending" ?
                            <h2 className='bg-blue-500 px-2 py-1 rounded-md text-white text-lg lg:text-xl font-semibold'>Pending</h2>
                            :
                            ""
                    }

                    {
                        apartment.status === "rented" ?
                            <h2 className='text-blue-500 text-lg lg:text-xl font-semibold'>Already Rented</h2>
                            :
                            ""
                    }
                </div>
                <div className='flex gap-4 text-xs md:text-sm lg:text-base xl:text-lg'>
                    <h2 className='font-semibold'>{apartment.block_name}</h2>
                    <h2 className='font-semibold'>Floor No: {apartment.floor_no}</h2>
                </div>
                <h2 className='text-xs md:text-sm lg:text-base xl:text-lg'>
                    <span className='font-semibold'>Facilities: </span>
                    2 Bedrooms | 2 Bathrooms | 1 Balcony | 1 Kitchen | 1 Drawing Room
                </h2>

                <div className='flex justify-between items-center pt-8'>
                    <h2 className='text-2xl lg:text-3xl font-bold text-blue-400'>{apartment.price} BDT/month</h2>
                    {
                        databaseUser.role === "user" && apartment.status === "available" && !applied ?
                            <button className="btn bg-blue-500 px-2 py-1 rounded-md hover:bg-blue-400 text-white font-bold text-lg border-none" onClick={handleAgreement}>Agreement</button>
                            :
                            ""
                    }
                    {
                        applied?.apartment_no === apartment.apartment_no ?
                            <button className="btn px-2 py-1 rounded-md bg-blue-500 hover:bg-blue-400 text-white font-bold text-lg border-none" onClick={handleCancel}>Cancel</button>
                            :
                            ""
                    }
                </div>

                <div>
                    {
                        databaseUser.role === "member" ?
                            <h2 className='text-blue-500 text-lg lg:text-xl font-semibold'>You already have a apartment. Can't rent another.</h2>
                            :
                            ""
                    }

                    {
                        databaseUser.role === "user" && applied ?
                            <h2 className='text-blue-500 text-lg lg:text-xl'><span className='font-semibold'>Note:</span>You already applied for a apartment. Can't apply more.</h2>
                            :
                            ""
                    }
                </div>
            </div>
        </div>
    );
};

export default ApartmentCard;