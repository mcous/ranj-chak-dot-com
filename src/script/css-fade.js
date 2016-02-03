// css fading in and out
'use strict'

var addClass = require('amp-add-class')
var removeClass = require('amp-remove-class')

var FADE_IN_CLASSNAME = 'is-faded-in'
var FADE_OUT_CLASSNAME = 'is-faded-out'

var root
var endEvent

module.exports = {
  init: function(event) {
    endEvent = event
  },

  in: function(element, done) {
    element.addEventListener(endEvent, function() {
      if (done) {
        done()
      }
    })

    removeClass(element, FADE_OUT_CLASSNAME)
    addClass(element, FADE_IN_CLASSNAME)
  },

  out: function(element, done) {
    element.addEventListener(endEvent, function() {
      if (done) {
        done()
      }
    })

    removeClass(element, FADE_IN_CLASSNAME)
    addClass(element, FADE_OUT_CLASSNAME)
  }
}
