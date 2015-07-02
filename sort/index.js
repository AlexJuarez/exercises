module.exports = function quickSort(arr) {
  var pivot = arr[0];

  var lessThan = [];
  var greaterThan = [];
  var equalTo = [];

  for (var i = 1; i < arr.length; i++) {
    if(arr[i] > pivot) {
      greaterThan.push(arr[i]);
    } else if (arr[i] < pivot) {
      lessThan.push(arr[i]);
    } else {
      equalTo.push(arr[i]);
    }
  }

  equalTo.push(pivot);

  if(lessThan.length > 1) {
    lessThan = quickSort(lessThan);
  }
  
  if(greaterThan.length > 1) {
    greaterThan = quickSort(greaterThan);
  }

  return Array.prototype.concat(lessThan, equalTo, greaterThan);
}
