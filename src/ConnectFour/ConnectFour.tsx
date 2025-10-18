import React, {useCallback, useState} from 'react';
import Player from '../types/Player';
import PoleSize from '../types/PoleSize';
import Game from "../logic/Game";
import "./ConnectFour.css"
import CellElem from "./Cell";

const GAME_CONFIG: PoleSize = {height: 4, width: 4};

interface GameHistory {
  games: Game[];
  currentIndex: number;
}

const ConnectFourGame: React.FC = () => {
  const [gameHistory, setGameHistory] = useState<GameHistory>({
    games: [new Game(GAME_CONFIG)],
    currentIndex: 0
  });

  const currentGame = gameHistory.games[gameHistory.currentIndex];
  const board = currentGame.toArray();
  const currentPlayer = currentGame.getCurrentPlayer();
  const isPlayer1 = currentPlayer === Player.firstPlayer;
  const winner = currentGame.getWinner()?.at(0) as Player | null;
  const isDraw = currentGame.isDraw();

  const canUndo = gameHistory.currentIndex > 0;
  const canRedo = gameHistory.currentIndex < gameHistory.games.length - 1;

  const handleColumnClick = useCallback((columnIndex: number) => {
    if (!winner && currentGame.canMove(columnIndex)) {
      const [_, nextGame] = currentGame.move(columnIndex);
      setGameHistory(prev => ({
        games: [...prev.games.slice(0, prev.currentIndex + 1), nextGame],
        currentIndex: prev.currentIndex + 1
      }));
    }
  }, [winner, currentGame]);

  const handleUndo = useCallback(() => {
    if (canUndo) {
      setGameHistory(prev => ({
        ...prev,
        currentIndex: prev.currentIndex - 1
      }));
    }
  }, [canUndo]);

  const handleRedo = useCallback(() => {
    if (canRedo) {
      setGameHistory(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1
      }));
    }
  }, [canRedo]);

  const handleRestart = useCallback(() => {
    setGameHistory({
      games: [new Game(GAME_CONFIG)],
      currentIndex: 0
    });
  }, []);

  return (
    <div className="connect-four">
      <div className="game-info">
        {winner ? (
          <div className={`winner player-${winner === Player.firstPlayer ? '1' : '2'}`}>
            Победил: {winner === Player.firstPlayer ? 'Жёлтый' : 'Красный'}!
          </div>
        ) : isDraw ? (
          <div className="draw">
            Ничья!
          </div>
        ) : (
          <div className={`current-player player-${isPlayer1 ? '1' : '2'}`}>
            Текущий игрок: {isPlayer1 ? 'Жёлтый' : 'Красный'}
          </div>
        )}
      </div>

      <div className={`board ${isDraw || winner ? "board-disable" : ""}`}>
        {Array.from({length: board[0].length}).map((_, colIndex) => (
          <div
            key={colIndex}
            className="column"
            onClick={() => handleColumnClick(colIndex)}
          >
            {board.map((row, rowIndex) => (
              <CellElem key={`${rowIndex}-${colIndex}`} cell={row[colIndex]}/>
            ))}
          </div>
        ))}
      </div>

      <div className="action-buttons">
        <button
          className="undo-button"
          onClick={handleUndo}
          disabled={!canUndo}
        >
          Отменить ход
        </button>
        <button
          className="redo-button"
          onClick={handleRedo}
          disabled={!canRedo}
        >
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