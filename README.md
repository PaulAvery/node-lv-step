# lv-step
[![Build Status](https://travis-ci.org/PaulAvery/node-lv-step.svg)](https://travis-ci.org/PaulAvery/node-lv-step)


This module provides methods to calculate the needed steps to transition from one list of things to another.

## Quickstart
**Example:**

```js
var lvstep = require('lv-step');
var from = 'tree'.split('');
var to = 'freddy'.split('');
var eq = function(a, b) {return a === b;};
var matrix = lvstep.matrix(from, to, eq);
var steps = lvstep.steps(matrix, to);
```

**Steps:**

```js
[
	{ type: levenshtein.type.REPLACE, value: 'f', position: 0 },
	{ type: levenshtein.type.KEEP, value: 'r', position: 1 },
	{ type: levenshtein.type.KEEP, value: 'e', position: 2 },
	{ type: levenshtein.type.ADD, value: 'd', position: 3 },
	{ type: levenshtein.type.ADD, value: 'd', position: 3 },
	{ type: levenshtein.type.REPLACE, value: 'y', position: 3 }
]
```

## API
### .matrix(source, destination, equalityCheck)
This function calculates a full levenshtein matrix as a two dimensional array. The `source` and `destination` attributes should both be Arrays.
An equality function must be passed as the third parameter, which should return `true` or `false` for any two objects.

```js
var matrix = lvstep.matrix(
	['t', 'r', 'e', 'e'],
	['f', 'r', 'e', 'd', 'd', 'y'],
	function(a, b) {return a===b;}
);
```

**Matrix**:

```js
[[0, 1, 2, 3, 4],
 [1, 1, 2, 3, 4],
 [2, 2, 1, 2, 3],
 [3, 3, 2, 1, 2],
 [4, 4, 3, 2, 2],
 [5, 5, 4, 3, 3],
 [6, 6, 5, 4, 4]]
```

### .distance(matrix)
A small utility function to get the levenshtein distance for a given matrix.

```js
//Returns 4
lvstep.distance(matrix);
```

### .steps(matrix, destination)
Given a levenshtein matrix and a destination array, this function returns a list of steps which by themselves be used to transition from the source to the destination array.

```js
var steps = lvstep.steps(matrix, ['f', 'r', 'e', 'd', 'd', 'y']);
```

**steps:**

```js
[
	{ type: levenshtein.types.REPLACE, value: 'f', position: 0 },
	{ type: levenshtein.types.KEEP, value: 'r', position: 1 },
	{ type: levenshtein.types.KEEP, value: 'e', position: 2 },
	{ type: levenshtein.types.ADD, value: 'd', position: 3 },
	{ type: levenshtein.types.ADD, value: 'd', position: 3 },
	{ type: levenshtein.types.REPLACE, value: 'y', position: 3 }
]
```

The types correspond to the following:

* `REPLACE`:
	Replace the entry at thes specified position with the given `value`

	```js
	arr[step.position] = step.value
	```

* `KEEP`:
	Do not modify the entry at the specified position

* `ADD`:
	Insert the `value` at the specified position

	```js
	arr.splice(step.position, 0, step.value);
	```

* `REMOVE`:
	Remove the entry at the specified position

	```js
	arr.splice(step.position, 1);
	```
