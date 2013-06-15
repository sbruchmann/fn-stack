# [fn-stack](http://github.com/sbruchmann/fn-stack)

Use functions as generic middleware (similar to [stack by @creationix][stack]).

## Installation

Via [npm][npm]:  
`$ npm install fn-stack`

Via [git][git]:<br />

```sh
$ git clone https://github.com/sbruchmann/fn-stack  
$ cd fn-stack/
$ npm install
```

## Usage

```sh
'use strict';

var FNStack = require("fn-stack");
var fs = require("fs");

var stack = new FNStack();

this.stack.push(function log(value, next) {
    process.nextTick(function() {
        console.log(value); // => "Hello, world!"
        next(null);
    });
});

stack.run(["Hello, world!"], function onDone(err) {
    if (err) {
        throw err;
    }

    console.log("Done.");
});
```

[git]: http://git-scm.org
[npm]: http://npmjs.org
[stack]: https://github.com/stack/creationix
