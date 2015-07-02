module.exports = Middleware;

function Middleware() {
  this.fns = [];
};

Middleware.prototype = {
  use: function(fn) {
    this.fns.push(fn);
  },
  go: function(callback) {
    var counter = 0;
    var that = this;
    function next(){
      if (counter >= that.fns.length) {
        callback.call(that);
      } else {
        that.fns[counter].call(that, next);
      }
      counter++;
    }
    next();
  }
};
