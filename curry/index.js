module.exports = function (fn) {
  var length = fn.length;
  return (function curry() {
    var that = this;
    return function () {
      var args = that.args.concat(Array.prototype.slice.call(arguments));
      if (length > args.length) {
        return curry.apply({args: args});
      } else {
        return fn.apply(that, args);
      }
    }
  }).apply({args: []}, arguments);
}
