import React, { useState } from 'react';
import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout';
import { Package } from 'lucide-react';
import { BookingApi } from '../../features/api/BookingApi';
import { PaymentsApi } from '../../features/api/PaymentsApi';
import { toast } from 'sonner';
import BookingDetailsModal from '../../components/BookingDetailsModal';
import { StatusDot } from '../../utils/statusDot';
import { userApi } from '../../features/api/UserApi';

const AllBookings: React.FC = () => {
  const {
    data: allBookings,
    isLoading,
    isError,
    error,
    refetch,
  } = BookingApi.useGetAllBookingsQuery();

  const [deleteBooking, { isLoading: isDeleting }] =
    BookingApi.useDeleteBookingMutation();

  const [confirmPayment, { isLoading: isUpdating }] =
    PaymentsApi.useConfirmPaymentMutation();

  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const [banUser] = userApi.useBanUserMutation();
  const [unbanUser] = userApi.useUnbanUserMutation();

  return (
    <AdminDashboardLayout>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          <Package className="text-green-600" size={24} />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Booking Management
        </h1>
      </div>

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
                  <th>Status</th>
                  <th>Is Active</th>
                  <th>Date</th>
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

                    <td>
                      <span
                        className={`badge ${
                          booking.booking_status === 'pending'
                            ? 'badge-warning'
                            : booking.booking_status === 'confirmed'
                            ? 'badge-success'
                            : 'badge-error'
                        }`}
                      >
                        {booking.booking_status}
                      </span>
                    </td>

                    <td>
                      <StatusDot booking={booking} />
                    </td>

                    <td>
                      {new Date(booking.created_at).toLocaleString()}
                    </td>

                    <td className="flex gap-2 justify-center">
                      {/* ✅ CONFIRM PAYMENT */}
                      <button
                        className="btn btn-sm btn-success"
                        disabled={
                          isUpdating ||
                          booking.booking_status !== 'pending'
                        }
                        onClick={async () => {
                          const payment_id =
                            booking.payments?.[0]?.payment_id;

                          if (!payment_id)
                            return toast.error('No payment found');

                          try {
                            await confirmPayment({
                              payment_id,
                              payment_status: 'Completed',
                            }).unwrap();

                            toast.success(
                              '✅ Payment confirmed and user notified!'
                            );

                            refetch();
                          } catch (err: any) {
                            toast.error(
                              err?.data?.message ||
                                '❌ Failed to confirm payment'
                            );
                          }
                        }}
                      >
                        {booking.booking_status === 'pending'
                          ? 'Confirm'
                          : 'Booked'}
                      </button>

                      {/* ✅ DELETE BOOKING */}
                      <button
                        className="btn btn-sm btn-error"
                        disabled={isDeleting}
                        onClick={async () => {
                          if (
                            !confirm(
                              'Are you sure you want to delete this booking?'
                            )
                          )
                            return;

                          try {
                            await deleteBooking({
                              booking_id: booking.booking_id,
                            }).unwrap();

                            toast.success(
                              '🗑️ Booking deleted successfully'
                            );

                            refetch();
                          } catch (err: any) {
                            console.error(err);
                            toast.error(
                              err?.data?.message ||
                                '❌ Failed to delete booking'
                            );
                          }
                        }}
                      >
                        Delete
                      </button>

                      {/* ✅ VIEW DETAILS */}
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ✅ MODAL */}
      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          user={selectedBooking.user}
          vehicle={selectedBooking.vehicle}
          onClose={() => setSelectedBooking(null)}
          onBanUser={async () => {
            const user_id = selectedBooking?.user?.user_id;

            if (!user_id) return toast.error('User ID missing');

            if (!confirm('🚫 Do you want to BAN this user?')) return;

            try {
              await banUser({ user_id }).unwrap();
              toast.success('🚫 User banned successfully');
              setSelectedBooking(null);
              refetch();
            } catch (err: any) {
              toast.error(err?.data?.message || '❌ Ban failed');
            }
          }}
          onUnbanUser={async () => {
            const user_id = selectedBooking?.user?.user_id;

            if (!user_id) return toast.error('User ID missing');

            if (!confirm('✅ Do you want to UNBAN this user?')) return;

            try {
              await unbanUser({ user_id }).unwrap();
              toast.success('✅ User unbanned successfully');
              setSelectedBooking(null);
              refetch();
            } catch (err: any) {
              toast.error(err?.data?.message || '❌ Unban failed');
            }
          }}
        />
      )}
    </AdminDashboardLayout>
  );
};

export default AllBookings;
