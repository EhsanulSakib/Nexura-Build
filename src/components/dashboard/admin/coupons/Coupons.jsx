import React from 'react';
import useAxiosPublic from '../../../../hooks/useAxiosPublic/useAxiosPublic';
import { MdDeleteForever, MdOutlineUpdate } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const Coupons = ({ coupon, setCoupons }) => {
    const axiosPublic = useAxiosPublic()
    const route = useNavigate()
    const notifySuccess = () => toast.success('Coupon Deleted Successfully')
    const notifyError = () => toast.error('Coupon can not be deleted')
    const handleRemoveCoupon = () => {
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
                axiosPublic.delete(`/delete-coupons/${coupon._id}`)
                    .then(res => {
                        console.log(res.data)
                        notifySuccess()
                        axiosPublic.get(`/coupons`)
                            .then(res => {
                                setCoupons(res.data)
                            })
                    })
                    .catch(err => {
                        notifyError()
                    })
            }
        })
    }
    return (
        <tr className='text-sm lg:text-lg xl:text-xl'>
            <td>{coupon.coupon_title}</td>
            <td>{coupon.coupon_code}</td>
            <td>{coupon.discount}%</td>
            <td>{coupon.description}</td>
            <td className='flex gap-2'>
                <button className='bg-red-500 text-white py-2 px-3 rounded-md' onClick={handleRemoveCoupon}>
                    <MdDeleteForever />
                </button>
                <button className='bg-blue-500 text-white py-2 px-3 rounded-md' onClick={() => route(`/admin-dashboard/update-offers/${coupon._id}`)}>
                    <MdOutlineUpdate />
                </button>
            </td>
        </tr>
    );
};

export default Coupons;