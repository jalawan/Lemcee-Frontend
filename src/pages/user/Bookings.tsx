import React from 'react'
import DashboardLayout from '../../dashboardDesign/DashboardLayout'
import { Package } from 'lucide-react'

const Bookings: React.FC = () => {
    return (
        <DashboardLayout>
            <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-100 rounded-lg">
                    <Package className="text-green-600" size={24} />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Order Management</h1>
            </div>

            {/* Placeholder content */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Orders Management</h3>
                <p className="text-gray-500">This page will contain order management functionality</p>
                <button className="btn bg-green-800 hover:bg-green-900 text-white mt-4">
                    Coming Soon
                </button>
            </div>
        </DashboardLayout>
    )
}

export default Bookings;