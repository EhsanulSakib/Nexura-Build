import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const PrivateRouter = () => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()

    if (loading) {
        return <div className='w-screen h-screen text-center z-10'>
            <h1 className="text-blue-400 loading loading-dots loading-lg block m-auto font-extrabold"></h1>
        </div>
    }

    if (user) {
        return children
    }

    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default PrivateRouter;