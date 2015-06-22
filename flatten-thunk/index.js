module.exports = function(fn) {
  var result;
  var error = null;
  var complete;
  var completed = false;

  function finish() {
    if(completed && complete) {
      complete(error, result);
    }
  }

  function cb(err, results) {
    if (!err && !completed) {
      if (typeof results === "function") {
        results(cb);
      } else {
        completed = true;
        result = results;
      }
    } else {
      error = err;
      completed = true;
    }
    finish();
  }

  fn(cb);

  return function(done) {
    complete = done;
    finish();
  }
}
