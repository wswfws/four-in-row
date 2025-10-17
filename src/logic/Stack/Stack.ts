import StackNode from "./StackNode";

class Stack<T> {
  private readonly top: null | StackNode<T>;
  private readonly size: number;

  constructor(top: null | StackNode<T> = null, size: number = 0) {
    this.top = top;
    this.size = size;
  }

  push(value: T): Stack<T> {
    const newNode = new StackNode<T>(value);
    newNode.next = this.top;
    return new Stack(newNode, this.size + 1);
  }

  pop(): [T | null, Stack<T>] {
    if (this.isEmpty()) {
      return [null, this];
    }
    const poppedValue = this.top!.value;
    const newTop = this.top!.next;
    const newStack = new Stack(newTop, this.size - 1);
    return [poppedValue, newStack];
  }

  peek(): T | null {
    return this.isEmpty() ? null : this.top!.value;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  getSize(): number {
    return this.size;
  }

  toString(): string {
    let current = this.top;
    let stackValues = [];
    while (current) {
      stackValues.push(current.value);
      current = current.next;
    }
    return stackValues.join(" -> ");
  }
}

export default Stack;