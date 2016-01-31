// css fading in and out
'use strict'

var addClass = require('amp-add-class')
var removeClass = require('amp-remove-class')

var FADE_IN_CLASSNAME = 'is-fading-in'
var FADE_OUT_CLASSNAME = 'is-fading-out'

var root
var endEvent

module.exports = {
  init: function(event) {
    endEvent = event
  },

  in: function(element, done) {
    element.addEventListener(endEvent, function() {
      removeClass(element, FADE_IN_CLASSNAME)
      done()
    })

    addClass(element, FADE_IN_CLASSNAME)
  },

  out: function(element, done) {
    element.addEventListener(endEvent, function() {
      removeClass(element, FADE_OUT_CLASSNAME)
      done()
    })

    addClass(element, FADE_OUT_CLASSNAME)
  }
}
