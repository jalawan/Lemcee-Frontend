import React from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout'
import ReportsApi from '../../features/api/ReportsApi'

const AdminReports = () => {
  // Fetch Most Booked Vehicles
  const { data: vehicleBookings, isLoading: loadingVehicles } =
    ReportsApi.useGetMostBookedVehiclesQuery()

  // Fetch Monthly Revenue
  const { data: revenueData, isLoading: loadingRevenue } =
    ReportsApi.useGetMonthlyRevenueQuery()

  // Provide defaults if hooks return undefined
  const vehicles = vehicleBookings?.data?? []
  const revenue = revenueData?.data ?? []

  return (
    <AdminDashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Company Performance Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* MOST BOOKED VEHICLES */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Most Booked Vehicles</h3>

          {loadingVehicles ? (
            <p>Loading...</p>
          ) : !vehicles.length ? (
            <p>No vehicle bookings yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vehicles.slice(0, 5)}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* MONTHLY REVENUE */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Monthly Revenue</h3>

          {loadingRevenue ? (
            <p>Loading...</p>
          ) : !revenue.length ? (
            <p>No revenue data yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenue}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) =>
                    `Ksh ${value.toLocaleString()}`
                  }
                />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </AdminDashboardLayout>
  )
}

export default AdminReports
