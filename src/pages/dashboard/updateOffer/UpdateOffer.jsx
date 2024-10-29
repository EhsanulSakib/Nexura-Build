import React, { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic/useAxiosPublic';
import Coupons from '../../../components/dashboard/admin/coupons/Coupons';
import { AuthContext } from '../../../provider/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateOffer = () => {
  const { id } = useParams()
  console.log(id)
  const { darkMode } = useContext(AuthContext)
  const route = useNavigate()
  const axiosPublic = useAxiosPublic()
  const notifySuccess = () => toast.success('Offer Updated Successfully');
  const notifyError = errorName => toast.error(errorName);
  const [coupons, setCoupons] = useState([])
  const updateOffer = event => {
    event.preventDefault()

    const form = event.target

    const coupon_title = form.coupon_title.value
    const coupon_code = form.coupon_code.value
    const discount = form.discount.value
    const description = form.description.value
    const coupons = { coupon_title, coupon_code, discount, description }

    console.log(coupons)

    axiosPublic.put(`/update-coupons/${id}`, coupons)
      .then(res => {
        if (res.data.modifiedCount > 0) {
          notifySuccess()
          route('/admin-dashboard/create-offers')
        }
      })
      .catch(err => {
        notifyError(err)
      })
  }

  useEffect(() => {
    axiosPublic.get(`/coupons/${id}`)
      .then(res => {
        setCoupons(res.data)
      })
  }, [])

  return (
    <div>
      <h2 className='text-xl md:text-xl lg:text-3xl font-bold mt-1 lg:mt-4'>Update Offer</h2>
      <form onSubmit={updateOffer} className={`${darkMode ? "bg-gray-900 border-gray-700" : "bg-slate-50 border-gray-300"} mt-4 lg:mt-8 p-4 rounded-md w-full shadow-md m-auto mb-8 border`}>
        <input type="text" name="coupon_title" id="" className={`${darkMode ? "bg-gray-700 border-gray-700" : "bg-slate-100 border-gray-300"} w-full p-4 shadow-sm rounded-md border`} placeholder="Write Coupon Title" defaultValue={coupons.coupon_title} />

        <div className='flex gap-4 mt-4'>
          <input type="text" name="coupon_code" id="" className={`${darkMode ? "bg-gray-700 border-gray-700" : "bg-slate-100 border-gray-300"} w-full p-4 shadow-sm rounded-md border`} placeholder="Write Coupon Code" defaultValue={coupons.coupon_code} />

          <input type="number" name="discount" id="" placeholder='Discount Percentage' className={`${darkMode ? "bg-gray-700 border-gray-700" : "bg-slate-100 border-gray-300"} w-full p-4 shadow-sm rounded-md border`} min="0" max="100" defaultValue={coupons.discount} />
        </div>

        <textarea name="description" id="" className={`${darkMode ? "bg-gray-700 border-gray-700" : "bg-slate-100 border-gray-300"} p-4 w-full min-h-44 max-h-44 my-4 rounded-md shadow-sm border`} placeholder="Write Coupon Description" defaultValue={coupons.description}></textarea>

        <input type="submit" value="Update" className="btn text-lg btn-info bg-blue-500 hover:bg-blue-400 border-none font-bold text-white col-span-2 py-2 w-full" />
      </form>
    </div>
  );
};

export default UpdateOffer;