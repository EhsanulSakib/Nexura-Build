import React, { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic/useAxiosPublic';
import { AuthContext } from '../../../provider/AuthProvider';

const MemberPaymentHistory = () => {
    const { databaseUser } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        axiosPublic.get(`/payment-history?email=${databaseUser.email}`)
            .then(res => setPayments(res.data))
    }, [])
    return (
        <div>
            <h2 className='text-xl md:text-xl lg:text-3xl font-bold mt-1 lg:mt-4'>Payment History</h2>

            <div className="overflow-x-auto mt-4">
                <table className="table">
                    <thead>
                        <tr className='text-blue-500 text-lg'>
                            <th>Month</th>
                            <th>Rent Paid Date</th>
                            <th>Rent Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className='text-xs lg:text-lg'>
                        {
                            payments?.map(payment => <tr key={payment._id}>
                                <td className='min-w-28'>{payment.monthOfPayment}</td>
                                <td>{payment.payRentDate}</td>
                                <td>{payment.price} BDT</td>
                                <td>{payment.status}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MemberPaymentHistory;