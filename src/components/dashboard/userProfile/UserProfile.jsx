import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosPublic from '../../../hooks/useAxiosPublic/useAxiosPublic';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const { databaseUser } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic()


  useEffect(() => {
    axiosPublic.get(`/user-agreement?email=${databaseUser.email}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      })

  }, []);

  return (
    <div className="text-sm md:text-md lg:text-lg card mt-8 lg:mt-0 px-2 lg:px-4 rounded-none w-full h-full">
      <h2 className="mt-4 text-xl md:text-2xl lg:text-3xl font-bold mb-4">Applied Apartment Information:</h2>
      <div className='flex flex-col gap-2'>
        <h2 className="font-bold">Agreement Requested Date: {
          userData ? userData.agreementRequestDate : 'Not Applied'
        }
        </h2>
        <h2 className="font-bold">Agreement Accepted Date: {
          userData ? userData.agreementAcceptDate : 'Not Applied'
        }
        </h2>
      </div>

      <div className='flex gap-4 my-4'>
        <h2><span className='font-bold'>Apartment:</span> {userData ? userData.apartment_no : 'None'}</h2>
        <h2><span className='font-bold'>Floor No:</span> {userData ? userData.floor_no : 'None'}</h2>
        <h2><span className='font-bold'>Block:</span> {userData ? userData.block_name : 'None'}</h2>
      </div>
      <h2 className='mb-4'><span className='font-bold'>Facilities:</span> 2 Bedrooms | 2 Bathrooms | 1 Balcony | 1 Kitchen | 1 Drawing Room none</h2>
      <h2
        className="text-blue-500 text-xl md:text-2xl lg:text-3xl font-bold"><span className='font-bold'>Rent:</span> {userData ? userData.price : 'None'} BDT/Month </h2>

    </div>
  );
};

export default UserProfile;