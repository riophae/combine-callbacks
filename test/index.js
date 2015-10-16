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

  var combination = combineCallbacks(getCtx(done(t, [ ctx, ctx ])))
  combination.call(ctx, ctx)
})
