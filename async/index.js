function sequence(fns) {
  var output;
  var counter = 0;
  var fin;
  var error;
  
  function complete() {
    if(fin) {
      if(counter === fns.length) {
        fin(null, output);
      } else if(error) {
        fin(error, output);
      }
    }
  }

  function done(err, result) {
    counter++;
    if (!err) {
      output = result;
      if(counter < fns.length){
        fns[counter](done, output);
      }
    } else {
      error = err;
    }
    complete();
  }

  fns[counter](done);

  return function(done) {
    fin = done;
    complete();
  }
}

function parallel(fns) {
  var output = new Array(fns.length);
  var completed = 0;
  var externalCallback;
  var errors = []; 

  function complete() {
    if(externalCallback && completed === fns.length) {
      if(!errors.length) {
        externalCallback(null, output)
      } else {
        externalCallback(errors, output);
      }
    }
  }

  for (var i = 0; i < fns.length; i++) {
    (function (counter) {
      function cb(err, results){
        completed++;
        if(!err) {
          output[counter] = results;
        } else {
          errors[counter] = err;
        }
        complete();
      }
      fns[counter](cb);
    })(i);
  }

  return function(done) {
    externalCallback = done;
    complete();
  }
}

function race(fns) {
  var results;
  var errs;
  var fin;
  var complete = false;
  function cb(err, result) {
    if (!complete) {
      if (fin) {
        fin(err, result);
      }
      errs = err;
      results = result;
      complete = true;
    }
  }

  for (var i = 0; i < fns.length; i++) {
    fns[i](cb);
  }

  return function (done) {
    if (complete) {
      done(errs, results);
    } else {
      fin = done;
    }
  }
}

module.exports = {
  sequence: sequence,
  parallel: parallel,
  race: race
};
