# combine-callbacks

Combine multiple callbacks into one. Divide up code into smaller units. Improve the reusability & make the code clearer.

## Installation

```bash
npm install combine-callbacks
```

## Usage

```js
var combineCallbacks = require('combine-callbacks');

var preventDefault = function(evt) { evt.preventDefault(); };
var dispatchAction = function() { ... };

var onClick = combineCallbacks(preventDefault, dispatchAction);
document.getElementById('elem').addEventListner('click', onClick);
```

## API

### combineCallbacks(fn1[, fn2[, fn3...]])
Returns the final combined callback which receives arguments & context, and then passes them into the original functions.

### combineCallbacks(arrayOfFuncs)
You got the idea.

## License

MIT License, Copyright (c) 2015 Riophae Lee
