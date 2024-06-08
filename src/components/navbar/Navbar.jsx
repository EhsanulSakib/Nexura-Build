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
    const { user, logOut, darkMode, setDarkMode } = useContext(AuthContext)
    const notify = () => toast.error("User Signed Out!");
    const navigate = useNavigate()

    const handleSignOut = () => {
        logOut()
            .then(result => {
                navigate('/')
            })
            .then(notify)
            .catch()
    }

    const links = <>
        <ul className={`lg:flex flex-row gap-2 duration-300 top-16 md:top-[60px] absolute ${darkMode ? 'bg-gray-800' : 'bg-slate-100'} lg:static ${open ? 'left-0' : '-left-60'} p-10 lg:p-0 shadow-lg lg:shadow-none no-underline lg:gap-6 text-base lg:text-xl z-50 font-bold`}>
            <li className="pb-1 lg:pb-0"><NavLink className={'focus:border-b-2 '} to='/'>Home</NavLink></li>
            <li className="pb-1 lg:pb-0"><NavLink className={'focus:border-b-2 '} to='/'>Apartments</NavLink></li>
            {
                user ?
                    <li className="pb-1 lg:pb-0"><NavLink className={'focus:border-b-2'} to='/all-books'>All Books</NavLink></li>
                    :
                    ""
            }
            {
                user ?
                    <li className="pb-1 lg:pb-0"><NavLink className={'focus:border-b-2'} to='/add-book'>Add Book</NavLink></li>
                    :
                    ""
            }
            {
                user ?
                    <li className="pb-1 lg:pb-0"><NavLink className={' focus:border-b-2'} to='/borrowed'>Borrowed Books</NavLink></li>
                    :
                    ""
            }

            {
                user ?
                    <li className="mt-8 lg:mt-0 rounded-md lg:hidden focus:border-b-2" onClick={handleSignOut}>Sign Out</li>
                    :
                    <li className="mt-8 lg:mt-0 rounded-md lg:hidden">
                        <NavLink to='/login' className={'focus:border-b-2 '}>Login</NavLink>
                    </li>
            }
            {
                user ?
                    ""
                    :
                    <li className="lg:hidden"><NavLink className={'focus:border-b-2 '} to='/register'>Register</NavLink></li>
            }


        </ul>
    </>


    return (
        <nav className="flex items-center px-2 lg:px-4 py-1 lg:py-2 justify-between m-auto text-xl font-medium ">
            <div className="flex items-center lg:hidden">
                <div className="lg:hidden" onClick={() => setOpen(!open)}>
                    {
                        open == true ? <IoMdClose className="text-2xl " /> : <RiMenu2Line className="text-2xl " />
                    }
                </div>

                <div className="logo flex text-base lg:hidden items-center">
                    <img src={logo} alt="" className="w-12 pl-2" />
                    <h2 className="text-blue-400 text-xl font-extrabold">Nexura Building</h2>
                </div>
            </div>

            <div className="logo hidden lg:flex items-center ">
                <img src={logo} alt="" className="w-16 pl-2" />
                <h2 className="text-blue-400 text-3xl font-extrabold">Nexura Building</h2>
            </div>


            <div className="flex flex-col lg:gap-8 lg:flex-row items-center">


                <div>
                    {links}
                </div>

                <div className="flex items-center z-10">
                    <div>
                        {
                            darkMode ?
                                <button className="btn btn-sm lg:btn-md btn-circle btn-ghost border-none text-white text-xl lg:text-3xl shadow-none" onClick={() => setDarkMode(!darkMode)}>
                                    <MdLightMode />
                                </button>

                                :
                                <button className="btn btn-sm lg:btn-md btn-circle btn-ghost border-none text-gray-800 text-xl lg:text-3xl shadow-none" onClick={() => setDarkMode(!darkMode)}>
                                    <MdDarkMode />
                                </button>

                        }
                    </div>
                    <div>
                        {
                            user ?
                                <div className="flex items-center gap-2">
                                    <div className={`flex gap-2 items-center ${darkMode ? 'bg-gray-600' : 'bg-slate-300'} py-1 pl-2 lg:px-2 rounded-full`}>
                                        <h2 className="font-bold text-xs lg:text-base 2xl:text-lg">{user.displayName}</h2>
                                        <img src={user.photoURL} alt="" className="w-8 lg:w-12 h-8 lg:h-12 object-cover object-top rounded-full " />
                                        <div>
                                            <button className={`btn btn-active  hidden btn-circle text-2xl font-extrabold lg:flex ${darkMode ? 'bg-gray-300 text-black' : 'bg-slate-700 text-white'}`} onClick={handleSignOut}><MdOutlineLogout /></button>
                                        </div>
                                    </div>
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
                                <button className="btn btn-active btn-ghost rounded-md text-sm lg:text-base">
                                    <Link to='/login'>Login</Link>
                                </button>
                        }
                    </div >

                    <div className="hidden lg:flex">
                        {
                            user ?
                                ""
                                :
                                <button className=" btn btn-active btn-ghost rounded-md text-sm ml-4 lg:text-base" ><Link to='/register'>Register</Link></button>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;