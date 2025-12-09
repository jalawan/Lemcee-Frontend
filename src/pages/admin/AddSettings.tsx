import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout'

const AdminSettings = () => {
  return (
    <AdminDashboardLayout>
      <h1 className="text-2xl font-bold mb-6">System Settings</h1>

      <div className="bg-white p-6 rounded-lg shadow max-w-lg space-y-4">
        <input className="input input-bordered w-full" placeholder="Company Name" />
        <input className="input input-bordered w-full" placeholder="Support Email" />
        <input className="input input-bordered w-full" placeholder="MPesa Paybill" />

        <button className="btn bg-black text-gold">Save Settings</button>
      </div>
    </AdminDashboardLayout>
  )
}

export default AdminSettings
