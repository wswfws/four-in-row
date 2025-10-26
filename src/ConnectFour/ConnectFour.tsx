import React, { useState } from 'react';
import Player from '../types/Player';
import "./ConnectFour.css"
import GameModeSelector from './GameModeSelector';
import GameBoard from './GameBoard';
import useGameController from "../hooks/useGameController";
import GameStatus from "./GameStatus";
import ActionButtons from "./ActionButtons";
import ComplexitySelector from "./ComplexitySelector";

type GameMode = "bot" | "player";

const ConnectFourGame: React.FC = () => {
  const [mode, setMode] = useState<GameMode>();
  const [botComplexity, setBotComplexity] = useState(3);
  const [showComplexitySelector, setShowComplexitySelector] = useState(false);

  const gameController = useGameController(mode ?? "player", botComplexity);
  const {
    canUndo, canRedo,
    move, stepUndo, stepRedo, restart,
    canMove, board, winner, isPlayer1, isDraw
  } = gameController;

  const handleBotModeSelect = () => {
    setShowComplexitySelector(true);
  };

  const handleComplexityConfirm = (complexity: number) => {
    setBotComplexity(complexity);
    setMode("bot");
    setShowComplexitySelector(false);
  };

  const handleComplexityCancel = () => {
    setShowComplexitySelector(false);
  };

  if (showComplexitySelector) {
    return (
      <ComplexitySelector
        currentComplexity={botComplexity}
        onConfirm={handleComplexityConfirm}
        onCancel={handleComplexityCancel}
      />
    );
  }

  if (!mode) {
    return (
      <GameModeSelector
        onPlayerModeSelect={() => setMode("player")}
        onBotModeSelect={handleBotModeSelect}
      />
    );
  }

  const getPlayerColor = (player: Player) =>
    player === Player.firstPlayer ? 'Жёлтый' : 'Красный';

  return (
    <div className="connect-four">
      <GameStatus
        winner={winner}
        isDraw={isDraw}
        currentPlayer={isPlayer1 ? Player.firstPlayer : Player.secondPlayer}
        getPlayerColor={getPlayerColor}
      />

      <GameBoard
        board={board}
        isGameOver={isDraw || !!winner}
        canMove={canMove}
        onMove={move}
      />

      <ActionButtons
        onUndo={stepUndo}
        onRedo={stepRedo}
        onRestart={restart}
        canUndo={canUndo}
        canRedo={canRedo}
      />
    </div>
  );
};

export default ConnectFourGame;