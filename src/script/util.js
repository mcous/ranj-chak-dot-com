'use strict'

var addClass = require('amp-add-class')
var removeClass = require('amp-remove-class')

var INVISIBLE_CLASSNAME = 'is-invisible'

module.exports = {
  forEach: function forEach(arrayLike, iteratee) {
    for (var i = 0; i < arrayLike.length; i++) {
      iteratee(arrayLike[i], i)
    }
  },

  filter: function filter(arrayLike, predicate) {
    var filtered = []

    for (var i = 0; i < arrayLike.length; i++) {
      if (predicate(arrayLike[i], i)) {
        filtered.push(arrayLike[i])
      }
    }

    return filtered
  },

  map: function map(arrayLike, iteratee) {
    var mapped = []

    for (var i = 0; i < arrayLike.length; i++) {
      mapped.push(iteratee(arrayLike[i], i))
    }

    return mapped
  },

  once: function once(eventEmitter, event, handler) {
    var oneTimeHandler = function(triggeredEvent) {
      eventEmitter.removeEventListener(event, oneTimeHandler)
      handler(triggeredEvent)
    }

    eventEmitter.addEventListener(event, oneTimeHandler)
  },

  makeInvisible: function hide(element) {
    addClass(element, INVISIBLE_CLASSNAME)
  },

  makeVisible: function show(element) {
    removeClass(element, INVISIBLE_CLASSNAME)
  }
}
