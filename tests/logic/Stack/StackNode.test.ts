import StackNode from "../../../logic/Stack/StackNode";

describe('StackNode', () => {
  it('should create node with value and next=null', () => {
    const node = new StackNode(42);
    expect(node.value).toBe(42);
    expect(node.next).toBeNull();
  });

  it('should link nodes via next property', () => {
    const node1 = new StackNode('A');
    const node2 = new StackNode('B');

    node1.next = node2;

    expect(node1.next).toBe(node2);
    expect(node1.next.value).toBe('B');
    expect(node2.next).toBeNull();
  });

  it('should work with generic types', () => {
    const objectNode = new StackNode({ key: 'value' });
    expect(objectNode.value.key).toBe('value');

    const arrayNode = new StackNode([1, 2, 3]);
    expect(arrayNode.value).toEqual([1, 2, 3]);
  });
});