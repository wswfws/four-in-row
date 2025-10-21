import React, {useCallback, useState} from 'react';
import Player from '../types/Player';
import Game from "../logic/Game";
import "./ConnectFour.css"
import CellElem from "./Cell";
import GetNextMove from "../logic/Bot";
import {GAME_CONFIG} from "../config";

interface GameHistory {
  games: Game[];
  currentIndex: number;
}

const ConnectFourGame: React.FC = () => {
  const [gameHistory, setGameHistory] = useState<GameHistory>({
    games: [new Game(GAME_CONFIG)],
    currentIndex: 0
  });
  const [mode, setMode] = useState<"bot" | "player">();

  const currentGame = gameHistory.games[gameHistory.currentIndex];
  const board = currentGame.toArray();
  const currentPlayer = currentGame.getCurrentPlayer();
  const isPlayer1 = currentPlayer === Player.firstPlayer;
  const winner = currentGame.getWinner()?.at(0) as Player | null;
  const isDraw = currentGame.isDraw();

  const canUndo = gameHistory.currentIndex > 0;
  const canRedo = gameHistory.currentIndex < gameHistory.games.length - 1;

  const handleColumnClick = (columnIndex: number) => {
    if (!winner && currentGame.canMove(columnIndex)) {
      const [, nextGame] = currentGame.move(columnIndex);
      if (mode === "bot" && !nextGame.isDraw() && !nextGame.getWinner()) {
        const [, botNextGame] = nextGame.move(GetNextMove(nextGame)[0][0]);
        setGameHistory(prev => ({
          games: [...prev.games.slice(0, prev.currentIndex + 1), nextGame, botNextGame],
          currentIndex: prev.currentIndex + 2
        }));
      } else {
        setGameHistory(prev => ({
          games: [...prev.games.slice(0, prev.currentIndex + 1), nextGame],
          currentIndex: prev.currentIndex + 1
        }));
      }
    }
  };

  const handleUndo = useCallback(() => {
    if (canUndo) {
      setGameHistory(prev => ({
        ...prev,
        currentIndex: prev.currentIndex - (mode === "bot" ? 2 : 1)
      }));
    }
  }, [mode, canUndo]);

  const handleRedo = useCallback(() => {
    if (canRedo) {
      setGameHistory(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + (mode === "bot" ? 2 : 1)
      }));
    }
  }, [mode, canRedo]);

  const handleRestart = useCallback(() => {
    setGameHistory({
      games: [new Game(GAME_CONFIG)],
      currentIndex: 0
    });
  }, []);

  if (!mode) {
    return <div className="connect-four" style={{height: "90vh", paddingTop: "20vh"}}>
      <div className="action-buttons">
        <button className="action-button green-button" onClick={() => setMode("player")}>2 человека</button>
        <button className="action-button red-button" onClick={() => setMode("bot")}>против бота</button>
      </div>
    </div>
  }

  return (
    <div className="connect-four">
      <div className="game-info">
        {winner ? (
          <div className={`status-message winner player-${winner === Player.firstPlayer ? '1' : '2'}`}>
            Победил: {winner === Player.firstPlayer ? 'Жёлтый' : 'Красный'}!
          </div>
        ) : isDraw ? (
          <div className="status-message draw">
            Ничья!
          </div>
        ) : (
          <div className={`status-message current-player player-${isPlayer1 ? '1' : '2'}`}>
            Текущий игрок: {isPlayer1 ? 'Жёлтый' : 'Красный'}
          </div>
        )}
      </div>

      <div className={`board ${isDraw || winner ? "board-disabled" : ""}`}>
        {Array.from({length: board[0].length}).map((_, colIndex) => (
          <div
            key={colIndex}
            className={`column ${currentGame.canMove(colIndex) ? "" : "column-disabled"}`}
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
          className="action-button green-button"
          onClick={handleUndo}
          disabled={!canUndo}
        >
          Отменить ход
        </button>
        <button
          className="action-button red-button"
          onClick={handleRedo}
          disabled={!canRedo}
        >
          Возобновить ход
        </button>
        <button
          className="action-button restart-button"
          onClick={handleRestart}
        >
          Новая игра
        </button>
      </div>
    </div>
  );
};

export default ConnectFourGame;