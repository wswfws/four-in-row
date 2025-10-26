import Cell from "../types/Cell";
import CellElem from "./Cell";

interface Props {
  board: Cell[][];
  isGameOver: boolean;
  isBotThinking: boolean;
  canMove: (colIndex: number) => boolean;
  onMove: (colIndex: number) => void;
}

export const GameBoard = ({board, isGameOver, canMove, onMove, isBotThinking}: Props) => (
  <div className={`board ${isGameOver || isBotThinking ? "board-disabled" : ""}`}>
    {Array.from({length: board[0].length}).map((_, colIndex) => (
      <div
        key={colIndex}
        className={`column ${canMove(colIndex) ? "" : "column-disabled"}`}
        onClick={() => onMove(colIndex)}
      >
        {board.map((row, rowIndex) => (
          <CellElem
            key={`${rowIndex}-${colIndex}`}
            cell={row[colIndex]}
          />
        ))}
      </div>
    ))}
  </div>
);

export default GameBoard;