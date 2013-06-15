'use strict';

var expect = require("chai").expect;
var FNStack = require("./");

describe("fn-stack", function() {
	beforeEach(function() {
		this.stack = new FNStack();
	});

	it("should asynchronously run all functions in the stack", function(done) {
		var callback = function callback(err, result) {
			if (err) {
				throw err;
			}

			console.log("result", result);
			expect(err).to.be.a("null");
			expect(result).to.be.a("boolean");
			expect(result).to.equal(true);
			done();
		};

		this.stack.push(function(value, next) {
			process.nextTick(function() {
				expect(value).to.be.a("boolean");
				expect(value).to.equal(true);
				next(null);
			});
		});

		this.stack.run([true], callback);
	});
});
