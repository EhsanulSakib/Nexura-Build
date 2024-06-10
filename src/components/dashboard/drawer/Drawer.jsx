import React, { useContext } from 'react';
import { RiArchiveDrawerFill } from "react-icons/ri";
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../provider/AuthProvider';
const Drawer = () => {
    const { darkMode, setDarkMode } = useContext(AuthContext)
    return (
        <div className={`relative min-h-screen`}>
            <div className={`drawer lg:drawer-open `}>
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-start justify-start">
                    <label htmlFor="my-drawer-2" className="btn btn-sm drawer-button lg:hidden bg-transparent border-none p-1 rounded-none hover:bg-transparent shadow-none "> <RiArchiveDrawerFill /></label>

                </div>
                <div className={`drawer-side z-10 top-16`}>
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay bg-black"></label>
                    <ul className={`menu p-4 w-72 min-h-full text-lg lg:text-xl gap-4 bg-gradient-to-r text-white from-blue-800 to-blue-400 z-10`}>
                        <NavLink className="border ml-4 mt-4 p-2 border-white hover:bg-white hover:text-gray-800" to='/dashboard/'><button className=' rounded-sm'>My Profile</button></NavLink>
                        <NavLink className="border ml-4 mt-4 p-2 border-white hover:bg-white hover:text-gray-800" to='/dashboard/announcements'><button className=' rounded-sm'>Announcements</button></NavLink>
                    </ul>

                </div>
            </div>
        </div >
    );
};

export default Drawer;