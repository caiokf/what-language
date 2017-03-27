# What Language ?
![codeship status](https://codeship.com/projects/2d4ca8b0-f4e6-0134-aab4-4e76bd6b2464/status?branch=master)


## Installation

* Install packages

`npm install`

*To be sure* you are running your unit tests, code styling, etc. before committing your changes, copy ./scripts/pre-commit to .git/hooks/pre-commit with the command `cp ./pre-commit .git/hooks/pre-commit`

In order to the git hook to execute, you might need to run `chmod +x .git/hooks/pre-commit`

And to run the server
`gulp`

Front-end server will be available at: http://localhost:5000/

* Enjoy!


# Running Tests and ESLint

To run the unit tests: `gulp specs`

To run ESLint code style check: `gulp eslint`

You can also check the `gulpfile.js` for more tasks and details.
