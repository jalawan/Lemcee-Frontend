import React from 'react'
import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout'
import { Package } from 'lucide-react'
import { BookingApi } from '../../features/api/BookingApi'
import { toast } from 'sonner'

const AllBookings: React.FC = () => {
  // ✅ RTK Query Hooks
  const {data: allBookings,isLoading,isError,error,} = BookingApi.useGetAllBookingsQuery()

  const [updateBooking, { isLoading: isUpdating }] =BookingApi.useUpdateBookingMutation()

  const [deleteBooking, { isLoading: isDeleting }] =BookingApi.useDeleteBookingMutation()

  return (
    <AdminDashboardLayout>
      {/* ✅ HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          <Package className="text-green-600" size={24} />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Booking Management
        </h1>
      </div>

      {/* ✅ SUMMARY CARD */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          All Customer Bookings
        </h3>
        <p className="text-gray-500">
          Admin panel for confirming payments and managing bookings
        </p>
      </div>

      {/* ✅ BOOKINGS TABLE */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {isLoading ? (
          <div className="text-center py-10">
            <span className="loading loading-spinner text-success"></span>
          </div>
        ) : isError ? (
          <div className="text-center py-8 text-red-600">
            <p>Failed to load bookings</p>
            <pre className="text-xs mt-2">
              {JSON.stringify((error as any)?.data || error, null, 2)}
            </pre>
          </div>
        ) : !allBookings || allBookings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No bookings found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Booking ID</th>
                  <th>User ID</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Date</th>
                   <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allBookings.map((booking, idx) => (
                  <tr key={booking.booking_id}>
                    <th>{idx + 1}</th>
                    <td>{booking.booking_id}</td>
                    <td>{booking.user_id}</td>
                    <td>Ksh. {booking.total_amount.toFixed(2)}</td>
                   

                    {/* ✅ STATUS BADGE */}
                    <td>
                      <span
                        className={`badge ${
                          booking.booking_status === 'pending'
                            ? 'badge-warning'
                            : booking.booking_status === 'Booked'
                            ? 'badge-success'
                            : 'badge-error'
                        }`}
                      >
                        {booking.booking_status}
                      </span>
                    </td>

                    <td>
                      {new Date(
                        booking.created_at
                      ).toLocaleString()}
                    </td>

                    {/* ✅ ACTION BUTTONS */}
                    <td className="flex gap-2 justify-center">
                      {/* ✅ CONFIRM PAYMENT */}
                      <button
                        className="btn btn-sm btn-success"
                        disabled={
                          isUpdating ||
                          booking.booking_status !== 'pending'
                        }
                        onClick={async () => {
                          const confirmPayment = confirm(
                            'Confirm customer payment?'
                          )
                          if (!confirmPayment) return

                          try {
                            await updateBooking({
                              booking_id:
                                booking.booking_id,
                              status: 'booked',
                            }).unwrap()

                            toast.success(
                              '✅ Payment confirmed. Booking is now BOOKED.'
                            )
                          } catch (err: any) {
                            console.error(err)
                            toast.error(
                              err?.data?.message ||
                                '❌ Failed to confirm payment'
                            )
                          }
                        }}
                      >
                        {booking.booking_status ===
                        'pending'
                          ? 'Confirm'
                          : 'Booked'}
                      </button>

                      {/* ✅ DELETE BOOKING */}
                      <button
                        className="btn btn-sm btn-error"
                        disabled={isDeleting}
                        onClick={async () => {
                          const confirmDelete = confirm(
                            'Are you sure you want to delete this booking?'
                          )
                          if (!confirmDelete) return

                          try {
                            await deleteBooking({
                              booking_id:
                                booking.booking_id,
                            }).unwrap()

                            toast.success(
                              '🗑️ Booking deleted successfully'
                            )
                          } catch (err: any) {
                            console.error(err)
                            toast.error(
                              err?.data?.message ||
                                '❌ Failed to delete booking'
                            )
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
  )
}

export default AllBookings
