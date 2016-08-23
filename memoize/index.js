module.exports = function (fn) {
  var results = {};

  return function(...args) {
    var key = JSON.stringify(args);
    if(!results.hasOwnProperty(key)) {
      results[key] = fn.apply(this, arguments);
    }

    return results[key];
  }
};
