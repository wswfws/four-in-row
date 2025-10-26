import Player from "../types/Player";
import Cell from "../types/Cell";

export default function CellByPlayer(player: Player): Cell {
  switch (player) {
    case Player.FirstPlayer:
      return Cell.FirstPlayer;
    case Player.SecondPlayer:
      return Cell.SecondPlayer;
    default:
      throw new Error("Could not find cell");
  }
}