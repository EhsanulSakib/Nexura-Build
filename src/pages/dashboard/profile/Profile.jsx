import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import AdminProfile from '../../../components/dashboard/admin/adminProfile/AdminProfile';
import UserProfile from '../../../components/dashboard/userProfile/UserProfile';
import MemberProfile from '../../../components/dashboard/memberProfile/MemberProfile';

const Profile = () => {
    const { databaseUser, user, isAdmin, isMember } = useContext(AuthContext)
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const membership_date = `${year}-${month}-${day}`
    return (
        <div>
            <h2 className='text-xl md:text-xl lg:text-3xl font-bold mt-1 lg:mt-4'>Profile</h2>
            <div className='my-4 flex flex-col lg:flex-row justify-between'>
                <div className=" py-4 flex flex-col gap-4 card w-full lg:w-1/3 shadow-sm rounded-md lg:rounded-none lg:shadow-none lg:border-r-2">
                    <figure className="px-4 pt-4">
                        <img src={user.photoURL} alt="profile picture" className="h-44 w-44 rounded-full object-cover object-top" />
                    </figure>
                    <div className="card-body text-center">
                        <h2 className='text-sm md:text-lg font-bold'>({databaseUser.role})</h2>

                        <h2 className="text-xl md:text-2xl lg:text-3xl text-blue-500 font-semibold">{user.displayName}</h2>

                        <h2 className='text-sm md:text-lg font-semibold'>{user.email}</h2>
                    </div>
                </div>

                {
                    databaseUser.role === "user" ?
                        <UserProfile /> :
                        ""
                }

                {
                    databaseUser.role === "member" ?
                        <MemberProfile /> :
                        ""
                }

                {
                    databaseUser.role === "admin" ?
                        <AdminProfile />
                        :
                        ""
                }
            </div>
        </div>
    );
};

export default Profile;