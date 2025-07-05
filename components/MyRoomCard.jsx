import Link from "next/link";
import {
  FaEye,
  FaMapMarkerAlt,
  FaUsers,
  FaDollarSign,
  FaRulerCombined,
  FaEdit,
} from "react-icons/fa";
import DeleteRoomButton from "./DeleteRoomButton";
import Image from "next/image";

export default function MyRoomCard({ room }) {
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

  const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${room.image}/view?project=${projectId}`;

  const imageSrc = room.image ? imageUrl : "/images/no-image.jpg";

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      {/* Room Image Placeholder */}
      <div className="h-48 relative overflow-hidden">
        <Image
          src={imageSrc}
          alt={room.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Room Details */}
      <div className="p-6">
        <div className="mb-4">
          <h4 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
            {room.name}
          </h4>
          <p className="text-gray-600 text-sm line-clamp-2">
            {room.description}
          </p>
        </div>

        {/* Room Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <FaUsers className="w-4 h-4 mr-2 text-blue-500" />
            <span>{room.capacity} people</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaRulerCombined className="w-4 h-4 mr-2 text-blue-500" />
            <span>{room.sqft} sq ft</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaDollarSign className="w-4 h-4 mr-2 text-green-500" />
            <span>${room.price_per_hour}/hr</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaMapMarkerAlt className="w-4 h-4 mr-2 text-red-500" />
            <span className="truncate">{room.location}</span>
          </div>
        </div>

        {/* Amenities */}
        {room.amenities && (
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-500 mb-2">
              AMENITIES
            </p>
            <div className="flex flex-wrap gap-1">
              {room.amenities
                .split(",")
                .slice(0, 3)
                .map((amenity, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                  >
                    {amenity.trim()}
                  </span>
                ))}
              {room.amenities.split(",").length > 3 && (
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                  +{room.amenities.split(",").length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Improved Action Buttons */}
        <div className="flex flex-col gap-3">
          {/* Primary Action - View Details */}
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
              <span>View Details</span>
            </div>
          </Link>

          {/* Secondary Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              href={`/rooms/edit/${room.$id}`}
              className="group relative bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-4 py-3 rounded-xl text-center font-medium text-sm
                     hover:from-emerald-700 hover:to-emerald-800
                     focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-opacity-50
                     active:scale-[0.96] transform transition-all duration-200
                     shadow-md hover:shadow-lg
                     before:absolute before:inset-0 before:rounded-xl before:bg-white before:opacity-0
                     hover:before:opacity-10 before:transition-opacity before:duration-200"
            >
              <div className="flex items-center justify-center gap-2">
                <FaEdit className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                <span className="hidden sm:inline">Edit</span>
              </div>
            </Link>

            <DeleteRoomButton roomId={room.$id} />
          </div>
        </div>
      </div>
    </div>
  );
}
