import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const MemberRoute = ({ children }) => {
    const { user, isMember, memberLoading } = useContext(AuthContext)
    const location = useLocation();

    if (memberLoading) {
        return <div className='w-screen h-screen text-center z-10'>
            <h1 className="text-blue-400 loading loading-dots loading-lg block m-auto font-extrabold"></h1>
        </div>
    }

    if (isMember) {
        return children;
    }

    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default MemberRoute;