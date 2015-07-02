module.exports = function value(o) {
  if (o.call) return value(o());
  return o;
}
