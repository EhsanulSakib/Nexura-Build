import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import AdminProfile from '../../../components/dashboard/admin/adminProfile/AdminProfile';

const Profile = () => {
    const { user, isAdmin, isMember } = useContext(AuthContext)
    return (
        <div>
            <h2 className='text-xl md:text-2xl lg:text-3xl font-bold text-center mt-8'>Profile</h2>
            <div className='my-4'>
                <div className="py-4 flex flex-col md:flex-row gap-4 items-center card w-11/12 m-auto shadow-lg border border-gray-400">
                    <figure className="px-4 pt-4">
                        <img src={user.photoURL} alt="Shoes" className="h-44 w-44 rounded-full object-cover object-top" />
                    </figure>
                    <div className="card-body pl-3 text-center md:text-left">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">{user.displayName}</h2>
                        <h2>{user.email}</h2>
                    </div>
                </div>

                {
                    user && !isAdmin && !isMember ?
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
                        </div> :
                        ""
                }

                {
                    isAdmin ?
                        <AdminProfile></AdminProfile>
                        :
                        ""
                }
            </div>
        </div>
    );
};

export default Profile;