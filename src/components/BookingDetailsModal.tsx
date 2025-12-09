import React from "react";
import { jsPDF } from "jspdf";

interface Props {
  booking: any;
  user: any;
  vehicle: any;
  onClose: () => void;
  onBanUser?: () => Promise<any>;
  onUnbanUser?: () => Promise<any>;
}

const BookingDetailsModal: React.FC<Props> = ({
  booking,
  user,
  vehicle,
  onClose,
  onBanUser,
  onUnbanUser,
}) => {

  const specs = vehicle?.specs;

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Booking Details", 10, 20);
    doc.setFontSize(12);

    // Booking Info
    doc.text(`Booking ID: ${booking.booking_id}`, 10, 40);
    doc.text(`Status: ${booking.booking_status ?? 'N/A'}`, 10, 50);
    doc.text(`Total Amount: Ksh ${booking.total_amount ?? 0}`, 10, 60);

    // User Info
    doc.text("User Info:", 10, 80);
    doc.text(`Name: ${user?.first_name ?? 'Unknown'} ${user?.last_name ?? ''}`, 10, 90);
    doc.text(`Email: ${user?.email ?? 'N/A'}`, 10, 100);
    doc.text(`Phone: ${user?.contact_phone ?? 'N/A'}`, 10, 110);
    doc.text(`Address: ${user?.address ?? 'N/A'}`, 10, 120);

    // Vehicle Info
    doc.text("Vehicle Info:", 10, 140);
    doc.text(
      `Model: ${specs?.manufacturer ?? 'Unknown'} ${specs?.model ?? ''}`,
      10,
      150
    );
    doc.text(`Transmission: ${specs?.transmission ?? 'N/A'}`, 10, 160);
    doc.text(`Fuel Type: ${specs?.fuel_type ?? 'N/A'}`, 10, 170);
    doc.text(`Rental Rate: Ksh ${vehicle?.rental_rate ?? 0}`, 10, 180);

    doc.save(`Booking-${booking.booking_id}.pdf`);
  };

  const isBanned = user?.user_type === "banned";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-lg w-[500px] shadow-lg">
        <h2 className="text-lg font-bold mb-4">
          Booking #{booking.booking_id}
        </h2>

        <p><b>Status:</b> {booking.booking_status ?? 'N/A'}</p>
        <p><b>Total Amount:</b> Ksh {booking.total_amount ?? 0}</p>

        <h3 className="mt-4 font-semibold">User Info</h3>
        <p>{user?.first_name ?? 'Unknown'} {user?.last_name ?? ''}</p>
        <p>{user?.email ?? 'N/A'}</p>
        <p>{user?.contact_phone ?? 'N/A'}</p>
        <p>{user?.address ?? 'N/A'}</p>

        <h3 className="mt-4 font-semibold">Vehicle Info</h3>
        <p>{specs?.manufacturer ?? 'Unknown'} {specs?.model ?? ''}</p>
        <p>{specs?.transmission ?? 'N/A'} | {specs?.fuel_type ?? 'N/A'}</p>
        <p>Rental Rate: Ksh {vehicle?.rental_rate ?? 0}</p>

        <div className="mt-6 flex justify-end gap-2">
          <button className="btn btn-outline" onClick={onClose}>
            Close
          </button>

          <button className="btn btn-primary" onClick={handleDownloadPDF}>
            Download PDF
          </button>

          {onBanUser && !isBanned && (
            <button className="btn btn-error" onClick={onBanUser}>
              Ban User
            </button>
          )}

          {onUnbanUser && isBanned && (
            <button className="btn btn-success" onClick={onUnbanUser}>
              Unban User
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
