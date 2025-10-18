import GamePole from "./GamePole";
import Player from "../types/Player";
import PoleSize from "../types/PoleSize";
import PositiveNumber from "../types/PositiveNumber";
import CellByPlayer from "./CellByPlayer";
import Move from "../types/Move";

type GameState = {
  player_1: Move[];
  player_2: Move[];
  board_state: "waiting" | "pending" | "win" | "draw";
  winner: {
    who: "player_1" | "player_2",
    positions: [Move, Move, Move, Move],
  }
}

export default class Game {
  private readonly pole: GamePole;
  private readonly player: Player;

  constructor(public size: PoleSize, player = Player.firstPlayer, pole: GamePole | null = null) {
    this.pole = pole ?? new GamePole(size);
    this.player = player;
  }

  getCurrentPlayer() {
    return this.player;
  }

  move(column: PositiveNumber): [Move, Game] {
    if (!this.pole.hasSpaceInColumn(column)) {
      throw new Error("Column hasn't has empty cell");
    }

    const [move, newGamePole] = this.pole.setInColumnFirstEmptyRow(column, CellByPlayer(this.player));

    return [move, new Game(
      this.size,
      this.player === Player.firstPlayer ? Player.secondPlayer : Player.firstPlayer,
      newGamePole
    )];
  }

  toString() {
    return this.pole.toString();
  }

  toArray() {
    return this.pole.toArray();
  }

  getWinner() {
    if (this.pole.hasFour(Player.firstPlayer)) {
      return Player.firstPlayer;
    }
    if (this.pole.hasFour(Player.secondPlayer)) {
      return Player.secondPlayer;
    }
    return null;
  }

  isDraw() {
    return this.pole.isFull();
  }

  canMove(column: PositiveNumber): boolean {
    return this.pole.hasSpaceInColumn(column);
  }

  getState

}





