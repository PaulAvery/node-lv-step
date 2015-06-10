/* eslint-env mocha */
'use strict';

var levenshtein = require('../lib/lv-step');

describe('The .matrix method', function() {
	it('returns a correct matrix', function() {
		var mtrx = [[0, 1, 2, 3, 4],
					[1, 1, 2, 3, 4],
					[2, 2, 1, 2, 3],
					[3, 3, 2, 1, 2],
					[4, 4, 3, 2, 2],
					[5, 5, 4, 3, 3],
					[6, 6, 5, 4, 4]];

		var from = 'tree'.split('');
		var to = 'freddy'.split('');
		var matrix = levenshtein.matrix(from, to, function(a, b) { return a === b; });
		matrix.must.eql(mtrx);
	});
});

describe('The .distance method', function() {
	it('returns the correct distance', function() {
		levenshtein.distance([[0, 1], [1, 2]]).must.be(2);
	});
});

describe('The .steps method', function() {
	it('returns the correct steps', function() {
		var target = [
			{ type: levenshtein.types.REPLACE, value: 'f', position: 0 },
			{ type: levenshtein.types.KEEP, value: 'r', position: 1 },
			{ type: levenshtein.types.KEEP, value: 'e', position: 2 },
			{ type: levenshtein.types.ADD, value: 'd', position: 3 },
			{ type: levenshtein.types.ADD, value: 'd', position: 3 },
			{ type: levenshtein.types.REPLACE, value: 'y', position: 3 }
		];

		var from = 'tree'.split('');
		var to = 'freddy'.split('');
		var matrix = levenshtein.matrix(from, to, function(a, b) { return a === b; });
		var steps = levenshtein.steps(matrix, to);

		steps.must.eql(target);
	});
});
