const LeafTreeNode = require('../LeafTreeNode')

const RED = Symbol('red')
const BLACK = Symbol('black')

class Node extends LeafTreeNode {
  constructor(key, left, right) {
    super(key, left, right)
    this.turnRed()
  }

  turnRed() {
    this.color = RED
  }

  get isRed() {
    return this.color === RED
  }

  turnBlack() {
    return this.color = BLACK
  }

  get isBlack() {
    return this.color === BLACK
  }
}

module.exports = Node