import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic/useAxiosPublic';
import Coupons from '../../components/dashboard/admin/coupons/Coupons';

const ManageCupons = () => {
    const axiosPublic = useAxiosPublic()
    const [coupons, setCoupons] = useState([])
    const handleCoupons = event => {
        event.preventDefault()

        const form = event.target

        const coupon_title = form.coupon_title.value
        const coupon_code = form.coupon_code.value
        const discount = form.discount.value
        const description = form.description.value
        const coupons = { coupon_title, coupon_code, discount, description }

        console.log(coupons)

        axiosPublic.post('/coupons', coupons)
            .then(res => {
                console.log(res.data)
            })
    }

    useEffect(() => {
        axiosPublic.get('/coupons')
            .then(res => {
                setCoupons(res.data)
            })
    }
        , [handleCoupons])

    return (
        <div>
            <h2 className='text-xl md:text-2xl lg:text-3xl font-bold text-center my-8'>Manage Coupons</h2>
            <form onSubmit={handleCoupons} className="p-4 rounded-md w-11/12 border border-gray-400 shadow-sm m-auto mb-8">
                <input type="text" name="coupon_title" id="" className="w-full p-4 bg-transparent border border-gray-300 rounded-md" placeholder="Write Coupon Title" />

                <div className='flex gap-4 mt-4'>
                    <input type="text" name="coupon_code" id="" className="w-full p-4 bg-transparent border border-gray-300 rounded-md" placeholder="Write Coupon Code" />

                    <input type="number" name="discount" id="" placeholder='Discount Percentage' className="w-full p-4 bg-transparent border border-gray-300 rounded-md" min="0" max="100" />
                </div>

                <textarea name="description" id="" className="p-4 w-full min-h-44 max-h-44 my-4 border border-gray-300 rounded-md bg-transparent" placeholder="Write Coupon Description"></textarea>

                <input type="submit" value="Submit" className="btn text-lg btn-info bg-blue-500 font-bold text-white col-span-2 py-2 w-full" />
            </form>

            <h2 className='text-xl md:text-2xl lg:text-3xl font-bold text-center my-8'>All Coupons</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Code</th>
                            <th>Discount</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            coupons?.map(coupon => <Coupons setCoupons={setCoupons} key={coupon._id} coupon={coupon}></Coupons>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ManageCupons;