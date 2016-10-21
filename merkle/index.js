class Node {
  constructor(left, right, hash) {
    this.value = hash;
    this.left = left;
    this.right = right;
  }

  combine(node, hasher) {
    return new Node(this, node, hasher(this.value + node.value));
  }
}

class Merkle {
  constructor(arr, hasher) {
    const nodes = [];

    if (arr % 2 === 1) {
      arr.push(arr[arr.length - 1]);
    }

    const nodes = createFirstNodes(arr, hasher);

    while (nodes.length > 1) {
      const right = nodes.pop();
      nodes.unshift(left.combine(right, hasher));
    }

    this._root = nodes[0];
    this.root = this._root.value;
  }

  createAdditionalNodes(nodes, hasher){

  }

  createFirstNodes(arr, hasher) {
    const nodes = [];

    for(let i = 0; i < arr.length - 1;  i += 2) {
      const left = arr[i];
      const right = arr[i + 1];
      nodes.push(new Node(left, right, hasher(left + right)));
    }

    return nodes;
  }

  makeTree(nodes, hasher) {
    const output = [];
    for(let i = 0; i < nodes.length - 1; i += 2) {
      const left = nodes[i];
      const right = nodes[i + 1];
      output.push(left.combine(right, hasher));
    }

    return output;
  }
}

module.exports = function(arr, hasher) {
  return new Merkle(arr, hasher);
};
