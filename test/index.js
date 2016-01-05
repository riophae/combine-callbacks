'use strict'

var test = require('tape')
var combineCallbacks = require('..')

function id(cb) {
  return function(x) { cb(x) }
}

function add(cb) {
  return function(x, y) { cb(x + y) }
}

function context(cb) {
  return function(v) { cb([ this, v ]) }
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

  var combination = combineCallbacks(id(done(t, x)), add(done(t, x + y)))
  combination(x, y)
})

test('array of callbacks', function(t) {
  t.plan(2)

  var x = 2
  var y = 3

  var combination = combineCallbacks([ add(done(t, x + y)), id(done(t, x)) ])
  combination(x, y)
})

test('with context', function(t) {
  t.plan(1)

  var ctx = { foo: 'bar' }
  var arg = 'x'

  var combination = combineCallbacks(context(done(t, [ ctx, arg ])))
  combination.call(ctx, arg)
})

test('should run in order of passed functions', function(t) {
  var expected = [ 0, 1, 2, 3, 4 ]
  var arr = []
  var funcs = expected.map(function(n) {
    return function() { arr.push(n) }
  })

  var combination = combineCallbacks(funcs)
  combination()

  t.deepEqual(arr, expected)
  t.end()
})

test('nested usage', function(t) {
  var expected = [ 0, 1, 2, 3, 4 ]
  var arr = []
  var seed = function noop() {}

  var combination = expected.reduce(function(f, n) {
    return combineCallbacks(f, function() { arr.push(n) })
  }, seed)
  combination()

  t.deepEqual(arr, expected)
  t.end()
})
