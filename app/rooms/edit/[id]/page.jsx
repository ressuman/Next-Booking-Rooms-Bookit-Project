import getSingleRoom from "@/app/actions/getSingleRoom";
import RoomEditForm from "@/components/RoomEditForm";
import Heading from "@/components/Heading";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default async function EditRoomPage({ params }) {
  const room = await getSingleRoom(params.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/rooms/my"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors duration-200"
          >
            <FaArrowLeft className="mr-2" />
            Back to My Rooms
          </Link>
          <Heading title={`Edit Room: ${room.name}`} />
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <RoomEditForm room={room} />
        </div>
      </div>
    </div>
  );
}
