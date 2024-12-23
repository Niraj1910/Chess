import { createContext, useContext, useEffect, useState } from "react";
import { initialBoard } from "../constants";

interface ChessContextProps {
  board: string[][];
  isWhite: boolean;
  setIsWhite: React.Dispatch<React.SetStateAction<boolean>>;
  setBoard: React.Dispatch<React.SetStateAction<string[][]>>;
  selectedPiece: number[];
  setSelectedPiece: React.Dispatch<React.SetStateAction<number[]>>;
  roomNo: string;
  setRoomNo: React.Dispatch<React.SetStateAction<string>>;
}

const ChessContext = createContext<ChessContextProps>({
  board: initialBoard,
  selectedPiece: [],
  roomNo: "",
  isWhite: true,
  setIsWhite: () => {},
  setBoard: () => {},
  setSelectedPiece: () => {},
  setRoomNo: () => {},
});

export const ChessContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState<number[]>([]);
  const [roomNo, setRoomNo] = useState("");
  const [isWhite, setIsWhite] = useState(true);

  useEffect(() => {
    setBoard([...board.reverse()]);
  }, [isWhite]);

  return (
    <ChessContext.Provider
      value={{
        isWhite,
        roomNo,
        board,
        setBoard,
        setRoomNo,
        selectedPiece,
        setSelectedPiece,
        setIsWhite,
      }}
    >
      {children}
    </ChessContext.Provider>
  );
};

export const useChess = () => {
  const chessContext = useContext(ChessContext);
  if (!chessContext)
    throw new Error("useChess must be used inside the ChessContextProvider");
  return chessContext;
};
