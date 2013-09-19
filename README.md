calc
====

Calculator which evaluates nested arithmetic expressions.

## Run tests

Install dependencies
```
npm install
```

Run file watcher and test runner

```
./node_modules/karma/bin/karma start
```

## Usage

Supported operators are ``+ - * /``

Input will automatically be scrubbed of invalid characters.

Incorrectly nested parenthesis will throw ``IncorrectlyNested``.


### Examples

```

calc.evaluate('3+4-5*6/6');			// 6

calc.evaluate('2+2*(6/2+(1+3))');	// 16

calc.evaluate('((2   +   2 * (   6 / 2  + I am evil (=)()()()((1+3)))))');	// 16


```
