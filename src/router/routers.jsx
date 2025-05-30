/* eslint-disable no-unused-vars */
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "../components/HOC/RootLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import About from "../pages/About";
import ProtectedRoute from "../components/HOC/withProtect";
import Dashboard from "../pages/adminPages/Dashboard";
import AdminLayout from "../components/HOC/AdminLayout";
import RoomType from "../pages/adminPages/RoomType";
import Service from "../pages/adminPages/Service";
import CreateRoom from "../pages/adminPages/CreateRoom";
import AllRoom from "../pages/adminPages/AllRoom";
import UpdateRoom from "../pages/adminPages/UpdateRoom";
import MainHalls from "../pages/MainHalls";
import Hall from "../pages/Hall";
import VerificationPage from "../pages/VerificationPage";
import PersistLogin from "../components/HOC/PersistLogin";
import SpecialPrice from "../components/molecule/SpecialPrice";
import Employee from "../pages/adminPages/Employee";
import { HallBooking } from "../pages/HallBooking";
import SingleRoom from "../pages/SingleRoom";
import HotelBookingPage from "../pages/HotelBookingPage";
import Restaurant from "../pages/Restaurant";
import LoginForm from "../components/organism/LoginForm";
import ForgotPasswordForm from "../components/organism/ForgotPasswordForm";
import ResetPasswordForm from "../components/organism/ResetPasswordForm";
import Pool from "../pages/Pool";
import Services from "../pages/Services";
import Profile from "../pages/profilePages/Profile";
import MyProfile from "../pages/profilePages/MyProfile";
import Settings from "../pages/profilePages/Settings";
import UserProtect from "../components/HOC/userProtect";
import Messages from "../pages/profilePages/Messages";
import AllUserBooking from "../pages/profilePages/AllUserBooking";
import RoomBookings from "../pages/adminPages/RoomBookings";
import HallBookings from "../pages/adminPages/HallBookings";
import PoolBookings from "../pages/adminPages/PoolBookings";
import RestaurantBookings from "../pages/adminPages/RestaurantBookings";
import UserMessages from "../pages/adminPages/UserMessages";
import HallsTable from "../pages/adminPages/HallsTable";
import NotProtectedRoute from "../components/HOC/withNotProtect";
import Halls from "../pages/adminPages/Halls";
import Pools from "../pages/adminPages/Pools";
import Restaurants from "../pages/adminPages/Restaurants";
import AdminCustomersPage from "../pages/adminPages/AdminCustomersPage";
import UserProfilePage from "../components/molecule/UserProfilePage";
import Payment from "../components/molecule/Payment";
import Invoices from "../pages/adminPages/Invoices";
import SelectedInvoicesPage from "../components/molecule/SelectedInvoicesPage";
const router = createBrowserRouter([
  {
    element: <PersistLogin />,
    children: [
      {
        path: "/",
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/aboutUs",
            element: <About />,
          },
          {
            path: "/halls",
            element: <MainHalls />,
          },
          {
            path: "/halls/family",
            element: <Hall hallType="family" />,
          },
          {
            path: "/halls/company",
            element: <Hall hallType="company" />,
          },
          {
            path: "/rooms/:id",
            element: <HotelBookingPage />,
          },
          {
            path: "/rooms/roomdetails/:id",
            element: <SingleRoom />,
          },
          {
            path: "/hall/bookings/:id",
            element: <HallBooking />,
          },
          {
            path: "/restaurant",
            element: <Restaurant />,
          },
          {
            path: "/pool",
            element: <Pool />,
          },
          {
            path: "/services",
            element: <Services />,
          },
          {
            path: "/profile",
            element: <UserProtect element={<Profile />} />,
            children: [
              {
                index: true,
                element: <MyProfile />,
              },
              {
                path: "settings",
                element: <Settings />,
              },
              {
                path: "messages",
                element: <Messages />,
              },
              {
                path: "customerBookings",
                element: <AllUserBooking />,
              },
            ],
          },
        ],
      },
      {
        path: "/admin",
        element: <ProtectedRoute element={<AdminLayout />} />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "roomtype",
            element: <RoomType />,
          },
          {
            path: "allservice",
            element: <Service />,
          },
          {
            path: "createroom",
            element: <CreateRoom />,
          },
          {
            path: "allroom",
            element: <AllRoom />,
          },
          {
            path: "updateroom/:id",
            element: <UpdateRoom />,
          },
          {
            path: "specialprice/:id",
            element: <SpecialPrice />,
          },
          {
            path: "employee",
            element: <Employee />,
          },
          {
            path: "roomBooking",
            element: <RoomBookings />,
          },
          {
            path: "hallBooking",
            element: <HallBookings />,
          },
          {
            path: "poolBooking",
            element: <PoolBookings />,
          },
          {
            path: "restaurantBooking",
            element: <RestaurantBookings />,
          },
          {
            path: "usersMessages",
            element: <UserMessages />,
          },
          {
            path: "hallsTable",
            element: <HallsTable />,
          },
          {
            path: "halls",
            element: <Halls />,
          },
          {
            path: "pools",
            element: <Pools />,
          },
          {
            path: "restaurants",
            element: <Restaurants />,
          },
          {
            path: "adminCustumer",
            element: <AdminCustomersPage />,
          },
          {
            path: "allUserData/:id",
            element: <UserProfilePage />,
          },
          {
            path: "payment/:id",
            element: <Payment />,
          },
          {
            path: "invoices",
            element: <Invoices />
          },
          {
            path: "selectedinvoices",
            element: <SelectedInvoicesPage />
          }
        ],
      },
      {
        path: "logIn",
        element: <NotProtectedRoute element={<Login />} />,
        children: [
          {
            index: true,
            element: <LoginForm />,
          },
          {
            path: "forgot-password",
            element: <ForgotPasswordForm />,
          },
          {
            path: "reset-password",
            element: <ResetPasswordForm />,
          },
        ],
      },
      {
        path: "/signup",
        element: <NotProtectedRoute element={<Signup />} />,
      },
      {
        path: "/verificationPage/:email",
        element: <VerificationPage />,
      },
      {
        path: "*",
        element: () => <h1>Page Not Found</h1>,
      },
    ],
  },
]);
export default function AppRouter() {
  return <RouterProvider router={router} />;
}
