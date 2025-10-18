import Game from "../src/logic/Game";
import PoleSize from "../src/types/PoleSize";
import Move from "../src/types/Move";

const size: PoleSize = {height: 6, width: 7};



function validate(moves: number[]) {

  let game = new Game(size);

  for (const columnMove of moves) {
    const [move, newGame] = game.move(columnMove);
    game = newGame;
    console.log(`#move ${move.join("#")}`);
    console.log(game.toString());
    console.log("--------------------------------");
  }

}

validate([1, 2, 1, 2, 3, 2])