import React from 'react'
import DashboardLayout from '../../dashboardDesign/DashboardLayout'
import { DollarSign, HardDriveDownload, ShoppingCart, Star, User, WavesIcon ,Heart } from 'lucide-react'
import { Link } from 'react-router'
import type { FavoriteItems } from '../../types/Types';
import { dashboardDataApi } from '../../features/api/DashboardDataApi';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { type RecentBookings } from '../../types/Types';

// export interface FavoriteItems{
//     id:number;
//     name:string;
//     price:number;
//     image:string;
//     orders:number
// }



const UserDashboard: React.FC = () => {

    const { isAuthenticated, user } = useSelector((state: RootState) => state.authSlice)

     const { data: userStats, isLoading: userStatsLoading, error } = dashboardDataApi.useGetUserDashboardByIdQuery(
        (user?.user_id!),
        { skip: !isAuthenticated }
    )

    // User-specific dashboard data
    // const userStats:UserStats  = {
    //     totalOrders: 12,
    //     favoriteItems: 8,
    //     totalSpent: 347.50,
    //     loyaltyPoints: 1250
    // }

    const recentbookings: RecentBookings[] = [
        // { id: 1, restaurant: "Mathe's Eatery", items: "Grilled Chicken & Salad", amount: 28.99, status: "Delivered", date: "Nov 14, 2025", rating: 5 },
        // { id: 2, restaurant: "Mathe's Eatery", items: "Pasta Carbonara", amount: 24.50, status: "Delivered", date: "Nov 12, 2025", rating: 4 },
        // { id: 3, restaurant: "Mathe's Eatery", items: "Beef Burger Combo", amount: 15.99, status: "In Transit", date: "Nov 15, 2025", rating: 0 },
    ]


    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid': return 'badge-success';
            case 'pending': return 'badge-info';
            case '': return 'badge-loading';
            case 'Failed': return 'badge-error';
            default: return 'badge-neutral';
        }
    }

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <svg
                key={index}
                className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))
    }


    return (
        <DashboardLayout>
            {/* Welcome Header */}
            <div className="mb-8 mt-17 ml-">
                <div className="bg-linear-to-r from-green-800 to-yellow-700 rounded-lg p-6 text-white">
                    <h1 className="text-3xl font-bold">Welcome back, Valued Customer! 👋</h1>
                    <p className="mt-2 text-green-100">Drive with us <WavesIcon/> </p>
                </div>
            </div>

            {/* User Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {userStatsLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="loading loading-spinner loading-lg text-green-800"></div>
                        <span className="ml-2 text-gray-600">Loading dashboard...</span>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-64">                       
                        <span className="ml-2 text-red-600">Error Loading dashboard data</span>
                    </div>
                ) : (
                    <>
                        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500 transform hover:scale-105 transition-transform duration-200">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <p className="text-gray-600 text-sm font-medium">My Bookings</p>
                                    <p className="text-2xl font-bold text-gray-900">{userStats?.totalBookings}</p>
                                    <p className="text-xs text-green-600">+2 this month</p>
                                </div>
                                <div className="bg-green-100 rounded-full p-3">
                                    <ShoppingCart size={36} color="#21791b" strokeWidth={1.75} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500 transform hover:scale-105 transition-transform duration-200">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <p className="text-gray-600 text-sm font-medium">Total Spent</p>
                                    <p className="text-2xl font-bold text-gray-900">${userStats?.totalSpent}</p>
                                    <p className="text-xs text-orange-600">This year</p>
                                </div>
                                <div className="bg-orange-100 rounded-full p-3">
                                    <DollarSign size={36} color="#21791b" strokeWidth={1.75} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500 transform hover:scale-105 transition-transform duration-200">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <p className="text-gray-600 text-sm font-medium">Loyalty Points</p>
                                    <p className="text-2xl font-bold text-gray-900">{userStats?.loyaltyPoints}</p>
                                    <p className="text-xs text-purple-600">+150 this month</p>
                                </div>
                                <div className="bg-purple-100 rounded-full p-3">
                                    <Star size={36} color="#21791b" strokeWidth={1.75} />
                                </div>
                            </div>
                        </div>

                        {/* <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 transform hover:scale-105 transition-transform duration-200">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <p className="text-gray-600 text-sm font-medium">Favorite Items</p>
                                    <p className="text-2xl font-bold text-gray-900">{userStats?.favoriteItems}</p>
                                    <p className="text-xs text-blue-600">Saved items</p>
                                </div>
                                <div className="bg-blue-100 rounded-full p-3">
                                    <Heart size={36} color="#21791b" strokeWidth={1.75} />
                                </div>
                            </div>
                        </div> */}
                    </>
                )}
            </div>
            

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Recent Bookings */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">My Recent Bookings</h2>
                        <Link to="/dashboard/my-bookings" className="btn btn-sm bg-green-800 hover:bg-green-900 text-white border-none">
                            View All Bookings
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {recentbookings.length === 0 ? (
                            <div className="col-span-4 flex flex-col items-center justify-center py-10">
                                <HardDriveDownload size={48} className="text-gray-300 mb-4" />
                                <p className="text-gray-600">You have no recent bookings. Start exploring our vehicles!</p>
                            </div>
                        ) : (recentbookings.map((booking) => (
                            <div key={booking.user_id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{booking.vehicle_id}</h3>
                                        <p className="text-sm text-gray-600"> •{booking.booking_date.toLocaleDateString()}</p>
                                        <div className="flex items-center mt-2">
                                            <span className={`badge ${getStatusColor(booking.booking_status)} text-white mr-3`}>
                                                {booking.booking_status}
                                            </span>
                                            {booking.rating > 0 && (
                                                <div className="flex items-center">
                                                    {renderStars(booking.rating)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-green-700">${booking.total_amount}</p>
                                        {booking.booking_status === 'Delivered' && booking.rating === 0 && (
                                            <button className="btn btn-xs bg-yellow-500 hover:bg-yellow-600 text-white mt-2">
                                                Rate Booking
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
                    <div className="space-y-3">
                        <Link to="/vehicles" className="w-full btn bg-green-800 hover:bg-green-900 text-white border-none flex items-center justify-start p-4">
                        Book Now
                    </Link>
                        
                        {/* <button className="w-full btn bg-orange-400 hover:bg-orange-500 text-white border-none flex items-center justify-start p-4">
                            <Heart className="w-5 h-5 mr-3" />
                            View Favorites
                        </button> */}
                        <button className="w-full btn bg-purple-600 hover:bg-purple-700 text-white border-none flex items-center justify-start p-4">
                            <Star className="w-5 h-5 mr-3" />
                            Loyalty Rewards
                        </button>
                        <button className="w-full btn bg-blue-600 hover:bg-blue-700 text-white border-none flex items-center justify-start p-4">
                            <User className="w-5 h-5 mr-3" />
                            Profile Settings
                        </button>
                    </div>
                </div>
            </div>

            {/* Favorite Items */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Your Favorite Items</h2>
                    <Link to="/vehicles" className="btn  btn-outline border-green-800 text-green-800 hover:bg-green-800 hover:text-white">
                        Browse Vehicles
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* {favoriteItems.length === 0 ? (
                        // Display a message when there are no favorite items with a lucide icon  align items center
                        <div className="col-span-4 flex flex-col items-center justify-center py-10">
                            <Heart size={48} className="text-gray-300 mb-4" />
                            <p className="text-gray-600">You have no favorite vehicles yet. Start exploring our vehicles page!</p>
                        </div>
                    ) : (
                        favoriteItems.map((item) => (
                            <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
                                <div className="text-center">
                                    <div className="text-4xl mb-2">{item.image}</div>
                                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.name}</h3>
                                    <p className="text-green-700 font-bold">${item.price}</p>
                                    <p className="text-xs text-gray-500 mb-3">Booked {item.Booked} times</p>
                                    <button className="btn btn-xs bg-green-800 hover:bg-green-900 text-white w-full">
                                        Book Again
                                    </button>
                                </div>
                            </div>
                        )))} */}
                </div>
            </div>
        </DashboardLayout>
    )
}

export default UserDashboard