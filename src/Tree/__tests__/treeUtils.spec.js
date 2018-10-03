const util = require('../treeUtils')
const Node = require('../LeafTreeNode')

describe('tree utilities', () => {
  describe('copyNode(target, src)', () => {
    it('copies (key, left, right) properties from the target into the source node', () => {
      const left = new Node(1, 'left')
      const right = new Node(2, 'right')
      const src = new Node(3, left, right)
      const target = new Node(4)
      util.copyNode(target, src)
      expect(target.key).toEqual(3)
      expect(target.left).toEqual(left)
      expect(target.right).toEqual(right)
    })
  })

  describe('swapKeys(node1, node2)', () => {
    it('swaps the keys of the nodes', () => {
      const node1 = new Node(1, 'one')
      const node2 = new Node(2, 'two')
      const originalNode1Key = node1.key
      const originalNode2Key = node2.key
      util.swapKeys(node1, node2)
      expect(node1.key).toEqual(originalNode2Key)
      expect(node2.key).toEqual(originalNode1Key)
    })

  })

  describe('height(node)', () => {
    it("= 0 if it's a leaf", () => {
      const node = new Node(1, 'one')
      expect(util.height(node)).toEqual(0)
    })
    it("= 1 + Math.max(left.height, right.height) if it's not a leaf", () => {
      const node0 = new Node(1, 'one')
      const node1 = new Node(2, 'two')
      const node2 = new Node(3, node0, node1)
      const node3 = new Node(4, 'four')
      const testNode = new Node(5, node2, node3)

      expect(util.height(testNode)).toEqual(2)
    })
  })

  describe('rotateRight(node)', () => {
    test('throws exception if node is not interior node', () => {
      const node = new Node(1, 'one')
      expect(() => util.rotateRight(node)).toThrow()
    })
    test('throws exception if node.left is not interior node', () => {
      const node1 = new Node(1, 'one')
      const node2 = new Node(2, 'two')
      const node = new Node(1, node1, node2)
      expect(() => util.rotateRight(node)).toThrow()
    })
    it('swaps the keys of node and node.left', () => {
      const node = getNodeThatIsReadyForRotation()

      const leftRef = node.left
      const leftKey = leftRef.key
      const nodeKey = node.key

      util.rotateRight(node)
      expect(leftRef.key).toEqual(nodeKey)
      expect(node.key).toEqual(leftKey)
    })
    it('node.left becomes node.right', () => {
      const node = getNodeThatIsReadyForRotation()

      const leftRef = node.left
      util.rotateRight(node)
      expect(node.right).toEqual(leftRef)
    })
    it('node.left.left becomes node.left', () => {
      const node  = getNodeThatIsReadyForRotation()

      const leftLeftRef = node.left.left
      util.rotateRight(node)
      expect(node.left).toEqual(leftLeftRef)
    })
    it('node.right becomes the right child of node.left', () => {
      const node = getNodeThatIsReadyForRotation()
      const rightRef = node.right
      const leftRef = node.left
      util.rotateRight(node)
      expect(leftRef.right).toEqual(rightRef)
    })
    it('node.left.right becomes the left child of node.left', () => {
      const node = getNodeThatIsReadyForRotation()
      const leftRightRef = node.left.right
      const leftRef = node.left
      util.rotateRight(node)
      expect(leftRef.left).toEqual(leftRightRef)
    })
  })

  describe('rotateLeft()', () => {
    it('throws exception if node is not interior node', () => {
      const node = new Node(1, 'one')
      expect(() => util.rotateLeft(node)).toThrow()
    })
    it('throws exception if node.right is not interior node', () => {
      const node1 = new Node(1, 'one')
      const node2 = new Node(2, 'two')
      const node = new Node(3, node1, node2)
      expect(() => util.rotateLeft(node)).toThrow()
    })
    it('swaps the keys of node and node.right', () => {
      const node = getNodeThatIsReadyForRotation()
      const rightKeyRef = node.right
      const rightKey = node.right.key
      const nodeKey = node.key
      util.rotateLeft(node)
      expect(node.key).toEqual(rightKey)
      expect(rightKeyRef.key).toEqual(nodeKey)
    })
    it('node.right becomes node.left', () => {
      const node = getNodeThatIsReadyForRotation()
      const rightRef = node.right
      util.rotateLeft(node)
      expect(node.left).toEqual(rightRef)
    })
    it('node.right.right becomes node.right', () => {
      const node = getNodeThatIsReadyForRotation()
      const rightRightRef = node.right.right
      util.rotateLeft(node)
      expect(node.right).toEqual(rightRightRef)
    })
    it('node.left becomes node.right.left', () => {
      const node = getNodeThatIsReadyForRotation()
      const leftRef = node.left
      const rightRef = node.right
      util.rotateLeft(node)
      expect(rightRef.left).toEqual(leftRef)
    })
    it('node.right.left becomes node.left.right', () => {
      const node = getNodeThatIsReadyForRotation()
      const rightLeftRef = node.right.left
      util.rotateLeft(node)
      expect(node.left.right).toEqual(rightLeftRef)
    })
  })

  describe('weight(node)', () => {
    it('= 1 for leaf node', () => {
      const node = new Node(1, 'one')
      expect(util.weight(node)).toEqual(1)
    })
    it('=weight(node.left)+ weight(node.right) for interior node', () => {
      const node1 = new Node(1, 'one')
      const node2 = new Node(2, 'two')
      const node = new Node(3, node1, node2)
      expect(util.weight(node)).toEqual(2)
    })
  })
})

function getNodeThatIsReadyForRotation() {
  const node1 = new Node(1, 'one')
  const node2 = new Node(2, 'two')
  const node3 = new Node(3, 'three')
  const node4 = new Node(4, 'four')

  const node5 = new Node(5, node1, node2)
  const node6 = new Node(6, node3, node4)

  return new Node(3, node5, node6)
}
