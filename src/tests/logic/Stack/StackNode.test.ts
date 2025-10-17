import StackNode from "../../../logic/Stack/StackNode";

describe('StackNode', () => {
  it('Если создается узел со значением, то он содержит это значение и next=null', () => {
    // Arrange & Act
    const node = new StackNode(42);

    // Assert
    expect(node.value).toBe(42);
    expect(node.next).toBeNull();
  });

  it('Если устанавливается связь между узлами через next, то узлы корректно связываются', () => {
    // Arrange
    const node1 = new StackNode('A');
    const node2 = new StackNode('B');

    // Act
    node1.next = node2;

    // Assert
    expect(node1.next).toBe(node2);
    expect(node1.next.value).toBe('B');
    expect(node2.next).toBeNull();
  });

  it('Если создаются узлы с generic типами, то они корректно работают с разными типами данных', () => {
    // Arrange & Act
    const objectNode = new StackNode({ key: 'value' });
    const arrayNode = new StackNode([1, 2, 3]);

    // Assert
    expect(objectNode.value.key).toBe('value');
    expect(arrayNode.value).toEqual([1, 2, 3]);
  });
});