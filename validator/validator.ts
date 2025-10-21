import Game from "../src/logic/Game";
import PoleSize from "../src/types/PoleSize";
import GameState from "../src/types/GameState";
import Move from "../src/types/Move";
import Player from "../src/types/Player";

const default_size: PoleSize = {height: 6, width: 7};

export default function validate(moves: number[], size = default_size): { [p: string]: GameState } {

  let game = new Game(size);
  const result = {
    step_0: {
      player_1: [] as Move[],
      player_2: [] as Move[],
      board_state: "pending"
    }
  } as { [key: string]: GameState }
  const moveHistoryFirstPlayer: Move[] = [];
  const moveHistorySecondPlayer: Move[] = [];

  for (let move_id = 0; move_id < moves.length; move_id++) {

    const currentPlayer = game.getCurrentPlayer();
    let [move, newGame] = game.move(moves[move_id] - 1);
    move = [move[0] + 1, move[1] + 1];
    game = newGame;

    if (currentPlayer === Player.firstPlayer) {
      moveHistoryFirstPlayer.push(move);
    } else {
      moveHistorySecondPlayer.push(move);
    }

    const winnerState = game.getWinner();
    const isDraw = game.isDraw();

    if (winnerState) {
      result[`step_${move_id + 1}`] = {
        player_1: structuredClone(moveHistoryFirstPlayer),
        player_2: structuredClone(moveHistorySecondPlayer),
        board_state: "win",
        winner: {
          who: winnerState[0] === Player.firstPlayer ? "player_1" : "player_2",
          positions: winnerState[1].map(cord => [cord[0] + 1, cord[1] + 1]),
        }
      }
      return result;
    }
    if (isDraw) {
      result[`step_${move_id + 1}`] = {
        player_1: structuredClone(moveHistoryFirstPlayer),
        player_2: structuredClone(moveHistorySecondPlayer),
        board_state: "draw",
      }
      return result;
    }

    result[`step_${move_id + 1}`] = {
      player_1: structuredClone(moveHistoryFirstPlayer),
      player_2: structuredClone(moveHistorySecondPlayer),
      board_state: "pending",
    }
  }

  return result;

}

const res = validate([1, 2, 1, 2, 3, 2])

console.log(JSON.stringify(res, null, 2));