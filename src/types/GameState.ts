import Move from "./Move";

type GameStateWin = {
  player_1: Move[];
  player_2: Move[];
  board_state: "win";
  winner: {
    who: "player_1" | "player_2",
    positions: [Move, Move, Move, Move],
  }
};

type GameStateNotWin = {
  player_1: Move[];
  player_2: Move[];
  board_state: "waiting" | "pending" | "draw";
}

type GameState = GameStateNotWin | GameStateWin;

export default GameState;