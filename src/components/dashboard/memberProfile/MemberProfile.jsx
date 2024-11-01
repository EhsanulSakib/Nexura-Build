import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosPublic from '../../../hooks/useAxiosPublic/useAxiosPublic';

const MemberProfile = () => {
  const { databaseUser, loading } = useContext(AuthContext)
  const axiosPublic = useAxiosPublic()
  const [agreementDetails, setAgreementDetails] = useState(null);

  useEffect(() => {
    axiosPublic.get(`/member-agreement?email=${databaseUser.email}`)
      .then((res) => {
        setAgreementDetails(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      })
  }, [])

  return (
    <div className="text-sm md:text-md lg:text-lg card mt-8 lg:mt-0 px-2 lg:px-4 rounded-none w-full h-full">
      <h2 className="mt-4 text-xl md:text-2xl lg:text-3xl font-bold mb-4">Applied Apartment Information</h2>
      <div className='flex flex-col gap-2'>
        <h2 className="font-bold">Agreement Requested Date: {
          agreementDetails ? agreementDetails.agreementRequestDate : 'Not Applied'
        }
        </h2>
        <h2 className='font-bold'>Agreement Accepted Date: {
          agreementDetails ? agreementDetails.agreementAcceptDate : 'Not Accepted'
        }
        </h2>
      </div>

      <div className='flex gap-4 my-4'>
        <h2><span className='font-bold'>Apartment:</span> {agreementDetails ? agreementDetails.apartment_no : 'None'}</h2>
        <h2><span className='font-bold'>Floor No:</span> {agreementDetails ? agreementDetails.floor_no : 'None'}</h2>
        <h2><span className='font-bold'>Block:</span> {agreementDetails ? agreementDetails.block_name : 'None'}</h2>
      </div>
      <h2 className='mb-4'><span className='font-bold'>Facilities:</span> 2 Bedrooms | 2 Bathrooms | 1 Balcony | 1 Kitchen | 1 Drawing Room none</h2>
      <h2
        className="text-blue-500 text-xl md:text-2xl lg:text-3xl font-bold"><span className='font-bold'>Rent:</span> {agreementDetails ? agreementDetails.price : 'None'} BDT/Month
      </h2>

      <div className='mt-4 lg:mt-8'>
        <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400'>
          Cancel Agreement
        </button>
      </div>
    </div>
  );
};

export default MemberProfile;