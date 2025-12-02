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

const vehicleBookings = [
  { name: 'Range Rover', bookings: 45 },
  { name: 'BMW X6', bookings: 30 },
  { name: 'Mercedes GLE', bookings: 25 },
  { name: 'Audi Q7', bookings: 20 },
]

const revenueData = [
  { month: 'Jan', revenue: 450000 },
  { month: 'Feb', revenue: 520000 },
  { month: 'Mar', revenue: 610000 },
]

const AdminReports = () => {
  return (
    <AdminDashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Company Performance Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* MOST BOOKED VEHICLES */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Most Booked Vehicles</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vehicleBookings}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* MONTHLY REVENUE */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line dataKey="revenue" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AdminDashboardLayout>
  )
}

export default AdminReports
