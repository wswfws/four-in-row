import Cell from "../types/Cell";
import PoleSize from "../types/PoleSize";

export default class GamePole {
  private pole: Cell[][] = [];

  constructor(public size: PoleSize) {
    this.restartPole()
  }

  restartPole() {
    const pole = []

    for (let i = 0; i < this.size.height; i++) {
      const row = [];
      for (let j = 0; j < this.size.width; j++) {
        row.push(Cell.Empty);
      }
      pole.push(row);
    }

    this.pole = pole;
  }

}