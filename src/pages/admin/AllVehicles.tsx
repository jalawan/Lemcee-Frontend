import React from 'react'

import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout'
import { Clipboard } from 'lucide-react'
import { VehicleApi } from '../../features/api/VehicleApi'
import { toast } from 'sonner'

import type { Vehicles } from '../../types/Types'



const AllVehicles: React.FC = () => {
    // Hooks at the top level
    const { data: vehicles, isLoading, error } = VehicleApi.useGetAllvehicleQuery();
    const [updateVehicle, { isLoading: isUpdatingVehicle }] = VehicleApi.useUpdatevehicleMutation();
    const [deleteVehicle, { isLoading: isDeletingMenu }] = VehicleApi.useDeletevehicleMutation();

    return (
        <AdminDashboardLayout>
            <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                    <Clipboard className="text-purple-600" size={24} />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Vehicles Management</h1>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">All Vehicles</h3>
                <p className="text-gray-500">This page displays all Vehicles available in the lot.</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                {isLoading && (
                    <div className="text-center py-8">
                        <span className="loading loading-spinner"></span>
                    </div>
                )}

                {error && (
                    <div className="text-center py-8 text-red-600">
                        <p>Error loading vehicles.</p>
                        <pre className="text-xs mt-2">{JSON.stringify((error as any)?.data || error, null, 2)}</pre>
                    </div>
                )}

                {!isLoading && !error && (!vehicles || vehicles.length === 0) && (
                    <div className="text-center py-8 text-gray-500">No vehicles found.</div>
                )}

                {!isLoading && !error && vehicles && vehicles.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>vehicle_spec_id</th>
                                    <th>rental_rate</th>
                                    <th>availability</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vehicles.map((item: Vehicles, idx: number) => (
                                    <tr key={item.vehicle_id}>
                                        <th>{idx + 1}</th>
                                        <td>{item.vehicle_spec_id}</td>
                                        <td className="truncate max-w-xs">{item.rental_rate}</td>
                                        <td>
                                        <span
                                            className={`badge ${
                                            item.availability ? "badge-success" : "badge-error"
                                            }`}
                                        >
                                            {item.availability ? "Available" : "Unavailable"}
                                        </span>
                                        </td>

                                        <td className="flex gap-2">
                                            <button
                                            className={`btn btn-sm ${item.availability ? "btn-error" : "btn-success"}`}
                                            disabled={isUpdatingVehicle}
                                            onClick={async () => {
                                                try {
                                                await updateVehicle({
                                                    vehicle_id: item.vehicle_id,
                                                    availability: !item.availability, 
                                                }).unwrap();

                                                toast.success(
                                                    item.availability
                                                    ? "Vehicle marked as UNAVAILABLE"
                                                    : "Vehicle marked as AVAILABLE"
                                                );
                                                } catch (err: any) {
                                                console.error(err);
                                                toast.error("Failed to update vehicle");
                                                }
                                            }}
                                            >
                                            {item.availability ? "Make Unavailable" : "Make Available"}
                                            </button>

                                           {/*Inside your delete button click handler*/}
                                            <button
                                            className="btn btn-sm btn-error"
                                            onClick={async () => {
                                                if (!confirm("Are you sure you want to delete this vehicle?")) return;

                                                try {
                                                // Pass the vehicle_id directly
                                                const response: any = await deleteVehicle(item.vehicle_id).unwrap();

                                                // Show success toast
                                                toast.success(response.message || "🗑️ Vehicle deleted successfully");

                                                } catch (err: any) {
                                                console.error(err);

                                                // Friendly message for foreign key constraint
                                                if (err?.data?.message?.includes("REFERENCE constraint")) {
                                                    toast.error("❌ Cannot delete vehicle: existing bookings found");
                                                } else {
                                                    toast.error(err?.data?.message || "❌ Failed to delete vehicle");
                                                }
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
                )}
            </div>
        </AdminDashboardLayout>
    );
};
 export default AllVehicles