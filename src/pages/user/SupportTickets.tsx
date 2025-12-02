// components/UserTickets.tsx
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { SupportTicketApi } from "../../features/api/SupportTicketApi";
import type { RootState } from "../../store/store";
import { skipToken } from "@reduxjs/toolkit/query";


const UserTickets: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.authSlice);
  const { refetch } = SupportTicketApi.useGetUserTicketsQuery(
    isAuthenticated ? user!.user_id : skipToken
);
  const [createTicket] = SupportTicketApi.useCreateTicketMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [booking, setBooking] = useState<any | null>(null);
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");

  // Listen to the custom event
  useEffect(() => {
    const handleOpenTicketModal = (e: any) => {
      setBooking(e.detail); // booking object
      setIsOpen(true);
    };
    window.addEventListener("openTicketModal", handleOpenTicketModal);
    return () => window.removeEventListener("openTicketModal", handleOpenTicketModal);
  }, []);

  const closeModal = () => {
    setBooking(null);
    setIsOpen(false);
    setTicketSubject("");
    setTicketMessage("");
  };

  const handleCreateTicket = async () => {
    if (!ticketSubject.trim() || !ticketMessage.trim()) {
      toast.error("Subject and description are required");
      return;
    }
    try {
      await createTicket({
        user_id: user!.user_id,
        booking_id: booking!.booking_id,
        subject: ticketSubject,
        description: ticketMessage,
      }).unwrap();
      toast.success("Ticket created");
      closeModal();
      refetch();
    } catch (err) {
      toast.error("Failed to create ticket");
      console.error(err);
    }
  };

  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[480px] shadow-lg">
        <h2 className="text-lg font-bold mb-3">Submit Ticket for Booking #{booking.booking_id}</h2>
        <p className="mb-2">
          <b>Vehicle:</b> {booking.vehicle?.specs ? `${booking.vehicle.specs.manufacturer} ${booking.vehicle.specs.model}` : `Vehicle #${booking.vehicle_id}`}
        </p>

        <input
          className="input input-bordered w-full mb-3"
          placeholder="Subject"
          value={ticketSubject}
          onChange={(e) => setTicketSubject(e.target.value)}
        />
        <textarea
          className="textarea textarea-bordered w-full mb-3"
          placeholder="Describe the issue..."
          rows={5}
          value={ticketMessage}
          onChange={(e) => setTicketMessage(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button className="btn btn-sm" onClick={closeModal}>Cancel</button>
          <button className="btn btn-sm bg-green-700 text-white" onClick={handleCreateTicket}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default UserTickets;
