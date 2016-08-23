module.exports = function flatten(arr) {
  let output = [];

  let queue = [].concat(arr);
  while (queue.length) {
    let o = queue.pop();
    if (o instanceof Array) {
      queue = queue.concat(o);
    } else {
      output.push(o);
    }
  }

  return output.reverse();
};
