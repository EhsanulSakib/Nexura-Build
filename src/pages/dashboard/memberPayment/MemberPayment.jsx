import React, { useContext, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../../../components/paymentForm/PaymentForm';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosPublic from '../../../hooks/useAxiosPublic/useAxiosPublic';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)
const MemberPayment = () => {
    const { databaseUser, darkMode, selectedMonth, setSelectedMonth } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [agreement, setAgreement] = useState(null);
    const [months, setMonths] = useState([]);

    useEffect(() => {
        axiosPublic.get(`/member-agreement?email=${databaseUser.email}`)
            .then(res => {
                setAgreement(res.data)
                setRentalPrice(res.data.price)
            })
    }, [])

    useEffect(() => {
        axiosPublic.get('/all-months')
            .then(res => {
                setMonths(res.data)
            })
    }, [])
    return (
        <div>
            <h2 className='text-xl md:text-xl lg:text-3xl font-bold mt-1 lg:mt-4'>Rent Payment</h2>

            <div className='flex flex-col lg:flex-row justify-between w-full gap-4 border rounded-md mt-4 lg:mt-8 p-4 items-center'>
                <div className='w-full'>
                    <h2 className='text-md md:text-lg lg:text-2xl font-bold border-b'>Rent Details</h2>

                    <div className='px-2 mt-4'>
                        <div className='text-sm md:text-lg font-semibold flex justify-between items-center border-b py-2'>
                            <h2 className='font-bold'>
                                Select Month
                            </h2>
                            <select id="options" name="options" className={`border border-gray-300 rounded-sm px-4 py-2 ${darkMode ? 'bg-gray-800 text-slate-100' : 'bg-slate-100 text-gray-800'}`} onChange={e => setSelectedMonth(e.target.value)}>
                                <option value="">Select Month</option>
                                {
                                    months?.map((month, index) => <option key={index} value={month.month}>{month.month}</option>)
                                }
                            </select>
                        </div>
                        <div className='text-sm md:text-lg font-semibold flex justify-between items-center border-b py-2'>
                            <h2 className='font-bold'>
                                Rental Price
                            </h2>
                            <span>{agreement?.price} BDT</span>
                        </div>
                    </div>
                </div>

                <div className='w-full'>
                    <Elements stripe={stripePromise}>
                        <PaymentForm />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default MemberPayment;