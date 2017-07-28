const sequence = (list) => (cb) => {
  const next = (fns) => {
    return (err, data) => {
      if (!fns.length || err != null) {
        cb(err, data);
      } else {
        fns[0](next(fns.slice(1)), data);
      }
    };
  };

  list[0](next(list.slice(1)));
};

const parallel = (fns) => (cb) => {
  const complete = [];
  let completed = 0;
  const done = (i) => (err, data) => {
    complete[i] = data;
    completed++;
    if (completed >= fns.length) {
      cb(null, complete);
    }
  };

  fns.forEach((fn, i) => {
    fn(done(i));
  });
};

const race = (fns) => (cb) => {
  let complete = [];
  let first = null;
  const done = (i) => (err, data) => {
    if (first == null) {
      first = i;
    }

    complete[i] = data;
    cb(null, complete[first]);
  };

  fns.forEach((fn, i) => fn(done(i)));
};

exports.sequence = sequence;
exports.parallel = parallel;
exports.race = race;
