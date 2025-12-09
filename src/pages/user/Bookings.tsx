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
import{apiDomain} from '../../apiDomain/ApiDomain'

const UserBookings: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.authSlice);

  useEffect(() => {
    const paystack = (window as any).PaystackPop;
    if (paystack && !paystack.isInitialized) paystack.initialize();
  }, []);

  const { data: bookings, refetch: refetchBookings } = BookingApi.useGetAllBookingsByUserIdQuery(
    isAuthenticated ? user!.user_id : skipToken
  );

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
  const [paymentData, setPaymentData] = useState({ payment_method: '', transaction_id: '' });
  const [phone, setPhone] = useState('');

  const getVehicleName = (booking: any) => {
    if (booking.vehicle?.specs) return `${booking.vehicle.specs.manufacturer} ${booking.vehicle.specs.model}`;
    if (Array.isArray(booking.vehicle_id) && booking.vehicle_id.length > 0) return `Vehicle #${booking.vehicle_id[0]}`;
    return 'Unknown Vehicle';
  };


  //Handle Cancel a

  const handleCancel = async (booking_id: number) => {
    try {
      await updateBooking({ booking_id, status: 'Cancelled' }).unwrap();
      toast.success('Booking cancelled');
      refetchBookings();
    } catch {
      toast.error('Failed to cancel booking');
    }
  };

  //Handle Cancel and Refund
  const [refundPayment, { isLoading: isRefunding }] = PaymentsApi.useRefundPaymentMutation();
