import React, { useState } from "react";
import DashboardLayout from "../../dashboardDesign/DashboardLayout";
import { useSelector } from "react-redux";
import { SupportTicketApi } from "../../features/api/SupportTicketApi";
import { skipToken } from "@reduxjs/toolkit/query";
import type { RootState } from "../../store/store";

const UserSupportTickets: React.FC = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.authSlice
  );

  const {
    data: tickets,
    isLoading,
    error,
  } = SupportTicketApi.useGetUserTicketsQuery(
    isAuthenticated && user?.user_id ? user.user_id : skipToken
  );

  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">My Support Tickets</h1>

      <div className="bg-white rounded shadow p-4">
        {isLoading && <p>Loading tickets...</p>}
        {error && <p className="text-red-500">Failed to load tickets.</p>}

        {!isLoading && tickets?.length === 0 && (
          <p className="text-gray-500">No support tickets found.</p>
        )}

        {tickets && tickets.length > 0 && (
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Booking</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t: any) => (
                <tr key={t.ticket_id}>
                  <td>#{t.ticket_id}</td>
                  <td>#{t.booking_id}</td>
                  <td>{t.subject}</td>
                  <td>{t.status}</td>
                  <td>{new Date(t.created_at).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-xs btn-outline"
                      onClick={() => setSelectedTicket(t)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* VIEW MODAL */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded shadow-lg w-[450px]">
            <h2 className="font-bold mb-2">
              Ticket #{selectedTicket.ticket_id}
            </h2>

            <p><b>Booking:</b> #{selectedTicket.booking_id}</p>
            <p><b>Subject:</b> {selectedTicket.subject}</p>
            <p><b>Status:</b> {selectedTicket.status}</p>

            <div className="border p-2 rounded mt-2">
              <b>Description</b>
              <p>{selectedTicket.description}</p>
            </div>

            {selectedTicket.admin_reply && (
              <div className="border p-2 rounded mt-2 bg-green-50">
                <b>Admin Reply</b>
                <p>{selectedTicket.admin_reply}</p>
              </div>
            )}

            <button
              className="btn btn-sm w-full mt-3"
              onClick={() => setSelectedTicket(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default UserSupportTickets;
