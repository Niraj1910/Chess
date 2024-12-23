import { useEffect } from "react";
import ChessBoard from "./components/ChessBoard";
import Navbar from "./components/Navbar";
import Room from "./components/Room";
import { socket } from "./socket";
import { useChess } from "./context/ChessContext";

const App = () => {
  const { roomNo } = useChess();

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-start items-center min-h-screen bg-gray-200">
        {!roomNo.length ? <Room /> : <ChessBoard />}
      </div>
    </>
  );
};

export default App;
