module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      classes: true,
      jsx: true
    }
  },
  env: {
    'mocha': true,
  },
  globals: {
    expect: true,
    document: true,
  },
  rules: {
    'no-param-reassign': 'off',
    'no-unused-expressions': 'off',

    'react/prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prefer-stateless-function': 'off',
    'import/prefer-default-export': 'off',

    // Research what those mean
    'react/jsx-no-bind': 'off',
    'class-methods-use-this': 'off',
  }
}
