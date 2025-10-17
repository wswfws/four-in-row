import PoleSize from "../../../types/PoleSize";
import GamePole from "../../logic/GamePole";
import Cell from "../../../types/Cell";

describe('GamePole', () => {
  describe('Constructor', () => {
    it('Если создается игровое поле с заданным размером, то оно инициализируется пустыми клетками', () => {
      // Arrange
      const size: PoleSize = {width: 3, height: 3};

      // Act
      const gamePole = new GamePole(size);

      // Assert
      expect(gamePole.size).toEqual(size);
    });
  });

  describe('restartPole', () => {
    it('Если вызывается restartPole, то все клетки становятся пустыми', () => {
      // Arrange
      const size: PoleSize = {width: 3, height: 3};
      const gamePole = new GamePole(size);

      // Act
      gamePole.restartPole();

      // Assert
      // Проверяем что все клетки пустые через toString
      const result = gamePole.toString();
      const expected = "- - -\n- - -\n- - -";
      expect(result).toBe(expected);
    });

    it('Если вызывается restartPole для поля другого размера, то создается поле правильного размера', () => {
      // Arrange
      const size: PoleSize = {width: 5, height: 4};
      const gamePole = new GamePole(size);

      // Act
      gamePole.restartPole();

      // Assert
      const result = gamePole.toString();
      const lines = result.split('\n');
      expect(lines).toHaveLength(4); // height = 4
      lines.forEach(line => {
        expect(line.split(' ')).toHaveLength(5); // width = 5
      });
    });
  });

  describe('hasSpaceInColumn', () => {
    it('Если столбец полностью пустой, то возвращает true', () => {
      // Arrange
      const size: PoleSize = {width: 3, height: 3};
      const gamePole = new GamePole(size);

      // Act & Assert
      expect(gamePole.hasSpaceInColumn(0)).toBe(true);
      expect(gamePole.hasSpaceInColumn(1)).toBe(true);
      expect(gamePole.hasSpaceInColumn(2)).toBe(true);
    });

    it('Если столбец полностью заполнен, то возвращает false', () => {
      // Arrange
      const size: PoleSize = {width: 3, height: 3};
      const gamePole = new GamePole(size);

      // Act
      // Заполняем столбец 0
      gamePole.setInColumnFirstEmptyRow(0, Cell.FirstPlayer);
      gamePole.setInColumnFirstEmptyRow(0, Cell.FirstPlayer);
      gamePole.setInColumnFirstEmptyRow(0, Cell.FirstPlayer);

      // Assert
      expect(gamePole.hasSpaceInColumn(0)).toBe(false);
    });

    it('Если столбец частично заполнен, то возвращает true', () => {
      // Arrange
      const size: PoleSize = {width: 3, height: 3};
      const gamePole = new GamePole(size);

      // Act
      gamePole.setInColumnFirstEmptyRow(1, Cell.FirstPlayer);
      gamePole.setInColumnFirstEmptyRow(1, Cell.SecondPlayer);

      // Assert
      expect(gamePole.hasSpaceInColumn(1)).toBe(true);
    });

    it('Если столбец не существует, то возвращает false', () => {
      // Arrange
      const size: PoleSize = {width: 3, height: 3};
      const gamePole = new GamePole(size);

      // Act & Assert
      expect(gamePole.hasSpaceInColumn(-1)).toBe(false);
      expect(gamePole.hasSpaceInColumn(5)).toBe(false);
    });
  });

  describe('setInColumnFirstEmptyRow', () => {
    it('Если в столбце есть пустая клетка, то устанавливает значение и возвращает индекс строки', () => {
      // Arrange
      const size: PoleSize = {width: 3, height: 3};
      const gamePole = new GamePole(size);

      // Act
      const rowIndex = gamePole.setInColumnFirstEmptyRow(1, Cell.FirstPlayer);

      // Assert
      expect(rowIndex).toBe(0); // Первая пустая строка
      expect(gamePole.toString()).toContain('x'); // Проверяем что символ установился
    });

    it('Если устанавливаются несколько значений в один столбец, то они занимают последовательные строки', () => {
      // Arrange
      const size: PoleSize = {width: 3, height: 3};
      const gamePole = new GamePole(size);

      // Act
      const row1 = gamePole.setInColumnFirstEmptyRow(0, Cell.FirstPlayer);
      const row2 = gamePole.setInColumnFirstEmptyRow(0, Cell.SecondPlayer);
      const row3 = gamePole.setInColumnFirstEmptyRow(0, Cell.FirstPlayer);

      // Assert
      expect(row1).toBe(0);
      expect(row2).toBe(1);
      expect(row3).toBe(2);
    });

    it('Если столбец полностью заполнен, то выбрасывается ошибка', () => {
      // Arrange
      const size: PoleSize = {width: 3, height: 2};
      const gamePole = new GamePole(size);

      // Act
      gamePole.setInColumnFirstEmptyRow(1, Cell.FirstPlayer);
      gamePole.setInColumnFirstEmptyRow(1, Cell.SecondPlayer);

      // Assert
      expect(() => {
        gamePole.setInColumnFirstEmptyRow(1, Cell.FirstPlayer);
      }).toThrow("Empty cell doesn't exist, you can check it by `hasSpaceInColumn`");
    });
  });

  describe('copy', () => {
    it('Если создается копия игрового поля, то возвращается новый независимый объект', () => {
      // Arrange
      const size: PoleSize = {width: 3, height: 3};
      const original = new GamePole(size);
      original.setInColumnFirstEmptyRow(0, Cell.FirstPlayer);
      original.setInColumnFirstEmptyRow(1, Cell.SecondPlayer);

      // Act
      const copy = original.copy();

      // Assert
      expect(copy).not.toBe(original); // Разные объекты
      expect(copy.size).toEqual(original.size); // Размеры одинаковые
      expect(copy.toString()).toBe(original.toString()); // Содержимое одинаковое
    });

    it('Если изменяется копия, то оригинал не изменяется', () => {
      // Arrange
      const size: PoleSize = {width: 3, height: 3};
      const original = new GamePole(size);
      const copy = original.copy();

      // Act
      copy.setInColumnFirstEmptyRow(2, Cell.FirstPlayer);

      // Assert
      expect(copy.toString()).not.toBe(original.toString());
      expect(original.toString()).toBe("- - -\n- - -\n- - -");
      expect(copy.toString()).toBe("- - -\n- - -\n- - x");
    });
  });

  describe('toString', () => {
    it('Если поле пустое, то возвращает строковое представление с дефисами', () => {
      // Arrange
      const size: PoleSize = {width: 2, height: 2};
      const gamePole = new GamePole(size);

      // Act
      const result = gamePole.toString();

      // Assert
      expect(result).toBe("- -\n- -");
    });

    it('Если поле содержит игроков, то возвращает правильное строковое представление', () => {
      // Arrange
      const size: PoleSize = {width: 3, height: 3};
      const gamePole = new GamePole(size);

      // Act
      gamePole.setInColumnFirstEmptyRow(0, Cell.FirstPlayer);
      gamePole.setInColumnFirstEmptyRow(1, Cell.SecondPlayer);
      gamePole.setInColumnFirstEmptyRow(0, Cell.FirstPlayer);

      // Assert
      const result = gamePole.toString();
      expect(result).toBe("- - -\nx - -\nx o -");
    });

    it('Если поле имеет разные размеры, то возвращает корректное представление', () => {
      // Arrange
      const size: PoleSize = {width: 1, height: 4};
      const gamePole = new GamePole(size);

      // Act
      const result = gamePole.toString();

      // Assert
      expect(result).toBe("-\n-\n-\n-");
    });
  });

  describe('Integration tests', () => {
    it('Если выполняется полный цикл работы с полем, то все методы работают корректно', () => {
      // Arrange
      const size: PoleSize = {width: 4, height: 3};
      const gamePole = new GamePole(size);

      // Act & Assert
      expect(gamePole.toString()).toBe("- - - -\n- - - -\n- - - -");

      gamePole.setInColumnFirstEmptyRow(0, Cell.FirstPlayer);
      gamePole.setInColumnFirstEmptyRow(0, Cell.SecondPlayer);
      gamePole.setInColumnFirstEmptyRow(1, Cell.FirstPlayer);

      expect(gamePole.toString()).toBe("- - - -\no - - -\nx x - -");

      expect(gamePole.hasSpaceInColumn(0)).toBe(true);
      expect(gamePole.hasSpaceInColumn(1)).toBe(true);
      expect(gamePole.hasSpaceInColumn(2)).toBe(true);

      gamePole.setInColumnFirstEmptyRow(0, Cell.FirstPlayer);
      expect(gamePole.hasSpaceInColumn(0)).toBe(false);

      const copy = gamePole.copy();
      copy.setInColumnFirstEmptyRow(3, Cell.SecondPlayer);
      expect(copy.toString()).not.toBe(gamePole.toString());

      gamePole.restartPole();
      expect(gamePole.toString()).toBe("- - - -\n- - - -\n- - - -");
    });
  });
});