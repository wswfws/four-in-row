import React, {useCallback, useEffect, useState} from 'react';
import Player from '../types/Player';
import PoleSize from '../types/PoleSize';
import Game from "../logic/Game";
import Cell from "../types/Cell";
import "./ConnectFour.css"

//TODO DELETE
const GAME_CONFIG: PoleSize = {
  height: 6,
  width: 7
};

const ConnectFourGame: React.FC = () => {
  const [game, setGame] = useState<Game | null>(null);
  const [drawBoard, setDrawBoard] = useState<Cell[][] | null>(null);

  useEffect(() => {
    const newGame = new Game(GAME_CONFIG);
    setGame(newGame);
    setDrawBoard(newGame.toArray());
  }, []);


  const handleColumnClick = useCallback((columnIndex: number) => {
    if (!game) return;

    try {
      game.move(columnIndex);
      setDrawBoard(game.toArray());
    } catch (error) {
      console.log('Невозможно сделать ход в эту колонку');
    }
  }, [game]);

  const handleUndo = useCallback(() => {
    if (!game) return;

    try {
      game.undo();
      setDrawBoard(game.toArray());
    } catch (error) {
      console.log('Невозможно отменить ход');
    }
  }, [game]);

  const renderCell = (cell: Cell, rowIndex: number, colIndex: number) => {
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
  };

  if (!game || !drawBoard || drawBoard.length === 0) {
    return <div>Загрузка игры...</div>;
  }

  return (
    <div className="connect-four">
      <div className="game-info">
        <div className={`current-player player-${game.getCurrentPlayer() === Player.firstPlayer ? '1' : '2'}`}>
          Текущий игрок: {game.getCurrentPlayer() === Player.firstPlayer ? 'Жёлтый' : 'Красный'}
        </div>
      </div>

      <div className="board">
        {drawBoard.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))}
          </div>
        ))}
      </div>

      <button
        className="undo-button"
        onClick={handleUndo}
      >
        Отменить ход
      </button>
    </div>
  );
};

export default ConnectFourGame;