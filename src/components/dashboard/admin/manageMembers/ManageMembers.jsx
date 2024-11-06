import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../provider/AuthProvider';
import useAxiosPublic from '../../../../hooks/useAxiosPublic/useAxiosPublic';
import Member from '../member/Member';

const ManageMembers = () => {
    const { darkMode } = useContext(AuthContext)
    const [members, setMembers] = useState([])
    const axiosPublic = useAxiosPublic()

    const handleSearch = (search) => {
        console.log(search)
        axiosPublic.get(`/users-search/${search}`)
            .then(res => {
                setMembers(res.data)
            })
    }
    useEffect(() => {
        axiosPublic.get('/users')
            .then(res => {
                setMembers(res.data)
            })
    }, [])
    return (
        <div>
            <h2 className='text-xl md:text-xl lg:text-3xl font-bold mt-1 lg:mt-4'>All Members</h2>
            <div className="my-4 w-full flex justify-end">
                <select id="options" name="options" className={`border border-gray-300 rounded-sm px-4 py-2 ${darkMode ? 'bg-gray-800 text-slate-100' : 'bg-slate-100 text-gray-800'}`} onChange={(e) => handleSearch(e.target.value)}>
                    <option value="all">All</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="member">Member</option>
                </select>
            </div>


            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className='text-blue-500'>
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