module.exports = (fn) => {
  const curried = (arr) => (...args) => {
    if (fn.length <= (arr.length + args.length)) {
      return fn.apply(null, [...arr, ...args]);
    }

    return curried(arr.concat(args));
  }

  return curried([]);
}
