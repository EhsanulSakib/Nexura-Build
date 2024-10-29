import React, { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic/useAxiosPublic';
import Coupons from '../../../components/dashboard/admin/coupons/Coupons';
import { AuthContext } from '../../../provider/AuthProvider';
import { toast } from 'react-toastify';

const CreateOffers = () => {
    const { darkMode } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const notifySuccess = () => toast.success('Offer Created Successfully');
    const notifyError = () => toast.error('Offer can not be created');
    const [coupons, setCoupons] = useState([])
    const handleOffer = event => {
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
                if (res.data.acknowledged) {
                    notifySuccess()
                    form.reset()
                    axiosPublic.get('/coupons')
                        .then(res => {
                            setCoupons(res.data)
                        })
                }
            })
            .catch(err => {
                console.log(err)
                notifyError()
            })
    }

    useEffect(() => {
        axiosPublic.get('/coupons')
            .then(res => {
                setCoupons(res.data)
            })
    }, [])

    return (
        <div>
            <h2 className='text-xl md:text-xl lg:text-3xl font-bold mt-1 lg:mt-4'>Create Offer</h2>
            <form onSubmit={handleOffer} className={`${darkMode ? "bg-gray-900 border-gray-700" : "bg-slate-50 border-gray-300"} mt-4 lg:mt-8 p-4 rounded-md w-full shadow-md m-auto mb-8 border`}>
                <input type="text" name="coupon_title" id="" className={`${darkMode ? "bg-gray-700 border-gray-700" : "bg-slate-100 border-gray-300"} w-full p-4 shadow-sm rounded-md border`} placeholder="Write Coupon Title" />

                <div className='flex gap-4 mt-4'>
                    <input type="text" name="coupon_code" id="" className={`${darkMode ? "bg-gray-700 border-gray-700" : "bg-slate-100 border-gray-300"} w-full p-4 shadow-sm rounded-md border`} placeholder="Write Coupon Code" />

                    <input type="number" name="discount" id="" placeholder='Discount Percentage' className={`${darkMode ? "bg-gray-700 border-gray-700" : "bg-slate-100 border-gray-300"} w-full p-4 shadow-sm rounded-md border`} min="0" max="100" />
                </div>

                <textarea name="description" id="" className={`${darkMode ? "bg-gray-700 border-gray-700" : "bg-slate-100 border-gray-300"} p-4 w-full min-h-44 max-h-44 my-4 rounded-md shadow-sm border`} placeholder="Write Coupon Description"></textarea>

                <input type="submit" value="Submit" className="btn text-lg btn-info bg-blue-500 hover:bg-blue-400 border-none font-bold text-white col-span-2 py-2 w-full" />
            </form>

            <h2 className='text-xl md:text-2xl lg:text-3xl font-bold text-center my-8'>All Coupons</h2>
            <div className="w-full overflow-x-auto">
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

export default CreateOffers;