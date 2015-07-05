module.exports = function itWill(fn) {
  var ctx = {};
  var testContainer = fn.call(ctx);
  var done = function() { testContainer.test.call(ctx); };

  testContainer.setup.call(ctx, done);
};
