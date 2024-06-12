import React, { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../../../../hooks/useAxiosPublic/useAxiosPublic';
import { AuthContext } from '../../../../provider/AuthProvider';

const AdminProfile = () => {
    const [totalRooms, setTotalRooms] = useState(0)
    const [availableRooms, setAvailableRooms] = useState(0)
    const [unavailableRooms, setUnavailableRooms] = useState(0)
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalMembers, setTotalMembers] = useState(0)
    const axiosPublic = useAxiosPublic()

    useEffect(() => {
        axiosPublic.get('/apartmentsCount')
            .then(res => {
                setTotalRooms(res.data.count)
            })
            .then(() => {
                axiosPublic.get('/members')
                    .then(res => {
                        setTotalMembers(res.data.length)
                        setAvailableRooms(parseInt(((totalRooms - totalMembers) / totalRooms) * 100))
                        // console.log(availableRooms)
                        setUnavailableRooms(parseInt(100 - availableRooms))
                    })
            })
    }, [totalRooms, totalMembers, availableRooms])

    useEffect(() => {
        axiosPublic.get('/users')
            .then(res => {
                setTotalUsers(res.data.length)
            })
    }, [])

    return (
        <div className="p-8 my-8 card w-11/12 m-auto shadow-lg border border-gray-400">
            <h2><span className='font-bold'>Total Rooms:</span> {totalRooms}</h2>
            <div className='flex gap-4 my-2'>
                <h2><span className='font-bold'>Total Users:</span> {totalUsers}</h2>
                <h2><span className='font-bold'>Total members: </span>{totalMembers}</h2>
            </div>
            <div className='flex gap-4 mt-6'>
                <div>
                    <h2 className='mb-4'><span className='font-bold'>Available Rooms: </span> {availableRooms}%</h2>
                    <div className="radial-progress text-blue-400" style={{ "--value": availableRooms }} role="progressbar">{availableRooms}%</div>
                </div>

                <div>
                    <h2 className='mb-4'><span className='font-bold'>Unavailable Rooms: </span> {unavailableRooms}%</h2>
                    <div className="radial-progress text-blue-400" style={{ "--value": unavailableRooms }} role="progressbar">{unavailableRooms}%</div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;