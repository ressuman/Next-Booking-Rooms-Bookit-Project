import RoomCard from "@/components/RoomCard";
import rooms from "@/data/rooms.json";

export default function Home() {
  //const rooms = await getAllRooms();

  return (
    <>
      {rooms.length > 0 ? (
        rooms.map((room) => <RoomCard room={room} key={room.$id} />)
      ) : (
        <p>No rooms available at the moment</p>
      )}
    </>
  );
}
