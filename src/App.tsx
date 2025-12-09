import Home from './pages/Home'
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router'
import About from './pages/About'
import Booking from './pages/user/Bookings'
import Register from './pages/Register'
import Login from './pages/Login'
import Contact from './pages/Contact'
import Vehicles from './pages/Vehicles'
import VehicleSpecification from './pages/vehicleSpec'
import UserDashboard from './pages/user/UserDashboard'
import UserBookings from './pages/user/Bookings'
import UserProfile from './pages/user/UserProfile'
import AdminDashboard from './pages/admin/AdminDasboard'
import AllBookings from './pages/admin/AllBookings'
import AllVehicles from './pages/admin/AllVehicles'
import AllCustomers from './pages/admin/AllCustomers'
import AddVehicle from './pages/admin/AddVehicle'
import CreateBooking from './pages/admin/CreateBooking'
import AdminReports from './pages/admin/AdminReports'
import AdminSettings from './pages/admin/AddSettings'
import AddVehicleSpecification from './pages/admin/AddSpecifiication'
import Payments from './pages/user/Payments'
import UserSupportTickets from './pages/user/UserSupportTickets'
import AllSupportTickets from './pages/admin/AllSupportTickets';
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'


import { useSelector } from 'react-redux'
import type { RootState } from './store/store'

function App() {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.authSlice
  )

  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/about', element: <About /> },
    { path: '/booking', element: <Booking /> },
    { path: '/contact', element: <Contact /> },
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> },
    { path: '/vehicles', element: <Vehicles /> },
    {
      path: '/vehicle_spec/:vehicle_id',
      element: <VehicleSpecification />,
    },
    {
      path:'/forgot-password',element:<ForgotPassword/>
    },
    {
      path:'/reset-password',element:<ResetPassword/>
    },


    //  USER DASHBOARD 
    {
      path: '/dashboard',
      element: isAuthenticated ? <UserDashboard /> : <Navigate to="/login" />,
    },
    {
      path: '/dashboard/my-bookings',
      element: isAuthenticated ? <UserBookings /> : <Navigate to="/login" />,
    },
    {
      path: '/dashboard/user-profile',
      element: isAuthenticated ? <UserProfile /> : <Navigate to="/login" />,
    },
    {
      path: '/payments',
      element: isAuthenticated ? <Payments /> : <Navigate to="/login" />,
    },
    {
      path: '/user/support-tickets',
      element: isAuthenticated ? <UserSupportTickets /> : <Navigate to="/login" />,
    },
    // {
    //   path: '/supportTickets',
    //   element: isAuthenticated ? <UserTickets /> : <Navigate to="/login" />,
    // },

    //  ADMIN DASHBOARD (PROTECTED) 
    {
      path: '/admin/dashboard',
      element:
        isAuthenticated && user?.role === 'admin' ? (
          <AdminDashboard />
        ) : (
          <Navigate to="/dashboard" />
        ),
    },
    {
      path: '/admin/dashboard/all-Bookings',
      element:
        isAuthenticated && user?.role === 'admin' ? (
          <AllBookings />
        ) : (
          <Navigate to="/dashboard" />
        ),
    },
    {
      path: '/admin/dashboard/vehicles',
      element:
        isAuthenticated && user?.role === 'admin' ? (
          <AllVehicles />
        ) : (
          <Navigate to="/dashboard" />
        ),
    },
    {
      path: '/admin/dashboard/all-users',
      element:
        isAuthenticated && user?.role === 'admin' ? (
          <AllCustomers />
        ) : (
          <Navigate to="/dashboard" />
        ),
    },
    {
      path: '/admin/vehicles',
      element:
        isAuthenticated && user?.role === 'admin' ? (
          <AddVehicle />
        ) : (
          <Navigate to="/dashboard" />
        ),
    },
    {
      path: '/admin/bookings/create',
      element:
        isAuthenticated && user?.role === 'admin' ? (
          <CreateBooking />
        ) : (
          <Navigate to="/dashboard" />
        ),
    },
    {
      path: '/admin/reports',
      element:
        isAuthenticated && user?.role === 'admin' ? (
          <AdminReports />
        ) : (
          <Navigate to="/dashboard" />
        ),
    },
    {
      path: '/admin/settings',
      element:
        isAuthenticated && user?.role === 'admin' ? (
          <AdminSettings />
        ) : (
          <Navigate to="/dashboard" />
        ),
    },
    {
      path: '/admin/vehicleSpec',
      element:
        isAuthenticated && user?.role === 'admin' ? (
          <AddVehicleSpecification />
        ) : (
          <Navigate to="/dashboard" />
        ),
    },
    {
      path: '/admin/Support-tickets',
      element:
        isAuthenticated && user?.role === 'admin' ? (
          <AllSupportTickets />
        ) : (
          <Navigate to="/dashboard" />
        ),
    },
  ])

  return <RouterProvider router={router} />
}

export default App
