import React, { useContext, useEffect, useState } from 'react';
import Modal from '../../../components/modal/Modal';
import useAxiosPublic from '../../../hooks/useAxiosPublic/useAxiosPublic';
import { AuthContext } from '../../../provider/AuthProvider';

const AllPaymentHistory = () => {
  const { darkMode } = useContext(AuthContext)
  const [openModal, setOpenModal] = useState(false);
  const [paymentMonths, setPaymentMonths] = useState([]);
  const [month, setMonth] = useState('all');
  const axiosPublic = useAxiosPublic()

  const handleSearch = (e) => {
    setMonth(e)
    console.log(month)
  }

  useEffect(() => {
    axiosPublic.get('/all-months')
      .then(res => {
        setPaymentMonths(res.data)
      })
  }, [])

  // useEffect(() => {
  //   axiosPublic.get(`/all-months?month=${month}`)
  //     .then(res => {
  //       setPaymentMonths(res.data)
  //     })
  // }, [month])

  return (
    <div>
      <div className='flex justify-between mt-1 items-center lg:mt-4'>
        <h2 className='text-xl md:text-xl lg:text-3xl font-bold '>
          Payment History
        </h2>
        <div className='flex gap-1 md:gap-2 lg:gap-4'>
          <select id="options" name="options" className={`border border-gray-300 rounded-md px-4 py-2 ${darkMode ? 'bg-gray-800 text-slate-100' : 'bg-slate-100 text-gray-800'}`} onChange={(e) => handleSearch(e.target.value)}>
            <option value="all">All</option>
            {
              paymentMonths?.map(month => (
                <option key={month._id} value={month.month} onClick={() => setMonth(month.month)}>{month.month}</option>
              ))
            }
          </select>

          <button className='bg-blue-500 text-white py-2 px-3 rounded-md shadow-sm hover:bg-blue-600 duration-300' onClick={() => setOpenModal(true)}>Create Month</button>
        </div>
      </div>



      {
        openModal &&
        <Modal setOpenModal={setOpenModal} />
      }

    </div>
  );
};

export default AllPaymentHistory;