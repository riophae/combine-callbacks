module.exports = combineCallbacks

var forEach = Array.prototype.forEach

function combineCallbacks(arg0) {
  var callbacks = Array.isArray(arg0) ? arg0 : arguments

  return function combination() {
    var args = arguments
    var ctx = this

    forEach.call(callbacks, function(cb) {
      cb.apply(ctx, args)
    })
  }
}
