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

	function _isAtSplit(c, symbol, depth) {
		return c === symbol && depth === 0;
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

		split: function (symbol) {
			var expression = this.value;
			var i = expression.length;
			var depth = 0;

			while (i > 0) {
				var c = expression.charAt(i);
				if (_isAtSplit(c, symbol, depth)) {
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
			var expression = this.value;
			var peeledChars = [];
			var depth = 0;
			for (var i = 0; i < expression.length; i++) {
				var c = expression.charAt(i);

				if (_isOpeningSymbol(c)) {
					depth++;
				} else if (_isClosingSymbol(c)) {
					depth--;
				}
				var isTopLevelOpening = (depth === 1 && _isOpeningSymbol(c));
				var isTopLevelClosing = (depth === 0 && _isClosingSymbol(c));
				if (!isTopLevelOpening && !isTopLevelClosing) {
					peeledChars.push(c);
				}
			}

			this.value = peeledChars.join('');
		},

		scrub: function () {
			var expression = this.value;
			var scrubbedChars = [];
			for (var i = 0; i < expression.length; i++) {
				var c = expression.charAt(i);

				if (_isValidSymbol(c)) {
					scrubbedChars.push(c);
				}
			}

			this.value = scrubbedChars.join('');

		}

	};

	function create(value) {

		var e = Object.create(expression);
		e.value = value;
		return e;
	}

	return create;

})();
