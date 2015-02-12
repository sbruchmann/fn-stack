"use strict";

// Module Dependencies & Initializations
var async = require("neo-async");
var asyncErr = require("async-stacktrace");

var arrProto = Array.prototype;
var concat = arrProto.concat;
var slice = arrProto.slice;

/**
 * Initializes a new function stack.
 * @constructor
 */
function FNStack() {
    var stack = slice.call(arguments, 0).filter(function iterator(val) {
        return typeof val === "function";
    });

    this._context = null;
    this.stack = stack;

    return this;
}

/**
 * Specifies the context which all middleware will be bound to.
 * @param  {!Object} ctx
 * @return {!FNStack}
 */
FNStack.prototype.context = function context(ctx) {
    this._context = ctx;
    return this;
};

/**
 * Runs the current stack.
 * @param  {!Array} args - Arguments for functions in the stack
 * @param  {!Function<?Error>} callback
 * @return {!FNStack}
 */
FNStack.prototype.run = function run(args, callback) {
    var context = this._context;
    var callbackIndex, queue;

    if (!callback && typeof args === "function") {
        callback = args;
        args = [];
    }

    callbackIndex = args.length;
    queue = this.stack.map(function iterator(fn) {
        return function task(next) {
            args[callbackIndex] = function $next(err) {
                if (asyncErr(err, next)) {
                    return;
                }

                next(null);
            };

            fn.apply(context, args);
        };
    });

    async.series(queue, function onQueueCompleted(err) {
        if (asyncErr(err, callback)) {
            return;
        }

        callback.apply(context, concat.call([null], args));
    });

    return this;
};

/**
 * Adds one or more functions to the current stack.
 * @param  {(!Function<..., Function<?Error>>|Array<Function>)} fn
 * @return {!FNStack}
 */
FNStack.prototype.use = function use() {
    var args = slice.call(arguments, 0).filter(function iterator(val) {
        return typeof val !== "function";
    });

    this.stack = concat.call(this.stack, args);
    return this;
};

module.exports = FNStack;
