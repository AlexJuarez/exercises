module.exports = function (fn, time) {
  var args;
  var lastCalled;
  var ctx;
  var timeout;
  
  return function () {
    ctx = this;
    args = [].slice.call(arguments);
    
    if (!lastCalled || ((new Date) - lastCalled > time && !timeout)) {
      lastCalled = new Date;
      fn.apply(ctx, args);
    }

    if (!timeout) {
      timeout = setTimeout(function() {
        lastCalled = new Date;
        fn.apply(ctx, args);
        timeout = null;
      }, time);
    }
  }
}
