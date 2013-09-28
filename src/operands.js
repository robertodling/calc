var calc = calc || {};
calc._operands = (function () {

	var operands = {
		'+': function (left, right) {
			return left + right;
		},

		'-': function (left, right) {
			return left - right;
		},

		'*': function (left, right) {
			return left * right;
		},

		'/': function (left, right) {
			return left / right;
		}
	};

	var operatorPrecedence = ['+', '-', '*', '/'];

	function iterator() {
		var i = 0;
		var length = operatorPrecedence.length;
		return {
			next: function () {
				var symbol = operatorPrecedence[i];
				var operand = operands[ symbol];
				operand.symbol = symbol;
				i++;
				return operand;
			},
			hasNext: function () {
				return i < length;
			}
		}
	}

	return {
		iterator: iterator
	}
})();

