import Cell from "../types/Cell";
import React from "react";

interface Props {
  cell: Cell;
}

export default function CellElem({cell}: Props) {
  const getCellClass = () => {
    let cellClass = 'cell';
    if (cell === Cell.FirstPlayer) {
      cellClass += ' player-1';
    } else if (cell === Cell.SecondPlayer) {
      cellClass += ' player-2';
    }
    return cellClass;
  };

  const getPieceClass = () => {
    if (cell === Cell.FirstPlayer) return 'piece player-1';
    if (cell === Cell.SecondPlayer) return 'piece player-2';
    return '';
  };

  return (
    <div className={getCellClass()}>
      {getPieceClass() && <div className={getPieceClass()}/>}
    </div>
  );
};