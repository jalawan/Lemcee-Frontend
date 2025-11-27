import Home from './pages/Home'
import { RouterProvider ,createBrowserRouter} from "react-router"
import About from './pages/About'
//import Booking from'./pages/Booking'
import Register from "./pages/Register"
import Login from "./pages/Login"
import  Contact from './pages/Contact'
import Vehicles from './pages/Vehicles'
import VehicleSpecification from './pages/vehicleSpec'
import UserDashboard from './pages/user/UserDashboard'
import Bookings from './pages/user/Bookings'
import UserProfile from './pages/user/UserProfile'
import AdminDashboard from './pages/admin/AdminDasboard'
//import AllBookings from './pages/admin/AllBookings'
import AllVehicles from './pages/admin/AllVehicles'
import AllCustomers from './pages/admin/AllCustomers'




function App () {
  const router =createBrowserRouter([
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/about',
      element:<About/>
    },
    // {
    //   path:'/booking',
    //   element:<Booking/>
    // },
    {
      path:'/contact',
      element:<Contact/>
    },
    {
      path:'/Register',
      element:<Register/>
    },
    {
      path :'/Login',
      element:<Login/>
    },
    {
      path:'/vehicles',
      element:<Vehicles/>
    },
    {
      path:"/vehicle_spec/:vehicle_id",
      element:<VehicleSpecification />
    },
     // User Dashboard routes
    {
      path: '/dashboard',
      element: <UserDashboard />
    },
    {
      path: '/dashboard/my-Bookings',
      element: <Bookings />
    },
    {
      path: '/dashboard/user-profile',
      element: <UserProfile />
    },
    // Admin dashboard routes
    {
      path: '/admin/dashboard',
      element: <AdminDashboard />
    },
    // {
    //   path: '/admin/dashboard/all-Bookings',
    //   element: <AllBookings/>
    // },
    {
      path: '/admin/dashboard/all-vehicles',
      element: <AllVehicles />
    },
    {
      path: '/admin/dashboard/all-customers',
      element: <AllCustomers />
    },
  
  ])
  return(
    <RouterProvider router ={router}/>
  )
}

export default App
