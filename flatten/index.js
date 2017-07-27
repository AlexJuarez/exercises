const flatten = (arr, o) => {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (!Array.isArray(item)) {
      o.push(item);
    } else {
      flatten(item, o);
    }
  }
}

module.exports = (arr) => {
  const output = [];
  flatten(arr, output);

  return output;
}
