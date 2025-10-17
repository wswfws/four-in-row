import Stack from "../../../logic/Stack/Stack";

describe('Stack', () => {
  describe('Constructor', () => {
    it('Если создается новый стек, то он должен быть пустым', () => {
      // Arrange
      const stack = new Stack<number>();

      // Assert
      expect(stack.isEmpty()).toBe(true);
      expect(stack.getSize()).toBe(0);
      expect(stack.peek()).toBeNull();
    });
  });

  describe('push', () => {
    it('Если добавляется элемент в пустой стек, то он становится верхним элементом и размер увеличивается до 1', () => {
      // Arrange
      const stack = new Stack<number>();

      // Act
      stack.push(1);

      // Assert
      expect(stack.peek()).toBe(1);
      expect(stack.getSize()).toBe(1);
      expect(stack.isEmpty()).toBe(false);
    });

    it('Если добавляется несколько элементов, то верхний элемент всегда последний добавленный', () => {
      // Arrange
      const stack = new Stack<number>();

      // Act
      stack.push(1);
      stack.push(2);

      // Assert
      expect(stack.peek()).toBe(2);
      expect(stack.getSize()).toBe(2);
    });

    it('Если добавляются элементы разных типов данных, то стек корректно их хранит', () => {
      // Arrange
      const stringStack = new Stack<string>();
      const objectStack = new Stack<{ id: number }>();

      // Act
      stringStack.push('hello');
      objectStack.push({ id: 1 });

      // Assert
      expect(stringStack.peek()).toBe('hello');
      expect(objectStack.peek()).toEqual({ id: 1 });
    });
  });

  describe('pop', () => {
    it('Если извлекаются элементы из стека, то они возвращаются в порядке LIFO', () => {
      // Arrange
      const stack = new Stack<number>();
      stack.push(1);
      stack.push(2);
      stack.push(3);

      // Act & Assert
      expect(stack.pop()).toBe(3);
      expect(stack.getSize()).toBe(2);

      expect(stack.pop()).toBe(2);
      expect(stack.getSize()).toBe(1);

      expect(stack.pop()).toBe(1);
      expect(stack.getSize()).toBe(0);
    });

    it('Если извлекается элемент из пустого стека, то возвращается null и размер не меняется', () => {
      // Arrange
      const stack = new Stack<number>();

      // Act & Assert
      expect(stack.pop()).toBeNull();
      expect(stack.getSize()).toBe(0);
    });

    it('Если выполняются смешанные операции push и pop, то стек ведет себя корректно', () => {
      // Arrange
      const stack = new Stack<number>();

      // Act & Assert
      stack.push(1);
      stack.push(2);
      expect(stack.pop()).toBe(2);

      stack.push(3);
      expect(stack.pop()).toBe(3);
      expect(stack.pop()).toBe(1);
      expect(stack.pop()).toBeNull();
    });
  });

  describe('peek', () => {
    it('Если просматривается верхний элемент, то он возвращается без удаления из стека', () => {
      // Arrange
      const stack = new Stack<number>();
      stack.push(1);
      stack.push(2);

      // Act & Assert
      expect(stack.peek()).toBe(2);
      expect(stack.getSize()).toBe(2); // Размер не изменился
      expect(stack.pop()).toBe(2); // Все еще можно извлечь тот же элемент
    });

    it('Если просматривается пустой стек, то возвращается null', () => {
      // Arrange
      const stack = new Stack<number>();

      // Act & Assert
      expect(stack.peek()).toBeNull();
    });
  });

  describe('isEmpty', () => {
    it('Если стек пустой, то isEmpty возвращает true, иначе false', () => {
      // Arrange
      const stack = new Stack<number>();

      // Act & Assert
      expect(stack.isEmpty()).toBe(true);

      stack.push(1);
      expect(stack.isEmpty()).toBe(false);

      stack.pop();
      expect(stack.isEmpty()).toBe(true);
    });
  });

  describe('getSize', () => {
    it('Если в стек добавляются и удаляются элементы, то getSize возвращает корректный размер', () => {
      // Arrange
      const stack = new Stack<number>();

      // Act & Assert
      expect(stack.getSize()).toBe(0);

      stack.push(1);
      expect(stack.getSize()).toBe(1);

      stack.push(2);
      stack.push(3);
      expect(stack.getSize()).toBe(3);

      stack.pop();
      expect(stack.getSize()).toBe(2);

      stack.pop();
      stack.pop();
      expect(stack.getSize()).toBe(0);
    });
  });

  describe('printStack', () => {
    it('Если вызывается printStack, то метод не выбрасывает исключение', () => {
      // Arrange
      const stack = new Stack<number>();

      // Act & Assert
      expect(() => stack.toString()).not.toThrow();

      stack.push(1);
      stack.push(2);
      expect(() => stack.toString()).not.toThrow();
    });

    it('Если вызывается printStack для пустого стека, то метод не выбрасывает исключение', () => {
      // Arrange
      const stack = new Stack<number>();

      // Act & Assert
      expect(() => stack.toString()).not.toThrow();
    });
  });

  describe('Integration tests', () => {
    it('Если стек используется для строк, то все операции работают корректно', () => {
      // Arrange
      const stack = new Stack<string>();

      // Act
      stack.push('a');
      stack.push('b');
      stack.push('c');

      // Assert
      expect(stack.pop()).toBe('c');
      expect(stack.peek()).toBe('b');
      expect(stack.getSize()).toBe(2);
    });

    it('Если стек используется для сложных объектов, то все операции работают корректно', () => {
      // Arrange
      const stack = new Stack<{ name: string; age: number }>();
      const person1 = { name: 'Alice', age: 25 };
      const person2 = { name: 'Bob', age: 30 };

      // Act
      stack.push(person1);
      stack.push(person2);

      // Assert
      expect(stack.pop()).toEqual(person2);
      expect(stack.peek()).toEqual(person1);
    });
  });
});