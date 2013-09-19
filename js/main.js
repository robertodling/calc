// assumes we are running in top scope
var calc = calc || {};

calc.evaluate = (function () {

	function _isNumber (value){
	return typeof value === 'number';

	}

	function main(expression){

		if(_isNumber(expression)){
			return expression;
		}

		expression = calc._scrub(expression);

		calc._validate(expression);

		return calc._evaluate(expression);
	}

	return main;

})();
