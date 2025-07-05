"use client";

import { toast } from "react-toastify";
import { FaSpinner, FaTrash } from "react-icons/fa";
import { useState } from "react";
import deleteRoom from "@/app/actions/deleteRoom";

export default function DeleteRoomButton({ roomId }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this room? This action cannot be undone."
    );

    if (confirmed) {
      setIsDeleting(true);
      try {
        await deleteRoom(roomId);
        toast.success("Room deleted successfully!");
      } catch (error) {
        console.error("Failed to delete room", error);
        toast.error("Failed to delete room");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`group relative bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 rounded-xl text-center font-medium text-sm
                 hover:from-red-700 hover:to-red-800
                 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-50
                 active:scale-[0.96] transform transition-all duration-200
                 shadow-md hover:shadow-lg
                 before:absolute before:inset-0 before:rounded-xl before:bg-white before:opacity-0
                 hover:before:opacity-10 before:transition-opacity before:duration-200
                 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-md
                 ${isDeleting ? "animate-pulse" : ""}`}
    >
      <div className="flex items-center justify-center gap-2">
        {isDeleting ? (
          <FaSpinner className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <FaTrash className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
        )}
        <span className="hidden sm:inline">
          {isDeleting ? "Deleting..." : "Delete"}
        </span>
      </div>
    </button>
  );
}
