/* global describe, it, expect, HashMap*/
describe('Main entry point', function () {

	'use strict';

	var evaluate = calc.evaluate;
	describe('Valid input', function () {


		var validCases = [
			{
				expression: '3+(1+1)',
				result: 5
			},
			{
				expression: '((3)+(1+1)(()()))',
				result: 5
			},
			{
				expression: '1 + 2 asd as',
				result: 3
			},
			{
				expression: '1+ 3 as + 	5+(1 sasd *3as s)+2*10',
				result: 32
			},
			{
				expression: 10 * 6,
				result: 60
			},
			{
				expression: '(1 +- 2)',
				result: -1
			},
			{
				expression: '(3)+(1)',
				result: 4
			},

			{
				expression: '(1)+()((1))*1+2*(1+(2)((())))',
				result: 8
			}

		];

		validCases.forEach(function (correctCase) {
			var expression = correctCase.expression;
			var result = correctCase.result;
			it('should correctly evaluate "' + expression + '" and return  "' + result + '"', function () {

				expect(evaluate(expression)).to.equal(result);
			});

		});

	});

	var invalid = [
		{
			expression: '1 + 2 asd as)',
			error: 'IncorrectlyNested'
		},
		{
			expression: '()()(',
			error: 'IncorrectlyNested'
		}

	];

	function expectThrows(expression, exception) {
		expect(function () {
			evaluate(expression);
		}).to.throw(exception);
	}

	invalid.forEach(function (correctCase) {
		var expression = correctCase.expression;
		var error = correctCase.error;
		it('should throw "' + error + '" for expression  "' + expression + '"', function () {

			expectThrows(expression, error);
		});

	});


});

