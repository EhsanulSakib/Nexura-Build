import { Link, NavLink, useNavigate } from "react-router-dom";
import { RiMenu2Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useContext, useState } from "react";
import logo from '/nexura-logo.png'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../provider/AuthProvider";
import { MdDarkMode, MdLightMode, MdOutlineLogout } from "react-icons/md";

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const { user, logOut, darkMode, setDarkMode, isAdmin } = useContext(AuthContext)
    const notify = () => toast.error("User Signed Out!");
    const navigate = useNavigate()

    const activeLink = ({ isActive }) => {
        return isActive ? 'text-blue-500' : ''
    }

    const handleSignOut = () => {
        logOut()
            .then(result => {
                navigate('/')
            })
            .then(notify)
            .catch()
    }

    const links = <>
        <ul className={`xl:flex flex-row gap-2 xl:gap-6 duration-300 top-[3rem] lg:top-[4rem] absolute ${darkMode ? 'bg-gray-900' : 'bg-slate-200'} xl:static ${open ? 'left-0' : '-left-60'} p-10 xl:p-0 shadow-lg xl:shadow-none no-underline xl:gap-6 text-base xl:text-xl z-50 font-semibold`}>
            <li className="pb-1 xl:pb-0 hover:border-b-2 cursor-pointer"><NavLink className={activeLink} to='/'>Home</NavLink></li>
            {
                user ?
                    <li className="pb-1 xl:pb-0 hover:border-b-2 cursor-pointer"><NavLink className={activeLink} to='/apartments'>Apartments</NavLink></li>
                    :
                    ""
            }

            {
                user ?
                    <li className="mt-8 xl:mt-0 rounded-md xl:hidden focus:border-b-2" onClick={handleSignOut}>Sign Out</li>
                    :
                    <li className="mt-8 xl:mt-0 rounded-md xl:hidden">
                        <NavLink to='/login' className={'focus:border-b-2 '}>Login</NavLink>
                    </li>
            }

            {
                user ?
                    ""
                    :
                    <li className="xl:hidden"><NavLink className={'focus:border-b-2 '} to='/register'>Register</NavLink></li>
            }
        </ul>
    </>


    return (
        <nav className="flex items-center mx-[1%] justify-between m-auto text-xl font-medium font-raleway py-1 lg:py-2">
            <div className="flex items-center xl:hidden">
                <div className="xl:hidden" onClick={() => setOpen(!open)}>
                    {
                        open == true ? <IoMdClose className="text-2xl " /> : <RiMenu2Line className="text-2xl " />
                    }
                </div>

                <div className="logo flex text-base xl:hidden items-center">
                    <img src={logo} alt="" className="w-12 pl-2" />
                    <h2 className="text-blue-600 text-xl font-extrabold">Nexura Building</h2>
                </div>
            </div>

            <div className="logo hidden xl:flex items-center ">
                <img src={logo} alt="" className="w-16 pl-2" />
                <h2 className="text-blue-600 text-3xl font-extrabold">Nexura Building</h2>
            </div>


            <div className="flex flex-col xl:gap-8 xl:flex-row items-center">


                <div>
                    {links}
                </div>

                <div className="flex items-center gap-2 justify-center z-10">
                    <div>
                        {
                            darkMode ?
                                <button className="text-md lg:text-2xl" onClick={() => setDarkMode(!darkMode)}>
                                    <MdLightMode />
                                </button>

                                :
                                <button className="text-md lg:text-2xl" onClick={() => setDarkMode(!darkMode)}>
                                    <MdDarkMode />
                                </button>

                        }
                    </div>
                    <div>
                        {
                            user ?
                                <div className="dropdown dropdown-bottom dropdown-end">
                                    <div tabIndex={0} role="button" className=""><img src={user.photoURL} alt="" className="w-8 lg:w-12 h-8 lg:h-12 object-cover object-top rounded-full" /></div>
                                    <ul tabIndex={0} className={`dropdown-content z-[1] menu p-2 mt-1 rounded-md w-44 ${darkMode ? "bg-gray-700" : "bg-gray-300"} shadow-lg`}>
                                        <h2 className="font-bold text-center">{user.displayName}</h2>
                                        <Link to={isAdmin ? '/admin-dashboard/' : '/dashboard'}><button className="btn border-none bg-blue-600 hover:bg-blue-500 btn-sm w-full mt-2 text-white rounded-sm">
                                            Dashboard
                                        </button></Link>
                                        <Link><button className="btn border-none bg-red-800 hover:bg-red-600 btn-sm w-full my-1 text-white rounded-sm" onClick={handleSignOut}>
                                            Logout
                                        </button></Link>
                                    </ul>
                                </div>

                                :
                                ""
                        }
                    </div>

                    <div className="hidden lg:flex">
                        {
                            user ?
                                ""
                                :
                                <button className="btn rounded-full bg-blue-600 hover-bg-blue-500text-sm lg:text-base border-none text-white font-bold">
                                    <Link to='/login'>Login</Link>
                                </button>
                        }
                    </div >
                </div>
            </div>
        </nav>
    );
};

export default Navbar;