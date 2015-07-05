module.exports = throttlePromises;

function throttlePromises(limit, arr) {
  var results = {};
  var finished = false;
  var completed = 0;
    
  function resultsArry() {
    var output = [];
    for (var i = 0; i < arr.length; i++) {
      output.push(results[i]);
    }
    return output;
  }
  
  function make(fn, index) {
    function resolve(value) {
      results[index] = value;
      if (limit + completed < arr.length) {
        make(arr[limit + completed], limit + completed);
      }
      completed++;
      if (completed >= arr.length - 1) {
        finished = true;
        if (callback) {
          callback(resultsArry());
        }
      }
    }

    fn().then(resolve);
  }

  function then(cb) {
    callback = cb;

    if (finished) {
      callback(resultsArry());
    }
  }

  for (var i = 0; i < limit; i++) {
    make(arr[i], i);
  }

  return {
    then: then
  }
}
