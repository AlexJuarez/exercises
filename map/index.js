module.exports = function map(arr, fn, ctx) {
  var output = [];

  for (var i = 0; i < arr.length; i++) {
    output.push(fn.call(ctx, arr[i], i, arr));
  }

  return output;
};
