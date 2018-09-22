const assert = require('assert')
const {
  testKeyOrder,
  testWithDifferentKeyInsertionOrders
} = require('./util')
const { weight } = require('../treeUtils')
const Tree = require('../WeightBalancedLeafTree')

describe('WeightBalancedLeafTree', () => {
  describe('tree properties', () => {
    testWithDifferentKeyInsertionOrders(testTreeProperties, Tree)
  })
  describe('#insert', () => {
    testWithDifferentKeyInsertionOrders(testInsertion, Tree)
  })
  xdescribe('#delete')
})

function testTreeProperties(getTree) {
  const computeMinLeaveCount = (height, alpha) => {
    return (1 / (1 - alpha)) ** height
  }
  const computeMaxHeight = (leaveCount, alpha) => {
    return (1 / Math.log2(1 / (1 - alpha))) * Math.log2(leaveCount)
  }

  const numEl = 100
  test('if height = h >= 2; leaveCount >= (1 / 1-α)^h', () => {
    const tree = getTree(numEl)
    assert(tree.height >= 2, 'height must be greater than 2')
    expect(tree.leaveCount).toBeGreaterThanOrEqual(computeMinLeaveCount(tree.height, tree.alpha))
  })
  const maxHeightFormula = 'log(1 / 1-α)n = (1 / log2(1 / 1-α)) * log2n'
  test(`if leaveCount = n; height <= ${ maxHeightFormula } `, () => {
    const tree = getTree(numEl)
    expect(tree.height).toBeLessThanOrEqual(computeMaxHeight(tree.leaveCount, tree.alpha))
  })
}

function testInsertion(getTree) {
  const numEl = 100
  it('returns true if insertion succeeded', () => {
    const tree = getTree(1)
    const nextKey = numEl + 1
    expect(tree.insert(nextKey, 'nextKey')).toEqual(true)

  })
  it('returns false if insertion failed (like when key already exists in the tree)', () => {
    const tree = getTree(numEl)
    const existingKey = Math.floor(numEl / 2)
    expect(tree.insert(existingKey, 'existingKey')).toEqual(false)
  })
  testBalanceCriteria(() => getTree(numEl))
  testKeyOrder(() => getTree(numEl))
}

const isBalanced = (node, alpha) => {
  return weight(node.left) >= alpha * weight(node) &&
    weight(node.right) >= alpha * weight(node)
}
function testBalanceCriteria(getTree, beforeVerification = (tree) => tree) {
  it('maintains tree balance criteria', () => {
    const tree = getTree()
    beforeVerification(tree)
    tree.traverse((node) => {
      if (!node.isLeaf()) {
        expect(isBalanced(node, tree.alpha)).toEqual(true)
      } else {
        expect(weight(node)).toEqual(1)
      }
    })
  })
}
