module.exports = function binarySearch(arr, query) {
  let min = 0;
  let max = arr.length - 1;

  while (min <= max) {
    let current = Math.floor((max + min) / 2);
    if (arr[current] < query) {
      min = current + 1;
    } else if (arr[current] > query) {
      max = current - 1;
    } else {
      return current;
    }
  }

  return -1;
}

