import React from "react";
import { useChess } from "../context/ChessContext";

interface ChessSquareProps {
  piece: string;
  isDark: boolean;
  showDot: boolean;
  position: { x: number; y: number };
  handlePieceClicked: (
    piece: string,
    position: { x: number; y: number }
  ) => void;
  handleMovePiece: (position: { x: number; y: number }) => void;
}

const ChessSquare: React.FC<ChessSquareProps> = ({
  piece,
  isDark,
  position,
  showDot,
  handlePieceClicked,
  handleMovePiece,
}) => {
  const piecePath = piece ? `/chess-pieces/${piece}.svg` : null;
  const { isWhite } = useChess();

  return (
    <div
      onClick={() => {
        piece && isWhite
          ? piece.includes("w") && handlePieceClicked(piece, position)
          : piece.includes("b") && handlePieceClicked(piece, position);

        showDot && handleMovePiece(position);
      }}
      className={`flex justify-center items-center w-full h-full ${
        isDark ? "bg-green-400" : "bg-white"
      } `}
    >
      {piecePath ? (
        <div className="relative w-8 h-8">
          {showDot && (
            <div className="absolute inset-0 bg-gray-600 opacity-45 rounded-full" />
          )}
          <img src={piecePath} alt={piece} className="w-8 h-8 relative z-10" />
        </div>
      ) : (
        <div className="w-8 h-8 rounded-full flex items-center justify-center relative">
          {showDot && (
            <div className="absolute inset-0 bg-gray-600 opacity-45 rounded-full" />
          )}
          <span className="w-6 h-6 block rounded-full relative z-10" />
        </div>
      )}
    </div>
  );
};

export default ChessSquare;
