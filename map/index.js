module.exports = (arr, fn, thisArg) => {
  const output = [];

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    output[i] = fn.call(thisArg, item, i, arr);
  }

  return output;
}
