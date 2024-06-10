import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";


const AdminRoute = ({ children }) => {
    const { user, isAdmin, isAdminLoading, loading } = useContext(AuthContext)
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className='w-screen h-screen text-center z-10'>
            <h1 className="text-blue-400 loading loading-dots loading-lg block m-auto font-extrabold"></h1>
        </div>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

export default AdminRoute;