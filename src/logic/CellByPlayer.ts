import Player from "../../types/Player";
import Cell from "../../types/Cell";

export default function CellByPlayer(player: Player) {
  switch (player) {
    case Player.firstPlayer:
      return Cell.FirstPlayer;
    case Player.secondPlayer:
      return Cell.SecondPlayer;
    default:
      throw new Error("Could not find cell");
  }
}