import Cell from "../types/Cell";
import React from "react";

type CellElemProps = {
  cell: Cell;
  rowIndex: number;
  colIndex: number;
  handleColumnClick: (column: number) => void;
}

export default function CellElem({cell, rowIndex, colIndex, handleColumnClick}: CellElemProps) {
  let cellClass = 'cell';
  let pieceClass = '';

  if (cell === Cell.FirstPlayer) {
    cellClass += ' player-1';
    pieceClass = 'piece player-1';
  } else if (cell === Cell.SecondPlayer) {
    cellClass += ' player-2';
    pieceClass = 'piece player-2';
  }

  return (
    <div
      key={`${rowIndex}-${colIndex}`}
      className={cellClass}
      onClick={() => handleColumnClick(colIndex)}
    >
      {pieceClass && <div className={pieceClass}/>}
    </div>
  );
}