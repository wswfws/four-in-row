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
  private futureHistory: Stack<GameHistoryPoint>;

  constructor(public size: PoleSize) {
    this.pole = new GamePole(size);
    this.player = Player.firstPlayer;
    this.history = new Stack<GameHistoryPoint>();
    this.futureHistory = new Stack<GameHistoryPoint>();
  }

  switchPlayer() {
    this.player = this.player === Player.firstPlayer
      ? Player.secondPlayer
      : Player.firstPlayer;
  }

  getCurrentPlayer() {
    return this.player;
  }

  move(column: PositiveNumber) {
    if (this.pole.hasSpaceInColumn(column)) {
      const historyPoint = this.getNowHistoryPoint();

      const row = this.pole.setInColumnFirstEmptyRow(column, CellByPlayer(this.player));

      this.switchPlayer();
      this.history.push(historyPoint);
      this.futureHistory = new Stack<GameHistoryPoint>();

      return row;
    }
    throw new Error("Column hasn't has empty cell");
  }

  toString() {
    return this.pole.toString();
  }

  undo() {
    if (this.history.isEmpty()) {
      throw new Error("Unable to undo: history is empty");
    }
    this.futureHistory.push(this.getNowHistoryPoint());

    const lastState = this.history.pop()!;
    this.player = lastState.player;
    this.pole = lastState.pole;

  }

  redo() {
    if (this.futureHistory.isEmpty()) {
      throw new Error("Unable to undo: futureHistory is empty");
    }
    this.history.push(this.getNowHistoryPoint());

    const lastState = this.futureHistory.pop()!;
    this.player = lastState.player;
    this.pole = lastState.pole;
  }

  toArray() {
    return this.pole.toArray();
  }

  getNowHistoryPoint(): GameHistoryPoint {
    return {pole: this.pole.copy(), player: this.player};
  }

}





