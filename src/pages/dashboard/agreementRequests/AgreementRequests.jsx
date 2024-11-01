import React, { useEffect, useState } from 'react';
import AgreementCard from '../../../components/dashboard/agreementCard/AgreementCard';
import useAxiosPublic from '../../../hooks/useAxiosPublic/useAxiosPublic';
const AgreementRequests = () => {
    const [agreements, setAgreements] = useState([])
    const axiosPublic = useAxiosPublic()
    useEffect(() => {
        axiosPublic.get('/agreement')
            .then(res => {
                setAgreements(res.data)
            })
    }, [])
    return (
        <div className=" text-sm md:text-md lg:text-lg card mt-8 lg:mt-0 px-2 lg:px-4 rounded-none w-full min-h-screen">
            <h2 className='text-xl md:text-xl lg:text-3xl font-bold mb-2 border-b-2'>Agreement Requests</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead className='text-center'>
                        <tr>
                            <th>User</th>
                            <th>Apartment Info</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            agreements?.map(agreement => <AgreementCard key={agreement._id} agreement={agreement} setAgreements={setAgreements}></AgreementCard>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AgreementRequests;