import Game from "../src/logic/Game";
import PoleSize from "../types/PoleSize";

const size: PoleSize = {height: 6, width: 7};

function validate(moves: number[]) {
  const game = new Game(size);

  for (const move of moves) {
    game.move(move);
    console.log(game.toString());
    console.log("--------------------------------");
  }

  console.log("\n\n----------undo----------\n\n");

  for (let i = 0; i < moves.length; i++) {
    const move = game.undo();
    console.log(game.toString());
    console.log(`--------- move:${move.row}#${move.column}`);
  }

}

validate([1, 2, 1, 2, 3, 2])