import BookedRoomCard from "@/components/BookedRoomCard";
import Heading from "@/components/Heading";

export default async function BookingsPage() {
  //const bookings = await getMyBookings();

  return (
    <>
      <Heading title="My Bookings" />
      {/* {bookings.length === 0 ? (
        <p className="text-gray-600 mt-4">You have no bookings</p>
      ) : (
        bookings.map((booking) => (
          <BookedRoomCard
          key={booking.$id}
          booking={booking}
          />
        ))
      )} */}
    </>
  );
}
