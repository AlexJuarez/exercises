module.exports = function flatten(arr) {
  var output = [];

  return flattenHelper(arr, output);
};

function flattenHelper(arr, output) {
  var o;
  for (var i = 0; i < arr.length; i++) {
    o = arr[i];
    //Check to see if the item is an array
    if (typeof o === "object" && typeof o.length === "number") {
      flattenHelper(o, output);
    } else {
      output.push(o);
    }
  }

  return output;
};
