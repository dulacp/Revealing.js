# Contributing

## Important notes
Please don't edit files in the `dist` subdirectory as they are generated via gulp.js. You'll find source code in the `src` subdirectory!

### Code style
Regarding code style like indentation and whitespace, **follow the conventions you see used in the source already.**

### PhantomJS
While gulp.js can run the included unit tests via [PhantomJS](http://phantomjs.org/), this shouldn't be considered a substitute for the real thing. Please be sure to test the `test/*.html` unit test file(s) in _actual_ browsers.

## Modifying the code
First, ensure that you have the latest [Node.js](http://nodejs.org/) and [npm](http://npmjs.org/) installed.

Test that gulp's CLI and Bower are installed by running `gulp --version` and `bower --version`.  If the commands aren't found, run `npm install`.

1. Fork and clone the repo.
1. Run `$ npm install` to install all build dependencies.
1. Run `$ bower install` to install the front-end dependencies.
1. Run `$ gulp` to build this project.

Assuming that you don't see any red, you're ready to go.

> By running `$ gulp` the project is compiled after each save you made, by you need to run `$ gulp test` if you want to run the unit test suit.

## Submitting pull requests

1. Create a new branch, please don't work in your `master` branch directly.
1. Add failing tests for the change you want to make. Run `$ gulp test` to see the tests fail.
1. Fix stuff.
1. Run `$ gulp test` to see if the tests pass. Repeat steps 2-4 until done.
1. Open `test/*.html` unit test file(s) in actual browser to ensure tests pass everywhere.
1. Update the documentation to reflect any changes.
1. Push to your fork and submit a pull request.
