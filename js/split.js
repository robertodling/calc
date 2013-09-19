// assumes we are running in top scope
var calc = calc || {};

calc.split = (function () {

	function _isOpeningBracket(character) {
		return character === '(';
	}

	function _isClosingBracket(character) {
		return character === ')';
	}

	function _isOperandFoundOnCurrentLevel(operand, balance, character) {
		return character === operand && balance === 0;
	}

	function _isEndOfExpression(expression, currentExpressionBeginIndex, index) {
		return index === expression.length - 1 && currentExpressionBeginIndex > 0;
	}

	function splitTopLevel(expression, operand) {
		var bracketBalance = 0,
			expressions = [],
			expressionBegin = 0,
			subExpression,
			index,
			character;

		for (index = 0; index < expression.length; index++) {

			character = expression.charAt(index);

			if (_isOpeningBracket(character)) {
				bracketBalance++;
			} else if (_isClosingBracket(character)) {
				bracketBalance--;
			}

			if (_isOperandFoundOnCurrentLevel(operand, bracketBalance, character)) {
				subExpression = expression.substring(expressionBegin, index);
			} else if (_isEndOfExpression(expression, expressionBegin, index)) {
				subExpression = expression.substring(expressionBegin, index + 1);
			}

			if (subExpression) {
				expressions.push(subExpression);
				expressionBegin = index + 1;
				subExpression = null;
			}

		}

		return expressions;
	}

	return splitTopLevel;


})();
