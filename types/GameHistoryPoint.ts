import GamePole from "../src/logic/GamePole";
import Player from "./Player";

type GameHistoryPoint = {
  pole: GamePole,
  player: Player,
  move: { row: number, column: number }
}

export default GameHistoryPoint;