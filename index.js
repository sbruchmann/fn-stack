'use strict';

// Module dependencies
var _ = require("lodash");
var async = require("async");

// Cache references to `Array.prototype` methods
var arrProto = Array.prototype;
var concat = arrProto.concat;
var slice = arrProto.slice;

/**
 * Initializes a new function stack.
 * @constructor
 */
function FNStack() {
	var stack = _.reject(slice.call(arguments, 0), function iterator(val) {
		return typeof val !== "function";
	});

	this.stack = stack;

	return this;
}

/**
 * Adds one or more functions to the current stack.
 * @param  {Function} fn
 * @return {FNStack}
 */
FNStack.prototype.push = function push() {
	var args = _.reject(slice.call(arguments, 0), function iterator(val) {
		return typeof val !== "function";
	});

	this.stack = concat.call(this.stack, args);
	return this;
};

/**
 * Runs the current stack.
 * @param  {Array}    args     Arguments for functions in the stack
 * @param  {Function} callback
 * @return {FNStack}
 */
FNStack.prototype.run = function run(args, callback) {
	var queue = _.map(this.stack, function iterator(fn) {
		return function task(next) {
			args.push(next);
			fn.apply(null, args);
		}
	});

	async.series(queue, function onQueueCompleted(err) {
		if (err) {
			return callback(err);
		}

		callback.apply(null, concat.call([null], args));
	});

	return this;
};

module.exports = FNStack;
