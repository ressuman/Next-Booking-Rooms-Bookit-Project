import Link from "next/link";
import Image from "next/image";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaDollarSign,
  FaEye,
} from "react-icons/fa";
import CancelBookingButton from "./CancelBookingButton";

export default function BookedRoomCard({ booking }) {
  const { room_id: room } = booking;

  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

  const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${room.image}/view?project=${projectId}`;
  const imageSrc = room.image ? imageUrl : "/images/no-image.jpg";

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "UTC",
    };

    return date.toLocaleString("en-US", options);
  };

  const formatDateShort = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    });
  };

  // Calculate booking status
  const now = new Date();
  const checkIn = new Date(booking.check_in);
  const checkOut = new Date(booking.check_out);

  let status = "upcoming";
  let statusColor = "bg-blue-100 text-blue-800";
  let statusText = "Upcoming";

  if (now >= checkIn && now <= checkOut) {
    status = "active";
    statusColor = "bg-green-100 text-green-800";
    statusText = "Active";
  } else if (now > checkOut) {
    status = "completed";
    statusColor = "bg-gray-100 text-gray-800";
    statusText = "Completed";
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      {/* Room Image */}
      <div className="h-48 relative overflow-hidden">
        <Image
          src={imageSrc}
          alt={room.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}
          >
            {statusText}
          </span>
        </div>

        {/* Room Title Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white text-xl font-bold mb-1 line-clamp-1">
            {room.name}
          </h3>
          <div className="flex items-center text-white/90 text-sm">
            <FaMapMarkerAlt className="w-3 h-3 mr-1" />
            <span className="truncate">{room.location}</span>
          </div>
        </div>
      </div>

      {/* Booking Details */}
      <div className="p-6">
        {/* Room Quick Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <FaUsers className="w-4 h-4 mr-2 text-blue-500" />
            <span>{room.capacity} people</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaDollarSign className="w-4 h-4 mr-2 text-green-500" />
            <span>${room.price_per_hour}/hr</span>
          </div>
        </div>

        {/* Booking Time Details */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Check In */}
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 rounded-full p-2">
                <FaCalendarAlt className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">
                  CHECK IN
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {formatDateShort(booking.check_in)}
                </p>
                <p className="text-xs text-gray-600 flex items-center">
                  <FaClock className="w-3 h-3 mr-1" />
                  {formatTime(booking.check_in)}
                </p>
              </div>
            </div>

            {/* Check Out */}
            <div className="flex items-start space-x-3">
              <div className="bg-red-100 rounded-full p-2">
                <FaCalendarAlt className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">
                  CHECK OUT
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {formatDateShort(booking.check_out)}
                </p>
                <p className="text-xs text-gray-600 flex items-center">
                  <FaClock className="w-3 h-3 mr-1" />
                  {formatTime(booking.check_out)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          {/* Primary Action - View Room */}
          <Link
            href={`/rooms/${room.$id}`}
            className="group relative w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3.5 rounded-xl text-center font-semibold text-sm
               hover:from-blue-700 hover:to-blue-800
               focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50
               active:scale-[0.98] transform transition-all duration-200
               shadow-lg hover:shadow-xl
               before:absolute before:inset-0 before:rounded-xl before:bg-white before:opacity-0
               hover:before:opacity-10 before:transition-opacity before:duration-200"
          >
            <div className="flex items-center justify-center gap-2">
              <FaEye className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>View Room Details</span>
            </div>
          </Link>

          {/* Cancel Button - Only show for upcoming bookings */}
          {status === "upcoming" && (
            <CancelBookingButton bookingId={booking.$id} />
          )}
        </div>
      </div>
    </div>
  );
}
