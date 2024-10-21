import { Link, NavLink, useNavigate } from "react-router-dom";
import { RiMenu2Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useContext, useState } from "react";
import logo from '/nexura-logo.png'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDarkMode, MdLightMode, MdOutlineLogout } from "react-icons/md";
import { AuthContext } from "../../../provider/AuthProvider";
import { IoCaretBackOutline } from "react-icons/io5";

const DashboardNavbar = () => {
  const [open, setOpen] = useState(false)
  const { user, logOut, darkMode, setDarkMode, isAdmin } = useContext(AuthContext)
  const notify = () => toast.error("User Signed Out!");
  const navigate = useNavigate()

  const activeLink = ({ isActive }) => {
    return isActive ? 'font-bold text-2xl lg:text-4xl' : ''
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
    <ul className={`min-h-screen pb-24 justify-between flex flex-col gap-2 duration-500 top-[3rem] w-2/3 md:w-1/2 lg:w-1/3 lg:top-[4.5rem] absolute bg-gradient-to-r from-blue-600 to-blue-400 text-slate-200 font-semibold ${open ? 'left-0' : '-left-[100%]'} p-10 shadow-lg no-underline xl:gap-6 text-base xl:text-xl z-50 font-semibold`}>
      <div>
        <li className="duration-300 ease-linear border-b mt-4 p-2 border-slate-300 hover:bg-slate-300 hover:text-gray-800 cursor-pointer"><NavLink className={activeLink} to='/'>Home</NavLink></li>

        <li className={`duration-300 ease-linear border-b mt-4 p-2 border-slate-300 hover:bg-slate-300 hover:text-gray-800 cursor-pointer`}>
          {
            user ?
              <NavLink className={activeLink} to={isAdmin ? '/admin-dashboard/' : '/dashboard/'}><button className=' rounded-sm'>My Profile</button></NavLink>
              :
              ""
          }
        </li>
        {
          user ?
            <li className="duration-300 ease-linear border-b mt-4 p-2 border-slate-300 hover:bg-slate-300 hover:text-gray-800 cursor-pointer"><NavLink className={activeLink} to='/apartments'>Apartments</NavLink></li>
            :
            ""
        }
      </div>

      <div>
        {
          user ?
            <li className={`duration-300 flex items-center gap-1 ease-linear border-b mt-4 p-2 border-slate-300 hover:bg-slate-300 hover:text-gray-800 cursor-pointer`} onClick={handleSignOut}><IoCaretBackOutline />Sign Out</li>
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
      </div>
    </ul>
  </>


  return (
    <nav className="flex items-center justify-between m-auto text-xl font-medium font-raleway py-1 lg:py-2 relative">
      <div className="flex items-center ml-2">
        <div onClick={() => setOpen(!open)}>
          {
            open == true ? <IoMdClose className="text-2xl " /> : <RiMenu2Line className="text-2xl " />
          }
        </div>

        <div className="logo flex text-base items-center">
          <img src={logo} alt="" className="w-12 lg:w-16 pl-2" />
          <h2 className="text-blue-500 text-xl lg:text-2xl font-extrabold">Nexura Building</h2>
        </div>
      </div>


      <div className="flex flex-col xl:gap-8 xl:flex-row items-center">


        <div>
          {links}
        </div>
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
            user && !isAdmin ?
              <div className="dropdown dropdown-bottom dropdown-end">
                <div tabIndex={0} role="button" className=""><img src={user.photoURL} alt="" className="w-8 lg:w-12 h-8 lg:h-12 object-cover object-top rounded-full" /></div>
                <ul tabIndex={0} className={`dropdown-content z-[1] menu p-2 mt-1 rounded-md w-44 ${darkMode ? "bg-gray-700" : "bg-gray-300"} shadow-lg`}>
                  <h2 className="font-bold text-center">{user.displayName}</h2>
                  <Link to='/dashboard'><button className="btn border-none bg-blue-600 hover:bg-blue-500 btn-sm w-full mt-2 text-white rounded-sm">
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

          {
            isAdmin ?
              <div className="dropdown dropdown-bottom dropdown-end">
                <div tabIndex={0} role="button" className=""><img src={user.photoURL} alt="" className="w-8 lg:w-12 h-8 lg:h-12 object-cover object-top rounded-full" /></div>
                <ul tabIndex={0} className={`dropdown-content z-[1] menu p-2 mt-1 rounded-md w-44 border ${darkMode ? "border-slate-400" : "border-gray-800"} shadow-lg`}>
                  <h2 className="font-bold text-center text-black">{user.displayName}</h2>
                  <Link to='/admin-dashboard/'><button className="btn border-none bg-blue-600 hover:bg-blue-500 btn-sm w-full mt-2 text-white rounded-sm">
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

        <div className="hidden lg:flex mr-2">
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
    </nav >
  );
};

export default DashboardNavbar;