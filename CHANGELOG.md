# Changelog

1.0.0
  * Removed deprecated `FNStack#push`
  * Add browser support (via [browserify](https://npmjs.org/package/browserify))

0.1.4
  * Callback is now run in the same context as middleware
  * Deprecated FNStack#push in favor of FNStack#use
  * Housekeeping

0.1.3
  * Implement async-stacktrace

0.1.2
  * Add `FNStack#context`

0.1.1
  * Add `FNStack#use` as an alias for `FNStack#push`
  * Use double quotes on "use strict";
