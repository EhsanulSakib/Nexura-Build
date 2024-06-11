import React, { useContext } from 'react';
import { RiArchiveDrawerFill } from "react-icons/ri";
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../provider/AuthProvider';
import logo from '/nexura-logo.png'
const Drawer = () => {
    const { darkMode, setDarkMode, user, isAdmin } = useContext(AuthContext)
    return (
        <div className={`w-1/3 fixed top-0 left-0 z-50`}>
            <div className={`drawer lg:drawer-open `}>
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-start justify-start">
                    <label htmlFor="my-drawer-2" className="btn drawer-button lg:hidden bg-transparent border-none p-1 text-xl rounded-none hover:bg-transparent shadow-none "> <RiArchiveDrawerFill /></label>

                </div>
                <div className={`drawer-side z-10 top-16`}>
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay bg-black"></label>
                    <ul className={`menu p-4 w-72 min-h-full text-lg lg:text-xl gap-4 bg-gradient-to-r text-white from-blue-800 to-blue-400 z-10`}>
                        <div className="logo flex text-base items-center">
                            <img src={logo} alt="" className="w-12 pl-2" />
                            <h2 className="text-white-600 text-xl font-extrabold">Nexura Building</h2>
                        </div>
                        <NavLink className="border ml-4 mt-4 p-2 border-white hover:bg-white hover:text-gray-800" to='/'><button className=' rounded-sm'>Home</button></NavLink>
                        {
                            user && !isAdmin ?
                                <NavLink className="border ml-4 mt-4 p-2 border-white hover:bg-white hover:text-gray-800" to='/dashboard/'><button className=' rounded-sm'>My Profile</button></NavLink>
                                :
                                ""
                        }
                        {
                            isAdmin ?
                                <NavLink className="border ml-4 mt-4 p-2 border-white hover:bg-white hover:text-gray-800" to='/admin-dashboard/'><button className=' rounded-sm'>My Profile</button></NavLink>
                                :
                                ""
                        }

                        <NavLink className="border ml-4 mt-2 p-2 border-white hover:bg-white hover:text-gray-800" to='/dashboard/announcements'><button className=' rounded-sm'>Announcements</button></NavLink>

                        <div className="divider">
                        </div>


                        {
                            isAdmin ?
                                <NavLink className="border ml-4 p-2 border-white hover:bg-white hover:text-gray-800" to='/admin-dashboard/manage-members'><button className=' rounded-sm'>Manage Members</button></NavLink>
                                :
                                ""
                        }
                    </ul>
                </div>
            </div>
        </div >
    );
};

export default Drawer;