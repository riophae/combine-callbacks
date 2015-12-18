var test = require('tape')
var combineCallbacks = require('..')

function id(cb) {
  return function(x) { cb(x) }
}

function plus(cb) {
  return function(x, y) { cb(x + y) }
}

function getCtx(cb) {
  return function(v) {
    cb([ v, this ])
  }
}

function done(t, expected, msg) {
  return function(v) {
    if (Array.isArray(expected)) {
      t.deepEqual(v, expected, msg)
    } else {
      t.equal(v, expected, msg)
    }
  }
}

test('basic', function(t) {
  t.plan(2)

  var x = 2
  var y = 3

  var combination = combineCallbacks(id(done(t, x)), plus(done(t, x + y)))
  combination(x, y)
})

test('array of callbacks', function(t) {
  t.plan(2)

  var x = 2
  var y = 3

  var combination = combineCallbacks([ id(done(t, x)), plus(done(t, x + y)) ])
  combination(x, y)
})

test('with context', function(t) {
  t.plan(1)

  var ctx = { foo: 'bar' }
  var arg = 'x'

  var combination = combineCallbacks(getCtx(done(t, [ arg, ctx ])))
  combination.call(ctx, arg)
})

test('should run in order of passed functions', function(t) {
  var expected = [ 1, 2, 3, 4, 5 ]
  var funcs = []
  var arr = []

  expected.forEach(function(n) {
    funcs.push(function() {
      arr.push(n)
    })
  })

  var combination = combineCallbacks(funcs)
  combination()

  t.deepEqual(arr, expected)
  t.end()
})

test('nested usage', function(t) {
  var expected = [ 1, 2, 3, 4, 5 ]
  var arr = []
  var noop = function noop() {}

  var combination = expected.reduce(function(f, n) {
    return combineCallbacks(f, function() {
      arr.push(n)
    })
  }, noop)

  combination()
  t.deepEqual(arr, expected)
  t.end()
})
