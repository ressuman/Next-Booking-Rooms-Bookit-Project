"use client";

import { toast } from "react-toastify";
import { FaSpinner, FaTimes } from "react-icons/fa";
import { useState } from "react";
import cancelBooking from "@/app/actions/cancelBooking";

export default function CancelBookingButton({ bookingId }) {
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancelClick = async () => {
    if (
      !confirm(
        "Are you sure you want to cancel this booking? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsCancelling(true);

    try {
      const result = await cancelBooking(bookingId);

      if (result.success) {
        toast.success("Booking cancelled successfully!");
      } else {
        toast.error(result.error || "Failed to cancel booking");
      }
    } catch (error) {
      console.error("Failed to cancel booking", error);
      toast.error("Failed to cancel booking. Please try again.");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <button
      onClick={handleCancelClick}
      disabled={isCancelling}
      className={`group relative w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3.5 rounded-xl text-center font-semibold text-sm
                 hover:from-red-700 hover:to-red-800
                 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-50
                 active:scale-[0.98] transform transition-all duration-200
                 shadow-lg hover:shadow-xl
                 before:absolute before:inset-0 before:rounded-xl before:bg-white before:opacity-0
                 hover:before:opacity-10 before:transition-opacity before:duration-200
                 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg
                 ${isCancelling ? "animate-pulse" : ""}`}
    >
      <div className="flex items-center justify-center gap-2">
        {isCancelling ? (
          <FaSpinner className="w-4 h-4 animate-spin" />
        ) : (
          <FaTimes className="w-4 h-4 transition-transform group-hover:scale-110" />
        )}
        <span>{isCancelling ? "Cancelling..." : "Cancel Booking"}</span>
      </div>
    </button>
  );
}
