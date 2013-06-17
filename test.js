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

	it("should add only on callback function", function(done) {
		this.stack.push(function(value, next) {
			expect(value).to.be.a("string");
			expect(value).to.equal("foo");
			next(null);
		});

		this.stack.push(function(value, next) {
			expect(arguments.length).to.equal(2);
			next(null);
		});

		this.stack.run(["foo"], function callback(err) {
			if (err) {
				throw err;
			}

			expect(err).to.be.a("null");
			done();
		});
	});

	it("should not depend on arguments passed to #run", function(done) {
		var callback = function callback(err) {
			if (err) {
				throw err;
			}

			expect(err).to.be.a("null");
			done();
		};

		this.stack.push(function(next) {
			expect(arguments.length).to.equal(1);
			next(null);
		});

		this.stack.run(callback);
	});
});
