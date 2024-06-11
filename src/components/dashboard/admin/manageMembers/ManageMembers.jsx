import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../../hooks/useAxiosPublic/useAxiosPublic';
import Member from '../member/Member';

const ManageMembers = () => {
    const [members, setMembers] = useState([])
    const axiosPublic = useAxiosPublic()
    useEffect(() => {
        axiosPublic.get('/users')
            .then(res => {
                setMembers(res.data)
            })
    }, [])
    return (
        <div>
            <h2 className='text-xl md:text-2xl lg:text-3xl font-bold text-center mt-8'>All Members</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            members?.map(member => <Member key={member._id} member={member}></Member>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageMembers;