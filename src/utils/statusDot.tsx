import React from "react";

export const StatusDot: React.FC<{ booking: any }> = ({ booking }) => {
  let color = "bg-red-500";
  let label = "Inactive";

  if (booking.booking_status === "confirmed" || booking.booking_status === "paid") {
    color = "bg-green-500";
    label = "Active";
  } else if (booking.booking_status === "pending") {
    color = "bg-yellow-500";
    label = "Not Active";
  }

  return (
    <div className="flex items-center gap-2">
      <span className={`w-3 h-3 rounded-full ${color}`}></span>
      <span>{label}</span>
    </div>
  );
};
