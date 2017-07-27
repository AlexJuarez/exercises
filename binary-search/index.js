module.exports = (arr, item) => {
  let min = 0;
  let max = arr.length - 1;
  let mid;
  let element;
  
  while (min <= max) {
    mid = Math.floor((min + max)/2);
    element = arr[mid];
    if (element < item) {
      min = mid + 1;
    } else if (element > item) {
      max = mid - 1;
    } else {
      return mid;
    }
  }

  return -1;
}
