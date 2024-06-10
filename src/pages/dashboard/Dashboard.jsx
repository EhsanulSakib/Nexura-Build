import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { Outlet } from 'react-router-dom';
import Drawer from '../../components/dashboard/drawer/Drawer';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const Dashboard = () => {
    const { darkMode } = useContext(AuthContext)
    return (
        <div className={`${darkMode ? 'bg-gray-800 text-slate-100' : 'bg-slate-100 text-gray-800'} font-raleway`}>
            <div className={`max-w-[1840px] m-auto min-h-screen text-xs md:text-sm lg:text-base xl:text-xl`} >
                <Navbar></Navbar>
                <div className='flex w-full'>
                    <Drawer></Drawer>
                    <div className='w-full'>
                        <h2 className='flex-1 text-center mt-3 text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold'>Dashboard</h2>
                        <Outlet></Outlet>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Dashboard;