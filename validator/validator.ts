import Game from "../src/logic/Game";
import PoleSize from "../src/types/PoleSize";
import GameState from "../src/types/GameState";
import Move from "../src/types/Move";
import Player from "../src/types/Player";

const size: PoleSize = {height: 6, width: 7};

function validate(moves: number[]) {

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

    const [move, newGame] = game.move(moves[move_id]);
    game = newGame;

    if (game.getCurrentPlayer() === Player.firstPlayer) {
      moveHistoryFirstPlayer.push(move);
    } else {
      moveHistorySecondPlayer.push(move);
    }

    const winner = game.getWinner();
    const isDraw = game.isDraw();

    if (winner) {
      result[`step_${move_id + 1}`] = {
        player_1: structuredClone(moveHistoryFirstPlayer),
        player_2: structuredClone(moveHistorySecondPlayer),
        board_state: "win",
        winner: {
          who: winner === Player.firstPlayer ? "player_1" : "player_2",
          positions: [[0, 0], [0, 0], [0, 0], [0, 0]],
        }
      }
      return result;
    }
    if (isDraw) {
      result[`step_${move_id}`] = {
        player_1: structuredClone(moveHistoryFirstPlayer),
        player_2: structuredClone(moveHistorySecondPlayer),
        board_state: "draw",
      }
      return result;
    }

    result[`step_${move_id}`] = {
      player_1: structuredClone(moveHistoryFirstPlayer),
      player_2: structuredClone(moveHistorySecondPlayer),
      board_state: "pending",
    }

    // console.log(`#move ${move.join("#")}`);
    // console.log(game.toString());
    // console.log("--------------------------------");
  }

  return result;

}

const res = validate([1, 2, 1, 2, 3, 2])

console.log(JSON.stringify(res, null, 2));