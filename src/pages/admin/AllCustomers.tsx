import React from 'react'
import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout'
import { Users } from 'lucide-react'
import { userApi } from '../../features/api/UserApi'
import { toast } from 'sonner'

const AllCustomers: React.FC = () => {

     //RTK QUery Hook
    const { data: allCustomers, isLoading: customerIsLoading } = userApi.useGetAllUsersQuery()
    const [updateUserType, { isLoading: isUpdatingType }] = userApi.useUpdateUserTypeStatusMutation()
    console.log("🚀 ~ AllVehicles ~ allVehicles:", allCustomers)
    return (
        <AdminDashboardLayout>
            <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="text-blue-600" size={24} />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">User Management</h1>
            </div>

            {/* Placeholder content */}
            {/* <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Users className="mx-auto mb-4 text-blue-600" size={48} />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Customer Management</h3>
                <p className="text-gray-500">This page will contain customer management functionality</p>
                <button className="btn bg-blue-600 hover:bg-blue-700 text-white mt-4">
                    Coming Soon
                </button>
            </div> */}

            {/* let have a table structure for customers */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">All Users</h3>
            </div>

            {/* table structure */}
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Contact_phone</th>
                            <th>Date Joined</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerIsLoading ? (
                            <tr>
                                <td colSpan={8} className="text-center py-6">
                                    <span className="loading loading-spinner"></span>
                                </td>
                            </tr>
                        ) : !allCustomers || allCustomers.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center py-6 text-gray-500">No users found.</td>
                            </tr>
                        ) : (
                            allCustomers.map((cust, idx) => (
                                <tr key={cust.user_id}>
                                    <th>{idx + 1}</th>
                                    <td>{cust.first_name}</td>
                                    <td>{cust.last_name}</td>
                                    <td>{cust.email}</td>
                                    <td>{cust.contact_phone}</td>
                                    <td>{new Date(cust.created_at).toLocaleDateString()}</td>
                                    <td className="capitalize">{cust.role || cust.role || 'User'}</td>
                                    <td>
                                        <button className="btn btn-sm btn-primary mr-2">View</button>
                                        <button
                                            className="btn btn-sm btn-warning mr-2"
                                            disabled={isUpdatingType}
                                            onClick={async () => {
                                                const newType = (cust.role === 'admin') ? 'User' : 'admin' 
                                                try {
                                                    await updateUserType({ user_id: cust.user_id, user_type: newType }).unwrap()
                                                    toast.success(`User type updated to ${newType}`)
                                                } catch (err: any) {
                                                    console.error(err)
                                                    toast.error('Failed to update user type')
                                                }
                                            }}
                                        >
                                            Toggle Role
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </AdminDashboardLayout>
    )
}

export default AllCustomers