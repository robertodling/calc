// assumes we are running in top scope
var calc = calc || {};

calc._scrub = (function () {

	var invalidCharacters = /[^0-9\+\-\*\/\(\)]/g;

	function _removeInvalidCharacters(expression) {
		return expression.replace(invalidCharacters, '')
	}

	function scrub(expression) {

		return  _removeInvalidCharacters(expression);
	}

	return scrub;


})();
