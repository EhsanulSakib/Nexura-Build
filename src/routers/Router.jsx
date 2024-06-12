import { createBrowserRouter } from "react-router-dom";
import Root from "../root/Root";
import Home from "../pages/home/Home";
import ErrorPage from "../components/errorPage/ErrorPage";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Apartments from "../pages/apartments/Apartments";
import Dashboard from "../pages/dashboard/Dashboard";
import PrivateRouter from "./PrivateRouter";
import Profile from "../pages/dashboard/profile/Profile";
import AdminRoute from "./AdminRoute";
import Announcements from "../pages/dashboard/announcements/Announcements";
import AdminDashboard from "../pages/dashboard/adminDashboard/AdminDashboard";
import ManageMembers from "../components/dashboard/admin/manageMembers/ManageMembers";
import MakeAnnouncement from "../components/dashboard/admin/makeAnnouncement/MakeAnnouncement";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/apartments',
                element: <Apartments></Apartments>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/dashboard/',
                element: <PrivateRouter><Profile></Profile></PrivateRouter>
            },
            {
                path: '/dashboard/announcements',
                element: <PrivateRouter><Announcements></Announcements></PrivateRouter>
            },
        ]
    },
    {
        path: '/admin-dashboard',
        element: <AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/admin-dashboard/',
                element: <AdminRoute><Profile></Profile></AdminRoute>
            },
            {
                path: '/admin-dashboard/manage-members',
                element: <AdminRoute><ManageMembers></ManageMembers></AdminRoute>
            },
            {
                path: '/admin-dashboard/make-announcement',
                element: <AdminRoute><MakeAnnouncement></MakeAnnouncement></AdminRoute>
            }
        ]
    }
])

export default router;