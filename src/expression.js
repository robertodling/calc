/**
 * calc - Calculator that evaluates nested arithmetic expressions.
 *
 * _expression - "Class" representing expression. Exposes constructor method.
 *
 * @license calc
 * (c) Robert Ödling https://github.com/robertodling/calc
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

// assumes we are running in top scope
var calc = calc || {};

calc._expression = (function () {

	function _isValidSymbol(c) {
		return /[0-9\+\-\*\/\(\)]/.test(c);
	}

	function _isNumeric(value) {
		return /^-{0,1}\d*\.{0,1}\d+$/.test(value);
	}

	function _containsNumber(value) {
		return /\d/g.test(value);
	}

	function _isOpeningSymbol(c) {
		return  c === '(';
	}

	function _isClosingSymbol(c) {
		return  c === ')';
	}


	function _getSplit(expression, index) {
		return {
			leftExpression: create(expression.substring(0, index)),
			rightExpression: create(expression.substring(index + 1, expression.length))
		};
	}


	var expression = {

		isValid: function () {
			return _containsNumber(this.value);
		},

		isNumeric: function () {
			return _isNumeric(this.value);
		},

		asNumber: function () {
			return parseFloat(this.value);
		},

		/**
		 * Split expression on provided symbol (operator symbol).
		 * Will split on rightmost operand to guarantee left to right precedence.
		 */

		split: function (symbol) {
			var expression = this.value;
			var i = expression.length;
			var depth = 0;

			var left = [];
			var right = [];

			// loop through string backwards
			while (i > 0) {
				var c = expression.charAt(i);

				right.unshift(c);
				// we
				var splitFound = c === symbol && depth === 0;
				left.push(c);
				if (splitFound) {
					return _getSplit(expression, i);
				} else if (_isOpeningSymbol(c)) {
					depth++;
				} else if (_isClosingSymbol(c)) {
					depth--;
				}

				i--;
			}
		},

		peel: function () {

			var expression = this.value.split('');
			var depth = 0;
			this.value = expression.filter(function (character) {

				if (_isOpeningSymbol(character)) {
					depth++;
					return depth > 1;
				} else if (_isClosingSymbol(character)) {
					depth--;
					return depth > 0
				}

				return true;

			}).join('');

		},

		scrub: function () {
			var expression = this.value.split('');
			this.value = expression.filter(function (character) {
				return _isValidSymbol(character)
			}).join('');

		}

	};

	function create(value) {

		var e = Object.create(expression);
		e.value = value;
		return e;
	}

	return create;

})();
