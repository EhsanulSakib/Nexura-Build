import React, { useContext, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import successful from '../../../public/successful.json'
const PaymentSuccessModal = ({ setOpenModal }) => {
  const route = useNavigate()
  const handleOk = () => {
    setOpenModal(false)
    route('/dashboard/payment-history')
  }
  const { darkMode } = useContext(AuthContext)
  return (
    <div className={`absolute top-12 lg:top-[4.5rem] left-0 w-full h-screen bg-black/40`}>
      <div className={`absolute w-3/4 md:w-1/2 2xl:w-1/4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${darkMode ? 'bg-gray-800 text-slate-200' : 'bg-slate-200 text-gray-800'} p-4 rounded-md shadow-lg`}>
        <div className='flex flex-col gap-2 justify-center items-center'>
          <Lottie animationData={successful} className="h-[10rem]" />
          <h1 className='text-2xl lg:text-3xl font-bold'>Rent Paid Successfully</h1>
        </div>
        <div className='flex flex-col items-center justify-center w-full'>
          <button className='bg-blue-500 text-white py-2 px-6 rounded-md mt-4' onClick={() => handleOk()}>Ok</button>
        </div>
      </div>
    </div >
  );
};

export default PaymentSuccessModal;