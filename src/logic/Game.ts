import GamePole from "./GamePole";
import Player from "../types/Player";
import PoleSize from "../types/PoleSize";
import PositiveNumber from "../types/PositiveNumber";
import CellByPlayer from "./CellByPlayer";
import Move from "../types/Move";

export default class Game {
  private readonly pole: GamePole;
  private readonly player: Player;

  constructor(public size: PoleSize, player = Player.FirstPlayer, pole: GamePole | null = null) {
    this.pole = pole ?? new GamePole(size);
    this.player = player;
    this.canMove = this.canMove.bind(this);
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
      this.player === Player.FirstPlayer ? Player.SecondPlayer : Player.FirstPlayer,
      newGamePole
    )];
  }

  toString() {
    return this.pole.toString();
  }

  toArray() {
    return this.pole.toArray();
  }

  getWinner(): [Player, Move[]] | null {
    const firstHasFour = this.pole.hasFour(Player.FirstPlayer);
    if (firstHasFour.found) {
      return [Player.FirstPlayer, firstHasFour.coordinates!];
    }
    const secondHasFour = this.pole.hasFour(Player.SecondPlayer);
    if (secondHasFour.found) {
      return [Player.SecondPlayer, secondHasFour.coordinates!];
    }
    return null;
  }

  isDraw() {
    return this.pole.isFull();
  }

  canMove = (column: number): boolean => {
    return this.pole.hasSpaceInColumn(column);
  }
}





