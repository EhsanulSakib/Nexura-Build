import React, { useContext, useEffect, useState } from 'react';
import Modal from '../../../components/modal/Modal';
import useAxiosPublic from '../../../hooks/useAxiosPublic/useAxiosPublic';
import { AuthContext } from '../../../provider/AuthProvider';
import axios, { all } from 'axios';

const AllPaymentHistory = () => {
  const { darkMode } = useContext(AuthContext)
  const [openModal, setOpenModal] = useState(false);
  const [paymentMonths, setPaymentMonths] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [month, setMonth] = useState('');
  const [email, setEmail] = useState('');
  const [allPaymentHistory, setAllPaymentHistory] = useState([]);
  const axiosPublic = useAxiosPublic()

  const handleSearch = (e, name) => {
    if (name === 'email') {
      setEmail(e)
    }
    if (name === 'month') {
      setMonth(e)
    }
  }

  useEffect(() => {
    axiosPublic.get('/all-months')
      .then(res => {
        setPaymentMonths(res.data)
      })
  }, [])

  useEffect(() => {
    axiosPublic.get(`/all-payment-history?month=${month}&email=${email}`)
      .then(res => {
        setAllPaymentHistory(res.data)
      })
  }, [month, email])

  useEffect(() => {
    axiosPublic.get(`/users`)
      .then(res => {
        setAllUsers(res.data)
      })
  }, [])

  return (
    <div>
      <div className='flex flex-col md:flex-row justify-between gap-4 md:gap-0 mt-1 md:items-center lg:mt-4'>
        <h2 className='text-xl md:text-xl lg:text-3xl font-bold '>
          Payment History
        </h2>
        <div className='px-2 md:px-0 flex w-full md:w-auto flex-col md:flex-row gap-2 lg:gap-4'>
          <select id="options" name="options" className={`border border-gray-300 rounded-sm px-1 py-2 ${darkMode ? 'bg-gray-800 text-slate-100' : 'bg-slate-100 text-gray-800'}`} onChange={(e) => handleSearch(e.target.value, 'email')}>
            <option value="">All</option>
            {
              allUsers?.map(user => (
                <option key={user._id} value={user.email}>
                  {user.email}
                </option>
              ))
            }
          </select>

          <select id="options" name="options" className={`border border-gray-300 rounded-sm px-1 py-2 ${darkMode ? 'bg-gray-800 text-slate-100' : 'bg-slate-100 text-gray-800'}`} onChange={(e) => handleSearch(e.target.value, 'month')}>
            <option value="">All</option>
            {
              paymentMonths?.map(month => (
                <option key={month._id} value={month.month}>{month.month}</option>
              ))
            }
          </select>

          <button className='bg-blue-500 text-white py-2 px-3 rounded-sm shadow-sm hover:bg-blue-600 duration-300 w-full md:w-auto' onClick={() => setOpenModal(true)}>Create Month</button>
        </div>
      </div>

      <div className='overflow-x-auto mt-4'>
        <table className="table">
          <thead>
            <tr className='text-blue-500 text-lg'>
              <th>User</th>
              <th>User Email</th>
              <th>Month</th>
              <th>Rent Paid Date</th>
              <th>Rent Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className='text-xs lg:text-lg'>
            {
              allPaymentHistory?.map(payment => <tr key={payment._id}>
                <td>{payment.userName}</td>
                <td>{payment.email}</td>
                <td className='min-w-28'>{payment.monthOfPayment}</td>
                <td>{payment.payRentDate}</td>
                <td>{payment.price} BDT</td>
                <td>{payment.status}</td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
      {
        openModal &&
        <Modal setOpenModal={setOpenModal} />
      }

    </div>
  );
};

export default AllPaymentHistory;