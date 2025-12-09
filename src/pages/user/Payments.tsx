import React, { useState } from 'react';
import {useGetAllPaymentsQuery,useDeletePaymentMutation,useUpdatePaymentMutation,} from '../../features/api/PaymentsApi';
import type { Payments } from '../../types/Types';
import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout';
import Swal from 'sweetalert2';

const UserPayments: React.FC = () => {
  const { data: payments, isLoading, isError } = useGetAllPaymentsQuery();
  const [deletePayment] = useDeletePaymentMutation();
  const [updatePayment] = useUpdatePaymentMutation();

  const [statusValue, setStatusValue] = useState<string>('');

  const handleDelete = async (payment_id: number) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This payment will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete!',
    });

    if (confirm.isConfirmed) {
      try {
        await deletePayment({ payment_id }).unwrap();
        Swal.fire('Deleted!', 'Payment deleted successfully.', 'success');
      } catch {
        Swal.fire('Error', 'Failed to delete payment', 'error');
      }
    }
  };

  const handleStatusUpdate = async (payment_id: number) => {
    if (!statusValue) {
      Swal.fire('Error', 'Please select a payment status', 'error');
      return;
    }

    try {
      await updatePayment({
        payment_id,
        payment_status: statusValue,
      }).unwrap();

      Swal.fire('Updated', 'Payment status updated successfully', 'success');
      setStatusValue('');
    } catch {
      Swal.fire('Error', 'Failed to update payment', 'error');
    }
  };

  if (isLoading) {
    return (
      <AdminDashboardLayout>
        <p>Loading payments...</p>
      </AdminDashboardLayout>
    );
  }

  if (isError) {
    return (
      <AdminDashboardLayout>
        <p className="text-red-500">No payments.</p>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">All Payments</h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">User</th>
                <th className="border p-2">Vehicle</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Method</th>
                <th className="border p-2">Transaction</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments?.map((payment:any ) => (
                <tr key={payment.payment_id}>
                  <td className="border p-2">
                    {payment.payment_id}
                  </td>

                  <td className="border p-2">
                    {payment.booking?.user
                      ? `${payment.booking.user.first_name} ${payment.booking.user.last_name}`
                      : 'N/A'}
                  </td>

                  <td className="border p-2">
                    {payment.booking?.vehicle?.specs
                      ? `${payment.booking.vehicle.specs.manufacturer} ${payment.booking.vehicle.specs.model}`
                      : 'N/A'}
                  </td>

                  <td className="border p-2">
                    Ksh {payment.amount.toLocaleString()}
                  </td>

                  <td className="border p-2">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        payment.payment_status === 'Paid'
                          ? 'bg-green-600'
                          : 'bg-yellow-500'
                      }`}
                    >
                      {payment.payment_status}
                    </span>
                  </td>

                  <td className="border p-2">
                    {payment.payment_method}
                  </td>

                  <td className="border p-2">
                    {payment.transaction_id}
                  </td>

                  <td className="border p-2">
                    {new Date(payment.payment_date).toLocaleDateString()}
                  </td>

                  <td className="border p-2 space-y-2">
                    <select
                      className="border p-1 w-full"
                      onChange={(e) => setStatusValue(e.target.value)}
                    >
                      <option value="">Change Status</option>
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                      <option value="Failed">Failed</option>
                    </select>

                    <button
                      onClick={() =>
                        handleStatusUpdate(payment.payment_id)
                      }
                      className="bg-blue-600 text-white px-3 py-1 rounded w-full"
                    >
                      Update
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(payment.payment_id)
                      }
                      className="bg-red-600 text-white px-3 py-1 rounded w-full"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {payments?.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="text-center p-4 text-gray-500"
                  >
                    No payments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default UserPayments;
