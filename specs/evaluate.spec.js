/* global describe, it, expect, HashMap*/
describe('Splitting expression', function () {

	'use strict';

	var evaluate = calc._evaluate;


	var evaluateCases = [
		{
			expression: 0,
			result: 0
		},
		{
			expression: '1+2+3',
			result: 6
		},

		{
			expression: '3-2-1',
			result: 0
		},

		{
			expression: '1+3+5+(1*3)+2*10',
			result: 32
		},
		{
			expression: '1+2+2+2+3*10*10+2-11',
			result: 298
		},

		{
			expression: '1+2-(2*5)+11*10',
			result: 103
		},
		{
			expression: '4/2+3',
			result: 5
		},
		{
			expression: '1*3+4*5+(4+3*5-(5-22*33+3+(4+2)))*10/10',
			result: 754
		},
		{
			expression: '8/2*2',
			result: 8
		},
		{
			expression: '1+2-4*4/2',
			result: -5.0
		},
		{
			expression: '11/10*1*10-100/2',
			result: -39
		},
		{
			expression: '11/10*1*10-100/2*(1+1/2*10)+11',
			result: -278.0
		},
		{
			expression: '1+2-(2*5)+11*10*10*10/10/10+1+1+1+1+1-(12*1/(2*3))',
			result: 106
		},
		{
			expression: '11*10*10*10/10/10+1+1+1+1+1-(12*1/(2*3))',
			result: 113
		},
		{
			expression: '10/10/10',
			result: 0.1
		},
		{
			expression: '(1+2)',
			result: 3
		},
		{
			expression: '(((1+2)-(2*2)))',
			result: -1
		},
		{
			expression: 'abscd2sdfs+sdf12',
			result: 14
		},
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


	evaluateCases.forEach(function (evaluateCase) {
		var expression = evaluateCase.expression;
		var result = evaluateCase.result;
		it('should evaluate "' + expression + ' to "' + result + '"', function () {

			expect(evaluate(expression)).to.equal(result);
		});

	});

	var invalidCases = [
		{
			expression: '1 + 2 asd as)',
			error: 'IncorrectlyNested'
		},
		{
			expression: '()()(',
			error: 'IncorrectlyNested'
		},
		{
			expression: null,
			error: 'EmptyExpression'
		},
		{
			expression: undefined,
			error: 'EmptyExpression'
		}

	];

	function expectThrows(expression, exception) {
		expect(function () {
			evaluate(expression);
		}).to.throw(exception);
	}

	invalidCases.forEach(function (correctCase) {
		var expression = correctCase.expression;
		var error = correctCase.error;
		it('should throw "' + error + '" for expression  "' + expression + '"', function () {

			expectThrows(expression, error);
		});

	});


});

