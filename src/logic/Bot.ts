import Move from "../types/Move";
import Game from "./Game";
import Cell from "../types/Cell";

export default function GetNextMoveBot(game: Game, depth = 3): [Move, number] {
  if (depth <= 0) throw new Error("depth must be greater than 0");

  let bestMove = [0, 0] as Move;
  let bestScore = -Infinity;

  for (let col = 0; col < game.size.width; col++) {
    if (game.canMove(col)) {
      if (depth > 1) {
        const [, _game] = game.move(col);
        const [, _bestScore] = GetNextMoveBot(_game, depth - 1);
        if (-_bestScore > bestScore) {
          bestMove = [col, 0] as Move;
          bestScore = -_bestScore;
        }
      } else {
        const [, _game] = game.move(col);
        const score = -getScore(_game);
        if (score > bestScore) {
          bestMove = [col, 0] as Move;
          bestScore = score;
        }
      }
    }
  }

  if (bestScore === -Infinity) {
    for (let col = 0; col < game.size.width; col++) {
      if (game.canMove(col)) {
        return [[col, 0] as Move, 0];
      }
    }
  }

  return [bestMove, bestScore];
}

function getScore(game: Game): number {
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
          board[row][col + 3]
        );
      }

      if (row <= height - 4) {
        score += evaluateLine(
          board[row][col],
          board[row + 1][col],
          board[row + 2][col],
          board[row + 3][col]
        );
      }

      if (col <= width - 4 && row <= height - 4) {
        score += evaluateLine(
          board[row][col],
          board[row + 1][col + 1],
          board[row + 2][col + 2],
          board[row + 3][col + 3]
        );
      }

      if (col >= 3 && row <= height - 4) {
        score += evaluateLine(
          board[row][col],
          board[row + 1][col - 1],
          board[row + 2][col - 2],
          board[row + 3][col - 3]
        );
      }
    }
  }

  return score;
}

function evaluateLine(a: Cell, b: Cell, c: Cell, d: Cell): number {
  let player1Count = 0;
  let player2Count = 0;
  let emptyCount = 0;

  [a, b, c, d].forEach(cell => {
    if (cell === Cell.FirstPlayer) player1Count++;
    else if (cell === Cell.SecondPlayer) player2Count++;
    else emptyCount++;
  });

  if (player1Count > 0 && player2Count > 0) {
    return 0;
  }

  if (player1Count > 0) {
    return evaluateThreat(player1Count, emptyCount);
  }

  if (player2Count > 0) {
    return -evaluateThreat(player2Count, emptyCount);
  }

  return 0;
}

function evaluateThreat(playerCount: number, emptyCount: number): number {

  const weights: { [key: number]: number } = {
    1: 1,
    2: 10,
    3: 100,
    4: 10000
  }

  if (playerCount === 4) {
    return weights[4];
  }

  if (playerCount + emptyCount === 4) {
    return weights[playerCount] || 0;
  }

  return 0;
}