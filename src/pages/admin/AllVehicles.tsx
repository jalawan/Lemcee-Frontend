import React from 'react'

import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout'
import { Clipboard } from 'lucide-react'
import { VehicleApi } from '../../features/api/VehicleApi'
import { toast } from 'sonner'

import type { Vehicles } from '../../types/Types'



const AllVehicles: React.FC = () => {
    return (
        <AdminDashboardLayout>
            <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                    <Clipboard className="text-purple-600" size={24} />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Menu Items Management</h1>
            </div>

            {/* Menu items list */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">All Menu Items</h3>
                <p className="text-gray-500">This page displays all menu items available in the restaurant.</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                {/* RTK Query */}
                {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
                {/* @ts-ignore */}
                {(() => {
                    const { data: Vehicles, isLoading, error } = VehicleApi.useGetAllvehicleQuery();
                    if (isLoading) {
                        return (
                            <div className="text-center py-8">
                                <span className="loading loading-spinner"></span>
                            </div>
                        )
                    }
                    if (error) {
                        return (
                            <div className="text-center py-8 text-red-600">
                                <p>Error loading menu items.</p>
                                <pre className="text-xs mt-2">{JSON.stringify((error as any)?.data || (error as any), null, 2)}</pre>
                            </div>
                        )
                    }
                    if (!Vehicles || Vehicles.length === 0) {
                        return <div className="text-center py-8 text-gray-500">No menu items found.</div>
                    }

                    const [updateVehicle, { isLoading: isUpdatingVehicle }] = VehicleApi.useUpdatevehicleMutation()
                    const [deleteVehicle, { isLoading: isDeletingMenu }] = VehicleApi.useDeletevehicleMutation()

                    return (
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>vehicle_spec_id</th>
                                        <th>rental_rate</th>
                                        <th>availability</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Vehicles.map((item: Vehicles, idx: number) => (
                                        <tr key={item.vehicle_id}>
                                            <th>{idx + 1}</th>
                                            <td>{item.vehicle_spec_id}</td>
                                            <td className="truncate max-w-xs">{item.rental_rate}</td>
                                            <td>{item.availability ? 'Yes' : 'No'}</td>
                                            <td className="flex gap-2">
                                                <button
                                                    className="btn btn-sm btn-warning"
                                                    disabled={isUpdatingVehicle}
                                                    onClick={async () => {
                                                        try {
                                                            await updateVehicle({ vehicle_id: item.vehicle_id, availability: !item.availability }).unwrap()
                                                            toast.success('Vehicle availability updated')
                                                        } catch (err: any) {
                                                            console.error(err)
                                                            toast.error('Failed to update vehicle')
                                                        }
                                                    }}
                                                >
                                                    Toggle Available
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-error"
                                                    disabled={isDeletingMenu}
                                                    onClick={async () => {
                                                        if (!confirm('Delete this vehicle?')) return
                                                        try {
                                                            await deleteVehicle({ vehicle_id: item.vehicle_id }).unwrap()
                                                            toast.success('Menu item deleted')
                                                        } catch (err: any) {
                                                            console.error(err)
                                                            toast.error('Failed to delete vehicle')
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                })()}
            </div>
        </AdminDashboardLayout>
    )
}

export default AllVehicles