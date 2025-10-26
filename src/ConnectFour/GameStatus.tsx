import React from 'react';
import Player from '../types/Player';

interface Props {
  winner?: Player | null;
  isDraw: boolean;
  currentPlayer: Player;
  getPlayerColor: (player: Player) => string;
}

export const GameStatus = ({winner, isDraw, currentPlayer, getPlayerColor}: Props) => {
  if (winner) {
    return (
      <div className={`status-message winner player-${winner === Player.firstPlayer ? '1' : '2'}`}>
        Победил: {getPlayerColor(winner)}!
      </div>
    );
  }

  if (isDraw) {
    return <div className="status-message draw">Ничья!</div>;
  }

  return (
    <div className={`status-message current-player player-${currentPlayer === Player.firstPlayer ? '1' : '2'}`}>
      Текущий игрок: {getPlayerColor(currentPlayer)}
    </div>
  );
};

export default GameStatus;