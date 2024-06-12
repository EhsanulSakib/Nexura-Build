import React from 'react';
import useAxiosPublic from '../../../../hooks/useAxiosPublic/useAxiosPublic';
import { MdDeleteForever } from "react-icons/md";

const Coupons = ({ coupon, setCoupons }) => {
    const axiosPublic = useAxiosPublic()
    const handleRemoveCoupon = () => {
        axiosPublic.delete(`/coupons/${coupon._id}`)
            .then(res => {
                console.log(res.data)
                axiosPublic.get(`/coupons`)
                    .then(res => {
                        setCoupons(res.data)
                    })
            })
    }
    return (
        <tr>
            <td>{coupon.coupon_title}</td>
            <td>{coupon.coupon_code}</td>
            <td>{coupon.discount}%</td>
            <td>{coupon.description}</td>
            <td>
                <button className='btn btn-sm bg-red-500 text-xl text-white border-none hover:bg-red-800' onClick={handleRemoveCoupon}>
                    <MdDeleteForever />
                </button>
            </td>
        </tr>
    );
};

export default Coupons;