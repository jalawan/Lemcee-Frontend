import React from 'react'
import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout'
import { useNavigate } from 'react-router'
import { Clipboard, DollarSign, ShoppingCart, Users } from 'lucide-react'
import { dashboardDataApi } from '../../features/api/DashboardDataApi'
import { BookingApi } from '../../features/api/BookingApi'
import type { AdminDashboardStats, RecentBookings } from '../../types/Types'


const AdminDashboard: React.FC = () => {
   
       //RTK QUery Hook
    const {data:dashboardData,isLoading:dataIsLoading} = dashboardDataApi.useGetAdminDashboardDataQuery()
    //Sample dashboard data
    // const dashboardData: DashboardStats = {
    //     totalBookings: 245,
    //     totalRevenue: 15420,
    //     totalCustomers: 189,
    //     totalVehicles: 32
    // }

    // const recentBookings: RecentBooking[] = [
    //     { id: 1, customer: "John Doe", amount: 45.50, status: "Delivered", time: "2 hours ago" },
    //     { id: 2, customer: "Jane Smith", amount: 32.75, status: "Preparing", time: "30 min ago" },
    //     { id: 3, customer: "Mike Johnson", amount: 67.25, status: "Ready", time: "15 min ago" },
    //     { id: 4, customer: "Sarah Wilson", amount: 28.90, status: "Delivered", time: "1 hour ago" }
    // ]

    const { data: allBookings, isLoading: BookingsLoading, error: BookingsError } = BookingApi.useGetAllBookingsQuery()
    const navigate = useNavigate();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Delivered': return 'badge-success';
            case 'Preparing': return 'badge-warning';
            case 'Ready': return 'badge-info';
            default: return 'badge-neutral';
        }
    }

    return (
        <AdminDashboardLayout>
            {/* Dashboard Header */}
            <div className="mb-8 bg-green-700 p-4 rounded-lg">
                <h1 className="text-3xl font-bold text-white">Lemcee Dashboard</h1>
                <p className="text-green-200 mt-2">Welcome to Lemcee Admin Management Dashboard</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                    <div className="flex items-center">
                        <div className="flex-1">
                            <p className="text-gray-600 text-sm font-medium">Total Bookings</p>
                            <p className="text-2xl font-bold text-gray-900">{dashboardData?.totalBookings}</p>
                        </div>
                        <div className="bg-green-100 rounded-full p-3">
                            <ShoppingCart className="text-green-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 order-l-4 border-orange-500">
                    <div className="flex items-center">
                        <div className="flex-1">
                            <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
                            <p className="text-2xl font-bold text-gray-900">${dashboardData?.totalRevenue.toLocaleString()}</p>
                        </div>
                        <div className="bg-orange-100 rounded-full p-3">
                            <DollarSign className="text-orange-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                    <div className="flex items-center">
                        <div className="flex-1">
                            <p className="text-gray-600 text-sm font-medium">Total Customers</p>
                            <p className="text-2xl font-bold text-gray-900">{dashboardData?.totalCustomers}</p>
                        </div>
                        <div className="bg-blue-100 rounded-full p-3">
                            <Users className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                    <div className="flex items-center">
                        <div className="flex-1">
                            <p className="text-gray-600 text-sm font-medium">Menu Items</p>
                            <p className="text-2xl font-bold text-gray-900">{dashboardData?.totalVehicles}</p>
                        </div>
                        <div className="bg-purple-100 rounded-full p-3">
                            <Clipboard className="text-purple-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Bookings Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
                        <button
                            className="btn btn-sm bg-green-800 hover:bg-green-900 text-white border-none"
                            onClick={() => navigate('/admin/dashboard/all-Bookings')}
                        >
                            View All
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th className="text-gray-600">Customer</th>
                                    <th className="text-gray-600">Amount</th>
                                    <th className="text-gray-600">Status</th>
                                    <th className="text-gray-600">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {BookingsLoading ? (
                                    <tr>
                                        <td colSpan={4} className="text-center py-4">
                                            <span className="loading loading-spinner"></span>
                                        </td>
                                    </tr>
                                ) : BookingsError ? (
                                    <tr>
                                        <td colSpan={4} className="text-center text-red-600 py-4">
                                            Error loading Bookings
                                        </td>
                                    </tr>
                                ) : (!allBookings || allBookings.length === 0) ? (
                                    <tr>
                                        <td colSpan={4} className="text-center text-gray-500 py-4">No recent Bookings</td>
                                    </tr>
                                ) : (
                                    allBookings.slice(0, 4).map((Booking) => (
                                        <tr key={Booking.booking_id} className="hover:bg-gray-50">
                                            <td className="font-medium text-gray-900">{Booking.user_id}</td>
                                            <td className="font-semibold text-green-700">Ksh. {Booking.total_amount.toFixed(2)}</td>
                                            <td>
                                                <span className={`badge ${getStatusColor(Booking.booking_status)} text-white`}>
                                                    {Booking.booking_status}
                                                </span>
                                            </td>
                                            <td className="text-gray-500 text-sm">{new Date(Booking.created_at).toLocaleString()}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="btn bg-green-800 hover:bg-green-900 text-white border-none flex flex-col items-center p-6 h-auto">
                            <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Vehicle
                        </button>
                        <button className="btn bg-orange-400 hover:bg-orange-500 text-white border-none flex flex-col items-center p-6 h-auto">
                            <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            New Booking
                        </button>
                        <button className="btn bg-blue-600 hover:bg-blue-700 text-white border-none flex flex-col items-center p-6 h-auto">
                            <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            View Reports
                        </button>
                        <button className="btn bg-purple-600 hover:bg-purple-700 text-white border-none flex flex-col items-center p-6 h-auto">
                            <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Settings
                        </button>
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    )
}

export default AdminDashboard