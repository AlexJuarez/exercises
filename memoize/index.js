module.exports = function (fn) {
  var results = {};

  return function() {
    var args = Array.prototype.slice.call(arguments);
    var key = args.join('');
    if(!results.hasOwnProperty(key)) {
      results[key] = fn.apply(this, arguments);
    }

    return results[key];
  }
}
