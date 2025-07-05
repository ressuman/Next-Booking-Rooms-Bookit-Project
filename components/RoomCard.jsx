import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function RoomCard({ room }) {
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

  const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${room.image}/view?project=${projectId}`;

  const imageSrc = room.image ? imageUrl : "/images/no-image.jpg";

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="lg:w-80 lg:flex-shrink-0">
          <div className="relative h-64 lg:h-full">
            <Image
              src={imageSrc}
              alt={room.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 320px"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-gray-900">
              ${room.price_per_hour}/hr
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 lg:p-8">
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                {room.name}
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-gray-600 text-sm lg:text-base">
                    {room.address}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-gray-600 text-sm lg:text-base">
                    {room.availability}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-blue-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                  <span className="text-lg font-semibold text-gray-900">
                    ${room.price_per_hour}
                    <span className="text-sm font-normal text-gray-600">
                      /hour
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4 border-t border-gray-100">
              <Link
                href={`/rooms/${room.$id}`}
                className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                View Room Details
                <svg
                  className="ml-2 -mr-1 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
