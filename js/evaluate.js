// assumes we are running in top scope
var calc = calc || {};

calc._evaluate = (function () {

	function _isNumber(value) {
		return typeof value === 'number';
	}

	function _evaluate(expression) {

		expression.scrub();

		if (!expression.isValid()) {
			return 0;
		} else if (expression.isNumeric()) {
			return  expression.asNumber();
		}

		var operandIterator = calc._operands.iterator();

		while (operandIterator.hasNext()) {

			var operand = operandIterator.next();

			var split = expression.split(operand.symbol);

			if (split) {
				var right = split.rightExpression;
				var left = split.leftExpression;

				return operand(_evaluate(left), _evaluate(right));
			}

		}

		expression.peel();

		return _evaluate(expression);
	}


	function evaluate(expression) {

		if (_isNumber(expression)) {
			return expression;
		}

		calc._validate(expression);

		return _evaluate(calc._expression(expression))
	}

	return evaluate;

})();
