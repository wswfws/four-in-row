import Stack from "../../../logic/Stack/Stack";

describe('Stack', () => {
  describe('Constructor', () => {
    it('should create empty stack', () => {
      const stack = new Stack<number>();
      expect(stack.isEmpty()).toBe(true);
      expect(stack.getSize()).toBe(0);
      expect(stack.peek()).toBeNull();
    });
  });

  describe('push', () => {
    it('should push elements to stack', () => {
      const stack = new Stack<number>();

      stack.push(1);
      expect(stack.peek()).toBe(1);
      expect(stack.getSize()).toBe(1);
      expect(stack.isEmpty()).toBe(false);

      stack.push(2);
      expect(stack.peek()).toBe(2);
      expect(stack.getSize()).toBe(2);
    });

    it('should handle multiple data types', () => {
      const stringStack = new Stack<string>();
      stringStack.push('hello');
      expect(stringStack.peek()).toBe('hello');

      const objectStack = new Stack<{ id: number }>();
      objectStack.push({ id: 1 });
      expect(objectStack.peek()).toEqual({ id: 1 });
    });
  });

  describe('pop', () => {
    it('should pop elements from stack in LIFO order', () => {
      const stack = new Stack<number>();
      stack.push(1);
      stack.push(2);
      stack.push(3);

      expect(stack.pop()).toBe(3);
      expect(stack.getSize()).toBe(2);

      expect(stack.pop()).toBe(2);
      expect(stack.getSize()).toBe(1);

      expect(stack.pop()).toBe(1);
      expect(stack.getSize()).toBe(0);
    });

    it('should return null when popping from empty stack', () => {
      const stack = new Stack<number>();
      expect(stack.pop()).toBeNull();
      expect(stack.getSize()).toBe(0);
    });

    it('should handle mixed push and pop operations', () => {
      const stack = new Stack<number>();

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
    it('should return top element without removing it', () => {
      const stack = new Stack<number>();
      stack.push(1);
      stack.push(2);

      expect(stack.peek()).toBe(2);
      expect(stack.getSize()).toBe(2); // Size unchanged
      expect(stack.pop()).toBe(2); // Still can pop the same element
    });

    it('should return null when peeking empty stack', () => {
      const stack = new Stack<number>();
      expect(stack.peek()).toBeNull();
    });
  });

  describe('isEmpty', () => {
    it('should correctly report empty status', () => {
      const stack = new Stack<number>();
      expect(stack.isEmpty()).toBe(true);

      stack.push(1);
      expect(stack.isEmpty()).toBe(false);

      stack.pop();
      expect(stack.isEmpty()).toBe(true);
    });
  });

  describe('getSize', () => {
    it('should return correct size', () => {
      const stack = new Stack<number>();
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
    it('should not throw error when called', () => {
      const stack = new Stack<number>();
      expect(() => stack.printStack()).not.toThrow();

      stack.push(1);
      stack.push(2);
      expect(() => stack.printStack()).not.toThrow();
    });

    it('should handle empty stack in print', () => {
      const stack = new Stack<number>();
      expect(() => stack.printStack()).not.toThrow();
    });
  });

  describe('Integration tests', () => {
    it('should work with string type', () => {
      const stack = new Stack<string>();

      stack.push('a');
      stack.push('b');
      stack.push('c');

      expect(stack.pop()).toBe('c');
      expect(stack.peek()).toBe('b');
      expect(stack.getSize()).toBe(2);
    });

    it('should handle complex objects', () => {
      const stack = new Stack<{ name: string; age: number }>();
      const person1 = { name: 'Alice', age: 25 };
      const person2 = { name: 'Bob', age: 30 };

      stack.push(person1);
      stack.push(person2);

      expect(stack.pop()).toEqual(person2);
      expect(stack.peek()).toEqual(person1);
    });
  });
});