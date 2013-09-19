/* global describe, it, expect, HashMap*/
describe('Splitting expression', function () {

	'use strict';

	var scrub = calc._scrub;


	var scrubCases = [
		{
			expression: '1 + 2',
			result: '1+2'
		},
		{
			expression: 'asd1 + asd2',
			result: '1+2'
		},
		{
			expression: '     	( as -)',
			result: '(-)'
		}
	];


	scrubCases.forEach(function (scrubCase) {
		var expression = scrubCase.expression;
		var result = scrubCase.result;
		it('should scrub "' + expression + '" to "' + result + '"', function () {

			expect(scrub(expression)).to.equal(result);
		});

	});


});

