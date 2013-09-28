/**
 * calc - Calculator that evaluates nested arithmetic expressions.
 *
 * _evaluate - Evaluate and return value of provided expression.
 *
 * @license calc
 * (c) Robert Ödling https://github.com/robertodling/calc
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

// assumes we are running in top scope
var calc = calc || {};

calc._evaluate = (function () {

	/**
	 * Checks if provided value is of type number
	 * @param {*} value
	 * @return {boolean}
	 * @private
	 */
	function _isNumber(value) {
		return typeof value === 'number';
	}

	/**
	 * Returns the value of provided expression.
	 * Algoritm:
	 *
	 *
	 *
	 * @param {object} expression
	 * @return {boolean}
	 * @private
	 */
	function _evaluate(expression) {

		// remove invalid symbols and squash whitespaces.
		// note: "passed by reference", but no issue.
		expression.scrub();

		// expression is not valid, return value as zero
		if (!expression.isValid()) {
			return 0;
		}
		// if expression is number we are at atomic value, cannot split any further.
		else if (expression.isNumeric()) {
			return  expression.asNumber();
		}


		// go through each operand by operator precedence rule.
		var operandIterator = calc._operands.iterator();

		while (operandIterator.hasNext()) {

			var operand = operandIterator.next();

			// split on rightmost operand to guarantee left to right precedence
			var split = expression.split(operand.symbol);

			if (split) {
				var right = split.rightExpression;
				var left = split.leftExpression;

				// recursive
				return operand(_evaluate(left), _evaluate(right));
			}

		}



		// We found no operands on top level, peel to remove outermost brackets.
		// Example: (1+2) -> 1+2
		// note: "passed by reference", but no issue.
		expression.peel();

		// recursive call
		return _evaluate(expression);
	}


	/**
	 * Main entry point, will evaluate and return value of provided expression.
	 * @param {*} expression
	 * @return {number}
	 */
	function evaluate(expression) {

		// if number no need to evaluate, just return.
		if (_isNumber(expression)) {
			return expression;
		}

		// Make sure it is possible to evaluate expression
		calc._validate(expression);

		// evaluate and return
		return _evaluate(calc._expression(expression))
	}

	// "export" evaluate method
	return evaluate;

})();
