/* global describe, it, expect, HashMap*/
describe('Validating expression', function () {

	'use strict';

	var validate = calc._validate;

	function expectNotThrows(expression, exception) {
		expect(function () {
			validate(expression);
		}).to.not.throw(exception);
	}

	function expectThrows(expression, exception) {
		expect(function () {
			validate(expression);
		}).to.throw(exception);
	}

	describe('EmptyExpression', function () {

		it('should throw exception when passing no arguments', function () {
			expect(function () {
				validate();
			}).to.throw('EmptyExpression');
		});

		[''].
			forEach(function (expression) {
				it('should should not allow ' + expression, function () {
					expectThrows(expression, 'EmptyExpression');
				});
			});
	});


	describe('IncorrectlyNested', function () {
		['('].
			forEach(function (expression) {
				it('should should not allow ' + expression, function () {
					expectThrows(expression, 'IncorrectlyNested');
				});
			});
	});

	describe('Correct input', function () {
		['()', '1+2', '((203/2)*2+(2-1))'].
			forEach(function (expression) {
				it('should should allow ' + expression, function () {
					expectNotThrows(expression);
				});
			});
	});

});

