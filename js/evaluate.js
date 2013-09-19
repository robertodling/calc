// assumes we are running in top scope
var calc = calc || {};

calc._evaluate = (function () {


	function _isNumeric(expression) {
		return /^-{0,1}\d*\.{0,1}\d+$/.test(expression);
	}

	function _evaluateAddition(expressions) {
		var value = 0,
			i;

		for (i = 0; i < expressions.length; i++) {
			value += _evaluate(expressions[i]);
		}
		return value;
	}

	function _evaluateSubtraction(expressions) {
		var returnValue = 0,
			i,
			value;

		for (i = 0; i < expressions.length; i++) {
			value = _evaluate(expressions[i]);
			returnValue = i === 0 ? value : returnValue - value;
		}
		return returnValue;
	}

	function _evaluateDivision(expressions) {
		var returnValue = 0;
		for (var i = 0; i < expressions.length; i++) {
			var value = _evaluate(expressions[i]);
			returnValue = i === 0 ? value : returnValue / value;
		}
		return returnValue;
	}

	function _evaluateMultiplication(expressions) {
		var value = 1;
		for (var i = 0; i < expressions.length; i++) {
			value *= _evaluate(expressions[i]);
		}
		return value;
	}

	function _removeTopLevelBrackets(expression) {

		var scrubbed = "";
		var level = 0;
		for (var i = 0; i < expression.length; i++) {
			var isOpening = expression.charAt(i) === '(';
			var isClosing = expression.charAt(i) === ')';

			if (isOpening) {
				level++;
			} else if (isClosing) {
				level--;
			}

			if (!(isOpening || isClosing) || !((level === 1 && isOpening) ||  (level === 0 && isClosing))) {
				scrubbed += expression.charAt(i);
			}
		}

		return scrubbed;
	}

	function _containsNumber(expression){
		return /\d/g.test(expression);
	}


	function _evaluate(expression) {

		if (_isNumeric(expression)) {
			var number = parseFloat(expression);
			return  number;
		}

		var operands = ['+', '-', '*', '/'];
		for (var i = 0; i < operands.length; i++) {
			var operand = operands[i];

			var expressions = calc._split(expression, operand);
			if (expressions.length > 0) {
				switch (operand) {
				case '+':
					return _evaluateAddition(expressions);
				case '-':
					return _evaluateSubtraction(expressions);
				case '*':
					return _evaluateMultiplication(expressions);
				case '/':
					return _evaluateDivision(expressions);
				}
			}
		}

		// this expression contains no number, treat it as zero
		if (!_containsNumber) {
			return 0;
		}
		//no operand found, remove top level braces
		else {
			expression = _removeTopLevelBrackets(expression);
		}

		return _evaluate(expression);


	}

	return _evaluate;

})();
