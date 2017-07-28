module.exports = (fn) =>  {
  let curr = fn;
  while (curr instanceof Function) {
    curr = curr();
  }

  return curr;
};
