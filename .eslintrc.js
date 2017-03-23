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
    expect: true
  },
  rules: {
    'no-param-reassign': 'off',
    'no-unused-expressions': 'off'
  }
}
