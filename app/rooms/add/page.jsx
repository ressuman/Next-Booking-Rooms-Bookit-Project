"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Heading from "@/components/Heading";
import createRoom from "@/app/actions/createRoom";

export default function AddRoomPage() {
  const [state, formAction] = useFormState(createRoom, {});
  const router = useRouter();

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.success) {
      toast.success("Room created successfully!");
      router.push("/");
    }
  }, [state]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Heading title="Add a Room" />

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">
              Create New Room Listing
            </h2>
            <p className="text-blue-100 mt-2">
              Fill in the details below to add your room
            </p>
          </div>

          <form action={formAction} className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <div className="form-group">
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Room Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="e.g., Executive Conference Room"
                    required
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="description"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    placeholder="Describe your room features, atmosphere, and what makes it special..."
                    required
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label
                      htmlFor="sqft"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Square Feet *
                    </label>
                    <input
                      type="number"
                      id="sqft"
                      name="sqft"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="500"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label
                      htmlFor="capacity"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Capacity *
                    </label>
                    <input
                      type="number"
                      id="capacity"
                      name="capacity"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="10"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="price_per_hour"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Price Per Hour ($) *
                  </label>
                  <input
                    type="number"
                    id="price_per_hour"
                    name="price_per_hour"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="25"
                    required
                  />
                </div>
              </div>

              {/* Location & Availability */}
              <div className="space-y-6">
                <div className="form-group">
                  <label
                    htmlFor="address"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Full Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="123 Business St, City, State 12345"
                    required
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="location"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Specific Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Building A, 3rd Floor, Room 301"
                    required
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="availability"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Availability *
                  </label>
                  <input
                    type="text"
                    id="availability"
                    name="availability"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Monday - Friday, 9am - 5pm"
                    required
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="amenities"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Amenities *
                  </label>
                  <input
                    type="text"
                    id="amenities"
                    name="amenities"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="projector, whiteboard, WiFi, coffee machine"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Separate multiple amenities with commas
                  </p>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="image"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Room Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <button
                type="submit"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-8 py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Create Room Listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
