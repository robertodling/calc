// assumes we are running in top scope
var calc = calc || {};

calc._validate = (function () {

	var patterns = {
		openingSymbol: /\(/g,
		closingSymbol: /\)/g
	};

	function _isEmpty(expression) {
		return !expression;
	}

	function _openingCount(expression) {
		var matches = expression.match(patterns.openingSymbol);
		return  matches && matches.length || 0;
	}

	function _closingCount(expression) {
		var matches = expression.match(patterns.closingSymbol);
		return  matches && matches.length || 0;
	}

	function _isCorrectlyNested(expression) {

		return _openingCount(expression) === _closingCount(expression);
	}


	function validate(expression) {

		if (_isEmpty(expression)) {
			throw new Error('EmptyExpression')
		} else if (!_isCorrectlyNested(expression)) {
			throw new Error('IncorrectlyNested')
		}
	}

	return validate;
})();
