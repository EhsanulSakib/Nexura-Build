import React, { useContext, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic/useAxiosPublic';
const Modal = ({ setOpenModal }) => {
  const { darkMode } = useContext(AuthContext)
  const axiosPublic = useAxiosPublic()

  const [input, setInput] = useState('')
  const [error, setError] = useState(null)

  const handleInputChange = (e) => {
    if (e.target.value !== '') {
      setError('')
    }
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input === '') {
      setError('Please enter a month and year')
    }
    // axiosPublic.post('/create-month')
    //   .then(res => {
    //     if (res.data.acknowledged) {
    //       setOpenModal(false)
    //     }
    //   })
  }

  return (
    <div className={`absolute top-12 lg:top-[4.5rem] left-0 w-full h-screen bg-black/40`}>
      <div className={`absolute w-3/4 md:w-1/2 2xl:w-1/4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${darkMode ? 'bg-gray-800 text-slate-200' : 'bg-slate-200 text-gray-800'} p-4 rounded-md shadow-lg`}>
        <div className='flex justify-between items-center' onClick={() => { setOpenModal(false) }}>
          <h1 className='text-2xl lg:text-3xl font-bold'>Create Month</h1>
          <IoMdClose className='text-2xl lg:text-3xl cursor-pointer' />
        </div>
        <form className='my-4 flex flex-col gap-4' onSubmit={handleSubmit}>
          <input type='text' placeholder='Month-Year' value={input} onChange={handleInputChange} className={`w-full border p-2 rounded-md ${darkMode ? 'bg-gray-700 text-slate-200 border-gray-600' : 'border-gray-400 bg-slate-200 text-gray-800'}`} />
          {
            error && <p className='text-red-500'>{error}</p>
          }
          <button type='submit' className='w-full p-2 bg-blue-500 text-white rounded-md'>Create</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;