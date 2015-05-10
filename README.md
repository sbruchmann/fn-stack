# fn-stack

Use generic middleware in your JavaScript applications (similar to [stack][stack] by [creationix][creationix]).

## Installation

Via [npm][npm]:  
`$ npm install fn-stack`

Via [git][git]:<br />

```sh
$ git clone git@github.com:sbruchmann/fn-stack.git
$ cd fn-stack/
$ npm install
```

## Usage

```javascript
"use strict";

var FNStack = require("fn-stack");
var stack = new FNStack();

stack.use(function log(value, next) {
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

[creationix]: http://creationix.com
[git]: http://git-scm.org
[npm]: http://npmjs.org
[stack]: https://npmjs.org/stack
