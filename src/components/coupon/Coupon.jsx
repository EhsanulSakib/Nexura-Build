import React from 'react';

const Coupon = ({ coupon }) => {
    return (
        <div className="card shadow-xl mb-8 px-2 py-4">
            <div className="card-body">
                <h2 className="card-title text-blue-500 font-bold text-2xl">{coupon.coupon_title}</h2>
                <h3 className="card-title text-3xl text-center font-bold">{coupon.coupon_code}</h3>
                <h3 className="card-title text-2xl my-4">Discount Rate:{coupon.discount}%</h3>
                <p className='text-lg font-medium'> <span className='font-bold'>Description:</span> {coupon.description}</p>
            </div>
        </div>
    );
};

export default Coupon;