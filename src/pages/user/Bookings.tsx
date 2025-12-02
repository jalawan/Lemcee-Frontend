import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../dashboardDesign/DashboardLayout';
import { BookingApi } from '../../features/api/BookingApi';
import { PaymentsApi } from '../../features/api/PaymentsApi';
import { SupportTicketApi, type SupportTicketResponse } from '../../features/api/SupportTicketApi';
import { useSelector } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/query';
import type { RootState } from '../../store/store';
import { toast } from 'sonner';
import UserTickets from './SupportTickets';

const UserBookings: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.authSlice);

  // Bookings
  const { data: bookings, refetch: refetchBookings } = BookingApi.useGetAllBookingsByUserIdQuery(
    isAuthenticated ? user!.user_id : skipToken
  );

  // Tickets (lifted state for live updates)
  const { data: ticketsData, refetch: refetchTickets } = SupportTicketApi.useGetUserTicketsQuery(
    isAuthenticated ? user!.user_id : skipToken
  );
  const [tickets, setTickets] = useState<SupportTicketResponse[]>([]);

  useEffect(() => {
    if (ticketsData) setTickets(ticketsData);
  }, [ticketsData]);

  const [updateBooking] = BookingApi.useUpdateBookingMutation();
  const [createBooking] = BookingApi.useAddNewBookingStatusMutation();
  const [addPayment, { isLoading: isPaying }] = PaymentsApi.useAddPaymentMutation();
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [paymentBooking, setPaymentBooking] = useState<any | null>(null);
  const [ticketBooking, setTicketBooking] = useState<any | null>(null);
  const [paymentData, setPaymentData] = useState({ payment_method: '', transaction_id: '' });
  const [phone, setPhone] = useState('');

  const getVehicleName = (booking: any) => {
    if (booking.vehicle?.specs) return `${booking.vehicle.specs.manufacturer} ${booking.vehicle.specs.model}`;
    if (Array.isArray(booking.vehicle_id) && booking.vehicle_id.length > 0) return `Vehicle #${booking.vehicle_id[0]}`;
    return 'Unknown Vehicle';
  };

  const handleCancel = async (booking_id: number) => {
    try {
      await updateBooking({ booking_id, status: 'Cancelled' }).unwrap();
      toast.success('Booking cancelled');
      refetchBookings();
    } catch {
      toast.error('Failed to cancel booking');
    }
  };

  const handleRebook = async (booking: any) => {
    try {
      await createBooking({
        user_id: user!.user_id,
        vehicle_id: booking.vehicle_id,
        total_amount: booking.total_amount ?? booking.rental_rate,
      }).unwrap();
      toast.success('Vehicle rebooked');
      refetchBookings();
    } catch {
      toast.error('Rebooking failed');
    }
  };

  const handlePayment = async () => {
    if (!paymentData.payment_method || (paymentData.payment_method !== 'Card' && !paymentData.transaction_id)) {
      toast.error('Please fill all fields');
      return;
    }

    // Paystack flow for Card or M-Pesa
    if (['Card', 'M-Pesa'].includes(paymentData.payment_method) && paymentBooking) {
      if (!phone) {
        toast.error('Please enter your phone number');
        return;
      }

      const handler = (window as any).PaystackPop.setup({
        key: 'YOUR_PAYSTACK_PUBLIC_KEY', // replace with your Paystack public key
        email: user!.email,
        amount: (paymentBooking.total_amount ?? paymentBooking.rental_rate) * 100,
        currency: 'KES',
        ref: `BKNG-${paymentBooking.booking_id}-${Date.now()}`,
        metadata: {
          custom_fields: [
            {
              display_name: 'Phone Number',
              variable_name: 'phone',
              value: phone,
            },
          ],
        },
        onClose: () => {
          toast.error('Payment window closed');
        },
        callback: async (response: any) => {
          try {
            await addPayment({
              booking_id: paymentBooking.booking_id,
              amount: paymentBooking.total_amount ?? paymentBooking.rental_rate,
              payment_status: 'Completed',
              payment_method: paymentData.payment_method,
              transaction_id: response.reference,
            }).unwrap();

            toast.success('Payment successful');
            setPaymentBooking(null);
            setPaymentData({ payment_method: '', transaction_id: '' });
            setPhone('');
            refetchBookings();
          } catch (err) {
            toast.error('Payment could not be recorded');
            console.error(err);
          }
        },
      });

      handler.openIframe();
      return;
    }

    // Existing flow for other methods (Bank Transfer, Manual)
    try {
      await addPayment({
        booking_id: paymentBooking!.booking_id,
        amount: paymentBooking!.total_amount ?? paymentBooking!.rental_rate,
        payment_status: 'Completed',
        payment_method: paymentData.payment_method,
        transaction_id: paymentData.transaction_id,
      }).unwrap();

      toast.success('Payment successful');
      setPaymentBooking(null);
      setPaymentData({ payment_method: '', transaction_id: '' });
      setPhone('');
      refetchBookings();
    } catch (err) {
      toast.error('Payment failed');
      console.error(err);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-200 text-yellow-800',
      Pending: 'bg-yellow-200 text-yellow-800',
      confirmed: 'bg-blue-200 text-blue-800',
      Booked: 'bg-green-200 text-green-800',
      Cancelled: 'bg-red-200 text-red-800',
    };
    return <span className={`px-2 py-1 rounded text-sm ${colors[status] ?? 'bg-gray-200 text-gray-800'}`}>{status}</span>;
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Vehicle</th>
              <th>Status</th>
              <th>Total</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings?.map((b) => (
              <tr key={b.booking_id}>
                <td>#{b.booking_id}</td>
                <td>{getVehicleName(b)}</td>
                <td>{getStatusBadge(b.booking_status)}</td>
                <td>Ksh {b.total_amount ?? b.return_date}</td>
                <td>{new Date(b.booking_date).toLocaleString()}</td>
                <td className="flex flex-col gap-1">
                  <div className="flex gap-2">
                    {['pending', 'Pending'].includes(b.booking_status) && (
                      <button className="btn btn-xs bg-blue-600 text-white" onClick={() => setPaymentBooking(b)}>Pay</button>
                    )}
                    {b.booking_status === 'Failed' && (
                      <button className="btn btn-xs bg-green-800 text-white" onClick={() => handleRebook(b)}>Rebook</button>
                    )}
                    {['paid', 'Paid'].includes(b.booking_status) && (
                      <button className="btn btn-xs btn-error" onClick={() => handleCancel(b.booking_id)}>Cancel</button>
                    )}
                    <button className="btn btn-xs btn-outline" onClick={() => setSelectedBooking(b)}>View</button>
                  </div>

                  {/* Submit Ticket button */}
                  {['paid', 'Paid'].includes(b.booking_status) && (
                    <button
                      className="btn btn-xs bg-green-700 text-white mt-1"
                      onClick={() => {
                        const event = new CustomEvent('openTicketModal', { detail: b });
                        window.dispatchEvent(event);
                      }}
                    >
                      Submit Ticket
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Booking Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg w-[400px]">
            <h2 className="font-bold mb-2">Booking Details #{selectedBooking.booking_id}</h2>
            <p>Vehicle: {getVehicleName(selectedBooking)}</p>
            <p>Status: {selectedBooking.booking_status}</p>
            <p>Total: Ksh {selectedBooking.total_amount ?? selectedBooking.rental_rate}</p>
            <p>Date: {new Date(selectedBooking.booking_date).toLocaleString()}</p>
            <button className="btn btn-sm mt-4 w-full" onClick={() => setSelectedBooking(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {paymentBooking && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">
            <h2 className="text-lg font-bold mb-4">Pay for Booking #{paymentBooking.booking_id}</h2>
            <p className="mb-2"><b>Vehicle:</b> {getVehicleName(paymentBooking)}</p>
            <p className="mb-4"><b>Amount:</b> Ksh {paymentBooking.total_amount ?? paymentBooking.rental_rate}</p>
            <select
              className="select select-bordered w-full mb-3"
              value={paymentData.payment_method}
              onChange={(e) => setPaymentData({ ...paymentData, payment_method: e.target.value })}
            >
              <option value="">Select Payment Method</option>
              <option value="M-Pesa">M-Pesa</option>
              <option value="Card">Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>

            {/* Phone number input for Card or M-Pesa */}
            {['Card', 'M-Pesa'].includes(paymentData.payment_method) && (
              <input
                type="tel"
                className="input input-bordered w-full mb-4"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            )}

            {/* Transaction ID input for other methods */}
            {paymentData.payment_method && !['Card', 'M-Pesa'].includes(paymentData.payment_method) && (
              <input
                type="text"
                className="input input-bordered w-full mb-4"
                placeholder="Transaction ID"
                value={paymentData.transaction_id}
                onChange={(e) => setPaymentData({ ...paymentData, transaction_id: e.target.value })}
              />
            )}

            <div className="flex justify-end gap-2">
              <button className="btn btn-sm" onClick={() => setPaymentBooking(null)}>Cancel</button>
              <button className="btn btn-sm bg-blue-600 text-white" onClick={handlePayment} disabled={isPaying}>
                {isPaying ? 'Processing...' : 'Pay Now'}
              </button>
            </div>
          </div>
        </div>
      )}

      <UserTickets />
    </DashboardLayout>
  );
};

export default UserBookings;
