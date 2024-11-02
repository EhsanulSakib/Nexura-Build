import React, { useState } from 'react';
import Modal from '../../../components/modal/Modal';

const AllPaymentHistory = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <div className='flex justify-between mt-1'>
        <h2 className='text-xl md:text-xl lg:text-3xl font-bold mt-1 lg:mt-4'>
          Payment History
        </h2>
        <button className='bg-blue-500 text-white py-2 px-3 rounded-md shadow-sm hover:bg-blue-600 duration-300' onClick={() => setOpenModal(true)}>Create Month</button>
      </div>

      {
        openModal &&
        <Modal setOpenModal={setOpenModal} />

      }
    </div>
  );
};

export default AllPaymentHistory;