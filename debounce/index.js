module.exports = function (fn, interval) {
  var waiting = false;
  var fnWrapper;

  return function() {
    var that = this;
    var args = arguments;

    fnWrapper = function () {
      fn.apply(that, args)
    }

    if (!waiting) {
      waiting = true;
      setTimeout(function () {
        fnWrapper();
        waiting = false;
      }, interval);
    }
  }

}
