import React, { useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';

const Profile = () => {
    const { user } = useContext(AuthContext)
    return (
        <div>
            <h2 className='text-xl md:text-2xl lg:text-3xl font-bold text-center mt-8'>Profile</h2>
            <div className='my-4'>
                <div className="py-4 flex flex-col md:flex-row gap-4 items-center card w-11/12 m-auto shadow-lg border border-gray-400">
                    <figure className="px-4 pt-4">
                        <img src={user.photoURL} alt="Shoes" className="h-44 w-44 rounded-full" />
                    </figure>
                    <div className="card-body pl-3 text-center md:text-left">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">{user.displayName}</h2>
                        <h2>{user.email}</h2>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;