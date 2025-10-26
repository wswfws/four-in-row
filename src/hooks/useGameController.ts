import {useCallback, useState} from "react";
import Game from "../logic/Game";
import {GAME_CONFIG} from "../config";
import Player from "../types/Player";
import GetNextMoveBot from "../logic/Bot";


type GameHistory = {
  games: Game[];
  currentIndex: number;
}

const useGameController = (mode: "bot" | "player", botComplexity: number) => {
  const [gameHistory, setGameHistory] = useState<GameHistory>({
    games: [new Game(GAME_CONFIG)],
    currentIndex: 0
  });
  const [isBotThinking, setIsBotThinking] = useState(false);

  const currentGame = gameHistory.games[gameHistory.currentIndex];
  const canUndo = gameHistory.currentIndex > 0;
  const canRedo = gameHistory.currentIndex < gameHistory.games.length - 1;
  const board = currentGame.toArray();
  const currentPlayer = currentGame.getCurrentPlayer();
  const isPlayer1 = currentPlayer === Player.firstPlayer;
  const winner = currentGame.getWinner()?.at(0) as Player | null;
  const isDraw = currentGame.isDraw();

  const botMove = async (playerGame: Game) => {
    setIsBotThinking(true);

    // Даем React время обновить UI перед началом вычислений
    await new Promise(resolve => setTimeout(resolve, 0));

    const botMove = GetNextMoveBot(playerGame, botComplexity);
    const [, botNextGame] = playerGame.move(botMove[0][0]);

    setGameHistory(prev => ({
      games: [...prev.games.slice(0, prev.currentIndex + 1), botNextGame],
      currentIndex: prev.currentIndex + 1
    }));

    setIsBotThinking(false);
  }

  const move = async (columnIndex: number) => {
    if (!winner && currentGame.canMove(columnIndex)) {
      const [, nextGame] = currentGame.move(columnIndex);

      setGameHistory(prev => ({
        games: [...prev.games.slice(0, prev.currentIndex + 1), nextGame],
        currentIndex: prev.currentIndex + 1
      }));

      if (mode === "bot" && !nextGame.isDraw() && !nextGame.getWinner()) {
        botMove(nextGame)
      }
    }
  };

  const stepUndo = useCallback(() => {
    if (canUndo) {
      setGameHistory(prev => ({
        ...prev,
        currentIndex: prev.currentIndex - (mode === "bot" ? 2 : 1)
      }));
    }
  }, [mode, canUndo]);

  const stepRedo = useCallback(() => {
    if (canRedo) {
      setGameHistory(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + (mode === "bot" ? 2 : 1)
      }));
    }
  }, [mode, canRedo])

  const restart = useCallback(() => {
    setGameHistory({
      games: [new Game(GAME_CONFIG)],
      currentIndex: 0
    });
  }, []);

  return {
    canUndo, canRedo,
    move, stepUndo, stepRedo, restart,
    board, winner, isPlayer1, isDraw,
    isBotThinking, canMove: currentGame.canMove,
  };
}
export default useGameController;
