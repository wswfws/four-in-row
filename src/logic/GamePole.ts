import Cell from "../../types/Cell";
import PoleSize from "../../types/PoleSize";

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

  hasSpaceInColumn(column: number): boolean {
    if (!this.pole.at(-1)) {
      return false;
    }
    return this.pole.at(-1)![column] === Cell.Empty;
  }

  setInColumnFirstEmptyRow(column: number, cell: Cell) {
    for (let row = 0; row < this.size.height; row++) {
      if (this.pole[row][column] === Cell.Empty) {
        this.pole[row][column] = cell;
        return row;
      }
    }
    throw new RangeError("Empty cell doesn't exist, you can check it by `hasSpaceInColumn`");
  }

  copy(){
    const pole = new GamePole(this.size);
    pole.pole = structuredClone(this.pole);
    return pole;
  }

  toString() {
    const result = [];
    for (let row = this.size.height - 1; row >= 0; row--) {
      result.push(this.pole[row].map((cell: Cell) => {
        switch (cell) {
          case Cell.FirstPlayer:
            return "x";
          case Cell.SecondPlayer:
            return "o";
          default:
          case Cell.Empty:
            return "-";
        }
      }).join(" "))
    }
    return result.join("\n");
  }

}