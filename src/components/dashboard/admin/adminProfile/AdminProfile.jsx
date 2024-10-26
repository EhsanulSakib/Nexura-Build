import React, { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../../../../hooks/useAxiosPublic/useAxiosPublic';
import { AuthContext } from '../../../../provider/AuthProvider';
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { set } from 'react-hook-form';

const AdminProfile = () => {
    const [totalRooms, setTotalRooms] = useState(0)
    const [availableRooms, setAvailableRooms] = useState(0)
    const [unavailableRooms, setUnavailableRooms] = useState(0)
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalMembers, setTotalMembers] = useState(0)
    const axiosPublic = useAxiosPublic()
    const [pieChartData, setPieChartData] = useState([])

    const COLORS = ["#0088FE", "#FFBB28"];

    useEffect(() => {
        axiosPublic.get('/apartmentsCount')
            .then(res => {
                setTotalRooms(res.data.count)
            })
            .then(() => {
                axiosPublic.get('/members')
                    .then(res => {
                        setTotalMembers(res.data.length)
                        setAvailableRooms(totalRooms - totalMembers)
                        // console.log(availableRooms)
                        setUnavailableRooms(totalRooms - availableRooms)
                        setPieChartData([{ name: "Available Rooms", value: availableRooms }, { name: "Unavailable Rooms", value: unavailableRooms }])
                    })
            })
    }, [totalRooms, totalMembers, availableRooms])

    useEffect(() => {
        axiosPublic.get('/users')
            .then(res => {
                setTotalUsers(res.data.length)
            })
    }, [])

    const renderCustomizedLabel = ({ percent }) => `${(percent * 100).toFixed(0)}%`;

    return (
        <div className="text-sm md:text-md lg:text-lg card mt-8 lg:mt-0 px-2 lg:px-4 rounded-none w-full h-full">
            <h2 className='text-xl md:text-xl lg:text-3xl font-bold mb-2 border-b-2'>Apartment Details</h2>
            <div className='flex gap-3 lg:gap-8 my-2 border-b '>
                <h2><span className='font-bold'>Total Rooms:</span> {totalRooms}</h2>
                <h2><span className='font-bold'>Total Users:</span> {totalUsers}</h2>
                <h2><span className='font-bold'>Total members: </span>{totalMembers}</h2>
            </div>

            <div className=''>
                <div className='flex gap-3 lg:gap-8 '>
                    <h2><span className='font-bold'>Available Rooms:</span> {availableRooms}</h2>
                    <h2><span className='font-bold'>Unavailable Rooms:</span> {unavailableRooms}</h2>
                </div>

                <div className='flex items-center gap-3 lg:gap-8 mt-4'>
                    <PieChart width={730} height={250}>
                        <Pie
                            data={[
                                { name: "Available Rooms", value: availableRooms },
                                { name: "Unavailable Rooms", value: unavailableRooms },
                            ]}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label={renderCustomizedLabel}
                            fill="#8884d8">
                            {pieChartData?.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;