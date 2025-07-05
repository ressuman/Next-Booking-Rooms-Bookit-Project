"use client";

import bookRoom from "@/app/actions/bookRoom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export default function BookingForm({ room }) {
  const [state, formAction] = useFormState(bookRoom, {});

  const router = useRouter();

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.success) {
      toast.success("Room has been booked!");
      router.push("/bookings");
    }
  }, [state]);

  return (
    <div className="p-6 lg:p-8 bg-gray-50">
      <div className="mb-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Book this Room
        </h2>
        <p className="text-gray-600">
          Fill out the details below to reserve your space
        </p>
      </div>

      <form action={formAction} className="space-y-6">
        <input type="hidden" name="room_id" value={room?.$id} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="check_in_date"
              className="block text-sm font-semibold text-gray-700"
            >
              Check-In Date
            </label>
            <input
              type="date"
              id="check_in_date"
              name="check_in_date"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="check_in_time"
              className="block text-sm font-semibold text-gray-700"
            >
              Check-In Time
            </label>
            <input
              type="time"
              id="check_in_time"
              name="check_in_time"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="check_out_date"
              className="block text-sm font-semibold text-gray-700"
            >
              Check-Out Date
            </label>
            <input
              type="date"
              id="check_out_date"
              name="check_out_date"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="check_out_time"
              className="block text-sm font-semibold text-gray-700"
            >
              Check-Out Time
            </label>
            <input
              type="time"
              id="check_out_time"
              name="check_out_time"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className="w-full md:w-auto md:min-w-48 inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-semibold rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Book Room Now
          </button>
        </div>
      </form>
    </div>
  );
}
