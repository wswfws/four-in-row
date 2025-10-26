import Move from "../types/Move";
import Game from "./Game";
import Cell from "../types/Cell";

export default function GetNextMoveBot(game: Game, depth = 3): [Move, number] {
  if (depth <= 0) throw new Error("depth must be greater than 0");

  const botPlayer = game.getCurrentPlayer();

  let bestMove = [0, 0] as Move;
  let bestScore = -Infinity;
  let hasValidMove = false;

  for (let col = 0; col < game.size.width; col++) {
    if (game.canMove(col)) {
      hasValidMove = true;
      const [, _game] = game.move(col);

      const winner = _game.getWinner();
      if (winner) {
        if (winner[0] === botPlayer) {
          return [[col, 0] as Move, 100000 - (3 - depth)];
        }
      }

      let score: number;

      if (depth > 1) {
        const [, recursiveScore] = GetNextMoveBot(_game, depth - 1);
        score = -recursiveScore;
      } else {
        score = evaluatePosition(_game, botPlayer);
      }

      if (score > bestScore || (score === bestScore && Math.random() > 0.5)) {
        bestMove = [col, 0] as Move;
        bestScore = score;
      }
    }
  }

  if (!hasValidMove) {
    throw new Error("No valid moves available");
  }

  return [bestMove, bestScore];
}

function evaluatePosition(game: Game, botPlayer: Cell): number {
  const board = game.toArray();
  const width = game.size.width;
  const height = game.size.height;

  let score = 0;

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (col <= width - 4) {
        score += evaluateLine(
          board[row][col],
          board[row][col + 1],
          board[row][col + 2],
          board[row][col + 3],
          botPlayer
        );
      }

      if (row <= height - 4) {
        score += evaluateLine(
          board[row][col],
          board[row + 1][col],
          board[row + 2][col],
          board[row + 3][col],
          botPlayer
        );
      }

      if (col <= width - 4 && row <= height - 4) {
        score += evaluateLine(
          board[row][col],
          board[row + 1][col + 1],
          board[row + 2][col + 2],
          board[row + 3][col + 3],
          botPlayer
        );
      }

      if (col >= 3 && row <= height - 4) {
        score += evaluateLine(
          board[row][col],
          board[row + 1][col - 1],
          board[row + 2][col - 2],
          board[row + 3][col - 3],
          botPlayer
        );
      }
    }
  }

  return score;
}

function evaluateLine(a: Cell, b: Cell, c: Cell, d: Cell, botPlayer: Cell): number {
  const opponent = botPlayer === Cell.FirstPlayer ? Cell.SecondPlayer : Cell.FirstPlayer;

  let botCount = 0;
  let opponentCount = 0;
  let emptyCount = 0;

  [a, b, c, d].forEach(cell => {
    if (cell === botPlayer) botCount++;
    else if (cell === opponent) opponentCount++;
    else emptyCount++;
  });

  // Если в линии есть фишки обоих игроков - линия бесполезна
  if (botCount > 0 && opponentCount > 0) {
    return 0;
  }

  if (botCount > 0) {
    return evaluateThreat(botCount, emptyCount);
  }

  if (opponentCount > 0) {
    return -evaluateThreat(opponentCount, emptyCount) * 1.1; // Немного увеличиваем вес угроз противника
  }

  return 0;
}

function evaluateThreat(playerCount: number, emptyCount: number): number {
  if (playerCount === 4) {
    return 10000;
  }

  if (playerCount === 3 && emptyCount === 1) {
    return 100;
  }

  if (playerCount === 2 && emptyCount === 2) {
    return 10;
  }

  if (playerCount === 1 && emptyCount === 3) {
    return 1;
  }

  return 0;
}