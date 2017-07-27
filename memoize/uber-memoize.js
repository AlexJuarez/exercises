const memoize = (asyncFunc) => {
  let results = {};
  let called = {};
  let cbs = {};
  
  return (...args) => {
    const done = args.slice(-1).pop();
    const key = JSON.stringify(args.slice(0, -1));

    if (cbs[key] == null) {
      cbs[key] = [];
    }

    if (results[key] != null) {
      done.apply(null, results[key]);
    } else {
      cbs[key].push(done);

      const cb = (...args) => {
        results[key] = args;
        
        cbs[key].forEach((fn) => fn.apply(null, args));
        cbs[key] = [];
      }

      if (called[key] == null) {

        asyncFunc.apply(null, [...args.slice(0, -1), cb]);
      } 
      called[key] = true;
    }
  }
}

const asyncFn = (x, callback) => {
  setTimeout(() => {
    console.log("expensive call")
    callback(null, x + " DOG");
  }, 10);
}

const memoizedAsyncFn = memoize(asyncFn);

const cb = (err, result) => console.log(result);

setTimeout(() => {
  memoizedAsyncFn(1, cb);
  memoizedAsyncFn(1, cb);
}, 10);

memoizedAsyncFn(2, cb);
memoizedAsyncFn(1, cb);

memoizedAsyncFn(1, cb);
