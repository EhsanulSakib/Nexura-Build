import React, { useEffect } from 'react';

const AdminProfile = () => {
    useEffect(() => {

    }, [])
    return (
        <div className="p-8 my-8 card w-11/12 m-auto shadow-lg border border-gray-400">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">Agreement Accept Date: none</h2>
            <h2 className="mt-4 text-blue-600 text-xl md:text-2xl lg:text-3xl font-bold">Rented Apartment Information:</h2>

            <div className='flex gap-4 my-4'>
                <h2><span className='font-bold'>Floor No:</span> none</h2>
                <h2><span className='font-bold'>Block:</span> none</h2>
                <h2><span className='font-bold'>Room No:</span> none</h2>
            </div>
            <h2 className='mb-4'><span className='font-bold'>Facilities:</span> none</h2>
            <h2><span className='font-bold'>Rent:</span> none </h2>
        </div>
    );
};

export default AdminProfile;