import React from 'react'
import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout'
import { useNavigate } from 'react-router'
import { Clipboard, DollarSign, ShoppingCart, Users, PlusCircle, BarChart3, Settings } from 'lucide-react'
import { dashboardDataApi } from '../../features/api/DashboardDataApi'
import { BookingApi } from '../../features/api/BookingApi'

const AdminDashboard: React.FC = () => {
  const { data: dashboardData, isLoading } = dashboardDataApi.useGetAdminDashboardDataQuery()
  const { data: allBookings, isLoading: bookingsLoading, error } =
    BookingApi.useGetAllBookingsQuery()

  const navigate = useNavigate()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-500'
      case 'Preparing':
        return 'bg-amber-500'
      case 'Ready':
        return 'bg-cyan-500'
      default:
        return 'bg-zinc-500'
    }
  }

  return (
    <AdminDashboardLayout>
      {/* ========= LUXURY HEADER ========= */}
      <div className="relative mb-10 overflow-hidden rounded-2xl bg-gradient-to-r from-black via-zinc-900 to-black p-8 shadow-2xl border border-zinc-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#facc15_0%,transparent_40%)] opacity-20" />

        <h1 className="text-4xl font-extrabold text-white tracking-wide">
          Lemcee Luxury Fleet
        </h1>
        <p className="text-amber-400 mt-2 text-sm tracking-widest uppercase">
          Premium Vehicle Management System
        </p>
      </div>

      {/* ========= STATS CARDS ========= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
        {/* Card */}
        {[
          {
            title: 'Total Bookings',
            value: dashboardData?.totalBookings,
            icon: <ShoppingCart size={26} />,
            gradient: 'from-emerald-500 to-emerald-700',
          },
          {
            title: 'Total Revenue',
            value: `Ksh ${dashboardData?.totalRevenue ? dashboardData.totalRevenue.toLocaleString() : '0'}`,
            icon: <DollarSign size={26} />,
            gradient: 'from-green-600 to-green-800',

          },
          {
            title: 'Total Users',
            value: dashboardData?.totalUsers,
            icon: <Users size={26} />,
            gradient: 'from-sky-500 to-sky-700',
          },
          {
            title: 'Vehicles',
            value: dashboardData?.totalVehicles,
            icon: <Clipboard size={26} />,
            gradient: 'from-violet-500 to-violet-700',
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="relative rounded-2xl bg-gradient-to-br from-zinc-900 to-black p-6 border border-zinc-800 shadow-lg hover:shadow-amber-500/20 transition duration-500 group"
          >
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r ${card.gradient} blur-2xl transition`}
            />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-xs uppercase tracking-widest">
                  {card.title}
                </p>
                <p className="text-3xl font-bold text-white mt-1">
                  {isLoading ? '...' : card.value}
                </p>
              </div>

              <div
                className={`bg-gradient-to-r ${card.gradient} p-4 rounded-xl text-black shadow-lg`}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ========= RECENT BOOKINGS + QUICK ACTIONS ========= */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* ===== Recent Bookings ===== */}
        <div className="xl:col-span-2 bg-gradient-to-br from-zinc-900 to-black rounded-2xl p-6 shadow-xl border border-zinc-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white tracking-wide">
              Recent Bookings
            </h2>
            <button
              onClick={() => navigate('/admin/dashboard/all-Bookings')}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-600 text-black font-semibold shadow hover:opacity-90"
            >
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-zinc-400 border-b border-zinc-700">
                  <th className="py-3 text-left">User</th>
                  <th className="py-3 text-left">Amount</th>
                  <th className="py-3 text-left">Status</th>
                  <th className="py-3 text-left">Time</th>
                </tr>
              </thead>
              <tbody>
                {bookingsLoading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-white">
                      Loading...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-red-500">
                      Failed to load bookings
                    </td>
                  </tr>
                ) : (
                  allBookings?.slice(0, 4).map((b: any) => (
                    <tr
                      key={b.booking_id}
                      className="border-b border-zinc-800 hover:bg-zinc-800/40"
                    >
                      <td className="py-4 text-white font-medium">
                        {b.user_id}
                      </td>
                      <td className="py-4 text-amber-400 font-semibold">
                        Ksh {b.total_amount.toFixed(2)}
                      </td>
                      <td className="py-4">
                        <span
                          className={`px-3 py-1 text-xs rounded-full text-white ${getStatusColor(
                            b.booking_status
                          )}`}
                        >
                          {b.booking_status}
                        </span>
                      </td>
                      <td className="py-4 text-zinc-400 text-xs">
                        {new Date(b.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ===== Quick Actions ===== */}
        <div className="bg-gradient-to-br from-zinc-900 to-black rounded-2xl p-6 shadow-xl border border-zinc-800">
          <h2 className="text-xl font-semibold text-white mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={() => navigate('/admin/vehicles/add')}
              className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-700 text-black font-semibold hover:opacity-90"
            >
              <PlusCircle /> Add Vehicle
            </button>

            <button
              onClick={() => navigate('/admin/bookings/create')}
              className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-semibold hover:opacity-90"
            >
              <ShoppingCart /> New Booking
            </button>

            <button
              onClick={() => navigate('/admin/reports')}
              className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-sky-500 to-sky-700 text-black font-semibold hover:opacity-90"
            >
              <BarChart3 /> View Reports
            </button>

            <button
              onClick={() => navigate('/admin/settings')}
              className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-violet-500 to-violet-700 text-black font-semibold hover:opacity-90"
            >
              <Settings /> Settings
            </button>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  )
}

export default AdminDashboard
