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
        <div>
            <h2 className='text-xl md:text-2xl lg:text-3xl font-bold text-center my-8'>Agreement Requests</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Apartment Info</th>
                            <th>Status</th>
                            <th>Accept</th>
                            <th>Reject</th>
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