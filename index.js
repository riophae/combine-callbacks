module.exports = combineCallbacks

function combineCallbacks(arg0) {
  var callbacks = Array.isArray(arg0) ? arg0 : arguments

  return function combination() {
    for (var i = 0, len = callbacks.length; i < len; i++) {
      callbacks[i].apply(this, arguments)
    }
  }
}
