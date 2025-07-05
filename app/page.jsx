import Heading from "@/components/Heading";
import RoomCard from "@/components/RoomCard";
//import rooms from "@/data/rooms.json";
import getAllRooms from "./actions/getAllRooms";
import { unstable_noStore as noStore } from "next/cache";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function HomePage() {
  noStore();

  const rooms = await getAllRooms();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Heading title="Available Rooms" />

        {rooms.length > 0 ? (
          <div className="grid gap-6 md:gap-8">
            {rooms.map((room) => (
              <RoomCard room={room} key={room.$id} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No rooms available
            </h3>
            <p className="text-gray-600">
              Check back later for new room listings
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
