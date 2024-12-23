import ChessSquare from "./ChessSquare";
import { useChess } from "../context/ChessContext";
import { useEffect, useState } from "react";
import { socket } from "../socket";

const ChessBoard = () => {
  const { board, roomNo, isWhite, setBoard } = useChess();
  const [awaitingPlayer, setAwaitingPlayer] = useState(
    "...waiting for a friend"
  );
  const [possiblePaths, setpossiblePaths] = useState<number[][]>([]);
  const [moveFrom, setMoveFrom] = useState({
    x: 0,
    y: 0,
    piece: "",
  });

  const handlePieceClicked = (
    piece: string,
    position: { x: number; y: number }
  ) => {
    console.log("piece -> ", piece);
    console.log("position -> ", position);

    setMoveFrom({
      x: position.x,
      y: position.y,
      piece: piece,
    });

    if (piece.includes("pawn")) {
      if (position.y === 0) {
        // change pawn to queen, bishop, knight, rook
      } else {
        const path = [];
        if (!board[position.x][position.y - 1].includes(isWhite ? "b" : "w")) {
          path.push([position.x, position.y - 1]);
        }
        // left diagonal
        if (
          position.x > 0 &&
          board[position.x - 1][position.y - 1].includes(isWhite ? "b" : "w")
        ) {
          path.push([position.x - 1, position.y - 1]);
        }
        // right diagonal
        if (
          position.x < 7 &&
          board[position.x + 1][position.y - 1].includes(isWhite ? "b" : "w")
        ) {
          path.push([position.x + 1, position.y - 1]);
        }
        console.log("path -> ", path);
        setpossiblePaths(path);
      }
    }
  };

  const handleMovePiece = (position: { x: number; y: number }) => {
    const updatedBoarad = board.map((row) => [...row]);

    console.log(
      "from -> {",
      moveFrom.x,
      " ",
      moveFrom.y,
      "} to -> {",
      position.x,
      " ",
      position.y,
      "}"
    );

    console.log("piece -> ", moveFrom.piece);

    updatedBoarad[moveFrom.y][moveFrom.x] = "";
    updatedBoarad[position.y][position.x] = moveFrom.piece;

    console.log("updatedBoarad -> ", updatedBoarad);

    setBoard(updatedBoarad);
    setpossiblePaths([]);
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`socket connected -> ${socket.id}`);
    });

    socket.on("new-user", (message) => {
      console.log("new user -> ", message);
      setAwaitingPlayer(message);

      socket.emit("challenger", [roomNo, socket.id]);
    });

    socket.on("opponentId", (message) => {
      console.log("opponentId -> ", message);
      setAwaitingPlayer(message);
    });

    socket.on("disconnect", () => {
      console.log(`socket disconnected -> ${socket.id}`);
    });

    return () => {
      socket.off("new-user");
    };
  }, []);

  return (
    <>
      <p className="my-10 text-2xl">{awaitingPlayer}</p>
      <div className="grid grid-cols-8 gap-0 w-[600px] h-[600px] border-2 border-black ">
        {board.map((row, y) =>
          row.map((piece, x) => (
            <ChessSquare
              key={`${x}-${y}`}
              position={{ x, y }}
              handlePieceClicked={handlePieceClicked}
              showDot={possiblePaths.some(([px, py]) => px === x && py === y)}
              handleMovePiece={handleMovePiece}
              piece={piece}
              isDark={(x + y) % 2 === 1}
            />
          ))
        )}
      </div>
    </>
  );
};

export default ChessBoard;
