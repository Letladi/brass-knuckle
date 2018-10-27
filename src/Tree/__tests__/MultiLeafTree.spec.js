const MultiLeafTree = require('../MultiLeafTree')
const LinkedList = require('../../List/LinkedList')
const {
  valueGenerator,
  duplicateValueGenerator,
  addDuplicateValues,
  testWithDifferentKeyInsertionOrders
} = require('./util')
const {
  leaveCount
} = require('../treeUtils')

describe('MultiLeafTree', () => {
  performGenericMultiLeafTreeTests(MultiLeafTree)
})

function performGenericMultiLeafTreeTests(TreeConstructor) {
  describe('#find', () => {
    testWithDifferentKeyInsertionOrders(testFind, TreeConstructor)
  })
  describe('#intervalFind', () => {
    testWithDifferentKeyInsertionOrders(testIntervalFind, TreeConstructor)
  })
  describe('#delete', () => {
    testWithDifferentKeyInsertionOrders(testDeletion, TreeConstructor)
  })
  describe('#insert', () => {
    testWithDifferentKeyInsertionOrders(testInsertion, TreeConstructor)
  })
  describe('#set', () => {
    testWithDifferentKeyInsertionOrders(testSetMethod, TreeConstructor)
  })
}

module.exports = performGenericMultiLeafTreeTests

function testFind(getTree) {
  const numEl = 100
  const duplicateNumEl = Math.floor(numEl / 4)
  it('returns empty linked list if there are no values associated with the given key (when tree is empty)', () => {
    const tree = getTree(0)
    const randomKeyVal = 1
    const values = tree.find(randomKeyVal)
    expect(values.length).toEqual(0)
  })
  it('returns empty linked list if there are no values associated with the given key (when key does not exist in the tree)', () => {
    const tree = getTree(numEl)
    const nextKey = numEl + 1
    const values = tree.find(nextKey)
    expect(values.length).toEqual(0)
  })
  it('returns linked list of values associated with the given key', () => {
    const tree = getTree(numEl)
    addDuplicateValues(tree, duplicateNumEl)
    let i = duplicateNumEl
    while (i) {
      const values = tree.find(i)
      expect(values instanceof LinkedList).toEqual(true)
      expect(values.entries()).toEqual([valueGenerator(i), duplicateValueGenerator(i)])
      i--
    }
  })
  it('returns an array of values associated with the given key if the "lazy" argument is set to false', () => {
    const tree = getTree(numEl)
    addDuplicateValues(tree, duplicateNumEl)
    let i = duplicateNumEl
    while (i) {
      expect(tree.find(i, false)).toEqual([valueGenerator(i), duplicateValueGenerator(i)])
      i--
    }
  })
}

function testIntervalFind(getTree) {
  const numEl = 100
  const duplicateNumEl = Math.floor(numEl / 4)
  it('returns a linked list of the pointers in the interval (the value of each node being a linked list)', () => {
    const tree = getTree(numEl)
    addDuplicateValues(tree, duplicateNumEl)

    const intervalStart = Math.floor(duplicateNumEl / 2)
    const intervalEnd = intervalStart + 10

    const interval = tree.intervalFind(intervalStart, intervalEnd)
    let i = intervalEnd - 1
    interval.each(({ key,  valueList }) => {
      expect(valueList instanceof LinkedList).toEqual(true)
      expect(key).toEqual(i)
      expect(valueList.entries()).toEqual([valueGenerator(i), duplicateValueGenerator(i)])
      i--
    })
  })
  it('returns empty linked list if there are no elements in the specified interval', () => {
    const tree = getTree(numEl)
    addDuplicateValues(tree, duplicateNumEl)

    const intervalStart = numEl + 2
    const intervalEnd = intervalStart + 10

    const interval = tree.intervalFind(intervalStart, intervalEnd)
    expect(interval.isEmpty()).toEqual(true)
  })
  it('excludes elements equal to the closing interval key', () => {
    const tree = getTree(numEl)
    addDuplicateValues(tree, duplicateNumEl)

    const intervalStart = Math.floor(numEl / 2)
    const intervalEnd = intervalStart + 10

    const interval = tree.intervalFind(intervalStart, intervalEnd)
    expect(interval.length).toEqual(intervalEnd - intervalStart) // one less than the interval size
  })
}

function testDeletion(getTree) {
  const numEl = 100
  const duplicateNumEl = Math.floor(numEl / 4)
  const numToDelete = duplicateNumEl
  it('returns empty linked list if deletion failed (when tree is empty)', () => {
    const tree = getTree(0)
    const randomKey = 1
    const valueList = tree.delete(randomKey)
    expect(valueList.length).toEqual(0)
  })
  it('returns empty linked list if deletion failed (when key does not exist in the tree)', () => {
    const tree = getTree(numEl)
    const nextKey = numEl + 1
    const valueList = tree.delete(nextKey)
    expect(valueList.length).toEqual(0)
  })
  it('returns a LinkedList of the values for the given key', () => {
    const tree = getTree(numEl)
    addDuplicateValues(tree, duplicateNumEl)
    let i = duplicateNumEl
    while (i) {
      const valueList = tree.delete(i)
      expect(valueList.entries()).toEqual([valueGenerator(i), duplicateValueGenerator(i)])
      i--
    }
  })
  it('removes all values associated with the given key', () => {
    const tree = getTree(numEl)
    addDuplicateValues(tree, duplicateNumEl)
    let i = duplicateNumEl
    while (i) {
      const valueList = tree.delete(i)
      expect(valueList.length).toEqual(2)
      const valueListAfterDeletion = tree.delete(i)
      expect(valueListAfterDeletion.length).toEqual(0)
      i--
    }
  })
}

function testInsertion(getTree) {
  const numEl = 100
  it('increases the leaveCount for each unique key insert', () => {
    let oldLeaveCount = 0
    getTree(numEl, (tree) => {
      expect(leaveCount(tree)).toEqual(oldLeaveCount + 1)
      oldLeaveCount = leaveCount(tree)
    })
  })
  it('does not increase leaveCount for subsequent inserts of similar key values', () => {
    const duplicateNumEl = 20
    const tree = getTree(numEl)
    const oldLeaveCount = leaveCount(tree)
    addDuplicateValues(tree, duplicateNumEl, (tree) => {
      expect(leaveCount(tree)).toEqual(oldLeaveCount)
    })
  })
}

function addDuplicates(tree, key, numDups) {
  const values = []
  while (numDups) {
    const val = `dup-${numDups--}`
    tree.insert(key, val)
    values.push(val)
  }
  return values
}

function testSetMethod(getTree) {
  it('replaces the old value(s) with a new value', () => {
    const numEl = 20
    const tree = getTree(numEl)
    const numDups = 4
    const keyToReplace = Math.floor(numEl / 2)
    const originalValue = tree.find(keyToReplace, false)
    const duplicatesValues = addDuplicates(tree, keyToReplace, numDups)
    const expectedValues = originalValue.concat(duplicatesValues)
    expect(tree.find(keyToReplace, false)).toEqual(expectedValues)
    const newVal = 'new-val'
    tree.set(keyToReplace, newVal)
    expect(tree.find(keyToReplace, false)).toEqual([newVal])
  })
}
