import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic/useAxiosPublic';
import Coupon from '../coupon/Coupon';

const HomeCoupons = () => {
    const [coupons, setCoupons] = useState([])
    const axiosPublic = useAxiosPublic()

    useEffect(() => {
        axiosPublic.get('/coupons')
            .then(res => {
                setCoupons(res.data)
            })
    }, [])

    return (
        <div className='w-11/12 m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4'>
            {
                coupons?.map(coupon => <Coupon key={coupon._id} coupon={coupon}></Coupon>)
            }
        </div>
    );
};

export default HomeCoupons;