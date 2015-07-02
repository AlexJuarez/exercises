module.exports = throttlePromises;

function throttlePromises(limit, arr) {
  this.results = {};
  this.finished = false;
  this.resultsArry = resultsArry;
  var completed = 0;
  var that = this;
    
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
      completed++;
      if (limit + completed < arr.length) {
        make(arr[limit + completed], limit + completed);
      }

      if (completed >= arr.length - 1) {
        that.finished = true;
        if (that.callback) {
          console.log(resultsArry());
          that.callback(resultsArry());
        }
      }
    }

    fn().then(resolve);
  }

  function then(callback) {
    that.callback = callback;

    if (that.finished) {
      callback(that.resultsArry());
    }
  }

  for (var i = 0; i < limit; i++) {
    make(arr[i], i);
  }

  return {
    then: then
  }
}
