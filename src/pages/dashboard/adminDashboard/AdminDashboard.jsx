import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Drawer from '../../../components/dashboard/drawer/Drawer';
import { AuthContext } from '../../../provider/AuthProvider';


const AdminDashboard = () => {
    const { darkMode } = useContext(AuthContext)
    return (
        <div className={`${darkMode ? 'bg-gray-800 text-slate-100' : 'bg-slate-100 text-gray-800'} font-raleway`}>
            <div className={`max-w-[1840px] m-auto min-h-screen text-xs md:text-sm lg:text-base xl:text-xl`} >
                <div className='flex w-full justify-end'>
                    <Drawer></Drawer>
                    <div className='w-full lg:w-2/3 2xl:w-full'>
                        <h2 className='flex-1 text-center mt-3 text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold'>Admin Dashboard</h2>
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;