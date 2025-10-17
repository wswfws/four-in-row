import CellByPlayer from "../../logic/CellByPlayer";
import Player from "../../types/Player";
import Cell from "../../types/Cell";

describe('CellByPlayer', () => {
  it('Если передается Player.firstPlayer, то возвращается Cell.FirstPlayer', () => {
    // Arrange
    const player = Player.firstPlayer;

    // Act
    const result = CellByPlayer(player);

    // Assert
    expect(result).toBe(Cell.FirstPlayer);
  });

  it('Если передается Player.secondPlayer, то возвращается Cell.SecondPlayer', () => {
    // Arrange
    const player = Player.secondPlayer;

    // Act
    const result = CellByPlayer(player);

    // Assert
    expect(result).toBe(Cell.SecondPlayer);
  });

  it('Если передается невалидное значение игрока, то выбрасывается ошибка', () => {
    // Arrange
    const invalidPlayer = 'invalid' as Player;

    // Act & Assert
    expect(() => {
      CellByPlayer(invalidPlayer);
    }).toThrow('Could not find cell');
  });

  describe('TypeScript compiler checks', () => {
    it('Если функция вызывается с корректными значениями Player enum, то ошибки не возникает', () => {
      // Arrange
      const firstPlayer: Player = Player.firstPlayer;
      const secondPlayer: Player = Player.secondPlayer;

      // Act & Assert
      expect(() => CellByPlayer(firstPlayer)).not.toThrow();
      expect(() => CellByPlayer(secondPlayer)).not.toThrow();
    });
  });
});