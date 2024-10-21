import { useContext } from "react";
import { ToastContainer } from 'react-toastify';
import { Outlet } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const Root = () => {
    const { darkMode } = useContext(AuthContext)
    return (
        <div className={`${darkMode ? 'bg-gray-900 text-slate-200' : 'bg-slate-200 text-gray-800'} font-raleway`}>
            <div className={`max-w-[1840px] m-auto min-h-screen text-xs md:text-sm lg:text-base xl:text-xl`} >
                <Navbar></Navbar>
                <Outlet></Outlet>
                <ToastContainer></ToastContainer>
                <Footer></Footer>
            </div >
        </div>

    );
};

export default Root;