const [cancelBooking] = BookingApi.useCancelBookingMutation();
 const handleCancelAndRefund = async (booking: any) => {
  try {
    if (!confirm("⚠ Are you sure you want to cancel and request a refund?")) return;

    if (!booking.payment?.payment_id) {
      toast.error("Payment ID not found for this booking");
      return;
    }

    // Prepare request body
    const body = {
      payment_id: booking.payment.payment_id,
      amount: booking.total_amount ?? booking.rental_rate,
    };

    // Call backend refund endpoint
    const res = await fetch(`http://localhost:3000/api/payments/refund/${booking.booking_id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Parse response safely
    let data = null;
    try {
      data = await res.json();
    } catch {
      toast.error("Failed to process refund. Backend did not return valid JSON.");
      return;
    }

    if (!data.success) {
      toast.error(data.message || "Refund failed");
      return;
    }

    toast.success("✅ Booking cancelled & refund initiated");
    refetchBookings(); // Refresh bookings list

  } catch (err: any) {
    console.error("Cancel & refund error:", err);
    toast.error(err?.data?.error || "Refund process failed");
  }
};








//Handle Bookings
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

  //Handle Payment
  const handlePayment = async () => {
    if (!paymentBooking) return toast.error("No booking selected");

    if (!paymentData.payment_method) {
      toast.error("Please select a payment method");
      return;
    }

    if (["Card", "M-Pesa"].includes(paymentData.payment_method) && !phone) {
      toast.error("Please enter your phone number");
      return;
    }

    if (!(window as any).PaystackPop && ["Card", "M-Pesa"].includes(paymentData.payment_method)) {
      toast.error("Paystack not loaded. Refresh page.");
      return;
    }

    const amount = (paymentBooking.total_amount ?? paymentBooking.rental_rate) * 100;

    if (["Card", "M-Pesa"].includes(paymentData.payment_method)) {
      const handler = (window as any).PaystackPop.setup({
        key: "pk_test_adc031e407fe1d1a90bb8ba63d94bf8589e895b4",
        email: user!.email,
        amount,
        currency: "KES",
        ref: `BKNG-${paymentBooking.booking_id}-${Date.now()}`,
        metadata: { custom_fields: [{ display_name: "Phone Number", variable_name: "phone", value: phone }] },
        onClose: () => toast.error("Payment window closed"),
        callback: function (response: any) {
          fetch("http://localhost:3000/api/payments/paystack", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              booking_id: paymentBooking.booking_id,
              payment_method: paymentData.payment_method,
              transaction_id: response.reference,
            }),
          })
            .then(() => {
              toast.success("Payment verified and recorded");
              setPaymentBooking(null);
              setPaymentData({ payment_method: "", transaction_id: "" });
              setPhone("");
              refetchBookings();
            })
            .catch(() => toast.error("Backend verification failed"));
        },
      });

      handler.openIframe();
      return;
    }

    if (!paymentData.transaction_id) {
      toast.error("Enter transaction ID");
      return;
    }

    try {
      await addPayment({
        booking_id: paymentBooking.booking_id,
        amount: paymentBooking.total_amount ?? paymentBooking.rental_rate,
        payment_status: "Paid",
        payment_method: paymentData.payment_method,
        transaction_id: paymentData.transaction_id,
      }).unwrap();

      toast.success("Payment recorded successfully");
      setPaymentBooking(null);
      setPaymentData({ payment_method: "", transaction_id: "" });
      setPhone("");
      refetchBookings();
    } catch {
      toast.error("Payment recording failed");
    }
  };

  //Status Badges
  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      Booked: 'bg-green-100 text-green-800',
      Cancelled: 'bg-red-100 text-red-800',
      Paid: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      Failed: 'bg-red-100 text-red-800',
    };
    return <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[status] ?? 'bg-gray-100 text-gray-800'}`}>{status}</span>;
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">My Bookings</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md p-6 mb-6">
        <table className="table-auto w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-gray-600">ID</th>
              <th className="py-3 px-4 text-left text-gray-600">Vehicle</th>
              <th className="py-3 px-4 text-left text-gray-600">Status</th>
              <th className="py-3 px-4 text-left text-gray-600">Total</th>
              <th className="py-3 px-4 text-left text-gray-600">Date</th>
              <th className="py-3 px-4 text-left text-gray-600">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings?.map((b) => (
              <tr key={b.booking_id} className="hover:bg-gray-50 transition">
                <td className="py-2 px-4 text-gray-700">#{b.booking_id}</td>
                <td className="py-2 px-4 text-gray-700">{getVehicleName(b)}</td>
                <td className="py-2 px-4">{getStatusBadge(b.booking_status)}</td>
                <td className="py-2 px-4 text-gray-700">Ksh {b.total_amount ?? b.rental_rate}</td>
                <td className="py-2 px-4 text-gray-700">{new Date(b.booking_date).toLocaleString()}</td>
                <td className="py-2 px-4 flex flex-col gap-2">
                  <div className="flex gap-2">
                    {['pending', 'Pending'].includes(b.booking_status) && (
                      <button className="btn btn-sm bg-blue-600 text-white rounded-md" onClick={() => setPaymentBooking(b)}>Pay</button>
                    )}
                    {b.booking_status === 'Failed' && (
                      <button className="btn btn-sm bg-green-600 text-white rounded-md" onClick={() => handleRebook(b)}>Rebook</button>
                    )}
                   {['paid', 'Paid'].includes(b.booking_status) && (
                          <button
                            className="btn btn-sm bg-red-600 text-white rounded-md"
                            onClick={() => handleCancelAndRefund(b)}   
                           
                          >
                            {isRefunding ? 'Processing...' : 'Cancel & Refund'}
                          </button>
                        )}
                    <button className="btn btn-sm border border-gray-300 text-gray-700 rounded-md" onClick={() => setSelectedBooking(b)}>View</button>
                  </div>

                  {['paid', 'Paid'].includes(b.booking_status) && (
                    <button
                      className="btn btn-sm bg-green-700 text-white mt-1 rounded-md"
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
    <div className="bg-white p-6 rounded-xl shadow-lg w-[400px]">
      <h2 className="text-xl font-semibold mb-4">Booking Details #{selectedBooking.booking_id}</h2>

      {/* Vehicle Info */}
      <p className="text-gray-700 mb-1">
        Vehicle: {selectedBooking.vehicle?.specs?.manufacturer ?? 'Unknown'} {selectedBooking.vehicle?.specs?.model ?? ''}
      </p>
      <p className="text-gray-700 mb-1">
        Transmission: {selectedBooking.vehicle?.specs?.transmission ?? 'N/A'}
      </p>

      {/* Booking Info */}
      <p className="text-gray-700 mb-1">Status: {selectedBooking.booking_status}</p>
      <p className="text-gray-700 mb-1">Total: Ksh {selectedBooking.total_amount ?? selectedBooking.rental_rate}</p>
      <p className="text-gray-700 mb-1">Date: {new Date(selectedBooking.booking_date).toLocaleString()}</p>

      {/* User Info */}
      <p className="text-gray-700 mb-1">Name: {selectedBooking.user?.first_name} {selectedBooking.user?.last_name}</p>
      <p className="text-gray-700 mb-1">Email: {selectedBooking.user?.email ?? 'N/A'}</p>
      <p className="text-gray-700 mb-1">Phone: {selectedBooking.user?.contact_phone ?? 'N/A'}</p>
      <p className="text-gray-700 mb-4">Address: {selectedBooking.user?.address ?? 'N/A'}</p>

      <button className="btn btn-sm w-full bg-gray-700 text-white rounded-md" onClick={() => setSelectedBooking(null)}>Close</button>
    </div>
  </div>
)}
    

      {/* Payment Modal */}
      {paymentBooking && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Pay for Booking #{paymentBooking.booking_id}</h2>
            <p className="mb-2 text-gray-700"><b>Vehicle:</b> {getVehicleName(paymentBooking)}</p>
            <p className="mb-4 text-gray-700"><b>Amount:</b> Ksh {paymentBooking.total_amount ?? paymentBooking.rental_rate}</p>

            <select
              className="select select-bordered w-full mb-3 rounded-md"
              value={paymentData.payment_method}
              onChange={(e) => setPaymentData({ ...paymentData, payment_method: e.target.value })}
            >
              <option value="">Select Payment Method</option>
              <option value="M-Pesa">M-Pesa</option>
              <option value="Card">Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>

            {['Card', 'M-Pesa'].includes(paymentData.payment_method) && (
              <input
                type="tel"
                className="input input-bordered w-full mb-4 rounded-md"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            )}

            {paymentData.payment_method && !['Card', 'M-Pesa'].includes(paymentData.payment_method) && (
              <input
                type="text"
                className="input input-bordered w-full mb-4 rounded-md"
                placeholder="Transaction ID"
                value={paymentData.transaction_id}
                onChange={(e) => setPaymentData({ ...paymentData, transaction_id: e.target.value })}
              />
            )}

            <div className="flex justify-end gap-2">
              <button className="btn btn-sm bg-gray-300 rounded-md" onClick={() => setPaymentBooking(null)}>Cancel</button>
              <button className="btn btn-sm bg-blue-600 text-white rounded-md" onClick={handlePayment} disabled={isPaying}>
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
