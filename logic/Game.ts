import GamePole from "./GamePole";
import Player from "../types/Player";
import PoleSize from "../types/PoleSize";
import PositiveNumber from "../types/PositiveNumber";


export default class Game {
  private pole: GamePole;
  private player: Player;

  constructor(public size: PoleSize) {
    this.pole = new GamePole(size);
    this.player = Player.firstPlayer;
  }

  move(column: PositiveNumber) {

  }

}





