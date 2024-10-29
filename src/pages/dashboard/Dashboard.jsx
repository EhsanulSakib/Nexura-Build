import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { Outlet } from 'react-router-dom';
import DashboardNavbar from '../../components/dashboard/dashboardNavbar/DashboardNavbar';
import { ToastContainer } from 'react-toastify';

const Dashboard = () => {
    const { darkMode } = useContext(AuthContext)
    return (
        <div className={`${darkMode ? 'bg-gray-900 text-slate-200' : 'bg-slate-200 text-gray-800'} font-raleway`}>
            <div className={`max-w-[2048px] m-auto min-h-screen text-xs md:text-sm lg:text-base xl:text-xl`} >
                <DashboardNavbar />
                <div className={`min-h-screen flex w-full justify-center ${darkMode ? 'bg-gray-800' : 'bg-slate-100'}`}>
                    <div className='w-full mx-2 xl:mx-4'>
                        <h2 className='mt-4 lg:mt-8 flex-1 text-2xl lg:text-4xl xl:text-5xl 2xl:text-4xl font-bold pb-2 border-b border-slate-400'>Dashboard</h2>
                        <Outlet></Outlet>
                        <ToastContainer></ToastContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;