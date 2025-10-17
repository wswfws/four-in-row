import StackNode from "./StackNode";


class Stack<T> {
  private top: null | StackNode<T>;
  private size: number;

  constructor() {
    this.top = null;
    this.size = 0;
  }

  push(value: T) {
    const newNode = new StackNode<T>(value);
    newNode.next = this.top;
    this.top = newNode;
    this.size++;
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }
    const poppedValue = this.top!.value;
    this.top = this.top!.next;
    this.size--;
    return poppedValue;
  }

  peek() {
    return this.isEmpty() ? null : this.top!.value;
  }

  isEmpty() {
    return this.size === 0;
  }

  getSize() {
    return this.size;
  }

  toString() {
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