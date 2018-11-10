Advanced Data Structures for JavaScript
=======================================
<p align="center">
  <a href="https://circleci.com/gh/Letladi/brass-knuckles">
    <img src="https://circleci.com/gh/Letladi/brass-knuckles.svg?style=svg" alt="Build Status">
  </a>
</p>

This project is under active development ⚡️
-------------------------------------------

Brass-Knuckles provides many [data structures][]. From the basics like: `Stack`, `Queue`,
`LinkedList`, `OrderedLinkedList` and `DoublyLinkedList`.

There are different kinds of `Tree` structures. The trees follow the 'leaf tree' model,
that is, all data is stored in the leaf nodes of the tree.

`LeafTree` defines the base class on which most of the trees are based.
`MultiLeafTree` is subclass of `LeafTree` that allows duplicate insertions into the tree.

`WeightBalancedLeafTree`, `HeightBalancedLeafTree` are [balanced search trees][] that subclass `LeafTree`.
`WeightBalancedMultiLeafTree`, `HeightBalancedMultiLeafTree` are balanced search trees that subclass `MultiLeafTree`.

 `abTree` is a type of [BTree][].
 `rbTree` is a [red black tree][]



[BTree]: https://en.wikipedia.org/wiki/B-tree
[balanced search trees]: https://en.wikipedia.org/wiki/Self-balancing_binary_search_tree
[red black tree]: https://en.wikipedia.org/wiki/Red%E2%80%93black_tree
[data structures]: https://www.amazon.com/Advanced-Data-Structures-Peter-Brass/dp/0521880378/ref=sr_1_2?ie=UTF8&qid=1541833203&sr=8-2&keywords=advanced+data+structures


License
-------

Brass-Knucles is [MIT-licensed](https://opensource.org/licenses/MIT).
