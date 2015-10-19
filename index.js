module.exports = combineCallbacks

var toArray = Function.prototype.apply.bind(Array.prototype.slice)

function combineCallbacks(arg0) {
  var callbacks = Array.isArray(arg0) ? arg0 : toArray(arguments)

  return function combination() {
    var args = arguments
    var ctx = this

    callbacks.forEach(function(cb) {
      cb.apply(ctx, args)
    })
  }
}
