// import React from 'react'
// import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout'
// import { Package } from 'lucide-react'
// import { orderApi } from '../../features/api/OrderApi'
// import { toast } from 'sonner'


// const AllOrders: React.FC = () => {

//     // RTK Query Hooks
//     const { data: AllOrders, isLoading: AllOrderIsLoading, error } = orderApi.useGetAllOrdersQuery()
//     const [updateOrder, { isLoading: isUpdateLoading }] = orderApi.useUpdateOrderMutation()
//     const [deleteOrder, { isLoading: isDeleteLoading }] = orderApi.useDeleteOrderMutation()
//     console.log("🚀 ~ AllOrders ~ AllOrders:", AllOrders)
//     return (
//         <AdminDashboardLayout>
//            <div className="flex items-center gap-3 mb-3">
//                 <div className="p-2 bg-green-100 rounded-lg">
//                     <Package className="text-green-600" size={24} />
//                 </div>
//                 <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Order Management</h1>
//             </div>

//             {/* Orders content */}
//             <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//                 <h3 className="text-xl font-semibold text-gray-700 mb-2">Orders Management</h3>
//                 <p className="text-gray-500">List of all orders from the backend</p>
//             </div>

//             <div className="bg-white rounded-lg shadow-md p-6">
//                 {AllOrderIsLoading ? (
//                     <div className="text-center py-8">
//                         <span className="loading loading-spinner text-success"></span>
//                     </div>
//                 ) : error ? (
//                     <div className="text-center py-8 text-red-600">
//                         <p>Error loading orders. {(error as any)?.status || ''}</p>
//                         <pre className="text-xs mt-2">{JSON.stringify((error as any)?.data || (error as any), null, 2)}</pre>
//                     </div>
//                 ) : !AllOrders || AllOrders.length === 0 ? (
//                     <div className="text-center py-8 text-gray-500">No orders found.</div>
//                 ) : (
//                     <div className="overflow-x-auto">
//                         <table className="table table-zebra w-full">
//                             <thead>
//                                 <tr>
//                                     <th>#</th>
//                                     <th>Order ID</th>
//                                     <th>Customer ID</th>
//                                     <th>Amount</th>
//                                     <th>Type</th>
//                                     <th>Status</th>
//                                     <th>Date</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {AllOrders.map((order, idx) => (
//                                     <tr key={order.order_id}>
//                                         <th>{idx + 1}</th>
//                                         <td>{order.order_id}</td>
//                                         <td>{order.customer_id}</td>
//                                         <td>Ksh. {order.total_amount.toFixed(2)}</td>
//                                         <td className="capitalize">{order.order_type}</td>
//                                         <td className="capitalize">{order.status}</td>
//                                         <td>{new Date(order.created_at).toLocaleString()}</td>
//                                         <td className="flex gap-2">
//                                             <button
//                                                 className="btn btn-sm btn-success"
//                                                 disabled={isUpdateLoading}
//                                                 onClick={async () => {
//                                                     try {
//                                                         await updateOrder({ order_id: order.order_id, status: 'completed' }).unwrap()
//                                                         toast.success('Order marked completed')
//                                                     } catch (err: any) {
//                                                         console.error(err)
//                                                         toast.error('Failed to update order')
//                                                     }
//                                                 }}
//                                             >
//                                                 Set Completed
//                                             </button>
//                                             <button
//                                                 className="btn btn-sm btn-error"
//                                                 disabled={isDeleteLoading}
//                                                 onClick={async () => {
//                                                     if (!confirm('Delete this order?')) return
//                                                     try {
//                                                         await deleteOrder({ order_id: order.order_id }).unwrap()
//                                                         toast.success('Order deleted')
//                                                     } catch (err: any) {
//                                                         console.error(err)
//                                                         toast.error('Failed to delete order')
//                                                     }
//                                                 }}
//                                             >
//                                                 Delete
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </AdminDashboardLayout>
//     )
// }

// export default AllOrders
