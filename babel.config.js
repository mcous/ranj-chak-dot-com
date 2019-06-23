'use strict'

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      { modules: false, useBuiltIns: 'usage', corejs: 3, loose: true },
    ],
    ['@babel/preset-react', { pragma: 'createElement' }],
    ['@babel/preset-typescript', { jsxPragma: 'createElement' }],
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/proposal-object-rest-spread', { loose: true }],
  ],
}
