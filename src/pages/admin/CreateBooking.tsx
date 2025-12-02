import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout'

const CreateBooking = () => {
  return (
    <AdminDashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Create New Booking</h1>

      <form className="bg-white p-6 rounded-lg shadow space-y-4 max-w-xl">
        <input className="input input-bordered w-full" placeholder="Customer ID" />
        <input className="input input-bordered w-full" placeholder="Vehicle ID" />
        <input className="input input-bordered w-full" placeholder="Total Amount" />
        <button className="btn bg-green-800 text-white">Create Booking</button>
      </form>
    </AdminDashboardLayout>
  )
}

export default CreateBooking
