import GamePole from "./GamePole";
import Player from "../types/Player";
import PoleSize from "../types/PoleSize";
import PositiveNumber from "../types/PositiveNumber";
import CellByPlayer from "./CellByPlayer";
import GameHistoryPoint from "../types/GameHistoryPoint";
import Stack from "./Stack/Stack";

export default class Game {
  private pole: GamePole;
  private player: Player;
  private history: Stack<GameHistoryPoint>;

  constructor(public size: PoleSize) {
    this.pole = new GamePole(size);
    this.player = Player.firstPlayer;
    this.history = new Stack<GameHistoryPoint>();
  }

  switchPlayer() {
    this.player = this.player === Player.firstPlayer
      ? Player.secondPlayer
      : Player.firstPlayer;
  }

  move(column: PositiveNumber) {
    if (this.pole.hasSpaceInColumn(column)) {
      const poleCopy  = this.pole.copy();
      const row = this.pole.setInColumnFirstEmptyRow(column, CellByPlayer(this.player));
      this.history.push({pole: poleCopy, player: this.player, move: {row, column}});
      this.switchPlayer();
      return row;
    }
    throw new Error("Column hasn't has empty cell");
  }

  toString() {
    return this.pole.toString();
  }

  undo(){
    if (this.history.isEmpty()){
      throw new Error("Unable to undo: history is empty");
    }
    const lastState = this.history.pop()!;
    this.player = lastState.player;
    this.pole = lastState.pole;

    return lastState.move;
  }

}





