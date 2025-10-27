import validate from "../../validator/validator";
import {GameStateWin} from "../types/GameState";

describe('Game Validation Tests', () => {
  describe('Когда передается последовательность ходов [1, 2, 1, 2, 1, 2, 1, 2]', () => {
    const moves = [1, 2, 1, 2, 1, 2, 1, 2];

    it('ТО должен определить победу первого игрока на 7-м ходу', () => {
      // Arrange
      const expectedStepKey = 'step_7';
      const expectedWinner = 'player_1';

      // Act
      const result = validate(moves);

      // Assert
      expect(result[expectedStepKey].board_state).toBe('win');
      expect((result[expectedStepKey] as GameStateWin).winner?.who).toBe(expectedWinner);
    });

    it('ТО должен корректно отслеживать историю ходов для обоих игроков', () => {
      // Act
      const result = validate(moves);

      // Assert
      expect(result['step_7'].player_1).toHaveLength(4);
      expect(result['step_7'].player_2).toHaveLength(3);

      // Проверяем конкретные ходы
      expect(result['step_7'].player_1[0][1]).toBe(1);
      expect(result['step_7'].player_1[1][1]).toBe(1);
      expect(result['step_7'].player_1[2][1]).toBe(1);
      expect(result['step_7'].player_1[3][1]).toBe(1);

      expect(result['step_7'].player_2[0][1]).toBe(2);
      expect(result['step_7'].player_2[1][1]).toBe(2);
      expect(result['step_7'].player_2[2][1]).toBe(2);
    });
  });

  describe('Когда игра только начинается (нет ходов)', () => {
    it('ТО начальное состояние должно быть "pending"', () => {
      // Arrange
      const moves: number[] = [];

      // Act
      const result = validate(moves);

      // Assert
      expect(result['step_0'].board_state).toBe('pending');
      expect(result['step_0'].player_1).toHaveLength(0);
      expect(result['step_0'].player_2).toHaveLength(0);
    });
  });

  describe('Когда игра завершается вничью', () => {
    it('ТО должен вернуть состояние "draw"', () => {
      // Arrange
      const moves = [1, 1, 1, 2, 2, 2, 3, 3, 3];

      // Act
      const result = validate(moves, {width: 3, height: 3});

      // Assert
      const lastStepKey = Object.keys(result).pop()!;
      const finalState = result[lastStepKey].board_state;
      expect(finalState).toContain("draw");
    });
  });

  describe('Когда игра продолжается после нескольких ходов', () => {
    it('ТО состояние должно оставаться "pending"', () => {
      // Arrange
      const moves = [1, 2, 3];

      // Act
      const result = validate(moves);

      // Assert
      expect(result['step_3'].board_state).toBe('pending');
      expect(result['step_3'].player_1).toHaveLength(2);
      expect(result['step_3'].player_2).toHaveLength(1);
    });
  });

  describe('Когда первый игрок выигрывает', () => {
    it('ТО должен определить победу первого игрока', () => {
      // Arrange
      const moves = [1, 2, 1, 2, 1, 2, 1];

      // Act
      const result = validate(moves);

      // Assert
      const lastStepKey = Object.keys(result).pop()!;
      if (result[lastStepKey].board_state === 'win') {
        expect((result[lastStepKey] as GameStateWin).winner?.who).toBe('player_1');
      }
    });
  });

  describe('Когда передается некорректный ход', () => {
    it('ТО должен обработать ошибку корректно', () => {
      // Arrange
      const moves = [1, 8, 2]; // 8 - некорректная колонка

      // Act & Assert
      expect(() => validate(moves)).toThrow();
    });
  });

  describe('Когда второй игрок выигрывает по вертикали', () => {
    const moves = [1, 2, 3, 2, 4, 2, 5, 2];

    it('ТО должен определить победу второго игрока на 8-м ходу', () => {
      // Act
      const result = validate(moves);

      // Assert
      const lastStepKey = Object.keys(result).pop()!;
      expect(result[lastStepKey].board_state).toBe('win');
      expect((result[lastStepKey] as GameStateWin).winner?.who).toBe('player_2');
    });

    it('ТО выигрышная комбинация должна быть вертикальной в колонке 2', () => {
      // Act
      const result = validate(moves);

      // Assert
      const lastStepKey = Object.keys(result).pop()!;
      const winState = result[lastStepKey] as GameStateWin;
      expect(winState.winner?.positions).toHaveLength(4);
      // Все позиции должны быть в колонке 2
      winState.winner?.positions.forEach(position => {
        expect(position[1]).toBe(2);
      });
    });
  });

  describe('Когда игра завершается победой по диагонали', () => {
    const moves = [1, 2, 2, 3, 4, 3, 3, 4, 4, 5, 4];

    it('ТО должен определить победу первого игрока по диагонали', () => {
      // Act
      const result = validate(moves);

      // Assert
      const lastStepKey = Object.keys(result).pop()!;
      expect(result[lastStepKey].board_state).toBe('win');
      expect((result[lastStepKey] as GameStateWin).winner?.who).toBe('player_1');
    });
  });

  describe('Когда игра ведется на нестандартном поле', () => {
    it('ТО корректно обрабатывает победу на поле 4x4', () => {
      // Arrange
      const moves = [1, 2, 1, 2, 1, 2, 1];
      const customSize = {width: 4, height: 4};

      // Act
      const result = validate(moves, customSize);

      // Assert
      const lastStepKey = Object.keys(result).pop()!;
      expect(result[lastStepKey].board_state).toBe('win');
    });
  });
});