"use client";

import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import updateRoom from "@/app/actions/updateRoom";
import Image from "next/image";

export default function RoomEditForm({ room }) {
  const [state, formAction] = useFormState(updateRoom, {});
  const [previewImage, setPreviewImage] = useState(null);
  const router = useRouter();

  // Handle form submission success
  useEffect(() => {
    if (state.success) {
      toast.success("Room updated successfully!");
      router.push("/rooms/my");
    }
    if (state.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  // Get current image URL
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

  const currentImageUrl = room.image
    ? `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${room.image}/view?project=${projectId}`
    : "/images/no-image.jpg";

  return (
    <form action={formAction} className="space-y-6">
      {/* Hidden room ID */}
      <input type="hidden" name="roomId" value={room.$id} />

      {/* Room Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Room Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={room.name}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="Enter room name"
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={room.description}
          required
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="Describe your room..."
        />
      </div>

      {/* Room Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="sqft"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Square Feet
          </label>
          <input
            type="number"
            id="sqft"
            name="sqft"
            defaultValue={room.sqft}
            required
            min="1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="e.g., 500"
          />
        </div>

        <div>
          <label
            htmlFor="capacity"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Capacity
          </label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            defaultValue={room.capacity}
            required
            min="1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="e.g., 10"
          />
        </div>

        <div>
          <label
            htmlFor="price_per_hour"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Price per Hour ($)
          </label>
          <input
            type="number"
            id="price_per_hour"
            name="price_per_hour"
            defaultValue={room.price_per_hour}
            required
            min="0"
            step="0.01"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="e.g., 50.00"
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            defaultValue={room.location}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="e.g., New York, NY"
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          defaultValue={room.address}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="Enter full address"
        />
      </div>

      {/* Availability */}
      <div>
        <label
          htmlFor="availability"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Availability
        </label>
        <input
          type="text"
          id="availability"
          name="availability"
          defaultValue={room.availability}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="e.g., Mon-Fri 9AM-6PM"
        />
      </div>

      {/* Amenities */}
      <div>
        <label
          htmlFor="amenities"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Amenities
        </label>
        <input
          type="text"
          id="amenities"
          name="amenities"
          defaultValue={room.amenities}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="e.g., WiFi, Projector, Whiteboard (comma-separated)"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Room Image (optional - leave empty to keep current image)
        </label>

        {/* Current Image Display */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Current Image:</p>
          <div className="relative w-32 h-24 rounded-lg overflow-hidden border">
            <Image
              src={currentImageUrl}
              alt="Current room image"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* File Input */}
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />

        {/* Preview New Image */}
        {previewImage && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">New Image Preview:</p>
            <div className="relative w-32 h-24 rounded-lg overflow-hidden border">
              <Image
                src={previewImage}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.push("/rooms/my")}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
        >
          Update Room
        </button>
      </div>
    </form>
  );
}
