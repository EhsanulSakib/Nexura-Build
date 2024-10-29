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
import MakeAnnouncement from "../pages/dashboard/makeAnnouncement/MakeAnnouncement";
import AgreementRequests from "../pages/dashboard/agreementRequests/AgreementRequests";
import MemberRoute from "./MemberRoute";
import MemberPayment from "../pages/dashboard/memberPayment/MemberPayment";
import MemberPaymentHistory from "../pages/dashboard/memberPaymentHistory/MemberPaymentHistory";
import AllPaymentHistory from "../pages/dashboard/allPaymentHistory/AllPaymentHistory";
import UpdateAnnouncement from "../pages/dashboard/updateAnnouncement/UpdateAnnouncement";
import MemberOffers from "../pages/dashboard/memberOffers/MemberOffers";
import CreateOffers from "../pages/dashboard/createOffers/CreateOffers";
import UpdateOffer from "../pages/dashboard/updateOffer/UpdateOffer";

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
                element: <PrivateRouter><Apartments></Apartments></PrivateRouter>
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
                path: '/dashboard/profile',
                element: <PrivateRouter><Profile /></PrivateRouter>
            },
            {
                path: '/dashboard/announcements',
                element: <PrivateRouter><Announcements></Announcements></PrivateRouter>
            },
            {
                path: '/dashboard/payment',
                element: <MemberRoute><MemberPayment></MemberPayment></MemberRoute>
            },
            {
                path: '/dashboard/payment-history',
                element: <MemberRoute><MemberPaymentHistory></MemberPaymentHistory></MemberRoute>
            },
            {
                path: '/dashboard/offers',
                element: <MemberRoute><MemberOffers></MemberOffers></MemberRoute>
            }
        ]
    },
    {
        path: '/admin-dashboard',
        element: <AdminRoute><Dashboard></Dashboard></AdminRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/admin-dashboard/profile',
                element: <AdminRoute><Profile></Profile></AdminRoute>
            },
            {
                path: '/admin-dashboard/manage-members',
                element: <AdminRoute><ManageMembers></ManageMembers></AdminRoute>
            },
            {
                path: '/admin-dashboard/make-announcement',
                element: <AdminRoute><MakeAnnouncement></MakeAnnouncement></AdminRoute>
            },
            {
                path: '/admin-dashboard/update-announcement/:id',
                element: <AdminRoute><UpdateAnnouncement></UpdateAnnouncement></AdminRoute>
            },
            {
                path: '/admin-dashboard/agreement-requests',
                element: <AdminRoute><AgreementRequests></AgreementRequests></AdminRoute>
            },
            {
                path: '/admin-dashboard/create-offers',
                element: <AdminRoute><CreateOffers></CreateOffers></AdminRoute>
            },
            {
                path: '/admin-dashboard/update-offers/:id',
                element: <AdminRoute><UpdateOffer></UpdateOffer></AdminRoute>
            },
            {
                path: '/admin-dashboard/payment-history',
                element: <AdminRoute><AllPaymentHistory></AllPaymentHistory></AdminRoute>
            }
        ]
    }
])

export default router;