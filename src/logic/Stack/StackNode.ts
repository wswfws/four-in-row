class StackNode<T> {
  public value: T;
  public next: null | StackNode<T>;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export default StackNode;