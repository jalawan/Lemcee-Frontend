import React, { useState } from "react";
import DashboardLayout from "../../dashboardDesign/DashboardLayout";
import { SupportTicketApi } from "../../features/api/SupportTicketApi";
import { toast } from "sonner";

const AdminSupportTickets: React.FC = () => {
  const { data: tickets, isLoading, refetch } =
    SupportTicketApi.useGetAllTicketsQuery();

  const [updateTicket] = SupportTicketApi.useUpdateTicketMutation();
  const [deleteTicket] = SupportTicketApi.useDeleteTicketMutation();

  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleUpdate = async () => {
    if (!selectedTicket) return;

    try {
      await updateTicket({
        ticket_id: selectedTicket.ticket_id,
        subject: selectedTicket.subject,
        description: selectedTicket.description,
        status,
        admin_reply: reply,
      }).unwrap();

      toast.success("Ticket updated");
      setSelectedTicket(null);
      refetch();
    } catch (err) {
      toast.error("Failed to update ticket");
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this ticket?")) return;

    try {
      await deleteTicket(id).unwrap();
      toast.success("Ticket deleted");
      refetch();
    } catch {
      toast.error("Delete failed");
    }
  };

  const getStatusColor = (status: string) => {
    const map: Record<string, string> = {
      Open: "bg-yellow-200 text-yellow-800",
      Pending: "bg-blue-200 text-blue-800",
      Resolved: "bg-green-200 text-green-800",
      Closed: "bg-gray-200 text-gray-800",
    };
    return map[status] ?? "bg-gray-200";
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">All Support Tickets</h1>

      <div className="bg-white shadow rounded p-4 overflow-x-auto">
        {isLoading ? (
          <p>Loading tickets...</p>
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Vehicle</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {tickets?.map((t: any) => (
                <tr key={t.ticket_id}>
                  <td>#{t.ticket_id}</td>

                  {/* ✅ USER NAME FIXED */}
                  <td>
                    {t.user_id?.first_name} {t.user_id?.last_name}
                  </td>

                  <td>{t.user_id?.email}</td>

                  {/* ✅ VEHICLE SAFE DISPLAY */}
                  <td>
                    {t.booking_id?.vehicle_id
                      ? `${t.booking_id.vehicle_id.manufacturer} ${t.booking_id.vehicle_id.model}`
                      : "No Vehicle"}
                  </td>

                  <td>{t.subject}</td>

                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs ${getStatusColor(
                        t.status
                      )}`}
                    >
                      {t.status}
                    </span>
                  </td>

                  <td>{new Date(t.created_at).toLocaleString()}</td>

                  <td className="flex gap-2">
                    <button
                      className="btn btn-xs btn-outline"
                      onClick={() => {
                        setSelectedTicket(t);
                        setReply(t.admin_reply || "");
                        setStatus(t.status);
                      }}
                    >
                      View
                    </button>

                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDelete(t.ticket_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ✅ VIEW & REPLY MODAL */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded shadow-lg w-[500px]">
            <h2 className="font-bold mb-2">
              Ticket #{selectedTicket.ticket_id}
            </h2>

            {/* ✅ USER FIXED */}
            <p>
              <b>User:</b>{" "}
              {selectedTicket.user_id?.first_name}{" "}
              {selectedTicket.user_id?.last_name}
            </p>

            <p>
              <b>Email:</b> {selectedTicket.user_id?.email}
            </p>

            {/* ✅ VEHICLE FIXED */}
            <p>
              <b>Vehicle:</b>{" "}
              {selectedTicket.booking_id?.vehicle_id
                ? `${selectedTicket.booking_id.vehicle_id.manufacturer} ${selectedTicket.booking_id.vehicle_id.model}`
                : "No Vehicle Assigned"}
            </p>

            <p>
              <b>Subject:</b> {selectedTicket.subject}
            </p>

            <div className="border p-2 mt-2 rounded bg-gray-50">
              <b>Description</b>
              <p className="text-sm">{selectedTicket.description}</p>
            </div>

            <select
              className="select select-bordered w-full mt-3"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Pending</option>
              <option>Open</option>
              <option>Resolved</option>
              <option>Closed</option>
            </select>

            <textarea
              className="textarea textarea-bordered w-full mt-3"
              rows={4}
              placeholder="Admin reply..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />

            <div className="flex justify-end gap-2 mt-3">
              <button
                className="btn btn-sm"
                onClick={() => setSelectedTicket(null)}
              >
                Close
              </button>

              <button
                className="btn btn-sm bg-green-700 text-white"
                onClick={handleUpdate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminSupportTickets;
