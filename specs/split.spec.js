/* global describe, it, expect, HashMap*/
describe('Splitting expression', function () {

	'use strict';

	var split = calc.split;

	function expectThrows(expression, exception) {
		expect(function () {
			validate(expression);
		}).to.throw(exception);
	}

	var splitCases = [
		/*
		 * operand '+'
		 * */
		{
			expression: '1+2',
			operand: '+',
			result: ['1', '2']
		},
		{
			expression: '(1*2)+(3*4)',
			operand: '+',
			result: ['(1*2)', '(3*4)']
		},
		{
			expression: '(1*2)+(2*3)+(4+6*(7*2))',
			operand: '+',
			result: ['(1*2)', '(2*3)', '(4+6*(7*2))']
		},

		/*
		 * operand '-'
		 * */
		{
			expression: '1-2',
			operand: '-',
			result: ['1', '2']
		},
		{
			expression: '(1*2)-(3*4)',
			operand: '-',
			result: ['(1*2)', '(3*4)']
		},
		{
			expression: '(1*2)-(2*3)-(4-6*(7*2))',
			operand: '-',
			result: ['(1*2)', '(2*3)', '(4-6*(7*2))']
		},
		/*
		 * operand '/'
		 * */
		{
			expression: '1/2',
			operand: '/',
			result: ['1', '2']
		},
		{
			expression: '(1*2)/(3*4)',
			operand: '/',
			result: ['(1*2)', '(3*4)']
		},
		{
			expression: '(1*2)/(2*3)/(4/6*(7*2))',
			operand: '/',
			result: ['(1*2)', '(2*3)', '(4/6*(7*2))']
		},
		/*
		 * operand '*'
		 * */
		{
			expression: '1*2',
			operand: '*',
			result: ['1', '2']
		},
		{
			expression: '(1*2)*(3*4)',
			operand: '*',
			result: ['(1*2)', '(3*4)']
		},
		{
			expression: '(1*2)*(2*3)*(4*6*(7*2))',
			operand: '*',
			result: ['(1*2)', '(2*3)', '(4*6*(7*2))']
		}
	];

	splitCases.forEach(function (splitCase) {
		var expression = splitCase.expression;
		var operand = splitCase.operand;
		var result = splitCase.result;
		it('should split "' + expression + '" for operand "' + operand + '" to "[' + result + ']"', function () {
			expect(split(expression, operand)).to.deep.equal(result);
		});

	});


});

