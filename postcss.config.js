'use strict'

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-preset-env')({
      stage: 2,
      features: { 'custom-media-queries': true, 'nesting-rules': true },
    }),
  ],
}
