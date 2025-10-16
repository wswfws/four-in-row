import Game from "../logic/Game";
import PoleSize from "../types/PoleSize";

const size: PoleSize = {height: 6, width: 7};

function validate(moves: number[]) {
  const game = new Game(size);

  for (const move of moves) {
  }
}