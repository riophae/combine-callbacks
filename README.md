# combine-callbacks

[![npm version](https://badge.fury.io/js/combine-callbacks.svg)](https://badge.fury.io/js/combine-callbacks) [![Build Status](https://travis-ci.org/riophae/combine-callbacks.svg)](https://travis-ci.org/riophae/combine-callbacks) [![Dependency Status](https://david-dm.org/riophae/combine-callbacks.svg)](https://david-dm.org/riophae/combine-callbacks)

Combine multiple callbacks into one. Divide up code into smaller units. Improve the reusability & make the code clearer.

## Installation

```bash
$ npm install combine-callbacks
```

## Usage

```js
var combineCallbacks = require('combine-callbacks');

var preventDefault = function(evt) { evt.preventDefault(); };
var dispatchAction = function() { ... };

var onClick = combineCallbacks(preventDefault, dispatchAction);
document.getElementById('elem').addEventListener('click', onClick);
```

## API

### combineCallbacks(fn1[, fn2[, fn3...]])
Returns the final combined callback which receives arguments & context, and then passes them into the original functions.

### combineCallbacks(arrayOfFuncs)
You get the idea.

## License

MIT License, Copyright (c) 2015 Riophae Lee
