module.exports = function (fn) {
  var executed = false;

  return function () {
    if(!executed) {
      executed = true;
      fn.apply(this, arguments);
    }
  }

}
