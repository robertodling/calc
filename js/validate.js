// assumes we are running in top scope
var calc = calc || {};

calc._validate = (function () {

	var patterns = {
		leftParenthesis: /\(/g,
		rightParenthesis: /\)/g,
		invalidCharacters: /[^0-9\+\-\*\/\(\)\s]/
	};

	function _isEmpty(expression) {
		return !expression;
	}

	function _containsInvalidCharacters(expression) {
		return patterns.invalidCharacters.test(expression);
	}

	function _isCorrectlyNested(expression) {
		var leftPMatches = expression.match(patterns.leftParenthesis),
			leftPCount = leftPMatches && leftPMatches.length,
			rightPMatches = expression.match(patterns.rightParenthesis),
			rightPCount = rightPMatches && rightPMatches.length;

		return leftPCount && rightPCount && leftPCount === rightPCount || !leftPCount && ! rightPCount;
	}


	function validate(expression) {
		if (_isEmpty(expression)) {
			throw new Error('EmptyExpression')
		} else if (_containsInvalidCharacters(expression)) {
			throw new Error('InvalidCharacters')
		} else if (!_isCorrectlyNested(expression)) {
			throw new Error('IncorrectlyNested')
		}
	}

	return validate;
})();
