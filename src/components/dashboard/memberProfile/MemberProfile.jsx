import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosPublic from '../../../hooks/useAxiosPublic/useAxiosPublic';

const MemberProfile = () => {
  const { databaseUser, loading } = useContext(AuthContext)
  const axiosPublic = useAxiosPublic()
  const [divLoading, setDivLoading] = useState(false);
  const [flatDetails, setFlatDetails] = useState(null);

  useEffect(() => {
    setDivLoading(true)
    if (databaseUser.role === "member") {
      try {
        const agreement = axiosPublic.get(`/member-agreement?email=${databaseUser.email}`)
        if (agreement) {
          agreement.then(res => {
            const checkedAgreement = res.data.status
            if (checkedAgreement === "checked") {
              setFlatDetails(res.data)
              setDivLoading(false)
            }
          })
        }
      }
      catch (err) {
        console.log(err)
      }
      finally {
        setDivLoading(false)
      }
    }

  }, [loading])

  console.log(flatDetails)

  return (
    divLoading ?
      <h1>Loading...</h1>
      :
      <div className="p-8 w-full rounded-none card m-auto">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">Agreement Accept Date:  {flatDetails?.membership_date} </h2>
        <h2 className="mt-4 text-blue-500 text-lg lg:text-2xl xl:text-3xl font-bold">Rented Apartment Information:</h2>

        <div className='flex gap-4 my-4'>
          <h2><span className='font-bold'>Block:</span> {flatDetails?.block_name}</h2>
          <h2><span className='font-bold'>Floor No:</span> {flatDetails?.floor_no}</h2>
          <h2><span className='font-bold'>Apartment No:</span> {flatDetails?.apartment_no}</h2>
        </div>
        <h2 className='mb-4'><span className='font-bold'>Facilities:</span> 2 Bedrooms, 2 Bathrooms, 1 Balcony, 1 Kitchen, 1 Drawing Room </h2>
        <h2><span className='font-bold'>Rent:</span> {flatDetails?.rent} </h2>
      </div>
  );
};

export default MemberProfile;