module.exports = combineCallbacks

function combineCallbacks(arg0) {
  var callbacks = Array.isArray(arg0) ? arg0 : arguments

  return function combination() {
    var args = arguments
    var ctx = this

    for (var i = 0, len = callbacks.length; i < len; i++) {
      callbacks[i].apply(ctx, args)
    }
  }
}
