module.exports = (fn, delay) => {
  let timer = null;
  return function() {
    const args = [].slice.call(arguments);
    if (timer == null) {
      timer = setTimeout(() => fn.apply(this, args), delay);
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    }
  }
}
