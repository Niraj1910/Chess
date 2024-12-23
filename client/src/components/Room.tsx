import { useEffect, useState } from "react";
import { socket } from "../socket";
import { useChess } from "../context/ChessContext";

const Room = () => {
  const [room, setRoom] = useState({ createRoom: "", joinRoom: "", error: "" });
  const { setRoomNo, setIsWhite, isWhite } = useChess();

  const handleCreateRoom = () => {
    if (!room.createRoom.trim().length) alert("Enter create room no.");
    socket.emit("create-room", room.createRoom);
    setRoomNo(room.createRoom);
  };

  const handleJoinRoom = () => {
    if (!room.joinRoom.trim().length) alert("Enter join room no.");
    socket.emit("join-room", room.joinRoom);
    setRoomNo(room.joinRoom);
    setIsWhite(!isWhite);
  };

  useEffect(() => {
    socket.on("error", (errorMessage) => {
      setRoom({ ...room, error: errorMessage });
    });

    return () => {
      socket.off("error");
    };
  }, []);

  return (
    <div className=" w-full items-center mt-20 flex flex-col gap-8">
      <div className="flex gap-4">
        <button
          onClick={handleCreateRoom}
          className="hover:text-[24px] bg-green-400 p-2 text-xl text-white rounded-lg w-40 font-semibold"
        >
          Create room
        </button>
        <input
          onChange={(e) => setRoom({ ...room, createRoom: e.target.value })}
          placeholder="Enter room no."
          type="text"
          className="px-2 w-40 text-center rounded-xl text-black focus-within:border-green-400 focus-within:border-2 outline-none"
        />
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleJoinRoom}
          className="hover:text-[24px] bg-white p-2 text-xl text-green-400 rounded-lg w-40 font-semibold"
        >
          Join room
        </button>
        <input
          onChange={(e) => setRoom({ ...room, joinRoom: e.target.value })}
          placeholder="Enter room no."
          type="text"
          className="px-2 w-40 text-center rounded-xl text-white  bg-green-400 focus-within:border-white focus-within:border-2 outline-none"
        />
      </div>
      {room.error.length ? <p>{room.error}</p> : null}
    </div>
  );
};

export default Room;
