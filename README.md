# koa-react-starter

A starter kit with
* [Koa](http://koajs.com/)
* [React](https://facebook.github.io/react/)
* [Redux](https://github.com/reactjs/redux)
* [Eslint](http://eslint.org/) and airbnb defaults
* [Mocha](https://mochajs.org/)
* [Gulp](http://gulpjs.com/)


This kit was inspired by [Koa-React-Starter](https://github.com/cynical89/koa-react-starter)


## Installation

* Install packages

`npm install`

*To be sure* you are running your unit tests, code styling, etc. before committing your changes, copy ./scripts/pre-commit to .git/hooks/pre-commit with the command `cp ./conf/pre-commit .git/hooks/pre-commit`

In order to the git hook to execute, you might need to run `chmod +x .git/hooks/pre-commit`

And to run the server
`gulp`

Front-end server will be available at: http://localhost:5000/

* Enjoy!


# Running Tests and ESLint

To run the unit tests: `gulp specs`

To run ESLint code style check: `gulp eslint`

You can also check the `gulpfile.js` for more tasks and details.
