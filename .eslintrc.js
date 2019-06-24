'use strict'

const path = require('path')

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: path.join(__dirname, 'tsconfig.json'),
  },
  env: { es6: true, browser: true },
  plugins: ['@typescript-eslint'],
  extends: [
    'standard',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier/standard',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  settings: {
    react: {
      pragma: 'createElement',
    },
  },
  rules: {
    'react/no-unknown-property': ['error', { ignore: ['class'] }],
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      { allowExpressions: true },
    ],
  },
  overrides: [
    {
      files: ['**/*.js', '.*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
}
