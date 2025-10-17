import GamePole from "../logic/GamePole";
import Player from "./Player";

type GameHistoryPoint = {
  pole: GamePole,
  player: Player,
}

export default GameHistoryPoint;