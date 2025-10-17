import React, {useCallback, useState} from 'react';
import Player from '../types/Player';
import PoleSize from '../types/PoleSize';
import Game from "../logic/Game";
import "./ConnectFour.css"
import CellElem from "./Cell";

//TODO DELETE
const GAME_CONFIG: PoleSize = {height: 6, width: 7};

const ConnectFourGame: React.FC = () => {
  const [game, setGame] = useState<Game>(new Game(GAME_CONFIG));

  const board = game.toArray();
  const currentPlayer = game.getCurrentPlayer();
  const isPlayer1 = currentPlayer === Player.firstPlayer;
  const winner = game.getWinner();

  const handleColumnClick = useCallback((columnIndex: number) => {
    if (!winner) {
      setGame(g =>g.move(columnIndex));
    }
  }, [winner]);

  const handleUndo = () => setGame(g => g); //todo
  const handleRedo = () => setGame(g => g);//todo
  const handleRestart = () => setGame(g => g);//todo

  return (
    <div className="connect-four">
      <div className="game-info">
        {winner ? (
          <div className={`winner player-${winner === Player.firstPlayer ? '1' : '2'}`}>
            Победил: {winner === Player.firstPlayer ? 'Жёлтый' : 'Красный'}!
          </div>
        ) : (
          <div className={`current-player player-${isPlayer1 ? '1' : '2'}`}>
            Текущий игрок: {isPlayer1 ? 'Жёлтый' : 'Красный'}
          </div>
        )}
      </div>

      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <CellElem
                key={`${rowIndex}-${colIndex}`}
                cell={cell}
                rowIndex={rowIndex}
                colIndex={colIndex}
                handleColumnClick={handleColumnClick}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="action-buttons">
        <button className="undo-button" onClick={handleUndo}>
          Отменить ход
        </button>
        <button className="redo-button" onClick={handleRedo}>
          Возобновить ход
        </button>
        <button className="restart-button" onClick={handleRestart}>
          Новая игра
        </button>
      </div>
    </div>
  );
};

export default ConnectFourGame;